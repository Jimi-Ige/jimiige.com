/* =============================================================================
   jimiige.com — design-system runtime
   Three small jobs, all of them things CSS alone cannot do on a static site:
     1. fill the numbered margin rail
     2. build RiskMatrix from the ported band() so severity lands on the
        anti-diagonal
     3. build MaturityMeter so its worded captions come from one list
   Plus the mobile nav toggle. No dependencies. Safe to load with `defer`.
   ============================================================================= */
(function () {
  "use strict";

  /* ---------------------------------------------------------------------------
     1. The numbered rail
     The count is deliberately NOT derived from a measured height. A measured
     count goes stale the moment the document reflows and the numbering silently
     stops short of the page bottom. Over-render a generous fixed run and let
     .rail's overflow crop the tail, exactly as the copper rules do off CSS inset.
     --------------------------------------------------------------------------- */
  /* 999 x the banner's 36px gutter step = 35,964px of document, which is far
     past the tallest page here. Capped at three digits so the numeral column
     stays inside the 2.78% gutter at every width instead of being clipped. */
  var RAIL_LINES = 999;

  function fillRail() {
    var host = document.querySelector(".rail-nums");
    if (!host || host.firstChild) return;
    var out = [];
    for (var i = 1; i <= RAIL_LINES; i++) {
      out.push(i < 10 ? "0" + i : String(i));
    }
    host.textContent = out.join("\n");
  }

  /* ---------------------------------------------------------------------------
     1b. The reading head
     A slide-rule cursor for the margin: the first copper rule inks in behind
     you and a small square index rides the pair. Position only — no colour
     carries meaning here, because in this system colour that means anything
     means severity.
     --------------------------------------------------------------------------- */
  function initReadingHead() {
    var rail = document.querySelector(".rail");
    if (!rail || rail.querySelector(".rail-head")) return;

    var read = document.createElement("span");
    read.className = "rail-read";
    var head = document.createElement("span");
    head.className = "rail-head";
    rail.appendChild(read);
    rail.appendChild(head);

    var ticking = false;
    function place() {
      ticking = false;
      var railH = rail.offsetHeight;
      if (!railH || !rail.offsetParent) return;
      var scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      var p = scrollable > 0 ? window.pageYOffset / scrollable : 0;
      if (p < 0) p = 0;
      if (p > 1) p = 1;
      var y = 14 + p * (railH - 28);
      head.style.top = y + "px";
      read.style.height = Math.max(0, y - 14) + "px";
    }
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(place);
    }

    /* Place immediately, then again once images and fonts have settled and
       once more after any restored or anchor scroll — a page opened at
       /#contact is already scrolled before this runs. */
    place();
    window.addEventListener("load", onScroll);
    window.addEventListener("hashchange", onScroll);
    setTimeout(onScroll, 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    if (window.ResizeObserver) new ResizeObserver(onScroll).observe(rail);
  }

  /* ---------------------------------------------------------------------------
     2. RiskMatrix
     Ported verbatim from design_system/components/governance/RiskMatrix.jsx.
     band() puts severity on the ANTI-DIAGONAL — severe at top-right, descending
     to low at bottom-left. This was hand-rolled twice during design and was
     wrong both times (once mirrored, once banded per column). Do not reimplement
     it inline; call this.

       <div class="riskmatrix" data-riskmatrix data-size="4" data-cell="48"
            data-legend data-items='[{"id":"A","label":"…","likelihood":2,"impact":3}]'></div>
     --------------------------------------------------------------------------- */
  var FILLS = [
    { max: 0.34, cls: "low", label: "Low" },
    { max: 0.6, cls: "moderate", label: "Moderate" },
    { max: 0.84, cls: "high", label: "High" },
    { max: 1.01, cls: "severe", label: "Severe" },
  ];

  function band(likelihood, impact, size) {
    var t = (likelihood + impact) / (2 * (size - 1));
    for (var i = 0; i < FILLS.length; i++) {
      if (t < FILLS[i].max) return FILLS[i];
    }
    return FILLS[3];
  }

  function el(tag, cls) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    return n;
  }

  function buildRiskMatrix(host) {
    if (host.getAttribute("data-built")) return;
    var size = parseInt(host.getAttribute("data-size"), 10) || 5;
    var cell = parseInt(host.getAttribute("data-cell"), 10) || 44;
    var xLabel = host.getAttribute("data-x-label") || "Likelihood →";
    var yLabel = host.getAttribute("data-y-label") || "Impact →";
    var showLegend = host.hasAttribute("data-legend");
    var items = [];
    try {
      items = JSON.parse(host.getAttribute("data-items") || "[]");
    } catch (e) {
      items = [];
    }

    host.textContent = "";

    var xAxis = el("span", "rm-axis");
    xAxis.textContent = xLabel;
    host.appendChild(xAxis);

    var body = el("div", "rm-body");
    var grid = el("div");

    for (var y = size - 1; y >= 0; y--) {
      var row = el("div", "rm-row");
      if (y !== size - 1) row.style.marginTop = "-1px";
      for (var x = 0; x < size; x++) {
        var b = band(x, y, size);
        var c = el("div", "rm-cell rm-cell--" + b.cls);
        c.style.width = cell + "px";
        c.style.height = cell + "px";
        if (x !== 0) c.style.marginLeft = "-1px";
        c.title = b.label + " · L" + (x + 1) + " × I" + (y + 1);
        for (var k = 0; k < items.length; k++) {
          if (items[k].likelihood === x && items[k].impact === y) {
            var chip = el("span", "rm-chip");
            chip.textContent = items[k].id;
            chip.title = items[k].label || items[k].id;
            c.appendChild(chip);
          }
        }
        row.appendChild(c);
      }
      grid.appendChild(row);
    }

    body.appendChild(grid);
    var yAxis = el("span", "rm-axis rm-axis--y");
    yAxis.textContent = yLabel;
    body.appendChild(yAxis);
    host.appendChild(body);

    if (showLegend) {
      var legend = el("div", "rm-legend");
      for (var f = 0; f < FILLS.length; f++) {
        var key = el("span", "rm-key rm-axis");
        var sw = el("span", "rm-swatch rm-cell--" + FILLS[f].cls);
        key.appendChild(sw);
        key.appendChild(document.createTextNode(FILLS[f].label));
        legend.appendChild(key);
      }
      host.appendChild(legend);
    }

    host.setAttribute("data-built", "1");
  }

  /* ---------------------------------------------------------------------------
     3. MaturityMeter
     Ported from design_system/components/governance/MaturityMeter.jsx. Copper
     segments, never the risk colours — maturity is not severity.

       <div class="meter" data-meter data-label="Governance" data-level="3" data-target="4"></div>
     --------------------------------------------------------------------------- */
  var LEVELS = [
    "Absent",
    "Initial",
    "Repeatable",
    "Defined",
    "Managed",
    "Optimising",
  ];

  function buildMeter(host) {
    if (host.getAttribute("data-built")) return;
    var label = host.getAttribute("data-label") || "";
    var level = parseInt(host.getAttribute("data-level"), 10) || 0;
    var max = parseInt(host.getAttribute("data-max"), 10) || 5;
    var targetAttr = host.getAttribute("data-target");
    var target = targetAttr == null ? null : parseInt(targetAttr, 10);

    host.textContent = "";

    if (label) {
      var head = el("div", "meter-head");
      var l = el("span", "meter-label");
      l.textContent = label;
      var c = el("span", "meter-count");
      c.textContent = level + "/" + max;
      head.appendChild(l);
      head.appendChild(c);
      host.appendChild(head);
    }

    var track = el("div", "meter-track");
    for (var i = 1; i <= max; i++) {
      var seg = el("span", "meter-seg" + (i <= level ? " meter-seg--on" : ""));
      if (target === i) seg.className += " meter-seg--target";
      track.appendChild(seg);
    }
    host.appendChild(track);

    var cap = el("span", "meter-caption");
    cap.textContent =
      LEVELS[Math.min(level, LEVELS.length - 1)] +
      (target
        ? " · target " + LEVELS[Math.min(target, LEVELS.length - 1)]
        : "");
    host.appendChild(cap);

    host.setAttribute(
      "aria-label",
      label +
        ": " +
        LEVELS[Math.min(level, LEVELS.length - 1)] +
        ", level " +
        level +
        " of " +
        max,
    );
    host.setAttribute("data-built", "1");
  }

  /* Markup form of the same meter, for page scripts that rebuild a results
     panel from a string. Kept here so the segment logic and the level captions
     exist exactly once. */
  function meterHTML(label, level, max, target) {
    max = max || 5;
    var segs = "";
    for (var i = 1; i <= max; i++) {
      segs +=
        '<span class="meter-seg' +
        (i <= level ? " meter-seg--on" : "") +
        (target === i ? " meter-seg--target" : "") +
        '"></span>';
    }
    var caption =
      LEVELS[Math.min(level, LEVELS.length - 1)] +
      (target
        ? " · target " + LEVELS[Math.min(target, LEVELS.length - 1)]
        : "");
    return (
      '<div class="meter">' +
      (label
        ? '<div class="meter-head"><span class="meter-label">' +
          label +
          '</span><span class="meter-count">' +
          level +
          "/" +
          max +
          "</span></div>"
        : "") +
      '<div class="meter-track">' +
      segs +
      "</div>" +
      '<span class="meter-caption">' +
      caption +
      "</span></div>"
    );
  }

  /* ---------------------------------------------------------------------------
     4. Mobile nav
     --------------------------------------------------------------------------- */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (!toggle || !menu) return;

    function close() {
      menu.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    }
    function open() {
      menu.setAttribute("data-open", "true");
      toggle.setAttribute("aria-expanded", "true");
    }

    toggle.setAttribute("aria-controls", "nav-menu");
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function () {
      if (menu.getAttribute("data-open") === "true") close();
      else open();
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) close();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) close();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  /* --------------------------------------------------------------------------- */
  function init() {
    fillRail();
    initReadingHead();
    var m = document.querySelectorAll("[data-riskmatrix]");
    for (var i = 0; i < m.length; i++) buildRiskMatrix(m[i]);
    var g = document.querySelectorAll("[data-meter]");
    for (var j = 0; j < g.length; j++) buildMeter(g[j]);
    initNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.jiDS = {
    buildRiskMatrix: buildRiskMatrix,
    buildMeter: buildMeter,
    meterHTML: meterHTML,
    band: band,
    LEVELS: LEVELS,
  };
})();
