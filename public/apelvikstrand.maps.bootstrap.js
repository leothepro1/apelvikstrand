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
  var sektion73LottieModuleSrc =
    "https://unpkg.com/@lottiefiles/dotlottie-wc@0.7.1/dist/dotlottie-wc.js";
  var sektion73LottieFileSrc =
    "https://lottie.host/fee9973e-0e4b-44ce-9a88-4238341dc0b1/uBOZF4orQB.lottie";

  // -----------------------------
  // Overlay settings
  // -----------------------------
  var sektion73OverlayId = "sektion73LottieOverlay";
  var sektion73CssId = "sektion73LottieCss";
  var sektion73MinOverlayMs = 650;
  var sektion73StartedAt = performance.now();

  function sektion73EnsureEarlyConnections() {
    var origins = [
      "https://api.mapbox.com",
      "https://events.mapbox.com",
      "https://unpkg.com",
      "https://lottie.host",
      "https://apelvikstrand.pages.dev"
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

    // FIX: overlay ska täcka endast #sektion73MapRoot (inte hela viewporten)
    css.textContent =
      "#sektion73MapRoot{position:relative}" +
      "#" +
      sektion73OverlayId +
      "{position:absolute;inset:0;width:100%;height:100%;z-index:9999;display:grid;place-items:center;background:#fff;opacity:1;transition:opacity .28s ease;pointer-events:auto}" +
      "#" +
      sektion73OverlayId +
      ".sektion73LottieHiding{opacity:0;pointer-events:none}" +
      "#" +
      sektion73OverlayId +
      " .sektion73LottieInner{width:min(320px,74vw);height:min(320px,74vw);display:grid;place-items:center}" +
      "#" +
      sektion73OverlayId +
      " .sektion73LottiePoster{width:100%;height:100%;display:grid;place-items:center}" +
      "#" +
      sektion73OverlayId +
      " .sektion73LottieSpinner{width:60px;height:60px;border-radius:999px;border:4px solid rgba(14,19,24,.12);border-top-color:rgba(14,19,24,.55);animation:sektion73Spin .85s linear infinite}" +
      "#" +
      sektion73OverlayId +
      " dotlottie-wc{width:100%;height:100%;display:block}" +
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
    inner.className = "sektion73LottieInner";

    var poster = document.createElement("div");
    poster.className = "sektion73LottiePoster";
    poster.innerHTML = '<div class="sektion73LottieSpinner" aria-hidden="true"></div>';

    inner.appendChild(poster);
    overlay.appendChild(inner);

    // FIX: overlay läggs i root (så absolute/inset:0 baseras på root)
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

      o.classList.add("sektion73LottieHiding");

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

  function sektion73LoadScript(src, onDone, opts) {
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

    if (opts && opts.type) s.type = opts.type;

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

  function sektion73MountLottiePlayer() {
    sektion73LoadScript(
      sektion73LottieModuleSrc,
      function () {
        var overlay = document.getElementById(sektion73OverlayId);
        if (!overlay) return;

        var inner = overlay.querySelector(".sektion73LottieInner");
        if (!inner) return;

        inner.innerHTML = "";

        var player = document.createElement("dotlottie-wc");
        player.setAttribute("src", sektion73LottieFileSrc);
        player.setAttribute("speed", "1");
        player.setAttribute("mode", "forward");
        player.setAttribute("loop", "");
        player.setAttribute("autoplay", "");

        inner.appendChild(player);
      },
      { type: "module" }
    );
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
  // Start
  // -----------------------------
  sektion73EnsureOverlayDom();
  sektion73EnsureEarlyConnections();

  requestAnimationFrame(function () {
    sektion73MountLottiePlayer();
    sektion73BootInteractiveMap();
  });
})();

