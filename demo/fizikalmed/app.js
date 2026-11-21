(function () {
  "use strict";
  var WA = "38264426864";

  var T = {
    sr: {
      demo: "Demo koncept sajta, izradio",
      brand_sub: "fizikalna terapija", nav_aria: "Meni", nav_pain: "Gdje boli", nav_srv: "Liječenje", nav_ther: "Terapeut", nav_faq: "Pitanja", nav_cont: "Kontakt",
      book: "Zakaži",
      h1: "Fizikalna terapija u Podgorici",
      lead: "Bol u leđima, vratu ili zglobu? Pregled, terapija i program vježbi kod diplomiranog fizioterapeuta.",
      btn_wa: "Zakaži termin na WhatsApp",
      hero_alt: "Aleksandar Vidić u ordinaciji Fizikalmed", role: "fizioterapeut",
      tr1: "Diplomirani fizioterapeut, Medicinski fakultet UCG", tr2: "Sertifikati iz dry needlinga, kuppinga i osteopatije", tr3: "Plan terapije i vježbe za kuću",
      where_h: "Gdje vas boli?", where_sub: "Dodirnite mjesto na tijelu ili izaberite ispod, pa nam pošaljite poruku. Javićemo se sa slobodnim terminom.",
      s_neck: "Vrat", s_shoulder: "Rame", s_upper: "Gornji dio leđa", s_lower: "Krsta", s_hip: "Kuk", s_knee: "Koljeno",
      s_ankle: "Skočni zglob", s_sport: "Sportska povreda", s_postop: "Oporavak poslije operacije",
      l_name: "Ime", e_name: "Upišite ime.", l_when: "Kada vam odgovara?", ph_when: "npr. utorak poslije 17h",
      send: "Pošalji upit na WhatsApp",
      treat_h: "Liječenje", treat_sub: "Tehnike biramo i kombinujemo poslije pregleda, tako da terapija odgovara upravo vašem problemu.",
      slot: "Mjesto za fotografiju", what: "Šta je", why: "Za šta pomaže",
      t1: "Kineziterapija",
      w1: "Program vježbi napravljen samo za vas. Prvo ih radimo zajedno u ordinaciji, a zatim ih nastavljate kod kuće.",
      h1t: "Vraća snagu, pokretljivost i stabilnost poslije povrede ili operacije. Smanjuje bol u leđima i vratu koji se stalno vraća.",
      k1a: "Oporavak poslije operacije", k1b: "Hronični bol u leđima", k1c: "Sportske povrede", p1: "Pacijent radi vježbu uz terapeuta",
      t2: "Manuelna terapija i masaža",
      w2: "Terapeut rukama radi na zglobovima i mišićima: mobilizacija, istezanje i medicinska masaža.",
      h2t: "Oslobađa ukočene zglobove i napete mišiće i vraća normalan pokret. Pomaže kod ukočenog vrata, bola u krstima i glavobolje od napetosti.",
      k2a: "Ukočen vrat", k2b: "Bol u krstima", k2c: "Glavobolja od napetosti", p2: "Terapeut radi mobilizaciju vrata ili ramena",
      t3: "Dry needling i elektroakupunktura",
      w3: "Tanke sterilne igle postavljaju se u zategnute, bolne tačke u mišiću. Kod elektroakupunkture iglama se dodaje blaga električna stimulacija.",
      h3t: "Brzo opušta mišić koji drži bol i ograničava pokret. Koristi se kod bola u ramenu, vratu i leđima i kod sportskih povreda.",
      k3a: "Bol u ramenu", k3b: "Bolne tačke u mišiću", k3c: "Sportske povrede", p3: "Igle na ramenu ili leđima, krupni plan",
      t4: "Kupping terapija",
      w4: "Vakuum čašice postavljaju se na kožu i podižu tkivo ispod nje, pa se u tom dijelu pojačava protok krvi.",
      h4t: "Opušta napete i umorne mišiće i ubrzava oporavak. Pomaže kod bola u leđima i ramenima i poslije velikog sportskog napora.",
      k4a: "Napeti mišići", k4b: "Bol u leđima", k4c: "Oporavak sportista", p4: "Čašice na leđima pacijenta",
      t5: "Visceralna osteopatija",
      w5: "Nježne manuelne tehnike kojima terapeut vraća pokretljivost tkivima u predjelu trbuha i grudnog koša.",
      h5t: "Koristi se kao dopuna terapiji kada bol u donjem dijelu leđa ili napetost u trbuhu ne prolaze samo uz vježbe i masažu.",
      k5a: "Bol u donjem dijelu leđa", k5b: "Napetost u trbuhu", p5: "Terapeut radi tehniku u predjelu trbuha",
      band_h: "Zakažite prvi pregled", band_p: "Pošaljite poruku ili pozovite. Dogovaramo termin koji vam odgovara.",
      p6: "Aleksandar sa pacijentom tokom pregleda",
      ther_sub: "Diplomirani fizioterapeut, sa dodatnim edukacijama iz tehnika koje radi u ordinaciji.",
      c1: "Primijenjena fizioterapija, Medicinski fakultet Univerziteta Crne Gore",
      c2: "Visceralna osteopatija, trodnevni program, Podgorica 2024.",
      c3: "Međunarodna diploma: elektroakupunktura i elektro dry needling",
      c4: "Kupping terapija, sertifikat s odlikom",
      first_h: "Prvi dolazak",
      st1_h: "Javite se porukom ili pozivom", st1_p: "Dogovaramo termin koji vam odgovara.",
      st2_h: "Pregled i procjena", st2_p: "Ponesite nalaze i snimke, ako ih imate.",
      st3_h: "Terapija i plan", st3_p: "Dobijate plan tretmana i vježbe za kuću.",
      place_h: "Ordinacija", place_sub: "Ordinacija Fizikalmed je u Podgorici. Adresu i radno vrijeme pogledajte na Google mapama.",
      p7: "Prostorija za terapiju, širi kadar", p8: "Ulaz i natpis ordinacije", p9: "Oprema i sto za terapiju",
      rev: "Recenzije pacijenata na Google-u",
      faq_h: "Česta pitanja",
      q1: "Šta da ponesem na prvi pregled?", a1: "Nalaze i snimke (RTG, magnetna rezonanca, ultrazvuk), ako ih imate, i udobnu odjeću u kojoj se lako krećete.",
      q2: "Koliko tretmana mi je potrebno?", a2: "Zavisi od problema. Poslije prvog pregleda dobijate plan terapije i procjenu koliko dolazaka je potrebno.",
      q3: "Da li je dry needling bolan?", a3: "Osjeti se kratak ubod i ponekad trzaj mišića. Većina pacijenata ga dobro podnosi, a osjećaj brzo prolazi.",
      q4: "Mogu li doći poslije operacije?", a4: "Da. Ponesite otpusnu listu i nalaze, a terapiju planiramo prema preporukama vašeg ljekara.",
      cont_h: "Kontakt", cont_sub: "Najbrže je porukom na WhatsApp. Možete i pozvati.",
      call: "Poziv", map: "Google mape", map_s: "Adresa i radno vrijeme",
      made: "Sajt:", bar_aria: "Brzi kontakt",
      title: "Fizikalmed · Fizikalna terapija u Podgorici",
      wa_hi: "Dobar dan! Želim da zakažem termin u ordinaciji Fizikalmed.",
      wa_name: "Ime", wa_spot: "Boli me", wa_when: "Odgovara mi"
    },
    en: {
      demo: "Website demo concept by",
      brand_sub: "physiotherapy", nav_aria: "Menu", nav_pain: "Where it hurts", nav_srv: "Treatments", nav_ther: "Therapist", nav_faq: "FAQ", nav_cont: "Contact",
      book: "Book",
      h1: "Physiotherapy in Podgorica",
      lead: "Pain in your back, neck or a joint? Assessment, treatment and an exercise plan with a qualified physiotherapist.",
      btn_wa: "Book on WhatsApp",
      hero_alt: "Aleksandar Vidić at the Fizikalmed practice", role: "physiotherapist",
      tr1: "Qualified physiotherapist, University of Montenegro", tr2: "Certified in dry needling, cupping and osteopathy", tr3: "Treatment plan and exercises for home",
      where_h: "Where does it hurt?", where_sub: "Tap the spot on the body or pick below, then send us a message. We will reply with a free slot.",
      s_neck: "Neck", s_shoulder: "Shoulder", s_upper: "Upper back", s_lower: "Lower back", s_hip: "Hip", s_knee: "Knee",
      s_ankle: "Ankle", s_sport: "Sports injury", s_postop: "Recovery after surgery",
      l_name: "Name", e_name: "Please enter your name.", l_when: "When suits you?", ph_when: "e.g. Tuesday after 5 pm",
      send: "Send request on WhatsApp",
      treat_h: "Treatments", treat_sub: "We choose and combine techniques after the assessment, so the therapy fits your problem.",
      slot: "Photo goes here", what: "What it is", why: "What it helps with",
      t1: "Exercise therapy",
      w1: "An exercise programme made just for you. We do it together at the practice first, then you continue at home.",
      h1t: "Restores strength, mobility and stability after an injury or surgery. Reduces back and neck pain that keeps coming back.",
      k1a: "Recovery after surgery", k1b: "Chronic back pain", k1c: "Sports injuries", p1: "Patient doing an exercise with the therapist",
      t2: "Manual therapy and massage",
      w2: "The therapist works on joints and muscles by hand: mobilisation, stretching and medical massage.",
      h2t: "Frees stiff joints and tight muscles and brings back normal movement. Helps with a stiff neck, lower back pain and tension headaches.",
      k2a: "Stiff neck", k2b: "Lower back pain", k2c: "Tension headache", p2: "Therapist mobilising the neck or shoulder",
      t3: "Dry needling and electro-acupuncture",
      w3: "Fine sterile needles go into tight, painful points in the muscle. Electro-acupuncture adds gentle electrical stimulation to the needles.",
      h3t: "Quickly relaxes a muscle that holds pain and limits movement. Used for shoulder, neck and back pain and for sports injuries.",
      k3a: "Shoulder pain", k3b: "Muscle trigger points", k3c: "Sports injuries", p3: "Needles on the shoulder or back, close-up",
      t4: "Cupping therapy",
      w4: "Vacuum cups are placed on the skin and lift the tissue beneath, which increases blood flow in that area.",
      h4t: "Relaxes tight, tired muscles and speeds up recovery. Helps with back and shoulder pain and after hard training.",
      k4a: "Tight muscles", k4b: "Back pain", k4c: "Athlete recovery", p4: "Cups on the patient's back",
      t5: "Visceral osteopathy",
      w5: "Gentle manual techniques the therapist uses to restore mobility of the tissues in the abdomen and chest.",
      h5t: "Used alongside other therapy when lower back pain or abdominal tension does not ease with exercise and massage alone.",
      k5a: "Lower back pain", k5b: "Abdominal tension", p5: "Therapist working on the abdomen",
      band_h: "Book your first assessment", band_p: "Send a message or call. We agree on a time that suits you.",
      p6: "Aleksandar with a patient during an assessment",
      ther_sub: "Qualified physiotherapist with further training in the techniques he uses at the practice.",
      c1: "Applied Physiotherapy, Faculty of Medicine, University of Montenegro",
      c2: "Visceral osteopathy, three-day programme, Podgorica 2024",
      c3: "International diploma: electro-acupuncture and electro dry needling",
      c4: "Cupping therapy, certificate with distinction",
      first_h: "Your first visit",
      st1_h: "Send a message or call", st1_p: "We agree on a time that suits you.",
      st2_h: "Assessment", st2_p: "Bring any medical reports and scans you have.",
      st3_h: "Treatment and plan", st3_p: "You get a treatment plan and exercises for home.",
      place_h: "The practice", place_sub: "Fizikalmed is in Podgorica. See the address and opening hours on Google Maps.",
      p7: "Treatment room, wide shot", p8: "Entrance and practice sign", p9: "Equipment and treatment table",
      rev: "Patient reviews on Google",
      faq_h: "Questions",
      q1: "What should I bring to the first visit?", a1: "Any reports and scans you have (X-ray, MRI, ultrasound) and comfortable clothes you can move in.",
      q2: "How many sessions will I need?", a2: "It depends on the problem. After the first assessment you get a treatment plan and an estimate of how many visits you need.",
      q3: "Does dry needling hurt?", a3: "You feel a short prick and sometimes a twitch in the muscle. Most patients tolerate it well, and the feeling passes quickly.",
      q4: "Can I come after surgery?", a4: "Yes. Bring your discharge letter and reports, and we plan the therapy in line with your doctor's advice.",
      cont_h: "Contact", cont_sub: "A WhatsApp message is fastest. You can also call.",
      call: "Call", map: "Google Maps", map_s: "Address and opening hours",
      made: "Website:", bar_aria: "Quick contact",
      title: "Fizikalmed · Physiotherapy in Podgorica",
      wa_hi: "Hello! I would like to book a visit at Fizikalmed.",
      wa_name: "Name", wa_spot: "Pain", wa_when: "Suits me"
    },
    ru: {
      demo: "Демо-концепт сайта от",
      brand_sub: "физиотерапия", nav_aria: "Меню", nav_pain: "Где болит", nav_srv: "Лечение", nav_ther: "Терапевт", nav_faq: "Вопросы", nav_cont: "Контакты",
      book: "Записаться",
      h1: "Физиотерапия в Подгорице",
      lead: "Болит спина, шея или сустав? Осмотр, лечение и программа упражнений у дипломированного физиотерапевта.",
      btn_wa: "Записаться в WhatsApp",
      hero_alt: "Александар Видич в кабинете Fizikalmed", role: "физиотерапевт",
      tr1: "Дипломированный физиотерапевт, медфак Университета Черногории", tr2: "Сертификаты по сухим иглам, банкам и остеопатии", tr3: "План лечения и упражнения для дома",
      where_h: "Где болит?", where_sub: "Нажмите на место на фигуре или выберите ниже и отправьте нам сообщение. Мы ответим со свободным временем.",
      s_neck: "Шея", s_shoulder: "Плечо", s_upper: "Верх спины", s_lower: "Поясница", s_hip: "Бедро", s_knee: "Колено",
      s_ankle: "Голеностоп", s_sport: "Спортивная травма", s_postop: "Восстановление после операции",
      l_name: "Имя", e_name: "Укажите имя.", l_when: "Когда вам удобно?", ph_when: "например, вторник после 17:00",
      send: "Отправить заявку в WhatsApp",
      treat_h: "Лечение", treat_sub: "Техники подбираем и сочетаем после осмотра, чтобы лечение подходило именно вашей проблеме.",
      slot: "Здесь будет фото", what: "Что это", why: "Чем помогает",
      t1: "Кинезитерапия",
      w1: "Программа упражнений, составленная лично для вас. Сначала делаем их вместе в кабинете, потом вы продолжаете дома.",
      h1t: "Возвращает силу, подвижность и устойчивость после травмы или операции. Уменьшает боль в спине и шее, которая постоянно возвращается.",
      k1a: "Восстановление после операции", k1b: "Хроническая боль в спине", k1c: "Спортивные травмы", p1: "Пациент делает упражнение с терапевтом",
      t2: "Мануальная терапия и массаж",
      w2: "Терапевт работает руками с суставами и мышцами: мобилизация, растяжка и лечебный массаж.",
      h2t: "Освобождает скованные суставы и зажатые мышцы и возвращает нормальное движение. Помогает при скованной шее, боли в пояснице и головной боли напряжения.",
      k2a: "Скованная шея", k2b: "Боль в пояснице", k2c: "Головная боль напряжения", p2: "Терапевт делает мобилизацию шеи или плеча",
      t3: "Сухие иглы и электроакупунктура",
      w3: "Тонкие стерильные иглы вводят в напряжённые болезненные точки мышцы. При электроакупунктуре к иглам добавляется мягкая электростимуляция.",
      h3t: "Быстро расслабляет мышцу, которая держит боль и ограничивает движение. Применяется при боли в плече, шее и спине и при спортивных травмах.",
      k3a: "Боль в плече", k3b: "Триггерные точки", k3c: "Спортивные травмы", p3: "Иглы на плече или спине, крупный план",
      t4: "Баночная терапия",
      w4: "Вакуумные банки ставят на кожу, они приподнимают ткани под ней, и в этой зоне усиливается кровоток.",
      h4t: "Расслабляет напряжённые и уставшие мышцы и ускоряет восстановление. Помогает при боли в спине и плечах и после больших спортивных нагрузок.",
      k4a: "Зажатые мышцы", k4b: "Боль в спине", k4c: "Восстановление спортсменов", p4: "Банки на спине пациента",
      t5: "Висцеральная остеопатия",
      w5: "Мягкие мануальные техники, которыми терапевт возвращает подвижность тканям в области живота и грудной клетки.",
      h5t: "Применяется в дополнение к лечению, когда боль в пояснице или напряжение в животе не проходят только от упражнений и массажа.",
      k5a: "Боль в пояснице", k5b: "Напряжение в животе", p5: "Терапевт работает в области живота",
      band_h: "Запишитесь на первый осмотр", band_p: "Напишите или позвоните. Договоримся об удобном времени.",
      p6: "Александар с пациентом во время осмотра",
      ther_sub: "Дипломированный физиотерапевт с дополнительным обучением техникам, которые применяет в кабинете.",
      c1: "Прикладная физиотерапия, медицинский факультет Университета Черногории",
      c2: "Висцеральная остеопатия, трёхдневная программа, Подгорица, 2024",
      c3: "Международный диплом: электроакупунктура и электро-сухие иглы",
      c4: "Баночная терапия, сертификат с отличием",
      first_h: "Первый визит",
      st1_h: "Напишите или позвоните", st1_p: "Договоримся об удобном времени.",
      st2_h: "Осмотр и оценка", st2_p: "Возьмите заключения и снимки, если они есть.",
      st3_h: "Лечение и план", st3_p: "Вы получите план процедур и упражнения для дома.",
      place_h: "Кабинет", place_sub: "Кабинет Fizikalmed находится в Подгорице. Адрес и часы работы смотрите в Google Картах.",
      p7: "Процедурный кабинет, общий план", p8: "Вход и вывеска кабинета", p9: "Оборудование и кушетка",
      rev: "Отзывы пациентов в Google",
      faq_h: "Частые вопросы",
      q1: "Что взять на первый осмотр?", a1: "Заключения и снимки (рентген, МРТ, УЗИ), если они есть, и удобную одежду, в которой легко двигаться.",
      q2: "Сколько процедур понадобится?", a2: "Зависит от проблемы. После первого осмотра вы получите план лечения и оценку, сколько визитов нужно.",
      q3: "Больно ли от сухих игл?", a3: "Чувствуется короткий укол и иногда подёргивание мышцы. Большинство пациентов переносит это хорошо, ощущение быстро проходит.",
      q4: "Можно ли прийти после операции?", a4: "Да. Возьмите выписку и заключения, а лечение спланируем по рекомендациям вашего врача.",
      cont_h: "Контакты", cont_sub: "Быстрее всего написать в WhatsApp. Можно и позвонить.",
      call: "Звонок", map: "Google Карты", map_s: "Адрес и часы работы",
      made: "Сайт:", bar_aria: "Быстрая связь",
      title: "Fizikalmed · Физиотерапия в Подгорице",
      wa_hi: "Здравствуйте! Хочу записаться в кабинет Fizikalmed.",
      wa_name: "Имя", wa_spot: "Болит", wa_when: "Удобно"
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
    document.querySelectorAll(".hs").forEach(function (b) { b.title = t("s_" + b.dataset.spot); });
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
  document.querySelectorAll('.spots input').forEach(function (c) { c.addEventListener("change", function () { syncSpot(c.value); }); });

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
    var lines = [t("wa_hi"), t("wa_name") + ": " + name];
    if (spots.length) lines.push(t("wa_spot") + ": " + spots.join(", "));
    if (when) lines.push(t("wa_when") + ": " + when);
    track("generate_lead");
    window.open(waLink(lines.join("\n")), "_blank", "noopener");
  });

  var h = location.hash.replace("#", "");
  setLang(T[h] ? h : (read("fizikalmed-lang") || "sr"));
})();
