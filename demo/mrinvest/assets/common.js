"use strict";
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const LANGS = ["me", "en", "ru", "de"], HTML_LANG = { me: "sr-Latn-ME", en: "en", ru: "ru", de: "de" };
let LANG = "me";
const LS = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  del(k) { try { localStorage.removeItem(k); } catch (e) {} },
};
const tr = k => { const v = T[k]; return v ? (v[LANGS.indexOf(LANG)] || v[0]) : k; };

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
  if (window.PAGE_TITLE) document.title = tr(window.PAGE_TITLE);
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
const UNS = (id, w, fit = "crop") => `https://images.unsplash.com/${id}?auto=format&fit=${fit}&w=${w}&q=72`;
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

async function galleryItems() {
  const user = (await mediaAll()).map(r => ({ id: r.id, cat: r.cat, type: r.type, blob: r.blob, ts: r.ts, rec: r }));
  const hidden = new Set(LS.get("mri-hidden", [])), catOv = LS.get("mri-cat", {});
  const defs = DEFAULTS.filter(d => !hidden.has(d.id)).map((d, i) => ({ ...d, cat: catOv[d.id] || d.cat, idx: i }));
  user.sort((a, b) => b.ts - a.ts);
  const all = [...user, ...defs], order = LS.get("mri-order", []);
  const pos = id => { const i = order.indexOf(id); return i < 0 ? Infinity : i; };
  const base = new Map(all.map((it, i) => [it.id, i]));
  return all.sort((a, b) => (pos(a.id) - pos(b.id)) || (base.get(a.id) - base.get(b.id)));
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
