# Governed AI Operations for Professional Services — system documentation

The content and landing-page system behind `professional-services.html`. This
document is the operator's manual: content model, routes, the generator,
custom campaign hostnames, attribution, and how to activate a Library Ready
industry. It lives in `/docs/`, which robots.txt disallows; it is not part of
the public site.

---

## 1. What the system is

- **Positioning:** Jimi Ige LLC helps professional-services firms increase the
  leverage of every knowledge worker through governed AI. Improved operations
  are the product; AI is the enabling technology; governance is why the result
  is trusted.
- **Active industry:** Management Consulting. Everything else is Library
  Ready: complete, publication-ready, discoverable from the hub, and
  deliberately not promoted or distributed.
- **Conversion path:** post → playbook (or persona page) → Workflow Leverage
  &amp; Trust Assessment → bounded pilot.

## 2. Content model (single sources of truth)

| File | Owns |
|---|---|
| `data/professional-services.json` | The 8 industries: slug, status (`active`/`library`), playbook file + title + subtitle + description, economics line, six-workflow lens, KPIs, per-industry persona titles, licensed-industry guardrail |
| `data/personas.json` | The 6 canonical personas (slug, role, archetype, concern, CTA frame) |
| `data/persona-pages/<slug>.json` | Message-matched copy for each industry x persona page, incl. the per-persona `evidence` object |
| `data/campaign-hosts.json` | Host-to-route mapping for future campaign hostnames |
| `data/evidence/` | The research library: claim cards, evidence ledger, priority list (incl. §E quarantine and §F social safe set), industry packs, synthesis, executive brief. The ONLY permitted source of quantitative claims anywhere in the system |
| `content/campaigns/<slug>.md` | Campaign package per industry: brief + 12 LinkedIn posts. See `content/campaigns/README.md` |
| `scripts/build.mjs` | Renders all persona pages from the data files and regenerates `sitemap.xml` |

Playbooks are hand-authored HTML pages (one per industry, at the repo root)
sharing `assets/ds/playbook.css` + `assets/ds/playbook.js`. The regulated
playbook (`governing-ai-in-regulated-workflows.html`) predates this system,
keeps its own inline styles, and is intentionally untouched.

## 3. Route inventory

**Public (indexed, in sitemap):**

| Route | Page |
|---|---|
| `/professional-services.html` | Hub: featured MC playbook + industry library |
| `/grow-delivery-capacity-with-governed-ai.html` | Management Consulting playbook (featured) |
| `/governed-ai-for-it-consulting.html` | IT Consulting playbook |
| `/governed-ai-for-accounting-cpa-firms.html` | Accounting &amp; CPA playbook |
| `/governed-ai-for-law-firms.html` | Law Firms playbook |
| `/governed-ai-for-architecture-engineering.html` | Architecture &amp; Engineering playbook |
| `/governed-ai-for-executive-search.html` | Executive Search playbook |
| `/governed-ai-for-creative-agencies.html` | Creative Agencies playbook |
| `/governed-ai-for-managed-service-providers.html` | MSP playbook |
| `/workflow-leverage-assessment.html` | The conversion offer |

**Unlisted (noindex,nofollow, NOT in sitemap, no internal links to them):**

`/go/<industry-slug>/<persona-slug>/` — 48 persona landing pages
(8 industries x 6 personas: `managing-partner`, `operations-director`,
`practice-leader`, `it-director`, `risk-counsel`, `finance-partner`).
Each is a generated `index.html` served as a directory route. Sharing works
cleanly: full OG/Twitter metadata, canonical on the jimiige.com route.

**Internal (served but robots-disallowed, no pages):** `/content/`, `/data/`,
`/docs/`, `/scripts/`.

Note: `/go/` is deliberately NOT robots-disallowed. The pages rely on their
`noindex, nofollow` meta tag, and a crawler must be able to fetch the page to
see it. Blocking the path would let a shared URL appear in search results as
a bare URL.

## 4. The generator

```
node scripts/build.mjs
```

Run from the repo root after editing any data file. It:
1. Renders every industry x persona page to `/go/<industry>/<persona>/index.html`,
   validating the schema (6 personas per industry, required fields) and
   failing loudly on violations.
2. Regenerates `sitemap.xml` from its `PUBLIC_PAGES` list. Persona routes are
   excluded by construction, and the script hard-fails if a `/go/` URL ever
   appears in the sitemap.

Generated pages are committed (GitHub Pages serves static files; there is no
build step in deployment). Treat `/go/**` as build output: edit the JSON,
re-run the script, never hand-edit a generated page.

## 5. Custom campaign hostnames

No domains are configured today, by design. The system supports them without
code changes when one is purchased:

1. Add the hostname to `data/campaign-hosts.json` with its target route and
   campaign value. This file is the mapping of record.
2. Connect the domain with a **redirect, not a second site**: at the
   registrar or DNS/CDN provider, create a 301/302 redirect (Cloudflare
   redirect rule, registrar forwarding, or equivalent) from the campaign
   hostname to `https://jimiige.com<route>` preserving any query string.
   GitHub Pages allows only one custom domain per site (jimiige.com), so
   additional hostnames are redirect-layer concerns, never DNS A/CNAME
   records into Pages.
3. Nothing else changes. The fallback route already works, the page's
   canonical URL already points at it, and attribution is identical (see §6).

Until a domain exists, share the fallback route directly; it is the canonical
URL either way.

## 6. Analytics attribution

The site has no analytics script; attribution is carried end to end on UTMs
into Calendly, which is where conversion happens.

- Every CTA in the system carries canonical UTMs:
  - Playbook/social → site: `utm_source=linkedin&utm_medium=campaign_post&utm_campaign=governed-ai-ops_<industry>&utm_content=post-NN`
  - Persona page → Calendly: `utm_source=site&utm_medium=persona_page&utm_campaign=governed-ai-ops_<industry>&utm_content=<persona>`
  - Hub/assessment → Calendly: `utm_medium=hub` / `utm_medium=assessment_page`, `utm_campaign=governed-ai-ops`
- Persona pages append `utm_term=<hostname>` at click time, so a visit via a
  future campaign hostname and a visit via the fallback route attribute to
  the same campaign/content values, with the host visible in `utm_term`.
- Every persona page body carries `data-campaign` and `data-route`
  attributes; any future analytics snippet should report `data-route` as the
  canonical page identity regardless of `location.hostname`.

## 7. Activating a Library Ready industry

1. `content/campaigns/<slug>.md`: change status to ACTIVE (and demote the
   previous Active campaign if the primary CTA moves).
2. `data/professional-services.json`: set the industry's `status` to
   `"active"` (informational; nothing renders from it automatically today).
3. `professional-services.html`: move the industry into the featured
   `card--lead` slot and its predecessor into the cabinet grid.
4. Schedule posts per the campaign file's suggested publishing order.
5. Optional: connect a campaign hostname (§5).

The homepage never changes for an activation; that is deliberate.

## 8. Editorial and evidence rules

Binding rules live in `content/campaigns/README.md` (editorial) and
`data/evidence/` (evidence). The short form: claim-card language only for any
number; caveats travel with claims; the §F safe set is the whitelist for
social; §E quarantined claims are banned; evidence gaps (mid-market ROI,
realization impact, creative/search/MSP primary economics, E&amp;O claims data)
are stated, never filled. Licensed industries (CPA, law, A&amp;E) always carry
the guardrail: AI assists operations and documentation; accountable licensed
professionals retain judgment and sign-off; nothing is professional advice.

## 9. Maintenance

- Re-verify vendor/consultancy survey numbers (SPI/Deltek, McKinsey,
  Deloitte, Clio, Thomson Reuters) each major release year; re-check bar and
  association ethics pages quarterly (see `data/evidence/cross_industry_synthesis.md` §7).
- When adding a public page: add it to `PUBLIC_PAGES` in `scripts/build.mjs`
  and re-run the script (sitemap), and consider `llms.txt`.
- When adding an industry: extend `data/professional-services.json`, add the
  playbook page, campaign file, and persona JSON, add the playbook to
  `PUBLIC_PAGES`, and add a drawer on the hub.
