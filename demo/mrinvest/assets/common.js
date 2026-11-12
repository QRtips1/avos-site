"use strict";
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const LANGS = ["me", "en", "ru", "de"], HTML_LANG = { me: "sr-Latn-ME", en: "en", ru: "ru", de: "de" };
let LANG = "me";
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} },
};
const tr = k => { const v = T[k]; return v ? (v[LANGS.indexOf(LANG)] || v[0]) : k; };
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const ic = (n, s = 18) => `<svg width="${s}" height="${s}" aria-hidden="true"><use href="#i-${n}"/></svg>`;

/* ---------- editable content: defaults from data.js, the admin's copy in this browser */
const CONTENT_KEY = "mri-content-2";
const clone = o => JSON.parse(JSON.stringify(o));
function getContent() {
  const c = LS.get(CONTENT_KEY, null);
  return c && c.v === DEFAULT_CONTENT.v && Array.isArray(c.services) ? c : clone(DEFAULT_CONTENT);
}
const saveContent = c => LS.set(CONTENT_KEY, c);
const tx = o => !o ? "" : typeof o === "string" ? o : (o[LANG] || o.me || "");
const UNIT = { m2: "€/m²", m3: "€/m³", h: "€/h", m: "€/m" };
const fmtN = n => Number(n).toLocaleString("de-DE");
const hasPrice = v => v !== null && v !== undefined && v !== "" && !isNaN(Number(v));
function unitText(u) { return u === "job" ? tr("u_job") : (UNIT[u] || "€"); }
function priceText(from, unit) { return hasPrice(from) ? `${tr("p_from")} ${fmtN(from)} ${unitText(unit)}` : tr("p_req"); }
function priceBig(from, unit) {
  return hasPrice(from) ? `<span>${esc(tr("p_from"))}</span><b>${esc(fmtN(from))}</b><span>${esc(unitText(unit))}</span>` : `<b class="req">${esc(tr("p_req"))}</b>`;
}
function plural(n, key) {
  const f = tr(key).split("|");
  if (f.length === 2) return n === 1 ? f[0] : f[1];
  const a = n % 10, b = n % 100;
  return a === 1 && b !== 11 ? f[0] : a >= 2 && a <= 4 && (b < 12 || b > 14) ? f[1] : f[2];
}
const sizeText = p => hasPrice(p.size) ? `${fmtN(p.size)} ${p.su === "m3" ? "m³" : "m²"}` : "";
const timeText = p => hasPrice(p.time) ? `${p.time} ${plural(Number(p.time), p.tu === "w" ? "tw" : "tm")}` : "";

function applyLang(l) {
  if (!LANGS.includes(l)) l = "me";
  LANG = l; LS.set("mri-lang", l);
  document.documentElement.lang = HTML_LANG[l];
  $$("[data-i18n]").forEach(e => { e.textContent = tr(e.dataset.i18n); });
  $$("[data-i18n-ph]").forEach(e => { e.placeholder = tr(e.dataset.i18nPh); });
  $$("[data-i18n-aria]").forEach(e => e.setAttribute("aria-label", tr(e.dataset.i18nAria)));
  $$("[data-i18n-list]").forEach(e => {
    const v = L[e.dataset.i18nList], list = v[LANGS.indexOf(l)] || v[0];
    e.replaceChildren(...list.map(x => { const li = document.createElement("li"); li.textContent = x; return li; }));
  });
  $$(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
  document.dispatchEvent(new CustomEvent("langchange"));
}
function startLang() {
  const q = new URLSearchParams(location.search).get("lang");
  applyLang(q || LS.get("mri-lang", "me"));
  $$(".lang button").forEach(b => b.addEventListener("click", e => {
    const g = b.closest(".lang");   // on phones only the current language shows; the first tap opens the list
    if (matchMedia("(max-width:600px)").matches && !g.classList.contains("open")) { g.classList.add("open"); e.stopPropagation(); return; }
    g.classList.remove("open"); applyLang(b.dataset.lang);
  }));
  document.addEventListener("click", e => { if (!e.target.closest(".lang")) $$(".lang.open").forEach(g => g.classList.remove("open")); });
}

/* ---------- photos and videos: examples (Unsplash) + the owner's uploads (IndexedDB in the demo) */
const ASSETS = new URL(".", document.currentScript ? document.currentScript.src : location.href).href;   // .../assets/
const isLoc = id => String(id).startsWith("mr/");     // the owner's photos shipped with the site (assets/img)
const UNS = (id, w, fit = "crop") => isLoc(id) ? `${ASSETS}img/${id.slice(3)}-${w <= 800 ? "s" : "l"}.jpg`
  : `https://images.unsplash.com/${id}?auto=format&fit=${fit}&w=${w}&q=72`;
const srcsetOf = (id, widths) => { if (!isLoc(id)) return widths.map(w => `${UNS(id, w)} ${w}w`).join(", ");
  const z = (typeof LOCAL !== "undefined" && LOCAL[id.slice(3)]) || [800, 1600]; return `${UNS(id, 1)} ${z[0]}w` + (z[1] > z[0] ? `, ${UNS(id, 9999)} ${z[1]}w` : ""); };
const IDB = { name: "mrinvest-demo", store: "media" };
let _db = null;
function idb() {
  if (_db) return _db;
  _db = new Promise((res, rej) => {
    if (!("indexedDB" in window)) return rej(new Error("no indexedDB"));
    const r = indexedDB.open(IDB.name, 1);
    r.onupgradeneeded = () => r.result.createObjectStore(IDB.store, { keyPath: "id" });
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  });
  return _db;
}
function idbReq(mode, fn) {
  return idb().then(db => new Promise((res, rej) => {
    const tx = db.transaction(IDB.store, mode), q = fn(tx.objectStore(IDB.store));
    tx.oncomplete = () => res(q && q.result);
    tx.onerror = () => rej(tx.error);
    tx.onabort = () => rej(tx.error);
  }));
}
const mediaAll = () => idbReq("readonly", s => s.getAll()).catch(() => []);
const mediaPut = o => idbReq("readwrite", s => s.put(o));
const mediaDel = id => idbReq("readwrite", s => s.delete(id));

/* gallery = uploads without a project + example photos, in the admin's order */
function galleryItems(all) {
  const user = all.filter(r => !r.proj).map(r => ({ id: r.id, cat: r.cat, type: r.type, blob: r.blob, ts: r.ts, rec: r }));
  const hidden = new Set(LS.get("mri-hidden", [])), catOv = LS.get("mri-cat", {});
  const defs = DEFAULTS.filter(d => !hidden.has(d.id)).map(d => ({ ...d, cat: catOv[d.id] || d.cat }));
  user.sort((a, b) => b.ts - a.ts);
  const list = [...user, ...defs], order = LS.get("mri-order", []);
  const pos = id => { const i = order.indexOf(id); return i < 0 ? Infinity : i; };
  const base = new Map(list.map((it, i) => [it.id, i]));
  return list.sort((a, b) => (pos(a.id) - pos(b.id)) || (base.get(a.id) - base.get(b.id)));
}
/* project photos: "u:<unsplash id>" or "m:<upload id>" */
function projMedia(p, all) {
  const byId = new Map(all.map(r => [r.id, r]));
  return (p.photos || []).map(ref => {
    if (ref.startsWith("u:")) return { id: ref, u: ref.slice(2), type: "image" };
    const r = byId.get(ref.slice(2));
    return r ? { id: r.id, type: r.type, blob: r.blob } : null;
  }).filter(Boolean);
}
const _urls = new Map();
function mediaURL(it, w) {
  if (it.u) return w === "full" ? UNS(it.u, 1800, "max") : UNS(it.u, w || 800);
  if (!_urls.has(it.id)) _urls.set(it.id, URL.createObjectURL(it.blob));
  return _urls.get(it.id);
}
function mediaEl(it, w, opts = {}) {
  if (it.type === "video") {
    const v = document.createElement("video");
    v.playsInline = true; v.preload = "metadata"; v.muted = !opts.controls;
    if (opts.controls) { v.controls = true; v.autoplay = true; }
    else v.addEventListener("loadedmetadata", () => { try { v.currentTime = Math.min(0.5, v.duration / 2 || 0); } catch (e) {} }, { once: true });
    v.src = mediaURL(it);
    return v;
  }
  const im = new Image();
  im.alt = ""; im.decoding = "async";
  if (!opts.eager) im.loading = "lazy";
  im.src = mediaURL(it, w);
  im.onerror = () => im.remove();
  return im;
}
