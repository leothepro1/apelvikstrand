
(function () {
  // Auto-load Material Symbols font (avoids Webflow line-break issues in href)
  if (!document.getElementById("sektion73MaterialSymbols")) {
    var link = document.createElement("link");
    link.id = "sektion73MaterialSymbols";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200";
    document.head.appendChild(link);
  }

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
       i18n (sv / en / de)
       ========================= */

    function sektion73GetLang() {
      const htmlLang = String((document.documentElement && document.documentElement.lang) || "").trim().toLowerCase();
      if (htmlLang === "en" || htmlLang === "de" || htmlLang === "sv") return htmlLang;
      const path = String((location && location.pathname) || "/");
      if (path === "/en" || path.indexOf("/en/") === 0) return "en";
      if (path === "/de" || path.indexOf("/de/") === 0) return "de";
      return "sv";
    }

    function sektion73Pick(val, fallback) {
      if (typeof val === "string") return val;
      if (val && typeof val === "object") {
        var v = val[sektion73Lang] != null ? val[sektion73Lang] : (val.sv != null ? val.sv : (val.en != null ? val.en : val.de));
        if (typeof v === "string") return v;
      }
      return (typeof fallback === "string") ? fallback : "";
    }

    const sektion73Lang = sektion73GetLang();

    const sektion73I18N = {
      sv: {
        route: {
          findReception: "Hitta receptionen",
          showRoute: "Visa rutt",
          driving: "Bilväg",
          walking: "Gångväg",
          fetching: "Hämtar rutt…",
          backToMap: "Tillbaka till kartan"
        },
        tooltip: {
          parking: "Parkering",
          grill: "Grillplats",
          playground: "Lekplats",
          trash: "Soprum"
        }
      },
      en: {
        route: {
          findReception: "Find reception",
          showRoute: "Show route",
          driving: "Driving",
          walking: "Walking",
          fetching: "Fetching route…",
          backToMap: "Back to map"
        },
        tooltip: {
          parking: "Parking",
          grill: "Barbecue area",
          playground: "Playground",
          trash: "Waste room"
        }
      },
      de: {
        route: {
          findReception: "Rezeption finden",
          showRoute: "Route anzeigen",
          driving: "Autoroute",
          walking: "Fußweg",
          fetching: "Route wird geladen…",
          backToMap: "Zurück zur Karte"
        },
        tooltip: {
          parking: "Parkplatz",
          grill: "Grillplatz",
          playground: "Spielplatz",
          trash: "Müllraum"
        }
      }
    };

    function sektion73T(path, fallback) {
      var parts = String(path || "").split(".");
      var cur = (sektion73I18N[sektion73Lang] || sektion73I18N.sv);
      for (var i = 0; i < parts.length; i++) {
        if (!cur || typeof cur !== "object" || !(parts[i] in cur)) { cur = null; break; }
        cur = cur[parts[i]];
      }
      if (typeof cur === "string") return cur;
      cur = sektion73I18N.sv;
      for (var j = 0; j < parts.length; j++) {
        if (!cur || typeof cur !== "object" || !(parts[j] in cur)) { cur = null; break; }
        cur = cur[parts[j]];
      }
      if (typeof cur === "string") return cur;
      return (typeof fallback === "string") ? fallback : "";
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
  [12.245000, 57.077900], // SW
  [12.271000, 57.090000]  // NE
];

// Mindre inzoomad start (justera vid behov)
const sektion73MinZoom = 12.5;
const sektion73MaxZoom = 18.6;
const sektion73StartZoom = (window.innerWidth <= 768) ? 16.4 : 17.6;

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
    margin-top: 0;
    border: none;
    text-align: center;
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
/* Text-only pins: no hover/active transform or transition */
#sektion73MapCanvas .sektion73PinWrap.sektion73PinTextOnly .sektion73PinBtn{
  transition: none !important;
}
#sektion73MapCanvas .sektion73PinWrap.sektion73PinTextOnly:hover .sektion73PinBtn{
  transform: rotate(var(--sektion73-pin-rotate, 68deg)) !important;
}
#sektion73MapCanvas .sektion73PinWrap.sektion73PinTextOnly:active .sektion73PinBtn{
  transform: rotate(var(--sektion73-pin-rotate, 68deg)) !important;
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
      height: auto;
      max-height: min(78vh, 720px);
      bottom:18px;
      transform:translateX(-50%) translateY(115%);
      width:min(920px, calc(100vw - 24px));
      background:var(--sektion73-modal-bg);
      color:var(--sektion73-modal-text);
      border:none;
      transition:transform var(--sektion73-modal-dur) var(--sektion73-modal-ease);
      z-index:2147483001;
      display:block;
      overscroll-behavior:contain;
      border-radius:20px;
      overflow:visible;
      box-shadow:var(--sektion73-modal-shadow);
    }
    .sektion73ModalLayout {
      overflow:hidden;
      border-radius:20px;
    }
    #sektion73MapModal.is-open{
      transform:translateX(-50%) translateY(0);
    }

 .sektion73ModalLayout{
  display:flex;
  flex-direction:row;
  width:100%;
  height:100%;
  min-height:100%;
  position:relative;
}

.sektion73ModalLeft {
  width: 40%;
  min-width: 240px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  padding: 0px;
  border-right: none;
  background: var(--sektion73-modal-bg);
  overflow: hidden;
}

.sektion73ModalLeftImgWrap {
    width: 100%;
    height: 100%;
    border-radius: 0px;
    overflow: hidden;
    background: #f2f4f5;
    flex: 1 1 0;
    min-height: 0;
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
    background: rgba(250, 250, 250, 0.72);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--sektion73-modal-text);
    position: absolute;
    top: 18px;
    right: 18px;
    z-index: 5;
    backdrop-filter: blur(24px) saturate(1.6);
    -webkit-backdrop-filter: blur(24px) saturate(1.6);
    box-shadow: rgba(0, 0, 0, 0.14) 0px 3px 8px;
}
    .sektion73ModalClose:hover{ background:rgba(255,255,255,.98); }
    .sektion73ModalClose:active{ transform:translateY(1px); }

    .sektion73ModalCloseAbs{
      position:absolute;
      top: 0;
      right: -48px;
      left: auto;
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
    margin-left: 40%;
    display: flex;
    flex-direction: column;
    padding: 40px;
    gap: 0px;
    overflow: auto;
    place-content: center;
    flex-wrap: nowrap;
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
      display:inline;
      border:none;
      background:transparent;
      padding:0;
      margin-top:4px;
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
      #sektion73MapModal {
        height: auto !important;
        max-height: 92vh !important;
        width: 100% !important;
        bottom: 0 !important;
        top: auto !important;
        left: 0 !important;
        border-radius: 20px 20px 0 0 !important;
        transform: translateX(0) translateY(115%) !important;
        overflow: auto !important;
        -webkit-overflow-scrolling: touch;
      }

      .sektion73ModalLayout {
        height: auto !important;
      }
      #sektion73MapModal.is-open {
        transform: translateX(0) translateY(0) !important;
      }

      .sektion73ModalLayout {
        flex-direction: column;
        min-height: unset;
      }

      .sektion73ModalLeft {
        position: relative;
        width: 100%;
        flex: 0 0 267px;
        min-width: unset;
        max-height: 267px;
        border-right: none;
        border-bottom: none;
        padding: 0;
        height: 267px;
        min-height: 267px;
        top: auto;
        left: auto;
        bottom: auto;
      }

      .sektion73ModalLeftImgWrap {
        height: 100%;
        max-height: 267px;
      }

      .sektion73ModalRight {
        width: auto;
        flex: 1 1 auto;
        min-width: 0;
        margin-left: 0;
        display: flex;
        flex-direction: column;
        padding: 24px;
        gap: 0;
        overflow: visible !important;
        place-content: initial !important;
        flex-wrap: nowrap !important;
      }

      .sektion73ModalBodyPWrap {
        padding-right: 0 !important;
      }

      .sektion73ModalBodyH { font-size: 26px; }
      .sektion73ModalBodyP { font-size: 15px; }

      .sektion73ModalClose.sektion73ModalCloseAbs {
        top: 12px;
        right: 12px;
        left: auto;
      }
    }

    body.sektion73-modal-open {
      overflow: hidden;
      position: fixed;
      width: 100%;
      height: 100%;
      touch-action: none;
    }
#sektion73MapModal #sektion73ModalCtaPrimary {
    width: auto;
    flex: 1;
}
#sektion73MapModal #sektion73ModalCtaSecondary {
    background: #FFE6A3;
    padding: 10px 19px;
    color: #5A3C00;
    transition: 0.15s ease-in-out;
    cursor: pointer;
    border-radius: 8px;
    font-family: "Manrope", Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    font-size: 15px;
    font-weight: 700;
    border: none;
    flex: 1;
    text-align: center;
}
#sektion73MapModal #sektion73ModalCtaSecondary:hover {
    background: #FFD870;
}
#sektion73MapModal #sektion73ModalCtaSecondary:active {
    background: #F2CC5A;
}
#sektion73MapModal #sektion73ModalCtaSecondary svg {
    display: none;
}
#sektion73MapModal .sektion73ModalActions {
    gap: 10px;
    margin-top: 22px;
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
.sektion73PinText.material-symbols-outlined {
    font-family: 'Material Symbols Outlined' !important;
    font-weight: 400;
    font-style: normal;
    font-size: 18px;
    -webkit-font-feature-settings: 'liga';
    font-feature-settings: 'liga';
}

    /* Numbered pins only — smaller size */
    .sektion73PinWrap:not(.sektion73PinIconOnly):not(.sektion73PinTooltip) .sektion73PinBtn {
      width: 21px;
      height: 21px;
    }
    .sektion73PinWrap:not(.sektion73PinIconOnly):not(.sektion73PinTooltip) .sektion73PinBubble {
      width: 21px;
      height: 21px;
    }

    /* Ikon-only pins (ingen bubbla, bara ikonen) */
    .sektion73PinIconOnly .sektion73PinBtn {
      background: none !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      color: #222 !important;
    }
    .sektion73PinIconOnly .sektion73PinBubble {
      background: none !important;
      border: none !important;
      box-shadow: none !important;
    }
    .sektion73PinIconOnly .sektion73PinText {
      color: #222 !important;
    }

    /* Text-only pins (no bubble, just text) */
    .sektion73PinTextOnly .sektion73PinBtn {
      background: none !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
      width: auto !important;
      height: auto !important;
      aspect-ratio: auto !important;
      border-radius: 0 !important;
      transform: rotate(var(--sektion73-pin-rotate, 68deg));
    }
    .sektion73PinTextOnly .sektion73PinText {
      color: #000 !important;
      font-size: 11px;
      font-weight: 600;
    }
    @media (max-width: 740px) {
      .sektion73PinTextOnly .sektion73PinText {
        font-size: 8px;
      }
    }

    /* Tooltip-pin */
    .sektion73PinTooltip .sektion73PinBtn {
      border-radius: 8px;
      padding: 3px 7px;
      width: auto;
      height: auto;
      aspect-ratio: auto;
      font-size: 13px;
      font-weight: 600;
      white-space: nowrap;
    }
    .sektion73PinTooltip .sektion73PinBubble {
      border-radius: 8px;
      width: auto;
      height: auto;
      border: none;
    }
    .sektion73PinTooltip .sektion73PinBubble::after {
      display: block !important;
      content: "";
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 6px solid var(--sektion73-pin-bubble-bg, #222);
    }

    /* Behåll (kompat) så äldre DOM inte kraschar om något refererar */
    .sektion73PinPointer{ display:none; }
    .sektion73PinIco{ display:none; }
    .sektion73PinDot{ display:none; }

    /* Pin click-tooltip */
    .sektion73PinClickTooltip {
      position: absolute;
      bottom: calc(100% + 10px);
      left: 50%;
      transform: translateX(-50%) translateY(6px);
      background: #fff;
      border-radius: 10px;
      padding: 8px 14px;
      box-shadow: 0 2px 12px rgba(0,0,0,.15);
      display: flex;
      align-items: center;
      gap: 8px;
      white-space: nowrap;
      pointer-events: auto;
      opacity: 0;
      transition: opacity .25s ease, transform .25s ease;
      z-index: 10;
    }
    .sektion73PinClickTooltip.is-visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    .sektion73PinClickTooltip::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 7px solid #fff;
    }
    .sektion73PinClickTooltipIcon {
      font-family: 'Material Symbols Outlined';
      font-size: 22px !important;
      font-weight: 400;
      color: #333;
      line-height: 1;
      width: 22px;
      height: 22px;
    }
    .sektion73PinClickTooltipText {
      font: 500 14px/1.2 'Inter','Manrope',system-ui,sans-serif;
      color: #1a1a1a;
    }
    .sektion73PinClickTooltipClose {
      position: absolute;
      top: -4px;
      right: -32px;
      width: 24px;
      height: 24px;
      border-radius: 888px;
      border: none;
      background: rgba(0,0,0,.65);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: rgba(0,0,0,.14) 0px 2px 6px;
      padding: 0;
    }
    .sektion73PinClickTooltipClose:hover { background: rgba(0,0,0,.8); }
    .sektion73PinClickTooltipClose:active { transform: translateY(1px); }
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
      <button class="sektion73ModalClose sektion73ModalCloseAbs" type="button" id="sektion73ModalCloseBtn" aria-label="Stäng">
        <svg fill="currentcolor" height="21" viewBox="0 0 1000 1000" width="21" xmlns="http://www.w3.org/2000/svg"><path d="M159 204l55-54 659 659-55 55-659-660m709 5L205 877l-55-59 664-664"></path></svg>
      </button>
      <div class="sektion73ModalLayout" role="document">
        <div class="sektion73ModalLeft">
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

            <div class="sektion73ModalIconRow" id="sektion73ModalIconRow3" style="display:none">
              <span class="sektion73ModalTitleIcon" id="sektion73ModalIcon3"></span>
              <span class="sektion73ModalTitleIconTxt" id="sektion73ModalIconTxt3"></span>
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

  document.getElementById("sektion73ModalBodyH").textContent = sektion73Pick(payload.h, "");
  document.getElementById("sektion73ModalBodyP").textContent = sektion73Pick(payload.p, "");

  const iconWrap = document.getElementById("sektion73ModalTitleIcons");

  const row1 = document.getElementById("sektion73ModalIconRow1");
  const row2 = document.getElementById("sektion73ModalIconRow2");
  const row3 = document.getElementById("sektion73ModalIconRow3");

  const icon1 = document.getElementById("sektion73ModalIcon1");
  const icon2 = document.getElementById("sektion73ModalIcon2");
  const icon3 = document.getElementById("sektion73ModalIcon3");

  const txt1 = document.getElementById("sektion73ModalIconTxt1");
  const txt2 = document.getElementById("sektion73ModalIconTxt2");
  const txt3 = document.getElementById("sektion73ModalIconTxt3");

  const iconItems = (payload && payload.iconItems && Array.isArray(payload.iconItems)) ? payload.iconItems : [];
  const legacyIcons = (payload && payload.icons && Array.isArray(payload.icons)) ? payload.icons : [];
  const legacyTexts = (payload && payload.iconTexts && Array.isArray(payload.iconTexts)) ? payload.iconTexts : [];

  const i1 = iconItems[0] || null;
  const i2 = iconItems[1] || null;
  const i3 = iconItems[2] || null;

  const svg1 = (i1 && i1.svg != null) ? i1.svg : (legacyIcons[0] || "");
  const svg2 = (i2 && i2.svg != null) ? i2.svg : (legacyIcons[1] || "");
  const svg3 = (i3 && i3.svg != null) ? i3.svg : (legacyIcons[2] || "");

  const t1 = (i1 && i1.text != null) ? sektion73Pick(i1.text, "") : sektion73Pick(legacyTexts[0], "");
  const t2 = (i2 && i2.text != null) ? sektion73Pick(i2.text, "") : sektion73Pick(legacyTexts[1], "");
  const t3 = (i3 && i3.text != null) ? sektion73Pick(i3.text, "") : sektion73Pick(legacyTexts[2], "");

  if (icon1) icon1.innerHTML = svg1 || "";
  if (icon2) icon2.innerHTML = svg2 || "";
  if (icon3) icon3.innerHTML = svg3 || "";

  if (txt1) txt1.textContent = t1 || "";
  if (txt2) txt2.textContent = t2 || "";
  if (txt3) txt3.textContent = t3 || "";

  const hasRow1 = Boolean((svg1 && String(svg1).trim()) || (t1 && String(t1).trim()));
  const hasRow2 = Boolean((svg2 && String(svg2).trim()) || (t2 && String(t2).trim()));
  const hasRow3 = Boolean((svg3 && String(svg3).trim()) || (t3 && String(t3).trim()));
  const hasAny = Boolean(hasRow1 || hasRow2 || hasRow3);

  if (row1) row1.style.display = hasRow1 ? "flex" : "none";
  if (row2) row2.style.display = hasRow2 ? "flex" : "none";
  if (row3) row3.style.display = hasRow3 ? "flex" : "none";
  if (iconWrap) iconWrap.style.display = hasAny ? "" : "none";

  const pWrap = document.getElementById("sektion73ModalBodyPWrap");
  const rmBtn = document.getElementById("sektion73ModalReadMoreBtn");
  if (pWrap) pWrap.classList.add("is-expanded");
  if (rmBtn) rmBtn.style.display = "none";

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

  const cta1Str = sektion73Pick(payload.cta1Text, "");
  const cta2Str = sektion73Pick(payload.cta2Text, "");
  const hasCta1 = Boolean(cta1Str && cta1Str.trim());
  const hasCta2 = Boolean(cta2Str && cta2Str.trim());
  const hasAnyCta = Boolean(hasCta1 || hasCta2);

  if (cta1t) cta1t.textContent = cta1Str;
  if (cta2t) cta2t.textContent = cta2Str;

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

var sektion73ModalOpenedWithoutZoom = false;

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

if (sektion73ModalOpenedWithoutZoom) {
  sektion73ModalOpenedWithoutZoom = false;
  return;
}

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
  labelText: "101",
  lngLat: [12.26197312396269, 57.08162693545353],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 101", en: "Beach House 101", de: "Strandhaus 101" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    iconItems: [
      {
        svg: '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
        text: { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" }
      },
      {
        svg: '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>',
        text: { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
      }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00002",
  label: "Pin 2",
  labelText: "102",
  lngLat: [12.262082176983768, 57.081600917569034],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 102", en: "Beach House 102", de: "Strandhaus 102" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00003",
  label: "Pin 3",
  labelText: "103",
  lngLat: [12.262318128134382, 57.08166527756367],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 103", en: "Beach House 103", de: "Strandhaus 103" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00004",
  label: "Pin 4",
  labelText: "104",
  lngLat: [12.262428503055986, 57.081637688307154],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 104", en: "Beach House 104", de: "Strandhaus 104" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00005",
  label: "Pin 5",
  labelText: "105",
  lngLat: [12.26266048860353, 57.08170492165513],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 105", en: "Beach House 105", de: "Strandhaus 105" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00006",
  label: "Pin 6",
  labelText: "106",
  lngLat: [12.262768219804656, 57.08167948749295],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 106", en: "Beach House 106", de: "Strandhaus 106" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00007",
  label: "Pin 7",
  labelText: "107",
  lngLat: [12.26300152723178, 57.081747439114935],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 107", en: "Beach House 107", de: "Strandhaus 107" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
     '<span class="material-symbols-outlined" style="font-size:22px">pet_supplies</span>',
            '<span class="material-symbols-outlined" style="font-size:22px">accessible</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Djurvänlig", en: "Pet friendly", de: "Tierfreundlich" },
      { sv: "Funktionsanpassade", en: "Accessible", de: "Barrierefrei" }     
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00008",
  label: "Pin 9",
  labelText: "108",
  lngLat: [12.263106614727718, 57.081720568270754],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 108", en: "Beach House 108", de: "Strandhaus 108" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
           '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
     '<span class="material-symbols-outlined" style="font-size:22px">pet_supplies</span>',
            '<span class="material-symbols-outlined" style="font-size:22px">accessible</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Djurvänlig", en: "Pet friendly", de: "Tierfreundlich" },
      { sv: "Funktionsanpassade", en: "Accessible", de: "Barrierefrei" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00009",
  label: "Pin 9",
  labelText: "109",
  lngLat: [12.262194869335389, 57.08127715798125],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 109", en: "Beach House 109", de: "Strandhaus 109" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00010",
  label: "Pin 11",
  labelText: "110",
  lngLat: [12.262270876009751, 57.081331461506295],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
    h: { sv: "Strandhus 110", en: "Beach House 110", de: "Strandhaus 110" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00011",
  label: "Pin 12",
  labelText: "111",
  lngLat: [12.262477746343166, 57.08131249231994],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 111", en: "Beach House 111", de: "Strandhaus 111" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00012",
  label: "Pin 13",
  labelText: "112",
  lngLat: [12.262555074877127, 57.081368232510044],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 112", en: "Beach House 112", de: "Strandhaus 112" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
       { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00013",
  label: "Pin 14",
  labelText: "113",
  lngLat: [12.262769876313968, 57.08134782663265],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 113", en: "Beach House 113", de: "Strandhaus 113" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00014",
  label: "Pin 15",
  labelText: "114",
  lngLat: [12.262845536788006, 57.081402712344186],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 114", en: "Beach House 114", de: "Strandhaus 114" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00015",
  label: "Pin 16",
  labelText: "115",
  lngLat: [12.263068269369796, 57.08138589827087],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 115", en: "Beach House 115", de: "Strandhaus 115" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
           '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
     '<span class="material-symbols-outlined" style="font-size:22px">pet_supplies</span>',
            '<span class="material-symbols-outlined" style="font-size:22px">accessible</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Djurvänlig", en: "Pet friendly", de: "Tierfreundlich" },
      { sv: "Funktionsanpassade", en: "Accessible", de: "Barrierefrei" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00016",
  label: "Pin 17",
  labelText: "116",
  lngLat: [12.263144276036485, 57.08143589149515],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 116", en: "Beach House 116", de: "Strandhaus 116" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
           '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
     '<span class="material-symbols-outlined" style="font-size:22px">pet_supplies</span>',
            '<span class="material-symbols-outlined" style="font-size:22px">accessible</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Djurvänlig", en: "Pet friendly", de: "Tierfreundlich" },
      { sv: "Funktionsanpassade", en: "Accessible", de: "Barrierefrei" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00017",
  label: "Pin 18",
  labelText: "117",
  lngLat: [12.262463879109788, 57.08101975420533],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 117", en: "Beach House 117", de: "Strandhaus 117" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00018",
  label: "Pin 19",
  labelText: "118",
  lngLat: [12.262570288438837, 57.08098569917749],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 118", en: "Beach House 118", de: "Strandhaus 118" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00019",
  label: "Pin 20",
  labelText: "119",
  lngLat: [12.262750721669505, 57.08105293370133],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 119", en: "Beach House 119", de: "Strandhaus 119" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00020",
  label: "Pin 21",
  labelText: "120",
  lngLat: [12.262854487289673, 57.08102103379619],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 120", en: "Beach House 120", de: "Strandhaus 120" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00021",
  label: "Pin 22",
  labelText: "121",
  lngLat: [12.263044173496866, 57.08108754989141],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 121", en: "Beach House 121", de: "Strandhaus 121" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00022",
  label: "Pin 23",
  labelText: "122",
  lngLat: [12.263142651741532, 57.08105636837058],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#A88867" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 122", en: "Beach House 122", de: "Strandhaus 122" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Morgonsol", en: "Morning sun", de: "Morgensonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00023",
  label: "Pin 24",
  labelText: "123",
  lngLat: [12.263333659783598, 57.08112001095327],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 123", en: "Beach House 123", de: "Strandhaus 123" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
           '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
     '<span class="material-symbols-outlined" style="font-size:22px">pet_supplies</span>',
            '<span class="material-symbols-outlined" style="font-size:22px">accessible</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Djurvänlig", en: "Pet friendly", de: "Tierfreundlich" },
      { sv: "Funktionsanpassade", en: "Accessible", de: "Barrierefrei" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00024",
  label: "Pin 25",
  labelText: "124",
  lngLat: [12.263433459837302, 57.081090266196355],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 124", en: "Beach House 124", de: "Strandhaus 124" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
           '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
     '<span class="material-symbols-outlined" style="font-size:22px">pet_supplies</span>',
            '<span class="material-symbols-outlined" style="font-size:22px">accessible</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Djurvänlig", en: "Pet friendly", de: "Tierfreundlich" },
      { sv: "Funktionsanpassade", en: "Accessible", de: "Barrierefrei" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00025",
  label: "Pin 26",
  labelText: "125",
  lngLat: [12.262675279675818, 57.080665309036135],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 125", en: "Beach House 125", de: "Strandhaus 125" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
       { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00026",
  label: "Pin 27",
  labelText: "126",
  lngLat: [12.262745995033498, 57.08071961344976],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 126", en: "Beach House 126", de: "Strandhaus 126" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
       { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00027",
  label: "Pin 28",
  labelText: "127",
  lngLat: [12.26301367068126, 57.08070064395787],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 127", en: "Beach House 127", de: "Strandhaus 127" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
       { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00028",
  label: "Pin 29",
  labelText: "128",
  lngLat: [12.263080424389472, 57.08075782180549],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 128", en: "Beach House 128", de: "Strandhaus 128" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
       { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00029",
  label: "Pin 30",
  labelText: "129",
  lngLat: [12.263353387445193, 57.080743162558974],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 129", en: "Beach House 129", de: "Strandhaus 129" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
       { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00030",
  label: "Pin 31",
  labelText: "130",
  lngLat: [12.263421462996916, 57.08080105871713],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#446D74" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 130", en: "Beach House 130", de: "Strandhaus 130" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
      '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
      '<span class="material-symbols-outlined" style="font-size:22px">sunny</span>'
    ],
    iconTexts: [
       { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Kvällssol", en: "Evening sun", de: "Abendsonne" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00031",
  label: "Pin 32",
  labelText: "131",
  lngLat: [12.263694426079951, 57.08078208926068],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 131", en: "Beach House 131", de: "Strandhaus 131" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
           '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
     '<span class="material-symbols-outlined" style="font-size:22px">pet_supplies</span>',
            '<span class="material-symbols-outlined" style="font-size:22px">accessible</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Djurvänlig", en: "Pet friendly", de: "Tierfreundlich" },
      { sv: "Funktionsanpassade", en: "Accessible", de: "Barrierefrei" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00032",
  label: "Pin 33",
  labelText: "132",
  lngLat: [12.263763823459442, 57.080838548618544],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#7A936B" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769800477/jpeg-optimizer_ApelvikStrand_0356_1_llpb1s.jpg",
    h: { sv: "Strandhus 132", en: "Beach House 132", de: "Strandhaus 132" },
    p: { sv: "Bo precis vid havet i Apelviken, i ett av våra strandhus. Här bor du med stranden alldeles intill och med plats att vara på under hela dagen. Egen dörr, egen uteplats och ett boende som fungerar lika bra mellan strandpassen som på kvällen.", en: "Stay right by the sea in Apelviken, in one of our beach houses. Here you live with the beach right next to you and room to spend the whole day. Your own door, your own terrace, and accommodation that works just as well between beach visits as in the evening.", de: "Wohnen Sie direkt am Meer in Apelviken, in einem unserer Strandhäuser. Hier wohnen Sie mit dem Strand direkt nebenan und haben Platz für den ganzen Tag. Eigene Tür, eigene Terrasse und eine Unterkunft, die zwischen den Strandbesuchen genauso gut funktioniert wie am Abend." },
    icons: [
           '<span class="material-symbols-outlined" style="font-size:22px">group</span>',
     '<span class="material-symbols-outlined" style="font-size:22px">pet_supplies</span>',
            '<span class="material-symbols-outlined" style="font-size:22px">accessible</span>'
    ],
    iconTexts: [
      { sv: "4 vuxna & 2 barn", en: "4 adults & 2 children", de: "4 Erwachsene & 2 Kinder" },
      { sv: "Djurvänlig", en: "Pet friendly", de: "Tierfreundlich" },
      { sv: "Funktionsanpassade", en: "Accessible", de: "Barrierefrei" }
    ],
    images: ["", "", "", ""],
    cta1Text: { sv: "Vägbeskrivning", en: "Get directions", de: "Wegbeschreibung" },
    cta1Href: "https://www.google.com/maps/dir/?api=1&destination=ApelvikStrand,+Surbrunnsv%C3%A4gen+2-8,+432+53+Varberg",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00033",
  label: "Pin 33",
  labelText: "133",
  lngLat: [12.264008, 57.081161],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#88706A", textOnly: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 133", en: "Beach Apartment 133", de: "Strandwohnung 133" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00034",
  label: "Pin 34",
  labelText: "134",
  lngLat: [12.264060, 57.081175],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#88706A", textOnly: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 134", en: "Beach Apartment 134", de: "Strandwohnung 134" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00035",
  label: "Pin 35",
  labelText: "135",
  lngLat: [12.264130, 57.081195],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#88706A", textOnly: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 135", en: "Beach Apartment 135", de: "Strandwohnung 135" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00036",
  label: "Pin 36",
  labelText: "136",
  lngLat: [12.264200, 57.081215],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#88706A", textOnly: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 136", en: "Beach Apartment 136", de: "Strandwohnung 136" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00037",
  label: "Pin 37",
  labelText: "137",
  lngLat: [12.264319, 57.081139],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#88706A", textOnly: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 137", en: "Beach Apartment 137", de: "Strandwohnung 137" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00038",
  label: "Pin 38",
  labelText: "138",
  lngLat: [12.264372, 57.081152],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#88706A", textOnly: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 138", en: "Beach Apartment 138", de: "Strandwohnung 138" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00039",
  label: "Pin 39",
  labelText: "139",
  lngLat: [12.264424, 57.081166],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#88706A", textOnly: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 139", en: "Beach Apartment 139", de: "Strandwohnung 139" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00040",
  label: "Pin 40",
  labelText: "140",
  lngLat: [12.264477, 57.081179],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#9E8CA0", textOnly: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 140", en: "Beach Apartment 140", de: "Strandwohnung 140" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00041",
  label: "Pin 41",
  labelText: "141",
  lngLat: [12.264530, 57.081192],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#9E8CA0", textOnly: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 141", en: "Beach Apartment 141", de: "Strandwohnung 141" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_00042",
  label: "Pin 42",
  labelText: "142",
  lngLat: [12.264281, 57.080851],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#9E8CA0", textOnly: true, rotate: "37deg" },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/f_auto,q_auto,dpr_auto,c_limit,w_1440/v1771931935/jpeg-optimizer_IMG_1406_qo03oc.jpg",
    h: { sv: "Strandlägenhet 142", en: "Beach Apartment 142", de: "Strandwohnung 142" },
    p: { sv: "Varje strandlägenhet är 21 m² och utformad som compact living, där allt ryms på en sammanhållen yta. Här finns kombinerat vardagsrum, sovalkov och kokvrå samt eget badrum. Planlösningen är gjord för att fungera under dagen – inte bara för natten. Du har egen dörr och egen uteplats, med stranden på nära avstånd. Ett boende att använda mellan strandbesök, måltider och vila.", en: "Each beach apartment is 21 m² and designed as compact living, where everything fits in a cohesive space. Here you find a combined living room, sleeping alcove and kitchenette as well as your own bathroom. The layout is made to work during the day – not just at night. You have your own door and terrace, with the beach close by. Accommodation to use between beach visits, meals and rest.", de: "Jede Strandwohnung ist 21 m² groß und als Compact Living gestaltet, wo alles auf einer zusammenhängenden Fläche Platz findet. Hier gibt es kombiniertes Wohnzimmer, Schlafnische und Kochnische sowie ein eigenes Badezimmer. Der Grundriss ist für den Tag gemacht – nicht nur für die Nacht. Sie haben eine eigene Tür und Terrasse, mit dem Strand in der Nähe. Eine Unterkunft für die Zeit zwischen Strandbesuchen, Mahlzeiten und Erholung." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: "",
    cta1Href: "",
    cta2Text: "",
    cta2Href: ""
  }
},
{
  id: "sektion73Pin_parking_01",
  label: "Parkering",
  labelText: "P",
  lngLat: [12.263736, 57.081588],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#303030", fontWeight: "700", fontSize: "15px", padding: "4px" },
  modal: null,
  tooltip: { icon: "parking_sign", text: { sv: "Parkering", en: "Parking", de: "Parkplatz" } }
},
{
  id: "sektion73Pin_parking_02",
  label: "Parkering",
  labelText: "P",
  lngLat: [12.264089, 57.080993],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#303030", fontWeight: "700", fontSize: "15px", padding: "4px" },
  modal: null,
  tooltip: { icon: "parking_sign", text: { sv: "Parkering", en: "Parking", de: "Parkplatz" } }
},
{
  id: "sektion73Pin_heat_01",
  label: "Värme",
  labelText: "mode_heat",
  lngLat: [12.263460, 57.081340],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#303030", iconFont: true, iconFill: true },
  modal: null,
  tooltip: { icon: "outdoor_grill", text: { sv: "Grillplats", en: "Barbecue area", de: "Grillplatz" } }
},
{
  id: "sektion73Pin_playground_01",
  label: "Lekplats",
  labelText: "playground",
  lngLat: [12.264341, 57.081031],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#303030", iconFont: true, iconFill: true },
  modal: null,
  tooltip: { icon: "playground_2", text: { sv: "Lekplats", en: "Playground", de: "Spielplatz" } }
},
{
  id: "sektion73Pin_recycling_01",
  label: "Återvinning",
  labelText: "recycling",
  lngLat: [12.26438, 57.081438],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#303030", iconFont: true, iconFill: true },
  modal: null,
  tooltip: { icon: "delete", text: { sv: "Soprum", en: "Waste room", de: "Müllraum" } }
},
{
  id: "sektion73Pin_reception_01",
  label: "Reception",
  labelText: "Reception",
  lngLat: [12.247868, 57.087934],
  filter: "",
  priority: "priority",
  ui: { bubbleBg: "#222", tooltip: true, noZoom: true },
  modal: {
    imgSrc: "https://res.cloudinary.com/dmgmoisae/image/upload/v1770067031/original_ao0xjw.png",
    h: { sv: "Vår reception", en: "Our reception", de: "Unsere Rezeption" },
    p: { sv: "Receptionen finns här om något dyker upp under vistelsen. Frågor, funderingar eller bara ett behov av att få lite hjälp på vägen. Här får man tips om området, praktiska svar och hjälp med det som behövs. Aktuella öppettider hittar du via länken nedan.", en: "Reception is here if anything comes up during your stay. Questions, thoughts or simply a need for a bit of help along the way. You will get local tips, practical answers and assistance with what you need. Current opening hours can be found via the link below.", de: "Die Rezeption ist da, wenn während des Aufenthalts etwas auftaucht – Fragen, Anliegen oder einfach der Bedarf an ein wenig Hilfe. Hier gibt es Tipps zur Umgebung, praktische Antworten und Unterstützung bei dem, was man braucht. Die aktuellen Öffnungszeiten findest du über den Link unten." },
    noReadMore: true,
    icons: [],
    iconTexts: [],
    images: ["", "", "", ""],
    cta1Text: { sv: "Ring oss", en: "Call us", de: "Rufen Sie uns an" },
    cta1Href: "tel:034086828",
    cta2Text: { sv: "Se öppettider", en: "See opening hours", de: "Öffnungszeiten" },
    cta2Href: "/kundservice"
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

  // Tooltip-stil
  if (pin.ui && pin.ui.tooltip) wrap.classList.add("sektion73PinTooltip");
  // Text-only stil (ingen bubbla, bara text)
  if (pin.ui && pin.ui.textOnly) wrap.classList.add("sektion73PinTextOnly");
  // Per-pin rotation override
  if (pin.ui && pin.ui.rotate) wrap.style.setProperty("--sektion73-pin-rotate", pin.ui.rotate);

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "sektion73PinBubble sektion73PinBtn";
  btn.setAttribute("aria-label", String(pin.label || ""));

  const txt = document.createElement("span");
  txt.className = "sektion73PinText";
  if (pin.ui && pin.ui.iconFont) {
    txt.classList.add("material-symbols-outlined");
    txt.style.fontFamily = "'Material Symbols Outlined'";
    txt.style.fontSize = "26px";
    if (pin.ui.iconOnly !== false) wrap.classList.add("sektion73PinIconOnly");
    if (pin.ui.iconColor) txt.style.color = pin.ui.iconColor;
    if (pin.ui.iconFill) txt.style.fontVariationSettings = "'FILL' 1";
  }
  if (pin.ui && pin.ui.fontSize) txt.style.fontSize = pin.ui.fontSize;
  if (pin.ui && pin.ui.fontWeight) txt.style.fontWeight = pin.ui.fontWeight;
  if (pin.ui && pin.ui.padding) btn.style.padding = pin.ui.padding;
  txt.textContent = String(pin.labelText || "");
  txt.setAttribute("aria-hidden", "true");

  btn.appendChild(txt);
  wrap.appendChild(btn);

  // micro hover (behåll neutral, ingen layout-shift) — skip for text-only
  if (!(pin.ui && pin.ui.textOnly)) {
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "translateY(0px)";
      btn.style.boxShadow = "";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translateY(0)";
      btn.style.boxShadow = "";
    });
  }

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

/* --- Pin click-tooltip --- */

let sektion73ActiveTooltipEl = null;
let sektion73ActiveTooltipPinId = null;

function sektion73ClosePinTooltip() {
  if (sektion73ActiveTooltipEl) {
    sektion73ActiveTooltipEl.classList.remove("is-visible");
    const el = sektion73ActiveTooltipEl;
    setTimeout(() => { el.remove(); }, 300);
    sektion73ActiveTooltipEl = null;
    sektion73ActiveTooltipPinId = null;
  }
}

function sektion73ShowPinTooltip(pin, wrapEl) {
  // Stäng ev. öppen tooltip
  const wasOpen = sektion73ActiveTooltipPinId === pin.id;
  sektion73ClosePinTooltip();
  if (wasOpen) return; // toggle off

  // Zooma in (samma logik som modal-pins)
  const targetZoom = Math.min(sektion73PinZoom, sektion73MaxZoom);
  const currentZoom = sektion73Map.getZoom();
  const zoomDelta = Math.abs(targetZoom - currentZoom);
  const zoomDeltaNorm = Math.min(1, zoomDelta / 4.2);
  const dur = sektion73PinZoomDur + Math.round(zoomDeltaNorm * sektion73PinZoomDurExtraMax);
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  sektion73Map.easeTo({
    center: pin.lngLat,
    zoom: targetZoom,
    pitch: sektion73Pitch,
    bearing: sektion73Bearing,
    duration: dur,
    easing: ease
  });

  // Skapa tooltip-element
  const tt = document.createElement("div");
  tt.className = "sektion73PinClickTooltip";
  tt.innerHTML =
    '<span class="sektion73PinClickTooltipIcon material-symbols-outlined">' + (pin.tooltip.icon || "") + '</span>' +
    '<span class="sektion73PinClickTooltipText">' + sektion73Pick(pin.tooltip.text, "") + '</span>' +
    '<button type="button" class="sektion73PinClickTooltipClose" aria-label="Stäng">' +
      '<svg fill="currentcolor" height="12" viewBox="0 0 1000 1000" width="12" xmlns="http://www.w3.org/2000/svg"><path d="M159 204l55-54 659 659-55 55-659-660m709 5L205 877l-55-59 664-664"></path></svg>' +
    '</button>';

  // Close-knapp
  tt.querySelector(".sektion73PinClickTooltipClose").addEventListener("click", (e) => {
    e.stopPropagation();
    sektion73ClosePinTooltip();
  });

  wrapEl.appendChild(tt);
  sektion73ActiveTooltipEl = tt;
  sektion73ActiveTooltipPinId = pin.id;

  // Fade in efter zoom startar
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      tt.classList.add("is-visible");
    });
  });

  // Stäng vid klick utanför
  const closeOnClick = (e) => {
    if (!wrapEl.contains(e.target)) {
      sektion73ClosePinTooltip();
      document.removeEventListener("click", closeOnClick, true);
    }
  };
  setTimeout(() => {
    document.addEventListener("click", closeOnClick, true);
  }, 50);
}

 function sektion73AddPin(pin) {
  const { wrap, btn } = sektion73CreatePinEl(pin);

  btn.addEventListener("click", () => {
    // Tooltip-pin (ingen modal)
    if (!pin.modal && pin.tooltip) {
      sektion73ShowPinTooltip(pin, wrap);
      return;
    }
    if (!pin.modal) return;           // inget modal-data → bara markör
    // används av filter för att kunna stänga modal om pin filtreras bort
    window.__sektion73LastOpenedPinId = pin.id;

    if (pin.ui && pin.ui.noZoom) {
      sektion73ModalOpenedWithoutZoom = true;
      sektion73OpenModal(pin.modal);
    } else {
      sektion73ModalOpenedWithoutZoom = false;
      sektion73ZoomToPinThenOpenModal(pin);
    }
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
       ROUTE ANIMATION ENGINE v2
       Google Maps-level animated route navigation.
       - Real road via Mapbox Directions API (with distance + duration)
       - Camera follows with dynamic bearing (look-ahead), pitch ramp, zoom transitions
       - Line with casing + pulsing head dot
       - 3-phase flow: overview → animate → arrive
       - Scalable: add routes to sektion73Routes[]
       ========================= */

    const sektion73Routes = [
      {
        id: "route_to_reception",
        from: sektion73Home.lngLat,
        to: [12.247868, 57.087934],
        btnText: { sv: "Hitta receptionen", en: "Find reception", de: "Rezeption finden" },
        btnIcon: "route",
        profile: "driving",
        line: {
          color: "#F0A500",
          casingColor: "rgba(240,165,0,.18)",
          width: 4.5,
          casingWidth: 11,
          opacity: 1
        },
        driving: {
          profile: "walking",
          line: {
            color: "#336aea",
            casingColor: "rgba(51,106,234,.14)",
            width: 4,
            casingWidth: 10,
            opacity: 1,
            dasharray: [2, 3]
          },
          divergeThresholdM: 4
        },
        anim: {
          durationMs: 5000,
          overviewPause: 800,
          arriveZoom: 17.2,
          arriveDur: 1400,
          pitchStart: 40,
          pitchCruise: 58,
          pitchArrive: 50,
          zoomCruise: 16.8,
          lookAheadMeters: 60
        }
      }
    ];

    /* --- Geo helpers --- */

    function sektion73Haversine(a, b) {
      const R = 6371e3;
      const toR = (d) => d * Math.PI / 180;
      const dLat = toR(b[1] - a[1]);
      const dLng = toR(b[0] - a[0]);
      const s = Math.sin(dLat / 2) ** 2 +
        Math.cos(toR(a[1])) * Math.cos(toR(b[1])) * Math.sin(dLng / 2) ** 2;
      return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
    }

    function sektion73MeasureRoute(coords) {
      const d = [0];
      for (let i = 1; i < coords.length; i++)
        d.push(d[i - 1] + sektion73Haversine(coords[i - 1], coords[i]));
      return d;
    }

    function sektion73PointAt(coords, dists, m) {
      if (m <= 0) return coords[0];
      if (m >= dists[dists.length - 1]) return coords[coords.length - 1];
      for (let i = 1; i < dists.length; i++) {
        if (dists[i] >= m) {
          const seg = dists[i] - dists[i - 1];
          const t = seg > 0 ? (m - dists[i - 1]) / seg : 0;
          return [
            coords[i - 1][0] + (coords[i][0] - coords[i - 1][0]) * t,
            coords[i - 1][1] + (coords[i][1] - coords[i - 1][1]) * t
          ];
        }
      }
      return coords[coords.length - 1];
    }

    function sektion73SliceRoute(coords, dists, m) {
      const r = [];
      for (let i = 0; i < coords.length; i++) {
        if (dists[i] <= m) { r.push(coords[i]); }
        else { r.push(sektion73PointAt(coords, dists, m)); break; }
      }
      return r;
    }

    function sektion73CalcBearing(a, b) {
      const toR = (d) => d * Math.PI / 180;
      const dLng = toR(b[0] - a[0]);
      const y = Math.sin(dLng) * Math.cos(toR(b[1]));
      const x = Math.cos(toR(a[1])) * Math.sin(toR(b[1])) -
        Math.sin(toR(a[1])) * Math.cos(toR(b[1])) * Math.cos(dLng);
      return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
    }

    // Smooth ease: slow start (15%), cruise (55%), slow end (30%)
    function sektion73RouteEase(t) {
      if (t < 0.15) {
        const s = t / 0.15;
        return 0.15 * (s * s * s);
      } else if (t < 0.70) {
        return 0.15 + (t - 0.15) * (0.70 / 0.55);
      } else {
        const s = (t - 0.70) / 0.30;
        const inv = 1 - s;
        return 0.85 + 0.15 * (1 - inv * inv * inv);
      }
    }

    function sektion73Lerp(a, b, t) { return a + (b - a) * t; }

    // Find where two routes diverge (returns index on primary route coords)
    // Strategy: first find where routes become close (shared segment start),
    // then find where they stop being close (diverge point).
    // This handles Mapbox snapping driving/walking to different start points.
    function sektion73FindDivergeIndex(walkCoords, driveCoords, thresholdM) {
      const threshold = thresholdM || 30;

      function closestDist(pt) {
        let min = Infinity;
        for (let j = 0; j < driveCoords.length; j++) {
          const d = sektion73Haversine(pt, driveCoords[j]);
          if (d < min) min = d;
        }
        return min;
      }

      // Phase 1: find where routes first become close (shared segment begins)
      let sharedStart = -1;
      for (let i = 0; i < walkCoords.length; i++) {
        if (closestDist(walkCoords[i]) <= threshold) {
          sharedStart = i;
          break;
        }
      }
      // Routes never get close — show driving from very start
      if (sharedStart === -1) return 0;

      // Phase 2: from shared start, find where they stop being close (diverge)
      let lastClose = sharedStart;
      for (let i = sharedStart; i < walkCoords.length; i++) {
        if (closestDist(walkCoords[i]) <= threshold) {
          lastClose = i;
        } else {
          // Require 3+ consecutive far points to confirm real diverge
          let farCount = 0;
          for (let k = i; k < Math.min(i + 3, walkCoords.length); k++) {
            if (closestDist(walkCoords[k]) > threshold) farCount++;
          }
          if (farCount >= 3) return lastClose;
        }
      }
      return walkCoords.length - 1; // never diverge
    }

    // Extract secondary route segment (from diverge point to destination)
    function sektion73GetDrivingBranch(driveCoords, divergePoint, thresholdM) {
      const threshold = thresholdM || 30;
      // Find the closest point on the driving route to the diverge point
      let bestIdx = 0;
      let bestDist = Infinity;
      for (let i = 0; i < driveCoords.length; i++) {
        const d = sektion73Haversine(divergePoint, driveCoords[i]);
        if (d < bestDist) { bestDist = d; bestIdx = i; }
      }
      // Return from diverge point onwards (prepend the exact diverge point for seamless join)
      const branch = [divergePoint].concat(driveCoords.slice(bestIdx));
      return branch;
    }

    function sektion73FormatDist(m) {
      return m >= 1000
        ? (m / 1000).toFixed(1).replace(".", ",") + " km"
        : Math.round(m) + " m";
    }

    function sektion73FormatTime(sec) {
      const m = Math.ceil(sec / 60);
      return m + " min";
    }

    /* --- Directions API --- */

    async function sektion73FetchRoute(from, to, profile) {
      const url =
        "https://api.mapbox.com/directions/v5/mapbox/" + (profile || "walking") + "/" +
        from[0] + "," + from[1] + ";" + to[0] + "," + to[1] +
        "?geometries=geojson&overview=full&access_token=" + mapboxgl.accessToken;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Directions API " + res.status);
      const json = await res.json();
      if (!json.routes || !json.routes.length) throw new Error("Ingen rutt hittad");
      const route = json.routes[0];
      return {
        coords: route.geometry.coordinates,
        distanceM: route.distance,
        durationS: route.duration
      };
    }

    /* --- Pulsing head dot (Mapbox marker) --- */

    function sektion73CreateHeadDot(colorClass) {
      const el = document.createElement("div");
      el.className = "sektion73RouteHeadDot" + (colorClass ? " " + colorClass : "");
      return new mapboxgl.Marker({ element: el, anchor: "center" });
    }

    /* --- Animationsmotor v2 --- */

    const sektion73RouteState = {};

    function sektion73AnimateRoute(routeCfg, routeData, onPhaseChange, drivingData) {
      const id = routeCfg.id;
      const srcLine = "sektion73_rsrc_" + id;
      const layerCasing = "sektion73_rcas_" + id;
      const layerLine = "sektion73_rlin_" + id;
      const a = routeCfg.anim;
      const l = routeCfg.line;
      const coords = routeData.coords;

      // Driving branch setup
      const drv = routeCfg.driving;
      let drvBranch = null, drvDists = null, drvTotalDist = 0;
      let drvDivergeDistOnWalk = 0; // distance along primary route where diverge happens
      const srcDrv = "sektion73_rsrc_drv_" + id;
      const layerDrvCasing = "sektion73_rcas_drv_" + id;
      const layerDrvLine = "sektion73_rlin_drv_" + id;

      // Avbryt pågående
      if (sektion73RouteState[id]) {
        if (sektion73RouteState[id].rafId) cancelAnimationFrame(sektion73RouteState[id].rafId);
        if (sektion73RouteState[id].dot) sektion73RouteState[id].dot.remove();
        if (sektion73RouteState[id].drvDot) sektion73RouteState[id].drvDot.remove();
        sektion73RouteState[id].running = false;
      }

      const dists = sektion73MeasureRoute(coords);
      const totalDist = dists[dists.length - 1];

      // GeoJSON source
      const emptyGJ = { type: "Feature", geometry: { type: "LineString", coordinates: [coords[0]] } };

      if (sektion73Map.getSource(srcLine)) {
        sektion73Map.getSource(srcLine).setData(emptyGJ);
      } else {
        sektion73Map.addSource(srcLine, { type: "geojson", data: emptyGJ });
      }

      // Casing layer (wide, semi-transparent)
      if (!sektion73Map.getLayer(layerCasing)) {
        sektion73Map.addLayer({
          id: layerCasing, type: "line", source: srcLine,
          paint: {
            "line-color": l.casingColor || "rgba(240,165,0,.2)",
            "line-width": l.casingWidth || 12,
            "line-opacity": 1,
          },
          layout: { "line-cap": "round", "line-join": "round" }
        });
      }

      // Main line layer
      if (!sektion73Map.getLayer(layerLine)) {
        sektion73Map.addLayer({
          id: layerLine, type: "line", source: srcLine,
          paint: {
            "line-color": l.color || "#F0A500",
            "line-width": l.width || 5,
            "line-opacity": l.opacity || 1,
          },
          layout: { "line-cap": "round", "line-join": "round" }
        });
      }

      // Driving branch: compute diverge point + branch coords (layers created lazily in tick)
      let drvDot = null;
      let drvLayersCreated = false;
      if (drv && drivingData) {
        const walkDists = sektion73MeasureRoute(coords);
        const divergeIdx = sektion73FindDivergeIndex(coords, drivingData.coords, drv.divergeThresholdM);
        const divergePoint = coords[divergeIdx];
        drvDivergeDistOnWalk = walkDists[divergeIdx];

        drvBranch = sektion73GetDrivingBranch(drivingData.coords, divergePoint, drv.divergeThresholdM);
        drvDists = sektion73MeasureRoute(drvBranch);
        drvTotalDist = drvDists[drvDists.length - 1];

        console.log("[Route] Diverge at walking index", divergeIdx,
          "dist on walk:", Math.round(drvDivergeDistOnWalk) + "m",
          "driving branch length:", Math.round(drvTotalDist) + "m");
      }

      // Head dot (primary / driving)
      const dot = sektion73CreateHeadDot();
      dot.setLngLat(coords[0]).addTo(sektion73Map);

      const state = { rafId: null, running: true, dot: dot, drvDot: drvDot };
      sektion73RouteState[id] = state;

      /* --- Phase 1: Overview (fly out to see the whole route) --- */
      if (onPhaseChange) onPhaseChange("overview");

      // Camera follows primary (driving) route only — walking branch doesn't affect bounds
      const lngs = coords.map(c => c[0]);
      const lats = coords.map(c => c[1]);
      const bounds = [
        [Math.min(...lngs), Math.min(...lats)],
        [Math.max(...lngs), Math.max(...lats)]
      ];

      sektion73Map.fitBounds(bounds, {
        padding: { top: 80, bottom: 120, left: 60, right: 60 },
        maxZoom: 15.8,
        pitch: 35,
        bearing: sektion73Bearing,
        duration: 1400,
        essential: true
      });

      /* --- Phase 2: Animate line draw (starts immediately, camera pan after zoom-out) --- */
      const duration = a.durationMs || 6000;
      const zoomOutDur = 1400;

      {
        if (onPhaseChange) onPhaseChange("animating");

        const t0 = performance.now();

        function tick(now) {
          if (!state.running) return;

          const elapsed = now - t0;
          const rawT = Math.min(elapsed / duration, 1);
          const eased = sektion73RouteEase(rawT);
          const dist = eased * totalDist;

          // Slice line
          const slice = sektion73SliceRoute(coords, dists, dist);
          sektion73Map.getSource(srcLine).setData({
            type: "Feature",
            geometry: { type: "LineString", coordinates: slice }
          });

          // Head position — move dot
          const head = slice[slice.length - 1];
          dot.setLngLat(head);

          // Walking branch: create layers + animate ONLY after driving passes diverge
          if (drvBranch && drvDists && dist >= drvDivergeDistOnWalk) {
            // Lazy-create source, layers, and dot the FIRST time we pass diverge
            if (!drvLayersCreated) {
              drvLayersCreated = true;

              const startGJ = { type: "Feature", geometry: { type: "LineString", coordinates: [drvBranch[0]] } };
              sektion73Map.addSource(srcDrv, { type: "geojson", data: startGJ });

              // Start with opacity 0, fade in via Mapbox transition
              sektion73Map.addLayer({
                id: layerDrvCasing, type: "line", source: srcDrv,
                paint: {
                  "line-color": drv.line.casingColor || "rgba(51,106,234,.14)",
                  "line-width": drv.line.casingWidth || 10,
                  "line-opacity": 0,
                  "line-opacity-transition": { duration: 500 }
                },
                layout: { "line-cap": "round", "line-join": "round" }
              });

              sektion73Map.addLayer({
                id: layerDrvLine, type: "line", source: srcDrv,
                paint: {
                  "line-color": drv.line.color || "#336aea",
                  "line-width": drv.line.width || 4,
                  "line-opacity": 0,
                  "line-opacity-transition": { duration: 500 }
                },
                layout: { "line-cap": "round", "line-join": "round" }
              });

              if (drv.line.dasharray) {
                sektion73Map.setPaintProperty(layerDrvLine, "line-dasharray", drv.line.dasharray);
              }

              // Trigger fade-in
              requestAnimationFrame(() => {
                sektion73Map.setPaintProperty(layerDrvCasing, "line-opacity", 1);
                sektion73Map.setPaintProperty(layerDrvLine, "line-opacity", drv.line.opacity || 1);
              });

              drvDot = sektion73CreateHeadDot("sektion73RouteHeadDotDrv");
              drvDot.setLngLat(drvBranch[0]).addTo(sektion73Map);
              state.drvDot = drvDot;
            }

            const drvElapsed = dist - drvDivergeDistOnWalk;
            const walkRemaining = totalDist - drvDivergeDistOnWalk;
            const drvProgress = walkRemaining > 0 ? Math.min(drvElapsed / walkRemaining, 1) : 1;
            const drvDist = drvProgress * drvTotalDist;

            const drvSlice = sektion73SliceRoute(drvBranch, drvDists, drvDist);
            sektion73Map.getSource(srcDrv).setData({
              type: "Feature",
              geometry: { type: "LineString", coordinates: drvSlice }
            });

            if (drvDot) {
              const drvHead = drvSlice[drvSlice.length - 1];
              drvDot.setLngLat(drvHead);
            }
          }

          // Smooth camera pan — only after zoom-out completes
          if (elapsed > zoomOutDur) {
            sektion73Map.easeTo({
              center: head,
              pitch: 35,
              duration: 300,
              easing: (t) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t
            });
          }

          if (rawT < 1) {
            state.rafId = requestAnimationFrame(tick);
          } else {
            /* --- Phase 3: Arrive --- */
            if (onPhaseChange) onPhaseChange("arrived");
            state.running = false;

            // Zoom out to show full route (start + destination visible)
            sektion73Map.fitBounds(bounds, {
              padding: { top: 120, bottom: 160, left: 100, right: 100 },
              maxZoom: 15.4,
              pitch: 35,
              bearing: sektion73Bearing,
              duration: a.arriveDur || 1400
            });

            // Pulse dots at arrival, fade out smoothly
            const dotEl = dot.getElement();
            if (dotEl) dotEl.classList.add("is-arrived");
            setTimeout(() => { if (dotEl) dotEl.style.opacity = "0"; }, 800);
            setTimeout(() => { dot.remove(); }, 1200);

            if (drvDot) {
              const drvDotEl = drvDot.getElement();
              if (drvDotEl) drvDotEl.classList.add("is-arrived");
              setTimeout(() => { if (drvDotEl) drvDotEl.style.opacity = "0"; }, 800);
              setTimeout(() => { drvDot.remove(); }, 1200);
            }

            // Draw complete walking branch
            if (drvBranch && drvDists) {
              sektion73Map.getSource(srcDrv).setData({
                type: "Feature",
                geometry: { type: "LineString", coordinates: drvBranch }
              });
            }

            // Legend is built into the route card — no separate legend needed
          }
        }

        state.rafId = requestAnimationFrame(tick);
      }
    }

    /* --- Route legend --- */

    function sektion73ShowRouteLegend(routeId) {
      const root = document.getElementById("sektion73MapRoot") || document.body;
      let el = document.getElementById("sektion73RouteLegend_" + routeId);
      if (!el) {
        el = document.createElement("div");
        el.id = "sektion73RouteLegend_" + routeId;
        el.className = "sektion73RouteLegend";
        el.innerHTML =
          '<div class="sektion73RouteLegendItem">' +
            '<span class="sektion73RouteLegendLine" style="background:#F0A500"></span>' +
            '<span>' + sektion73T('route.driving', 'Bilväg') + '</span>' +
          '</div>' +
          '<div class="sektion73RouteLegendItem">' +
            '<span class="sektion73RouteLegendLine sektion73RouteLegendDash"></span>' +
            '<span>' + sektion73T('route.walking', 'Gångväg') + '</span>' +
          '</div>';
        root.appendChild(el);
      }
      requestAnimationFrame(() => { el.classList.add("is-visible"); });
    }

    function sektion73RemoveRouteLegend(routeId) {
      const el = document.getElementById("sektion73RouteLegend_" + routeId);
      if (el) {
        el.classList.remove("is-visible");
        setTimeout(() => { el.remove(); }, 500);
      }
    }

    /* --- Clear route --- */

    function sektion73ClearRoute(routeId) {
      const state = sektion73RouteState[routeId];
      if (state) {
        if (state.rafId) cancelAnimationFrame(state.rafId);
        state.running = false;
        if (state.dot) state.dot.remove();
        if (state.drvDot) state.drvDot.remove();
      }

      // Walking layers
      const srcLine = "sektion73_rsrc_" + routeId;
      const layerCasing = "sektion73_rcas_" + routeId;
      const layerLine = "sektion73_rlin_" + routeId;

      if (sektion73Map.getLayer(layerLine)) sektion73Map.removeLayer(layerLine);
      if (sektion73Map.getLayer(layerCasing)) sektion73Map.removeLayer(layerCasing);
      if (sektion73Map.getSource(srcLine)) sektion73Map.removeSource(srcLine);

      // Driving layers
      const srcDrv = "sektion73_rsrc_drv_" + routeId;
      const layerDrvCasing = "sektion73_rcas_drv_" + routeId;
      const layerDrvLine = "sektion73_rlin_drv_" + routeId;

      if (sektion73Map.getLayer(layerDrvLine)) sektion73Map.removeLayer(layerDrvLine);
      if (sektion73Map.getLayer(layerDrvCasing)) sektion73Map.removeLayer(layerDrvCasing);
      if (sektion73Map.getSource(srcDrv)) sektion73Map.removeSource(srcDrv);

      // Legend
      sektion73RemoveRouteLegend(routeId);
    }

    /* --- Route UI CSS --- */

    function sektion73InjectRouteCSS() {
      const cssId = "sektion73RouteCSSv2";
      if (document.getElementById(cssId)) return;
      const style = document.createElement("style");
      style.id = cssId;
      style.textContent = `
        /* Pulsing head dot */
        .sektion73RouteHeadDot {
          width: 19px; height: 19px;
          border-radius: 50%;
          background: #F0A500;
          border: 2.5px solid #fff;
          box-shadow: 0 0 0 0 rgba(240,165,0,.4), 0 1px 6px rgba(0,0,0,.25);
          animation: sektion73DotPulse 2s ease-in-out infinite;
          pointer-events: none;
          transition: opacity .3s ease;
        }
        .sektion73RouteHeadDot.is-arrived {
          animation: sektion73DotArrive .4s ease forwards;
        }
        @keyframes sektion73DotPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(240,165,0,.35), 0 1px 6px rgba(0,0,0,.25); }
          50%     { box-shadow: 0 0 0 8px rgba(240,165,0,0), 0 1px 6px rgba(0,0,0,.25); }
        }
        @keyframes sektion73DotArrive {
          0%   { transform: scale(1); }
          50%  { transform: scale(1.4); }
          100% { transform: scale(1); }
        }

        /* Driving head dot (blue) */
        .sektion73RouteHeadDotDrv {
          background: #336aea;
          box-shadow: 0 0 0 0 rgba(51,106,234,.4), 0 1px 6px rgba(0,0,0,.25);
          animation: sektion73DotPulseDrv 2s ease-in-out infinite;
        }
        @keyframes sektion73DotPulseDrv {
          0%,100% { box-shadow: 0 0 0 0 rgba(51,106,234,.35), 0 1px 6px rgba(0,0,0,.25); }
          50%     { box-shadow: 0 0 0 8px rgba(51,106,234,0), 0 1px 6px rgba(0,0,0,.25); }
        }

        /* Route legend (appears at arrival) */
        .sektion73RouteLegend {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          background: rgba(255,255,255,.95);
          border-radius: 10px;
          padding: 10px 14px;
          box-shadow: 0 1px 4px rgba(0,0,0,.12);
          display: flex;
          flex-direction: column;
          gap: 6px;
          font: 500 12px/1.2 'Inter', 'Manrope', system-ui, sans-serif;
          color: #1a1a1a;
          opacity: 0;
          transform: translateY(-8px);
          transition: opacity .4s ease, transform .4s ease;
          pointer-events: none;
        }
        .sektion73RouteLegend.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .sektion73RouteLegendItem {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .sektion73RouteLegendLine {
          width: 20px;
          height: 3px;
          border-radius: 2px;
          flex-shrink: 0;
        }
        .sektion73RouteLegendDash {
          background: repeating-linear-gradient(90deg, #336aea 0, #336aea 5px, transparent 5px, transparent 9px);
        }

        /* Toast container */
        .sektion73Toast {
          position: absolute;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          pointer-events: none;
        }
        .sektion73Toast > * {
          pointer-events: auto;
        }

        /* Route button */
        .sektion73RouteBtn {
          position: relative;
          bottom: auto;
          left: auto;
          transform: none;
          z-index: 10;
          -webkit-appearance: none;
          appearance: none;
          border: none;
          background: #fff;
          color: #1a1a1a;
          font: 600 14px/1 'Inter', 'Manrope', system-ui, -apple-system, sans-serif;
          padding: 0.25rem 0.75rem 0.25rem 0.25rem;
          border-radius: 50px;
          cursor: pointer;
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
          transition: transform 200ms cubic-bezier(.2,.8,.2,1),
                      box-shadow 200ms ease,
                      background 150ms ease;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          overflow: hidden;
          user-select: none;
        }
        .sektion73RouteBtn:hover {
          transform: translateY(-1px);
        }
        .sektion73RouteBtn:active {
          transform: translateY(0px);
        }

        .sektion73RouteBtnIcon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2rem; height: 2rem;
          background: #FFE6A3;
          color: #5A3C00;
          font-family: 'Material Symbols Outlined';
          font-size: 20px;
          font-weight: 400;
          flex-shrink: 0;
          border-radius: 50px;
        }
        .sektion73RouteBtnBody {
          display: inline-flex;
          flex-direction: column;
          padding: 0;
          gap: 2px;
        }
        .sektion73RouteBtnLabel {
          font-size: 14px;
          font-weight: 500;
          color: #1a1a1a;
          line-height: 1.15;
          text-align: left;
        }
        .sektion73RouteBtnMeta {
          font-size: 11.5px;
          font-weight: 500;
          color: #5f6368;
          line-height: 1.15;
          text-align: left;
        }

        /* ===== Active state: route info card ===== */
        .sektion73RouteBtn.is-active {
          padding: 0;
          gap: 0;
          flex-direction: column;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0,0,0,.12), 0 0 0 1px rgba(0,0,0,.04);
          white-space: normal;
          width: 210px;
          cursor: default;
          overflow: hidden;
          animation: sektion73CardIn .35s cubic-bezier(.2,.8,.2,1) both;
        }
        @keyframes sektion73CardIn {
          from { opacity: 0; transform: translateY(12px) scale(.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .sektion73RouteBtn.is-active:hover { transform: none; }

        .sektion73RouteBtn.is-active .sektion73RouteBtnIcon,
        .sektion73RouteBtn.is-active .sektion73RouteBtnBody { display: none; }

        /* Card container */
        .sektion73RouteCard { display: none; width: 100%; }
        .sektion73RouteBtn.is-active .sektion73RouteCard {
          display: flex;
          flex-direction: column;
        }

        /* Route rows */
        .sektion73RouteCardRoutes {
          padding: 14px 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .sektion73RouteCardRow {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .sektion73RouteCardDot {
          width: 19px; height: 19px;
          border-radius: 50%;
          flex-shrink: 0;
          box-shadow: 0 0 0 3px rgba(0,0,0,.06);
        }
        .sektion73RouteCardDotDash {
          width: 19px; height: 19px;
          border-radius: 50%;
          flex-shrink: 0;
          border: 3px solid #336aea;
          background: #fff;
          box-sizing: border-box;
        }
        .sektion73RouteCardInfo {
          display: flex;
          flex-direction: column;
          gap: 1px;
          min-width: 0;
        }
        .sektion73RouteCardType {
          font: 600 11.5px/1.2 'Inter','Manrope',system-ui,sans-serif;
          color: #80868b;
          letter-spacing: .01em;
          text-transform: uppercase;
        }
        .sektion73RouteCardTime {
          font: 600 15px/1.2 'Inter','Manrope',system-ui,sans-serif;
          color: #1a1a1a;
        }
        .sektion73RouteCardDist {
          font: 600 11.5px/1.2 'Inter','Manrope',system-ui,sans-serif;
          color: #80868b;
          margin-left: auto;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .sektion73RouteCardSep {
          height: 1px;
          background: rgba(0,0,0,.06);
          margin: 0 16px;
        }

        /* Back button */
        .sektion73RouteCardBack {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 13px 16px;
          font: 600 14px/1 'Inter','Manrope',system-ui,sans-serif;
          color: #1a1a1a;
          cursor: pointer;
          transition: background .15s ease;
          width: 100%;
          background: none;
          border: none;
          border-radius: 0 0 16px 16px;
          -webkit-appearance: none;
        }
        .sektion73RouteCardBack:hover {
          background: rgba(26,115,232,.06);
        }
        .sektion73RouteCardBack:active {
          background: rgba(26,115,232,.12);
        }
        .sektion73RouteCardBackIcon {
          font-family: 'Material Symbols Outlined';
          font-size: 18px;
          font-weight: 400;
        }

        /* Loading shimmer */
        .sektion73RouteBtn.is-loading .sektion73RouteBtnLabel {
          background: linear-gradient(90deg, #ddd 25%, #f0f0f0 50%, #ddd 75%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: sektion73Shimmer 1.8s ease infinite;
        }
        @keyframes sektion73Shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `;
      document.head.appendChild(style);
    }

    /* --- Build route buttons --- */

    function sektion73BuildRouteButtons() {
      sektion73InjectRouteCSS();
      const root = document.getElementById("sektion73MapRoot") || sektion73Canvas.parentElement;

      // Toast container
      let toast = root.querySelector(".sektion73Toast");
      if (!toast) {
        toast = document.createElement("div");
        toast.className = "sektion73Toast";
        root.appendChild(toast);
      }

      sektion73Routes.forEach((route) => {
        const btn = document.createElement("div");
        btn.className = "sektion73RouteBtn";
        btn.id = "sektion73RouteBtn_" + route.id;

        // Default state (CTA pill)
        btn.innerHTML =
          '<span class="sektion73RouteBtnIcon">' + (route.btnIcon || "route") + '</span>' +
          '<span class="sektion73RouteBtnBody">' +
            '<span class="sektion73RouteBtnLabel">' + (sektion73Pick(route.btnText, sektion73T('route.showRoute', 'Visa rutt'))) + '</span>' +
            '<span class="sektion73RouteBtnMeta"></span>' +
          '</span>' +
          '<div class="sektion73RouteCard">' +
            '<div class="sektion73RouteCardRoutes">' +
              '<div class="sektion73RouteCardRow">' +
                '<span class="sektion73RouteCardDot" style="background:#F0A500"></span>' +
                '<span class="sektion73RouteCardInfo">' +
                  '<span class="sektion73RouteCardType">' + sektion73T('route.driving', 'Bilväg') + '</span>' +
                  '<span class="sektion73RouteCardTime" id="sektion73DriveTime_' + route.id + '"></span>' +
                '</span>' +
                '<span class="sektion73RouteCardDist" id="sektion73DriveDist_' + route.id + '"></span>' +
              '</div>' +
              '<div class="sektion73RouteCardRow">' +
                '<span class="sektion73RouteCardDotDash"></span>' +
                '<span class="sektion73RouteCardInfo">' +
                  '<span class="sektion73RouteCardType">' + sektion73T('route.walking', 'Gångväg') + '</span>' +
                  '<span class="sektion73RouteCardTime" id="sektion73WalkTime_' + route.id + '"></span>' +
                '</span>' +
                '<span class="sektion73RouteCardDist" id="sektion73WalkDist_' + route.id + '"></span>' +
              '</div>' +
            '</div>' +
            '<div class="sektion73RouteCardSep"></div>' +
            '<button type="button" class="sektion73RouteCardBack" id="sektion73BackBtn_' + route.id + '">' +
              '<span class="sektion73RouteCardBackIcon">arrow_back</span>' +
              '<span>' + sektion73T('route.backToMap', 'Tillbaka till kartan') + '</span>' +
            '</button>' +
          '</div>';

        const labelEl = btn.querySelector(".sektion73RouteBtnLabel");
        const metaEl = btn.querySelector(".sektion73RouteBtnMeta");
        const iconEl = btn.querySelector(".sektion73RouteBtnIcon");
        const walkTimeEl = btn.querySelector("#sektion73WalkTime_" + route.id);
        const walkDistEl = btn.querySelector("#sektion73WalkDist_" + route.id);
        const driveTimeEl = btn.querySelector("#sektion73DriveTime_" + route.id);
        const driveDistEl = btn.querySelector("#sektion73DriveDist_" + route.id);
        const backBtn = btn.querySelector("#sektion73BackBtn_" + route.id);

        let active = false;
        let cachedRoute = null;
        let cachedDriving = null;

        function closeRoute() {
          active = false;
          btn.classList.remove("is-active", "is-loading");
          labelEl.textContent = sektion73Pick(route.btnText, sektion73T('route.showRoute', 'Visa rutt'));
          iconEl.textContent = route.btnIcon || "route";
          sektion73ClearRoute(route.id);
          sektion73Map.easeTo({
            center: sektion73InitialCenter.lngLat,
            zoom: sektion73StartZoom,
            pitch: sektion73Pitch,
            bearing: 0,
            duration: 1400,
            easing: (t) => 1 - Math.pow(1 - t, 3)
          });
        }

        // Back button inside the card
        backBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          closeRoute();
        });

        // Main button click — open route
        btn.addEventListener("click", async (e) => {
          if (active) return; // card is open, use back button
          if (e.target.closest(".sektion73RouteCardBack")) return;

          btn.classList.add("is-loading");
          labelEl.textContent = sektion73T('route.fetching', 'Hämtar rutt…');
          iconEl.textContent = "sync";

          try {
            const fetches = [];
            if (!cachedRoute) fetches.push(sektion73FetchRoute(route.from, route.to, route.profile).then(r => { cachedRoute = r; }));
            if (route.driving && !cachedDriving) fetches.push(sektion73FetchRoute(route.from, route.to, route.driving.profile).then(r => { cachedDriving = r; }));
            if (fetches.length) await Promise.all(fetches);

            active = true;
            btn.classList.remove("is-loading");
            btn.classList.add("is-active");

            // Populate route card — primary is driving, secondary is walking
            driveTimeEl.textContent = sektion73FormatTime(cachedRoute.durationS);
            driveDistEl.textContent = sektion73FormatDist(cachedRoute.distanceM);
            if (cachedDriving) {
              walkTimeEl.textContent = sektion73FormatTime(cachedDriving.durationS);
              walkDistEl.textContent = sektion73FormatDist(cachedDriving.distanceM);
            }

            sektion73AnimateRoute(route, cachedRoute, (phase) => {
              // phases handled by card UI
            }, cachedDriving);
          } catch (err) {
            console.error("Route error:", err);
            btn.classList.remove("is-loading");
            labelEl.textContent = sektion73Pick(route.btnText, sektion73T('route.showRoute', 'Visa rutt'));
            iconEl.textContent = route.btnIcon || "route";
          }
        });

        toast.appendChild(btn);
      });
    }

    sektion73Map.once("idle", sektion73BuildRouteButtons);

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
