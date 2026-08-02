#!/usr/bin/env node
/**
 * validate.mjs — structural and editorial validator for the professional-services
 * content system. Deterministic checks only; it does not judge prose quality.
 *
 *   node scripts/validate.mjs          # report and exit non-zero on any ERROR
 *   node scripts/validate.mjs --quiet  # only print problems
 *
 * Checks, per surface:
 *   playbooks    head metadata self-consistency, shared asset links, panel
 *                structure, chapter section pattern, TOC integrity, required
 *                toollinks, close block, hub/assessment backlinks
 *   campaigns    status header, 12 numbered posts, UTM correctness per post
 *   persona data schema completeness, persona order, workflow-name integrity
 *   persona pages noindex, canonical, sitemap exclusion
 *   everywhere   banned characters (em dash, smart quotes), banned vocabulary,
 *                double-escaped entities
 */

import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname, resolve, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://jimiige.com';
const QUIET = process.argv.includes('--quiet');

const errors = [];
const warns = [];
const err = (file, msg) => errors.push(`${file}: ${msg}`);
const warn = (file, msg) => warns.push(`${file}: ${msg}`);
const read = (p) => readFileSync(join(ROOT, p), 'utf8');
const has = (p) => existsSync(join(ROOT, p));

const ps = JSON.parse(read('data/professional-services.json'));
const personas = JSON.parse(read('data/personas.json')).personas.map(p => p.slug);
const PREFIX = ps.personaPathPrefix;

// --- banned characters and vocabulary -------------------------------------
// U+2192 arrows are an accepted convention in the markdown campaign CTAs.
const BANNED_CHARS = [
  ['—', 'em dash'], ['–', 'en dash'],
  ['“', 'left smart quote'], ['”', 'right smart quote'], ['‘', 'left smart apostrophe'],
];
// word-boundary noun uses; "leading"/"targets" etc. must not trip these
const BANNED_WORDS = [/\bbuyers?\b/i, /\bprospects?\b/i, /\bsales lead\b/i];

// `internal: true` skips the vocabulary rule. That rule exists because
// transactional words read as vendor rather than advisor in copy a client sees;
// it does not apply to internal build and research records, where "buyer" is the
// canonical Notion Business Play Card field name.
function checkText(file, text, { allowArrows = false, internal = false } = {}) {
  for (const [ch, name] of BANNED_CHARS) {
    const n = text.split(ch).length - 1;
    if (n) err(file, `${n} ${name} character(s) (U+${ch.codePointAt(0).toString(16).toUpperCase()})`);
  }
  if (!allowArrows && text.includes('→')) {
    const n = text.split('→').length - 1;
    warn(file, `${n} unicode arrow(s); HTML should use &rarr;`);
  }
  if (!internal) {
    for (const re of BANNED_WORDS) {
      const m = text.match(re);
      if (m) err(file, `banned vocabulary: "${m[0]}"`);
    }
  }
  if (text.includes('&amp;amp;')) err(file, 'double-escaped entity &amp;amp;');
}

// --- playbooks ------------------------------------------------------------
const playbooks = ps.industries.map(i => ({ ...i, file: i.playbook.file }));

for (const pb of playbooks) {
  const file = pb.file;
  if (!has(file)) { err(file, 'playbook file missing'); continue; }
  const t = read(file);
  checkText(file, t);

  const url = `${SITE}/${file}`;
  if (!/<title>[^<]*, Jimi Ige<\/title>/.test(t)) err(file, 'title tag does not end with ", Jimi Ige"');
  for (const [label, re] of [
    ['canonical', /<link rel="canonical" href="([^"]+)"/],
    ['og:url', /<meta property="og:url" content="([^"]+)"/],
  ]) {
    const m = t.match(re);
    if (!m) err(file, `missing ${label}`);
    else if (m[1] !== url) err(file, `${label} is ${m[1]}, expected ${url}`);
  }
  if (!t.includes('assets/ds/playbook.css')) err(file, 'missing playbook.css');
  if (!t.includes('assets/ds/playbook.js')) err(file, 'missing playbook.js');
  for (const id of ['pbTrack', 'pbChrome', 'pbEnter', 'pbPrev', 'pbNext', 'pbBar', 'pbLong', 'pbDl']) {
    if (!t.includes(`id="${id}"`)) err(file, `reader chrome missing #${id}`);
  }
  if (!t.includes('pb-cover--ink') && !t.includes('pb-cover-img')) err(file, 'no cover variant class');
  if (!/<div class="word">/.test(t)) err(file, 'no outcome statband (.word cards)');
  if (!/<div class="num">/.test(t)) warn(file, 'no evidence statband (.num cards)');
  if (!t.includes('pb-sources')) err(file, 'missing pb-sources block in close');

  // chapters: each must carry the full recurring section pattern
  const chapters = [...t.matchAll(/<section class="pb-panel pb-ch"[^>]*id="([^"]+)"[\s\S]*?<\/section>/g)];
  if (!chapters.length) err(file, 'no chapters found');
  for (const [html, id] of chapters.map(m => [m[0], m[1]])) {
    for (const need of ['The principle', 'The trap', 'The checklist', 'Where judgment beats the tool']) {
      if (!html.includes(need)) err(file, `chapter #${id} missing "${need}"`);
    }
    const pulls = html.split('pb-pull').length - 1;
    if (pulls !== 1) err(file, `chapter #${id} has ${pulls} pull quotes, expected exactly 1`);
  }

  // TOC integrity
  const tocHrefs = [...t.matchAll(/<a href="#([^"]+)"><span class="pb-tnum">/g)].map(m => m[1]);
  for (const h of tocHrefs) if (!t.includes(`id="${h}"`)) err(file, `TOC entry #${h} has no matching section id`);
  const chapterCount = chapters.length;
  const tocWord = (t.match(/<h2>(\w+) chapters, and a way in\.<\/h2>/) || [])[1];
  const WORDS = { Nine: 9, Ten: 10, Eleven: 11, Twelve: 12 };
  if (tocWord && WORDS[tocWord] !== chapterCount) {
    err(file, `TOC says "${tocWord} chapters" but ${chapterCount} chapters exist`);
  }

  for (const link of ['workflow-leverage-assessment.html', 'maturity-assessment.html', 'adoption-scorecard.html', 'resources.html#roi-calculator']) {
    if (!t.includes(link)) err(file, `missing required link: ${link}`);
  }
  if (!t.includes('professional-services.html')) err(file, 'missing hub backlink');

  // internal links resolve
  for (const m of t.matchAll(/href="(?!https?:|mailto:|tel:|#|\/)([^"?#]+\.html)/g)) {
    if (!has(m[1])) err(file, `broken internal link: ${m[1]}`);
  }
  if (pb.professionalGuardrail && !/licensed|attorney|professional/i.test(t)) {
    err(file, 'licensed industry but no professional-accountability language found');
  }
}

// --- campaigns ------------------------------------------------------------
for (const ind of ps.industries) {
  const file = `content/campaigns/${ind.slug}.md`;
  if (!has(file)) { err(file, 'campaign file missing'); continue; }
  const t = read(file);
  checkText(file, t, { allowArrows: true });

  const wantStatus = ind.status === 'active' ? 'ACTIVE' : 'LIBRARY READY';
  if (!t.includes(`**Status: ${wantStatus}**`)) err(file, `status header should be "**Status: ${wantStatus}**"`);
  if (ind.status !== 'active' && !/not scheduled, not distributed/i.test(t)) {
    err(file, 'library-ready campaign missing the not-distributed line');
  }
  const posts = [...t.matchAll(/^### Post (\d{2})/gm)].map(m => m[1]);
  if (posts.length !== 12) err(file, `${posts.length} posts, expected 12`);
  posts.forEach((p, i) => {
    const expect = String(i + 1).padStart(2, '0');
    if (p !== expect) err(file, `post numbering: found ${p} at position ${i + 1}`);
  });
  const campaignTag = `utm_campaign=governed-ai-ops_${ind.slug}`;
  const ctas = [...t.matchAll(/https:\/\/jimiige\.com\/[^\s)]+utm_source=linkedin[^\s)]*/g)].map(m => m[0]);
  if (ctas.length < 12) err(file, `${ctas.length} campaign CTA links, expected at least 12`);
  ctas.forEach((c) => {
    if (!c.includes(campaignTag)) err(file, `CTA missing ${campaignTag}: ${c.slice(0, 90)}`);
    if (!/utm_content=post-\d{2}/.test(c)) err(file, `CTA missing utm_content=post-NN: ${c.slice(0, 90)}`);
  });
  for (const c of ctas) {
    const target = c.split('?')[0].replace(`${SITE}/`, '');
    if (!has(target)) err(file, `CTA points at missing page: ${target}`);
  }
}

// --- persona data ---------------------------------------------------------
for (const ind of ps.industries) {
  const file = `data/persona-pages/${ind.slug}.json`;
  if (!has(file)) { err(file, 'persona data missing'); continue; }
  const raw = read(file);
  checkText(file, raw, { allowArrows: true });
  let d;
  try { d = JSON.parse(raw); } catch (e) { err(file, `invalid JSON: ${e.message}`); continue; }
  if (d.industry !== ind.slug) err(file, `industry field is "${d.industry}"`);
  const got = d.pages.map(p => p.persona);
  if (got.length !== personas.length || got.some((g, i) => g !== personas[i])) {
    err(file, `persona order/count wrong: ${got.join(', ')}`);
  }
  const wfNames = ind.workflows.map(w => w.name);
  for (const p of d.pages) {
    const where = `${file}[${p.persona}]`;
    const lens = { triggers: 4, aiChanges: 3, metrics: 4 };
    for (const [k, n] of Object.entries(lens)) {
      if (!Array.isArray(p[k]) || p[k].length !== n) err(where, `${k} has ${p[k]?.length}, expected ${n}`);
    }
    if (!Array.isArray(p.workflows) || p.workflows.length !== 3) err(where, `workflows has ${p.workflows?.length}, expected 3`);
    if (!Array.isArray(p.controls) || p.controls.length < 4 || p.controls.length > 5) err(where, `controls has ${p.controls?.length}, expected 4-5`);
    for (const f of ['headline', 'outcome']) if (!p[f]) err(where, `missing ${f}`);
    if (!p.cta?.headline || !p.cta?.line || !p.cta?.label) err(where, 'incomplete cta');
    // the page template already states "Fixed scope. Fixed timeline." under every CTA,
    // so cta.line only has to name the offer, not repeat the scope language
    if (p.cta && !/assessment|working session/i.test(p.cta.line)) warn(where, 'cta.line does not name the assessment or the working session');
    if (!p.evidence?.text || !p.evidence?.source || !p.evidence?.caveat) err(where, 'incomplete evidence object');
    for (const w of p.workflows || []) {
      if (!w.name || !w.line) err(where, 'workflow entry missing name or line');
      else if (!wfNames.some(n => w.name.includes(n) || n.includes(w.name))) {
        warn(where, `workflow "${w.name}" not found in industry workflow list`);
      }
    }
  }
}

// --- generated persona pages ---------------------------------------------
let pageCount = 0;
const goDir = join(ROOT, PREFIX);
if (existsSync(goDir)) {
  for (const ind of readdirSync(goDir)) {
    for (const per of readdirSync(join(goDir, ind))) {
      const file = `${PREFIX}/${ind}/${per}/index.html`;
      if (!has(file)) { err(file, 'index.html missing'); continue; }
      pageCount++;
      const t = read(file);
      checkText(file, t);
      if (!/<meta name="robots" content="noindex, nofollow">/.test(t)) err(file, 'missing noindex, nofollow');
      const canon = (t.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
      const want = `${SITE}/${PREFIX}/${ind}/${per}/`;
      if (canon !== want) err(file, `canonical is ${canon}, expected ${want}`);
      if (!t.includes('utm_campaign=governed-ai-ops_')) err(file, 'CTA missing campaign UTM');
      if (!t.includes('data-campaign=')) err(file, 'body missing data-campaign attribution hook');
    }
  }
}
const expectedPages = ps.industries.length * personas.length;
if (pageCount !== expectedPages) err('go/', `${pageCount} persona pages, expected ${expectedPages}`);

// --- sitemap and robots ---------------------------------------------------
const sitemap = read('sitemap.xml');
if (sitemap.includes(`/${PREFIX}/`)) err('sitemap.xml', 'contains a persona route');
for (const pb of playbooks) {
  if (!sitemap.includes(`${SITE}/${pb.file}`)) err('sitemap.xml', `missing public page ${pb.file}`);
}
for (const p of ['professional-services.html', 'workflow-leverage-assessment.html']) {
  if (!sitemap.includes(`${SITE}/${p}`)) err('sitemap.xml', `missing public page ${p}`);
}
for (const m of sitemap.matchAll(/<loc>https:\/\/jimiige\.com\/([^<]*)<\/loc>/g)) {
  if (m[1] && !has(m[1].split('#')[0])) err('sitemap.xml', `lists missing file: ${m[1]}`);
}
const robots = read('robots.txt');
for (const dir of ['/content/', '/data/', '/docs/', '/scripts/']) {
  if (!robots.includes(`Disallow: ${dir}`)) err('robots.txt', `missing Disallow: ${dir}`);
}
if (robots.includes(`Disallow: /${PREFIX}/`)) {
  err('robots.txt', `must NOT disallow /${PREFIX}/ (crawlers need to fetch the page to see noindex)`);
}

// --- outcome layer ---------------------------------------------------------
// Outcome-first assets sit above the industry playbooks. Public outcome pages are
// indexed; campaign landing pages under lp/ are noindex so they do not compete
// with the evergreen outcome page for the same intent.
const OUTCOME_PUBLIC = ['outcomes.html', 'outcome-proposal-to-project.html', 'proposal-to-project-diagnostic.html'];
for (const f of OUTCOME_PUBLIC) {
  if (!has(f)) { err(f, 'outcome-layer page missing'); continue; }
  const t = read(f);
  checkText(f, t);
  const url = `${SITE}/${f}`;
  const canon = (t.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
  if (canon !== url) err(f, `canonical is ${canon}, expected ${url}`);
  if (/<meta name="robots"[^>]*noindex/.test(t)) err(f, 'public outcome page must not be noindex');
  if (!sitemap.includes(url)) err('sitemap.xml', `missing outcome-layer page ${f}`);
  for (const m of t.matchAll(/href="(?!https?:|mailto:|tel:|#|\/)([^"?#]+\.html)/g)) {
    if (!has(m[1])) err(f, `broken internal link: ${m[1]}`);
  }
}

const lpDir = join(ROOT, 'lp');
if (existsSync(lpDir)) {
  for (const slug of readdirSync(lpDir)) {
    const f = `lp/${slug}/index.html`;
    if (!has(f)) { err(f, 'campaign landing page missing index.html'); continue; }
    const t = read(f);
    checkText(f, t);
    if (!/<meta name="robots" content="noindex, nofollow">/.test(t)) {
      err(f, 'campaign landing page must be noindex, nofollow');
    }
    if (sitemap.includes(`${SITE}/lp/${slug}/`)) err('sitemap.xml', `campaign landing page ${slug} must not be in sitemap`);
    if (!t.includes('utm_campaign=')) err(f, 'CTA missing campaign UTM');
    if (!t.includes('data-cta')) err(f, 'no data-cta hook for host attribution');
  }
}

// --- research layer --------------------------------------------------------
// The canonical research layer the evidence policy governs. Files listed as
// pending in the manifest are intentionally absent, not missing.
for (const f of ['research/README.md', 'research/evidence-policy.md', 'research/evidence-gaps.md',
                 'research/source-bibliography.md', 'research/manifest.yaml']) {
  if (!has(f)) err(f, 'required research-layer file missing');
  else checkText(f, read(f), { allowArrows: true, internal: true });
}
if (!has('data/evidence/evidence_ledger.csv')) err('data/evidence/', 'raw evidence layer missing; provenance is broken');
for (const f of readdirSync(join(ROOT, 'content', 'business-plays')).filter(n => n.endsWith('.md'))) {
  checkText(`content/business-plays/${f}`, read(`content/business-plays/${f}`), { allowArrows: true, internal: true });
}

// --- report ---------------------------------------------------------------
if (!QUIET) {
  console.log(`playbooks: ${playbooks.length}  campaigns: ${ps.industries.length}  persona pages: ${pageCount}/${expectedPages}`);
}
for (const w of warns) console.log(`WARN  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(errors.length ? `\n${errors.length} error(s), ${warns.length} warning(s)` : `\nclean (${warns.length} warning(s))`);
process.exit(errors.length ? 1 : 0);
