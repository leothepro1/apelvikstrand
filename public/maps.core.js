/* apelvikstrand.maps.core.js
   - ENDA ANSVAR: initiera Mapbox-kartan + exponera config + window.sektion73Map
   - Ingen pins/filter/modal här (det flyttas till maps.ui.js)
   - Beteendet/initial vy ska vara IDENTISK med din nuvarande maps-fil
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

  sektion73Ready(function sektion73InitMapCore() {
    const sektion73Canvas = document.getElementById("sektion73MapCanvas");
    if (!sektion73Canvas) return;

    if (!window.mapboxgl) {
      console.error(
        "Mapbox GL JS saknas. Kontrollera att mapbox-gl.js laddas före apelvikstrand.maps.core.js"
      );
      return;
    }

    /* =========================
       CONFIG (oförändrad från nuvarande)
       ========================= */

    mapboxgl.accessToken =
      "pk.eyJ1IjoicnV0Z2Vyc3NvbiIsImEiOiJjbWwzdjY5N2owcDdiM2RzZWlzaG14MWVjIn0.yMfhGXLf9xq_vzIFSJVcjA";

    const sektion73StyleUrl = "mapbox://styles/rutgersson/cml85l84y003c01s6by4kazii";

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
      lngLat: [12.26372, 57.079943]
    };

    const sektion73Majas = {
      title: "Surbrunnsvägen 2–8",
      lngLat: [12.263265, 57.08006]
    };

    const sektion73Kusthotellet = {
      title: "Kusthotellet",
      lngLat: [12.242833, 57.08861]
    };

    // Tångkörarvägen 1, 432 54 Varberg (koordinater från karta-länk)
    const sektion73surfcenter = {
      title: "Tångkörarvägen 1",
      lngLat: [12.250144, 57.084689]
    };

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
      lngLat: [12.25593, 57.084152]
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
      lngLat: [12.247864, 57.08797]
    };

    const sektion73Tangkorar_4 = {
      title: "Tångkörarvägen 4",
      lngLat: [12.258103, 57.08338]
    };

    // 3) Tångkörarvägen 2, 432 54 Varberg
    const sektion73Tangkorar_2 = {
      title: "Tångkörarvägen 2",
      lngLat: [12.255198, 57.084747]
    };

    // 4) Tångkörarvägen 10, 432 54 Varberg
    const sektion73Tangkorar_10 = {
      title: "Tångkörarvägen 10",
      lngLat: [12.2632701, 57.0773842]
    };

    // 5) Tångkörarvägen 17, 432 54 Varberg
    const sektion73Tangkorar_17 = {
      title: "Tångkörarvägen 17",
      lngLat: [12.263741, 57.079803]
    };

    // Bounds (justera vid behov)
    const sektion73Bounds = [
      [12.235, 57.07], // SW
      [12.285, 57.095] // NE
    ];

    const sektion73MinZoom = 13.2;
    const sektion73MaxZoom = 17.9;
    const sektion73StartZoom = 14.5;
    const sektion73SecondaryPinsMinZoom = 15.8;

    // Kamera
    const sektion73Pitch = 63;

    // Visa "från havet in mot land" (väst -> öst):
    // bearing 90 = öst uppåt i bild (kameran tittar mot öst med pitch)
    const sektion73Bearing = 45;

    const sektion73DisableRotate = true;

    // Zoom vid pin-klick
    const sektion73PinZoom = 24.15;
    const sektion73PinZoomDur = 950;

    // Modal animation
    const sektion73ModalDurMs = 420;

    /* =========================
       MAP INIT (oförändrad)
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

    // Exponera map-instansen (som idag)
    window.sektion73Map = sektion73Map;

    // Exponera config för maps.ui.js (så UI kan vara identiskt utan att duplicera siffror)
    window.sektion73MapConfig = {
      accessToken: mapboxgl.accessToken,
      styleUrl: sektion73StyleUrl,

      // centers/pois (behåll samma namn/struktur)
      sektion73Home,
      sektion73Golf,
      sektion73Surfcenter,
      sektion73Majas,
      sektion73Kusthotellet,
      sektion73surfcenter,
      sektion73Tangkorar,
      sektion73livs,
      sektion73InitialCenter,
      sektion73apelviken,
      sektion73minigolf,
      sektion73Sanatorie_4,
      sektion73Tangkorar_4,
      sektion73Tangkorar_2,
      sektion73Tangkorar_10,
      sektion73Tangkorar_17,

      // bounds/zoom/camera
      sektion73Bounds,
      sektion73MinZoom,
      sektion73MaxZoom,
      sektion73StartZoom,
      sektion73SecondaryPinsMinZoom,
      sektion73Pitch,
      sektion73Bearing,
      sektion73DisableRotate,

      // pin/modal timings
      sektion73PinZoom,
      sektion73PinZoomDur,
      sektion73ModalDurMs
    };

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
       Debug helpers (behåll)
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

    // Signal för bootstrap/UI att core är klar (utan polling på DOM)
    window.__sektion73MapCoreReady = true;
  });
})();
