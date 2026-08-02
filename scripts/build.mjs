#!/usr/bin/env node
/**
 * build.mjs — generator for the Governed AI Operations content system.
 *
 * Does two things, both idempotent:
 *   1. Renders every persona landing page from structured data:
 *      data/professional-services.json  (industries, titles, workflows, status)
 *      data/personas.json               (six canonical personas)
 *      data/persona-pages/<industry>.json (message-matched copy per persona)
 *      → /go/<industry-slug>/<persona-slug>/index.html
 *      Pages are unlisted: noindex,nofollow, excluded from the sitemap by
 *      construction, shareable via OG tags, canonical on the jimiige.com
 *      fallback route. Attribution: canonical UTMs baked into every CTA plus
 *      utm_term=<hostname> appended at click time, so custom-host and
 *      fallback-route visits attribute identically. See
 *      docs/professional-services-system.md.
 *   2. Regenerates sitemap.xml from the PUBLIC_PAGES list below. Persona
 *      pages are not in the list, which is the exclusion mechanism.
 *
 * No dependencies. Run from the repo root:  node scripts/build.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://jimiige.com';

// ---------------------------------------------------------------------------
// Public pages → sitemap.xml. Persona pages are excluded by not being here.
// Keep this list in sync when adding public pages.
const PUBLIC_PAGES = [
  { loc: '/', lastmod: '2026-06-28', changefreq: 'monthly', priority: '1.0' },
  { loc: '/governing-ai-in-regulated-workflows.html', lastmod: '2026-06-28', changefreq: 'monthly', priority: '0.9' },
  { loc: '/resources.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.9' },
  { loc: '/outcomes.html', lastmod: '2026-08-01', changefreq: 'monthly', priority: '0.9' },
  { loc: '/outcome-proposal-to-project.html', lastmod: '2026-08-01', changefreq: 'monthly', priority: '0.9' },
  { loc: '/proposal-to-project-diagnostic.html', lastmod: '2026-08-01', changefreq: 'monthly', priority: '0.8' },
  { loc: '/professional-services.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.9' },
  { loc: '/grow-delivery-capacity-with-governed-ai.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.9' },
  { loc: '/workflow-leverage-assessment.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.8' },
  { loc: '/adoption-scorecard.html', lastmod: '2026-06-28', changefreq: 'monthly', priority: '0.8' },
  { loc: '/audit-readiness.html', lastmod: '2026-06-28', changefreq: 'monthly', priority: '0.8' },
  { loc: '/maturity-assessment.html', lastmod: '2026-06-28', changefreq: 'monthly', priority: '0.8' },
  { loc: '/readiness-audit.html', lastmod: '2026-06-28', changefreq: 'monthly', priority: '0.8' },
  { loc: '/governed-ai-for-it-consulting.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.7' },
  { loc: '/governed-ai-for-accounting-cpa-firms.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.7' },
  { loc: '/governed-ai-for-law-firms.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.7' },
  { loc: '/governed-ai-for-architecture-engineering.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.7' },
  { loc: '/governed-ai-for-executive-search.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.7' },
  { loc: '/governed-ai-for-creative-agencies.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.7' },
  { loc: '/governed-ai-for-managed-service-providers.html', lastmod: '2026-07-30', changefreq: 'monthly', priority: '0.7' },
  { loc: '/agent-demo.html', lastmod: '2026-06-28', changefreq: 'monthly', priority: '0.7' },
  { loc: '/crosswalk.html', lastmod: '2026-06-28', changefreq: 'monthly', priority: '0.7' },
];

// ---------------------------------------------------------------------------
const readJson = (p) => JSON.parse(readFileSync(join(ROOT, p), 'utf8'));
const esc = (s) => String(s)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;');

const ps = readJson('data/professional-services.json');
const personas = readJson('data/personas.json').personas;
const personaBySlug = Object.fromEntries(personas.map(p => [p.slug, p]));
const CAL = ps.assessment.calendlyBase;
const PREFIX = ps.personaPathPrefix; // "go"

const problems = [];
const warnings = [];

// ---------------------------------------------------------------------------
function checkGlyph(svgSeed) {
  // deterministic 3x3 glyph per industry+persona, from the design system's
  // toolglyph vocabulary (squares only; nothing in this system is round)
  const cells = ['tg-c5', 'tg-c6', 'tg-c7', 'tg-ghost'];
  let h = 0;
  for (const ch of svgSeed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const xy = [0, 7.25, 14.5];
  let rects = '';
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    h = (h * 1103515245 + 12345) >>> 0;
    const cls = cells[h % 4];
    rects += `<rect class="${cls}" x="${xy[c]}" y="${xy[r]}" width="5.5" height="5.5"/>`;
  }
  return `<svg class="toolglyph" viewBox="0 0 20 20" aria-hidden="true">${rects}</svg>`;
}

const CHECK = '<svg class="checkglyph" viewBox="0 0 16 16" aria-hidden="true"><rect x="0.75" y="0.75" width="14.5" height="14.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M4 8.6l2.7 2.7L12 5.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function personaPage(industry, page) {
  const persona = personaBySlug[page.persona];
  const roleTitle = industry.personaTitles[page.persona] || persona.role;
  const route = `/${PREFIX}/${industry.slug}/${page.persona}/`;
  const canonical = `${SITE}${route}`;
  const campaign = `${ps.assessment.utm.campaignPrefix}_${industry.slug}`;
  const calHref = `${CAL}?utm_source=site&amp;utm_medium=persona_page&amp;utm_campaign=${campaign}&amp;utm_content=${page.persona}`;
  const playbookHref = `/${industry.playbook.file}`;
  const ogDesc = esc(page.outcome.length > 200 ? page.outcome.slice(0, 197).replace(/\s+\S*$/, '') + '...' : page.outcome);

  const triggers = page.triggers.map(t =>
    `            <div class="moment"><span class="prose-sm">${esc(t)}</span></div>`).join('\n');

  const workflows = page.workflows.map((w, i) =>
    `            <div class="register-row"><span class="register-n">${i + 1}.</span><span class="prose-sm"><strong>${esc(w.name)}.</strong> ${esc(w.line)}</span></div>`).join('\n');

  const aiChanges = page.aiChanges.map(a =>
    `              <p class="prose-sm">${esc(a)}</p>`).join('\n');

  const controls = page.controls.map(c =>
    `            <div class="check-row">${CHECK}<span class="prose-sm">${esc(c)}</span></div>`).join('\n');

  const metrics = page.metrics.map(m =>
    `            <div class="moment"><span class="prose-sm">${esc(m)}</span></div>`).join('\n');

  const evidence = page.evidence
    ? `\n        <div class="card" style="margin-top:var(--space-4);max-width:680px;"><div class="card-body"><span class="eyebrow eyebrow--accent">What the published evidence says</span><p class="prose-sm">${esc(page.evidence.text)}</p><span class="mono-sm" style="display:block;margin-top:var(--space-1);">${esc(page.evidence.source)}</span><p class="prose-sm" style="margin-top:var(--space-1);color:var(--text-muted);">${esc(page.evidence.caveat)}</p></div></div>`
    : '';

  const guardrail = industry.professionalGuardrail
    ? `\n        <p class="prose-sm" style="margin-top:var(--space-3);">${esc(industry.professionalGuardrail)}</p>`
    : '';

  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>${esc(page.headline)} &middot; ${esc(industry.name)}, Jimi Ige</title>
<meta name="description" content="${ogDesc}">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(page.headline)}">
<meta property="og:description" content="${ogDesc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${canonical}">
<meta property="og:site_name" content="Jimi Ige">
<meta property="og:image" content="${SITE}/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.headline)}">
<meta name="twitter:description" content="${ogDesc}">
<meta name="twitter:image" content="${SITE}/assets/og-image.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="stylesheet" href="/assets/ds/styles.css">
<link rel="stylesheet" href="/assets/ds/site.css">
<script src="/assets/ds/ds.js" defer></script>
</head>
<body data-campaign="${campaign}" data-route="${route}">

<div class="doc">

  <nav class="sitenav">
    <div class="sitenav-inner">
      <a href="/" class="wordmark">
        <span class="wordmark-name">Jimi Ige LLC</span>
        <span class="wordmark-practice">AI Governance, Deployment &amp; Adoption</span>
      </a>
      <div class="nav-links">
        <a href="${calHref}" target="_blank" rel="noopener" class="btn btn--primary btn--sm" data-cta>Book the working session</a>
      </div>
    </div>
  </nav>

  <main>

    <div class="rail" aria-hidden="true">
      <div class="rail-nums"></div>
      <span class="rail-rule rail-rule--a"></span>
      <span class="rail-rule rail-rule--b"></span>
    </div>

    <section class="band band--flush">
      <div class="band-inner page-head">
        <span class="eyebrow eyebrow--accent">${esc(industry.name)} &middot; ${esc(roleTitle)}</span>
        <h1 class="display-1 ruled" style="max-width:24ch;">${esc(page.headline)}</h1>
        <p class="prose">${esc(page.outcome)}</p>${guardrail}
      </div>
    </section>

    <section class="band band--flush">
      <div class="band-inner">
        <div class="band-head"><span class="eyebrow">When this becomes urgent</span></div>
        <h2 class="display-2 ruled" style="max-width:24ch;">The moments that put it on your desk.</h2>
        <div class="moment-groups">
          <div class="moment-group">
${triggers}
          </div>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="band-inner">
        <div class="band-head"><span class="eyebrow">The workflows that move it</span></div>
        <h2 class="display-2 ruled" style="max-width:24ch;">Where the leverage is, for your chair.</h2>
        <div class="register register--single" style="margin-top:var(--space-4);">
${workflows}
        </div>
        <p class="mono-sm" style="margin-top:var(--space-3);">The full treatment is in the playbook: <a href="${playbookHref}">${esc(industry.playbook.title)}</a>.</p>
      </div>
    </section>

    <section class="band">
      <div class="band-inner">
        <div class="grid-split engage-pair">
          <div class="stack-tight">
            <div class="band-head"><span class="eyebrow">What AI changes</span></div>
            <h3 class="display-4">The work moves. The accountability does not.</h3>
${aiChanges}
          </div>
          <span class="split-rule" aria-hidden="true"></span>
          <div class="clipboard">
            <div class="clipboard-sheet">
              <span class="eyebrow">The controls that make it trustworthy</span>
${controls}
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="band">
      <div class="band-inner">
        <div class="band-head"><span class="eyebrow">Proof, not promises</span></div>
        <h2 class="display-2 ruled" style="max-width:26ch;">What we would baseline and measure.</h2>
        <p class="prose-sm">No borrowed benchmarks and no invented results. These are the numbers your own pilot would stand on:</p>
        <div class="moment-groups">
          <div class="moment-group">
${metrics}
          </div>
        </div>${evidence}
      </div>
    </section>

    <section class="band">
      <div class="band-inner">
        <div class="band-head"><span class="eyebrow">${esc(ps.assessment.name)}</span></div>
        <h2 class="display-2 ruled" style="max-width:26ch;">${esc(page.cta.headline)}</h2>
        <p class="prose">${esc(page.cta.line)}</p>
        <div class="stack-tight" style="margin-top:var(--space-4);">
          <div class="row">
            <a href="${calHref}" target="_blank" rel="noopener" class="btn btn--primary" data-cta>${esc(page.cta.label)}</a>
            <a href="${playbookHref}" class="btn btn--secondary">Read the playbook first</a>
          </div>
          <span class="mono-sm">Fixed scope. Fixed timeline. Fee confirmed in the first conversation.</span>
        </div>
      </div>
    </section>

  </main>
</div>

<footer class="sitefoot">
  <div class="sitefoot-inner">
    <span class="row" style="gap:var(--space-4);">
      <span class="foot-name">Jimi Ige</span>
      <a href="https://www.linkedin.com/in/jimi-ige/" target="_blank" rel="noopener" class="foot-link">LinkedIn</a>
    </span>
    <span class="foot-meta">AI Governance, Deployment &amp; Adoption &middot; Washington, D.C. &middot; &copy; 2026 Jimi Ige LLC</span>
  </div>
</footer>

<script>
/* Host attribution: canonical UTMs are baked into every CTA above, so
   attribution is identical on custom campaign hosts and on the jimiige.com
   fallback route. The live hostname rides along as utm_term for visibility. */
(function(){
  var h = location.hostname || 'direct';
  [].forEach.call(document.querySelectorAll('a[data-cta]'), function(a){
    try {
      var u = new URL(a.href);
      if (!u.searchParams.get('utm_term')) u.searchParams.set('utm_term', h);
      a.href = u.toString();
    } catch (e) {}
  });
})();
</script>
</body></html>
`;
}

// ---------------------------------------------------------------------------
// Render persona pages
let rendered = 0, industriesDone = 0;
const personaDir = join(ROOT, 'data', 'persona-pages');
for (const industry of ps.industries) {
  const dataPath = join(personaDir, `${industry.slug}.json`);
  if (!existsSync(dataPath)) {
    warnings.push(`no persona data yet for ${industry.slug} (data/persona-pages/${industry.slug}.json missing); skipped`);
    continue;
  }
  const data = JSON.parse(readFileSync(dataPath, 'utf8'));
  if (data.industry !== industry.slug) problems.push(`${industry.slug}: persona file declares industry "${data.industry}"`);
  const seen = new Set();
  for (const page of data.pages) {
    if (!personaBySlug[page.persona]) { problems.push(`${industry.slug}: unknown persona "${page.persona}"`); continue; }
    seen.add(page.persona);
    for (const field of ['headline', 'outcome', 'triggers', 'workflows', 'aiChanges', 'controls', 'metrics', 'cta']) {
      if (!page[field] || (Array.isArray(page[field]) && page[field].length === 0)) {
        problems.push(`${industry.slug}/${page.persona}: missing or empty "${field}"`);
      }
    }
    const outDir = join(ROOT, PREFIX, industry.slug, page.persona);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), personaPage(industry, page), 'utf8');
    rendered++;
  }
  for (const p of personas) if (!seen.has(p.slug)) problems.push(`${industry.slug}: no page for persona "${p.slug}"`);
  industriesDone++;
  if (!existsSync(join(ROOT, industry.playbook.file))) {
    warnings.push(`playbook file not present yet: ${industry.playbook.file}`);
  }
}

// ---------------------------------------------------------------------------
// Sitemap (persona pages excluded by construction: only PUBLIC_PAGES emit)
const missingFromDisk = PUBLIC_PAGES
  .filter(p => p.loc !== '/' && !existsSync(join(ROOT, p.loc.slice(1))))
  .map(p => p.loc);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  PUBLIC_PAGES.map(p =>
    `  <url><loc>${SITE}${p.loc}</loc><lastmod>${p.lastmod}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`
  ).join('\n') + '\n</urlset>\n';
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap, 'utf8');

// Safety net: confirm no /go/ route ever appears in the sitemap
if (sitemap.includes(`/${PREFIX}/`)) problems.push('sitemap contains a persona route; that must never happen');

// ---------------------------------------------------------------------------
console.log(`persona pages rendered: ${rendered} (${industriesDone} industries)`);
console.log(`sitemap.xml written: ${PUBLIC_PAGES.length} public URLs, persona routes excluded`);
if (missingFromDisk.length) console.log(`sitemap URLs not yet on disk (expected while agents run): ${missingFromDisk.join(', ')}`);
for (const w of warnings) console.log(`warn: ${w}`);
if (problems.length) {
  for (const p of problems) console.error(`PROBLEM: ${p}`);
  process.exit(1);
}
