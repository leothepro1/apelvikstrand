/* sektion73.apelvikstrand.map.min.js
   Fristående Mapbox-karta (GL JS v3)
   - Låst hårt till Surbrunnsvägen 2–8, Apelviken (Varberg)
   - Pins: klick => zooma in + slide-down CTA-knapp (uppifrån ner)
   - Ingen extern CSS krävs (injicerar isolerad CSS)
   - Kör endast om #sektion73MapCanvas finns

   Förutsätter att du redan laddar:
   - https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js
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

  // Liten helper: clamp
  function sektion73Clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  sektion73Ready(function sektion73InitMap() {
    const sektion73Canvas = document.getElementById("sektion73MapCanvas");
    if (!sektion73Canvas) return;

    if (!window.mapboxgl) {
      console.error("Mapbox GL JS saknas. Ladda mapbox-gl.js före denna fil.");
      return;
    }

    /* =========================
       CONFIG
       ========================= */

    // 1) Din token
    mapboxgl.accessToken = "PUT_YOUR_PUBLIC_MAPBOX_TOKEN_HERE";

    // 2) Din style (Studio)
    const sektion73StyleUrl = "mapbox://styles/YOUR_USER/YOUR_STYLE_ID";

    // 3) Home (Surbrunnsvägen 2–8, Apelviken)
    // OBS: Justera om du har mer exakt punkt. Denna är en rimlig "home" i Apelviken.
    const sektion73Home = [12.262921, 57.081185]; // [lng, lat]

    // 4) Hård begränsning runt home (mycket tight)
    // ~0.003 deg lon och ~0.002 deg lat är en liten box (några hundra meter beroende på lat).
    const sektion73BoundsPadding = { lng: 0.0026, lat: 0.0018 };
    const sektion73MaxBounds = [
      [sektion73Home[0] - sektion73BoundsPadding.lng, sektion73Home[1] - sektion73BoundsPadding.lat], // SW
      [sektion73Home[0] + sektion73BoundsPadding.lng, sektion73Home[1] + sektion73BoundsPadding.lat]  // NE
    ];

    // 5) Zoom-lås (tajt)
    const sektion73MinZoom = 14.6;
    const sektion73MaxZoom = 18.2;

    // 6) Default vy + pin-klick zoom
    const sektion73StartZoom = 15.4;
    const sektion73PinZoom = 17.2;

    // 7) Pitch/bearing (kan sättas till 0 om du vill ha mer 2D)
    const sektion73StartPitch = 58;
    const sektion73StartBearing = 90; // "rak åt öster"

    // 8) Pins (exempel – byt till dina riktiga)
    const sektion73Pins = [
      { id: "sektion73Pin_home_0001", label: "Surbrunnsvägen 2–8", coord: sektion73Home },
      { id: "sektion73Pin_a_0002", label: "Pin A", coord: [12.2619, 57.0817] },
      { id: "sektion73Pin_b_0003", label: "Pin B", coord: [12.2640, 57.0807] }
    ];

    /* =========================
       ISOLATED UI (CSS + CTA BAR)
       ========================= */

    const sektion73CssId = "sektion73MapUiCss_0001";
    if (!document.getElementById(sektion73CssId)) {
      const style = document.createElement("style");
      style.id = sektion73CssId;
      style.textContent = `
        /* Isolerat till #sektion73MapRoot + #sektion73MapCanvas */
        #sektion73MapRoot{ position:relative; }
        #sektion73MapCanvas{ position:relative; }

        /* PIN */
        #sektion73MapRoot .sektion73PinWrap{
          position: relative;
          transform: translate(-50%, -100%);
          will-change: transform;
          cursor: pointer;
        }
        #sektion73MapRoot .sektion73PinBtn{
          -webkit-appearance: none;
          appearance: none;
          border: 0;
          background: rgba(255,255,255,.92);
          color: #0e1318;
          font: 600 13px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          padding: 10px 12px;
          border-radius: 999px;
          box-shadow: 0 10px 30px rgba(0,0,0,.18);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: transform 180ms cubic-bezier(.2,.8,.2,1);
          transform-origin: 50% 100%;
        }
        #sektion73MapRoot .sektion73PinDot{
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #f2b200;
          box-shadow: 0 0 0 4px rgba(242,178,0,.22);
          flex: 0 0 auto;
        }

        /* TOP SLIDE CTA */
        #sektion73MapRoot .sektion73TopCtaWrap{
          position: absolute;
          left: 50%;
          top: 12px;
          transform: translateX(-50%);
          z-index: 10;
          pointer-events: none; /* aktiveras när synlig */
        }
        #sektion73MapRoot .sektion73TopCtaBar{
          pointer-events: auto;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 10px;
          border-radius: 14px;
          background: rgba(255,255,255,.94);
          box-shadow: 0 16px 40px rgba(0,0,0,.20);
          border: 1px solid rgba(14,19,24,.10);
          transform: translateY(-140%);
          opacity: 0;
          transition:
            transform 260ms cubic-bezier(.2,.8,.2,1),
            opacity 220ms ease;
        }
        #sektion73MapRoot .sektion73TopCtaWrap.is-open .sektion73TopCtaBar{
          transform: translateY(0);
          opacity: 1;
        }
        #sektion73MapRoot .sektion73TopCtaText{
          font: 600 13px/1.1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          color: rgba(14,19,24,.80);
          padding-left: 4px;
          white-space: nowrap;
        }
        #sektion73MapRoot .sektion73TopCtaBtn{
          -webkit-appearance: none;
          appearance: none;
          border: 0;
          background: #f2b200;
          color: #111;
          font: 800 13px/1 system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          padding: 11px 12px;
          border-radius: 12px;
          cursor: pointer;
          transition: transform 180ms cubic-bezier(.2,.8,.2,1);
        }
        #sektion73MapRoot .sektion73TopCtaBtn:active{
          transform: translateY(1px);
        }
      `;
      document.head.appendChild(style);
    }

    // Hitta root om den finns, annars använd canvasens parent
    const sektion73Root = document.getElementById("sektion73MapRoot") || sektion73Canvas.parentElement || document.body;

    // Skapa top-CTA
    const sektion73TopCtaWrapId = "sektion73TopCtaWrap_0001";
    let sektion73TopCtaWrap = document.getElementById(sektion73TopCtaWrapId);
    if (!sektion73TopCtaWrap) {
      sektion73TopCtaWrap = document.createElement("div");
      sektion73TopCtaWrap.id = sektion73TopCtaWrapId;
      sektion73TopCtaWrap.className = "sektion73TopCtaWrap";
      sektion73TopCtaWrap.innerHTML = `
        <div class="sektion73TopCtaBar" role="region" aria-label="Åtgärd för vald plats">
          <div class="sektion73TopCtaText" id="sektion73TopCtaText_0001">Vald plats</div>
          <button type="button" class="sektion73TopCtaBtn" id="sektion73TopCtaBtn_0001">Visa mer</button>
        </div>
      `;
      sektion73Root.appendChild(sektion73TopCtaWrap);
    }

    const sektion73TopCtaText = document.getElementById("sektion73TopCtaText_0001");
    const sektion73TopCtaBtn = document.getElementById("sektion73TopCtaBtn_0001");

    let sektion73ActivePin = null;

    function sektion73OpenTopCta(label) {
      if (sektion73TopCtaText) sektion73TopCtaText.textContent = label || "Vald plats";
      sektion73TopCtaWrap.classList.add("is-open");
    }

    function sektion73CloseTopCta() {
      sektion73TopCtaWrap.classList.remove("is-open");
    }

    // CTA-knapp: just nu gör den inget mer än att stänga (byt till din logik senare)
    if (sektion73TopCtaBtn) {
      sektion73TopCtaBtn.addEventListener("click", function () {
        // Placeholder: här kan du senare öppna modal, byta text, visa panel, osv.
        sektion73CloseTopCta();
      });
    }

    /* =========================
       MAP INIT
       ========================= */

    const sektion73Map = new mapboxgl.Map({
      container: sektion73Canvas,
      style: sektion73StyleUrl,
      center: sektion73Home,
      zoom: sektion73StartZoom,
      minZoom: sektion73MinZoom,
      maxZoom: sektion73MaxZoom,
      pitch: sektion73StartPitch,
      bearing: sektion73StartBearing,
      maxBounds: sektion73MaxBounds,
      attributionControl: false,
      cooperativeGestures: false
    });

    // Exponera för debug i konsol
    window.sektion73MapInstance = sektion73Map;

    // Lås extra hårt: om någon “knuffar” utanför bounds, flytta tillbaka
    function sektion73EnforceBounds() {
      const b = sektion73Map.getBounds();
      const max = new mapboxgl.LngLatBounds(sektion73MaxBounds[0], sektion73MaxBounds[1]);
      if (!max.contains(b.getNorthEast()) || !max.contains(b.getSouthWest())) {
        sektion73Map.fitBounds(sektion73MaxBounds, { duration: 0, padding: 12 });
      }
      const z = sektion73Map.getZoom();
      if (z < sektion73MinZoom || z > sektion73MaxZoom) {
        sektion73Map.setZoom(sektion73Clamp(z, sektion73MinZoom, sektion73MaxZoom));
      }
    }

    sektion73Map.on("moveend", sektion73EnforceBounds);
    sektion73Map.on("zoomend", sektion73EnforceBounds);

    /* =========================
       PINS (custom markers)
       ========================= */

    function sektion73CreatePinEl(pin) {
      const wrap = document.createElement("div");
      wrap.className = "sektion73PinWrap";
      wrap.id = pin.id;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sektion73PinBtn";
      btn.setAttribute("aria-label", pin.label || "Pin");

      const dot = document.createElement("span");
      dot.className = "sektion73PinDot";

      const text = document.createElement("span");
      text.textContent = pin.label || "Plats";

      btn.appendChild(dot);
      btn.appendChild(text);
      wrap.appendChild(btn);

      // Klick: zooma + visa top-CTA
      wrap.addEventListener("click", function (e) {
        e.preventDefault();

        sektion73ActivePin = pin;

        sektion73Map.flyTo({
          center: pin.coord,
          zoom: Math.min(sektion73PinZoom, sektion73MaxZoom),
          speed: 1.2,
          curve: 1.25,
          essential: true
        });

        // visa CTA direkt (eller efter flyTo om du vill)
        sektion73OpenTopCta(pin.label);
      });

      return wrap;
    }

    // Lägg markers när style är redo (robust för Standard/imports)
    sektion73Map.on("style.load", function () {
      // Skapa pins
      sektion73Pins.forEach(function (pin) {
        const el = sektion73CreatePinEl(pin);
        new mapboxgl.Marker({ element: el, anchor: "bottom" })
          .setLngLat(pin.coord)
          .addTo(sektion73Map);
      });

      // Starta helt låst inom bounds
      sektion73Map.fitBounds(sektion73MaxBounds, { duration: 0, padding: 12 });

      // Stäng CTA om användaren klickar på “tom” karta
      sektion73Map.on("click", function (evt) {
        // Om click hamnar på marker-element kommer den eventen normalt inte hit.
        // Men som fallback: stäng CTA när man klickar på kartan.
        if (!evt || !evt.originalEvent) return;
        sektion73CloseTopCta();
      });
    });
  });
})();
