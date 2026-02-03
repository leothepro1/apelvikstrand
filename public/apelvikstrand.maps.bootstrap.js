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
// Interaktiv karta kan ha vilken pitch du vill.
// Postern (Static Images) får MAX 60, så vi hårdkodar den.
var sektion73PosterPitchFixed = 55;

function sektion73BuildStaticUrlForStyle(styleUser, styleId, w, h) {
  var dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  var ww = Math.max(320, Math.min(1280, Math.round(w * dpr)));
  var hh = Math.max(320, Math.min(1280, Math.round(h * dpr)));

  var sektion73PosterPitch = Math.max(0, Math.min(60, Number(sektion73PosterPitchFixed) || 0));

  return (
    "https://api.mapbox.com/styles/v1/" +
    encodeURIComponent(styleUser) +
    "/" +
    encodeURIComponent(styleId) +
    "/static/" +
    sektion73InitialLng +
    "," +
    sektion73InitialLat +
    "," +
    sektion73InitialZoom +
    "," +
    sektion73InitialBearing +
    "," +
    sektion73PosterPitch +
    "/" +
    ww +
    "x" +
    hh +
    "?access_token=" +
    encodeURIComponent(sektion73AccessToken) +
    "&logo=false&attribution=false&fresh=true"
  );
}

// Först: din egna style. Fallback: säker standard-style.
function sektion73BuildPosterCandidates(w, h) {
  return [
    sektion73BuildStaticUrlForStyle(sektion73StyleUser, sektion73StyleId, w, h),
    sektion73BuildStaticUrlForStyle("mapbox", "streets-v12", w, h)
  ];
}

// Heuristik: om bilden är nästan helt en färg (svart/grå) => treat as blank
function sektion73LooksBlankImage(imgEl) {
  try {
    var nw = imgEl.naturalWidth || 0;
    var nh = imgEl.naturalHeight || 0;

    // Om den kommer tillbaka som pytteliten (typ 1x1/2x2) => den är i praktiken blank
    if (nw > 0 && nh > 0 && (nw * nh) <= 64) return true;

    // Sampla några pixlar via canvas (billigt: liten canvas)
    var c = document.createElement("canvas");
    c.width = 32;
    c.height = 32;
    var ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return false;

    ctx.drawImage(imgEl, 0, 0, 32, 32);
    var data = ctx.getImageData(0, 0, 32, 32).data;

    // Räkna hur stor andel pixlar som är “nära svart/grå”
    var blankish = 0;
    var total = 32 * 32;

    for (var i = 0; i < data.length; i += 4) {
      var r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];

      // helt transparent räknas som blank
      if (a < 10) { blankish++; continue; }

      // “nära svart/grå”
      var mx = Math.max(r, g, b);
      var mn = Math.min(r, g, b);
      var chroma = mx - mn;

      if (mx < 40 || (mx < 160 && chroma < 8)) blankish++;
    }

    // om >92% är blankish => betraktas som blank
    return (blankish / total) > 0.92;
  } catch (_) {
    return false;
  }
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

 var r = sektion73Root.getBoundingClientRect();
var cand = sektion73BuildPosterCandidates(r.width || 900, r.height || 700);
var idx = 0;

function sektion73TryNextPoster() {
  if (idx >= cand.length) return;
  img.src = cand[idx++];
}

img.onload = function () {
  if (sektion73LooksBlankImage(img)) {
    sektion73TryNextPoster(); // fallback till streets-v12
  }
};

img.onerror = function () {
  sektion73TryNextPoster(); // fallback vid fel
};

sektion73TryNextPoster();


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
