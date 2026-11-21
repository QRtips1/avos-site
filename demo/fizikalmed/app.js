(function () {
  "use strict";
  var C = window.FZ.load();

  var T = {
    sr: {
      demo: "Demo koncept sajta, izradio",
      brand_sub: "fizikalna terapija", nav_aria: "Meni", nav_pain: "Gdje boli", nav_srv: "Liječenje", nav_place: "Ordinacija", nav_ther: "Terapeut", nav_cont: "Kontakt",
      book: "Zakaži", btn_wa: "Zakaži termin na WhatsApp",
      tr1: "Diplomirani fizioterapeut, Medicinski fakultet UCG", tr2: "Sertifikati iz dry needlinga, kuppinga i osteopatije", tr3: "Individualan plan terapije za svakog pacijenta",
      where_h: "Gdje vas boli?", where_sub: "Označite na figuri šta vas boli i pošaljite upit. Odgovorićemo na WhatsApp i predložiti termin koji vam odgovara.",
      s_neck: "Vrat", s_shoulder: "Rame", s_upper: "Gornji dio leđa", s_lower: "Krsta", s_hip: "Kuk", s_knee: "Koljeno",
      s_ankle: "Skočni zglob", s_sport: "Sportska povreda", s_postop: "Oporavak poslije operacije",
      l_name: "Ime", e_name: "Upišite ime.", l_when: "Kada vam odgovara?", ph_when: "npr. utorak poslije 17h",
      send: "Pošalji upit na WhatsApp",
      treat_h: "Liječenje", treat_sub: "Poslije pregleda terapeut bira metode koje odgovaraju baš vama. Najbolji rezultat često daje njihova kombinacija.",
      slot: "Mjesto za fotografiju", what: "Šta je", why: "Za šta pomaže", hero_slot: "Portret terapeuta",
      band_h: "Zakažite prvi pregled", band_p: "Pišite nam na WhatsApp ili pozovite, a mi ćemo naći termin koji vam odgovara.",
      ther_slot: "Terapeut sa pacijentom tokom pregleda", dipl_h: "Diplome i sertifikati", dipl_slot: "Fotografija diplome",
      first_h: "Prvi dolazak",
      st1_h: "Javite nam se", st1_p: "Porukom na WhatsApp ili pozivom.",
      st2_h: "Prvi pregled", st2_p: "Terapeut utvrđuje uzrok bola. Ponesite nalaze i snimke, ako ih imate.",
      st3_h: "Plan terapije", st3_p: "Dobijate plan tretmana i vježbe koje radite kod kuće.",
      place_h: "Ordinacija i oprema", rev: "Recenzije pacijenata na Google-u",
      faq_h: "Česta pitanja",
      q1: "Šta da ponesem na prvi pregled?", a1: "Nalaze i snimke (RTG, magnetna rezonanca, ultrazvuk), ako ih imate, i udobnu odjeću u kojoj se lako krećete.",
      q2: "Koliko tretmana mi je potrebno?", a2: "Zavisi od problema. Poslije prvog pregleda dobijate plan terapije i procjenu koliko dolazaka je potrebno.",
      q3: "Da li je dry needling bolan?", a3: "Osjeti se kratak ubod i ponekad trzaj mišića. Većina pacijenata ga dobro podnosi, a osjećaj brzo prolazi.",
      q4: "Mogu li doći poslije operacije?", a4: "Da. Ponesite otpusnu listu i nalaze, a terapiju planiramo prema preporukama vašeg ljekara.",
      cont_h: "Kontakt", cont_sub: "Najbrže je porukom na WhatsApp. Možete i pozvati.",
      call: "Poziv", c_whatsapp: "WhatsApp", c_phone: "Telefon", c_email: "E-mail", c_instagram: "Instagram", c_facebook: "Facebook", c_map: "Google mape", c_address: "Adresa", c_link: "Link",
      made: "Sajt:", admin_link: "Uređivanje sajta", bar_aria: "Brzi kontakt",
      title: "Fizikalmed · Fizikalna terapija u Podgorici",
      wa_hi: "Dobar dan! Želim da zakažem termin u ordinaciji Fizikalmed.",
      wa_name: "Ime", wa_spot: "Boli me", wa_when: "Odgovara mi"
    },
    en: {
      demo: "Website demo concept by",
      brand_sub: "physiotherapy", nav_aria: "Menu", nav_pain: "Where it hurts", nav_srv: "Treatments", nav_place: "Practice", nav_ther: "Therapist", nav_cont: "Contact",
      book: "Book", btn_wa: "Book on WhatsApp",
      tr1: "Qualified physiotherapist, University of Montenegro", tr2: "Certified in dry needling, cupping and osteopathy", tr3: "An individual treatment plan for every patient",
      where_h: "Where does it hurt?", where_sub: "Mark where it hurts on the figure and send a request. We will reply on WhatsApp and offer a convenient appointment time.",
      s_neck: "Neck", s_shoulder: "Shoulder", s_upper: "Upper back", s_lower: "Lower back", s_hip: "Hip", s_knee: "Knee",
      s_ankle: "Ankle", s_sport: "Sports injury", s_postop: "Recovery after surgery",
      l_name: "Name", e_name: "Please enter your name.", l_when: "When suits you?", ph_when: "e.g. Tuesday after 5 pm",
      send: "Send request on WhatsApp",
      treat_h: "Treatments", treat_sub: "After the assessment the therapist chooses the methods that suit you. Often the best results come from combining them.",
      slot: "Photo goes here", what: "What it is", why: "What it helps with", hero_slot: "Therapist's portrait",
      band_h: "Book your first assessment", band_p: "Message us on WhatsApp or call, and we will find a time that suits you.",
      ther_slot: "Therapist with a patient during an assessment", dipl_h: "Diplomas and certificates", dipl_slot: "Photo of the diploma",
      first_h: "Your first visit",
      st1_h: "Get in touch", st1_p: "By WhatsApp message or phone call.",
      st2_h: "Initial assessment", st2_p: "The therapist finds the cause of the pain. Bring any reports and scans you have.",
      st3_h: "Treatment plan", st3_p: "You get a treatment plan and exercises to do at home.",
      place_h: "Practice and equipment", rev: "Patient reviews on Google",
      faq_h: "Questions",
      q1: "What should I bring to the first visit?", a1: "Any reports and scans you have (X-ray, MRI, ultrasound) and comfortable clothes you can move in.",
      q2: "How many sessions will I need?", a2: "It depends on the problem. After the first assessment you get a treatment plan and an estimate of how many visits you need.",
      q3: "Does dry needling hurt?", a3: "You feel a short prick and sometimes a twitch in the muscle. Most patients tolerate it well, and the feeling passes quickly.",
      q4: "Can I come after surgery?", a4: "Yes. Bring your discharge letter and reports, and we plan the therapy in line with your doctor's advice.",
      cont_h: "Contact", cont_sub: "A WhatsApp message is fastest. You can also call.",
      call: "Call", c_whatsapp: "WhatsApp", c_phone: "Phone", c_email: "Email", c_instagram: "Instagram", c_facebook: "Facebook", c_map: "Google Maps", c_address: "Address", c_link: "Link",
      made: "Website:", admin_link: "Edit the site", bar_aria: "Quick contact",
      title: "Fizikalmed · Physiotherapy in Podgorica",
      wa_hi: "Hello! I would like to book a visit at Fizikalmed.",
      wa_name: "Name", wa_spot: "Pain", wa_when: "Suits me"
    },
    ru: {
      demo: "Демо-концепт сайта от",
      brand_sub: "физиотерапия", nav_aria: "Меню", nav_pain: "Где болит", nav_srv: "Лечение", nav_place: "Кабинет", nav_ther: "Терапевт", nav_cont: "Контакты",
      book: "Записаться", btn_wa: "Записаться в WhatsApp",
      tr1: "Дипломированный физиотерапевт, медфак Университета Черногории", tr2: "Сертификаты по сухим иглам, банкам и остеопатии", tr3: "Индивидуальный план лечения для каждого пациента",
      where_h: "Где болит?", where_sub: "Отметьте на фигуре, что вас беспокоит, и отправьте заявку. Мы ответим в WhatsApp и предложим удобное время приёма.",
      s_neck: "Шея", s_shoulder: "Плечо", s_upper: "Верх спины", s_lower: "Поясница", s_hip: "Бедро", s_knee: "Колено",
      s_ankle: "Голеностоп", s_sport: "Спортивная травма", s_postop: "Восстановление после операции",
      l_name: "Имя", e_name: "Укажите имя.", l_when: "Когда вам удобно?", ph_when: "например, вторник после 17:00",
      send: "Отправить заявку в WhatsApp",
      treat_h: "Лечение", treat_sub: "После осмотра терапевт подбирает методы, которые подходят именно вам. Часто лучший результат даёт их сочетание.",
      slot: "Здесь будет фото", what: "Что это", why: "Чем помогает", hero_slot: "Портрет врача",
      band_h: "Запишитесь на первый осмотр", band_p: "Напишите в WhatsApp или позвоните, и мы подберём удобное для вас время.",
      ther_slot: "Терапевт с пациентом во время осмотра", dipl_h: "Дипломы и сертификаты", dipl_slot: "Фото диплома",
      first_h: "Первый визит",
      st1_h: "Свяжитесь с нами", st1_p: "Сообщением в WhatsApp или звонком.",
      st2_h: "Первичный осмотр", st2_p: "Терапевт выясняет причину боли. Возьмите заключения и снимки, если они есть.",
      st3_h: "План лечения", st3_p: "Вы получаете план процедур и упражнения для дома.",
      place_h: "Кабинет и оборудование", rev: "Отзывы пациентов в Google",
      faq_h: "Частые вопросы",
      q1: "Что взять на первый осмотр?", a1: "Заключения и снимки (рентген, МРТ, УЗИ), если они есть, и удобную одежду, в которой легко двигаться.",
      q2: "Сколько процедур понадобится?", a2: "Зависит от проблемы. После первого осмотра вы получите план лечения и оценку, сколько визитов нужно.",
      q3: "Больно ли от сухих игл?", a3: "Чувствуется короткий укол и иногда подёргивание мышцы. Большинство пациентов переносит это хорошо, ощущение быстро проходит.",
      q4: "Можно ли прийти после операции?", a4: "Да. Возьмите выписку и заключения, а лечение спланируем по рекомендациям вашего врача.",
      cont_h: "Контакты", cont_sub: "Быстрее всего написать в WhatsApp. Можно и позвонить.",
      call: "Звонок", c_whatsapp: "WhatsApp", c_phone: "Телефон", c_email: "Почта", c_instagram: "Instagram", c_facebook: "Facebook", c_map: "Google Карты", c_address: "Адрес", c_link: "Ссылка",
      made: "Сайт:", admin_link: "Редактировать сайт", bar_aria: "Быстрая связь",
      title: "Fizikalmed · Физиотерапия в Подгорице",
      wa_hi: "Здравствуйте! Хочу записаться в кабинет Fizikalmed.",
      wa_name: "Имя", wa_spot: "Болит", wa_when: "Удобно"
    }
  };

  var lang = "sr";
  function t(k) { return (T[lang] && T[lang][k]) || T.sr[k] || ""; }
  function L(o) { return o ? (o[lang] || o.sr || "") : ""; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function track(name) { try { if (window.gtag) gtag("event", name, { demo: "fizikalmed" }); } catch (e) {} }
  function first(type) { for (var i = 0; i < C.contacts.length; i++) if (C.contacts[i].type === type && C.contacts[i].value) return C.contacts[i]; return null; }
  function waNumber() { var c = first("whatsapp") || first("phone"); return c ? FZ.digits(c.value) : ""; }
  function waLink(text) { return "https://wa.me/" + waNumber() + "?text=" + encodeURIComponent(text); }
  function slot(caption, cls) {
    return '<figure class="slot ' + (cls || "") + '"><svg aria-hidden="true"><use href="#i-cam"/></svg><b>' + esc(t("slot")) + "</b><figcaption>" + esc(caption) + "</figcaption></figure>";
  }
  function photo(src, alt, cls) {
    return '<figure class="ph ' + (cls || "") + '"><img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy"></figure>';
  }
  var ICON = { whatsapp: "i-wa", phone: "i-phone", email: "i-mail", instagram: "i-ig", facebook: "i-fb", map: "i-pin", address: "i-pin" };

  function render() {
    document.querySelectorAll("[data-c]").forEach(function (el) { var v = L(C.texts[el.getAttribute("data-c")]); if (v) el.textContent = v; });

    var hp = document.getElementById("hero-ph");
    hp.innerHTML = C.photos.hero
      ? '<img src="' + esc(C.photos.hero) + '" alt="' + esc(L(C.texts.ther_name)) + '" fetchpriority="high"><div class="name"><b translate="no">' + esc(L(C.texts.ther_name)) + "</b><span>" + esc(L(C.texts.ther_role)) + "</span></div>"
      : slot(t("hero_slot") + ", " + L(C.texts.ther_name), "slot-hero");
    hp.classList.toggle("has-ph", !!C.photos.hero);

    document.getElementById("treat-list").innerHTML = C.treatments.map(function (x) {
      var tags = L(x.tags).split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      return '<article class="tr">' + (x.photo ? photo(x.photo, L(x.name), "tr-ph") : slot(L(x.hint) || L(x.name))) +
        '<div class="tr-txt"><h3>' + esc(L(x.name)) + "</h3><dl>" +
        (L(x.what) ? "<dt>" + esc(t("what")) + "</dt><dd>" + esc(L(x.what)) + "</dd>" : "") +
        (L(x.why) ? "<dt>" + esc(t("why")) + "</dt><dd>" + esc(L(x.why)) + "</dd>" : "") + "</dl>" +
        (tags.length ? '<p class="tags">' + tags.map(function (g) { return "<span>" + esc(g) + "</span>"; }).join("") + "</p>" : "") +
        "</div></article>";
    }).join("");

    var tp = document.getElementById("ther-ph");
    tp.innerHTML = C.photos.therapist ? photo(C.photos.therapist, L(C.texts.ther_name), "ph-tall") : slot(t("ther_slot"), "slot-tall");

    document.getElementById("dipl-list").innerHTML = C.diplomas.map(function (d) {
      return '<article class="dp' + (d.photo ? '' : ' dp-np') + '">' + (d.photo ? '<img src="' + esc(d.photo) + '" alt="' + esc(L(d.title)) + '" loading="lazy">' :
        '<div class="dp-ic"><svg aria-hidden="true"><use href="#i-cert"/></svg></div>') +
        '<div class="dp-t"><b>' + esc(L(d.title)) + "</b><span>" + esc([L(d.org), d.year].filter(Boolean).join(", ")) + "</span></div></article>";
    }).join("");

    document.getElementById("equip-list").innerHTML = C.equipment.map(function (q) {
      return '<article class="eq">' + (q.photo ? '<img src="' + esc(q.photo) + '" alt="' + esc(L(q.name)) + '" loading="lazy">' :
        '<div class="eq-ic"><svg aria-hidden="true"><use href="#i-tool"/></svg></div>') +
        "<div><h3>" + esc(L(q.name)) + "</h3><p>" + esc(L(q.text)) + "</p></div></article>";
    }).join("");

    document.getElementById("gallery").innerHTML = C.gallery.map(function (g, i) {
      var cls = i === 0 ? "slot-wide" : "";
      return g.photo ? '<figure class="ph gal ' + cls + '"><img src="' + esc(g.photo) + '" alt="' + esc(L(g.caption)) + '" loading="lazy"><figcaption>' + esc(L(g.caption)) + "</figcaption></figure>" : slot(L(g.caption), cls);
    }).join("");
    document.getElementById("gallery").className = "gallery n" + Math.min(C.gallery.length, 3);

    document.getElementById("contact-list").innerHTML = C.contacts.filter(function (c) { return c.value; }).map(function (c) {
      var h = FZ.href(c), label = L(c.label), title = t("c_" + c.type) || t("c_link");
      var sub = c.type === "map" ? (label || "") : (c.type === "instagram" ? "@" + String(c.value).replace(/^@/, "").replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "") : (label || c.value));
      var inner = '<svg aria-hidden="true"><use href="#' + (ICON[c.type] || "i-link") + '"/></svg><span><b>' + esc(title) + "</b><small>" + esc(sub) + "</small></span>";
      return "<li>" + (h ? '<a href="' + esc(h) + '"' + (/^https?:/.test(h) ? ' target="_blank" rel="noopener"' : "") + ">" + inner + "</a>" : '<div class="nolink">' + inner + "</div>") + "</li>";
    }).join("");

    var ph = first("phone"), mp = first("map") || first("address");
    document.querySelectorAll(".js-tel").forEach(function (a) { if (ph) { a.href = FZ.href(ph); a.hidden = false; } else a.hidden = true; });
    document.querySelectorAll(".js-tel-t").forEach(function (s) { if (ph) s.textContent = ph.value; });
    document.querySelectorAll(".js-map").forEach(function (a) { if (mp) { a.href = FZ.href(mp); a.hidden = false; } else a.hidden = true; });
    document.querySelectorAll(".js-wa").forEach(function (a) { a.href = waLink(t("wa_hi")); });
  }

  function setLang(l) {
    lang = T[l] ? l : "sr";
    document.documentElement.lang = lang === "sr" ? "sr-Latn-ME" : lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    document.querySelectorAll(".hs").forEach(function (b) { b.title = t("s_" + b.dataset.spot); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    document.title = t("title");
    render();
    store("fizikalmed-lang", lang);
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      setLang(b.dataset.lang);
      if (history.replaceState) history.replaceState(null, "", b.dataset.lang === "sr" ? location.pathname : "#" + b.dataset.lang);
    });
  });
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a");
    if (!a) return;
    if (/wa\.me/.test(a.href)) track("contact_whatsapp");
    else if (/^tel:/.test(a.href)) track("contact_phone");
  });

  // Body map hotspots and the chips share one state: the checkbox.
  function box(spot) { return document.querySelector('.spots input[value="' + spot + '"]'); }
  function syncSpot(spot) {
    var c = box(spot), hs = document.querySelector('.hs[data-spot="' + spot + '"]');
    if (c && hs) hs.setAttribute("aria-pressed", String(c.checked));
  }
  document.querySelectorAll(".hs").forEach(function (b) {
    b.addEventListener("click", function () {
      var c = box(b.dataset.spot); if (!c) return;
      c.checked = !c.checked; syncSpot(b.dataset.spot);
    });
  });
  document.querySelectorAll(".spots input").forEach(function (c) { c.addEventListener("change", function () { syncSpot(c.value); }); });

  var form = document.getElementById("ask");
  var nameIn = document.getElementById("q-name");
  var nameErr = document.getElementById("q-name-err");
  nameIn.addEventListener("input", function () { if (nameIn.value.trim()) { nameErr.hidden = true; nameIn.removeAttribute("aria-invalid"); } });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameIn.value.trim();
    if (!name) {
      nameErr.hidden = false; nameIn.setAttribute("aria-invalid", "true"); nameIn.setAttribute("aria-describedby", "q-name-err"); nameIn.focus();
      return;
    }
    var spots = Array.prototype.map.call(form.querySelectorAll('input[name="spot"]:checked'), function (c) { return t("s_" + c.value).toLowerCase(); });
    var when = document.getElementById("q-when").value.trim();
    var lines = [t("wa_hi"), t("wa_name") + ": " + name];
    if (spots.length) lines.push(t("wa_spot") + ": " + spots.join(", "));
    if (when) lines.push(t("wa_when") + ": " + when);
    track("generate_lead");
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

  // The admin page saves in another tab: show its changes here at once.
  window.addEventListener("storage", function (e) { if (e.key === FZ.KEY) { C = FZ.load(); render(); } });

  var h = location.hash.replace("#", "");
  setLang(T[h] ? h : (read("fizikalmed-lang") || "sr"));
})();
