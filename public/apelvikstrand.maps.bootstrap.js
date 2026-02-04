/* apelvikstrand.maps.bootstrap.js
   - INGEN LOTTIE
   - Visar en spinner-overlay direkt (DOM + minimal CSS injiceras direkt)
   - Overlay ligger i #sektion73MapRoot och täcker bara kartytan (100% x 100%)
   - Laddar Mapbox CSS -> Mapbox JS -> heavy maps.js
   - Tar bort overlay efter map "load" (med minsta visningstid)
*/
(function () {
  "use strict";

  var sektion73Root = document.getElementById("sektion73MapRoot");
  var sektion73Canvas = document.getElementById("sektion73MapCanvas");
  if (!sektion73Root || !sektion73Canvas) return;

  // -----------------------------
  // Kritiska källor (ändra bara här)
  // -----------------------------
  var sektion73MapboxJsSrc = "https://api.mapbox.com/mapbox-gl-js/v3.18.1/mapbox-gl.js";
  var sektion73MapboxCssHref = "https://api.mapbox.com/mapbox-gl-js/v3.18.1/mapbox-gl.css";
  var sektion73HeavyMapsSrc = "https://apelvikstrand.pages.dev/apelvikstrand.maps.js";

  // -----------------------------
  // Overlay settings
  // -----------------------------
  var sektion73OverlayId = "sektion73LoadingOverlay";
  var sektion73CssId = "sektion73LoadingCss";
  var sektion73MinOverlayMs = 650;
  var sektion73StartedAt = performance.now();

  function sektion73EnsureEarlyConnections() {
    var origins = [
      "https://api.mapbox.com",
      "https://events.mapbox.com",
      "https://apelvikstrand.pages.dev",
    ];

    for (var i = 0; i < origins.length; i++) {
      var href = origins[i];

      if (document.querySelector('link[data-sektion73-preconnect="' + href + '"]')) continue;

      var l = document.createElement("link");
      l.rel = "preconnect";
      l.href = href;
      l.crossOrigin = "anonymous";
      l.dataset.sektion73Preconnect = href;
      document.head.appendChild(l);
    }
  }

  function sektion73EnsureOverlayCss() {
    if (document.getElementById(sektion73CssId)) return;

    var css = document.createElement("style");
    css.id = sektion73CssId;
    css.type = "text/css";
    css.textContent =
      "#sektion73MapRoot{position:relative}" +
      "#" +
      sektion73OverlayId +
      "{position:absolute;inset:0;width:100%;height:100%;z-index:9999;display:grid;place-items:center;background:#F7F1EB;opacity:1;transition:opacity .28s ease;pointer-events:auto}" +
      "#" +
      sektion73OverlayId +
      ".sektion73LoadingHiding{opacity:0;pointer-events:none}" +
      "#" +
      sektion73OverlayId +
      " .sektion73LoadingInner{width:min(120px,40vw);height:min(120px,40vw);display:grid;place-items:center}" +
      "#" +
      sektion73OverlayId +
      " .sektion73LoadingSpinner{width:77px;height:77px;border-radius:999px;5px solid rgba(61,42,0,.18);border-top-color:rgba(61,42,0,.75);animation:sektion73Spin .70s linear infinite}" +
      "@keyframes sektion73Spin{to{transform:rotate(360deg)}}";

    document.head.appendChild(css);
  }

  function sektion73EnsureOverlayDom() {
    if (document.getElementById(sektion73OverlayId)) return;

    sektion73EnsureOverlayCss();

    var overlay = document.createElement("div");
    overlay.id = sektion73OverlayId;
    overlay.setAttribute("aria-hidden", "false");

    var inner = document.createElement("div");
    inner.className = "sektion73LoadingInner";

    var spinner = document.createElement("div");
    spinner.className = "sektion73LoadingSpinner";
    spinner.setAttribute("aria-hidden", "true");

    inner.appendChild(spinner);
    overlay.appendChild(inner);
    sektion73Root.appendChild(overlay);
  }

  function sektion73HideOverlayWhenAllowed() {
    var overlay = document.getElementById(sektion73OverlayId);
    if (!overlay) return;

    var elapsed = performance.now() - sektion73StartedAt;
    var wait = Math.max(0, sektion73MinOverlayMs - elapsed);

    window.setTimeout(function () {
      var o = document.getElementById(sektion73OverlayId);
      if (!o) return;

      o.classList.add("sektion73LoadingHiding");

      window.setTimeout(function () {
        var el = document.getElementById(sektion73OverlayId);
        if (el && el.parentNode) el.parentNode.removeChild(el);
      }, 340);
    }, wait);
  }

  function sektion73LoadCss(href, onDone) {
    var existing = document.querySelector('link[data-sektion73-href="' + href + '"]');
    if (existing) {
      if (existing.dataset.sektion73Loaded === "1") {
        if (onDone) onDone();
      } else if (onDone) {
        existing.addEventListener("load", onDone, { once: true });
        existing.addEventListener("error", onDone, { once: true });
      }
      return;
    }

    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = href;
    l.dataset.sektion73Href = href;

    l.onload = function () {
      l.dataset.sektion73Loaded = "1";
      if (onDone) onDone();
    };
    l.onerror = function () {
      if (onDone) onDone();
    };

    document.head.appendChild(l);
  }

  function sektion73LoadScript(src, onDone) {
    var existing = document.querySelector('script[data-sektion73-src="' + src + '"]');
    if (existing) {
      if (existing.dataset.sektion73Loaded === "1") {
        if (onDone) onDone();
      } else if (onDone) {
        existing.addEventListener("load", onDone, { once: true });
        existing.addEventListener("error", onDone, { once: true });
      }
      return;
    }

    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.dataset.sektion73Src = src;

    s.onload = function () {
      s.dataset.sektion73Loaded = "1";
      if (onDone) onDone();
    };
    s.onerror = function () {
      sektion73HideOverlayWhenAllowed();
      console.error("sektion73 bootstrap: kunde inte ladda", src);
      if (onDone) onDone();
    };

    document.head.appendChild(s);
  }

  function sektion73WaitForMapLoadThenHideOverlay() {
    var tries = 0;
    var maxTries = 60 * 12;

    function tick() {
      tries++;

      var m = window.sektion73Map;
      if (m && typeof m.once === "function") {
        m.once("load", function () {
          requestAnimationFrame(sektion73HideOverlayWhenAllowed);
        });
        return;
      }

      if (tries >= maxTries) {
        sektion73HideOverlayWhenAllowed();
        return;
      }

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  function sektion73BootInteractiveMap() {
    sektion73LoadCss(sektion73MapboxCssHref, function () {
      sektion73LoadScript(sektion73MapboxJsSrc, function () {
        sektion73LoadScript(sektion73HeavyMapsSrc, function () {
          sektion73WaitForMapLoadThenHideOverlay();
        });
      });
    });
  }

  // -----------------------------
  // Start (overlay först, sedan tunga resurser)
  // -----------------------------
  sektion73EnsureOverlayDom();
  sektion73EnsureEarlyConnections();

  requestAnimationFrame(function () {
    sektion73BootInteractiveMap();
  });
})();



