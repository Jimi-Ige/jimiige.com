# Evidence Policy: the two-tier publication standard

**Status:** Current operating standard · Adopted 2026-08-01
**Authority:** Resolves the conflict between the Content Evidence &amp; Production
System ("only Approved claims may become published factual assertions") and the
research package's own framing ("approved preferred; high-value verified included
with required caveats"). This document is the reconciliation. It binds every
public asset in this repository.

---

## The two tiers

### Tier A. Approved: required for exact assertions

A claim must hold **Approved** status in the evidence ledger before it may appear
in published copy as any of:

- a **statistic or percentage** ("66.4 percent", "about 40 percent", "nine in ten")
- a **count or magnitude** ("N of 758", "median 11 months")
- a **comparative claim** ("the lowest in the survey's history", "more than double")
- a **causal outcome claim** ("AI use produced faster completion")
- a **named finding attributed as fact** ("the study found X")

Approved means a human validator opened the original source, confirmed the claim
text against it, and recorded methodology, sample, geography, study period, and
limitation. It does not mean the research tool labelled it approved.

### Tier B. Verified with caveats: directional statements only

A claim holding **Verified** status may appear in published copy **only** as a
clearly attributed, qualified, directional statement, and only when the source
name and the caveat appear with the claim.

Permitted:
> Surveyed billable utilization across professional-services firms has been
> reported at its lowest level in that benchmark's history (SPI Research,
> summarized by Deltek; a vendor-sponsored voluntary survey, not a census, and
> not an AI effect).

Not permitted from a Verified claim:
> Billable utilization fell to 66.4 percent in 2025.

The difference is the exact figure. Direction, attribution, and caveat may be
published from Tier B. Precision may not.

### Excluded entirely

- **Candidate** status: may guide research; never published.
- **Rejected** status: never published, in any form.
- Anything in `priority_claims_list.md` section E (the quarantine list).

## Hard rules

1. **No silent upgrades.** A claim moves from Verified to Approved only through a
   recorded validation event: validator, date, source consulted, and what was
   confirmed. Changing a status without that record is prohibited.
2. **Caveat proximity.** For any published claim of either tier, the source name
   and its caveat appear in the same block of copy as the claim, not in a distant
   footnote.
3. **Gaps are stated, never filled.** Where the ledger records no credible source,
   the copy says so. See `evidence-gaps.md`.
4. **Tier does not travel.** A claim's tier is a property of the claim and its
   source, not of the asset it appears in. A Tier B claim stays directional on a
   landing page, in a post, and in a playbook alike.
5. **Structural numbers are exempt.** Chapter counts, day counts in a 90-day plan,
   step numbers, and counts of the firm's own assets are not evidence claims.

## Applying the standard to existing copy

Every published numeric or external factual assertion is classified as:

| Classification | Action |
|---|---|
| Tier A claim, Approved status | Publish as written; confirm caveat proximity |
| Tier A claim, Verified status | **Violation.** Upgrade through validation, or rewrite as Tier B directional, or remove |
| Tier B directional, Verified status | Publish; confirm source name and caveat adjacent |
| No ledger backing | **Violation.** Remove or replace with a ledger-backed claim |
| Quarantined or Rejected | **Violation.** Remove |

## Validation record

The WS-19 validation pass records, per claim: the source consulted, whether the
claim text was confirmed against it, methodology and sample as stated by the
source, the limitation, and the resulting status. Claims whose source could not be
reached (paywall, removed page, access restriction) are recorded as
**Inaccessible** and are treated as Verified at best, never Approved, until a
validator reaches the source.

## Relationship to other records

- **Notion, Content Evidence &amp; Production System**: the governing operating
  specification. This policy makes its Approved rule operable by defining what
  "published factual assertion" means precisely enough to audit.
- **Notion, Evidence Claim Ledger**: the intended publication authority. Empty as
  of 2026-08-01; `research/evidence-ledger.csv` is the working authority until it
  is populated.
- **`data/evidence/`**: the raw imported research package, preserved unmodified
  for provenance. Never edited to match a publication decision.
- **`research/`**: the curated canonical layer this policy governs.
