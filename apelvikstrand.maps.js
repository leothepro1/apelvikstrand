/* apelvikstrand.maps
   Apelvikstrand – Interaktiv karta (Mapbox Standard / imports)
   - Låst till Apelviken (maxBounds + zoom-intervall)
   - Home: Surbrunnsvägen 2–8, 432 53 Varberg
   - 3D: pitch + bearing + show3dBuildings/show3dObjects (Standard config)
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

    const sektion73Bounds = [
      [12.235, 57.070], // SW
      [12.285, 57.095]  // NE
    ];

    const sektion73MinZoom = 13.2;
    const sektion73MaxZoom = 17.6;
    const sektion73StartZoom = 14.7;

    const sektion73Pitch = 55;
    const sektion73Bearing = -20;

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
      antialias: true,

      pitchWithRotate: false,
      dragRotate: false,

      // Viktigt: Standard style config redan vid init (stabilast)
      // (Nycklarna är Feature visibility för basemap-importen)
      config: {
        basemap: {
          show3dBuildings: true,
          show3dObjects: true
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
       STANDARD 3D (safety + debug)
       ========================= */

    function sektion73HasImportsStyle() {
      const s = sektion73Map.getStyle && sektion73Map.getStyle();
      return !!(s && Array.isArray(s.imports) && s.imports.length);
    }

    function sektion73ForceStandard3D() {
      if (typeof sektion73Map.setConfigProperty !== "function") return;

      try {
        sektion73Map.setConfigProperty("basemap", "show3dBuildings", true);
        sektion73Map.setConfigProperty("basemap", "show3dObjects", true);
      } catch (e) {
        console.warn("Kunde inte sätta Standard 3D-config via setConfigProperty:", e);
      }
    }

    function sektion73LogStandard3DState() {
      if (typeof sektion73Map.getConfigProperty !== "function") return;
      try {
        const b = sektion73Map.getConfigProperty("basemap", "show3dBuildings");
        const o = sektion73Map.getConfigProperty("basemap", "show3dObjects");
        console.log("CONFIG show3dBuildings:", b, "show3dObjects:", o);
      } catch (e) {
        // vissa miljöer kan kasta om config inte är redo just då
      }
    }

    /* =========================
       LOAD
       ========================= */

    // För Standard/import är detta bästa eventet
    sektion73Map.on("style.load", () => {
      // 3D vy (pitch + bearing)
      sektion73Map.easeTo({
        center: sektion73Home.lngLat,
        zoom: sektion73StartZoom,
        pitch: sektion73Pitch,
        bearing: sektion73Bearing,
        duration: 900
      });

      if (sektion73HasImportsStyle()) {
        sektion73ForceStandard3D();
        // logga efter att vi tvingat config (litet tick ger stabilare output)
        setTimeout(sektion73LogStandard3DState, 0);
      }

      const s = sektion73Map.getStyle();
      console.log("STYLE NAME:", s && s.name);
      console.log("STYLE HAS IMPORTS:", sektion73HasImportsStyle());
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

    sektion73Map.once("load", function () {
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

