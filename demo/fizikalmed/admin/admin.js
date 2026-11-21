(function () {
  "use strict";
  // Demo admin: content is saved to this browser's localStorage. On the real
  // site the same document is saved to the server.
  var PASS = "fizikalmed";
  var D = FZ.load();
  var cl = "sr";     // language of the content being edited
  var ui = "sr";     // language of the admin itself
  var tab = "texts";

  var U = {
    sr: {
      login_sub: "Uređivanje sajta", pw: "Lozinka", pw_err: "Pogrešna lozinka.", enter: "Uđi", pw_hint: "Demo lozinka: fizikalmed",
      open_site: "Otvori sajt", demo_note: "Demo: izmjene se čuvaju samo u ovom pregledaču. Na pravom sajtu čuvaju se na serveru i odmah ih vide svi posjetioci.",
      content_lang: "Jezik teksta:", tab_texts: "Tekstovi i portret", tab_treat: "Liječenje", tab_equip: "Oprema", tab_dipl: "Diplome", tab_gal: "Fotografije", tab_cont: "Kontakti",
      reset: "Vrati početni sadržaj", reset_sure: "Kliknite ponovo da potvrdite", logout: "Odjava",
      saved: "Sačuvano", save_err: "Nije sačuvano: previše fotografija ili je fotografija prevelika.", photo_err: "Ovu fotografiju nije moguće učitati.",
      up: "Gore", down: "Dolje", del: "Obriši", add_photo: "Dodaj fotografiju", change_photo: "Promijeni", remove_photo: "Ukloni fotografiju", no_photo: "Nema fotografije",
      h1: "Naslov na početku", lead: "Tekst ispod naslova", ther_name: "Ime terapeuta", ther_role: "Zanimanje", ther_sub: "O terapeutu", place_sub: "Tekst o ordinaciji i opremi",
      hero_photo: "Portret terapeuta (prvi ekran)", ther_photo: "Fotografija terapeuta sa pacijentom",
      t_name: "Naziv", t_what: "Šta je", t_why: "Za šta pomaže", t_tags: "Oznake", t_tags_h: "Odvojite zarezom", t_hint: "Šta treba da bude na fotografiji", add_treat: "+ Dodaj vrstu liječenja", new_treat: "Nova vrsta liječenja",
      e_name: "Naziv opreme", e_text: "Kratak opis", add_equip: "+ Dodaj opremu", new_equip: "Nova oprema",
      d_title: "Naziv diplome ili sertifikata", d_org: "Ustanova ili napomena", d_year: "Godina", add_dipl: "+ Dodaj diplomu", new_dipl: "Nova diploma",
      g_caption: "Opis fotografije", add_gal: "+ Dodaj fotografiju", new_gal: "Nova fotografija",
      c_type: "Vrsta", c_value: "Broj, adresa ili link", c_label: "Natpis (nije obavezno)", add_cont: "+ Dodaj kontakt",
      ct_whatsapp: "WhatsApp", ct_phone: "Telefon", ct_email: "E-mail", ct_instagram: "Instagram", ct_facebook: "Facebook", ct_map: "Google mape (link)", ct_address: "Adresa", ct_link: "Drugi link",
      only_sr: "Ovo polje je isto na svim jezicima."
    },
    ru: {
      login_sub: "Редактирование сайта", pw: "Пароль", pw_err: "Неверный пароль.", enter: "Войти", pw_hint: "Демо-пароль: fizikalmed",
      open_site: "Открыть сайт", demo_note: "Демо: изменения сохраняются только в этом браузере. На настоящем сайте они сохраняются на сервере и сразу видны всем посетителям.",
      content_lang: "Язык текста:", tab_texts: "Тексты и портрет", tab_treat: "Лечение", tab_equip: "Оборудование", tab_dipl: "Дипломы", tab_gal: "Фото", tab_cont: "Контакты",
      reset: "Вернуть исходное содержимое", reset_sure: "Нажмите ещё раз для подтверждения", logout: "Выйти",
      saved: "Сохранено", save_err: "Не сохранено: слишком много фото или фото слишком большое.", photo_err: "Не удалось загрузить это фото.",
      up: "Выше", down: "Ниже", del: "Удалить", add_photo: "Добавить фото", change_photo: "Заменить", remove_photo: "Убрать фото", no_photo: "Нет фото",
      h1: "Заголовок на первом экране", lead: "Текст под заголовком", ther_name: "Имя терапевта", ther_role: "Специальность", ther_sub: "О терапевте", place_sub: "Текст о кабинете и оборудовании",
      hero_photo: "Портрет врача (первый экран)", ther_photo: "Фото терапевта с пациентом",
      t_name: "Название", t_what: "Что это", t_why: "Чем помогает", t_tags: "Метки", t_tags_h: "Через запятую", t_hint: "Что должно быть на фото", add_treat: "+ Добавить вид лечения", new_treat: "Новый вид лечения",
      e_name: "Название оборудования", e_text: "Краткое описание", add_equip: "+ Добавить оборудование", new_equip: "Новое оборудование",
      d_title: "Название диплома или сертификата", d_org: "Учреждение или примечание", d_year: "Год", add_dipl: "+ Добавить диплом", new_dipl: "Новый диплом",
      g_caption: "Подпись к фото", add_gal: "+ Добавить фото", new_gal: "Новое фото",
      c_type: "Тип", c_value: "Номер, адрес или ссылка", c_label: "Подпись (необязательно)", add_cont: "+ Добавить контакт",
      ct_whatsapp: "WhatsApp", ct_phone: "Телефон", ct_email: "Почта", ct_instagram: "Instagram", ct_facebook: "Facebook", ct_map: "Google Карты (ссылка)", ct_address: "Адрес", ct_link: "Другая ссылка",
      only_sr: "Это поле одинаковое на всех языках."
    }
  };
  function u(k) { return U[ui][k] || U.sr[k] || k; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function loc(o) { return (o && o[cl]) || ""; }
  function blank() { return { sr: "", en: "", ru: "" }; }

  // ---------- saving
  var statusEl = document.getElementById("status"), saveTimer;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try { FZ.save(D); statusEl.textContent = u("saved"); statusEl.className = "status ok"; }
      catch (e) { statusEl.textContent = u("save_err"); statusEl.className = "status bad"; }
    }, 250);
  }

  // ---------- photos: shrink before storing
  function readPhoto(file, cb) {
    var r = new FileReader();
    r.onload = function () {
      var img = new Image();
      img.onload = function () {
        var max = 1200, w = img.naturalWidth, h = img.naturalHeight, k = Math.min(1, max / Math.max(w, h));
        var cv = document.createElement("canvas"); cv.width = Math.round(w * k); cv.height = Math.round(h * k);
        cv.getContext("2d").drawImage(img, 0, 0, cv.width, cv.height);
        cb(cv.toDataURL("image/jpeg", 0.78));
      };
      img.onerror = function () { statusEl.textContent = u("photo_err"); statusEl.className = "status bad"; };
      img.src = r.result;
    };
    r.readAsDataURL(file);
  }

  // ---------- field builders (data-path points into D)
  var uid = 0;
  function get(path) { return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, D); }
  function set(path, v) {
    var ks = path.split("."), last = ks.pop(), o = ks.reduce(function (o, k) { return o[k]; }, D);
    o[last] = v;
  }
  function fText(label, path, opt) {
    opt = opt || {};
    var id = "f" + (++uid), v = opt.plain ? get(path) : loc(get(path));
    var input = opt.area ? '<textarea id="' + id + '" data-p="' + path + '"' + (opt.plain ? ' data-plain="1"' : "") + ">" + esc(v) + "</textarea>"
      : '<input id="' + id + '" type="text" data-p="' + path + '"' + (opt.plain ? ' data-plain="1"' : "") + ' value="' + esc(v) + '">';
    return '<div class="f"><label for="' + id + '">' + esc(label) + "</label>" + input + (opt.help ? "<small>" + esc(opt.help) + "</small>" : "") + "</div>";
  }
  function fSelect(label, path, options) {
    var id = "f" + (++uid), v = get(path);
    return '<div class="f"><label for="' + id + '">' + esc(label) + '</label><select id="' + id + '" data-p="' + path + '" data-plain="1" data-rerender="1">' +
      options.map(function (o) { return '<option value="' + o + '"' + (o === v ? " selected" : "") + ">" + esc(u("ct_" + o)) + "</option>"; }).join("") + "</select></div>";
  }
  function fPhoto(label, path) {
    var id = "f" + (++uid), v = get(path);
    return '<div class="f"><label for="' + id + '">' + esc(label) + '</label><div class="pic"><div class="thumb">' + (v ? '<img src="' + esc(v) + '" alt="">' : esc(u("no_photo"))) + "</div>" +
      '<input id="' + id + '" type="file" accept="image/*" data-photo="' + path + '"><label class="btn line" for="' + id + '">' + esc(v ? u("change_photo") : u("add_photo")) + "</label>" +
      (v ? '<button type="button" class="btn danger" data-rmphoto="' + path + '">' + esc(u("remove_photo")) + "</button>" : "") + "</div></div>";
  }
  function head(title, list, i) {
    var n = D[list].length;
    return '<div class="card-h"><h3>' + esc(title || "—") + "</h3>" +
      '<button type="button" class="ib" data-mv="' + list + "." + i + '.-1" aria-label="' + esc(u("up")) + '"' + (i === 0 ? " disabled" : "") + ">↑</button>" +
      '<button type="button" class="ib" data-mv="' + list + "." + i + '.1" aria-label="' + esc(u("down")) + '"' + (i === n - 1 ? " disabled" : "") + ">↓</button>" +
      '<button type="button" class="ib del" data-del="' + list + "." + i + '" aria-label="' + esc(u("del")) + '">×</button></div>';
  }

  // ---------- panels
  var PANELS = {
    texts: function () {
      return '<div class="card">' + fText(u("h1"), "texts.h1") + fText(u("lead"), "texts.lead", { area: 1 }) + "</div>" +
        '<div class="card">' + fPhoto(u("hero_photo"), "photos.hero") + '<div class="grid2">' + fText(u("ther_name"), "texts.ther_name") + fText(u("ther_role"), "texts.ther_role") + "</div>" +
        fText(u("ther_sub"), "texts.ther_sub", { area: 1 }) + fPhoto(u("ther_photo"), "photos.therapist") + "</div>" +
        '<div class="card">' + fText(u("place_sub"), "texts.place_sub", { area: 1 }) + "</div>";
    },
    treatments: function () {
      return D.treatments.map(function (x, i) {
        var p = "treatments." + i + ".";
        return '<div class="card">' + head(loc(x.name) || x.name.sr, "treatments", i) + fText(u("t_name"), p + "name") +
          fText(u("t_what"), p + "what", { area: 1 }) + fText(u("t_why"), p + "why", { area: 1 }) +
          fText(u("t_tags"), p + "tags", { help: u("t_tags_h") }) + fPhoto(u("add_photo"), p + "photo") + fText(u("t_hint"), p + "hint") + "</div>";
      }).join("") + '<button type="button" class="btn add" data-add="treatments">' + esc(u("add_treat")) + "</button>";
    },
    equipment: function () {
      return D.equipment.map(function (x, i) {
        var p = "equipment." + i + ".";
        return '<div class="card">' + head(loc(x.name) || x.name.sr, "equipment", i) + fText(u("e_name"), p + "name") +
          fText(u("e_text"), p + "text", { area: 1 }) + fPhoto(u("add_photo"), p + "photo") + "</div>";
      }).join("") + '<button type="button" class="btn add" data-add="equipment">' + esc(u("add_equip")) + "</button>";
    },
    diplomas: function () {
      return D.diplomas.map(function (x, i) {
        var p = "diplomas." + i + ".";
        return '<div class="card">' + head(loc(x.title) || x.title.sr, "diplomas", i) + fText(u("d_title"), p + "title") +
          '<div class="grid2">' + fText(u("d_org"), p + "org") + fText(u("d_year"), p + "year", { plain: 1, help: u("only_sr") }) + "</div>" +
          fPhoto(u("add_photo"), p + "photo") + "</div>";
      }).join("") + '<button type="button" class="btn add" data-add="diplomas">' + esc(u("add_dipl")) + "</button>";
    },
    gallery: function () {
      return D.gallery.map(function (x, i) {
        var p = "gallery." + i + ".";
        return '<div class="card">' + head(loc(x.caption) || x.caption.sr, "gallery", i) + fText(u("g_caption"), p + "caption") + fPhoto(u("add_photo"), p + "photo") + "</div>";
      }).join("") + '<button type="button" class="btn add" data-add="gallery">' + esc(u("add_gal")) + "</button>";
    },
    contacts: function () {
      return D.contacts.map(function (x, i) {
        var p = "contacts." + i + ".";
        return '<div class="card">' + head(u("ct_" + x.type) + (x.value ? ": " + x.value : ""), "contacts", i) +
          '<div class="grid2">' + fSelect(u("c_type"), p + "type", ["whatsapp", "phone", "email", "instagram", "facebook", "map", "address", "link"]) +
          fText(u("c_value"), p + "value", { plain: 1, help: u("only_sr") }) + "</div>" + fText(u("c_label"), p + "label") + "</div>";
      }).join("") + '<button type="button" class="btn add" data-add="contacts">' + esc(u("add_cont")) + "</button>";
    }
  };
  var NEW = {
    treatments: function () { var n = blank(); n[cl] = u("new_treat"); return { name: n, what: blank(), why: blank(), tags: blank(), hint: blank(), photo: "" }; },
    equipment: function () { var n = blank(); n[cl] = u("new_equip"); return { name: n, text: blank(), photo: "" }; },
    diplomas: function () { var n = blank(); n[cl] = u("new_dipl"); return { title: n, org: blank(), year: "", photo: "" }; },
    gallery: function () { var n = blank(); n[cl] = u("new_gal"); return { caption: n, photo: "" }; },
    contacts: function () { return { type: "phone", value: "", label: blank() }; }
  };

  var panel = document.getElementById("panel");
  function draw() {
    uid = 0;
    panel.innerHTML = PANELS[tab]();
    document.querySelectorAll(".tabs button").forEach(function (b) { b.setAttribute("aria-selected", String(b.dataset.tab === tab)); });
  }
  function applyUi() {
    document.documentElement.lang = ui === "ru" ? "ru" : "sr-Latn-ME";
    document.querySelectorAll("[data-u]").forEach(function (el) { el.textContent = u(el.getAttribute("data-u")); });
    document.querySelectorAll("[data-ui]").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.ui === ui)); });
    try { localStorage.setItem("fizikalmed-admin-ui", ui); } catch (e) {}
  }

  panel.addEventListener("input", function (e) {
    var el = e.target, p = el.getAttribute("data-p");
    if (!p || el.tagName === "SELECT") return;
    if (el.hasAttribute("data-plain")) set(p, el.value);
    else { var o = get(p); if (!o || typeof o !== "object") { o = blank(); set(p, o); } o[cl] = el.value; }
    save();
  });
  panel.addEventListener("change", function (e) {
    var el = e.target;
    if (el.tagName === "SELECT" && el.getAttribute("data-p")) { set(el.getAttribute("data-p"), el.value); save(); draw(); return; }
    var ph = el.getAttribute("data-photo");
    if (ph && el.files && el.files[0]) readPhoto(el.files[0], function (data) { set(ph, data); save(); draw(); });
  });
  panel.addEventListener("click", function (e) {
    var b = e.target.closest("button"); if (!b) return;
    if (b.dataset.add) { D[b.dataset.add].push(NEW[b.dataset.add]()); save(); draw(); var cards = panel.querySelectorAll(".card"); if (cards.length) cards[cards.length - 1].scrollIntoView({ block: "center" }); return; }
    if (b.dataset.del) { var d = b.dataset.del.split("."); D[d[0]].splice(+d[1], 1); save(); draw(); return; }
    if (b.dataset.mv) {
      var m = b.dataset.mv.split("."), list = D[m[0]], i = +m[1], j = i + (+m[2]);
      if (j < 0 || j >= list.length) return;
      var tmp = list[i]; list[i] = list[j]; list[j] = tmp; save(); draw(); return;
    }
    if (b.dataset.rmphoto) { set(b.dataset.rmphoto, ""); save(); draw(); }
  });

  document.querySelectorAll(".tabs button").forEach(function (b) { b.addEventListener("click", function () { tab = b.dataset.tab; draw(); }); });
  document.querySelectorAll("[data-cl]").forEach(function (b) {
    b.addEventListener("click", function () {
      cl = b.dataset.cl;
      document.querySelectorAll("[data-cl]").forEach(function (x) { x.setAttribute("aria-pressed", String(x.dataset.cl === cl)); });
      draw();
    });
  });
  document.querySelectorAll("[data-ui]").forEach(function (b) { b.addEventListener("click", function () { ui = b.dataset.ui; applyUi(); draw(); }); });

  var resetBtn = document.getElementById("reset"), armed = false, armT;
  resetBtn.addEventListener("click", function () {
    if (!armed) { armed = true; resetBtn.classList.add("armed"); resetBtn.textContent = u("reset_sure"); armT = setTimeout(function () { armed = false; resetBtn.classList.remove("armed"); resetBtn.textContent = u("reset"); }, 4000); return; }
    clearTimeout(armT); armed = false; FZ.reset(); D = FZ.load(); resetBtn.classList.remove("armed"); resetBtn.textContent = u("reset"); draw();
    statusEl.textContent = u("saved"); statusEl.className = "status ok";
  });

  // ---------- demo login
  var loginEl = document.getElementById("login"), appEl = document.getElementById("app");
  function enter() { loginEl.hidden = true; appEl.hidden = false; draw(); }
  document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = document.getElementById("pw").value.trim() === PASS;
    document.getElementById("pw-err").hidden = ok;
    if (ok) { try { sessionStorage.setItem("fizikalmed-admin", "1"); } catch (x) {} enter(); }
  });
  document.getElementById("logout").addEventListener("click", function () {
    try { sessionStorage.removeItem("fizikalmed-admin"); } catch (x) {}
    appEl.hidden = true; loginEl.hidden = false;
  });

  try { ui = localStorage.getItem("fizikalmed-admin-ui") || "sr"; } catch (e) {}
  applyUi();
  var logged = false; try { logged = sessionStorage.getItem("fizikalmed-admin") === "1"; } catch (e) {}
  if (logged) enter(); else loginEl.hidden = false;
})();
