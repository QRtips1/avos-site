"use strict";
window.PAGE_TITLE = "t_home";
const ICO = n => `<svg width="22" height="22" aria-hidden="true"><use href="#i-${n}"/></svg>`;

/* header menu on phones */
const hdr = $(".hdr"), mb = $(".menu-btn");
mb.addEventListener("click", () => { const o = hdr.classList.toggle("open"); mb.setAttribute("aria-expanded", String(o)); });
$$("#nav a").forEach(a => a.addEventListener("click", () => { hdr.classList.remove("open"); mb.setAttribute("aria-expanded", "false"); }));

/* "request a quote" under a service preselects it in the form */
$$("[data-svc]").forEach(a => a.addEventListener("click", () => { $("#ft").value = a.dataset.svc; }));

/* gallery */
let ITEMS = [], VIEW = [], FILTER = "all", CUR = 0;
async function loadGallery() { ITEMS = await galleryItems(); drawGallery(); }
function drawGallery() {
  VIEW = ITEMS.filter(i => FILTER === "all" || i.cat === FILTER);
  const g = $("#grid");
  g.replaceChildren();
  if (!VIEW.length) { g.innerHTML = `<p class="empty">${tr("pj_empty")}</p>`; return; }
  VIEW.forEach((it, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "tile"; b.setAttribute("aria-label", tr("c_" + it.cat));
    b.append(mediaEl(it, 800));
    if (it.type === "video") b.insertAdjacentHTML("beforeend", `<span class="play">${ICO("play")}</span>`);
    b.addEventListener("click", () => openLb(i));
    g.append(b);
  });
}
$$(".filters button").forEach(b => b.addEventListener("click", () => {
  FILTER = b.dataset.f;
  $$(".filters button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  drawGallery();
}));
document.addEventListener("langchange", () => { if (ITEMS.length) drawGallery(); });

/* lightbox */
const lb = $("#lb");
function drawLb() {
  const it = VIEW[CUR];
  $("#lbm").replaceChildren(mediaEl(it, "full", { controls: true, eager: true }));
  $("#lbc").textContent = `${tr("c_" + it.cat)} · ${CUR + 1} / ${VIEW.length}`;
}
function openLb(i) { CUR = i; lb.hidden = false; document.body.style.overflow = "hidden"; drawLb(); }
function closeLb() { lb.hidden = true; document.body.style.overflow = ""; $("#lbm").replaceChildren(); }
const step = d => { CUR = (CUR + d + VIEW.length) % VIEW.length; drawLb(); };
$(".x", lb).addEventListener("click", closeLb);
$(".pv", lb).addEventListener("click", () => step(-1));
$(".nx", lb).addEventListener("click", () => step(1));
lb.addEventListener("click", e => { if (e.target === lb || e.target.id === "lbm") closeLb(); });
document.addEventListener("keydown", e => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeLb();
  if (e.key === "ArrowLeft") step(-1);
  if (e.key === "ArrowRight") step(1);
});
let tx = null;
lb.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener("touchend", e => {
  if (tx === null) return;
  const dx = e.changedTouches[0].clientX - tx; tx = null;
  if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
});

/* request form: in the demo requests go to the admin panel (this browser) */
$("#form").addEventListener("submit", e => {
  e.preventDefault();
  const f = e.target, m = $("#fmsg"), d = Object.fromEntries(new FormData(f));
  if (!d.name.trim() || !d.phone.trim()) { m.className = "msg err"; m.textContent = tr("f_err"); return; }
  const leads = LS.get("mri-leads", []);
  leads.push({ id: "q" + Date.now(), ts: Date.now(), lang: LANG, done: false, ...d });
  LS.set("mri-leads", leads);
  if (window.gtag) gtag("event", "demo_form_submit", { demo: "mrinvest" });
  f.reset();
  m.className = "msg ok"; m.textContent = tr("f_ok");
});

startLang();
loadGallery();
window.addEventListener("pageshow", e => { if (e.persisted) loadGallery(); });
document.addEventListener("visibilitychange", () => { if (!document.hidden) loadGallery(); });
