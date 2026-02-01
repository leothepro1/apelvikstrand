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

#sektion73MapCanvas .sektion73PinBubble .sektion73PinIco{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:82px;
  height:auto;
  flex:0 0 82px;
  line-height:0;
}
.sektion73PinDot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--sektion73-accent);
    display: none;
}
#sektion73MapCanvas .sektion73PinBubble .sektion73PinIco svg{
  width:82px;
  height:auto;
  display:block;
  color:currentColor;
}

#sektion73MapCanvas .sektion73PinBubble{
  gap:10px;
}
.sektion73PinWrap {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0px;
    transform: translateZ(0);
}
       /* PER-PIN: färger styrs via CSS-variabler på .sektion73PinWrap */
        .sektion73PinBubble{
          padding:10px 12px;
          border-radius:999px;
          background:var(--sektion73-pin-bubble-bg, rgba(255,255,255,.92));
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

        .sektion73PinPointer{
          width:0;
          height:0;
          border-left:10px solid transparent;
          border-right:10px solid transparent;
          border-top:12px solid var(--sektion73-pin-pointer-top, rgba(255,255,255,.92));
          filter: drop-shadow(0 6px 8px rgba(0,0,0,.18));
        }
.sektion73PinBtn {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #FCFBF8;
    height: max-content;
    padding: 12px;
    border-radius: 12px;
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

  const sektion73PinIcons = {
      home: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2658.5 1367.2"><path d="M1104.1 1287.5c-137.3 0-270.5-16.1-396-47.7-121.3-30.6-230.3-74.5-324-130.4-94-56.1-167.9-121.6-219.7-194.6-53.9-76.1-81.2-157-81.2-240.5s27.3-164.4 81.2-240.5c51.7-73 125.6-138.5 219.7-194.6 93.7-55.9 202.7-99.8 324-130.5C833.5 77 966.8 61 1104.1 61s218.1 10.4 321.5 31c100.1 19.9 194.1 48.9 279.6 86.3 84.6 37 159 81.4 221.1 132 63.1 51.4 112.2 108.1 145.9 168.5l-16.6 9.3c-65.5-117.4-189.3-218.5-358-292.3-173-75.7-378.2-115.7-593.5-115.7-552.4 0-1001.9 266.6-1001.9 594.3s449.5 594.2 1001.9 594.2 644.4-98.3 831.4-263l12.6 14.3c-91.9 80.9-216.2 148.2-359.7 194.6-72.9 23.6-150.4 41.8-230.5 54.1-82.5 12.7-167.9 19.1-253.8 19.1Z"/><path d="M2244.5 856.6h14.9c12.3 0 19.8 7.3 19.8 18.5s-6.3 18.5-24.4 18.5-8.8 0-10.4-.2v-36.8c.1 0 0 0 0 0Zm38 84.8h16.7l-36.5-38.1c15.3-.9 28.5-11.4 28.5-28.5s-13.4-28.9-31.4-28.9h-27v95.5h11.9v-40.7zm-117.5 0h48.5v-11.3h-36.6v-31.3h36.6v-11.3h-36.6v-30.3h36.6v-11.3H2165zm-50.9 0h11.9v-84.2h23.4v-11.3h-58.7v11.3h23.4zm-84.4 0h48.5v-11.3h-36.6v-31.3h36.6v-11.3h-36.6v-30.3h36.6v-11.3h-48.5zm-34.3-54.5h-49V846h-11.8v95.5h11.8v-43.2h49v43.2h11.9V846h-11.9zm-94.6 32.9h-.2l-50.3-73.9h-11.1v95.5h11.9v-73.9h.2l50.3 73.9h11.1v-95.5h-11.9zM1772 941.4h48.5v-11.3h-36.6v-31.3h36.6v-11.3h-36.6v-30.3h36.6v-11.3H1772zm-66-41.3h34.3c-4 20-19.6 31.6-36.5 31.6s-37.1-15.7-37.1-38 17.5-37.9 37.1-37.9 18 3.5 25.5 10.7l7.5-9.1c-11.1-9.7-22.1-12.9-33-12.9-31.8 0-49.7 25.7-49.7 49.2s17.8 49.2 49.7 49.2 49.5-19.8 49.5-54.1H1706zm-90.4 8.6h-35.5l17.8-46.9zm12.6 32.7h12.9l-38.1-95.5h-10.4l-38.1 95.5h12.9l8.5-22.2h43.6zm-49.6-109.3c0 4.4 3.4 7.9 7.8 7.9s7.8-3.5 7.8-7.9-3.5-7.9-7.8-7.9-7.8 3.5-7.8 7.9m23 0c0 4.4 3.4 7.9 7.8 7.9s7.8-3.5 7.8-7.9-3.5-7.9-7.8-7.9-7.8 3.5-7.8 7.9m-100.7 109.3h44.7v-11.3h-32.9v-84.2h-11.9v95.5zm-75.8-31.4-15.3-22.2c8.4-5.3 14-11.9 14-21.9s-5.8-16.6-17.8-16.6-18.4 7.3-18.4 18.2 1.9 9.7 7.4 17.4c-16.1 8.7-25.7 17.4-25.7 32s10.3 25.5 25.1 25.5 18.1-5.1 28.4-15.7l10 14.7h14.4l-15.9-22.6 14.8-13.6-7.5-7.9zm-12.4-43.3c0 4-2.5 8.5-8.5 12.7-3.3-4.8-5.4-8.5-5.4-12.3 0-5.4 3.8-7.9 7.3-7.9s6.6 3.5 6.6 7.5m4.1 51c-8 8.1-15 13.4-21.9 13.4s-14.6-6.9-14.6-15 4.2-12.8 20.1-22.7zm-102.1-44.5c-1.3-19.4-13.4-28.8-29-28.8s-28.8 9.9-28.8 26.4 6.9 20.6 20.9 26.1l11.9 4.8c8.5 3.4 14.6 8.1 14.6 15.6s-7.4 15.1-17.7 15.1-18.4-7.3-19.4-17.8h-11.9c1.5 19.1 13.6 28.3 30.5 28.3s30.1-11.2 30.1-26.6-6.9-20.5-21.8-26.1l-11.9-4.5c-9.2-3.5-13.7-8.1-13.7-15.2s3.6-15.4 16.9-15.4 16.4 6.9 18 18.2h11.3Zm-150.4 33.6c0 20.6 15.3 36.2 36.5 36.2s37-15.6 37-36.2V846H1226v57.3c0 15.6-8.5 28.4-24.9 28.4s-24.9-12.8-24.9-28.4V846h-11.9zm-33.8-19.9h-49V846h-11.9v95.5h11.9v-43.2h49v43.2h11.9V846h-11.9zm-144 43.2v-72.9h15c20.5 0 36.5 15 36.5 35.4s-14.6 37.4-35.5 37.4h-16Zm-11.8 11.3h27.8c26.7 0 48-20.9 48-48.1s-22.1-47.4-45-47.4h-30.9v95.5Zm-33.8-21.6h-.2l-50.3-73.9h-11.1v95.5h11.9v-73.9h.2l50.3 73.9h11.1v-95.5h-11.9zm-102.1-11.1h-35.5l17.8-46.9zm12.6 32.7h12.9l-38.1-95.5h-10.4l-38.1 95.5h12.9l8.5-22.2h43.6zm-136.1-84.8h15c12.3 0 19.8 7.3 19.8 18.5s-6.3 18.5-24.4 18.5-8.8 0-10.4-.2zm37.9 84.8h16.7l-36.5-38.1c15.3-.9 28.5-11.4 28.5-28.5s-13.4-28.9-31.5-28.9h-27v95.5h11.9v-40.7zm-100.7 0h11.9v-84.2h23.4v-11.3h-58.7v11.3h23.4zm-36.2-68.2c-1.3-19.4-13.4-28.8-29-28.8s-28.8 9.9-28.8 26.4 6.9 20.6 20.9 26.1l11.9 4.8c8.5 3.4 14.6 8.1 14.6 15.6s-7.4 15.1-17.7 15.1-18.4-7.3-19.4-17.8H557c1.5 19.1 13.6 28.3 30.5 28.3s30.1-11.2 30.1-26.6-6.9-20.5-21.8-26.1l-11.9-4.5c-9.2-3.5-13.7-8.1-13.7-15.2s3.6-15.4 16.9-15.4 16.4 6.9 18 18.2h11.2ZM2555 600.3h-.8c-16.1-22.6-45.4-34.3-74.3-34.3-55.2 0-101.8 42.6-101.8 97.3s48.8 101.2 103.3 101.2 58.6-13.9 72.9-33.5h.8v29.1h33.8V483.4H2555zm0 65.3c0 37.9-31.6 68.5-70.2 68.5s-70.5-26.6-70.5-70.3 25.9-67.1 71.7-67.1 69 30.6 69 68.9m-235.7 94.7h33.8V637.6c0-51.4-37.5-71.4-75.5-71.4s-43.6 9.5-53.7 26.6h-.8v-22.2h-33.8v189.9h33.8V653.6c0-36 19.1-56.8 50.7-56.8s45.4 24.8 45.4 53.2v110.3zM2125.2 698c0 18.6-13.9 37.9-55.2 37.9s-55.2-19.3-55.2-37.9 13.9-37.9 55.2-37.9 55.2 19.3 55.2 37.9m-1.2-45.2c-18-15.7-39.8-21.5-60.5-21.5-54.4 0-84.9 30.6-84.9 65.2s37.5 68.1 85.2 68.1 45-7.3 62.3-24.8v20.4h31.6V630.6c0-45.2-43.6-64.5-90.5-64.5s-40.9 2.6-70.5 14.6l14.7 27.3c18.4-8.8 35.7-13.1 54-13.1 26.3 0 58.6 6.9 58.6 38.2zm-246.4 107.5h33.8V652.5c0-34.6 18.8-53.6 46.9-53.6s10.5.7 15.4 1.9v-34.6c-28.5 0-44.7 1.8-61.6 31.3h-.8v-27h-33.8v189.8Zm-108.9-189.8h-27.1v28.8h27.1v120.2c0 29.1 10.5 40.8 45 40.8s15.7 0 20.6-.4v-30.2H1819c-13.2 0-16.5-3.6-16.5-13.9V599.2h31.2v-28.8h-31.2v-45.9h-33.8zm-420 82.7V483.4h-33.8v276.9h33.8v-92.2l81.5 92.2h47.3l-92.3-102 90.5-87.8h-44.3zm-119.4-142.8c0 12.7 10.5 22.9 23.6 22.9s23.6-10.2 23.6-22.9-10.5-22.9-23.6-22.9-23.6 10.2-23.6 22.9m6.8 249.9h33.8V570.5h-33.8zm-124.7-43.7-61.9-146.1h-38.3l84.5 189.9h31.6l84.5-189.9h-38.3zm-163-233.2v220.1c0 39.7 20.6 56.8 51.8 56.8h13.9v-30.6H1004c-10.9 0-21.8-7.3-21.8-28.8V483.4zM760 651c3.4-25.9 23.3-54.3 64.6-54.3s61.2 22.9 64.6 54.3zm132.9 52.4c-17.3 19.7-38.7 30.6-62.7 30.6-37.9 0-65-23.6-70.2-56.1h167.5c0-67.1-42.1-111.9-102.5-111.9s-101 45.2-101 99.1 37.2 99.5 106.7 99.5 61.9-12.7 88.2-41.2zM497.2 840.5H531V731.2h.8c14.3 19.7 39.1 33.5 72.9 33.5 54.4 0 103.3-41.6 103.3-101.2s-46.6-97.3-101.8-97.3-58.2 11.6-74.3 34.3h-.9v-29.8h-33.8zm174.6-176.7c0 43.7-34.9 70.3-70.6 70.3S531 703.5 531 665.6s32.3-68.8 69.1-68.8 71.6 35.3 71.7 67m-268.9 1.4H294.8l54-135.9zm38.3 95.1h39.5L364.6 483.4H333L217 760.3h39.5l25.9-64.5h132.9z"/><path d="M1777.2 430.6c-51.2-101.6-353.8 25.7-282.5 134.3 24.2 32.5 62.6 45.7 98.5 64 36.1 17.4 76.1 30.6 100.7 63.2 50.6 74.4-103 111.3-155.3 112.6-12.9 3.3-92-5.1-52.4 7.7 60 15.9 131.8 13.9 185.2-17.1 79.3-38.1 107.4-132.3 18-178.4-45.4-30.2-117.8-43.5-157.9-84.5-20.5-25.6 4.9-57.8 29.5-72.4 39.3-25 85.6-35.9 132.2-38.2 36-.9 57.8 9.8 62.6 47.5 1.3 5.2 2.8 7.8 5.2 6.9 5-.2 14.9-22.6 18.4-37.5"/></svg>
      `,
      food: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 223.3 47.9"><defs><style>.st0{fill:#1d1d1b}</style></defs><path class="st0" d="M13.3 38.4c0 .7-.1 1.3-.2 1.9s-.2 1.3-.4 1.8-.6.9-.9 1.3c-.3.5-.5.9-.9 1.3-.3.4-.5.8-.9 1.1-.3.3-.7.6-1.1.9-.3.2-.8.3-1.1.5-.4.2-.7.5-1 .6 0 0-.1-.1-.2 0l-.2.2c-.4 0-.8-.3-1.2-.7s-.6-.7-.6-1.1.3-1 1-1.3c.4-.1.8-.4 1.2-.8.3-.3.7-.6 1-1.1.2-.4.4-.8.6-1.3.2-.4.2-.9.3-1.3 0-.4.2-.9.2-1.4s0-1.1-.2-1.6c0-.6-.3-1-.5-1.5s-.3-1-.6-1.5-.6-1-1-1.5c-.3-.4-.7-.9-1.1-1.4-.4-.4-.7-1-1.1-1.4s-.9-.8-1.3-1.2c-.4-.5-.6-1-1-1.5s-.9-.9-1.1-1.3-.4-.9-.6-1.4-.2-1-.3-1.5c0-.5-.3-1-.3-1.5s.1-1 .2-1.5c0-.5.3-.9.4-1.4.2-.5.3-1 .5-1.4s.6-.8.9-1.2.5-.8.9-1.1.8-.5 1.2-.7.9-.2 1.4-.3c.4 0 .9-.2 1.4-.2h1.5q.9 0 1.5.3c.5.2.9.5 1.3.9.3.4.6.8.8 1.3.2.4.2 1 .3 1.5v1.5c0 .5 0 .8-.1 1.2v1.3c0 .4-.4.7-.7.9-.4.2-.7.5-1.1.5s-.9-.1-1.2-.3-.5-.6-.5-1.1c0-.6-.2-1.2-.3-1.7-.1-.7-.1-1.3-.3-1.7-.3-.7-.8-1.1-1.5-1.1s-1.1.5-1.5 1.1c-.2.3-.4.8-.5 1.4 0 .4-.2.9-.2 1.4s.2 1.2.3 1.8c.2.6.3 1.2.6 1.7.2.4.6.8.9 1.2s.6.7 1 1.1c.3.3.5.9.8 1.2.6.7 1.2 1 1.5 1.3s.6 1 .9 1.4c.3.5.6.9.9 1.4s.7.9.9 1.4.3 1 .4 1.5.4 1 .5 1.5v1.6Zm31.9-7.7c0-.5-.1-1-.1-1.5V26c0-.5-.3-1-.4-1.5 0-.5 0-1-.2-1.4-.1-.5-.2-1-.3-1.4-.1-.5-.5-.9-.6-1.3-.2-.5-.2-1-.4-1.4-.2-.5-.6-.9-.9-1.3-.3-.5-.4-1-.8-1.4-.3-.4-.7-.8-1.1-1.1-.3-.3-.7-.6-1.1-.8s-.8-.5-1.2-.6-.9 0-1.3 0h-1.3c-.4.1-.8.4-1.2.6s-.7.5-1.1.8-.8.7-1.1 1.2c-.3.4-.5.9-.8 1.4-.2.4-.4 1-.6 1.5-.2.4-.4.9-.5 1.3-.2.4-.5.8-.6 1.3s-.2.9-.3 1.4-.1 1-.2 1.4c0 .5-.2 1-.3 1.5 0 .5-.2 1-.2 1.5s-.2 1-.2 1.5.1 1 .1 1.5v4.8c0 .5.3 1 .4 1.5 0 .5 0 1 .2 1.4.1.5.2.9.4 1.4.1.5.2.9.4 1.4s.4.9.6 1.3l.6 1.5c.3.5.6.8.9 1.3.3.4.6.9.9 1.3.3.3.8.4 1.2.7.4.2.8.4 1.2.5s.8.4 1.3.4.9-.1 1.3-.2.8-.4 1.2-.6.7-.5 1-.8c.4-.4.9-.6 1.2-1.1.3-.4.6-.9.8-1.4.2-.4.5-.9.7-1.4.2-.4.3-.9.5-1.4s.4-.9.5-1.3c.1-.5.2-.9.3-1.4s.2-.9.3-1.4c0-.5.3-1 .4-1.5 0-.5.2-1 .2-1.5v-1.6c0-.5.1-1 .1-1.5Zm-5 6.3c0 .5-.1.9-.2 1.4 0 .5 0 .9-.2 1.4-.1.6-.3 1.1-.5 1.6-.2.6-.4 1.1-.7 1.5-.2.4-.5.7-.8.9s-.7.2-1.2.2c-.8 0-1.3-.4-1.8-1.1-.3-.4-.6-.9-.8-1.4s-.3-1-.4-1.6c0-.5-.1-.9-.2-1.4 0-.5-.2-.9-.3-1.4 0-.5-.2-.9-.2-1.4v-1.6c0-.5.2-1.1.2-1.6v-3.2c0-.6 0-1.1.1-1.6 0-.6 0-1.1.1-1.6 0-.5.1-.9.2-1.4v-1.4c0-.5.2-.9.2-1.4.1-.6.3-1.1.5-1.6.2-.6.5-1 .8-1.4.2-.4.4-.7.7-.9s.7-.2 1.1-.2.8 0 1.1.3c.3.2.5.5.8.8.3.4.6.9.8 1.4s.3 1 .4 1.6c0 .4.3.9.3 1.3v1.4c0 .4.3.9.3 1.4s0 1.1.1 1.6c0 .5-.2 1.1-.2 1.6V34c0 .6-.2 1.1-.3 1.6s0 .9 0 1.4Zm22.7-19.5v-2.2zm.1 4.4v-3.3zm3.4 3.1v.9-1Zm.3 14.9V39v.8ZM66.9.7v1.8zm0-.2v.1h.2s-.2-.2-.2-.1m.4 47.1h-5.4q-.6 0-.9-.6c-.2-.4-.2-.9-.2-1.5s.1-.8.3-1.2.4-.4.7-.4.2-.2.4-.2.3.2.3.2v-.1c0-.4.1-.8.2-1.4V41c0-.5.3-.9.3-1.4s-.2-1-.2-1.5.1-.9.1-1.4v-1.5c0-.5.1-1 .1-1.5s-.2-1-.2-1.5.1-1 .1-1.5v-3c0-.7-.1-.7-.1-1.5v-3c0-.5 0-.7.2-.9v-7.1c0-.6-.3-1.1-.3-1.6v-3.1c0-.5 0-.9-.1-1.4V4.9c0-.2-.1 0-.2 0h-1c-.4 0-.6-.3-.8-.6s0-.8 0-1.3 0-1 .3-1.4c.2-.4.4-.5.7-.5s.5-.1.9 0c.6 0 1.1-.1 1.4-.1h1.4c.7 0 1.3.1 1.8.2v1.9c0 .4.1.8.1 1.2v1.6c0 .5-.1 1.1-.1 1.6v3.2c0 .5-.2 1.1-.2 1.6v4.2c0 .5-.1 1-.1 1.4 0 .5-.2 1-.2 1.4v1.4c0 .8.1.8.1 1.7v1.7c0 .9-.2.8-.3 1.3s0 .2 0 .4V32c0 .5.3 1 .3 1.5s-.3 1-.3 1.5v.2c0 .5.3.9.3 1.3v1.6c0 .4 0 .8-.1 1.2v.9c0 .4.2.8.2 1.1 0 .5.2 1.1.3 1.6v1.6c0 .5.1 1.1.1 1.6v1.7Z"/><path class="st0" d="M61.4.6c-.3 0-.5.2-.7.5-.2.4-.3.8-.3 1.4 0-.6 0-1 .2-1.4s.4-.5.8-.5m1.6 18v-1zm41.9-2.8c0 .7-.2 1.1-.6 1.4s-.8.5-1.4.6c0 0-.2 0-.3.1h-.3v-.1c-.2.5-.3 1-.4 1.5s-.3 1-.4 1.5-.2 1-.4 1.5c-.1.5-.2 1-.4 1.5-.1.5-.3 1-.5 1.5-.1.5-.3 1-.5 1.5-.1.5-.1 1-.3 1.5-.1.5-.4 1-.5 1.5l-.3 1.5c-.2.8-.3 1.5-.4 1.9-.1.5-.3 1-.5 1.6-.1.5 0 1.1-.2 1.6-.1.5-.3 1.1-.4 1.6s-.4 1-.5 1.5-.1 1.1-.2 1.6-.3 1.1-.4 1.6c-.1.6 0 1.1-.1 1.6-.1.6-.3 1.1-.4 1.6-.2.4-.5.7-.8 1s-.6.4-1 .4c-.9 0-.9.1-1.7.1s-.9.2-1.7 0c-.1-.6-.3-1.1-.4-1.6-.1-.6-.3-1.1-.4-1.6-.1-.6-.2-1.1-.3-1.6s-.1-1-.2-1.5-.3-1-.4-1.5l-.6-3c-.1-.5 0-1-.2-1.5-.1-.5-.4-1-.5-1.4-.1-.5 0-1-.2-1.5-.1-.5-.4-1-.5-1.4l-.3-1.5c-.1-.5-.1-1-.2-1.5s-.4-1-.5-1.4c-.1-.5-.1-1.1-.3-1.6-.1-.5-.3-1.1-.5-1.6-.1-.5-.3-1-.5-1.6-.2-.5-.2-1.1-.3-1.6-.2-.5-.4-1-.5-1.5s-.4-1-.6-1.5l-.6-1.5c-.2-.5-.3-1.1-.5-1.6h3c.9 0 1.5.2 1.8.2h3.1c.4 0 .7.2 1 .6s.6.8.6 1.3-.1 1.1-.5 1.5c-.3.4-.7.6-1.1.6s-.7-.3-1.2-.6c-.2-.1-.3-.2-.3-.2 0 .5 0 1 .1 1.5 0 .5.3 1 .4 1.4v1.5c0 .5.1 1 .2 1.5 0 .5.3.9.4 1.4 0 .5.2 1 .3 1.5 0 .5 0 1 .1 1.5s.3 1 .5 1.5c.1.5.3 1 .4 1.5s.1 1 .2 1.5.4 1 .5 1.5.2 1 .4 1.5l.3 1.5c.1.5.3 1 .4 1.5s.3.9.4 1.4c.1-.5.4-.9.5-1.3l.3-1.5.3-1.5c.1-.5 1.5-6.9 1.6-7.4s.1-1 .2-1.5c0-.5.3-1 .4-1.5 0-.5.1-1 .2-1.5s.3-1 .4-1.5c0-.5 0-1 .2-1.5 0-.5.2-1 .2-1.5s.4-1 .5-1.5h-.1l-.1.2q-.45.6-.9.6c-.5 0-.8-.3-1.1-.6-.2-.4-.3-.8-.3-1.3s.1-1 .4-1.4.6-.7 1.1-.7h1.8c.8 0 1.3.2 1.7.2h1.8c.7 0 1.2-.3 1.7-.3.4 0 .6.3 1 .7.3.4.5.7.5 1.2Zm21 28.2v.7zm-.4-13.1v.4-.7zm-2.8-8.7V22zv.6zm2.9-16h-.2c.3 0 .6-.2.9-.3-.2 0-.4.2-.7.2Zm2.5-4.3c-.2-.3-.4-.6-.7-.9s-.6-.5-1-.7q-.6-.3-1.2-.3h-2.4c-.6 0-.8 0-1.2.2-.3.2-.7.5-1 .7-.3.3-.6.6-.8 1q-.3.6-.3 1.2c0 .6.2 1 .4 1.4s.4.9.8 1.2 1 .3 1.5.4 1 .5 1.5.5 1-.3 1.4-.5h.2c.2 0 .5-.1.7-.2h.1c.2 0 .4-.2.7-.4.4-.3 1-.5 1.2-1 .2-.4.2-1 .2-1.5s-.2-.8-.3-1.1Zm-7.2-.8c.1-.1.3-.3.5-.4-.2.1-.3.2-.5.4l-.3.3s.1-.2.2-.3Zm5.2 44.7c0 .5.2 1.1.2 1.6h-4.4V46c0-.4.2-.9.2-1.4v-1.4c0-.5.2-.9.3-1.3v-2.8c0-.5.3-1 .4-1.5 0-.5-.1-1-.1-1.5v-3c0-.5.1-1 .1-1.5v-3.4c0-.5-.1-1-.1-1.5s0-1-.1-1.5c0-.5.3-1 .3-1.5V22c0-.5-.3-.9-.4-1.2v-1.4c0-.7.2-1.3.1-1.5-.1 0-.5.1-.7 0-.2 0-.4-.2-.5-.2-.6-.2-1-.7-1-1.7s.1-1.1.3-1.5.6-.6.9-.6h5c0 .6-.1 1.1-.2 1.6 0 .5-.2 1.1-.2 1.6s-.1 2.7-.1 3.2c0 .6-.1 1.1-.1 1.6s.2 1 .2 1.5-.2 1-.2 1.5 0 1-.1 1.5c0 .5.2 1 .2 1.5v1.5c0 .5-.2.7-.3 1.2v.7c0 .4.1.5.1 1.2v1.4c0 .5-.2.9-.2 1.4s.2.9.2 1.4v2.8c0 .5.1 1.1.1 1.6s.2 1 .2 1.6c0 .5-.2.9-.2 1.4v.7c0 .4.2.7.2 1.1Zm19.1-16.5v.2zm.1-24.4v.4-1.8zm3.4 20.2v.9-1Zm5.4 20.4c-.1-.5-.3-.9-.5-1.4 0 .1 0 .2.1.4.1.4.2.7.3 1.1Zm1-8.4s0-.2-.1-.2c0-.2-.1-.4-.2-.6.1.3.2.5.3.8"/><path class="st0" d="M160.8 47.3c-.3 0-.9.1-1.6.2-.9.1-1.5.2-2 .2-.7 0-1.3-.2-1.8-.5-.5-.2-.8-.6-1.1-1.2s0-.3-.1-.4c-.1-.4-.2-.7-.3-1.1 0-.1 0-.2-.1-.4-.2-.4-.3-.7-.5-1.1-.2-.5-.5-.9-.7-1.5-.2-.5-.3-1-.4-1.5-.2-.5-.5-.9-.7-1.5-.2-.5-.1-1.1-.3-1.6s-.6-.9-.8-1.4l-.6-1.5c-.2-.5-.2-1-.4-1.5-.2.3-.2.7-.3 1.5 0 .4-.2.9-.2 1.4v2.9c0 .5-.2.9-.2 1.4s.2.9.2 1.4v3.1c0 .6.3 1.1.4 1.6v1.7h-1.7c-.2 0-.6.1-1.1.2h-2.3c0-.5.1-1.1.2-1.6 0-.5 0-1.1.1-1.7V41c0-.5.2-1.1.2-1.7v-8c0-.5.2-1 .2-1.5 0-.6-.3-1.1-.3-1.6 0-.8.1-.8.1-1.5s.2-.8.2-1.4c0-.8-.2-.8-.2-1.6s.1-.8.1-1.5v-1.5c0-.7.1-.8.1-1.5s-.3-1-.3-1.6v-3.2c0-.6.2-1.1.2-1.6v-1.6c0-.8.1-1.3.1-1.6 0-.5-.2-1-.3-1.4 0-.5.2-1 .2-1.5V2.4c0-.5-.2-1.1-.2-1.6.5-.2.7.2 1.2.2h1.2c.7 0 1.2.1 1.5.6s.5 1.1.5 1.8-.3 1.1-.4 1.6c0 .6.2 1.1.1 1.6v3.2c0 .6-.2 1.1-.2 1.6v6.7c0 .3-.2.7-.2 1v2.5c0 .3.2.6.2.9v1.7c0 .9-.2.8-.3 1.3v1c0 .3.1.5.3 1.1.4-.4.6-.9 1.1-1.4.4-.4.7-1 1.2-1.5.4-.4.8-.8 1.1-1.2.4-.5.8-.9 1.1-1.3.2-.3.4-.7.7-1.1.2-.3.5-.7.7-1.1s.4-.7.7-1.1c.5-.9 1.2-1.3 1.8-1.3s1 .1 1.3.5c.4.4.5 1 .5 1.4s-.3.5-.5.8c-.2.2-.5.7-.9 1.2-.2.3-.4.7-.7 1.1-.2.3-.5.7-.8 1.1-.3.5-.5.9-.8 1.3-.3.5-.5.9-.8 1.3-.3.5-.7.8-1 1.1-.7.9-1.2 1.4-1.6 1.5.1.5.5.9.7 1.4s0 1 .2 1.5.5.9.7 1.3c.2.5.2 1 .4 1.4.2.5.2 1 .4 1.4 0 .2.2.5.2.7v.1c0 .2.1.4.2.6 0 0 0 .2.1.2.2.3.6.6.7 1 .2.5.3 1 .5 1.4s.4.9.7 1.3c.2.4.5.8.8 1.3.2.4.5.8.8 1.3.2.4.2 1 .5 1.4s.7.8.9 1.2c.3.4.6.9.8 1.3Zm29.5-8.9c-.3-.3-.7-.5-1.2-.5s-1 0-1.3.4c-.2.4-.4 1-.5 1.8 0 .5 0 1-.2 1.5s-.6.8-.8 1.2c-.3.4-.6.8-1.2.9-.4.1-1 .1-1.5.1s-1.4-.1-1.9-.4c-.6-.3-1.1-.8-1.3-1.4-.1-.4 0-.9 0-1.4 0-.4-.1-.9-.2-1.4 0-.4-.2-.9-.2-1.4V35c0-.5-.2-1.2-.2-1.7v-1.8c.7-.3.8.1 1.6.1s.8-.2 1.6-.2h4.7c.8 0 .8.2 1.6.2s.8 0 1.5-.2V30c0-.5-.1-1-.1-1.5V27c0-.5 0-1-.1-1.5 0-.5 0-1-.1-1.5 0-.5-.4-1-.4-1.4 0-.5 0-1-.2-1.5-.1-.5-.3-1-.4-1.4-.2-.5-.2-1-.4-1.4-.2-.5-.5-.9-.8-1.3-.3-.5-.4-1-.7-1.4s-.7-.9-1.1-1.2-1-.3-1.5-.5c-.5-.1-1-.4-1.5-.4v.1c-.5 0-1-.1-1.4 0-.5.1-.9.3-1.3.5s-.7.6-1.1.9-.9.6-1.2 1-.6.8-.8 1.3c-.2.4-.6.8-.8 1.3-.2.4-.3.9-.4 1.3-.2.4-.2.9-.4 1.3-.1.4 0 .9-.2 1.4 0 .5-.4.9-.5 1.3s-.2 1.1-.2 1.6 0 1.1-.1 1.6v9.2c0 .5 0 1 .1 1.5v1.7c0 .6.3 1.1.4 1.7s.4 1.1.6 1.6.2 1 .5 1.4c.2.4.7.7 1 1s.6.7 1 1 .9.7 1.4.9 1.1.1 1.6.2 1 .2 1.6.2h1.4c.5 0 .9-.1 1.4-.2.5 0 .9-.4 1.3-.5.5-.2.9-.3 1.2-.6.5-.4 1-.7 1.3-1.3.2-.5.4-1.1.5-1.7.1-.5 0-1.1.1-1.8 0-.5.3-1.2.3-2.1s-.3-.7-.7-1.1ZM180 23.7c0-.6.3-1.1.4-1.6 0-.6.1-1.1.3-1.6.1-.4.4-.8.5-1.1.2-.4.4-.8.6-1.1.5-.6 1-.9 1.8-.9s1.2.2 1.6.7c.3.4.2 1 .4 1.7 0 .4.1 1 .2 1.5 0 .5.1 1 .1 1.5v3.1c0 .5.1 1 .1 1.5-.7.3-.7 0-1.5 0H180c-.7 0 0 0 0 0 0-.5.2-.9.2-1.3v-1.3c0-.5-.1-.9 0-1.3Zm43.3 23.7h-2.1c-.6 0-1-.2-1.2-.2-.3 0-.7.1-1.2.2h-1c0-.5.3-1 .3-1.5v-1.5c0-.5.3-1 .3-1.5v-1.5c0-.4 0-.9.1-1.5v-3c0-.5.1-1 .2-1.5v-5.1c0-.9-.2-1.1-.2-1.6v-3c0-.6.1-1.1 0-1.5 0-.7 0-1.2-.1-1.8v-1.8c-.1-.7-.4-1.2-.6-1.6-.3-.6-.8-.9-1.4-.9s-.8.2-1.2.6c-.3.2-.7.5-1 .9s-.5.9-.8 1.4c-.2.5-.3 1-.5 1.5s-.3 1-.5 1.5c0 .3-.1.8-.2 1.2 0 .4-.2.8-.2 1.2v6.4c0 .7-.1 1.1-.1 1.6s.1 1.1.1 1.6v3.2c0 .6.1 1.2.2 1.6v1.8c0 .4.2.8.3 1.1 0 .1 0 .3.2.3h.4c.5 0 .8.2 1 .5s.1.7.1 1.2-.2 1-.4 1.3c-.3.4-.6.6-1.1.6s-.4 0-.7-.1h-2.5c-.9 0-1.6.3-2.1.3v-1.5c0-.4.2-.9.3-1.5v-3c0-.5.2-1 .3-1.5v-4.5c0-.5.1-1 .1-1.5v-2.7c0-.6.2-.6.2-1.2V29c0-.5-.2-.9-.2-1.3 0-.5.2-.9.2-1.4s-.2-.9-.2-1.3v-6c0-.6-.3-1.1-.4-1.6v-3.2c.7-.2.7 0 1.4 0h1.4c.7 0 1 .2 1.4.5.3.3.4.8.4 1.4.4-.5.9-.9 1.3-1.2.5-.3 1-.5 1.6-.7.5-.2 1.1-.4 1.7-.4.5 0 1 0 1.5.2.5.1 1 .3 1.4.5.4.3.6.7.9 1s.6.7.8 1.1.4.9.6 1.4c.1.5.3 1 .4 1.5 0 .6.1 1.1.2 1.7 0 .6.1 1.2.1 1.8v6.6c0 .5-.2 1-.2 1.4 0 .5.1 1 .1 1.5v5.4c0 .6.1 1.2.1 1.8s-.1 1.1 0 1.7c0 .6.2 1.1.3 1.7 0 .6.1 1.1.2 1.7 0 .5-.1 1 0 1.3 0 .6.1 1 .2 1.3Z"/></svg>
      `
    };

 <!-- BEFORE -->
const sektion73Pins = [
      {
        id: "sektion73Pin_surbrunn_0000",
        label: "Boendet",
        iconKey: "home",
        ui: {
          bubbleBg: "rgba(255,255,255,.92)",
          pointerTop: "rgba(255,255,255,.92)"
        },
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
        iconKey: "food",
        ui: {
          bubbleBg: "#FCFBF8",
          pointerTop: "#FCFBF8"
        },
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

      // PER-PIN CSS vars (endast färger)
      const bubbleBg = (pin.ui && pin.ui.bubbleBg) ? String(pin.ui.bubbleBg) : "rgba(255,255,255,.92)";
      const pointerTop = (pin.ui && pin.ui.pointerTop) ? String(pin.ui.pointerTop) : bubbleBg;

      wrap.style.setProperty("--sektion73-pin-bubble-bg", bubbleBg);
      wrap.style.setProperty("--sektion73-pin-pointer-top", pointerTop);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sektion73PinBubble sektion73PinBtn";
      btn.setAttribute("aria-label", pin.label);

      const dot = document.createElement("span");
      dot.className = "sektion73PinDot";
      dot.setAttribute("aria-hidden", "true");

      const ico = document.createElement("span");
      ico.className = "sektion73PinIco";
      ico.setAttribute("aria-hidden", "true");
      ico.innerHTML = sektion73PinIcons[pin.iconKey] || sektion73PinIcons.home;

      btn.appendChild(dot);
      btn.appendChild(ico);

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

