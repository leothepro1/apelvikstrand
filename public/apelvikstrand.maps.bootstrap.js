(function () {
  "use strict";

  var sektion73Root = document.getElementById("sektion73MapRoot");
  var sektion73Canvas = document.getElementById("sektion73MapCanvas");
  if (!sektion73Root || !sektion73Canvas) return;

  // Kritiska källor - minimera antal och storlek
  var sektion73MapboxJsSrc = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.js";
  var sektion73MapboxCssHref = "https://api.mapbox.com/mapbox-gl-js/v3.6.0/mapbox-gl.css";
  var sektion73HeavyMapsSrc = "https://apelvikstrand.pages.dev/apelvikstrand.maps.js";
  var sektion73LottieModuleSrc = "https://unpkg.com/@lottiefiles/dotlottie-wc@0.7.1/dist/dotlottie-wc.js";
  var sektion73LottieFileSrc = "https://lottie.host/fee9973e-0e4b-44ce-9a88-4238341dc0b1/uBOZF4orQB.lottie";

  function sektion73EnsureLottieCss() {
    if (document.getElementById("sektion73LottieCss")) return;

    var css = document.createElement("style");
    css.id = "sektion73LottieCss";
    css.type = "text/css";
    css.textContent = 
      "#sektion73LottieOverlay{position:fixed;inset:0;width:100vw;height:100vh;z-index:999999;display:grid;place-items:center;background:#fff;opacity:1;transition:opacity .42s ease;pointer-events:auto}" +
      "#sektion73LottieOverlay.sektion73LottieHiding{opacity:0;pointer-events:none}" +
      "#sektion73LottieOverlay .sektion73LottieInner{width:min(340px,82vw);height:min(340px,82vw);display:grid;place-items:center}" +
      "#sektion73LottieOverlay .sektion73LottieFallback{width:72px;height:72px;border-radius:999px;border:4px solid rgba(14,19,24,12);border-top-color:rgba(14,19,24,55);animation:sektion73Spin 0.9s linear infinite}" +
      "@keyframes sektion73Spin{to{transform:rotate(360deg)}}" +
      "#sektion73LottieOverlay dotlottie-wc{width:100%;height:100%;display:block}";
    document.head.appendChild(css);
  }

  function sektion73PreloadCriticalResources() {
    // Preload kritiska resurser med högsta prioritet
    var resources = [
      { rel: "modulepreload", href: sektion73LottieModuleSrc, as: null },
      { rel: "preload", href: sektion73LottieFileSrc, as: "fetch", crossOrigin: "anonymous" },
      { rel: "preload", href: sektion73MapboxJsSrc, as: "script" },
      { rel: "preload", href: sektion73MapboxCssHref, as: "style" }
    ];

    resources.forEach(function(res) {
      var link = document.createElement("link");
      link.rel = res.rel;
      link.href = res.href;
      if (res.as) link.as = res.as;
      if (res.crossOrigin) link.crossOrigin = res.crossOrigin;
      link.dataset.sektion73Preload = res.href;
      document.head.appendChild(link);
    });
  }

  function sektion73EnsureLottieDom() {
    if (document.getElementById("sektion73LottieOverlay")) return;

    sektion73EnsureLottieCss();
    sektion73PreloadCriticalResources();

    var overlay = document.createElement("div");
    overlay.id = "sektion73LottieOverlay";
    overlay.setAttribute("aria-hidden", "false");

    var inner = document.createElement("div");
    inner.className = "sektion73LottieInner";

    var player = document.createElement("dotlottie-wc");
    player.setAttribute("src", sektion73LottieFileSrc);
    player.setAttribute("speed", "1");
    player.setAttribute("mode", "forward");
    player.setAttribute("loop", "");
    player.setAttribute("autoplay", "");

    inner.appendChild(player);
    overlay.appendChild(inner);

    document.body.appendChild(overlay);
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
      sektion73RemoveLottieOverlay();
      console.error("sektion73 bootstrap: kunde inte ladda", src);
    };
    document.head.appendChild(s);
  }

  function sektion73BootInteractiveMap() {
    sektion73LoadCss(sektion73MapboxCssHref, function () {
      // Skapa script-element för Lottie-modul direkt
      var lottieModule = document.createElement("script");
      lottieModule.type = "module";
      lottieModule.src = sektion73LottieModuleSrc;
      document.head.appendChild(lottieModule);

      sektion73LoadScript(sektion73MapboxJsSrc, function () {
        sektion73LoadScript(sektion73HeavyMapsSrc, function () {
          // Vänta på kartans load och ta sedan bort overlay
          var mapLoadCheck = setInterval(function() {
            var m = window.sektion73Map;
            if (m && typeof m.on === "function") {
              clearInterval(mapLoadCheck);
              m.once("load", function() {
                requestAnimationFrame(sektion73RemoveLottieOverlay);
              });
            }
          }, 50);
        });
      });
    });
  }

  // Initiera Lottie-overlay och starta kartinladdning omedelbart
  sektion73EnsureLottieDom();
  
  // Starta kartinladdning efter en minimal fördröjning för att säkerställa overlay är synlig
  setTimeout(sektion73BootInteractiveMap, 100);
})();
