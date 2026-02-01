/* apelvikstrand.maps
   Apelvikstrand – Interaktiv karta (Mapbox)
   - Låst till Apelviken (maxBounds + zoom-intervall)
   - Utgår från en "home"-punkt
   - Mindre "google mappig": mindre UI, låst interaktion, chips som pins
   - Custom pins (modal kopplas på senare)
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

    // Public token (frontend)
    mapboxgl.accessToken =
      "pk.eyJ1IjoicnV0Z2Vyc3NvbiIsImEiOiJjbWwzdjY5N2owcDdiM2RzZWlzaG14MWVjIn0.yMfhGXLf9xq_vzIFSJVcjA";

    // ✅ NY: Publicerad style URL (Mapbox Studio)
    const sektion73StyleUrl =
      "mapbox://styles/rutgersson/cml3w74bd009g01r458nuhgjn";

    // Startpunkt (home)
    const sektion73Home = {
      title: "Apelvikstrand",
      lngLat: [12.239, 57.11]
    };

    // Begränsa till Apelviken (justera om du vill tajta till)
    // format: [ [minLng,minLat], [maxLng,maxLat] ]
    const sektion73Bounds = [
      [12.215, 57.100], // SW
      [12.260, 57.125]  // NE
    ];

    // Zoom-spann för "område-karta"
    const sektion73MinZoom = 13.2;
    const sektion73MaxZoom = 17.6;
    const sektion73StartZoom = 14.7;

    // Mer “designad” känsla: begränsa/ta bort vissa interaktioner
    const sektion73DisableRotate = true;
    const sektion73DisablePitch = false;

    /* =========================
       MAP INIT
       ========================= */

    const sektion73Map = new mapboxgl.Map({
      container: sektion73Canvas,
      style: sektion73StyleUrl,
      center: sektion73Home.lngLat,
      zoom: sektion73StartZoom,

      // Hård låsning till område
      maxBounds: sektion73Bounds,

      // Mindre UI (känns mindre “google mappig”)
      attributionControl: false,
      pitchWithRotate: false,
      dragRotate: false
    });

    // Logga tydliga fel om något i stil/tiles blockas
    sektion73Map.on("error", (e) => {
      console.error("Mapbox error:", e && e.error ? e.error : e);
    });

    // Zoom-lås
    sektion73Map.setMinZoom(sektion73MinZoom);
    sektion73Map.setMaxZoom(sektion73MaxZoom);

    // Interaktion – gör det mer “karta i UI” än “navigationskarta”
    sektion73Map.scrollZoom.disable();         // av: scroll-zoom (bra för inbäddat)
    sektion73Map.doubleClickZoom.disable();    // av: dubbelklick zoom
    if (sektion73DisableRotate) {
      sektion73Map.dragRotate.disable();
      sektion73Map.touchZoomRotate.disableRotation();
    }
// 3D-look (lutning + lätt rotation)
sektion73Map.setPitch(55);
sektion73Map.setBearing(-20);

    // Lägg tillbaka en kompakt attribution i hörn (REKOMMENDERAT för compliance)
    // Om du verkligen vill dölja: kommentera bort.
    sektion73Map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");

  sektion73Map.once("load", () => {
  sektion73Map.easeTo({
    center: sektion73Home.lngLat,
    zoom: sektion73StartZoom,
    pitch: 55,
    bearing: -20,
    duration: 900
  });

  const s = sektion73Map.getStyle();
  console.log("STYLE NAME:", s && s.name);
  console.log("STYLE ID:", s && s.id);
  console.log("LAYER COUNT:", s && s.layers ? s.layers.length : 0);
});
try {
  sektion73Map.addLayer({
    id: "sektion73-3d-buildings",
    source: "composite",
    "source-layer": "building",
    filter: ["==", "extrude", "true"],
    type: "fill-extrusion",
    minzoom: 14.2,
    paint: {
      "fill-extrusion-color": "#d9d4c8",
      "fill-extrusion-height": ["coalesce", ["get", "height"], 6],
      "fill-extrusion-base": ["coalesce", ["get", "min_height"], 0],
      "fill-extrusion-opacity": 0.85
    }
  });
} catch (err) {
  console.warn("Kunde inte lägga 3D-byggnader:", err);
}


    /* =========================
       PINS
       ========================= */

    const sektion73Pins = [
      {
        id: "sektion73Pin_home_0000",
        title: "Apelvikstrand",
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

      // “brand”: chip-känsla
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

      // Accent-dot
      const dot = document.createElement("span");
      dot.setAttribute("aria-hidden", "true");
      dot.style.width = "10px";
      dot.style.height = "10px";
      dot.style.borderRadius = "999px";
      dot.style.background = "#f2b200";
      dot.style.boxShadow = "0 0 0 3px rgba(242,178,0,.20)";
      el.appendChild(dot);

      // Text
      const label = document.createElement("span");
      label.textContent = pin.title;
      label.style.opacity = "0.95";
      el.appendChild(label);

      // Hover
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

        // “return to home” för home-pin
        if (pin.payload && pin.payload.type === "home") {
          sektion73Map.easeTo({
            center: sektion73Home.lngLat,
            zoom: sektion73StartZoom,
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

    // Exponera map för debug (valfritt)
    window.sektion73MapInstance = sektion73Map;

    // Hjälp: logga bounds för exakt låsning när du ställt utsnitt perfekt
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
