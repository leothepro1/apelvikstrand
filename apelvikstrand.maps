/* apelvikstrand.maps
   Mapbox karta + custom pins (modal kopplas på senare)
   Kör bara om #sektion73MapCanvas finns på sidan.
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

    // Public token (frontend)
    mapboxgl.accessToken =
      "pk.eyJ1IjoicnV0Z2Vyc3NvbiIsImEiOiJjbWwzdjY5N2owcDdiM2RzZWlzaG14MWVjIn0.yMfhGXLf9xq_vzIFSJVcjA";

    // TODO: byt till din publicerade style URL från Mapbox Studio
    const sektion73StyleUrl = "mapbox://styles/rutgersson/STYLE_ID_HAR";

    // Grundinställningar (Apelviken)
    const sektion73Map = new mapboxgl.Map({
      container: sektion73Canvas,
      style: sektion73StyleUrl,
      center: [12.239, 57.110],
      zoom: 14.3,
      attributionControl: false
    });

    // Valfritt: bättre UX för “embedded map”
    sektion73Map.scrollZoom.disable();
    sektion73Map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    sektion73Map.addControl(new mapboxgl.AttributionControl({ compact: true }));

    // Exempeldata pins (byt mot era riktiga)
    const sektion73Pins = [
      {
        id: "sektion73Pin_beach_0001",
        title: "Stranden",
        lngLat: [12.2398, 57.1097],
        payload: { type: "beach" }
      },
      {
        id: "sektion73Pin_reception_0002",
        title: "Reception",
        lngLat: [12.2260, 57.1108],
        payload: { type: "reception" }
      }
    ];

    function sektion73CreatePinEl(pin) {
      const el = document.createElement("button");
      el.type = "button";
      el.id = pin.id;
      el.setAttribute("aria-label", pin.title);
      el.style.width = "34px";
      el.style.height = "34px";
      el.style.borderRadius = "999px";
      el.style.border = "2px solid #111";
      el.style.background = "#f2b200";
      el.style.boxShadow = "0 10px 26px rgba(0,0,0,.25)";
      el.style.cursor = "pointer";
      el.style.display = "grid";
      el.style.placeItems = "center";
      el.style.padding = "0";

      const dot = document.createElement("span");
      dot.setAttribute("aria-hidden", "true");
      dot.style.width = "8px";
      dot.style.height = "8px";
      dot.style.borderRadius = "999px";
      dot.style.background = "#111";
      el.appendChild(dot);

      el.addEventListener("click", function () {
        // TODO: ersätt med riktig modal (nästa steg)
        // sektion73OpenModal(pin)
        console.log("Pin klick:", pin.title, pin.payload);
      });

      return el;
    }

    function sektion73AddPin(pin) {
      const el = sektion73CreatePinEl(pin);
      new mapboxgl.Marker({ element: el, anchor: "center" })
        .setLngLat(pin.lngLat)
        .addTo(sektion73Map);
    }

    sektion73Map.on("load", function () {
      sektion73Pins.forEach(sektion73AddPin);
    });

    // Exponera map om du vill debugga i konsolen (valfritt)
    window.sektion73MapInstance = sektion73Map;
  });
})();
