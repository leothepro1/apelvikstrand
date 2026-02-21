/* apelvikstrand.js
   AS Gallery (Booking-style) – extracted JS (no <script> tags)
   Runs only if #asprWrapper_48291 exists on the page.
*/
(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function initASGallery_61724() {
    // Guard: only run on pages where the gallery exists
    const asWrapper_48291 = document.getElementById("asprWrapper_48291");
    if (!asWrapper_48291) return;

    /* =========================
       CLOUDINARY (UPLOAD URLS)
       ========================= */

 function asCldFromUploadUrl_55219(uploadUrl, w, h) {
  const url = String(uploadUrl || "").trim();

  const marker = "/image/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;

  const base = url.slice(0, idx + marker.length);
  const rest = url.slice(idx + marker.length);

  const t = [
    "f_auto",
    "q_auto",
    "dpr_auto",
    "c_fill",
    "g_auto",
    "w_" + Math.round(w),
    "h_" + Math.round(h),
  ].join(",");

  return base + t + "/" + rest;
}


function asCldVideoFromUploadUrl_55219(uploadUrl) {
  // VIKTIGT:
  // Video ska INTE gå via Cloudinary-transforms.
  // Rå upload-URL krävs för korrekt playback i alla browsers.
  return String(uploadUrl || "").trim();
}


/* Ny: poster/thumbnail från video (still frame) */
function asCldPosterFromVideoUploadUrl_55219(uploadUrl, w, h) {
  const url = String(uploadUrl || "").trim();

  const marker = "/video/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;

  const base = url.slice(0, idx + marker.length);
  const rest = url.slice(idx + marker.length);

  const t = [
    "so_0",
    "f_jpg",
    "q_auto",
    "dpr_auto",
    "c_fill",
    "g_auto",
    "w_" + Math.round(w),
    "h_" + Math.round(h),
  ].join(",");

  return base + t + "/" + rest;
}

/* Ny: injicera video-items i asImages_61724 först vid behov (0 initial påverkan) */
function asEnsureVideosInjected_61724() {
  if (asVideosInjected_61724) return;
  asVideosInjected_61724 = true;

  if (!Array.isArray(asVideosLazy_61724) || !asVideosLazy_61724.length) return;

  for (let i = 0; i < asVideosLazy_61724.length; i++) {
    const v = asVideosLazy_61724[i];
    if (!v || v.family !== "Video" || v.type !== "video" || !v.src) continue;
    asImages_61724.push(v);
  }

  // Efter injection måste filter/DOM kunna rebuildas korrekt
  asThumbsKey_61724 = null;
  asThumbWindowMetaKey_61724 = null;
  asSlidesKey_61724 = null;
}

/* Ny: ingen crop (behåller hela bilden). Används för FRONT-HERO */
function asCldNoCropFromUploadUrl_55219(uploadUrl, w) {
  const url = String(uploadUrl || "").trim();

  const marker = "/image/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;

  const base = url.slice(0, idx + marker.length);
  const rest = url.slice(idx + marker.length);

  const t = [
    "f_auto",
    "q_auto",
    "dpr_auto",
    "c_limit", // ingen crop, begränsar bara till max-bredd
    "w_" + Math.round(w),
  ].join(",");

  return base + t + "/" + rest;
}

/* Ny: srcset för FRONT-HERO utan crop */
function asBuildSrcsetNoCropUpload_55219(uploadUrl, widths) {
  return widths
    .map((w) => asCldNoCropFromUploadUrl_55219(uploadUrl, w) + " " + w + "w")
    .join(", ");
}

function asBuildSrcsetUpload_55219(uploadUrl, widths, aspectW, aspectH) {
  return widths
    .map((w) => {
      const h = Math.round((w * aspectH) / aspectW);
      return asCldFromUploadUrl_55219(uploadUrl, w, h) + " " + w + "w";
    })
    .join(", ");
}

    /* =========================
       DATA (REPLACE WITH YOUR URLs)
       ========================= */

const asFamilyCountOverrides_61724 = {
  Video: 3,
};

const asImages_61724 = [
  // Interiör
  {
    id: "asprImgData_0056",
    family: "Interiör",
    alt: "Interiör 1",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872058/jpeg-optimizer_ApelvikStrand_0967_2_iopudg.jpg",
  },
  {
    id: "asprImgData_0002",
    family: "Interiör",
    front: "number2",
    alt: "Interiör 2",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872058/jpeg-optimizer_ApelvikStrand_1153_1_mi0wzz.jpg",
  },
  {
    id: "asprImgData_0042",
    family: "Interiör",
    front: "number5",
    alt: "Interiör 3",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872058/jpeg-optimizer_ApelvikStrand_1019_3_cmtydp.jpg",
  },
  {
    id: "asprImgData_0012",
    family: "Interiör",
    alt: "Interiör 4",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872059/jpeg-optimizer_ApelvikStrand_0594_1_biqek3.jpg",
  },
  {
    id: "asprImgData_0000",
    family: "Interiör",
    front: "number4",
    alt: "Interiör 5",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872059/jpeg-optimizer_ApelvikStrand_0010_3_rzzlat.jpg",
  },
  {
    id: "asprImgData_0001",
    family: "Interiör",
    front: "number3",
    alt: "Interiör 6",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875259/jpeg-optimizer_bed_s97rag.png",
  },
  {
    id: "asprImgData_0100",
    front: "number2",
    family: "Exteriör",
    alt: "Exteriör 1",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872360/jpeg-optimizer_ApelvikStrand_0356_2_jvgrhe.jpg",
  },
  {
    id: "asprImgData_0003",
    family: "Exteriör",
    alt: "Exteriör 2",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872360/jpeg-optimizer_BOA_0254_6787_mi0uem.jpg",
  },
  {
    id: "asprImgData_0004",
    family: "Exteriör",
    alt: "Exteriör 3",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872358/jpeg-optimizer_ApelvikStrand_0304_grhsdv.jpg",
  },
  {
    id: "asprImgData_0005",
    family: "Exteriör",
    alt: "Exteriör 5",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872360/jpeg-optimizer_BOA_0286_6819_zkfxdt.jpg",
  },
  {
    id: "asprImgData_0006",
    family: "Exteriör",
    alt: "Exteriör 6",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872361/jpeg-optimizer_BOA_0235_6769_2_nmd28p.jpg",
  },
  {
    id: "asprImgData_0007",
    family: "Exteriör",
    front: "number1",
    alt: "Exteriör 7",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769875471/strandhuse21q_hh50lb.png",
  },
  {
    id: "asprImgData_0008",
    family: "Exteriör",
    alt: "Exteriör 8",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872362/jpeg-optimizer_ApelvikStrand_0045_1_ch30ys.jpg",
  },
  {
    id: "asprImgData_0009",
    family: "Exteriör",
    alt: "Exteriör 9",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769872363/jpeg-optimizer_ApelvikStrand_0056_1_m9rjzl.jpg",
  },

  // Restaurang
  {
    id: "asprImgData_0200",
    family: "Närområdet",
    alt: "Närområdet 1",
    src: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769874809/jpeg-optimizer_2025_07_11_03_13_52.00_00_12_01.Still001_1_bzpym9.png",
  },
];

const asVideosLazy_61724 = [
  {
    id: "asprVidData_0301",
    family: "Video",
    type: "video",
    alt: "Video 1",
    src: "https://res.cloudinary.com/dmgmoisae/video/upload/v1769952078/2025_07_11_03_13_52_6_eeqfia.mp4",
    // PNG-thumbnail (ersätt med din faktiska stillbild)
    thumb: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769957230/jpeg-optimizer_2025_07_11_03_13_52.00_00_43_23.Still002_g7qaii.png",
  },
  {
    id: "asprVidData_0302",
    family: "Video",
    type: "video",
    alt: "Video 2",
    src: "https://res.cloudinary.com/dmgmoisae/video/upload/v1769955838/2025_07_11_03_13_52_11_t9ig9o.mp4",
    // PNG-thumbnail (ersätt med din faktiska stillbild)
    thumb: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769957231/jpeg-optimizer_2025_07_11_03_13_52.00_00_06_04.Still001_b5rxiw.png",
  },
  {
    id: "asprVidData_0303",
    family: "Video",
    type: "video",
    alt: "Video 3",
    src: "https://res.cloudinary.com/dmgmoisae/video/upload/v1769954452/2025_07_11_03_13_52_10_iq8glf.mp4",
    // PNG-thumbnail (ersätt med din faktiska stillbild)
    thumb: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769957231/jpeg-optimizer_2025_07_11_03_13_52.00_08_34_11.Still004_tqawvc.png",
  },
  {
    id: "asprVidData_0304",
    family: "Video",
    type: "video",
    alt: "Video 4",
    src: "https://res.cloudinary.com/dmgmoisae/video/upload/v1769953481/2025_07_11_03_13_52_9_udmjnw.mp4",
    // PNG-thumbnail (ersätt med din faktiska stillbild)
    thumb: "https://res.cloudinary.com/dmgmoisae/image/upload/v1769957231/jpeg-optimizer_2025_07_11_03_13_52.00_07_25_11.Still003_hh5vmp.png",
  },
];


const asInitialVisibleCount_61724 = 5;

    /* =========================
       ELEMENTS
       ========================= */
    const asCounterText_48291 = document.getElementById("asprCounterText_48291");

    const asGridItems = [
      {
        btn: document.getElementById("asprGridItem_hero_001"),
        img: document.getElementById("asprImg_hero_001"),
      },
      {
        btn: document.getElementById("asprGridItem_small_002"),
        img: document.getElementById("asprImg_small_002"),
      },
      {
        btn: document.getElementById("asprGridItem_small_003"),
        img: document.getElementById("asprImg_small_003"),
      },
      {
        btn: document.getElementById("asprGridItem_small_004"),
        img: document.getElementById("asprImg_small_004"),
      },
      {
        btn: document.getElementById("asprGridItem_small_005"),
        img: document.getElementById("asprImg_small_005"),
      },
    ];

    const asDialog_91827 = document.getElementById("asprGalleryDialog_91827");
    const asCloseBtn_91827 = document.getElementById("asprCloseBtn_91827");
    const asNavPrev_91827 = document.getElementById("asprNavPrev_91827");
    const asNavNext_91827 = document.getElementById("asprNavNext_91827");
    const asFilterRow_91827 = document.getElementById("asprFilterRow_91827");
    const asHeroTrack_91827 = document.getElementById("asprHeroTrack_91827");
    const asThumbs_91827 = document.getElementById("asprThumbs_91827");
    const asModalHeroCounter_91827 = document.getElementById("asprModalHeroCounter_91827");
    const asModalShell_91827 = document.getElementById("asprModalShell_91827");

    if (
      !asCounterText_48291 ||
      asGridItems.some((x) => !x.btn || !x.img) ||
      !asDialog_91827 ||
      !asCloseBtn_91827 ||
      !asNavPrev_91827 ||
      !asNavNext_91827 ||
      !asFilterRow_91827 ||
      !asHeroTrack_91827 ||
      !asThumbs_91827 ||
      !asModalHeroCounter_91827 ||
      !asModalShell_91827
    ) {
      // If markup is incomplete, do not run (prevents errors)
      return;
    }

   /* =========================
       STATE
       ========================= */
/* =========================
   STATE
   ========================= */
let asActiveFamily_61724 = null;
let asActiveGlobalIndex_61724 = 0;
let asActiveFamilyIndexes_61724 = [];

let asResizeT_61724 = null;

// Swipe state
let asMobileSwipeBound_61724 = false;
let asDragStartX_61724 = null;
let asDragCurrentX_61724 = 0;
let asDragging_61724 = false;
let asSwipeRaf_61724 = null;

// Programmatic multi-step navigation (thumb jump)
let asProgrammaticNav_61724 = false;
let asProgrammaticNavAbort_61724 = false;

// Build slides once per filter
let asSlidesKey_61724 = null; // "Family|0,1,2"
let asLastStagedIndex_61724 = null;

// Thumb window
let asThumbsKey_61724 = null; // key för byggd DOM
let asThumbWindowStart_61724 = 0; // första "pos" i familjelistan som är synlig (0..n-1)
let asThumbWindowMetaKey_61724 = null; // låser start till aktuell family+list+visible

// Video lazy-injection
let asVideosInjected_61724 = false;

// Persist last slide dims (för video src/poster transform + lazy load)
let asLastSlideDims_61724 = null;

// Slide gap (px) for track swipe layout
const asSlideGap_61724 = 22;

    /* =========================
       HELPERS
       ========================= */

     /* =========================
   I18N (shared with frontend)
   ========================= */
function asGetLangFromPath_61724() {
  const p = String(window.location.pathname || "").toLowerCase();
  if (p.startsWith("/en")) return "en";
  if (p.startsWith("/de")) return "de";
  return "sv";
}

const asLang_61724 = (window.AS_LANG || asGetLangFromPath_61724());

function asGetNested_61724(obj, key) {
  return String(key || "")
    .split(".")
    .reduce((o, k) => (o && o[k] != null ? o[k] : null), obj);
}

function asFormat_61724(s, vars) {
  const v = vars || {};
  return String(s).replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? String(v[k]) : ""));
}

function asT_61724(key, vars) {
  const all = window.AS_I18N || {};
  const dict = all[asLang_61724] || all.sv || {};
  const sv = all.sv || {};
  const raw = asGetNested_61724(dict, key);
  const fallback = asGetNested_61724(sv, key);
  const out = (raw != null ? raw : fallback);
  return asFormat_61724(out != null ? out : key, vars);
}

// Map Swedish family names (data) -> internal family key
function asFamilyKey_61724(familyName) {
  const f = String(familyName || "").toLowerCase();
  if (f === "interiör" || f === "interior") return "interior";
  if (f === "exteriör" || f === "exterior") return "exterior";
  if (f === "närområdet" || f === "naromradet" || f === "nearby") return "nearby";
  if (f === "video") return "video";
  return null;
}

// Display label for a Swedish family name
function asFamilyLabel_61724(familyName) {
  const k = asFamilyKey_61724(familyName);
  if (!k) return String(familyName || "");
  return asT_61724("family." + k);
}

// Localize alt text (covers "Interiör 1", "Exteriör 2", "Närområdet 1", "Video 3", etc)
function asLocalizedAlt_61724(data, fallbackNumber) {
  const rawAlt = data && data.alt ? String(data.alt).trim() : "";
  if (!rawAlt) {
    return asT_61724("ui.image_fallback") + " " + String(fallbackNumber);
  }

  // Try split "FamilyName N"
  const m = rawAlt.match(/^(.+?)\s*(\d+)\s*$/);
  if (!m) return rawAlt;

  const fam = m[1].trim();
  const num = m[2].trim();

  const famLabel = asFamilyLabel_61724(fam);
  return famLabel + " " + num;
}
   function asLockBody_61724(lock) {
  document.body.classList.toggle("as-body-lock", !!lock);
}

function asIsDesktop_61724() {
  return window.matchMedia("(min-width: 900px)").matches;
}
function asIsMobile_61724() {
  return !asIsDesktop_61724();
}

function asSetCounter_61724() {
  const total = asImages_61724.length;
  asCounterText_48291.textContent = Math.min(asInitialVisibleCount_61724, total) + "/" + total;
}

/* Ny: välj exakt vilka 5 som ska synas på frontsidan via front: "number1"..."number5" */
function asGetFrontIndexes_61724() {
  const tags = ["number1", "number2", "number3", "number4", "number5"];
  const picked = [];
  const used = new Set();

  // 1) Plocka i exakt ordning number1..number5
  for (const tag of tags) {
    const idx = asImages_61724.findIndex((x) => x && x.front === tag);
    if (idx >= 0 && !used.has(idx)) {
      picked.push(idx);
      used.add(idx);
    }
  }

  // 2) Fyll på med första bästa “resterande” om någon tag saknas
  for (let i = 0; i < asImages_61724.length && picked.length < 5; i++) {
    if (used.has(i)) continue;
    picked.push(i);
    used.add(i);
  }

  return picked.slice(0, 5);
}

function asGetDialogOpenFamilyFromUrl_61724() {
  try {
    const raw = String(window.location.search || "").replace(/^\?/, "").trim();
    if (!raw) return null;

    // 1) Stöd: /dialogopen?exterior (ingen key)
    // Om raw saknar "=" tolkar vi det som family alias direkt
    let val = raw.includes("=") ? null : raw;

    // 2) Stöd: ?dialogopen=exterior eller ?family=exterior
    if (!val) {
      const sp = new URLSearchParams(window.location.search);
      val = sp.get("dialogopen") || sp.get("family") || sp.get("familj") || "";
    }

    val = String(val || "").trim().toLowerCase();
    if (!val) return null;

    // Mappning alias -> exakt family-namn i din data
    if (val === "exterior" || val === "exteriör" || val === "exteriorr") return "Exteriör";
    if (val === "interior" || val === "interiör") return "Interiör";
    if (val === "naromradet" || val === "närområdet" || val === "naromrade" || val === "när" || val === "nearby")
      return "Närområdet";
    if (val === "video" || val === "videos" || val === "film" || val === "filmkliPp" || val === "clip" || val === "clips")
      return "Video";
    if (val === "alla" || val === "all") return "Alla";

    return null;
  } catch (e) {
    return null;
  }
}

function asOpenDialogWithFamily_61724(familyName) {
  // LAZY: injicera video först när "Video" ska användas
  if (familyName === "Video") asEnsureVideosInjected_61724();

  const nextIndexes = asFamilyIndexes_61724(familyName);
  if (!nextIndexes.length) return;

  asActiveFamily_61724 = familyName;
  asActiveFamilyIndexes_61724 = nextIndexes;

  // Default active = första bilden i den familjen
  asActiveGlobalIndex_61724 = asActiveFamilyIndexes_61724[0];

  asBuildFilters_61724();

  // Öppna dialog
  if (!asDialog_91827.open) asDialog_91827.showModal();
  asLockBody_61724(true);

  // Tvinga rebuild av thumbs/hero när layout finns
  asThumbsKey_61724 = null;
  asThumbWindowMetaKey_61724 = null;
  asSlidesKey_61724 = null;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      asRenderHeroAndThumbs_61724({ keepFocus: false, instantSwap: true });
      asCloseBtn_91827.focus({ preventScroll: true });
    });
  });
}

    function asFrontHeroDims_61724() {
      const rect = asWrapper_48291.getBoundingClientRect();
      const w = Math.max(600, Math.min(rect.width, 1600));
      const h = Math.max(360, Math.min(rect.height, 900));
      return { w, h };
    }

    function asFrontSmallDims_61724() {
      const rect = asWrapper_48291.getBoundingClientRect();
      const w = Math.max(300, Math.min(rect.width / (asIsDesktop_61724() ? 4 : 2), 900));
      const h = Math.max(220, Math.min(rect.height / 2, 600));
      return { w, h };
    }

    function asThumbDims_61724() {
      const s = 156;
      return { w: s, h: s };
    }

    function asEscapeHtml_61724(s) {
      return String(s)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
    }

 function asUniqueFamilies_61724() {
  const map = new Map();
  for (const img of asImages_61724) {
    map.set(img.family, (map.get(img.family) || 0) + 1);
  }

  // Lägg till overrides (t.ex. Video) även om familjen inte är injicerad ännu
  if (asFamilyCountOverrides_61724 && typeof asFamilyCountOverrides_61724 === "object") {
    for (const k in asFamilyCountOverrides_61724) {
      if (!Object.prototype.hasOwnProperty.call(asFamilyCountOverrides_61724, k)) continue;
      const forced = Number(asFamilyCountOverrides_61724[k]);
      if (!Number.isFinite(forced) || forced < 0) continue;
      if (!map.has(k)) map.set(k, forced);
      else map.set(k, Math.max(map.get(k) || 0, forced));
    }
  }

  return Array.from(map.entries()).map(([name, count]) => ({ name, count }));
}

    function asFamilyIndexes_61724(familyName) {
      if (familyName === "Alla") return asImages_61724.map((_, idx) => idx);

      const out = [];
      for (let i = 0; i < asImages_61724.length; i++) {
        if (asImages_61724[i].family === familyName) out.push(i);
      }
      return out;
    }

   function asScrollToThumb_61724(btnEl, opts) {
  if (!btnEl) return;

  const c = asThumbs_91827;
  if (!c) return;

  // Desktop: OK att använda scrollIntoView (scrollar inom thumbs-kolumnen)
  if (asIsDesktop_61724()) {
    const r = btnEl.getBoundingClientRect();
    const cr = c.getBoundingClientRect();
    if (r.top < cr.top || r.bottom > cr.bottom) {
      btnEl.scrollIntoView({ block: "nearest", inline: "nearest" });
    }
    return;
  }

  // Mobile: scrolla ENDAST thumbs-containern (aldrig body/modal-body)
  const behavior = opts && opts.behavior ? opts.behavior : "auto";

  const padding = 24; // px “safe zone” so we don’t micro-scroll each step
  const leftEdge = c.scrollLeft + padding;
  const rightEdge = c.scrollLeft + c.clientWidth - padding;

  const btnLeft = btnEl.offsetLeft;
  const btnRight = btnEl.offsetLeft + btnEl.offsetWidth;

  // If already comfortably in view -> do nothing (prevents constant recentering)
  if (btnLeft >= leftEdge && btnRight <= rightEdge) return;

  const max = Math.max(0, c.scrollWidth - c.clientWidth);

  // Scroll just enough to bring it into view (nearest strategy)
  let nextLeft = c.scrollLeft;

  if (btnLeft < leftEdge) {
    nextLeft = btnLeft - padding;
  } else if (btnRight > rightEdge) {
    nextLeft = btnRight - c.clientWidth + padding;
  }

  nextLeft = Math.max(0, Math.min(max, Math.round(nextLeft)));

  c.scrollTo({ left: nextLeft, behavior });
}

    function asCancelSwipeRaf_61724() {
      if (asSwipeRaf_61724 != null) {
        cancelAnimationFrame(asSwipeRaf_61724);
        asSwipeRaf_61724 = null;
      }
    }

    function asUpdateCounterAndNav_61724() {
      const familyPos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
      const totalInFamily = asActiveFamilyIndexes_61724.length;

      asModalHeroCounter_91827.textContent =
        (familyPos >= 0 ? familyPos + 1 : 1) + "/" + totalInFamily;

      const hasPrev = familyPos > 0;
      const hasNext = familyPos >= 0 && familyPos < totalInFamily - 1;

      asNavPrev_91827.style.display = hasPrev ? "" : "none";
      asNavNext_91827.style.display = hasNext ? "" : "none";
      asNavPrev_91827.setAttribute("aria-hidden", hasPrev ? "false" : "true");
      asNavNext_91827.setAttribute("aria-hidden", hasNext ? "false" : "true");
    }

    function asGetMobileSlides_61724() {
      return Array.from(asHeroTrack_91827.querySelectorAll(".as-hero-slide"));
    }

    function asGetMobileWidth_61724() {
      const track = asHeroTrack_91827;
      if (!track) return Math.max(320, window.innerWidth);
      return Math.max(320, track.clientWidth || track.getBoundingClientRect().width || window.innerWidth);
    }

   function asResetSlideClasses_61724(slides) {
  slides.forEach((sl) => {
    sl.classList.remove("is-active", "is-prev", "is-next");
    sl.style.transform = "translateX(0px)";
    sl.style.zIndex = "0";
    sl.style.transition = "";

    // IMPORTANT: Under programmatic multi-step nav we must NOT "hide all" each step,
    // otherwise you get the blink/hiccup between steps.
    if (!asProgrammaticNav_61724) {
      sl.style.opacity = "0";
      sl.style.visibility = "hidden";
    }
  });
}

function asInitFrontGrid_61724() {
  asSetCounter_61724();

  const heroDims = asFrontHeroDims_61724();
  const smallDims = asFrontSmallDims_61724();

  const frontIndexes = asGetFrontIndexes_61724(); // <-- styr ordningen för hero + 4 små

  for (let i = 0; i < asGridItems.length; i++) {
    const el = asGridItems[i];

    const globalIdx = frontIndexes[i];

    if (globalIdx == null || globalIdx < 0 || globalIdx >= asImages_61724.length) {
      el.btn.style.display = "none";
      continue;
    } else {
      el.btn.style.display = "";
    }

    const data = asImages_61724[globalIdx];
    const isHero = i === 0;
    const dims = isHero ? heroDims : smallDims;

    const aspectW = Math.max(1, Math.round(dims.w));
    const aspectH = Math.max(1, Math.round(dims.h));

    // FRONT-HERO: ingen crop (c_limit, endast w). Små: behåll c_fill som innan.
    if (isHero) {
      el.img.src = asCldNoCropFromUploadUrl_55219(data.src, aspectW);
      const widths = [720, 960, 1200, 1440];
      el.img.srcset = asBuildSrcsetNoCropUpload_55219(data.src, widths);
    } else {
      el.img.src = asCldFromUploadUrl_55219(data.src, aspectW, aspectH);
      const widths = [360, 520, 720, 900];
      el.img.srcset = asBuildSrcsetUpload_55219(data.src, widths, aspectW, aspectH);
    }

    el.img.sizes = isHero
      ? asIsDesktop_61724()
        ? "(min-width: 900px) 100vw, 50vw"
        : "50vw"
      : asIsDesktop_61724()
      ? "(min-width: 900px) 25vw, 25vw"
      : "25vw";

   el.img.alt = asLocalizedAlt_61724(data, i + 1);

    // Viktigt: dataset + onclick ska peka på GLOBALT index i asImages_61724
    el.btn.dataset.asIndex = String(globalIdx);
    el.btn.onclick = () => asOpenDialogAtIndex_61724(globalIdx);
  }
}

    window.addEventListener("resize", () => {
      clearTimeout(asResizeT_61724);
      asResizeT_61724 = setTimeout(asInitFrontGrid_61724, 150);
    });

    /* =========================
       FILTERS
       ========================= */
 function asMakeChip_61724(internalName, label, count, id) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "as-filter-chip";
  btn.id = id;

  // Viktigt: intern filterlogik ska fortsätta använda exakta familynamn i din data
  btn.dataset.asFamily = internalName;

  btn.setAttribute("aria-pressed", "false");
  btn.innerHTML =
    "<span>" +
    asEscapeHtml_61724(label) +
    "</span>" +
    "<span class='as-filter-count'>(" +
    count +
    ")</span>";

  btn.addEventListener("click", () => asApplyFilter_61724(internalName));
  return btn;
}

function asBuildFilters_61724() {
  asFilterRow_91827.innerHTML = "";

  const families = asUniqueFamilies_61724();

  // Intern = "Alla" (som idag), label = översatt
  const allChip = asMakeChip_61724(
    "Alla",
    asT_61724("ui.all"),
    asImages_61724.length,
    "asprChip_all_91827"
  );
  asFilterRow_91827.appendChild(allChip);

  for (const f of families) {
    const id = "asprChip_" + f.name.replace(/\s+/g, "_") + "_91827";

    // Intern = f.name (svenska strängen i data), label = översatt familjelabel
    asFilterRow_91827.appendChild(
      asMakeChip_61724(f.name, asFamilyLabel_61724(f.name), f.count, id)
    );
  }

  asSyncChipStates_61724();
}

    function asSyncChipStates_61724() {
      const chips = asFilterRow_91827.querySelectorAll(".as-filter-chip");
      chips.forEach((ch) => {
        const chipName = ch.dataset.asFamily || "";
        ch.setAttribute("aria-pressed", asActiveFamily_61724 === chipName ? "true" : "false");
      });
    }

function asApplyFilter_61724(familyName) {
  // LAZY: injicera video först när "Video" väljs
  if (familyName === "Video") asEnsureVideosInjected_61724();

  const nextIndexes = asFamilyIndexes_61724(familyName);
  if (!nextIndexes.length) return;

  asActiveFamily_61724 = familyName;
  asActiveFamilyIndexes_61724 = nextIndexes;

  if (!asActiveFamilyIndexes_61724.includes(asActiveGlobalIndex_61724)) {
    asActiveGlobalIndex_61724 = asActiveFamilyIndexes_61724[0];
  }

  asSyncChipStates_61724();

  // Filter-byte ska vara instant som thumb-klick (ingen blink / ingen swipe-känsla)
  asRenderHeroAndThumbs_61724({ keepFocus: false, instantSwap: true });
}

    /* =========================
       HERO SLIDES (BUILD ONCE PER FILTER)
       ========================= */
  function asEnsureHeroSlidesBuilt_61724() {
  const key = String(asActiveFamily_61724 || "") + "|" + asActiveFamilyIndexes_61724.join(",");
  const existing = asHeroTrack_91827.querySelectorAll(".as-hero-slide").length;

  if (asSlidesKey_61724 === key && existing === asActiveFamilyIndexes_61724.length) return;

  asSlidesKey_61724 = key;
  asLastStagedIndex_61724 = null;

  asHeroTrack_91827.innerHTML = "";

  const isDesktop = asIsDesktop_61724();
  const slideDims = isDesktop
    ? {
        w: Math.max(1000, Math.min(window.innerWidth * 0.78, 1500)),
        h: Math.max(620, Math.min(window.innerHeight * 0.7, 900)),
      }
    : {
        w: Math.max(720, Math.min(window.innerWidth * 0.92, 1200)),
        h: Math.max(460, Math.min(window.innerHeight * 0.66, 780)),
      };

  // Spara dims så asUpdateSlideLoading_61724 kan bygga video-url/poster korrekt
  asLastSlideDims_61724 = { w: slideDims.w, h: slideDims.h, isDesktop: !!isDesktop };

  for (let i = 0; i < asActiveFamilyIndexes_61724.length; i++) {
    const globalIdx = asActiveFamilyIndexes_61724[i];
    const data = asImages_61724[globalIdx];

    const slide = document.createElement("div");
    slide.className = "as-hero-slide";
    slide.setAttribute("data-as-global-idx", String(globalIdx));
    slide.setAttribute("data-as-family-pos", String(i));

if (data && data.type === "video") {
  const vid = document.createElement("video");
  vid.className = "as-hero-video";

  // Förhindra att video “spiller ut” på mobile (matcha slide-boxen)
  slide.style.overflow = "hidden";
  vid.style.display = "block";
  vid.style.width = "100%";
  vid.style.height = "100%";
  vid.style.objectFit = "cover";
  vid.style.objectPosition = "center";

  // Autoplay-krav
  vid.muted = true;
  vid.setAttribute("muted", ""); // <-- VIKTIGT (Safari)
  vid.playsInline = true;
  vid.setAttribute("playsinline", ""); // <-- VIKTIGT (iOS)
  vid.loop = true;
  vid.autoplay = true;

  // Inga kontroller/knappar
  vid.controls = false;
  vid.removeAttribute("controls"); // säkerställ att inga native controls dyker upp
  vid.setAttribute("controlslist", "nodownload noplaybackrate noremoteplayback");
  vid.setAttribute("disablepictureinpicture", "true");

  // Ladda inte video förrän vi vill
  vid.preload = "none";

  // Poster = PNG-thumbnail om den finns, annars fallback till genererad stillframe
  vid.poster =
    (data && data.thumb ? String(data.thumb).trim() : "") ||
    asCldPosterFromVideoUploadUrl_55219(data.src, slideDims.w, slideDims.h);

  // Bas-src (rå Cloudinary video) – src sätts lazy i asUpdateSlideLoading_61724
  vid.setAttribute("data-as-video-src", String(data.src || ""));

  slide.appendChild(vid);

  /* FIX: skeleton-runtime lyssnar bara på <img>
     Video-slides måste manuellt markeras som "loaded" */
  const host = slide.closest(".as-skeleton") || slide;
  host.classList.add("as-loaded");
} else {
  // IMAGE SLIDE
  const img = document.createElement("img");
  img.alt = (data && data.alt) || "";
  img.decoding = "async";

  // Förhindra att bild “spiller ut” på mobile (matcha slide-boxen)
  slide.style.overflow = "hidden";
  img.style.display = "block";
  img.style.width = "100%";
  img.style.height = "100%";
  img.style.objectFit = "cover";
  img.style.objectPosition = "center";

  /* PERF: stoppa mass-laddning vid dialog-open.
     Alla slides skapas, men browsern får "lazy" som default.
     asUpdateSlideLoading_61724() uppgraderar bara active/near till eager + high priority. */
  img.loading = "lazy";
  img.fetchPriority = "auto";

  img.src = asCldFromUploadUrl_55219(data.src, slideDims.w, slideDims.h);

  const widths = isDesktop ? [900, 1100, 1300, 1500] : [720, 900, 1100, 1300];
  img.srcset = asBuildSrcsetUpload_55219(data.src, widths, slideDims.w, slideDims.h);
  img.sizes = isDesktop ? "(min-width: 900px) 70vw, 92vw" : "92vw";

  slide.appendChild(img);
}


    slide.addEventListener("click", () => {
      asSetActiveGlobalIndex_61724(globalIdx, { focusThumb: false, instantSwap: true });
    });

    asHeroTrack_91827.appendChild(slide);
  }

  asBindMobileSwipe_61724();

  /* PERF: direkt efter build, sätt rätt loading/fetchPriority för active/near */
  asUpdateSlideLoading_61724();
}

  function asUpdateSlideLoading_61724() {
  const slides = asGetMobileSlides_61724();
  if (!slides.length) return;

  const pos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
  if (pos < 0) return;

  const dims = asLastSlideDims_61724 || {
    w: Math.max(720, Math.min(window.innerWidth * 0.92, 1200)),
    h: Math.max(460, Math.min(window.innerHeight * 0.66, 780)),
    isDesktop: asIsDesktop_61724(),
  };

  for (let i = 0; i < slides.length; i++) {
    const slideEl = slides[i];

    const img = slideEl.querySelector("img");
    const vid = slideEl.querySelector("video");

    const near = i === pos || i === pos - 1 || i === pos + 1;

    // IMAGE
    if (img) {
      img.loading = near ? "eager" : "lazy";
      img.fetchPriority = i === pos ? "high" : "auto";
      continue;
    }

    // VIDEO (LAZY): inga bytes förrän near/active
    if (vid) {
      const baseSrc = String(vid.getAttribute("data-as-video-src") || "").trim();
      const isActive = i === pos;

      // När långt bort: frikoppla src helt för att undvika nätverk/cache-tryck
      if (!near) {
        try {
          vid.pause();
        } catch (e) {}
        if (vid.getAttribute("src")) {
          vid.removeAttribute("src");
          vid.load();
        }
        vid.preload = "none";
        continue;
      }

      // Near: metadata; Active: auto + autoplay (muted)
      const desiredPreload = isActive ? "auto" : "metadata";
      vid.preload = desiredPreload;

      // Sätt src först när vi faktiskt är near/active
if (baseSrc && !vid.getAttribute("src")) {
  vid.src = asCldVideoFromUploadUrl_55219(baseSrc);
}


     if (isActive) {
  // Säkra muted/playsinline även om browser tappat state
  vid.muted = true;
  vid.setAttribute("muted", "");
  vid.setAttribute("playsinline", "");

  const tryPlay = () => {
    const p = vid.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  // Om src just satts kan Safari behöva en tick + metadata
  if (vid.readyState >= 1) {
    tryPlay();
  } else {
    vid.addEventListener("loadedmetadata", tryPlay, { once: true });
    // ibland behövs även canplay
    vid.addEventListener("canplay", tryPlay, { once: true });
  }
} else {
  try { vid.pause(); } catch (e) {}
}
    }
  }
}
/* AFTER: hela asStageMobileSlides_61724
   Fixar att du “ser swipe” vid klick genom att:
   1) tvinga transition:none (important) under själva bytet (CSS-transition kan annars trigga)
   2) vid instantSwap: rendera ENDAST active synlig (prev/next hidden) så inget “passerar förbi”
   3) återställ transition efter TVÅ rAF (säker paint-separation)
*/
function asStageMobileSlides_61724(force, instantSwap) {
  const slides = asGetMobileSlides_61724();
  if (!slides.length) return;

  const w = asGetMobileWidth_61724();
  const step = w + asSlideGap_61724;

  const pos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
  if (pos < 0) return;

  if (!force && asLastStagedIndex_61724 === asActiveGlobalIndex_61724 && !asDragging_61724) return;
  asLastStagedIndex_61724 = asActiveGlobalIndex_61724;

  const prevPos = pos > 0 ? pos - 1 : null;
  const nextPos = pos < slides.length - 1 ? pos + 1 : null;

  // HARD KILL transitions BEFORE any hide/reset (annars kan CSS opacity/transform transition blinka)
  if (instantSwap) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.setProperty("transition", "none", "important");
      slides[i].style.setProperty("will-change", "auto", "");
    }
  }

  asResetSlideClasses_61724(slides);

  const activeSlide = slides[pos] || null;
  const prevSlide = prevPos != null ? slides[prevPos] : null;
  const nextSlide = nextPos != null ? slides[nextPos] : null;

  // Vid instantSwap: visa bara active (så inget “swipas förbi” visuellt)
  if (instantSwap) {
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.opacity = "0";
      slides[i].style.visibility = "hidden";
      slides[i].style.zIndex = "0";
    }
  }

  // Positionera prev/next (behövs för swipe-läge), men håll dem dolda vid instantSwap
  if (prevSlide) {
    prevSlide.classList.add("is-prev");
    prevSlide.style.zIndex = "1";
    prevSlide.style.transform = `translateX(${-step}px)`;
    if (!instantSwap) {
      prevSlide.style.opacity = "1";
      prevSlide.style.visibility = "visible";
    }
  }

  if (nextSlide) {
    nextSlide.classList.add("is-next");
    nextSlide.style.zIndex = "1";
    nextSlide.style.transform = `translateX(${step}px)`;
    if (!instantSwap) {
      nextSlide.style.opacity = "1";
      nextSlide.style.visibility = "visible";
    }
  }

  if (activeSlide) {
    activeSlide.classList.add("is-active");
    activeSlide.style.zIndex = "2";
    activeSlide.style.transform = "translateX(0px)";
    activeSlide.style.opacity = "1";
    activeSlide.style.visibility = "visible";
  }

  if (instantSwap) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        for (let i = 0; i < slides.length; i++) {
          slides[i].style.removeProperty("transition");
        }
      });
    });
  }

  asUpdateSlideLoading_61724();
}



    function asApplyDragMobile_61724(dx) {
      asCancelSwipeRaf_61724();
      asSwipeRaf_61724 = requestAnimationFrame(() => {
        const slides = asGetMobileSlides_61724();
        if (!slides.length) return;

        const w = asGetMobileWidth_61724();
        const step = w + asSlideGap_61724;

        const pos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
        if (pos < 0) return;

        const active = slides[pos];
        const prev = pos > 0 ? slides[pos - 1] : null;
        const next = pos < slides.length - 1 ? slides[pos + 1] : null;

        if (active) {
          active.style.transition = "transform 0s";
          active.style.transform = `translateX(${dx}px)`;
        }

        if (dx < 0 && next) {
          next.style.transition = "transform 0s";
          next.style.transform = `translateX(${step + dx}px)`;
        } else if (dx > 0 && prev) {
          prev.style.transition = "transform 0s";
          prev.style.transform = `translateX(${-step + dx}px)`;
        }
      });
    }

   function asEndDragMobile_61724(dx) {
      asCancelSwipeRaf_61724();

      const slides = asGetMobileSlides_61724();
      if (!slides.length) return;

      const w = asGetMobileWidth_61724();
      const step = w + asSlideGap_61724;

      const pos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
      if (pos < 0) return;

      const active = slides[pos];
      const prevPos = pos > 0 ? pos - 1 : null;
      const nextPos = pos < slides.length - 1 ? pos + 1 : null;
      const prev = prevPos != null ? slides[prevPos] : null;
      const next = nextPos != null ? slides[nextPos] : null;

      const switchThreshold = Math.max(40, Math.min(120, Math.round(w * 0.2)));
      const goNext = dx < -switchThreshold && !!next;
      const goPrev = dx > switchThreshold && !!prev;

      const finish = () => {
        if (goNext) {
asSetActiveGlobalIndex_61724(asActiveFamilyIndexes_61724[pos + 1], { focusThumb: false, instantSwap: false });
        } else if (goPrev) {
asSetActiveGlobalIndex_61724(asActiveFamilyIndexes_61724[pos - 1], { focusThumb: false, instantSwap: false });
        } else {
          asStageMobileSlides_61724(true, false);
        }
      };

      if (goNext) {
        if (active) {
          active.style.transition = "transform 0.25s var(--as-ease)";
          active.style.transform = `translateX(${-step}px)`;
        }
        if (next) {
          next.style.transition = "transform 0.25s var(--as-ease), opacity 0.15s var(--as-ease)";
          next.style.transform = "translateX(0px)";
        }
        if (active) active.addEventListener("transitionend", finish, { once: true });
        else finish();
        return;
      }

      if (goPrev) {
        if (active) {
          active.style.transition = "transform 0.25s var(--as-ease)";
          active.style.transform = `translateX(${step}px)`;
        }
        if (prev) {
          prev.style.transition = "transform 0.25s var(--as-ease), opacity 0.15s var(--as-ease)";
          prev.style.transform = "translateX(0px)";
        }
        if (active) active.addEventListener("transitionend", finish, { once: true });
        else finish();
        return;
      }

      // Snap back
      if (active) {
        active.style.transition = "transform 0.2s var(--as-ease)";
        active.style.transform = "translateX(0px)";
      }
      if (dx < 0 && next) {
        next.style.transition = "transform 0.2s var(--as-ease)";
        next.style.transform = `translateX(${step}px)`;
      } else if (dx > 0 && prev) {
        prev.style.transition = "transform 0.2s var(--as-ease)";
        prev.style.transform = `translateX(${-step}px)`;
      }
      if (active) active.addEventListener("transitionend", finish, { once: true });
      else finish();
    }

    function asBindMobileSwipe_61724() {
      if (asMobileSwipeBound_61724) return;
      asMobileSwipeBound_61724 = true;

      const track = asHeroTrack_91827;

      function canSwipeNow() {
        const pos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
        if (pos < 0) return false;
        return pos > 0 || pos < asActiveFamilyIndexes_61724.length - 1;
      }

      // TOUCH
      track.addEventListener(
        "touchstart",
        (e) => {
          if (!canSwipeNow()) return;
          asDragStartX_61724 = e.touches[0].clientX;
          asDragCurrentX_61724 = asDragStartX_61724;
          asDragging_61724 = true;
asStageMobileSlides_61724(true, false);
        },
        { passive: true }
      );

      track.addEventListener(
        "touchmove",
        (e) => {
          if (!asDragging_61724 || asDragStartX_61724 == null) return;
          asDragCurrentX_61724 = e.touches[0].clientX;
          const dx = asDragCurrentX_61724 - asDragStartX_61724;
          if (Math.abs(dx) < 2) return;
          asApplyDragMobile_61724(dx);
        },
        { passive: true }
      );

      track.addEventListener(
        "touchend",
        (e) => {
          if (!asDragging_61724 || asDragStartX_61724 == null) return;
          const endX =
            e.changedTouches && e.changedTouches[0]
              ? e.changedTouches[0].clientX
              : asDragCurrentX_61724;
          const dx = endX - asDragStartX_61724;
          asEndDragMobile_61724(dx);
          asDragStartX_61724 = null;
          asDragging_61724 = false;
        },
        { passive: true }
      );

      // MOUSE
      track.addEventListener("mousedown", (e) => {
        if (!canSwipeNow()) return;
        asDragStartX_61724 = e.clientX;
        asDragCurrentX_61724 = asDragStartX_61724;
        asDragging_61724 = true;
        asStageMobileSlides_61724(true);
        e.preventDefault();
      });

      track.addEventListener("mousemove", (e) => {
        if (!asDragging_61724 || asDragStartX_61724 == null) return;
        asDragCurrentX_61724 = e.clientX;
        const dx = asDragCurrentX_61724 - asDragStartX_61724;
        if (Math.abs(dx) < 2) return;
        asApplyDragMobile_61724(dx);
      });

      window.addEventListener("mouseup", (e) => {
        if (!asDragging_61724 || asDragStartX_61724 == null) return;
        const dx = e.clientX - asDragStartX_61724;
        asEndDragMobile_61724(dx);
        asDragStartX_61724 = null;
        asDragging_61724 = false;
      });

      track.addEventListener("mouseleave", () => {
        if (!asDragging_61724 || asDragStartX_61724 == null) return;
        asEndDragMobile_61724(0);
        asDragStartX_61724 = null;
        asDragging_61724 = false;
      });

      window.addEventListener(
        "resize",
        () => {
          requestAnimationFrame(() => asStageMobileSlides_61724(true));
        },
        { passive: true }
      );
    }

 function asSyncThumbStates_61724() {
  const btns = asThumbs_91827.querySelectorAll(".as-thumb-btn");
  let activeBtn = null;

  btns.forEach((b) => {
    const isActive = b.id.endsWith("_" + String(asActiveGlobalIndex_61724).padStart(4, "0"));
    b.setAttribute("aria-current", isActive ? "true" : "false");
    if (isActive) activeBtn = b;
  });

  return activeBtn;
}

/* Ny: “thumbs följer med i sidled” via fönster (carousel-window) som reordrar items */
function asThumbMetrics_61724() {
  const c = asThumbs_91827;
  const n = (asActiveFamilyIndexes_61724 || []).length;

  // Försök flera källor (dialog kan ge 0 innan paint)
  let containerW = c ? (c.clientWidth || 0) : 0;

  if (containerW < 10 && c) {
    const r = c.getBoundingClientRect();
    if (r && r.width) containerW = r.width;
  }

  // Fallback till modal-shell / viewport om thumbs fortfarande rapporterar 0
  if (containerW < 10) {
    containerW =
      (asModalShell_91827 && (asModalShell_91827.clientWidth || asModalShell_91827.getBoundingClientRect().width)) ||
      window.innerWidth ||
      0;
  }

  containerW = Math.max(0, Math.round(containerW));

  const thumbW = asIsMobile_61724() ? 70 : 84;

  let gap = 8;
  if (c) {
    const cs = window.getComputedStyle(c);
    const g = cs.gap || cs.columnGap || cs.rowGap;
    const parsed = parseFloat(g);
    if (!Number.isNaN(parsed)) gap = parsed;
  }

  return { n, containerW, thumbW, gap };
}

function asThumbAllFits_61724() {
  const m = asThumbMetrics_61724();
  if (!m.n) return true;

  // Total bredd för alla items i en rad
  const totalNeeded = m.n * m.thumbW + Math.max(0, m.n - 1) * m.gap;

  // +1 px slack för rounding
  return totalNeeded <= (m.containerW + 1);
}

function asThumbWindowSize_61724() {
  const m = asThumbMetrics_61724();
  const n = m.n;
  if (!n) return 0;

  if (asThumbAllFits_61724()) return n;

  // Hur många får plats samtidigt i containern (utan scroll), baserat på faktisk bredd
  const perRow = Math.max(1, Math.floor((m.containerW + m.gap) / (m.thumbW + m.gap)));

  return Math.max(1, Math.min(perRow, n));
}

/* AFTER */
function asThumbWindowMetaKeyBuild_61724() {
  const list = asActiveFamilyIndexes_61724 || [];
  const n = list.length;
  if (!n) return "empty";
  const visible = Math.max(1, Math.min(asThumbWindowSize_61724(), n));
  return String(asActiveFamily_61724 || "") + "|" + list.join(",") + "|v" + visible;
}

/* Ny: uppdatera start ENDAST om active hamnar utanför synligt fönster */
function asEnsureThumbWindowStart_61724() {
  const list = asActiveFamilyIndexes_61724 || [];
  const n = list.length;
  if (!n) return;

  // Om allt får plats -> ingen windowlogik
  if (asThumbAllFits_61724()) {
    asThumbWindowStart_61724 = 0;
    asThumbWindowMetaKey_61724 = asThumbWindowMetaKeyBuild_61724();
    return;
  }

  const visible = Math.max(1, Math.min(asThumbWindowSize_61724(), n));
  const metaKey = asThumbWindowMetaKeyBuild_61724();

  // Om family/list/visible ändras -> resetta start till 0 (stabilt, ingen "centrering")
  if (asThumbWindowMetaKey_61724 !== metaKey) {
    asThumbWindowMetaKey_61724 = metaKey;
    asThumbWindowStart_61724 = 0;
  }

  const activePos = list.indexOf(asActiveGlobalIndex_61724);
  const pos = activePos >= 0 ? activePos : 0;

  // Clamp start (fönstret ska inte wrap:a)
  const maxStart = Math.max(0, n - visible);
  asThumbWindowStart_61724 = Math.max(0, Math.min(maxStart, asThumbWindowStart_61724));

  const start = asThumbWindowStart_61724;
  const end = start + visible - 1;

  // Om active är inom fönstret -> gör ingenting (exakt vad du vill)
  if (pos >= start && pos <= end) return;

  // Om active ligger efter fönstret -> flytta precis så att den får plats sist
  if (pos > end) {
    asThumbWindowStart_61724 = Math.min(maxStart, pos - visible + 1);
    return;
  }

  // Om active ligger före fönstret -> flytta precis så att den får plats först
  if (pos < start) {
    asThumbWindowStart_61724 = Math.max(0, pos);
    return;
  }
}

function asBuildThumbWindowIndexes_61724() {
  const list = asActiveFamilyIndexes_61724 || [];
  const n = list.length;
  if (!n) return [];

  // Om allt får plats -> bygg hela listan i ordning (ingen reorder)
  if (asThumbAllFits_61724()) {
    return list.slice();
  }

  const visible = Math.max(1, Math.min(asThumbWindowSize_61724(), n));

  // Viktigt: säkra start endast vid "utanför fönster"
  asEnsureThumbWindowStart_61724();

  const maxStart = Math.max(0, n - visible);
  const start = Math.max(0, Math.min(maxStart, asThumbWindowStart_61724));

  const out = [];
  for (let i = 0; i < visible; i++) {
    out.push(list[start + i]);
  }
  return out;
}

function asBuildThumbWindowKey_61724() {
  const list = asActiveFamilyIndexes_61724 || [];
  const n = list.length;
  if (!n) return "empty";

  // Om allt får plats -> key för full list (ingen reorder)
  if (asThumbAllFits_61724()) {
    return "full|" + String(asActiveFamily_61724 || "") + "|" + list.join(",");
  }

  const visible = Math.max(1, Math.min(asThumbWindowSize_61724(), n));

  // Säkerställ start (flytta bara om active är utanför fönstret)
  asEnsureThumbWindowStart_61724();

  const maxStart = Math.max(0, n - visible);
  const start = Math.max(0, Math.min(maxStart, asThumbWindowStart_61724));

  // Key ändras bara när start faktiskt ändras
  return String(asActiveFamily_61724 || "") + "|" + list.join(",") + "|v" + visible + "|s" + start;
}

function asEnsureThumbWindowBuilt_61724() {
  const nextKey = asBuildThumbWindowKey_61724();

  const visibleIndexes = asBuildThumbWindowIndexes_61724();
  const expectedCount = visibleIndexes.length;

  const existingCount = asThumbs_91827.querySelectorAll(".as-thumb-btn").length;

  if (asThumbsKey_61724 === nextKey && existingCount === expectedCount) return;

  asThumbsKey_61724 = nextKey;
  asThumbs_91827.innerHTML = "";

  const thumbDims = asThumbDims_61724();

  for (let i = 0; i < visibleIndexes.length; i++) {
    const globalIdx = visibleIndexes[i];
    const data = asImages_61724[globalIdx];

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "as-thumb-btn";
    btn.id = "asprThumbBtn_91827_" + String(globalIdx).padStart(4, "0");
  btn.setAttribute(
  "aria-label",
  asT_61724("ui.select_image_prefix") + " " + asLocalizedAlt_61724(data, i + 1)
);

const img = document.createElement("img");
img.className = "as-thumb-img";
img.alt = asLocalizedAlt_61724(data, i + 1);
    img.loading = "lazy";
    img.decoding = "async";

    // VIDEO thumbs: använd poster-frame från videon (lätt JPG). Bilder: behåll befintlig logik.
// VIDEO thumbs: använd PNG-thumbnail om den finns. Annars fallback till genererad stillframe (JPG).
if (data && data.type === "video") {
  const thumbPng = data && data.thumb ? String(data.thumb).trim() : "";

  if (thumbPng) {
    img.src = thumbPng;
    img.srcset = [
      thumbPng + " 120w",
      thumbPng + " 156w",
      thumbPng + " 220w",
    ].join(", ");
  } else {
    img.src = asCldPosterFromVideoUploadUrl_55219(data.src, thumbDims.w, thumbDims.h);
    img.srcset = [
      asCldPosterFromVideoUploadUrl_55219(data.src, 120, 120) + " 120w",
      asCldPosterFromVideoUploadUrl_55219(data.src, 156, 156) + " 156w",
      asCldPosterFromVideoUploadUrl_55219(data.src, 220, 220) + " 220w",
    ].join(", ");
  }
} else {
  img.src = asCldFromUploadUrl_55219(data.src, thumbDims.w, thumbDims.h);
  img.srcset = asBuildSrcsetUpload_55219(data.src, [120, 156, 220], thumbDims.w, thumbDims.h);
}


    img.sizes = asIsMobile_61724() ? "70px" : "78px";

    btn.appendChild(img);

    // Klick på thumb -> byt bild (instantSwap)
    btn.addEventListener("click", () =>
      asSetActiveGlobalIndex_61724(globalIdx, { focusThumb: false, instantSwap: true })
    );

    asThumbs_91827.appendChild(btn);
  }
}
function asRenderHeroAndThumbs_61724(opts) {
  const o = opts || {};
  const instantSwap = !!o.instantSwap;

  // 1) Hero slides: build only when filter changes
  asEnsureHeroSlidesBuilt_61724();

  // 2) Thumbs: bygg full list om allt får plats, annars window-reorder
  asEnsureThumbWindowBuilt_61724();

  // 3) Uppdatera active-state
  const activeThumbBtn = asSyncThumbStates_61724();

  if (activeThumbBtn) {
    if (o.keepFocus) activeThumbBtn.focus({ preventScroll: true });
  }

  // 4) Stage slides + counters/nav
  asStageMobileSlides_61724(true, instantSwap);
  asUpdateCounterAndNav_61724();
}
     function asSetActiveGlobalIndex_61724(globalIdx, opts) {
  const o = opts || {};
  const silentStage = !!o.silentStage;
  const instantSwap = !!o.instantSwap;

  asActiveGlobalIndex_61724 = globalIdx;

  // Thumbs: flytta fönstret ENDAST om active är utanför synliga thumbs
  asEnsureThumbWindowBuilt_61724();

  const activeThumbBtn = asSyncThumbStates_61724();

  if (!silentStage) {
    asStageMobileSlides_61724(true, instantSwap);
    asUpdateCounterAndNav_61724();
  }

  if (o.focusThumb && activeThumbBtn) {
    activeThumbBtn.focus({ preventScroll: true });
  }

  return activeThumbBtn || null;
}


    function asClearProgrammaticNav_61724() {
      asProgrammaticNav_61724 = false;
      asProgrammaticNavAbort_61724 = false;
    }

   function asAnimateOneStep_61724(dir, onDone) {
  // dir: +1 (next) or -1 (prev)
  if (!asDialog_91827.open) {
    onDone && onDone(false);
    return;
  }

  const slides = asGetMobileSlides_61724();
  if (!slides.length) {
    onDone && onDone(false);
    return;
  }

  const w = asGetMobileWidth_61724();
  const step = w + asSlideGap_61724;

  const pos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
  if (pos < 0) {
    onDone && onDone(false);
    return;
  }

  const nextPos = pos + dir;
  if (nextPos < 0 || nextPos >= slides.length) {
    onDone && onDone(false);
    return;
  }

  const active = slides[pos] || null;
  const next = slides[nextPos] || null;

  if (!active || !next) {
    onDone && onDone(false);
    return;
  }

  // Ensure both are visible for the animation (no global reset/hide in the middle of steps)
  active.style.opacity = "1";
  active.style.visibility = "visible";
  active.style.zIndex = "2";

  next.style.opacity = "1";
  next.style.visibility = "visible";
  next.style.zIndex = "1";

  // Hard-set starting positions with transitions off (prevents "snap then blink")
  active.style.transition = "transform 0s";
  next.style.transition = "transform 0s";

  if (dir > 0) {
    next.style.transform = `translateX(${step}px)`;
  } else {
    next.style.transform = `translateX(${-step}px)`;
  }

  // Force layout so the starting transforms apply
  // eslint-disable-next-line no-unused-expressions
  active.offsetHeight;

  // Animate one card-step (exactly like a normal swipe)
  active.style.transition = "transform 0.25s var(--as-ease)";
  next.style.transition = "transform 0.25s var(--as-ease)";

  if (dir > 0) {
    active.style.transform = `translateX(${-step}px)`;
    next.style.transform = "translateX(0px)";
  } else {
    active.style.transform = `translateX(${step}px)`;
    next.style.transform = "translateX(0px)";
  }

  const cleanupAndDone = (e) => {
    // Guard: only finish on the transform transition
    if (e && e.propertyName && e.propertyName !== "transform") return;

    // IMPORTANT: update state AFTER the card animation completes,
    // but do NOT trigger full restage/scroll during programmatic stepping.
    const targetGlobalIdx = asActiveFamilyIndexes_61724[nextPos];
    asSetActiveGlobalIndex_61724(targetGlobalIdx, { focusThumb: false, silentStage: true });

    // Prepare clean staged positions for the next step (still in programmatic mode => no hiding)
    asStageMobileSlides_61724(true);
    asUpdateCounterAndNav_61724();

    onDone && onDone(true);
  };

  active.addEventListener("transitionend", cleanupAndDone, { once: true });
}

function asGoToGlobalIndexAnimated_61724(targetGlobalIdx, opts) {
  if (!asDialog_91827.open) {
    asSetActiveGlobalIndex_61724(targetGlobalIdx, { focusThumb: !!(opts && opts.focusThumb) });
    return;
  }

  const curPos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
  const targetPos = asActiveFamilyIndexes_61724.indexOf(targetGlobalIdx);

  // If target is not in current family (shouldn't happen from thumbs), fallback to direct set
  if (curPos < 0 || targetPos < 0) {
    asSetActiveGlobalIndex_61724(targetGlobalIdx, { focusThumb: !!(opts && opts.focusThumb) });
    return;
  }

  const diff = targetPos - curPos;
  const steps = Math.abs(diff);

  // Same / adjacent = direct set (no need to simulate multi-swipe)
  if (steps <= 1) {
    asSetActiveGlobalIndex_61724(targetGlobalIdx, { focusThumb: !!(opts && opts.focusThumb) });
    return;
  }

  // Abort any current programmatic nav and start a new one
  asProgrammaticNavAbort_61724 = true;

  // Start fresh on next tick
  requestAnimationFrame(() => {
    asProgrammaticNavAbort_61724 = false;

    // IMPORTANT: set programmatic mode BEFORE stepping so we don't reset/hide everything between steps
    asProgrammaticNav_61724 = true;

    // Temporarily disable interactions during stepping (prevents double clicks / competing transitions)
    const prevTrackPE = asHeroTrack_91827.style.pointerEvents;
    const prevThumbsPE = asThumbs_91827.style.pointerEvents;
    asHeroTrack_91827.style.pointerEvents = "none";
    asThumbs_91827.style.pointerEvents = "none";

    // Stage once so we have a clean baseline (prev/active/next placed correctly)
    asStageMobileSlides_61724(true);
    asUpdateCounterAndNav_61724();

    const dir = diff > 0 ? 1 : -1;

    const finishProgrammatic = () => {
      // Leave programmatic mode
      asProgrammaticNav_61724 = false;
      asProgrammaticNavAbort_61724 = false;

      // Restore interactions
      asHeroTrack_91827.style.pointerEvents = prevTrackPE || "";
      asThumbs_91827.style.pointerEvents = prevThumbsPE || "";

      // Final clean stage (now normal hiding rules apply again)
      asStageMobileSlides_61724(true);
      asUpdateCounterAndNav_61724();

      const activeThumbBtn = asSyncThumbStates_61724();
      if (activeThumbBtn && !asDragging_61724) {
        asScrollToThumb_61724(activeThumbBtn, { behavior: "auto" });
      }

      if (opts && opts.focusThumb && activeThumbBtn) {
        activeThumbBtn.focus({ preventScroll: true });
      }
    };

    const abortProgrammatic = () => {
      asProgrammaticNav_61724 = false;
      asProgrammaticNavAbort_61724 = false;

      asHeroTrack_91827.style.pointerEvents = prevTrackPE || "";
      asThumbs_91827.style.pointerEvents = prevThumbsPE || "";

      asStageMobileSlides_61724(true);
      asUpdateCounterAndNav_61724();
    };

    const run = () => {
      if (asProgrammaticNavAbort_61724 || !asDialog_91827.open) {
        abortProgrammatic();
        return;
      }

      const nowPos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
      if (nowPos === targetPos) {
        finishProgrammatic();
        return;
      }

      asAnimateOneStep_61724(dir, (ok) => {
        if (!ok) {
          // Fallback: snap directly if animation couldn't run
          abortProgrammatic();
          asSetActiveGlobalIndex_61724(targetGlobalIdx, { focusThumb: !!(opts && opts.focusThumb) });
          return;
        }

        // Tiny defer so each step feels like a real swipe and avoids "batching" paints
        setTimeout(run, 0);
      });
    };

    run();
  });
}

   function asOpenDialogAtIndex_61724(index) {
  const clicked = asImages_61724[index];
  asActiveGlobalIndex_61724 = index;

  // Default filter = family of clicked image
  asActiveFamily_61724 = clicked.family;
  asActiveFamilyIndexes_61724 = asFamilyIndexes_61724(asActiveFamily_61724);

  asBuildFilters_61724();

  // 1) Öppna först så thumbs-containern får riktig bredd
  if (!asDialog_91827.open) asDialog_91827.showModal();
  asLockBody_61724(true);

  // 2) Tvinga rebuild av thumbs/hero när layout finns (annars blir windowSize=1 första gången)
  asThumbsKey_61724 = null;
  asThumbWindowMetaKey_61724 = null;
  asSlidesKey_61724 = null;

  // 3) Rendera efter paint (2 rAF = säkrare i Webflow/dialog)
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      asRenderHeroAndThumbs_61724({ keepFocus: false, instantSwap: true });
      asCloseBtn_91827.focus({ preventScroll: true });
    });
  });
}

    function asCloseDialog_61724() {
      if (asDialog_91827.open) asDialog_91827.close();
      asLockBody_61724(false);
    }

 /* AFTER: hela asStepFamily_61724
   - Pilar + keyboard: behåller “swipe card look” (animerar som ett kort-swipe)
   - Thumbs/hero-click: fortsatt instantSwap (se dina click-handlers)
*/
function asStepFamily_61724(dir) {
  const pos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
  if (pos < 0) return;

  const nextPos = pos + dir;
  if (nextPos < 0 || nextPos >= asActiveFamilyIndexes_61724.length) return;

  // Adjacent nav ska kännas som swipe-kort (inte instant)
  asAnimateAdjacentNav_61724(dir);
}

/* Ny: animerar exakt ett steg (dir = +1 / -1) med samma “card swipe” känsla */
function asAnimateAdjacentNav_61724(dir) {
  if (!asDialog_91827.open) return;

  const slides = asGetMobileSlides_61724();
  if (!slides.length) {
    // Fallback: direkt byte om slides inte finns
    const pos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
    const nextPos = pos + dir;
    if (nextPos < 0 || nextPos >= asActiveFamilyIndexes_61724.length) return;
    asSetActiveGlobalIndex_61724(asActiveFamilyIndexes_61724[nextPos], { focusThumb: false, instantSwap: false });
    return;
  }

  const w = asGetMobileWidth_61724();
  const step = w + asSlideGap_61724;

  const pos = asActiveFamilyIndexes_61724.indexOf(asActiveGlobalIndex_61724);
  if (pos < 0) return;

  const nextPos = pos + dir;
  if (nextPos < 0 || nextPos >= slides.length) return;

  const active = slides[pos] || null;
  const next = slides[nextPos] || null;
  if (!active || !next) return;

  // Se till att båda är synliga under anim
  active.style.opacity = "1";
  active.style.visibility = "visible";
  active.style.zIndex = "2";

  next.style.opacity = "1";
  next.style.visibility = "visible";
  next.style.zIndex = "1";

  // Start-läge utan transitions (så inget “snap”)
  active.style.setProperty("transition", "none", "important");
  next.style.setProperty("transition", "none", "important");

  active.style.transform = "translateX(0px)";
  next.style.transform = dir > 0 ? `translateX(${step}px)` : `translateX(${-step}px)`;

  // Force reflow så startläget appliceras
  // eslint-disable-next-line no-unused-expressions
  active.offsetHeight;

  // Kör card-swipe
  active.style.removeProperty("transition");
  next.style.removeProperty("transition");
  active.style.transition = "transform 0.25s var(--as-ease)";
  next.style.transition = "transform 0.25s var(--as-ease)";

  active.style.transform = dir > 0 ? `translateX(${-step}px)` : `translateX(${step}px)`;
  next.style.transform = "translateX(0px)";

  const onDone = (e) => {
    if (e && e.propertyName && e.propertyName !== "transform") return;

    const targetGlobalIdx = asActiveFamilyIndexes_61724[nextPos];

    // Uppdatera state utan att trigga instantSwap
    asSetActiveGlobalIndex_61724(targetGlobalIdx, { focusThumb: false, silentStage: true });

    // Staga om rent (prev/active/next korrekt)
    asStageMobileSlides_61724(true, false);
    asUpdateCounterAndNav_61724();
  };

  active.addEventListener("transitionend", onDone, { once: true });
}


/* AFTER: oförändrat (men nu ger asStepFamily_61724 swipe-card anim via asAnimateAdjacentNav_61724) */
asCloseBtn_91827.addEventListener("click", asCloseDialog_61724);
asNavPrev_91827.addEventListener("click", () => asStepFamily_61724(-1));
asNavNext_91827.addEventListener("click", () => asStepFamily_61724(1));

    // Click on dialog/backdrop should NOT close
    // (medvetet borttagen click-listener på asDialog_91827)

    asDialog_91827.addEventListener("close", () => asLockBody_61724(false));


  /* AFTER: oförändrat (nu blir även keyboard “swipe card look” via asStepFamily_61724) */
document.addEventListener("keydown", (e) => {
  if (!asDialog_91827.open) return;

  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
    e.preventDefault();
    asStepFamily_61724(1);
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
    e.preventDefault();
    asStepFamily_61724(-1);
  }
  if (e.key === "Escape") {
    // dialog will close itself, but keep body lock in sync
    // (close event handler already clears)
  }
});


    /* =========================
       SKELETON RUNTIME (extracted)
       ========================= */
    (function asprSkeletonRuntime_77441() {
      function asBindSkeletonImg_77441(img) {
        if (!img || img.__asSkeletonBound_77441) return;
        img.__asSkeletonBound_77441 = true;

        const host = img.closest(".as-skeleton");
        if (!host) return;

        function sync() {
          const done = img.complete && img.naturalWidth > 0;
          if (done) {
            host.classList.add("as-loaded");
            return true;
          }
          return false;
        }

        if (sync()) return;

        img.addEventListener(
          "load",
          () => {
            host.classList.add("as-loaded");
          },
          { once: true }
        );

        img.addEventListener(
          "error",
          () => {
            host.classList.add("as-loaded");
          },
          { once: true }
        );
      }

      function asScan_77441(root) {
        if (!root) return;
        const imgs = root.querySelectorAll(".as-skeleton img");
        imgs.forEach(asBindSkeletonImg_77441);
      }

      // Initial scan
      asScan_77441(document);

      const watchRoots = [
        document.getElementById("asprWrapper_48291"),
        document.getElementById("asprHeroWrap_91827"),
        document.getElementById("asprThumbs_91827"),
      ].filter(Boolean);

      const obs = new MutationObserver((mutations) => {
        for (const m of mutations) {
          for (const node of m.addedNodes) {
            if (!(node instanceof Element)) continue;

            if (node.matches && node.matches("img")) asBindSkeletonImg_77441(node);

            if (node.querySelectorAll) {
              const imgs = node.querySelectorAll("img");
              imgs.forEach(asBindSkeletonImg_77441);
            }
          }
        }
      });

      watchRoots.forEach((r) => {
        obs.observe(r, { childList: true, subtree: true });
      });
    })();
 /* =========================
       INIT
       ========================= */
    asInitFrontGrid_61724();
    asSetCounter_61724();

    // Ny: öppna dialogen via URL, t.ex. /dialogopen?exterior eller ?dialogopen=exterior
    (function asMaybeOpenDialogFromUrl_61724() {
      const family = asGetDialogOpenFamilyFromUrl_61724();
      if (!family) return;

      // Vänta en paint så layout/dims finns (stabilt i Webflow)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          asOpenDialogWithFamily_61724(family);
        });
      });
    })();

    if (asImages_61724.length < asInitialVisibleCount_61724) {
      for (let i = asImages_61724.length; i < asInitialVisibleCount_61724; i++) {
        if (asGridItems[i]) asGridItems[i].btn.style.display = "none";
      }
      asSetCounter_61724();
    }
  });
})();
