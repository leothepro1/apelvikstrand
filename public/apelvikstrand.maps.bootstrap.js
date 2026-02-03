/* =========================
   EFTER (maps.bootstrap) – HELA bootstrap-IIFE
   - Poster/Static Images borttaget helt
   - Lottie-overlay visas direkt (100vw/100vh, centrerad)
   - Efter att overlay är uppe: starta Mapbox-hämtning efter 0.3s
   - Overlay fade:as bort när Mapbox-map är “load”:ad
   ========================= */
(function () {
  "use strict";

  var sektion73Root = document.getElementById("sektion73MapRoot");
  var sektion73Canvas = document.getElementById("sektion73MapCanvas");
  if (!sektion73Root || !sektion73Canvas) return;

  // -----------------------------
  // 0) Källor som tidigare saknades (ReferenceError-fix)
  // -----------------------------
  var sektion73MapboxJsSrc = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js";
  var sektion73MapboxCssHref = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css";

  // Viktigt: MÅSTE matcha din faktiska deploy-path.
  // (Du hade tidigare 404 på .maps.js, så detta måste peka på rätt fil/host)
  var sektion73HeavyMapsSrc = "https://apelvikstrand.webflow.io/apelvikstrand.maps.js";

  // -----------------------------
  // 1) Lottie-overlay (ersätter poster/static image)
  // -----------------------------
  var sektion73LottieModuleSrc = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.7.1/dist/dotlottie-wc.js";
  var sektion73LottieFileSrc = "https://lottie.host/fee9973e-0e4b-44ce-9a88-4238341dc0b1/uBOZF4orQB.lottie";

  function sektion73EnsureLottieCss() {
    if (document.getElementById("sektion73LottieCss")) return;

    var css = document.createElement("style");
    css.id = "sektion73LottieCss";
    css.type = "text/css";
    css.appendChild(
      document.createTextNode(
        ""
          + "#sektion73LottieOverlay{position:fixed;inset:0;width:100vw;height:100vh;z-index:999999;display:grid;place-items:center;background:#fff;opacity:1;transition:opacity .42s ease;pointer-events:auto}\n"
          + "#sektion73LottieOverlay.sektion73LottieHiding{opacity:0;pointer-events:none}\n"
          + "#sektion73LottieOverlay .sektion73LottieInner{width:min(340px,82vw);height:min(340px,82vw);display:grid;place-items:center}\n"
          + "#sektion73LottieOverlay .sektion73LottieFallback{width:72px;height:72px;border-radius:999px;border:4px solid rgba(14,19,24,12);border-top-color:rgba(14,19,24,55);animation:sektion73Spin 0.9s linear infinite}\n"
          + "@keyframes sektion73Spin{to{transform:rotate(360deg)}}\n"
          + "#sektion73LottieOverlay dotlottie-wc{width:100%;height:100%;display:block}\n"
      )
    );
    document.head.appendChild(css);
  }

  function sektion73PreloadLottie() {
    // Försök få Lottie att börja ladda direkt, så tidigt som möjligt.
    var mp = document.querySelector('link[data-sektion73-modulepreload="' + sektion73LottieModuleSrc + '"]');
    if (!mp) {
      mp = document.createElement("link");
      mp.rel = "modulepreload";
      mp.href = sektion73LottieModuleSrc;
      mp.dataset.sektion73Modulepreload = sektion73LottieModuleSrc;
      document.head.appendChild(mp);
    }

    var lp = document.querySelector('link[data-sektion73-preload="' + sektion73LottieFileSrc + '"]');
    if (!lp) {
      lp = document.createElement("link");
      lp.rel = "preload";
      lp.as = "fetch";
      lp.href = sektion73LottieFileSrc;
      lp.crossOrigin = "anonymous";
      lp.dataset.sektion73Preload = sektion73LottieFileSrc;
      document.head.appendChild(lp);
    }
  }

  function sektion73EnsureLottieModule() {
    if (window.customElements && window.customElements.get && window.customElements.get("dotlottie-wc")) return;

    var existing = document.querySelector('script[data-sektion73-dotlottie="1"]');
    if (existing) return;

    var s = document.createElement("script");
    s.type = "module";
    s.dataset.sektion73Dotlottie = "1";
    s.textContent = 'import "' + sektion73LottieModuleSrc + '";';
    document.head.appendChild(s);
  }

  function sektion73EnsureLottieDom() {
    if (document.getElementById("sektion73LottieOverlay")) return;

    sektion73EnsureLottieCss();
    sektion73PreloadLottie();

    var overlay = document.createElement("div");
    overlay.id = "sektion73LottieOverlay";
    overlay.setAttribute("aria-hidden", "false");

    var inner = document.createElement("div");
    inner.className = "sektion73LottieInner";

    var fallback = document.createElement("div");
    fallback.className = "sektion73LottieFallback";
    fallback.setAttribute("aria-hidden", "true");

    var player = document.createElement("dotlottie-wc");
    player.setAttribute("src", sektion73LottieFileSrc);
    player.setAttribute("speed", "1");
    player.setAttribute("mode", "forward");
    player.setAttribute("loop", "");
    player.setAttribute("autoplay", "");

    inner.appendChild(fallback);
    inner.appendChild(player);
    overlay.appendChild(inner);

    // Append ASAP (före module-import), så overlay syns direkt.
    document.body.appendChild(overlay);

    // Importera web component ASAP.
    sektion73EnsureLottieModule();

    if (window.customElements && typeof window.customElements.whenDefined === "function") {
      window.customElements.whenDefined("dotlottie-wc").then(function () {
        requestAnimationFrame(function () {
          // Ta bort fallback när komponenten är “upgraded”
          if (fallback && fallback.parentNode) fallback.parentNode.removeChild(fallback);
        });
      }).catch(function () {});
    }
  }

  function sektion73RemoveLottieOverlay() {
    var overlay = document.getElementById("sektion73LottieOverlay");
    if (!overlay) return;

    overlay.classList.add("sektion73LottieHiding");

    setTimeout(function () {
      var o = document.getElementById("sektion73LottieOverlay");
      if (o && o.parentNode) o.parentNode.removeChild(o);
    }, 520);
  }

  // -----------------------------
  // 2) Lazy load Mapbox + heavy maps
  // -----------------------------
  var sektion73Booted = false;

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
      // Om något går fel, släpp overlay så UI inte känns "låst"
      sektion73RemoveLottieOverlay();
      console.error("sektion73 bootstrap: kunde inte ladda", src);
    };
    document.head.appendChild(s);
  }

  function sektion73TryHideLottieWhenMapReady() {
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
              sektion73RemoveLottieOverlay();
            });
          });

          // Fallback om "load" redan hänt (t.ex. cached style)
          setTimeout(function () {
            if (document.getElementById("sektion73LottieOverlay")) sektion73RemoveLottieOverlay();
          }, 1200);
        } catch (_) {
          sektion73RemoveLottieOverlay();
        }
      }

      if (tries >= maxTries) {
        clearInterval(t);
        // Timeout fallback
        sektion73RemoveLottieOverlay();
      }
    }, 50);
  }

  function sektion73BootInteractiveMap() {
    if (sektion73Booted) return;
    sektion73Booted = true;

    sektion73LoadCss(sektion73MapboxCssHref, function () {
      sektion73LoadScript(sektion73MapboxJsSrc, function () {
        sektion73LoadScript(sektion73HeavyMapsSrc, function () {
          sektion73TryHideLottieWhenMapReady();
        });
      });
    });
  }

  // -----------------------------
  // 3) Wire up: visa Lottie direkt + starta initial Mapbox-hämtning efter 0.3s
  // -----------------------------
  sektion73EnsureLottieDom();

  // Starta kartans initiala hämtning efter att Lottie-overlay är “uppe”.
  // Mål: Lottie syns direkt, Mapbox börjar hämta efter 300ms.
  var sektion73BootTimer = null;

  function sektion73ScheduleBootAfterLottie() {
    if (sektion73BootTimer) return;
    sektion73BootTimer = setTimeout(function () {
      sektion73BootInteractiveMap();
    }, 300);
  }

  if (window.customElements && typeof window.customElements.whenDefined === "function") {
    window.customElements.whenDefined("dotlottie-wc").then(function () {
      // 1 frame så overlay/layout är stabilt innan vi startar nätverkstunga hämtningar
      requestAnimationFrame(function () {
        sektion73ScheduleBootAfterLottie();
      });
    }).catch(function () {
      sektion73ScheduleBootAfterLottie();
    });
  } else {
    sektion73ScheduleBootAfterLottie();
  }
})();


