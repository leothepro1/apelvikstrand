/* apelvikstrand.maps
   Apelvikstrand – Interaktiv karta (Mapbox Standard / imports)
   - Låst till Apelviken (maxBounds + zoom-intervall)
   - Home: Surbrunnsvägen 2–8, 432 53 Varberg
   - 3D: pitch + bearing + show3dBuildings/show3dObjects (Standard config)
   - Labels: dölj företag/POI + ortnamn/platser. Behåll vägar
   - Custom pins (2 st) + zoom-then-modal (desktop: slide-in right, mobile: slide-up)
*/
(function () {
  function sektion73Ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  sektion73Ready(function sektion73InitMap() {
    const sektion73Canvas = document.getElementById("sektion73MapCanvas");
    if (!sektion73Canvas) return;

    if (!window.mapboxgl) {
      console.error("Mapbox GL JS saknas. Kontrollera att mapbox-gl.js laddas före apelvikstrand.maps");
      return;
    }

    /* =========================
       CONFIG
       ========================= */

    mapboxgl.accessToken =
      "pk.eyJ1IjoicnV0Z2Vyc3NvbiIsImEiOiJjbWwzdjY5N2owcDdiM2RzZWlzaG14MWVjIn0.yMfhGXLf9xq_vzIFSJVcjA";

    const sektion73StyleUrl = "mapbox://styles/rutgersson/cml3w74bd009g01r458nuhgjn";

    // Home: Surbrunnsvägen 2–8, 432 53 Varberg
    const sektion73Home = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.26197766, 57.08161047]
    };

    // Tångkörarvägen 1, 432 54 Varberg (koordinater från karta-länk)
    const sektion73Tangkorar = {
      title: "Tångkörarvägen 1",
      lngLat: [12.2488165, 57.084682]
    };

    // Bounds (justera vid behov)
    const sektion73Bounds = [
      [12.235, 57.070], // SW
      [12.285, 57.095] // NE
    ];

    const sektion73MinZoom = 13.2;
    const sektion73MaxZoom = 17.6;
    const sektion73StartZoom = 14.7;

    // Kamera
    const sektion73Pitch = 55;
    const sektion73Bearing = -20;

    const sektion73DisableRotate = true;

    // Zoom vid pin-klick
    const sektion73PinZoom = 17.35;
    const sektion73PinZoomDur = 950;

    // Modal animation
    const sektion73ModalDurMs = 420;

    /* =========================
       MAP INIT
       ========================= */

    const sektion73Map = new mapboxgl.Map({
      container: sektion73Canvas,
      style: sektion73StyleUrl,
      center: sektion73Home.lngLat,
      zoom: sektion73StartZoom,
      maxBounds: sektion73Bounds,

      attributionControl: false,
      antialias: true,

      pitchWithRotate: false,
      dragRotate: false,

      config: {
        basemap: {
          show3dBuildings: true,
          show3dObjects: true,
          showPointOfInterestLabels: false,
          showPlaceLabels: false,
          showRoadLabels: true
        }
      }
    });

    sektion73Map.on("error", (e) => {
      console.error("Mapbox error:", e && e.error ? e.error : e);
    });

    sektion73Map.setMinZoom(sektion73MinZoom);
    sektion73Map.setMaxZoom(sektion73MaxZoom);

    sektion73Map.scrollZoom.disable();
    sektion73Map.doubleClickZoom.disable();

    if (sektion73DisableRotate) {
      sektion73Map.dragRotate.disable();
      sektion73Map.touchZoomRotate.disableRotation();
    }

    sektion73Map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");

    /* =========================
       STANDARD CONFIG (SAFETY)
       ========================= */

    function sektion73HasImportsStyle() {
      const s = sektion73Map.getStyle && sektion73Map.getStyle();
      return !!(s && Array.isArray(s.imports) && s.imports.length);
    }

    function sektion73ForceStandardConfig() {
      if (typeof sektion73Map.setConfigProperty !== "function") return;

      const setSafe = (group, key, value) => {
        try {
          sektion73Map.setConfigProperty(group, key, value);
        } catch (_) {}
      };

      setSafe("basemap", "show3dBuildings", true);
      setSafe("basemap", "show3dObjects", true);
      setSafe("basemap", "showPointOfInterestLabels", false);
      setSafe("basemap", "showPlaceLabels", false);
      setSafe("basemap", "showRoadLabels", true);
    }

    /* =========================
       LOAD
       ========================= */

    sektion73Map.on("style.load", () => {
      sektion73Map.easeTo({
        center: sektion73Home.lngLat,
        zoom: sektion73StartZoom,
        pitch: sektion73Pitch,
        bearing: sektion73Bearing,
        duration: 900
      });

      if (sektion73HasImportsStyle()) {
        sektion73ForceStandardConfig();
      }
    });

    /* =========================
       UI: MODAL + OVERLAY (injected)
       ========================= */

    function sektion73InjectModalCSS() {
      if (document.getElementById("sektion73MapModalStyle")) return;

      const style = document.createElement("style");
      style.id = "sektion73MapModalStyle";
      style.textContent = `
        :root{
          --sektion73-modal-dur:${sektion73ModalDurMs}ms;
          --sektion73-modal-ease:cubic-bezier(.2,.8,.2,1);
          --sektion73-modal-bg:#ffffff;
          --sektion73-modal-text:#0e1318;
          --sektion73-modal-muted:rgba(14,19,24,.68);
          --sektion73-modal-line:rgba(14,19,24,.14);
          --sektion73-modal-shadow:0 30px 80px rgba(0,0,0,.22);
          --sektion73-accent:#f2b200;
          --sektion73-radius:18px;
        }

        #sektion73MapOverlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.42);
          opacity:0;
          pointer-events:none;
          transition:opacity var(--sektion73-modal-dur) var(--sektion73-modal-ease);
          z-index:2147483000;
        }
        #sektion73MapOverlay.is-open{
          opacity:1;
          pointer-events:auto;
        }

        #sektion73MapModal{
          position:fixed;
          right:0;
          top:0;
          height:100dvh;
          width:min(440px, 92vw);
          background:var(--sektion73-modal-bg);
          color:var(--sektion73-modal-text);
          box-shadow:var(--sektion73-modal-shadow);
          border-left:1px solid var(--sektion73-modal-line);
          transform:translateX(104%);
          transition:transform var(--sektion73-modal-dur) var(--sektion73-modal-ease);
          z-index:2147483001;
          display:flex;
          flex-direction:column;
          padding:18px;
          gap:14px;
          overscroll-behavior:contain;
        }
        #sektion73MapModal.is-open{
          transform:translateX(0);
        }

        @media (max-width: 768px){
          #sektion73MapModal{
            left:0;
            right:0;
            top:auto;
            bottom:0;
            width:100%;
            height:min(84dvh, 720px);
            border-left:none;
            border-top:1px solid var(--sektion73-modal-line);
            border-top-left-radius:var(--sektion73-radius);
            border-top-right-radius:var(--sektion73-radius);
            transform:translateY(104%);
          }
          #sektion73MapModal.is-open{
            transform:translateY(0);
          }
        }

        .sektion73ModalTop{
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap:12px;
        }
        .sektion73ModalKicker{
          font:700 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          color:rgba(14,19,24,.55);
          text-transform:uppercase;
          letter-spacing:.08em;
          margin:0 0 6px 0;
        }
        .sektion73ModalTitle{
          font:800 20px/1.15 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          margin:0;
        }
        .sektion73ModalClose{
          width:40px;
          height:40px;
          border-radius:12px;
          border:1px solid var(--sektion73-modal-line);
          background:#fff;
          cursor:pointer;
          display:grid;
          place-items:center;
          flex:0 0 auto;
        }
        .sektion73ModalClose svg{ width:18px; height:18px; }

        .sektion73ModalGallery{
          display:grid;
          gap:10px;
        }
        .sektion73ModalGalleryTop{
          width:100%;
          aspect-ratio: 16/9;
          border-radius:14px;
          overflow:hidden;
          background:#f1f3f4;
          border:1px solid var(--sektion73-modal-line);
        }
        .sektion73ModalGalleryTop img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        }
        .sektion73ModalGalleryRow{
          display:grid;
          grid-template-columns:repeat(3, 1fr);
          gap:10px;
        }
        .sektion73ModalThumb{
          aspect-ratio: 4/3;
          border-radius:14px;
          overflow:hidden;
          background:#f1f3f4;
          border:1px solid var(--sektion73-modal-line);
        }
        .sektion73ModalThumb img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        }

        .sektion73ModalMeta{
          display:flex;
          flex-direction:column;
          gap:8px;
        }
        .sektion73ModalImgSrc{
          font:600 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          color:rgba(14,19,24,.55);
          margin:0;
        }
        .sektion73ModalBodyH{
          font:800 18px/1.15 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          margin:0;
        }
        .sektion73ModalBodyP{
          font:500 14px/1.55 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          color:var(--sektion73-modal-muted);
          margin:0;
        }

        .sektion73ModalActions{
          margin-top:auto;
          display:grid;
          gap:10px;
          padding-top:8px;
        }
        .sektion73ModalBtn{
          width:100%;
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          padding:12px 14px;
          border-radius:14px;
          border:1px solid var(--sektion73-modal-line);
          background:#fff;
          cursor:pointer;
          font:800 14px/1 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          color:var(--sektion73-modal-text);
        }
        .sektion73ModalBtnPrimary{
          background:var(--sektion73-accent);
          border-color:rgba(0,0,0,.08);
        }
        .sektion73ModalBtn svg{
          width:18px;
          height:18px;
          flex:0 0 auto;
        }

        /* ====== PINS ====== */
        .sektion73PinWrap{
          display:inline-flex;
          flex-direction:column;
          align-items:center;
          gap:6px;
          transform:translateZ(0);
        }
        .sektion73PinBubble{
          padding:10px 12px;
          border-radius:999px;
          background:rgba(255,255,255,.92);
          backdrop-filter: blur(10px);
          border:1px solid rgba(0,0,0,.14);
          box-shadow:0 16px 36px rgba(0,0,0,.20);
          font:900 13px/1 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          color:#0e1318;
          white-space:nowrap;
          cursor:pointer;
          user-select:none;
          display:inline-flex;
          align-items:center;
          gap:10px;
        }
        .sektion73PinDot{
          width:10px;
          height:10px;
          border-radius:999px;
          background:var(--sektion73-accent);
          box-shadow:0 0 0 3px rgba(242,178,0,.22);
        }
        .sektion73PinPointer{
          width:0;
          height:0;
          border-left:10px solid transparent;
          border-right:10px solid transparent;
          border-top:12px solid rgba(255,255,255,.92);
          filter: drop-shadow(0 6px 8px rgba(0,0,0,.18));
        }
        .sektion73PinBtn{
          all:unset;
          cursor:pointer;
          display:inline-flex;
          align-items:center;
          justify-content:center;
        }
      `;
      document.head.appendChild(style);
    }

    function sektion73EnsureModalDOM() {
      sektion73InjectModalCSS();

      let overlay = document.getElementById("sektion73MapOverlay");
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "sektion73MapOverlay";
        overlay.addEventListener("click", sektion73CloseModal);
        document.body.appendChild(overlay);
      }

      let modal = document.getElementById("sektion73MapModal");
      if (!modal) {
        modal = document.createElement("aside");
        modal.id = "sektion73MapModal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-label", "Information");

        modal.innerHTML = `
          <div class="sektion73ModalTop">
            <div>
              <p class="sektion73ModalKicker" id="sektion73ModalKicker">PLATS</p>
              <h2 class="sektion73ModalTitle" id="sektion73ModalTitle">Titel</h2>
            </div>
            <button class="sektion73ModalClose" type="button" id="sektion73ModalCloseBtn" aria-label="Stäng">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 7l10 10M17 7L7 17" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
              </svg>
            </button>
          </div>

          <div class="sektion73ModalGallery">
            <div class="sektion73ModalGalleryTop">
              <img id="sektion73ModalImg0" alt="" loading="lazy">
            </div>
            <div class="sektion73ModalGalleryRow">
              <div class="sektion73ModalThumb"><img id="sektion73ModalImg1" alt="" loading="lazy"></div>
              <div class="sektion73ModalThumb"><img id="sektion73ModalImg2" alt="" loading="lazy"></div>
              <div class="sektion73ModalThumb"><img id="sektion73ModalImg3" alt="" loading="lazy"></div>
            </div>
          </div>

          <div class="sektion73ModalMeta">
            <p class="sektion73ModalImgSrc" id="sektion73ModalImgSrc">Bildkälla: —</p>
            <h3 class="sektion73ModalBodyH" id="sektion73ModalBodyH">Rubrik</h3>
            <p class="sektion73ModalBodyP" id="sektion73ModalBodyP">Brödtext…</p>
          </div>

          <div class="sektion73ModalActions">
            <button class="sektion73ModalBtn sektion73ModalBtnPrimary" type="button" id="sektion73ModalCtaPrimary">
              <span id="sektion73ModalCtaPrimaryTxt">Primär CTA</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>

            <button class="sektion73ModalBtn" type="button" id="sektion73ModalCtaSecondary">
              <span id="sektion73ModalCtaSecondaryTxt">Sekundär CTA</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        `;

        document.body.appendChild(modal);

        const closeBtn = document.getElementById("sektion73ModalCloseBtn");
        if (closeBtn) closeBtn.addEventListener("click", sektion73CloseModal);

        document.addEventListener("keydown", (e) => {
          if (e.key === "Escape") sektion73CloseModal();
        });
      }

      return { overlay, modal };
    }

  let sektion73ModalOpen = false;

    const sektion73StartView = {
      center: sektion73Home.lngLat,
      zoom: sektion73StartZoom,
      pitch: sektion73Pitch,
      bearing: sektion73Bearing
    };

    function sektion73OpenModal(payload) {
      const { overlay, modal } = sektion73EnsureModalDOM();

      // Populate
      document.getElementById("sektion73ModalKicker").textContent = payload.kicker || "PLATS";
      document.getElementById("sektion73ModalTitle").textContent = payload.title || "";
      document.getElementById("sektion73ModalImgSrc").textContent = payload.imgSrc || "Bildkälla: —";
      document.getElementById("sektion73ModalBodyH").textContent = payload.h || "";
      document.getElementById("sektion73ModalBodyP").textContent = payload.p || "";

      const imgs = payload.images || [];
      const img0 = document.getElementById("sektion73ModalImg0");
      const img1 = document.getElementById("sektion73ModalImg1");
      const img2 = document.getElementById("sektion73ModalImg2");
      const img3 = document.getElementById("sektion73ModalImg3");

      if (img0) img0.src = imgs[0] || "https://picsum.photos/seed/sektion73_0/1200/675";
      if (img1) img1.src = imgs[1] || "https://picsum.photos/seed/sektion73_1/600/450";
      if (img2) img2.src = imgs[2] || "https://picsum.photos/seed/sektion73_2/600/450";
      if (img3) img3.src = imgs[3] || "https://picsum.photos/seed/sektion73_3/600/450";

      const cta1 = document.getElementById("sektion73ModalCtaPrimary");
      const cta2 = document.getElementById("sektion73ModalCtaSecondary");
      const cta1t = document.getElementById("sektion73ModalCtaPrimaryTxt");
      const cta2t = document.getElementById("sektion73ModalCtaSecondaryTxt");

      if (cta1t) cta1t.textContent = payload.cta1Text || "Boka";
      if (cta2t) cta2t.textContent = payload.cta2Text || "Visa vägen";

      if (cta1) {
        cta1.onclick = function () {
          if (payload.cta1Href) window.open(payload.cta1Href, "_blank", "noopener,noreferrer");
        };
      }
      if (cta2) {
        cta2.onclick = function () {
          if (payload.cta2Href) window.open(payload.cta2Href, "_blank", "noopener,noreferrer");
        };
      }

      // Open
      overlay.classList.add("is-open");
      modal.classList.add("is-open");
      sektion73ModalOpen = true;
    }

    function sektion73CloseModal() {
      const overlay = document.getElementById("sektion73MapOverlay");
      const modal = document.getElementById("sektion73MapModal");
      if (!overlay || !modal) return;

      overlay.classList.remove("is-open");
      modal.classList.remove("is-open");
      sektion73ModalOpen = false;

      // Cancel ev. pending "zoom-then-open" så modal inte öppnas igen efter moveend
      sektion73IsZoomingToPin = false;
      sektion73PendingPinId = null;
      if (sektion73ActiveMoveEndHandler) {
        sektion73Map.off("moveend", sektion73ActiveMoveEndHandler);
        sektion73ActiveMoveEndHandler = null;
      }

      // Zooma ut till startläget (samma transition, fast tvärtom)
      if (sektion73Map && typeof sektion73Map.easeTo === "function") {
        sektion73Map.easeTo({
          center: sektion73StartView.center,
          zoom: Math.min(sektion73StartView.zoom, sektion73MaxZoom),
          pitch: sektion73StartView.pitch,
          bearing: sektion73StartView.bearing,
          duration: sektion73PinZoomDur,
          easing: (t) => 1 - Math.pow(1 - t, 3) // ease-out cubic
        });
      }
    }

    /* =========================
       PINS (2 st) – zoom först, modal efter "moveend"
       ========================= */

    const sektion73Pins = [
      {
        id: "sektion73Pin_surbrunn_0000",
        label: "Boendet",
        lngLat: sektion73Home.lngLat,
        modal: {
          kicker: "BOENDE",
          title: "Surbrunnsvägen 2–8",
          images: [
            "https://picsum.photos/seed/sektion73_sur_0/1400/800",
            "https://picsum.photos/seed/sektion73_sur_1/700/525",
            "https://picsum.photos/seed/sektion73_sur_2/700/525",
            "https://picsum.photos/seed/sektion73_sur_3/700/525"
          ],
          imgSrc: "Bildkälla: apelsvikstrand.se",
          h: "Strandhus & lägenheter nära havet",
          p: "Egen uteplats, smidig incheckning och gångavstånd till stranden.",
          cta1Text: "Boka",
          cta1Href: "https://www.apelvikstrand.se/strandhus",
          cta2Text: "Visa vägen",
          cta2Href: "https://www.google.com/maps/search/?api=1&query=Surbrunnsv%C3%A4gen%202%E2%80%938%2C%20432%2053%20Varberg"
        }
      },
      {
        id: "sektion73Pin_tangkorar_0001",
        label: "Restaurang",
        lngLat: sektion73Tangkorar.lngLat,
        modal: {
          kicker: "MAT & DRYCK",
          title: "Tångkörarvägen 1",
          images: [
            "https://picsum.photos/seed/sektion73_tang_0/1400/800",
            "https://picsum.photos/seed/sektion73_tang_1/700/525",
            "https://picsum.photos/seed/sektion73_tang_2/700/525",
            "https://picsum.photos/seed/sektion73_tang_3/700/525"
          ],
          imgSrc: "Bildkälla: apelviken.se",
          h: "Nära – perfekt för lunch eller middag",
          p: "En kort promenad från boendet. Kolla öppettider och hitta rätt direkt.",
          cta1Text: "Se meny",
          cta1Href: "https://www.apelviken.se/",
          cta2Text: "Visa vägen",
          cta2Href: "https://www.google.com/maps/search/?api=1&query=T%C3%A5ngk%C3%B6rarv%C3%A4gen%201%2C%20432%2054%20Varberg"
        }
      }
    ];

    function sektion73CreatePinEl(pin) {
      const wrap = document.createElement("div");
      wrap.className = "sektion73PinWrap";
      wrap.id = pin.id;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sektion73PinBubble sektion73PinBtn";
      btn.setAttribute("aria-label", pin.label);

      const dot = document.createElement("span");
      dot.className = "sektion73PinDot";
      dot.setAttribute("aria-hidden", "true");

      const txt = document.createElement("span");
      txt.textContent = pin.label;

      btn.appendChild(dot);
      btn.appendChild(txt);

      const pointer = document.createElement("div");
      pointer.className = "sektion73PinPointer";
      pointer.setAttribute("aria-hidden", "true");

      wrap.appendChild(btn);
      wrap.appendChild(pointer);

      // micro hover
      btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-1px)";
        btn.style.boxShadow = "0 18px 40px rgba(0,0,0,.22)";
      });
      btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0)";
        btn.style.boxShadow = "0 16px 36px rgba(0,0,0,.20)";
      });

      return { wrap, btn };
    }

    const sektion73MarkersById = Object.create(null);
    let sektion73IsZoomingToPin = false;
    let sektion73PendingPinId = null;
    let sektion73ActiveMoveEndHandler = null;

    function sektion73ZoomToPinThenOpenModal(pin) {
      // Stäng ev. befintlig modal direkt (så fokus blir zoom först)
      if (sektion73ModalOpen) sektion73CloseModal();

      // Safety: rensa tidigare moveend-hook om man klickar snabbt mellan pins
      if (sektion73ActiveMoveEndHandler) {
        sektion73Map.off("moveend", sektion73ActiveMoveEndHandler);
        sektion73ActiveMoveEndHandler = null;
      }

      sektion73IsZoomingToPin = true;
      sektion73PendingPinId = pin.id;

      // Vänta på att zoomen är klar → öppna modal
      const onMoveEnd = () => {
        if (!sektion73IsZoomingToPin) return;
        if (sektion73PendingPinId !== pin.id) return;

        sektion73Map.off("moveend", onMoveEnd);
        sektion73ActiveMoveEndHandler = null;

        sektion73IsZoomingToPin = false;
        sektion73PendingPinId = null;

        sektion73OpenModal(pin.modal);
      };

      sektion73ActiveMoveEndHandler = onMoveEnd;
      sektion73Map.on("moveend", onMoveEnd);

      sektion73Map.easeTo({
        center: pin.lngLat,
        zoom: Math.min(sektion73PinZoom, sektion73MaxZoom),
        pitch: sektion73Pitch,
        bearing: sektion73Bearing,
        duration: sektion73PinZoomDur,
        easing: (t) => 1 - Math.pow(1 - t, 3) // ease-out cubic
      });
    }

    function sektion73AddPin(pin) {
      const { wrap, btn } = sektion73CreatePinEl(pin);

      btn.addEventListener("click", () => {
        sektion73ZoomToPinThenOpenModal(pin);
      });

      const marker = new mapboxgl.Marker({
        element: wrap,
        anchor: "bottom",
        offset: [0, 10]
      })
        .setLngLat(pin.lngLat)
        .addTo(sektion73Map);

      sektion73MarkersById[pin.id] = { marker, pin };
    }

    sektion73Map.once("load", function () {
      // pins
      sektion73Pins.forEach(sektion73AddPin);

      // säkerställ modal-DOM tidigt (ingen synlig effekt)
      sektion73EnsureModalDOM();
    });

    /* =========================
       Debug helpers
       ========================= */
    window.sektion73MapInstance = sektion73Map;

    window.sektion73PrintBounds = function () {
      const b = sektion73Map.getBounds();
      const sw = b.getSouthWest();
      const ne = b.getNorthEast();
      console.log("Bounds SW:", [Number(sw.lng.toFixed(6)), Number(sw.lat.toFixed(6))]);
      console.log("Bounds NE:", [Number(ne.lng.toFixed(6)), Number(ne.lat.toFixed(6))]);
      return { sw: [sw.lng, sw.lat], ne: [ne.lng, ne.lat] };
    };
  });
})();

