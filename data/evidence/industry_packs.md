# Industry Evidence Packs
## Governed AI Operations for Professional Services

Eight industry packs. Each states what is **evidenced**, what is **hypothesis**, and what is an **explicit gap**. No invented ROI, case studies, or compliance advice.

Shared ICP assumptions unless noted: knowledge-intensive, client-facing firms often **20–200 employees**, U.S.-preferenced evidence with global labels where needed.

---

## 1. Management Consulting

### Core economic and operating dynamics
- Expert labor sold primarily as time/value-based engagements; economics hinge on **utilization, rate, realization, leverage (junior:senior), and project margin**.
- Cross-industry SPI benchmarks show industry-wide utilization and margin pressure in 2025 (66.4% utilization; ~9.9% EBITDA in SPI/Deltek summary)—**not consulting-only splits** in public summaries. ([Deltek/SPI](https://www.deltek.com/resources/articles/professional-services-benchmarks/))
- Knowledge reuse (prior proposals, methods, industry packs) is a structural advantage of multi-engagement firms but **lacks recent high-quality public ROI RCTs** specific to consulting KM systems.

### Executive priorities and trigger events
- Growth without linear headcount; proposal volume; delivery quality consistency; partner bandwidth; lateral onboarding speed.
- Triggers: lost proposals due to slow response; margin leakage on fixed-fee work; key-person dependency; client demand for AI-enabled delivery with confidentiality assurances.

### Highest-value workflows
1. **Proposal-to-Project:** research, qualification, proposal drafting, capability assets, review, handoff  
2. **Knowledge-to-Delivery:** prior-work retrieval, expert discovery, analysis support, slide/report drafting, QA  
3. **Delivery-to-Executive Insight:** status, risk, capacity, narrative for partners/clients  

### AI opportunity areas (evidence-tied)
- **Strongest direct causal evidence in this vertical:** Dell’Acqua et al. BCG field RCT (N=758): +12.2% tasks, +25.1% speed, >40% quality **on in-frontier tasks**; quality risk outside frontier. ([SSRN](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4573321))  
- Writing productivity RCT (Noy/Zhang) supports drafting/research memo tasks as a **cross-role** hypothesis. ([Science](https://www.science.org/doi/10.1126/science.adh2586))

### Quality, confidentiality, professional-risk concerns
- Client strategic data in prompts is a confidentiality and trust failure mode (industry practice risk; fewer formal “consulting bar” opinions than law).
- Jagged-frontier quality risk is **directly evidenced** in consulting tasks.
- No universal U.S. consulting-specific GenAI ethics opinion equivalent to ABA 512 found in this research.

### Relevant KPIs
Utilization; realization; project gross margin; proposal cycle time; win rate (context only); leverage ratio; rework rate; % deliverables with documented human review; time-to-productivity for new consultants.

### Best available sources
| Priority | Source | Use |
| --- | --- | --- |
| 1 | Dell’Acqua et al. 2023 field RCT | Productivity/quality causal |
| 2 | Noy/Zhang 2023 Science | Drafting productivity causal |
| 3 | SPI/Deltek PS benchmarks | Economics context (multi-vertical) |
| 4 | NIST AI RMF / GenAI Profile | Governance scaffold |
| 5 | McKinsey/Deloitte AI surveys | Adoption lag framing only |

### Evidence gaps (do not fill)
- Mid-market consulting (20–200) causal studies  
- Realization impact of AI-assisted proposals  
- Confidential client-data field experiments  
- Consulting-specific professional liability claims series tied to GenAI  

---

## 2. IT Consulting

### Core economic and operating dynamics
- Project and/or managed capacity models; utilization and billable mix; skill scarcity in cloud/security/data/AI implementation.
- Macro IT spend growth cited via CompTIA/Gartner forecast context ($5.75T global IT spend 2025 forecast, +9.3%)—**demand backdrop, not firm margins**. ([CompTIA Outlook](https://www.comptia.org/en-us/resources/research/it-industry-outlook-2025/))
- SPI multi-vertical PS benchmarks apply as **hypothesis** for utilization/EBITDA, not IT-pure.

### Executive priorities and trigger events
- Bench management; delivery industrialization; IP/accelerators; security posture; talent shortage; fixed-bid risk.

### Highest-value workflows
- Proposal/SOW estimation and estimation review  
- Solution design documentation  
- Code/test acceleration (out of scope for deep code-security claims here unless primary sources added)  
- Knowledge base for delivery standards  
- Portfolio/status reporting to clients  

### AI opportunity areas
- Documentation, research, estimation drafting: support from general writing/consulting RCTs (transfer).  
- Service-desk-like internal support patterns: Brynjolfsson et al. 14% productivity as **weak transfer** only.  
- Client delivery of AI systems: separate from *using* AI inside the firm’s own ops.

### Quality, confidentiality, professional-risk concerns
- Multi-client data segregation; credentialed environment access; IP ownership of accelerators; security of AI coding assistants (needs dedicated primary security sources before strong claims).
- NIST AI RMF relevant when delivering or operating AI for clients.

### Relevant KPIs
Utilization by role; project margin; estimate accuracy; ticket/backlog aging (if AMS); security incident metrics; % artifacts with review; onboarding time for engineers.

### Best available sources
| Priority | Source | Use |
| --- | --- | --- |
| 1 | SPI/Deltek PS benchmarks | Ops economics hypothesis |
| 2 | Brynjolfsson et al. NBER w31161 | Support-productivity transfer hypothesis |
| 3 | NIST AI RMF / 600-1 | Delivery + internal AI governance |
| 4 | CompTIA IT Outlook (w/ Gartner cite) | Market demand only |
| 5 | Noy/Zhang; Dell’Acqua | Knowledge-work productivity transfer |

### Evidence gaps
- IT consulting-specific utilization/realization public series with methods  
- Causal studies on AI in solutioning/estimation accuracy  
- Public E&O data for AI implementation failures  

---

## 3. Accounting and CPA Firms

### Core economic and operating dynamics
- Seasonal capacity (tax), realization pressure, compliance calendar, advisory mix shift.
- **Staffing is the dominant evidenced constraint:** AICPA 2024 top issues (N=667)—finding qualified staff #1 (except sole practitioners); retention #2 at larger sizes. ([AICPA](https://www.aicpa-cima.com/news/article/staffing-irs-service-problems-and-leadership-development-are-top-issues-for))
- IRS service friction remains a reported operational drag (survey ranking).

### Executive priorities and trigger events
- Busy-season capacity; hire/retain; advisory growth; private equity interest in accounting (not researched as claim here); technology modernization; quality control on tax/audit workpapers.

### Highest-value workflows
- Client onboarding and document intake  
- Tax prep workpaper assembly and research support  
- Advisory memo drafting  
- Audit documentation support (high professional-risk; human accountability critical)  
- Client communication and status  

### AI opportunity areas
- Admin/reconciliation automation discussed qualitatively by AICPA-CIMA materials—**not quantified productivity RCTs in association pages reviewed**.  
- Writing/research acceleration: Noy/Zhang as weak transfer for memos.  
- Thomson Reuters professional survey expectations for tax/accounting roles—**predictions only**. ([TR 2024](https://www.thomsonreuters.com/content/dam/ewp-m/documents/thomsonreuters/en/pdf/reports/future-of-professionals-report-2024.pdf))

### Quality, confidentiality, professional-risk concerns
- Client financial data confidentiality; IRS/tax authority rules; AICPA Code of Professional Conduct continues to apply.
- AICPA FVS AI guidelines: AI introduces specific risks/responsibilities; guidelines **not authoritative standards**. ([AICPA-CIMA FVS guidelines](https://www.aicpa-cima.com/resources/download/guidelines-for-responsible-use-of-artificial-intelligence-ai-in-forensic-and))
- No ABA-512-equivalent single “Formal Opinion” clone found as universal AICPA GenAI rule in this research—existing ethics/competence/confidentiality framework is the binding lens.

### Relevant KPIs
Realization; utilization by season; return e-file error/rework; workpaper review cycle time; staff retention; chargeable hours per FTE; % engagements with AI-use disclosure policy (firm policy metric).

### Best available sources
| Priority | Source | Use |
| --- | --- | --- |
| 1 | AICPA top issues survey 2024 | Capacity triggers |
| 2 | AICPA-CIMA ethics/AI guidance materials | Professional obligations framing |
| 3 | TR Future of Professionals 2024 | Perception/prediction only |
| 4 | NIST AI RMF | Governance scaffold |
| 5 | Noy/Zhang | Memo drafting transfer hypothesis |

### Evidence gaps
- Causal AI productivity in tax/audit production environments  
- Realization impact of AI  
- Authoritative AICPA ethics interpretation solely on GenAI comparable to ABA 512 (monitor PEEC)  
- Mid-market PE-backed vs independent firm splits  

---

## 4. Law Firms

### Core economic and operating dynamics
- Billable hour still central for many U.S. firms; utilization, realization, leverage, and matter profitability dominate.
- Vendor platform data (Clio) shows high AI **use** with weak **policy** penetration—governance gap. ([Clio Legal Trends](https://www.clio.com/resources/legal-trends/read-online/))
- Growing vs shrinking firm AI usage correlations exist in Clio data—**not causal**.

### Executive priorities and trigger events
- Client pressure on fees/efficiency; lateral integration; malpractice risk; court sanctions narratives around hallucinated citations (widely reported in secondary media—**prefer primary disciplinary opinions before campaign use**); talent expectations.

### Highest-value workflows
- Research and drafting  
- Contract review/analytics  
- eDiscovery TAR (longstanding AI class)  
- Client intake and communication  
- Supervision of associates/staff using AI  
- Proposal/pitch materials for larger firms  

### AI opportunity areas
- Efficiency narrative supported by professional surveys (TR predictions) and Clio adoption stats—**not causal firm ROI**.  
- Task productivity transfer from Noy/Zhang for writing; legal-specific field RCTs at scale remain limited in this library (legal aid field studies exist on SSRN but were not fully extracted as approved KPI claims here).

### Quality, confidentiality, professional-risk concerns — **strongest normative pack**
- **ABA Formal Opinion 512 (July 29, 2024):** competence, confidentiality, communication, supervision, meritorious claims, candor, reasonable fees. ([Opinion 512](https://www.americanbar.org/content/dam/aba/administrative/professional_responsibility/ethics-opinions/aba-formal-opinion-512.pdf))  
- Competence = reasonable understanding of specific tool limits, not AI expertise.  
- **California State Bar GenAI Practical Guidance:** input/training/third-party sharing risks. ([CA Bar](https://www.calbar.ca.gov/Portals/0/documents/ethics/Generative-AI-Practical-Guidance.pdf))  
- State variations matter; Model Rules ≠ automatic state law.

### Relevant KPIs
Utilization; realization; matter margin; time to first draft; review rounds; motion/brief error/rework; % matters with AI use logged; policy acknowledgment rate; client intake cycle time.

### Best available sources
| Priority | Source | Use |
| --- | --- | --- |
| 1 | ABA Formal Opinion 512 | Core duties |
| 2 | CA Bar GenAI Guidance | Confidentiality/tool risk |
| 3 | Clio Legal Trends | Adoption vs policy (vendor) |
| 4 | TR Future of Professionals | Expectations (vendor) |
| 5 | ABA AI Task Force 2024 report | Broader context (mixed evidence quality inside) |

### Evidence gaps
- Causal mid-market law firm ROI  
- Primary tabulated disciplinary statistics for GenAI misuse (use specific opinions, not anecdotes, when publishing)  
- Realization effects of AI drafting  

---

## 5. Architecture and Engineering Firms

### Core economic and operating dynamics
- Project-based professional design services; backlog as demand signal; utilization of licensed professionals; QA/QC culture; multiparty project delivery.
- **ACEC Q1 2026:** median backlog 11 months; 47% ≥12 months; 88% have open positions; large firms (500+ FTE) median backlog 13 months. ([Engineering Inc. / ACEC](https://engineeringinc.acec.org/blog/5-numbers-that-define-engineerings-business-outlook-in-2026/))
- Public safety overlay distinguishes A/E from pure advisory consulting.

### Executive priorities and trigger events
- Staffing against backlog; project delivery risk; professional liability; owner/client AI clauses; design automation hype vs seal/stamp responsibility.

### Highest-value workflows
- Pursuit/proposal  
- Design options exploration (architecture)  
- Spec/report drafting  
- Interdisciplinary coordination documentation  
- QA/QC and principal review  
- Project reporting to owners  

### AI opportunity areas
- Report/spec drafting assistance with mandatory PE/architect responsible charge—aligned with NSPE ethics logic.  
- AIA toolkit for maturity, policy, workflow patterns (guidance, not outcomes). ([AIA Toolkit](https://aifirmtoolkit.aia.org/))  
- General productivity RCTs transfer only with heavy domain caveat (life-safety).

### Quality, confidentiality, professional-risk concerns
- **NSPE BER Case 24-2:** review/verify under direction/control can be ethical; open AI upload of client confidential data without consent unethical. ([NSPE](https://www.nspe.org/career-growth/ethics/board-ethical-review-cases/use-artificial-intelligence-engineering-practice))  
- NSPE position: AI affecting public safety should meet PE-comparable standards. ([NSPE AI position](https://www.nspe.org/nspe-advocacy/explore-issues/professional-policies-and-position-statements/artificial-intelligence))  
- Copyright/IP for design content: USCO Part 2 assistive-use framing relevant to creative design outputs. ([USCO](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf))

### Relevant KPIs
Backlog months; utilization; project margin; QA defect/rework; proposal cycle time; open reqs; % sealed documents with documented human design check; RFI cycle time.

### Best available sources
| Priority | Source | Use |
| --- | --- | --- |
| 1 | ACEC Research Institute sentiment | Demand/capacity |
| 2 | NSPE BER 24-2 + AI position | Ethics/risk |
| 3 | AIA AI Toolkit / Task Force | Practice guidance |
| 4 | USCO Copyright Part 2 | Output IP |
| 5 | NIST AI RMF | Governance scaffold |

### Evidence gaps
- Measured AI productivity in design production (architecture-specific RCT not found)  
- Professional liability claims frequency tied to AI design tools  
- Mid-market vs 500+ FTE operating differences beyond backlog  

---

## 6. Executive-Search Firms

### Core economic and operating dynamics
- Retained/contingent search economics: research intensity, calendar time-to-slate, recruiter utilization, placement fees, fall-offs.
- Public AESC landing content reviewed did **not** yield transparent, citable utilization or AI productivity statistics with full methods. ([AESC trends page](https://www.aesc.org/insights/research/2024-top-trends-executive-search-technology) — insufficient for quantitative claims)

### Executive priorities and trigger events
- Speed-to-qualified-slate; researcher leverage; client exclusivity; diversity slate expectations; data privacy; AI screening bias risk.

### Highest-value workflows
- Mandate intake and scorecard  
- Longlist research and enrichment  
- Outreach sequencing  
- Interview intelligence / summary (human-final)  
- Client reporting  
- Internal knowledge of candidates/clients (CRM hygiene)

### AI opportunity areas
- Research drafting and summarization (general writing RCT transfer).  
- Automation of sourcing workflows (association interest; **no approved effect sizes** in this library).  
- **Compliance-critical:** automated employment decision tools.

### Quality, confidentiality, professional-risk concerns
- **EEOC/DOJ ADA warnings** on AI in selection, monitoring, pay, promotion. ([EEOC](https://www.eeoc.gov/newsroom/us-eeoc-and-us-department-justice-warn-against-disability-discrimination))  
- Candidate and client confidentiality; cross-border data; bias/adverse impact.
- Search firms advising clients on AI hiring tools inherit advisory risk (not separately evidenced here).

### Relevant KPIs
Days to longlist/shortlist; researcher hours per search; fill rate; fall-off rate; slate diversity metrics (carefully defined); % AI-assisted steps with human review log; data retention compliance checks.

### Best available sources
| Priority | Source | Use |
| --- | --- | --- |
| 1 | EEOC/DOJ AI+ADA materials | Compliance spine |
| 2 | NIST AI RMF | Risk process |
| 3 | Noy/Zhang | Research writing transfer |
| 4 | AESC research (full reports under license) | Future fill for economics |
| 5 | OECD AI Principles | High-level trustworthy AI |

### Evidence gaps — **critical**
- Transparent search-firm financial/operating benchmarks  
- Causal AI productivity in retained search  
- Placement quality outcomes with AI-assisted sourcing  

**Do not publish invented “search industry utilization” numbers.**

---

## 7. Creative Agencies

### Core economic and operating dynamics
- Utilization, project margin, scope creep, speculative work, retainer vs project mix.
- **Gap:** No source-quality-passing public primary series for U.S. agency utilization/realization was locked in this research (vendor blogs rejected). See ledger CRE-001.

### Executive priorities and trigger events
- Faster concepting; client procurement pressure; IP ownership of AI-assisted work; talent cost; pitch velocity.

### Highest-value workflows
- Pitch/proposal  
- Concept generation (human-directed)  
- Production drafting (copy, variants)  
- Asset versioning and client presentation  
- Knowledge of brand systems and prior campaigns  

### AI opportunity areas
- Drafting/ideation speed: general writing evidence as weak transfer.  
- Production variation: capability claims need model/vendor primary evals before ROI claims.  
- **IP clarity is the strongest primary evidence area** for this vertical.

### Quality, confidentiality, professional-risk concerns
- **USCO Part 2 (Jan 2025):** assistive AI does not bar copyright in human original expression; standing-in-for-human creativity differs. ([USCO Part 2](https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf))  
- Training-data / style-risk and client brand confidentiality.  
- WIPO GenAI IP factsheet: opportunity + legal uncertainty (global). ([WIPO](https://www.wipo.int/documents/d/frontier-technologies/docs-en-pdf-generative-ai-factsheet.pdf))  
- FTC advertising claim substantiation for AI-related marketing claims (fetch of specific FTC page failed in this run—re-verify before publishing FTC-specific claim cards).

### Relevant KPIs
Utilization; project margin; pitch cycle time; revision rounds; % deliverables with human creative direction documented; IP ownership clause coverage; write-off rate.

### Best available sources
| Priority | Source | Use |
| --- | --- | --- |
| 1 | USCO Copyright + AI Part 2 | IP/copyrightability |
| 2 | WIPO GenAI IP factsheet | Global IP risk framing |
| 3 | Noy/Zhang | Copy drafting transfer |
| 4 | NIST AI RMF | Governance |
| 5 | Licensed 4As/ANA financial surveys (not secured here) | Future economics |

### Evidence gaps — **critical**
- Defensible agency utilization/realization benchmarks  
- Causal creative-quality studies with client outcomes  
- Advertiser-side AI policy requirements as standardized metrics  

---

## 8. Managed Service Providers (MSPs)

### Core economic and operating dynamics
- Recurring revenue, technician utilization, ticket throughput, SLA attainment, tool stack cost, gross margin per seat.
- Public CompTIA pages reviewed provided **IT market outlook** more than MSP margin micro-benchmarks with full methods. ([CompTIA](https://www.comptia.org/en-us/resources/research/it-industry-outlook-2025/))
- SPI PS benchmarks may include some managed services firms in multi-vertical blend—do not over-attribute.

### Executive priorities and trigger events
- Technician shortage; ticket backlog; after-hours coverage; security service attach; AI noise in vendor roadmaps; multi-tenant data risk.

### Highest-value workflows
- Tier-1/Tier-2 ticket resolution  
- Knowledge base authoring  
- Client QBR / executive reporting  
- Onboarding new technicians  
- RMM/PSA hygiene and documentation  
- Proposal for managed packages  

### AI opportunity areas
- **Best causal transfer candidate:** Brynjolfsson et al. ~14% issues/hour, larger for novices—in **software support chat**, not MSP multi-tenant NOC. Label as hypothesis. ([NBER](https://www.nber.org/system/files/working_papers/w31161/w31161.pdf))  
- Knowledge-base generation and summarization.  
- QBR narrative drafting with human review.

### Quality, confidentiality, professional-risk concerns
- Multi-tenant isolation; credentials in prompts; HIPAA/PCI client overlays (sector-specific—do not generalize without client regime).  
- Security of AI tools in privileged environments.  
- SLA risk if AI hallucinations reach clients without review.

### Relevant KPIs
Tickets resolved per tech-hour; first-contact resolution; SLA %; tech utilization; gross margin per seat; KB coverage; onboarding days to solo Tier-1; % AI suggestions accepted with edit.

### Best available sources
| Priority | Source | Use |
| --- | --- | --- |
| 1 | Brynjolfsson et al. NBER w31161 | Ticket productivity hypothesis |
| 2 | SPI/Deltek PS benchmarks | Broad PS ops context |
| 3 | CompTIA research | Market/channel context |
| 4 | NIST AI RMF / 600-1 | Tooling governance |
| 5 | Noy/Zhang | Documentation drafting transfer |

### Evidence gaps — **critical**
- MSP-specific utilization/margin primary series with open methods  
- Multi-tenant GenAI incident data  
- Causal PSA/RMM+AI outcome studies  

---

## Cross-pack quick matrix

| Industry | Strongest evidence type | Strongest theme | Biggest gap |
| --- | --- | --- | --- |
| Management consulting | Causal field RCT | In-frontier productivity + jagged risk | Mid-market generalization |
| IT consulting | Transfer + macro | Knowledge work + demand | Vertical KPI series |
| Accounting/CPA | Association survey + ethics | Staffing capacity | Causal tax/audit AI outcomes |
| Law | Ethics opinions + vendor adoption | Duties vs policy gap | Causal ROI / realization |
| A/E | Association survey + ethics case | Backlog/staffing + confidentiality | Design productivity RCTs |
| Executive search | Regulatory hiring AI | ADA/bias risk | Firm economics + AI outcomes |
| Creative | Copyright agency report | IP/copyrightability | Utilization benchmarks |
| MSP | Causal support study (transfer) | Ticket/knowledge leverage | MSP primary benchmarks |

---

## Shared recommendation for all packs

Ship industry pages as:
1. **Operating reality** (association/government economics where available)  
2. **Duty of care** (profession-specific)  
3. **AI task evidence** (causal, with transfer labels)  
4. **Governance scaffold** (NIST/ISO/OECD)  
5. **Explicit “not evidenced here” box**
