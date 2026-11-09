const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const KEY = "limo-rent-demo-v1";
let lang = "me";
const LOC = { me: "sr-Latn-ME", en: "en-GB", ru: "ru-RU", de: "de-DE" }, HTML_LANG = { me: "sr-Latn-ME", en: "en", ru: "ru", de: "de" };
const LANGS = ["me", "en", "ru", "de"], LI = () => Math.max(0, LANGS.indexOf(lang));
const tr = (k, v) => { let s = T[lang][k] != null ? T[lang][k] : (T.me[k] != null ? T.me[k] : k); if (v) for (const x in v) s = s.split("{" + x + "}").join(v[x]); return s; };
const escH = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ev = (name, extra) => { if (window.gtag) gtag("event", name, Object.assign({ language: lang, demo: "limo-rent" }, extra || {})); };
const icon = n => `<svg class="ico" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const eur = n => { const s = Number(n).toLocaleString(LOC[lang], { maximumFractionDigits: 2 }); return lang === "en" ? "€" + s : s + " €"; };

/* ---------- dates (local, as YYYY-MM-DD) */
const TODAY = (() => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; })();
const iso = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const fromIso = s => { const [y, m, d] = s.split("-").map(Number); return new Date(y, m - 1, d); };
const addD = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const TODAY_S = iso(TODAY);
const fmtD = s => { const d = fromIso(s); return `${d.getDate()}.${d.getMonth() + 1}.`; };
const nDays = (a, z) => Math.max(1, Math.round((fromIso(z) - fromIso(a)) / 864e5));
const daysWord = n => {
  const a = n % 10, b = n % 100;
  if (lang === "en") return n === 1 ? "day" : "days";
  if (lang === "de") return n === 1 ? "Tag" : "Tage";
  if (lang === "ru") return a === 1 && b !== 11 ? "сутки" : "суток";
  return a === 1 && b !== 11 ? "dan" : "dana";
};

/* ---------- demo data, kept in this browser so the admin panel and the site share it */
function defaults(){
  const span = ([a, b]) => { const r = []; for (let i = a; i <= b; i++) r.push(iso(addD(TODAY, i))); return r; };
  return {
    cars: DEF_CARS.map(c => { const x = JSON.parse(JSON.stringify(c)); x.busy = x.off.flatMap(span); delete x.off; x.photos = []; return x; }),
    requests: DEF_REQ.map(r => { const x = Object.assign({}, r); x.d1 = iso(addD(TODAY, r.a)); x.d2 = r.b != null ? iso(addD(TODAY, r.b)) : null; x.created = iso(addD(TODAY, r.c));
      delete x.a; delete x.b; delete x.c; const car = DEF_CARS.find(c => c.id === r.car); x.carName = car.name;
      if (x.type === "rent") { x.days = nDays(x.d1, x.d2); x.total = x.days * car.price; } else x.est = 0; return x; }),
    seq: 100
  };
}
let DB;
function load(){ try { const d = JSON.parse(localStorage.getItem(KEY) || "null"); if (d && Array.isArray(d.cars)) { DB = d; return; } } catch (e) {} DB = defaults(); }
function save(){ try { localStorage.setItem(KEY, JSON.stringify(DB)); return true; } catch (e) { return false; } }
load();
window.addEventListener("storage", e => { if (e.key === KEY) { load(); if (window.render) render(); } });
const byId = id => DB.cars.find(c => c.id === +id);
const busySet = c => new Set(c.busy || []);
const descOf = c => (c.desc && (c.desc[lang] || (lang !== "me" && c.desc.en) || c.desc.me)) || "";
function freeFrom(c){ const b = busySet(c); let d = TODAY; for (let i = 0; i < 400 && b.has(iso(d)); i++) d = addD(d, 1); return iso(d); }
function rangeFree(c, a, z){ const b = busySet(c); for (let d = fromIso(a); iso(d) <= z; d = addD(d, 1)) if (b.has(iso(d))) return false; return true; }
function avLine(c, a, z){
  if (a) { const ok = rangeFree(c, a, z || a); return [ok, tr(ok ? (z ? "avail_ok" : "avail_day_ok") : (z ? "avail_no" : "avail_day_no"))]; }
  const f = freeFrom(c); return [f === TODAY_S, f === TODAY_S ? tr("avail_today") : tr("avail_from", { d: fmtD(f) })];
}
const placeName = k => { const p = PLACES.find(x => x[0] === k); return p ? p[1 + LI()] : k; };

/* ---------- cars drawn from the side until the owner uploads photos */
const BODY = {
  sedan: { d: "M40 150C40 132 46 122 62 118L122 110C150 84 182 70 216 66L298 64C328 66 350 80 374 104L420 112C440 116 452 124 454 138L454 150C454 156 450 160 444 160L404 160A36 36 0 0 0 332 160L164 160A36 36 0 0 0 92 160L50 160C44 160 40 156 40 150Z",
    glass: ["M136 110C160 89 186 77 214 75L252 74L252 108Z", "M260 74L296 73C322 75 340 87 358 106L260 108Z"], w: [128, 368], wy: 160, wr: 29,
    head: "M432 118L452 128L451 135L428 128Z", tail: "M42 124L62 120L63 131L42 133Z", line: "M70 124L440 128", door: "M256 110L256 156" },
  suv: { d: "M36 146C36 120 40 104 56 100L96 96C110 70 124 56 150 52L330 50C352 52 368 66 388 92L432 100C448 104 456 114 456 130L456 146C456 152 452 156 446 156L408 156A38 38 0 0 0 330 156L172 156A38 38 0 0 0 94 156L46 156C40 156 36 152 36 146Z",
    glass: ["M108 96C120 74 134 62 156 60L238 59L238 96Z", "M246 59L326 58C346 60 360 72 376 94L246 96Z"], w: [133, 369], wy: 158, wr: 31,
    head: "M434 106L454 116L454 124L430 116Z", tail: "M38 108L56 104L57 118L38 120Z", line: "M60 112L444 116", door: "M242 98L242 152" },
  van: { d: "M30 148L30 80C30 62 40 52 58 50L330 48C350 48 366 56 380 72L410 104L446 112C458 115 462 124 462 136L462 148C462 154 458 158 452 158L420 158A38 38 0 0 0 344 158L160 158A38 38 0 0 0 84 158L40 158C34 158 30 154 30 148Z",
    glass: ["M46 62L128 60L128 98L46 100Z", "M138 60L236 58L236 98L138 98Z", "M246 58L330 57C346 58 358 66 368 78L390 100L246 98Z"], w: [122, 382], wy: 160, wr: 30,
    head: "M440 114L458 122L458 130L436 124Z", tail: "M32 92L42 92L42 116L32 116Z", line: "M34 112L452 118", door: "M240 100L240 154" },
  hatch: { d: "M60 148C60 124 66 110 82 106L96 100C112 74 132 60 162 58L266 58C292 60 312 76 336 100L384 108C404 112 414 120 416 136L416 148C416 154 412 158 406 158L370 158A34 34 0 0 0 302 158L176 158A34 34 0 0 0 108 158L70 158C64 158 60 154 60 148Z",
    glass: ["M106 100C122 78 140 66 164 66L214 66L214 100Z", "M222 66L264 66C286 68 304 82 322 100L222 100Z"], w: [142, 336], wy: 160, wr: 28,
    head: "M396 112L414 122L414 128L392 120Z", tail: "M62 112L80 108L81 120L62 122Z", line: "M80 116L404 120", door: "M218 102L218 154" }
};
const lum = hex => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * (n >> 8 & 255) + 0.114 * (n & 255)) / 255; };
function carSVG(body, hex){
  const b = BODY[body] || BODY.sedan, dark = lum(hex) < .35;
  const edge = dark ? "rgba(255,255,255,.22)" : "rgba(0,0,0,.28)", ln = dark ? "rgba(255,255,255,.14)" : "rgba(0,0,0,.16)";
  const wheel = x => `<circle cx="${x}" cy="${b.wy}" r="${b.wr}" fill="#16181C"/><circle cx="${x}" cy="${b.wy}" r="${b.wr * .58}" fill="#9BA1A9"/><circle cx="${x}" cy="${b.wy}" r="${b.wr * .46}" fill="#C9CED5"/>` +
    `<circle cx="${x}" cy="${b.wy}" r="${b.wr * .14}" fill="#5E646C"/><path d="M${x} ${b.wy - b.wr * .44}V${b.wy + b.wr * .44}M${x - b.wr * .44} ${b.wy}H${x + b.wr * .44}" stroke="#8A9098" stroke-width="2.4"/>`;
  return `<svg class="car" viewBox="0 0 500 200" role="img" aria-hidden="true"><ellipse cx="248" cy="184" rx="214" ry="9" fill="rgba(0,0,0,.22)"/>` +
    `<path d="${b.d}" fill="${hex}"/><path d="${b.d}" fill="url(#cs)"/>` + b.glass.map(g => `<path d="${g}" fill="url(#cg)"/><path d="${g}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.2"/>`).join("") +
    `<path d="${b.line}" stroke="${ln}" stroke-width="2" fill="none"/><path d="${b.door}" stroke="${ln}" stroke-width="2"/>` +
    `<path d="${b.head}" fill="#F6F1E3"/><path d="${b.tail}" fill="#C0271D"/><path d="${b.d}" fill="none" stroke="${edge}" stroke-width="1.6"/>` + b.w.map(wheel).join("") + `</svg>`;
}
const carPic = (c, i = 0) => c.photos && c.photos.length ? `<img src="${c.photos[Math.min(i, c.photos.length - 1)]}" alt="${escH(c.name)}">` : carSVG(c.body, c.color);

/* ---------- calendar: range (rent), single day (limo) or toggle busy days (admin) */
const WD = { me: ["Po", "Ut", "Sr", "Če", "Pe", "Su", "Ne"], en: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], ru: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"], de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"] };
function Cal(el, o){
  let m0 = 0;
  if (o.start) { const s = fromIso(o.start); m0 = Math.max(0, (s.getFullYear() - TODAY.getFullYear()) * 12 + s.getMonth() - TODAY.getMonth()); }
  const two = () => el.classList.contains("two") && el.clientWidth >= 540;
  const cls = s => {
    if (o.mode === "toggle" || !o.start) return "";
    if (s === o.start || s === o.end) return " sel";
    return o.end && s > o.start && s < o.end ? " in" : "";
  };
  const month = off => {
    const first = new Date(TODAY.getFullYear(), TODAY.getMonth() + off, 1), dim = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
    let h = `<div><div class="cal-t">${(m => m.charAt(0).toUpperCase() + m.slice(1))(first.toLocaleDateString(LOC[lang], { month: "long", year: "numeric" }))}</div><div class="cal-g">${WD[lang].map(w => `<b>${w}</b>`).join("")}`;
    for (let i = 0; i < (first.getDay() + 6) % 7; i++) h += "<i></i>";
    for (let d = 1; d <= dim; d++) {
      const s = iso(new Date(first.getFullYear(), first.getMonth(), d)), past = s < TODAY_S, busy = o.busy.has(s);
      h += `<button type="button" class="${past ? "past" : ""}${busy ? " busy" : ""}${s === TODAY_S ? " today" : ""}${cls(s)}" data-d="${s}"${past || (busy && o.mode !== "toggle") ? " disabled" : ""}>${d}</button>`;
    }
    return h + "</div></div>";
  };
  const render = () => {
    let h = `<div class="cal-nav"><button type="button" data-m="-1"${m0 <= 0 ? " disabled" : ""} aria-label="‹">‹</button><button type="button" data-m="1"${m0 >= 11 ? " disabled" : ""} aria-label="›">›</button></div><div class="cal-ms">`;
    for (let k = 0; k < (two() ? 2 : 1); k++) h += month(m0 + k);
    el.innerHTML = h + "</div>";
  };
  el.onclick = e => {
    const nb = e.target.closest("[data-m]"); if (nb) { if (!nb.disabled) { m0 = Math.max(0, Math.min(11, m0 + +nb.dataset.m)); render(); } return; }
    const b = e.target.closest("[data-d]"); if (!b || b.disabled) return;
    const s = b.dataset.d;
    if (o.mode === "toggle") { if (o.busy.has(s)) o.busy.delete(s); else o.busy.add(s); }
    else if (o.mode === "single") { o.start = s; o.end = null; }
    else if (!o.start || o.end || s < o.start) { o.start = s; o.end = null; }
    else {
      let clash = false;
      for (let d = addD(fromIso(o.start), 1); iso(d) <= s; d = addD(d, 1)) if (o.busy.has(iso(d))) { clash = true; break; }
      if (clash) { o.start = s; o.end = null; if (o.err) o.err(); } else o.end = s;
    }
    render(); if (o.onChange) o.onChange();
  };
  render();
  return { render };
}

/* ---------- sheets (one at a time; the phone's back button closes) */
let openId = null, lastFocus = null;
function openSheet(id){
  if (!openId) { lastFocus = document.activeElement; history.pushState({ sheet: id }, "", "#" + id); }
  openId = id; $("#" + id).hidden = false; document.documentElement.classList.add("lock");
  const b = $("#" + id + " .body"); if (b) b.scrollTop = 0;
}
function closeSheet(fromPop){
  if (!openId) return;
  $("#" + openId).hidden = true; openId = null; document.documentElement.classList.remove("lock");
  if (!fromPop && history.state && history.state.sheet) history.back();
  if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
}
window.addEventListener("popstate", () => { if (openId) closeSheet(true); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeSheet(); });
document.addEventListener("click", e => { if (e.target.closest("[data-close]") || e.target.classList.contains("sheet")) closeSheet(); });
if (/^#(book|carform)$/.test(location.hash)) history.replaceState(null, "", location.pathname + location.search);

/* ---------- language */
function applyLang(l){
  if (!T[l]) l = "me";
  lang = l;
  document.documentElement.lang = HTML_LANG[l];
  document.title = tr(PAGE_TITLE);
  $$("[data-i18n]").forEach(e => { e.textContent = tr(e.dataset.i18n); });
  $$("[data-i18n-ph]").forEach(e => { e.placeholder = tr(e.dataset.i18nPh); });
  $$("[data-i18n-aria]").forEach(e => e.setAttribute("aria-label", tr(e.dataset.i18nAria)));
  $$(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === l)));
  try { localStorage.setItem("limo-lang", l); } catch (e) {}
  const u = new URL(location.href); if (l === "me") u.searchParams.delete("lang"); else u.searchParams.set("lang", l);
  history.replaceState(history.state, "", u);
  if (window.render) render();
}
$$(".lang button").forEach(b => b.addEventListener("click", () => applyLang(b.dataset.lang)));
function startLang(){
  let s = new URLSearchParams(location.search).get("lang");
  if (!T[s]) { try { s = localStorage.getItem("limo-lang"); } catch (e) { s = null; } }
  applyLang(T[s] ? s : "me");
}

/* ---------- requests: shared text for the confirmation, the owner's email and the admin panel */
function reqLines(r){
  const c = byId(r.car), name = c ? c.name : r.carName, L = [];
  if (r.type === "rent") {
    L.push(tr("m_rent", { car: name }), `${tr("m_dates")}: ${fmtD(r.d1)} – ${fmtD(r.d2)} (${r.days} ${daysWord(r.days)}), ${r.time}`,
      `${tr("f_place")}: ${placeName(r.place)}`, `${tr("total")}: ${eur(r.total)}`);
  } else {
    L.push(tr("m_limo", { car: name }), r.mode === "transfer" ? `${tr("t_transfer")}: ${r.p1} → ${r.p2}` : `${tr("t_hourly")}: ${r.hours} ${tr("h_short")} · ${tr("f_start")}: ${r.p1}`,
      `${tr("f_date")}: ${fmtD(r.d1)} ${r.time}`, `${tr("f_pax")}: ${r.pax}`, r.est ? `${tr("est")}: ${eur(r.est)}` : tr("on_req"));
  }
  L.push(`${tr("f_name")}: ${r.name}`, `${tr("f_phone_s")}: ${r.phone}`);
  if (r.email) L.push(`E-mail: ${r.email}`);
  if (r.note) L.push(`${tr("f_note_s")}: ${r.note}`);
  return L;
}
function addRequest(r){ r.id = ++DB.seq; r.status = "new"; r.created = TODAY_S; DB.requests.unshift(r); save(); ev("generate_lead", { kind: r.type }); return r; }
function doneHTML(r, prefix){
  const L = reqLines(r);
  return `<div class="ok"><div class="okc">✓</div><h3>${tr("ok_t")}</h3><p>${tr("ok_p")}</p><p class="small">${tr("ok_mail")}</p>
    <div class="mailp"><b>${escH(L[0])}</b>${escH(L.slice(1).join("\n"))}</div><p class="dnote">${tr("ok_demo")}</p>
    <a class="btn" href="${prefix}admin/#zahtjevi">${tr("ok_admin")}</a></div>`;
}
const specsRent = c => `<span>${tr("seats", { n: c.seats })}</span><span>${tr("gear_" + c.gear)}</span><span>${tr("fuel_" + c.fuel)}</span>`;
const specsLimo = c => `<span>${tr("pax_n", { n: c.seats })}</span><span>${tr("bags_n", { n: c.bags })}</span>`;
