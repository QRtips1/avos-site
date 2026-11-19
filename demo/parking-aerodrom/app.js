(function () {
  "use strict";
  var WA = "38269457717";
  // Client's tariff (2026-11-18): 3 € per 24 h; a month or more is agreed by phone.
  var DAY = 3;

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
      t_month: "Po dogovoru",
      how_h: "Kako radi", how_lead: "Ostavite auto kod nas, a mi vas vozimo do aviona i nazad, bez traženja mjesta ispred terminala.",
      s1_h: "Dođete na parking", s1_p: "Ostavite auto na parkingu pod video nadzorom.",
      s2_h: "Vozimo vas do aerodroma", s2_p: "Prevoz do terminala je besplatan.",
      s3_h: "Po povratku nas pozovite", s3_p: "Kad sletite, javite se i besplatno vas vozimo do auta.",
      pr_h: "Cijene", pr_lead: "3 € za svaka 24 sata, sa besplatnim prevozom do aerodroma i nazad.",
      pr_cap: "Cijene parkinga", pr_more: "Ostavljate auto na mjesec dana ili duže? Pišite nam i dogovorićemo cijenu.",
      r_day: "24 sata", r_week: "7 dana", r_month: "Mjesec dana",
      in_h: "Šta dobijate", in1: "Besplatan prevoz do aerodroma i nazad", in2: "Video nadzor", in3: "Mogućnost noćenja u apartmanu",
      in4: "Plaćanje gotovinom",
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
      wa_hi: "Zdravo! Zanima me parking kod aerodroma."
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
      t_month: "By agreement",
      how_h: "How it works", how_lead: "Leave your car with us and we drive you to your flight and back, no hunting for a space at the terminal.",
      s1_h: "Drive in", s1_p: "Leave your car in our lot under video surveillance.",
      s2_h: "We drive you to the airport", s2_p: "The ride to the terminal is free.",
      s3_h: "Call us when you're back", s3_p: "Once you land, give us a call and we drive you to your car for free.",
      pr_h: "Prices", pr_lead: "€3 for every 24 hours, with a free shuttle to the airport and back.",
      pr_cap: "Parking prices", pr_more: "Leaving the car for a month or longer? Message us and we'll agree a price.",
      r_day: "24 hours", r_week: "7 days", r_month: "One month",
      in_h: "What you get", in1: "Free shuttle to the airport and back", in2: "Video surveillance", in3: "Overnight stay in our apartments",
      in4: "Cash payment",
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
      wa_hi: "Hello! I'm interested in airport parking."
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
    store("delic-lang", lang);
  }

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
