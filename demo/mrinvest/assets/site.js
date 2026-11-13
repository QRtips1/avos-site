"use strict";
const P = window.PREFIX || "./";
const PAGE = document.body.dataset.page, PSVC = document.body.dataset.svc;
const CHAIN = ["earth", "rough", "house"];          // the order of the work on site
let C = getContent(), MEDIA = [], FILTER = new URLSearchParams(location.search).get("f") || "all", VIEW = [], CUR = 0;   // ?f=earth: a service page's "All projects" link
const svcById = id => C.services.find(s => s.id === id);
const visSvcs = () => C.services.filter(s => s.show !== false);
const svcURL = s => `${P}${s.slug}/`;

/* images */
function uimg(pid, widths, sizes, eager) {
  const set = srcsetOf(pid, widths);
  return `<img src="${UNS(pid, widths[widths.length - 1])}" srcset="${set}" sizes="${sizes}" alt=""${eager ? "" : ' loading="lazy"'} onerror="this.remove()">`;
}
function coverOf(s) {             // a service photo: the owner's upload or the example
  if (s.cover && s.cover.startsWith("m:")) { const r = MEDIA.find(x => x.id === s.cover.slice(2)); if (r) return { id: r.id, type: r.type, blob: r.blob }; }
  return { id: "u:" + s.img, u: s.img, type: "image" };
}
function put(box, it, widths, sizes, eager) {
  if (it.u) box.insertAdjacentHTML("afterbegin", uimg(it.u, widths, sizes, eager));
  else box.prepend(mediaEl(it, 1200, { eager }));
}
const prSmall = (from, unit) => hasPrice(from) ? `${esc(tr("p_from"))} <b>${esc(fmtN(from))} ${esc(unitText(unit))}</b>` : `<b>${esc(tr("p_req"))}</b>`;

/* ---------- blocks */
const R = {
  strip(box) {
    box.innerHTML = visSvcs().map((s, i) => `<a class="sc rv" href="${svcURL(s)}"><div class="sc-i" data-cover="${s.id}"></div>
      <div class="sc-t"><span class="sc-n">0${i + 1}</span><h3>${esc(tx(s.title))}</h3><span class="pr">${prSmall(s.price.from, s.price.unit)}</span></div><span class="go">${ic("arrow")}</span></a>`).join("");
  },
  chain(box) {
    let n = 0;
    box.innerHTML = CHAIN.map(svcById).filter(s => s && s.show !== false).map(s => `<li><a class="ch rv" href="${svcURL(s)}"><span class="ch-ic">${ic(s.id, 28)}</span>
      <div><small>${esc(tr("ch_stage"))} ${++n}</small><h3>${esc(tx(s.title))}</h3><p>${esc(tx(s.lead))}</p><div class="pr">${prSmall(s.price.from, s.price.unit)}</div></div></a></li>`).join("");
  },
  featured(box) {
    const s = visSvcs()[0];
    if (!s) { box.hidden = true; return; }
    box.hidden = false;
    box.innerHTML = `<div class="ft-img" data-cover="${s.id}"></div><div class="ft-t rv">
      <span class="eyebrow">${esc(tr("ft_eyebrow"))}</span><h2>${esc(tx(s.title))}</h2><p>${esc(tx(s.lead))}</p>
      <div class="bigp">${priceBig(s.price.from, s.price.unit)}</div>
      <ul class="checks">${s.items.map(x => `<li>${esc(tx(x))}</li>`).join("")}</ul>
      <div class="hbtns"><a class="btn btn-acc" href="${svcURL(s)}">${esc(tr("more"))}</a><a class="btn btn-ghost" href="#kontakt" data-pick="${s.id}">${esc(tr("cta_quote"))}</a></div></div>`;
  },
  duo(box) { cardsDC(box, visSvcs().slice(1)); },
  others(box) { cardsDC(box, visSvcs().filter(s => s.id !== PSVC)); },
  projects(box) {
    const cat = box.dataset.cat || (box.hasAttribute("data-filter") && FILTER !== "all" ? FILTER : "");
    let list = C.projects.filter(p => p.show !== false && (!cat || p.cat === cat || (p.also || []).includes(cat)));
    if (box.dataset.limit) list = list.slice(0, +box.dataset.limit);
    const sec = box.dataset.cat && box.closest("section"); if (sec) sec.hidden = !list.length;   // a service with no projects yet: no empty block
    if (!list.length) { box.innerHTML = `<p class="empty">${esc(tr("pj_empty"))}</p>`; return; }
    box.innerHTML = list.map(p => {
      const s = svcById(p.cat), n = (p.photos || []).length;
      return `<button type="button" class="pc rv" data-pid="${esc(p.id)}"><div class="pc-i" data-pcover="${esc(p.id)}">${s ? `<span class="pc-tag">${esc(tx(s.title))}</span>` : ""}${n > 1 ? `<span class="pc-n">${n} ${ic("right", 12)}</span>` : ""}</div>
        <div class="pc-t"><h3>${esc(tx(p.title))}</h3><div class="meta">${p.place ? `<span>${ic("pin", 15)}${esc(p.place)}</span>` : ""}${sizeText(p) ? `<span><b>${esc(sizeText(p))}</b></span>` : ""}${timeText(p) ? `<span>${esc(timeText(p))}</span>` : ""}</div></div></button>`;
    }).join("");
    $$("[data-pcover]", box).forEach(el => { const p = C.projects.find(x => x.id === el.dataset.pcover), m = projMedia(p, MEDIA)[0]; if (m) put(el, m, [600, 900], "(max-width:600px) 100vw, 33vw"); });
    $$("[data-pid]", box).forEach(b => b.addEventListener("click", () => openProject(b.dataset.pid)));
  },
  prices(box) {
    box.innerHTML = visSvcs().map(s => pcardHTML(s)).join("");
  },
  media(box) {
    const cat = box.dataset.cat || (box.hasAttribute("data-filter") && FILTER !== "all" ? FILTER : "");
    const list = galleryItems(MEDIA).filter(i => !cat || i.cat === cat);
    box.replaceChildren();
    if (!list.length) { box.innerHTML = `<p class="empty">${esc(tr("pj_empty"))}</p>`; return; }
    list.forEach((it, i) => {
      const b = document.createElement("button");
      b.type = "button"; b.className = "tile";
      const s = svcById(it.cat); b.setAttribute("aria-label", s ? tx(s.title) : "");
      b.append(mediaEl(it, 600));
      if (it.type === "video") b.insertAdjacentHTML("beforeend", `<span class="play">${ic("play", 22)}</span>`);
      b.addEventListener("click", () => openLb(list, i));
      box.append(b);
    });
  },
  filters(box) {
    if (FILTER !== "all" && !visSvcs().some(s => s.id === FILTER)) FILTER = "all";
    const btn = (v, label) => `<button type="button" data-f="${v}" aria-pressed="${FILTER === v}">${esc(label)}</button>`;
    box.innerHTML = btn("all", tr("f_all")) + visSvcs().map(s => btn(s.id, tx(s.title))).join("");
    $$("button", box).forEach(b => b.addEventListener("click", () => { FILTER = b.dataset.f; renderAll(); }));
  },
  "svc-hero"(box) {
    const s = svcById(PSVC); if (!s) return;
    $("[data-x=lead]", box).textContent = tx(s.lead);
    $("[data-x=price]", box).innerHTML = priceBig(s.price.from, s.price.unit);
    if (s.cover && s.cover.startsWith("m:")) { const it = coverOf(s); if (!it.u) { $("img", box)?.remove(); box.prepend(mediaEl(it, 1600, { eager: true })); box.firstChild.className = "cov"; } }
  },
};
function pcardHTML(s, solo) {
  return `<div class="pcard rv"><h3>${esc(tx(s.title))}</h3><div class="bigp">${priceBig(s.price.from, s.price.unit)}</div>
    <ul class="plines">${(s.lines || []).map(l => `<li><span>${esc(tx(l.name))}</span><b>${esc(priceText(l.from, l.unit))}</b></li>`).join("")}</ul>
    ${solo ? `<p class="small muted" style="margin:0 0 18px">${esc(tr("pc_note"))}</p>` : ""}
    <a class="btn ${solo ? "btn-acc" : "btn-line"}" href="#kontakt" data-pick="${s.id}">${esc(tr("cta_quote"))}</a></div>`;
}
function cardsDC(box, list) {
  box.innerHTML = list.map(s => `<a class="dc rv" href="${svcURL(s)}" data-cover="${s.id}"><div class="dc-t"><small>${esc(tr("nav_services")).toUpperCase()}</small><h3>${esc(tx(s.title))}</h3><p>${esc(tx(s.lead))}</p>
    <div class="row"><b>${esc(priceText(s.price.from, s.price.unit))}</b><span>${esc(tr("more"))}${ic("arrow")}</span></div></div></a>`).join("");
}
function renderAll() {
  $$("[data-r]").forEach(box => { const f = R[box.dataset.r]; if (f) f(box); });
  $$("[data-cover]").forEach(el => { const s = svcById(el.dataset.cover); if (s && !el.querySelector("img,video")) put(el, coverOf(s), [640, 1000, 1600], el.classList.contains("ft-img") ? "(max-width:900px) 100vw, 55vw" : "(max-width:900px) 80vw, 40vw"); });
  if (PAGE === "service") {
    const s = svcById(PSVC);
    if (s) {
      $("[data-x=items]").innerHTML = s.items.map(x => `<li>${esc(tx(x))}</li>`).join("");
      $("[data-x=pcard]").innerHTML = pcardHTML(s, true).replace('class="pcard rv"', 'class="pc-in"');
      document.title = `${tx(s.title)} · MR Invest Miljanić`;
    }
  } else if (window.PAGE_TITLE && T[window.PAGE_TITLE]) document.title = tr(window.PAGE_TITLE);
  $$("[data-svc-title]").forEach(e => { const s = svcById(e.dataset.svcTitle); if (s) { e.textContent = tx(s.title); const l = e.closest("label, a, option"); if (l) { l.hidden = s.show === false; if (l.tagName === "OPTION") l.disabled = l.hidden; } } });
  bindPick();
  reveal();
}

/* reveal on scroll */
let io = null;
function reveal() {
  const els = $$(".rv:not(.in)");
  if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
  io = io || new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
  els.forEach(e => io.observe(e));
}

/* header */
const hdr = $(".hdr"), mb = $(".menu-btn"), dd = $(".dd");
mb.addEventListener("click", () => { const o = hdr.classList.toggle("open"); mb.setAttribute("aria-expanded", String(o)); });
$(".dd-b").addEventListener("click", e => { e.stopPropagation(); const o = dd.classList.toggle("open"); $(".dd-b").setAttribute("aria-expanded", String(o)); });
document.addEventListener("click", e => { if (!e.target.closest(".dd")) dd.classList.remove("open"); });
$$("#nav a").forEach(a => a.addEventListener("click", () => { hdr.classList.remove("open"); dd.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); }));

/* lightbox */
const lb = $("#lb");
function drawLb() {
  const it = VIEW[CUR], s = svcById(it.cat);
  $("#lbm").replaceChildren(mediaEl(it, "full", { controls: true, eager: true }));
  $("#lbc").textContent = `${s ? tx(s.title) + " · " : ""}${CUR + 1} / ${VIEW.length}`;
}
function openLb(list, i) { VIEW = list; CUR = i; lb.hidden = false; document.body.style.overflow = "hidden"; drawLb(); }
function closeLb() { lb.hidden = true; document.body.style.overflow = ""; $("#lbm").replaceChildren(); }
const step = d => { CUR = (CUR + d + VIEW.length) % VIEW.length; drawLb(); };
$(".x", lb).addEventListener("click", closeLb);
$(".pv", lb).addEventListener("click", () => step(-1));
$(".nx", lb).addEventListener("click", () => step(1));
lb.addEventListener("click", e => { if (e.target === lb || e.target.id === "lbm") closeLb(); });
let tx0 = null;
lb.addEventListener("touchstart", e => { tx0 = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => { if (tx0 === null) return; const dx = e.changedTouches[0].clientX - tx0; tx0 = null; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); });

/* modals: project details, callback */
function openModal(m) { m.hidden = false; document.body.style.overflow = "hidden"; }
function closeModal(m) { m.hidden = true; if (lb.hidden) document.body.style.overflow = ""; }
$$(".modal").forEach(m => {
  m.addEventListener("click", e => { if (e.target === m || e.target.closest("[data-close]")) closeModal(m); });
});
document.addEventListener("keydown", e => {
  if (!lb.hidden) { if (e.key === "Escape") closeLb(); else if (e.key === "ArrowLeft") step(-1); else if (e.key === "ArrowRight") step(1); return; }
  if (e.key === "Escape") $$(".modal:not([hidden])").forEach(closeModal);
});

function openProject(pid) {
  const p = C.projects.find(x => x.id === pid); if (!p) return;
  const s = svcById(p.cat), ms = projMedia(p, MEDIA);
  const box = $("#pmb");
  box.innerHTML = `<div class="pm"><div class="pm-g"><div class="pm-main"></div><div class="pm-th"></div></div>
    <div class="pm-t">${s ? `<span class="eyebrow">${esc(tx(s.title))}</span>` : ""}<h3>${esc(tx(p.title))}</h3>
    <dl>${p.place ? `<dt>${esc(tr("lb_place"))}</dt><dd>${esc(p.place)}</dd>` : ""}${sizeText(p) ? `<dt>${esc(tr("lb_size"))}</dt><dd>${esc(sizeText(p))}</dd>` : ""}${timeText(p) ? `<dt>${esc(tr("lb_time"))}</dt><dd>${esc(timeText(p))}</dd>` : ""}</dl>
    ${tx(p.scope) ? `<div><b class="small">${esc(tr("lb_scope"))}</b><p>${esc(tx(p.scope))}</p></div>` : ""}
    <a class="btn btn-acc" href="#kontakt" data-pick="${esc(p.cat)}" data-close>${esc(tr("pj_like"))}</a></div></div>`;
  const main = $(".pm-main", box), th = $(".pm-th", box);
  let cur = 0;
  const show = i => {
    cur = i;
    main.replaceChildren(mediaEl(ms[i], "full", { controls: ms[i].type === "video", eager: true }));
    $$("button", th).forEach((b, j) => b.setAttribute("aria-current", String(i === j)));
  };
  ms.forEach((m, i) => { const b = document.createElement("button"); b.type = "button"; b.append(mediaEl(m, 200)); b.addEventListener("click", () => show(i)); th.append(b); });
  if (ms.length) show(0);
  if (ms.length < 2) th.hidden = true;
  main.addEventListener("click", e => { if (ms.length && e.target.tagName !== "VIDEO") openLb(ms.map(m => ({ ...m, cat: p.cat })), cur); });
  bindPick();
  openModal($("#pm"));
}

/* quote request: type of construction, town, description, contact (one step) */
const bf = $("#brief");
function pick(id) { const o = $(`#btype option[value="${id}"]`, bf); if (o && !o.disabled) $("#btype", bf).value = id; }
function bindPick() { $$("[data-pick]:not([data-bound])").forEach(a => { a.dataset.bound = "1"; a.addEventListener("click", () => { pick(a.dataset.pick); if (a.closest(".modal")) closeModal(a.closest(".modal")); }); }); }
function saveLead(o) {
  const leads = LS.get("mri-leads", []);
  leads.push({ id: "q" + Date.now(), ts: Date.now(), lang: LANG, done: false, ...o });
  LS.set("mri-leads", leads);
  if (window.gtag) gtag("event", "demo_form_submit", { demo: "mrinvest", kind: o.kind });
}
bf.addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(bf)), m = $("#bmsgx");
  if (!String(d.name || "").trim() || !String(d.phone || "").trim()) { m.className = "msg err"; m.textContent = tr("f_err"); return; }
  const files = [...$("#bfiles").files].map(f => f.name);
  delete d.files;
  saveLead({ kind: "brief", ...d, files });
  m.className = "msg"; m.textContent = "";
  $(".bfields", bf).hidden = true;
  $(".bdone", bf).hidden = false;
});
$("[data-again]", bf).addEventListener("click", () => { bf.reset(); $(".bdone", bf).hidden = true; $(".bfields", bf).hidden = false; if (PSVC) pick(PSVC); });

/* awards: full size in the lightbox */
const AW = typeof AWARDS !== "undefined" ? AWARDS.map((u, i) => ({ id: "aw" + i, u, type: "image" })) : [];
$$("[data-aw]").forEach(b => b.addEventListener("click", () => openLb(AW, +b.dataset.aw)));

/* callback */
$$("[data-callback]").forEach(b => b.addEventListener("click", () => { $("#cbm").className = "msg"; openModal($("#cb")); setTimeout(() => $("#cbn").focus(), 50); }));
$("#cbf").addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target)), m = $("#cbm");
  if (!String(d.name || "").trim() || !String(d.phone || "").trim()) { m.className = "msg err"; m.textContent = tr("f_err"); return; }
  saveLead({ kind: "callback", ...d });
  e.target.reset(); m.className = "msg ok"; m.textContent = tr("cb_ok");
});

/* start */
let SIG = "";
async function load() {   // re-render only when the admin changed something (another tab)
  const c = getContent(), m = await mediaAll();
  const sig = JSON.stringify(c) + m.map(r => r.id + r.cat + (r.proj || "")).join() + JSON.stringify([LS.get("mri-order", []), LS.get("mri-hidden", []), LS.get("mri-cat", {})]);
  if (sig === SIG) return;
  SIG = sig; C = c; MEDIA = m; renderAll();
}
document.addEventListener("langchange", () => { if (MEDIA) renderAll(); });
startLang();
if (PSVC) pick(PSVC);
load();
window.addEventListener("storage", e => { if (e.key && e.key.startsWith("mri-") && e.key !== "mri-lang" && e.key !== "mri-leads") load(); });
document.addEventListener("visibilitychange", () => { if (!document.hidden) load(); });
