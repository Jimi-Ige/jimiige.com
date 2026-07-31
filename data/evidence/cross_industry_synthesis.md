# Cross-Industry Synthesis
## Reusable Evidence vs Industry-Specific Treatment

---

## 1. What is reusable across professional services

These findings can power a **universal spine** for playbooks, assessment scoring, and most persona pages—with standard caveats on sample and tier.

### 1.1 Expert-labor economics (universal mechanisms)

| Mechanism | Why reusable | Evidence posture |
| --- | --- | --- |
| Revenue ≈ rate × utilization × realization (and leverage) | Shared PS P&L logic | Conceptual + SPI-style benchmarks as descriptive context |
| Capacity scarcity (staffing, backlog, open roles) | Appears in CPA and A/E association surveys; SPI utilization lows | Descriptive, industry-sourced where available |
| Knowledge intensity / expertise requirement | BLS NAICS 54 definition | Definitional |
| Margin sensitivity to unbilled rework and write-downs | Structural PS economics | Practitioner-calibrated; limited public causal AI link |

**Content rule:** Teach the mechanism universally; plug industry numbers only when ledger-approved for that industry.

### 1.2 AI productivity on knowledge tasks (universal with task boundaries)

| Finding | Reuse scope | Do not reuse as… |
| --- | --- | --- |
| Large time cuts + quality gains on writing tasks (Noy/Zhang) | Any drafting-heavy workflow | Client-advice accuracy; courtroom/audit conclusions |
| In-frontier consulting task gains (Dell’Acqua) | Analysis/research/deck-like work | Proof for mid-market or all task types |
| Outside-frontier quality damage (jagged frontier) | **All** industries’ QA design | “AI is unsafe everywhere” absolutism |
| Larger relative gains for less experienced workers | Onboarding and leverage design | “AI replaces seniors” |

### 1.3 Adoption lag / pilot-to-value gap (universal narrative)

McKinsey + Deloitte enterprise surveys (despite tier-5 consultancy status) **converge**: high functional use, low enterprise scaling, limited EBIT attribution, experiments fail to scale quickly, compliance barriers rising.

**Reusable thesis:** Tool access ≠ operating leverage. Workflow redesign + measurement + controls determine value.

**Label required:** Not PS-only; large-org skew; self-report; vendor/consultancy interest.

### 1.4 Governance scaffolds (universal toolkit)

| Scaffold | Reuse |
| --- | --- |
| NIST AI RMF 1.0 + GenAI Profile 600-1 | Map/measure/manage language for CIO/Risk |
| OECD AI Principles | International client/principle framing (global label) |
| ISO/IEC 42001 | Optional AIMS for mature firms |
| OMB M-24-10 | Pattern only for government-serving firms—not private mandate |

These **never replace** profession-specific duties.

### 1.5 Trust controls pattern (universal control set)

Regardless of industry, the same control objects appear in ethics sources and standards:

1. **Allowed tools / data classes** (what may be pasted where)  
2. **Access control & tenancy** (client segregation)  
3. **Human accountable review** before external reliance  
4. **Supervision** of staff/agents using AI  
5. **Logging / evidence** of review and model/tool used  
6. **Retention & training-data terms**  
7. **Client communication / disclosure** where required by duty or contract  
8. **Measurement** of quality, rework, and cycle time—not vanity adoption  

This set is the assessment’s **Trust** dimension.

### 1.6 Workflow architecture (universal content system)

| Workflow | Universal activities | AI leverage hypothesis | Trust choke points |
| --- | --- | --- | --- |
| **Proposal-to-Project** | Research, qualify, draft, review, price, handoff | Drafting speed (Noy/Zhang); prior-asset reuse | Confidential RFP data; overclaiming; fee reasonableness (law) |
| **Knowledge-to-Delivery** | Retrieve, expert find, research, draft, QA, lessons | In-frontier analysis (Dell’Acqua); novice leverage | Jagged frontier; client data in retrieval corpora |
| **Delivery-to-Executive Insight** | Status, portfolio, capacity, risk, narrative | Summarization/reporting | Misleading rollups; incomplete risk escalation |
| **Client onboarding / intake** | Docs, permissions, scoping | Classification/extraction assist | Wrong client data routing; retention |
| **Quality & approvals** | Review gates, sign-off, evidence | Checklist assist—not autonomous approval | Professional seal/opinion accountability |

---

## 2. What requires true industry-specific treatment

### 2.1 Professional duty sources (non-substitutable)

| Industry | Must use industry authority | Cannot substitute with |
| --- | --- | --- |
| Law | ABA Formal Op. 512; state bar guidance (e.g., CA) | NIST alone |
| Engineering | NSPE Code/BER cases; PE responsible charge | Consulting RCT alone |
| Architecture | AIA ethics/toolkit + stamp/responsible control norms | Generic “creative AI” blogs |
| Accounting | AICPA Code + applicable standards; engagement-type rules | TR survey predictions |
| Executive search / hiring AI | EEOC/DOJ employment discrimination guidance | Marketing automation analogies |
| Creative | Copyright Office doctrine + client IP contracts | Productivity RCTs alone |
| MSP / IT | Security/multi-tenant + client regulatory overlays | Single-tenant support RCT without caveats |
| Management consulting | Client contract confidentiality + quality norms (no single bar) | Law ethics copy-paste |

### 2.2 Operating KPI emphasis differs

| Industry | Lead economic KPIs | Secondary |
| --- | --- | --- |
| Management consulting | Utilization, project margin, proposal cycle, leverage | Win rate |
| IT consulting | Utilization, estimate accuracy, project margin | Bench days |
| Accounting | Realization, seasonal utilization, retention | Workpaper cycle |
| Law | Utilization, realization, matter margin | Time to draft |
| A/E | Backlog, utilization, QA defects, open roles | Proposal cycle |
| Executive search | Days to slate, hours per search, fill/fall-off | Researcher leverage |
| Creative | Utilization, project margin, revision rounds, write-offs | Pitch cycle |
| MSP | Tickets/tech-hour, SLA%, margin/seat, tech utilization | Onboarding days |

### 2.3 “Outside frontier” looks different

| Industry | High-risk “outside frontier” examples (illustrative, not exhaustive) |
| --- | --- |
| Law | Case citation fabrication; legal conclusions without authority check |
| Accounting | Tax position without authority; audit evidence sufficiency |
| Engineering | Calculations/specs affecting life safety without independent check |
| Architecture | Code compliance assertions without qualified review |
| Search | Automated reject decisions with adverse impact |
| Creative | Brand-infringing or un-ownable outputs sold as original |
| MSP | Privileged runbook actions or security changes without change control |
| Consulting | Strategic recommendation outside evidence base presented as fact |

### 2.4 Buyer persona weighting by industry (strategic judgment)

| Persona | Heaviest industries |
| --- | --- |
| Risk/GC | Law, A/E, Search, Accounting |
| COO | All; especially MSP, Consulting, Creative utilization cultures |
| CFO | All; SPI-style margin narrative strongest as multi-vertical |
| Practice Leader | Consulting, Law, A/E, Creative |
| CIO | IT consulting, MSP, larger multi-office firms |
| Managing Partner | All; staffing triggers strongest in Accounting & A/E evidence |

---

## 3. Recommended evidence taxonomy for the content system

Use stable IDs in CMS tags. One claim → many tags.

### 3.1 Claim class
`class:fact` | `class:inference` | `class:strategic_judgment` | `class:prediction` | `class:normative` | `class:gap`

### 3.2 Evidence type
`etype:causal_rct` | `etype:quasi_experimental` | `etype:correlational` | `etype:descriptive_survey` | `etype:descriptive_admin` | `etype:normative_ethics` | `etype:standard_framework` | `etype:forecast` | `etype:vendor_platform`

### 3.3 Source tier (priority order)
`tier:1_gov_reg_assoc_std` → `tier:2_academic` → `tier:3_issuer_primary` → `tier:4_lab_bigtech` → `tier:5_consultancy_vendor`

### 3.4 Geography & firm-size applicability
`geo:us` | `geo:global` | `geo:non_us_primary`  
`size:smb_20_200` | `size:enterprise` | `size:elite_partnership` | `size:unspecified`

### 3.5 Theme
`theme:economics` | `theme:knowledge_reuse` | `theme:ai_productivity` | `theme:adoption_lag` | `theme:confidentiality` | `theme:professional_judgment` | `theme:quality_review` | `theme:business_case` | `theme:ip_copyright` | `theme:employment_ai` | `theme:governance_framework`

### 3.6 Industry
`ind:universal` | `ind:mgmt_consulting` | `ind:it_consulting` | `ind:accounting` | `ind:law` | `ind:ae` | `ind:exec_search` | `ind:creative` | `ind:msp`

### 3.7 Workflow
`wf:proposal_to_project` | `wf:knowledge_to_delivery` | `wf:delivery_to_insight` | `wf:onboarding_intake` | `wf:quality_approvals` | `wf:client_comms` | `wf:capacity_planning` | `wf:hiring_talent`

### 3.8 Persona
`persona:mp_ceo` | `persona:coo` | `persona:practice_leader` | `persona:cio` | `persona:risk_gc` | `persona:cfo`

### 3.9 Content use
`use:playbook` | `use:persona_lp` | `use:social` | `use:assessment` | `use:internal_method`

### 3.10 Status
`status:candidate` | `status:verified` | `status:approved` | `status:reject`

### 3.11 Caveat flags (multi)
`flag:sponsored` | `flag:self_report` | `flag:prediction_not_outcome` | `flag:not_ps_specific` | `flag:elite_firm_only` | `flag:transfer_inference` | `flag:state_specific` | `flag:voluntary_standard` | `flag:not_legal_advice`

---

## 4. Content system architecture recommendation

```
Universal Playbook Spine
├── Economics of expert capacity
├── Knowledge reuse & junior leverage
├── AI task evidence + jagged frontier
├── Adoption lag & measurement discipline
├── Trust controls (confidentiality, review, evidence)
└── Workflow chapters (P2P, K2D, D2I, intake, QA)
        │
        ├── Industry modules (8)  → duty sources + KPI pack + gaps
        └── Persona overlays (6) → triggers + metrics + objections
```

**Assessment structure (Workflow Leverage & Trust):**

| Dimension | Example scored elements | Evidence anchors |
| --- | --- | --- |
| Leverage – Proposal | Cycle time definition; reusable assets; review SLA | Noy/Zhang; SPI capacity context |
| Leverage – Knowledge | Retrieval of prior work; expert directory; lessons loop | Novice-gain pattern (inference) |
| Leverage – Delivery insight | Portfolio visibility; capacity signals; risk escalation | ACEC backlog-style ops metrics as analogs |
| Trust – Data | Tool allowlist; client data classes; tenancy | ABA 512; CA Bar; NSPE 24-2 |
| Trust – Judgment | Human sign-off; outside-frontier routing | Dell’Acqua jagged frontier |
| Trust – Accountability | Supervision; logs; retention; disclosure policy | Ethics opinions + NIST map/measure/manage |
| Trust – Measurement | KPIs beyond adoption % | McKinsey/Deloitte lag pattern; CFO judgment |

Scoring should **not** reward “we use ChatGPT” without controls.

---

## 5. Tensions the platform should preserve (not resolve falsely)

1. **Productivity up ≠ margin up** — hours saved may reduce realization, expand scope, or sit in unbilled quality review.  
2. **Adoption high ≠ scale high** — surveys show use without enterprise value capture.  
3. **Junior gains ≠ remove review** — larger novice gains increase need for supervision design.  
4. **Voluntary frameworks ≠ professional safe harbor.**  
5. **Elite-firm RCT ≠ mid-market proof.**  
6. **Vendor correlation (growing firms use more AI) ≠ causation.**  
7. **Predictions (12 hours/week) ≠ measured outcomes.**

---

## 6. Publication sequencing recommendation

**Phase A — Universal spine (ship first)**  
Approved causal productivity + jagged frontier + NIST/ABA-style trust pattern + adoption lag + PS capacity context (SPI with sponsorship flags) + measurement strategic judgment.

**Phase B — Thick duty industries**  
Law → Engineering/A/E → Accounting (staffing + ethics) 

**Phase C — Transfer/hypothesis industries**  
MSP (support RCT transfer) → IT consulting → Management consulting mid-market calibration interviews  

**Phase D — Gap-honest industries**  
Creative (IP-strong, economics-weak) → Executive search (EEOC-strong, economics-weak)  

---

## 7. Maintenance rules

- Re-verify consultancy/vendor survey numbers every major release year.  
- Re-check bar/association ethics pages quarterly for new formal opinions.  
- Re-bound “frontier” claims when major model capability evals change—without rewriting professional duties.  
- Never delete gap cards; convert to research backlog items.  
- Prefer replacing tier-5 descriptive stats with tier-1/2 when available rather than accumulating bibliography bulk.
