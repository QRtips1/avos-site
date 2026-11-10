"use strict";
const CATS = { rough: "Grubi radovi", earth: "Iskopi", house: "Kuće ključ u ruke" };
const ic = (n, s = 18) => `<svg width="${s}" height="${s}" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const MAX_VIDEO = 200 * 1024 * 1024;

/* login (demo: no password; the real site gives access only to the owner and people he adds) */
function showApp(on) { $("#login").hidden = on; $("#app").hidden = !on; if (on) { drawGal(); drawLeads(); } }
$("#lf").addEventListener("submit", e => { e.preventDefault(); LS.set("mri-auth", 1); showApp(true); });
$("#logout").addEventListener("click", () => { LS.del("mri-auth"); showApp(false); });

/* tabs */
$$(".tabs button").forEach(b => b.addEventListener("click", () => {
  $$(".tabs button").forEach(x => x.setAttribute("aria-selected", String(x === b)));
  $$(".apanel").forEach(p => { p.hidden = p.id !== "tab-" + b.dataset.tab; });
  if (b.dataset.tab === "leads") drawLeads();
}));

/* gallery */
let ITEMS = [];
async function drawGal() {
  ITEMS = await galleryItems();
  const g = $("#agrid");
  g.replaceChildren();
  ITEMS.forEach((it, i) => {
    const c = document.createElement("div");
    c.className = "ai";
    c.innerHTML = `<div class="th"><span class="tag">${it.type === "video" ? "VIDEO" : it.u ? "PRIMJER" : "FOTO"}</span></div>
      <div class="row"><select aria-label="Kategorija">${Object.entries(CATS).map(([k, v]) => `<option value="${k}"${k === it.cat ? " selected" : ""}>${v}</option>`).join("")}</select>
      <button type="button" class="ib" data-a="up" aria-label="Pomjeri naprijed"${i === 0 ? " disabled" : ""}>${ic("up")}</button>
      <button type="button" class="ib" data-a="down" aria-label="Pomjeri nazad"${i === ITEMS.length - 1 ? " disabled" : ""}>${ic("down")}</button>
      <button type="button" class="ib del" data-a="del" aria-label="Obriši">${ic("trash")}</button></div>`;
    $(".th", c).prepend(mediaEl(it, 500));
    $("select", c).addEventListener("change", e => setCat(it, e.target.value));
    $$("[data-a]", c).forEach(b => b.addEventListener("click", () => act(it, i, b.dataset.a)));
    g.append(c);
  });
}
async function setCat(it, cat) {
  if (it.u) { const m = LS.get("mri-cat", {}); m[it.id] = cat; LS.set("mri-cat", m); }
  else await mediaPut({ ...it.rec, cat });
  it.cat = cat;
}
async function act(it, i, a) {
  const order = ITEMS.map(x => x.id);
  if (a === "up" || a === "down") {
    const j = a === "up" ? i - 1 : i + 1;
    [order[i], order[j]] = [order[j], order[i]];
    LS.set("mri-order", order);
  } else if (a === "del") {
    if (!confirm("Obrisati " + (it.type === "video" ? "ovaj video" : "ovu fotografiju") + " sa sajta?")) return;
    if (it.u) LS.set("mri-hidden", [...new Set([...LS.get("mri-hidden", []), it.id])]);
    else await mediaDel(it.id);
    LS.set("mri-order", order.filter(x => x !== it.id));
  }
  drawGal();
}
$("#restore").addEventListener("click", () => { LS.del("mri-hidden"); drawGal(); });

/* upload: photos are resized in the browser before saving, videos are kept as they are */
async function shrink(file) {
  try {
    const bmp = await createImageBitmap(file);
    const k = Math.min(1, 2000 / Math.max(bmp.width, bmp.height));
    if (k === 1 && file.size < 1.5e6) return file;
    const cv = document.createElement("canvas");
    cv.width = Math.round(bmp.width * k); cv.height = Math.round(bmp.height * k);
    cv.getContext("2d").drawImage(bmp, 0, 0, cv.width, cv.height);
    return await new Promise(r => cv.toBlob(b => r(b || file), "image/jpeg", 0.85));
  } catch (e) { return file; }
}
async function addFiles(list) {
  const files = [...list].filter(f => /^(image|video)\//.test(f.type));
  if (!files.length) return;
  const st = $("#ust"), cat = $("#ucat").value, added = [];
  let skipped = 0;
  for (let n = 0; n < files.length; n++) {
    const f = files[n], video = f.type.startsWith("video/");
    st.textContent = `Dodajem ${n + 1} / ${files.length}…`;
    if (video && f.size > MAX_VIDEO) { skipped++; continue; }
    const blob = video ? f : await shrink(f);
    const rec = { id: "u" + Date.now() + "-" + n, cat, type: video ? "video" : "image", blob, ts: Date.now() + n, name: f.name };
    try { await mediaPut(rec); added.push(rec.id); } catch (e) { skipped++; }
  }
  const order = LS.get("mri-order", null);
  if (order) LS.set("mri-order", [...added.reverse(), ...order]);
  st.textContent = `Dodato: ${added.length}. Već su vidljivi na sajtu.` + (skipped ? ` Preskočeno: ${skipped} (prevelik fajl).` : "");
  drawGal();
}
const drop = $("#drop");
$("#files").addEventListener("change", e => { addFiles(e.target.files); e.target.value = ""; });
["dragenter", "dragover"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add("over"); }));
["dragleave", "drop"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop", e => addFiles(e.dataTransfer.files));

/* requests from the site form */
function drawLeads() {
  const leads = LS.get("mri-leads", []), open = leads.filter(l => !l.done).length, cnt = $("#cnt");
  cnt.hidden = !open; cnt.textContent = open;
  const box = $("#leads");
  if (!leads.length) { box.innerHTML = `<p class="muted">Još nema upita. Pošaljite jedan iz forme na <a href="../#kontakt" target="_blank" rel="noopener">sajtu</a> i pojaviće se ovdje.</p>`; return; }
  const type = { rough: "Grubi radovi", earth: "Iskopi", house: "Kuća ključ u ruke", other: "Nešto drugo" };
  box.innerHTML = leads.slice().reverse().map(l => `<article class="lq${l.done ? " done" : ""}">
    <div class="lq-h"><b>${esc(l.name)}</b><span class="pill">${esc(type[l.type] || l.type)}</span><time>${new Date(l.ts).toLocaleString("sr-Latn-ME", { dateStyle: "medium", timeStyle: "short" })}</time></div>
    <p>${esc(l.phone)}${l.place ? " · " + esc(l.place) : ""} · jezik: ${esc((l.lang || "me").toUpperCase())}</p>
    ${l.msg ? `<p>${esc(l.msg)}</p>` : ""}
    <div class="lq-a"><a href="tel:${esc(l.phone.replace(/[^\d+]/g, ""))}">Pozovi</a><a href="https://wa.me/${esc(l.phone.replace(/\D/g, ""))}" target="_blank" rel="noopener">WhatsApp</a>
    <button type="button" data-id="${esc(l.id)}">${l.done ? "Vrati u nove" : "Označi kao obrađen"}</button></div></article>`).join("");
  $$("button[data-id]", box).forEach(b => b.addEventListener("click", () => {
    const all = LS.get("mri-leads", []), x = all.find(l => l.id === b.dataset.id);
    if (x) { x.done = !x.done; LS.set("mri-leads", all); drawLeads(); }
  }));
}
window.addEventListener("storage", e => { if (e.key === "mri-leads") drawLeads(); });

showApp(!!LS.get("mri-auth", 0));
