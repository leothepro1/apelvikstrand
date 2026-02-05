
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

    const sektion73StyleUrl = "mapbox://styles/rutgersson/cml85l84y003c01s6by4kazii";

const sektion73Home = {
  title: "",
  // Perfekt centrerad ovanifrån: (lat 57.081171, lng 12.262932)
  lngLat: [12.262932, 57.081171]
};
         const sektion73Golf = {
      title: "",
      lngLat: [12.248763, 57.084963]
    };
             const sektion73Surfcenter = {
      title: "",
      lngLat: [12.263720, 57.079943]
    };
                  const sektion73Majas = {
      title: "",
      lngLat: [12.263265, 57.080060]
    };
         const sektion73Kusthotellet = {
      title: "",
      lngLat: [12.242833, 57.088610]
    };
    // Tångkörarvägen 1, 432 54 Varberg (koordinater från karta-länk)
    const sektion73surfcenter = {
      title: "",
      lngLat: [12.250144, 57.084689]
    };
    // Tångkörarvägen 1, 432 54 Varberg (koordinater från karta-länk)
    const sektion73Tangkorar = {
      title: "",
      lngLat: [12.2488165, 57.084682]
    };
         const sektion73livs = {
      title: "",
      lngLat: [12.250247, 57.084998]
    };
const sektion73InitialCenter = {
  title: "",
  lngLat: [12.262962795883425, 57.081155502369455]
};
                   const sektion73destinationapelviken = {
      title: "",
      lngLat: [12.249162, 57.086926]
    };
                    const sektion73streethuset = {
      title: "",
      lngLat: [12.25237511, 57.08448050]
    };

    // 1) Surbrunnsvägen 2-8, 432 53 Varberg
    const sektion73Surbrunnsvagen_2_8 = {
      title: "",
      lngLat: [12.26231500, 57.08160800]
    };

    // 2) Sanatorievägen 4, 432 53 Varberg
    const sektion73Sanatorievagen_4 = {
      title: "",
      lngLat: [12.26165550, 57.08288410]
    };

    // 3) Surbrunnsvägen 8E, 432 53 Varberg
    const sektion73Surbrunnsvagen_8E = {
      title: "",
      lngLat: [12.26309450, 57.08161920]
    };

    // 4) Tångkörarvägen 13, 432 54 Varberg
    const sektion73Tangkorar_13 = {
      title: "",
      lngLat: [12.26327010, 57.07738420]
    };

    // 5) Tångkörarvägen 17, 432 54 Varberg
    const sektion73Tangkorar_17 = {
      title: "",
      lngLat: [12.26374100, 57.07980300]
    };

const sektion73Bounds = [
  [12.255800, 57.077900], // SW
  [12.271000, 57.084800]  // NE
];

// Mindre inzoomad start (justera vid behov)
const sektion73MinZoom = 14.8;
const sektion73MaxZoom = 18.6;
const sektion73StartZoom = 17.6;

// Ovanifrån + norr upp
const sektion73Pitch = 0;
const sektion73Bearing = 0;

    const sektion73DisableRotate = true;

    // Zoom vid pin-klick
    const sektion73PinZoom = 17.9;

    // Bas-duration (normal zoom-delta)
    const sektion73PinZoomDur = 1100;

    // Extra “premium smooth” om zoom-deltat är stort
    const sektion73PinZoomDurExtraMax = 140;

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
  pitch: sektion73Pitch,
  bearing: sektion73Bearing,
  maxBounds: sektion73Bounds,
  attributionControl: false,
  antialias: false,
  pitchWithRotate: false,
  dragRotate: false
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
#sektion73MapModal #sektion73ModalCtaPrimary {
    background: #FFE6A3;
    padding: 10px 19px;
    color: #5A3C00;
    transition: 0.15s ease-in-out;
    cursor: pointer;
    border-radius: 8px;
    font-family: "Manrope", Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: 700;
    margin-top: 22px;
}

#sektion73MapModal #sektion73ModalCtaPrimary:hover{
  background: #FFD870;
}

#sektion73MapModal #sektion73ModalCtaPrimary:active{
  background: #F2CC5A;
}
/* Hover på hela pinnen (wrap) */
#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinBubble,
#sektion73MapCanvas .sektion73PinWrap:hover .sektion73PinBtn{
  transform: scale(1.08) !important;
}
#sektion73MapCanvas .sektion73PinWrap:active .sektion73PinBubble,
#sektion73MapCanvas .sektion73PinWrap:active .sektion73PinBtn{
  transform: scale(1) !important;
}

#sektion73MapOverlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, .25);
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--sektion73-modal-dur) var(--sektion73-modal-ease);
    z-index: 2147483000;
}
    #sektion73MapOverlay.is-open{
      opacity:1;
      pointer-events:auto;
    }

    /* bottom-sheet (glider upp nerifrån) */
    #sektion73MapModal{
      position:fixed;
      left:50%;
      height: 367px;
      bottom:18px;
      transform:translateX(-50%) translateY(115%);
      width:min(920px, calc(100vw - 24px));
      max-height:min(78vh, 720px);
      background:var(--sektion73-modal-bg);
      color:var(--sektion73-modal-text);
      border:none;
      transition:transform var(--sektion73-modal-dur) var(--sektion73-modal-ease);
      z-index:2147483001;
      display:block;
      overscroll-behavior:contain;
      border-radius:20px;
      overflow:hidden;
      box-shadow:var(--sektion73-modal-shadow);
    }
    #sektion73MapModal.is-open{
      transform:translateX(-50%) translateY(0);
    }

 .sektion73ModalLayout{
  display:flex;
  flex-direction:row;
  width:100%;
  height:100%;
  min-height:auto;
}

.sektion73ModalLeft {
  width: 40%;
  min-width: 240px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0px;
  border-right: none;
  background: var(--sektion73-modal-bg);
  height: 100%;
  min-height: 100%;
  object-fit: cover;
}

.sektion73ModalLeftImgWrap {
    width: 100%;
    border-radius: 0px;
    overflow: hidden;
    background: #f2f4f5;
    height: 100%;
}

    .sektion73ModalLeftImg{
      width:100%;
      height:100%;
      object-fit:cover;
      display:block;
    }

.sektion73ModalClose {
    width: 36px;
    height: 36px;
    border-radius: 888px;
    border: none;
    background: rgba(255, 255, 255, .92);
    cursor: pointer;
    display: grid;
    place-items: center;
    color: var(--sektion73-modal-text);
    background: rgba(250, 250, 250, 0.72);
    cursor: pointer;
    display: flex;
    place-content: center;
    flex: 0 0 18px;
    position: absolute;
    top: 18px;
    right: 18px;
    backdrop-filter: blur(24px) saturate(1.6);
    -webkit-backdrop-filter: blur(24px) saturate(1.6);
    box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 8px;
    flex-wrap: wrap;
}
    .sektion73ModalClose:hover{ background:rgba(255,255,255,.98); }
    .sektion73ModalClose:active{ transform:translateY(1px); }

    .sektion73ModalCloseAbs{
      position:absolute;
      top:12px;
      left:12px;
      z-index:5;
    }

.sektion73ModalImgSrc {
    margin: 0;
    font-family: 'Inter Variablefont Opsz Wght';
    font-size: 13px;
    line-height: 1.3em;
    color: rgba(14, 19, 24, .62);
    word-break: break-word;
    display: none;
}

.sektion73ModalRight {
    width: auto;
    flex: 3 1 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
    padding: 40px;
    gap: 0px;
    overflow: auto;
    place-content: center;
    flex-wrap: wrap;
}

    .sektion73ModalRightTop{
      display:flex;
      flex-direction:column;
      gap:14px;
    }

  .sektion73ModalTitleRow{
      display:flex;
      align-items:center;
      gap:12px;
    }

#sektion73MapModal #sektion73ModalTitleIcons {
    margin-top: 24px;
    border-top: 1px solid #e6e6e6;
    padding-top: 24px;
}

#sektion73MapModal .sektion73ModalIconRow{
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0;
}

#sektion73MapModal .sektion73ModalTitleIcon{
  width: 24px;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #646463;
  flex: 0 0 18px;
}

#sektion73MapModal .sektion73ModalTitleIcon svg {
    width: 18px;
    height: 18px;
    display: block;
    stroke: currentColor;
    fill: none;
}

#sektion73MapModal .sektion73ModalTitleIconTxt {
    font-family: 'Inter Variablefont Opsz Wght';
    font-size: 14px;
    font-weight: 500;
    color: #646463;
    line-height: 1.25em;
}
.sektion73ModalBodyH {
    font-family: "Manrope", Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    margin: 0;
    line-height: 1.25em;
    font-weight: 700;
    font-size: 31px;
}

    .sektion73ModalBodyPWrap{
      position:relative;
      padding-right:90px;
    }

    .sektion73ModalBodyP{
      color: rgb(64, 61, 59);
      margin:0;
      font-family: 'Inter Variablefont Opsz Wght';
      font-weight:400;
      font-size:16px;
      line-height:1.55em;

      display:-webkit-box;
      -webkit-line-clamp:2;
      -webkit-box-orient:vertical;
      overflow:hidden;
    }

    .sektion73ModalBodyPWrap.is-expanded .sektion73ModalBodyP{
      display:block;
      -webkit-line-clamp:unset;
      overflow:visible;
    }

    .sektion73ModalReadMore{
      position:absolute;
      right:0;
      bottom:0;
      border:none;
      background:transparent;
      padding:0;
      cursor:pointer;
      font-family:'Inter Variablefont Opsz Wght';
      font-size:15px;
      font-weight:600;
      color:var(--sektion73-accent);
      line-height:1.55em;
    }
    .sektion73ModalReadMore:hover{ text-decoration:underline; }
    .sektion73ModalReadMore:active{ transform:translateY(1px); }

    @media (max-width: 768px){
  .sektion73ModalLayout{
    flex-direction:column;
    min-height:unset;
  }
    .sektion73ModalLeft {
        width: 100%;
        flex: 0 0 35%;
        min-width: unset;
        border-right: none;
        border-bottom: none;
        padding: 0px;
        height: 100%;
    }
#sektion73MapModal {
        height: auto !important;
        max-height: 93% !important;
        overflow: auto !important;
        -webkit-overflow-scrolling: touch;
        width: 100% !important;
        bottom: 0% !important;
        top: auto !important;
        border-radius: 20px 20px 0px 0px !important;
    }
width: auto;
        flex: 3 1 0;
        min-width: 0;
        display: flex;
        flex-direction: column;
        padding: 24px;
        gap: 0px;
        overflow: auto;
        place-content: center;
        flex-wrap: nowrap;
        overflow: visible !important;
        place-content: initial !important;
        flex-wrap: nowrap !important;
    
}
      .sektion73ModalBodyH{ font-size:26px; }
      .sektion73ModalBodyP{ font-size:15px; }
    }

    body.sektion73-modal-open {
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
      touch-action: none;
    }
#sektion73MapModal #sektion73ModalCtaPrimary {
    width: 100%;
}
    /* NYTT: klassisk kart-pin (cirkel + pekare), med text i cirkeln */
    .sektion73PinWrap{
      display:inline-flex;
      flex-direction:column;
      align-items:center;
      gap:0;
      transform:translateZ(0);
      position:relative;
      z-index:1;
    }

    #sektion73MapCanvas .sektion73PinWrap:hover,
    #sektion73MapCanvas .sektion73PinWrap:focus-within{
      z-index:9999;
    }

    .sektion73PinBubble{
      width:34px;
      height:34px;
      border-radius:999px;
      background:var(--sektion73-pin-bubble-bg, var(--sektion73-accent));
      border:2px solid rgba(255,255,255,.98);
      box-shadow:0 14px 30px rgba(0,0,0,.22);
      display:inline-flex;
      align-items:center;
      justify-content:center;
      position:relative;
      color:#111;
    }

    .sektion73PinBubble::after{
display: none !important;
    }

.sektion73PinBtn {
    all: unset;
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 999px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    background: var(--sektion73-pin-bubble-bg, var(--sektion73-accent));
    padding: 2.3px;
    aspect-ratio: 1 / 1;
    color: #fff;
    font-family: 'Inter Variablefont Opsz Wght';
    font-size: 14.5px;
    font-weight: 500;
}

.sektion73PinText {
    letter-spacing: 0;
    color: currentColor;
    user-select: none;
    pointer-events: none;
    font-family: 'Inter Variablefont Opsz Wght';
    font-size: 12px;
    font-weight: 500;
}

    /* Behåll (kompat) så äldre DOM inte kraschar om något refererar */
    .sektion73PinPointer{ display:none; }
    .sektion73PinIco{ display:none; }
    .sektion73PinDot{ display:none; }
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
      <div class="sektion73ModalLayout" role="document">
        <div class="sektion73ModalLeft">
          <button class="sektion73ModalClose sektion73ModalCloseAbs" type="button" id="sektion73ModalCloseBtn" aria-label="Stäng">
            <svg fill="currentcolor" height="21" viewBox="0 0 1000 1000" width="21" xmlns="http://www.w3.org/2000/svg"><path d="M159 204l55-54 659 659-55 55-659-660m709 5L205 877l-55-59 664-664"></path></svg>
          </button>

          <div class="sektion73ModalLeftImgWrap">
            <img id="sektion73ModalImg0" alt="" loading="lazy" class="sektion73ModalLeftImg skeleton-loader">
            <img id="sektion73ModalImg1" alt="" loading="lazy" class="skeleton-loader" style="display:none">
            <img id="sektion73ModalImg2" alt="" loading="lazy" class="skeleton-loader" style="display:none">
            <img id="sektion73ModalImg3" alt="" loading="lazy" class="skeleton-loader" style="display:none">
          </div>

          <p class="sektion73ModalImgSrc" id="sektion73ModalImgSrc"></p>
        </div>

        <div class="sektion73ModalRight">
          <div class="sektion73ModalRightTop">
            <div class="sektion73ModalTitleRow">
              <h3 class="sektion73ModalBodyH" id="sektion73ModalBodyH">Rubrik</h3>
            </div>

            <div class="sektion73ModalBodyPWrap" id="sektion73ModalBodyPWrap">
              <p class="sektion73ModalBodyP" id="sektion73ModalBodyP">Brödtext…</p>
              <button type="button" class="sektion73ModalReadMore" id="sektion73ModalReadMoreBtn">Läs mer</button>
            </div>
          </div>

          <div class="sektion73ModalActions" style="display:flex">
            <button class="sektion73ModalBtn sektion73ModalBtnPrimary" type="button" id="sektion73ModalCtaPrimary">
              <span id="sektion73ModalCtaPrimaryTxt">Primär CTA</span>
            </button>

            <button class="sektion73ModalBtn" type="button" id="sektion73ModalCtaSecondary">
              <span id="sektion73ModalCtaSecondaryTxt">Sekundär CTA</span>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>

          <div class="sektion73ModalTitleIcons" id="sektion73ModalTitleIcons" aria-hidden="true" style="display:none">
            <div class="sektion73ModalIconRow" id="sektion73ModalIconRow1" style="display:none">
              <span class="sektion73ModalTitleIcon" id="sektion73ModalIcon1"></span>
              <span class="sektion73ModalTitleIconTxt" id="sektion73ModalIconTxt1"></span>
            </div>

            <div class="sektion73ModalIconRow" id="sektion73ModalIconRow2" style="display:none">
              <span class="sektion73ModalTitleIcon" id="sektion73ModalIcon2"></span>
              <span class="sektion73ModalTitleIconTxt" id="sektion73ModalIconTxt2"></span>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = document.getElementById("sektion73ModalCloseBtn");
    if (closeBtn) closeBtn.addEventListener("click", sektion73CloseModal);

    const rmBtn = document.getElementById("sektion73ModalReadMoreBtn");
    if (rmBtn) {
      rmBtn.addEventListener("click", () => {
        const wrap = document.getElementById("sektion73ModalBodyPWrap");
        if (!wrap) return;
        const isExpanded = wrap.classList.toggle("is-expanded");
        rmBtn.textContent = isExpanded ? "Visa mindre" : "Läs mer";
      });
    }

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

  document.getElementById("sektion73ModalBodyH").textContent = payload.h || "";
  document.getElementById("sektion73ModalBodyP").textContent = payload.p || "";

  const iconWrap = document.getElementById("sektion73ModalTitleIcons");

  const row1 = document.getElementById("sektion73ModalIconRow1");
  const row2 = document.getElementById("sektion73ModalIconRow2");

  const icon1 = document.getElementById("sektion73ModalIcon1");
  const icon2 = document.getElementById("sektion73ModalIcon2");

  const txt1 = document.getElementById("sektion73ModalIconTxt1");
  const txt2 = document.getElementById("sektion73ModalIconTxt2");

  const iconItems = (payload && payload.iconItems && Array.isArray(payload.iconItems)) ? payload.iconItems : [];
  const legacyIcons = (payload && payload.icons && Array.isArray(payload.icons)) ? payload.icons : [];
  const legacyTexts = (payload && payload.iconTexts && Array.isArray(payload.iconTexts)) ? payload.iconTexts : [];

  const i1 = iconItems[0] || null;
  const i2 = iconItems[1] || null;

  const svg1 = (i1 && i1.svg != null) ? i1.svg : (legacyIcons[0] || "");
  const svg2 = (i2 && i2.svg != null) ? i2.svg : (legacyIcons[1] || "");

  const t1 = (i1 && i1.text != null) ? i1.text : (legacyTexts[0] || "");
  const t2 = (i2 && i2.text != null) ? i2.text : (legacyTexts[1] || "");

  if (icon1) icon1.innerHTML = svg1 || "";
  if (icon2) icon2.innerHTML = svg2 || "";

  if (txt1) txt1.textContent = t1 || "";
  if (txt2) txt2.textContent = t2 || "";

  const hasRow1 = Boolean((svg1 && String(svg1).trim()) || (t1 && String(t1).trim()));
  const hasRow2 = Boolean((svg2 && String(svg2).trim()) || (t2 && String(t2).trim()));
  const hasAny = Boolean(hasRow1 || hasRow2);

  if (row1) row1.style.display = hasRow1 ? "flex" : "none";
  if (row2) row2.style.display = hasRow2 ? "flex" : "none";
  if (iconWrap) iconWrap.style.display = hasAny ? "" : "none";

  const pWrap = document.getElementById("sektion73ModalBodyPWrap");
  const rmBtn = document.getElementById("sektion73ModalReadMoreBtn");
  if (pWrap) pWrap.classList.remove("is-expanded");
  if (rmBtn) rmBtn.textContent = "Läs mer";

  const imgs = payload.images || [];
  const img0 = document.getElementById("sektion73ModalImg0");
  const img1 = document.getElementById("sektion73ModalImg1");
  const img2 = document.getElementById("sektion73ModalImg2");
  const img3 = document.getElementById("sektion73ModalImg3");

  if (img0) img0.src = payload.imgSrc || imgs[0] || "";
  if (img1) img1.src = imgs[1] || "";
  if (img2) img2.src = imgs[2] || "";
  if (img3) img3.src = imgs[3] || "";

  const imgSrcEl = document.getElementById("sektion73ModalImgSrc");
  if (imgSrcEl) imgSrcEl.textContent = payload.imgSrc || "";

  const cta1 = document.getElementById("sektion73ModalCtaPrimary");
  const cta2 = document.getElementById("sektion73ModalCtaSecondary");
  const cta1t = document.getElementById("sektion73ModalCtaPrimaryTxt");
  const cta2t = document.getElementById("sektion73ModalCtaSecondaryTxt");

  const actionsWrap = modal ? modal.querySelector(".sektion73ModalActions") : null;

  const hasCta1 = Boolean(payload && payload.cta1Text && String(payload.cta1Text).trim());
  const hasCta2 = Boolean(payload && payload.cta2Text && String(payload.cta2Text).trim());
  const hasAnyCta = Boolean(hasCta1 || hasCta2);

  if (cta1t) cta1t.textContent = payload.cta1Text || "";
  if (cta2t) cta2t.textContent = payload.cta2Text || "";

  if (cta1) cta1.style.display = hasCta1 ? "" : "none";
  if (cta2) cta2.style.display = hasCta2 ? "" : "none";
  if (actionsWrap) actionsWrap.style.display = hasAnyCta ? "flex" : "none";

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

  overlay.classList.remove("is-open");
  modal.classList.remove("is-open");
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

if (sektion73Map && view && typeof sektion73Map.easeTo === "function") {
  const onReturnEnd = () => {
    sektion73Map.off("moveend", onReturnEnd);

    /* NYTT: först NU (när vi nått previous zoom/view) åker filterbaren upp */

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

}

}


    /* =========================
       PINS (2 st) – zoom först, modal efter "moveend"
       ========================= */
const sektion73Pins = [
{
  id: "sektion73Pin_00001",
  label: "Pin 1",
  labelText: "1",
  lngLat: [12.26197312396269, 57.08162693545353],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 1",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    iconItems: [
      {
        svg: '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
        text: "4 vuxna & 2 barn"
      },
      {
        svg: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        text: "Morgonsol"
      }
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00002",
  label: "Pin 2",
  labelText: "2",
  lngLat: [12.262082176983768, 57.081600917569034],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 2  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00003",
  label: "Pin 3",
  labelText: "3",
  lngLat: [12.262318128134382, 57.08166527756367],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 3  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00004",
  label: "Pin 4",
  labelText: "4",
  lngLat: [12.262428503055986, 57.081637688307154],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 4  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00005",
  label: "Pin 5",
  labelText: "5",
  lngLat: [12.26266048860353, 57.08170492165513],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 5  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00006",
  label: "Pin 6",
  labelText: "6",
  lngLat: [12.262768219804656, 57.08167948749295],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 6  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00007",
  label: "Pin 7",
  labelText: "7",
  lngLat: [12.26300152723178, 57.081747439114935],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 7  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
     '<svg width="800" height="800" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-n</title><path d="M457.74 170.1a30.3 30.3 0 0 0-11.16-2.1h-.4c-20.17.3-42.79 19.19-54.66 47.76-14.23 34.18-7.68 69.15 14.74 78.14a30.2 30.2 0 0 0 11.15 2.1c20.27 0 43.2-19 55.17-47.76 14.13-34.18 7.48-69.15-14.84-78.14ZM327.6 303.48C299.8 257.35 287.8 240 256 240s-43.9 17.46-71.7 63.48c-23.8 39.36-71.9 42.64-83.9 76.07a50.9 50.9 0 0 0-3.6 19.25c0 27.19 20.8 49.2 46.4 49.2 31.8 0 75.1-25.39 112.9-25.39S337 448 368.8 448c25.6 0 46.3-22 46.3-49.2a51 51 0 0 0-3.7-19.25c-12-33.55-60-36.71-83.8-76.07ZM192.51 196a26.5 26.5 0 0 0 4-.3c23.21-3.37 37.7-35.53 32.44-71.85C224 89.61 203.22 64 181.49 64a26.5 26.5 0 0 0-4 .3c-23.21 3.37-37.7 35.53-32.44 71.85C150 170.29 170.78 196 192.51 196Zm174.41-59.85c5.26-36.32-9.23-68.48-32.44-71.85a26.5 26.5 0 0 0-4-.3c-21.73 0-42.47 25.61-47.43 59.85-5.26 36.32 9.23 68.48 32.44 71.85a26.5 26.5 0 0 0 4 .3c21.73 0 42.51-25.71 47.43-59.85ZM105.77 293.9c22.39-9 28.93-44 14.72-78.14C108.53 187 85.62 168 65.38 168a30.2 30.2 0 0 0-11.15 2.1c-22.39 9-28.93 44-14.72 78.14C51.47 277 74.38 296 94.62 296a30.2 30.2 0 0 0 11.15-2.1Z" style="fill:none;stroke:currentcolor;stroke-miterlimit:10;stroke-width:32px"/></svg>',
            '<svg fill="currentcolor" width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="4" r="2"/><path d="M16.98 14.804A1 1 0 0 0 16 14h-4.133l-.429-3H16V9h-4.847l-.163-1.142A1 1 0 0 0 10 7H9a1.003 1.003 0 0 0-.99 1.142l.877 6.142A2.01 2.01 0 0 0 10.867 16h4.313l.839 4.196c.094.467.504.804.981.804h3v-2h-2.181z"/><path d="M12.51 17.5c-.739 1.476-2.25 2.5-4.01 2.5A4.505 4.505 0 0 1 4 15.5a4.5 4.5 0 0 1 2.817-4.167l-.289-2.025C3.905 10.145 2 12.604 2 15.5 2 19.084 4.916 22 8.5 22a6.5 6.5 0 0 0 5.545-3.126l-.274-1.374z"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Djurvänlig",
      "Handikappsvänlig"     
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00008",
  label: "Pin 9",
  labelText: "8",
  lngLat: [12.263106614727718, 57.081720568270754],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 8  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
           '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
     '<svg width="800" height="800" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-n</title><path d="M457.74 170.1a30.3 30.3 0 0 0-11.16-2.1h-.4c-20.17.3-42.79 19.19-54.66 47.76-14.23 34.18-7.68 69.15 14.74 78.14a30.2 30.2 0 0 0 11.15 2.1c20.27 0 43.2-19 55.17-47.76 14.13-34.18 7.48-69.15-14.84-78.14ZM327.6 303.48C299.8 257.35 287.8 240 256 240s-43.9 17.46-71.7 63.48c-23.8 39.36-71.9 42.64-83.9 76.07a50.9 50.9 0 0 0-3.6 19.25c0 27.19 20.8 49.2 46.4 49.2 31.8 0 75.1-25.39 112.9-25.39S337 448 368.8 448c25.6 0 46.3-22 46.3-49.2a51 51 0 0 0-3.7-19.25c-12-33.55-60-36.71-83.8-76.07ZM192.51 196a26.5 26.5 0 0 0 4-.3c23.21-3.37 37.7-35.53 32.44-71.85C224 89.61 203.22 64 181.49 64a26.5 26.5 0 0 0-4 .3c-23.21 3.37-37.7 35.53-32.44 71.85C150 170.29 170.78 196 192.51 196Zm174.41-59.85c5.26-36.32-9.23-68.48-32.44-71.85a26.5 26.5 0 0 0-4-.3c-21.73 0-42.47 25.61-47.43 59.85-5.26 36.32 9.23 68.48 32.44 71.85a26.5 26.5 0 0 0 4 .3c21.73 0 42.51-25.71 47.43-59.85ZM105.77 293.9c22.39-9 28.93-44 14.72-78.14C108.53 187 85.62 168 65.38 168a30.2 30.2 0 0 0-11.15 2.1c-22.39 9-28.93 44-14.72 78.14C51.47 277 74.38 296 94.62 296a30.2 30.2 0 0 0 11.15-2.1Z" style="fill:none;stroke:currentcolor;stroke-miterlimit:10;stroke-width:32px"/></svg>',
            '<svg fill="currentcolor" width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="4" r="2"/><path d="M16.98 14.804A1 1 0 0 0 16 14h-4.133l-.429-3H16V9h-4.847l-.163-1.142A1 1 0 0 0 10 7H9a1.003 1.003 0 0 0-.99 1.142l.877 6.142A2.01 2.01 0 0 0 10.867 16h4.313l.839 4.196c.094.467.504.804.981.804h3v-2h-2.181z"/><path d="M12.51 17.5c-.739 1.476-2.25 2.5-4.01 2.5A4.505 4.505 0 0 1 4 15.5a4.5 4.5 0 0 1 2.817-4.167l-.289-2.025C3.905 10.145 2 12.604 2 15.5 2 19.084 4.916 22 8.5 22a6.5 6.5 0 0 0 5.545-3.126l-.274-1.374z"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Djurvänlig",
      "Handikappsvänlig"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00009",
  label: "Pin 9",
  labelText: "9",
  lngLat: [12.262194869335389, 57.08127715798125],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 9  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00010",
  label: "Pin 11",
  labelText: "10",
  lngLat: [12.262270876009751, 57.081331461506295],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: "Strandhus 10  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00011",
  label: "Pin 12",
  labelText: "11",
  lngLat: [12.262477746343166, 57.08131249231994],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 11  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00012",
  label: "Pin 13",
  labelText: "12",
  lngLat: [12.262555074877127, 57.081368232510044],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 12  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
       "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00013",
  label: "Pin 14",
  labelText: "13",
  lngLat: [12.262769876313968, 57.08134782663265],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 13  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00014",
  label: "Pin 15",
  labelText: "14",
  lngLat: [12.262845536788006, 57.081402712344186],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 14  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00015",
  label: "Pin 16",
  labelText: "15",
  lngLat: [12.263068269369796, 57.08138589827087],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 15  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
           '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
     '<svg width="800" height="800" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-n</title><path d="M457.74 170.1a30.3 30.3 0 0 0-11.16-2.1h-.4c-20.17.3-42.79 19.19-54.66 47.76-14.23 34.18-7.68 69.15 14.74 78.14a30.2 30.2 0 0 0 11.15 2.1c20.27 0 43.2-19 55.17-47.76 14.13-34.18 7.48-69.15-14.84-78.14ZM327.6 303.48C299.8 257.35 287.8 240 256 240s-43.9 17.46-71.7 63.48c-23.8 39.36-71.9 42.64-83.9 76.07a50.9 50.9 0 0 0-3.6 19.25c0 27.19 20.8 49.2 46.4 49.2 31.8 0 75.1-25.39 112.9-25.39S337 448 368.8 448c25.6 0 46.3-22 46.3-49.2a51 51 0 0 0-3.7-19.25c-12-33.55-60-36.71-83.8-76.07ZM192.51 196a26.5 26.5 0 0 0 4-.3c23.21-3.37 37.7-35.53 32.44-71.85C224 89.61 203.22 64 181.49 64a26.5 26.5 0 0 0-4 .3c-23.21 3.37-37.7 35.53-32.44 71.85C150 170.29 170.78 196 192.51 196Zm174.41-59.85c5.26-36.32-9.23-68.48-32.44-71.85a26.5 26.5 0 0 0-4-.3c-21.73 0-42.47 25.61-47.43 59.85-5.26 36.32 9.23 68.48 32.44 71.85a26.5 26.5 0 0 0 4 .3c21.73 0 42.51-25.71 47.43-59.85ZM105.77 293.9c22.39-9 28.93-44 14.72-78.14C108.53 187 85.62 168 65.38 168a30.2 30.2 0 0 0-11.15 2.1c-22.39 9-28.93 44-14.72 78.14C51.47 277 74.38 296 94.62 296a30.2 30.2 0 0 0 11.15-2.1Z" style="fill:none;stroke:currentcolor;stroke-miterlimit:10;stroke-width:32px"/></svg>',
            '<svg fill="currentcolor" width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="4" r="2"/><path d="M16.98 14.804A1 1 0 0 0 16 14h-4.133l-.429-3H16V9h-4.847l-.163-1.142A1 1 0 0 0 10 7H9a1.003 1.003 0 0 0-.99 1.142l.877 6.142A2.01 2.01 0 0 0 10.867 16h4.313l.839 4.196c.094.467.504.804.981.804h3v-2h-2.181z"/><path d="M12.51 17.5c-.739 1.476-2.25 2.5-4.01 2.5A4.505 4.505 0 0 1 4 15.5a4.5 4.5 0 0 1 2.817-4.167l-.289-2.025C3.905 10.145 2 12.604 2 15.5 2 19.084 4.916 22 8.5 22a6.5 6.5 0 0 0 5.545-3.126l-.274-1.374z"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Djurvänlig",
      "Handikappsvänlig"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00016",
  label: "Pin 17",
  labelText: "16",
  lngLat: [12.263144276036485, 57.08143589149515],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 16  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
           '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
     '<svg width="800" height="800" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-n</title><path d="M457.74 170.1a30.3 30.3 0 0 0-11.16-2.1h-.4c-20.17.3-42.79 19.19-54.66 47.76-14.23 34.18-7.68 69.15 14.74 78.14a30.2 30.2 0 0 0 11.15 2.1c20.27 0 43.2-19 55.17-47.76 14.13-34.18 7.48-69.15-14.84-78.14ZM327.6 303.48C299.8 257.35 287.8 240 256 240s-43.9 17.46-71.7 63.48c-23.8 39.36-71.9 42.64-83.9 76.07a50.9 50.9 0 0 0-3.6 19.25c0 27.19 20.8 49.2 46.4 49.2 31.8 0 75.1-25.39 112.9-25.39S337 448 368.8 448c25.6 0 46.3-22 46.3-49.2a51 51 0 0 0-3.7-19.25c-12-33.55-60-36.71-83.8-76.07ZM192.51 196a26.5 26.5 0 0 0 4-.3c23.21-3.37 37.7-35.53 32.44-71.85C224 89.61 203.22 64 181.49 64a26.5 26.5 0 0 0-4 .3c-23.21 3.37-37.7 35.53-32.44 71.85C150 170.29 170.78 196 192.51 196Zm174.41-59.85c5.26-36.32-9.23-68.48-32.44-71.85a26.5 26.5 0 0 0-4-.3c-21.73 0-42.47 25.61-47.43 59.85-5.26 36.32 9.23 68.48 32.44 71.85a26.5 26.5 0 0 0 4 .3c21.73 0 42.51-25.71 47.43-59.85ZM105.77 293.9c22.39-9 28.93-44 14.72-78.14C108.53 187 85.62 168 65.38 168a30.2 30.2 0 0 0-11.15 2.1c-22.39 9-28.93 44-14.72 78.14C51.47 277 74.38 296 94.62 296a30.2 30.2 0 0 0 11.15-2.1Z" style="fill:none;stroke:currentcolor;stroke-miterlimit:10;stroke-width:32px"/></svg>',
            '<svg fill="currentcolor" width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="4" r="2"/><path d="M16.98 14.804A1 1 0 0 0 16 14h-4.133l-.429-3H16V9h-4.847l-.163-1.142A1 1 0 0 0 10 7H9a1.003 1.003 0 0 0-.99 1.142l.877 6.142A2.01 2.01 0 0 0 10.867 16h4.313l.839 4.196c.094.467.504.804.981.804h3v-2h-2.181z"/><path d="M12.51 17.5c-.739 1.476-2.25 2.5-4.01 2.5A4.505 4.505 0 0 1 4 15.5a4.5 4.5 0 0 1 2.817-4.167l-.289-2.025C3.905 10.145 2 12.604 2 15.5 2 19.084 4.916 22 8.5 22a6.5 6.5 0 0 0 5.545-3.126l-.274-1.374z"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Djurvänlig",
      "Handikappsvänlig"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00017",
  label: "Pin 18",
  labelText: "17",
  lngLat: [12.262463879109788, 57.08101975420533],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 17  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00018",
  label: "Pin 19",
  labelText: "18",
  lngLat: [12.262570288438837, 57.08098569917749],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 18  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00019",
  label: "Pin 20",
  labelText: "19",
  lngLat: [12.262750721669505, 57.08105293370133],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 19  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00020",
  label: "Pin 21",
  labelText: "20",
  lngLat: [12.262854487289673, 57.08102103379619],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 20  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00021",
  label: "Pin 22",
  labelText: "21",
  lngLat: [12.263044173496866, 57.08108754989141],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 21  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00022",
  label: "Pin 23",
  labelText: "22",
  lngLat: [12.263142651741532, 57.08105636837058],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 22  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 10V3m0 0L9 6m3-3 3 3m-9 6-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Morgonsol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00023",
  label: "Pin 24",
  labelText: "23",
  lngLat: [12.263333659783598, 57.08112001095327],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 23  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
           '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
     '<svg width="800" height="800" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-n</title><path d="M457.74 170.1a30.3 30.3 0 0 0-11.16-2.1h-.4c-20.17.3-42.79 19.19-54.66 47.76-14.23 34.18-7.68 69.15 14.74 78.14a30.2 30.2 0 0 0 11.15 2.1c20.27 0 43.2-19 55.17-47.76 14.13-34.18 7.48-69.15-14.84-78.14ZM327.6 303.48C299.8 257.35 287.8 240 256 240s-43.9 17.46-71.7 63.48c-23.8 39.36-71.9 42.64-83.9 76.07a50.9 50.9 0 0 0-3.6 19.25c0 27.19 20.8 49.2 46.4 49.2 31.8 0 75.1-25.39 112.9-25.39S337 448 368.8 448c25.6 0 46.3-22 46.3-49.2a51 51 0 0 0-3.7-19.25c-12-33.55-60-36.71-83.8-76.07ZM192.51 196a26.5 26.5 0 0 0 4-.3c23.21-3.37 37.7-35.53 32.44-71.85C224 89.61 203.22 64 181.49 64a26.5 26.5 0 0 0-4 .3c-23.21 3.37-37.7 35.53-32.44 71.85C150 170.29 170.78 196 192.51 196Zm174.41-59.85c5.26-36.32-9.23-68.48-32.44-71.85a26.5 26.5 0 0 0-4-.3c-21.73 0-42.47 25.61-47.43 59.85-5.26 36.32 9.23 68.48 32.44 71.85a26.5 26.5 0 0 0 4 .3c21.73 0 42.51-25.71 47.43-59.85ZM105.77 293.9c22.39-9 28.93-44 14.72-78.14C108.53 187 85.62 168 65.38 168a30.2 30.2 0 0 0-11.15 2.1c-22.39 9-28.93 44-14.72 78.14C51.47 277 74.38 296 94.62 296a30.2 30.2 0 0 0 11.15-2.1Z" style="fill:none;stroke:currentcolor;stroke-miterlimit:10;stroke-width:32px"/></svg>',
            '<svg fill="currentcolor" width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="4" r="2"/><path d="M16.98 14.804A1 1 0 0 0 16 14h-4.133l-.429-3H16V9h-4.847l-.163-1.142A1 1 0 0 0 10 7H9a1.003 1.003 0 0 0-.99 1.142l.877 6.142A2.01 2.01 0 0 0 10.867 16h4.313l.839 4.196c.094.467.504.804.981.804h3v-2h-2.181z"/><path d="M12.51 17.5c-.739 1.476-2.25 2.5-4.01 2.5A4.505 4.505 0 0 1 4 15.5a4.5 4.5 0 0 1 2.817-4.167l-.289-2.025C3.905 10.145 2 12.604 2 15.5 2 19.084 4.916 22 8.5 22a6.5 6.5 0 0 0 5.545-3.126l-.274-1.374z"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Djurvänlig",
      "Handikappsvänlig"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00024",
  label: "Pin 25",
  labelText: "24",
  lngLat: [12.263433459837302, 57.081090266196355],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 24  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
           '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
     '<svg width="800" height="800" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-n</title><path d="M457.74 170.1a30.3 30.3 0 0 0-11.16-2.1h-.4c-20.17.3-42.79 19.19-54.66 47.76-14.23 34.18-7.68 69.15 14.74 78.14a30.2 30.2 0 0 0 11.15 2.1c20.27 0 43.2-19 55.17-47.76 14.13-34.18 7.48-69.15-14.84-78.14ZM327.6 303.48C299.8 257.35 287.8 240 256 240s-43.9 17.46-71.7 63.48c-23.8 39.36-71.9 42.64-83.9 76.07a50.9 50.9 0 0 0-3.6 19.25c0 27.19 20.8 49.2 46.4 49.2 31.8 0 75.1-25.39 112.9-25.39S337 448 368.8 448c25.6 0 46.3-22 46.3-49.2a51 51 0 0 0-3.7-19.25c-12-33.55-60-36.71-83.8-76.07ZM192.51 196a26.5 26.5 0 0 0 4-.3c23.21-3.37 37.7-35.53 32.44-71.85C224 89.61 203.22 64 181.49 64a26.5 26.5 0 0 0-4 .3c-23.21 3.37-37.7 35.53-32.44 71.85C150 170.29 170.78 196 192.51 196Zm174.41-59.85c5.26-36.32-9.23-68.48-32.44-71.85a26.5 26.5 0 0 0-4-.3c-21.73 0-42.47 25.61-47.43 59.85-5.26 36.32 9.23 68.48 32.44 71.85a26.5 26.5 0 0 0 4 .3c21.73 0 42.51-25.71 47.43-59.85ZM105.77 293.9c22.39-9 28.93-44 14.72-78.14C108.53 187 85.62 168 65.38 168a30.2 30.2 0 0 0-11.15 2.1c-22.39 9-28.93 44-14.72 78.14C51.47 277 74.38 296 94.62 296a30.2 30.2 0 0 0 11.15-2.1Z" style="fill:none;stroke:currentcolor;stroke-miterlimit:10;stroke-width:32px"/></svg>',
            '<svg fill="currentcolor" width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="4" r="2"/><path d="M16.98 14.804A1 1 0 0 0 16 14h-4.133l-.429-3H16V9h-4.847l-.163-1.142A1 1 0 0 0 10 7H9a1.003 1.003 0 0 0-.99 1.142l.877 6.142A2.01 2.01 0 0 0 10.867 16h4.313l.839 4.196c.094.467.504.804.981.804h3v-2h-2.181z"/><path d="M12.51 17.5c-.739 1.476-2.25 2.5-4.01 2.5A4.505 4.505 0 0 1 4 15.5a4.5 4.5 0 0 1 2.817-4.167l-.289-2.025C3.905 10.145 2 12.604 2 15.5 2 19.084 4.916 22 8.5 22a6.5 6.5 0 0 0 5.545-3.126l-.274-1.374z"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Djurvänlig",
      "Handikappsvänlig"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00025",
  label: "Pin 26",
  labelText: "25",
  lngLat: [12.262675279675818, 57.080665309036135],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 25  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
       "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00026",
  label: "Pin 27",
  labelText: "26",
  lngLat: [12.262745995033498, 57.08071961344976],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 26  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
       "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00027",
  label: "Pin 28",
  labelText: "27",
  lngLat: [12.26301367068126, 57.08070064395787],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 27  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
       "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00028",
  label: "Pin 29",
  labelText: "28",
  lngLat: [12.263080424389472, 57.08075782180549],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 28  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
       "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00029",
  label: "Pin 30",
  labelText: "29",
  lngLat: [12.263353387445193, 57.080743162558974],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 29  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
       "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00030",
  label: "Pin 31",
  labelText: "30",
  lngLat: [12.263421462996916, 57.08080105871713],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 30  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
      '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m6 12-1-1m13 1 1-1M3 18h18M5 21h14M7 18a5 5 0 0 1 10 0M12 3v7m0 0 3-3m-3 3L9 7" stroke="currentcolor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    ],
    iconTexts: [
       "4 vuxna & 2 barn",
      "Kvällssol"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00031",
  label: "Pin 32",
  labelText: "31",
  lngLat: [12.263694426079951, 57.08078208926068],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 31  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
           '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
     '<svg width="800" height="800" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-n</title><path d="M457.74 170.1a30.3 30.3 0 0 0-11.16-2.1h-.4c-20.17.3-42.79 19.19-54.66 47.76-14.23 34.18-7.68 69.15 14.74 78.14a30.2 30.2 0 0 0 11.15 2.1c20.27 0 43.2-19 55.17-47.76 14.13-34.18 7.48-69.15-14.84-78.14ZM327.6 303.48C299.8 257.35 287.8 240 256 240s-43.9 17.46-71.7 63.48c-23.8 39.36-71.9 42.64-83.9 76.07a50.9 50.9 0 0 0-3.6 19.25c0 27.19 20.8 49.2 46.4 49.2 31.8 0 75.1-25.39 112.9-25.39S337 448 368.8 448c25.6 0 46.3-22 46.3-49.2a51 51 0 0 0-3.7-19.25c-12-33.55-60-36.71-83.8-76.07ZM192.51 196a26.5 26.5 0 0 0 4-.3c23.21-3.37 37.7-35.53 32.44-71.85C224 89.61 203.22 64 181.49 64a26.5 26.5 0 0 0-4 .3c-23.21 3.37-37.7 35.53-32.44 71.85C150 170.29 170.78 196 192.51 196Zm174.41-59.85c5.26-36.32-9.23-68.48-32.44-71.85a26.5 26.5 0 0 0-4-.3c-21.73 0-42.47 25.61-47.43 59.85-5.26 36.32 9.23 68.48 32.44 71.85a26.5 26.5 0 0 0 4 .3c21.73 0 42.51-25.71 47.43-59.85ZM105.77 293.9c22.39-9 28.93-44 14.72-78.14C108.53 187 85.62 168 65.38 168a30.2 30.2 0 0 0-11.15 2.1c-22.39 9-28.93 44-14.72 78.14C51.47 277 74.38 296 94.62 296a30.2 30.2 0 0 0 11.15-2.1Z" style="fill:none;stroke:currentcolor;stroke-miterlimit:10;stroke-width:32px"/></svg>',
            '<svg fill="currentcolor" width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="4" r="2"/><path d="M16.98 14.804A1 1 0 0 0 16 14h-4.133l-.429-3H16V9h-4.847l-.163-1.142A1 1 0 0 0 10 7H9a1.003 1.003 0 0 0-.99 1.142l.877 6.142A2.01 2.01 0 0 0 10.867 16h4.313l.839 4.196c.094.467.504.804.981.804h3v-2h-2.181z"/><path d="M12.51 17.5c-.739 1.476-2.25 2.5-4.01 2.5A4.505 4.505 0 0 1 4 15.5a4.5 4.5 0 0 1 2.817-4.167l-.289-2.025C3.905 10.145 2 12.604 2 15.5 2 19.084 4.916 22 8.5 22a6.5 6.5 0 0 0 5.545-3.126l-.274-1.374z"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Djurvänlig",
      "Handikappsvänlig"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00032",
  label: "Pin 33",
  labelText: "32",
  lngLat: [12.263763823459442, 57.080838548618544],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: "Strandhus 32  ",
    p: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.",
    icons: [
           '<svg width="24" height="24" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"><circle cx="8" cy="6" r="3.25"/><path d="M2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5"/></svg>',
     '<svg width="800" height="800" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><title>ionicons-v5-n</title><path d="M457.74 170.1a30.3 30.3 0 0 0-11.16-2.1h-.4c-20.17.3-42.79 19.19-54.66 47.76-14.23 34.18-7.68 69.15 14.74 78.14a30.2 30.2 0 0 0 11.15 2.1c20.27 0 43.2-19 55.17-47.76 14.13-34.18 7.48-69.15-14.84-78.14ZM327.6 303.48C299.8 257.35 287.8 240 256 240s-43.9 17.46-71.7 63.48c-23.8 39.36-71.9 42.64-83.9 76.07a50.9 50.9 0 0 0-3.6 19.25c0 27.19 20.8 49.2 46.4 49.2 31.8 0 75.1-25.39 112.9-25.39S337 448 368.8 448c25.6 0 46.3-22 46.3-49.2a51 51 0 0 0-3.7-19.25c-12-33.55-60-36.71-83.8-76.07ZM192.51 196a26.5 26.5 0 0 0 4-.3c23.21-3.37 37.7-35.53 32.44-71.85C224 89.61 203.22 64 181.49 64a26.5 26.5 0 0 0-4 .3c-23.21 3.37-37.7 35.53-32.44 71.85C150 170.29 170.78 196 192.51 196Zm174.41-59.85c5.26-36.32-9.23-68.48-32.44-71.85a26.5 26.5 0 0 0-4-.3c-21.73 0-42.47 25.61-47.43 59.85-5.26 36.32 9.23 68.48 32.44 71.85a26.5 26.5 0 0 0 4 .3c21.73 0 42.51-25.71 47.43-59.85ZM105.77 293.9c22.39-9 28.93-44 14.72-78.14C108.53 187 85.62 168 65.38 168a30.2 30.2 0 0 0-11.15 2.1c-22.39 9-28.93 44-14.72 78.14C51.47 277 74.38 296 94.62 296a30.2 30.2 0 0 0 11.15-2.1Z" style="fill:none;stroke:currentcolor;stroke-miterlimit:10;stroke-width:32px"/></svg>',
            '<svg fill="currentcolor" width="800" height="800" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="4" r="2"/><path d="M16.98 14.804A1 1 0 0 0 16 14h-4.133l-.429-3H16V9h-4.847l-.163-1.142A1 1 0 0 0 10 7H9a1.003 1.003 0 0 0-.99 1.142l.877 6.142A2.01 2.01 0 0 0 10.867 16h4.313l.839 4.196c.094.467.504.804.981.804h3v-2h-2.181z"/><path d="M12.51 17.5c-.739 1.476-2.25 2.5-4.01 2.5A4.505 4.505 0 0 1 4 15.5a4.5 4.5 0 0 1 2.817-4.167l-.289-2.025C3.905 10.145 2 12.604 2 15.5 2 19.084 4.916 22 8.5 22a6.5 6.5 0 0 0 5.545-3.126l-.274-1.374z"/></svg>'
    ],
    iconTexts: [
      "4 vuxna & 2 barn",
      "Djurvänlig",
      "Handikappsvänlig"
    ],
    images: ["", "", "", ""],
    cta1Text: "Vägbeskrivning",
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
}
];

function sektion73CreatePinEl(pin) {
  const wrap = document.createElement("div");
  wrap.className = "sektion73PinWrap";
  wrap.id = pin.id;

  wrap.dataset.filter = String(pin.filter || "").trim();
  wrap.dataset.priority = String(pin.priority || "priority").trim().toLowerCase();

  // Per-pin färg (bakgrund på pinnen)
  const bubbleBg = (pin.ui && pin.ui.bubbleBg) ? String(pin.ui.bubbleBg) : "var(--sektion73-accent)";
  wrap.style.setProperty("--sektion73-pin-bubble-bg", bubbleBg);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sektion73PinBubble sektion73PinBtn";
  btn.setAttribute("aria-label", String(pin.label || ""));

  const txt = document.createElement("span");
  txt.className = "sektion73PinText";
  txt.textContent = String(pin.labelText || "");
  txt.setAttribute("aria-hidden", "true");

  btn.appendChild(txt);
  wrap.appendChild(btn);

  // micro hover (behåll neutral, ingen layout-shift)
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(0px)";
    btn.style.boxShadow = "";
  });
  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translateY(0)";
    btn.style.boxShadow = "";
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

    /* Låt browsern “commit:a” klass + starta transition innan modal-class togglas */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        sektion73OpenModal(pin.modal);
      });
    });
  };

  sektion73ActiveMoveEndHandler = onMoveEnd;
  sektion73Map.on("moveend", onMoveEnd);

  // Ease-in-out (cubic): startar mjukt, accelererar, bromsar mjukt
  const sektion73EaseInOutCubic_00035 = (t) =>
    (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Dynamisk duration: bara lite längre när hoppet är stort
  const sektion73TargetZoom_00036 = Math.min(sektion73PinZoom, sektion73MaxZoom);
  const sektion73CurrentZoom_00037 = sektion73Map.getZoom();
  const sektion73ZoomDelta_00038 =
    Math.abs(sektion73TargetZoom_00036 - sektion73CurrentZoom_00037);

  // 0..1 där 0 = litet hopp, 1 = stort hopp (tuned för din karta)
  const sektion73ZoomDeltaNorm_00039 = Math.min(1, sektion73ZoomDelta_00038 / 4.2);

  // Lägg till max +sektion73PinZoomDurExtraMax ms vid riktigt stora hopp
  const sektion73DynamicDur_00040 =
    sektion73PinZoomDur +
    Math.round(sektion73ZoomDeltaNorm_00039 * sektion73PinZoomDurExtraMax);

  sektion73Map.easeTo({
    center: pin.lngLat,
    zoom: sektion73TargetZoom_00036,
    pitch: sektion73Pitch,
    bearing: sektion73Bearing,
    duration: sektion73DynamicDur_00040,
    easing: sektion73EaseInOutCubic_00035
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
  // Säkerställ att initial kameravy verkligen blir som dina konstanter
  // (matchar beteendet i AS.MAPS2 som sätter pitch/bearing explicit)
  try {
    sektion73Map.setPitch(sektion73Pitch);
    sektion73Map.setBearing(sektion73Bearing);
  } catch (_) {}

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
