/* apelvikstrand.maps
   Apelvikstrand – Interaktiv karta (Mapbox)
   - Låst till Apelviken (maxBounds + zoom-intervall)
   - Utgår från en "home"-punkt
   - Mindre "google mappig": döljer Mapbox UI (logo/attribution), tar bort navigation,
     och kan (valfritt) stänga av interaktion för en mer “designad” upplevelse.
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

    // Publicerad style URL (Mapbox Studio)
    const sektion73StyleUrl =
      "mapbox://styles/rutgersson/cml3vbd2s006i01qwezp4cw46";

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
    const sektion73DisablePitch = true;

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
    // (du kan kommentera bort om du vill ha full frihet)
    sektion73Map.scrollZoom.disable();         // av: scroll-zoom (bra för inbäddat)
    sektion73Map.doubleClickZoom.disable();    // av: dubbelklick zoom
    if (sektion73DisableRotate) {
      sektion73Map.dragRotate.disable();
      sektion73Map.touchZoomRotate.disableRotation();
    }
    if (sektion73DisablePitch) {
      sektion73Map.setPitch(0);
    }

    // Ta bort standard-knappar (+/-) helt
    // (om du vill behålla: kommentera bort dessa två rader)
    // OBS: vi lade aldrig till NavigationControl nu, så inga knappar ska synas

    // Lägg tillbaka en kompakt attribution i hörn (REKOMMENDERAT för compliance)
    // Om du verkligen vill dölja: kommentera bort.
    sektion73Map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");

    // För att minska "kart-app"-känslan: gör kartan lite mjukare vid loads
    sektion73Map.once("load", () => {
      // mjuk "fly" in i området, känns mer premium
      sektion73Map.easeTo({
        center: sektion73Home.lngLat,
        zoom: sektion73StartZoom,
        duration: 900
      });
    });

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

      // Lite mer “brand”: chip-känsla istället för klassisk pin
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

      // Accent-dot (guld)
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

      // Hover/active (subtilt)
      el.addEventListener("mouseenter", () => {
        el.style.transform = "translateY(-1px)";
        el.style.boxShadow = "0 16px 34px rgba(0,0,0,.20)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "0 12px 28px rgba(0,0,0,.18)";
      });

      el.addEventListener("click", function () {
        // TODO: ersätt med riktig modal (nästa steg)
        // sektion73OpenModal(pin)
        console.log("Pin klick:", pin.title, pin.payload);

        // “return to home” beteende för home-pin (känns mindre app, mer UI)
        if (pin.payload && pin.payload.type === "home") {
          sektion73Map.easeTo({ center: sektion73Home.lngLat, zoom: sektion73StartZoom, duration: 650 });
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

    // Exponera map om du vill debugga i konsolen (valfritt)
    window.sektion73MapInstance = sektion73Map;

    // Hjälpfunktion för att snabbt få exakta bounds när du har rätt zoom/utsnitt:
    // Kör i console: sektion73PrintBounds()
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
