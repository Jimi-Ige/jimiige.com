# Campaign library — Governed AI Operations for Professional Services

One campaign package per industry, one file per industry. Each file carries a
campaign brief and twelve LinkedIn posts. This directory is the source of
truth for social distribution; nothing here is rendered on the site.

## Status model

| Status | Meaning |
|---|---|
| **Active** | The campaign currently being distributed. Its industry is the featured asset on the hub and the only one with primary site CTAs. Exactly one campaign is Active at a time. |
| **Library Ready** | Complete and publication-ready, deliberately not distributed. No primary site CTA, no homepage promotion, no scheduled posts. Activation is a decision, not a default. |

Current Active campaign: **Management Consulting**.

## File format

Each `<industry-slug>.md` contains, in order:

1. Header: campaign name, status, canonical playbook and persona-page routes.
2. Brief: target roles and personas, core positioning, trigger events, primary
   outcome, campaign themes, suggested publishing order, conversion path.
3. Twelve posts, three per theme. Every post has a hook, one concrete
   workflow or operating insight, a practical takeaway, and a soft CTA.

The four recurring themes, adapted per industry:

1. Grow without proportional hiring.
2. Stop recreating work.
3. Improve delivery without lowering quality.
4. Govern AI without slowing the firm down.

## Link and attribution conventions

- Post CTAs link to the industry playbook or to the Workflow Leverage &amp;
  Trust Assessment page, always with UTM parameters:
  `?utm_source=linkedin&utm_medium=campaign_post&utm_campaign=governed-ai-ops_<industry-slug>&utm_content=post-NN`
- On-site Calendly CTAs carry the matching `utm_campaign`, so a booking can be
  attributed to its industry campaign end to end.
- Persona landing pages (`/go/<industry>/<persona>/`) are for targeted,
  direct-shared distribution; they are unlisted and carry their own canonical
  attribution. See `docs/professional-services-system.md`.

## Activating a Library Ready campaign

1. Change the campaign's status line to Active (and retire the previous
   Active campaign to Library Ready if the primary CTA moves).
2. On the hub (`professional-services.html`), move the industry into the
   featured slot. No homepage changes are required or wanted.
3. Schedule the posts in the suggested publishing order (two per week works;
   the order interleaves the four themes).
4. Optionally connect a campaign hostname per
   `docs/professional-services-system.md`. The fallback routes work with no
   DNS at all.

## Editorial rules (non-negotiable)

- Quantitative claims come only from the evidence library in `data/evidence/`
  (claim cards and the priority list), quoted with their caveat language and
  source attribution. For social posts, the whitelist is the 10-claim safe set
  in `data/evidence/priority_claims_list.md` section F. Predictions are always
  labeled as predictions; vendor and sponsored surveys carry that label.
- No invented statistics, clients, or case studies. Where the evidence ledger
  flags a gap (mid-market ROI, realization impact, E&amp;O claims data, creative
  and search and MSP primary economics), the gap is stated, never filled.
- No em dashes, no marketing-speak, no "buyer"/"prospect"/"lead" vocabulary,
  no vendor product names in positioning copy.
- For CPA and law-firm content: AI assists operations and documentation;
  accountable licensed professionals retain judgment and sign-off. Nothing
  implies tax, accounting, audit, or legal advice.
- Posts are written in Jimi's first-person practitioner voice: restrained,
  concrete, advisory. Trust is the product.
