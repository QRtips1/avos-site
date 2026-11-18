(function () {
  "use strict";
  var WA = "38269457717";
  // Client's tariff (2026-11-18): 3 € per started 24 h; a month or more is agreed by phone.
  var DAY = 3;
  var MONTH_DAYS = 30;
  function priceFor(days) { return days >= MONTH_DAYS ? null : days * DAY; }

  var T = {
    me: {
      demo: "Demo koncept sajta, izradio",
      brand_sub: "Aerodrom Podgorica", nav_prices: "Cijene", nav_how: "Kako radi", nav_where: "Lokacija",
      call_aria: "Pozovite nas", bar_aria: "Brzi kontakt",
      h1: "Parking kod Aerodroma Podgorica",
      lead: "Ostavite auto kod nas, a do aerodroma i nazad vozimo vas besplatno.",
      f_price: "{p} za 24 sata", f_term: "Besplatan prevoz do aerodroma", f_cam: "Video nadzor",
      btn_wa: "Rezerviši na WhatsApp", btn_call: "Pozovi",
      hero_alt: "Automobili na parkingu Aerodrom Delic",
      t_title: "Koliko košta?", t_in: "Ostavljate auto", t_out: "Preuzimate auto", t_date: "Datum", t_time: "Vrijeme",
      t_err: "Preuzimanje mora biti poslije dolaska.", t_pax: "Putnika", t_plate: "Tablice", t_opt: "(nije obavezno)",
      t_days: "Broj dana", t_price: "Cijena", t_note: "Prevoz do aerodroma i nazad je besplatan.",
      t_month: "Po dogovoru",
      t_send: "Rezerviši na WhatsApp", t_sending: "Otvaramo WhatsApp…", t_alt: "Radije zovete?",
      how_h: "Kako radi", how_lead: "Ostavite auto kod nas, a mi vas vozimo do aviona i nazad, bez traženja mjesta ispred terminala.",
      s1_h: "Dođete na parking", s1_p: "Ostavite auto na parkingu pod video nadzorom.",
      s2_h: "Vozimo vas do aerodroma", s2_p: "Prevoz do terminala je besplatan.",
      s3_h: "Po povratku nas pozovite", s3_p: "Kad sletite, javite se i besplatno vas vozimo do auta.",
      pr_h: "Cijene", pr_lead: "3 € za svaka 24 sata, sa besplatnim prevozom do aerodroma i nazad.",
      pr_cap: "Cijene parkinga", pr_more: "Ostavljate auto na mjesec dana ili duže? Pišite nam i dogovorićemo cijenu.",
      r_day: "24 sata", r_week: "7 dana", r_month: "Mjesec dana",
      in_h: "Šta dobijate", in1: "Besplatan prevoz do aerodroma i nazad", in2: "Video nadzor", in3: "Mogućnost noćenja u apartmanu",
      in4: "Plaćanje gotovinom", pr_btn: "Izračunaj cijenu",
      wh_h: "Gdje smo", wh_addr: "47 ulica, Golubovci, kod Aerodroma Podgorica",
      stay_h: "Noćenje prije ranog leta", stay_lead: "Na istoj adresi imamo tri apartmana. Prenoćite, auto ostaje kod nas, a ujutru vas vozimo na aerodrom. Rezervišite direktno kod nas.",
      apt_on: "na Booking.com", apt_rev: "recenzija", apt_wa: "Pitaj za termin", apt_call: "Rezervacije apartmana, poziv i WhatsApp:", apt_ig: "Više fotografija na Instagramu:",
      wa_apt: "Zdravo! Zanima me noćenje u apartmanu \"{n}\". Datum: ",
      wh_map: "Otvori u Google mapama", term_alt: "Terminal Aerodroma Podgorica", map_title: "Mapa: Parking Aerodrom Delic",
      faq_h: "Pitanja",
      q1: "Kako da rezervišem mjesto?", a1: "Pišite nam na WhatsApp ili pozovite i recite kada dolazite i kada se vraćate.",
      q2: "Kako se plaća?", a2: "Gotovinom.",
      q3: "Koliko košta mjesec dana?", a3: "Cijenu za mjesec dana dogovaramo. Pišite nam na WhatsApp.",
      q4: "Mogu li prenoćiti prije ranog leta?", a4: "Da, na istoj adresi imamo tri apartmana. Rezervišite direktno kod nas, pozivom ili na WhatsApp.",
      credits: "Fotografija terminala:", made: "Sajt:",
      wa_hi: "Zdravo! Zanima me parking kod aerodroma.",
      wa_book: "Zdravo! Želim da rezervišem parking.", wa_in: "Ostavljam auto", wa_out: "Preuzimam auto", wa_at: "u",
      wa_days: "Broj dana", wa_pax: "Putnika", wa_plate: "Tablice", wa_price: "Cijena sa sajta"
    },
    en: {
      demo: "Website demo concept by",
      brand_sub: "Podgorica Airport", nav_prices: "Prices", nav_how: "How it works", nav_where: "Location",
      call_aria: "Call us", bar_aria: "Quick contact",
      h1: "Parking at Podgorica Airport",
      lead: "Leave your car with us and we drive you to the airport and back for free.",
      f_price: "{p} per 24 hours", f_term: "Free airport shuttle", f_cam: "Video surveillance",
      btn_wa: "Book on WhatsApp", btn_call: "Call",
      hero_alt: "Cars at Parking Aerodrom Delic",
      t_title: "What will it cost?", t_in: "Drop-off", t_out: "Pick-up", t_date: "Date", t_time: "Time",
      t_err: "Pick-up must be after drop-off.", t_pax: "Passengers", t_plate: "Licence plate", t_opt: "(optional)",
      t_days: "Days", t_price: "Price", t_note: "The shuttle to the airport and back is free.",
      t_month: "By agreement",
      t_send: "Book on WhatsApp", t_sending: "Opening WhatsApp…", t_alt: "Prefer to call?",
      how_h: "How it works", how_lead: "Leave your car with us and we drive you to your flight and back, no hunting for a space at the terminal.",
      s1_h: "Drive in", s1_p: "Leave your car in our lot under video surveillance.",
      s2_h: "We drive you to the airport", s2_p: "The ride to the terminal is free.",
      s3_h: "Call us when you're back", s3_p: "Once you land, give us a call and we drive you to your car for free.",
      pr_h: "Prices", pr_lead: "€3 for every 24 hours, with a free shuttle to the airport and back.",
      pr_cap: "Parking prices", pr_more: "Leaving the car for a month or longer? Message us and we'll agree a price.",
      r_day: "24 hours", r_week: "7 days", r_month: "One month",
      in_h: "What you get", in1: "Free shuttle to the airport and back", in2: "Video surveillance", in3: "Overnight stay in our apartments",
      in4: "Cash payment", pr_btn: "Check your price",
      wh_h: "Where we are", wh_addr: "47 ulica, Golubovci, near Podgorica Airport",
      stay_h: "Stay the night before an early flight", stay_lead: "We have three apartments at the same address. Stay overnight, leave the car with us and we drive you to the airport in the morning. Book directly with us.",
      apt_on: "on Booking.com", apt_rev: "reviews", apt_wa: "Ask for dates", apt_call: "Apartment bookings, call or WhatsApp:", apt_ig: "More photos on Instagram:",
      wa_apt: "Hello! I'm interested in a night at \"{n}\". Date: ",
      wh_map: "Open in Google Maps", term_alt: "Podgorica Airport terminal", map_title: "Map: Parking Aerodrom Delic",
      faq_h: "Questions",
      q1: "How do I book a space?", a1: "Message us on WhatsApp or call, and tell us when you arrive and when you fly back.",
      q2: "How do I pay?", a2: "In cash.",
      q3: "How much is a month?", a3: "We agree the monthly price with you. Message us on WhatsApp.",
      q4: "Can I stay overnight before an early flight?", a4: "Yes, we have three apartments at the same address. Book directly with us by phone or WhatsApp.",
      credits: "Terminal photo:", made: "Website:",
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
    var rows = [[t("r_day"), money(DAY)], [t("r_week"), money(7 * DAY)], [t("r_month"), t("t_month")]];
    document.getElementById("ptable").innerHTML = rows.map(function (r) {
      return "<tr><th scope=\"row\">" + r[0] + "</th><td>" + r[1] + "</td></tr>";
    }).join("");
  }

  function setLang(l) {
    lang = T[l] ? l : "me";
    document.documentElement.lang = lang === "en" ? "en" : "sr-Latn-ME";
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var k = el.getAttribute("data-i18n");
      var v = t(k);
      if (k === "f_price") v = v.replace("{p}", money(DAY));
      el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) { el.alt = t(el.getAttribute("data-i18n-alt")); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    document.querySelectorAll("[data-i18n-title]").forEach(function (el) { el.title = t(el.getAttribute("data-i18n-title")); });
    document.querySelectorAll("[data-num]").forEach(function (el) { var n = el.getAttribute("data-num"); el.textContent = lang === "en" ? n.replace(",", ".") : n; });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === lang)); });
    document.querySelectorAll(".js-wa").forEach(function (a) { a.href = waLink(t("wa_hi")); });
    document.querySelectorAll(".js-apt").forEach(function (a) { a.href = waLink(t("wa_apt").replace("{n}", a.dataset.apt)); });
    document.title = lang === "en" ? "Parking Aerodrom Delic · Parking at Podgorica Airport" : "Parking Aerodrom Delic · Parking kod Aerodroma Podgorica";
    renderTable();
    calc(false);
    store("delic-lang", lang);
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
    oPrice.textContent = price === null ? t("t_month") : money(price);
    oPrice.classList.toggle("t-txt", price === null);
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
    lines.push(t("wa_price") + ": " + (state.price === null ? t("t_month") : money(state.price)));
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

  var initial = location.hash === "#en" ? "en" : location.hash === "#me" ? "me" : (read("delic-lang") || "me");
  setLang(initial);
})();
