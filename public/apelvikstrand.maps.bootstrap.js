/* apelvikstrand.maps.bootstrap.js
   - Visar en statisk "poster" + shimmer direkt (snabb FCP / bättre perceived performance)
   - Laddar Mapbox GL JS + din tunga apelvikstrand.maps.js först vid första user interaction
   - Mapbox tar över vid första klick/drag/zoom/wheel/touch/keydown på kartytan
*/
(function () {
  "use strict";

  var sektion73Root = document.getElementById("sektion73MapRoot");
  var sektion73Canvas = document.getElementById("sektion73MapCanvas");
  if (!sektion73Root || !sektion73Canvas) return;

  // Hårdkodat från din maps-fil (behåll samma för identisk initial vy)
  var sektion73AccessToken =
    "pk.eyJ1IjoicnV0Z2Vyc3NvbiIsImEiOiJjbWwzdjY5N2owcDdiM2RzZWlzaG14MWVjIn0.yMfhGXLf9xq_vzIFSJVcjA";
  var sektion73StyleUser = "rutgersson";
  var sektion73StyleId = "cml5ejbz8000r01qx4ba1dwmn";

  // Din initiala camera (från din kod: sektion73InitialCenter + sektion73StartZoom + bearing/pitch)
  var sektion73InitialLng = 12.258774;
  var sektion73InitialLat = 57.082854;
  var sektion73InitialZoom = 14.9;
  var sektion73InitialBearing = 45;
  var sektion73InitialPitch = 60;

  // Resurser som ska lazy-loadas vid interaction
  var sektion73MapboxJsSrc = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js";
  var sektion73HeavyMapsSrc = "https://apelvikstrand.pages.dev/apelvikstrand.maps.js?v=1";

  // -----------------------------
  // 1) Poster + shimmer overlay
  // -----------------------------
  function sektion73EnsurePosterCss() {
    if (document.getElementById("sektion73PosterStyle")) return;

    var style = document.createElement("style");
    style.id = "sektion73PosterStyle";
    style.textContent =
      "" +
      "#sektion73MapRoot{position:relative}\n" +
      "#sektion73MapCanvas{position:relative;z-index:1}\n" +
      "#sektion73PosterWrap{position:absolute;inset:0;z-index:5;pointer-events:auto}\n" +
      "#sektion73PosterImg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;filter:saturate(1.02) contrast(1.02)}\n" +
      "#sektion73PosterShimmer{position:absolute;inset:0;background:linear-gradient(110deg, rgba(255,255,255,.00) 0%, rgba(255,255,255,.22) 35%, rgba(255,255,255,.00) 70%);transform:translateX(-60%);animation:sektion73PosterShimmerAnim 1.15s ease-in-out infinite;mix-blend-mode:overlay}\n" +
      "#sektion73PosterTint{position:absolute;inset:0;background:rgba(255,255,255,.06)}\n" +
      "#sektion73PosterHint{position:absolute;left:14px;bottom:14px;z-index:6;background:rgba(255,255,255,.78);backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px);border-radius:999px;padding:9px 12px;font:600 13px/1.1 system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0e1318;box-shadow:0 10px 45px rgba(0,0,0,.16)}\n" +
      "#sektion73PosterHint span{opacity:.78;font-weight:600}\n" +
      "@keyframes sektion73PosterShimmerAnim{0%{transform:translateX(-70%)}100%{transform:translateX(70%)}}\n";
    document.head.appendChild(style);
  }

  function sektion73BuildStaticUrl(w, h) {
    // Mapbox Static Images API:
    // /styles/v1/{username}/{style_id}/static/{lon},{lat},{zoom},{bearing},{pitch}/{w}x{h}?access_token=...
    var dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    var ww = Math.max(320, Math.min(1280, Math.round(w * dpr)));
    var hh = Math.max(320, Math.min(1280, Math.round(h * dpr)));

    return (
      "https://api.mapbox.com/styles/v1/" +
      encodeURIComponent(sektion73StyleUser) +
      "/" +
      encodeURIComponent(sektion73StyleId) +
      "/static/" +
      sektion73InitialLng +
      "," +
      sektion73InitialLat +
      "," +
      sektion73InitialZoom +
      "," +
      sektion73InitialBearing +
      "," +
      sektion73InitialPitch +
      "/" +
      ww +
      "x" +
      hh +
      "?access_token=" +
      encodeURIComponent(sektion73AccessToken) +
      "&logo=false&attribution=false"
    );
  }

  function sektion73EnsurePosterDom() {
    if (document.getElementById("sektion73PosterWrap")) return;

    sektion73EnsurePosterCss();

    var wrap = document.createElement("div");
    wrap.id = "sektion73PosterWrap";
    wrap.setAttribute("aria-hidden", "false");

    var img = document.createElement("img");
    img.id = "sektion73PosterImg";
    img.alt = "Karta över Apelviken (laddar)";
    img.decoding = "async";
    img.loading = "eager";

    var shimmer = document.createElement("div");
    shimmer.id = "sektion73PosterShimmer";
    shimmer.setAttribute("aria-hidden", "true");

    var tint = document.createElement("div");
    tint.id = "sektion73PosterTint";
    tint.setAttribute("aria-hidden", "true");

    var hint = document.createElement("div");
    hint.id = "sektion73PosterHint";
    hint.innerHTML = "Tryck eller scrolla för att aktivera <span>kartan</span>";

    wrap.appendChild(img);
    wrap.appendChild(tint);
    wrap.appendChild(shimmer);
    wrap.appendChild(hint);

    sektion73Root.appendChild(wrap);

    // Sätt poster-src baserat på faktisk yta
    var r = sektion73Root.getBoundingClientRect();
    img.src = sektion73BuildStaticUrl(r.width || 900, r.height || 700);

    // Uppdatera src vid resize (billigt)
    var resizeTimer = null;
    window.addEventListener(
      "resize",
      function () {
        if (!document.getElementById("sektion73PosterWrap")) return;
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          var rr = sektion73Root.getBoundingClientRect();
          img.src = sektion73BuildStaticUrl(rr.width || 900, rr.height || 700);
        }, 120);
      },
      { passive: true }
    );
  }

  function sektion73RemovePoster() {
    var wrap = document.getElementById("sektion73PosterWrap");
    if (wrap && wrap.parentNode) wrap.parentNode.removeChild(wrap);
  }

  // -----------------------------
  // 2) Lazy load Mapbox + heavy maps
  // -----------------------------
  var sektion73Booted = false;

  function sektion73LoadScript(src, onDone) {
    var existing = document.querySelector('script[data-sektion73-src="' + src + '"]');
    if (existing) {
      if (onDone) onDone();
      return;
    }

    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.dataset.sektion73Src = src;
    s.onload = function () {
      if (onDone) onDone();
    };
    s.onerror = function () {
      // Om något går fel, ta bort shimmer så UI inte känns "låst"
      sektion73RemovePoster();
      console.error("sektion73 bootstrap: kunde inte ladda", src);
    };
    document.head.appendChild(s);
  }

  function sektion73TryHidePosterWhenMapReady() {
    var tries = 0;
    var maxTries = 240; // ~12s @ 50ms
    var t = setInterval(function () {
      tries++;

      // Din tunga fil exponerar map-instansen såhär:
      // window.sektion73Map = sektion73Map;
      var m = window.sektion73Map;
      if (m && typeof m.on === "function") {
        clearInterval(t);

        // Vänta på riktig paint så övergången känns naturlig
        try {
          m.once("load", function () {
            // 1 frame senare så canvas hinner fyllas
            requestAnimationFrame(function () {
              sektion73RemovePoster();
            });
          });

          // Fallback om "load" redan hänt (t.ex. cached style)
          setTimeout(function () {
            if (document.getElementById("sektion73PosterWrap")) sektion73RemovePoster();
          }, 1200);
        } catch (_) {
          sektion73RemovePoster();
        }
      }

      if (tries >= maxTries) {
        clearInterval(t);
        // Timeout fallback
        sektion73RemovePoster();
      }
    }, 50);
  }

  function sektion73BootInteractiveMap() {
    if (sektion73Booted) return;
    sektion73Booted = true;

    // Direkt feedback: hint -> "Laddar…"
    var hint = document.getElementById("sektion73PosterHint");
    if (hint) hint.textContent = "Laddar kartan…";

    sektion73LoadScript(sektion73MapboxJsSrc, function () {
      sektion73LoadScript(sektion73HeavyMapsSrc, function () {
        sektion73TryHidePosterWhenMapReady();
      });
    });
  }

  // -----------------------------
  // 3) Wire up: boot on first interaction
  // -----------------------------
  sektion73EnsurePosterDom();

  // Låg nivå: lyssna på poster-wrap så vi inte påverkar resten av sidan
  var target = document.getElementById("sektion73PosterWrap") || sektion73Root;

  function sektion73FirstInteractionHandler() {
    sektion73BootInteractiveMap();

    // Städa listeners (så vi inte ligger kvar)
    target.removeEventListener("pointerdown", sektion73FirstInteractionHandler);
    target.removeEventListener("touchstart", sektion73FirstInteractionHandler);
    target.removeEventListener("wheel", sektion73WheelHandler);
    window.removeEventListener("keydown", sektion73KeyHandler);
  }

  function sektion73WheelHandler(e) {
    // Om användaren scrollar över kartytan: aktivera direkt
    // men blocka inte scroll på sidan.
    sektion73FirstInteractionHandler(e);
  }

  function sektion73KeyHandler(e) {
    // Aktivera vid enter/space om fokus råkar vara i/kring kartan
    var k = e.key || "";
    if (k === "Enter" || k === " " || k === "Spacebar") {
      sektion73FirstInteractionHandler(e);
    }
  }

  target.addEventListener("pointerdown", sektion73FirstInteractionHandler, { passive: true });
  target.addEventListener("touchstart", sektion73FirstInteractionHandler, { passive: true });
  target.addEventListener("wheel", sektion73WheelHandler, { passive: true });
  window.addEventListener("keydown", sektion73KeyHandler, { passive: true });
})();
