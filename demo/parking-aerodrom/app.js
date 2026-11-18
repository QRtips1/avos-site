(function () {
  "use strict";
  var WA = "38269457717";
  // Example tariff until the client sends theirs: total price for 1..7 days, then +3 € per day.
  var TABLE = [5, 9, 12, 15, 18, 21, 25];
  var EXTRA = 3;
  function priceFor(days) {
    if (days <= TABLE.length) return TABLE[days - 1];
    return TABLE[TABLE.length - 1] + (days - TABLE.length) * EXTRA;
  }

  var T = {
    me: {
      demo: "Demo koncept sajta, izradio", demo2: "Naziv, cijene, tekstovi i fotografije su primjer.",
      brand_sub: "Aerodrom Podgorica", nav_prices: "Cijene", nav_how: "Kako radi", nav_where: "Lokacija",
      call_aria: "Pozovite nas", bar_aria: "Brzi kontakt",
      h1: "Parking kod Aerodroma Podgorica",
      lead: "Ostavite auto kod nas, a do terminala vas vozimo besplatno.",
      f_open: "Otvoreno 0–24", f_term: "3 min do terminala", f_price: "od {p} dnevno",
      btn_wa: "Rezerviši na WhatsApp", btn_call: "Pozovi",
      hero_alt: "Parkirani automobili kod Aerodroma Podgorica",
      t_title: "Koliko košta?", t_in: "Ostavljate auto", t_out: "Preuzimate auto", t_date: "Datum", t_time: "Vrijeme",
      t_err: "Preuzimanje mora biti poslije dolaska.", t_pax: "Putnika", t_plate: "Tablice", t_opt: "(nije obavezno)",
      t_days: "Broj dana", t_price: "Cijena", t_note: "Prevoz do terminala i nazad je uključen.",
      t_send: "Pošalji rezervaciju na WhatsApp", t_sending: "Otvaramo WhatsApp…", t_alt: "Radije zovete?",
      how_h: "Kako radi", how_lead: "Od parkinga do aviona za nekoliko minuta, bez traženja mjesta ispred terminala.",
      s1_h: "Dođete na parking", s1_p: "Parkirate auto na ograđenom prostoru pod video nadzorom.",
      s2_h: "Vozimo vas do terminala", s2_p: "Naš kombi vas sa prtljagom vozi do ulaza za oko 3 minuta.",
      s3_h: "Po povratku nas pozovite", s3_p: "Kad sletite, javite se. Čekamo vas ispred izlaza i vozimo do auta.",
      pr_h: "Cijene", pr_lead: "Jedna cijena za cijeli boravak, sa prevozom do terminala i nazad za sve putnike.",
      pr_cap: "Cijene parkinga po broju dana", pr_more: "Ostavljate auto na mjesec ili duže? Pišite nam i dogovorićemo cijenu.",
      day1: "1 dan", dayN: "{n} dana", extra: "Svaki dan preko 7",
      in_h: "Uključeno u cijenu", in1: "Prevoz do terminala i nazad", in2: "Video nadzor 0–24", in3: "Ograđen i osvijetljen prostor",
      in4: "Ključ ostaje kod vas", in5: "Čekamo vas i kad let kasni", pr_btn: "Izračunaj cijenu",
      wh_h: "Gdje smo", wh_addr: "Golubovci, 1,5 km od Aerodroma Podgorica", wh_hours: "Otvoreno 0–24, svaki dan",
      wh_map: "Otvori u Google mapama", term_alt: "Terminal Aerodroma Podgorica", map_title: "Mapa: Aerodrom Podgorica",
      faq_h: "Pitanja",
      q1: "Moram li unaprijed rezervisati?", a1: "Nije obavezno, ali sa rezervacijom vam čuvamo mjesto i znamo kada da vas čekamo.",
      q2: "Šta ako mi let kasni?", a2: "Kad sletite, samo nas pozovite. Čekamo vas bez doplate.",
      q3: "Kako se plaća?", a3: "Na parkingu, gotovinom ili karticom.",
      q4: "Koliko ljudi i prtljaga staje u kombi?", a4: "Do 8 putnika sa koferima. Za veću grupu javite nam unaprijed.",
      credits: "Fotografije (primjer):", made: "Sajt:",
      wa_hi: "Zdravo! Zanima me parking kod aerodroma.",
      wa_book: "Zdravo! Želim da rezervišem parking.", wa_in: "Ostavljam auto", wa_out: "Preuzimam auto", wa_at: "u",
      wa_days: "Broj dana", wa_pax: "Putnika", wa_plate: "Tablice", wa_price: "Cijena sa sajta"
    },
    en: {
      demo: "Website demo concept by", demo2: "The name, prices, texts and photos are examples.",
      brand_sub: "Podgorica Airport", nav_prices: "Prices", nav_how: "How it works", nav_where: "Location",
      call_aria: "Call us", bar_aria: "Quick contact",
      h1: "Parking at Podgorica Airport",
      lead: "Leave your car with us and we drive you to the terminal for free.",
      f_open: "Open 24/7", f_term: "3 min to the terminal", f_price: "from {p} a day",
      btn_wa: "Book on WhatsApp", btn_call: "Call",
      hero_alt: "Parked cars at Podgorica Airport",
      t_title: "What will it cost?", t_in: "Drop-off", t_out: "Pick-up", t_date: "Date", t_time: "Time",
      t_err: "Pick-up must be after drop-off.", t_pax: "Passengers", t_plate: "Licence plate", t_opt: "(optional)",
      t_days: "Days", t_price: "Price", t_note: "The shuttle to the terminal and back is included.",
      t_send: "Send booking on WhatsApp", t_sending: "Opening WhatsApp…", t_alt: "Prefer to call?",
      how_h: "How it works", how_lead: "From our lot to your flight in minutes, without hunting for a space at the terminal.",
      s1_h: "Drive in", s1_p: "Park your car in our fenced lot under 24/7 video surveillance.",
      s2_h: "We drive you to the terminal", s2_p: "Our van takes you and your luggage to the entrance in about 3 minutes.",
      s3_h: "Call us when you're back", s3_p: "Once you land, give us a call. We meet you outside arrivals and drive you to your car.",
      pr_h: "Prices", pr_lead: "One price for the whole stay, with the shuttle both ways for all passengers.",
      pr_cap: "Parking prices by number of days", pr_more: "Leaving the car for a month or longer? Message us and we'll agree a price.",
      day1: "1 day", dayN: "{n} days", extra: "Each day after 7",
      in_h: "Included in the price", in1: "Shuttle to the terminal and back", in2: "24/7 video surveillance", in3: "Fenced, well-lit lot",
      in4: "You keep your keys", in5: "We wait if your flight is late", pr_btn: "Check your price",
      wh_h: "Where we are", wh_addr: "Golubovci, 1.5 km from Podgorica Airport", wh_hours: "Open 24/7, every day",
      wh_map: "Open in Google Maps", term_alt: "Podgorica Airport terminal", map_title: "Map: Podgorica Airport",
      faq_h: "Questions",
      q1: "Do I need to book ahead?", a1: "It isn't required, but with a booking we hold a space for you and know when to expect you.",
      q2: "What if my flight is late?", a2: "Just call us when you land. Waiting is free.",
      q3: "How do I pay?", a3: "At the parking, in cash or by card.",
      q4: "How many people and bags fit in the van?", a4: "Up to 8 passengers with suitcases. For a larger group, let us know in advance.",
      credits: "Photos (examples):", made: "Website:",
      wa_hi: "Hello! I'm interested in airport parking.",
      wa_book: "Hello! I'd like to book parking.", wa_in: "Drop-off", wa_out: "Pick-up", wa_at: "at",
      wa_days: "Days", wa_pax: "Passengers", wa_plate: "Licence plate", wa_price: "Price on the website"
    }
  };

  var lang = "me";
  function t(k) { return (T[lang] && T[lang][k]) || T.me[k] || ""; }
  function money(v) {
    var s = v.toFixed(2);
    return lang === "en" ? "€" + s : s.replace(".", ",") + " €";
  }
  function waLink(text) { return "https://wa.me/" + WA + "?text=" + encodeURIComponent(text); }

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  function renderTable() {
    var rows = [[1, priceFor(1)], [3, priceFor(3)], [7, priceFor(7)], [14, priceFor(14)]];
    var html = rows.map(function (r) {
      var label = r[0] === 1 ? t("day1") : t("dayN").replace("{n}", r[0]);
      return "<tr><th scope=\"row\">" + label + "</th><td>" + money(r[1]) + "</td></tr>";
    }).join("");
    html += "<tr><th scope=\"row\">" + t("extra") + "</th><td>" + money(EXTRA) + "</td></tr>";
    document.getElementById("ptable").innerHTML = html;
  }

  function setLang(l) {
    lang = T[l] ? l : "me";
    document.documentElement.lang = lang === "en" ? "en" : "sr-Latn-ME";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = t(k);
      if (k === "f_price") v = v.replace("{p}", money(EXTRA));
      el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) { el.alt = t(el.getAttribute("data-i18n-alt")); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) { el.title = t(el.getAttribute("data-i18n-title")); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    document.querySelectorAll(".js-wa").forEach(function (a) { a.href = waLink(t("wa_hi")); });
    document.title = lang === "en" ? "TGD Parking · Parking at Podgorica Airport" : "TGD Parking · Parking kod Aerodroma Podgorica";
    renderTable();
    calc(false);
    store("tgd-lang", lang);
  }

  // ticket
  var d1 = document.getElementById("d1"), h1 = document.getElementById("h1t");
  var d2 = document.getElementById("d2"), h2 = document.getElementById("h2t");
  var pax = document.getElementById("pax"), plate = document.getElementById("plate");
  var oDays = document.getElementById("o-days"), oPrice = document.getElementById("o-price");
  var err2 = document.getElementById("err2");
  var form = document.getElementById("ticket");

  function iso(d) {
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  }
  function parse(d, h) {
    if (!d.value) return null;
    var p = d.value.split("-"), q = (h.value || "00:00").split(":");
    return new Date(+p[0], +p[1] - 1, +p[2], +q[0] || 0, +q[1] || 0);
  }
  function human(dt) {
    var dd = ("0" + dt.getDate()).slice(-2), mm = ("0" + (dt.getMonth() + 1)).slice(-2);
    var hh = ("0" + dt.getHours()).slice(-2), mi = ("0" + dt.getMinutes()).slice(-2);
    return lang === "en"
      ? dd + "/" + mm + "/" + dt.getFullYear() + " " + t("wa_at") + " " + hh + ":" + mi
      : dd + "." + mm + "." + dt.getFullYear() + ". " + t("wa_at") + " " + hh + ":" + mi;
  }

  var state = { days: 0, price: 0, ok: false };
  function calc(animate) {
    var a = parse(d1, h1), b = parse(d2, h2);
    var ok = !!(a && b && b > a);
    err2.hidden = ok || !(a && b);
    d2.setAttribute("aria-invalid", String(!ok && !!(a && b)));
    if (!ok) { oDays.textContent = "–"; oPrice.textContent = "–"; state.ok = false; return; }
    var days = Math.max(1, Math.ceil((b - a) / 86400000));
    var price = priceFor(days);
    var changed = days !== state.days;
    state = { days: days, price: price, ok: true, a: a, b: b };
    oDays.textContent = days;
    oPrice.textContent = money(price);
    if (animate && changed) {
      [oDays, oPrice].forEach(function (el) { el.classList.remove("tick"); void el.offsetWidth; el.classList.add("tick"); });
    }
  }

  var today = new Date(); today.setHours(0, 0, 0, 0);
  var start = new Date(today); start.setDate(start.getDate() + 1);
  var end = new Date(today); end.setDate(end.getDate() + 7);
  d1.min = iso(today); d2.min = iso(today);
  d1.value = iso(start); d2.value = iso(end);

  [d1, h1, d2, h2].forEach(function (el) {
    el.addEventListener("input", function () {
      if (el === d1 && d1.value) {
        d2.min = d1.value;
        if (d2.value && d2.value < d1.value) d2.value = d1.value;
      }
      calc(true);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    calc(false);
    if (!state.ok) {
      err2.hidden = false;
      (d1.value ? d2 : d1).focus();
      return;
    }
    var lines = [
      t("wa_book"),
      t("wa_in") + ": " + human(state.a),
      t("wa_out") + ": " + human(state.b),
      t("wa_days") + ": " + state.days,
      t("wa_pax") + ": " + pax.value
    ];
    var pl = plate.value.trim();
    if (pl) lines.push(t("wa_plate") + ": " + pl.toUpperCase());
    lines.push(t("wa_price") + ": " + money(state.price));
    var url = waLink(lines.join("\n"));
    var btn = form.querySelector("button[type=submit] span");
    var label = btn.textContent;
    btn.textContent = t("t_sending");
    if (window.gtag) gtag("event", "generate_lead", { method: "whatsapp_ticket" });
    var w = window.open(url, "_blank", "noopener");
    if (!w) location.href = url;
    setTimeout(function () { btn.textContent = label; }, 2500);
  });

  document.querySelectorAll(".lang button").forEach(function (b) {
    b.addEventListener("click", function () {
      setLang(b.dataset.lang);
      if (history.replaceState) history.replaceState(null, "", b.dataset.lang === "en" ? "#en" : location.pathname);
    });
  });

  // the phone bar appears once the hero buttons scroll out of view
  var hb = document.querySelector(".hero-btns");
  if ("IntersectionObserver" in window && hb) {
    new IntersectionObserver(function (en) {
      document.body.classList.toggle("past-hero", !en[0].isIntersecting && en[0].boundingClientRect.top < 0);
    }).observe(hb);
  } else document.body.classList.add("past-hero");

  var initial = location.hash === "#en" ? "en" : location.hash === "#me" ? "me" : (read("tgd-lang") || "me");
  setLang(initial);
})();
