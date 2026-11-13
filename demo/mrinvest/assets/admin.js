"use strict";
const MAX_VIDEO = 200 * 1024 * 1024;
const UNITS = [["m2", "€/m²"], ["m3", "€/m³"], ["m", "€/m"], ["h", "€/h"], ["job", "€ paušalno"]];
let C = getContent(), EL = "me", MEDIA = [], OPEN = null;
const svcName = id => { const s = C.services.find(x => x.id === id); return s ? s.title.me : id; };

function el(tag, props = {}, ...kids) {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") e.className = v;
    else if (k === "text") e.textContent = v;
    else if (k === "html") e.innerHTML = v;
    else if (k === "value") e.value = v ?? "";
    else if (k === "checked") e.checked = !!v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (v === true) e.setAttribute(k, "");
    else if (v !== false && v != null) e.setAttribute(k, v);
  }
  kids.flat().forEach(c => { if (c != null) e.append(c); });
  return e;
}
const field = (label, input, cls = "fl") => el("div", { class: cls }, el("label", { text: label }), input);
const iconBtn = (n, label, fn, opts = {}) => el("button", { type: "button", class: "ib" + (opts.del ? " del" : ""), "aria-label": label, title: label, html: ic(n), onclick: fn, disabled: !!opts.disabled });

let saveT;
function save() {
  if (!saveContent(C)) { $("#saved").style.color = "#A3321F"; $("#saved").textContent = "Nije sačuvano: memorija pregledača je puna."; return; }
  $("#saved").style.color = ""; $("#saved").textContent = "Sačuvano ✓ Izmjene su već na sajtu.";
  clearTimeout(saveT); saveT = setTimeout(() => { $("#saved").textContent = ""; }, 2600);
}
/* a text field bound to a {me,en,ru,de} object; editing ME also fills languages that were not translated yet */
function tInput(holder, key, multi) {
  const o = holder[key] = holder[key] || { me: "", en: "", ru: "", de: "" };
  const e = el(multi ? "textarea" : "input", { value: o[EL] ?? o.me, rows: multi ? 3 : null });
  e.addEventListener("input", () => {
    const prev = o.me, v = e.value;
    o[EL] = v;
    if (EL === "me") ["en", "ru", "de"].forEach(l => { if (!o[l] || o[l] === prev) o[l] = v; });
    save();
  });
  return e;
}
function numInput(holder, key) {
  const e = el("input", { type: "number", min: "0", step: "any", value: hasPrice(holder[key]) ? holder[key] : "", placeholder: "na upit" });
  e.addEventListener("input", () => { holder[key] = e.value === "" ? null : Number(e.value); save(); });
  return e;
}
function selInput(holder, key, options, after) {
  const e = el("select", {}, options.map(([v, t]) => el("option", { value: v, text: t })));
  e.value = holder[key];
  e.addEventListener("change", () => { holder[key] = e.value; save(); if (after) after(); });
  return e;
}
const move = (arr, i, d) => { const j = i + d; if (j < 0 || j >= arr.length) return; [arr[i], arr[j]] = [arr[j], arr[i]]; };

/* photos are resized in the browser before saving, videos are kept as they are */
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
async function storeFiles(list, extra, onEach) {
  const files = [...list].filter(f => /^(image|video)\//.test(f.type)), ids = [];
  let skipped = 0;
  for (let n = 0; n < files.length; n++) {
    const f = files[n], video = f.type.startsWith("video/");
    if (onEach) onEach(n, files.length);
    if (video && f.size > MAX_VIDEO) { skipped++; continue; }
    const rec = { id: "u" + Date.now() + "-" + n, type: video ? "video" : "image", blob: video ? f : await shrink(f), ts: Date.now() + n, name: f.name, ...extra };
    try { await mediaPut(rec); ids.push(rec.id); } catch (e) { skipped++; }
  }
  MEDIA = await mediaAll();
  return { ids, skipped };
}

/* ---------- login and tabs */
function showApp(on) { $("#login").hidden = on; $("#app").hidden = !on; if (on) loadAll(); }
$("#lf").addEventListener("submit", e => { e.preventDefault(); LS.set("mri-auth", 1); showApp(true); });
$("#logout").addEventListener("click", () => { LS.del("mri-auth"); showApp(false); });
$$(".tabs button").forEach(b => b.addEventListener("click", () => {
  $$(".tabs button").forEach(x => x.setAttribute("aria-selected", String(x === b)));
  $$(".apanel").forEach(p => { p.hidden = p.id !== "tab-" + b.dataset.tab; });
  $("#elang").style.visibility = ["svc", "proj"].includes(b.dataset.tab) ? "" : "hidden";
  if (b.dataset.tab === "leads") drawLeads();
}));
$$("#elang button").forEach(b => b.addEventListener("click", () => {
  EL = b.dataset.l;
  $$("#elang button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  drawSvcs(); drawProjs();
}));
async function loadAll() { C = getContent(); MEDIA = await mediaAll(); drawSvcs(); drawProjs(); drawGal(); drawLeads(); }

/* ---------- services and prices */
function drawSvcs() {
  const box = $("#svcs");
  box.replaceChildren();
  C.services.forEach((s, si) => {
    const show = el("input", { type: "checkbox", checked: s.show !== false, onchange: e => { s.show = e.target.checked; save(); } });
    const cover = coverItem(s);
    const coverBox = el("div", { class: "pa-c" });
    coverBox.append(mediaEl(cover, 300));
    const upl = el("input", { type: "file", accept: "image/*", hidden: true, onchange: async e => {
      if (!e.target.files.length) return;
      const r = await storeFiles([e.target.files[0]], { proj: "svc-" + s.id, cat: s.id });
      if (r.ids[0]) { if (s.cover) await mediaDel(s.cover.slice(2)).catch(() => {}); s.cover = "m:" + r.ids[0]; save(); MEDIA = await mediaAll(); drawSvcs(); }
    } });
    const items = el("div", { class: "lrows" }, s.items.map((it, i) => el("div", { class: "lrow" }, tInput(s.items, i),
      iconBtn("trash", "Obriši stavku", () => { s.items.splice(i, 1); save(); drawSvcs(); }, { del: true }))));
    const lines = el("div", { class: "lrows" }, (s.lines || []).map((l, i) => el("div", { class: "lrow pl" }, tInput(l, "name"), numInput(l, "from"), selInput(l, "unit", UNITS),
      iconBtn("trash", "Obriši cijenu", () => { s.lines.splice(i, 1); save(); drawSvcs(); }, { del: true }))));
    box.append(el("section", { class: "acard" },
      el("header", {}, el("h3", { text: s.title[EL] || s.title.me }),
        el("div", { class: "pa-a" }, el("label", { class: "sw" }, show, "Prikaži na sajtu"),
          iconBtn("up", "Pomjeri gore", () => { move(C.services, si, -1); save(); drawSvcs(); }, { disabled: si === 0 }),
          iconBtn("down", "Pomjeri dolje", () => { move(C.services, si, 1); save(); drawSvcs(); }, { disabled: si === C.services.length - 1 }))),
      el("div", { class: "pa-h", style: "padding:0" }, coverBox,
        el("div", {}, el("b", { text: "Fotografija usluge" }), el("small", { text: s.cover ? "Vaša fotografija" : "Primjer fotografije" })),
        el("div", { class: "pa-a" }, el("label", { class: "addb", text: "Promijeni" }, upl),
          s.cover ? el("button", { type: "button", class: "addb", text: "Vrati primjer", onclick: async () => { await mediaDel(s.cover.slice(2)).catch(() => {}); delete s.cover; save(); MEDIA = await mediaAll(); drawSvcs(); } }) : null)),
      field("Naziv usluge", tInput(s, "title")),
      field("Opis", tInput(s, "lead", true)),
      el("div", { class: "three" }, field("Cijena od (prazno = na upit)", numInput(s.price, "from")), field("Jedinica", selInput(s.price, "unit", UNITS))),
      el("h4", { text: "Šta je uključeno" }), items,
      el("button", { type: "button", class: "addb", html: ic("plus", 16) + " Dodaj stavku", onclick: () => { s.items.push({ me: "", en: "", ru: "", de: "" }); save(); drawSvcs(); } }),
      el("h4", { text: "Cjenovnik (naziv · cijena od · jedinica)" }), lines,
      el("button", { type: "button", class: "addb", html: ic("plus", 16) + " Dodaj cijenu", onclick: () => { (s.lines = s.lines || []).push({ name: { me: "", en: "", ru: "", de: "" }, from: null, unit: s.price.unit }); save(); drawSvcs(); } })));
  });
}
function coverItem(s) {
  if (s.cover && s.cover.startsWith("m:")) { const r = MEDIA.find(x => x.id === s.cover.slice(2)); if (r) return { id: r.id, type: r.type, blob: r.blob }; }
  return { id: "u:" + s.img, u: s.img, type: "image" };
}
$("#reset").addEventListener("click", async () => {
  if (!confirm("Vratiti početne usluge, cijene i projekte? Vaše izmjene teksta i cijena biće obrisane.")) return;
  LS.del(CONTENT_KEY); C = getContent(); drawSvcs(); drawProjs(); save();
});

/* ---------- example projects */
function drawProjs() {
  const box = $("#projs");
  box.replaceChildren();
  if (!C.projects.length) box.append(el("p", { class: "muted", text: "Još nema projekata." }));
  C.projects.forEach((p, i) => {
    const ms = projMedia(p, MEDIA), cov = el("div", { class: "pa-c" });
    if (ms[0]) cov.append(mediaEl(ms[0], 300));
    const open = OPEN === p.id;
    const card = el("div", { class: "pa" }, el("div", { class: "pa-h" }, cov,
      el("div", {}, el("b", { text: (p.title[EL] || p.title.me) + (p.show === false ? " (sakriven)" : "") }), el("small", { text: [svcName(p.cat), p.place, sizeText(p)].filter(Boolean).join(" · ") })),
      el("div", { class: "pa-a" },
        el("button", { type: "button", class: "addb", text: open ? "Zatvori" : "Uredi", onclick: () => { OPEN = open ? null : p.id; drawProjs(); } }),
        iconBtn("up", "Pomjeri gore", () => { move(C.projects, i, -1); save(); drawProjs(); }, { disabled: i === 0 }),
        iconBtn("down", "Pomjeri dolje", () => { move(C.projects, i, 1); save(); drawProjs(); }, { disabled: i === C.projects.length - 1 }),
        iconBtn("trash", "Obriši projekat", async () => {
          if (!confirm("Obrisati ovaj projekat sa sajta?")) return;
          for (const ref of p.photos || []) if (ref.startsWith("m:")) await mediaDel(ref.slice(2)).catch(() => {});
          C.projects.splice(i, 1); save(); MEDIA = await mediaAll(); drawProjs();
        }, { del: true }))));
    if (open) card.append(projEditor(p));
    box.append(card);
  });
}
function projEditor(p) {
  const st = el("span", { class: "ust" });
  const upl = el("input", { type: "file", accept: "image/*,video/*", multiple: true, hidden: true, onchange: async e => {
    const r = await storeFiles(e.target.files, { proj: p.id, cat: p.cat }, (n, t) => { st.textContent = `Dodajem ${n + 1} / ${t}…`; });
    (p.photos = p.photos || []).push(...r.ids.map(id => "m:" + id));
    save(); drawProjs();
  } });
  const ph = el("div", { class: "pph" }, projMedia(p, MEDIA).map((m, i) => {
    const ref = (p.photos || []).find(r => r === m.id || r === "m:" + m.id);
    const box = el("div", { class: "ph", title: i ? "Kliknite da bude naslovna" : "Naslovna fotografija" });
    box.append(mediaEl(m, 300));
    if (i === 0) box.append(el("i", { text: "NASLOVNA" }));
    box.addEventListener("click", e => { if (e.target.closest("button") || !i) return; p.photos.splice(p.photos.indexOf(ref), 1); p.photos.unshift(ref); save(); drawProjs(); });
    box.append(el("button", { type: "button", "aria-label": "Ukloni", html: ic("x", 14), onclick: async () => {
      p.photos.splice(p.photos.indexOf(ref), 1);
      if (ref.startsWith("m:")) await mediaDel(ref.slice(2)).catch(() => {});
      save(); MEDIA = await mediaAll(); drawProjs();
    } }));
    return box;
  }), el("label", { html: ic("plus", 22) + "<span>Dodaj fotografije ili video</span>" }, upl));
  return el("div", { class: "pa-e" },
    field("Naziv projekta", tInput(p, "title")),
    el("div", { class: "three" },
      field("Usluga", selInput(p, "cat", C.services.map(s => [s.id, s.title.me]), () => drawProjs())),
      field("Lokacija", el("input", { value: p.place, oninput: e => { p.place = e.target.value; save(); } })),
      el("div", { class: "fl" }, el("label", { text: "Prikaz" }), el("label", { class: "sw" }, el("input", { type: "checkbox", checked: p.show !== false, onchange: e => { p.show = e.target.checked; save(); } }), "Prikaži na sajtu"))),
    el("div", { class: "three" },
      field("Veličina", el("div", { class: "unit" }, numInput(p, "size"), selInput(p, "su", [["m2", "m²"], ["m3", "m³"]]))),
      field("Trajanje", el("div", { class: "unit" }, numInput(p, "time"), selInput(p, "tu", [["w", "sedmica"], ["m", "mjeseci"]])))),
    field("Urađeni radovi", tInput(p, "scope", true)),
    el("h4", { text: "Fotografije i video (prva je naslovna)" }), ph, st);
}
$("#addp").addEventListener("click", () => {
  const p = { id: "p" + Date.now(), cat: C.services[0].id, show: true, place: "", size: null, su: "m2", time: null, tu: "m",
    title: { me: "Novi projekat", en: "New project", ru: "Новый проект", de: "Neues Projekt" }, scope: { me: "", en: "", ru: "", de: "" }, photos: [] };
  C.projects.unshift(p); OPEN = p.id; save(); drawProjs();
});

/* ---------- gallery */
let ITEMS = [];
function drawGal() {
  const sel = $("#ucat"), cur = sel.value;
  sel.replaceChildren(...C.services.map(s => el("option", { value: s.id, text: s.title.me })));
  if (cur) sel.value = cur;
  ITEMS = galleryItems(MEDIA);
  const g = $("#agrid");
  g.replaceChildren();
  ITEMS.forEach((it, i) => {
    const th = el("div", { class: "th" }, el("span", { class: "tag", text: it.type === "video" ? "VIDEO" : it.u && !isLoc(it.u) ? "PRIMJER" : "FOTO" }));
    th.prepend(mediaEl(it, 500));
    const cat = el("select", { "aria-label": "Kategorija" }, C.services.map(s => el("option", { value: s.id, text: s.title.me })));
    cat.value = it.cat;
    cat.addEventListener("change", async () => {
      if (it.u) { const m = LS.get("mri-cat", {}); m[it.id] = cat.value; LS.set("mri-cat", m); }
      else await mediaPut({ ...it.rec, cat: cat.value });
      MEDIA = await mediaAll();
    });
    g.append(el("div", { class: "ai" }, th, el("div", { class: "row" }, cat,
      iconBtn("up", "Pomjeri naprijed", () => reorder(i, -1), { disabled: i === 0 }),
      iconBtn("down", "Pomjeri nazad", () => reorder(i, 1), { disabled: i === ITEMS.length - 1 }),
      iconBtn("trash", "Obriši", async () => {
        if (!confirm("Obrisati " + (it.type === "video" ? "ovaj video" : "ovu fotografiju") + " sa sajta?")) return;
        if (it.u) LS.set("mri-hidden", [...new Set([...LS.get("mri-hidden", []), it.id])]);
        else await mediaDel(it.id);
        LS.set("mri-order", ITEMS.map(x => x.id).filter(x => x !== it.id));
        MEDIA = await mediaAll(); drawGal();
      }, { del: true }))));
  });
}
function reorder(i, d) { const order = ITEMS.map(x => x.id); move(order, i, d); LS.set("mri-order", order); drawGal(); }
$("#restore").addEventListener("click", () => { LS.del("mri-hidden"); drawGal(); });
async function addGallery(list) {
  const st = $("#ust");
  const r = await storeFiles(list, { cat: $("#ucat").value }, (n, t) => { st.textContent = `Dodajem ${n + 1} / ${t}…`; });
  const order = LS.get("mri-order", null);
  if (order) LS.set("mri-order", [...r.ids.slice().reverse(), ...order]);
  st.textContent = `Dodato: ${r.ids.length}. Već su vidljivi na sajtu.` + (r.skipped ? ` Preskočeno: ${r.skipped} (prevelik fajl).` : "");
  drawGal();
}
const drop = $("#drop");
$("#files").addEventListener("change", e => { addGallery(e.target.files); e.target.value = ""; });
["dragenter", "dragover"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.add("over"); }));
["dragleave", "drop"].forEach(t => drop.addEventListener(t, e => { e.preventDefault(); drop.classList.remove("over"); }));
drop.addEventListener("drop", e => addGallery(e.dataTransfer.files));

/* ---------- requests from the site */
const ANS = { area: { "<100": "do 100 m²", "100-250": "100–250 m²", ">250": "preko 250 m²", "?": "ne zna još" }, yn: { yes: "da", no: "ne", wip: "u izradi / u postupku" },
  start: { asap: "što prije", "1-3": "za 1–3 mjeseca", later: "kasnije" } };
function drawLeads() {
  const leads = LS.get("mri-leads", []), open = leads.filter(l => !l.done).length, cnt = $("#cnt");
  cnt.hidden = !open; cnt.textContent = open;
  const box = $("#leads");
  if (!leads.length) { box.innerHTML = `<p class="muted">Još nema upita. Pošaljite jedan sa <a href="../#kontakt" target="_blank" rel="noopener">sajta</a> i pojaviće se ovdje.</p>`; return; }
  box.innerHTML = leads.slice().reverse().map(l => {
    const cb = l.kind === "callback";
    const rows = cb ? [] : [["Vrsta gradnje", l.svc === "other" ? "nešto drugo" : l.svc ? svcName(l.svc) : ""], ["Grad", l.place], ["Površina", ANS.area[l.area]], ["Projekat", ANS.yn[l.proj]],
      ["Dozvola", ANS.yn[l.permit]], ["Početak", ANS.start[l.start]], ["E-mail", l.email], ["Opis", l.msg], ["Fajlovi", (l.files || []).join(", ")]].filter(r => r[1]);   // older requests also had area, design, permit, start
    return `<article class="lq${l.done ? " done" : ""}">
      <div class="lq-h"><b>${esc(l.name)}</b><span class="pill">${cb ? "Zahtjev za poziv" : "Zahtjev za predračun"}</span><time>${new Date(l.ts).toLocaleString("sr-Latn-ME", { dateStyle: "medium", timeStyle: "short" })}</time></div>
      <p>${esc(l.phone)} · jezik: ${esc((l.lang || "me").toUpperCase())}</p>
      ${rows.length ? `<dl>${rows.map(r => `<dt>${r[0]}</dt><dd>${esc(r[1])}</dd>`).join("")}</dl>` : ""}
      <div class="lq-a"><a href="tel:${esc(String(l.phone).replace(/[^\d+]/g, ""))}">Pozovi</a><a href="https://wa.me/${esc(String(l.phone).replace(/\D/g, ""))}" target="_blank" rel="noopener">WhatsApp</a>
      <button type="button" data-id="${esc(l.id)}">${l.done ? "Vrati u nove" : "Označi kao obrađen"}</button></div></article>`;
  }).join("");
  $$("button[data-id]", box).forEach(b => b.addEventListener("click", () => {
    const all = LS.get("mri-leads", []), x = all.find(l => l.id === b.dataset.id);
    if (x) { x.done = !x.done; LS.set("mri-leads", all); drawLeads(); }
  }));
}
window.addEventListener("storage", e => { if (e.key === "mri-leads") drawLeads(); });

showApp(!!LS.get("mri-auth", 0));
