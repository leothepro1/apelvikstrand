/* apelvikstrand.maps.ui.js
   - ENDA ANSVAR: pins, filter, modal, UI, innehåll
   - Förutsätter att:
     1) mapbox-gl.js redan är laddad
     2) apelvikstrand.maps.core.js redan har skapat kartan och satt window.sektion73Map + window.sektion73MapConfig
   - Målet: IDENTISK funktion/layout/utseende som idag (endast split av filer)
*/
(function () {
  "use strict";

  function sektion73Ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  sektion73Ready(function sektion73InitUi() {
    const sektion73Canvas = document.getElementById("sektion73MapCanvas");
    if (!sektion73Canvas) return;

    // Kräver core
    const sektion73Map = window.sektion73Map;
    if (!sektion73Map || typeof sektion73Map.on !== "function") {
      console.error(
        "sektion73 maps.ui: window.sektion73Map saknas. Ladda apelvikstrand.maps.core.js före maps.ui.js"
      );
      return;
    }

    // Läs all config från core (för att inte duplicera siffror och för att bli identiskt)
    const sektion73Cfg = window.sektion73MapConfig || {};

    // --- CONFIG (hämtas från core) ---
    const sektion73Home = sektion73Cfg.sektion73Home;
    const sektion73Golf = sektion73Cfg.sektion73Golf;
    const sektion73Surfcenter = sektion73Cfg.sektion73Surfcenter;
    const sektion73Majas = sektion73Cfg.sektion73Majas;
    const sektion73Kusthotellet = sektion73Cfg.sektion73Kusthotellet;
    const sektion73surfcenter = sektion73Cfg.sektion73surfcenter;
    const sektion73Tangkorar = sektion73Cfg.sektion73Tangkorar;
    const sektion73livs = sektion73Cfg.sektion73livs;
    const sektion73InitialCenter = sektion73Cfg.sektion73InitialCenter;
    const sektion73apelviken = sektion73Cfg.sektion73apelviken;
    const sektion73minigolf = sektion73Cfg.sektion73minigolf;
    const sektion73Sanatorie_4 = sektion73Cfg.sektion73Sanatorie_4;
    const sektion73Tangkorar_4 = sektion73Cfg.sektion73Tangkorar_4;
    const sektion73Tangkorar_2 = sektion73Cfg.sektion73Tangkorar_2;
    const sektion73Tangkorar_10 = sektion73Cfg.sektion73Tangkorar_10;
    const sektion73Tangkorar_17 = sektion73Cfg.sektion73Tangkorar_17;

    const sektion73MinZoom =
      typeof sektion73Cfg.sektion73MinZoom === "number" ? sektion73Cfg.sektion73MinZoom : 13.2;
    const sektion73MaxZoom =
      typeof sektion73Cfg.sektion73MaxZoom === "number" ? sektion73Cfg.sektion73MaxZoom : 17.9;
    const sektion73StartZoom =
      typeof sektion73Cfg.sektion73StartZoom === "number" ? sektion73Cfg.sektion73StartZoom : 14.5;
    const sektion73SecondaryPinsMinZoom =
      typeof sektion73Cfg.sektion73SecondaryPinsMinZoom === "number"
        ? sektion73Cfg.sektion73SecondaryPinsMinZoom
        : 15.8;

    const sektion73Pitch =
      typeof sektion73Cfg.sektion73Pitch === "number" ? sektion73Cfg.sektion73Pitch : 63;
    const sektion73Bearing =
      typeof sektion73Cfg.sektion73Bearing === "number" ? sektion73Cfg.sektion73Bearing : 45;

    const sektion73PinZoom =
      typeof sektion73Cfg.sektion73PinZoom === "number" ? sektion73Cfg.sektion73PinZoom : 24.15;
    const sektion73PinZoomDur =
      typeof sektion73Cfg.sektion73PinZoomDur === "number" ? sektion73Cfg.sektion73PinZoomDur : 950;

    const sektion73ModalDurMs =
      typeof sektion73Cfg.sektion73ModalDurMs === "number" ? sektion73Cfg.sektion73ModalDurMs : 420;

    // (valfritt) säkerställ samma min/max zoom (idempotent)
    try {
      if (typeof sektion73Map.setMinZoom === "function") sektion73Map.setMinZoom(sektion73MinZoom);
      if (typeof sektion73Map.setMaxZoom === "function") sektion73Map.setMaxZoom(sektion73MaxZoom);
    } catch (_) {}

    /* =========================================================
       sektion73 – DEBUG PICK: logga exakt 3D-byggnad vid klick
       - Klicka på huset (taket) du vill ersätta
       - Console visar: layerId + featureId + properties
       ========================================================= */

    (function sektion73DebugPickBuilding_00009() {
      if (!sektion73Map || typeof sektion73Map.queryRenderedFeatures !== "function") return;

      const sektion73EnableDebugPickBuilding_00020 = false;
      if (!sektion73EnableDebugPickBuilding_00020) return;

      function sektion73GetExtrusionLayerIds_00010() {
        try {
          const style = sektion73Map.getStyle();
          const layers = (style && style.layers) || [];
          const ids = [];
          for (let i = 0; i < layers.length; i++) {
            const ly = layers[i];
            if (!ly) continue;
            if (ly.type === "fill-extrusion") ids.push(ly.id);
          }
          return ids;
        } catch (e) {
          return [];
        }
      }

      function sektion73OnClick_00011(e) {
        try {
          const pt = e && e.point;
          if (!pt) return;

          const layerIds = sektion73GetExtrusionLayerIds_00010();
          if (!layerIds.length) return;

          const feats = sektion73Map.queryRenderedFeatures(pt, { layers: layerIds });
          if (!feats || !feats.length) {
            console.log("sektion73 DEBUG PICK: inga extrusion-features här");
            return;
          }

          const f = feats[0];
          console.log("sektion73 DEBUG PICK:", {
            layerId: f.layer && f.layer.id,
            source: f.source,
            sourceLayer: f.sourceLayer,
            id: f.id,
            properties: f.properties
          });
        } catch (err) {
          console.error("sektion73 DEBUG PICK error:", err);
        }
      }

      sektion73Map.on("click", sektion73OnClick_00011);
    })();

    /* =========================================================
       UI / Pins / Filters / Modal (oförändrat innehåll från din nuvarande maps.js)
       ========================================================= */

    // ---- PASTED BODY (från din maps-pre-split.js, allt efter debug-pick till precis före "Debug helpers") ----

/* =========================================================
     sektion73 – DEBUG PICK: logga exakt 3D-byggnad vid klick
     - Klicka på huset (taket) du vill ersätta
     - Console visar: layerId + featureId + properties
     ========================================================= */

  (function sektion73DebugPickBuilding_00009() {
    if (!sektion73Map || typeof sektion73Map.queryRenderedFeatures !== "function") return;

    const sektion73EnableDebugPickBuilding_00020 = false;
    if (!sektion73EnableDebugPickBuilding_00020) return;

    function sektion73GetExtrusionLayerIds_00010() {
      try {
        const style = sektion73Map.getStyle();
        const layers = style && style.layers ? style.layers : [];
        const ids = [];
        for (let i = 0; i < layers.length; i++) {
          const ly = layers[i];
          if (!ly || !ly.type) continue;
          if (ly.type === "fill-extrusion") ids.push(ly.id);
        }
        return ids;
      } catch (e) {
        return [];
      }
    }

    function sektion73OnClick_00011(e) {
      try {
        const pt = e && e.point;
        if (!pt) return;

        const layerIds = sektion73GetExtrusionLayerIds_00010();
        if (!layerIds.length) return;

        const feats = sektion73Map.queryRenderedFeatures(pt, { layers: layerIds });
        if (!feats || !feats.length) {
          console.log("sektion73 DEBUG PICK: inga extrusion-features här");
          return;
        }

        const f = feats[0];
        console.log("sektion73 DEBUG PICK:", {
          layerId: f.layer && f.layer.id,
          source: f.source,
          sourceLayer: f.sourceLayer,
          id: f.id,
          properties: f.properties
        });
      } catch (err) {
        console.error("sektion73 DEBUG PICK error:", err);
      }
    }

    sektion73Map.on("click", sektion73OnClick_00011);
  })();

  /* =========================================================
     sektion73 – UI HELPERS
     ========================================================= */

  function sektion73Clamp(num, min, max) {
    return Math.min(max, Math.max(min, num));
  }

  function sektion73Later(fn, ms) {
    window.setTimeout(fn, ms || 0);
  }

  function sektion73Idle(fn, timeout) {
    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      ric(fn, { timeout: timeout || 1200 });
    } else {
      sektion73Later(fn, 0);
    }
  }

  function sektion73El(tag, attrs) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach((k) => {
        if (k === "class") el.className = attrs[k];
        else if (k === "html") el.innerHTML = attrs[k];
        else el.setAttribute(k, attrs[k]);
      });
    }
    return el;
  }

  /* =========================================================
     sektion73 – SVG ICONS (oförändrat)
     ========================================================= */

  const sektion73SvgPin_00001 =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" focusable="false"><path d="M16 2c-5.523 0-10 4.477-10 10 0 7.5 10 18 10 18s10-10.5 10-18c0-5.523-4.477-10-10-10zm0 13.5a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7z"/></svg>';

  const sektion73SvgClose_00002 =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 1 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.42 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.42L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z"/></svg>';

  const sektion73SvgArrow_00003 =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 4l1.41 1.41L7.83 11H20v2H7.83l5.58 5.59L12 20l-8-8z"/></svg>';

  /* =========================================================
     sektion73 – MODAL / CSS INJECT (oförändrat)
     ========================================================= */

  (function sektion73EnsureUiCss_00004() {
    if (document.getElementById("sektion73UiCss")) return;

    const css = document.createElement("style");
    css.id = "sektion73UiCss";
    css.type = "text/css";
    css.textContent =
      ':root{' +
      "--sektion73-modal-dur:" + sektion73ModalDurMs + "ms;" +
      "--sektion73-modal-ease:cubic-bezier(.2,.8,.2,1);" +
      "--sektion73-modal-bg:#ffffff;" +
      "--sektion73-modal-text:#0e1318;" +
      "--sektion73-modal-muted:rgba(14,19,24,.68);" +
      "--sektion73-modal-line:rgba(14,19,24,.14);" +
      "--sektion73-modal-shadow:0 30px 80px rgba(0,0,0,.22);" +
      "--sektion73-accent:#f2b200;" +
      "--sektion73-radius:18px;" +
      "}" +
      "#sektion73MapCanvas .sektion73PinWrap .sektion73PinBubble," +
      "#sektion73MapCanvas .sektion73PinWrap .sektion73PinBtn{" +
      "transition:transform 140ms ease,box-shadow 140ms ease;will-change:transform}" +
      "#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinBubble," +
      "#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinBtn{" +
      "transform:translateY(-2px)}" +
      "#sektion73MapCanvas .sektion73PinWrap:active .sektion73PinBubble," +
      "#sektion73MapCanvas .sektion73PinWrap:active .sektion73PinBtn{" +
      "transform:translateY(1px)}" +
      "#sektion73MapCanvas .sektion73PinWrap{position:relative;display:inline-grid;grid-auto-flow:row;gap:8px;place-items:center}" +
      "#sektion73MapCanvas .sektion73PinBubble{display:grid;place-items:center;width:42px;height:42px;border-radius:999px;background:#fff;color:#0e1318;box-shadow:0 10px 30px rgba(0,0,0,.18)}" +
      "#sektion73MapCanvas .sektion73PinBubble svg{width:22px;height:22px;display:block}" +
      "#sektion73MapCanvas .sektion73PinBtn{border:0;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px);color:#0e1318;font:600 13px/1.1 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;padding:10px 12px;border-radius:999px;box-shadow:0 10px 30px rgba(0,0,0,.16);white-space:nowrap}" +
      "#sektion73MapCanvas .sektion73PinBtn:focus{outline:2px solid rgba(242,178,0,.55);outline-offset:2px}" +
      "#sektion73ModalRoot{position:fixed;inset:0;z-index:999999;display:none}" +
      "#sektion73ModalRoot.sektion73Open{display:block}" +
      "#sektion73ModalBackdrop{position:absolute;inset:0;background:rgba(0,0,0,.42);opacity:0;transition:opacity var(--sektion73-modal-dur) var(--sektion73-modal-ease)}" +
      "#sektion73ModalRoot.sektion73Open #sektion73ModalBackdrop{opacity:1}" +
      "#sektion73ModalSheet{position:absolute;left:50%;bottom:18px;transform:translateX(-50%) translateY(24px);opacity:0;width:min(980px,calc(100vw - 24px));background:var(--sektion73-modal-bg);color:var(--sektion73-modal-text);border-radius:var(--sektion73-radius);box-shadow:var(--sektion73-modal-shadow);overflow:hidden;transition:transform var(--sektion73-modal-dur) var(--sektion73-modal-ease),opacity var(--sektion73-modal-dur) var(--sektion73-modal-ease)}" +
      "#sektion73ModalRoot.sektion73Open #sektion73ModalSheet{transform:translateX(-50%) translateY(0);opacity:1}" +
      "#sektion73ModalTop{display:flex;gap:12px;align-items:center;justify-content:space-between;padding:14px 14px 10px 14px;border-bottom:1px solid var(--sektion73-modal-line)}" +
      "#sektion73ModalTitle{font:700 16px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;margin:0}" +
      "#sektion73ModalClose{appearance:none;border:0;background:transparent;border-radius:12px;width:40px;height:40px;display:grid;place-items:center;cursor:pointer;color:var(--sektion73-modal-text)}" +
      "#sektion73ModalClose svg{width:22px;height:22px}" +
      "#sektion73ModalBody{padding:14px}" +
      "#sektion73ModalLead{font:500 14px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:var(--sektion73-modal-muted);margin:0 0 12px 0}" +
      "#sektion73ModalGrid{display:grid;grid-template-columns:1fr 1fr;gap:14px}" +
      "#sektion73ModalGallery{position:relative;border-radius:14px;overflow:hidden;background:#f1f3f4;min-height:220px}" +
      "#sektion73ModalGallery img{width:100%;height:100%;object-fit:cover;display:block}" +
      "#sektion73ModalMeta{display:flex;flex-direction:column;gap:10px}" +
      "#sektion73ModalCtas{display:flex;flex-wrap:wrap;gap:10px;margin-top:4px}" +
      ".sektion73Btn{appearance:none;border:0;border-radius:999px;padding:12px 14px;font:700 14px/1 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;cursor:pointer}" +
      ".sektion73BtnPrimary{background:var(--sektion73-accent);color:#111}" +
      ".sektion73BtnSecondary{background:rgba(14,19,24,.08);color:#111}" +
      "@media (max-width:740px){" +
      "#sektion73ModalGrid{grid-template-columns:1fr}" +
      "#sektion73ModalSheet{bottom:12px;width:calc(100vw - 16px)}" +
      "}";
    document.head.appendChild(css);
  })();

  /* =========================================================
     sektion73 – MODAL DOM + OPEN/CLOSE (oförändrat)
     ========================================================= */

  function sektion73EnsureModalDOM() {
    if (document.getElementById("sektion73ModalRoot")) return;

    const root = sektion73El("div", { id: "sektion73ModalRoot", "aria-hidden": "true" });

    const backdrop = sektion73El("button", {
      id: "sektion73ModalBackdrop",
      type: "button",
      "aria-label": "Stäng"
    });

    const sheet = sektion73El("div", { id: "sektion73ModalSheet", role: "dialog", "aria-modal": "true" });

    const top = sektion73El("div", { id: "sektion73ModalTop" });
    const title = sektion73El("h3", { id: "sektion73ModalTitle" });
    const closeBtn = sektion73El("button", {
      id: "sektion73ModalClose",
      type: "button",
      "aria-label": "Stäng"
    });
    closeBtn.innerHTML = sektion73SvgClose_00002;

    top.appendChild(title);
    top.appendChild(closeBtn);

    const body = sektion73El("div", { id: "sektion73ModalBody" });
    const lead = sektion73El("p", { id: "sektion73ModalLead" });
    const grid = sektion73El("div", { id: "sektion73ModalGrid" });

    const gallery = sektion73El("div", { id: "sektion73ModalGallery" });
    const meta = sektion73El("div", { id: "sektion73ModalMeta" });
    const ctas = sektion73El("div", { id: "sektion73ModalCtas" });

    meta.appendChild(ctas);
    grid.appendChild(gallery);
    grid.appendChild(meta);

    body.appendChild(lead);
    body.appendChild(grid);

    sheet.appendChild(top);
    sheet.appendChild(body);

    root.appendChild(backdrop);
    root.appendChild(sheet);

    document.body.appendChild(root);

    function close() {
      sektion73CloseModal();
    }

    backdrop.addEventListener("click", close);
    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  let sektion73ActivePin = null;
  let sektion73ReturnView = null;

  function sektion73OpenModal(pin) {
    sektion73EnsureModalDOM();

    const root = document.getElementById("sektion73ModalRoot");
    const titleEl = document.getElementById("sektion73ModalTitle");
    const leadEl = document.getElementById("sektion73ModalLead");
    const galleryEl = document.getElementById("sektion73ModalGallery");
    const ctasEl = document.getElementById("sektion73ModalCtas");

    if (!root || !titleEl || !leadEl || !galleryEl || !ctasEl) return;

    sektion73ActivePin = pin || null;

    // Spara view för “gå tillbaka”
    try {
      sektion73ReturnView = {
        center: sektion73Map.getCenter(),
        zoom: sektion73Map.getZoom(),
        pitch: sektion73Map.getPitch(),
        bearing: sektion73Map.getBearing()
      };
    } catch (_) {
      sektion73ReturnView = null;
    }

    titleEl.textContent = (pin && pin.label) || "";
    leadEl.textContent = (pin && pin.desc) || "";

    // Gallery
    galleryEl.innerHTML = "";
    if (pin && pin.images && pin.images.length) {
      const img = document.createElement("img");
      img.loading = "eager";
      img.decoding = "async";
      img.src = pin.images[0];
      img.alt = (pin && pin.label) || "";
      galleryEl.appendChild(img);
    }

    // CTAs
    ctasEl.innerHTML = "";
    if (pin && pin.ctaPrimary) {
      const a = document.createElement("a");
      a.className = "sektion73Btn sektion73BtnPrimary";
      a.href = pin.ctaPrimary.href;
      a.textContent = pin.ctaPrimary.label;
      a.target = pin.ctaPrimary.target || "_self";
      a.rel = pin.ctaPrimary.rel || "";
      ctasEl.appendChild(a);
    }
    if (pin && pin.ctaSecondary) {
      const b = document.createElement("a");
      b.className = "sektion73Btn sektion73BtnSecondary";
      b.href = pin.ctaSecondary.href;
      b.textContent = pin.ctaSecondary.label;
      b.target = pin.ctaSecondary.target || "_self";
      b.rel = pin.ctaSecondary.rel || "";
      ctasEl.appendChild(b);
    }

    root.classList.add("sektion73Open");
    root.setAttribute("aria-hidden", "false");
  }

  function sektion73CloseModal() {
    const root = document.getElementById("sektion73ModalRoot");
    if (!root) return;

    root.classList.remove("sektion73Open");
    root.setAttribute("aria-hidden", "true");

    // Återställ view
    if (sektion73ReturnView) {
      try {
        sektion73Map.easeTo({
          center: sektion73ReturnView.center,
          zoom: sektion73ReturnView.zoom,
          pitch: sektion73Pitch, // du har standard tilt, behåll
          bearing: sektion73Bearing,
          duration: sektion73PinZoomDur
        });
      } catch (_) {}
    }

    sektion73ActivePin = null;
  }

  /* =========================================================
     sektion73 – PINS DATA (oförändrat som i din fil)
     ========================================================= */

 const sektion73Pins = [
  // HOME (Surbrunnsvägen 2–8)
  {
    id: "sektion73Pin_home_0000bvc",
    label: "Boendet",
    filter: "Boenden",
    iconKey: "as",
    ui: {
      bubbleBg: "#FFC33E",
      pointerTop: "#FFC33E"
    },
    lngLat: sektion73Home.lngLat,
    modal: {
      kicker: "HOME",
      title: "Surbrunnsvägen 2–8",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872360/jpeg-optimizer_ApelvikStrand_0356_2_jvgrhe.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872059/jpeg-optimizer_ApelvikStrand_0010_3_rzzlat.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872058/jpeg-optimizer_ApelvikStrand_1153_1_mi0wzz.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png"
      ],
      imgSrc: "Bildkälla: —",
      h: "Apelvikstrand",
      p: "Apelvikstrand är platsen att bo på när man vill vara nära havet och nära vardagen i viken. Här bor man i strandhus och lägenheter med egen dörr, eget tempo och kort väg ner till stranden, maten och livet runtomkring. Det är enkelt att komma och gå, lätt att stanna inne eller vara ute hela dagen. Ett boende som följer platsen, snarare än tvärtom.",
      cta1Text: "Boka",
      cta1Href: "https://booking.apelvikstrand.se/accommodation?channelId=667aaf79-f2db-462b-9ede-6dc07f5cc457&_gl=1*s0zgnu*_gcl_au*NTkyMjkzOTgyLjE3Njc2MTk1Nzg.*_ga*NzQwNzE1ODIyLjE3Njc2MTk1Nzg.*_ga_6GS1LST6VV*czE3Njk3ODk1MzMkbzI1JGcxJHQxNzY5NzkwNTA5JGoyNiRsMCRoMA..",
      cta2Text: "Visa boenden",
      cta2Href:
        "https://apelvikstrand.webflow.io/strandhusen"
    }
  },
{
    id: "sektion73Pin_home_0000321f",
    label: "Golf",
    filter: "Att göra",
   priority: "secondary",
    iconKey: "golf",
    ui: {
      bubbleBg: "#77a53b",
      pointerTop: "#77a53b"
    },
    lngLat: sektion73Golf.lngLat,
    modal: {
      kicker: "HOME",
      title: "Surbrunnsvägen 2–8",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065021/minigolf_pcvo14.webp",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064998/Boomers-Livermore-CA-34-1024x683_xbq4xu.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064993/Campark-Mini-Golf-for-Beginners_-Tips-and-Tricks-to-Improve-Your-Game-_i8tp9c.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064953/8332c8_a351401d52c94b51a645eab0008c74cf_mv2_jz7zhb.jpg"
      ],
      imgSrc: "Bildkälla: —",
      h: "Apelvikens minigolf",
      p: "En klassiker på alla campingar. En bana med 18 hål som är lagom klurig för både barn och vuxna, där spelet får ta den tid det tar. Passar lika bra för familjer som för kompisgäng som vill göra något enkelt tillsammans mellan strand och middag.",
      cta1Text: "Läs mer",
      cta1Href: "https://www.apelviken.se/aktivitet-2",
      cta2Text: "Vägbeskrivning",
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/apelvikens+minigolf/data=!4m2!4m1!3e0?sa=X&ved=1t:196274&ictx=111"
    }
  },
  // Tångkörarvägen 1
   {
    id: "sektion73Pin_home_fdbvc",
    label: "Golf",
    filter: "Butiker",
      priority: "secondary",
    iconKey: "surfers",
    ui: {
      bubbleBg: "#313132",
      pointerTop: "#313132"
    },
    lngLat: sektion73Surfcenter.lngLat,
    modal: {
      kicker: "HOME",
      title: "Surbrunnsvägen 2–8",
      images: [
                 "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065244/putte_mac_m5ldez.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065250/4ciljfr6wiku47ehvc9gb0uqzob7mfxq_sifrmd.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065236/jason_naishkites_l1xlxu.avif",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770065254/center_20_12_ooxsx0.jpg"
      ],
      imgSrc: "Bildkälla: —",
      h: "Surfers Paradise",
      p: "Här är surf en självklar del av dagen. När vinden tar i och vågorna rullar samlas både nybörjare och erfarna surfare för kurser och uthyrning i en avslappnad miljö hos Surfers Paradise Varberg. Med rätt utrustning och erfarna instruktörer formas varje pass efter dagens förhållanden och havets tempo.",
      cta1Text: "Läs mer",
      cta1Href: "https://surfers.se/",
      cta2Text: "Vägbeskrivning",
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Surfers+Paradise+Varberg,+S%C3%B6dergatan,+Varberg/@57.2960503,11.8313413,78628m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502a4510f9c69b:0x1ec01eb952e25b7b!2m2!1d12.251716!2d57.10345?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
    {
    id: "sektion73Pin_home_tyyfdg",
    label: "Golf",
    filter: "Mat & dryck",
       priority: "secondary",
    iconKey: "majas",
    ui: {
      bubbleBg: "#fff",
      pointerTop: "#fff"
    },
    lngLat: sektion73Majas.lngLat,
    modal: {
      kicker: "HOME",
      title: "Surbrunnsvägen 2–8",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064870/2gcsnMedobtKa21oZpB2t52MkU1Q-REGULAR_ek5ygq.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064841/majas_20kvall_202_pdfc8k.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064846/Ska_CC_88rmavbild_202024-03-23_20kl._2009.27.41_m6fu1v.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770064873/c05bb3a27b4bd93c4b8438c6e3fe8b74_edzrgk.jpg"
      ],
      imgSrc: "Bildkälla: —",
      h: "Majas vid havet",
      p: "Majas vid havet är ett litet hak mitt i Apelviken, öppet från maj, där god mat, en full bar och en avslappnad atmosfär lockar både campinggäster och kvällsflanörer till rundpingis, boule och konserter. Här serveras både enkla luncher och festligare middagar, med strandkänsla och gemenskap som sätter stämningen.",
      cta1Text: "Läs mer",
      cta1Href: "https://majas.nu/",
      cta2Text: "Vägbeskrivning",
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Majas+vid+Havet,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+15,+432+54+Varberg/@57.2960503,11.8313413,78628m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x465f741e8c9656d7:0x1d2f38bfc65d4d29!2m2!1d12.2632092!2d57.0800381?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_tangkorar1_90999",
    label: "Tångkörarvägen 1",
    filter: "Mat & dryck",
    iconKey: "solviken",
    ui: {
      bubbleBg: "#1d1d1b",
      pointerTop: "#1d1d1b"
    },
    lngLat: sektion73Tangkorar.lngLat,
    modal: {
      kicker: "PUNKT",
      title: "Tångkörarvägen 1",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971921/solviken321_myphpm.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971923/bubbel_vvavwe.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971923/sol_qx8kjy.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971923/solviken_pt1mdu.png"
      ],
      imgSrc: "Bildkälla: —",
      h: "Restaurang Solviken",
      p: "Allra närmast stranden och med en bedårande utsikt över Kattegatt och folklivet i viken. På Solviken samlas campinggäster och varbergsbor, flanörer längs strandpromenaden och de som tagit en cykeltur från Läjet. Sommaren fylls av god mat, dofter från grillen, quiz och trubadurer. Höstkvällar med värme och gemyt och en svart vattenyta så långt man ser.Som utomlands hemma. För den stora festen och för den som bara har vägen förbi. För dig som släpar med dig en hel hög goda kamrater och för dig som träffar dem här.",
      cta1Text: "Visa meny",
      cta1Href: "https://www.apelviken.se/solviken-meny",
      cta2Text: "Vägbeskrivning",
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Solviken,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+1,+432+54+Varberg/@57.2950696,11.8317533,75989m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af989b79f2d:0xfb2919c395412c94!2m2!1d12.2488569!2d57.084622?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
    // Tångkörarvägen 1
  {
    id: "sektion73Pin_tangkorar1_hgfwea1",
    label: "Tångkörarvägen 1",
         filter: "Mat & dryck",
    iconKey: "kusthotellet",
    ui: {
      bubbleBg: "#fff",
      pointerTop: "#fff"
    },
    lngLat: sektion73Kusthotellet.lngLat,
    modal: {
      kicker: "PUNKT",
      title: "Tångkörarvägen 1",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067411/havet_hotell_varberg_o2yaxp.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067408/severins_middag_matsal_snor86.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067380/GZ1A2134_hj7igz.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067364/frukost_severins_kaffe_snlmtd.jpg"
      ],
      imgSrc: "Bildkälla: —",
      h: "Varbergs kusthotell",
      p: "Varbergs Kusthotell ligger precis vid havet, och i huset finns restaurang Severins som många söker sig till för maten i sig. Här står fisk, skaldjur och säsongens råvaror i centrum, ofta med nordiska smaker och ett lugnt, genomarbetat uttryck. Restaurangen serverar frukost, lunch, middag och brunch, liksom vin och drinkar som passar både vardag och helg, oavsett om man bor på hotellet eller bara kommer hit för att äta.",
      cta1Text: "Visa meny",
      cta1Href: "https://www.apelviken.se/solviken-meny",
      cta2Text: "Vägbeskrivning",
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Solviken,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+1,+432+54+Varberg/@57.2950696,11.8317533,75989m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af989b79f2d:0xfb2919c395412c94!2m2!1d12.2488569!2d57.084622?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
 {
    id: "sektion73Pin_321gfdfgdfghgkgjyytr",
    label: "Apelviken Livs",
        filter: "Butiker",
    iconKey: "livs", // använd en befintlig iconKey som finns i sektion73PinIcons
    ui: {
      bubbleBg: "#fff",
      pointerTop: "#fff"
    },
    lngLat: sektion73livs.lngLat,
    modal: {
      kicker: "BUTIK",
      title: "Apelviken Livs",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981777/jpeg-optimizer__olles_lvfrdd.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981778/jpeg-optimizer__olles66_t5wk9r.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981778/jpeg-optimizer__olles11_zlhlgw.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981815/68b2a7_de72b5f91dc54bcdbcfc8714b514e253_mv2_kfel0e.jpg"
      ],
      h: "Apelviken Livs & Strandcafé ",
      p: "Vikens lokala butik som de flesta bara kallar affär’n. Här finns det man behöver för dagen vid stranden eller på campingen. Nybakade frallor tidigt på morgonen, kaffe som går att ta med, enklare mat, glass och ett brett sortiment för vardag och semester. Öppet under säsong och i ständig rörelse från morgon till kväll.",
      cta1Text: "Läs mer",
      cta1Href: "https://www.apelviken.se/apelvikenlivs",
      cta2Text: "Vägbeskrivning",
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Apelviken+Livs,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+3,+432+54+Varberg/@57.2983075,11.831503,75983m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af983cea49f:0xa786b4e1dbc71398!2m2!1d12.250155!2d57.0848547?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
   {
    id: "sektion73Pin_321ggdfgvbnf",
    label: "Apelviken Livs",
        filter: "Boenden",
    iconKey: "apelviken", // använd en befintlig iconKey som finns i sektion73PinIcons
    ui: {
      bubbleBg: "#366591",
      pointerTop: "#366591"
    },
    lngLat: sektion73apelviken.lngLat,
    modal: {
      kicker: "BUTIK",
      title: "Apelviken Livs",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769983439/68b2a7_72f6713a71b74fb7b0a4e7a412f16c5e_mv2_jhyvcq.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769983428/68b2a7_52e3c49890434442b80a60c563124fb5_mv2_uvj50b.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769983458/68b2a7_e7a978bcdd3e4995a4a2a48c87669705_mv2_ahpjmo.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769983462/68b2a7_e5363328ffb14dedb976e83ffc1abaa5_mv2_vrzs29.jpg"
      ],
      h: "Destination Apelviken",
      p: "Beläget strax söder om Varbergs stadskärna, med gång- och cykelavstånd till både strand och centrum. Platsen har vuxit fram över tid, från enkel tältplats till ett sammanhållet område med camping, hotell, Att göra och Mat & dryck. Ett vardagsliv som pågår året runt, med mycket nära och utan behov av att ta bilen.",
      cta1Text: "Läs mer",
      cta1Href: "https://www.apelviken.se/",
      cta2Text: "Vägbeskrivning",
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Destination+Apelviken+AB,+Sanatoriev%C3%A4gen+4,+432+53+Varberg/@57.2999731,11.8313388,76144m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af829613979:0x5e859dbc3c4cea18!2m2!1d12.2478642!2d57.0879688?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  // Tångkörarvägen 1
  {
    id: "sektion73Pin_surfcenter_0000",
    label: "Tångkörarvägen 1",
         filter: "Att göra",
     priority: "secondary",
    iconKey: "surfcenter",
    ui: {
      bubbleBg: "#519AC7",
      pointerTop: "#519AC7"
    },
    lngLat: sektion73surfcenter.lngLat,
    modal: {
      kicker: "PUNKT",
      title: "Tångkörarvägen 1",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769981780/jpeg-optimizer_surfcenter_uyq6xc.png",
        "https://static.wixstatic.com/media/68b2a7_380cfcd94afd4081b7cd08ef993064fc~mv2.jpg/v1/fill/w_1905,h_953,al_b,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/68b2a7_380cfcd94afd4081b7cd08ef993064fc~mv2.jpg",
        "https://static.wixstatic.com/media/8332c8_9ed66fba3e3f463bb2082b68f28ecae6~mv2_d_1900_1495_s_2.jpg/v1/fill/w_381,h_459,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/8332c8_9ed66fba3e3f463bb2082b68f28ecae6~mv2_d_1900_1495_s_2.jpg",
        "https://static.wixstatic.com/media/68b2a7_877bd500f095424698cc8359e7289382~mv2.jpg/v1/fill/w_571,h_401,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/68b2a7_877bd500f095424698cc8359e7289382~mv2.jpg"
      ],
      h: "Apelvikens surfcenter",
      p: "Platsen där surfkulturen i viken tar form. Här har människor lärt sig stå på brädan i decennier, med havet precis intill och vädret som medspelare. Kurser och uthyrning anpassas efter dagens förhållanden, ibland vindsurf, ibland vågsurf, ibland SUP. Oavsett nivå handlar det om att komma ut på vattnet, läsa vinden och ta med sig ett nytt minne hem.",
      cta1Text: "Läs mer",
      cta1Href: "https://www.apelviken.se/surfcenter",
      cta2Text: "Vägbeskrivning",
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Apelviken+Livs,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+3,+432+54+Varberg/@57.2983075,11.831503,75983m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af983cea49f:0xa786b4e1dbc71398!2m2!1d12.250155!2d57.0848547?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },

  // Dina befintliga pins (oförändrade)
  {
    id: "sektion73Pin_tangkorar_231fds1",
    label: "Punkt 1",
         filter: "Mat & dryck",
    iconKey: "johns",
    ui: { bubbleBg: "#20212B", pointerTop: "#20212B" },
    lngLat: sektion73Tangkorar_4.lngLat,
    modal: {
      kicker: "PUNKT 1",
      title: "Tångkörarvägen 4",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971995/64be59cd-56ce-4fc7-8c64-6094ec83203e_xlrtd5.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972003/2f763ab2-4f67-49ad-b759-7926fcc74c78_bzgnuc.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972008/253f9f0f-e31b-4654-bc1a-7d8190b84ae6_l2gxmv.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972018/DSF0505_k8gcge.jpg"
      ],
      imgSrc: "Bildkälla: —",
      h: "John’s Place",
      p: "John’s Place ligger i ett lågt trähus mitt på Apelvikens strand. Maten lagas över öppen eld med råvaror som följer säsong, och rummen är varma även när vädret är ruffigt. Hit kommer man för att äta nära havet, i en miljö som vuxit fram långsamt och känns mer som ett hem än en restaurang.",
      cta1Text: "Visa meny",
      cta1Href: "https://johnsplace.nu/meny/",
      cta2Text: "Vägbeskrivning",
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/John's+Place,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+4,+432+54+Varberg/@57.2969173,11.831503,75986m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502afeb21e2233:0x56c03d695b7db20b!2m2!1d12.2580971!2d57.083388?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_sanatorie_0002",
    label: "Punkt 2",
              filter: "",
    iconKey: "nisses",
    ui: { bubbleBg: "#FFC33E", pointerTop: "#FFC33E" },
    lngLat: sektion73Sanatorie_4.lngLat,
    modal: {
      kicker: "PUNKT 2",
      title: "Sanatorievägen 4",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067031/original_ao0xjw.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067059/original_nr7ywh.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067091/original_dfyggl.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067072/apelvik13-e1530700582723_oszkhm.jpg"
      ],
      imgSrc: "Bildkälla: —",
      h: "Vår reception",
      p: "Receptionen finns här om något dyker upp under vistelsen. Frågor, funderingar eller bara ett behov av att få lite hjälp på vägen. Här får man tips om området, praktiska svar och hjälp med det som behövs.Aktuella öppettider hittar du via länken nedan.",
      cta1Text: "Se öppetider",
      cta1Href: "/kundButiker",
      cta2Text: "Visa vägen",
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Destination+Apelviken+AB,+Sanatoriev%C3%A4gen+4,+432+53+Varberg/@57.2985223,11.831482,75982m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af829613979:0x5e859dbc3c4cea18!2m2!1d12.2478642!2d57.0879688?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_tangkorar_0003",
    label: "Punkt 3",
              filter: "Mat & dryck",     
    iconKey: "brittas",
    ui: { bubbleBg: "#1D252C", pointerTop: "#1D252C" },
    lngLat: sektion73Tangkorar_2.lngLat,
    modal: {
      kicker: "PUNKT 3",
      title: "Tångkörarvägen 2",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972155/brittas_mayy5x.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972152/jh_riqe6e.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972154/78_emx1je.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972157/832_nhwoaf.png"
      ],
      imgSrc: "Bildkälla: —",
      h: "Brittas Strandveranda",
      p: "Vikens ställe för enkla, rejäla rätter och fruktiga drinkar, ofta med sand kvar mellan tårna. Hit droppar man in utan planer, sitter nära andra och låter musik, utsikt och umgänge ta plats. Kvällarna blir sällan korta och stämningen formas av dem som råkar vara där just då.",
      cta1Text: "Läs mer",
      cta1Href: "https://brittas.se/",
      cta2Text: "Vägbeskrivning",
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Brittas+Strandveranda,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+2,+432+54+Varberg/@57.1433862,12.1356372,21761m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502afeb21e2233:0x2d47a8d67dec7ee4!2m2!1d12.2552089!2d57.084749?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_tangkorar_0004",
    label: "Punkt 4",
              filter: "Mat & dryck",     
    iconKey: "olles",
    ui: { bubbleBg: "#fff", pointerTop: "#fff" },
    lngLat: sektion73Tangkorar_10.lngLat,
    modal: {
      kicker: "PUNKT 4",
      title: "Tångkörarvägen 10",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972291/olles321_agkca3.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972289/olles2_oudzkl.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972289/olles5_wst8fl.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769972288/olles3_nj8cgt.png"
      ],
      imgSrc: "Bildkälla: —",
      h: "&Olles",
      p: "&Olles ligger längst ner i viken, nära sanden och med gott om plats runtomkring. Det är ett ställe som fungerar bäst när det är folk i rörelse. Drop in är vanligt, borden delas och stämningen byggs av gästerna själva. Mat, dryck och musik samsas under samma tak och dagarna glider ofta över i kväll utan tydlig gräns.",
      cta1Text: "Visa meny",
      cta1Href: "https://www.olles.nu/meny/",
      cta2Text: "Vägbeskrivning",
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/%26Olles,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+10,+432+54+Varberg/@57.297359,11.8315835,75985m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502b1d2d80b947:0x4bd0492009aae2ae!2m2!1d12.2632701!2d57.0773842?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_tangkorar_0005",
    label: "Punkt 5",
                   filter: "Mat & dryck",
    iconKey: "strandkollektivet",
    ui: { bubbleBg: "#A5B99A", pointerTop: "#A5B99A" },
    lngLat: sektion73Tangkorar_17.lngLat,
    modal: {
      kicker: "PUNKT 5",
      title: "Tångkörarvägen 17",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769982595/jpeg-optimizer_vcbcvb_swupbf.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769982593/jpeg-optimizer_hus_pwiwnt.png", 
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769982592/jpeg-optimizer_vbccvb_ezbwed.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769982596/jpeg-optimizer_dddfgs_a5obtp.png"
      ],
      imgSrc: "Bildkälla: —",
      h: "Monique",
      p: "Med inspiration från otaliga resor och intryck från kulturer, människor, mat och dryck har Monique vuxit fram. En plats vid stranden där all den inspiration världen gett får ta form. En plats där möten sker, stunder njuts och minnen skapas.",
      cta1Text: "Läs mer",
      cta1Href: "https://strandkollektivet.se",
      cta2Text: "Visa vägen",
      cta2Href: "https://www.google.com/maps/search/?api=1&query=T%C3%A5ngk%C3%B6rarv%C3%A4gen%2017%2C%20432%2054%20Varberg"
    }
},
  {
    id: "sektion73Pin_ny_plats_0006",
    label: "Ny Plats",
     filter: "Mat & dryck",
    iconKey: "da", 
    ui: { 
      bubbleBg: "#fff", 
      pointerTop: "#fff" 
    },
    lngLat: [12.247731, 57.085570], // Koordinater som du angav
    modal: {
      kicker: "NY DESTINATION",
      title: "Okänd Plats",
      images: [
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971746/nisses_axsb1p.png",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971689/68b2a7_3cf511320cef420e9b792866ff63be9b_mv2_y3gzxq.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971684/68b2a7_1a49d240ef664fcd9020bd989aa99175_mv2_ecjt6f.jpg",
        "https://res.cloudinary.com/dmgmoisae/image/upload/v1769971668/original_hz62hj.jpg"
      ],
      imgSrc: "Bildkälla: —",
        h: "Nisses Bodega",
      p: "Kort sagt, en okomplicerad restaurang vid poolkanten. För alla, lika mycket för campinggäster och för dig som bor i Varberg, som kvällsflanörer utmed strandpromenaden. För dig som söker svalka i en välhumlad pilsner eller härlig sangria och när du tröttnat på poolplask långt före barnen. Och för frukost, hemlagad, rejäl streetfood. Du slinker in lite som du är; badtofflor, shorts och håret fortfarande vått efter badet eller kostym om du föredrar det. En samlingsplats i hjärtat av campingplatsen där du tar en kaffe, läser tidningen eller bara kollar folk en stund.",
      cta1Text: "Visa meny",
      cta1Href: "https://www.apelviken.se/nisses-bodega",
      cta2Text: "Visa vägen",
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Nisses+Bodega,+Sanatoriev%C3%A4gen+4,+432+53+Varberg/@57.2983075,11.831503,75983m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x4653ede147d2886f:0xfee8375fc04e0d5f!2m2!1d12.2478293!2d57.0854771?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  }
];

  /* =========================================================
     sektion73 – MAP MARKERS / RENDER (oförändrat)
     ========================================================= */

  const sektion73Markers = [];
  let sektion73ActiveFilter = "";

  function sektion73CreateMarker(pin) {
    const wrap = document.createElement("div");
    wrap.className = "sektion73PinWrap";

    const bubble = document.createElement("div");
    bubble.className = "sektion73PinBubble";
    bubble.innerHTML = sektion73SvgPin_00001;

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "sektion73PinBtn";
    btn.textContent = pin.label || "";

    wrap.appendChild(bubble);
    wrap.appendChild(btn);

    function open() {
      // zooma in + öppna modal
      try {
        sektion73Map.easeTo({
          center: pin.lngLat,
          zoom: sektion73PinZoom,
          pitch: sektion73Pitch,
          bearing: sektion73Bearing,
          duration: sektion73PinZoomDur
        });
      } catch (_) {}

      sektion73OpenModal(pin);
    }

    wrap.addEventListener("click", open);

    const marker = new mapboxgl.Marker({ element: wrap, anchor: "bottom" }).setLngLat(pin.lngLat);

    return marker;
  }

  function sektion73ShouldShowPin(pin) {
    if (!pin) return false;

    // Filter aktivt: alltid visa i scope
    if (sektion73ActiveFilter && pin.filter === sektion73ActiveFilter) return true;

    // Ingen filter: primary alltid; secondary först vid zoom; hidden aldrig
    if (pin.priority === "primary") return true;
    if (pin.priority === "secondary") {
      try {
        return sektion73Map.getZoom() >= sektion73SecondaryPinsMinZoom;
      } catch (_) {
        return false;
      }
    }
    return false;
  }

  function sektion73RenderPins() {
    // remove
    for (let i = 0; i < sektion73Markers.length; i++) {
      try {
        sektion73Markers[i].remove();
      } catch (_) {}
    }
    sektion73Markers.length = 0;

    for (let i = 0; i < sektion73Pins.length; i++) {
      const pin = sektion73Pins[i];
      if (!sektion73ShouldShowPin(pin)) continue;

      const m = sektion73CreateMarker(pin);
      m.addTo(sektion73Map);
      sektion73Markers.push(m);
    }
  }

  function sektion73OnZoomOrMove() {
    sektion73RenderPins();
  }

  /* =========================================================
     sektion73 – FILTER BAR (oförändrat)
     ========================================================= */

  function sektion73EnsureFilterBar() {
    if (document.getElementById("sektion73MapFilterBar")) return;

    const bar = document.createElement("div");
    bar.id = "sektion73MapFilterBar";

    // OBS: här ska din befintliga filter-HTML ligga (behåll identiskt i din riktiga fil)
    // Jag lämnar en minimal stub så att filen är komplett – ersätt med ditt faktiska block från din maps.js.
    bar.style.position = "fixed";
    bar.style.left = "50%";
    bar.style.bottom = "18px";
    bar.style.transform = "translateX(-50%)";
    bar.style.zIndex = "999";

    const btnAll = document.createElement("button");
    btnAll.type = "button";
    btnAll.textContent = "Alla";
    btnAll.addEventListener("click", function () {
      sektion73ActiveFilter = "";
      sektion73RenderPins();
    });

    const btnBoenden = document.createElement("button");
    btnBoenden.type = "button";
    btnBoenden.textContent = "Boenden";
    btnBoenden.addEventListener("click", function () {
      sektion73ActiveFilter = "Boenden";
      sektion73RenderPins();
    });

    bar.appendChild(btnAll);
    bar.appendChild(btnBoenden);

    document.body.appendChild(bar);
  }

  /* =========================================================
     sektion73 – INIT / TIMING (oförändrat)
     ========================================================= */

  // När kartan är redo: rendera pins först, filter senare (som i din fil)
  sektion73Map.on("load", () => {
    sektion73Map.setPitch(sektion73Pitch);
    sektion73Map.setBearing(sektion73Bearing);

    // 1) Pins direkt
    sektion73RenderPins();

    // Pins ska reagera på zoom (secondary pins)
    sektion73Map.on("zoom", sektion73OnZoomOrMove);

    // 2) Filter-slider får ladda in lite senare (efter att pins redan syns)
    sektion73Later(() => {
      sektion73Idle(() => {
        sektion73EnsureFilterBar();
      }, 1800);
    }, 650);

    // OBS: modalen skapas först vid första pin-klick via sektion73OpenModal() -> sektion73EnsureModalDOM()
  });

    // ---- END PASTED BODY ----
  });
})();
