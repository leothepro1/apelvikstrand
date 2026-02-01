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
  // 2) Sanatorievägen 4, 432 53 Varberg
    const sektion73Sanatorie_4 = {
      title: "Sanatorievägen 4",
      lngLat: [12.24786400, 57.08797000]
    };
const sektion73Tangkorar_4 = {
  title: "Tångkörarvägen 4",
  lngLat: [12.25870200, 57.08208910]
};
    // 3) Tångkörarvägen 2, 432 54 Varberg
    const sektion73Tangkorar_2 = {
      title: "Tångkörarvägen 2",
      lngLat: [12.25519800, 57.08474700]
    };

    // 4) Tångkörarvägen 10, 432 54 Varberg
    const sektion73Tangkorar_10 = {
      title: "Tångkörarvägen 10",
      lngLat: [12.26327010, 57.07738420]
    };

    // 5) Tångkörarvägen 17, 432 54 Varberg
    const sektion73Tangkorar_17 = {
      title: "Tångkörarvägen 17",
      lngLat: [12.26374100, 57.07980300]
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
    const sektion73Pitch = 65;

    // Visa "från havet in mot land" (väst -> öst):
    // bearing 90 = öst uppåt i bild (kameran tittar mot öst med pitch)
    const sektion73Bearing = 45;

    const sektion73DisableRotate = true;

    // Zoom vid pin-klick
    const sektion73PinZoom = 28.35;
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

#sektion73MapModal {
    position: fixed;
    right: 0;
    top: 0;
    height: 100dvh;
    width: min(520px, 92vw);
    background: var(--sektion73-modal-bg);
    color: var(--sektion73-modal-text);
    border: none;
    transform: translateX(104%);
    transition: transform var(--sektion73-modal-dur) var(--sektion73-modal-ease);
    z-index: 2147483001;
    display: flex;
    flex-direction: column;
    padding: 0px;
    gap: 0px;
    overscroll-behavior: contain;
    border-radius: 20px 0px 0px 20px;
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
.sektion73ModalClose {
    width: 40px;
    height: 40px;
    border-radius: 80px;
    border: none;
    background: #fff;
    cursor: pointer;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    position: absolute;
    top: 20px;
    right: 20px;
}
        .sektion73ModalClose svg{ width:18px; height:18px; }

        .sektion73ModalGallery{
          display:grid;
          gap:2px;
        }
.sektion73ModalGalleryTop {
    width: 100%;
    aspect-ratio: 1.67778 / 1;
    border-radius: 20px 0px 0px 0px;
    overflow: hidden;
    background: #f1f3f4;
    border: none;
}
        .sektion73ModalGalleryTop img{
          width:100%;
          height:100%;
          object-fit:cover;
          display:block;
        }
.sektion73ModalGalleryRow {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
}
        .sektion73ModalThumb{
          aspect-ratio: 1.67778 / 1;
          border-radius:0px;
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

.sektion73ModalMeta {
    display: flex;
    flex-direction: column;
    gap: 0px;
    padding: 32px 32px 0px;
}
        .sektion73ModalImgSrc{
          font:600 12px/1.2 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
          color:rgba(14,19,24,.55);
          margin:0;
        }
.sektion73ModalBodyH {
    font-family: "Manrope", Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    font-weight: 700;
    font-size: 28px;
}
.sektion73ModalBodyP {
    color: rgb(64, 61, 59);
    margin: 0;
    font-family: 'Inter Variablefont Opsz Wght';
    font-weight: 400;
    font-size: 15px;
    line-height: 1.55em;
    margin-top: 15px;
}

.sektion73ModalActions {
    margin-top: 27px;
    display: grid;
    gap: 10px;
    padding: 0px 32px;
}
.sektion73ModalBtn {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 11px 13px;
    border-radius: 8px;
    border: none;
    transition: 0.15s ease-in-out;
    cursor: pointer;
    font-family: "Manrope", Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    color: var(--sektion73-modal-text);
    font-size: 15px;
    font-weight: 700;
}
        .sektion73ModalBtnPrimary:{
          background:var(--sektion73-accent);
        }
             .sektion73ModalBtnPrimary:hover{
          background:#d89f00;
        }
                     .sektion73ModalBtnPrimary:active{
          background:#a67b02;
        }
                .sektion73ModalBtnSecondary:{
        background: #FFE6A3;
            color: #5A3C00;
        }
             .sektion73ModalBtnSecondary:hover{
          background:#FFD870;
        }
                     .sektion73ModalBtnSecondary:active{
          background:#FFD157;
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
  width:62px;
  height:auto;
  flex:0 0 62px;
  line-height:0;
}
        body.sektion73-modal-open {
          overflow: hidden;
          position: fixed;
          width: 100%;
          height: 100%;
          touch-action: none;
        }
.sektion73PinDot {
    width: 10px;
    height: 10px;
    border-radius: 999px;
    background: var(--sektion73-accent);
    display: none;
}
#sektion73MapCanvas .sektion73PinBubble .sektion73PinIco svg{
  width:62px;
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
    background: var(--sektion73-pin-bubble-bg, rgba(255, 255, 255, .92));
    height: max-content;
    padding: 11px 14px;
    border-radius: 8px;
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
            <div></div>
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

  document.body.classList.add('sektion73-modal-open');

  overlay.classList.add("is-open");
  modal.classList.add("is-open");
  sektion73ModalOpen = true;
}

function sektion73CloseModal() {
  const overlay = document.getElementById("sektion73MapOverlay");
  const modal = document.getElementById("sektion73MapModal");
  if (!overlay || !modal) return;

  document.body.classList.remove('sektion73-modal-open');

  overlay.classList.remove("is-open");
  modal.classList.remove("is-open");
  sektion73ModalOpen = false;

  sektion73IsZoomingToPin = false;
  sektion73PendingPinId = null;
  if (sektion73ActiveMoveEndHandler) {
    sektion73Map.off("moveend", sektion73ActiveMoveEndHandler);
    sektion73ActiveMoveEndHandler = null;
  }

  if (sektion73Map && typeof sektion73Map.easeTo === "function") {
    sektion73Map.easeTo({
      center: sektion73StartView.center,
      zoom: Math.min(sektion73StartView.zoom, sektion73MaxZoom),
      pitch: sektion73StartView.pitch,
      bearing: sektion73StartView.bearing,
      duration: sektion73PinZoomDur,
      easing: (t) => 1 - Math.pow(1 - t, 3)
    });
  }
}

    /* =========================
       PINS (2 st) – zoom först, modal efter "moveend"
       ========================= */

const sektion73PinIcons = {
      as: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2658.5 1367.2"><path d="M1104.1 1287.5c-137.3 0-270.5-16.1-396-47.7-121.3-30.6-230.3-74.5-324-130.4-94-56.1-167.9-121.6-219.7-194.6-53.9-76.1-81.2-157-81.2-240.5s27.3-164.4 81.2-240.5c51.7-73 125.6-138.5 219.7-194.6 93.7-55.9 202.7-99.8 324-130.5C833.5 77 966.8 61 1104.1 61s218.1 10.4 321.5 31c100.1 19.9 194.1 48.9 279.6 86.3 84.6 37 159 81.4 221.1 132 63.1 51.4 112.2 108.1 145.9 168.5l-16.6 9.3c-65.5-117.4-189.3-218.5-358-292.3-173-75.7-378.2-115.7-593.5-115.7-552.4 0-1001.9 266.6-1001.9 594.3s449.5 594.2 1001.9 594.2 644.4-98.3 831.4-263l12.6 14.3c-91.9 80.9-216.2 148.2-359.7 194.6-72.9 23.6-150.4 41.8-230.5 54.1-82.5 12.7-167.9 19.1-253.8 19.1Z"/><path d="M2244.5 856.6h14.9c12.3 0 19.8 7.3 19.8 18.5s-6.3 18.5-24.4 18.5-8.8 0-10.4-.2v-36.8c.1 0 0 0 0 0Zm38 84.8h16.7l-36.5-38.1c15.3-.9 28.5-11.4 28.5-28.5s-13.4-28.9-31.4-28.9h-27v95.5h11.9v-40.7zm-117.5 0h48.5v-11.3h-36.6v-31.3h36.6v-11.3h-36.6v-30.3h36.6v-11.3H2165zm-50.9 0h11.9v-84.2h23.4v-11.3h-58.7v11.3h23.4zm-84.4 0h48.5v-11.3h-36.6v-31.3h36.6v-11.3h-36.6v-30.3h36.6v-11.3h-48.5zm-34.3-54.5h-49V846h-11.8v95.5h11.8v-43.2h49v43.2h11.9V846h-11.9zm-94.6 32.9h-.2l-50.3-73.9h-11.1v95.5h11.9v-73.9h.2l50.3 73.9h11.1v-95.5h-11.9zM1772 941.4h48.5v-11.3h-36.6v-31.3h36.6v-11.3h-36.6v-30.3h36.6v-11.3H1772zm-66-41.3h34.3c-4 20-19.6 31.6-36.5 31.6s-37.1-15.7-37.1-38 17.5-37.9 37.1-37.9 18 3.5 25.5 10.7l7.5-9.1c-11.1-9.7-22.1-12.9-33-12.9-31.8 0-49.7 25.7-49.7 49.2s17.8 49.2 49.7 49.2 49.5-19.8 49.5-54.1H1706zm-90.4 8.6h-35.5l17.8-46.9zm12.6 32.7h12.9l-38.1-95.5h-10.4l-38.1 95.5h12.9l8.5-22.2h43.6zm-49.6-109.3c0 4.4 3.4 7.9 7.8 7.9s7.8-3.5 7.8-7.9-3.5-7.9-7.8-7.9-7.8 3.5-7.8 7.9m23 0c0 4.4 3.4 7.9 7.8 7.9s7.8-3.5 7.8-7.9-3.5-7.9-7.8-7.9-7.8 3.5-7.8 7.9m-100.7 109.3h44.7v-11.3h-32.9v-84.2h-11.9v95.5zm-75.8-31.4-15.3-22.2c8.4-5.3 14-11.9 14-21.9s-5.8-16.6-17.8-16.6-18.4 7.3-18.4 18.2 1.9 9.7 7.4 17.4c-16.1 8.7-25.7 17.4-25.7 32s10.3 25.5 25.1 25.5 18.1-5.1 28.4-15.7l10 14.7h14.4l-15.9-22.6 14.8-13.6-7.5-7.9zm-12.4-43.3c0 4-2.5 8.5-8.5 12.7-3.3-4.8-5.4-8.5-5.4-12.3 0-5.4 3.8-7.9 7.3-7.9s6.6 3.5 6.6 7.5m4.1 51c-8 8.1-15 13.4-21.9 13.4s-14.6-6.9-14.6-15 4.2-12.8 20.1-22.7zm-102.1-44.5c-1.3-19.4-13.4-28.8-29-28.8s-28.8 9.9-28.8 26.4 6.9 20.6 20.9 26.1l11.9 4.8c8.5 3.4 14.6 8.1 14.6 15.6s-7.4 15.1-17.7 15.1-18.4-7.3-19.4-17.8h-11.9c1.5 19.1 13.6 28.3 30.5 28.3s30.1-11.2 30.1-26.6-6.9-20.5-21.8-26.1l-11.9-4.5c-9.2-3.5-13.7-8.1-13.7-15.2s3.6-15.4 16.9-15.4 16.4 6.9 18 18.2h11.3Zm-150.4 33.6c0 20.6 15.3 36.2 36.5 36.2s37-15.6 37-36.2V846H1226v57.3c0 15.6-8.5 28.4-24.9 28.4s-24.9-12.8-24.9-28.4V846h-11.9zm-33.8-19.9h-49V846h-11.9v95.5h11.9v-43.2h49v43.2h11.9V846h-11.9zm-144 43.2v-72.9h15c20.5 0 36.5 15 36.5 35.4s-14.6 37.4-35.5 37.4h-16Zm-11.8 11.3h27.8c26.7 0 48-20.9 48-48.1s-22.1-47.4-45-47.4h-30.9v95.5Zm-33.8-21.6h-.2l-50.3-73.9h-11.1v95.5h11.9v-73.9h.2l50.3 73.9h11.1v-95.5h-11.9zm-102.1-11.1h-35.5l17.8-46.9zm12.6 32.7h12.9l-38.1-95.5h-10.4l-38.1 95.5h12.9l8.5-22.2h43.6zm-136.1-84.8h15c12.3 0 19.8 7.3 19.8 18.5s-6.3 18.5-24.4 18.5-8.8 0-10.4-.2zm37.9 84.8h16.7l-36.5-38.1c15.3-.9 28.5-11.4 28.5-28.5s-13.4-28.9-31.5-28.9h-27v95.5h11.9v-40.7zm-100.7 0h11.9v-84.2h23.4v-11.3h-58.7v11.3h23.4zm-36.2-68.2c-1.3-19.4-13.4-28.8-29-28.8s-28.8 9.9-28.8 26.4 6.9 20.6 20.9 26.1l11.9 4.8c8.5 3.4 14.6 8.1 14.6 15.6s-7.4 15.1-17.7 15.1-18.4-7.3-19.4-17.8H557c1.5 19.1 13.6 28.3 30.5 28.3s30.1-11.2 30.1-26.6-6.9-20.5-21.8-26.1l-11.9-4.5c-9.2-3.5-13.7-8.1-13.7-15.2s3.6-15.4 16.9-15.4 16.4 6.9 18 18.2h11.2ZM2555 600.3h-.8c-16.1-22.6-45.4-34.3-74.3-34.3-55.2 0-101.8 42.6-101.8 97.3s48.8 101.2 103.3 101.2 58.6-13.9 72.9-33.5h.8v29.1h33.8V483.4H2555zm0 65.3c0 37.9-31.6 68.5-70.2 68.5s-70.5-26.6-70.5-70.3 25.9-67.1 71.7-67.1 69 30.6 69 68.9m-235.7 94.7h33.8V637.6c0-51.4-37.5-71.4-75.5-71.4s-43.6 9.5-53.7 26.6h-.8v-22.2h-33.8v189.9h33.8V653.6c0-36 19.1-56.8 50.7-56.8s45.4 24.8 45.4 53.2v110.3zM2125.2 698c0 18.6-13.9 37.9-55.2 37.9s-55.2-19.3-55.2-37.9 13.9-37.9 55.2-37.9 55.2 19.3 55.2 37.9m-1.2-45.2c-18-15.7-39.8-21.5-60.5-21.5-54.4 0-84.9 30.6-84.9 65.2s37.5 68.1 85.2 68.1 45-7.3 62.3-24.8v20.4h31.6V630.6c0-45.2-43.6-64.5-90.5-64.5s-40.9 2.6-70.5 14.6l14.7 27.3c18.4-8.8 35.7-13.1 54-13.1 26.3 0 58.6 6.9 58.6 38.2zm-246.4 107.5h33.8V652.5c0-34.6 18.8-53.6 46.9-53.6s10.5.7 15.4 1.9v-34.6c-28.5 0-44.7 1.8-61.6 31.3h-.8v-27h-33.8v189.8Zm-108.9-189.8h-27.1v28.8h27.1v120.2c0 29.1 10.5 40.8 45 40.8s15.7 0 20.6-.4v-30.2H1819c-13.2 0-16.5-3.6-16.5-13.9V599.2h31.2v-28.8h-31.2v-45.9h-33.8zm-420 82.7V483.4h-33.8v276.9h33.8v-92.2l81.5 92.2h47.3l-92.3-102 90.5-87.8h-44.3zm-119.4-142.8c0 12.7 10.5 22.9 23.6 22.9s23.6-10.2 23.6-22.9-10.5-22.9-23.6-22.9-23.6 10.2-23.6 22.9m6.8 249.9h33.8V570.5h-33.8zm-124.7-43.7-61.9-146.1h-38.3l84.5 189.9h31.6l84.5-189.9h-38.3zm-163-233.2v220.1c0 39.7 20.6 56.8 51.8 56.8h13.9v-30.6H1004c-10.9 0-21.8-7.3-21.8-28.8V483.4zM760 651c3.4-25.9 23.3-54.3 64.6-54.3s61.2 22.9 64.6 54.3zm132.9 52.4c-17.3 19.7-38.7 30.6-62.7 30.6-37.9 0-65-23.6-70.2-56.1h167.5c0-67.1-42.1-111.9-102.5-111.9s-101 45.2-101 99.1 37.2 99.5 106.7 99.5 61.9-12.7 88.2-41.2zM497.2 840.5H531V731.2h.8c14.3 19.7 39.1 33.5 72.9 33.5 54.4 0 103.3-41.6 103.3-101.2s-46.6-97.3-101.8-97.3-58.2 11.6-74.3 34.3h-.9v-29.8h-33.8zm174.6-176.7c0 43.7-34.9 70.3-70.6 70.3S531 703.5 531 665.6s32.3-68.8 69.1-68.8 71.6 35.3 71.7 67m-268.9 1.4H294.8l54-135.9zm38.3 95.1h39.5L364.6 483.4H333L217 760.3h39.5l25.9-64.5h132.9z"/><path d="M1777.2 430.6c-51.2-101.6-353.8 25.7-282.5 134.3 24.2 32.5 62.6 45.7 98.5 64 36.1 17.4 76.1 30.6 100.7 63.2 50.6 74.4-103 111.3-155.3 112.6-12.9 3.3-92-5.1-52.4 7.7 60 15.9 131.8 13.9 185.2-17.1 79.3-38.1 107.4-132.3 18-178.4-45.4-30.2-117.8-43.5-157.9-84.5-20.5-25.6 4.9-57.8 29.5-72.4 39.3-25 85.6-35.9 132.2-38.2 36-.9 57.8 9.8 62.6 47.5 1.3 5.2 2.8 7.8 5.2 6.9 5-.2 14.9-22.6 18.4-37.5"/></svg>
      `,
      solviken: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 223.3 47.9"><defs><style>.st0{fill:#fff}</style></defs><path class="st0" d="M13.3 38.4c0 .7-.1 1.3-.2 1.9s-.2 1.3-.4 1.8-.6.9-.9 1.3c-.3.5-.5.9-.9 1.3-.3.4-.5.8-.9 1.1-.3.3-.7.6-1.1.9-.3.2-.8.3-1.1.5-.4.2-.7.5-1 .6 0 0-.1-.1-.2 0l-.2.2c-.4 0-.8-.3-1.2-.7s-.6-.7-.6-1.1.3-1 1-1.3c.4-.1.8-.4 1.2-.8.3-.3.7-.6 1-1.1.2-.4.4-.8.6-1.3.2-.4.2-.9.3-1.3 0-.4.2-.9.2-1.4s0-1.1-.2-1.6c0-.6-.3-1-.5-1.5s-.3-1-.6-1.5-.6-1-1-1.5c-.3-.4-.7-.9-1.1-1.4-.4-.4-.7-1-1.1-1.4s-.9-.8-1.3-1.2c-.4-.5-.6-1-1-1.5s-.9-.9-1.1-1.3-.4-.9-.6-1.4-.2-1-.3-1.5c0-.5-.3-1-.3-1.5s.1-1 .2-1.5c0-.5.3-.9.4-1.4.2-.5.3-1 .5-1.4s.6-.8.9-1.2.5-.8.9-1.1.8-.5 1.2-.7.9-.2 1.4-.3c.4 0 .9-.2 1.4-.2h1.5q.9 0 1.5.3c.5.2.9.5 1.3.9.3.4.6.8.8 1.3.2.4.2 1 .3 1.5v1.5c0 .5 0 .8-.1 1.2v1.3c0 .4-.4.7-.7.9-.4.2-.7.5-1.1.5s-.9-.1-1.2-.3-.5-.6-.5-1.1c0-.6-.2-1.2-.3-1.7-.1-.7-.1-1.3-.3-1.7-.3-.7-.8-1.1-1.5-1.1s-1.1.5-1.5 1.1c-.2.3-.4.8-.5 1.4 0 .4-.2.9-.2 1.4s.2 1.2.3 1.8c.2.6.3 1.2.6 1.7.2.4.6.8.9 1.2s.6.7 1 1.1c.3.3.5.9.8 1.2.6.7 1.2 1 1.5 1.3s.6 1 .9 1.4c.3.5.6.9.9 1.4s.7.9.9 1.4.3 1 .4 1.5.4 1 .5 1.5v1.6Zm31.9-7.7c0-.5-.1-1-.1-1.5V26c0-.5-.3-1-.4-1.5 0-.5 0-1-.2-1.4-.1-.5-.2-1-.3-1.4-.1-.5-.5-.9-.6-1.3-.2-.5-.2-1-.4-1.4-.2-.5-.6-.9-.9-1.3-.3-.5-.4-1-.8-1.4-.3-.4-.7-.8-1.1-1.1-.3-.3-.7-.6-1.1-.8s-.8-.5-1.2-.6-.9 0-1.3 0h-1.3c-.4.1-.8.4-1.2.6s-.7.5-1.1.8-.8.7-1.1 1.2c-.3.4-.5.9-.8 1.4-.2.4-.4 1-.6 1.5-.2.4-.4.9-.5 1.3-.2.4-.5.8-.6 1.3s-.2.9-.3 1.4-.1 1-.2 1.4c0 .5-.2 1-.3 1.5 0 .5-.2 1-.2 1.5s-.2 1-.2 1.5.1 1 .1 1.5v4.8c0 .5.3 1 .4 1.5 0 .5 0 1 .2 1.4.1.5.2.9.4 1.4.1.5.2.9.4 1.4s.4.9.6 1.3l.6 1.5c.3.5.6.8.9 1.3.3.4.6.9.9 1.3.3.3.8.4 1.2.7.4.2.8.4 1.2.5s.8.4 1.3.4.9-.1 1.3-.2.8-.4 1.2-.6.7-.5 1-.8c.4-.4.9-.6 1.2-1.1.3-.4.6-.9.8-1.4.2-.4.5-.9.7-1.4.2-.4.3-.9.5-1.4s.4-.9.5-1.3c.1-.5.2-.9.3-1.4s.2-.9.3-1.4c0-.5.3-1 .4-1.5 0-.5.2-1 .2-1.5v-1.6c0-.5.1-1 .1-1.5Zm-5 6.3c0 .5-.1.9-.2 1.4 0 .5 0 .9-.2 1.4-.1.6-.3 1.1-.5 1.6-.2.6-.4 1.1-.7 1.5-.2.4-.5.7-.8.9s-.7.2-1.2.2c-.8 0-1.3-.4-1.8-1.1-.3-.4-.6-.9-.8-1.4s-.3-1-.4-1.6c0-.5-.1-.9-.2-1.4 0-.5-.2-.9-.3-1.4 0-.5-.2-.9-.2-1.4v-1.6c0-.5.2-1.1.2-1.6v-3.2c0-.6 0-1.1.1-1.6 0-.6 0-1.1.1-1.6 0-.5.1-.9.2-1.4v-1.4c0-.5.2-.9.2-1.4.1-.6.3-1.1.5-1.6.2-.6.5-1 .8-1.4.2-.4.4-.7.7-.9s.7-.2 1.1-.2.8 0 1.1.3c.3.2.5.5.8.8.3.4.6.9.8 1.4s.3 1 .4 1.6c0 .4.3.9.3 1.3v1.4c0 .4.3.9.3 1.4s0 1.1.1 1.6c0 .5-.2 1.1-.2 1.6V34c0 .6-.2 1.1-.3 1.6s0 .9 0 1.4Zm22.7-19.5v-2.2zm.1 4.4v-3.3zm3.4 3.1v.9-1Zm.3 14.9V39v.8ZM66.9.7v1.8zm0-.2v.1h.2s-.2-.2-.2-.1m.4 47.1h-5.4q-.6 0-.9-.6c-.2-.4-.2-.9-.2-1.5s.1-.8.3-1.2.4-.4.7-.4.2-.2.4-.2.3.2.3.2v-.1c0-.4.1-.8.2-1.4V41c0-.5.3-.9.3-1.4s-.2-1-.2-1.5.1-.9.1-1.4v-1.5c0-.5.1-1 .1-1.5s-.2-1-.2-1.5.1-1 .1-1.5v-3c0-.7-.1-.7-.1-1.5v-3c0-.5 0-.7.2-.9v-7.1c0-.6-.3-1.1-.3-1.6v-3.1c0-.5 0-.9-.1-1.4V4.9c0-.2-.1 0-.2 0h-1c-.4 0-.6-.3-.8-.6s0-.8 0-1.3 0-1 .3-1.4c.2-.4.4-.5.7-.5s.5-.1.9 0c.6 0 1.1-.1 1.4-.1h1.4c.7 0 1.3.1 1.8.2v1.9c0 .4.1.8.1 1.2v1.6c0 .5-.1 1.1-.1 1.6v3.2c0 .5-.2 1.1-.2 1.6v4.2c0 .5-.1 1-.1 1.4 0 .5-.2 1-.2 1.4v1.4c0 .8.1.8.1 1.7v1.7c0 .9-.2.8-.3 1.3s0 .2 0 .4V32c0 .5.3 1 .3 1.5s-.3 1-.3 1.5v.2c0 .5.3.9.3 1.3v1.6c0 .4 0 .8-.1 1.2v.9c0 .4.2.8.2 1.1 0 .5.2 1.1.3 1.6v1.6c0 .5.1 1.1.1 1.6v1.7Z"/><path class="st0" d="M61.4.6c-.3 0-.5.2-.7.5-.2.4-.3.8-.3 1.4 0-.6 0-1 .2-1.4s.4-.5.8-.5m1.6 18v-1zm41.9-2.8c0 .7-.2 1.1-.6 1.4s-.8.5-1.4.6c0 0-.2 0-.3.1h-.3v-.1c-.2.5-.3 1-.4 1.5s-.3 1-.4 1.5-.2 1-.4 1.5c-.1.5-.2 1-.4 1.5-.1.5-.3 1-.5 1.5-.1.5-.3 1-.5 1.5-.1.5-.1 1-.3 1.5-.1.5-.4 1-.5 1.5l-.3 1.5c-.2.8-.3 1.5-.4 1.9-.1.5-.3 1-.5 1.6-.1.5 0 1.1-.2 1.6-.1.5-.3 1.1-.4 1.6s-.4 1-.5 1.5-.1 1.1-.2 1.6-.3 1.1-.4 1.6c-.1.6 0 1.1-.1 1.6-.1.6-.3 1.1-.4 1.6-.2.4-.5.7-.8 1s-.6.4-1 .4c-.9 0-.9.1-1.7.1s-.9.2-1.7 0c-.1-.6-.3-1.1-.4-1.6-.1-.6-.3-1.1-.4-1.6-.1-.6-.2-1.1-.3-1.6s-.1-1-.2-1.5-.3-1-.4-1.5l-.6-3c-.1-.5 0-1-.2-1.5-.1-.5-.4-1-.5-1.4-.1-.5 0-1-.2-1.5-.1-.5-.4-1-.5-1.4l-.3-1.5c-.1-.5-.1-1-.2-1.5s-.4-1-.5-1.4c-.1-.5-.1-1.1-.3-1.6-.1-.5-.3-1.1-.5-1.6-.1-.5-.3-1-.5-1.6-.2-.5-.2-1.1-.3-1.6-.2-.5-.4-1-.5-1.5s-.4-1-.6-1.5l-.6-1.5c-.2-.5-.3-1.1-.5-1.6h3c.9 0 1.5.2 1.8.2h3.1c.4 0 .7.2 1 .6s.6.8.6 1.3-.1 1.1-.5 1.5c-.3.4-.7.6-1.1.6s-.7-.3-1.2-.6c-.2-.1-.3-.2-.3-.2 0 .5 0 1 .1 1.5 0 .5.3 1 .4 1.4v1.5c0 .5.1 1 .2 1.5 0 .5.3.9.4 1.4 0 .5.2 1 .3 1.5 0 .5 0 1 .1 1.5s.3 1 .5 1.5c.1.5.3 1 .4 1.5s.1 1 .2 1.5.4 1 .5 1.5.2 1 .4 1.5l.3 1.5c.1.5.3 1 .4 1.5s.3.9.4 1.4c.1-.5.4-.9.5-1.3l.3-1.5.3-1.5c.1-.5 1.5-6.9 1.6-7.4s.1-1 .2-1.5c0-.5.3-1 .4-1.5 0-.5.1-1 .2-1.5s.3-1 .4-1.5c0-.5 0-1 .2-1.5 0-.5.2-1 .2-1.5s.4-1 .5-1.5h-.1l-.1.2q-.45.6-.9.6c-.5 0-.8-.3-1.1-.6-.2-.4-.3-.8-.3-1.3s.1-1 .4-1.4.6-.7 1.1-.7h1.8c.8 0 1.3.2 1.7.2h1.8c.7 0 1.2-.3 1.7-.3.4 0 .6.3 1 .7.3.4.5.7.5 1.2Zm21 28.2v.7zm-.4-13.1v.4-.7zm-2.8-8.7V22zv.6zm2.9-16h-.2c.3 0 .6-.2.9-.3-.2 0-.4.2-.7.2Zm2.5-4.3c-.2-.3-.4-.6-.7-.9s-.6-.5-1-.7q-.6-.3-1.2-.3h-2.4c-.6 0-.8 0-1.2.2-.3.2-.7.5-1 .7-.3.3-.6.6-.8 1q-.3.6-.3 1.2c0 .6.2 1 .4 1.4s.4.9.8 1.2 1 .3 1.5.4 1 .5 1.5.5 1-.3 1.4-.5h.2c.2 0 .5-.1.7-.2h.1c.2 0 .4-.2.7-.4.4-.3 1-.5 1.2-1 .2-.4.2-1 .2-1.5s-.2-.8-.3-1.1Zm-7.2-.8c.1-.1.3-.3.5-.4-.2.1-.3.2-.5.4l-.3.3s.1-.2.2-.3Zm5.2 44.7c0 .5.2 1.1.2 1.6h-4.4V46c0-.4.2-.9.2-1.4v-1.4c0-.5.2-.9.3-1.3v-2.8c0-.5.3-1 .4-1.5 0-.5-.1-1-.1-1.5v-3c0-.5.1-1 .1-1.5v-3.4c0-.5-.1-1-.1-1.5s0-1-.1-1.5c0-.5.3-1 .3-1.5V22c0-.5-.3-.9-.4-1.2v-1.4c0-.7.2-1.3.1-1.5-.1 0-.5.1-.7 0-.2 0-.4-.2-.5-.2-.6-.2-1-.7-1-1.7s.1-1.1.3-1.5.6-.6.9-.6h5c0 .6-.1 1.1-.2 1.6 0 .5-.2 1.1-.2 1.6s-.1 2.7-.1 3.2c0 .6-.1 1.1-.1 1.6s.2 1 .2 1.5-.2 1-.2 1.5 0 1-.1 1.5c0 .5.2 1 .2 1.5v1.5c0 .5-.2.7-.3 1.2v.7c0 .4.1.5.1 1.2v1.4c0 .5-.2.9-.2 1.4s.2.9.2 1.4v2.8c0 .5.1 1.1.1 1.6s.2 1 .2 1.6c0 .5-.2.9-.2 1.4v.7c0 .4.2.7.2 1.1Zm19.1-16.5v.2zm.1-24.4v.4-1.8zm3.4 20.2v.9-1Zm5.4 20.4c-.1-.5-.3-.9-.5-1.4 0 .1 0 .2.1.4.1.4.2.7.3 1.1Zm1-8.4s0-.2-.1-.2c0-.2-.1-.4-.2-.6.1.3.2.5.3.8"/><path class="st0" d="M160.8 47.3c-.3 0-.9.1-1.6.2-.9.1-1.5.2-2 .2-.7 0-1.3-.2-1.8-.5-.5-.2-.8-.6-1.1-1.2s0-.3-.1-.4c-.1-.4-.2-.7-.3-1.1 0-.1 0-.2-.1-.4-.2-.4-.3-.7-.5-1.1-.2-.5-.5-.9-.7-1.5-.2-.5-.3-1-.4-1.5-.2-.5-.5-.9-.7-1.5-.2-.5-.1-1.1-.3-1.6s-.6-.9-.8-1.4l-.6-1.5c-.2-.5-.2-1-.4-1.5-.2.3-.2.7-.3 1.5 0 .4-.2.9-.2 1.4v2.9c0 .5-.2.9-.2 1.4s.2.9.2 1.4v3.1c0 .6.3 1.1.4 1.6v1.7h-1.7c-.2 0-.6.1-1.1.2h-2.3c0-.5.1-1.1.2-1.6 0-.5 0-1.1.1-1.7V41c0-.5.2-1.1.2-1.7v-8c0-.5.2-1 .2-1.5 0-.6-.3-1.1-.3-1.6 0-.8.1-.8.1-1.5s.2-.8.2-1.4c0-.8-.2-.8-.2-1.6s.1-.8.1-1.5v-1.5c0-.7.1-.8.1-1.5s-.3-1-.3-1.6v-3.2c0-.6.2-1.1.2-1.6v-1.6c0-.8.1-1.3.1-1.6 0-.5-.2-1-.3-1.4 0-.5.2-1 .2-1.5V2.4c0-.5-.2-1.1-.2-1.6.5-.2.7.2 1.2.2h1.2c.7 0 1.2.1 1.5.6s.5 1.1.5 1.8-.3 1.1-.4 1.6c0 .6.2 1.1.1 1.6v3.2c0 .6-.2 1.1-.2 1.6v6.7c0 .3-.2.7-.2 1v2.5c0 .3.2.6.2.9v1.7c0 .9-.2.8-.3 1.3v1c0 .3.1.5.3 1.1.4-.4.6-.9 1.1-1.4.4-.4.7-1 1.2-1.5.4-.4.8-.8 1.1-1.2.4-.5.8-.9 1.1-1.3.2-.3.4-.7.7-1.1.2-.3.5-.7.7-1.1s.4-.7.7-1.1c.5-.9 1.2-1.3 1.8-1.3s1 .1 1.3.5c.4.4.5 1 .5 1.4s-.3.5-.5.8c-.2.2-.5.7-.9 1.2-.2.3-.4.7-.7 1.1-.2.3-.5.7-.8 1.1-.3.5-.5.9-.8 1.3-.3.5-.5.9-.8 1.3-.3.5-.7.8-1 1.1-.7.9-1.2 1.4-1.6 1.5.1.5.5.9.7 1.4s0 1 .2 1.5.5.9.7 1.3c.2.5.2 1 .4 1.4.2.5.2 1 .4 1.4 0 .2.2.5.2.7v.1c0 .2.1.4.2.6 0 0 0 .2.1.2.2.3.6.6.7 1 .2.5.3 1 .5 1.4s.4.9.7 1.3c.2.4.5.8.8 1.3.2.4.5.8.8 1.3.2.4.2 1 .5 1.4s.7.8.9 1.2c.3.4.6.9.8 1.3Zm29.5-8.9c-.3-.3-.7-.5-1.2-.5s-1 0-1.3.4c-.2.4-.4 1-.5 1.8 0 .5 0 1-.2 1.5s-.6.8-.8 1.2c-.3.4-.6.8-1.2.9-.4.1-1 .1-1.5.1s-1.4-.1-1.9-.4c-.6-.3-1.1-.8-1.3-1.4-.1-.4 0-.9 0-1.4 0-.4-.1-.9-.2-1.4 0-.4-.2-.9-.2-1.4V35c0-.5-.2-1.2-.2-1.7v-1.8c.7-.3.8.1 1.6.1s.8-.2 1.6-.2h4.7c.8 0 .8.2 1.6.2s.8 0 1.5-.2V30c0-.5-.1-1-.1-1.5V27c0-.5 0-1-.1-1.5 0-.5 0-1-.1-1.5 0-.5-.4-1-.4-1.4 0-.5 0-1-.2-1.5-.1-.5-.3-1-.4-1.4-.2-.5-.2-1-.4-1.4-.2-.5-.5-.9-.8-1.3-.3-.5-.4-1-.7-1.4s-.7-.9-1.1-1.2-1-.3-1.5-.5c-.5-.1-1-.4-1.5-.4v.1c-.5 0-1-.1-1.4 0-.5.1-.9.3-1.3.5s-.7.6-1.1.9-.9.6-1.2 1-.6.8-.8 1.3c-.2.4-.6.8-.8 1.3-.2.4-.3.9-.4 1.3-.2.4-.2.9-.4 1.3-.1.4 0 .9-.2 1.4 0 .5-.4.9-.5 1.3s-.2 1.1-.2 1.6 0 1.1-.1 1.6v9.2c0 .5 0 1 .1 1.5v1.7c0 .6.3 1.1.4 1.7s.4 1.1.6 1.6.2 1 .5 1.4c.2.4.7.7 1 1s.6.7 1 1 .9.7 1.4.9 1.1.1 1.6.2 1 .2 1.6.2h1.4c.5 0 .9-.1 1.4-.2.5 0 .9-.4 1.3-.5.5-.2.9-.3 1.2-.6.5-.4 1-.7 1.3-1.3.2-.5.4-1.1.5-1.7.1-.5 0-1.1.1-1.8 0-.5.3-1.2.3-2.1s-.3-.7-.7-1.1ZM180 23.7c0-.6.3-1.1.4-1.6 0-.6.1-1.1.3-1.6.1-.4.4-.8.5-1.1.2-.4.4-.8.6-1.1.5-.6 1-.9 1.8-.9s1.2.2 1.6.7c.3.4.2 1 .4 1.7 0 .4.1 1 .2 1.5 0 .5.1 1 .1 1.5v3.1c0 .5.1 1 .1 1.5-.7.3-.7 0-1.5 0H180c-.7 0 0 0 0 0 0-.5.2-.9.2-1.3v-1.3c0-.5-.1-.9 0-1.3Zm43.3 23.7h-2.1c-.6 0-1-.2-1.2-.2-.3 0-.7.1-1.2.2h-1c0-.5.3-1 .3-1.5v-1.5c0-.5.3-1 .3-1.5v-1.5c0-.4 0-.9.1-1.5v-3c0-.5.1-1 .2-1.5v-5.1c0-.9-.2-1.1-.2-1.6v-3c0-.6.1-1.1 0-1.5 0-.7 0-1.2-.1-1.8v-1.8c-.1-.7-.4-1.2-.6-1.6-.3-.6-.8-.9-1.4-.9s-.8.2-1.2.6c-.3.2-.7.5-1 .9s-.5.9-.8 1.4c-.2.5-.3 1-.5 1.5s-.3 1-.5 1.5c0 .3-.1.8-.2 1.2 0 .4-.2.8-.2 1.2v6.4c0 .7-.1 1.1-.1 1.6s.1 1.1.1 1.6v3.2c0 .6.1 1.2.2 1.6v1.8c0 .4.2.8.3 1.1 0 .1 0 .3.2.3h.4c.5 0 .8.2 1 .5s.1.7.1 1.2-.2 1-.4 1.3c-.3.4-.6.6-1.1.6s-.4 0-.7-.1h-2.5c-.9 0-1.6.3-2.1.3v-1.5c0-.4.2-.9.3-1.5v-3c0-.5.2-1 .3-1.5v-4.5c0-.5.1-1 .1-1.5v-2.7c0-.6.2-.6.2-1.2V29c0-.5-.2-.9-.2-1.3 0-.5.2-.9.2-1.4s-.2-.9-.2-1.3v-6c0-.6-.3-1.1-.4-1.6v-3.2c.7-.2.7 0 1.4 0h1.4c.7 0 1 .2 1.4.5.3.3.4.8.4 1.4.4-.5.9-.9 1.3-1.2.5-.3 1-.5 1.6-.7.5-.2 1.1-.4 1.7-.4.5 0 1 0 1.5.2.5.1 1 .3 1.4.5.4.3.6.7.9 1s.6.7.8 1.1.4.9.6 1.4c.1.5.3 1 .4 1.5 0 .6.1 1.1.2 1.7 0 .6.1 1.2.1 1.8v6.6c0 .5-.2 1-.2 1.4 0 .5.1 1 .1 1.5v5.4c0 .6.1 1.2.1 1.8s-.1 1.1 0 1.7c0 .6.2 1.1.3 1.7 0 .6.1 1.1.2 1.7 0 .5-.1 1 0 1.3 0 .6.1 1 .2 1.3Z"/></svg>      `,
      olles: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 147.7 59.5"><defs><style>.st0{fill:#fcfcfb}.st1{fill:#e64c14}.st2{fill:#1f202a}</style></defs><path class="st1" d="M0 7.9h23.8v42.3H0z"/><path class="st2" d="M112.6 0H146v59.5h-33.4z"/><path class="st0" d="M123.4 38.8v2.4z"/><path class="st1" d="M113.5 59.5h34.2V0h-34.2zm9.1-1.7c0-.6.6-.6 1-.2-.2.4-.6.6-1 .2m1 .5c0-.4.4-.6 1-.5.1.8-.6.9-1 .5m1-.7v-.5h1c.2.7-.5.4-1 .5m1.2 1.2h-.5v-.5h.5zm2.9-1c-.3-.8.8-.2.5-1 .3 0 .2.6.2 1zm1.7-.2c-.3 1.1-1-1.1 0-.7 0 .4-.4.6 0 .7m2.6.7h-.5v-.5h.5zm1-3.1c.8-.3.6.4 1 .5-.5.3-.7 1.1-1.5 1.2.2-.8 1-.8.5-1.7m0 2.9c.2-.2.5-.3 1-.2-.3.3-.3.6.2.7-.2.5-1.4.1-1.2-.5m1.5-1.5c1.2-.1 0 .9 1 .7-.3.6-1.3 0-1-.7m1.2-8.2c-.6.5-.6-.1 0-.2.2-1.1 1.1-1.5 1.2-2.7.6 1-1 1.9-1.2 2.9m5.1-15.8c.3-.4 0 .7.2 1.5-.5-.2-.7-1.1-.2-1.5m1.4 1.7c-.8 0-1.1-.6-1-1.5.7-.3.9 1.2 1.2.5.7.2-.6.4-.2 1m-6.3-20.6c0 .8.8.8 1 1.5s-.3.6-.2 1.2c.6 1.5 1.7 2.5 2.9 3.4.3 1.6 1.3 3.3 1.7 5.3.3 1.7-.3 3.9 1.2 4.8-.6 1-1.2.8-2.2 1.2-1.1-5.1-2.2-10.3-5.1-13.6-1.3 1.2-1.5 3.5-1.9 5.6-1.3 5.5-2.3 13.6-.7 20.4-.8 0-.8-.8-1.7-.7 0 1 1.3.9 1.9 1.5.3 1.7.8 3.2 1.7 4.4-1.1 1.7-2.3 3.3-2.7 5.8 0 1 .8-.2 1 .5 0 1.1-.7-.1-1 .5.8.5.6.6.5 1.7-.3-.5-1.1-.6-1.2-1.2-.6 0 .1 1.1-.7.7.3.3.9.4 1.2.7 0 .5-.7.3-.5 1-.8.6-1.2-.7-1.2.2-.9.2 0-.9 0-1.2-.4-1.9.6-4.4.2-7 .5-.1.7-.6 1.5-.5.5-1.4 0-3.7 1-4.6-.5-.7-1.5-1-2.2-1.5.5-1.9.8-4.4-.7-5.3-.9 1.7-1.6 3.2-1.2 5.6-4.4.9 1.2 8.3-2.4 10.4 0 1.7.9 2.3.7 4.1-.7-.2-.5.5-.7.7-.8-4.7-3.3-8.9-2.7-14.3 0-.6-.5-.6-1-.7v-.9c-.2 0-.4-.2-.5-.3 0-1 .3-2.5-.5-2.9l.2-.5c.8-2.8-.5-7.7.9-9.8.5-2.6 1.6-5.2 1.2-7.7-.3-1.8-1.5-2.8-2.4-4.6-1.3 2.9-2 6-3.2 9.7-.5 1.7-1.6 3-1.5 5.1 0 1.2.8 2.8 0 4.6-.9.2-.9-.5-1.7-.5-.6-2.4.2-5.9.7-9.5.2-1.1.2-2.3.5-3.4.2-.5.8-1.1 1-1.7.6-2.4.5-4.2 1-6.8.7-3.4 3.4-4.6 6.3-5.8-.5-3.1-2.1-6 0-8.7 3.6-1.2 5.2 1.3 5.1 4.6-.9-.3-.9-1.6-1.2-2.4-.7.2-.7.2-1.5 0 .3.3.2.5-.2.5-.3 1.5 1.7.8 1.7 1.9-.4.2-.7.9-1.7.2v1c.4.9.4-.7 1.2-.2.7.6.2.9.2 1.9-.7 0-1-.4-1.7-.5.6.8.6 1 1 2.4 2.1 1.1 5.3 3.2 5.6 6.3 1 0 .8-1.2 1.2-1.7-.6-1.6-3.8-2.8-1.7-4.8 1.4.8 2.2 2.3 2.9 3.9.7-.5 1-1.6 1.2-2.7-.7-.9-2.2-2.2-1-3.6.9.1.6 1.5 1.9 1.2 2-1.4 2.6-4.3 5.3-5.1-3.4 2.3-5.2 6.3-7 10.2Zm2.9 3.6c-.6-.5-1-1.1-1.2-1.9.6.5 1 1.1 1.2 1.9m-4.6 29.9c-.9-1.3-1.7-4.4-1.7-7.8.5 2.7.9 5.4 1.7 7.8"/><path class="st0" d="M60.1 49.3v-.1zm0 .8h.1Zm.3-2.7v-.1Zm-.3.5.1.1h.1-.1Zm3.9-.3v.1Zm-.4 1.7s0 .2.1.1Zm-2.7.2"/><path class="st2" d="M61.1 48.7H61v-.4c0 .3 0 .6-.2.9v.4h.4v.2h.2v-.4.1h.2Zm-.1.1"/><path class="st0" d="M60.4 49.3h-.1zm-2.5-2.4h-.1zm0 2.6h.1Zm1.9.6V50h.1Zm0 .3h.1zm4.3-2.6v-.1.2Zm3.8 1.5v.1Zm-.2-.2h.1Zm-1.3-1.6v-.1Zm-2.3 2.6V50Zm2-2.1v.1Zm0-.3v.1Zm4.4 1.8"/><path class="st2" d="M69.8 47.4h.1v.2c-.2 0-.4.3-.3.6 0 0 0 .2 0 0v1.4c0 .2 0 .3.3.4 0 0 0-.1 0 0v-2.1c0-.2 0-.3-.2-.4Zm-.3 2v.2-.4s0 .1 0 0zv.3Z"/><path class="st0" d="M68 49.6h-.1s.1 0 0 0Zm.5-2v-.1zm-4.9.5V48Zm-.9-.4h-.1Zm0-.8h.1zm-.3.3v-.1Zm1-.1h-.1Zm-.6 1"/><path class="st2" d="M63.5 48.3v-.2c0-.3-.2-.5-.4-.5h-.2v.5h.4s.2 0 .2-.1Zm-.6.1"/><path class="st0" d="M62.5 47.5s-.1-.1 0-.2v.1h.1s0 .1.1.1Zm1 1.8s.1 0 0 0m0 .5.1-.1Zm-.7-.7h.1Zm-.1-.4v.2Zm.1-.1h-.1Zm0-1h-.2zm-.1 1.3v-.1zM45.5 48h-.1zm.1 1.1s0 .1 0 0m-.1.2h.1Zm0-.2v.1zm.7-2s.1 0 0 0h.2-.3Zm-.7.9h-.2Zm.5.8v-.2.1Zm-.3-.3h-.1Zm2.5 1.4v.1ZM58.6 39v.2h-.1c0 .1.2 0 .3 0-.1 0 0-.3-.2-.2m-9.9 7.9v-.1ZM46 48.6c0-.1 0-.1-.2-.2 0 0 .1-.1.2 0Zm2.1 1.2"/><path class="st2" d="M44.3 49.4h-.2.1s-.1 0 0 0zs-.1 0 0 0v-.2h-.1v-.1c0-.4 0-.7-.2-1 0 0 0-.1-.2-.1v-.1h-.2v.2h.1v1.3h-.1.1v.5s0-.3.1-.3h.1c.3 0 .5-.3.5-.6h.2Zm-.9.8"/><path class="st0" d="M40.2 41.9s.1.1.3.1c0-.3.1-.3.2-.6-.3 0-.4.3-.4.5Zm0-19.2s0-.1-.1-.1v.3c.2 0 .4 0 .5-.2-.1-.1-.2 0-.3 0Zm.4 19.3c0-.2.3-.4.4-.6-.1.1-.5.5-.4.6m-1.1-18.3c.2 0 .2-.1.4 0 0-.3-.4-.2-.4 0m1.6 17.2c-.3 0-.3.1-.3.3h.2c0-.2.1-.2 0-.4Zm-.9.7c-.1.1-.6.3-.5.5.1-.2.2.4.5 0-.3-.1-.1-.4 0-.5m2.2-3.1c0-.2 0-.3-.2-.4v-.3c.2 0 .3-.2.6-.3 0-.5.2-.7.5-1.2 0-.1 0-.4-.2-.4 0 .3-.4.5-.1.8 0 .1-.4 0-.4.1.1.1-.1.7-.2.7s.1-.5 0-.2c-.3.3-.3.6-.3 1-.3 0-.2 0-.4.1 0 .3-.2.3-.2.6.2.1.2.7 0 .7s.1-.3-.1-.3c-.2.5-.2.9-.4 1.3.2 0 .4 0 .6.1 0 0-.1.1-.1.2h.3c-.1-.2.5-.8 0-.9 0 .1 0 .5-.2.5-.1-.3 0-.8.3-.8 0-.2 0-.5.2-.4.1 0-.1.2 0 .3 0-.4.3-.8.6-.9-.1-.3.1-.4 0-.7 0 .1 0 .3-.3.2Zm-.7.8c0-.2.3-.5.5-.3-.1.1-.2.3-.5.3m.1-.4c-.2 0-.1-.3 0-.4.3.2.2 0 .5 0 0 .5-.4.2-.4.4Zm2.9 9.8"/><path class="st0" d="M42.4 38.1c.3 0 .3-.5.5-.1 0-.2 0-.3.1-.6-.2.2-.5.4-.7.7Zm-2.5-14.9c.4 0 0-.5 0-.1zm-2.7 17 .1-.1s-.1 0-.1.1m-.1-1.2c0 .1-.1.1 0 .3.1 0 .3-.4 0-.3"/><path class="st2" d="M38.7 21.2c-.1-1.5-.5-2.3-1.6-3-.2 0-.4 0-.4-.2.5-.2.5.1.9.2.2-.2-.1-.4-.3-.5 0 0 0 .3-.2.3 0-.3.1-.4.1-.6-.2 0-.4 0-.6.1v.4c-.2-.2-.1.2-.3.1v-.4c.2 0 .1.1.2 0v-.3c-.2 0-.6.2-.5.3h.1c0 .2-.1.3-.2.4 0 0-.3 0-.3-.2 0-.3.1-.3.1-.4-.3 0-.5.3-.7.4 0 .1.3 0 .3.2-.6.3-.6-.3-.4-.7 0 0 .4.1.4 0-.3-.2 0-.5 0-.7-.2 0-.1.1-.3.1 0-.1 0-.3-.2-.4-.1.3 0 .4.1.6h-.4v-.3h-.3c-.1.4 0 1 0 1.4-1.9.6-3.1 2.4-2.5 4.5v-.1c-.1.4 0 .5 0 .9-.2-.1-.2 1.3 0 .7-.2.8 0 1.2-.2 1.8h.2c-.3 1.8.1 3.1-.1 4.9-.1 0-.3-.4-.3 0 .1 0 .3.4 0 .4-.2 0 .2-.3-.1-.2 0 .2-.2.3 0 .4 0-.4 0 .4.1.1 0-.3.1-.3.3-.5 0 .5-.3.8-.1 1 0 0 0-.1.1-.1-.1.4 0 .7 0 1.1-.3-.1-.3.4-.5.5.3-.1.3 0 .5 0-.3.4.3 1.6-.8 1.4 0 .1-.1.3 0 .3.1-.3.4-.1.7-.2-.2.5 0 1.3-.1 1.7h.1c-.2 1.4.8 2.6 2 2.9 0 .2-.2.3-.1.5-.1-.2-.3.6-.1.6 0-.2 0 0 .3-.1 0 .2 0 .5-.1.8h.5c0-.3 0-.9.2-.6.1-.5-.4-.5-.6-.7.3-.1.2-.4.4-.6h.5c0 .2-.1.4 0 .6.3 0 .1.2.3.2 0-.2.1-.2.1-.4-.2 0-.1-.1-.2-.2h.7c.2 0 .3.3.3.5.1-.2.1.1.2.1v-.4s0 .1-.1.1c0-.3-.2-.2-.1-.5q.2.2.4 0c.1.1 0 .2 0 .4h.3c-.2 0-.3-.6.2-.6 0 0-.1.1 0 .2 0-.1 0 0 .1 0 .2-.2-.2-.2 0-.4.1 0 0 .2.2.2.1 0 0-.4.2-.4 0 .1-.1.4 0 .4 0-.2-.1-.5.2-.5 0 .2-.1.2-.1.5h.2c0 .2-.3 0-.2.2.2.1 0 .4.2.5.1 0 0-.3 0-.5h.2c0-.2 0-.3-.2-.5.1 0 .3.2.4 0 0-.1-.1 0-.2-.1 0-.1 0-.3.1-.3 0 0 0 .3.2.3 0-.3 0-.2.1-.4-.2 0-.4 0-.4-.1.3-.2.2-.5.7-.9-.2-.4.2-.8.3-1 0-4.5 0-9.3.1-13.3-.2-.3-.1-1.1-.2-1.5Zm-4.6 8.4c0-.2.2-.1.2-.3.2 0 0 .4-.2.3m.6 5.2c0 .6.1 1.1.2 1.6-.1 0-.1-.1-.3 0 0-.2.1-.2 0-.4-.2 0-.1.1-.1.2-.4-.2.2-.6-.2-.9h.2c0-.2-.1 0-.2 0 0-.2.1-.1.2-.2-.1-.2-.2 0-.2-.3.1-.1.1 0 .2 0-.2-.3.1-.6-.2-.8 0-.1 0-.3.3-.3 0-.6-.2-1.2 0-1.6q-.2-.1-.1-.4v.2c.2-.4-.5-.5-.2-.8.3 0 0 0 0 0v-.5c0-.2.3-.4 0-.6.3 0 0 .8.3.8-.2.5.4 1.2.4 1.8 0 .8-.3 1.6-.4 2.4Zm3.4-11.9c0-.3.3-.3.2 0z"/><path class="st0" d="M40.5 23.5c0-.1 0-.2.1-.2 0 .2.3 0 .2-.2h-.2c0 .1-.3.4 0 .5Zm-7.3 15.7c0 .1-.2.2 0 .3.3 0 .3-.3 0-.3m-2-2.8c.1 0 .3 0 .3-.3h-.3c0 .2-.1.2 0 .3m9.8 3.1c.1 0 .3 0 .3-.3-.2 0-.2.2-.3.3m.1-16.8c-.2 0-.3 0-.3.2.2 0 .2.1.4.1v-.3Zm.4 15.5c0-.2.4-.3.1-.5 0 .3-.4.1-.4.4h.3Zm1.5-2.7v-.2h-.2c0 .2 0 .2.2.2M41.7 23c-.1 0-.3-.1-.5-.2 0 .2.1.2.1.3.1 0 .4 0 .3-.1Zm1.2 12.8c0 .1-.3.5-.1.6 0-.2.3-.4.1-.6m4.3-1.2s.1-.1.1-.2c-.2 0 0 .1-.1.2m-2.7 14.8s.1 0 0 0m-1.4-1.8H43Zm.2 2.5v.1Zm9-.3.1-.1Zm-.1-.5s.1 0 0 0m.6.8V50Zm1 .2s0-.1 0 0m-2.4-1.4v-.1zm.2-.3h-.1Zm0 .5h.1Z"/><path class="st2" d="M52.3 48.3v-.2c0-.3-.2-.5-.4-.5h-.2v.5h.4s.2 0 .2-.1Zm-.7.1"/><path class="st0" d="M56 49.5h.1Zm0-2.6h-.1zm-.7 2.8v.1zm-3.8-1v.2Zm-1.6-16.5c0 .3-.4.2-.3.5.2.1.8-.4.3-.5m2.4 17.1s0 .2.1.1Zm-.2-2.2H52Zm.3 1V48Zm-1.6-17c0 .1 0 .8-.2 1 .5-.3.2-.5.4-1h-.3Zm-.7 1.1c0-.1 0 0 .1 0v-.3H50s-.2.2 0 .3Zm-1.2.8v.1h.2v-.3c-.2 0-.3 0-.3.1Zm3.9 14.6v.1Zm0 .2v-.1.2Zm-1.6-.6v-.1Zm.3.4h-.2zm0-.7h.1zm-.3.6s-.1-.1 0-.2v.1h.1s0 .1.1.1Zm.2.2h-.1Zm-16.7-7.3c0 .2 0 .3.2.4 0-.3-.1-.2 0-.3Z"/><path class="st2" d="M13 24.2c0 .1-.1.4.1.4 0-.2 0-.4-.1-.4m-4.2-.6s.1 0 .2.1c-.4 0-.1 0 0 .2-.2.1 0 .6 0 .9h.2c-.1 0-.2 0-.2-.1.3 0 .3.4.5 0-.2 0-.3 0-.4-.2.1 0 .3.2.4 0-.1-.1-.4 0-.4-.2.1-.1 0-.1 0-.2.2 0 0-.3 0-.6h-.2Zm2.8 18.9c.2.2.2.4.4.2 0 0-.1-.4-.3-.6 0 .1 0 .2-.1.4m.3-1.9c-.2.2 0 .3 0 .6.2 0 .2.2.4.2s.1-.1.2 0c0-.2.2-.6 0-.7 0 .1-.2-.2-.4-.1ZM8.8 16.8c.2 0 .1-.2.1-.3 0 0-.1 0-.1.1.3 0-.2 0 0 .3.1 0 .2 0 .2-.1-.1 0-.2.1-.2 0m3 16.2c.1.1 0 .2-.2 0 0 .2.2.3 0 .4.2 0 .2.2.2.4.2 0 0-.3.3-.2v-.4c-.2 0-.1-.5-.3-.3Zm.2-1.9v.7c0-.1.1-.6 0-.7m.2-.6c-.1.1 0 .2-.1.3H12c.2 0 .1.2.3.1 0-.2.2-.4 0-.5ZM9.4 15.7c.2-.2 0-.2.1-.5h-.1.1s-.4 0-.2.1c0 0 .1 0 .1.1 0 0-.1-.1-.2 0 .2 0 .1.4.2.4Zm-.1 1.1v.7s.4-.1.2-.2c0 0 0 .1-.1.1-.1-.2.1-.6 0-.6z"/><path class="st0" d="M86.7 47.6s0 .1 0 0v.1Zm-.1-.3"/><path class="st2" d="M10.4 29.6v.2c.1 0 0 0 .1-.1.2.1.2.4.4.5 0-.3 0-.2.2-.1v-.4c.2 0 .2-.2.4-.2.2.4 0 .6.3 1v-.2h.1c-.4 0 .2-.4-.1-.6v.2c-.2-.3 0-.9 0-1 .3.1.9-.4.6-.9.2 0 0-.1.2-.2v-.1c-.3 0 0-.2-.2-.2 0 0-.1.1-.1 0 0-.4 0-.6-.2-.7-.2 0 0 .3-.1.2s0-.4-.1-.5c-.2.7.4 1.1-.1 1.4v.2h-.2c0 .2 0 .6-.2.6 0 0 0-.5-.2-.7v.2-.3s.3-.1.1-.2c0 0 0 .1-.2.1v-.2c-.1.6-.2.8-.5 1.2h-.2s-.1-.3-.1-.2c.2.2-.4 0-.3.3.1 0 0 .3.2.5 0 0 .1 0 .2-.1Z"/><path class="st0" d="M86.4 49.2v-.1zM9.2 18.6H9v.4c.2 0 0-.4.2-.4m79.7 30.6v-.1zm-6-6.8c.2 0 .2.1.4 0 0-.2 0-.3-.1-.3 0 .2-.3 0-.3.3"/><path class="st2" d="M11.8 14.4v.4c.2 0 .2-.4 0-.4m1.8 8.9c-.4-.2-.7.2-.6.5h.2c0-.2.3-.4.4-.6Z"/><path class="st0" d="M89.2 47.6s0 .1 0 0v.1Zm-1.5 2 .1.1Zm0-2.7"/><path class="st2" d="M11.8 27.3c0-.2 0-.6-.1-.5 0 .2-.1.5.1.5m-3.4-4.4c.2-.1.1-.5.4-.7 0 0-.1 0-.1-.1 0 0 .1.1.2 0 0 0-.2 0-.2-.2.4.2.1-.2-.1 0 0 0-.1 0-.1-.1.4 0-.2-.4.1-.4h-.2c0-.2 0-.6-.2-.8-.1 0 0 .3-.1.3 0-.1-.2 0-.2-.1.3 0-.1 0 0-.2.1 0 .2.1.2 0-.2-.2-.4 0-.5-.2h.2c-.1 0-.2 0-.2-.1 0 0 .1.1.2 0 0-.1-.3 0-.3-.1 0-.2.4.1.2 0 0-.1-.2 0-.2-.2.3 0-.2-.2 0-.3-.2 0-.1.2-.3.1.1-.2-.1-.5 0-.7-.3 0 0 .1-.2.2 0 .8.2 1.1.2 1.6.3 0 .1 0 .4.2 0 0-.1 0-.1.1.3 0 0 .1.1.3h.2c-.1.1 0 .3.1.6 0-.1 0-.2.2-.2-.1.2.2.1.2.2-.2.1 0 .3 0 .6.4 0 .3.2.2.4Z"/><path class="st0" d="M78.9 30.9s-.2 0 0 0M77.5 20v-.2h.1-.2v.2h-.2.2Zm.2 12.6s-.1 0-.2.1v.4h.2c0-.2.1-.3 0-.4Zm-.9.5c0 .5-.3.6-.5.8l.1.1c-.3 0 0 0 0 .1h-.2c0 .2.1.3 0 .5h.3c.1-.4.8-1.1.6-1.6-.2.1-.1 0-.3-.1Zm.2-3.7c0-.1 0-.4-.1-.3 0 .1-.1.3.1.3m6-2.9c-.1 0 0-.3-.2-.3 0 .1-.2 0-.2.2v.1zm-3.2 2.7c0 .3-.1.3-.2.4v.2c.3 0 0 0 0 .2 0 0 .1.1.2 0h-.1c.1-.2.5-.6.2-.8Zm-52.3 9.3c0 .1 0 .2.1.3 0-.2.4 0 .3-.3-.2 0-.2.1-.4 0m51.4-7.9h.1c-.1 0-.3 0-.1.1h.1v-.3h-.2ZM88 42.4c0 .3.1.1.3.3v-.3h-.2Zm-6.3-3.6h-.2v-.1c-.2.2 0 .6.3.5h.1c-.1 0-.1 0-.1-.2Zm1.7-11.3c.1-.3 0-.4.1-.6h-.2c0 .2-.2.5 0 .6Zm.7-1.5c-.1 0 0-.1 0-.1 0 .1-.2 0-.2.1v.3c0-.1.2-.2.3-.3Zm-.7 14.2v-.3c-.2 0-.2 0-.3-.2 0 .2 0 .4.3.4Zm-.4-.8c0-.2-.3-.2 0-.4h-.2c-.1.1-.2.5 0 .6.1-.1.2-.3.4-.3Zm3.7-16.2v-.1h-.2s.1 0 .2-.1c-.1-.1-.3 0-.3.3.1-.1.3.1.3 0Zm-3.2 18.6c-.1.3.5.2.5 0-.2 0-.1-.1-.2-.1 0 .1-.2.1-.3 0Zm-.1-2.5c.1.4.7 0 .8-.1-.2 0-.1-.3-.3-.3s0 .3-.1.3-.2-.1-.3-.1c0 .1-.3.3-.1.3Zm1-12.2c.3 0-.1.3.2.4v-.4c-.1 0-.3-.2-.3 0Zm.2-.6q0-.3-.3-.3c-.1.1 0 .1 0 .3.1 0 .2.1.3 0m.4 1.8c.2 0 .3-.3.4-.4v-.3c-.3 0 0-.2-.3-.2v.6h-.3c0 .2-.1.3 0 .4Zm-.2-2.2c.1-.1 0-.3 0-.4v.3s0 .1.1.1Zm1.1-2.1c0-.1-.2-.1-.2-.2v.4c0-.2-.1-.3 0-.3 0 .1.3.3.1.1Z"/><path class="st2" d="M14.8 36v.2h-.1c.1 0 .3 0 .3-.1-.1 0 0-.1 0-.2-.1 0-.2-.2-.2 0Zm-.5.5c-.3 0-.5 0-.5.2-.6-.4-1.4-1-1.7-1.6-.2-.3 0-.6-.4-.8.1 0 .2 0 0-.1-.7-.6-1.2-1.9-1.6-3-.2 0 0 .2-.2.1v-.2c0 .2-.3 0-.3.2 0 .1-.2.5-.4.6-.1.7-.5 1.3-.6 2-.2.7.2 1.7-.2 2.6.1.7.5 2.5 1.3 3 .1 0 .4.2.2.3.1 0 .5.1.3.2.1.1.1 0 .2 0 0 .1.2 0 .2.2-.3.6 0 1.6-.2 1.7h.2s-.1 0-.1.1c0 0 .1.1.1.3.3 0 0-.2.4-.2v-.4c.1.2 0 .3.2.1v.2c0-.2 0-.2.1-.3h.3c0-.1-.1-.2 0-.4-.2 0-.2-.3-.2-.1 0 0 .1.2 0 .3v-.8h-.2c.1-.1 0-.9 0-1.1 1.6-.2 2.4-1.2 3.2-1.6.2-.6-.6-.9-.3-1.6Zm-3.8 4.9c0-.2 0-.4.1-.6.1.1 0 .6-.1.6"/><path class="st0" d="M35.5 15c-.1.1 0 .3.1.3 0-.1 0-.4-.1-.3m-8 5.4v-1.1c-.2.3-.4 1 0 1.1m0 1c0 .2-.3.5 0 .5-.1-.2.2-.5 0-.5m57.7 28.2.1.1ZM27.4 22.5c.2 0 .1.2.3.1 0-.2-.2-.4-.3-.1m.6 10.8c0-.2 0-.4-.2-.4 0 .3-.5 0-.5.5.3.1.5-.2.6 0Zm54.9 17s0-.1 0 0m1.5-.6v.1zM28.1 23.4V23s-.4-.1-.2 0c.1 0 0 .4.2.4m-.1 1.7c-.1 0-.3.4-.2.5 0-.2.2-.2.2-.5m-.5 3.4h.3c.1-.1.1-.5-.2-.4-.1.2 0 .3 0 .4Zm.7-4.6c0 .3-.2.4 0 .5 0-.1.3-.5 0-.5m65.6 23.7s0 .1 0 0v.1Zm-.3 1.6v-.1zm-1.6-27.3c.1.1.4.3.4 0-.1 0-.3-.2-.4 0m2.7.6c-.3.3-.5 0-.8-.3 0-.2.1-.2 0-.5-.2.1-.2.4-.5.3 0 0 .2 0 .1-.2-.2 0-.5.1-.8.1.1.4.8.2.9.4-.2.3 0 .6.2.6s-.1-.2 0-.4c.2 0 .2.1.2.2-.2 0-.1.1-.1.2 0 0-.1 0-.1.1.2 0 .1-.2.2-.2.2.2.4.3.6.4 0-.3-.1-.5-.4-.7.1 0 .4 0 .3-.3Z"/><path class="st0" d="M94.8 22.8c0 .1-.1 0-.3 0 .1.2.4.1.2.5h.3c0-.2 0-.4-.2-.4Zm.9.6c0 .2-.1.4.2.4 0-.2 0-.3-.2-.4m8.6 7.2v.3h.2c0-.1 0-.2-.2-.3m-.4-13.7c.1.2 0 .3.2.1 0 .2.1.3.1.1V17c-.2 0-.2-.3-.5-.2.1 0 0 .2 0 .3.3.1 0-.2.2-.2M92.3 49.6l.1.1Zm13.5-12c0-.1 0-.3-.2-.3 0 .3 0 .4.2.3m-.6 1.8c.1 0 .2.1.2.1s-.1 0-.2.1c.1.1.2.2.2.3v-.2c0 .1.1.2.1 0-.2 0-.2-.5-.5-.4Zm1.9-4.6c.2.2.2.3.4.4 0-.1-.3-.5-.4-.4m-.6-2.7c0 .4-.5 0-.5.4.3 0 .4-.1.7-.2 0 0 0-.1-.1-.2Z"/><path class="st0" d="M106.5 31.9c.2-.2.2.3.2.3 0-.1.5.1.6 0-.2 0-.5 0-.6-.4-.2.1-.2-.2-.3 0 0 .1 0 .2.1.2Zm.8 3.6c0 .1 0 .3-.1.3.3 0 .4-.2.1-.3M96.2 23.6h-.3c0 .3.3.3.3 0m9.9 11.2c-.3-.1-.3-.3-.6-.5 0 .2.4.7.6.5m1.7.5c0-.2.3 0 .3-.2V35c-.2 0-.5.2-.3.3"/><path class="st2" d="M0 59.5h112.7V0H0zm67.2-39.1s-.2.3-.3.2c0-.1.1-.2.3-.2m-.8 1c-.4 0-.3-.2-.1-.4.2 0 0 .3.1.4m-9.2-4.3c.2-.2 0 .4 0 .4-.2.1 0-.5 0-.4m-.6.4c-.1-.1 0-.2 0-.4.2 0 0 .1 0 .2 0 0 .1-.2.1-.3q.1.1.1-.1c.2 0-.2.5 0 .6-.4.4-.8.7-.8.9 0-.4 0-.7.5-1Zm-9.7 7c.1-.2 0 .1.2 0 0-.1-.2-.2-.2 0 0-2.5-.2-5.9 0-8.7 0-.6 0-1.3.2-1.8 2.1 0 3.1.2 5.3.2 0 5.1.1 8.5.1 14.6-.3.2-.4.4-.6.8-.3-.2-.8.3-.9.6-.1 0 0-.2-.2-.2-.2.1 0 .3 0 .5-.1-.3-.3.2-.3.2-.4 0-.5.5-.9.2-.2.3-.5.5-.6 1-.2 0-.2-.2-.4-.1-.3.4-.6.4-.9.5-.3-.3-.3-1-.3-1.1h-.1c-.3-.1-.2.4-.4.2-.2-.4.1-.1.3-.3 0-.4-.3-.3-.4-.5v-5.1h.2v-.8Zm.1 8.6c-.3-.2-.1-.3-.1-.6.3.3.3-.4.7-.3 0 .4-.3.6-.6.9m.2.2v.3c-.2 0-.2-.4 0-.3M12.6 15.5v.5c0 .1-.2.3-.2.5-.4-.1.3-.4 0-.5 0 0 0-.2.1-.3v-.2Zm-.3-1.6c.2-.2.1.3 0 .4-.2 0 0-.4 0-.4M4.8 44.1c-.2-.3-.1-.6 0-.8.3 0 .4.3.4.6-.2 0-.2.2-.4.1Zm16.6-3.3c-.2.3-.8 1.1-1 1.3s-.6.5-.8.7c-.8-.5-1.3-1.3-2.1-1.9-1.5 1.4-3.5 2.3-5.6 2.4.1-.1-.2-.1 0-.4 0 0-.2.1-.2 0 0 .1-.1.2-.4.1.2-.2-.2-.1-.1-.3 0 0-.1.2-.1 0 0 0 0 .1-.1.2 0 0-.1-.2-.2 0-.1 0 0-.1 0-.2-.3 0-.2.5-.2.5-.1.1-.3.1-.3.3 0-.2-.4-.2-.5 0-.7-.2-1.9-.4-2.6-1.2h-.3c-.1-.1 0-.1 0-.2-1.7-1.7-3-4.2-2.7-6.9-.4.2 0-.2-.2-.3 0 0 .2 0 .3-.2.4-2.2.9-4.1 1.8-5.5.6-.9 2.3-1.6 1.5-2.8-1-1.6-1.5-5.3-1-7v-.5c0-.1.2 0 .2-.1-.2 0-.1-.3 0-.4-.2-.6-.1-1.2.2-1.6.2-.4.7-.6.6-1 .2 0 .3-.2.6-.2 0-.2-.1 0-.2 0 .2-.2.3-.3.6-.2-.1.1 0 .1 0 .3.1 0 0-.5.2-.2.2-.2 0-.7.2-1 0 0 .2.1.2 0 .1 0 0 .3 0 .4.3-.2 0-.4.2-.6 0 0 0 .2.1.2s0-.4.2-.3v.1c.4-.3.8-.2 1.3-.5v.3c.2 0 .4 0 .3-.2.2-.1.2.4.2.6h.1c.1-.2.2-.4 0-.6.1 0 .2 0 .3-.1.2.1.1.1.2.4h-.2v.2c.2-.2.1.4.4.5-.1 0-.4.2-.5.2 0 0 .1-.2.2-.2-.2-.2.1-.2 0-.4 0 .1-.2.3-.1 0-.2.1 0 .1-.1.4v-.2c0 .1-.3.2-.2.2 0 .2-.2-.2-.1-.3 0 0-.1.4 0 .4-.2 0-.1 0-.4-.1v-.3.2-.3c-.1.2-.1.2-.2 0-.1 0 0 .3-.2.1v.6c-.1 0-.2.4-.2.2.2 0-.2 0 0-.2-.2 0-.2.3-.2 0-.2.2 0 .3-.2.5 0-.1-.2.1-.2 0-.2.1-.3.4-.2.8.2 0 .1-.2.1-.4 0 .2.4.5.6.8 0 0 .1-.4-.1-.5.1 0 .2 0 .4.2-.2.1.1.6-.2.4.5.5 0 2-.6 2v.1c.3.1.4.6.2 1 .2.6.3 1.6.6 2.6h.1c.1.5.2 1.3.4 1.7h.2c.1.4.1.7.4 1 .2 0 0 .2-.1.1 0 .1.2 0 .2.1.1 0 0-.2.1-.2 0 0 0 .1.1.1 0 0 0-.1.1-.3.2.4 0 .4.2.9 0 0 0-.1.1-.2.1 0 0 .4 0 .5.1-.2 0-.6.1-.8.1.1.1 0 .3 0-.1-.1 0 0 0-.2-.4-.6-.4-.8-.2-1.7-.1 0 0-.1-.2-.2h.2c-.1-1.2 1.2-1.9 1.4-3.2.1-1-.4-2-.4-2.8v.2c-.5 0 0-.5-.3-.7-.1 0 0 .2 0 .4-.3 0 0-.2-.2-.4-.1 0-.1.1-.1.2-.3-.1 0-.4 0-.6l.2.2c.3-.2-.2-.7 0-1 0-.1-.2.1-.2 0 0-.2.1-.9 0-1.1.1 0 0 .1.2.1s.1-.4 0-.5c.3 0 .2-.5.2-.6-.1 0-.1 0-.1.1-.2-.1.1-.2.1-.4v.2s0-.2.3-.2v.1c-.1.2-.2.4-.3.5.1.1.2-.2.5-.1v-.5c.1.2.5 0 .6.2 1.1 0 2.3 1.1 3 1.6.2.6.4 1.1.7 1.5 0 0 0 .4.2.5.2 2.2-.2 3.7-.9 5.3-.2.5-.5 1.1-.7 1.4 0 0-.2 0-.2.1-.4.6-.7 1.3-1.2 1.8v.2c-.4.4-.9.6-1.1 1.2-.3 0-.2.2-.6.2-.5 0-.7.8-.4 1.1 1 .7 1.2 2.2 2.3 3.1 0 .5.7.8 1 1.2.2.4 0 .9.6 1.1.4 0 .6-.4.5-.6.8-1.8.6-4 .7-5.6 1.2 0 2.6-.3 3.8-.2.3.9 0 2.1.2 2.7h-.1c0 .1.2.2 0 .3.1 0 .1.3.1.5 0 1-.2 2.1-.6 2.8 0 1.1-.7 2.4-1.1 3.4.2.4.4.8.9 1 0 .1.1.1 0 .3h.2c0 .4 1 .6.8 1 0 .2-.5.5-.9 1ZM11.7 16v-.4c.2 0 .2.5 0 .4m-.6-.9c-.2 0 0 .3-.2.4 0-.2.1-.2 0-.4zm28.4 28.3c.2 0 .1.2.2.3-.2 0-.2-.1-.2-.3m.9-1v-.2h-.1q0 .15 0 0c.2.1-.2.3-.2.5-.2 0-.1-.1-.2-.2 0-.2.2 0 .2-.2-.1-.2-.2.2-.4 0 0 .2.1.3.1.4-.9.6-1.8 1-2.7 1.1v-.2c-.2 0-.1.3-.3.4-.7 0-1.9.3-2.6 0v-.4c0-.3-.2.1-.4 0 0-.3-.1-.3-.1-.5.2-.2.1-.7.3-.9.3.1 0 .5.1.8.4-.3.4-.9.2-1.1 0-.1-.2.2-.3 0 .2-.4-.3-.7-.6-.6.1 1-.1 1.8 0 2.8-.8.2-1.4-.3-2-.5-.5-.2-.9-.2-1.3-.5-.3-.2-.6-.5-1.1-.8 0-.4-.5-.4-.7-.8-.6-.5-1.1-1.5-1.5-2.3v-.4c-.4-.7-.7-1.9-.4-2.7 0-.1-.3 0-.2-.3h.3c0-.2-.3-.2-.3-.4s.1-.2.3-.2c-.1 0 0-.3-.2-.3.2-1.4 0-3.4.2-4.3 0-.6-.3-1.7 0-2.1-.2-.3 0-.2-.1-.7 0 0 .1.2.2.3.1-.2.2 0 .5 0 0-.4-.2-.6-.4-.2-.1 0 0-.2-.2-.2s-.1.2 0 .2c0 .2-.1-.1-.3 0 .2 0 0-.5.3-.6-.2-.5-.4-1 0-1.3-.1-.1-.3-.2-.2-.5-.3 0-.1-.1 0-.2 0-.2-.1-.4-.2-.6 0-.1.2-.5 0-.7v.3c-.2-.8 0-1.8.5-2.1-.2-.5.1-.7.2-1-.1-.2-.2.1-.3 0v-.3c-.1.4-.3.7-.4 1-.1-.8-.2-1.6.2-2.1-.2-.8.3-1.4.7-2 0-.1 0-.4.2-.5 0-.1.3-.1.3-.2 0-.2.2-.5.4-.8.2-.2.5-.4.8-.6.2-.3.5-.5 1-.9.9-.7 2.5-1.5 3.5-1.5.2.2.3.5.5.8-.6.7.4 1.2.4 2.3h.3c-.2-.3 0-.5.3-.7.2.2 0 .5-.1.6q.3 0 .9.3c.2-.2 0-.5-.4-.5 0-.3-.4-.9-.5-.6-.1-.8-.6-.9-.2-1.5-.3-.2-.5-.2-.4-.8 1 0 2.1-.1 3.2.5-.2.1 0 .4 0 .4.3 0 .2-.3.4-.4.5 0 .5.2 1 .4 0 0-.2.6 0 .8.1-.1.2-.2.2-.5h.5c.6.5 1.1 1 1.8 1.3 1.5 1.9 2.5 4.3 2.3 7.2 0 1.1.1 2.5 0 3.7-.1 2.1-.2 3.4-.2 5.7.2 1.3.1 2.6-.1 3.7-.3 0-.3.2-.4.4.1 0 .4 0 .3.4.3 0 .1-.4 0-.6.4 0 .2.5.2.6 0 .5-.5 1.1-.2 1.4-.1 0-.1.2-.2.3-.2 1.4-1.2 2.5-1.9 3.6-.4.1-.5.5-.9.8Zm4.4 6.5c0 .4 0 .9-.3 1.2 0 0-.2 0-.3.1h-1.4V47h.1v-.7h1.4c.6.3.6 1.1.6 1.9Zm2.2 1.6h-.5c-.2 0 0 0 0 0h-1.1v-3.6h.2s.1 0 .1.2c0 0 .1.1 0 .2 0 0 0-.1 0 0l-.1-.1h1.2v.5h-1v.6c.1 0 0 .2 0 .3h.6v.5h-.7v1.1h.6v.2s.1 0 .1-.1h.1v.2Zm-.3-1v.3-.2Zm-.1-.3V49v.1Zm.4-.2v-.2.3Zm2.3-1.7h-.5v2.1h-.1c-.1 0 0 0 0 0h-.1v1h-.7v-2.9h-.7v-.4h.1s-.2 0-.2-.2v-.2h2.1v.3Zm1.6-4H47c-.4-.6-.1-1-.3-1.6.1.2 0-.4 0-.7v-1c0-.3-.1 0-.1 0 0-1.7.2-3.8 0-5.5 0 0 .3 0 .1.1 0 0 .3 0 .1.1 0 0 .1 0 .1.1 0 0 0-.2.1-.2-.1 0-.1 0 0-.1-.3 0-.2-.4-.3-.1-.2-.2-.1-.3 0-.4 0 0 .3.2.2.2 0 .1.1-.2.2 0 0 0 0-.1-.1-.1.3-.5.8-.9 1.3-1.3 0-.3-.2-.2-.2-.5.2 0 0-.3.2-.3 0 .3.2-.1.1.2 0-.1.2-.1.4 0 .3-.5.7-.8.8-1.1 0 .2.5.3.6 0 0-.1 0-.3-.2-.3.7-.3 1-.8 1.7-1.1 0-.2-.1-.3 0-.4v.1c0 .1.2 0 .2.2h.1c0-.3.4-.5.5-.8.3.1.3.2.6.1-.3.1-.5.4-.8.6.1 2 0 4.3.1 6.1h-.1c.3.8-.2 2.1.3 3.1h.1c.9-.2 2.4.4 3.3 0v.1s.1 0 .1-.1v.1c.4-.2 1.1.3 1.9 0 .3-.1.5-.7.6-.1.1 0-.1.3.1.3-.3 0 .2.5-.1.5.1.1 0 .3 0 .5.1 0 .1.7.1.8v.4c0 .1.2.7 0 1 .2 0-.1.3-.2.6-.2 0-.2-.1-.2 0-.1 0 0 0 0-.1-.5.2-.8.1-1.5-.2 0-.1.2 0 .2-.1-.3 0-.4.1-.8.2h.1c-.5 0-1.1.2-1.6.3v-.1c-.5 0-1.4.1-2 0-.3.1-.8 0-.8 0-.5.2-.6 0-1 .2Zm7.5 3.5h.3Zm-2 0h.3Zm-3.8.2h-.1Zm-.1-.4v-.1zm-1.6 1.9v-.1h.1v.4-.4Zm.8 2.5v-.2.1Zm.1-.4v.1zm1.2-.1s-.1 0 0 0h-.1s0-.2-.1-.3V50c-.1 0-.1-.3-.2-.4v-.1c0-.2-.1-.3-.2-.4v.1h.1-.1v.9s-.1 0 0 0v.5h-.7v-1.1h.1v-.1h-.1c0-.1 0 0 .1-.1-.1 0 0-.2 0-.3v-1.1h.3-.1.9v.1c0 .1 0 0 0 0 0 .1 0 .2.1.2v.7c0 .2-.2.5-.3.7-.1 0-.1 0 0 .2v.4-.1.3-.1.3c0 .2.1.3.2.4h-.2Zm2.5-.6-.2.2h-.8v-3h.1v2.7c0 .3.2.4.4.4s.3 0 .4-.3v-1.3h.1v-.9h.2v2.7Zm.5.7h-.1v-3.2h.5v3.2h.7v.5h-1.5Zm1.9 0h-.1v-3.2h.5v3.2h.7v.5h-1.5Zm1.6.4.1-.1v.2Zm.5-.4h.1c0 .2-.1.1-.2.1Zm1.6-.1h-.2c0-.2 0-.4-.1-.6v-.1h-.8c0 .2 0 .4-.1.6h-.1v.1s-.1-.1-.1-.2v-.9c0-.3.1-.7.2-1v-.3c0-.3.1-.6.2-1h.8c0 .3.1.6.2.9 0 .1 0 .5.2.8 0 0 0-.1.1-.1v.2c0 .3.1.5.1.8.1.4.2.7.2 1.1h-.3Zm.6-2v-.1h.1v.4-.4Zm.7 2.5v-.2.1Zm.2-.4v.1zm1.1-.1s-.1 0 0 0h-.1s0-.2-.1-.3V50c-.1 0-.1-.3-.2-.4v-.1c0-.2-.1-.3-.2-.4v.1h.1-.1v.9s-.1 0 0 0v.5h-.7v-1.1h.1v-.1h-.1c0-.1 0 0 .1-.1v-1.4h.3-.1.9v.1c0 .1 0 0 0 0 0 .1 0 .2.1.2v.7c0 .2-.2.5-.3.7-.1 0-.1 0 0 .2v.4-.1.3-.1.3c0 .2.1.3.2.4h-.2Zm-.5-3.8v-.1zm.1.3h-.1Zm2.7 3.4h-.2Zm.2-.3V50s0 .2-.1.2c-.2-.2-.3-.5-.3-.8v-2.2c0-.2.4-.3.6-.3s.5 0 .7.2c.2 0 .2.2.3.3 0 0 .1.4.1.5v.2h-.5c0-.2 0-.5-.2-.7h-.5c-.1.2-.1.4-.1.6v1.4c0 .2 0 .4.2.5 0 0-.2 0 0 .1h.1v.1h-.2V50Zm1.5-2v.1Zm0 .2v-.1Zm0 1.3v.1Zm.1-.1v-.1zv.2c0 .4-.5.6-.9.6h-.3v-.2s0-.1.1-.2c0-.2.1-.5 0-.7h-.4v-.3h.8v-.2V50Zm2.3.1v.2c0 .2-.1.3-.2.5h-.1c-.1 0-.2.1-.3.1h-.3v-.2.3h-.5s-.1-.2-.2-.3v-1.7.1-.6l.1-.1c.1 0 .3-.2.4-.2v.4h.1s0-.1 0 0v-.3h.5l.2.2q.3.3.3.9v1.7Zm-1.3-6.5V43c-.6.4-2.3.1-3.4.3-.1 0 0-.1 0-.1-.9-.1-1.7.2-2.2 0-.9.4-1.8.2-2.7.2-.7-1.5-.2-3.6-.2-5v-.5c0-.8 0-1.9.1-2.5v-.3c-.5-3.3.2-7.5-.1-11.5.1-.3.1-.8 0-.9.3-.7-.2-1.4.3-1.7-.5-.8 0-2-.4-2.8.3-1.4-.1-2.8.2-4 .1-.1.5 0 .5-.2.2.2.4.2.6.4.1 0 .3 0 .4-.2.7.5 1.7-.3 2.3.4 0-.4.8-.3 1.5-.3 0 .6.2 1.5-.2 2 .3.5.4 1 .1 1.5.1.5.3 1.7 0 1.8 0 .2 0 .6.1.6q-.2.2-.1.5c-.1 0-.3-.1-.5-.1 0 .2.1.3.4.3 0 .4-.2.3 0 .8 0 .1.3.2.4.1-.1.3-.1.5 0 .8h-.3c0-.4 0-.5-.1-.9-.2 0-.2.5-.6.4 0 .2-.1.2 0 .4-.2 0 0-.3-.2-.2-.4.6 0 1.3 0 1.9-.1-.1-.2-.3-.2-.5-.1 0 0 .3-.3.2v-.3h-.4v.2s.3 0 .4.3c-.2-.3-.1 0-.4.1V24c-.2 0 0 .2-.2.3-.3 0-.1-.2-.3-.2 0 .2 0 .5-.2.9-.2 0-.4.2-.3.3-.2.1-.1-.5-.3-.5s0 .4-.1.5c-.2 0-.1-.1-.3-.1 0 .3.1.5.4.7.2-.2.1-.5.3-.6.1 0 .1.1.1.3-.2-.5-.4.9-.3 1.3 0 .2.4.6.2.8-.1.2-.1 0-.4 0 0 .2 0 .3.2.5 0-.3.3-.4.4-.9.3 0 .4-.6.6-.8 0 0 .1.2.2 0 .4 1 .2 2.3-.2 3-.3-.5.2-.8 0-1.1-.2 0-.2.1-.3 0-.2.2-.2.5-.2.9-.3 0-.4.3-.3.6 0 .2.3 0 .3.2.2-.1.1-.2.1-.6h.1c.1 0 .3.2.3.4.4-.1.6-.3 1-.5.1.3-.2.7 0 1.1.2-.1.4-.3.6-.5-.1-.2 0 0-.3-.2.1 0 .1-.6 0-.8.1-.3.3.2.5-.2-.1-.6 0-1-.3-1.5-.1.2-.1-.1-.1-.3-.2 0-.2-.1-.3-.2-.3.2-.4-.3-.4-.5s.2.1.2 0c0 .1.2.2.1.4.3-.2-.2-.3 0-.5.1 0 .3 0 .2.2.3-.1.3-.3.5-.4-.3-.4-.3-.5-.3-1.1 0-.1-.3 0-.2.2 0 0-.2-.1-.3 0 0-.2-.2-.4-.3-.6.1 0 .2 0 .2-.2.2 0 0 .4.2.6.1 0 .1-.3.4-.2l-.2-.2s.1 0 .3-.1c0 0-.1-.1-.2-.1.1-.3.2-.2.2-.7h.2c-.3-.4.3-.5.5-.7 0 1.5 0 3.4.1 5 0 .9-.3 1.8-.1 2.7 0 .5.2.9.2 1.5v6c0 .4 0 .8.3 1.1.1 0 .2.2.2 0v.1c0-.2.5 0 .4 0 .3 0 .8-.1 1.1 0 0 0 .2.1.1.1.4 0 1.3-.2 1.8-.1 0 0 .3.2.2.2.6 0 1.1-.3 1.8 0 .2.8.1 2.4.2 2.5v1.1c-.4.5-1.6 0-2 .2-.7-.2-.9-.2-1.5 0Zm-3.7-20.9c0-.1.3 0 .4 0-.1.2-.4.3-.5.5-.2 0-.2-.1-.2-.3.2 0 .3-.2.4-.2 0 0-.1-.1-.2-.1Zm-.6 3.5c-.3 0-.5-.6 0-.6 0 .3-.1.5 0 .6m0 3.5c-.1.1-.2-.2-.4-.2 0-.2 0-.2.1-.3.2-.1.3.5.4.1.2 0-.3.3-.1.4m.2-1.9c.2.1 0 .2 0 .4-.1 0 0-.4 0-.4m-.8-1.7c0-.1.1-.1.1-.2.2 0 .2.3.2.6-.1-.1-.2-.3-.3-.4m-.7.3c.1-.2.3 0 .5 0v.5c-.3 0-.2.2-.4.4-.1-.3 0-.4 0-.9Zm.4-1.5v-.3h.2c0 .1 0 .3-.2.3m1.1.7c.1 0 .3.3.1.5-.3 0-.2-.3-.1-.5m7.7 22.2h-.5v2.1h-.1c-.1 0 0 0 0 0h-.1v1h-.7v-2.9h-.7v-.4h.1s-.2 0-.2-.2v-.2h2.1v.3Zm2.3 0h-.5v2.1h-.1c-.1 0 0 0 0 0h-.1v1h-.7v-2.9h-.7v-.4h.1s-.2 0-.2-.2v-.2h2.1v.3Zm2.3.7v1c0 .1 0 0 0 0v1.4h-.6v-.3c.1 0 0-.2 0-.3v-.2c.1-.2 0-.5 0-.5s-.2 0 0-.2 0 0 0-.1v-2.2h.6v1.1Zm3.7 1.2v.7c0 .2 0 .4-.1.6h-.3v-1.1c0-.2 0-.5-.1-.7 0-.2 0-.4-.1-.6v2.4h-.5v-3.7h.6c.1.6.3 1.1.4 1.6 0 0-.1 0 0 .1l.1.1s0 .2.1.3v.5-.3.2Zm.7-2.1v2.2c0 .1 0 0 0 0v1h-.6v-1.2c0-.1 0 0 0 0h-.1s0-.1-.1-.1H81v-.6c0 .1 0 .3-.1.4v.2l-.1-.1v-.3.1-.2c0-.3.1-.6.2-.8v-.5h.7v.2Zm-.5-3.7c.1.1-.1 0-.2 0 0-.1 0-.4.2-.3 0 .1-.2.2 0 .2Zm1-.7c0-.2-.2 0-.2.1-.2-.2-.5-.2-.7-.3 0 .4.4 0 .4.4-2.7 0-4.7 0-6.9.1-.2-1.5 0-3.6 0-5.1 0-.2-.1-.4 0-.7.3-1.8.3-4.1.3-5.7s0-1.4-.1-2c0-.3.2-1.3 0-1.5.2-1.4.1-3 0-4.3.2-.6.2-4 .2-5 0-1.4-.1-3 0-5.1.4-.2.7 0 1 0s.1-.2.3-.2c.3 0 1.1.1 1.5.1s0-.1 0-.1c.2 0 .5.2.6.2s0-.1 0-.1h1c.1 0 .4.1.5.1h1.4-.1c.1.1.4 0 .3.2.5-.4.6-.2 1-.5.1.3.6-.2.7.2v-.2c.2.2.7-.1 1 0 0 .2 1.2-.1 1.5 0-.1-.3.5 0 .8-.1.4.2 1.3-.3 1.4-1.2.5.2-.6 1.5.6 1.3 0 1.4-.2 3.1-.2 4.6-.5 0-1.4-.2-1.6.2-.4-.2-.8-.1-1.2 0-.2 0-.4-.2-.5 0 0-.2-.4 0-.5 0 0 0-.1-.1-.1-.2l-.3.3c-.1-.3-.1 0-.4 0s-.3-.3-.4-.3c-.3 0-1 .4-1.1 0 0-.1 0 0-.1-.2-.5.5-1.1.3-1.8.1h.1c-.3.4-.5 1-.5 1.6s.2 1 0 .9c.2 1.2-.4 3.3-.1 4.8h1.2c.2.5-.5.7-.1 1.2.5-.1.6 0 .7-.4-.1-.1-.3-.2-.4-.3.2 0-.1-.4.2-.6H84c-.1.2.7.2.8 0 .5.2.3.8.5 1.3.5-.4-.2-.5 0-1.2.3 0 .3-.4.4-.6 0-.3-.3-.4 0-.6 0 0-.3.1 0-.1-.1 0-.1-.4-.2-.6-.3.3 0-.4-.2-.3 0 0 .1-.1.2-.1-.1 0-.3-.1-.1-.4 0-.2.2.1 0 .2.2 0 .5-.2.4-.3 0-.2.2 0 0 .1.3 0 .4-.6.6-.5.1 0-.2 0-.2.2.1 0 .3-.2.1.2.1-.1 0 0 .3 0-.2-.3.2-.5 0-.6.4-.2 0 .5.2.6-.1.2-.1-.3-.3-.2.3.2-.1.6.3.6v.7c0 .2-.2.1-.3.2.1.6-.2 1.5.3 2-.1 0-.2.4 0 .5-.1 0 0 .4-.1.5 0 .1.3 0 .2.3.1 0 0-.2.3-.1 0 .1-.2.2-.3.4 0 0 0-.1-.1-.1s.3.4 0 .2c0 .2.3 0 .3 0 .2.2 0 .3 0 .6-.2-.2-.4-.2-.4-.5-.4 0-.4.6-.2.8 0 0 .2-.1.2 0s-.2.1-.3.1c0 .5.2 1.2.7 1.5v.2c-.5-.3-.9-.8-1-1.5-.2 0-.1.2-.1.4s.1 0 .3.1c0 .3 0 .4-.2.5-1.3 0-2.5 0-3.9.1 0-.1-.2-.1-.2-.2-.3.4-1 0-1.5.1-.4 1.3-.1 2.9-.1 4.5v3.3c0 1-.3 0-.3.2.3.1 0 .2 0 .3.3.1.4 0 .5.4 0-.1.3 0 .3-.1 0 0 0 .2.3.2s0-.1.1-.1c-.3 0 .1-.3 0-.4.1 0 .2-.2.3 0 0-.2.3 0 .2 0 .3-.1.5 0 .5-.2.1 0 .3.1.3.3.3-.3.4 0 .8 0v.5c.5 0 0-.5.1-.7.2 0 .2.1.3.3.9 0 1.3 0 2.2.3v.2c.1-.2.4 0 .5-.2h-.2c.1-.3.4 0 .6-.3 0 .1.1 0 .1.2 0 0 .2-.1.2-.3.3 0 .2.4.6.3v.3c-.2 0 0-.2-.2-.2-.1 0-.2 0-.2.2s0 0 .1 0c0 .3-.3 0-.2.2-.1 0-.2-.1-.2-.3-.1 0 0 .2-.2.2v-.3c-.2 0-.1.2-.3.2 0 .1.3 0 .2.2-.1.1-.2 0-.4 0 0 .2.5 0 .5.5.3-.2.3.2.6.2-.2.3.1.2.2.5-.2.1 0-.1-.2 0 0 .3.1.4 0 .7 0 .1.2-.2.2-.3 0 .2 0 .5.3.6 0 .2-.3 0-.2.3-.1 0-.1-.2 0-.2 0-.1-.2.2-.2-.1-.3.2-.4.6-.8.8-.1 0-.1-.2-.3-.2-.2.1 0 .4-.1.5-.2 0-.3 0-.2-.2-.1 0-.1.2-.2.3 0 .1.1.1.1.3-.7 0-1.3-.2-1.8 0 0-.1-.2 0-.1-.3.2.1.2-.1.5-.2h-.6c0-.3.5-.3.6-.2 0-.2.8-.4.8 0h-.3c.1 0 .3.1.2.4.2-.2.2.1.5-.1-.1 0-.2-.1-.4-.2.2-.4-.3-.2-.2-.7H85c0 .1.2 0 .2.2-.5.1-.9.2-1.4.3v.5c-.3.1-.4 0-.9 0 0 .2.3.2.3.5-.4 0-.3-.6-.6-.4v-.1c0-.1.1-.1.1-.2Zm6.3-.8s-.2.4 0 .9c-.1 0-.5.2-.5 0-.2.2-.3.2-.4.5 0 0 0-.2-.2-.1-.1-.8.3-.5.3-1.1.2 0 .3.2.5.2 0 0 .1 0 .1-.1h-.1c-.1 0 0 0 0-.1-.4 0-.2 0-.3-.5 0 0 0 .1.2.1 0 0 .1 0 .1-.1-.8.2-.4-1.3-.7-1.1-.2-.2 0-.5.1-.6 0 .2-.1.2-.1.4 0 0 .1-.1.3-.1 0-.2-.1-.2 0-.4.4 0 .3-.5.5-.8h.3c-.2 1 0 2.3-.2 3.1h.2Zm-1.3-2.2c0-.2 0-.4-.1-.4.2-.3.5.4.1.4m.7-.5c0 .2-.2.2-.3.3-.1 0 0-.4.3-.3m-.9-19.1c0 .1-.1-.2-.3-.1 0-.1 0-.2.1-.2 0 .1 0 .2.1.3Zm0 .3c.1.2.2 1.1-.1 1.6-.2-.5.1-1 .1-1.6m.1 2.6v.3c-.1 0-.1-.2-.1-.3h.2Zm-1.2 8.1c0-.5-.3-.5-.2-.8 0 .2.3.2.4.3 0 0 .1.3 0 .4 0 .1.2.2.2.3 0 .2-.2 0-.2-.2-.3 0-.2.5-.5.6 0-.2 0-.5.1-.8.1 0 0 .1 0 .2h.1Zm-.8 2c-.2-.4.1-.6-.2-.9.2 0 .3 0 .3-.2-.2-.1.1 0 0 .1h.2v-.3c.2 0 .1.1.2.2-.2.3-.1.8-.4.8.1.1 0 .3 0 .4Zm-.4.9c0-.1 0-.1.1-.1v-.4.1-.1c.1.1 0 .4-.3.5Zm2.5 8c-.1 0-.1 0-.1-.1h-.2c-.2 0 0-.3 0-.3.2.2.2 0 .4 0h-.1v.2Zm-1.2.5c-.1.1-.1.3-.4.3v-.2c.1.1.2-.1.4 0Zm-2.3.7c.1.1.2.3.3.5-.2 0-.2.1-.4.1-.2-.3.2-.4 0-.6Zm-.6.5v-.3c0 .2.1 0 .3 0 0 .1.1.3.1.5 0 0-.1 0-.1.1 0-.1 0-.6-.3-.4Zm1.2 6.2-.2.2h-.8v-3h.1v2.7c0 .3.2.4.4.4s.3 0 .4-.3v-1.3h.1v-.9h.2v2.7Zm2.2.7h-.1v-.1Zm.3-1.4v.2zv.1h-.1v-.1.3-.1.7h-.1s0 .1 0 0h-.1v-.2.1s0-.2-.1-.3v-.3h-.1v-.2l-.3-.6V50h-.1v.7h-.5v-1h-.2v-.4c0-.1 0 0 0 0v-2.2h.2v.2-.1s.3 0 .3.1c0 .3.2.5.3.8 0 0 0 .1.1.2.1.4.3.6.4 1v-1.9h.6v2.3Zm.1-6.4c-.1-.1-.3-.2-.5-.1 0-.2.2 0 .2-.2 0-.1-.2 0-.4 0 0-.2 0-.2.1-.4.1 0 0 .2.1.2s.2-.4.3 0c.1 0 .1-.2.4-.2-.2.2-.3.3-.3.5 0 0 .1-.1.1-.2.2 0 .3.2.4.1 0 .4-.3 0-.4.2Zm2.1 7.8h-.1v-.1Zm.3-1.4v.2zv.1zv.3-.1.7h-.1s0 .1 0 0h-.1v-.2.1s0-.2-.1-.3v-.3h-.1v-.2l-.3-.6V50h-.1v.7h-.5v-1H88v-.4c0-.1 0 0 0 0v-2.2h.2v.2-.1s.3 0 .3.1h-.1c0 .3.2.5.3.8 0 0 0 .1.1.2.1.4.3.6.4 1v-1.9h.6v2.3Zm.2-7.3s0-.5-.1-.6c.2 0 0 .5.2.3.2 0-.2 0 0 .3Zm1.9 8.6h-.5c-.2 0 0 0 0 0H90v-3.6h.2s.1 0 .1.2c0 0 .1.1 0 .2 0 0 0-.1 0 0l-.1-.1h1.2v.5h-1v.6c.1 0 0 .2 0 .3h.6v.5h-.7v1.1h.6v.2s.1 0 .1-.1h.1v.2Zm-.3-1v.3-.2Zm0-.3V49v.1Zm.3-.2v-.2.3Zm2.2 1.6h-.1v-.1Zm.3-1.4v.2zv.1zv.3-.1.7H94s0 .1 0 0h-.1v-.2.1s0-.2-.1-.3v-.3h-.1v-.2l-.3-.6V50h-.1v.7h-.5v-1h-.2v-.4c0-.1 0 0 0 0v-2.2h.2v.2-.1s.3 0 .3.1c0 .3.2.5.3.8 0 0 0 .1.1.2.1.4.3.6.4 1v-1.9h.6v2.3Zm14.7-11.9c.1 1.5-.7 3.1-1.6 3.8v-.2c-.2.3-.1.8-.7.8.2.2-.1.2-.1.3-.2-.1-.3 0-.3.1-.2 0-.1-.3-.4-.3 0-.4 0-.7-.1-.9-.3.6.2.8-.5 1 0 0 .2.1 0 .1.1 0 .3 0 .3.2 0 0 .3-.2.2-.2 0-.1.2.1.3 0-.2.1 0 .2-.1.5-.1 0-.3 0-.5-.1 0 .2-.2.3-.3.4-.2-.1-.1.2-.5 0-.4.6-1.6.8-2.3.8-.6.8-1.5-.1-2.4.2v-.1c-1.2.1-2.5 0-3.8-.5h-.1c-.2 0-.5-.4-.8-.5-.5-.3-1.2-.6-1.4-1s-.8-.8-1.2-1.3c-.8-1.1-1-2.8-1.3-4.4 0-.6-.1-1.3-.1-2.1 1.3 0 3.1.3 4.3.2.2 2 1.1 3.7 2.5 4.2.1 0 .6.2.7.1.8.3 1.5.2 2.1.1.6 0 1.5-.1 1.8-.6.2 0 .5 0 .4.1.5 0 .5.1.8 0-.1.1 0 .6 0 .5 0 .1 0 0-.2 0-.2.2-.1.6.2.6.1.2-.2.3 0 .2-.2.2 0 .6-.5.6 0 .1.2.1.1.2-.1-.2-.3.3-.4.1 0 0 0 .3-.2.4.2-.1.1.1.2.2h.4v.2c.1-.1 0 0 .2 0-.1.1 0 .3.3.4 0 .1 0 0-.1 0 .3.3.3.6 1 .5 0-.3 0-.4-.4-.6 0 .2 0 .1-.3 0-.2-.2 0-.5-.4-1 0-.2.2 0 0-.2 0-.2.3 0 .3-.2 0 0 0-.4-.2-.2.4-.3-.1-.5 0-.9.2 0 0 .3 0 .3.5-.2.4-.6.7-1 .4.2.3 0 .4-.2.4.3.3-.5.1-.6-.1.1 0 .3-.3 0 0 0 0 .2-.2.1 0 .2.2.1.2.2 0 .6-.5.2-.6 0 0 0 .3 0 .3-.1-.1 0 0-.2-.1-.6v.5c-.2.3-.3-.1-.6-.1 0 .1-.1.2-.2.3l-.4-.2c.5-.5.3-2.3.3-2.8-.1.3-.4-.4-.2-.6-.3.5-.3-.3-.5-.4 0-.1.1-.2.2-.2 0 0-.1-.1-.3-.2v.2c-.1 0-.1-.1-.3-.2.1 0 .4.1.4-.3.1 0 .2.1.2.2.2 0 0-.2 0-.3.2 0 .2.1.3 0 0 .2 0 .1-.2.1.5.4.9.4 1.1.9.2 0 0-.1 0-.2.1.2.8.5.6-.1.1.1.1 0 .2 0v.2c.1-.2.2-.6.3-.8 0-.1-.2 0-.3 0 0 .1.1 0 .2 0 0 .2-.4.1-.4.4-.3-.2.3-.3.2-.7.2 0 .1.1.3.1 0 0 0-.2-.1-.3-.2 0-.4.4-.5 0 .1 0 .1 0 .1.1.2 0 .1-.2 0-.4.2 0 .3.2.4 0 .2.2 0 .4.4.4v-.2c.2 0 0-.2.2-.3 0-.1 0 .1-.2 0 0-.2.2-.1 0-.2.3-.1.4 0 .6-.3 0-.2 0-.5.3-.5-.4 0-.8 0-1 .5-.5.1-.3-.5-.9-.4v-.3h-.1c-.2 0-.5 0-.6-.2 0 0 0 .1-.1.2-.2-.1.2-.2 0-.4-.3 0-.7-.5-.5-.8 0-.1-.3-.1-.3-.4-.1.2-.2 0-.3.2.1.3.2.2.2.5-.2 0-.2-.3-.6-.3.2.3.5.5.8.6-.1.1-.4.1-.4.3.1.2.4.3.5.5h.2q.1.2.2.2c0 .3-.2.1-.3 0 0 .3.1.5.1.7.1 0 0-.2.2-.1 0 .2.2.2.3.3-.1.1-.5-.1-.6-.3v.2s0-.2-.1 0c-.2 0-.2-.1-.5 0 0-.4-.1-.2-.3-.4.3-.1.4.3.4.3.1 0 0 0 0-.2.2.1.2.2.4 0V31c-.1 0-.2.1-.5 0-.3.3-.5 1-.8 1.2 0-.1.3-.4 0-.5.1-.1.1-.4.3-.5 0 0-.2 0-.3-.1.4.5-.8.5-.2.8 0 .1-.2.3 0 .5-.1.1-.2-.1-.4 0l-.2-.1c.1-.1-.2-.2 0-.2 0-.2-.2 0-.5 0-1-.9-2.5-1.5-3.4-2.4-2.1-1.1-4.5-3.3-5.5-6.1 0-.8-.3-1.3-.1-2-.2 0 0-.6-.2-.8h.2c-.4-2.1.5-4.4 1.6-5.6 1.4-1.3 3.4-2 5.4-2.2.1 0 0 .1 0 0 .4.2 1.3 0 1.8 0 0 0 .5.2.6 0v.1c1.6 0 2.7 1 3.6 1.3.1.2.4.5.5.6 2 1.6 3 4 2.5 7.3-.5 0-1.2.2-1.4 0-.5.1-.5 0-1.1 0-.1-.1 0-.4-.3-.3 0-.4.4 0 .2-.6.1.1.2 0 0 0 0 0 .2-.1.3 0v-.3s.3-.1.3 0c.3-.9 0-.9-.3-1.5.3.1 0 0 .1-.1 0 0-.1 0-.2-.1.2 0-.1.6 0 .5.2 0-.1.2-.2 0 .1.2-.1.2 0 .6 0 0 0-.1-.1-.2 0 0 .1.3-.2.2.2.2 0 .2-.1.4.2-.2.2.3 0 0 0 .6.3 1-.1 1.5-.4-.2-.4 0-1 0 0-.9-.1-1.1-.3-1.9h-.2c0-1-.8-.7-1.1-1.6 0 0-.6 0-.6-.4 0 0-.1.1-.3 0-.9-.6-2.5-.5-3.3 0-1.1.8-1.5 2.5-1.1 3.9.2.6.6 1 .8 1.5.8.6 1.2 1.6 2.3 2v.4h.4v.4c.3-.3.9.1.9.5.2 0 .5.1.5.3v-.1c.2.4.9.6 1.2.9-.1.3-.5.2-.4 0-.3.2.1.3.1.4-.1-.1 0 .2-.3.1.3-.2-.3-.1-.3-.5-.3.1-.4.4-.4.8.2 0 .4 0 .3-.3.1 0 .2.1.3 0 0 .2-.1.2-.3.2.1.2.4 0 .4 0v.5h.1c0-.1.2-.5.4-.3 0 .1 0 0-.1 0 0 .3.2.1.2.3 0-.1.3 0 .3-.3 0 0 .2 0 .2.1.1 0 0 0 0-.1.3-.1.6.3.7.5.4 0 .8.8 1.1.8 0 .2.3.2.3.4h.4c-.2.2.2.2.1.4.3-.2.8.6 1.1.8v.4c.2-.3.5.1.6.2 0 .1-.3 0-.4.3.2.2.2-.1.4-.1.6.5.8 1.3 1.1 1.9 0 .4-.2.6-.5.8 0 .1.3 0 .4-.2.5.5.5 2 .2 2.6Zm-6.9-4.9c.2 0 .5.6.1.5.1-.2 0-.2-.1-.5m2.1.1c0 .4.1 0 .4.1 0 .2-.2.3-.2.5l-.2-.2s0 .2-.1.3c0 0 0-.1-.1-.3.2 0 .2-.1.2-.2-.1.4-.1-.2.1-.2Zm.1-.6c-.2 0 0-.3-.3-.3 0-.1.2-.1.2-.3.3 0 .1.3.3.3-.1.3 0-.2-.4-.1 0 .2.3.2.2.4m.9-.3c0 .2 0 .2-.2.2 0 .2.3.1.2.3h-.4c.1.2.1.6.3.6v.7h-.3.1c0-.2-.2-.3.1-.3 0-.2-.2-.1-.4-.2.2-.1 0 0 0-.2.1 0 .2 0 .2-.1-.1-.1-.3-.1-.5-.2 0-.1.2-.1.3 0 .1 0 0-.3.1-.3 0 .1-.4-.3-.2-.3 0-.2-.4-.1-.4-.5h.3c.2 0 .3.3.5.1.3.1-.1.4.2.3Zm-.4 1.4q0 .3-.3.3c-.1-.1.1-.3.3-.3m1.2-3c-.1 0-.2 0-.2-.1-.1 0-.2.2-.2 0-.1 0 .4-.1.4.1m-2.5-3c.3.3.3-.3.4-.6.2.1.3.2.2.5 0 0-.1.1-.2 0 0 .1.1.2 0 .3.2 0 .4 0 .4-.2.2.1.1.3 0 .4-.2-.1-.3 0-.8 0 .1-.2-.2-.1-.2-.4Zm-.2 1.6h.1l-.2-.1c.1-.1.3.1.3.3h-.1Zm-1.8-5.8c.3 0 .1-.2.3-.5.1 0 0 .4.1.3 0 .1 0 0-.1 0 .2 1.1.3 2-.1 3.3-.4-.5 0-1.3 0-1.9 0-.4.1-.8 0-1.2Z"/><path class="st0" d="M107.7 36c-.2-.2-.5 0-.6-.2 0-.1.1 0 .2-.1 0 0-.2 0-.3-.1 0-.2.2-.3.3-.4-.1 0-.3.3-.3.5-.2 0 0-.1-.1-.3.4 0 .1-.4.2-.7-.1 0-.1-.3-.3-.4 0-.1.3.2.2-.1-.2 0-.2.1-.2-.3-.3 0-.2-.4-.5-.2 0 0 .3-.5.2-.8 0-.2-.4 0-.1-.2-.3-.2-.1.5-.5 0-.1.1.2.2.1.4h-.2c.2-.1 0-.2 0-.2-.2.2 0 .4 0 .6-.1 0 0-.1-.3-.1 0 .1.3.1 0 .1.1.1.3.2.4.2 0 .4-.3.5-.1.9.1-.2.2 0 .5 0 0 .2 0 .3.2.4 0 .1-.4 0-.4-.2-.1.3.3.5.4.5-.1 0-.3.2-.4.1 0 .2.2.3.2.1.1.4 0 .6-.2.8-.3 0 0 0-.1-.1-.3.3 0 .8-.3.8v.3c.1.1.3 0 .3.2h.3s0 .3.2.2c-.1.2 0 .5.1.5-.3.5.1.7.1.9.2 0 .3 0 .3-.2.2.2.2.4.4.3v.3c.2 0 .2-.2.2-.3-.2-.1 0-.1 0-.3 0 0-.1-.1-.3-.2 0 0 .2 0 .1-.3.2 0 .2.2.1.3.2 0 .1-.1.2-.2 0-.1-.4-.1-.5-.4 0 .3-.2 0-.3.2 0 0-.1-.5 0-.7 0-.1-.2 0-.3-.3 0 0 .2 0 .1-.2.1 0 0 .2.3.2 0 .4.1.4.1.6.3 0 .3-.6.4-.3.1 0 0-.1 0-.3s-.1 0-.1-.1c-.1 0-.2.1-.2.3-.2-.1.2-.1 0-.4.1.1.2 0 .3 0 0-.2-.4-.2-.3-.5-.3 0 0 .5 0 .4 0 .2-.1.1-.3.3-.1 0 0-.2 0-.4s0 0-.1-.2c-.1 0 0 .2-.3.2h-.1c-.2 0 0-.1 0-.2.2.1.3.1.3-.2.2 0 .1.1.2.1.2 0 .2-.2.2-.4.1.2.2.3.2 0 .2 0 0 .3 0 .3.2-.1.4-.3.5-.5 0 .1-.3 0-.3.2Zm-.9 2.3c-.3 0 0-.3-.3-.4.2-.2.3.3.3.4m0-3.5c.1.1.1.6-.1.5 0-.1.2-.2.1-.5m-.5 1.9c-.3 0-.3 0-.5-.6.2 0 .3.3.3 0 .1 0 .2.4.1.6Zm0-.9c-.2 0 .1-.2 0-.4h.4v.3c-.3-.1-.3 0-.4.2Zm.3.6c-.2 0 0-.4-.1-.7.3.2.1.1.4 0-.2.4.3.2.2.5-.1-.2-.5 0-.5.3Z"/><path class="st0" d="M106.7 38.7c.1.5-.3.3-.3.8.5.2.4-.8.3-.8m.4.8c0 .2 0 .3.1.3s0-.2-.1-.3m-1.5-.3c.1-.2 0-.1 0-.3-.1 0-.2 0-.3.1.2 0 .1.2.2.2Zm-4.4-7.5c0 .3.2.3.3.2v-.3c0 .1-.2.1-.3.1m.9-2.6c0 .2.2.3.3.4 0-.2 0-.4.1-.3 0-.3-.4 0-.4-.2Zm-3.2-3.7c0 .1 0 0-.2 0 0 .3.3.5 0 .6.1-.2.8.4.6-.2-.2.2-.3-.3-.4-.4m3.9 13.6s-.2-.1-.3 0c.1 0 0 .3 0 .5h.1s.1 0 0 0l.1-.2c-.1 0-.1 0 0-.2Zm-6.1-14.7c.2.3.6.4.7.6 0 0 .1-.1 0-.3-.4 0-.5-.4-.8-.3Z"/><path class="st0" d="M102.6 29.5c0-.2.3-.1.2-.4-.2 0-.5.3-.2.4m-2.2 13.1c0 .1 0 .1-.1.2.2 0 0 .3 0 .4.1 0 .2 0 0-.1h.2c-.1-.2 0-.1 0-.4h-.2Zm4.3-11.5c.3 0 .6 0 .6-.2-.3.1-.5-.2-.6.2m-.1 4.1c.4.5.1.3.2.8-.1 0 0-.1-.2-.2v.5h.2v-.5c.1.1.1 0 .3 0 0-.3-.1-.4-.1-.6zm-.2 1.7c.1 0 .2.1.2.1v-.3c-.1 0-.2 0-.2.1Zm.5-1.9c.1 0 0-.2 0-.4 0 .3-.2.1-.4 0 0 .5.2.2.5.3ZM90.2 48H90Zm.4.8v-.2.1Zm.3-1.7s.1 0 0 0h.2-.3Zm-.8 2v.1zm.9-1.9"/><path class="st2" d="M13.8 15v.3c-.2 0-.4 0-.3-.3-.4 0-.1-.1-.3-.1-.1 0 0 .2-.1.4.1 0 .2-.2.3 0-.2.3-.3.6-.4.9.2 0 .1-.2.4-.2 0 .2.2.2.3.4.1-.4.5-1 .2-1.2Z"/><path class="st0" d="M49.8 20.2c-.1 0 0 .4.1.4s0-.3 0-.4h-.2Zm-2.4 4.7c-.3 0-.4.3-.4.5h.4zm.2-.5c-.3-.2-.6 0-.5.3.2 0 .5-.1.5-.3m.7-1.5c.5 0 .6-.6.1-.7-.2.2.1.2.1.4-.2 0-.2.2-.2.3"/><path class="st2" d="M14.3 16.2c-.2.2-.2-.3-.4-.2 0 .3.6.6.4.2m2.3-.7c-.2-.1-.5 0-.5.4.2 0 .4-.2.5-.4"/><path class="st0" d="M48.9 22.1c0-.3.5-.1.6-.3-.3-.2.1-.3.1-.5h-.3c.1-.2.3-.4.3-.6h-.1s0-.1 0 0c0 .2-.3.4-.4.6 0 0-.2-.1-.3 0 0 .2 0 .3-.2.6.2 0 .2.3.3.4Zm.7-2.2c0-.3.3 0 .2.3.2-.1.2-.3.5-.1-.1-.4-.1-.6 0-1-.2-.1-.3 0-.5 0 0 .5-.3.1-.3.4.3.1-.1.3 0 .5Zm1.3-1.4c-.3-.1-.5.2-.3.4 0-.2.2-.2.3-.4m-.8-1.3c0 .1-.2.3-.2.5.2 0 .3-.4.2-.5m40.2 31.3h-.1Zm-.1.6s0 .1 0 0m-.1.2h.1Z"/><path class="st2" d="M13.8 14.4c0 .2-.4.5-.2.8.1-.3.4-.7.2-.8"/><path class="st0" d="M90.1 48H90zm.1 1.3"/><path class="st2" d="M13.5 17.7c0-.1.2-.4 0-.5 0 .1-.2.4 0 .5"/><path class="st0" d="M90.6 48.6c0-.1 0-.1-.2-.2 0 0 .1-.1.2 0Zm0 0"/><path class="st2" d="M13.7 17.1c0-.5-.2-.7-.3-1-.2.4.1.8.3 1"/><path class="st0" d="M98 24.8c0 .1-.1.5 0 .3 0-.2 0 0 .2 0v-.2h-.1Zm-35.1-1.5c0 .1 0 .3.1.4 0-.2.1-.5-.1-.4m14.3 26.2v.1ZM30.3 36c.3-.1.6.1.8-.1-.1.1-.7-.2-.8.1m35.1-15.1c.3.1.3-.4 0-.3 0 .1-.1.1 0 .3M30.8 32.7c-.3 0-.4 0-.6.2v.1c.3 0 .3 0 .5.1v-.4Zm43.3 17.2v.1Zm-3.6-.2v.3zm-5.2-23.1c.1 0 .1.2.2 0 0-.1-.2 0-.2-.1-.1 0-.3.3-.2.3 0-.1.2 0 .1-.3ZM29.8 23c0 .3.1.2.3.2 0-.2-.2-.2-.3-.2m49.7 27.2h.1ZM30.7 23c-.1.1-.3.1-.3.2.1 0 .1.2.3.2 0 0 .1-.4 0-.4m.1 4.1c0-.2 0-.2-.3-.2 0 .2.1.2.3.2m.6 5.9v-.3c-.1 0-.2 0-.3.1.1 0 0 .3.3.2m48 17.2v.1zm-4.8-3.3v-.1Zm-2.8 3v.1Zm-8.9-19.8c.2-.5.5-1.1.3-1.7-.1.5-.5 1-.3 1.7m2.1.8c-.1 0 0-.1 0-.1l-.2.2c.3-.2-.2-.4-.2-.6-.1.3 0 .5.1.7-.1.1-.6.6-.2.5 0 0 .2 0 .3-.1 0-.5-.1-.4.2-.5Zm1-7.7s0-.1 0 0c0 0 0-.2.1-.2-.2 0-.3.2-.2.3Zm-1 8.2s-.1.1-.1 0c-.1.1.1.3.2.4v-.4Zm19.8 8.1v-.2s-.1-.1-.2 0c0 .1 0 .2.2.2M64.7 15.3s.1.3.3.3c0-.2.2-.3 0-.4-.2 0-.2-.8-.6-.8-.2.4-.2.6-.1 1.2.3 0 .2-.2.4-.3m-.7 6.3c0 .3-.4 0-.5 0-.2.1 0 .4 0 .5 0-.2 0-.2.3-.2s.1 1 .6.8c-.2-.3-.1-.7-.1-1-.1 0-.1-.1-.2 0Zm.2 1.8c0-.1.3 0 .3-.2-.1-.2-.5 0-.3.2M62 21.1c0 .2-.2.1-.1.3.2-.1.1 0 .3.1 0-.3.3-.3.3-.5-.2 0-.3.1-.4 0Zm1.4 2.1v-.3h-.2c0 .1 0 .3.2.3m.3-5.1c-.1.1 0 .5.1.6 0-.2 0-.5-.1-.6m-2 7.5c0-.2 0-.4-.2-.4 0 .5 0 .9-.1 1.5.3-.1.2-.5.2-.7h.3c.2.1.4.5.5.8.2-1-.1-1-.2-1.8-.3 0 0 .5-.4.6Zm10.6 21.3v-.1ZM62 28.4c0 .1 0 .4.1.4 0-.1 0-.5-.1-.4m.1-4.6c0 .1-.2 0-.1.3.2 0 .1.1.3.2.2-.2 0-.3-.1-.4Z"/><path class="st0" d="M63.2 22c0 .1-.2.1-.3.2 0 .2.2.1.1.3.3 0 .2-.5.2-.8h-.3v-1c0-.1.1-.3.3-.3s.2 0 .2.2-.3 0-.3.2c.3 0 0 .5.2.6 0-.4.1-.8.4-1 .2.2-.1.6 0 .9 0-.5.3 0 .3-.2-.2-.1.1-.7-.2-.8.3-.3 0-1.5 0-1.5 0 .2-.3.2-.4.2 0 .3 0 1-.3 1.2 0-.2.3-.5 0-.6-.6.6-.2 1.5-.2 2.3h.3Zm.6-2v.3h-.2c-.3 0 .2 0 .1-.3Zm-2.1 4.4h-.2c0 .1 0 .4.3.5v-.2c-.1 0-.3-.1-.2-.3Zm-.5 3.2c0 .2-.2.3 0 .4 0-.2.1-.4 0-.4m.5-3.5c.1-.2-.1-.4.1-.3-.2-.2 0-.2-.1-.4-.1.1-.2.3-.3.5.2 0 0 .2.3.2m4.2-7.8c0-.2-.1-.2 0-.3v-.1c0 .2-.1.4.2.5Zm15.5 31.2v.1Zm3.6-7.9c0 .1 0 .3.2.4.1-.2-.1-.3-.2-.4M36.1 16.8v.6c.3 0 .3-.7 0-.6m1.8 1v.3c.1 0 .1.1.3.1 0-.1 0-.4-.3-.4m-6.5 9.7v.3s-.1 0-.1.1c.2 0 .3-.4 0-.4Zm1-8.3v-.3c-.1 0-.2 0-.2.1.2 0 0 .3.3.2Zm-4.1 16.7c0 .2-.4.1-.6 0v.3c.3 0 .3-.1.6 0 0-.1.1-.3 0-.3M82 46.8v.1zm-.2 2.4h.1Zm3.5-9.7s0-.2.2-.1v.3c.2 0 .2-.2.3-.4h-.5c0 .1-.1.3 0 .2m1.2 1c.1 0 .2 0 .3-.1-.2-.1-.2-.4-.4-.4 0 .2.3.2.1.5m0 1.4c-.2-.4.3-.4.5-.5-.2 0-.6 0-.9.2v.1c.2 0 .2 0 .4.1Zm-1 .3c.3 0 .7-.2.5-.4-.1.1-.4.1-.5 0-.2.2 0 .2.1.4Zm-3.4 7.2v.1Zm-1.2.5v.1Zm-.4-.5v-.2Zm4.6-10.2H85v.1c.1 0 .1.1.2.2v-.3ZM80.6 50s0 .1 0 0m.3.2v.2-.1ZM31.7 32.3c-.1 0-.2-.2-.3 0 0 .3.3.3.3 0m-.5-2.9c0-.2 0-.2.2-.3 0-.1 0-.3-.1-.4 0 .2 0 .6-.3.4v.3c0-.1 0 0 .2 0M81 49.2"/></svg>      `,
      brittas: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 410.9 170.1"><defs><style>.st0{fill:#fff}</style></defs><path class="st0" d="M409.5 11.4c-1.4-.9-3.2-1.6-5.6-2.2-2.3-.6-4.9-1-7.6-1.3s-5.2-.2-7.4.1c-1.2.2-3.6.8-7.3 1.8s-8.5 2.2-14.5 3.7-12.9 3.1-20.9 5c-8 1.8-16.8 3.6-26.4 5.5-7.6 1.5-36.8 6.8-43.3 7.8-1.3-1.4-2.9-2.5-4.9-3.4s-3.7-1.3-5.3-1c-1.7.3-3.3 1.1-4.9 2.6q-2.25 2.1-4.8 5.1c-1.4.2-12 2-15.7 2.6-1.3-1.4-2.9-2.5-4.9-3.4s-3.7-1.3-5.3-1c-1.7.3-3.3 1.1-4.9 2.6-1.6 1.4-3.3 3.2-5 5.3-7.4 1.5-11.3 2.5-11.8 3.3-1.2 1.7 1.4 2.8 7.6 3.1-2.4 4.4-4.4 9.3-6.1 14.6-.4 1.2-.7 2.4-1 3.6-.3.3-.6.7-.9 1-2 2.4-4 4.7-6 6.7-2.1 2.1-4 3.8-5.8 5.3s-3.3 2.6-4.7 3.5c-1.4.8-2.3 1.2-2.7.9-.6-.3-.6-1.3-.1-3.1s1-3.8 1.7-6 1.3-4.4 2-6.5c.7-2.2 1-3.7.9-4.8 0-1-.4-1.9-1-2.6s-1.4-1.2-2.3-1.7c-.9-.4-1.9-.8-3-1q-1.65-.45-3-.6c-1 0-2.1.9-3.1 2.5s-2 3.6-2.9 6c-.7 2-1.3 4-1.8 6.3-.7 1-1.6 2.3-2.8 4-1.6 2.2-3.3 4.5-5.1 6.8s-3.6 4.4-5.3 6.2-3.1 2.8-4.1 3-1.3-.5-.9-2 1-3.3 1.9-5.4 1.7-4.1 2.4-6.2 1-3.6.7-4.6c-.5-1.1-1.2-2-2.3-2.6-1.1-.7-2.3-1.1-3.5-1.4-1.2-.2-2.4-.3-3.5 0-1.1.2-1.7.6-1.9 1.1-.3.5-.9 1-1.8 1.7s-1.8 1.3-2.8 1.9q-1.5.9-3 1.2c-1 .2-1.8.2-2.4-.3 1.7-2.3 2.4-4.4 2.1-6.4s-1.1-3.4-2.4-4.3-3-1-4.9-.4-3.7 2.3-5.3 5.1q-1.2 1.95-1.5 3.6c-2-2.8-4.8-4.9-8.4-6.5s-7.4-2.3-11.4-2c1.9-1.6 4.8-3.8 8.7-6.8 3.8-3 7.9-6.3 12.3-10.1 4.3-3.7 8.6-7.6 12.6-11.7q6.15-6.15 9.9-12c2.5-3.9 3.9-7.5 4-10.8s-1.6-6.1-5.2-8.3c-5.8-3.3-12.9-4.7-21.2-4s-17.4 2.8-27 6.2c-9.7 3.4-19.5 7.9-29.6 13.4S55.5 31.6 46.4 38 29.1 51 21.8 57.6 8.8 70.3 4.7 75.8C1.6 79.5 0 83.3 0 86.9s.5 6.6 1.6 9q1.65 3.6 3.9 5.1c1.5 1 2.4.9 2.7-.2.8-3.9 3.3-8.3 7.3-13.3s9-10.3 15-15.8c6-5.6 12.7-11.2 20.1-16.9 7.5-5.7 15.1-11.2 23-16.5S89.3 28.2 97 23.8c7.8-4.4 15-8.1 21.6-11q9.9-4.35 17.1-6c4.8-1.1 8.3-.9 10.4.6 1.9 1.3 1.6 3.9-.9 7.7q-3.6 5.7-11.1 12.9c-5 4.9-10.7 9.9-17.2 15.3-6.5 5.3-12.8 10.3-19 14.9s-11.8 8.6-16.7 11.9c-5 3.3-8.3 5.4-10 6.1.3-1.9.7-3.9 1.2-6.1.5-2.1.2-3.8-1-5-.5-.4-1.3-.8-2.4-1s-2.3-.4-3.6-.4q-1.95 0-3.6.3c-1.1.2-1.8.6-2.3 1-.5.6-1.1 1.8-1.6 3.4-.6 1.6-1.2 3.6-1.8 5.9-.7 2.3-1.4 4.8-2.1 7.4-.7 2.7-1.6 5.3-2.7 8-.3.3-1.2 1-2.5 2.1-1.3 1-2.8 2.2-4.4 3.5s-3.1 2.6-4.4 3.8c-1.3 1.3-2.1 2.2-2.4 2.9-1 2.5-1.1 4.3-.6 5.3.6 1 1.5 1.5 2.9 1.6 1.3 0 2.8-.2 4.3-.7 1.5-.6 2.8-1.2 3.7-1.9-.2 1.2-.3 2.6-.4 4.1s-.1 3 0 4.4c0 1.4.2 2.8.5 4 .2 1.2.6 2.1 1.1 2.7.2.2.6.6 1.4 1 .7.5 1.5.8 2.4 1.1.8.3 1.6.4 2.4.4.7 0 1.1-.4 1.3-1 1.2-4.5 2.5-9.2 3.8-14.2s2.8-9.6 4.6-13.7c1.2-.6 3.2-1.9 6.1-3.9s6.3-4.2 10.1-6.6 7.8-4.8 11.9-7.2q6.3-3.6 12-5.7c3.9-1.4 7.3-2 10.4-1.9s5.3 1.5 6.7 4.1c1.6 2.8 1.6 6.5 0 11s-4.2 9.4-7.9 14.7-8.3 10.7-13.6 16.3c-5.4 5.6-11.1 11.1-17.3 16.4-6.1 5.3-12.4 10.2-18.7 14.7-6.3 4.4-12.3 8.2-17.9 11.2s-10.6 5-14.9 5.9c-4.4 1-7.6.6-9.8-1.1-2.3-1.7-3.5-4-3.6-7s.2-6.1 1-9.4c.8-3.2 1.7-6.3 2.9-9.1 1.2-2.9 2-5.1 2.5-6.6.4-1.3 0-2.1-1.5-2.5-1.4-.4-3-.4-5-.1-1.9.3-3.8.8-5.5 1.6-1.8.7-2.8 1.6-3.1 2.6-2.6 8.4-3.4 15.3-2.5 20.8s3.2 9.6 6.9 12.5c3.6 2.9 8.5 4.3 14.5 4.4 6 0 12.8-1.1 20.3-3.4 7.5-2.4 15.6-6 24.2-10.9 8.7-4.9 17.5-11 26.5-18.3 2.3-1.8 5-4.2 8-7.2s6.1-6.4 9.1-10.1 5.9-7.6 8.5-11.7 4.7-8.3 6.2-12.6c1.5-4.2 2.2-8.4 2.2-12.4 0-1.6-.2-3.1-.5-4.6.2.2.5.4.7.5 1.7 1 3.9 1.5 6.4 1.6 2.5 0 4.8-.4 7-1.5-.6 2.3-1.2 4.5-1.7 6.5s-.6 3.8-.3 5.5c.2 1.9 1.1 3.5 2.8 4.7s3.5 2.1 5.6 2.7q3.15.75 6 .9c1.9 0 3.3-.2 4.3-.8 2.1-1.3 4.2-3.2 6-5.8 1.9-2.6 3.7-5.2 5.3-8 .4-.7.7-1.3 1.1-1.9.4 1.1 1 2.2 1.7 3.1 1.4 1.7 3.1 3 5 4s3.9 1.6 5.9 1.9 3.6.3 5 0c1-.4 2.3-1.5 4-3.1 1.7-1.7 3.5-3.6 5.4-5.8q2.4-2.85 4.8-6c.2 4 1.2 7.2 3.1 9.7 2.1 2.6 5.7 3.5 10.9 2.6 2.5-.4 5.4-1.9 8.6-4.5s6.2-5.5 9-8.6c1.4-1.6 2.7-3.1 3.9-4.6.2 3.9 1.3 7 3.1 9.3 2.1 2.6 5.7 3.5 10.9 2.6 2.6-.4 5.4-1.9 8.6-4.5s6.2-5.5 9-8.6c.8-.9 1.6-1.8 2.3-2.7 0 .3.2.5.2.8.8 2 2.1 3.6 3.9 4.9s3.7 2.4 5.9 3.1c2.2.8 4.3 1.2 6.4 1.3 2.1 0 3.8-.1 5.2-.6 1.5-.7 2.9-1.8 4.2-3.1 1.4-1.3 2.8-2.7 4.3-4.1 2.4 1.5 5.2 2.4 8.4 2.9 3.1.4 5.5.3 7.1-.3 1.2-.5 2.7-1.7 4.3-3.8s3.3-4.4 4.8-7c1.6-2.6 6.2-10.4 6.8-11.4h.1c2 0 4 0 5.9-.4 1.9-.3 3.6-.6 5.2-.9 1.5-.3 2.5 0 2.9.9.2.9-.1 2.3-1.1 4.2s-2.2 3.8-3.5 5.8c-1.4 1.9-2.8 3.6-4.2 4.9-1.5 1.3-2.5 1.8-3.2 1.3-.4-.3-.4-1 0-2 .5-1 1-2 1.7-3.1s1.4-2.1 2.1-3.2 1.2-1.8 1.5-2.3c1.1-1.6 1.4-2.8.8-3.7-.5-.9-1.8-.7-3.8.6q-1.95 1.2-3.9 3c-1.3 1.2-2.4 2.4-3.4 3.6-1 1.3-1.8 2.5-2.3 3.7-.5 1.3-.8 2.3-.6 3.2.2 1.3.9 2.6 2.1 4.1 1.3 1.5 2.8 2.7 4.5 3.8 1.8 1.1 3.7 1.8 5.9 2.1 2.1.4 4.3.1 6.4-.7 2-.8 4-2.2 6-4.3s3.7-4.4 5.1-6.8 2.5-4.8 3.3-7.3 1-4.5.8-6.2-1-3.1-2.2-4.2c-1.3-1.1-2.9-2-4.8-2.5-2-.5-4.2-.8-6.6-.8s-4.9.4-7.6 1.1q1.35-2.7 3.6-4.8c1.5-1.4 2.1-3 1.9-4.8-.1-.9-.6-1.8-1.4-2.7s-1.7-1.8-2.8-2.5-2.2-1.2-3.4-1.6c-1.2-.3-2.3-.4-3.3-.1-1.5.4-3 1.5-4.4 3q-2.1 2.4-3.3 5.4c-.8 2.1-1.1 4.2-1 6.3s.8 4 2.2 5.5l.1.1q-1.95 2.4-3.9 4.5-3.15 3.45-5.7 6c-1.7 1.7-3.2 3.1-4.4 4.2-1.2 1-2 1.5-2.5 1.3q-.9-.45 0-2.7c.6-1.5 1.3-3.3 2.2-5.2.9-2 1.7-3.9 2.5-5.8s1.1-3.3.9-4.4c0-.9-.4-1.7-1.1-2.4-.8-.7-1.7-1.2-2.7-1.6s-2.2-.7-3.4-.9-2.3-.4-3.4-.5c-1.3 0-2.7 1-4.3 2.8q-.9-1.65-2.7-2.7c-1.2-.7-2.5-1.3-4-1.7-1.4-.5-2.8-.7-4.2-.8-1.4 0-2.5 0-3.4.3-1.4.4-3.2 1.7-5.4 4-2.2 2.4-4.2 5.1-6.1 8.1-.5.8-1 1.6-1.4 2.5l-.3.3c-1 .8-2.9 2.6-5.5 5.3s-5.4 5.5-8.3 8.3-5.6 5.3-8.1 7.4-4.2 3-5.1 2.6c-1-.5-1.3-1.6-1-3.5.3-1.8 1-4 2.2-6.5s2.6-5.3 4.4-8.4c1.8-3 3.6-6 5.5-8.8s3.8-5.4 5.6-7.8 3.4-4.2 4.6-5.5a843 843 0 0 1 31.7-6c10.6-1.8 92.9-14.4 96.8-15.1s6.1-1.4 6.4-1.9c.6-1 .2-2-1.2-2.9ZM291 69.1c.3-1.6 1-3.3 1.8-5.4.9-2 2-4.2 3.2-6.5 1.3-2.3 2.6-4.2 3.9-5.9 1.3-1.6 2.6-2.8 3.8-3.5s2.1-.5 2.8.5c.2 1.3-.2 3.3-1.2 6.1s-2.2 5.5-3.8 8.2q-2.4 4.05-5.1 6.9c-1.9 1.9-3.6 2.6-5.1 2-.7-.2-.8-1-.5-2.6Zm-38.8-27.5c-2.4 4.5-4.4 9.3-6.1 14.6-.5 1.5-.8 2.9-1.2 4.4-1.1 1-2.7 2.5-4.7 4.6-2.6 2.7-5.4 5.5-8.3 8.3s-5.6 5.3-8.1 7.4-4.2 3-5.1 2.6c-1-.5-1.3-1.6-1-3.5.3-1.8 1-4 2.2-6.5s2.6-5.3 4.4-8.4c1.8-3 3.6-6 5.5-8.8s3.8-5.4 5.6-7.8 3.4-4.2 4.6-5.5c4.1-.9 8.4-1.8 12.8-2.6l-.7 1Z"/><path class="st0" d="M191.9 48.1c1.1.5 2.2.8 3.4 1q1.8.3 3 0c.7-.2 1.6-.9 2.6-2q1.5-1.65 2.7-3.6c.8-1.3 1.5-2.7 2.1-4s.8-2.4.6-3.2c0-.7-.4-1.4-1.3-2.2s-1.9-1.6-3.2-2.2-2.6-1-4-1.3q-2.1-.3-3.3 0c-.8.4-1.7 1.1-2.5 2.2s-1.5 2.3-2 3.6c-.6 1.3-1 2.7-1.4 4.1-.3 1.4-.5 2.4-.5 3.2 0 .9.4 1.7 1.1 2.5q1.05 1.05 2.7 1.8Zm-49.3 96.8c-1 0-1.8-.3-2.3-.8-.7-.8-.9-1.8-.9-3.6h-3.3c0 3.1.4 4.6 1.7 5.9 1.1 1.1 2.7 1.6 4.8 1.6 2.2 0 3.8-.7 4.9-1.8 1.3-1.4 1.7-3.3 1.7-6.2 0-4.4-.7-6.4-3.9-7.5l-3.1-1.1c-2.2-.8-2.6-1.6-2.6-4.4s.3-2.6 1-3.4c.5-.5 1.2-.9 2.1-1 1 0 1.8.2 2.2.8.7.8.8 1.8.8 3.3l3.3-.2c0-2.6-.4-4.4-1.8-5.7-1-.9-2.6-1.4-4.6-1.3-1.8.1-3.3.8-4.4 1.9-1.4 1.4-2.1 3.4-2.1 5.8 0 4.2.9 5.7 3.8 6.7l3.1 1.1c2.2.9 2.7 1.8 2.7 5.1s-.2 2.9-.9 3.8c-.5.6-1.2.9-2.4 1ZM313.3 107v37.2l3.3-.1v-25.5l7.1 25.4 3.1-.1V106l-3.3.3v25.8l-7.1-25.3zm-8.7 28.7 1.3 8.6h3.5l-6.4-36.6-3.2.2-6.4 36.6h3.5l1.3-8.7 6.4-.2Zm-3.1-20.7 2.6 16.7-5.2.2zm-140.8 32.3v-25.8l4.6-.3v-3.1l-12.6.9v3.1l4.7-.4v25.7zm183.3-6.5c1.9-3 1.9-7.2 1.9-16.8s0-13.8-1.9-16.6c-1-1.5-2.5-2.5-4.7-2.4l-6.4.5v38.2h6.4c2.2-.2 3.7-1.4 4.7-3Zm-2.5-2.8c-.5.9-1.2 1.5-2.3 1.5h-2.9v-30l2.9-.2c1.1 0 1.9.5 2.3 1.3 1 1.8 1.1 4.8 1.1 13.6s-.1 11.9-1.1 13.7Zm18.8-4.1 1.3 9.3h3.5l-6.4-39.6-3.2.2-6.4 39.6h3.5l1.3-9.4 6.4-.2Zm-3.1-22.4 2.5 18.1-5.1.2zm-174.7 13.8c0-6.6-2.3-8.4-6.5-8.1l-6.2.5v29.4h3.3v-12.8h3c0-.1 3.8 12.6 3.8 12.6h3.5l-4.2-13.5c2.4-1.3 3.3-3.8 3.3-8ZM176 131h-2.9v-10.4l2.9-.2c2.6-.2 3.1 1.9 3.1 5.1s-.6 5.4-3.1 5.5m21.4 8.3 1.3 7.3h3.5l-6.4-30.7-3.2.2-6.4 30.7h3.5l1.3-7.3zm-3.2-17.4 2.6 14.1-5.1.2 2.6-14.2Zm42.6 21.5c1.9-2.5 1.9-6.1 1.9-14.3s0-11.8-1.9-14.1c-1-1.3-2.5-2.1-4.7-2l-6.4.5v32.4h6.4c2.2-.2 3.7-1.2 4.7-2.5m-2.5-2.4c-.5.8-1.2 1.3-2.3 1.3h-2.9v-25.5l2.9-.2c1.1 0 1.9.4 2.3 1.1 1 1.5 1.1 4 1.1 11.6s-.1 10.1-1.1 11.7m-28.2-26v31.4l3.3-.1v-21.6l7.1 21.5 3.1-.1V114l-3.3.3v21.8l-7.1-21.3zm51.2-3.8-3.6.3-4.1 27.4-3.9-26.8-3.7.2 5.9 33.2 3.4-.1zm32.4 7.8c0-7.9-2.3-10.1-6.5-9.7l-6.2.5V145h3.3v-15.3h3c0-.1 3.8 15.1 3.8 15.1h3.5l-4.2-16.2c2.4-1.6 3.3-4.5 3.3-9.5Zm-6.5 6.7h-2.9v-12.4l2.9-.2c2.6-.2 3.1 2.3 3.1 6.1s-.6 6.4-3.1 6.5m-11.5-11.8v-3.8l-10.6.8v34.3l10.6-.2v-3.7l-7.3.1v-11.7l6.3-.3v-3.7l-6.3.3v-11.6zM136.1 154h229.1v4.1H136.1zm0-40.7L365.2 93v-4.8l-229.1 21.7z"/></svg>      `,
      strandkollektivet: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 223.3 47.9"><defs><style>.st0{fill:#fff}</style></defs><path class="st0" d="M13.3 38.4c0 .7-.1 1.3-.2 1.9s-.2 1.3-.4 1.8-.6.9-.9 1.3c-.3.5-.5.9-.9 1.3-.3.4-.5.8-.9 1.1-.3.3-.7.6-1.1.9-.3.2-.8.3-1.1.5-.4.2-.7.5-1 .6 0 0-.1-.1-.2 0l-.2.2c-.4 0-.8-.3-1.2-.7s-.6-.7-.6-1.1.3-1 1-1.3c.4-.1.8-.4 1.2-.8.3-.3.7-.6 1-1.1.2-.4.4-.8.6-1.3.2-.4.2-.9.3-1.3 0-.4.2-.9.2-1.4s0-1.1-.2-1.6c0-.6-.3-1-.5-1.5s-.3-1-.6-1.5-.6-1-1-1.5c-.3-.4-.7-.9-1.1-1.4-.4-.4-.7-1-1.1-1.4s-.9-.8-1.3-1.2c-.4-.5-.6-1-1-1.5s-.9-.9-1.1-1.3-.4-.9-.6-1.4-.2-1-.3-1.5c0-.5-.3-1-.3-1.5s.1-1 .2-1.5c0-.5.3-.9.4-1.4.2-.5.3-1 .5-1.4s.6-.8.9-1.2.5-.8.9-1.1.8-.5 1.2-.7.9-.2 1.4-.3c.4 0 .9-.2 1.4-.2h1.5q.9 0 1.5.3c.5.2.9.5 1.3.9.3.4.6.8.8 1.3.2.4.2 1 .3 1.5v1.5c0 .5 0 .8-.1 1.2v1.3c0 .4-.4.7-.7.9-.4.2-.7.5-1.1.5s-.9-.1-1.2-.3-.5-.6-.5-1.1c0-.6-.2-1.2-.3-1.7-.1-.7-.1-1.3-.3-1.7-.3-.7-.8-1.1-1.5-1.1s-1.1.5-1.5 1.1c-.2.3-.4.8-.5 1.4 0 .4-.2.9-.2 1.4s.2 1.2.3 1.8c.2.6.3 1.2.6 1.7.2.4.6.8.9 1.2s.6.7 1 1.1c.3.3.5.9.8 1.2.6.7 1.2 1 1.5 1.3s.6 1 .9 1.4c.3.5.6.9.9 1.4s.7.9.9 1.4.3 1 .4 1.5.4 1 .5 1.5v1.6Z"/><!-- ... resten av SVG ... --></svg>
      `,
      nisses: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 131.4 60.6"><defs><style>.st0{fill:#1d1d1b}</style></defs><path d="M59.2 52.6c-.5-.3-.6-.7-.4-1.1.2-.3.6-.5 1.1-.2s.6.6.3 1c-.2.4-.6.5-1 .3m4.6 5.7c-.2 0-.8-.3-1.2-.5.4-.9 1.4-3.8 1.5-4.2.2-.6.4-1.1.5-1.6.2-.6.4-1.4.5-1.7.3.1.7.2 1.2.4 1.4.5 2.2 1.8 1.9 2.8-.4 1.1-1 1.4-1.5 1.4.4.5.9 1.2.6 2-.4 1.2-1.7 2.1-3.4 1.5Zm1.3-3.5c-.1.3-.3.9-.5 1.3-.1.4-.2.7-.4 1.1l.3.1c.6.2 1.1-.1 1.4-.9.2-.7 0-1.4-.9-1.6Zm1-3c-.1.3-.6 1.7-.8 2.1.6.3 1.3.2 1.5-.6.2-.7-.1-1.2-.8-1.5Zm7.5 8.8c-1.1 0-2.2-1.6-1.9-4.5.2-2.8 1-3.9 2.7-3.8 1.3.1 2.5 1.1 2.2 4.2s-2 4.1-3 4Zm.6-7c-.6 0-.9.9-1.1 2.6-.2 2 .1 3.1.8 3.2.5 0 1.2-1.3 1.4-2.9.2-2.4-.4-2.9-1.1-2.9m8.7 6.8h-1.4c0-.6-.5-3.9-.7-4.6-.2-1.2-.5-2.7-.6-3.2.4-.2.9-.3 1.2-.3 2-.3 3.5.4 3.9 3 .5 2.9-.8 4.9-2.4 5.1m-1.2-7c.3 1.9.7 4.4 1 5.8h.1c1-.2 1.4-2 1.1-3.7-.4-2.1-1.2-2.2-2.2-2.1m12.7 3.5c-.3 0-.9.3-1.3.5-.8.3-1.6.6-2.1.8-.2-.6-.8-2.1-1.3-3.4-.6-1.5-1.5-3.3-1.8-4 .4-.2 1.1-.6 1.3-.7.4-.2 1.6-.7 2.1-.9 0 .4.2.9.3 1.2-.4.1-1.2.4-1.6.5-.2 0-.4.2-.5.2.3.7.5 1.2.8 1.9.2 0 .5-.2.7-.3.1 0 .8-.4 1.1-.6.1.3.3.7.5 1.1-.4.2-.8.3-1.1.4-.2 0-.5.2-.7.3.2.7.7 1.7 1.1 2.4.2 0 .4-.2.5-.2s1.2-.5 1.7-.7c0 .3.2.8.3 1.2Zm7.9-5.7c-.2.5-.7 1.1-1 1.2-1.3 1-3 .9-4.8-1.6-2.1-2.7-.7-4.2 1-5.7.3.3.5.5.9.8-.1 0-.3.2-.4.3-1 .8-1.8 1.9-.4 3.8 1.2 1.6 2.3 2 3.1 1.3l.1-.1c-.4-.5-1.2-1.5-1.5-1.8-.2.1-.5.3-.6.4-.3-.4-.4-.6-.7-.9.6-.4 1.3-.8 1.8-1.2.4.5 1.5 2.3 2.5 3.5m6.2-5.9c-.4-.2-1.1-.5-1.5-.8s-.1 0-.2-.1c-.2.2-.8 1-.9 1.2.2.3 1 1.1 1.2 1.4-.4.2-.9.5-1.2.7-.3-.4-2.6-3.3-4.4-5.2s-.7-.7-.8-.9c.2-.3.6-.9.7-1.1.4.2 7.1 3.3 7.6 3.5-.2.3-.4.9-.6 1.2Zm-5.6-2.8c.4.5 1.9 2 2.1 2.3.1-.2.5-.7.6-.9-.4-.2-2.2-1.2-2.8-1.4Zm6-4.5c-.3.5-.7.6-1.1.5-.3-.2-.5-.6-.3-1.1s.6-.6 1-.4.5.6.3 1Z" style="fill:#855e21"/><path class="st0" d="M29.5 18c0 .1 0 .4-.1.5-1 3.2-6.9 15-16.3 16.2-6 .7-12.5-2.8-13-7.2C-1.2 17 18.7 2 34.2.1 40.6-.7 45.5 1.6 46.1 7c.3 2.1-.3 5.1-1.6 9.1C52.8 8.5 58.6 2.5 63.9 1.9c2.1-.3 5.9 1.7 6.1 3.5.7 6-12.6 22-11.3 32.3.4 3.4 2.2 4.4 4.2 4.2.2 0 .5 0 .6.3 0 .2-.4.4-.9.5-2.5.3-8.1-1.1-8.7-5.8-1.3-10.8 12-27.8 11.4-32.6 0-.8-.7-1.1-1.6-1-5.1.6-11.9 7.9-20.3 15.9-5.9 13.5-9.7 23.9-14.9 24.5-1.8.2-4.4-.6-4.6-2.3-.3-2.6 5.9-10.9 13.3-19.1 2.6-6.9 4.3-13 3.9-16.6-.4-3.3-1.8-5.2-7-4.6C19.8 2.8 3.2 18 4.6 29.1c.4 3.3 2.6 4.8 5.7 4.4 11.4-1.4 16.9-12.3 18.1-15.1.2-.5.3-.7.6-.8.3 0 .4.2.4.4Zm-3.7 23.7c.9-.1 5.7-6.9 9.3-14.9-5.2 6-10.1 12.9-9.9 14.5s.2.4.6.3Z"/><path class="st0" d="M74.5 20.9c.1 1.1-6.4 9.6-6.1 11.8 0 .7.5.7.8.7 4-.5 10.5-7.5 10.5-7.5s.2-.3.4-.3c.1 0 .3.1.3.2s-.5.6-.6.8c0 0-7.1 7.7-11.3 8.2-1 .1-3.7-.9-3.9-2.8-.3-2.6 4.5-9.6 5.4-12.5.2-.4.4-.9 1.1-1 1.6-.2 3.3 1.2 3.4 2.3Zm5.1-10.7c0 .4-.6 1.8-1.1 2.1-.4.2-1.4.7-2 .9-1.2.5-1.4 1.2-1.8 1.2s-.7-.3-.7-.5c-.2-1.4 1.9-4.6 1.8-6s.2-.5.5-.5c1.2-.2 3.3 1.8 3.4 2.7Z"/><path class="st0" d="M81.4 34.2c-3.3.4-5.8-2.9-6-4.5 0-.4.2-.9.9-1 1.2-.1 3.3.2 6.6-.1.1-.6.2-1.3.1-2-.1-1.2-.3-2.2-.8-3-1.3 1.7-1.8 2.2-2.6 3s-.2.2-.3.2-.3 0-.3-.2.2-.4.5-.7c0 0 .9-.9 2.3-2.9-.4-.7-.9-1.4-1-2.4-.3-2.1 2.6-4.9 4.2-5.1 1-.1 2.8 1.2 2.9 2.1s-3.9 3.1-3.7 4.7c.3 2.5 2.3 2.9 2.9 5.5 1.8-.5 4-1.5 5.7-3.5 0 0 .2-.3.4-.3.1 0 .3.1.3.2s-.4.6-.6.8c-1.7 1.9-3.5 2.8-5.6 3.5.3 2.4-2.8 5.3-5.9 5.7m1.3-4.9c-2.4.1-4.8 0-5.6 0-.2 0-.3 0-.3.3s.8 1.7 2.9 1.5c.8-.1 2.2-.3 3-1.9Z"/><path class="st0" d="M94.7 32.5c-3.3.4-5.8-2.9-6-4.5 0-.4.2-.9.9-1 1.2-.1 3.3.2 6.6-.1.1-.6.2-1.3.1-2-.1-1.2-.3-2.2-.8-3-1.3 1.7-1.8 2.2-2.6 3s-.2.2-.3.2-.3 0-.3-.2.2-.4.5-.7c0 0 .9-.9 2.3-2.9-.4-.7-.9-1.4-1-2.4-.3-2.1 2.6-4.9 4.2-5.1 1-.1 2.8 1.2 2.9 2.1s-3.9 3.1-3.7 4.7c.3 2.5 2.3 2.9 2.9 5.5 1.8-.5 4-1.5 5.7-3.5 0 0 .2-.3.4-.3s.3.1.3.2-.4.6-.6.8c-1.7 1.9-3.5 2.8-5.6 3.5.3 2.4-2.8 5.3-5.9 5.6Zm1.2-4.8c-2.4.1-4.8 0-5.6 0-.2 0-.3 0-.3.3s.8 1.7 2.9 1.5c.8-.1 2.2-.3 3-1.9Z"/><path class="st0" d="M121.6 20.6c.2 0 .3.1.3.2s-.4.6-.6.8c0 0-5.7 7-10.7 7.6-3.4.4-5.7-1.2-6.1-4.2-.6-5.2 4.7-11.4 7.9-11.8 2-.2 3.2 1.7 3.3 2.4.2 1.4-3 4.8-6.4 7.2v2c.2 1.8 1.2 3 2.7 2.8 3.4-.4 9.1-6.8 9.1-6.8s.2-.3.4-.3Zm-7.6-4.7c0-.2-.1-.4-.4-.4-1 .1-2.9 2.1-4.4 6.4 2.5-2.1 4.9-5 4.7-6Z"/><path class="st0" d="M123.8 18.5c-1.4 1.8-2.5 3-2.5 3-.1.1-.2.3-.3.3s-.3 0-.3-.2.2-.4.5-.8c0 0 .9-1 2.3-2.8-.4-.7-1-1.5-1.2-2.4-.3-2.1 2.6-5 4.3-5.2 1.1-.1 2.9 1.2 3 2 0 .8-4 3.2-3.8 4.7.2 2 1.7 2.7 2.5 4.6 2.1 0 3 .6 3.1.8 0 .3-.4.7-.7.7-.2 0-.8-.5-2.1-.7 0 .3.2.5.2.9.3 2.5-2.7 5.3-5.8 5.6-3.4.4-6.4-2-6.6-3.5 0-.5.4-.9 1-1.2 1-.5 4.4-1.7 7.2-2.3v-.6c-.2-1.4-.3-2.2-.8-3Zm-6 7.1c0 .4 1.3.8 3.4.5s3-1.7 3.3-3.4c-3.3.8-5.3 1.9-6.2 2.3-.4.2-.5.4-.5.5ZM29.5 18c0 .1 0 .4-.1.5-1 3.2-6.9 15-16.3 16.2-6 .7-12.5-2.8-13-7.2C-1.2 17 18.7 2 34.2.1 40.6-.7 45.5 1.6 46.1 7c.3 2.1-.3 5.1-1.6 9.1C52.8 8.5 58.6 2.5 63.9 1.9c2.1-.3 5.9 1.7 6.1 3.5.7 6-12.6 22-11.3 32.3.4 3.4 2.2 4.4 4.2 4.2.2 0 .5 0 .6.3 0 .2-.4.4-.9.5-2.5.3-8.1-1.1-8.7-5.8-1.3-10.8 12-27.8 11.4-32.6 0-.8-.7-1.1-1.6-1-5.1.6-11.9 7.9-20.3 15.9-5.9 13.5-9.7 23.9-14.9 24.5-1.8.2-4.4-.6-4.6-2.3-.3-2.6 5.9-10.9 13.3-19.1 2.6-6.9 4.3-13 3.9-16.6-.4-3.3-1.8-5.2-7-4.6C19.8 2.8 3.2 18 4.6 29.1c.4 3.3 2.6 4.8 5.7 4.4 11.4-1.4 16.9-12.3 18.1-15.1.2-.5.3-.7.6-.8.3 0 .4.2.4.4Zm-3.7 23.7c.9-.1 5.7-6.9 9.3-14.9-5.2 6-10.1 12.9-9.9 14.5s.2.4.6.3ZM74 14c0 .2.3.5.7.5.3 0 .6-.7 1.8-1.2.6-.2 1.6-.7 2-.9.5-.3 1.2-1.7 1.1-2.1-.1-.9-2.1-2.9-3.4-2.7-.3 0-.5.5-.5.5.2 1.4-2 4.5-1.8 6Z"/><path class="st0" d="M128.3 21.8c-.8-1.8-2.2-2.6-2.5-4.6-.2-1.6 3.9-4 3.8-4.7 0-.8-1.8-2.2-3-2-1.7.2-4.6 3.1-4.3 5.2.1 1 .7 1.7 1.2 2.4-1.4 1.8-2.3 2.9-2.4 2.9-.3.4-1.7 1.9-3.4 3.4-.1 0-.2 0-.3.1-.5.3-.9.5-1 .9-1.5 1.2-3.1 2.2-4.4 2.3-1.5.2-2.5-1-2.7-2.8 0-.4-.1-1.7 0-2 3.3-2.5 6.5-5.8 6.4-7.2 0-.6-1.3-2.6-3.3-2.4-3 .4-8 6-7.9 11-1.3 1-2.8 1.6-4 2-.6-2.6-2.6-3-2.9-5.5-.2-1.6 3.8-3.8 3.7-4.7s-1.9-2.2-2.9-2.1c-1.6.2-4.4 3-4.2 5.1.1 1 .6 1.7 1 2.4-1.2 1.7-2 2.6-2.2 2.8v.1c-1.7 1.9-3.9 2.9-5.6 3.4-.6-2.6-2.6-3-2.9-5.5-.2-1.6 3.8-3.8 3.7-4.7s-1.9-2.2-2.9-2.1c-1.6.2-4.4 3-4.2 5.1.1 1 .6 1.7 1 2.4-1.3 1.9-2.3 2.9-2.3 2.9-.2.2-1.3 1.4-2.7 2.7h-.5c-.8 0-1 .6-.9 1v.2c-2 1.7-4.4 3.3-6.3 3.6-.3 0-.7 0-.8-.7-.3-2.2 6.3-10.7 6.1-11.8-.1-1.1-1.9-2.5-3.4-2.3-.7 0-1 .6-1.1 1-.9 2.9-5.7 9.9-5.4 12.5.2 1.9 2.9 2.9 3.9 2.8 2.1-.3 5-2.3 7.3-4.3.7 1.7 3 4 5.8 3.6 3.1-.4 6.2-3.3 5.9-5.7.5-.1.9-.3 1.3-.5.2 1.6 2.7 4.9 6 4.5 3.1-.4 6.2-3.3 5.9-5.6 1.4-.4 2.7-1 3.9-1.9.4 3 2.7 4.6 6.1 4.2 2-.2 4.2-1.6 6-3 .7 1.5 3.4 3.3 6.4 2.9 3.1-.4 6.1-3.1 5.8-5.6 0-.3-.1-.6-.2-.9 1.3.3 1.9.8 2.1.7.3 0 .7-.4.7-.7 0-.2-.9-.8-3.1-.8Zm-48.6 9.4c-2.1.3-2.8-1.2-2.9-1.5 0-.2 0-.3.3-.3h5.6c-.8 1.6-2.2 1.8-3 1.9Zm3.2-2.6c-2.2.2-4 .1-5.2 0l2-2c.1-.1.3-.4.5-.5.5-.6 1.1-1.2 2.1-2.5.4.8.6 1.7.8 3 0 .8 0 1.4-.1 2Zm10 1c-2.1.3-2.8-1.2-2.9-1.5 0-.2 0-.3.3-.3h5.6c-.8 1.6-2.2 1.8-3 1.9Zm3.3-2.6c-2.5.2-4.3 0-5.5 0 .8-.5 1.6-1.2 2.3-2l.1-.1c.7-.8 1.2-1.3 2.5-2.9.4.8.6 1.7.8 3 0 .8 0 1.4-.1 2Zm17.4-11.5c.3 0 .4.2.4.4.1 1-2.2 4-4.7 6 1.5-4.3 3.4-6.3 4.4-6.4Zm7.6 10.6c-2.1.3-3.4-.1-3.4-.5 0-.2 0-.3.5-.5 1-.5 3-1.6 6.2-2.3-.3 1.7-1.1 3.1-3.3 3.4Zm3.4-4c-1.7.4-3.7 1-5.2 1.5 1.2-1.2 1.9-2.1 1.9-2.1s.1-.2.2-.3c.4-.5 1.3-1.5 2.3-2.7.4.8.6 1.5.8 3z"/></svg>      `,
      johns: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.3 53.8"><path d="M82.3 29.7H60c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9m-6.9 21.2-1.1-3.3H68l-1.1 3.3H62l6.8-18.2h4.8l6.8 18.2h-4.9ZM23.2 0H.9C.4 0 0 .4 0 .9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9m-5.5 15.2c0 4.1-2.1 6.1-6.4 6.1s-6.4-2.8-6.4-6.8v-.8h4.5v1.7c0 1.2.7 1.9 1.8 1.9s1.7-.6 1.7-2.4V2.8h4.7v12.4Zm53.4 22.5L69 44.1h4.1zM41.6 6.6c-3.1 0-4.2 2.7-4.2 5.4s1.2 5.4 4.2 5.4 4.2-2.7 4.2-5.4-1.2-5.4-4.2-5.4M82.3 0H60c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9M79 21.2h-4.7v-7.5h-6.2v7.5h-4.7V3h4.7v6.6h6.2V3H79zm-26.2 8.5H30.5c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9m-4.6 21.2H35V32.7h4.7v14.1h8.5zM52.8 0H30.5c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9M41.6 21.5c-5.7 0-9-4.2-9-9.5s3.2-9.5 9-9.5 9 4.2 9 9.5-3.2 9.5-9 9.5m99.8 8.2h-22.3c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9m-3.7 21.2h-14.8V32.7h14.5v3.8h-9.8v3.2h8.9v3.7h-8.9v3.5h10V51ZM111.9 0H89.6c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9m-3.3 21.2h-4.9L97.4 9.9v11.3h-4.5V3h4.9l6.3 11.2V3h4.5zM12.4 36.4H9.2v4.7h3.2c1.5 0 2.5-.6 2.5-2.3s-1.1-2.4-2.5-2.4m10.8-6.7H.9c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9M13.1 44.8H9.2v6.1H4.5V32.7h8.6c3.4 0 6.6 1.6 6.6 5.9s-2.6 6.3-6.6 6.3Zm98.8-15.1H89.6c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9M101 47.2c2.2 0 3.5-1.3 3.7-3.4h4.7c-.3 4.7-3.7 7.4-8.3 7.4S92 47 92 41.7s3.6-9.5 9.1-9.5 8.2 2.5 8.3 6.9h-4.7c-.3-1.8-1.7-2.8-3.7-2.8-3.1 0-4.2 2.7-4.2 5.4s1.2 5.4 4.2 5.4ZM141.4 0h-22.3c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9m-11.1 21.5c-4.2 0-7.9-1.8-7.9-6.5h4.7c.1 2.1 1.4 2.8 3.4 2.8s2.9-.5 2.9-1.9-2.6-1.9-5.2-2.7c-2.6-.7-5.3-1.9-5.3-5.2s4-5.5 7.4-5.5 7.3 1.8 7.3 5.9h-4.7c0-1.7-1.5-2.2-2.9-2.2s-2.3.4-2.3 1.6 2.6 1.7 5.3 2.4c2.6.7 5.3 2 5.3 5.3s-3.9 6.1-7.9 6.1Z" style="fill:#fff"/></svg>      `
    };

const sektion73Pins = [
  // HOME (Surbrunnsvägen 2–8)
  {
    id: "sektion73Pin_home_0000",
    label: "Boendet",
    iconKey: "as",
    ui: {
      bubbleBg: "rgba(255,255,255,.92)",
      pointerTop: "rgba(255,255,255,.92)"
    },
    lngLat: sektion73Home.lngLat,
    modal: {
      kicker: "HOME",
      title: "Surbrunnsvägen 2–8",
      images: [
        "https://picsum.photos/seed/sektion73_home_0/1400/800",
        "https://picsum.photos/seed/sektion73_home_1/700/525",
        "https://picsum.photos/seed/sektion73_home_2/700/525",
        "https://picsum.photos/seed/sektion73_home_3/700/525"
      ],
      imgSrc: "Bildkälla: —",
      h: "Surbrunnsvägen 2–8",
      p: "Boendet i Apelviken.",
      cta1Text: "CTA 1",
      cta1Href: "",
      cta2Text: "Visa vägen",
      cta2Href:
        "https://www.google.com/maps/search/?api=1&query=Surbrunnsv%C3%A4gen%202-8%2C%20432%2053%20Varberg"
    }
  },

  // Tångkörarvägen 1
  {
    id: "sektion73Pin_tangkorar1_0000",
    label: "Tångkörarvägen 1",
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
        "https://picsum.photos/seed/sektion73_t1_0/1400/800",
        "https://picsum.photos/seed/sektion73_t1_1/700/525",
        "https://picsum.photos/seed/sektion73_t1_2/700/525",
        "https://picsum.photos/seed/sektion73_t1_3/700/525"
      ],
      imgSrc: "Bildkälla: —",
      h: "Precis vid havet",
      p: "Allra närmast stranden och med en bedårande utsikt över Kattegatt och folklivet i viken. På Solviken samlas campinggäster och varbergsbor, flanörer längs strandpromenaden och de som tagit en cykeltur från Läjet. Sommaren fylls av god mat, dofter från grillen, quiz och trubadurer. Höstkvällar med värme och gemyt och en svart vattenyta så långt man ser.Som utomlands hemma. För den stora festen och för den som bara har vägen förbi. För dig som släpar med dig en hel hög goda kamrater och för dig som träffar dem här.",
      cta1Text: "Visa meny",
      cta1Href: "https://www.apelviken.se/solviken-meny",
      cta2Text: "Vägbeskrivning",
      cta2Href:
        "https://www.google.com/maps/dir/57.502272,12.087438/Solviken,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+1,+432+54+Varberg/@57.2950696,11.8317533,75989m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502af989b79f2d:0xfb2919c395412c94!2m2!1d12.2488569!2d57.084622?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },

  // Dina befintliga pins (oförändrade)
  {
    id: "sektion73Pin_tangkorar_0001",
    label: "Punkt 1",
    iconKey: "johns",
    ui: { bubbleBg: "#20212B", pointerTop: "#20212B" },
    lngLat: sektion73Tangkorar_4.lngLat,
    modal: {
      kicker: "PUNKT 1",
      title: "Tångkörarvägen 4",
      images: [
        "https://picsum.photos/seed/sektion73_p1_0/1400/800",
        "https://picsum.photos/seed/sektion73_p1_1/700/525",
        "https://picsum.photos/seed/sektion73_p1_2/700/525",
        "https://picsum.photos/seed/sektion73_p1_3/700/525"
      ],
      imgSrc: "Bildkälla: —",
      h: "A place by the sea",
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
    iconKey: "nisses",
    ui: { bubbleBg: "#A7A49D", pointerTop: "#A7A49D" },
    lngLat: sektion73Sanatorie_4.lngLat,
    modal: {
      kicker: "PUNKT 2",
      title: "Sanatorievägen 4",
      images: [
        "https://picsum.photos/seed/sektion73_p2_0/1400/800",
        "https://picsum.photos/seed/sektion73_p2_1/700/525",
        "https://picsum.photos/seed/sektion73_p2_2/700/525",
        "https://picsum.photos/seed/sektion73_p2_3/700/525"
      ],
      imgSrc: "Bildkälla: —",
      h: "Härligt okomplicerat",
      p: "Kort sagt, en okomplicerad restaurang vid poolkanten. För alla, lika mycket för campinggäster och för dig som bor i Varberg, som kvällsflanörer utmed strandpromenaden. För dig som söker svalka i en välhumlad pilsner eller härlig sangria och när du tröttnat på poolplask långt före barnen. Och för frukost, hemlagad, rejäl streetfood. Du slinker in lite som du är; badtofflor, shorts och håret fortfarande vått efter badet eller kostym om du föredrar det. En samlingsplats i hjärtat av campingplatsen där du tar en kaffe, läser tidningen eller bara kollar folk en stund.",
      cta1Text: "Visa meny",
      cta1Href: "https://www.apelviken.se/nisses-bodega",
      cta2Text: "Visa vägen",
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Nisses+Bodega,+Sanatoriev%C3%A4gen+4,+432+53+Varberg/@57.2983075,11.831503,75983m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x4653ede147d2886f:0xfee8375fc04e0d5f!2m2!1d12.2478293!2d57.0854771?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_tangkorar_0003",
    label: "Punkt 3",
    iconKey: "brittas",
    ui: { bubbleBg: "#1D252C", pointerTop: "#1D252C" },
    lngLat: sektion73Tangkorar_2.lngLat,
    modal: {
      kicker: "PUNKT 3",
      title: "Tångkörarvägen 2",
      images: [
        "https://picsum.photos/seed/sektion73_p3_0/1400/800",
        "https://picsum.photos/seed/sektion73_p3_1/700/525",
        "https://picsum.photos/seed/sektion73_p3_2/700/525",
        "https://picsum.photos/seed/sektion73_p3_3/700/525"
      ],
      imgSrc: "Bildkälla: —",
      h: "Rubrik",
      p: "Brödtext…",
      cta1Text: "Läs mer",
      cta1Href: "https://brittas.se/",
      cta2Text: "Vägbeskrivning",
      cta2Href: "https://www.google.com/maps/dir/57.502272,12.087438/Brittas+Strandveranda,+T%C3%A5ngk%C3%B6rarv%C3%A4gen+2,+432+54+Varberg/@57.1433862,12.1356372,21761m/data=!3m1!1e3!4m9!4m8!1m1!4e1!1m5!1m1!1s0x46502afeb21e2233:0x2d47a8d67dec7ee4!2m2!1d12.2552089!2d57.084749?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D"
    }
  },
  {
    id: "sektion73Pin_tangkorar_0004",
    label: "Punkt 4",
    iconKey: "olles",
    ui: { bubbleBg: "#222222", pointerTop: "#222222" },
    lngLat: sektion73Tangkorar_10.lngLat,
    modal: {
      kicker: "PUNKT 4",
      title: "Tångkörarvägen 10",
      images: [
        "https://picsum.photos/seed/sektion73_p4_0/1400/800",
        "https://picsum.photos/seed/sektion73_p4_1/700/525",
        "https://picsum.photos/seed/sektion73_p4_2/700/525",
        "https://picsum.photos/seed/sektion73_p4_3/700/525"
      ],
      imgSrc: "Bildkälla: —",
      h: "Längst söderut i Apelviken",
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
    iconKey: "strandkollektivet",
    ui: { bubbleBg: "#A5B99A", pointerTop: "#A5B99A" },
    lngLat: sektion73Tangkorar_17.lngLat,
    modal: {
      kicker: "PUNKT 5",
      title: "Tångkörarvägen 17",
      images: [
        "https://picsum.photos/seed/sektion73_p5_0/1400/800",
        "https://picsum.photos/seed/sektion73_p5_1/700/525",
        "https://picsum.photos/seed/sektion73_p5_2/700/525",
        "https://picsum.photos/seed/sektion73_p5_3/700/525"
      ],
      imgSrc: "Bildkälla: —",
      h: "Rubrik",
      p: "Brödtext…",
      cta1Text: "CTA 1",
      cta1Href: "",
      cta2Text: "Visa vägen",
      cta2Href: "https://www.google.com/maps/search/?api=1&query=T%C3%A5ngk%C3%B6rarv%C3%A4gen%2017%2C%20432%2054%20Varberg"
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

