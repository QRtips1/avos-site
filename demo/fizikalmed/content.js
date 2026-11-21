/* Editable content of the Fizikalmed demo. The admin page edits a copy of this
   object; in the demo the copy lives in this browser's localStorage. */
(function () {
  "use strict";
  var KEY = "fizikalmed-content-v1";

  var DEFAULT = {
    texts: {
      h1: { sr: "Fizikalna terapija u Podgorici", en: "Physiotherapy in Podgorica", ru: "Физиотерапия в Подгорице" },
      lead: {
        sr: "Liječimo bol u leđima, vratu i zglobovima i pomažemo u oporavku poslije povreda i operacija.",
        en: "We treat back, neck and joint pain and help you recover after injuries and surgery.",
        ru: "Лечим боль в спине, шее и суставах и помогаем восстановиться после травм и операций."
      },
      ther_name: { sr: "Aleksandar Vidić", en: "Aleksandar Vidić", ru: "Aleksandar Vidić" },
      ther_role: { sr: "fizioterapeut", en: "physiotherapist", ru: "физиотерапевт" },
      ther_sub: {
        sr: "Diplomirani fizioterapeut. Redovno se usavršava i ima sertifikate iz dry needlinga, kupping terapije i visceralne osteopatije.",
        en: "Qualified physiotherapist who keeps up with his training, certified in dry needling, cupping and visceral osteopathy.",
        ru: "Дипломированный физиотерапевт. Регулярно повышает квалификацию, имеет сертификаты по сухим иглам, баночной терапии и висцеральной остеопатии."
      },
      place_sub: {
        sr: "Ordinacija Fizikalmed u Podgorici opremljena je savremenom opremom za fizikalnu terapiju i rehabilitaciju.",
        en: "The Fizikalmed practice in Podgorica is fitted with modern equipment for physiotherapy and rehabilitation.",
        ru: "Кабинет Fizikalmed в Подгорице оснащён современным оборудованием для физиотерапии и реабилитации."
      }
    },
    photos: { hero: "", therapist: "" },
    treatments: [
      {
        name: { sr: "Kineziterapija", en: "Exercise therapy", ru: "Кинезитерапия" },
        what: {
          sr: "Program vježbi napravljen samo za vas. Prvo ih radimo zajedno u ordinaciji, a zatim ih nastavljate kod kuće.",
          en: "An exercise programme made just for you. We do it together at the practice first, then you continue at home.",
          ru: "Программа упражнений, составленная лично для вас. Сначала делаем их вместе в кабинете, потом вы продолжаете дома."
        },
        why: {
          sr: "Vraća snagu, pokretljivost i stabilnost poslije povrede ili operacije. Smanjuje bol u leđima i vratu koji se stalno vraća.",
          en: "Restores strength, mobility and stability after an injury or surgery. Reduces back and neck pain that keeps coming back.",
          ru: "Возвращает силу, подвижность и устойчивость после травмы или операции. Уменьшает боль в спине и шее, которая постоянно возвращается."
        },
        tags: {
          sr: "Oporavak poslije operacije, Hronični bol u leđima, Sportske povrede",
          en: "Recovery after surgery, Chronic back pain, Sports injuries",
          ru: "Восстановление после операции, Хроническая боль в спине, Спортивные травмы"
        },
        hint: { sr: "Pacijent radi vježbu uz terapeuta", en: "Patient doing an exercise with the therapist", ru: "Пациент делает упражнение с терапевтом" },
        photo: ""
      },
      {
        name: { sr: "Manuelna terapija i masaža", en: "Manual therapy and massage", ru: "Мануальная терапия и массаж" },
        what: {
          sr: "Terapeut rukama radi na zglobovima i mišićima: mobilizacija, istezanje i medicinska masaža.",
          en: "The therapist works on joints and muscles by hand: mobilisation, stretching and medical massage.",
          ru: "Терапевт работает руками с суставами и мышцами: мобилизация, растяжка и лечебный массаж."
        },
        why: {
          sr: "Oslobađa ukočene zglobove i napete mišiće i vraća normalan pokret. Pomaže kod ukočenog vrata, bola u krstima i glavobolje od napetosti.",
          en: "Frees stiff joints and tight muscles and brings back normal movement. Helps with a stiff neck, lower back pain and tension headaches.",
          ru: "Освобождает скованные суставы и зажатые мышцы и возвращает нормальное движение. Помогает при скованной шее, боли в пояснице и головной боли напряжения."
        },
        tags: { sr: "Ukočen vrat, Bol u krstima, Glavobolja od napetosti", en: "Stiff neck, Lower back pain, Tension headache", ru: "Скованная шея, Боль в пояснице, Головная боль напряжения" },
        hint: { sr: "Terapeut radi mobilizaciju vrata ili ramena", en: "Therapist mobilising the neck or shoulder", ru: "Терапевт делает мобилизацию шеи или плеча" },
        photo: ""
      },
      {
        name: { sr: "Dry needling i elektroakupunktura", en: "Dry needling and electro-acupuncture", ru: "Сухие иглы и электроакупунктура" },
        what: {
          sr: "Tanke sterilne igle postavljaju se u zategnute, bolne tačke u mišiću. Kod elektroakupunkture iglama se dodaje blaga električna stimulacija.",
          en: "Fine sterile needles go into tight, painful points in the muscle. Electro-acupuncture adds gentle electrical stimulation to the needles.",
          ru: "Тонкие стерильные иглы вводят в напряжённые болезненные точки мышцы. При электроакупунктуре к иглам добавляется мягкая электростимуляция."
        },
        why: {
          sr: "Brzo opušta mišić koji drži bol i ograničava pokret. Koristi se kod bola u ramenu, vratu i leđima i kod sportskih povreda.",
          en: "Quickly relaxes a muscle that holds pain and limits movement. Used for shoulder, neck and back pain and for sports injuries.",
          ru: "Быстро расслабляет мышцу, которая держит боль и ограничивает движение. Применяется при боли в плече, шее и спине и при спортивных травмах."
        },
        tags: { sr: "Bol u ramenu, Bolne tačke u mišiću, Sportske povrede", en: "Shoulder pain, Muscle trigger points, Sports injuries", ru: "Боль в плече, Триггерные точки, Спортивные травмы" },
        hint: { sr: "Igle na ramenu ili leđima, krupni plan", en: "Needles on the shoulder or back, close-up", ru: "Иглы на плече или спине, крупный план" },
        photo: ""
      },
      {
        name: { sr: "Kupping terapija", en: "Cupping therapy", ru: "Баночная терапия" },
        what: {
          sr: "Vakuum čašice postavljaju se na kožu i podižu tkivo ispod nje, pa se u tom dijelu pojačava protok krvi.",
          en: "Vacuum cups are placed on the skin and lift the tissue beneath, which increases blood flow in that area.",
          ru: "Вакуумные банки ставят на кожу, они приподнимают ткани под ней, и в этой зоне усиливается кровоток."
        },
        why: {
          sr: "Opušta napete i umorne mišiće i ubrzava oporavak. Pomaže kod bola u leđima i ramenima i poslije velikog sportskog napora.",
          en: "Relaxes tight, tired muscles and speeds up recovery. Helps with back and shoulder pain and after hard training.",
          ru: "Расслабляет напряжённые и уставшие мышцы и ускоряет восстановление. Помогает при боли в спине и плечах и после больших спортивных нагрузок."
        },
        tags: { sr: "Napeti mišići, Bol u leđima, Oporavak sportista", en: "Tight muscles, Back pain, Athlete recovery", ru: "Зажатые мышцы, Боль в спине, Восстановление спортсменов" },
        hint: { sr: "Čašice na leđima pacijenta", en: "Cups on the patient's back", ru: "Банки на спине пациента" },
        photo: ""
      },
      {
        name: { sr: "Visceralna osteopatija", en: "Visceral osteopathy", ru: "Висцеральная остеопатия" },
        what: {
          sr: "Nježne manuelne tehnike kojima terapeut vraća pokretljivost tkivima u predjelu trbuha i grudnog koša.",
          en: "Gentle manual techniques the therapist uses to restore mobility of the tissues in the abdomen and chest.",
          ru: "Мягкие мануальные техники, которыми терапевт возвращает подвижность тканям в области живота и грудной клетки."
        },
        why: {
          sr: "Koristi se kao dopuna terapiji kada bol u donjem dijelu leđa ili napetost u trbuhu ne prolaze samo uz vježbe i masažu.",
          en: "Used alongside other therapy when lower back pain or abdominal tension does not ease with exercise and massage alone.",
          ru: "Применяется в дополнение к лечению, когда боль в пояснице или напряжение в животе не проходят только от упражнений и массажа."
        },
        tags: { sr: "Bol u donjem dijelu leđa, Napetost u trbuhu", en: "Lower back pain, Abdominal tension", ru: "Боль в пояснице, Напряжение в животе" },
        hint: { sr: "Terapeut radi tehniku u predjelu trbuha", en: "Therapist working on the abdomen", ru: "Терапевт работает в области живота" },
        photo: ""
      }
    ],
    equipment: [
      {
        name: { sr: "Elektroterapija (TENS i interferentne struje)", en: "Electrotherapy (TENS and interferential current)", ru: "Электротерапия (TENS и интерференционные токи)" },
        text: { sr: "Blage električne struje smanjuju bol i opuštaju napete mišiće.", en: "Gentle electrical currents ease pain and relax tight muscles.", ru: "Мягкие электрические токи снимают боль и расслабляют зажатые мышцы." },
        photo: ""
      },
      {
        name: { sr: "Terapijski ultrazvuk", en: "Therapeutic ultrasound", ru: "Терапевтический ультразвук" },
        text: { sr: "Ultrazvučni talasi zagrijavaju tkivo u dubini i ubrzavaju zarastanje tetiva i ligamenata.", en: "Sound waves warm deep tissue and speed up healing of tendons and ligaments.", ru: "Ультразвуковые волны прогревают ткани на глубине и ускоряют заживление сухожилий и связок." },
        photo: ""
      },
      {
        name: { sr: "Laserska terapija", en: "Laser therapy", ru: "Лазерная терапия" },
        text: { sr: "Biostimulativni laser smanjuje upalu i bol kod povreda zglobova i tetiva.", en: "A low-level laser reduces inflammation and pain in joint and tendon injuries.", ru: "Низкоинтенсивный лазер уменьшает воспаление и боль при травмах суставов и сухожилий." },
        photo: ""
      },
      {
        name: { sr: "Magnetoterapija", en: "Magnetic therapy", ru: "Магнитотерапия" },
        text: { sr: "Pulsno magnetno polje pomaže oporavak kostiju, zglobova i mekih tkiva.", en: "A pulsed magnetic field supports recovery of bones, joints and soft tissue.", ru: "Импульсное магнитное поле помогает восстановлению костей, суставов и мягких тканей." },
        photo: ""
      },
      {
        name: { sr: "Aparat za elektroakupunkturu", en: "Electro-acupuncture device", ru: "Аппарат для электроакупунктуры" },
        text: { sr: "Blaga stimulacija preko igala za dublje opuštanje mišića.", en: "Gentle stimulation through the needles for deeper muscle relaxation.", ru: "Мягкая стимуляция через иглы для более глубокого расслабления мышц." },
        photo: ""
      },
      {
        name: { sr: "Oprema za kineziterapiju", en: "Exercise equipment", ru: "Оборудование для кинезитерапии" },
        text: { sr: "Elastične trake, lopte, tegovi i balans podloge za vježbe pod nadzorom terapeuta.", en: "Resistance bands, balls, weights and balance pads for supervised exercise.", ru: "Эспандеры, мячи, гантели и балансировочные платформы для упражнений под контролем терапевта." },
        photo: ""
      },
      {
        name: { sr: "Podesivi terapijski sto", en: "Adjustable treatment table", ru: "Регулируемая кушетка" },
        text: { sr: "Visina i položaj stola prilagođavaju se svakom pacijentu i tretmanu.", en: "Its height and position adapt to each patient and treatment.", ru: "Высота и положение подстраиваются под каждого пациента и процедуру." },
        photo: ""
      }
    ],
    diplomas: [
      {
        title: { sr: "Primijenjena fizioterapija (BApp)", en: "Applied Physiotherapy (BApp)", ru: "Прикладная физиотерапия (BApp)" },
        org: { sr: "Medicinski fakultet, Univerzitet Crne Gore", en: "Faculty of Medicine, University of Montenegro", ru: "Медицинский факультет, Университет Черногории" },
        year: "", photo: ""
      },
      {
        title: { sr: "Visceralna osteopatija", en: "Visceral osteopathy", ru: "Висцеральная остеопатия" },
        org: { sr: "Trodnevni program, Podgorica", en: "Three-day programme, Podgorica", ru: "Трёхдневная программа, Подгорица" },
        year: "2024", photo: ""
      },
      {
        title: { sr: "Elektroakupunktura i elektro dry needling", en: "Electro-acupuncture and electro dry needling", ru: "Электроакупунктура и электро-сухие иглы" },
        org: { sr: "Međunarodna diploma", en: "International diploma", ru: "Международный диплом" },
        year: "", photo: ""
      },
      {
        title: { sr: "Kupping terapija", en: "Cupping therapy", ru: "Баночная терапия" },
        org: { sr: "Sertifikat s odlikom", en: "Certificate with distinction", ru: "Сертификат с отличием" },
        year: "", photo: ""
      }
    ],
    gallery: [
      { caption: { sr: "Prostorija za terapiju", en: "Treatment room", ru: "Процедурный кабинет" }, photo: "" },
      { caption: { sr: "Ulaz i natpis ordinacije", en: "Entrance and practice sign", ru: "Вход и вывеска кабинета" }, photo: "" },
      { caption: { sr: "Čekaonica", en: "Waiting area", ru: "Зона ожидания" }, photo: "" }
    ],
    contacts: [
      { type: "whatsapp", value: "+382 64 426 864", label: { sr: "", en: "", ru: "" } },
      { type: "phone", value: "064 426 864", label: { sr: "", en: "", ru: "" } },
      { type: "map", value: "https://share.google/V35NkDGWnLo8R317i", label: { sr: "Adresa i radno vrijeme", en: "Address and opening hours", ru: "Адрес и часы работы" } },
      { type: "instagram", value: "ordinacija_fizikalmed", label: { sr: "", en: "", ru: "" } }
    ]
  };

  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function load() {
    try {
      var s = localStorage.getItem(KEY);
      if (s) {
        var d = JSON.parse(s), base = clone(DEFAULT);
        Object.keys(base).forEach(function (k) { if (d[k] === undefined) d[k] = base[k]; });
        Object.keys(base.texts).forEach(function (k) { if (!d.texts[k]) d.texts[k] = base.texts[k]; });
        return d;
      }
    } catch (e) {}
    return clone(DEFAULT);
  }
  function save(d) { localStorage.setItem(KEY, JSON.stringify(d)); }
  function reset() { try { localStorage.removeItem(KEY); } catch (e) {} }

  // Phone numbers typed the local way (064…) become +382…
  function digits(v) {
    var d = String(v || "").replace(/[^\d+]/g, "");
    if (d.indexOf("+") === 0) return d.slice(1).replace(/\D/g, "");
    if (d.indexOf("00") === 0) return d.slice(2);
    if (d.indexOf("0") === 0) return "382" + d.slice(1);
    return d;
  }
  function href(c) {
    var v = String(c.value || "").trim();
    switch (c.type) {
      case "whatsapp": return "https://wa.me/" + digits(v);
      case "phone": return "tel:+" + digits(v);
      case "email": return "mailto:" + v;
      case "instagram": return /^https?:/.test(v) ? v : "https://www.instagram.com/" + v.replace(/^@/, "") + "/";
      case "facebook": return /^https?:/.test(v) ? v : "https://www.facebook.com/" + v.replace(/^@/, "");
      case "map": return /^https?:/.test(v) ? v : "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v);
      case "address": return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(v);
      default: return /^https?:/.test(v) ? v : "";
    }
  }

  window.FZ = { KEY: KEY, DEFAULT: DEFAULT, load: load, save: save, reset: reset, href: href, digits: digits, clone: clone };
})();
