# research/ : the curated canonical research layer

This directory is the **canonical** research layer required by the Content
Evidence &amp; Production System (Notion) and referenced by the Research
Workstreams database. It is the layer that publication draws from.

`data/evidence/` is the **raw** imported layer: the Perplexity research package
exactly as delivered on 2026-07-31, preserved unmodified for provenance. It is
never edited to match a publication decision. When the two layers disagree, this
directory is the working authority for what may be published, and the raw layer
is the record of what was originally imported.

## Layout

| Path | What it is | Status |
|---|---|---|
| `evidence-policy.md` | The two-tier publication standard (Approved vs Verified) | **Current** |
| `evidence-ledger.csv` | Claim-level ledger with validated statuses | **Current**, validated 2026-08-02 |
| `claim-cards.md` | Publication-ready claim language with caveats | Curated from the raw layer after validation |
| `source-bibliography.md` | Every source, with tier and what it can support | **Current** |
| `evidence-gaps.md` | Documented gaps, stated rather than filled | **Current** |
| `manifest.yaml` | Machine-readable inventory and status of this layer | **Current** |
| `universal-professional-services.md` | The shared evidence spine | Pending WS-1 |
| `industries/` | Per-industry evidence packs | Pending WS-2 to WS-9 |
| `workflows/` | Per-workflow evidence packs | Pending WS-10 to WS-12 |
| `personas/` | Per-persona evidence and message packs | Pending WS-13 to WS-18 |

## Why several packs are pending rather than present

The Research Workstreams database lists twenty workstreams; as of 2026-08-01 the
per-industry, per-workflow, and per-persona evidence packs had not been run. The
content library was built from the universal and industry material contained in
the raw import, not from those packs.

Creating placeholder files here would be worse than leaving them absent: a stub
that looks like an evidence pack is exactly the unimplemented-specification trap
that makes a documentation layer untrustworthy. Each pending pack is recorded in
`manifest.yaml` with its workstream ID, so the gap is visible and addressable.

## Publication rule, in one line

Nothing reaches a public page as an exact figure unless its claim ID holds
**Approved** status here, with the source named and the caveat adjacent. See
`evidence-policy.md` for the full standard, including what Verified may and may
not be used for.

## What the validation pass changed

The WS-19 pass on 2026-08-02 consulted the original source behind every claim
and moved 22 of the 43. Nine rose to Approved once confirmed. Seven fell,
including several the research tool had labelled Approved on import:

- **U-AI-003, U-AI-004** (Dell'Acqua, the consulting field experiment) fell to
  Verified because the source could not be reached at an authoritative
  location. The jagged-frontier finding survives as a directional claim; its
  figures may no longer be published.
- **U-AI-005** (Brynjolfsson) and **CONS-001** fell to Candidate, so they are
  no longer publishable at all.
- **U-MEAS-001** fell to Verified and was found to misstate its source,
  converting a respondent expectation into an observed outcome.
- **LAW-005** and **SEARCH-001** were rejected outright.

The ledger keeps both `Import Status` and `Validated Status` so every one of
those moves stays auditable. This is the reason the standard exists: a status
assigned by a research tool is a hypothesis about evidence, not evidence.

## Relationship to Notion

- **Evidence Claim Ledger** (Notion) is the intended long-term publication
  authority. It was empty as of 2026-08-01, so `evidence-ledger.csv` in this
  directory is the working authority until it is populated.
- **Research Workstreams** (Notion) is the pipeline of record. Workstream status
  should be updated there, not here; `manifest.yaml` mirrors it for tooling.
- **Content Evidence &amp; Production System** (Notion) is the governing operating
  specification for this whole layer.
