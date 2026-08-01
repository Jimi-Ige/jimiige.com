# Business Play Card: Shorten the Path from Proposal to Project

**Status:** Draft for review · Not yet recorded in Notion (authorization required)
**Record type:** Business Play · **Outcome stage:** Defined · **Assurance posture:** Design
**Ontology position:** Business Outcome → **Business Play** → Industry → Persona → Workflow → AI Pattern → Operational Assurance → Technology

Derived from: GTM Playbook flagship workflow 1, the Business Outcome Architecture v1.0
Business Play Card template, and the evidence package at `data/evidence/`.

---

## 1. Outcome

**Before:** Senior people spend their scarcest hours assembling pursuit material
the firm has already produced, and the decision to decline arrives after the
proposal is half written.

**After:** Qualification happens first and stays a partner call. Assembly runs on
governed rails from approved sources. Partner attention concentrates on the three
decisions that set the economics: whether to pursue, what to promise, and what to
charge.

**Outcome statement:** Shorten the path from qualified conversation to submitted
proposal, and from win to a delivery team building what was actually sold, without
adding senior headcount and without weakening client-confidentiality or review
discipline.

## 2. Executive problem and urgency trigger

The pursuit process consumes the firm's most expensive and least expandable
resource. Every proposal draws on partner time for research, prior-work
reconstruction, capability assembly, pricing judgment, and review. Most of that
is retrieval and formatting, not judgment, but it is done by the people whose
judgment the client is buying.

Two failure modes compound. Pursuits the firm should have declined consume
senior hours before anyone runs the numbers. And what gets promised in the
proposal reaches the delivery team as memory rather than record, so the team
builds something adjacent to what was sold.

**Urgency triggers** (any one is sufficient to open the conversation):
- Growth has stalled because winning more work requires hiring partners the market cannot supply on schedule.
- The no-bid decision keeps arriving after the proposal is half written.
- Proposal turnaround is losing pursuits the firm was qualified to win.
- Pursuit teams rebuild the same capability material, pricing logic, and win themes every cycle.
- A client asked, in a pursuit meeting or in the contract, how the firm uses AI on their work.

## 3. Buyer, sponsor, operator

| Role | Person | Their question |
|---|---|---|
| **Economic buyer** | Managing Partner / CEO (Growth Champion) | Does this grow the firm without diluting it or requiring hires I cannot make? |
| **Sponsor** | COO / Operations Director (Efficiency Driver) | Does the pursuit process get more reliable, or just busier? |
| **Operator** | Practice Leader / pursuit lead (Client Advocate) | Does the work that carries my name get better, and does review stay mine? |
| **Design partner** | CIO / IT Director (Technology Steward) | Is this one governed path, or another tool to inherit? |
| **Blocker to satisfy early** | General Counsel / Risk (Risk Guardian) | What touches client-confidential material, and who answers for the output? |
| **Validator** | CFO / Finance Partner (Investment Skeptic) | What does it cost, what returns, and would the number survive scrutiny? |

## 4. KPI, baseline, target, economic driver

**Primary KPI:** Senior hours per submitted proposal.

**Supporting KPIs:** proposal cycle time from qualified conversation to submission;
win rate by pursuit type; share of pursuit content drawn from approved reusable
assets; no-bid decisions made before drafting begins; handoff rework in the first
30 days of delivery.

**Baseline:** Established during the Workflow Leverage &amp; Trust Assessment from
the firm's own last complete pursuit cycle. **No baseline is assumed or supplied.**

**Target:** Set with the firm against its own baseline after the assessment.
Do not state a target percentage before measurement.

**Economic driver:** Senior hours are the firm's binding constraint. Hours
returned to pursuit judgment and client relationships convert to revenue only if
the firm names their destination. Hours returned with no destination evaporate.

> **Evidence position.** No credible causal study establishes firm-level ROI for
> a proposal process in a 20 to 200 employee professional-services firm. That gap
> is documented, not filled. Task-level evidence supports the drafting mechanism
> (see section 8); it does not license a payback claim.

## 5. Industry adaptation

Active: **Management consulting.** Library-ready adaptations exist for IT
consulting (pursuit-to-SOW, estimation accuracy), accounting and CPA firms
(proposal and engagement-letter setup under licensed acceptance), law firms
(pitch and matter intake, conflicts-aware), architecture and engineering
(qualifications-to-proposal, SOQ and RFQ), executive search (pitch-to-mandate),
creative agencies (pitch-to-brief), and managed service providers
(quote-to-contract).

The workflow shape is shared. What must be industry-specific: the acceptance
decision and who owns it, the confidentiality boundary, the professional
obligations attaching to what is promised, and the economics the KPI reflects.

## 6. Workflow and AI pattern

**Workflow:** Proposal-to-Project.
Trigger (qualified conversation) → qualification gate (partner decision) →
research and prior-work retrieval → capability assembly → draft → pricing inputs →
partner review of promise, price, and team → submission → structured handoff into
delivery.

**AI patterns used** (technology-neutral):
- **Retrieval** over a curated corpus of prior proposals, capability assets, and firm methods, with provenance attached.
- **Extraction** from RFP and client documents into a structured requirement set.
- **Generation** of first drafts grounded in retrieved firm material, never from a blank page or an ungoverned corpus.
- **Classification** to route pursuits against qualification criteria before drafting begins.

**Not used:** autonomous submission, autonomous pricing, or any pattern that
produces a client-facing commitment without a named human approving it.

## 7. Operational Assurance

| Objective | Control | Evidence | Human oversight |
|---|---|---|---|
| Client confidentiality holds across pursuits | Engagement-scoped boundaries; access mirrors pursuit staffing; no cross-client corpus | Access records tied to pursuit team; corpus scope documented | Pursuit lead confirms boundary at kickoff |
| Only approved material is reused | Curated capability library with named owner, provenance, and review date | Provenance on every reused asset; review dates current | Library owner accountable for currency |
| Nothing is promised that cannot be delivered | Mandatory partner review of promise, price, and team before submission | Named approver and timestamp per submission | Partner approval is a gate, not a notification |
| Quality survives speed | Written quality criteria visible at the review point; task routing away from work outside model capability | Review record; defect and rework tracking into delivery | Reviewer decides; the tool never clears the gate |
| The firm can explain its AI use | Standing disclosure answer; per-pursuit check against that client's contract terms | The disclosure statement; contract review record | General Counsel owns the answer |
| Data does not persist beyond need | Retention rules for prompts, drafts, and outputs set at pursuit close | Retention schedule and its execution | Operations owns; Risk reviews |

**Regulatory and professional mapping:** For management consulting there is no
single governing bar; client contract terms are the binding constraint. For
licensed adaptations, the professional obligation attaches and is
non-delegable: attorneys retain legal judgment and signature, CPAs retain
professional judgment and sign-off, licensed engineers and architects retain
responsible charge and the seal. Voluntary scaffolds (NIST AI RMF and its
Generative AI Profile, ISO/IEC 42001) organize the control set; they are not
safe harbors and confer no certification.

**Standing boundary:** This play delivers operational guidance. It does not
provide legal, tax, accounting, audit, or regulatory-certification claims.

## 8. Implementation posture

**Posture: assist, with gated approval.** Drafting, retrieval, and extraction are
assisted. Qualification, pricing, promise, and submission remain human decisions
with named owners. Agentic orchestration is out of scope for this play at its
current maturity.

**Readiness prerequisites:** a curated capability corpus with an owner; access
control that can express pursuit boundaries; a qualification gate that already
exists as a decision, even if informally; partner willingness to keep review
unchanged.

**Decision rights:** pursue or decline (partner); what is promised (partner);
price (partner); what enters the corpus (library owner); what the tools may reach
(CIO with Risk); when to disclose AI use (General Counsel).

**Evidence supporting the mechanism.** A preregistered experiment found access to
a general AI assistant cut time on occupation-specific professional writing tasks
by about 40 percent with higher judged quality (Noy and Zhang, *Science*, 2023,
N≈453; task-level, evaluator-scored, not client engagements). A field experiment
with 758 consultants at one elite firm found large gains on tasks inside the
model's capability frontier and **quality damage outside it** (Dell'Acqua et al.,
2023). The second finding is why review is a standing control here rather than a
launch-phase precaution.

## 9. Proof and reusable assets

**Proof status:** Hypothesis. No case study, pilot, or client validation exists
for this play. The Case Studies record must remain empty until an engagement
produces observed evidence under terms that permit its use.

**Reusable assets already built** (in the jimiige.com repository, branch
`feat/professional-services-system`, unpushed):
- Flagship playbook chapter 4, `grow-delivery-capacity-with-governed-ai.html`
- Industry adaptations in all seven library playbooks
- Persona pages at `/go/<industry>/managing-partner/` and five sibling roles
- Campaign posts 01, 02, 03 and 04 in `content/campaigns/management-consulting.md`
- Conversion path: `workflow-leverage-assessment.html`

**Assets still to build for this play:** the outcome page (evergreen, outcome-led),
a single-offer campaign landing page, the deeper implementation playbook and
diagnostic, and the sales outreach artifact.

**Technology options:** deliberately unnamed. Technology sits downstream of the
outcome and may change without changing the play.

## 10. Open questions

1. Baseline definition: is "senior hours per submitted proposal" measurable from existing time records, or does the assessment have to instrument it?
2. Does the qualification gate exist as a decision the firm can name, or is it implicit? The play's value depends on it.
3. What does the firm's standard client contract already say about AI use, and does it vary by client?
4. Which prior proposals may lawfully enter a reuse corpus, given the terms under which they were produced?
