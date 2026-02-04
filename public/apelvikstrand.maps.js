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

    const sektion73StyleUrl = "mapbox://styles/rutgersson/cml5ejbz8000r01qx4ba1dwmn";

    // Home: Surbrunnsvägen 2–8, 432 53 Varberg
    const sektion73Home = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.262921, 57.081185]
    };
         const sektion73Golf = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.248763, 57.084963]
    };
             const sektion73Surfcenter = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.263720, 57.079943]
    };
                  const sektion73Majas = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.263265, 57.080060]
    };
         const sektion73Kusthotellet = {
      title: "Kusthotellet",
      lngLat: [12.242833, 57.088610]
    };
    // Tångkörarvägen 1, 432 54 Varberg (koordinater från karta-länk)
    const sektion73surfcenter = {
      title: "Tångkörarvägen 1",
      lngLat: [12.250144, 57.084689]
    };
    // Tångkörarvägen 1, 432 54 Varberg (koordinater från karta-länk)
    const sektion73Tangkorar = {
      title: "Tångkörarvägen 1",
      lngLat: [12.2488165, 57.084682]
    };
         const sektion73livs = {
      title: "Apelviken livs",
      lngLat: [12.250247, 57.084998]
    };
              const sektion73InitialCenter = {
      title: "Apelviken livs",
      lngLat: [12.255780, 57.085314]
    };
                   const sektion73apelviken = {
      title: "Apelviken livs",
      lngLat: [12.249075, 57.086676]
    };
              const sektion73minigolf = {
      title: "Tångkörarvägen 1",
      lngLat: [12.250167, 57.084695]
    };
  // 2) Sanatorievägen 4, 432 53 Varberg
    const sektion73Sanatorie_4 = {
      title: "Sanatorievägen 4",
      lngLat: [12.24786400, 57.08797000]
    };
const sektion73Tangkorar_4 = {
  title: "Tångkörarvägen 4",
  lngLat: [12.258103, 57.083380]
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
    const sektion73MaxZoom = 17.9;
    const sektion73StartZoom = 14.5;
const sektion73SecondaryPinsMinZoom = 15.8;
    // Kamera
    const sektion73Pitch = 60;

    // Visa "från havet in mot land" (väst -> öst):
    // bearing 90 = öst uppåt i bild (kameran tittar mot öst med pitch)
    const sektion73Bearing = 45;

    const sektion73DisableRotate = true;

    // Zoom vid pin-klick
    const sektion73PinZoom = 24.15;
    const sektion73PinZoomDur = 950;

    // Mol animation
    const sektion73ModalDurMs = 420;

    /* =========================
       MAP INIT
       ========================= */
const sektion73Map = new mapboxgl.Map({
  container: sektion73Canvas,
  style: sektion73StyleUrl,

center: sektion73InitialCenter.lngLat,

  zoom: sektion73StartZoom,
  maxBounds: sektion73Bounds,

  attributionControl: false,
  antialias: false,

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


    // Exponera map-instansen för devtools/snabbtest (som du gjort i console)
    window.sektion73Map = sektion73Map;

    sektion73Map.on("error", (e) => {
      console.error("Mapbox error:", e && e.error ? e.error : e);
    });

    sektion73Map.setMinZoom(sektion73MinZoom);
    sektion73Map.setMaxZoom(sektion73MaxZoom);

    // Tillåt scroll-zoom (in/ut med mus-hjul / trackpad)
    sektion73Map.scrollZoom.enable();

    // Behåll dubbelklick-zoom avstängt (som du haft)
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

 sektion73Map.on("style.load", () => {
  sektion73Map.setPitch(sektion73Pitch);
  sektion73Map.setBearing(sektion73Bearing);

  if (sektion73HasImportsStyle()) {
    sektion73ForceStandardConfig();
  }

sektion73Map.on("style.load", () => {
  sektion73Map.setPitch(sektion73Pitch);
  sektion73Map.setBearing(sektion73Bearing);

  // Studio ska äga theme/light/labels/3D-lagers styling.
  // Låt JS bara styra UX (pins, modaler, filter, camera moves).
});

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
        const style = sektion73Map.getStyle && sektion73Map.getStyle();
        const layers = (style && style.layers) ? style.layers : [];
        return layers
          .filter((l) => l && l.id && l.type === "fill-extrusion")
          .map((l) => l.id);
      } catch (e) {
        return [];
      }
    }

    function sektion73PickSimplifyProps_00011(props) {
      const p = props || {};
      const keep = [
        "id",
        "osm_id",
        "name",
        "type",
        "class",
        "height",
        "render_height",
        "min_height",
        "render_min_height",
        "underground",
        "extrude"
      ];
      const out = {};
      for (const k of keep) {
        if (p[k] != null) out[k] = p[k];
      }
      return out;
    }

    function sektion73RankBuildingCandidates_00012(features) {
      const scored = [];
      for (const f of features || []) {
        if (!f || !f.layer) continue;

        const props = f.properties || {};
        const layerId = (f.layer.id || "");
        const layerType = (f.layer.type || "");
        const sourceLayer = (f.sourceLayer || "");
        const source = (f.source || "");

        let score = 0;

        if (layerType === "fill-extrusion") score += 100;
        if ((sourceLayer + "").toLowerCase().includes("building")) score += 40;
        if (layerId.toLowerCase().includes("building")) score += 30;

        if (props.height != null) score += 25;
        if (props.render_height != null) score += 25;
        if (props.min_height != null) score += 10;
        if (props.render_min_height != null) score += 10;
        if (props.underground != null) score += 5;
        if (props.class === "building") score += 15;
        if (props.extrude != null) score += 5;

        if (f.id != null) score += 20;
        if (props.id != null) score += 10;
        if (props.osm_id != null) score += 10;

        if ((source + "").toLowerCase() === "composite") score += 5;

        scored.push({ f, score });
      }

      scored.sort((a, b) => b.score - a.score);
      return scored;
    }

    function sektion73OnPick_00013(e) {
      const extrusionLayerIds = sektion73GetExtrusionLayerIds_00010();

      let feats = [];
      try {
        if (extrusionLayerIds.length) {
          feats = sektion73Map.queryRenderedFeatures(e.point, { layers: extrusionLayerIds }) || [];
        }
      } catch (_) {}

      if (!feats.length) {
        try {
          feats = sektion73Map.queryRenderedFeatures(e.point) || [];
        } catch (_) {}
      }

      const ranked = sektion73RankBuildingCandidates_00012(feats);

      console.clear();
      console.log("sektion73Pick: click lngLat =", e.lngLat);
      console.log("sektion73Pick: extrusion layer ids =", extrusionLayerIds);

      if (!ranked.length) {
        console.log("sektion73Pick: inga features vid klick. Zooma in lite och klicka mer exakt på taket.");
        return;
      }

      const rows = ranked.slice(0, 12).map((x, i) => {
        const f = x.f;
        return {
          rank: i + 1,
          score: x.score,
          layerId: (f.layer && f.layer.id) ? f.layer.id : "",
          layerType: (f.layer && f.layer.type) ? f.layer.type : "",
          source: f.source || "",
          sourceLayer: f.sourceLayer || "",
          featureId: (f.id != null) ? f.id : null,
          props: sektion73PickSimplifyProps_00011(f.properties || {})
        };
      });

      console.table(rows);

      const best = ranked[0].f;
      console.log("sektion73Pick: BEST CANDIDATE (copy these):");
      console.log({
        layerId: best.layer ? best.layer.id : null,
        featureId: best.id != null ? best.id : null,
        source: best.source || null,
        sourceLayer: best.sourceLayer || null,
        properties: best.properties || null
      });
    }

    if (!sektion73Map.__sektion73DebugPickBuildingBound_00014) {
      sektion73Map.__sektion73DebugPickBuildingBound_00014 = true;
      sektion73Map.on("click", sektion73OnPick_00013);
      console.log("sektion73Pick: aktiv. Klicka på huset du vill ersätta så loggas kandidater.");
    }
  })();
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

#sektion73MapCanvas .sektion73PinWrap .sektion73PinBubble,
#sektion73MapCanvas .sektion73PinWrap .sektion73PinBtn{
  transition: transform 140ms ease, box-shadow 140ms ease;
  will-change: transform;
}

/* Hover på hela pinnen (wrap) */
#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinBubble,
#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinBtn{
  transform: scale(1.15) !important;
}
#sektion73MapCanvas .sektion73PinWrap:active .sektion73PinBubble,
#sektion73MapCanvas .sektion73PinWrap:active .sektion73PinBtn{
  transform: scale(1) !important;
}

    #sektion73MapOverlay{
      position:fixed;
      inset:0;
      background:rgba(0,0,0,.55);
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
    padding-bottom: 32px;
    gap: 0px;
    overscroll-behavior: contain;
    border-radius: 20px 0px 0px 20px;
    overflow: auto;
}
    #sektion73MapModal.is-open{
      transform:translateX(0);
    }

@media (max-width: 768px){
.sektion73ModalGallery {
        display: flex !important;
        flex-direction: row;
        padding: 0px;
        overflow-x: auto;
        overflow-y: hidden;
        -webkit-overflow-scrolling: touch;
        overscroll-behavior-x: contain;
        scrollbar-width: none;
        touch-action: pan-x;
        scroll-snap-type: none !important;
        scroll-behavior: auto !important;
    }
    .sektion73ModalBodyP {
    font-size: 15px !important;
}
.sektion73ModalBodyH {
    font-size: 31px !important;
}
    .sektion73ModalMeta {
    padding: 26px 26px 0px !important;
}
.sektion73ModalActions {
    margin-top: 25px !important;
    padding: 0px 26px !important;
}
  .sektion73ModalGallery::-webkit-scrollbar{ display:none; }
#sektion73MapModal.is-open {
    transform: translateY(0);
}
#sektion73MapModal {
    position: fixed;
    right: 0;
    bottom: 0;
    height: 95vh;
    width: 100%;
    background: var(--sektion73-modal-bg);
    color: var(--sektion73-modal-text);
    border: none;
    transform: translateY(104%);
    transition: transform var(--sektion73-modal-dur) var(--sektion73-modal-ease);
    z-index: 2147483001;
    display: flex;
    flex-direction: column;
    padding-bottom: 32px;
    gap: 0px;
    overscroll-behavior: contain;
    border-radius: 20px 20px 0px 0px;
    overflow: auto;
            top: auto;
}
  /* Låt thumbnails “försvinna” som grid-rad och istället bli cards i samma rad */
  .sektion73ModalGalleryRow{
    display: contents !important;
  }

  /* Alla bilder blir cards med “peek” av nästa under swipe */
  .sektion73ModalGalleryTop,
  .sektion73ModalThumb{
    flex: 0 0 auto;
    width: 82vw;
    max-width: 350px;
    aspect-ratio: 1.67778 / 1;
    border-radius: 16px;
    overflow: hidden;
    border: none;

    /* säkerställ att inget snap smyger in */
    scroll-snap-align: none !important;
  }

  /* Säkerställ att thumbs inte har en annan ratio på mobil */
  .sektion73ModalThumb{
    aspect-ratio: 1.57778 / 1 !important;
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
    width: 34px;
    height: 34px;
    border-radius: 80px;
    border: none;
    background: rgba(250, 250, 250, 0.72);
    cursor: pointer;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    position: absolute;
    top: 18px;
    right: 18px;
    backdrop-filter: blur(24px) saturate(1.6);
    -webkit-backdrop-filter: blur(24px) saturate(1.6);
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
    border: none;
}
@keyframes shimmer {
    0% {
        background-position: -468px 0;
    }
    100% {
        background-position: 468px 0;
    }
}

.skeleton-loader {
    background-color: #f1f3f4;
    background-image: linear-gradient(90deg, 
        rgba(255,255,255,0) 0, 
        rgba(255,255,255,0.4) 50%, 
        rgba(255,255,255,0) 100%
    );
    background-size: 600px 100%;
    background-repeat: no-repeat;
    animation: shimmer 1.5s infinite linear;
}

.skeleton-loader:not([src]) {
    min-height: 100%;
    min-width: 100%;
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
.sektion73ModalThumb {
    aspect-ratio: 1.27778 / 1;
    border-radius: 0px;
    overflow: hidden;
    border: none;
    object-fit: cover;
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
.sektion73ModalImgSrc {
    display: none;
}
.sektion73ModalBodyH {
    font-family: "Manrope", Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    line-height: 1.25em;
    font-weight: 700;
    font-size: 35px;
}
.sektion73ModalBodyP {
    color: rgb(64, 61, 59);
    margin: 0;
    font-family: 'Inter Variablefont Opsz Wght';
    font-weight: 400;
    font-size: 16px;
    line-height: 1.55em;
    margin-top: 13px;
}

.sektion73ModalActions {
    margin-top: 27px;
    display: flex;
    padding: 0px 32px;
    flex-direction: row;
    gap: 12px;
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
    .sektion73ModalBtnPrimary{
      background:var(--sektion73-accent);
    }
         .sektion73ModalBtnPrimary:hover{
      background:#d89f00;
    }
                 .sektion73ModalBtnPrimary:active{
      background:#a67b02;
    }
            [id="sektion73ModalCtaSecondary"] {
background: #FFE6A3;
color: #5A3C00;
border: none;
}

[id="sektion73ModalCtaSecondary"]:hover {
background: #FFD870;
}

[id="sektion73ModalCtaSecondary"]:active {
background: #FFD157;
}
.sektion73ModalBtn svg {
display: none;
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

/* Mono-loggor: gör så att paths ärver färg från currentColor */
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="solviken"] .sektion73PinIco svg,
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="brittas"] .sektion73PinIco svg,
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="strandkollektivet"] .sektion73PinIco svg{
fill: currentColor;
}
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="solviken"] .sektion73PinIco svg *,
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="brittas"] .sektion73PinIco svg *,
#sektion73MapCanvas .sektion73PinWrap[data-icon-key="strandkollektivet"] .sektion73PinIco svg *{
fill: currentColor !important;
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
  position: relative;
  z-index: 1;
}

#sektion73MapCanvas .sektion73PinWrap:hover,
#sektion73MapCanvas .sektion73PinWrap:focus-within {
  z-index: 9999;
}
  .sektion73PinBubble{
  padding:9px 11px;
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
  border-left:5px solid transparent;
  border-right:5px solid transparent;
  border-top:5px solid var(--sektion73-pin-pointer-top, rgba(255,255,255,.92));
  filter: drop-shadow(0 6px 8px rgba(0,0,0,.18));
  pointer-events: none;
}

.sektion73PinBtn {
  all: unset;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--sektion73-pin-bubble-bg, rgba(255, 255, 255, .92));
  height: max-content;
  padding: 7px;
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
 <svg fill="currentcolor" height="21" viewBox="0 0 1000 1000" width="21" xmlns="http://www.w3.org/2000/svg"><path d="M159 204l55-54 659 659-55 55-659-660m709 5L205 877l-55-59 664-664"></path></svg>
            </button>
          </div>

        <div class="sektion73ModalGallery">
    <div class="sektion73ModalGalleryTop">
        <img id="sektion73ModalImg0" alt="" loading="lazy" class="skeleton-loader">
    </div>
    <div class="sektion73ModalGalleryRow">
        <div class="sektion73ModalThumb"><img id="sektion73ModalImg1" alt="" loading="lazy" class="skeleton-loader"></div>
        <div class="sektion73ModalThumb"><img id="sektion73ModalImg2" alt="" loading="lazy" class="skeleton-loader"></div>
        <div class="sektion73ModalThumb"><img id="sektion73ModalImg3" alt="" loading="lazy" class="skeleton-loader"></div>
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

// Dynamiskt sparad vy (användarens senaste läge)
let sektion73ReturnView = null;

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

  // NYTT: säkerställ att första öppningen alltid får transition
  // (speciellt när DOM + CSS kan ha skapats precis innan).
  overlay.classList.remove("is-open");
  modal.classList.remove("is-open");

  // Force layout så browsern “registrerar” stängt-läget innan vi öppnar.
  void modal.offsetWidth;

  document.body.classList.add("sektion73-modal-open");

  requestAnimationFrame(() => {
    overlay.classList.add("is-open");
    modal.classList.add("is-open");
  });

  sektion73ModalOpen = true;
}


function sektion73CloseModal() {
  const overlay = document.getElementById("sektion73MapOverlay");
  const modal = document.getElementById("sektion73MapModal");
  if (!overlay || !modal) return;

  document.body.classList.remove("sektion73-modal-open");

  overlay.classList.remove("is-open");
  modal.classList.remove("is-open");
  sektion73ModalOpen = false;

  sektion73IsZoomingToPin = false;
  sektion73PendingPinId = null;
  if (sektion73ActiveMoveEndHandler) {
    sektion73Map.off("moveend", sektion73ActiveMoveEndHandler);
    sektion73ActiveMoveEndHandler = null;
  }

 const view = sektion73ReturnView || sektion73StartView;

/* NYTT: håll filterbaren nere medan vi återgår */
sektion73SetFilterBarHidden(true);

if (sektion73Map && view && typeof sektion73Map.easeTo === "function") {
  const onReturnEnd = () => {
    sektion73Map.off("moveend", onReturnEnd);

    /* NYTT: först NU (när vi nått previous zoom/view) åker filterbaren upp */
    sektion73SetFilterBarHidden(false);
  };

  sektion73Map.on("moveend", onReturnEnd);

  sektion73Map.easeTo({
    center: view.center,
    zoom: Math.min(view.zoom, sektion73MaxZoom),
    pitch: view.pitch,
    bearing: view.bearing,
    duration: sektion73PinZoomDur,
    easing: (t) => 1 - Math.pow(1 - t, 3)
  });
} else {
  /* Fallback: om ingen return-animering sker, visa igen direkt */
  sektion73SetFilterBarHidden(false);
}

}


    /* =========================
       PINS (2 st) – zoom först, modal efter "moveend"
       ========================= */

const sektion73PinIcons = {
      as: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 298.7 144.5" overflow="visible" xml:space="preserve"><g fill="#3e2b00"><path d="M257.8 92.6h1.8c1.5 0 2.4.9 2.4 2.2s-.7 2.2-2.9 2.2h-1.2zs-.1 0 0 0m4.5 10.1h2l-4.3-4.5c1.8-.1 3.4-1.4 3.4-3.4s-1.6-3.4-3.7-3.4h-3.2v11.4h1.4V98zm-14 0h5.8v-1.3h-4.4v-3.7h4.4v-1.3h-4.4v-3.6h4.4v-1.3h-5.8zm-6 0h1.4v-10h2.8v-1.3h-7v1.3h2.8zm-10.1 0h5.8v-1.3h-4.4v-3.7h4.4v-1.3h-4.4v-3.6h4.4v-1.3h-5.8zm-4.1-6.5h-5.8v-4.9h-1.4v11.4h1.4v-5.1h5.8v5.1h1.4V91.3h-1.4zm-11.2 3.9-6-8.8h-1.3v11.4h1.4v-8.8l6 8.8h1.3V91.3h-1.4zm-15.3 2.6h5.8v-1.3H203v-3.7h4.4v-1.3H203v-3.6h4.4v-1.3h-5.8zm-7.9-4.9h4.1c-.5 2.4-2.3 3.8-4.3 3.8s-4.4-1.9-4.4-4.5 2.1-4.5 4.4-4.5 2.1.4 3 1.3l.9-1.1c-1.3-1.2-2.6-1.5-3.9-1.5-3.8 0-5.9 3.1-5.9 5.9s2.1 5.9 5.9 5.9 5.9-2.4 5.9-6.4h-5.6v1.1zm-10.7 1h-4.2l2.1-5.6zm1.5 3.9h1.5l-4.5-11.4h-1.2l-4.5 11.4h1.5l1-2.6h5.2zm-5.9-13c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9-.9.4-.9.9m2.7 0c0 .5.4.9.9.9s.9-.4.9-.9-.4-.9-.9-.9c-.5-.1-.9.4-.9.9m-12 13h5.3v-1.3h-3.9v-10h-1.4zm-9-3.8-1.8-2.6c1-.6 1.7-1.4 1.7-2.6s-.7-2-2.1-2-2.2.9-2.2 2.2.2 1.2.9 2.1c-1.9 1-3.1 2.1-3.1 3.8s1.2 3 3 3 2.2-.6 3.4-1.9l1.2 1.7h1.7l-1.9-2.7 1.8-1.6-.9-.9zm-1.5-5.1c0 .5-.3 1-1 1.5-.4-.6-.6-1-.6-1.5 0-.6.5-.9.9-.9s.7.4.7.9m.5 6.1c-1 1-1.8 1.6-2.6 1.6s-1.7-.8-1.7-1.8.5-1.5 2.4-2.7zm-12.1-5.3c-.2-2.3-1.6-3.4-3.4-3.4-1.9 0-3.4 1.2-3.4 3.1 0 2 .8 2.4 2.5 3.1l1.4.6c1 .4 1.7 1 1.7 1.9s-.9 1.8-2.1 1.8-2.2-.9-2.3-2.1h-1.4c.2 2.3 1.6 3.4 3.6 3.4s3.6-1.3 3.6-3.2-.8-2.4-2.6-3.1l-1.4-.5c-1.1-.4-1.6-1-1.6-1.8s.4-1.8 2-1.8 2 .8 2.1 2.2zm-17.9 4c0 2.4 1.8 4.3 4.3 4.3s4.4-1.9 4.4-4.3v-7.2h-1.4v6.8c0 1.9-1 3.4-3 3.4s-3-1.5-3-3.4v-6.8h-1.4zm-4-2.4h-5.8v-4.9H118v11.4h1.4v-5.1h5.8v5.1h1.4V91.3h-1.4v4.9zm-17.1 5.1v-8.7h1.8c2.4 0 4.3 1.8 4.3 4.2s-1.7 4.4-4.2 4.4zm-1.4 1.4h3.3c3.2 0 5.7-2.5 5.7-5.7s-2.6-5.6-5.4-5.6h-3.7zm-4.1-2.6-6-8.8h-1.3v11.4h1.4v-8.8l6 8.8h1.3V91.3h-1.4zm-12.1-1.3h-4.2l2.1-5.6zm1.5 3.9h1.5l-4.5-11.4h-1.2l-4.5 11.4h1.5l1-2.6h5.2zM75.9 92.6h1.8c1.5 0 2.4.9 2.4 2.2s-.7 2.2-2.9 2.2H76zm4.5 10.1h2l-4.3-4.5c1.8-.1 3.4-1.4 3.4-3.4s-1.6-3.4-3.7-3.4h-3.2v11.4H76V98zm-12 0h1.4v-10h2.8v-1.3h-7v1.3h2.8zm-4.3-8.1c-.2-2.3-1.6-3.4-3.4-3.4-1.9 0-3.4 1.2-3.4 3.1 0 2 .8 2.4 2.5 3.1l1.4.6c1 .4 1.7 1 1.7 1.9s-.9 1.8-2.1 1.8-2.2-.9-2.3-2.1h-1.4c.2 2.3 1.6 3.4 3.6 3.4s3.6-1.3 3.6-3.2-.8-2.4-2.6-3.1l-1.4-.5c-1.1-.4-1.6-1-1.6-1.8s.4-1.8 2-1.8 2 .8 2.1 2.2zm230.6-32.5c-2-2.7-5.5-4.1-8.9-4.1-6.6 0-12.1 5.1-12.1 11.6s5.8 12 12.3 12 7-1.7 8.7-4h.1v3.5h4V48.2h-4v13.9zm0 7.8c0 4.5-3.8 8.1-8.3 8.1-4.6 0-8.4-3.2-8.4-8.4s3.1-8 8.5-8 8.2 3.7 8.2 8.3m-28 11.2h4V66.5c0-6.1-4.5-8.5-9-8.5s-5.2 1.1-6.4 3.2h-.1v-2.6h-4v22.6h4V68.4c0-4.3 2.3-6.8 6-6.8 3.8 0 5.4 2.9 5.4 6.3zm-23.1-7.4c0 2.2-1.7 4.5-6.6 4.5s-6.6-2.3-6.6-4.5 1.7-4.5 6.6-4.5 6.6 2.3 6.6 4.5m-.2-5.3c-2.1-1.9-4.7-2.6-7.2-2.6-6.5 0-10.1 3.6-10.1 7.8 0 4.1 4.5 8.1 10.1 8.1s5.4-.9 7.4-2.9v2.4h3.8V65.7c0-5.4-5.2-7.7-10.8-7.7s-4.9.3-8.4 1.7L230 63c2.2-1 4.2-1.6 6.4-1.6 3.1 0 7 .8 7 4.5zm-29.3 12.7h4V68.3c0-4.1 2.2-6.4 5.6-6.4s1.2.1 1.8.2V58c-3.4 0-5.3.2-7.3 3.7h-.1v-3.2h-4zm-12.9-22.5H198V62h3.2v14.3c0 3.5 1.2 4.9 5.4 4.9h2.4v-3.6h-1.8c-1.6 0-2-.4-2-1.7V62h3.7v-3.4h-3.7v-5.5h-4zm-50 9.8V48.2h-4v32.9h4v-11l9.7 11h5.6l-11-12.1 10.8-10.4H161zm-14.2-17c0 1.5 1.2 2.7 2.8 2.7s2.8-1.2 2.8-2.7-1.2-2.7-2.8-2.7-2.8 1.2-2.8 2.7m.8 29.7h4V58.6h-4zM123 75.9l-7.4-17.4H111l10 22.6h3.8l10-22.6h-4.6zm-19.4-27.7v26.2c0 4.7 2.4 6.8 6.2 6.8h1.7v-3.6h-1.2c-1.3 0-2.6-.9-2.6-3.4v-26zM81.2 68.1c.4-3.1 2.8-6.5 7.7-6.5s7.3 2.7 7.7 6.5zM97 74.4c-2 2.3-4.6 3.6-7.4 3.6-4.5 0-7.7-2.8-8.3-6.7h19.9c0-8-5-13.3-12.2-13.3s-12 5.4-12 11.8 4.4 11.8 12.7 11.8 7.4-1.5 10.5-4.9zM50 90.7h4v-13h.1c1.7 2.3 4.6 4 8.7 4 6.5 0 12.3-4.9 12.3-12S69.6 58.1 63 58.1s-6.9 1.4-8.8 4.1H54v-3.5h-4zm20.7-21c0 5.2-4.2 8.4-8.4 8.4S54 74.4 54 69.9s3.8-8.2 8.2-8.2 8.5 4.2 8.5 8m-31.9.1H25.9l6.4-16.2zm4.5 11.3H48L34.2 48.2h-3.8L16.6 81.1h4.7l3.1-7.7h15.8z"/><path d="M202.2 41.9c-6.1-12.1-42.1 3.1-33.6 16 2.9 3.9 7.4 5.4 11.7 7.6 4.3 2.1 9 3.6 12 7.5 6 8.8-12.2 13.2-18.5 13.4-1.5.4-10.9-.6-6.2.9 7.1 1.9 15.7 1.7 22-2 9.4-4.5 12.8-15.7 2.1-21.2-5.4-3.6-14-5.2-18.8-10-2.4-3 .6-6.9 3.5-8.6 4.7-3 10.2-4.3 15.7-4.5 4.3-.1 6.9 1.2 7.4 5.6.2.6.3.9.6.8.6 0 1.8-2.7 2.2-4.5"/></g><path fill="#3e2b00" d="M221.4 109.4c-21.1 19.3-58 32.1-99.9 32.1C56.2 141.5 3 110.4 3 72.3S56.2 3 121.5 3c51.2 0 95 19.1 111.5 45.8h3.4C219.9 20.4 174.6 0 121.5 0 54.5 0 0 32.4 0 72.3s54.5 72.3 121.5 72.3c44.1 0 82.8-14.1 104.1-35.1h-4.2z"/></svg>
      `,
         golf: `
         <svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.6 33.9" overflow="visible" xml:space="preserve"><path d="M10.7 33.5V21.1l-3.4 8.2h-.4l-3.4-8.2v12.4H0V12.1h3.3L7.1 22l3.8-9.9h3.3v21.4zm7.1-21.4h3.8v21.4h-3.8zm15.1 21.4-4.3-11.8v11.8h-3.5V12.1h3l4.3 11.7V12.1h3.5v21.4zm6.5-21.4h3.8v21.4h-3.8zm18.1 16.4c-.6 3.3-2.7 5.3-5.3 5.3-3.8 0-5.8-3.9-5.8-11.2 0-7 2.2-10.9 6-10.9 2.2 0 3.8 1.3 4.9 4l-3.4 1.5c-.3-1.1-.9-1.7-1.7-1.7-1.4 0-2 2-2 6.8 0 1.2 0 2.3.1 3.4.2 3.2.8 4.4 1.9 4.4 1.4 0 2-1.8 2-5.8v-.9h-1.9V20h5.6v3.8c0 2-.1 3.3-.4 4.7M70.7 31c-.9 1.9-2.4 2.9-4.3 2.9s-3.5-1-4.3-2.9c-.9-2-1.5-4.9-1.5-8.1s.5-6.2 1.5-8.2c.9-1.9 2.4-2.9 4.3-2.9s3.5 1 4.3 2.9c1 2 1.5 4.9 1.5 8.2 0 3.1-.5 6.1-1.5 8.1m-4.3-15.5c-1.4 0-2 2.2-2 7.3s.6 7.3 2 7.3 2-2.2 2-7.3-.6-7.3-2-7.3m8.9 18V12.1H79V30h4.3v3.5zm14-17.9v4.7h3.9v3.4h-3.9v9.8h-3.7V12.1h8v3.5zM27 5.2c.1.4.2.5.4.6V7H25V5.8c.2 0 .4-.1.4-.3v-.2l-.1-.3H24l-.1.3v.2c0 .2.1.3.4.3V7h-2.1V5.8c.2-.1.3-.2.4-.7l1-5.2H26zm-2.4-3.5L24.1 4h1zm3.5 4.1c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0H31c.8 0 1.3.2 1.6.6.2.2.3.5.4.8 0 .2.1.5.1 1 0 .9 0 1.2-.2 1.5-.2.4-.6.7-1 .8-.3.1-.5.1-.9.1h-1v.4c0 .4.1.5.4.6V7h-2.3zm2-2.5h.7c.6 0 .8-.2.8-.9s-.2-.9-.8-.9h-.7zM34 5.8c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0h5v2.2h-1.5v-.1c0-.5-.2-.7-.6-.7H36v1.4h1.9V4H36v1.7h.8c.5 0 .6-.2.6-.7v-.4H39V7h-5zm6 0c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0h2.3v1.1c-.3.1-.4.2-.4.5v3.9h.6c.5 0 .7-.2.7-.6V3.8h1.4V7H40zm10.1-4.7c-.2.1-.3.2-.4.5v.1l-1 5.2h-2.4l-1.1-5.2c-.1-.4-.2-.5-.4-.6V0h2.4v1.1c-.2 0-.4.1-.4.3v.3l.7 3.5.7-3.5v-.3c0-.2-.1-.3-.4-.3V0h2.1v1.1zm.8 4.7c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0h2.3v1.1c-.3.1-.4.2-.4.5v3.5c0 .4.1.5.4.6V7h-2.3zm3.3 0c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.6V0h2.3v1.1c-.3.1-.4.2-.4.6V3l.8-1.2c.3-.5.3-.5.3-1.1V0h2v1.1c-.2 0-.3.1-.6.5l-.9 1.5 1.1 2.2c.2.4.3.5.5.6V7h-2.2V6c0-.4 0-.4-.2-.8V5l-.8-1.4v1.6c0 .4.1.5.4.6V7h-2.3zm5.9 0c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.5V0H65v2.2h-1.5v-.1c0-.5-.2-.7-.6-.7h-.8v1.4H64V4h-1.9v1.7h.8c.5 0 .6-.2.6-.7v-.4H65V7h-4.9zm6 0c.3-.1.4-.2.4-.6V1.7c0-.4-.1-.5-.4-.6V0h1.8l1.8 3.6V1.7c0-.4-.1-.5-.4-.6V0h2.2v1.1c-.3.1-.4.2-.4.6V7h-1.5l-1.8-3.7v1.9c0 .4.1.5.4.6V7H66V5.8z" fill="#f3ecdb"/></svg>
         `,
            apelviken: `
<svg baseProfile="basic" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 711.5 280.4" xml:space="preserve"><path d="M120.9 15.7h8.4v1.8h-8.4zM154.5.6h7.4c12.5 0 13 10.2 13 12s-.5 12-13 12h-7.4zm2.2 22h4.6c6.4 0 11.3-3.1 11.3-10s-4.9-10-11.3-10h-4.6zm29.1-22h14.7v2h-12.4v8.5h11.7v2h-11.7v9.4h13v2h-15.2V.6zm26.7 19.6c1.2 2 3.1 3 5.5 3 3 0 5.4-1.8 5.4-4.7 0-6.7-12.4-2.8-12.4-11.9 0-4.3 3.7-6.6 7.7-6.6 2.6 0 4.9.9 6.5 3l-1.9 1.4c-1.1-1.6-2.6-2.4-4.7-2.4-2.9 0-5.4 1.5-5.4 4.5 0 7.2 12.4 2.9 12.4 11.9 0 4.3-3.6 6.7-7.5 6.7-3.2 0-5.9-1-7.8-3.6zM242 2.6h-8.2v-2h18.6v2h-8.2v22H242zm20.1-2h2.2v24h-2.2zm14.8 0h2.9l14.6 21h.1V.6h2.2v24h-2.9l-14.6-21h-.1v21h-2.2zm39.6 0h2.3l10.1 24h-2.5l-2.6-6.4h-12.7l-2.7 6.4h-2.3zm1.1 2.5L312 16.2h11zm23.8-.5h-8.2v-2h18.6v2h-8.2v22h-2.2zm20.1-2h2.2v24h-2.2zm25.6-.6c7.3 0 12.4 5.3 12.4 12.6s-5.1 12.6-12.4 12.6-12.4-5.3-12.4-12.6S379.8 0 387.1 0m0 23.2c6.3 0 10.2-4.6 10.2-10.6S393.4 2 387.1 2s-10.2 4.6-10.2 10.6 3.9 10.6 10.2 10.6M410.5.6h2.9l14.6 21h.1V.6h2.2v24h-2.9l-14.6-21h-.1v21h-2.2zm45.2 15.1h8.4v1.8h-8.4zM5.1 180.8Q0 175.4 0 166.7c0-4.9 1.3-8.9 3.8-12.1s5.6-5.6 9.2-7.4c3.6-1.7 8.2-3.6 13.9-5.5 5.9-2.1 10.3-3.9 13.1-5.6s4.1-4 4.1-6.9v-12.6c0-4.5-1.1-8.1-3.2-10.6s-5.4-3.8-9.8-3.8c-5.2 0-9.1 1.3-11.8 3.9 3 1.1 5.4 2.7 7.1 4.9s2.5 4.7 2.5 7.6c0 3.7-1.2 6.6-3.7 8.8s-5.5 3.2-9.1 3.2c-3.8 0-6.7-1.2-8.8-3.6s-3.1-5.4-3.1-8.9c0-3 .7-5.6 2.2-7.7s3.7-4.1 6.7-5.9c2.9-1.7 6.5-3.1 10.8-4.1s8.9-1.5 14-1.5c5.3 0 9.9.5 13.8 1.6s7.1 2.9 9.7 5.5c2.4 2.4 4 5.3 4.8 8.8q1.2 5.25 1.2 14.1V173c0 2.6.2 4.4.7 5.5s1.4 1.6 2.8 1.6c1.6 0 3.6-.9 5.8-2.8l1.6 2.8c-4.9 4-10.8 6-17.8 6-5.9 0-10.1-1.2-12.5-3.6s-3.6-5.6-3.7-9.6c-5.4 8.8-13.4 13.1-23.8 13.1-6.8.2-12-1.6-15.4-5.2m39-11.7v-33.2c-1.3 2.2-4.1 4.5-8.3 7.1q-6.3 4.05-9.6 8.1c-2.2 2.7-3.2 6.6-3.2 11.7 0 4.4.9 7.7 2.8 9.8 1.8 2.1 4.3 3.2 7.3 3.2 4.2 0 7.9-2.2 11-6.7m112.3-65.6c4.4 3 7.8 7.6 10.3 13.6 2.5 6.1 3.7 13.5 3.7 22.2 0 15.5-3.4 27.3-10.1 35.6-6.8 8.3-15.9 12.4-27.5 12.4-3.2 0-6.3-.4-9.2-1.3s-5.3-2.2-7.4-3.9v16.2q0 7.2 3.6 9.9c2.4 1.8 6.1 2.8 11 2.8v3.4l-4.4-.2c-12-.3-19.6-.5-22.9-.5-3.2 0-10.1.2-20.4.6V211q5.4 0 7.5-2.4c1.5-1.6 2.2-4.5 2.2-8.7v-81.1c0-5-.8-8.6-2.4-10.9s-4.2-3.4-8-3.4v-3.4c3.5.3 6.8.5 10.1.5 9.4 0 17.3-.8 23.7-2.3v14.9q3.45-7.5 9.9-11.4c4.3-2.6 9.4-4 15.2-4 5.7.1 10.7 1.6 15.1 4.7m-15 69.1c3-6.9 4.5-16.9 4.5-30.1q0-19.8-3.6-28.2t-10.5-8.4c-3.7 0-6.9 1.2-9.8 3.7s-4.8 5.9-5.8 10.4v58.5c2.6 2.9 6 4.4 10.2 4.4 7 0 12-3.4 15-10.3M249.5 161l2.9 1c-2.2 7-6 13-11.6 17.9s-12.5 7.4-20.8 7.4c-11.5 0-20.6-3.6-27.3-10.9-6.8-7.3-10.1-18.1-10.1-32.3 0-14.6 3.6-25.8 10.9-33.5 7.2-7.7 16.9-11.6 28.9-11.6 20.3 0 30.5 12 30.5 36h-45.6c-.1 1.6-.2 4.2-.2 7.6 0 7.1 1 13.1 3 17.8 2 4.8 4.6 8.2 7.8 10.4s6.6 3.2 10.3 3.2c8.8 0 15.9-4.3 21.3-13m-37.8-51.5c-2.5 4.8-4.1 12.2-4.8 22.3h25.5c.2-8.5-.6-15.6-2.5-21.2s-4.7-8.3-8.5-8.3c-4 0-7.2 2.4-9.7 7.2m83.6 60.4c0 4.4.8 7.5 2.3 9.2s4.2 2.5 8.1 2.5v3.4c-11.2-.4-18.5-.6-21.7-.6-3.7 0-11.1.2-22.4.6v-3.4c3.8 0 6.5-.8 8-2.5 1.6-1.7 2.4-4.7 2.4-9.2V77.5c0-5-.8-8.6-2.4-10.9s-4.2-3.4-8-3.4v-3.4c3.5.3 6.8.5 10.1.5 9.4 0 17.3-.8 23.7-2.3v111.9zm95.6-68.7v3.2c-2.3.6-4.3 2-6.1 4.1s-3.5 5.4-5.1 9.8l-23.7 67c-1.2-.1-3-.2-5.4-.2-2.3 0-4 .1-5.2.2l-28.9-71.7c-1.5-3.7-3.1-6.1-4.6-7.3q-2.4-1.8-4.8-1.8v-3.4c7.6.5 15.2.8 23 .8 6.8 0 13.8-.3 21.1-.8v3.4c-3.7 0-6.3.2-7.9.7s-2.4 1.8-2.4 4c0 .9.3 2.2.8 4.1l18.5 49.1 11.7-32.1c1.7-5.1 2.6-9.5 2.6-13.1 0-7.9-3.9-12.2-11.8-12.8v-3.2c5 .3 10.2.5 15.6.5 5.7 0 9.8-.2 12.6-.5m37.8 68.7c0 4.4.8 7.5 2.4 9.2s4.2 2.5 8 2.5v3.4q-16.2-.6-21.6-.6-5.1 0-22.5.6v-3.4c3.9 0 6.6-.8 8.1-2.5s2.3-4.7 2.3-9.2v-51.1c0-5-.8-8.6-2.3-10.9s-4.2-3.4-8.1-3.4v-3.4c3.5.3 6.8.5 10.1.5 9.6 0 17.5-.8 23.7-2.3v70.6zm-1.9-107.2c2.6 2.2 4 5.3 4 9.2s-1.3 6.9-4 9.2q-3.9 3.3-10.8 3.3-6.75 0-10.8-3.3c-2.6-2.2-4-5.3-4-9.2s1.3-6.9 4-9.2q3.9-3.3 10.8-3.3t10.8 3.3m105.8 116.2q1.65 1.8 4.2 2.7v3.4c-8.7-.4-14.3-.6-17-.6-3.6 0-10.5.2-20.9.6v-3.4c1.5 0 2.7-.3 3.6-.8s1.3-1.3 1.3-2.3c0-.5-.3-1.3-.8-2.4l-16.1-29c-1.1-1.8-2.2-3.1-3.4-3.7s-2.7-1.1-4.5-1.3V170c0 4.4.7 7.5 2.1 9.2s3.9 2.5 7.6 2.5v3.4c-10.8-.4-17.8-.6-21.1-.6-3.7 0-11.1.2-22.4.6v-3.4c3.8 0 6.5-.8 8-2.5 1.6-1.7 2.4-4.7 2.4-9.2V77.5c0-5-.8-8.6-2.4-10.9s-4.2-3.4-8-3.4v-3.4c3.5.3 6.8.5 10.1.5 9.4 0 17.3-.8 23.7-2.3v81c2.2-.2 4-.6 5.6-1.3 1.6-.6 2.9-1.6 4.1-2.9l12.3-12q5.4-5.4 5.4-9.9c0-2.5-1.1-4.5-3.4-5.9-2.3-1.5-5.3-2.3-9.1-2.5v-3.2c5.9.3 12.3.5 19 .5 9 0 15.3-.2 19-.5v3.2c-6.4 1.4-13.1 5.6-20.3 12.5l-10.4 10.7 27.2 45.6c1.8 2.5 3.2 4.4 4.2 5.6m73.7-17.9 2.9 1c-2.2 7-6 13-11.6 17.9s-12.5 7.4-20.8 7.4c-11.5 0-20.6-3.6-27.3-10.9-6.8-7.3-10.1-18.1-10.1-32.3 0-14.6 3.6-25.8 10.9-33.5 7.2-7.7 16.9-11.6 28.9-11.6 20.3 0 30.5 12 30.5 36h-45.6c-.1 1.6-.2 4.2-.2 7.6 0 7.1 1 13.1 3 17.8 2 4.8 4.6 8.2 7.8 10.4s6.6 3.2 10.3 3.2c8.7 0 15.9-4.3 21.3-13m-37.9-51.5c-2.5 4.8-4.1 12.2-4.8 22.3h25.5c.2-8.5-.6-15.6-2.5-21.2s-4.7-8.3-8.5-8.3c-3.9 0-7.2 2.4-9.7 7.2m127.7-4.3c1.8 2.1 3.1 4.7 3.9 7.9s1.1 7.6 1.1 13.1v43.6c0 4.4.8 7.5 2.4 9.2s4.2 2.5 8 2.5v3.4c-10.8-.4-17.9-.6-21.4-.6-3.2 0-10.3.2-21.1.6v-3.4c3.2 0 5.5-.8 6.8-2.5s1.9-4.7 1.9-9.2v-50.4c0-4.4-.7-7.8-2.2-10.1s-4.1-3.4-7.9-3.4c-4.4 0-8.2 1.8-11.3 5.4s-4.7 8.1-4.7 13.4v45.1c0 4.4.6 7.5 1.9 9.2s3.6 2.5 6.8 2.5v3.4q-14.85-.6-20.1-.6c-3.2 0-10.7.2-22.4.6v-3.4c3.9 0 6.6-.8 8.1-2.5s2.3-4.7 2.3-9.2v-51.1c0-5-.8-8.6-2.3-10.9s-4.2-3.4-8.1-3.4V101c3.5.3 6.8.5 10.1.5 9.6 0 17.5-.8 23.7-2.3V114c4.9-10.1 13.7-15.1 26.6-15.1 8.3 0 14.2 2.1 17.9 6.3M424.8 235.7c-1-1.3-1.5-2.7-1.5-4.4 0-1.2.3-2.1 1-2.7s1.4-.9 2.2-.9c1.4 0 2.4.7 3 2 .7 1.3 1 3.1 1 5.4 0 1.3 0 2.2-.1 2.9-.6 5-1.9 9.7-3.8 14.2-2 4.5-4.6 8.1-7.8 10.9-3.3 2.8-7 4.2-11.3 4.2-3 0-5.2-.9-6.5-2.6s-1.9-3.9-1.7-6.4c.3-4 1.9-8.4 5-13.3 3-4.9 7-9.7 11.9-14.3-1.2.5-2.6 1.2-4.1 2.2-1.2.8-2.2 1.4-3.1 1.8s-1.6.6-2.3.6c-.5 0-1-.1-1.5-.4s-.8-.5-.9-.5q-1.35-.9-2.1-.9c-.8 0-1.4.3-1.9 1s-1.1 1.8-1.6 3.5l-.8 2.7h-1.4l1.6-5.3c1.4-4.9 3.6-7.4 6.8-7.4.6 0 1.2.1 1.6.3s1 .6 1.7 1.1c.6.5 1.2.8 1.7 1.1.5.2 1 .4 1.7.4 2.4 0 4.5-.7 6.1-2.2l.7-1.4 1.5.7c-3.9 4.8-7 9.7-9.1 14.4q-3.3 7.2-3.9 14.7c0 .4-.1 1-.1 1.7 0 4.1 1.1 6.1 3.2 6.1 3.5 0 6.7-1.5 9.6-4.4 2.9-3 5.1-6.5 6.8-10.6q2.4-6.15 2.7-11.1c-2-.8-3.2-1.8-4.3-3.1m41.1 18.7h1.4l-1.8 5.3c-1 2.7-2.2 4.6-3.7 5.8s-3 1.8-4.6 1.8c-.9 0-1.7-.2-2.4-.5s-1.2-.8-1.6-1.4c-.4-.7-.7-1.6-.7-2.5 0-1 .2-2.2.5-3.4.3-1.3.6-2.1.7-2.4l1.3-5.2c-2.3 5.4-4.7 9.4-7.1 11.8s-4.9 3.7-7.5 3.7q-3.3 0-5.1-2.4c-1.2-1.6-1.7-3.7-1.7-6.4 0-3.9 1-8.3 3.1-13.1s4.8-9 8.1-12.3q4.95-5.1 10.2-5.1c1.3 0 2.4.5 3.2 1.5s1.3 2.3 1.5 4.1l1.2-4.5c2.7-.1 4.9-.4 6.7-1l-9.1 32.1c0 .2-.1.6-.3 1.1-.1.6-.2 1.1-.2 1.6 0 1.2.5 1.8 1.6 1.8 2.1 0 4-2.5 5.6-7.4zm-18.6 7.4c1.9-2.1 3.7-4.9 5.6-8.3q2.7-5.25 4.5-11.1l1.3-5.2c0-.4.1-.9.1-1.6 0-2-.4-3.5-1.1-4.7-.7-1.1-1.7-1.7-2.9-1.7q-3.15 0-6.6 4.8c-2.3 3.2-4.3 7.2-5.8 11.9-1.6 4.7-2.4 9.2-2.4 13.3 0 2 .2 3.4.7 4.3.4.9 1.1 1.3 1.9 1.3 1.2.1 2.9-.9 4.7-3m55.4-32.8q1.2 1.2 1.2 3c0 1.5-.5 2.7-1.5 3.7q-1.5 1.5-3.6 1.5c-.9 0-1.6-.2-2.1-.7s-.8-1.1-.8-1.9c0-1.1.3-2.1.9-2.8q.9-1.2 2.4-1.8c-.2-.2-.5-.3-.8-.3-2.6 0-5.5 2.8-8.5 8.5-3.1 5.6-6 13.1-8.7 22.3l-1.5 5.7h-6.3l8.7-31.1c.3-1.1.5-2 .5-2.8 0-1.1-.5-1.7-1.5-1.7-1.1 0-2 .6-2.9 1.7q-1.35 1.65-2.7 5.7l-.9 2.7H473l1.8-5.3c1.7-5 4.7-7.5 8.8-7.5 2.8 0 4.1 1.4 4.1 4.2 0 1.4-.3 3.3-1 6l-2.3 9.1c2.6-7 5.1-12 7.4-14.9s4.9-4.4 7.7-4.4c1.4 0 2.4.4 3.2 1.1m30.9 1.5c1.3 1.7 2 4.3 2 7.7 0 3.9-.9 8.2-2.6 12.7-1.7 4.6-4.2 8.4-7.5 11.6-3.2 3.2-7 4.8-11.2 4.8-1.5 0-2.7-.4-3.8-1.3-1.1-.8-1.9-2-2.3-3.6l-6.2 5-1.1-.5c.6-1.2 1-2.6 1.4-4.2l12.7-44.9c.2-.6.3-1.3.3-2 0-1-.4-1.7-1.1-2.1-.7-.5-2-.7-3.8-.7l.4-1.5c2.6 0 4.9-.3 6.9-.8s4-1.2 5.9-2.2l-9.4 34.3c2.3-5.2 4.5-9 6.7-11.4 2.2-2.3 4.6-3.5 7.1-3.5s4.3.8 5.6 2.6m-12 30.2c2.3-3.2 4.2-7.1 5.6-11.7s2.1-8.8 2.1-12.5c0-2.1-.3-3.7-.9-4.7-.6-1.1-1.4-1.6-2.5-1.6-1.9 0-4.3 2.1-7 6.4s-5.2 9.5-7.4 15.8l-2.5 9.2c.6 1.5 1.3 2.5 2.1 3.1s1.9.9 3 .9c2.8 0 5.2-1.6 7.5-4.9M562 243c-4.4 3-9.4 5.3-15.1 7.2-.5 2.4-.8 4.8-.8 7 0 4.6 1.7 7 5 7 4.2 0 7.9-2.4 11.2-7.3l1.2.6c-1.6 2.7-3.6 4.9-6.3 6.9s-5.4 2.9-8.3 2.9c-3 0-5.3-.9-7-2.6s-2.5-4.3-2.5-7.6c0-3.7 1.1-7.8 3.2-12.5 2.2-4.6 5.1-8.6 8.7-11.8 3.7-3.2 7.7-4.9 12-4.9 1.5 0 2.8.4 3.8 1.2q1.5 1.2 1.5 3.6c0 3.9-2.2 7.3-6.6 10.3m-5.6-11q-2.85 2.7-5.4 7.2c-1.7 3-2.9 6.2-3.8 9.6 4.6-1.6 7.9-3.1 9.9-4.6q2.7-2.1 4.2-5.1c1-2 1.5-4.2 1.5-6.5 0-1.3-.1-2.2-.3-2.6s-.5-.7-.9-.7c-1.5 0-3.3.9-5.2 2.7m44.9-3q1.2 1.2 1.2 3c0 1.5-.5 2.7-1.5 3.7q-1.5 1.5-3.6 1.5c-.9 0-1.6-.2-2.1-.7s-.8-1.1-.8-1.9c0-1.1.3-2.1.9-2.8q.9-1.2 2.4-1.8c-.2-.2-.5-.3-.8-.3-2.6 0-5.5 2.8-8.5 8.5-3.1 5.6-6 13.1-8.7 22.3l-1.5 5.7H572l8.7-31.1c.3-1.1.5-2 .5-2.8 0-1.1-.5-1.7-1.5-1.7-1.1 0-2 .6-2.9 1.7q-1.35 1.65-2.7 5.7l-.9 2.7h-1.4l1.8-5.3c1.7-5 4.7-7.5 8.8-7.5 2.8 0 4.1 1.4 4.1 4.2 0 1.4-.3 3.3-1 6l-2.3 9.1c2.6-7 5.1-12 7.4-14.9s4.9-4.4 7.7-4.4c1.2 0 2.3.4 3 1.1m34.4-3c.7.7 1.1 1.8 1.1 3.3 0 1.3-.3 2.2-.9 2.9s-1.4 1-2.2 1q-1.35 0-2.4-.9c-.7-.6-1.1-1.5-1.1-2.8 0-.9.2-1.9.7-3-1.9.8-3.3 1.8-4.1 3 2 1.4 3 3.6 3 6.5 0 2.1-.5 4.2-1.6 6.2-1 2-2.5 3.8-4.4 5.3s-4.1 2.5-6.6 2.9l-2.4 1.3c-2.3 1.2-3.9 2.2-5 2.9-1 .7-1.6 1.4-1.6 2.1 0 .5.3 1 1 1.4q1.05.6 3.3 1.2l5.3 1.4c2.8.7 4.8 1.5 6.2 2.4s2 2.2 2 3.9c0 1.8-.8 3.8-2.3 5.9s-3.9 3.8-7 5.3c-3.2 1.5-7.1 2.2-11.7 2.2-3.7 0-6.6-.5-8.5-1.5-2-1-2.9-2.3-2.9-4 0-1.6.9-3.3 2.7-5s4.3-3 7.6-4l.5 1.1c-3.1 1.6-4.7 3.8-4.7 6.6 0 1.8.6 3.2 1.9 4.1s3 1.3 5.1 1.3 4.3-.4 6.6-1.3 4.2-2 5.6-3.4c1.5-1.4 2.2-2.9 2.2-4.5 0-.7-.2-1.1-.6-1.4-.4-.2-1.2-.5-2.4-.8l-11.1-2.8c-2.6-.7-3.9-2.1-3.9-4.4q0-2.25 2.4-4.5c1.6-1.5 4.5-3.3 8.9-5.3h-.5c-2.8 0-5.1-.7-6.8-2s-2.6-3.3-2.6-5.9c0-2 .5-4.2 1.6-6.5s2.8-4.3 5.2-6c2.4-1.6 5.4-2.5 9-2.5 2.1 0 3.8.3 5.2.9.9-1.2 2-2.1 3.3-2.8s2.6-1.1 3.9-1.1c1.2.2 2.3.6 3 1.3m-15.9 20.9q1.95-2.55 2.7-6c.5-2.3.7-4.4.7-6.3 0-1.8-.2-3.1-.7-4s-1.4-1.3-2.7-1.3c-2.3 0-4.2 1-5.6 3.1s-2.3 4.3-2.8 6.8-.8 4.5-.8 6c0 2.9 1.3 4.4 3.8 4.4 2.4-.2 4.1-1 5.4-2.7" fill="#fff"/></svg>    
`,
            majas: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 226.5 23.5" overflow="visible" xml:space="preserve"><path d="M4.9 5.9c.5-.4 1-.8 1.7-.9 1.1-.2 2 .1 2.8.8.2.2.3.2.6.1 1.2-.9 2.5-1.2 4-.7 1.4.4 2.4 1.7 2.4 3.1v6.1c0 .4.1.6.5.6.9 0 1.4.5 1.4 1.3 0 .7-.4 1.3-1.3 1.4-1.1.2-2.2 0-3.2.1-.4 0-.2-.3-.2-.5V9.1c0-.5 0-1-.5-1.2s-1-.1-1.4.2c-.7.6-1.3 1.2-1.2 2.3.1 1.3 0 2.6 0 4 0 .5.1.6.6.6 1.1 0 1.7 1 1.3 2-.3.6-.9.7-1.4.8H8.1c-.4 0-.3-.3-.3-.5V8.7q0-.9-.9-.9c-1 0-2.1 1.1-2.1 2.1v4.4c0 .4.1.6.6.6 1 0 1.5.7 1.3 1.7-.1.5-.5.9-1 .9-1.5.2-3 .2-4.4 0-.9-.1-1.3-.6-1.3-1.3s.5-1.3 1.3-1.3c.7 0 .7-.3.7-.9V8.5c0-.3-.1-.5-.5-.5C.3 7.9-.2 7.2.1 6.2c.2-.5.5-.8 1.1-.9 1.1-.2 2.2-.1 3.3-.1.5 0 0 .5.4.7M130.8 17c-2.2 1.2-4.5 1.5-6.8.7-4.9-1.6-5.3-7.3-2.7-10.3 2.3-2.6 5.7-3.2 8.8-1.5.2.1.4.2.7.4V3.1c0-.3-.2-.2-.3-.2-.3 0-.6 0-.9-.1-.8-.2-1.2-.6-1.1-1.4 0-.7.5-1.3 1.2-1.3 1.2-.1 2.5 0 3.7 0 .2 0 .2.1.2.3v14c0 .5.1.6.6.6.3 0 .6 0 .9.1.7.2.9.7.9 1.4 0 .6-.4 1-1 1.2s-1.2.1-1.8.1h-1.8c-.5-.1-.8-.2-.6-.8m-4.5-9.3c-.7 0-1.5.3-2.2.8-2.4 1.8-2.1 5.3.4 6.4 1.4.6 2.8.5 4.2 0 .7-.3 1.3-.8 1.6-1.6 1.4-2.5-.8-5.7-4-5.6m32.5 1.8c-.1-1.1-.7-1.6-1.7-1.7-1.3-.4-2.9.2-3.8 1.4-.4.2-.6.5-.5 1v4c0 .8 0 .8.8.8.7.3 1.1.8 1 1.4-.1.7-.4 1-1.1 1.2-.5 0-1 .1-1.5.1-.9 0-1.9.1-2.9-.1-.7-.2-1.2-.7-1.1-1.4s.6-1.3 1.3-1.2c.6 0 .7-.2.7-.8V3.5c0-.5-.1-.7-.6-.6-.2 0-.4 0-.7-.1-.8-.2-1.2-.6-1.2-1.3s.4-1.3 1.2-1.3c1.3-.1 2.5 0 3.8 0 .4 0 .2.3.2.4v5.5c1.4-.7 2.8-1.1 4.4-.9.8.1 1.6.4 2.3.7.6.4 1.1.9 1.5 1.6.2.4.3.9.5 1.3.2 1 0 2 .1 3.1v2.4c0 .6.3.9.8.9.6.1 1.1.6 1.1 1.3s-.4 1.2-1 1.4c-.7.2-1.3.1-2 .1h-1.1c-.7 0-1.4 0-2.1-.4-.6-1-.6-1.3.2-2.3.3-.1.6-.2.9-.2s.4-.1.4-.4v-2.9c.1-.9.2-1.6.1-2.3M200 6.2c.7-.3 1.3-.7 2.1-.9.7-.2 1.4-.2 2.1-.4.7 0 1.3.1 2 .2.7.2 1.3.5 2 .7 1.8.9 2.8 2.4 3.4 4.3.2.8.1 1.7.2 2.5-.1.4-.4.2-.6.2h-10.6c-.2 0-.3 0-.2.3.3.5.6 1.1 1.2 1.3 1.2.8 2.5.9 3.9.8 1.6-.1 3.2-.6 4.8-.9.3 0 .5.1.8.1.5.4.7.8.7 1.4-.2.6-.5.9-1.1 1.1l-.6.3c-2.7.7-5.5 1.2-8.3.4l-1.8-.9c-.4-.4-.8-.7-1.2-1.1-.4-.7-.9-1.3-1.2-2.1-.4-1.5-.4-2.9.1-4.4.3-.5.6-1.1 1-1.6zm.9 3q-.3.3-.6.9h8.2c-.7-1.2-1.6-2-3-2.2-.8-.3-1.6-.2-2.4 0-.8.1-1.6.5-2.2 1.3m-171.2.6c.3-1.5-.6-1.9-1.7-2-1.5-.1-3 .2-4.4.5-.3.1-.7.1-1 .1-.5 0-1-.5-1.1-1.1-.1-.7.1-1.3.7-1.4 2.3-.9 4.8-1.4 7.2-.7 1.7.5 3.1 1.8 3 4-.1 1.7 0 3.4 0 5.1 0 .5.1.6.5.5h.7c.7.1 1.2.6 1.2 1.3 0 .8-.4 1.3-1.1 1.4-1.3.2-2.5.1-3.8.1-.5 0-.1-.4-.3-.6-1.1.5-2.3.9-3.6 1-1.9.2-3.6-.1-5-1.5-1.2-1.2-1.3-2.7-.4-4.2 1.1-1.7 2.8-2.5 4.8-2.7 1.4-.2 2.8-.1 4.3.2m-2.4 2.6c-1.4-.1-2.5.1-3.5.7-.5.3-1 .6-.9 1.3s.8.8 1.3.9c1.7.3 3.2-.2 4.7-.9.6-.3.8-.7.7-1.3 0-.3-.1-.4-.4-.4-.6-.2-1.3-.3-1.9-.3m30.2 4.7c-1.5.7-3.1 1.1-4.9 1-1.3 0-2.4-.4-3.4-1.3-1.5-1.4-1.6-3.2-.4-4.8 1.2-1.5 2.7-2.2 4.6-2.4 1.4-.2 2.8 0 4.2.2.3-1.5-.5-1.9-1.7-2-1.5-.1-2.9.2-4.4.5-.3.1-.7.1-1 .1-.5 0-1-.5-1.1-1-.2-.8 0-1.4.6-1.6 2.4-.8 4.8-1.3 7.3-.6 2.1.6 3.1 1.9 3.1 4v5.2c0 .4.1.5.5.5h.7c.7.1 1.2.5 1.2 1.2 0 .8-.3 1.3-1.1 1.4-1.3.2-2.5.1-3.8.1-.6 0-.2-.4-.4-.5m.1-3.8c.1-.5 0-.7-.5-.7-.8-.1-1.6-.2-2.4-.2-1 0-2 .2-2.9.7-.5.3-1 .6-.9 1.3s.8.8 1.4.9c1.7.3 3.3-.3 4.8-1 .4-.3.7-.5.5-1m14.2 4.8c-1.4 0-2.7-.2-3.9-.7-.2-.1-.4 0-.5 0-1 .5-1.8 0-2-1q-.15-1.2 0-2.4c.1-.6.5-.9 1.1-1s1.2.1 1.4.7c.2.7.7 1 1.3 1.2q2.55.9 5.1 0c.4-.2.9-.3.9-.9 0-.5-.5-.8-.9-.9-1.1-.4-2.3-.4-3.5-.6-1-.2-2-.3-2.9-.8-2.3-1-2.6-3.9-.7-5.4 1.5-1.2 3.2-1.4 5-1.4 1 0 1.9.2 2.8.6.2.1.3.1.4 0 .9-.5 1.9-.1 2 1.1v1.7c0 .7-.4 1.2-1 1.3-.7.2-1.3-.1-1.6-.8-.1-.3-.3-.4-.5-.5-1.5-.7-3-.7-4.6-.3-.2 0-.4.1-.5.2-.6.3-.6.7 0 1.1.5.3 1.1.4 1.7.4 1.4.2 2.7.4 4.1.8q1.5.45 2.4 1.8c1 1.5.7 3.3-.7 4.4-1.4.8-3 1.3-4.9 1.4m150.4-.2c-.9.1-1.9.3-2.9.2-1.6-.2-3-.7-4-2.1-.4-.8-.3-1.7-.4-2.5V8.7q0-.75-.6-.6c-.4 0-.8 0-1.2-.1-.7-.2-1.1-.7-1.1-1.4s.5-1.2 1.2-1.3c.4 0 .8-.1 1.3-.1.4 0 .5-.1.5-.5 0-.9-.1-1.8 0-2.7.1-.8.5-1.2 1.3-1.2s1.2.4 1.3 1.2c.1.9 0 1.8 0 2.7 0 .4.1.4.5.5 1.7 0 3.4-.1 5.2 0 .8.1 1.3.5 1.4 1.2 0 .9-.3 1.3-1.2 1.5-.5.1-1.1.1-1.6.1h-3.8c-.2 0-.4 0-.4.3v5.6c0 .6.3.9.9 1.1 1.8.4 3.5.1 5.1-.6.3-.1.6-.3.9-.4.6-.2 1.2 0 1.6.5s.3 1.2-.2 1.7c-.8.7-1.9 1-2.9 1.3-.3.2-.6.3-.9.4M93.9 8.1c1 2.1 2 4.1 3 6.2 1-2.1 2-4.2 3-6.2-.3 0-.5-.1-.7-.1-.8-.1-1.2-.7-1.2-1.4s.4-1.2 1.2-1.3q2.55-.3 5.1 0c.7.1 1.1.6 1.2 1.3 0 .7-.4 1.2-1.1 1.3-.1 0-.3.1-.4.1-.9-.2-1.1.4-1.4 1-1.3 2.7-2.6 5.5-4 8.2-.1.3-.2.4-.5.4h-2.3c-.3 0-.4-.1-.6-.4L91 8.5c-.2-.3-.4-.5-.8-.5-.3 0-.6 0-.9-.1-.6-.2-.9-.7-.9-1.4 0-.6.5-1.1 1.2-1.2 1.7-.2 3.3-.1 5 0 .7.1 1.2.6 1.2 1.3s-.4 1.2-1.1 1.4c-.3 0-.5.1-.8.1m92.2 8.5c-.5-1.1-1-2.2-1.6-3.3-.8-1.6-1.6-3.3-2.3-4.9-.1-.2-.2-.2-.4-.2-.3 0-.5 0-.8-.1-.6-.1-1.1-.4-1.2-1-.2-.7.1-1.2.8-1.6h.1c.6 0 1.3-.1 1.9-.1h3c.9.1 1.4.5 1.4 1.3s-.5 1.3-1.4 1.4h-.5c1 2.1 2 4.1 3 6.2 1-2.1 2-4.2 3-6.2-.3 0-.5-.1-.8-.1-.7-.2-1.1-.7-1.1-1.5 0-.7.5-1.1 1.2-1.2.2 0 .4 0 .7-.1.5.1.9.1 1.4 0h2.7c1 .1 1.5.7 1.3 1.8-.2.4-.5.8-1.1.9-.3 0-.6.1-1 .1-.3-.1-.4.1-.5.3-1.4 2.9-2.8 5.9-4.2 8.8-.2.4-.4.4-.7.4h-1.9c-.5 0-.7-.1-.9-.6.1 0 0-.2-.1-.3"/><path d="M45 12.2V18c.1 3.5-2.7 5.5-5.5 5.5-1.3 0-2.5.1-3.8-.1-.8-.1-1.2-.6-1.2-1.4 0-.7.5-1.2 1.3-1.3 1.2-.1 2.5 0 3.7-.1 1.3 0 2.2-.6 2.5-1.6.1-.3.1-.6.1-.9V8.5c0-.4-.1-.5-.5-.5h-5.1c-.3 0-.6 0-.9-.1-.7-.2-1.1-.7-1.1-1.4s.5-1.2 1.2-1.3c.4 0 .8-.1 1.3-.1h7.4c.4 0 .5.1.5.5 0 2.3 0 4.4.1 6.6m67.3 5.4h-4.6c-.3 0-.6 0-.9-.1-.8-.2-1.2-.6-1.1-1.4 0-.7.5-1.3 1.3-1.3h3.5c.4 0 .5-.1.5-.5V8.4c0-.3-.1-.4-.4-.4-.9 0-1.8.1-2.6-.1-.7-.2-1.2-.7-1.1-1.4s.5-1.2 1.3-1.3c1.8-.1 3.6 0 5.3-.1.4 0 .3.2.3.5v8.6c0 .4.1.6.6.6h3.3q1.5 0 1.5 1.5c0 .6-.4 1-1 1.2-.5.1-.9.1-1.4.1-1.6.1-3 .1-4.5 0M41.7.1H43c.3 0 .4 0 .4.4v2.2c-.1.2-.2.3-.4.3h-2.6c-.3 0-.4 0-.4-.4V.4c0-.3.1-.4.4-.4.4.1.9.1 1.3.1M111.6 3c-.4 0-1.1.2-1.4-.1s-.1-1-.1-1.5c0-.4-.2-1 .1-1.3.2-.2.8-.1 1.2-.1h1.6c.3 0 .4.1.4.4v2.2q0 .45-.3.3c-.5.1-1 .1-1.5.1m55 3.4c.5-.9 1.5-.8 2.4-1.1.2 0 .3 0 .5-.2 1.5-.3 3-.4 4.5-.1.8.3 1.6.5 2.3 1 .8.6 1.2 1.5 1.4 2.5v2q-.15 1.2 0 2.4v1.2c0 .5.3.8.8.7.4.1.7.2 1.1.3 0 0 .1 0 .1.1.6.9.5 1.4-.2 2.1-.3.1-.7.2-1 .3h-2.9c-.4 0-.9.1-.7-.7l-.6.3c-.9.4-1.9.6-2.9.7l-1.8.1c-.4-.1-.9-.2-1.3-.3-.6-.3-1.2-.6-1.8-1-.4-.4-.8-.8-1-1.3-.1-.4-.2-.7-.3-1.1 0-1.8 1-2.9 2.4-3.8.3-.2.7-.4 1-.5.7-.2 1.5-.3 2.2-.5 1.3-.2 2.5 0 3.7.2.2 0 .4.1.3-.2.1-1-.3-1.5-1.2-1.7-.3-.1-.7-.1-1-.1-1.3 0-2.6.2-3.9.5-.4.1-.8.1-1.3 0-.6-.2-.8-.8-.8-1.8m7.1 8.1c1-.3 1.2-.5 1.2-1.3 0-.3.1-.7-.4-.7-.6-.2-1.2-.2-1.8-.2-1.1-.1-2.2-.1-3.2.5-.5.1-.8.4-1.1.7-.2.2-.4.5-.2.8 0 .3.2.4.4.5.4.3 1 .4 1.5.4.7.1 1.4 0 2-.2.5-.1 1-.3 1.5-.5 0 .1 0 .1.1 0"/></svg>         `,
            surfers: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357.6 55.5" overflow="visible" xml:space="preserve"><path fill="#fff" d="M332.2 30.2c13.6 0 24.6 10.7 25.3 24-.7-27.2-23-49.1-50.4-49.1-27.9 0-50.4 22.6-50.4 50.4h50.2c0-14 11.3-25.3 25.3-25.3M39.7 28.3H27c.1-.8-.1-1.5-.4-2.1-.4-.6-.9-1-1.5-1.3s-1.4-.5-2.2-.5c-1.4 0-2.7.3-3.8.9s-1.8 1.4-1.9 2.4c-.1.4 0 .8.4 1.1.3.3 1.2.7 2.7.9l7.8 1.4c3.9.7 6.7 2 8.5 3.9s2.4 4.4 1.9 7.5c-.5 2.7-1.6 5-3.5 6.9s-4.3 3.4-7.2 4.4q-4.35 1.5-9.6 1.5c-6.2 0-10.8-1.2-13.9-3.7S-.2 45.9.1 41.9h13.7c0 1.3.5 2.2 1.3 2.9s1.9 1 3.3 1c1.5.1 2.8-.3 3.9-.9s1.8-1.5 1.9-2.5c.1-.6-.2-1-.7-1.3s-1.6-.6-3.1-.9L13.7 39c-3.9-.7-6.7-2.1-8.5-4.2C3.4 33 2.8 30.3 3.3 27c.4-2.6 1.5-4.8 3.2-6.6s3.9-3.1 6.6-4S19 15 22.6 15c5.9 0 10.3 1.2 13.4 3.5 3 2.4 4.3 5.7 3.7 9.8m28.8 9.3 3.7-22.1h14.1l-6.5 39.3H66.3l1.2-7.5h-.4c-1.2 2.5-3 4.5-5.4 5.9s-5.1 2.1-8 2.1c-2.7 0-5-.6-6.9-1.9s-3.1-3-3.9-5.2-.9-4.8-.5-7.6l4.2-25.1h14.1L57 37.6c-.3 1.9 0 3.5.8 4.6s2.1 1.7 3.8 1.7c1.2 0 2.2-.3 3.2-.8q1.35-.75 2.4-2.1c.7-1 1.1-2.1 1.3-3.4m16.6 17.2 6.5-39.3h13.7l-1.2 7.5h.4c1.2-2.8 2.7-4.8 4.4-6.1s3.7-1.9 5.8-1.9c.6 0 1.2 0 1.8.1s1.1.2 1.7.4l-2 12.1c-.7-.3-1.5-.4-2.5-.5s-1.9-.2-2.6-.2c-1.4 0-2.6.3-3.8.9s-2.2 1.5-3 2.6-1.4 2.4-1.6 3.9l-3.4 20.5zm59.6-39.3L143 25.8h-26.3l1.7-10.2h26.3zm-27.9 39.3 6.7-40.4c.5-3.2 1.5-5.9 3.1-8.1q2.25-3.15 5.7-4.8c2.3-1.1 4.9-1.6 7.7-1.6 1.8 0 3.5.1 5.2.4s2.9.5 3.6.7l-3.7 10.1c-.5-.2-1.1-.3-1.7-.4s-1.2-.1-1.8-.1c-1.3 0-2.2.3-2.8.8-.6.6-.9 1.3-1.1 2.2l-6.9 41h-14zm43.8.7c-4.2 0-7.7-.8-10.4-2.4s-4.7-3.9-5.8-7c-1.1-3-1.3-6.7-.6-10.9.7-4.1 2.1-7.6 4.2-10.6s4.8-5.4 8.1-7.1 6.9-2.5 11-2.5c3 0 5.6.5 7.8 1.4s4.1 2.3 5.5 4c1.4 1.8 2.4 3.9 2.9 6.4s.5 5.3 0 8.4l-.5 3.3h-35.1l1.2-7.8H171q.3-1.65-.3-3c-.4-.9-1-1.5-1.8-2s-1.8-.7-3-.7-2.2.2-3.3.7c-1 .5-1.9 1.2-2.6 2.1s-1.2 1.9-1.4 3.1l-1.5 8.2c-.2 1.3-.1 2.4.2 3.4.4 1 1 1.8 1.9 2.3s2 .8 3.4.8c1 0 1.9-.1 2.7-.4.9-.3 1.6-.7 2.3-1.2s1.2-1.2 1.6-1.9h12.9c-.9 2.7-2.4 5.1-4.4 7.1s-4.4 3.6-7.3 4.7-6.2 1.6-9.8 1.6m23.3-.7 6.5-39.3h13.7l-1.2 7.5h.4c1.2-2.8 2.6-4.8 4.4-6.1s3.7-1.9 5.8-1.9c.6 0 1.2 0 1.8.1s1.1.2 1.7.4l-2 12.1c-.7-.3-1.5-.4-2.5-.5s-1.9-.2-2.6-.2c-1.4 0-2.6.3-3.8.9s-2.2 1.5-3 2.6-1.4 2.4-1.6 3.9L198 54.8zm69.7-26.5h-12.7c.1-.8-.1-1.5-.4-2.1-.4-.6-.9-1-1.5-1.3s-1.4-.5-2.2-.5c-1.4 0-2.7.3-3.8.9s-1.8 1.4-1.9 2.4c-.1.4 0 .8.4 1.1.3.3 1.2.7 2.7.9l7.8 1.4c3.9.7 6.7 2 8.5 3.9s2.4 4.4 1.9 7.5c-.5 2.7-1.6 5-3.5 6.9s-4.3 3.4-7.2 4.4q-4.35 1.5-9.6 1.5c-6.2 0-10.8-1.2-13.9-3.7s-4.5-5.7-4.2-9.7h13.7c0 1.3.5 2.2 1.3 2.9.8.6 1.9 1 3.3 1 1.5.1 2.8-.3 3.9-.9s1.8-1.5 1.9-2.5c.1-.6-.2-1-.7-1.3s-1.6-.6-3.1-.9l-6.8-1.2c-3.9-.7-6.7-2.1-8.5-4.2q-2.7-3.15-1.8-8.1c.4-2.6 1.5-4.8 3.2-6.6s3.9-3.1 6.6-4 5.9-1.4 9.5-1.4c5.9 0 10.3 1.2 13.4 3.5 3 2.7 4.2 6 3.7 10.1"/></svg>      `,
   kusthotellet: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 162.7 41.5" overflow="visible" xml:space="preserve"><path d="M162.7 41.2v-2.7h-7.1V22.2h-2.9v19zm-14.6 0v-2.7H141V22.2h-2.9v19zm-15.1 0v-2.6h-8v-6h6V30h-6v-5.1h8v-2.6h-10.8v19H133zm-20.3 0V24.9h4v-2.7h-10.9v2.7h4v16.3zm-19.6-2.4c-3.9 0-6.8-3-6.8-7s2.9-7 6.8-7 6.8 3 6.8 7c0 3.9-2.9 7-6.8 7m0 2.7c5.3 0 9.7-4.4 9.7-9.8 0-5.3-4.4-9.7-9.7-9.7-5.4 0-9.7 4.4-9.7 9.7 0 5.4 4.3 9.8 9.7 9.8m-14.4-.3v-19h-2.9v7h-6.9v-7H66v19h2.9v-9.3h6.9v9.3zm-22.1 0V24.9h4v-2.7H49.7v2.7h4v16.3zm-15.9.3c3.2 0 5.7-2.4 5.7-5.5 0-5.2-7.3-6.9-7.3-9.6 0-1 .7-1.8 1.7-1.8.8 0 1.4.6 1.9 1.3l2.1-1.7c-.9-1.4-2.3-2.2-4.1-2.2-2.4 0-4.5 1.8-4.5 4.4 0 4.7 7.3 6.2 7.3 9.6 0 1.7-1 2.9-2.8 2.9-1.5 0-2.7-.9-3.4-2.6l-2.5 1.4c1.1 2.5 3.5 3.8 5.9 3.8m-16.9-2.7c-1.8 0-3.3-1.5-3.3-3.8V22.2h-2.9v12.3c0 4.9 2.9 6.9 6.2 6.9s6.3-2 6.3-6.9V22.2h-2.9V35c0 2.3-1.5 3.8-3.4 3.8M2.9 41.2v-7l1.2-1.6c.3-.5.6-1 .7-1 0 0 .2.5.5 1.1l4.4 8.6H13l-6.3-12 5-7H8.4l-5 7c-.3.4-.6.9-.6 1 0-.1.1-.7.1-1.2v-6.7H0v19h2.9zm117.6-29.5c2.1 0 3.6-1.4 3.6-3.4 0-3.2-4.4-3.9-4.4-5.4 0-.5.4-.8.8-.8.5 0 .9.3 1.2.8l1.6-1.4c-.6-.9-1.5-1.5-2.8-1.5-1.6 0-3.1 1.2-3.1 2.9 0 3.1 4.4 3.7 4.4 5.4 0 .7-.5 1.2-1.3 1.2s-1.5-.5-2-1.4l-1.9 1.3c.8 1.6 2.3 2.3 3.9 2.3m-6.1-2.2V5.3H110v2h2.3v1.4c-.6.6-1.5.8-2.3.8-1.9 0-3.4-1.6-3.4-3.6s1.5-3.6 3.4-3.6c1.1 0 2 .5 2.6 1.3l1.7-1.5c-1.1-1.3-2.5-2-4.3-2-3.2 0-5.8 2.6-5.8 5.8s2.5 5.8 5.8 5.8c1.9 0 3.3-.9 4.4-2.2m-16.6-4h-1.5V2.3h1.5c1.1 0 1.8.6 1.8 1.6s-.7 1.6-1.8 1.6m-1.5 6V7.6h1.8l1.6 3.9h2.5L100.3 7c1-.6 1.6-1.7 1.6-3.2 0-2.3-1.4-3.7-3.7-3.7H94v11.4zm-5.6 0v-2h-4.6v-3h3.2v-2h-3.2V2.2h4.6v-2h-6.9v11.4h6.9zM75.5 4.2V1.8h.9c1.6 0 1.3 2.4 0 2.4zm0 5.4V6.3h1.3c2.2 0 2.3 3.3 0 3.3zm1 1.9c3 0 4.3-1.5 4.3-3.5 0-1.5-.9-2.6-2.3-3.1.7-.4 1.2-1.1 1.2-2.1 0-1.5-1-2.6-3-2.6h-3.5v11.4h3.3zm-10.7-6h-1.5V2.3h1.5c1.1 0 1.8.6 1.8 1.6s-.6 1.6-1.8 1.6m-1.4 6V7.6h1.8l1.6 3.9h2.5L68.4 7c1-.6 1.6-1.7 1.6-3.2C70 1.5 68.6.1 66.3.1h-4.1v11.4zM53.7 5.8c.3-1.1.7-2.3.8-3.2.1.7.5 2.1.8 3.2l.4 1.2h-2.3zm3.3 5.7h2.5L55.8.2h-2.6l-3.7 11.4H52l.8-2.7h3.4zM44.4 5.9c-.3 1.1-.7 2.3-.8 3.2-.1-.9-.5-2.1-.8-3.2L41.1.2h-2.5l3.7 11.4h2.6L48.6.2h-2.5z"/></svg>      `,
      solviken: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 223.3 47.9"><defs><style>.st0{fill:#fff}</style></defs><path class="st0" d="M13.3 38.4c0 .7-.1 1.3-.2 1.9s-.2 1.3-.4 1.8-.6.9-.9 1.3c-.3.5-.5.9-.9 1.3-.3.4-.5.8-.9 1.1-.3.3-.7.6-1.1.9-.3.2-.8.3-1.1.5-.4.2-.7.5-1 .6 0 0-.1-.1-.2 0l-.2.2c-.4 0-.8-.3-1.2-.7s-.6-.7-.6-1.1.3-1 1-1.3c.4-.1.8-.4 1.2-.8.3-.3.7-.6 1-1.1.2-.4.4-.8.6-1.3.2-.4.2-.9.3-1.3 0-.4.2-.9.2-1.4s0-1.1-.2-1.6c0-.6-.3-1-.5-1.5s-.3-1-.6-1.5-.6-1-1-1.5c-.3-.4-.7-.9-1.1-1.4-.4-.4-.7-1-1.1-1.4s-.9-.8-1.3-1.2c-.4-.5-.6-1-1-1.5s-.9-.9-1.1-1.3-.4-.9-.6-1.4-.2-1-.3-1.5c0-.5-.3-1-.3-1.5s.1-1 .2-1.5c0-.5.3-.9.4-1.4.2-.5.3-1 .5-1.4s.6-.8.9-1.2.5-.8.9-1.1.8-.5 1.2-.7.9-.2 1.4-.3c.4 0 .9-.2 1.4-.2h1.5q.9 0 1.5.3c.5.2.9.5 1.3.9.3.4.6.8.8 1.3.2.4.2 1 .3 1.5v1.5c0 .5 0 .8-.1 1.2v1.3c0 .4-.4.7-.7.9-.4.2-.7.5-1.1.5s-.9-.1-1.2-.3-.5-.6-.5-1.1c0-.6-.2-1.2-.3-1.7-.1-.7-.1-1.3-.3-1.7-.3-.7-.8-1.1-1.5-1.1s-1.1.5-1.5 1.1c-.2.3-.4.8-.5 1.4 0 .4-.2.9-.2 1.4s.2 1.2.3 1.8c.2.6.3 1.2.6 1.7.2.4.6.8.9 1.2s.6.7 1 1.1c.3.3.5.9.8 1.2.6.7 1.2 1 1.5 1.3s.6 1 .9 1.4c.3.5.6.9.9 1.4s.7.9.9 1.4.3 1 .4 1.5.4 1 .5 1.5v1.6Zm31.9-7.7c0-.5-.1-1-.1-1.5V26c0-.5-.3-1-.4-1.5 0-.5 0-1-.2-1.4-.1-.5-.2-1-.3-1.4-.1-.5-.5-.9-.6-1.3-.2-.5-.2-1-.4-1.4-.2-.5-.6-.9-.9-1.3-.3-.5-.4-1-.8-1.4-.3-.4-.7-.8-1.1-1.1-.3-.3-.7-.6-1.1-.8s-.8-.5-1.2-.6-.9 0-1.3 0h-1.3c-.4.1-.8.4-1.2.6s-.7.5-1.1.8-.8.7-1.1 1.2c-.3.4-.5.9-.8 1.4-.2.4-.4 1-.6 1.5-.2.4-.4.9-.5 1.3-.2.4-.5.8-.6 1.3s-.2.9-.3 1.4-.1 1-.2 1.4c0 .5-.2 1-.3 1.5 0 .5-.2 1-.2 1.5s-.2 1-.2 1.5.1 1 .1 1.5v4.8c0 .5.3 1 .4 1.5 0 .5 0 1 .2 1.4.1.5.2.9.4 1.4.1.5.2.9.4 1.4s.4.9.6 1.3l.6 1.5c.3.5.6.8.9 1.3.3.4.6.9.9 1.3.3.3.8.4 1.2.7.4.2.8.4 1.2.5s.8.4 1.3.4.9-.1 1.3-.2.8-.4 1.2-.6.7-.5 1-.8c.4-.4.9-.6 1.2-1.1.3-.4.6-.9.8-1.4.2-.4.5-.9.7-1.4.2-.4.3-.9.5-1.4s.4-.9.5-1.3c.1-.5.2-.9.3-1.4s.2-.9.3-1.4c0-.5.3-1 .4-1.5 0-.5.2-1 .2-1.5v-1.6c0-.5.1-1 .1-1.5Zm-5 6.3c0 .5-.1.9-.2 1.4 0 .5 0 .9-.2 1.4-.1.6-.3 1.1-.5 1.6-.2.6-.4 1.1-.7 1.5-.2.4-.5.7-.8.9s-.7.2-1.2.2c-.8 0-1.3-.4-1.8-1.1-.3-.4-.6-.9-.8-1.4s-.3-1-.4-1.6c0-.5-.1-.9-.2-1.4 0-.5-.2-.9-.3-1.4 0-.5-.2-.9-.2-1.4v-1.6c0-.5.2-1.1.2-1.6v-3.2c0-.6 0-1.1.1-1.6 0-.6 0-1.1.1-1.6 0-.5.1-.9.2-1.4v-1.4c0-.5.2-.9.2-1.4.1-.6.3-1.1.5-1.6.2-.6.5-1 .8-1.4.2-.4.4-.7.7-.9s.7-.2 1.1-.2.8 0 1.1.3c.3.2.5.5.8.8.3.4.6.9.8 1.4s.3 1 .4 1.6c0 .4.3.9.3 1.3v1.4c0 .4.3.9.3 1.4s0 1.1.1 1.6c0 .5-.2 1.1-.2 1.6V34c0 .6-.2 1.1-.3 1.6s0 .9 0 1.4Zm22.7-19.5v-2.2zm.1 4.4v-3.3zm3.4 3.1v.9-1Zm.3 14.9V39v.8ZM66.9.7v1.8zm0-.2v.1h.2s-.2-.2-.2-.1m.4 47.1h-5.4q-.6 0-.9-.6c-.2-.4-.2-.9-.2-1.5s.1-.8.3-1.2.4-.4.7-.4.2-.2.4-.2.3.2.3.2v-.1c0-.4.1-.8.2-1.4V41c0-.5.3-.9.3-1.4s-.2-1-.2-1.5.1-.9.1-1.4v-1.5c0-.5.1-1 .1-1.5s-.2-1-.2-1.5.1-1 .1-1.5v-3c0-.7-.1-.7-.1-1.5v-3c0-.5 0-.7.2-.9v-7.1c0-.6-.3-1.1-.3-1.6v-3.1c0-.5 0-.9-.1-1.4V4.9c0-.2-.1 0-.2 0h-1c-.4 0-.6-.3-.8-.6s0-.8 0-1.3 0-1 .3-1.4c.2-.4.4-.5.7-.5s.5-.1.9 0c.6 0 1.1-.1 1.4-.1h1.4c.7 0 1.3.1 1.8.2v1.9c0 .4.1.8.1 1.2v1.6c0 .5-.1 1.1-.1 1.6v3.2c0 .5-.2 1.1-.2 1.6v4.2c0 .5-.1 1-.1 1.4 0 .5-.2 1-.2 1.4v1.4c0 .8.1.8.1 1.7v1.7c0 .9-.2.8-.3 1.3s0 .2 0 .4V32c0 .5.3 1 .3 1.5s-.3 1-.3 1.5v.2c0 .5.3.9.3 1.3v1.6c0 .4 0 .8-.1 1.2v.9c0 .4.2.8.2 1.1 0 .5.2 1.1.3 1.6v1.6c0 .5.1 1.1.1 1.6v1.7Z"/><path class="st0" d="M61.4.6c-.3 0-.5.2-.7.5-.2.4-.3.8-.3 1.4 0-.6 0-1 .2-1.4s.4-.5.8-.5m1.6 18v-1zm41.9-2.8c0 .7-.2 1.1-.6 1.4s-.8.5-1.4.6c0 0-.2 0-.3.1h-.3v-.1c-.2.5-.3 1-.4 1.5s-.3 1-.4 1.5-.2 1-.4 1.5c-.1.5-.2 1-.4 1.5-.1.5-.3 1-.5 1.5-.1.5-.3 1-.5 1.5-.1.5-.1 1-.3 1.5-.1.5-.4 1-.5 1.5l-.3 1.5c-.2.8-.3 1.5-.4 1.9-.1.5-.3 1-.5 1.6-.1.5 0 1.1-.2 1.6-.1.5-.3 1.1-.4 1.6s-.4 1-.5 1.5-.1 1.1-.2 1.6-.3 1.1-.4 1.6c-.1.6 0 1.1-.1 1.6-.1.6-.3 1.1-.4 1.6-.2.4-.5.7-.8 1s-.6.4-1 .4c-.9 0-.9.1-1.7.1s-.9.2-1.7 0c-.1-.6-.3-1.1-.4-1.6-.1-.6-.3-1.1-.4-1.6-.1-.6-.2-1.1-.3-1.6s-.1-1-.2-1.5-.3-1-.4-1.5l-.6-3c-.1-.5 0-1-.2-1.5-.1-.5-.4-1-.5-1.4-.1-.5 0-1-.2-1.5-.1-.5-.4-1-.5-1.4l-.3-1.5c-.1-.5-.1-1-.2-1.5s-.4-1-.5-1.4c-.1-.5-.1-1.1-.3-1.6-.1-.5-.3-1.1-.5-1.6-.1-.5-.3-1-.5-1.6-.2-.5-.2-1.1-.3-1.6-.2-.5-.4-1-.5-1.5s-.4-1-.6-1.5l-.6-1.5c-.2-.5-.3-1.1-.5-1.6h3c.9 0 1.5.2 1.8.2h3.1c.4 0 .7.2 1 .6s.6.8.6 1.3-.1 1.1-.5 1.5c-.3.4-.7.6-1.1.6s-.7-.3-1.2-.6c-.2-.1-.3-.2-.3-.2 0 .5 0 1 .1 1.5 0 .5.3 1 .4 1.4v1.5c0 .5.1 1 .2 1.5 0 .5.3.9.4 1.4 0 .5.2 1 .3 1.5 0 .5 0 1 .1 1.5s.3 1 .5 1.5c.1.5.3 1 .4 1.5s.1 1 .2 1.5.4 1 .5 1.5.2 1 .4 1.5l.3 1.5c.1.5.3 1 .4 1.5s.3.9.4 1.4c.1-.5.4-.9.5-1.3l.3-1.5.3-1.5c.1-.5 1.5-6.9 1.6-7.4s.1-1 .2-1.5c0-.5.3-1 .4-1.5 0-.5.1-1 .2-1.5s.3-1 .4-1.5c0-.5 0-1 .2-1.5 0-.5.2-1 .2-1.5s.4-1 .5-1.5h-.1l-.1.2q-.45.6-.9.6c-.5 0-.8-.3-1.1-.6-.2-.4-.3-.8-.3-1.3s.1-1 .4-1.4.6-.7 1.1-.7h1.8c.8 0 1.3.2 1.7.2h1.8c.7 0 1.2-.3 1.7-.3.4 0 .6.3 1 .7.3.4.5.7.5 1.2Zm21 28.2v.7zm-.4-13.1v.4-.7zm-2.8-8.7V22zv.6zm2.9-16h-.2c.3 0 .6-.2.9-.3-.2 0-.4.2-.7.2Zm2.5-4.3c-.2-.3-.4-.6-.7-.9s-.6-.5-1-.7q-.6-.3-1.2-.3h-2.4c-.6 0-.8 0-1.2.2-.3.2-.7.5-1 .7-.3.3-.6.6-.8 1q-.3.6-.3 1.2c0 .6.2 1 .4 1.4s.4.9.8 1.2 1 .3 1.5.4 1 .5 1.5.5 1-.3 1.4-.5h.2c.2 0 .5-.1.7-.2h.1c.2 0 .4-.2.7-.4.4-.3 1-.5 1.2-1 .2-.4.2-1 .2-1.5s-.2-.8-.3-1.1Zm-7.2-.8c.1-.1.3-.3.5-.4-.2.1-.3.2-.5.4l-.3.3s.1-.2.2-.3Zm5.2 44.7c0 .5.2 1.1.2 1.6h-4.4V46c0-.4.2-.9.2-1.4v-1.4c0-.5.2-.9.3-1.3v-2.8c0-.5.3-1 .4-1.5 0-.5-.1-1-.1-1.5v-3c0-.5.1-1 .1-1.5v-3.4c0-.5-.1-1-.1-1.5s0-1-.1-1.5c0-.5.3-1 .3-1.5V22c0-.5-.3-.9-.4-1.2v-1.4c0-.7.2-1.3.1-1.5-.1 0-.5.1-.7 0-.2 0-.4-.2-.5-.2-.6-.2-1-.7-1-1.7s.1-1.1.3-1.5.6-.6.9-.6h5c0 .6-.1 1.1-.2 1.6 0 .5-.2 1.1-.2 1.6s-.1 2.7-.1 3.2c0 .6-.1 1.1-.1 1.6s.2 1 .2 1.5-.2 1-.2 1.5 0 1-.1 1.5c0 .5.2 1 .2 1.5v1.5c0 .5-.2.7-.3 1.2v.7c0 .4.1.5.1 1.2v1.4c0 .5-.2.9-.2 1.4s.2.9.2 1.4v2.8c0 .5.1 1.1.1 1.6s.2 1 .2 1.6c0 .5-.2.9-.2 1.4v.7c0 .4.2.7.2 1.1Zm19.1-16.5v.2zm.1-24.4v.4-1.8zm3.4 20.2v.9-1Zm5.4 20.4c-.1-.5-.3-.9-.5-1.4 0 .1 0 .2.1.4.1.4.2.7.3 1.1Zm1-8.4s0-.2-.1-.2c0-.2-.1-.4-.2-.6.1.3.2.5.3.8"/><path class="st0" d="M160.8 47.3c-.3 0-.9.1-1.6.2-.9.1-1.5.2-2 .2-.7 0-1.3-.2-1.8-.5-.5-.2-.8-.6-1.1-1.2s0-.3-.1-.4c-.1-.4-.2-.7-.3-1.1 0-.1 0-.2-.1-.4-.2-.4-.3-.7-.5-1.1-.2-.5-.5-.9-.7-1.5-.2-.5-.3-1-.4-1.5-.2-.5-.5-.9-.7-1.5-.2-.5-.1-1.1-.3-1.6s-.6-.9-.8-1.4l-.6-1.5c-.2-.5-.2-1-.4-1.5-.2.3-.2.7-.3 1.5 0 .4-.2.9-.2 1.4v2.9c0 .5-.2.9-.2 1.4s.2.9.2 1.4v3.1c0 .6.3 1.1.4 1.6v1.7h-1.7c-.2 0-.6.1-1.1.2h-2.3c0-.5.1-1.1.2-1.6 0-.5 0-1.1.1-1.7V41c0-.5.2-1.1.2-1.7v-8c0-.5.2-1 .2-1.5 0-.6-.3-1.1-.3-1.6 0-.8.1-.8.1-1.5s.2-.8.2-1.4c0-.8-.2-.8-.2-1.6s.1-.8.1-1.5v-1.5c0-.7.1-.8.1-1.5s-.3-1-.3-1.6v-3.2c0-.6.2-1.1.2-1.6v-1.6c0-.8.1-1.3.1-1.6 0-.5-.2-1-.3-1.4 0-.5.2-1 .2-1.5V2.4c0-.5-.2-1.1-.2-1.6.5-.2.7.2 1.2.2h1.2c.7 0 1.2.1 1.5.6s.5 1.1.5 1.8-.3 1.1-.4 1.6c0 .6.2 1.1.1 1.6v3.2c0 .6-.2 1.1-.2 1.6v6.7c0 .3-.2.7-.2 1v2.5c0 .3.2.6.2.9v1.7c0 .9-.2.8-.3 1.3v1c0 .3.1.5.3 1.1.4-.4.6-.9 1.1-1.4.4-.4.7-1 1.2-1.5.4-.4.8-.8 1.1-1.2.4-.5.8-.9 1.1-1.3.2-.3.4-.7.7-1.1.2-.3.5-.7.7-1.1s.4-.7.7-1.1c.5-.9 1.2-1.3 1.8-1.3s1 .1 1.3.5c.4.4.5 1 .5 1.4s-.3.5-.5.8c-.2.2-.5.7-.9 1.2-.2.3-.4.7-.7 1.1-.2.3-.5.7-.8 1.1-.3.5-.5.9-.8 1.3-.3.5-.5.9-.8 1.3-.3.5-.7.8-1 1.1-.7.9-1.2 1.4-1.6 1.5.1.5.5.9.7 1.4s0 1 .2 1.5.5.9.7 1.3c.2.5.2 1 .4 1.4.2.5.2 1 .4 1.4 0 .2.2.5.2.7v.1c0 .2.1.4.2.6 0 0 0 .2.1.2.2.3.6.6.7 1 .2.5.3 1 .5 1.4s.4.9.7 1.3c.2.4.5.8.8 1.3.2.4.5.8.8 1.3.2.4.2 1 .5 1.4s.7.8.9 1.2c.3.4.6.9.8 1.3Zm29.5-8.9c-.3-.3-.7-.5-1.2-.5s-1 0-1.3.4c-.2.4-.4 1-.5 1.8 0 .5 0 1-.2 1.5s-.6.8-.8 1.2c-.3.4-.6.8-1.2.9-.4.1-1 .1-1.5.1s-1.4-.1-1.9-.4c-.6-.3-1.1-.8-1.3-1.4-.1-.4 0-.9 0-1.4 0-.4-.1-.9-.2-1.4 0-.4-.2-.9-.2-1.4V35c0-.5-.2-1.2-.2-1.7v-1.8c.7-.3.8.1 1.6.1s.8-.2 1.6-.2h4.7c.8 0 .8.2 1.6.2s.8 0 1.5-.2V30c0-.5-.1-1-.1-1.5V27c0-.5 0-1-.1-1.5 0-.5 0-1-.1-1.5 0-.5-.4-1-.4-1.4 0-.5 0-1-.2-1.5-.1-.5-.3-1-.4-1.4-.2-.5-.2-1-.4-1.4-.2-.5-.5-.9-.8-1.3-.3-.5-.4-1-.7-1.4s-.7-.9-1.1-1.2-1-.3-1.5-.5c-.5-.1-1-.4-1.5-.4v.1c-.5 0-1-.1-1.4 0-.5.1-.9.3-1.3.5s-.7.6-1.1.9-.9.6-1.2 1-.6.8-.8 1.3c-.2.4-.6.8-.8 1.3-.2.4-.3.9-.4 1.3-.2.4-.2.9-.4 1.3-.1.4 0 .9-.2 1.4 0 .5-.4.9-.5 1.3s-.2 1.1-.2 1.6 0 1.1-.1 1.6v9.2c0 .5 0 1 .1 1.5v1.7c0 .6.3 1.1.4 1.7s.4 1.1.6 1.6.2 1 .5 1.4c.2.4.7.7 1 1s.6.7 1 1 .9.7 1.4.9 1.1.1 1.6.2 1 .2 1.6.2h1.4c.5 0 .9-.1 1.4-.2.5 0 .9-.4 1.3-.5.5-.2.9-.3 1.2-.6.5-.4 1-.7 1.3-1.3.2-.5.4-1.1.5-1.7.1-.5 0-1.1.1-1.8 0-.5.3-1.2.3-2.1s-.3-.7-.7-1.1ZM180 23.7c0-.6.3-1.1.4-1.6 0-.6.1-1.1.3-1.6.1-.4.4-.8.5-1.1.2-.4.4-.8.6-1.1.5-.6 1-.9 1.8-.9s1.2.2 1.6.7c.3.4.2 1 .4 1.7 0 .4.1 1 .2 1.5 0 .5.1 1 .1 1.5v3.1c0 .5.1 1 .1 1.5-.7.3-.7 0-1.5 0H180c-.7 0 0 0 0 0 0-.5.2-.9.2-1.3v-1.3c0-.5-.1-.9 0-1.3Zm43.3 23.7h-2.1c-.6 0-1-.2-1.2-.2-.3 0-.7.1-1.2.2h-1c0-.5.3-1 .3-1.5v-1.5c0-.5.3-1 .3-1.5v-1.5c0-.4 0-.9.1-1.5v-3c0-.5.1-1 .2-1.5v-5.1c0-.9-.2-1.1-.2-1.6v-3c0-.6.1-1.1 0-1.5 0-.7 0-1.2-.1-1.8v-1.8c-.1-.7-.4-1.2-.6-1.6-.3-.6-.8-.9-1.4-.9s-.8.2-1.2.6c-.3.2-.7.5-1 .9s-.5.9-.8 1.4c-.2.5-.3 1-.5 1.5s-.3 1-.5 1.5c0 .3-.1.8-.2 1.2 0 .4-.2.8-.2 1.2v6.4c0 .7-.1 1.1-.1 1.6s.1 1.1.1 1.6v3.2c0 .6.1 1.2.2 1.6v1.8c0 .4.2.8.3 1.1 0 .1 0 .3.2.3h.4c.5 0 .8.2 1 .5s.1.7.1 1.2-.2 1-.4 1.3c-.3.4-.6.6-1.1.6s-.4 0-.7-.1h-2.5c-.9 0-1.6.3-2.1.3v-1.5c0-.4.2-.9.3-1.5v-3c0-.5.2-1 .3-1.5v-4.5c0-.5.1-1 .1-1.5v-2.7c0-.6.2-.6.2-1.2V29c0-.5-.2-.9-.2-1.3 0-.5.2-.9.2-1.4s-.2-.9-.2-1.3v-6c0-.6-.3-1.1-.4-1.6v-3.2c.7-.2.7 0 1.4 0h1.4c.7 0 1 .2 1.4.5.3.3.4.8.4 1.4.4-.5.9-.9 1.3-1.2.5-.3 1-.5 1.6-.7.5-.2 1.1-.4 1.7-.4.5 0 1 0 1.5.2.5.1 1 .3 1.4.5.4.3.6.7.9 1s.6.7.8 1.1.4.9.6 1.4c.1.5.3 1 .4 1.5 0 .6.1 1.1.2 1.7 0 .6.1 1.2.1 1.8v6.6c0 .5-.2 1-.2 1.4 0 .5.1 1 .1 1.5v5.4c0 .6.1 1.2.1 1.8s-.1 1.1 0 1.7c0 .6.2 1.1.3 1.7 0 .6.1 1.1.2 1.7 0 .5-.1 1 0 1.3 0 .6.1 1 .2 1.3Z"/></svg>      `,
      olles: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 147.7 59.5"><defs><style>.st0{fill:#fcfcfb}.st1{fill:#e64c14}.st2{fill:#1f202a}</style></defs><path class="st1" d="M0 7.9h23.8v42.3H0z"/><path class="st2" d="M112.6 0H146v59.5h-33.4z"/><path class="st0" d="M123.4 38.8v2.4z"/><path class="st1" d="M113.5 59.5h34.2V0h-34.2zm9.1-1.7c0-.6.6-.6 1-.2-.2.4-.6.6-1 .2m1 .5c0-.4.4-.6 1-.5.1.8-.6.9-1 .5m1-.7v-.5h1c.2.7-.5.4-1 .5m1.2 1.2h-.5v-.5h.5zm2.9-1c-.3-.8.8-.2.5-1 .3 0 .2.6.2 1zm1.7-.2c-.3 1.1-1-1.1 0-.7 0 .4-.4.6 0 .7m2.6.7h-.5v-.5h.5zm1-3.1c.8-.3.6.4 1 .5-.5.3-.7 1.1-1.5 1.2.2-.8 1-.8.5-1.7m0 2.9c.2-.2.5-.3 1-.2-.3.3-.3.6.2.7-.2.5-1.4.1-1.2-.5m1.5-1.5c1.2-.1 0 .9 1 .7-.3.6-1.3 0-1-.7m1.2-8.2c-.6.5-.6-.1 0-.2.2-1.1 1.1-1.5 1.2-2.7.6 1-1 1.9-1.2 2.9m5.1-15.8c.3-.4 0 .7.2 1.5-.5-.2-.7-1.1-.2-1.5m1.4 1.7c-.8 0-1.1-.6-1-1.5.7-.3.9 1.2 1.2.5.7.2-.6.4-.2 1m-6.3-20.6c0 .8.8.8 1 1.5s-.3.6-.2 1.2c.6 1.5 1.7 2.5 2.9 3.4.3 1.6 1.3 3.3 1.7 5.3.3 1.7-.3 3.9 1.2 4.8-.6 1-1.2.8-2.2 1.2-1.1-5.1-2.2-10.3-5.1-13.6-1.3 1.2-1.5 3.5-1.9 5.6-1.3 5.5-2.3 13.6-.7 20.4-.8 0-.8-.8-1.7-.7 0 1 1.3.9 1.9 1.5.3 1.7.8 3.2 1.7 4.4-1.1 1.7-2.3 3.3-2.7 5.8 0 1 .8-.2 1 .5 0 1.1-.7-.1-1 .5.8.5.6.6.5 1.7-.3-.5-1.1-.6-1.2-1.2-.6 0 .1 1.1-.7.7.3.3.9.4 1.2.7 0 .5-.7.3-.5 1-.8.6-1.2-.7-1.2.2-.9.2 0-.9 0-1.2-.4-1.9.6-4.4.2-7 .5-.1.7-.6 1.5-.5.5-1.4 0-3.7 1-4.6-.5-.7-1.5-1-2.2-1.5.5-1.9.8-4.4-.7-5.3-.9 1.7-1.6 3.2-1.2 5.6-4.4.9 1.2 8.3-2.4 10.4 0 1.7.9 2.3.7 4.1-.7-.2-.5.5-.7.7-.8-4.7-3.3-8.9-2.7-14.3 0-.6-.5-.6-1-.7v-.9c-.2 0-.4-.2-.5-.3 0-1 .3-2.5-.5-2.9l.2-.5c.8-2.8-.5-7.7.9-9.8.5-2.6 1.6-5.2 1.2-7.7-.3-1.8-1.5-2.8-2.4-4.6-1.3 2.9-2 6-3.2 9.7-.5 1.7-1.6 3-1.5 5.1 0 1.2.8 2.8 0 4.6-.9.2-.9-.5-1.7-.5-.6-2.4.2-5.9.7-9.5.2-1.1.2-2.3.5-3.4.2-.5.8-1.1 1-1.7.6-2.4.5-4.2 1-6.8.7-3.4 3.4-4.6 6.3-5.8-.5-3.1-2.1-6 0-8.7 3.6-1.2 5.2 1.3 5.1 4.6-.9-.3-.9-1.6-1.2-2.4-.7.2-.7.2-1.5 0 .3.3.2.5-.2.5-.3 1.5 1.7.8 1.7 1.9-.4.2-.7.9-1.7.2v1c.4.9.4-.7 1.2-.2.7.6.2.9.2 1.9-.7 0-1-.4-1.7-.5.6.8.6 1 1 2.4 2.1 1.1 5.3 3.2 5.6 6.3 1 0 .8-1.2 1.2-1.7-.6-1.6-3.8-2.8-1.7-4.8 1.4.8 2.2 2.3 2.9 3.9.7-.5 1-1.6 1.2-2.7-.7-.9-2.2-2.2-1-3.6.9.1.6 1.5 1.9 1.2 2-1.4 2.6-4.3 5.3-5.1-3.4 2.3-5.2 6.3-7 10.2Zm2.9 3.6c-.6-.5-1-1.1-1.2-1.9.6.5 1 1.1 1.2 1.9m-4.6 29.9c-.9-1.3-1.7-4.4-1.7-7.8.5 2.7.9 5.4 1.7 7.8"/><path class="st0" d="M60.1 49.3v-.1zm0 .8h.1Zm.3-2.7v-.1Zm-.3.5.1.1h.1-.1Zm3.9-.3v.1Zm-.4 1.7s0 .2.1.1Zm-2.7.2"/><path class="st2" d="M61.1 48.7H61v-.4c0 .3 0 .6-.2.9v.4h.4v.2h.2v-.4.1h.2Zm-.1.1"/><path class="st0" d="M60.4 49.3h-.1zm-2.5-2.4h-.1zm0 2.6h.1Zm1.9.6V50h.1Zm0 .3h.1zm4.3-2.6v-.1.2Zm3.8 1.5v.1Zm-.2-.2h.1Zm-1.3-1.6v-.1Zm-2.3 2.6V50Zm2-2.1v.1Zm0-.3v.1Zm4.4 1.8"/><path class="st2" d="M69.8 47.4h.1v.2c-.2 0-.4.3-.3.6 0 0 0 .2 0 0v1.4c0 .2 0 .3.3.4 0 0 0-.1 0 0v-2.1c0-.2 0-.3-.2-.4Zm-.3 2v.2-.4s0 .1 0 0zv.3Z"/><path class="st0" d="M68 49.6h-.1s.1 0 0 0Zm.5-2v-.1zm-4.9.5V48Zm-.9-.4h-.1Zm0-.8h.1zm-.3.3v-.1Zm1-.1h-.1Zm-.6 1"/><path class="st2" d="M63.5 48.3v-.2c0-.3-.2-.5-.4-.5h-.2v.5h.4s.2 0 .2-.1Zm-.6.1"/><path class="st0" d="M62.5 47.5s-.1-.1 0-.2v.1h.1s0 .1.1.1Zm1 1.8s.1 0 0 0m0 .5.1-.1Zm-.7-.7h.1Zm-.1-.4v.2Zm.1-.1h-.1Zm0-1h-.2zm-.1 1.3v-.1zM45.5 48h-.1zm.1 1.1s0 .1 0 0m-.1.2h.1Zm0-.2v.1zm.7-2s.1 0 0 0h.2-.3Zm-.7.9h-.2Zm.5.8v-.2.1Zm-.3-.3h-.1Zm2.5 1.4v.1ZM58.6 39v.2h-.1c0 .1.2 0 .3 0-.1 0 0-.3-.2-.2m-9.9 7.9v-.1ZM46 48.6c0-.1 0-.1-.2-.2 0 0 .1-.1.2 0Zm2.1 1.2"/><path class="st2" d="M44.3 49.4h-.2.1s-.1 0 0 0zs-.1 0 0 0v-.2h-.1v-.1c0-.4 0-.7-.2-1 0 0 0-.1-.2-.1v-.1h-.2v.2h.1v1.3h-.1.1v.5s0-.3.1-.3h.1c.3 0 .5-.3.5-.6h.2Zm-.9.8"/><path class="st0" d="M40.2 41.9s.1.1.3.1c0-.3.1-.3.2-.6-.3 0-.4.3-.4.5Zm0-19.2s0-.1-.1-.1v.3c.2 0 .4 0 .5-.2-.1-.1-.2 0-.3 0Zm.4 19.3c0-.2.3-.4.4-.6-.1.1-.5.5-.4.6m-1.1-18.3c.2 0 .2-.1.4 0 0-.3-.4-.2-.4 0m1.6 17.2c-.3 0-.3.1-.3.3h.2c0-.2.1-.2 0-.4Zm-.9.7c-.1.1-.6.3-.5.5.1-.2.2.4.5 0-.3-.1-.1-.4 0-.5m2.2-3.1c0-.2 0-.3-.2-.4v-.3c.2 0 .3-.2.6-.3 0-.5.2-.7.5-1.2 0-.1 0-.4-.2-.4 0 .3-.4.5-.1.8 0 .1-.4 0-.4.1.1.1-.1.7-.2.7s.1-.5 0-.2c-.3.3-.3.6-.3 1-.3 0-.2 0-.4.1 0 .3-.2.3-.2.6.2.1.2.7 0 .7s.1-.3-.1-.3c-.2.5-.2.9-.4 1.3.2 0 .4 0 .6.1 0 0-.1.1-.1.2h.3c-.1-.2.5-.8 0-.9 0 .1 0 .5-.2.5-.1-.3 0-.8.3-.8 0-.2 0-.5.2-.4.1 0-.1.2 0 .3 0-.4.3-.8.6-.9-.1-.3.1-.4 0-.7 0 .1 0 .3-.3.2Zm-.7.8c0-.2.3-.5.5-.3-.1.1-.2.3-.5.3m.1-.4c-.2 0-.1-.3 0-.4.3.2.2 0 .5 0 0 .5-.4.2-.4.4Zm2.9 9.8"/><path class="st0" d="M42.4 38.1c.3 0 .3-.5.5-.1 0-.2 0-.3.1-.6-.2.2-.5.4-.7.7Zm-2.5-14.9c.4 0 0-.5 0-.1zm-2.7 17 .1-.1s-.1 0-.1.1m-.1-1.2c0 .1-.1.1 0 .3.1 0 .3-.4 0-.3"/><path class="st2" d="M38.7 21.2c-.1-1.5-.5-2.3-1.6-3-.2 0-.4 0-.4-.2.5-.2.5.1.9.2.2-.2-.1-.4-.3-.5 0 0 0 .3-.2.3 0-.3.1-.4.1-.6-.2 0-.4 0-.6.1v.4c-.2-.2-.1.2-.3.1v-.4c.2 0 .1.1.2 0v-.3c-.2 0-.6.2-.5.3h.1c0 .2-.1.3-.2.4 0 0-.3 0-.3-.2 0-.3.1-.3.1-.4-.3 0-.5.3-.7.4 0 .1.3 0 .3.2-.6.3-.6-.3-.4-.7 0 0 .4.1.4 0-.3-.2 0-.5 0-.7-.2 0-.1.1-.3.1 0-.1 0-.3-.2-.4-.1.3 0 .4.1.6h-.4v-.3h-.3c-.1.4 0 1 0 1.4-1.9.6-3.1 2.4-2.5 4.5v-.1c-.1.4 0 .5 0 .9-.2-.1-.2 1.3 0 .7-.2.8 0 1.2-.2 1.8h.2c-.3 1.8.1 3.1-.1 4.9-.1 0-.3-.4-.3 0 .1 0 .3.4 0 .4-.2 0 .2-.3-.1-.2 0 .2-.2.3 0 .4 0-.4 0 .4.1.1 0-.3.1-.3.3-.5 0 .5-.3.8-.1 1 0 0 0-.1.1-.1-.1.4 0 .7 0 1.1-.3-.1-.3.4-.5.5.3-.1.3 0 .5 0-.3.4.3 1.6-.8 1.4 0 .1-.1.3 0 .3.1-.3.4-.1.7-.2-.2.5 0 1.3-.1 1.7h.1c-.2 1.4.8 2.6 2 2.9 0 .2-.2.3-.1.5-.1-.2-.3.6-.1.6 0-.2 0 0 .3-.1 0 .2 0 .5-.1.8h.5c0-.3 0-.9.2-.6.1-.5-.4-.5-.6-.7.3-.1.2-.4.4-.6h.5c0 .2-.1.4 0 .6.3 0 .1.2.3.2 0-.2.1-.2.1-.4-.2 0-.1-.1-.2-.2h.7c.2 0 .3.3.3.5.1-.2.1.1.2.1v-.4s0 .1-.1.1c0-.3-.2-.2-.1-.5q.2.2.4 0c.1.1 0 .2 0 .4h.3c-.2 0-.3-.6.2-.6 0 0-.1.1 0 .2 0-.1 0 0 .1 0 .2-.2-.2-.2 0-.4.1 0 0 .2.2.2.1 0 0-.4.2-.4 0 .1-.1.4 0 .4 0-.2-.1-.5.2-.5 0 .2-.1.2-.1.5h.2c0 .2-.3 0-.2.2.2.1 0 .4.2.5.1 0 0-.3 0-.5h.2c0-.2 0-.3-.2-.5.1 0 .3.2.4 0 0-.1-.1 0-.2-.1 0-.1 0-.3.1-.3 0 0 0 .3.2.3 0-.3 0-.2.1-.4-.2 0-.4 0-.4-.1.3-.2.2-.5.7-.9-.2-.4.2-.8.3-1 0-4.5 0-9.3.1-13.3-.2-.3-.1-1.1-.2-1.5Zm-4.6 8.4c0-.2.2-.1.2-.3.2 0 0 .4-.2.3m.6 5.2c0 .6.1 1.1.2 1.6-.1 0-.1-.1-.3 0 0-.2.1-.2 0-.4-.2 0-.1.1-.1.2-.4-.2.2-.6-.2-.9h.2c0-.2-.1 0-.2 0 0-.2.1-.1.2-.2-.1-.2-.2 0-.2-.3.1-.1.1 0 .2 0-.2-.3.1-.6-.2-.8 0-.1 0-.3.3-.3 0-.6-.2-1.2 0-1.6q-.2-.1-.1-.4v.2c.2-.4-.5-.5-.2-.8.3 0 0 0 0 0v-.5c0-.2.3-.4 0-.6.3 0 0 .8.3.8-.2.5.4 1.2.4 1.8 0 .8-.3 1.6-.4 2.4Zm3.4-11.9c0-.3.3-.3.2 0z"/><path class="st0" d="M40.5 23.5c0-.1 0-.2.1-.2 0 .2.3 0 .2-.2h-.2c0 .1-.3.4 0 .5Zm-7.3 15.7c0 .1-.2.2 0 .3.3 0 .3-.3 0-.3m-2-2.8c.1 0 .3 0 .3-.3h-.3c0 .2-.1.2 0 .3m9.8 3.1c.1 0 .3 0 .3-.3-.2 0-.2.2-.3.3m.1-16.8c-.2 0-.3 0-.3.2.2 0 .2.1.4.1v-.3Zm.4 15.5c0-.2.4-.3.1-.5 0 .3-.4.1-.4.4h.3Zm1.5-2.7v-.2h-.2c0 .2 0 .2.2.2M41.7 23c-.1 0-.3-.1-.5-.2 0 .2.1.2.1.3.1 0 .4 0 .3-.1Zm1.2 12.8c0 .1-.3.5-.1.6 0-.2.3-.4.1-.6m4.3-1.2s.1-.1.1-.2c-.2 0 0 .1-.1.2m-2.7 14.8s.1 0 0 0m-1.4-1.8H43Zm.2 2.5v.1Zm9-.3.1-.1Zm-.1-.5s.1 0 0 0m.6.8V50Zm1 .2s0-.1 0 0m-2.4-1.4v-.1zm.2-.3h-.1Zm0 .5h.1Z"/><path class="st2" d="M52.3 48.3v-.2c0-.3-.2-.5-.4-.5h-.2v.5h.4s.2 0 .2-.1Zm-.7.1"/><path class="st0" d="M56 49.5h.1Zm0-2.6h-.1zm-.7 2.8v.1zm-3.8-1v.2Zm-1.6-16.5c0 .3-.4.2-.3.5.2.1.8-.4.3-.5m2.4 17.1s0 .2.1.1Zm-.2-2.2H52Zm.3 1V48Zm-1.6-17c0 .1 0 .8-.2 1 .5-.3.2-.5.4-1h-.3Zm-.7 1.1c0-.1 0 0 .1 0v-.3H50s-.2.2 0 .3Zm-1.2.8v.1h.2v-.3c-.2 0-.3 0-.3.1Zm3.9 14.6v.1Zm0 .2v-.1.2Zm-1.6-.6v-.1Zm.3.4h-.2zm0-.7h.1zm-.3.6s-.1-.1 0-.2v.1h.1s0 .1.1.1Zm.2.2h-.1Zm-16.7-7.3c0 .2 0 .3.2.4 0-.3-.1-.2 0-.3Z"/><path class="st2" d="M13 24.2c0 .1-.1.4.1.4 0-.2 0-.4-.1-.4m-4.2-.6s.1 0 .2.1c-.4 0-.1 0 0 .2-.2.1 0 .6 0 .9h.2c-.1 0-.2 0-.2-.1.3 0 .3.4.5 0-.2 0-.3 0-.4-.2.1 0 .3.2.4 0-.1-.1-.4 0-.4-.2.1-.1 0-.1 0-.2.2 0 0-.3 0-.6h-.2Zm2.8 18.9c.2.2.2.4.4.2 0 0-.1-.4-.3-.6 0 .1 0 .2-.1.4m.3-1.9c-.2.2 0 .3 0 .6.2 0 .2.2.4.2s.1-.1.2 0c0-.2.2-.6 0-.7 0 .1-.2-.2-.4-.1ZM8.8 16.8c.2 0 .1-.2.1-.3 0 0-.1 0-.1.1.3 0-.2 0 0 .3.1 0 .2 0 .2-.1-.1 0-.2.1-.2 0m3 16.2c.1.1 0 .2-.2 0 0 .2.2.3 0 .4.2 0 .2.2.2.4.2 0 0-.3.3-.2v-.4c-.2 0-.1-.5-.3-.3Zm.2-1.9v.7c0-.1.1-.6 0-.7m.2-.6c-.1.1 0 .2-.1.3H12c.2 0 .1.2.3.1 0-.2.2-.4 0-.5ZM9.4 15.7c.2-.2 0-.2.1-.5h-.1.1s-.4 0-.2.1c0 0 .1 0 .1.1 0 0-.1-.1-.2 0 .2 0 .1.4.2.4Zm-.1 1.1v.7s.4-.1.2-.2c0 0 0 .1-.1.1-.1-.2.1-.6 0-.6z"/><path class="st0" d="M86.7 47.6s0 .1 0 0v.1Zm-.1-.3"/><path class="st2" d="M10.4 29.6v.2c.1 0 0 0 .1-.1.2.1.2.4.4.5 0-.3 0-.2.2-.1v-.4c.2 0 .2-.2.4-.2.2.4 0 .6.3 1v-.2h.1c-.4 0 .2-.4-.1-.6v.2c-.2-.3 0-.9 0-1 .3.1.9-.4.6-.9.2 0 0-.1.2-.2v-.1c-.3 0 0-.2-.2-.2 0 0-.1.1-.1 0 0-.4 0-.6-.2-.7-.2 0 0 .3-.1.2s0-.4-.1-.5c-.2.7.4 1.1-.1 1.4v.2h-.2c0 .2 0 .6-.2.6 0 0 0-.5-.2-.7v.2-.3s.3-.1.1-.2c0 0 0 .1-.2.1v-.2c-.1.6-.2.8-.5 1.2h-.2s-.1-.3-.1-.2c.2.2-.4 0-.3.3.1 0 0 .3.2.5 0 0 .1 0 .2-.1Z"/><path class="st0" d="M86.4 49.2v-.1zM9.2 18.6H9v.4c.2 0 0-.4.2-.4m79.7 30.6v-.1zm-6-6.8c.2 0 .2.1.4 0 0-.2 0-.3-.1-.3 0 .2-.3 0-.3.3"/><path class="st2" d="M11.8 14.4v.4c.2 0 .2-.4 0-.4m1.8 8.9c-.4-.2-.7.2-.6.5h.2c0-.2.3-.4.4-.6Z"/><path class="st0" d="M89.2 47.6s0 .1 0 0v.1Zm-1.5 2 .1.1Zm0-2.7"/><path class="st2" d="M11.8 27.3c0-.2 0-.6-.1-.5 0 .2-.1.5.1.5m-3.4-4.4c.2-.1.1-.5.4-.7 0 0-.1 0-.1-.1 0 0 .1.1.2 0 0 0-.2 0-.2-.2.4.2.1-.2-.1 0 0 0-.1 0-.1-.1.4 0-.2-.4.1-.4h-.2c0-.2 0-.6-.2-.8-.1 0 0 .3-.1.3 0-.1-.2 0-.2-.1.3 0-.1 0 0-.2.1 0 .2.1.2 0-.2-.2-.4 0-.5-.2h.2c-.1 0-.2 0-.2-.1 0 0 .1.1.2 0 0-.1-.3 0-.3-.1 0-.2.4.1.2 0 0-.1-.2 0-.2-.2.3 0-.2-.2 0-.3-.2 0-.1.2-.3.1.1-.2-.1-.5 0-.7-.3 0 0 .1-.2.2 0 .8.2 1.1.2 1.6.3 0 .1 0 .4.2 0 0-.1 0-.1.1.3 0 0 .1.1.3h.2c-.1.1 0 .3.1.6 0-.1 0-.2.2-.2-.1.2.2.1.2.2-.2.1 0 .3 0 .6.4 0 .3.2.2.4Z"/><path class="st0" d="M78.9 30.9s-.2 0 0 0M77.5 20v-.2h.1-.2v.2h-.2.2Zm.2 12.6s-.1 0-.2.1v.4h.2c0-.2.1-.3 0-.4Zm-.9.5c0 .5-.3.6-.5.8l.1.1c-.3 0 0 0 0 .1h-.2c0 .2.1.3 0 .5h.3c.1-.4.8-1.1.6-1.6-.2.1-.1 0-.3-.1Zm.2-3.7c0-.1 0-.4-.1-.3 0 .1-.1.3.1.3m6-2.9c-.1 0 0-.3-.2-.3 0 .1-.2 0-.2.2v.1zm-3.2 2.7c0 .3-.1.3-.2.4v.2c.3 0 0 0 0 .2 0 0 .1.1.2 0h-.1c.1-.2.5-.6.2-.8Zm-52.3 9.3c0 .1 0 .2.1.3 0-.2.4 0 .3-.3-.2 0-.2.1-.4 0m51.4-7.9h.1c-.1 0-.3 0-.1.1h.1v-.3h-.2ZM88 42.4c0 .3.1.1.3.3v-.3h-.2Zm-6.3-3.6h-.2v-.1c-.2.2 0 .6.3.5h.1c-.1 0-.1 0-.1-.2Zm1.7-11.3c.1-.3 0-.4.1-.6h-.2c0 .2-.2.5 0 .6Zm.7-1.5c-.1 0 0-.1 0-.1 0 .1-.2 0-.2.1v.3c0-.1.2-.2.3-.3Zm-.7 14.2v-.3c-.2 0-.2 0-.3-.2 0 .2 0 .4.3.4Zm-.4-.8c0-.2-.3-.2 0-.4h-.2c-.1.1-.2.5 0 .6.1-.1.2-.3.4-.3Zm3.7-16.2v-.1h-.2s.1 0 .2-.1c-.1-.1-.3 0-.3.3.1-.1.3.1.3 0Zm-3.2 18.6c-.1.3.5.2.5 0-.2 0-.1-.1-.2-.1 0 .1-.2.1-.3 0Zm-.1-2.5c.1.4.7 0 .8-.1-.2 0-.1-.3-.3-.3s0 .3-.1.3-.2-.1-.3-.1c0 .1-.3.3-.1.3Zm1-12.2c.3 0-.1.3.2.4v-.4c-.1 0-.3-.2-.3 0Zm.2-.6q0-.3-.3-.3c-.1.1 0 .1 0 .3.1 0 .2.1.3 0m.4 1.8c.2 0 .3-.3.4-.4v-.3c-.3 0 0-.2-.3-.2v.6h-.3c0 .2-.1.3 0 .4Zm-.2-2.2c.1-.1 0-.3 0-.4v.3s0 .1.1.1Zm1.1-2.1c0-.1-.2-.1-.2-.2v.4c0-.2-.1-.3 0-.3 0 .1.3.3.1.1Z"/><path class="st2" d="M14.8 36v.2h-.1c.1 0 .3 0 .3-.1-.1 0 0-.1 0-.2-.1 0-.2-.2-.2 0Zm-.5.5c-.3 0-.5 0-.5.2-.6-.4-1.4-1-1.7-1.6-.2-.3 0-.6-.4-.8.1 0 .2 0 0-.1-.7-.6-1.2-1.9-1.6-3-.2 0 0 .2-.2.1v-.2c0 .2-.3 0-.3.2 0 .1-.2.5-.4.6-.1.7-.5 1.3-.6 2-.2.7.2 1.7-.2 2.6.1.7.5 2.5 1.3 3 .1 0 .4.2.2.3.1 0 .5.1.3.2.1.1.1 0 .2 0 0 .1.2 0 .2.2-.3.6 0 1.6-.2 1.7h.2s-.1 0-.1.1c0 0 .1.1.1.3.3 0 0-.2.4-.2v-.4c.1.2 0 .3.2.1v.2c0-.2 0-.2.1-.3h.3c0-.1-.1-.2 0-.4-.2 0-.2-.3-.2-.1 0 0 .1.2 0 .3v-.8h-.2c.1-.1 0-.9 0-1.1 1.6-.2 2.4-1.2 3.2-1.6.2-.6-.6-.9-.3-1.6Zm-3.8 4.9c0-.2 0-.4.1-.6.1.1 0 .6-.1.6"/><path class="st0" d="M35.5 15c-.1.1 0 .3.1.3 0-.1 0-.4-.1-.3m-8 5.4v-1.1c-.2.3-.4 1 0 1.1m0 1c0 .2-.3.5 0 .5-.1-.2.2-.5 0-.5m57.7 28.2.1.1ZM27.4 22.5c.2 0 .1.2.3.1 0-.2-.2-.4-.3-.1m.6 10.8c0-.2 0-.4-.2-.4 0 .3-.5 0-.5.5.3.1.5-.2.6 0Zm54.9 17s0-.1 0 0m1.5-.6v.1zM28.1 23.4V23s-.4-.1-.2 0c.1 0 0 .4.2.4m-.1 1.7c-.1 0-.3.4-.2.5 0-.2.2-.2.2-.5m-.5 3.4h.3c.1-.1.1-.5-.2-.4-.1.2 0 .3 0 .4Zm.7-4.6c0 .3-.2.4 0 .5 0-.1.3-.5 0-.5m65.6 23.7s0 .1 0 0v.1Zm-.3 1.6v-.1zm-1.6-27.3c.1.1.4.3.4 0-.1 0-.3-.2-.4 0m2.7.6c-.3.3-.5 0-.8-.3 0-.2.1-.2 0-.5-.2.1-.2.4-.5.3 0 0 .2 0 .1-.2-.2 0-.5.1-.8.1.1.4.8.2.9.4-.2.3 0 .6.2.6s-.1-.2 0-.4c.2 0 .2.1.2.2-.2 0-.1.1-.1.2 0 0-.1 0-.1.1.2 0 .1-.2.2-.2.2.2.4.3.6.4 0-.3-.1-.5-.4-.7.1 0 .4 0 .3-.3Z"/><path class="st0" d="M94.8 22.8c0 .1-.1 0-.3 0 .1.2.4.1.2.5h.3c0-.2 0-.4-.2-.4Zm.9.6c0 .2-.1.4.2.4 0-.2 0-.3-.2-.4m8.6 7.2v.3h.2c0-.1 0-.2-.2-.3m-.4-13.7c.1.2 0 .3.2.1 0 .2.1.3.1.1V17c-.2 0-.2-.3-.5-.2.1 0 0 .2 0 .3.3.1 0-.2.2-.2M92.3 49.6l.1.1Zm13.5-12c0-.1 0-.3-.2-.3 0 .3 0 .4.2.3m-.6 1.8c.1 0 .2.1.2.1s-.1 0-.2.1c.1.1.2.2.2.3v-.2c0 .1.1.2.1 0-.2 0-.2-.5-.5-.4Zm1.9-4.6c.2.2.2.3.4.4 0-.1-.3-.5-.4-.4m-.6-2.7c0 .4-.5 0-.5.4.3 0 .4-.1.7-.2 0 0 0-.1-.1-.2Z"/><path class="st0" d="M106.5 31.9c.2-.2.2.3.2.3 0-.1.5.1.6 0-.2 0-.5 0-.6-.4-.2.1-.2-.2-.3 0 0 .1 0 .2.1.2Zm.8 3.6c0 .1 0 .3-.1.3.3 0 .4-.2.1-.3M96.2 23.6h-.3c0 .3.3.3.3 0m9.9 11.2c-.3-.1-.3-.3-.6-.5 0 .2.4.7.6.5m1.7.5c0-.2.3 0 .3-.2V35c-.2 0-.5.2-.3.3"/><path class="st2" d="M0 59.5h112.7V0H0zm67.2-39.1s-.2.3-.3.2c0-.1.1-.2.3-.2m-.8 1c-.4 0-.3-.2-.1-.4.2 0 0 .3.1.4m-9.2-4.3c.2-.2 0 .4 0 .4-.2.1 0-.5 0-.4m-.6.4c-.1-.1 0-.2 0-.4.2 0 0 .1 0 .2 0 0 .1-.2.1-.3q.1.1.1-.1c.2 0-.2.5 0 .6-.4.4-.8.7-.8.9 0-.4 0-.7.5-1Zm-9.7 7c.1-.2 0 .1.2 0 0-.1-.2-.2-.2 0 0-2.5-.2-5.9 0-8.7 0-.6 0-1.3.2-1.8 2.1 0 3.1.2 5.3.2 0 5.1.1 8.5.1 14.6-.3.2-.4.4-.6.8-.3-.2-.8.3-.9.6-.1 0 0-.2-.2-.2-.2.1 0 .3 0 .5-.1-.3-.3.2-.3.2-.4 0-.5.5-.9.2-.2.3-.5.5-.6 1-.2 0-.2-.2-.4-.1-.3.4-.6.4-.9.5-.3-.3-.3-1-.3-1.1h-.1c-.3-.1-.2.4-.4.2-.2-.4.1-.1.3-.3 0-.4-.3-.3-.4-.5v-5.1h.2v-.8Zm.1 8.6c-.3-.2-.1-.3-.1-.6.3.3.3-.4.7-.3 0 .4-.3.6-.6.9m.2.2v.3c-.2 0-.2-.4 0-.3M12.6 15.5v.5c0 .1-.2.3-.2.5-.4-.1.3-.4 0-.5 0 0 0-.2.1-.3v-.2Zm-.3-1.6c.2-.2.1.3 0 .4-.2 0 0-.4 0-.4M4.8 44.1c-.2-.3-.1-.6 0-.8.3 0 .4.3.4.6-.2 0-.2.2-.4.1Zm16.6-3.3c-.2.3-.8 1.1-1 1.3s-.6.5-.8.7c-.8-.5-1.3-1.3-2.1-1.9-1.5 1.4-3.5 2.3-5.6 2.4.1-.1-.2-.1 0-.4 0 0-.2.1-.2 0 0 .1-.1.2-.4.1.2-.2-.2-.1-.1-.3 0 0-.1.2-.1 0 0 0 0 .1-.1.2 0 0-.1-.2-.2 0-.1 0 0-.1 0-.2-.3 0-.2.5-.2.5-.1.1-.3.1-.3.3 0-.2-.4-.2-.5 0-.7-.2-1.9-.4-2.6-1.2h-.3c-.1-.1 0-.1 0-.2-1.7-1.7-3-4.2-2.7-6.9-.4.2 0-.2-.2-.3 0 0 .2 0 .3-.2.4-2.2.9-4.1 1.8-5.5.6-.9 2.3-1.6 1.5-2.8-1-1.6-1.5-5.3-1-7v-.5c0-.1.2 0 .2-.1-.2 0-.1-.3 0-.4-.2-.6-.1-1.2.2-1.6.2-.4.7-.6.6-1 .2 0 .3-.2.6-.2 0-.2-.1 0-.2 0 .2-.2.3-.3.6-.2-.1.1 0 .1 0 .3.1 0 0-.5.2-.2.2-.2 0-.7.2-1 0 0 .2.1.2 0 .1 0 0 .3 0 .4.3-.2 0-.4.2-.6 0 0 0 .2.1.2s0-.4.2-.3v.1c.4-.3.8-.2 1.3-.5v.3c.2 0 .4 0 .3-.2.2-.1.2.4.2.6h.1c.1-.2.2-.4 0-.6.1 0 .2 0 .3-.1.2.1.1.1.2.4h-.2v.2c.2-.2.1.4.4.5-.1 0-.4.2-.5.2 0 0 .1-.2.2-.2-.2-.2.1-.2 0-.4 0 .1-.2.3-.1 0-.2.1 0 .1-.1.4v-.2c0 .1-.3.2-.2.2 0 .2-.2-.2-.1-.3 0 0-.1.4 0 .4-.2 0-.1 0-.4-.1v-.3.2-.3c-.1.2-.1.2-.2 0-.1 0 0 .3-.2.1v.6c-.1 0-.2.4-.2.2.2 0-.2 0 0-.2-.2 0-.2.3-.2 0-.2.2 0 .3-.2.5 0-.1-.2.1-.2 0-.2.1-.3.4-.2.8.2 0 .1-.2.1-.4 0 .2.4.5.6.8 0 0 .1-.4-.1-.5.1 0 .2 0 .4.2-.2.1.1.6-.2.4.5.5 0 2-.6 2v.1c.3.1.4.6.2 1 .2.6.3 1.6.6 2.6h.1c.1.5.2 1.3.4 1.7h.2c.1.4.1.7.4 1 .2 0 0 .2-.1.1 0 .1.2 0 .2.1.1 0 0-.2.1-.2 0 0 0 .1.1.1 0 0 0-.1.1-.3.2.4 0 .4.2.9 0 0 0-.1.1-.2.1 0 0 .4 0 .5.1-.2 0-.6.1-.8.1.1.1 0 .3 0-.1-.1 0 0 0-.2-.4-.6-.4-.8-.2-1.7-.1 0 0-.1-.2-.2h.2c-.1-1.2 1.2-1.9 1.4-3.2.1-1-.4-2-.4-2.8v.2c-.5 0 0-.5-.3-.7-.1 0 0 .2 0 .4-.3 0 0-.2-.2-.4-.1 0-.1.1-.1.2-.3-.1 0-.4 0-.6l.2.2c.3-.2-.2-.7 0-1 0-.1-.2.1-.2 0 0-.2.1-.9 0-1.1.1 0 0 .1.2.1s.1-.4 0-.5c.3 0 .2-.5.2-.6-.1 0-.1 0-.1.1-.2-.1.1-.2.1-.4v.2s0-.2.3-.2v.1c-.1.2-.2.4-.3.5.1.1.2-.2.5-.1v-.5c.1.2.5 0 .6.2 1.1 0 2.3 1.1 3 1.6.2.6.4 1.1.7 1.5 0 0 0 .4.2.5.2 2.2-.2 3.7-.9 5.3-.2.5-.5 1.1-.7 1.4 0 0-.2 0-.2.1-.4.6-.7 1.3-1.2 1.8v.2c-.4.4-.9.6-1.1 1.2-.3 0-.2.2-.6.2-.5 0-.7.8-.4 1.1 1 .7 1.2 2.2 2.3 3.1 0 .5.7.8 1 1.2.2.4 0 .9.6 1.1.4 0 .6-.4.5-.6.8-1.8.6-4 .7-5.6 1.2 0 2.6-.3 3.8-.2.3.9 0 2.1.2 2.7h-.1c0 .1.2.2 0 .3.1 0 .1.3.1.5 0 1-.2 2.1-.6 2.8 0 1.1-.7 2.4-1.1 3.4.2.4.4.8.9 1 0 .1.1.1 0 .3h.2c0 .4 1 .6.8 1 0 .2-.5.5-.9 1ZM11.7 16v-.4c.2 0 .2.5 0 .4m-.6-.9c-.2 0 0 .3-.2.4 0-.2.1-.2 0-.4zm28.4 28.3c.2 0 .1.2.2.3-.2 0-.2-.1-.2-.3m.9-1v-.2h-.1q0 .15 0 0c.2.1-.2.3-.2.5-.2 0-.1-.1-.2-.2 0-.2.2 0 .2-.2-.1-.2-.2.2-.4 0 0 .2.1.3.1.4-.9.6-1.8 1-2.7 1.1v-.2c-.2 0-.1.3-.3.4-.7 0-1.9.3-2.6 0v-.4c0-.3-.2.1-.4 0 0-.3-.1-.3-.1-.5.2-.2.1-.7.3-.9.3.1 0 .5.1.8.4-.3.4-.9.2-1.1 0-.1-.2.2-.3 0 .2-.4-.3-.7-.6-.6.1 1-.1 1.8 0 2.8-.8.2-1.4-.3-2-.5-.5-.2-.9-.2-1.3-.5-.3-.2-.6-.5-1.1-.8 0-.4-.5-.4-.7-.8-.6-.5-1.1-1.5-1.5-2.3v-.4c-.4-.7-.7-1.9-.4-2.7 0-.1-.3 0-.2-.3h.3c0-.2-.3-.2-.3-.4s.1-.2.3-.2c-.1 0 0-.3-.2-.3.2-1.4 0-3.4.2-4.3 0-.6-.3-1.7 0-2.1-.2-.3 0-.2-.1-.7 0 0 .1.2.2.3.1-.2.2 0 .5 0 0-.4-.2-.6-.4-.2-.1 0 0-.2-.2-.2s-.1.2 0 .2c0 .2-.1-.1-.3 0 .2 0 0-.5.3-.6-.2-.5-.4-1 0-1.3-.1-.1-.3-.2-.2-.5-.3 0-.1-.1 0-.2 0-.2-.1-.4-.2-.6 0-.1.2-.5 0-.7v.3c-.2-.8 0-1.8.5-2.1-.2-.5.1-.7.2-1-.1-.2-.2.1-.3 0v-.3c-.1.4-.3.7-.4 1-.1-.8-.2-1.6.2-2.1-.2-.8.3-1.4.7-2 0-.1 0-.4.2-.5 0-.1.3-.1.3-.2 0-.2.2-.5.4-.8.2-.2.5-.4.8-.6.2-.3.5-.5 1-.9.9-.7 2.5-1.5 3.5-1.5.2.2.3.5.5.8-.6.7.4 1.2.4 2.3h.3c-.2-.3 0-.5.3-.7.2.2 0 .5-.1.6q.3 0 .9.3c.2-.2 0-.5-.4-.5 0-.3-.4-.9-.5-.6-.1-.8-.6-.9-.2-1.5-.3-.2-.5-.2-.4-.8 1 0 2.1-.1 3.2.5-.2.1 0 .4 0 .4.3 0 .2-.3.4-.4.5 0 .5.2 1 .4 0 0-.2.6 0 .8.1-.1.2-.2.2-.5h.5c.6.5 1.1 1 1.8 1.3 1.5 1.9 2.5 4.3 2.3 7.2 0 1.1.1 2.5 0 3.7-.1 2.1-.2 3.4-.2 5.7.2 1.3.1 2.6-.1 3.7-.3 0-.3.2-.4.4.1 0 .4 0 .3.4.3 0 .1-.4 0-.6.4 0 .2.5.2.6 0 .5-.5 1.1-.2 1.4-.1 0-.1.2-.2.3-.2 1.4-1.2 2.5-1.9 3.6-.4.1-.5.5-.9.8Zm4.4 6.5c0 .4 0 .9-.3 1.2 0 0-.2 0-.3.1h-1.4V47h.1v-.7h1.4c.6.3.6 1.1.6 1.9Zm2.2 1.6h-.5c-.2 0 0 0 0 0h-1.1v-3.6h.2s.1 0 .1.2c0 0 .1.1 0 .2 0 0 0-.1 0 0l-.1-.1h1.2v.5h-1v.6c.1 0 0 .2 0 .3h.6v.5h-.7v1.1h.6v.2s.1 0 .1-.1h.1v.2Zm-.3-1v.3-.2Zm-.1-.3V49v.1Zm.4-.2v-.2.3Zm2.3-1.7h-.5v2.1h-.1c-.1 0 0 0 0 0h-.1v1h-.7v-2.9h-.7v-.4h.1s-.2 0-.2-.2v-.2h2.1v.3Zm1.6-4H47c-.4-.6-.1-1-.3-1.6.1.2 0-.4 0-.7v-1c0-.3-.1 0-.1 0 0-1.7.2-3.8 0-5.5 0 0 .3 0 .1.1 0 0 .3 0 .1.1 0 0 .1 0 .1.1 0 0 0-.2.1-.2-.1 0-.1 0 0-.1-.3 0-.2-.4-.3-.1-.2-.2-.1-.3 0-.4 0 0 .3.2.2.2 0 .1.1-.2.2 0 0 0 0-.1-.1-.1.3-.5.8-.9 1.3-1.3 0-.3-.2-.2-.2-.5.2 0 0-.3.2-.3 0 .3.2-.1.1.2 0-.1.2-.1.4 0 .3-.5.7-.8.8-1.1 0 .2.5.3.6 0 0-.1 0-.3-.2-.3.7-.3 1-.8 1.7-1.1 0-.2-.1-.3 0-.4v.1c0 .1.2 0 .2.2h.1c0-.3.4-.5.5-.8.3.1.3.2.6.1-.3.1-.5.4-.8.6.1 2 0 4.3.1 6.1h-.1c.3.8-.2 2.1.3 3.1h.1c.9-.2 2.4.4 3.3 0v.1s.1 0 .1-.1v.1c.4-.2 1.1.3 1.9 0 .3-.1.5-.7.6-.1.1 0-.1.3.1.3-.3 0 .2.5-.1.5.1.1 0 .3 0 .5.1 0 .1.7.1.8v.4c0 .1.2.7 0 1 .2 0-.1.3-.2.6-.2 0-.2-.1-.2 0-.1 0 0 0 0-.1-.5.2-.8.1-1.5-.2 0-.1.2 0 .2-.1-.3 0-.4.1-.8.2h.1c-.5 0-1.1.2-1.6.3v-.1c-.5 0-1.4.1-2 0-.3.1-.8 0-.8 0-.5.2-.6 0-1 .2Zm7.5 3.5h.3Zm-2 0h.3Zm-3.8.2h-.1Zm-.1-.4v-.1zm-1.6 1.9v-.1h.1v.4-.4Zm.8 2.5v-.2.1Zm.1-.4v.1zm1.2-.1s-.1 0 0 0h-.1s0-.2-.1-.3V50c-.1 0-.1-.3-.2-.4v-.1c0-.2-.1-.3-.2-.4v.1h.1-.1v.9s-.1 0 0 0v.5h-.7v-1.1h.1v-.1h-.1c0-.1 0 0 .1-.1-.1 0 0-.2 0-.3v-1.1h.3-.1.9v.1c0 .1 0 0 0 0 0 .1 0 .2.1.2v.7c0 .2-.2.5-.3.7-.1 0-.1 0 0 .2v.4-.1.3-.1.3c0 .2.1.3.2.4h-.2Zm2.5-.6-.2.2h-.8v-3h.1v2.7c0 .3.2.4.4.4s.3 0 .4-.3v-1.3h.1v-.9h.2v2.7Zm.5.7h-.1v-3.2h.5v3.2h.7v.5h-1.5Zm1.9 0h-.1v-3.2h.5v3.2h.7v.5h-1.5Zm1.6.4.1-.1v.2Zm.5-.4h.1c0 .2-.1.1-.2.1Zm1.6-.1h-.2c0-.2 0-.4-.1-.6v-.1h-.8c0 .2 0 .4-.1.6h-.1v.1s-.1-.1-.1-.2v-.9c0-.3.1-.7.2-1v-.3c0-.3.1-.6.2-1h.8c0 .3.1.6.2.9 0 .1 0 .5.2.8 0 0 0-.1.1-.1v.2c0 .3.1.5.1.8.1.4.2.7.2 1.1h-.3Zm.6-2v-.1h.1v.4-.4Zm.7 2.5v-.2.1Zm.2-.4v.1zm1.1-.1s-.1 0 0 0h-.1s0-.2-.1-.3V50c-.1 0-.1-.3-.2-.4v-.1c0-.2-.1-.3-.2-.4v.1h.1-.1v.9s-.1 0 0 0v.5h-.7v-1.1h.1v-.1h-.1c0-.1 0 0 .1-.1v-1.4h.3-.1.9v.1c0 .1 0 0 0 0 0 .1 0 .2.1.2v.7c0 .2-.2.5-.3.7-.1 0-.1 0 0 .2v.4-.1.3-.1.3c0 .2.1.3.2.4h-.2Zm-.5-3.8v-.1zm.1.3h-.1Zm2.7 3.4h-.2Zm.2-.3V50s0 .2-.1.2c-.2-.2-.3-.5-.3-.8v-2.2c0-.2.4-.3.6-.3s.5 0 .7.2c.2 0 .2.2.3.3 0 0 .1.4.1.5v.2h-.5c0-.2 0-.5-.2-.7h-.5c-.1.2-.1.4-.1.6v1.4c0 .2 0 .4.2.5 0 0-.2 0 0 .1h.1v.1h-.2V50Zm1.5-2v.1Zm0 .2v-.1Zm0 1.3v.1Zm.1-.1v-.1zv.2c0 .4-.5.6-.9.6h-.3v-.2s0-.1.1-.2c0-.2.1-.5 0-.7h-.4v-.3h.8v-.2V50Zm2.3.1v.2c0 .2-.1.3-.2.5h-.1c-.1 0-.2.1-.3.1h-.3v-.2.3h-.5s-.1-.2-.2-.3v-1.7.1-.6l.1-.1c.1 0 .3-.2.4-.2v.4h.1s0-.1 0 0v-.3h.5l.2.2q.3.3.3.9v1.7Zm-1.3-6.5V43c-.6.4-2.3.1-3.4.3-.1 0 0-.1 0-.1-.9-.1-1.7.2-2.2 0-.9.4-1.8.2-2.7.2-.7-1.5-.2-3.6-.2-5v-.5c0-.8 0-1.9.1-2.5v-.3c-.5-3.3.2-7.5-.1-11.5.1-.3.1-.8 0-.9.3-.7-.2-1.4.3-1.7-.5-.8 0-2-.4-2.8.3-1.4-.1-2.8.2-4 .1-.1.5 0 .5-.2.2.2.4.2.6.4.1 0 .3 0 .4-.2.7.5 1.7-.3 2.3.4 0-.4.8-.3 1.5-.3 0 .6.2 1.5-.2 2 .3.5.4 1 .1 1.5.1.5.3 1.7 0 1.8 0 .2 0 .6.1.6q-.2.2-.1.5c-.1 0-.3-.1-.5-.1 0 .2.1.3.4.3 0 .4-.2.3 0 .8 0 .1.3.2.4.1-.1.3-.1.5 0 .8h-.3c0-.4 0-.5-.1-.9-.2 0-.2.5-.6.4 0 .2-.1.2 0 .4-.2 0 0-.3-.2-.2-.4.6 0 1.3 0 1.9-.1-.1-.2-.3-.2-.5-.1 0 0 .3-.3.2v-.3h-.4v.2s.3 0 .4.3c-.2-.3-.1 0-.4.1V24c-.2 0 0 .2-.2.3-.3 0-.1-.2-.3-.2 0 .2 0 .5-.2.9-.2 0-.4.2-.3.3-.2.1-.1-.5-.3-.5s0 .4-.1.5c-.2 0-.1-.1-.3-.1 0 .3.1.5.4.7.2-.2.1-.5.3-.6.1 0 .1.1.1.3-.2-.5-.4.9-.3 1.3 0 .2.4.6.2.8-.1.2-.1 0-.4 0 0 .2 0 .3.2.5 0-.3.3-.4.4-.9.3 0 .4-.6.6-.8 0 0 .1.2.2 0 .4 1 .2 2.3-.2 3-.3-.5.2-.8 0-1.1-.2 0-.2.1-.3 0-.2.2-.2.5-.2.9-.3 0-.4.3-.3.6 0 .2.3 0 .3.2.2-.1.1-.2.1-.6h.1c.1 0 .3.2.3.4.4-.1.6-.3 1-.5.1.3-.2.7 0 1.1.2-.1.4-.3.6-.5-.1-.2 0 0-.3-.2.1 0 .1-.6 0-.8.1-.3.3.2.5-.2-.1-.6 0-1-.3-1.5-.1.2-.1-.1-.1-.3-.2 0-.2-.1-.3-.2-.3.2-.4-.3-.4-.5s.2.1.2 0c0 .1.2.2.1.4.3-.2-.2-.3 0-.5.1 0 .3 0 .2.2.3-.1.3-.3.5-.4-.3-.4-.3-.5-.3-1.1 0-.1-.3 0-.2.2 0 0-.2-.1-.3 0 0-.2-.2-.4-.3-.6.1 0 .2 0 .2-.2.2 0 0 .4.2.6.1 0 .1-.3.4-.2l-.2-.2s.1 0 .3-.1c0 0-.1-.1-.2-.1.1-.3.2-.2.2-.7h.2c-.3-.4.3-.5.5-.7 0 1.5 0 3.4.1 5 0 .9-.3 1.8-.1 2.7 0 .5.2.9.2 1.5v6c0 .4 0 .8.3 1.1.1 0 .2.2.2 0v.1c0-.2.5 0 .4 0 .3 0 .8-.1 1.1 0 0 0 .2.1.1.1.4 0 1.3-.2 1.8-.1 0 0 .3.2.2.2.6 0 1.1-.3 1.8 0 .2.8.1 2.4.2 2.5v1.1c-.4.5-1.6 0-2 .2-.7-.2-.9-.2-1.5 0Zm-3.7-20.9c0-.1.3 0 .4 0-.1.2-.4.3-.5.5-.2 0-.2-.1-.2-.3.2 0 .3-.2.4-.2 0 0-.1-.1-.2-.1Zm-.6 3.5c-.3 0-.5-.6 0-.6 0 .3-.1.5 0 .6m0 3.5c-.1.1-.2-.2-.4-.2 0-.2 0-.2.1-.3.2-.1.3.5.4.1.2 0-.3.3-.1.4m.2-1.9c.2.1 0 .2 0 .4-.1 0 0-.4 0-.4m-.8-1.7c0-.1.1-.1.1-.2.2 0 .2.3.2.6-.1-.1-.2-.3-.3-.4m-.7.3c.1-.2.3 0 .5 0v.5c-.3 0-.2.2-.4.4-.1-.3 0-.4 0-.9Zm.4-1.5v-.3h.2c0 .1 0 .3-.2.3m1.1.7c.1 0 .3.3.1.5-.3 0-.2-.3-.1-.5m7.7 22.2h-.5v2.1h-.1c-.1 0 0 0 0 0h-.1v1h-.7v-2.9h-.7v-.4h.1s-.2 0-.2-.2v-.2h2.1v.3Zm2.3 0h-.5v2.1h-.1c-.1 0 0 0 0 0h-.1v1h-.7v-2.9h-.7v-.4h.1s-.2 0-.2-.2v-.2h2.1v.3Zm2.3.7v1c0 .1 0 0 0 0v1.4h-.6v-.3c.1 0 0-.2 0-.3v-.2c.1-.2 0-.5 0-.5s-.2 0 0-.2 0 0 0-.1v-2.2h.6v1.1Zm3.7 1.2v.7c0 .2 0 .4-.1.6h-.3v-1.1c0-.2 0-.5-.1-.7 0-.2 0-.4-.1-.6v2.4h-.5v-3.7h.6c.1.6.3 1.1.4 1.6 0 0-.1 0 0 .1l.1.1s0 .2.1.3v.5-.3.2Zm.7-2.1v2.2c0 .1 0 0 0 0v1h-.6v-1.2c0-.1 0 0 0 0h-.1s0-.1-.1-.1H81v-.6c0 .1 0 .3-.1.4v.2l-.1-.1v-.3.1-.2c0-.3.1-.6.2-.8v-.5h.7v.2Zm-.5-3.7c.1.1-.1 0-.2 0 0-.1 0-.4.2-.3 0 .1-.2.2 0 .2Zm1-.7c0-.2-.2 0-.2.1-.2-.2-.5-.2-.7-.3 0 .4.4 0 .4.4-2.7 0-4.7 0-6.9.1-.2-1.5 0-3.6 0-5.1 0-.2-.1-.4 0-.7.3-1.8.3-4.1.3-5.7s0-1.4-.1-2c0-.3.2-1.3 0-1.5.2-1.4.1-3 0-4.3.2-.6.2-4 .2-5 0-1.4-.1-3 0-5.1.4-.2.7 0 1 0s.1-.2.3-.2c.3 0 1.1.1 1.5.1s0-.1 0-.1c.2 0 .5.2.6.2s0-.1 0-.1h1c.1 0 .4.1.5.1h1.4-.1c.1.1.4 0 .3.2.5-.4.6-.2 1-.5.1.3.6-.2.7.2v-.2c.2.2.7-.1 1 0 0 .2 1.2-.1 1.5 0-.1-.3.5 0 .8-.1.4.2 1.3-.3 1.4-1.2.5.2-.6 1.5.6 1.3 0 1.4-.2 3.1-.2 4.6-.5 0-1.4-.2-1.6.2-.4-.2-.8-.1-1.2 0-.2 0-.4-.2-.5 0 0-.2-.4 0-.5 0 0 0-.1-.1-.1-.2l-.3.3c-.1-.3-.1 0-.4 0s-.3-.3-.4-.3c-.3 0-1 .4-1.1 0 0-.1 0 0-.1-.2-.5.5-1.1.3-1.8.1h.1c-.3.4-.5 1-.5 1.6s.2 1 0 .9c.2 1.2-.4 3.3-.1 4.8h1.2c.2.5-.5.7-.1 1.2.5-.1.6 0 .7-.4-.1-.1-.3-.2-.4-.3.2 0-.1-.4.2-.6H84c-.1.2.7.2.8 0 .5.2.3.8.5 1.3.5-.4-.2-.5 0-1.2.3 0 .3-.4.4-.6 0-.3-.3-.4 0-.6 0 0-.3.1 0-.1-.1 0-.1-.4-.2-.6-.3.3 0-.4-.2-.3 0 0 .1-.1.2-.1-.1 0-.3-.1-.1-.4 0-.2.2.1 0 .2.2 0 .5-.2.4-.3 0-.2.2 0 0 .1.3 0 .4-.6.6-.5.1 0-.2 0-.2.2.1 0 .3-.2.1.2.1-.1 0 0 .3 0-.2-.3.2-.5 0-.6.4-.2 0 .5.2.6-.1.2-.1-.3-.3-.2.3.2-.1.6.3.6v.7c0 .2-.2.1-.3.2.1.6-.2 1.5.3 2-.1 0-.2.4 0 .5-.1 0 0 .4-.1.5 0 .1.3 0 .2.3.1 0 0-.2.3-.1 0 .1-.2.2-.3.4 0 0 0-.1-.1-.1s.3.4 0 .2c0 .2.3 0 .3 0 .2.2 0 .3 0 .6-.2-.2-.4-.2-.4-.5-.4 0-.4.6-.2.8 0 0 .2-.1.2 0s-.2.1-.3.1c0 .5.2 1.2.7 1.5v.2c-.5-.3-.9-.8-1-1.5-.2 0-.1.2-.1.4s.1 0 .3.1c0 .3 0 .4-.2.5-1.3 0-2.5 0-3.9.1 0-.1-.2-.1-.2-.2-.3.4-1 0-1.5.1-.4 1.3-.1 2.9-.1 4.5v3.3c0 1-.3 0-.3.2.3.1 0 .2 0 .3.3.1.4 0 .5.4 0-.1.3 0 .3-.1 0 0 0 .2.3.2s0-.1.1-.1c-.3 0 .1-.3 0-.4.1 0 .2-.2.3 0 0-.2.3 0 .2 0 .3-.1.5 0 .5-.2.1 0 .3.1.3.3.3-.3.4 0 .8 0v.5c.5 0 0-.5.1-.7.2 0 .2.1.3.3.9 0 1.3 0 2.2.3v.2c.1-.2.4 0 .5-.2h-.2c.1-.3.4 0 .6-.3 0 .1.1 0 .1.2 0 0 .2-.1.2-.3.3 0 .2.4.6.3v.3c-.2 0 0-.2-.2-.2-.1 0-.2 0-.2.2s0 0 .1 0c0 .3-.3 0-.2.2-.1 0-.2-.1-.2-.3-.1 0 0 .2-.2.2v-.3c-.2 0-.1.2-.3.2 0 .1.3 0 .2.2-.1.1-.2 0-.4 0 0 .2.5 0 .5.5.3-.2.3.2.6.2-.2.3.1.2.2.5-.2.1 0-.1-.2 0 0 .3.1.4 0 .7 0 .1.2-.2.2-.3 0 .2 0 .5.3.6 0 .2-.3 0-.2.3-.1 0-.1-.2 0-.2 0-.1-.2.2-.2-.1-.3.2-.4.6-.8.8-.1 0-.1-.2-.3-.2-.2.1 0 .4-.1.5-.2 0-.3 0-.2-.2-.1 0-.1.2-.2.3 0 .1.1.1.1.3-.7 0-1.3-.2-1.8 0 0-.1-.2 0-.1-.3.2.1.2-.1.5-.2h-.6c0-.3.5-.3.6-.2 0-.2.8-.4.8 0h-.3c.1 0 .3.1.2.4.2-.2.2.1.5-.1-.1 0-.2-.1-.4-.2.2-.4-.3-.2-.2-.7H85c0 .1.2 0 .2.2-.5.1-.9.2-1.4.3v.5c-.3.1-.4 0-.9 0 0 .2.3.2.3.5-.4 0-.3-.6-.6-.4v-.1c0-.1.1-.1.1-.2Zm6.3-.8s-.2.4 0 .9c-.1 0-.5.2-.5 0-.2.2-.3.2-.4.5 0 0 0-.2-.2-.1-.1-.8.3-.5.3-1.1.2 0 .3.2.5.2 0 0 .1 0 .1-.1h-.1c-.1 0 0 0 0-.1-.4 0-.2 0-.3-.5 0 0 0 .1.2.1 0 0 .1 0 .1-.1-.8.2-.4-1.3-.7-1.1-.2-.2 0-.5.1-.6 0 .2-.1.2-.1.4 0 0 .1-.1.3-.1 0-.2-.1-.2 0-.4.4 0 .3-.5.5-.8h.3c-.2 1 0 2.3-.2 3.1h.2Zm-1.3-2.2c0-.2 0-.4-.1-.4.2-.3.5.4.1.4m.7-.5c0 .2-.2.2-.3.3-.1 0 0-.4.3-.3m-.9-19.1c0 .1-.1-.2-.3-.1 0-.1 0-.2.1-.2 0 .1 0 .2.1.3Zm0 .3c.1.2.2 1.1-.1 1.6-.2-.5.1-1 .1-1.6m.1 2.6v.3c-.1 0-.1-.2-.1-.3h.2Zm-1.2 8.1c0-.5-.3-.5-.2-.8 0 .2.3.2.4.3 0 0 .1.3 0 .4 0 .1.2.2.2.3 0 .2-.2 0-.2-.2-.3 0-.2.5-.5.6 0-.2 0-.5.1-.8.1 0 0 .1 0 .2h.1Zm-.8 2c-.2-.4.1-.6-.2-.9.2 0 .3 0 .3-.2-.2-.1.1 0 0 .1h.2v-.3c.2 0 .1.1.2.2-.2.3-.1.8-.4.8.1.1 0 .3 0 .4Zm-.4.9c0-.1 0-.1.1-.1v-.4.1-.1c.1.1 0 .4-.3.5Zm2.5 8c-.1 0-.1 0-.1-.1h-.2c-.2 0 0-.3 0-.3.2.2.2 0 .4 0h-.1v.2Zm-1.2.5c-.1.1-.1.3-.4.3v-.2c.1.1.2-.1.4 0Zm-2.3.7c.1.1.2.3.3.5-.2 0-.2.1-.4.1-.2-.3.2-.4 0-.6Zm-.6.5v-.3c0 .2.1 0 .3 0 0 .1.1.3.1.5 0 0-.1 0-.1.1 0-.1 0-.6-.3-.4Zm1.2 6.2-.2.2h-.8v-3h.1v2.7c0 .3.2.4.4.4s.3 0 .4-.3v-1.3h.1v-.9h.2v2.7Zm2.2.7h-.1v-.1Zm.3-1.4v.2zv.1h-.1v-.1.3-.1.7h-.1s0 .1 0 0h-.1v-.2.1s0-.2-.1-.3v-.3h-.1v-.2l-.3-.6V50h-.1v.7h-.5v-1h-.2v-.4c0-.1 0 0 0 0v-2.2h.2v.2-.1s.3 0 .3.1c0 .3.2.5.3.8 0 0 0 .1.1.2.1.4.3.6.4 1v-1.9h.6v2.3Zm.1-6.4c-.1-.1-.3-.2-.5-.1 0-.2.2 0 .2-.2 0-.1-.2 0-.4 0 0-.2 0-.2.1-.4.1 0 0 .2.1.2s.2-.4.3 0c.1 0 .1-.2.4-.2-.2.2-.3.3-.3.5 0 0 .1-.1.1-.2.2 0 .3.2.4.1 0 .4-.3 0-.4.2Zm2.1 7.8h-.1v-.1Zm.3-1.4v.2zv.1zv.3-.1.7h-.1s0 .1 0 0h-.1v-.2.1s0-.2-.1-.3v-.3h-.1v-.2l-.3-.6V50h-.1v.7h-.5v-1H88v-.4c0-.1 0 0 0 0v-2.2h.2v.2-.1s.3 0 .3.1h-.1c0 .3.2.5.3.8 0 0 0 .1.1.2.1.4.3.6.4 1v-1.9h.6v2.3Zm.2-7.3s0-.5-.1-.6c.2 0 0 .5.2.3.2 0-.2 0 0 .3Zm1.9 8.6h-.5c-.2 0 0 0 0 0H90v-3.6h.2s.1 0 .1.2c0 0 .1.1 0 .2 0 0 0-.1 0 0l-.1-.1h1.2v.5h-1v.6c.1 0 0 .2 0 .3h.6v.5h-.7v1.1h.6v.2s.1 0 .1-.1h.1v.2Zm-.3-1v.3-.2Zm0-.3V49v.1Zm.3-.2v-.2.3Zm2.2 1.6h-.1v-.1Zm.3-1.4v.2zv.1zv.3-.1.7H94s0 .1 0 0h-.1v-.2.1s0-.2-.1-.3v-.3h-.1v-.2l-.3-.6V50h-.1v.7h-.5v-1h-.2v-.4c0-.1 0 0 0 0v-2.2h.2v.2-.1s.3 0 .3.1c0 .3.2.5.3.8 0 0 0 .1.1.2.1.4.3.6.4 1v-1.9h.6v2.3Zm14.7-11.9c.1 1.5-.7 3.1-1.6 3.8v-.2c-.2.3-.1.8-.7.8.2.2-.1.2-.1.3-.2-.1-.3 0-.3.1-.2 0-.1-.3-.4-.3 0-.4 0-.7-.1-.9-.3.6.2.8-.5 1 0 0 .2.1 0 .1.1 0 .3 0 .3.2 0 0 .3-.2.2-.2 0-.1.2.1.3 0-.2.1 0 .2-.1.5-.1 0-.3 0-.5-.1 0 .2-.2.3-.3.4-.2-.1-.1.2-.5 0-.4.6-1.6.8-2.3.8-.6.8-1.5-.1-2.4.2v-.1c-1.2.1-2.5 0-3.8-.5h-.1c-.2 0-.5-.4-.8-.5-.5-.3-1.2-.6-1.4-1s-.8-.8-1.2-1.3c-.8-1.1-1-2.8-1.3-4.4 0-.6-.1-1.3-.1-2.1 1.3 0 3.1.3 4.3.2.2 2 1.1 3.7 2.5 4.2.1 0 .6.2.7.1.8.3 1.5.2 2.1.1.6 0 1.5-.1 1.8-.6.2 0 .5 0 .4.1.5 0 .5.1.8 0-.1.1 0 .6 0 .5 0 .1 0 0-.2 0-.2.2-.1.6.2.6.1.2-.2.3 0 .2-.2.2 0 .6-.5.6 0 .1.2.1.1.2-.1-.2-.3.3-.4.1 0 0 0 .3-.2.4.2-.1.1.1.2.2h.4v.2c.1-.1 0 0 .2 0-.1.1 0 .3.3.4 0 .1 0 0-.1 0 .3.3.3.6 1 .5 0-.3 0-.4-.4-.6 0 .2 0 .1-.3 0-.2-.2 0-.5-.4-1 0-.2.2 0 0-.2 0-.2.3 0 .3-.2 0 0 0-.4-.2-.2.4-.3-.1-.5 0-.9.2 0 0 .3 0 .3.5-.2.4-.6.7-1 .4.2.3 0 .4-.2.4.3.3-.5.1-.6-.1.1 0 .3-.3 0 0 0 0 .2-.2.1 0 .2.2.1.2.2 0 .6-.5.2-.6 0 0 0 .3 0 .3-.1-.1 0 0-.2-.1-.6v.5c-.2.3-.3-.1-.6-.1 0 .1-.1.2-.2.3l-.4-.2c.5-.5.3-2.3.3-2.8-.1.3-.4-.4-.2-.6-.3.5-.3-.3-.5-.4 0-.1.1-.2.2-.2 0 0-.1-.1-.3-.2v.2c-.1 0-.1-.1-.3-.2.1 0 .4.1.4-.3.1 0 .2.1.2.2.2 0 0-.2 0-.3.2 0 .2.1.3 0 0 .2 0 .1-.2.1.5.4.9.4 1.1.9.2 0 0-.1 0-.2.1.2.8.5.6-.1.1.1.1 0 .2 0v.2c.1-.2.2-.6.3-.8 0-.1-.2 0-.3 0 0 .1.1 0 .2 0 0 .2-.4.1-.4.4-.3-.2.3-.3.2-.7.2 0 .1.1.3.1 0 0 0-.2-.1-.3-.2 0-.4.4-.5 0 .1 0 .1 0 .1.1.2 0 .1-.2 0-.4.2 0 .3.2.4 0 .2.2 0 .4.4.4v-.2c.2 0 0-.2.2-.3 0-.1 0 .1-.2 0 0-.2.2-.1 0-.2.3-.1.4 0 .6-.3 0-.2 0-.5.3-.5-.4 0-.8 0-1 .5-.5.1-.3-.5-.9-.4v-.3h-.1c-.2 0-.5 0-.6-.2 0 0 0 .1-.1.2-.2-.1.2-.2 0-.4-.3 0-.7-.5-.5-.8 0-.1-.3-.1-.3-.4-.1.2-.2 0-.3.2.1.3.2.2.2.5-.2 0-.2-.3-.6-.3.2.3.5.5.8.6-.1.1-.4.1-.4.3.1.2.4.3.5.5h.2q.1.2.2.2c0 .3-.2.1-.3 0 0 .3.1.5.1.7.1 0 0-.2.2-.1 0 .2.2.2.3.3-.1.1-.5-.1-.6-.3v.2s0-.2-.1 0c-.2 0-.2-.1-.5 0 0-.4-.1-.2-.3-.4.3-.1.4.3.4.3.1 0 0 0 0-.2.2.1.2.2.4 0V31c-.1 0-.2.1-.5 0-.3.3-.5 1-.8 1.2 0-.1.3-.4 0-.5.1-.1.1-.4.3-.5 0 0-.2 0-.3-.1.4.5-.8.5-.2.8 0 .1-.2.3 0 .5-.1.1-.2-.1-.4 0l-.2-.1c.1-.1-.2-.2 0-.2 0-.2-.2 0-.5 0-1-.9-2.5-1.5-3.4-2.4-2.1-1.1-4.5-3.3-5.5-6.1 0-.8-.3-1.3-.1-2-.2 0 0-.6-.2-.8h.2c-.4-2.1.5-4.4 1.6-5.6 1.4-1.3 3.4-2 5.4-2.2.1 0 0 .1 0 0 .4.2 1.3 0 1.8 0 0 0 .5.2.6 0v.1c1.6 0 2.7 1 3.6 1.3.1.2.4.5.5.6 2 1.6 3 4 2.5 7.3-.5 0-1.2.2-1.4 0-.5.1-.5 0-1.1 0-.1-.1 0-.4-.3-.3 0-.4.4 0 .2-.6.1.1.2 0 0 0 0 0 .2-.1.3 0v-.3s.3-.1.3 0c.3-.9 0-.9-.3-1.5.3.1 0 0 .1-.1 0 0-.1 0-.2-.1.2 0-.1.6 0 .5.2 0-.1.2-.2 0 .1.2-.1.2 0 .6 0 0 0-.1-.1-.2 0 0 .1.3-.2.2.2.2 0 .2-.1.4.2-.2.2.3 0 0 0 .6.3 1-.1 1.5-.4-.2-.4 0-1 0 0-.9-.1-1.1-.3-1.9h-.2c0-1-.8-.7-1.1-1.6 0 0-.6 0-.6-.4 0 0-.1.1-.3 0-.9-.6-2.5-.5-3.3 0-1.1.8-1.5 2.5-1.1 3.9.2.6.6 1 .8 1.5.8.6 1.2 1.6 2.3 2v.4h.4v.4c.3-.3.9.1.9.5.2 0 .5.1.5.3v-.1c.2.4.9.6 1.2.9-.1.3-.5.2-.4 0-.3.2.1.3.1.4-.1-.1 0 .2-.3.1.3-.2-.3-.1-.3-.5-.3.1-.4.4-.4.8.2 0 .4 0 .3-.3.1 0 .2.1.3 0 0 .2-.1.2-.3.2.1.2.4 0 .4 0v.5h.1c0-.1.2-.5.4-.3 0 .1 0 0-.1 0 0 .3.2.1.2.3 0-.1.3 0 .3-.3 0 0 .2 0 .2.1.1 0 0 0 0-.1.3-.1.6.3.7.5.4 0 .8.8 1.1.8 0 .2.3.2.3.4h.4c-.2.2.2.2.1.4.3-.2.8.6 1.1.8v.4c.2-.3.5.1.6.2 0 .1-.3 0-.4.3.2.2.2-.1.4-.1.6.5.8 1.3 1.1 1.9 0 .4-.2.6-.5.8 0 .1.3 0 .4-.2.5.5.5 2 .2 2.6Zm-6.9-4.9c.2 0 .5.6.1.5.1-.2 0-.2-.1-.5m2.1.1c0 .4.1 0 .4.1 0 .2-.2.3-.2.5l-.2-.2s0 .2-.1.3c0 0 0-.1-.1-.3.2 0 .2-.1.2-.2-.1.4-.1-.2.1-.2Zm.1-.6c-.2 0 0-.3-.3-.3 0-.1.2-.1.2-.3.3 0 .1.3.3.3-.1.3 0-.2-.4-.1 0 .2.3.2.2.4m.9-.3c0 .2 0 .2-.2.2 0 .2.3.1.2.3h-.4c.1.2.1.6.3.6v.7h-.3.1c0-.2-.2-.3.1-.3 0-.2-.2-.1-.4-.2.2-.1 0 0 0-.2.1 0 .2 0 .2-.1-.1-.1-.3-.1-.5-.2 0-.1.2-.1.3 0 .1 0 0-.3.1-.3 0 .1-.4-.3-.2-.3 0-.2-.4-.1-.4-.5h.3c.2 0 .3.3.5.1.3.1-.1.4.2.3Zm-.4 1.4q0 .3-.3.3c-.1-.1.1-.3.3-.3m1.2-3c-.1 0-.2 0-.2-.1-.1 0-.2.2-.2 0-.1 0 .4-.1.4.1m-2.5-3c.3.3.3-.3.4-.6.2.1.3.2.2.5 0 0-.1.1-.2 0 0 .1.1.2 0 .3.2 0 .4 0 .4-.2.2.1.1.3 0 .4-.2-.1-.3 0-.8 0 .1-.2-.2-.1-.2-.4Zm-.2 1.6h.1l-.2-.1c.1-.1.3.1.3.3h-.1Zm-1.8-5.8c.3 0 .1-.2.3-.5.1 0 0 .4.1.3 0 .1 0 0-.1 0 .2 1.1.3 2-.1 3.3-.4-.5 0-1.3 0-1.9 0-.4.1-.8 0-1.2Z"/><path class="st0" d="M107.7 36c-.2-.2-.5 0-.6-.2 0-.1.1 0 .2-.1 0 0-.2 0-.3-.1 0-.2.2-.3.3-.4-.1 0-.3.3-.3.5-.2 0 0-.1-.1-.3.4 0 .1-.4.2-.7-.1 0-.1-.3-.3-.4 0-.1.3.2.2-.1-.2 0-.2.1-.2-.3-.3 0-.2-.4-.5-.2 0 0 .3-.5.2-.8 0-.2-.4 0-.1-.2-.3-.2-.1.5-.5 0-.1.1.2.2.1.4h-.2c.2-.1 0-.2 0-.2-.2.2 0 .4 0 .6-.1 0 0-.1-.3-.1 0 .1.3.1 0 .1.1.1.3.2.4.2 0 .4-.3.5-.1.9.1-.2.2 0 .5 0 0 .2 0 .3.2.4 0 .1-.4 0-.4-.2-.1.3.3.5.4.5-.1 0-.3.2-.4.1 0 .2.2.3.2.1.1.4 0 .6-.2.8-.3 0 0 0-.1-.1-.3.3 0 .8-.3.8v.3c.1.1.3 0 .3.2h.3s0 .3.2.2c-.1.2 0 .5.1.5-.3.5.1.7.1.9.2 0 .3 0 .3-.2.2.2.2.4.4.3v.3c.2 0 .2-.2.2-.3-.2-.1 0-.1 0-.3 0 0-.1-.1-.3-.2 0 0 .2 0 .1-.3.2 0 .2.2.1.3.2 0 .1-.1.2-.2 0-.1-.4-.1-.5-.4 0 .3-.2 0-.3.2 0 0-.1-.5 0-.7 0-.1-.2 0-.3-.3 0 0 .2 0 .1-.2.1 0 0 .2.3.2 0 .4.1.4.1.6.3 0 .3-.6.4-.3.1 0 0-.1 0-.3s-.1 0-.1-.1c-.1 0-.2.1-.2.3-.2-.1.2-.1 0-.4.1.1.2 0 .3 0 0-.2-.4-.2-.3-.5-.3 0 0 .5 0 .4 0 .2-.1.1-.3.3-.1 0 0-.2 0-.4s0 0-.1-.2c-.1 0 0 .2-.3.2h-.1c-.2 0 0-.1 0-.2.2.1.3.1.3-.2.2 0 .1.1.2.1.2 0 .2-.2.2-.4.1.2.2.3.2 0 .2 0 0 .3 0 .3.2-.1.4-.3.5-.5 0 .1-.3 0-.3.2Zm-.9 2.3c-.3 0 0-.3-.3-.4.2-.2.3.3.3.4m0-3.5c.1.1.1.6-.1.5 0-.1.2-.2.1-.5m-.5 1.9c-.3 0-.3 0-.5-.6.2 0 .3.3.3 0 .1 0 .2.4.1.6Zm0-.9c-.2 0 .1-.2 0-.4h.4v.3c-.3-.1-.3 0-.4.2Zm.3.6c-.2 0 0-.4-.1-.7.3.2.1.1.4 0-.2.4.3.2.2.5-.1-.2-.5 0-.5.3Z"/><path class="st0" d="M106.7 38.7c.1.5-.3.3-.3.8.5.2.4-.8.3-.8m.4.8c0 .2 0 .3.1.3s0-.2-.1-.3m-1.5-.3c.1-.2 0-.1 0-.3-.1 0-.2 0-.3.1.2 0 .1.2.2.2Zm-4.4-7.5c0 .3.2.3.3.2v-.3c0 .1-.2.1-.3.1m.9-2.6c0 .2.2.3.3.4 0-.2 0-.4.1-.3 0-.3-.4 0-.4-.2Zm-3.2-3.7c0 .1 0 0-.2 0 0 .3.3.5 0 .6.1-.2.8.4.6-.2-.2.2-.3-.3-.4-.4m3.9 13.6s-.2-.1-.3 0c.1 0 0 .3 0 .5h.1s.1 0 0 0l.1-.2c-.1 0-.1 0 0-.2Zm-6.1-14.7c.2.3.6.4.7.6 0 0 .1-.1 0-.3-.4 0-.5-.4-.8-.3Z"/><path class="st0" d="M102.6 29.5c0-.2.3-.1.2-.4-.2 0-.5.3-.2.4m-2.2 13.1c0 .1 0 .1-.1.2.2 0 0 .3 0 .4.1 0 .2 0 0-.1h.2c-.1-.2 0-.1 0-.4h-.2Zm4.3-11.5c.3 0 .6 0 .6-.2-.3.1-.5-.2-.6.2m-.1 4.1c.4.5.1.3.2.8-.1 0 0-.1-.2-.2v.5h.2v-.5c.1.1.1 0 .3 0 0-.3-.1-.4-.1-.6zm-.2 1.7c.1 0 .2.1.2.1v-.3c-.1 0-.2 0-.2.1Zm.5-1.9c.1 0 0-.2 0-.4 0 .3-.2.1-.4 0 0 .5.2.2.5.3ZM90.2 48H90Zm.4.8v-.2.1Zm.3-1.7s.1 0 0 0h.2-.3Zm-.8 2v.1zm.9-1.9"/><path class="st2" d="M13.8 15v.3c-.2 0-.4 0-.3-.3-.4 0-.1-.1-.3-.1-.1 0 0 .2-.1.4.1 0 .2-.2.3 0-.2.3-.3.6-.4.9.2 0 .1-.2.4-.2 0 .2.2.2.3.4.1-.4.5-1 .2-1.2Z"/><path class="st0" d="M49.8 20.2c-.1 0 0 .4.1.4s0-.3 0-.4h-.2Zm-2.4 4.7c-.3 0-.4.3-.4.5h.4zm.2-.5c-.3-.2-.6 0-.5.3.2 0 .5-.1.5-.3m.7-1.5c.5 0 .6-.6.1-.7-.2.2.1.2.1.4-.2 0-.2.2-.2.3"/><path class="st2" d="M14.3 16.2c-.2.2-.2-.3-.4-.2 0 .3.6.6.4.2m2.3-.7c-.2-.1-.5 0-.5.4.2 0 .4-.2.5-.4"/><path class="st0" d="M48.9 22.1c0-.3.5-.1.6-.3-.3-.2.1-.3.1-.5h-.3c.1-.2.3-.4.3-.6h-.1s0-.1 0 0c0 .2-.3.4-.4.6 0 0-.2-.1-.3 0 0 .2 0 .3-.2.6.2 0 .2.3.3.4Zm.7-2.2c0-.3.3 0 .2.3.2-.1.2-.3.5-.1-.1-.4-.1-.6 0-1-.2-.1-.3 0-.5 0 0 .5-.3.1-.3.4.3.1-.1.3 0 .5Zm1.3-1.4c-.3-.1-.5.2-.3.4 0-.2.2-.2.3-.4m-.8-1.3c0 .1-.2.3-.2.5.2 0 .3-.4.2-.5m40.2 31.3h-.1Zm-.1.6s0 .1 0 0m-.1.2h.1Z"/><path class="st2" d="M13.8 14.4c0 .2-.4.5-.2.8.1-.3.4-.7.2-.8"/><path class="st0" d="M90.1 48H90zm.1 1.3"/><path class="st2" d="M13.5 17.7c0-.1.2-.4 0-.5 0 .1-.2.4 0 .5"/><path class="st0" d="M90.6 48.6c0-.1 0-.1-.2-.2 0 0 .1-.1.2 0Zm0 0"/><path class="st2" d="M13.7 17.1c0-.5-.2-.7-.3-1-.2.4.1.8.3 1"/><path class="st0" d="M98 24.8c0 .1-.1.5 0 .3 0-.2 0 0 .2 0v-.2h-.1Zm-35.1-1.5c0 .1 0 .3.1.4 0-.2.1-.5-.1-.4m14.3 26.2v.1ZM30.3 36c.3-.1.6.1.8-.1-.1.1-.7-.2-.8.1m35.1-15.1c.3.1.3-.4 0-.3 0 .1-.1.1 0 .3M30.8 32.7c-.3 0-.4 0-.6.2v.1c.3 0 .3 0 .5.1v-.4Zm43.3 17.2v.1Zm-3.6-.2v.3zm-5.2-23.1c.1 0 .1.2.2 0 0-.1-.2 0-.2-.1-.1 0-.3.3-.2.3 0-.1.2 0 .1-.3ZM29.8 23c0 .3.1.2.3.2 0-.2-.2-.2-.3-.2m49.7 27.2h.1ZM30.7 23c-.1.1-.3.1-.3.2.1 0 .1.2.3.2 0 0 .1-.4 0-.4m.1 4.1c0-.2 0-.2-.3-.2 0 .2.1.2.3.2m.6 5.9v-.3c-.1 0-.2 0-.3.1.1 0 0 .3.3.2m48 17.2v.1zm-4.8-3.3v-.1Zm-2.8 3v.1Zm-8.9-19.8c.2-.5.5-1.1.3-1.7-.1.5-.5 1-.3 1.7m2.1.8c-.1 0 0-.1 0-.1l-.2.2c.3-.2-.2-.4-.2-.6-.1.3 0 .5.1.7-.1.1-.6.6-.2.5 0 0 .2 0 .3-.1 0-.5-.1-.4.2-.5Zm1-7.7s0-.1 0 0c0 0 0-.2.1-.2-.2 0-.3.2-.2.3Zm-1 8.2s-.1.1-.1 0c-.1.1.1.3.2.4v-.4Zm19.8 8.1v-.2s-.1-.1-.2 0c0 .1 0 .2.2.2M64.7 15.3s.1.3.3.3c0-.2.2-.3 0-.4-.2 0-.2-.8-.6-.8-.2.4-.2.6-.1 1.2.3 0 .2-.2.4-.3m-.7 6.3c0 .3-.4 0-.5 0-.2.1 0 .4 0 .5 0-.2 0-.2.3-.2s.1 1 .6.8c-.2-.3-.1-.7-.1-1-.1 0-.1-.1-.2 0Zm.2 1.8c0-.1.3 0 .3-.2-.1-.2-.5 0-.3.2M62 21.1c0 .2-.2.1-.1.3.2-.1.1 0 .3.1 0-.3.3-.3.3-.5-.2 0-.3.1-.4 0Zm1.4 2.1v-.3h-.2c0 .1 0 .3.2.3m.3-5.1c-.1.1 0 .5.1.6 0-.2 0-.5-.1-.6m-2 7.5c0-.2 0-.4-.2-.4 0 .5 0 .9-.1 1.5.3-.1.2-.5.2-.7h.3c.2.1.4.5.5.8.2-1-.1-1-.2-1.8-.3 0 0 .5-.4.6Zm10.6 21.3v-.1ZM62 28.4c0 .1 0 .4.1.4 0-.1 0-.5-.1-.4m.1-4.6c0 .1-.2 0-.1.3.2 0 .1.1.3.2.2-.2 0-.3-.1-.4Z"/><path class="st0" d="M63.2 22c0 .1-.2.1-.3.2 0 .2.2.1.1.3.3 0 .2-.5.2-.8h-.3v-1c0-.1.1-.3.3-.3s.2 0 .2.2-.3 0-.3.2c.3 0 0 .5.2.6 0-.4.1-.8.4-1 .2.2-.1.6 0 .9 0-.5.3 0 .3-.2-.2-.1.1-.7-.2-.8.3-.3 0-1.5 0-1.5 0 .2-.3.2-.4.2 0 .3 0 1-.3 1.2 0-.2.3-.5 0-.6-.6.6-.2 1.5-.2 2.3h.3Zm.6-2v.3h-.2c-.3 0 .2 0 .1-.3Zm-2.1 4.4h-.2c0 .1 0 .4.3.5v-.2c-.1 0-.3-.1-.2-.3Zm-.5 3.2c0 .2-.2.3 0 .4 0-.2.1-.4 0-.4m.5-3.5c.1-.2-.1-.4.1-.3-.2-.2 0-.2-.1-.4-.1.1-.2.3-.3.5.2 0 0 .2.3.2m4.2-7.8c0-.2-.1-.2 0-.3v-.1c0 .2-.1.4.2.5Zm15.5 31.2v.1Zm3.6-7.9c0 .1 0 .3.2.4.1-.2-.1-.3-.2-.4M36.1 16.8v.6c.3 0 .3-.7 0-.6m1.8 1v.3c.1 0 .1.1.3.1 0-.1 0-.4-.3-.4m-6.5 9.7v.3s-.1 0-.1.1c.2 0 .3-.4 0-.4Zm1-8.3v-.3c-.1 0-.2 0-.2.1.2 0 0 .3.3.2Zm-4.1 16.7c0 .2-.4.1-.6 0v.3c.3 0 .3-.1.6 0 0-.1.1-.3 0-.3M82 46.8v.1zm-.2 2.4h.1Zm3.5-9.7s0-.2.2-.1v.3c.2 0 .2-.2.3-.4h-.5c0 .1-.1.3 0 .2m1.2 1c.1 0 .2 0 .3-.1-.2-.1-.2-.4-.4-.4 0 .2.3.2.1.5m0 1.4c-.2-.4.3-.4.5-.5-.2 0-.6 0-.9.2v.1c.2 0 .2 0 .4.1Zm-1 .3c.3 0 .7-.2.5-.4-.1.1-.4.1-.5 0-.2.2 0 .2.1.4Zm-3.4 7.2v.1Zm-1.2.5v.1Zm-.4-.5v-.2Zm4.6-10.2H85v.1c.1 0 .1.1.2.2v-.3ZM80.6 50s0 .1 0 0m.3.2v.2-.1ZM31.7 32.3c-.1 0-.2-.2-.3 0 0 .3.3.3.3 0m-.5-2.9c0-.2 0-.2.2-.3 0-.1 0-.3-.1-.4 0 .2 0 .6-.3.4v.3c0-.1 0 0 .2 0M81 49.2"/></svg>      `,
      brittas: `
<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 410.9 170.1"><defs><style>.st0{fill:#fff}</style></defs><path class="st0" d="M409.5 11.4c-1.4-.9-3.2-1.6-5.6-2.2-2.3-.6-4.9-1-7.6-1.3s-5.2-.2-7.4.1c-1.2.2-3.6.8-7.3 1.8s-8.5 2.2-14.5 3.7-12.9 3.1-20.9 5c-8 1.8-16.8 3.6-26.4 5.5-7.6 1.5-36.8 6.8-43.3 7.8-1.3-1.4-2.9-2.5-4.9-3.4s-3.7-1.3-5.3-1c-1.7.3-3.3 1.1-4.9 2.6q-2.25 2.1-4.8 5.1c-1.4.2-12 2-15.7 2.6-1.3-1.4-2.9-2.5-4.9-3.4s-3.7-1.3-5.3-1c-1.7.3-3.3 1.1-4.9 2.6-1.6 1.4-3.3 3.2-5 5.3-7.4 1.5-11.3 2.5-11.8 3.3-1.2 1.7 1.4 2.8 7.6 3.1-2.4 4.4-4.4 9.3-6.1 14.6-.4 1.2-.7 2.4-1 3.6-.3.3-.6.7-.9 1-2 2.4-4 4.7-6 6.7-2.1 2.1-4 3.8-5.8 5.3s-3.3 2.6-4.7 3.5c-1.4.8-2.3 1.2-2.7.9-.6-.3-.6-1.3-.1-3.1s1-3.8 1.7-6 1.3-4.4 2-6.5c.7-2.2 1-3.7.9-4.8 0-1-.4-1.9-1-2.6s-1.4-1.2-2.3-1.7c-.9-.4-1.9-.8-3-1q-1.65-.45-3-.6c-1 0-2.1.9-3.1 2.5s-2 3.6-2.9 6c-.7 2-1.3 4-1.8 6.3-.7 1-1.6 2.3-2.8 4-1.6 2.2-3.3 4.5-5.1 6.8s-3.6 4.4-5.3 6.2-3.1 2.8-4.1 3-1.3-.5-.9-2 1-3.3 1.9-5.4 1.7-4.1 2.4-6.2 1-3.6.7-4.6c-.5-1.1-1.2-2-2.3-2.6-1.1-.7-2.3-1.1-3.5-1.4-1.2-.2-2.4-.3-3.5 0-1.1.2-1.7.6-1.9 1.1-.3.5-.9 1-1.8 1.7s-1.8 1.3-2.8 1.9q-1.5.9-3 1.2c-1 .2-1.8.2-2.4-.3 1.7-2.3 2.4-4.4 2.1-6.4s-1.1-3.4-2.4-4.3-3-1-4.9-.4-3.7 2.3-5.3 5.1q-1.2 1.95-1.5 3.6c-2-2.8-4.8-4.9-8.4-6.5s-7.4-2.3-11.4-2c1.9-1.6 4.8-3.8 8.7-6.8 3.8-3 7.9-6.3 12.3-10.1 4.3-3.7 8.6-7.6 12.6-11.7q6.15-6.15 9.9-12c2.5-3.9 3.9-7.5 4-10.8s-1.6-6.1-5.2-8.3c-5.8-3.3-12.9-4.7-21.2-4s-17.4 2.8-27 6.2c-9.7 3.4-19.5 7.9-29.6 13.4S55.5 31.6 46.4 38 29.1 51 21.8 57.6 8.8 70.3 4.7 75.8C1.6 79.5 0 83.3 0 86.9s.5 6.6 1.6 9q1.65 3.6 3.9 5.1c1.5 1 2.4.9 2.7-.2.8-3.9 3.3-8.3 7.3-13.3s9-10.3 15-15.8c6-5.6 12.7-11.2 20.1-16.9 7.5-5.7 15.1-11.2 23-16.5S89.3 28.2 97 23.8c7.8-4.4 15-8.1 21.6-11q9.9-4.35 17.1-6c4.8-1.1 8.3-.9 10.4.6 1.9 1.3 1.6 3.9-.9 7.7q-3.6 5.7-11.1 12.9c-5 4.9-10.7 9.9-17.2 15.3-6.5 5.3-12.8 10.3-19 14.9s-11.8 8.6-16.7 11.9c-5 3.3-8.3 5.4-10 6.1.3-1.9.7-3.9 1.2-6.1.5-2.1.2-3.8-1-5-.5-.4-1.3-.8-2.4-1s-2.3-.4-3.6-.4q-1.95 0-3.6.3c-1.1.2-1.8.6-2.3 1-.5.6-1.1 1.8-1.6 3.4-.6 1.6-1.2 3.6-1.8 5.9-.7 2.3-1.4 4.8-2.1 7.4-.7 2.7-1.6 5.3-2.7 8-.3.3-1.2 1-2.5 2.1-1.3 1-2.8 2.2-4.4 3.5s-3.1 2.6-4.4 3.8c-1.3 1.3-2.1 2.2-2.4 2.9-1 2.5-1.1 4.3-.6 5.3.6 1 1.5 1.5 2.9 1.6 1.3 0 2.8-.2 4.3-.7 1.5-.6 2.8-1.2 3.7-1.9-.2 1.2-.3 2.6-.4 4.1s-.1 3 0 4.4c0 1.4.2 2.8.5 4 .2 1.2.6 2.1 1.1 2.7.2.2.6.6 1.4 1 .7.5 1.5.8 2.4 1.1.8.3 1.6.4 2.4.4.7 0 1.1-.4 1.3-1 1.2-4.5 2.5-9.2 3.8-14.2s2.8-9.6 4.6-13.7c1.2-.6 3.2-1.9 6.1-3.9s6.3-4.2 10.1-6.6 7.8-4.8 11.9-7.2q6.3-3.6 12-5.7c3.9-1.4 7.3-2 10.4-1.9s5.3 1.5 6.7 4.1c1.6 2.8 1.6 6.5 0 11s-4.2 9.4-7.9 14.7-8.3 10.7-13.6 16.3c-5.4 5.6-11.1 11.1-17.3 16.4-6.1 5.3-12.4 10.2-18.7 14.7-6.3 4.4-12.3 8.2-17.9 11.2s-10.6 5-14.9 5.9c-4.4 1-7.6.6-9.8-1.1-2.3-1.7-3.5-4-3.6-7s.2-6.1 1-9.4c.8-3.2 1.7-6.3 2.9-9.1 1.2-2.9 2-5.1 2.5-6.6.4-1.3 0-2.1-1.5-2.5-1.4-.4-3-.4-5-.1-1.9.3-3.8.8-5.5 1.6-1.8.7-2.8 1.6-3.1 2.6-2.6 8.4-3.4 15.3-2.5 20.8s3.2 9.6 6.9 12.5c3.6 2.9 8.5 4.3 14.5 4.4 6 0 12.8-1.1 20.3-3.4 7.5-2.4 15.6-6 24.2-10.9 8.7-4.9 17.5-11 26.5-18.3 2.3-1.8 5-4.2 8-7.2s6.1-6.4 9.1-10.1 5.9-7.6 8.5-11.7 4.7-8.3 6.2-12.6c1.5-4.2 2.2-8.4 2.2-12.4 0-1.6-.2-3.1-.5-4.6.2.2.5.4.7.5 1.7 1 3.9 1.5 6.4 1.6 2.5 0 4.8-.4 7-1.5-.6 2.3-1.2 4.5-1.7 6.5s-.6 3.8-.3 5.5c.2 1.9 1.1 3.5 2.8 4.7s3.5 2.1 5.6 2.7q3.15.75 6 .9c1.9 0 3.3-.2 4.3-.8 2.1-1.3 4.2-3.2 6-5.8 1.9-2.6 3.7-5.2 5.3-8 .4-.7.7-1.3 1.1-1.9.4 1.1 1 2.2 1.7 3.1 1.4 1.7 3.1 3 5 4s3.9 1.6 5.9 1.9 3.6.3 5 0c1-.4 2.3-1.5 4-3.1 1.7-1.7 3.5-3.6 5.4-5.8q2.4-2.85 4.8-6c.2 4 1.2 7.2 3.1 9.7 2.1 2.6 5.7 3.5 10.9 2.6 2.5-.4 5.4-1.9 8.6-4.5s6.2-5.5 9-8.6c1.4-1.6 2.7-3.1 3.9-4.6.2 3.9 1.3 7 3.1 9.3 2.1 2.6 5.7 3.5 10.9 2.6 2.6-.4 5.4-1.9 8.6-4.5s6.2-5.5 9-8.6c.8-.9 1.6-1.8 2.3-2.7 0 .3.2.5.2.8.8 2 2.1 3.6 3.9 4.9s3.7 2.4 5.9 3.1c2.2.8 4.3 1.2 6.4 1.3 2.1 0 3.8-.1 5.2-.6 1.5-.7 2.9-1.8 4.2-3.1 1.4-1.3 2.8-2.7 4.3-4.1 2.4 1.5 5.2 2.4 8.4 2.9 3.1.4 5.5.3 7.1-.3 1.2-.5 2.7-1.7 4.3-3.8s3.3-4.4 4.8-7c1.6-2.6 6.2-10.4 6.8-11.4h.1c2 0 4 0 5.9-.4 1.9-.3 3.6-.6 5.2-.9 1.5-.3 2.5 0 2.9.9.2.9-.1 2.3-1.1 4.2s-2.2 3.8-3.5 5.8c-1.4 1.9-2.8 3.6-4.2 4.9-1.5 1.3-2.5 1.8-3.2 1.3-.4-.3-.4-1 0-2 .5-1 1-2 1.7-3.1s1.4-2.1 2.1-3.2 1.2-1.8 1.5-2.3c1.1-1.6 1.4-2.8.8-3.7-.5-.9-1.8-.7-3.8.6q-1.95 1.2-3.9 3c-1.3 1.2-2.4 2.4-3.4 3.6-1 1.3-1.8 2.5-2.3 3.7-.5 1.3-.8 2.3-.6 3.2.2 1.3.9 2.6 2.1 4.1 1.3 1.5 2.8 2.7 4.5 3.8 1.8 1.1 3.7 1.8 5.9 2.1 2.1.4 4.3.1 6.4-.7 2-.8 4-2.2 6-4.3s3.7-4.4 5.1-6.8 2.5-4.8 3.3-7.3 1-4.5.8-6.2-1-3.1-2.2-4.2c-1.3-1.1-2.9-2-4.8-2.5-2-.5-4.2-.8-6.6-.8s-4.9.4-7.6 1.1q1.35-2.7 3.6-4.8c1.5-1.4 2.1-3 1.9-4.8-.1-.9-.6-1.8-1.4-2.7s-1.7-1.8-2.8-2.5-2.2-1.2-3.4-1.6c-1.2-.3-2.3-.4-3.3-.1-1.5.4-3 1.5-4.4 3q-2.1 2.4-3.3 5.4c-.8 2.1-1.1 4.2-1 6.3s.8 4 2.2 5.5l.1.1q-1.95 2.4-3.9 4.5-3.15 3.45-5.7 6c-1.7 1.7-3.2 3.1-4.4 4.2-1.2 1-2 1.5-2.5 1.3q-.9-.45 0-2.7c.6-1.5 1.3-3.3 2.2-5.2.9-2 1.7-3.9 2.5-5.8s1.1-3.3.9-4.4c0-.9-.4-1.7-1.1-2.4-.8-.7-1.7-1.2-2.7-1.6s-2.2-.7-3.4-.9-2.3-.4-3.4-.5c-1.3 0-2.7 1-4.3 2.8q-.9-1.65-2.7-2.7c-1.2-.7-2.5-1.3-4-1.7-1.4-.5-2.8-.7-4.2-.8-1.4 0-2.5 0-3.4.3-1.4.4-3.2 1.7-5.4 4-2.2 2.4-4.2 5.1-6.1 8.1-.5.8-1 1.6-1.4 2.5l-.3.3c-1 .8-2.9 2.6-5.5 5.3s-5.4 5.5-8.3 8.3-5.6 5.3-8.1 7.4-4.2 3-5.1 2.6c-1-.5-1.3-1.6-1-3.5.3-1.8 1-4 2.2-6.5s2.6-5.3 4.4-8.4c1.8-3 3.6-6 5.5-8.8s3.8-5.4 5.6-7.8 3.4-4.2 4.6-5.5a843 843 0 0 1 31.7-6c10.6-1.8 92.9-14.4 96.8-15.1s6.1-1.4 6.4-1.9c.6-1 .2-2-1.2-2.9ZM291 69.1c.3-1.6 1-3.3 1.8-5.4.9-2 2-4.2 3.2-6.5 1.3-2.3 2.6-4.2 3.9-5.9 1.3-1.6 2.6-2.8 3.8-3.5s2.1-.5 2.8.5c.2 1.3-.2 3.3-1.2 6.1s-2.2 5.5-3.8 8.2q-2.4 4.05-5.1 6.9c-1.9 1.9-3.6 2.6-5.1 2-.7-.2-.8-1-.5-2.6Zm-38.8-27.5c-2.4 4.5-4.4 9.3-6.1 14.6-.5 1.5-.8 2.9-1.2 4.4-1.1 1-2.7 2.5-4.7 4.6-2.6 2.7-5.4 5.5-8.3 8.3s-5.6 5.3-8.1 7.4-4.2 3-5.1 2.6c-1-.5-1.3-1.6-1-3.5.3-1.8 1-4 2.2-6.5s2.6-5.3 4.4-8.4c1.8-3 3.6-6 5.5-8.8s3.8-5.4 5.6-7.8 3.4-4.2 4.6-5.5c4.1-.9 8.4-1.8 12.8-2.6l-.7 1Z"/><path class="st0" d="M191.9 48.1c1.1.5 2.2.8 3.4 1q1.8.3 3 0c.7-.2 1.6-.9 2.6-2q1.5-1.65 2.7-3.6c.8-1.3 1.5-2.7 2.1-4s.8-2.4.6-3.2c0-.7-.4-1.4-1.3-2.2s-1.9-1.6-3.2-2.2-2.6-1-4-1.3q-2.1-.3-3.3 0c-.8.4-1.7 1.1-2.5 2.2s-1.5 2.3-2 3.6c-.6 1.3-1 2.7-1.4 4.1-.3 1.4-.5 2.4-.5 3.2 0 .9.4 1.7 1.1 2.5q1.05 1.05 2.7 1.8Zm-49.3 96.8c-1 0-1.8-.3-2.3-.8-.7-.8-.9-1.8-.9-3.6h-3.3c0 3.1.4 4.6 1.7 5.9 1.1 1.1 2.7 1.6 4.8 1.6 2.2 0 3.8-.7 4.9-1.8 1.3-1.4 1.7-3.3 1.7-6.2 0-4.4-.7-6.4-3.9-7.5l-3.1-1.1c-2.2-.8-2.6-1.6-2.6-4.4s.3-2.6 1-3.4c.5-.5 1.2-.9 2.1-1 1 0 1.8.2 2.2.8.7.8.8 1.8.8 3.3l3.3-.2c0-2.6-.4-4.4-1.8-5.7-1-.9-2.6-1.4-4.6-1.3-1.8.1-3.3.8-4.4 1.9-1.4 1.4-2.1 3.4-2.1 5.8 0 4.2.9 5.7 3.8 6.7l3.1 1.1c2.2.9 2.7 1.8 2.7 5.1s-.2 2.9-.9 3.8c-.5.6-1.2.9-2.4 1ZM313.3 107v37.2l3.3-.1v-25.5l7.1 25.4 3.1-.1V106l-3.3.3v25.8l-7.1-25.3zm-8.7 28.7 1.3 8.6h3.5l-6.4-36.6-3.2.2-6.4 36.6h3.5l1.3-8.7 6.4-.2Zm-3.1-20.7 2.6 16.7-5.2.2zm-140.8 32.3v-25.8l4.6-.3v-3.1l-12.6.9v3.1l4.7-.4v25.7zm183.3-6.5c1.9-3 1.9-7.2 1.9-16.8s0-13.8-1.9-16.6c-1-1.5-2.5-2.5-4.7-2.4l-6.4.5v38.2h6.4c2.2-.2 3.7-1.4 4.7-3Zm-2.5-2.8c-.5.9-1.2 1.5-2.3 1.5h-2.9v-30l2.9-.2c1.1 0 1.9.5 2.3 1.3 1 1.8 1.1 4.8 1.1 13.6s-.1 11.9-1.1 13.7Zm18.8-4.1 1.3 9.3h3.5l-6.4-39.6-3.2.2-6.4 39.6h3.5l1.3-9.4 6.4-.2Zm-3.1-22.4 2.5 18.1-5.1.2zm-174.7 13.8c0-6.6-2.3-8.4-6.5-8.1l-6.2.5v29.4h3.3v-12.8h3c0-.1 3.8 12.6 3.8 12.6h3.5l-4.2-13.5c2.4-1.3 3.3-3.8 3.3-8ZM176 131h-2.9v-10.4l2.9-.2c2.6-.2 3.1 1.9 3.1 5.1s-.6 5.4-3.1 5.5m21.4 8.3 1.3 7.3h3.5l-6.4-30.7-3.2.2-6.4 30.7h3.5l1.3-7.3zm-3.2-17.4 2.6 14.1-5.1.2 2.6-14.2Zm42.6 21.5c1.9-2.5 1.9-6.1 1.9-14.3s0-11.8-1.9-14.1c-1-1.3-2.5-2.1-4.7-2l-6.4.5v32.4h6.4c2.2-.2 3.7-1.2 4.7-2.5m-2.5-2.4c-.5.8-1.2 1.3-2.3 1.3h-2.9v-25.5l2.9-.2c1.1 0 1.9.4 2.3 1.1 1 1.5 1.1 4 1.1 11.6s-.1 10.1-1.1 11.7m-28.2-26v31.4l3.3-.1v-21.6l7.1 21.5 3.1-.1V114l-3.3.3v21.8l-7.1-21.3zm51.2-3.8-3.6.3-4.1 27.4-3.9-26.8-3.7.2 5.9 33.2 3.4-.1zm32.4 7.8c0-7.9-2.3-10.1-6.5-9.7l-6.2.5V145h3.3v-15.3h3c0-.1 3.8 15.1 3.8 15.1h3.5l-4.2-16.2c2.4-1.6 3.3-4.5 3.3-9.5Zm-6.5 6.7h-2.9v-12.4l2.9-.2c2.6-.2 3.1 2.3 3.1 6.1s-.6 6.4-3.1 6.5m-11.5-11.8v-3.8l-10.6.8v34.3l10.6-.2v-3.7l-7.3.1v-11.7l6.3-.3v-3.7l-6.3.3v-11.6zM136.1 154h229.1v4.1H136.1zm0-40.7L365.2 93v-4.8l-229.1 21.7z"/></svg>      `,
      strandkollektivet: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 166.9 31.3" overflow="visible" xml:space="preserve"><path fill="#fff" d="M166.9 19.9c0-6-4.8-10.2-11-10.2s-11 4.2-11 10.2 4.8 10.2 11 10.2c4.8 0 8.7-2.5 10.3-6.4h-1.1c-1.6 3.5-4.1 5.1-8.8 4.3-2.8-.4-3.7-2.5-3.7-8.1zm-7.7-1.2h-6.6c.1-4.7.6-8.5 3.3-8.5s3.2 3.8 3.3 8.5M145.7 27c-.7.5-1.2.6-1.7.6-1.7 0-1.7-1.7-1.7-3V9.7l-9.7 1.8.1.3c2.5-.5 2.6.8 2.6 3 0 0 0 9.8.1 10.8-1.3.9-2.7 2-3.9 2.3-1.1.3-2.2.4-3.3.2-1-.1-2.1-.4-3-.9-1-.5-2-1-2.9-1.5l-2.9-1.6c-1-.5-2-.9-3.1-1.2s-2.2-.3-3.3-.2c-1.2.1-2.4.5-3.7 1.2-.4.2-.7.5-1.1.8s-.7.7-1 1.1-.6.7-.8 1.1l-.3.6c-.5-1.8-.6-4.3-.6-7.2 0-5.3.4-9.7 3.3-9.7s3.3 4.4 3.3 9.7v1.6c.3-.1.6-.1.9-.1 1.2-.1 2.3 0 3.3.2 1.1.3 2.1.6 3.1 1.2h.1c.3-.9.4-1.9.4-2.9 0-6-4.8-10.2-11-10.2s-11 4.2-11 10.2 4.8 10.2 11 10.2c3.1 0 5.8-1.1 7.8-2.9 0 0-.3-.6-1.7-1.1-2.3-.7-3.2.1-3.2.1-.4 2.1-1.3 3.3-2.9 3.3-1 0-1.7-.3-2.2-1.2-.2-.3-.3-.7-.5-1.2.7-.5 1.4-.9 2-1.3.7-.4 1.3-.7 2-.9s1.4-.3 2.2-.2 1.5.3 2.3.6 1.5.6 2.2 1 1.4.7 2.1 1.1c1.1.6 2.1 1.1 3.1 1.5s2 .8 2.9 1c1 .2 1.9.3 2.9.3s1.9-.2 2.9-.5c.5-.2 1.1-.4 1.6-.8s1-.8 1.4-1.2.7-.9 1-1.3c.3-.5.6-1 .7-1.3 0 3 1.1 4.3 3.9 4.3 2.7 0 4.8-1.4 6.6-2.8zm-14.5 0c-1.6-.4-1.6-2.4-1.6-3.3v-14l-10.5 1.9.1.3c3.3-.6 3.4.6 3.4 2.8v10.2c.9.5 1.7.9 2.6 1.3q1.5.75 3 .9c1 .2 2 .2 3-.1M98 29.5c-2.7 0-3-.8-3-4.4v-11l.1-4.3-10.6 2.5.1.3c3.2-.7 3.4.6 3.4 3.1v9.4c0 3.6-.3 4.4-3 4.4h.1v.3H98zm-13.1 0q.15 0 0 0c-2.6 0-2.9-.8-2.9-4.4v-9.9c0-3.9-1.4-5.6-4.4-5.6-2.3 0-4.6 1.1-8.4 4.1l.1-4.1-10.6 2.5.1.3c3.2-.7 3.4.6 3.4 3.1v9.4c0 3.6-.3 4.4-3 4.4v.3h12.2v-.3c-2.1 0-2.2-1.7-2.2-4.4v-11c1.1-1 2.4-1.5 3.4-1.5 2.3 0 2.3 2.3 2.3 3.4v9.1c0 3.4 0 4.4-2.1 4.4v.3h12zM95.6 4.1c0-2.3-1.9-4.1-4.2-4.1s-4.2 1.9-4.2 4.1c0 2.3 1.9 4.2 4.2 4.2 2.4 0 4.2-1.9 4.2-4.2M59.9 19.9c0-6-4.8-10.2-11-10.2s-11 4.2-11 10.2 4.8 10.2 11 10.2c6.1 0 11-4.2 11-10.2m-7.7 0c0 5.7-.4 9.7-3.3 9.7s-3.3-4.1-3.3-9.7c0-5.3.4-9.7 3.3-9.7s3.3 4.4 3.3 9.7M38.8 3.7v-.3H27.2l-6.3 16.2-7-16.2H0v.3c3.6 0 5 1.3 5.5 3.5V24C5 27.2 3.6 29.5 0 29.5v.3h12v-.3c-4.1 0-5.4-2.8-5.8-6.5V5.5L17 30.6l-.1.4.8.3 9.5-24.8V23c0 4.4-.2 6.5-3.4 6.5v.3h15v-.3c-3.8 0-3.8-2-3.8-6.5V10.2c0-4.6 0-6.5 3.8-6.5"/></svg>
      `,
        nisses: `
<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 112.9 28.4" overflow="visible" xml:space="preserve"><path d="M1.7 20.7V3.3h6.5c1.3 0 2.5.2 3.4.7s1.6 1.1 2.1 2c.5.8.7 1.8.7 2.9s-.2 2.1-.7 2.9-1.2 1.5-2.1 1.9-2.1.7-3.4.7H3.6v-2.6h4.2c.8 0 1.4-.1 1.9-.3s.9-.5 1.1-1c.2-.4.4-.9.4-1.6 0-.6-.1-1.1-.4-1.6-.2-.4-.6-.8-1.1-1-.5-.3-1.1-.4-1.9-.4H4.9v14.8zm9-7.9 4.3 7.9h-3.5l-4.2-7.9zM22.4 21c-1.3 0-2.4-.3-3.4-.8s-1.7-1.3-2.2-2.3-.8-2.2-.8-3.6c0-1.3.3-2.5.8-3.6.5-1 1.2-1.8 2.2-2.4q1.35-.9 3.3-.9c.8 0 1.6.1 2.3.4s1.4.7 1.9 1.2c.6.5 1 1.2 1.3 2.1s.5 1.8.5 3v.9H17.5v-2h7.8c0-.6-.1-1.1-.4-1.6s-.6-.8-1-1.1-1-.4-1.6-.4-1.2.2-1.7.5-.8.7-1.1 1.2-.4 1-.4 1.6V15c0 .8.1 1.4.4 2 .3.5.7 1 1.2 1.2.5.3 1.1.4 1.8.4.4 0 .9-.1 1.2-.2q.6-.15.9-.6c.3-.2.5-.6.6-.9l2.9.3c-.2.8-.5 1.4-1 2s-1.2 1-1.9 1.3-1.8.5-2.8.5M36 21c-1.3 0-2.4-.3-3.4-.9-.9-.6-1.7-1.4-2.2-2.4s-.8-2.2-.8-3.5.3-2.5.8-3.5 1.2-1.8 2.2-2.4q1.35-.9 3.3-.9c1.1 0 2 .2 2.8.6s1.5.9 2 1.6.8 1.5.8 2.5h-2.9c-.1-.6-.4-1.2-.8-1.6s-1-.5-1.8-.5c-.6 0-1.2.2-1.7.5s-.8.8-1.1 1.5-.4 1.4-.4 2.3.1 1.7.4 2.3.6 1.1 1.1 1.5 1 .5 1.7.5q.75 0 1.2-.3c.4-.2.7-.4.9-.8.2-.3.4-.7.5-1.2h2.9c-.1.9-.3 1.7-.8 2.5-.5.7-1.1 1.3-1.9 1.7-.8.3-1.7.5-2.8.5m13.4 0c-1.3 0-2.4-.3-3.4-.8s-1.7-1.3-2.2-2.3-.8-2.3-.8-3.6.3-2.5.8-3.6c.5-1 1.2-1.8 2.2-2.4s2-.9 3.3-.9c.8 0 1.6.1 2.3.4s1.4.7 1.9 1.2c.6.5 1 1.2 1.3 2.1s.5 1.8.5 3v.9H44.5v-2h7.8c0-.6-.1-1.1-.4-1.6s-.6-.8-1-1.1-1-.4-1.6-.4-1.2.2-1.7.5-.8.7-1.1 1.2-.4 1-.4 1.6V15c0 .8.1 1.4.4 2 .3.5.7 1 1.2 1.2s1.1.4 1.8.4c.4 0 .9-.1 1.2-.2q.6-.15.9-.6c.3-.2.5-.6.6-.9l2.9.3c-.2.8-.5 1.4-1 2s-1.2 1-1.9 1.3-1.8.5-2.8.5m7.8 4.6v-18h3v2.2h.2c.2-.3.4-.7.7-1s.7-.7 1.2-.9c.5-.3 1.1-.4 1.9-.4 1 0 1.9.3 2.7.8s1.5 1.3 1.9 2.3c.5 1 .7 2.2.7 3.7 0 1.4-.2 2.7-.7 3.7s-1.1 1.8-1.9 2.3-1.7.8-2.8.8c-.8 0-1.4-.1-1.9-.4s-.9-.6-1.2-.9c-.3-.4-.5-.7-.7-1h-.1v7h-3zm3-11.4c0 .8.1 1.6.4 2.2.2.6.6 1.1 1 1.5.5.4 1 .5 1.7.5s1.3-.2 1.7-.5c.5-.4.8-.9 1-1.5s.4-1.4.4-2.2-.1-1.5-.3-2.2c-.2-.6-.6-1.1-1-1.5-.5-.4-1-.5-1.7-.5s-1.2.2-1.7.5-.8.8-1 1.5c-.3.6-.5 1.3-.5 2.2m18-6.6V10h-7.5V7.6zm-5.7-3.1h3.1v12.3c0 .4.1.7.2 1s.3.4.5.4c.2.1.4.1.7.1h.5c.1 0 .3-.1.4-.1l.5 2.4c-.2.1-.4.1-.7.2s-.7.1-1.1.1c-.8 0-1.5-.1-2.1-.4q-.9-.45-1.5-1.2c-.4-.5-.5-1.2-.5-2zm9.2 1.3c-.5 0-.9-.2-1.3-.5-.3-.3-.4-.7-.4-1.2s.2-.9.5-1.2c.4-.3.8-.5 1.3-.5s.9.2 1.3.5c.3.3.5.7.5 1.2s-.2.9-.5 1.2-.9.5-1.4.5m-1.5 14.9V7.6h3.1v13.1zm11.4.3c-1.3 0-2.4-.3-3.3-.8-.9-.6-1.7-1.4-2.2-2.4s-.8-2.2-.8-3.5c0-1.4.3-2.5.8-3.6.5-1 1.2-1.8 2.2-2.4.9-.6 2-.8 3.3-.8s2.4.3 3.3.8c.9.6 1.7 1.4 2.2 2.4s.8 2.2.8 3.6-.3 2.5-.8 3.5-1.2 1.8-2.2 2.4c-.9.5-2 .8-3.3.8m0-2.5c.7 0 1.3-.2 1.7-.6.5-.4.8-.9 1-1.5s.3-1.4.3-2.2-.1-1.5-.3-2.2-.6-1.2-1-1.6c-.5-.4-1-.6-1.7-.6q-1.05 0-1.8.6c-.5.4-.8.9-1 1.6s-.3 1.4-.3 2.2.1 1.5.3 2.2c.2.6.6 1.2 1 1.5s1.1.6 1.8.6m11.4-5.4v7.7h-3.1V7.6h3v2.2h.2c.3-.7.8-1.3 1.4-1.7.7-.4 1.5-.6 2.5-.6q1.35 0 2.4.6c.7.4 1.2.9 1.6 1.7.4.7.6 1.6.5 2.7v8.3h-3.1v-7.9c0-.9-.2-1.6-.7-2.1s-1.1-.7-1.9-.7c-.5 0-1 .1-1.4.4s-.7.6-1 1-.4.9-.4 1.6" fill="#3e2b00"/></svg>  `,
johns: `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142.3 53.8"><path d="M82.3 29.7H60c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9m-6.9 21.2-1.1-3.3H68l-1.1 3.3H62l6.8-18.2h4.8l6.8 18.2h-4.9ZM23.2 0H.9C.4 0 0 .4 0 .9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9m-5.5 15.2c0 4.1-2.1 6.1-6.4 6.1s-6.4-2.8-6.4-6.8v-.8h4.5v1.7c0 1.2.7 1.9 1.8 1.9s1.7-.6 1.7-2.4V2.8h4.7v12.4Zm53.4 22.5L69 44.1h4.1zM41.6 6.6c-3.1 0-4.2 2.7-4.2 5.4s1.2 5.4 4.2 5.4 4.2-2.7 4.2-5.4-1.2-5.4-4.2-5.4M82.3 0H60c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9M79 21.2h-4.7v-7.5h-6.2v7.5h-4.7V3h4.7v6.6h6.2V3H79zm-26.2 8.5H30.5c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9m-4.6 21.2H35V32.7h4.7v14.1h8.5zM52.8 0H30.5c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9M41.6 21.5c-5.7 0-9-4.2-9-9.5s3.2-9.5 9-9.5 9 4.2 9 9.5-3.2 9.5-9 9.5m99.8 8.2h-22.3c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9m-3.7 21.2h-14.8V32.7h14.5v3.8h-9.8v3.2h8.9v3.7h-8.9v3.5h10V51ZM111.9 0H89.6c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9m-3.3 21.2h-4.9L97.4 9.9v11.3h-4.5V3h4.9l6.3 11.2V3h4.5zM12.4 36.4H9.2v4.7h3.2c1.5 0 2.5-.6 2.5-2.3s-1.1-2.4-2.5-2.4m10.8-6.7H.9c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9M13.1 44.8H9.2v6.1H4.5V32.7h8.6c3.4 0 6.6 1.6 6.6 5.9s-2.6 6.3-6.6 6.3Zm98.8-15.1H89.6c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V30.6c0-.5-.4-.9-.9-.9M101 47.2c2.2 0 3.5-1.3 3.7-3.4h4.7c-.3 4.7-3.7 7.4-8.3 7.4S92 47 92 41.7s3.6-9.5 9.1-9.5 8.2 2.5 8.3 6.9h-4.7c-.3-1.8-1.7-2.8-3.7-2.8-3.1 0-4.2 2.7-4.2 5.4s1.2 5.4 4.2 5.4ZM141.4 0h-22.3c-.5 0-.9.4-.9.9v22.3c0 .5.4.9.9.9h22.3c.5 0 .9-.4.9-.9V.9c0-.5-.4-.9-.9-.9m-11.1 21.5c-4.2 0-7.9-1.8-7.9-6.5h4.7c.1 2.1 1.4 2.8 3.4 2.8s2.9-.5 2.9-1.9-2.6-1.9-5.2-2.7c-2.6-.7-5.3-1.9-5.3-5.2s4-5.5 7.4-5.5 7.3 1.8 7.3 5.9h-4.7c0-1.7-1.5-2.2-2.9-2.2s-2.3.4-2.3 1.6 2.6 1.7 5.3 2.4c2.6.7 5.3 2 5.3 5.3s-3.9 6.1-7.9 6.1Z" style="fill:#fff"/></svg>
   `,
da: `<svg id="Lager_1" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 131.4 60.6"><defs><style>.st0{fill:#1d1d1b}</style></defs><path d="M59.2 52.6c-.5-.3-.6-.7-.4-1.1.2-.3.6-.5 1.1-.2s.6.6.3 1c-.2.4-.6.5-1 .3m4.6 5.7c-.2 0-.8-.3-1.2-.5.4-.9 1.4-3.8 1.5-4.2.2-.6.4-1.1.5-1.6.2-.6.4-1.4.5-1.7.3.1.7.2 1.2.4 1.4.5 2.2 1.8 1.9 2.8-.4 1.1-1 1.4-1.5 1.4.4.5.9 1.2.6 2-.4 1.2-1.7 2.1-3.4 1.5Zm1.3-3.5c-.1.3-.3.9-.5 1.3-.1.4-.2.7-.4 1.1l.3.1c.6.2 1.1-.1 1.4-.9.2-.7 0-1.4-.9-1.6Zm1-3c-.1.3-.6 1.7-.8 2.1.6.3 1.3.2 1.5-.6.2-.7-.1-1.2-.8-1.5Zm7.5 8.8c-1.1 0-2.2-1.6-1.9-4.5.2-2.8 1-3.9 2.7-3.8 1.3.1 2.5 1.1 2.2 4.2s-2 4.1-3 4Zm.6-7c-.6 0-.9.9-1.1 2.6-.2 2 .1 3.1.8 3.2.5 0 1.2-1.3 1.4-2.9.2-2.4-.4-2.9-1.1-2.9m8.7 6.8h-1.4c0-.6-.5-3.9-.7-4.6-.2-1.2-.5-2.7-.6-3.2.4-.2.9-.3 1.2-.3 2-.3 3.5.4 3.9 3 .5 2.9-.8 4.9-2.4 5.1m-1.2-7c.3 1.9.7 4.4 1 5.8h.1c1-.2 1.4-2 1.1-3.7-.4-2.1-1.2-2.2-2.2-2.1m12.7 3.5c-.3 0-.9.3-1.3.5-.8.3-1.6.6-2.1.8-.2-.6-.8-2.1-1.3-3.4-.6-1.5-1.5-3.3-1.8-4 .4-.2 1.1-.6 1.3-.7.4-.2 1.6-.7 2.1-.9 0 .4.2.9.3 1.2-.4.1-1.2.4-1.6.5-.2 0-.4.2-.5.2.3.7.5 1.2.8 1.9.2 0 .5-.2.7-.3.1 0 .8-.4 1.1-.6.1.3.3.7.5 1.1-.4.2-.8.3-1.1.4-.2 0-.5.2-.7.3.2.7.7 1.7 1.1 2.4.2 0 .4-.2.5-.2s1.2-.5 1.7-.7c0 .3.2.8.3 1.2Zm7.9-5.7c-.2.5-.7 1.1-1 1.2-1.3 1-3 .9-4.8-1.6-2.1-2.7-.7-4.2 1-5.7.3.3.5.5.9.8-.1 0-.3.2-.4.3-1 .8-1.8 1.9-.4 3.8 1.2 1.6 2.3 2 3.1 1.3l.1-.1c-.4-.5-1.2-1.5-1.5-1.8-.2.1-.5.3-.6.4-.3-.4-.4-.6-.7-.9.6-.4 1.3-.8 1.8-1.2.4.5 1.5 2.3 2.5 3.5m6.2-5.9c-.4-.2-1.1-.5-1.5-.8s-.1 0-.2-.1c-.2.2-.8 1-.9 1.2.2.3 1 1.1 1.2 1.4-.4.2-.9.5-1.2.7-.3-.4-2.6-3.3-4.4-5.2s-.7-.7-.8-.9c.2-.3.6-.9.7-1.1.4.2 7.1 3.3 7.6 3.5-.2.3-.4.9-.6 1.2Zm-5.6-2.8c.4.5 1.9 2 2.1 2.3.1-.2.5-.7.6-.9-.4-.2-2.2-1.2-2.8-1.4Zm6-4.5c-.3.5-.7.6-1.1.5-.3-.2-.5-.6-.3-1.1s.6-.6 1-.4.5.6.3 1Z" style="fill:#855e21"/><path class="st0" d="M29.5 18c0 .1 0 .4-.1.5-1 3.2-6.9 15-16.3 16.2-6 .7-12.5-2.8-13-7.2C-1.2 17 18.7 2 34.2.1 40.6-.7 45.5 1.6 46.1 7c.3 2.1-.3 5.1-1.6 9.1C52.8 8.5 58.6 2.5 63.9 1.9c2.1-.3 5.9 1.7 6.1 3.5.7 6-12.6 22-11.3 32.3.4 3.4 2.2 4.4 4.2 4.2.2 0 .5 0 .6.3 0 .2-.4.4-.9.5-2.5.3-8.1-1.1-8.7-5.8-1.3-10.8 12-27.8 11.4-32.6 0-.8-.7-1.1-1.6-1-5.1.6-11.9 7.9-20.3 15.9-5.9 13.5-9.7 23.9-14.9 24.5-1.8.2-4.4-.6-4.6-2.3-.3-2.6 5.9-10.9 13.3-19.1 2.6-6.9 4.3-13 3.9-16.6-.4-3.3-1.8-5.2-7-4.6C19.8 2.8 3.2 18 4.6 29.1c.4 3.3 2.6 4.8 5.7 4.4 11.4-1.4 16.9-12.3 18.1-15.1.2-.5.3-.7.6-.8.3 0 .4.2.4.4Zm-3.7 23.7c.9-.1 5.7-6.9 9.3-14.9-5.2 6-10.1 12.9-9.9 14.5s.2.4.6.3Z"/><path class="st0" d="M74.5 20.9c.1 1.1-6.4 9.6-6.1 11.8 0 .7.5.7.8.7 4-.5 10.5-7.5 10.5-7.5s.2-.3.4-.3c.1 0 .3.1.3.2s-.5.6-.6.8c0 0-7.1 7.7-11.3 8.2-1 .1-3.7-.9-3.9-2.8-.3-2.6 4.5-9.6 5.4-12.5.2-.4.4-.9 1.1-1 1.6-.2 3.3 1.2 3.4 2.3Zm5.1-10.7c0 .4-.6 1.8-1.1 2.1-.4.2-1.4.7-2 .9-1.2.5-1.4 1.2-1.8 1.2s-.7-.3-.7-.5c-.2-1.4 1.9-4.6 1.8-6s.2-.5.5-.5c1.2-.2 3.3 1.8 3.4 2.7Z"/><path class="st0" d="M81.4 34.2c-3.3.4-5.8-2.9-6-4.5 0-.4.2-.9.9-1 1.2-.1 3.3.2 6.6-.1.1-.6.2-1.3.1-2-.1-1.2-.3-2.2-.8-3-1.3 1.7-1.8 2.2-2.6 3s-.2.2-.3.2-.3 0-.3-.2.2-.4.5-.7c0 0 .9-.9 2.3-2.9-.4-.7-.9-1.4-1-2.4-.3-2.1 2.6-4.9 4.2-5.1 1-.1 2.8 1.2 2.9 2.1s-3.9 3.1-3.7 4.7c.3 2.5 2.3 2.9 2.9 5.5 1.8-.5 4-1.5 5.7-3.5 0 0 .2-.3.4-.3.1 0 .3.1.3.2s-.4.6-.6.8c-1.7 1.9-3.5 2.8-5.6 3.5.3 2.4-2.8 5.3-5.9 5.7m1.3-4.9c-2.4.1-4.8 0-5.6 0-.2 0-.3 0-.3.3s.8 1.7 2.9 1.5c.8-.1 2.2-.3 3-1.9Z"/><path class="st0" d="M94.7 32.5c-3.3.4-5.8-2.9-6-4.5 0-.4.2-.9.9-1 1.2-.1 3.3.2 6.6-.1.1-.6.2-1.3.1-2-.1-1.2-.3-2.2-.8-3-1.3 1.7-1.8 2.2-2.6 3s-.2.2-.3.2-.3 0-.3-.2.2-.4.5-.7c0 0 .9-.9 2.3-2.9-.4-.7-.9-1.4-1-2.4-.3-2.1 2.6-4.9 4.2-5.1 1-.1 2.8 1.2 2.9 2.1s-3.9 3.1-3.7 4.7c.3 2.5 2.3 2.9 2.9 5.5 1.8-.5 4-1.5 5.7-3.5 0 0 .2-.3.4-.3s.3.1.3.2-.4.6-.6.8c-1.7 1.9-3.5 2.8-5.6 3.5.3 2.4-2.8 5.3-5.9 5.6Zm1.2-4.8c-2.4.1-4.8 0-5.6 0-.2 0-.3 0-.3.3s.8 1.7 2.9 1.5c.8-.1 2.2-.3 3-1.9Z"/><path class="st0" d="M121.6 20.6c.2 0 .3.1.3.2s-.4.6-.6.8c0 0-5.7 7-10.7 7.6-3.4.4-5.7-1.2-6.1-4.2-.6-5.2 4.7-11.4 7.9-11.8 2-.2 3.2 1.7 3.3 2.4.2 1.4-3 4.8-6.4 7.2v2c.2 1.8 1.2 3 2.7 2.8 3.4-.4 9.1-6.8 9.1-6.8s.2-.3.4-.3Zm-7.6-4.7c0-.2-.1-.4-.4-.4-1 .1-2.9 2.1-4.4 6.4 2.5-2.1 4.9-5 4.7-6Z"/><path class="st0" d="M123.8 18.5c-1.4 1.8-2.5 3-2.5 3-.1.1-.2.3-.3.3s-.3 0-.3-.2.2-.4.5-.8c0 0 .9-1 2.3-2.8-.4-.7-1-1.5-1.2-2.4-.3-2.1 2.6-5 4.3-5.2 1.1-.1 2.9 1.2 3 2 0 .8-4 3.2-3.8 4.7.2 2 1.7 2.7 2.5 4.6 2.1 0 3 .6 3.1.8 0 .3-.4.7-.7.7-.2 0-.8-.5-2.1-.7 0 .3.2.5.2.9.3 2.5-2.7 5.3-5.8 5.6-3.4.4-6.4-2-6.6-3.5 0-.5.4-.9 1-1.2 1-.5 4.4-1.7 7.2-2.3v-.6c-.2-1.4-.3-2.2-.8-3Zm-6 7.1c0 .4 1.3.8 3.4.5s3-1.7 3.3-3.4c-3.3.8-5.3 1.9-6.2 2.3-.4.2-.5.4-.5.5ZM29.5 18c0 .1 0 .4-.1.5-1 3.2-6.9 15-16.3 16.2-6 .7-12.5-2.8-13-7.2C-1.2 17 18.7 2 34.2.1 40.6-.7 45.5 1.6 46.1 7c.3 2.1-.3 5.1-1.6 9.1C52.8 8.5 58.6 2.5 63.9 1.9c2.1-.3 5.9 1.7 6.1 3.5.7 6-12.6 22-11.3 32.3.4 3.4 2.2 4.4 4.2 4.2.2 0 .5 0 .6.3 0 .2-.4.4-.9.5-2.5.3-8.1-1.1-8.7-5.8-1.3-10.8 12-27.8 11.4-32.6 0-.8-.7-1.1-1.6-1-5.1.6-11.9 7.9-20.3 15.9-5.9 13.5-9.7 23.9-14.9 24.5-1.8.2-4.4-.6-4.6-2.3-.3-2.6 5.9-10.9 13.3-19.1 2.6-6.9 4.3-13 3.9-16.6-.4-3.3-1.8-5.2-7-4.6C19.8 2.8 3.2 18 4.6 29.1c.4 3.3 2.6 4.8 5.7 4.4 11.4-1.4 16.9-12.3 18.1-15.1.2-.5.3-.7.6-.8.3 0 .4.2.4.4Zm-3.7 23.7c.9-.1 5.7-6.9 9.3-14.9-5.2 6-10.1 12.9-9.9 14.5s.2.4.6.3ZM74 14c0 .2.3.5.7.5.3 0 .6-.7 1.8-1.2.6-.2 1.6-.7 2-.9.5-.3 1.2-1.7 1.1-2.1-.1-.9-2.1-2.9-3.4-2.7-.3 0-.5.5-.5.5.2 1.4-2 4.5-1.8 6Z"/><path class="st0" d="M128.3 21.8c-.8-1.8-2.2-2.6-2.5-4.6-.2-1.6 3.9-4 3.8-4.7 0-.8-1.8-2.2-3-2-1.7.2-4.6 3.1-4.3 5.2.1 1 .7 1.7 1.2 2.4-1.4 1.8-2.3 2.9-2.4 2.9-.3.4-1.7 1.9-3.4 3.4-.1 0-.2 0-.3.1-.5.3-.9.5-1 .9-1.5 1.2-3.1 2.2-4.4 2.3-1.5.2-2.5-1-2.7-2.8 0-.4-.1-1.7 0-2 3.3-2.5 6.5-5.8 6.4-7.2 0-.6-1.3-2.6-3.3-2.4-3 .4-8 6-7.9 11-1.3 1-2.8 1.6-4 2-.6-2.6-2.6-3-2.9-5.5-.2-1.6 3.8-3.8 3.7-4.7s-1.9-2.2-2.9-2.1c-1.6.2-4.4 3-4.2 5.1.1 1 .6 1.7 1 2.4-1.2 1.7-2 2.6-2.2 2.8v.1c-1.7 1.9-3.9 2.9-5.6 3.4-.6-2.6-2.6-3-2.9-5.5-.2-1.6 3.8-3.8 3.7-4.7s-1.9-2.2-2.9-2.1c-1.6.2-4.4 3-4.2 5.1.1 1 .6 1.7 1 2.4-1.3 1.9-2.3 2.9-2.3 2.9-.2.2-1.3 1.4-2.7 2.7h-.5c-.8 0-1 .6-.9 1v.2c-2 1.7-4.4 3.3-6.3 3.6-.3 0-.7 0-.8-.7-.3-2.2 6.3-10.7 6.1-11.8-.1-1.1-1.9-2.5-3.4-2.3-.7 0-1 .6-1.1 1-.9 2.9-5.7 9.9-5.4 12.5.2 1.9 2.9 2.9 3.9 2.8 2.1-.3 5-2.3 7.3-4.3.7 1.7 3 4 5.8 3.6 3.1-.4 6.2-3.3 5.9-5.7.5-.1.9-.3 1.3-.5.2 1.6 2.7 4.9 6 4.5 3.1-.4 6.2-3.3 5.9-5.6 1.4-.4 2.7-1 3.9-1.9.4 3 2.7 4.6 6.1 4.2 2-.2 4.2-1.6 6-3 .7 1.5 3.4 3.3 6.4 2.9 3.1-.4 6.1-3.1 5.8-5.6 0-.3-.1-.6-.2-.9 1.3.3 1.9.8 2.1.7.3 0 .7-.4.7-.7 0-.2-.9-.8-3.1-.8Zm-48.6 9.4c-2.1.3-2.8-1.2-2.9-1.5 0-.2 0-.3.3-.3h5.6c-.8 1.6-2.2 1.8-3 1.9Zm3.2-2.6c-2.2.2-4 .1-5.2 0l2-2c.1-.1.3-.4.5-.5.5-.6 1.1-1.2 2.1-2.5.4.8.6 1.7.8 3 0 .8 0 1.4-.1 2Zm10 1c-2.1.3-2.8-1.2-2.9-1.5 0-.2 0-.3.3-.3h5.6c-.8 1.6-2.2 1.8-3 1.9Zm3.3-2.6c-2.5.2-4.3 0-5.5 0 .8-.5 1.6-1.2 2.3-2l.1-.1c.7-.8 1.2-1.3 2.5-2.9.4.8.6 1.7.8 3 0 .8 0 1.4-.1 2Zm17.4-11.5c.3 0 .4.2.4.4.1 1-2.2 4-4.7 6 1.5-4.3 3.4-6.3 4.4-6.4Zm7.6 10.6c-2.1.3-3.4-.1-3.4-.5 0-.2 0-.3.5-.5 1-.5 3-1.6 6.2-2.3-.3 1.7-1.1 3.1-3.3 3.4Zm3.4-4c-1.7.4-3.7 1-5.2 1.5 1.2-1.2 1.9-2.1 1.9-2.1s.1-.2.2-.3c.4-.5 1.3-1.5 2.3-2.7.4.8.6 1.5.8 3z"/></svg>`,
surfcenter: `<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170.1 58" overflow="visible" xml:space="preserve"><g fill="#fff"><path d="m10.5 19.1.7.5.7 1.8.5.6.1 1.2-.6.8-.9.1-1.1-.1-.3-.8h-.2L9 24.3l-.3.5-.3 1.5.3 1.2-.1 1.5.8.3.9 2.8 1.1 2.4-.4 1.3v2.3l-1.9 3.6-.9.9-.8 2-.5.4-.6.2-.6.7-1.3.9V48l-1.1 1-.7 1-.5.1-.8-.4-.5.3-.8-.5.1-.8 1.5-2.1v-.4l.6-.6 1.3-.4.9-1.3 1.8-1.3.3-1.4.4-1.5-.1-1.1v-1.8l.2-1.2V35l-.6-.8-1.3-2.8-.4-1.3-.4-.6L4 26l.5-1.5-.4-.5.1-1.3 3.5-3.5.5-.1 1-.1.1-.1zm8.9 3.7.2.7-.3.8-.4 1.1v1.1l-.4.9-.3 1.4-.2 1v.8l.6.5.5.1.7.2.7-.3.7-.9.6-1.1.2-1.1.2-.8-.2-.6.3-.9.1-.8.1-1.4.4-.6H24l1.9.6.6.6.5 1.5-.1 1.1.2.8-.1 1-.2.9-.1 1 .4.9.6.4.6-.6.6-.1 2-1 .6.1.3.4-.4 1.4-.5.6-1.4.8-.9.4-1 .8-.9.3-.9.4-.9-.1-.9.1-1-.5-.3-.6-.7-.9-.4.6-.6.8-.9.7-.9.4-1.2-.1-1.5-.5-.6-.6-.4-.5-.7-.4-.3-.6-.3-.8-.1-.8-.1-1.1.3-1.1-.2-.7.1-.7v-.7l.3-.8v-1.8l.5-.9.9-.8 1.8-.3z"/><path d="m35.4 18.6.8.2.6.4.4.4.6.8.1 1.2.6.4.1 1 .2 1.1 1.8.1.4-.3 1.5.4 1.1.5.8.8.5 1 .6.8.6 1.2.1.9-.1.9-.1 1.1.2.9.4 1 1.1.7 1.1.1 1.2-.5.9-.4.8-.3.3.3v.8l-.4.9-.1.8-.8.5-.7.2-1 .1-1.4.3-1.8-.3-1.1-.2-.8-.4h-.4l-.8-1.3-.7-1.1-.4-1.1-.4-1.5.2-1.3.1-1.1-.5-.7-.7-.9-.9-.3h-.8l-.3.9L38 29l-.4.7-.1.8-.4.9-.4.8-.6.6-.5.6-.8.9-.3.4-.6.4-.6.1-.9.8-.8-.3-.4-1.1.4-.8.5-.4.6-.1.6-.5.7-.9.8-1.8.8-1.1.4-1.7-.2-.9-.8-.4-.8-.8-.8-1-.4-.6-.1-1.2.1-1 .5-1.5.7-.7.6-.4zm-.5 2.9-.1.6.2.6.4.7.4.3.8.1-.2-1.2-.4-.8-.2-.3-.6-.2zM64 0l.1.1 1.1.2 1.4.6 1.1 1 .3 1.6V4l.4.7-.6 5.9-.3 1.2-.5.5-.1 1.3-.5.6-.7 2.6-.1.6-.9.9-.4 1.1-1 1.8-.4.6-.6.8-.2.5-2.8 2.5-.4.5v.3l1.7.8h.6l5.1 3.7.2.4.8.9 1.1 1.8-.1 1.1.4 1.4.4 2 .1 1.4.4.9v1.3l.8 1.8.4 2.8v1.6l-.5 1.8v2.5l-.9 1.9-.3 1.5-.6.6-.9 1.1-1 .3-1.3-.1-1.5-.6-1.1.1-.8-.8-.8-.5-1-1.1-1.3-2-.8-1.1-.6-1.5-.8-.8-1.3-3.6-.6-1.4-.4-2.8v-.9l-.4-1.4v-1l-.5-5.2-.1-.8.5-1.8.1-1.3-.1-.8-.7-.6-.8.3-.2-.3-1.1-.2v-.6l.7-.1.8-.7.7-.3.9-.8.3-4.7.3-.4-.3-1.1.6-2.3.1-1 .6-3 .3-.8.1-1.4.5-1.6.9-.6-.2-.6L59 4.6l1-1.3.9-.4.8-1.4L63.5 0zm-5.9 31.3.3 2-.4 2.5v5.3l-.3.5.4 1.7.5 4 1.1 2.4.3 1.3.6.5 1.5 1.9 2.5 1.5.6.1 1.2-.4.5-1.3.2-3.3-.7-1.3-.1-4-.8-1.5-.3-.6v-.9l-.5-1.4-.3-1.4.1-.3-.3-1.3v-.6l-.5-.2-.3-.8-.8-.9-.2-.8-1.1-.3-.4-.7-.1-1-1.4-1.4-.9-1.4-.4-.2zm5-26.7-1.7 1.5-.6 1.4-.8 1.4-1 2.9-.1 1.2.3 2.6-.4 1.3-.3 2.5v.8l-.2 3.4h.2l3-2.6.7-1.6.5-.4-.3-.6.2-.9.8-.5.8-1.6v-.9l.6-1.2.1-2.6.1-1.6V8l.1-.8V6l-.1-.4-.3-1.4-.6-.2zm15.5 16 .6.3h.5l1.3.6 1 1.3.5 1 .1 1.3-.4 1.4-.6 1.8-.9.9-1.3.6-.8.2-.6-.2h-1l-.6-.5-.5-1.2-.2-1.1.4-1 .6-.4.5-.3.7.1.6.4.3.7.1.8.8.1.3-.6.1-1.1-.3-1.2-.4-.6-1.4-.6-.6.1-1.3.3-1.1 1.2-.3.5-.4 1.1-.1.9.4.6-.2 1 .9 2.4 1.3.8.8 1 2 .3 1.8.5 1.7-.2 1.7.4 2.1-.6.6-.4.9.1.4.5-.1.6-2.2 1.4-1 .4h-1.1l-.6.4-.9.4-.7.3-2.8.3-1.8-.3-.8-.3-.8.1-.4-.4-2.8-1.6-1.9-2.1-.5-1.6.1-3.4.6-2.1 1.4-2.7.6-.8h.1l1.7-1.4 2.1-.4zm16.6-.5 2.3.5 1.3.9.3.8.4 1.1.2 1.1.1.9-.3 1.1-.4.4-.4.7-.9.9-1.1.7-.8.2-.9.4-.7.2.4.9v.8l.3.9.6.6.9.8.8.3h.4l.6.3.8-.1.6.3.9.2 1.1-.3 1-.4h.8l1.1-.6.9-.3.8.1.4.4-.1.5-.4.7-.4.4-.5.8-.6.6-1 .4-.8.6-1 .4-.8.1-.9.3-1-.1-1.1-.7-.8.3h-.7l-.9-.1-1.2-.3-1.5-1.4-.8-.3-1-1.2-.2-.2-.6-.7-.3-.8-.3-.9-.8-1-.2-1.3-.4-.4-.3-.6-.1-.8.1-.6.1-.4-.1-1 .3-1.1.5-.7.4-.9.6-.4.5-.3v-.6l.1-.3.8-.6.6-.6 1.4-.4zm-.9 2.7-.4.6-.4.9.2.5-.4.8-.1 1.1.5 1.1 1.3-.4.5-.7.9-.3.4-1 .5-1V23l-.3-.6h-2z"/><path d="m108.4 22.5.6.4 1.4.4.2.5-.2.8.1 1.6.6-1.2.7-.6 1.1-.1.9.5.8.8.3 1.1.8 1 .2.7.4.8.1.8.6.7.4.7.6.7.8.3 1.1.1.7.3.6-.3.8-.2.6.3.1.7-.5.9-.5.4-.6.3-.8.4-1.3.3-1.3-.3-1.6-.4-1.1-.8-.9-.8-.1-.5-.4-.6-.3-.6-.6-.6-.6-1.3-.6-.2h-.6l-.3 1.3.1.9-.2 1.3.1 1.1v1.3l-.8.6h-1.6l-.8.1-.7-.4-.4-.6-.1-1.4v-.9l-.3-1.1.1-1.2-.3-.9-.1-1.1.3-.8v-.9l.3-1.6-.1-.9.1-.8.8-.6h1.4zM128 11.9l.1.3.6-.3h.8l.5.4.6 1-.1.9-.3 1.1.1 1-.3.6-.1.8.1.1.9-.3.6.3h.8l.5-.3h1.6l2.3-1.4h1l.3.2.1.7-.4.6-3 2.3-1-.1-1.1.5-1.1.4h-.6l-1.1-.3-.4.9v.6l-.9 2.8-.1.8-.6 1.8v1.8l.2.8-.6.9-.1.6.5.3 2.4-1.1 1.5.2.6.6-.1.3-2.6 2-.9 1-.3.9-1.8.9-.8 1.1-.7-.1-.6-.4-1-2.8v-2l.4-2.2.1-1.5-.3-1.1v-1.2l.8-1.6.5-2.6.1-.4v-2l-1.5-.4v-.9l.8-1.6.4-.6h1.8l.2-1.5.6-1.4-.1-.6.2-1h.5zm13.8 8.2 2.3.5 1.3.9.3.8.4 1.1.2 1.1.1.9-.3 1.1-.4.4-.4.7-.9.9-1.1.7-.8.2-.8.5-.8.2.4.9v.8l.3.9.6.6.9.8.8.3h.4l.6.3.8-.1.6.3.9.2 1.1-.3 1-.4h.8l1.1-.6.9-.3.8.1.4.4-.1.5-.4.7-.4.4-.5.8-.6.6-1 .4-.8.6-1 .4-.8.1-.9.3-1-.1-1.1-.7-.8.3h-.9l-.9-.1-1.2-.3-1.3-1.1-.8-.3-1-1.2-.3-.2-.6-.7-.3-.8-.3-.9-.8-1.1-.2-1.3-.4-.4-.3-.7-.1-.8.1-.6.1-.4-.1-1 .3-1.1.5-.7.4-.9.6-.4.5-.3v-.6l.1-.4.8-.6.6-.6 1.4-.4zm-.9 2.7-.4.6-.4.9.2.5-.4.8-.1 1.1.5 1.1 1.3-.4.5-.7.9-.3.4-1 .5-1V23l-.3-.6-1.8-.1z"/><path d="m153.6 18.2.8.2.6.4.4.4.6.8.1 1.2.6.4.1 1 .2 1.1 1.8.1.4-.3 1.5.4 1.1.5.8.8.5 1 .6.8.6 1.2.1.9-.1.9-.1 1.1.2.9.4 1 1.1.7 1.1.1 1.2-.5.9-.4.8-.3.3.3v.8l-.3.6-.1.8-.8.5-.8.2-.9.1-1.4.3-1.8-.3-1.1-.2-.9-.4h-.4l-.8-1.3-.7-1.1-.4-1.1-.4-1.4.2-1.3.1-1.1-.6-.8-.6-.9-.9-.3h-.8l-.3.9-.3 1.4-.4.7-.1.8-.4.9-.4.8-.6.6-.5.6-.8.9-.3.4-.6.4-.6.1-.9.6-.8-.3-.4-1.1.4-.8.5-.4.6-.1.6-.5.7-.9.8-1.8.8-1.1.4-1.7-.2-.9-.8-.4-.8-.8-.8-1-.3-.6-.1-1.2.1-1 .5-1.5.7-.7.6-.4zm-.5 2.8-.1.6.2.6.4.7.4.3.8.1-.2-1.2-.4-.8-.2-.3-.6-.2z"/></g></svg>`,
livs: `<svg baseProfile="tiny" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236.4 50.8" overflow="visible" xml:space="preserve"><path fill="#2c384b" d="M7.4.6h4.9l7.4 20.8H15l-1.4-4.3H6l-1.4 4.3H0zm-.3 13h5.3L9.8 5.4zm29.3-1.2c-1.2 1-3 1.5-5.2 1.5h-4.3v7.5h-4.3V.6h8.9c2.1 0 3.7.5 4.9 1.6s1.8 2.7 1.8 5c0 2.5-.6 4.2-1.8 5.2M33 4.9c-.6-.5-1.3-.7-2.3-.7h-3.9v6.1h3.9c1 0 1.8-.2 2.3-.7.6-.5.8-1.3.8-2.4s-.2-1.8-.8-2.3m23.8-.6H46.1v4.4H56v3.6h-9.9v5.4h11.3v3.7H41.8V.6h15zM61 .6h4.4v17.1h10.4v3.7H61zm29.8 0h4.5l-7.1 20.8h-4.1L77.1.6h4.6l4.5 15.8zm11.1 20.8h-4.3V.6h4.3zM106.1.6h4.3v8.6l8-8.6h5.6l-8.5 8.6 9 12.3h-5.6l-6.4-9.1-2.1 2.1v7h-4.3zm36 3.7h-10.8v4.4h9.9v3.6h-9.9v5.4h11.3v3.7H127V.6h15v3.7zm4-3.7h4.6l8.3 14.5V.6h4.1v20.8h-4.4l-8.5-14.8v14.8h-4.1zm29 0h4.4v17.1h10.4v3.7h-14.7V.6zm21.7 20.8h-4.3V.6h4.3zM213 .6h4.5l-7.1 20.8h-4.1l-7-20.8h4.6l4.5 15.8zM223.3 15c.1 1 .4 1.7.8 2.1.7.9 2 1.3 3.7 1.3 1 0 1.9-.1 2.6-.3 1.2-.4 1.9-1.2 1.9-2.4 0-.7-.3-1.2-.9-1.6s-1.6-.7-2.9-1l-2.3-.5c-2.2-.5-3.7-1-4.6-1.6q-2.1-1.5-2.1-4.5c0-1.9.7-3.4 2.1-4.6s3.4-1.9 6-1.9c2.2 0 4.1.6 5.7 1.7 1.6 1.2 2.4 2.9 2.5 5.1h-4.2c-.1-1.3-.6-2.1-1.7-2.7-.7-.3-1.6-.5-2.6-.5-1.1 0-2.1.2-2.8.7s-1 1.1-1 1.9c0 .7.3 1.3 1 1.7.4.2 1.4.5 2.8.9l3.7.9q2.4.6 3.6 1.5c1.2 1 1.9 2.4 1.9 4.3s-.7 3.5-2.2 4.7c-1.5 1.3-3.5 1.9-6.2 1.9s-4.9-.6-6.5-1.9q-2.4-1.8-2.4-5.1h4.1zM1.4 43.1c.5-.7 1.4-1.5 2.5-2.2l.4-.2c-.5-.6-.9-1.1-1.2-1.7s-.4-1.2-.4-1.8c0-1.3.4-2.3 1.3-3s2-1.1 3.3-1.1c1.2 0 2.3.4 3.1 1.1s1.2 1.7 1.2 2.8c0 1-.2 1.9-.7 2.5q-.75.9-2.1 1.8l2.5 3c.3-.4.5-.9.7-1.3.2-.5.2-1 .2-1.5h3c-.1 1.1-.3 2.1-.8 3.2-.3.6-.7 1.3-1.2 2l3.1 3.8h-4.1L11 48.9c-.6.5-1.1.9-1.6 1.2-.9.5-1.9.7-3.1.7-1.8 0-3.2-.5-4.2-1.6S.6 47 .6 45.7c0-.9.2-1.8.8-2.6m3.2 4.2c.5.4 1.1.7 1.9.7.6 0 1.1-.1 1.6-.4s.9-.5 1.2-.8l-3.2-4c-.8.6-1.4 1-1.7 1.5-.3.4-.4.9-.4 1.4-.1.6.2 1.1.6 1.6M6.1 38c.1.2.5.6 1 1.2.5-.3.8-.6 1-.8.4-.4.6-.9.6-1.4 0-.4-.1-.7-.4-1-.2-.3-.6-.4-1.1-.4-.3 0-.6.1-.9.2-.3.3-.5.7-.5 1.2 0 .3.1.6.3 1m21.7 7c.1.8.3 1.4.7 1.8.6.7 1.6 1.1 3.1 1.1q1.35 0 2.1-.3c1-.4 1.6-1 1.6-2 0-.6-.3-1-.8-1.3s-1.3-.6-2.4-.8l-1.9-.5c-1.8-.4-3.1-.9-3.8-1.3-1.2-.8-1.8-2.1-1.8-3.8 0-1.6.6-2.8 1.7-3.9 1.1-1 2.8-1.5 5-1.5 1.9 0 3.4.5 4.7 1.5q1.95 1.5 2.1 4.2h-3.5c-.1-1-.5-1.8-1.4-2.2-.6-.3-1.3-.4-2.2-.4-1 0-1.7.2-2.3.6-.4.3-.7.8-.7 1.5 0 .6.3 1.1.8 1.4.4.2 1.1.4 2.3.7l3 .7c1.3.3 2.3.7 3 1.3 1 .8 1.6 2 1.6 3.5 0 1.6-.6 2.9-1.8 4-1.2 1-3 1.6-5.2 1.6q-3.45 0-5.4-1.5c-1.3-1-2-2.5-2-4.3h3.5zm26.1-12v3.1h-5.2v14.3h-3.6V36.1h-5.2V33zm13.3.5c.6.3 1.2.7 1.6 1.2q.6.6.9 1.5.3.75.3 1.8 0 1.2-.6 2.4c-.4.8-1.1 1.4-2.1 1.7.8.3 1.4.8 1.7 1.4s.5 1.5.5 2.7v1.2c0 .8 0 1.3.1 1.6.1.4.3.8.7 1v.4h-4c-.1-.4-.2-.7-.2-.9-.1-.5-.1-1-.2-1.5v-1.6c0-1.1-.2-1.8-.6-2.2q-.6-.6-2.1-.6h-3.5v6.8h-3.5V33h8.3c1.1 0 2 .2 2.7.5M59.7 36v4.7h3.9c.8 0 1.4-.1 1.7-.3.7-.3 1-1 1-2 0-1.1-.3-1.8-1-2.1-.3-.2-.9-.3-1.6-.3zm18.7-3h4.1l6.1 17.4h-3.9l-1.1-3.6h-6.4L76 50.4h-3.8zm-.2 10.8h4.4L80.4 37zM90.8 33h3.8l6.9 12.1V33h3.4v17.4h-3.6l-7.1-12.3v12.3h-3.4zm27.6.4c1.2.4 2.2 1.1 3 2.2.6.9 1 1.8 1.2 2.8s.3 2 .3 2.9c0 2.3-.5 4.3-1.4 5.9-1.3 2.2-3.2 3.2-5.8 3.2h-7.5V33h7.5c1.1 0 2 .2 2.7.4m-6.6 2.6v11.3h3.3c1.7 0 2.9-.8 3.6-2.5q.6-1.35.6-3.3c0-1.8-.3-3.1-.8-4.1-.6-.9-1.7-1.4-3.3-1.4zm15.5-1.2c1.4-1.4 3.2-2.1 5.3-2.1 2.9 0 5 1 6.3 2.9.7 1.1 1.1 2.2 1.2 3.2h-3.6c-.2-.8-.5-1.5-.9-1.9-.6-.8-1.6-1.1-2.9-1.1s-2.3.5-3.1 1.6c-.7 1.1-1.1 2.6-1.1 4.5s.4 3.4 1.2 4.4q1.2 1.5 3 1.5c1.2 0 2.2-.4 2.8-1.2.4-.4.7-1.1.9-2h3.6c-.3 1.9-1.1 3.4-2.4 4.6s-2.9 1.8-4.9 1.8c-2.5 0-4.4-.8-5.8-2.4q-2.1-2.4-2.1-6.6c.1-3.2.9-5.5 2.5-7.2m20.8-1.8h4.1l6.1 17.4h-3.9l-1.1-3.6h-6.4l-1.2 3.6h-3.8zm-.3 10.8h4.4L150 37zM160.5 33h12.4v3h-8.8v4h7.7v3h-7.7v7.3h-3.6zm27.4 3.1h-9v3.7h8.2v3h-8.2v4.5h9.4v3.1h-13V33h12.5v3.1z"/></svg>`

};

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
      cta2Text: "Visa Boenden",
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


function sektion73CreatePinEl(pin) {
  const wrap = document.createElement("div");
  wrap.className = "sektion73PinWrap";
  wrap.id = pin.id;

  /* NYTT: gör iconKey tillgängligt för CSS */
  wrap.dataset.iconKey = String(pin.iconKey || "home");

wrap.dataset.filter = String(pin.filter || "").trim();

/* NYTT: gör priority tillgängligt för logik/DOM */
wrap.dataset.priority = String(pin.priority || "priority").trim().toLowerCase();

  // PER-PIN CSS vars (endast färger)
  const bubbleBg = (pin.ui && pin.ui.bubbleBg) ? String(pin.ui.bubbleBg) : "rgba(255,255,255,.92)";
  const pointerTop = (pin.ui && pin.ui.pointerTop) ? String(pin.ui.pointerTop) : bubbleBg;

  wrap.style.setProperty("--sektion73-pin-bubble-bg", bubbleBg);
  wrap.style.setProperty("--sektion73-pin-pointer-top", pointerTop);

  /* NYTT: sätt icon/text-färg för mörka bubblor (Solviken/Brittas etc) */
  const sektion73ForceWhiteKeys = new Set(["solviken", "brittas", "strandkollektivet"]);
  if (sektion73ForceWhiteKeys.has(String(pin.iconKey || "").toLowerCase())) {
    wrap.style.color = "#ffffff";      // currentColor
  }

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
    btn.style.transform = "translateY(0px)";
    btn.style.boxShadow = "none";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0)";
    btn.style.boxShadow = "none";
  });

  return { wrap, btn };
}



  const sektion73MarkersById = Object.create(null);
let sektion73IsZoomingToPin = false;
let sektion73PendingPinId = null;
let sektion73ActiveMoveEndHandler = null;

/* =========================
   FILTER UI (BOTTOM CENTER)
   - Skapar en "slider" med filter-knappar
   - Klick på filter: döljer pins som inte matchar
   - Påverkar inte befintlig CSS/logik (ny, scoped DOM + egen style-tag)
   ========================= */

const sektion73FilterState = {
  active: "",      // "" = visa allt
  preView: null    // sparar vy innan första filter aktiveras
};

function sektion73NormFilter(v) {
  return String(v || "").trim().toLowerCase();
}

function sektion73GetAvailableFilters() {
  const set = new Set();
  (sektion73Pins || []).forEach((p) => {
    const f = String(p && p.filter ? p.filter : "").trim();
    if (f) set.add(f);
  });

  const arr = Array.from(set);
  arr.sort((a, b) => a.localeCompare(b, "sv"));
  return arr; // <-- FIX: ingen "Alla" här, och ingen syntaxmiss
}


function sektion73InjectFilterCSS() {
  if (document.getElementById("sektion73MapFilterStyle")) return;

  const style = document.createElement("style");
  style.id = "sektion73MapFilterStyle";
  style.textContent = `
#sektion73MapFilterBar{
  position: fixed;
  left: 50%;
  bottom: 18px;

  /* Basläge: synlig */
  transform: translateX(-50%) translateY(0);
  opacity: 1;

  /* Matcha modalens timing */
  transition:
    transform var(--sektion73-modal-dur) var(--sektion73-modal-ease),
    opacity 180ms ease;

  will-change: transform, opacity;

  z-index: 999;
  width: min(920px, calc(100vw - 24px));
  pointer-events: auto;
}

/* Hidden-läge: ner + fade + klick-skydd */
#sektion73MapFilterBar.sektion73FilterBarHidden{
  transform: translateX(-50%) translateY(86px);
  opacity: 0;
  pointer-events: none;
}
#sektion73MapFilterRail {
    display: flex;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    padding: 0.4rem 0.5rem;
    border-radius: 999px;
    background: #fff;
    border: none;
    backdrop-filter: blur(3px);
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    width: max-content;
    place-self: center;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}
    #sektion73MapFilterRail::-webkit-scrollbar{ display:none; }
.sektion73FilterLabel {
    font-family: "Manrope", Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    font-size: 0.875rem;
    font-weight: 600;
    color: rgb(64, 61, 59);
    white-space: nowrap;
    user-select: none;
    margin-right: 0px;
    display: none;
}
.sektion73FilterClose {
    width: 20px;
    height: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    margin-left: 0px;
    border: none;
    background: transparent;
    fill: currentColor;
    stroke: currentColor;
    stroke-width: 0;
    margin-left: 0px;
}

.sektion73FilterClose:hover{
  background: rgba(255,255,255,.5);
}
.sektion73FilterIco svg {
    width: 20px;
    height: 20px;
    display: block;
    fill: currentColor;
    stroke: none;
    stroke-linecap: round;
    stroke-linejoin: round;
}
.sektion73FilterBtn {
    all: unset;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 999px;
    border: none;
    background: #F6F3F1;
    color: rgb(64, 61, 59);
    font-family: 'Inter Variablefont Opsz Wght';
    font-size: 14.5px;
    font-weight: 500;
    white-space: nowrap;
    user-select: none;
    transition: 0.15s ease-in-out;
    text-transform: capitalize;
}
    .sektion73FilterBtn:hover{
background: #ece6e1;
    }
    .sektion73FilterBtn:active{
background: #e2d8d2;
    }
    @media (max-width: 768px){
#sektion73MapFilterBar {
    bottom: 0px;
}
.sektion73ModalGalleryTop, 
.sektion73ModalGallery,
.sektion73ModalThumb {
height: 267px !important;
min-height: 267px !important;
aspect-ratio: auto !important;
}
#sektion73MapFilterRail {
    display: flex;
      gap: 12px;
    align-items: center;
    justify-content: start;
    padding: 10px 17px 17px 17px;
        overflow-y: hidden;
    border-radius: 0px;
    width: 100vw;
}
      }
.sektion73FilterBtn[aria-pressed="true"] {
    background: #FFE6A3;
    border-color: rgba(90, 60, 0, .22);
    color: #5A3C00;
    font-weight: 600;
}

    .sektion73FilterIco{
display:inline-flex;
    }
  `;
  document.head.appendChild(style);
}

function sektion73BuildFilterIconBank() {
  const bank = [
`<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M17 13V8.9c1.7-.2 3-1.7 3-3.4C20 3.6 18.4 2 16.5 2c-1.8 0-3.2 1.3-3.4 3h-2.3l-.9-2.3C9.8 2.3 9.4 2 9 2H5c-.6 0-1 .4-1 1s.4 1 1 1h3.3l.3 1H8c-.6 0-1 .4-1 1v7c0 2.4 1.7 4.4 4 4.9V20h-1c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2.1c2.3-.5 4-2.5 4-4.9m-.5-9c.8 0 1.5.7 1.5 1.5 0 .7-.4 1.2-1 1.4V6c0-.6-.4-1-1-1h-.9c.2-.6.7-1 1.4-1M12 16c-1.7 0-3-1.3-3-3V7h6v6c0 1.7-1.3 3-3 3"/></svg>`,
    `<svg width="800" height="800" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g/><path d="M3.6 19.1c-.5.2-.7.8-.4 1.3.1.4.5.6.9.6.2 0 .3 0 .5-.1l1.5-.6c.3 1 1.3 1.8 2.4 1.8h1.7c.5 0 1-.2 1.4-.4.3.1.6.2.8.2.8 0 1.6-.4 2.1-1.1.2-.3.5-.7.7-1.2 1.5.3 3 .8 4.4 1.5L20 20l.4-.9q-2.1-1.05-4.2-1.5c.7-1.4 1.4-2.7 1.7-3.4v-.1c1.3-2.9 1.8-6.1 1.5-9.2l-.1-.7c0-.3-.3-.7-.6-.8s-.7-.1-1 .1l-.5.4c-1.8 1.2-3.4 2.8-4.6 4.6-.4-1.7-1.1-3.4-2-4.9l-.4-.6q-.45-.6-.9-.6c-.3 0-.7.2-.9.5l-.3.5c-1.7 2.7-2.6 5.9-2.6 9.1 0 1.1.1 3.7.2 5.7q-1.05.3-2.1.9m9 .5c0-.2 0-.4.1-.6v-.2c0-.2 0-.4.1-.7.1-1.9.2-4.6.2-5.7v-1c1-2.1 2.6-4 4.4-5.5.1 2.4-.3 4.9-1.4 7.1v.1c-.4.9-1.4 2.9-2.3 4.5-.4 1-.7 1.6-1.1 2 .1 0 0 0 0 0M9.3 5.4c1 1.9 1.5 3.9 1.7 6.1v1.1c0 1-.1 3.6-.2 5.5-.1.6-.1 1.2-.2 1.6 0 .1 0 .1-.1.2 0 0 0 .1-.1.1-.1.1-.2.2-.4.2H8.4c-.3 0-.5-.2-.5-.4s-.1-.5-.1-.8c-.2-1.9-.3-5.1-.3-6.2 0-2.8.6-5.2 1.8-7.4"/></svg>`,
   `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M17 13V8.9c1.7-.2 3-1.7 3-3.4C20 3.6 18.4 2 16.5 2c-1.8 0-3.2 1.3-3.4 3h-2.3l-.9-2.3C9.8 2.3 9.4 2 9 2H5c-.6 0-1 .4-1 1s.4 1 1 1h3.3l.3 1H8c-.6 0-1 .4-1 1v7c0 2.4 1.7 4.4 4 4.9V20h-1c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2.1c2.3-.5 4-2.5 4-4.9m-.5-9c.8 0 1.5.7 1.5 1.5 0 .7-.4 1.2-1 1.4V6c0-.6-.4-1-1-1h-.9c.2-.6.7-1 1.4-1M12 16c-1.7 0-3-1.3-3-3V7h6v6c0 1.7-1.3 3-3 3"/></svg>`,
`<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M19.8 5.4c-.2-.2-.5-.4-.8-.4 0-1.7-1.3-3-3-3H8C6.3 2 5 3.3 5 5c-.3 0-.6.2-.8.4L2.9 7.3c-.6.9-.8 2-.5 3S3.2 12 4 12.4V17c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-4.6c.8-.5 1.3-1.2 1.6-2.1.3-1 .1-2.2-.5-3zM8 4h8c.6 0 1 .4 1 1H7c0-.6.4-1 1-1m6 3v2c0 1.1-.9 2-2 2s-2-.9-2-2V7zm-8.3 4c-.1 0-.3-.1-.4-.1s-.2-.1-.2-.1c-.4-.2-.6-.5-.7-.9-.1-.5 0-1 .2-1.4l1-1.4H8v1.8c0 .9-.6 1.8-1.4 2h-.8c0 .1 0 .1-.1.1m7.3 8h-2v-2c0-.6.4-1 1-1s1 .4 1 1zm5-2c0 1.1-.9 2-2 2h-1v-2c0-1.7-1.3-3-3-3s-3 1.3-3 3v2H8c-1.1 0-2-.9-2-2v-4h.4c.1 0 .2 0 .3-.1.1 0 .2 0 .3-.1.1 0 .2-.1.4-.1.2-.1.3-.1.4-.2q.75-.3 1.2-.9l.1.1.3.3c.1.1.2.1.3.2s.3.2.4.3.2.1.3.2c.2.1.3.1.5.2.1 0 .2.1.3.1h.8c.3 0 .6 0 .8-.1.1 0 .2-.1.3-.1.2-.1.4-.1.5-.2.1 0 .2-.1.3-.2s.3-.2.4-.3.2-.1.3-.2l.3-.3s.1 0 .1-.1c.3.4.7.7 1.1.9.1.1.3.1.4.2.1 0 .2.1.4.1.1 0 .2 0 .3.1.1 0 .2 0 .3.1h.4V17zm1.6-7.2c-.1.4-.4.8-.7.9-.1 0-.2.1-.3.1s-.2.1-.4.1h-.9c-.8-.3-1.4-1.1-1.4-2V7h2.5l1 1.4c.3.4.4 1 .2 1.4"/></svg>`
  ];

  const named = {
    "alla": `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M6 12h12M9 17h6"/></svg>`,
    "Boenden": `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g/><path fill="currentcolor" d="M21 8c0-2.2-1.8-4-4-4H7C4.8 4 3 5.8 3 8v3.8c-.6.5-1 1.3-1 2.2v5c0 .6.4 1 1 1s1-.4 1-1v-1h16v1c0 .6.4 1 1 1s1-.4 1-1v-5c0-.9-.4-1.7-1-2.2zM5 8c0-1.1.9-2 2-2h10c1.1 0 1 .9 2 2v3h-1v-1c0-1.7-1.3-3-3-3h-1c-.8 0-1.5.3-2 .8-.5-.5-1.2-.8-2-.8H9c-1.7 0-3 1.3-3 3v1H5zm11 2v1h-3v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1m-5 0v1H8v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1m9 6H4v-2c0-.6.4-1 1-1h14c.6 0 1 .4 1 1z"/></svg>`,
    "Mat & dryck": `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M17 13V8.9c1.7-.2 3-1.7 3-3.4C20 3.6 18.4 2 16.5 2c-1.8 0-3.2 1.3-3.4 3h-2.3l-.9-2.3C9.8 2.3 9.4 2 9 2H5c-.6 0-1 .4-1 1s.4 1 1 1h3.3l.3 1H8c-.6 0-1 .4-1 1v7c0 2.4 1.7 4.4 4 4.9V20h-1c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2.1c2.3-.5 4-2.5 4-4.9m-.5-9c.8 0 1.5.7 1.5 1.5 0 .7-.4 1.2-1 1.4V6c0-.6-.4-1-1-1h-.9c.2-.6.7-1 1.4-1M12 16c-1.7 0-3-1.3-3-3V7h6v6c0 1.7-1.3 3-3 3"/></svg>`,
    "Att göra": `<svg width="800" height="800" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g/><path d="M3.6 19.1c-.5.2-.7.8-.4 1.3.1.4.5.6.9.6.2 0 .3 0 .5-.1l1.5-.6c.3 1 1.3 1.8 2.4 1.8h1.7c.5 0 1-.2 1.4-.4.3.1.6.2.8.2.8 0 1.6-.4 2.1-1.1.2-.3.5-.7.7-1.2 1.5.3 3 .8 4.4 1.5L20 20l.4-.9q-2.1-1.05-4.2-1.5c.7-1.4 1.4-2.7 1.7-3.4v-.1c1.3-2.9 1.8-6.1 1.5-9.2l-.1-.7c0-.3-.3-.7-.6-.8s-.7-.1-1 .1l-.5.4c-1.8 1.2-3.4 2.8-4.6 4.6-.4-1.7-1.1-3.4-2-4.9l-.4-.6q-.45-.6-.9-.6c-.3 0-.7.2-.9.5l-.3.5c-1.7 2.7-2.6 5.9-2.6 9.1 0 1.1.1 3.7.2 5.7q-1.05.3-2.1.9m9 .5c0-.2 0-.4.1-.6v-.2c0-.2 0-.4.1-.7.1-1.9.2-4.6.2-5.7v-1c1-2.1 2.6-4 4.4-5.5.1 2.4-.3 4.9-1.4 7.1v.1c-.4.9-1.4 2.9-2.3 4.5-.4 1-.7 1.6-1.1 2 .1 0 0 0 0 0M9.3 5.4c1 1.9 1.5 3.9 1.7 6.1v1.1c0 1-.1 3.6-.2 5.5-.1.6-.1 1.2-.2 1.6 0 .1 0 .1-.1.2 0 0 0 .1-.1.1-.1.1-.2.2-.4.2H8.4c-.3 0-.5-.2-.5-.4s-.1-.5-.1-.8c-.2-1.9-.3-5.1-.3-6.2 0-2.8.6-5.2 1.8-7.4"/></svg>`,
    "Butiker": `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M19.8 5.4c-.2-.2-.5-.4-.8-.4 0-1.7-1.3-3-3-3H8C6.3 2 5 3.3 5 5c-.3 0-.6.2-.8.4L2.9 7.3c-.6.9-.8 2-.5 3S3.2 12 4 12.4V17c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-4.6c.8-.5 1.3-1.2 1.6-2.1.3-1 .1-2.2-.5-3zM8 4h8c.6 0 1 .4 1 1H7c0-.6.4-1 1-1m6 3v2c0 1.1-.9 2-2 2s-2-.9-2-2V7zm-8.3 4c-.1 0-.3-.1-.4-.1s-.2-.1-.2-.1c-.4-.2-.6-.5-.7-.9-.1-.5 0-1 .2-1.4l1-1.4H8v1.8c0 .9-.6 1.8-1.4 2h-.8c0 .1 0 .1-.1.1m7.3 8h-2v-2c0-.6.4-1 1-1s1 .4 1 1zm5-2c0 1.1-.9 2-2 2h-1v-2c0-1.7-1.3-3-3-3s-3 1.3-3 3v2H8c-1.1 0-2-.9-2-2v-4h.4c.1 0 .2 0 .3-.1.1 0 .2 0 .3-.1.1 0 .2-.1.4-.1.2-.1.3-.1.4-.2q.75-.3 1.2-.9l.1.1.3.3c.1.1.2.1.3.2s.3.2.4.3.2.1.3.2c.2.1.3.1.5.2.1 0 .2.1.3.1h.8c.3 0 .6 0 .8-.1.1 0 .2-.1.3-.1.2-.1.4-.1.5-.2.1 0 .2-.1.3-.2s.3-.2.4-.3.2-.1.3-.2l.3-.3s.1 0 .1-.1c.3.4.7.7 1.1.9.1.1.3.1.4.2.1 0 .2.1.4.1.1 0 .2 0 .3.1.1 0 .2 0 .3.1h.4V17zm1.6-7.2c-.1.4-.4.8-.7.9-.1 0-.2.1-.3.1s-.2.1-.4.1h-.9c-.8-.3-1.4-1.1-1.4-2V7h2.5l1 1.4c.3.4.4 1 .2 1.4"/></svg>`
  };

  return { bank, named };
}
function sektion73ApplyFilter(filterLabel) {
  const fNorm = sektion73NormFilter(filterLabel);
  const showAll = (fNorm === "alla" || fNorm === "");

  // NYTT: zoom-gating för "secondary" när inga filter är aktiva
  const z = (sektion73Map && typeof sektion73Map.getZoom === "function") ? sektion73Map.getZoom() : 0;

  Object.keys(sektion73MarkersById).forEach((id) => {
    const entry = sektion73MarkersById[id];
    if (!entry || !entry.marker || !entry.pin) return;

    const pinFilter = sektion73NormFilter(entry.pin.filter);

    // 1) Filter-match (om filter är aktivt)
    const matchesFilter = showAll ? true : (pinFilter === fNorm);
    if (!matchesFilter) {
      const el = entry.marker.getElement && entry.marker.getElement();
      if (el) {
        el.style.display = "none";
        el.setAttribute("aria-hidden", "true");
      }
      return;
    }

    // 2) Priority/secondary (endast när showAll = true)
    const prio = String(entry.pin.priority || "priority").trim().toLowerCase();
    const isSecondary = (prio === "secondary");

    // När filter är aktivt: matchande pins ska ALLTID synas (secondary ignoreras)
    const passesZoomGate = showAll ? (!isSecondary || z >= sektion73SecondaryPinsMinZoom) : true;

    const shouldShow = passesZoomGate;

    const el = entry.marker.getElement && entry.marker.getElement();
    if (el) {
      el.style.display = shouldShow ? "" : "none";
      el.setAttribute("aria-hidden", shouldShow ? "false" : "true");
    }
  });

  // Om modal är öppen och användaren filtrerar bort pinnen som nyss klickats:
  if (sektion73ModalOpen && window.__sektion73LastOpenedPinId) {
    const last = sektion73MarkersById[window.__sektion73LastOpenedPinId];
    const lastFilter = last && last.pin ? sektion73NormFilter(last.pin.filter) : "";
    if (!showAll && lastFilter !== fNorm) {
      sektion73CloseModal();
    }
  }
}

     function sektion73RestorePreFilterView() {
  if (!sektion73Map || typeof sektion73Map.easeTo !== "function") return;

  const v = sektion73FilterState.preView;
  if (!v) return;

  // Tilt/bearing ska vara standard (som du vill)
  const targetPitch = (typeof sektion73Pitch === "number") ? sektion73Pitch : sektion73Map.getPitch();
  const targetBearing = (typeof sektion73Bearing === "number") ? sektion73Bearing : sektion73Map.getBearing();

  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  sektion73Map.easeTo({
    center: v.center,
    zoom: Math.max(sektion73MinZoom, Math.min(sektion73MaxZoom, v.zoom)),
    pitch: targetPitch,
    bearing: targetBearing,
    duration: 780,
    easing: easeInOutCubic
  });

  // Clear: så nästa “första filter” sparar nytt läge
  sektion73FilterState.preView = null;
}
   function sektion73EaseToFilterOverview() {
  if (!sektion73Map || typeof sektion73Map.easeTo !== "function") return;

  // TONA NER ZOOM: bara lite mer "overview" än start (subtilt)
  // StartZoom = 15.7, så t.ex. 15.0 känns tydligt men inte dramatiskt.
  const desiredZoom = (typeof sektion73StartZoom === "number" ? sektion73StartZoom : sektion73Map.getZoom()) - 0.7;
  const targetZoom = Math.max(sektion73MinZoom, Math.min(sektion73MaxZoom, desiredZoom));

  // TILTA MER TOP-DOWN: sänk pitch lite mer än innan
  // Pitch = 65 => ~51 känns "överblick" utan att bli platt.
  const targetPitch = Math.max(0, (sektion73Pitch || sektion73Map.getPitch() || 0) - 14);

  // Behåll bearing/center (ingen "hoppa hem"-känsla)
  const targetBearing = (typeof sektion73Bearing === "number") ? sektion73Bearing : sektion73Map.getBearing();
  const targetCenter = sektion73Map.getCenter().toArray();

  // LÅNGSAMMARE + MER EASE (mjuk in/out)
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  sektion73Map.easeTo({
    center: targetCenter,
    zoom: targetZoom,
    pitch: targetPitch,
    bearing: targetBearing,
    duration: 780,
    easing: easeInOutCubic
  });
}
function sektion73FitViewportToFilter(filterLabel) {
  if (!sektion73Map || typeof sektion73Map.fitBounds !== "function") return;

  const fNorm = sektion73NormFilter(filterLabel);
  const showAll = (fNorm === "alla" || fNorm === "");

  // Samla lngLat för pins som ska vara synliga
  const pts = [];
  Object.keys(sektion73MarkersById).forEach((id) => {
    const entry = sektion73MarkersById[id];
    if (!entry || !entry.pin || !entry.pin.lngLat) return;

    const pinFilter = sektion73NormFilter(entry.pin.filter);
    const shouldShow = showAll ? true : (pinFilter === fNorm);
    if (!shouldShow) return;

    // lngLat är [lng, lat]
    pts.push(entry.pin.lngLat);
  });

  // Inget att rama in
  if (pts.length === 0) return;

  // Om bara 1 pin: behåll din “filter view”-känsla (den du redan tuned och gillar)
  if (pts.length === 1) {
    sektion73EaseToFilterOverview();
    return;
  }

  // Bygg bounds
  const bounds = new mapboxgl.LngLatBounds(pts[0], pts[0]);
  for (let i = 1; i < pts.length; i++) bounds.extend(pts[i]);

  // Samma pitch/bearing som din filter-view (justera inte här om du redan är nöjd)
  const targetBearing = (typeof sektion73Bearing === "number") ? sektion73Bearing : sektion73Map.getBearing();
  const targetPitch = Math.max(
    0,
    (sektion73Pitch || sektion73Map.getPitch() || 0) - 14
  );

  // Padding: lämna luft för filterbar + lite safe space
  // (top för ev. UI, bottom för filterbar)
  const padding = { top: 80, right: 28, bottom: 130, left: 28 };

  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Fit bounds så ALLA synliga pins hamnar i viewport
  sektion73Map.fitBounds(bounds, {
    padding,
    duration: 820,
    easing: easeInOutCubic,

    // Viktigt: undvik att fitBounds zoomar in för aggressivt
    // (du vill “overview”, inte “hitta 2 punkter nära varandra och zooma in max”)
    maxZoom: Math.min(sektion73MaxZoom, (typeof sektion73StartZoom === "number" ? sektion73StartZoom : sektion73Map.getZoom())),

    bearing: targetBearing,
    pitch: targetPitch
  });
}


function sektion73EnsureFilterBar() {
  if (document.getElementById("sektion73MapFilterBar")) return;

  sektion73InjectFilterCSS();

  const filters = sektion73GetAvailableFilters();
  if (!filters || filters.length < 1) return;

  const { bank, named } = sektion73BuildFilterIconBank();

  const bar = document.createElement("div");
  bar.id = "sektion73MapFilterBar";

  const rail = document.createElement("div");
  rail.id = "sektion73MapFilterRail";

  // NYTT: label istället för "Alla"-knapp
  const labelEl = document.createElement("span");
  labelEl.className = "sektion73FilterLabel";
  labelEl.textContent = "Filtrera:";
  rail.appendChild(labelEl);

  const closeSvg = `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Close</title><g fill="none" fill-rule="evenodd"><path d="M0 0h24v24H0z"/><path stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M17 7 7 17M7 7l10 10"/></g></svg>`;

const setActive = (nextLabel) => {
  const prev = String(sektion73FilterState.active || "").trim();
  const next = String(nextLabel || "").trim();

  // Spara vyn precis när användaren går från "inga filter" -> "ett filter"
  if (!prev && next && !sektion73FilterState.preView && sektion73Map) {
    sektion73FilterState.preView = {
      center: sektion73Map.getCenter().toArray(),
      zoom: sektion73Map.getZoom()
    };
  }

  sektion73FilterState.active = next;

  const allBtns = rail.querySelectorAll(".sektion73FilterBtn");
    allBtns.forEach((b) => {
      const bLabel = String(b.getAttribute("data-filter") || "");
      const isOn = (bLabel === sektion73FilterState.active);

      b.setAttribute("aria-pressed", isOn ? "true" : "false");

      // rensa ev. tidigare close
      const prevClose = b.querySelector(".sektion73FilterClose");
      if (prevClose) prevClose.remove();

      // NYTT: close-ikon bara på aktiv knapp
      if (isOn) {
        const close = document.createElement("span");
        close.className = "sektion73FilterClose";
        close.innerHTML = closeSvg;
        close.setAttribute("aria-hidden", "true");

close.addEventListener("click", (e) => {
  e.preventDefault();
  if (typeof e.stopImmediatePropagation === "function") e.stopImmediatePropagation();
  e.stopPropagation();

  setActive(""); // “alla” (visar alla pins)

  requestAnimationFrame(() => {
    sektion73RestorePreFilterView();
  });
});



        b.appendChild(close);
      }
    });

    sektion73ApplyFilter(sektion73FilterState.active || "");
  };

 const filterConfig = [
  {
    label: "Mat & dryck",
    icon: `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M17 13V8.9c1.7-.2 3-1.7 3-3.4C20 3.6 18.4 2 16.5 2c-1.8 0-3.2 1.3-3.4 3h-2.3l-.9-2.3C9.8 2.3 9.4 2 9 2H5c-.6 0-1 .4-1 1s.4 1 1 1h3.3l.3 1H8c-.6 0-1 .4-1 1v7c0 2.4 1.7 4.4 4 4.9V20h-1c-.6 0-1 .4-1 1s.4 1 1 1h4c.6 0 1-.4 1-1s-.4-1-1-1h-1v-2.1c2.3-.5 4-2.5 4-4.9m-.5-9c.8 0 1.5.7 1.5 1.5 0 .7-.4 1.2-1 1.4V6c0-.6-.4-1-1-1h-.9c.2-.6.7-1 1.4-1M12 16c-1.7 0-3-1.3-3-3V7h6v6c0 1.7-1.3 3-3 3"></path></svg>`
  },
  {
    label: "Boenden",
    icon: `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g></g><path fill="currentcolor" d="M21 8c0-2.2-1.8-4-4-4H7C4.8 4 3 5.8 3 8v3.8c-.6.5-1 1.3-1 2.2v5c0 .6.4 1 1 1s1-.4 1-1v-1h16v1c0 .6.4 1 1 1s1-.4 1-1v-5c0-.9-.4-1.7-1-2.2zM5 8c0-1.1.9-2 2-2h10c1.1 0 1 .9 2 2v3h-1v-1c0-1.7-1.3-3-3-3h-1c-.8 0-1.5.3-2 .8-.5-.5-1.2-.8-2-.8H9c-1.7 0-3 1.3-3 3v1H5zm11 2v1h-3v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1m-5 0v1H8v-1c0-.6.4-1 1-1h1c.6 0 1 .4 1 1m9 6H4v-2c0-.6.4-1 1-1h14c.6 0 1 .4 1 1z"></path></svg>`
  },
  {
    label: "Att göra",
    icon: `<svg width="800" height="800" viewBox="0 0 24 24" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><g></g><path d="M3.6 19.1c-.5.2-.7.8-.4 1.3.1.4.5.6.9.6.2 0 .3 0 .5-.1l1.5-.6c.3 1 1.3 1.8 2.4 1.8h1.7c.5 0 1-.2 1.4-.4.3.1.6.2.8.2.8 0 1.6-.4 2.1-1.1.2-.3.5-.7.7-1.2 1.5.3 3 .8 4.4 1.5L20 20l.4-.9q-2.1-1.05-4.2-1.5c.7-1.4 1.4-2.7 1.7-3.4v-.1c1.3-2.9 1.8-6.1 1.5-9.2l-.1-.7c0-.3-.3-.7-.6-.8s-.7-.1-1 .1l-.5.4c-1.8 1.2-3.4 2.8-4.6 4.6-.4-1.7-1.1-3.4-2-4.9l-.4-.6q-.45-.6-.9-.6c-.3 0-.7.2-.9.5l-.3.5c-1.7 2.7-2.6 5.9-2.6 9.1 0 1.1.1 3.7.2 5.7q-1.05.3-2.1.9m9 .5c0-.2 0-.4.1-.6v-.2c0-.2 0-.4.1-.7.1-1.9.2-4.6.2-5.7v-1c1-2.1 2.6-4 4.4-5.5.1 2.4-.3 4.9-1.4 7.1v.1c-.4.9-1.4 2.9-2.3 4.5-.4 1-.7 1.6-1.1 2 .1 0 0 0 0 0M9.3 5.4c1 1.9 1.5 3.9 1.7 6.1v1.1c0 1-.1 3.6-.2 5.5-.1.6-.1 1.2-.2 1.6 0 .1 0 .1-.1.2 0 0 0 .1-.1.1-.1.1-.2.2-.4.2H8.4c-.3 0-.5-.2-.5-.4s-.1-.5-.1-.8c-.2-1.9-.3-5.1-.3-6.2 0-2.8.6-5.2 1.8-7.4"></path></svg>`
  },
  {
    label: "Butiker",
    icon: `<svg width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentcolor"><path d="M19.8 5.4c-.2-.2-.5-.4-.8-.4 0-1.7-1.3-3-3-3H8C6.3 2 5 3.3 5 5c-.3 0-.6.2-.8.4L2.9 7.3c-.6.9-.8 2-.5 3S3.2 12 4 12.4V17c0 2.2 1.8 4 4 4h8c2.2 0 4-1.8 4-4v-4.6c.8-.5 1.3-1.2 1.6-2.1.3-1 .1-2.2-.5-3zM8 4h8c.6 0 1 .4 1 1H7c0-.6.4-1 1-1m6 3v2c0 1.1-.9 2-2 2s-2-.9-2-2V7zm-8.3 4c-.1 0-.3-.1-.4-.1s-.2-.1-.2-.1c-.4-.2-.6-.5-.7-.9-.1-.5 0-1 .2-1.4l1-1.4H8v1.8c0 .9-.6 1.8-1.4 2h-.8c0 .1 0 .1-.1.1m7.3 8h-2v-2c0-.6.4-1 1-1s1 .4 1 1zm5-2c0 1.1-.9 2-2 2h-1v-2c0-1.7-1.3-3-3-3s-3 1.3-3 3v2H8c-1.1 0-2-.9-2-2v-4h.4c.1 0 .2 0 .3-.1.1 0 .2 0 .3-.1.1 0 .2-.1.4-.1.2-.1.3-.1.4-.2q.75-.3 1.2-.9l.1.1.3.3c.1.1.2.1.3.2s.3.2.4.3.2.1.3.2c.2.1.3.1.5.2.1 0 .2.1.3.1h.8c.3 0 .6 0 .8-.1.1 0 .2-.1.3-.1.2-.1.4-.1.5-.2.1 0 .2-.1.3-.2s.3-.2.4-.3.2-.1.3-.2l.3-.3s.1 0 .1-.1c.3.4.7.7 1.1.9.1.1.3.1.4.2.1 0 .2.1.4.1.1 0 .2 0 .3.1.1 0 .2 0 .3.1h.4V17zm1.6-7.2c-.1.4-.4.8-.7.9-.1 0-.2.1-.3.1s-.2.1-.4.1h-.9c-.8-.3-1.4-1.1-1.4-2V7h2.5l1 1.4c.3.4.4 1 .2 1.4"></path></svg>`
  }
];

// Rewrite the filter rendering logic
filterConfig.forEach((filterItem) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sektion73FilterBtn";
  btn.setAttribute("data-filter", String(filterItem.label));
  btn.setAttribute("aria-pressed", "false");
  btn.setAttribute("aria-label", `Filter: ${filterItem.label}`);

  const ico = document.createElement("span");
  ico.className = "sektion73FilterIco";
  ico.innerHTML = filterItem.icon;

  const txt = document.createElement("span");
  txt.textContent = String(filterItem.label);

  btn.appendChild(ico);
  btn.appendChild(txt);

  btn.addEventListener("click", () => {
    const next = String(btn.getAttribute("data-filter") || "");
    setActive(next);

    // NYTT: rama in alla pins som är synliga för filtret
    requestAnimationFrame(() => {
      sektion73FitViewportToFilter(next);
    });
  });

  rail.appendChild(btn);
});

  bar.appendChild(rail);
  document.body.appendChild(bar);

  // initial apply: visa allt, ingen close-ikon
  setActive(sektion73FilterState.active);
}
function sektion73SetFilterBarHidden(hidden) {
  const bar = document.getElementById("sektion73MapFilterBar");
  if (!bar) return;
  if (hidden) bar.classList.add("sektion73FilterBarHidden");
  else bar.classList.remove("sektion73FilterBarHidden");
}

function sektion73ZoomToPinThenOpenModal(pin) {
  // Stäng ev. befintlig modal direkt (så fokus blir zoom först)
  if (sektion73ModalOpen) sektion73CloseModal();

  // Safety: rensa tidigare moveend-hook om man klickar snabbt mellan pins
  if (sektion73ActiveMoveEndHandler) {
    sektion73Map.off("moveend", sektion73ActiveMoveEndHandler);
    sektion73ActiveMoveEndHandler = null;
  }

  // Spara vyn där användaren var innan pin-zoom
  sektion73ReturnView = {
    center: sektion73Map.getCenter().toArray(),
    zoom: sektion73Map.getZoom(),
    pitch: sektion73Map.getPitch(),
    bearing: sektion73Map.getBearing()
  };

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

/* NYTT: filterbaren ner precis innan modalen åker in */
sektion73SetFilterBarHidden(true);

/* Låt browsern “commit:a” klass + starta transition innan modal-class togglas */
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    sektion73OpenModal(pin.modal);
  });
});
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
    // används av filter för att kunna stänga modal om pin filtreras bort
    window.__sektion73LastOpenedPinId = pin.id;

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
  const sektion73Idle = (fn, timeoutMs) => {
    const t = (typeof timeoutMs === "number" ? timeoutMs : 1200);

    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => fn(), { timeout: t });
    } else {
      setTimeout(fn, 0);
    }
  };

  const sektion73Later = (fn, ms) => {
    const d = (typeof ms === "number" ? ms : 700);
    setTimeout(fn, d);
  };

     const filters = [
    "Mat & dryck",
    "Boenden", 
    "Att göra", 
    "Butiker"
  ];
  // NYTT: injicera CSS som pinsen (och modalens transitions/vars) behöver direkt.
  // Detta skapar INTE modal-DOM, bara en <style>-tagg.
  sektion73InjectModalCSS();

  // 1) KRAV: kartan + ALLA pins ska synas direkt (ingen idle/defer här)
  sektion73Pins.forEach(sektion73AddPin);

  // initialt — applicera (döljer ev. secondary vid startzoom)
  sektion73ApplyFilter(sektion73FilterState.active || "");

  // vid zoom — uppdatera så secondary blir synliga när man zoomar in
  sektion73Map.on("zoomend", () => {
    sektion73ApplyFilter(sektion73FilterState.active || "");
  });

  // 2) Filter-slider får ladda in lite senare (efter att pins redan syns)
  sektion73Later(() => {
    sektion73Idle(() => {
      sektion73EnsureFilterBar();
    }, 1800);
  }, 650);

  // OBS: modalen skapas först vid första pin-klick via sektion73OpenModal() -> sektion73EnsureModalDOM()
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
