/* apelvikstrand.maps
   Apelvikstrand – Interaktiv karta (Mapbox)
   - Låst till Apelviken (maxBounds + zoom-intervall)
   - Utgår från en "home"-punkt (Surbrunnsvägen 2–8)
   - Designad upplevelse (mindre UI, låst interaktion, chips som pins)
   - 3D: pitch + bearing + 3D-byggnader (fill-extrusion) när möjligt
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
      console.error(
        "Mapbox GL JS saknas. Kontrollera att mapbox-gl.js laddas före apelvikstrand.maps"
      );
      return;
    }

    /* =========================
       CONFIG
       ========================= */

    mapboxgl.accessToken =
      "pk.eyJ1IjoicnV0Z2Vyc3NvbiIsImEiOiJjbWwzdjY5N2owcDdiM2RzZWlzaG14MWVjIn0.yMfhGXLf9xq_vzIFSJVcjA";

    const sektion73StyleUrl = "mapbox://styles/rutgersson/cml3w74bd009g01r458nuhgjn";

    // Startadress: Surbrunnsvägen 2–8, 432 53 Varberg
    // Koordinater från extern listing-källa (kan finjusteras vid behov):
    // Lat 57.08161047, Lng 12.26197766
    const sektion73Home = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.26197766, 57.08161047]
    };

    // Rimliga bounds runt Apelvikstrand/Apelviken (håll kartan "på plats")
    const sektion73Bounds = [
      [12.235, 57.070], // SW
      [12.285, 57.095]  // NE
    ];

    const sektion73MinZoom = 13.2;
    const sektion73MaxZoom = 17.6;
    const sektion73StartZoom = 14.7;

    // 3D look
    const sektion73Pitch = 55;
    const sektion73Bearing = -20;

    // Begränsa interaktion (behåll pan + pinch-zoom)
    const sektion73DisableRotate = true;

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

      // Viktigt för snygga 3D-kanter (fill-extrusion)
      antialias: true,

      pitchWithRotate: false,
      dragRotate: false
    });

    sektion73Map.on("error", (e) => {
      console.error("Mapbox error:", e && e.error ? e.error : e);
    });

    // Zoom-lås
    sektion73Map.setMinZoom(sektion73MinZoom);
    sektion73Map.setMaxZoom(sektion73MaxZoom);

    // Embedded UX
    sektion73Map.scrollZoom.disable();
    sektion73Map.doubleClickZoom.disable();

    if (sektion73DisableRotate) {
      sektion73Map.dragRotate.disable();
      sektion73Map.touchZoomRotate.disableRotation();
    }

    // Attribution (rekommenderat)
    sektion73Map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");

    /* =========================
       3D BUILDINGS HELPERS
       ========================= */

    function sektion73FindCompositeSourceId() {
      const style = sektion73Map.getStyle();
      if (!style || !style.sources) return null;
      if (style.sources.composite) return "composite";

      // fallback: hitta första vektor-källa
      const keys = Object.keys(style.sources);
      for (let i = 0; i < keys.length; i++) {
        const k = keys[i];
        const src = style.sources[k];
        if (src && src.type === "vector") return k;
      }
      return null;
    }

    function sektion73Has3DBuildingsLayer() {
      const style = sektion73Map.getStyle();
      if (!style || !style.layers) return false;
      return style.layers.some((l) => l && l.id === "sektion73-3d-buildings");
    }

    function sektion73FindFirstSymbolLayerId() {
      const style = sektion73Map.getStyle();
      if (!style || !style.layers) return null;
      for (let i = 0; i < style.layers.length; i++) {
        const l = style.layers[i];
        if (l && l.type === "symbol" && l.layout && l.layout["text-field"]) {
          return l.id;
        }
      }
      // fallback: första symbol-lagret överhuvudtaget
      for (let j = 0; j < style.layers.length; j++) {
        const l2 = style.layers[j];
        if (l2 && l2.type === "symbol") return l2.id;
      }
      return null;
    }

    function sektion73TryAdd3DBuildings() {
      // lägg inte dubbelt
      if (sektion73Has3DBuildingsLayer()) return;

      const sourceId = sektion73FindCompositeSourceId();
      if (!sourceId) {
        console.warn("Hittade ingen vector source för 3D-byggnader (composite).");
        return;
      }

      // Lägg under labels (symbol) så att text/ikoner ligger ovanpå byggnaderna
      const beforeId = sektion73FindFirstSymbolLayerId();

      // OBS: Många stilar har "building" som source-layer. Om din custom style saknar den
      // behöver du inkludera Mapbox Streets (composite) eller ett building-tileset i stilen.
      try {
        sektion73Map.addLayer(
          {
            id: "sektion73-3d-buildings",
            source: sourceId,
            "source-layer": "building",
            type: "fill-extrusion",

            // börja synas lite tidigare, och "väx in" med zoom
            minzoom: 13.5,

            // Tåligare filter: rendera alla features med height om den finns,
            // annars ge en liten default-height så du ändå ser extrusion.
            // (Detta gör att du inte blir beroende av en "extrude"-property.)
            filter: ["any", ["has", "height"], ["has", "render_height"], ["has", "min_height"]],

            paint: {
              "fill-extrusion-color": "#d9d4c8",
              "fill-extrusion-opacity": 0.88,

              "fill-extrusion-base": [
                "coalesce",
                ["to-number", ["get", "min_height"]],
                ["to-number", ["get", "render_min_height"]],
                0
              ],

              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                13.5,
                0,
                15.0,
                [
                  "coalesce",
                  ["to-number", ["get", "height"]],
                  ["to-number", ["get", "render_height"]],
                  8
                ]
              ]
            }
          },
          beforeId || undefined
        );

        // Sätt ljus för 3D (valfritt men hjälper att se "volym")
        try {
          sektion73Map.setLight({
            anchor: "viewport",
            color: "white",
            intensity: 0.45,
            position: [1.4, 210, 30]
          });
        } catch (e) {
          // äldre/olika style-implementationer kan ignorera detta
        }
      } catch (err) {
        console.warn(
          "Kunde inte lägga 3D-byggnader. Vanligaste orsaken är att stilen saknar source-layer 'building' i sin vektor-källa:",
          err
        );
      }
    }

    /* =========================
       LOAD
       ========================= */

    sektion73Map.once("load", () => {
      // 3D vy (pitch + bearing) + mjuk intro
      sektion73Map.easeTo({
        center: sektion73Home.lngLat,
        zoom: sektion73StartZoom,
        pitch: sektion73Pitch,
        bearing: sektion73Bearing,
        duration: 900
      });

      // Försök lägga 3D-byggnader
      sektion73TryAdd3DBuildings();

      // Debug
      const s = sektion73Map.getStyle();
      console.log("STYLE NAME:", s && s.name);
      console.log("STYLE ID:", s && s.id);
      console.log("LAYER COUNT:", s && s.layers ? s.layers.length : 0);
    });

    /* =========================
       PINS
       ========================= */

    const sektion73Pins = [
      {
        id: "sektion73Pin_home_0000",
        title: "Surbrunnsvägen 2–8",
        lngLat: sektion73Home.lngLat,
        payload: { type: "home" }
      },
      {
        id: "sektion73Pin_beach_0001",
        title: "Stranden",
        lngLat: [12.2398, 57.1097],
        payload: { type: "beach" }
      },
      {
        id: "sektion73Pin_reception_0002",
        title: "Reception",
        lngLat: [12.226, 57.1108],
        payload: { type: "reception" }
      }
    ];

    function sektion73CreatePinEl(pin) {
      const el = document.createElement("button");
      el.type = "button";
      el.id = pin.id;
      el.setAttribute("aria-label", pin.title);

      el.style.display = "inline-flex";
      el.style.alignItems = "center";
      el.style.gap = "10px";
      el.style.padding = "10px 12px";
      el.style.borderRadius = "999px";
      el.style.border = "1px solid rgba(0,0,0,.18)";
      el.style.background = "rgba(255,255,255,.92)";
      el.style.backdropFilter = "blur(8px)";
      el.style.boxShadow = "0 12px 28px rgba(0,0,0,.18)";
      el.style.cursor = "pointer";
      el.style.whiteSpace = "nowrap";
      el.style.font = "600 13px/1 system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif";
      el.style.color = "#0e1318";
      el.style.paddingInline = "12px";
      el.style.transform = "translateZ(0)";

      const dot = document.createElement("span");
      dot.setAttribute("aria-hidden", "true");
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.borderRadius = "999px";
      dot.style.background = "#f2b200";
      dot.style.boxShadow = "0 0 0 3px rgba(242,178,0,.20)";
      el.appendChild(dot);

      const label = document.createElement("span");
      label.textContent = pin.title;
      label.style.opacity = "0.95";
      el.appendChild(label);

      el.addEventListener("mouseenter", () => {
        el.style.transform = "translateY(-1px)";
        el.style.boxShadow = "0 16px 34px rgba(0,0,0,.20)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 12px 28px rgba(0,0,0,.18)";
      });

      el.addEventListener("click", function () {
        console.log("Pin klick:", pin.title, pin.payload);

        if (pin.payload && pin.payload.type === "home") {
          sektion73Map.easeTo({
            center: sektion73Home.lngLat,
            zoom: sektion73StartZoom,
            pitch: sektion73Pitch,
            bearing: sektion73Bearing,
            duration: 650
          });
        }
      });

      return el;
    }

    function sektion73AddPin(pin) {
      const el = sektion73CreatePinEl(pin);

      new mapboxgl.Marker({
        element: el,
        anchor: "bottom",
        offset: [0, 8]
      })
        .setLngLat(pin.lngLat)
        .addTo(sektion73Map);
    }

    sektion73Map.on("load", function () {
      sektion73Pins.forEach(sektion73AddPin);
    });

    // Debug helpers
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
