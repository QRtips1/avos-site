(function () {
  "use strict";
  var WA = "38264426864";

  var T = {
    sr: {
      demo: "Demo koncept sajta, izradio",
      brand_sub: "fizikalna terapija", nav_aria: "Meni", nav_srv: "Usluge", nav_ther: "Terapeut", nav_cont: "Kontakt",
      h1: "Fizikalna terapija u Podgorici",
      lead: "Bol u leđima, vratu ili zglobu? Pregled, terapija i program vježbi kod diplomiranog fizioterapeuta.",
      btn_wa: "Zakaži termin na WhatsApp",
      f1: "Dry needling, kupping i manuelna terapija", f2: "Termin zakazujete porukom",
      hero_alt: "Aleksandar Vidić u ordinaciji Fizikalmed", role: "fizioterapeut",
      where_h: "Gdje vas boli?", where_sub: "Označite i pošaljite nam poruku. Javićemo se sa slobodnim terminom.",
      s_neck: "Vrat", s_shoulder: "Rame", s_upper: "Gornji dio leđa", s_lower: "Krsta", s_hip: "Kuk", s_knee: "Koljeno",
      s_ankle: "Skočni zglob", s_sport: "Sportska povreda", s_postop: "Oporavak poslije operacije",
      l_name: "Ime", e_name: "Upišite ime.", l_when: "Kada vam odgovara?", ph_when: "npr. utorak poslije 17h",
      l_note: "Kratko opišite problem (nije obavezno)", send: "Pošalji upit na WhatsApp",
      srv_h: "Usluge", srv_sub: "Terapiju biramo poslije pregleda, prema tome šta vas boli i kako se oporavljate.",
      t1: "Fizioterapija i vježbe", d1: "Pregled, procjena pokretljivosti i program vježbi koje radite u ordinaciji i kod kuće.",
      t2: "Manuelna terapija i masaža", d2: "Opuštanje napetih mišića i vraćanje pokreta u zglobove, rukama terapeuta.",
      t3: "Dry needling i elektroakupunktura", d3: "Tanke igle na bolnim tačkama u mišiću, po potrebi uz blagu električnu stimulaciju.",
      t4: "Kupping terapija", d4: "Vakuum čašice koje opuštaju napete mišiće i pokreću cirkulaciju.",
      t5: "Visceralna osteopatija", d5: "Nježne manuelne tehnike u predjelu trbuha i grudnog koša.",
      price_note: "Cijene tretmana šaljemo na upit.",
      portrait_alt: "Diplome i sertifikati Aleksandra Vidića u ordinaciji",
      ther_sub: "Diplomirani fizioterapeut, sa dodatnim edukacijama iz tehnika koje radi u ordinaciji.",
      c1: "Primijenjena fizioterapija, Medicinski fakultet Univerziteta Crne Gore",
      c2: "Visceralna osteopatija, trodnevni program, Podgorica 2024.",
      c3: "Međunarodna diploma: elektroakupunktura i elektro dry needling",
      c4: "Kupping terapija, sertifikat s odlikom",
      first_h: "Prvi dolazak",
      st1_h: "Javite se porukom ili pozivom", st1_p: "Dogovaramo termin koji vam odgovara.",
      st2_h: "Pregled i procjena", st2_p: "Ponesite nalaze i snimke, ako ih imate.",
      st3_h: "Terapija i plan", st3_p: "Dobijate plan tretmana i vježbe za kuću.",
      cont_h: "Kontakt", cont_sub: "Najbrže je porukom na WhatsApp. Možete i pozvati.",
      call: "Poziv", map: "Google mape", map_s: "Adresa i radno vrijeme",
      made: "Sajt:", bar_aria: "Brzi kontakt",
      title: "Fizikalmed · Fizikalna terapija u Podgorici",
      wa_hi: "Dobar dan! Želim da zakažem termin u ordinaciji Fizikalmed.",
      wa_name: "Ime", wa_spot: "Boli me", wa_when: "Odgovara mi", wa_note: "Opis"
    },
    en: {
      demo: "Website demo concept by",
      brand_sub: "physiotherapy", nav_aria: "Menu", nav_srv: "Treatments", nav_ther: "Therapist", nav_cont: "Contact",
      h1: "Physiotherapy in Podgorica",
      lead: "Pain in your back, neck or a joint? Assessment, treatment and an exercise plan with a qualified physiotherapist.",
      btn_wa: "Book on WhatsApp",
      f1: "Dry needling, cupping and manual therapy", f2: "Book your visit with a message",
      hero_alt: "Aleksandar Vidić at the Fizikalmed practice", role: "physiotherapist",
      where_h: "Where does it hurt?", where_sub: "Tick what applies and send us a message. We will reply with a free slot.",
      s_neck: "Neck", s_shoulder: "Shoulder", s_upper: "Upper back", s_lower: "Lower back", s_hip: "Hip", s_knee: "Knee",
      s_ankle: "Ankle", s_sport: "Sports injury", s_postop: "Recovery after surgery",
      l_name: "Name", e_name: "Please enter your name.", l_when: "When suits you?", ph_when: "e.g. Tuesday after 5 pm",
      l_note: "Describe the problem briefly (optional)", send: "Send request on WhatsApp",
      srv_h: "Treatments", srv_sub: "We choose the treatment after the assessment, based on where it hurts and how you recover.",
      t1: "Physiotherapy and exercise", d1: "Assessment, a mobility check and an exercise plan for the practice and for home.",
      t2: "Manual therapy and massage", d2: "Hands-on work that relaxes tight muscles and brings movement back to the joints.",
      t3: "Dry needling and electro-acupuncture", d3: "Fine needles on painful points in the muscle, with gentle electrical stimulation when needed.",
      t4: "Cupping therapy", d4: "Vacuum cups that relax tight muscles and boost circulation.",
      t5: "Visceral osteopathy", d5: "Gentle manual techniques for the abdomen and chest.",
      price_note: "We send treatment prices on request.",
      portrait_alt: "Aleksandar Vidić's diplomas and certificates at the practice",
      ther_sub: "Qualified physiotherapist with further training in the techniques he uses at the practice.",
      c1: "Applied Physiotherapy, Faculty of Medicine, University of Montenegro",
      c2: "Visceral osteopathy, three-day programme, Podgorica 2024",
      c3: "International diploma: electro-acupuncture and electro dry needling",
      c4: "Cupping therapy, certificate with distinction",
      first_h: "Your first visit",
      st1_h: "Send a message or call", st1_p: "We agree on a time that suits you.",
      st2_h: "Assessment", st2_p: "Bring any medical reports and scans you have.",
      st3_h: "Treatment and plan", st3_p: "You get a treatment plan and exercises for home.",
      cont_h: "Contact", cont_sub: "A WhatsApp message is fastest. You can also call.",
      call: "Call", map: "Google Maps", map_s: "Address and opening hours",
      made: "Website:", bar_aria: "Quick contact",
      title: "Fizikalmed · Physiotherapy in Podgorica",
      wa_hi: "Hello! I would like to book a visit at Fizikalmed.",
      wa_name: "Name", wa_spot: "Pain", wa_when: "Suits me", wa_note: "Details"
    },
    ru: {
      demo: "Демо-концепт сайта от",
      brand_sub: "физиотерапия", nav_aria: "Меню", nav_srv: "Услуги", nav_ther: "Терапевт", nav_cont: "Контакты",
      h1: "Физиотерапия в Подгорице",
      lead: "Болит спина, шея или сустав? Осмотр, лечение и программа упражнений у дипломированного физиотерапевта.",
      btn_wa: "Записаться в WhatsApp",
      f1: "Сухие иглы, банки и мануальная терапия", f2: "Запись по сообщению",
      hero_alt: "Александар Видич в кабинете Fizikalmed", role: "физиотерапевт",
      where_h: "Где болит?", where_sub: "Отметьте и отправьте нам сообщение. Мы ответим со свободным временем.",
      s_neck: "Шея", s_shoulder: "Плечо", s_upper: "Верх спины", s_lower: "Поясница", s_hip: "Тазобедренный сустав", s_knee: "Колено",
      s_ankle: "Голеностоп", s_sport: "Спортивная травма", s_postop: "Восстановление после операции",
      l_name: "Имя", e_name: "Укажите имя.", l_when: "Когда вам удобно?", ph_when: "например, вторник после 17:00",
      l_note: "Коротко опишите проблему (необязательно)", send: "Отправить заявку в WhatsApp",
      srv_h: "Услуги", srv_sub: "Лечение подбираем после осмотра: по тому, что болит и как идёт восстановление.",
      t1: "Физиотерапия и упражнения", d1: "Осмотр, оценка подвижности и программа упражнений в кабинете и дома.",
      t2: "Мануальная терапия и массаж", d2: "Расслабление зажатых мышц и возвращение подвижности суставам руками терапевта.",
      t3: "Сухие иглы и электроакупунктура", d3: "Тонкие иглы в болезненные точки мышцы, при необходимости с мягкой электростимуляцией.",
      t4: "Баночная терапия", d4: "Вакуумные банки расслабляют зажатые мышцы и улучшают кровообращение.",
      t5: "Висцеральная остеопатия", d5: "Мягкие мануальные техники в области живота и грудной клетки.",
      price_note: "Цены на процедуры пришлём по запросу.",
      portrait_alt: "Дипломы и сертификаты Александара Видича в кабинете",
      ther_sub: "Дипломированный физиотерапевт с дополнительным обучением техникам, которые применяет в кабинете.",
      c1: "Прикладная физиотерапия, медицинский факультет Университета Черногории",
      c2: "Висцеральная остеопатия, трёхдневная программа, Подгорица, 2024",
      c3: "Международный диплом: электроакупунктура и электро-сухие иглы",
      c4: "Баночная терапия, сертификат с отличием",
      first_h: "Первый визит",
      st1_h: "Напишите или позвоните", st1_p: "Договоримся об удобном времени.",
      st2_h: "Осмотр и оценка", st2_p: "Возьмите заключения и снимки, если они есть.",
      st3_h: "Лечение и план", st3_p: "Вы получите план процедур и упражнения для дома.",
      cont_h: "Контакты", cont_sub: "Быстрее всего написать в WhatsApp. Можно и позвонить.",
      call: "Звонок", map: "Google Карты", map_s: "Адрес и часы работы",
      made: "Сайт:", bar_aria: "Быстрая связь",
      title: "Fizikalmed · Физиотерапия в Подгорице",
      wa_hi: "Здравствуйте! Хочу записаться в кабинет Fizikalmed.",
      wa_name: "Имя", wa_spot: "Болит", wa_when: "Удобно", wa_note: "Описание"
    }
  };

  var lang = "sr";
  function t(k) { return (T[lang] && T[lang][k]) || T.sr[k] || ""; }
  function waLink(text) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); }
  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function track(name) { try { if (window.gtag) gtag("event", name, { demo: "fizikalmed" }); } catch (e) {} }

  function setLang(l) {
    lang = T[l] ? l : "sr";
    document.documentElement.lang = lang === "sr" ? "sr-Latn-ME" : lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) { el.alt = t(el.getAttribute("data-i18n-alt")); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    document.querySelectorAll(".js-wa").forEach(function (a) { a.href = waLink(t("wa_hi")); });
    document.title = t("title");
    store("fizikalmed-lang", lang);
  }

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      setLang(b.dataset.lang);
      if (history.replaceState) history.replaceState(null, "", b.dataset.lang === "sr" ? location.pathname : "#" + b.dataset.lang);
    });
  });
  document.querySelectorAll(".js-wa").forEach(function (a) { a.addEventListener("click", function () { track("contact_whatsapp"); }); });
  document.querySelectorAll('a[href^="tel:"]').forEach(function (a) { a.addEventListener("click", function () { track("contact_phone"); }); });

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
    var spots = Array.prototype.map.call(form.querySelectorAll('input[name="spot"]:checked'), function (c) {
      return t("s_" + c.value).toLowerCase();
    });
    var when = document.getElementById("q-when").value.trim();
    var note = document.getElementById("q-note").value.trim();
    var lines = [t("wa_hi"), t("wa_name") + ": " + name];
    if (spots.length) lines.push(t("wa_spot") + ": " + spots.join(", "));
    if (when) lines.push(t("wa_when") + ": " + when);
    if (note) lines.push(t("wa_note") + ": " + note);
    track("generate_lead");
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

  var h = location.hash.replace("#", "");
  setLang(T[h] ? h : (read("fizikalmed-lang") || "sr"));
})();
