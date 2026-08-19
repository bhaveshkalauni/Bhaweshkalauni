import { 
  EducationItem, 
  ExperienceItem, 
  ExpertiseCategory, 
  CaseStudyItem, 
  BackgroundPhase 
} from "./types";

export const personalInfo = {
  name: "BHAWESH KALAUNI",
  title: "SUPPLY CHAIN & OPERATIONS",
  role: "Master in Management Candidate",
  institution: "NEOMA Business School",
  location: "Rouen, France",
  availability: "Available for Strategy, Operations & SCM Roles (2026 / 2027)",
  headline: "Supply Chain · Operations · Logistics · Procurement · Supply Chain Analytics",
  summary: "Master in Management candidate at NEOMA Business School with a rigorous Mechanical Engineering background. Dedicated to eliminating operational friction, optimizing multi-echelon inventory, and building resilient, data-driven supply networks.",
  positioning: "Bridging the gap between engineering analytical rigor and strategic operational execution to design agile, cost-effective global supply chains.",
  contact: {
    email: "bhaveshkalauni12@gmail.com",
    linkedin: "https://linkedin.com/in/bhaveshkalauni",
    github: "https://github.com/bhaveshkalauni",
    location: "Rouen, France / Open to Global Relocation"
  }
};

export const backgroundPhases: BackgroundPhase[] = [
  {
    phase: "01",
    title: "MECHANICAL ENGINEERING",
    institution: "Graphic Era Hill University · Dehradun, India",
    period: "2021 — 2025",
    summary: "Built a quantitative foundation grounded in physical systems, production line mechanics, thermo-fluids, and engineering mathematics. Developed a mindset centered on root-cause analysis, tolerance control, and zero-defect quality systems.",
    takeaways: [
      "Systems thinking and mathematical optimization algorithms",
      "Factory floor production workflows and machine capability analysis",
      "Tolerance engineering, CAD systems modeling, and failure-mode analysis"
    ]
  },
  {
    phase: "02",
    title: "MANAGEMENT & STRATEGY",
    institution: "NEOMA Business School (Grande École) · Rouen, France",
    period: "2026 — Present",
    summary: "Refined strategic business intuition, financial modeling, and structured MECE problem-solving frameworks. Gained exposure to European commerce dynamics, corporate strategy, and organizational decision economics.",
    takeaways: [
      "Corporate business strategy, market sizing, and P&L financial analysis",
      "Executive communication and cross-cultural stakeholder management",
      "High-stakes business case resolution and quantitative decision trees"
    ]
  },
  {
    phase: "03",
    title: "SUPPLY CHAIN & OPERATIONS",
    institution: "Professional Focus & Career Aspiration",
    period: "Core Specialization",
    summary: "The natural convergence of engineering precision and strategic business management. Focused on driving end-to-end supply chain resilience, reducing working capital through inventory modeling, and optimizing procurement logistics.",
    takeaways: [
      "Multi-echelon inventory planning & safety stock optimization",
      "Vendor lifecycle management, lead-time shrinkage & SLA controls",
      "Supply chain analytics using Power BI, SQL, and advanced Excel modeling"
    ]
  }
];

export const caseStudies: CaseStudyItem[] = [
  {
    id: "case-1",
    index: "01",
    title: "Multi-Echelon Inventory Optimization & Safety Stock Strategy",
    category: "Supply Chain Analytics & Inventory Planning",
    timeline: "Case Study & Quantitative Simulation",
    role: "Lead Analyst & Modeler",
    heroMetric: { value: "-22%", label: "Holding Cost Reduction" },
    summary: "A quantitative supply chain simulation analyzing demand volatility, lead-time variance, and service-level trade-offs across a multi-tier distribution network.",
    problem: "Excessive inventory buffer allocations resulted in working capital bloat and warehouse overcapacity, while intermittent demand spikes still caused stockouts on high-margin SKUs.",
    objective: "Establish mathematically defensible safety stock parameters and reorder points to maintain a 98.5% service level while minimizing total inventory holding costs.",
    context: "Evaluated a distribution network comprising 1 Central Distribution Center (CDC) supplying 4 Regional Hubs across 120 SKU clusters with varying lead-time standard deviations.",
    approach: [
      "Segmented 120 SKUs using ABC-XYZ classification based on revenue contribution and demand coefficient of variation (CV).",
      "Constructed a stochastic multi-echelon inventory model incorporating normal and Poisson demand distributions.",
      "Calculated dynamic Safety Stock (SS = Z × √(L × σ_D² + D̄² × σ_L²)) factoring both supplier lead-time variance and customer demand swings.",
      "Simulated replenishment cycles under continuous review (s, Q) and periodic review (R, S) policies."
    ],
    analysis: [
      "Identified that 64% of holding costs were tied up in slow-moving, high-cost Class A-Z items kept at regional hubs.",
      "Discovered CDC pooling effect could reduce aggregate buffer requirements by 27% compared to decentralized stocking.",
      "Identified critical lead-time sensitivity: a 2-day reduction in supplier variability outperformed a 10% unit price discount in total cost impact."
    ],
    keyFindings: [
      "Decentralized safety stocks caused the Bullwhip Effect, amplifying upstream demand variability by 1.8x.",
      "Risk-pooling at the Central Distribution Center enabled a 22% overall reduction in safety stock volume.",
      "Optimized order quantities (EOQ) aligned with economic freight minimums to preserve container utilization."
    ],
    recommendations: [
      "Shift Class A-Z items to a centralized pooled stocking model with rapid-dispatch SLAs.",
      "Implement automated dynamic reorder alerts linked to rolling 30-day lead-time standard deviations.",
      "Establish vendor Service Level Agreements (SLAs) penalizing lead-time variance greater than ±1.5 days."
    ],
    toolsUsed: ["Advanced Excel (VBA / Solver)", "Microsoft Power BI", "SQL", "Monte Carlo Simulation", "ABC-XYZ Matrix"],
    tags: ["Inventory Optimization", "Safety Stock", "ABC-XYZ", "Risk Pooling", "Bullwhip Mitigation"]
  },
  {
    id: "case-2",
    index: "02",
    title: "Digital Vendor Onboarding & Supply Chain Elasticity",
    category: "Operations & Vendor Ecosystem Management",
    timeline: "TechnoGiants Digisolutions (Operations Lead)",
    role: "Operations Lead",
    heroMetric: { value: "-30%", label: "Integration Cycle Time" },
    summary: "Restructured the end-to-end partner onboarding funnel and supplier catalog pipeline to expand retail network supply elasticity.",
    problem: "Manual verification, siloed communication between sales and engineering, and fragmented catalog formatting caused a 21-day average vendor onboarding delay, throttling platform supply.",
    objective: "Compress partner onboarding lead time to under 14 days while increasing catalog compliance to >95% and eliminating data reconciliation errors.",
    context: "High-growth digital commerce platform scaling partner ecosystem from 15 to 50+ enterprise and regional retail suppliers.",
    approach: [
      "Mapped the existing 7-stage vendor journey to identify handoff friction points, approval bottlenecks, and data redundancies.",
      "Instituted standardized digital catalog templates with automated validation checks for product specifications and inventory feeds.",
      "Built real-time operational monitoring dashboards in Microsoft Power BI tracking stage-by-stage pipeline velocity.",
      "Conducted weekly Kaizen reviews with engineering and account management to clear stalled integrations."
    ],
    analysis: [
      "Data showed that 45% of total cycle delay occurred during initial SKU schema mapping and image asset verification.",
      "Suppliers with structured pre-onboarding technical briefs completed integration 2.4x faster than ad-hoc submissions.",
      "Automating validation checks removed 14 hours per week of manual data entry per operations coordinator."
    ],
    keyFindings: [
      "Onboarding cycle time dropped from 21 days to an average of 14.7 days (-30%).",
      "Successfully scaled active partner roster past 50+ onboarded retailers with zero increase in operations headcount.",
      "Catalog feed accuracy reached 96.8%, reducing customer order cancellations due to inventory discrepancies."
    ],
    recommendations: [
      "Implement a self-service partner portal with live API sandbox testing.",
      "Tie supplier tier rankings to catalog update frequencies and inventory sync reliability.",
      "Standardize monthly vendor scorecard reviews focusing on order fulfillment fill rates."
    ],
    toolsUsed: ["Power BI", "Microsoft Excel (PowerQuery)", "Process Flow Mapping", "SLA Tracking", "Kaizen Workshops"],
    tags: ["Vendor Management", "Workflow Automation", "Process Optimization", "KPI Dashboards", "Supply Elasticity"]
  },
  {
    id: "case-3",
    index: "03",
    title: "Industrial Assembly Line Balancing & Lean Kaizen Study",
    category: "Manufacturing Operations & Plant Logistics",
    timeline: "Windlass Engineers Ltd. (Engineering Intern)",
    role: "Industrial Operations Intern",
    heroMetric: { value: "+18%", label: "Assembly Throughput" },
    summary: "Conducted continuous improvement (Kaizen) time-and-motion studies to balance plant assembly workstations and optimize internal material handling routes.",
    problem: "Assembly line bottlenecking at Station 3 created work-in-progress (WIP) build-up, erratic operator idle times, and an unacceptable 4.8% end-of-line defect rate.",
    objective: "Balance workstation cycle times to match target takt time, reduce WIP floor inventory by 25%, and lower defect rates through 5S poka-yoke mechanisms.",
    context: "Precision industrial manufacturing facility producing mechanical assemblies with high customer delivery penalties.",
    approach: [
      "Performed 80+ timed cycle measurements across all 5 progressive assembly workstations to establish baseline takt times.",
      "Created Value Stream Maps (VSM) categorizing activities into Value-Added (VA), Non-Value-Added (NVA), and Essential NVA.",
      "Re-allocated non-critical sub-assembly tasks from the bottleneck station to upstream workstations with available capacity.",
      "Designed ergonomic workstation fixtures and point-of-use shadow boards using 5S and poka-yoke (mistake-proofing) principles."
    ],
    analysis: [
      "Discovered Station 3 had a cycle time of 142s against a line takt time of 115s, causing a 27s starvation delay at Station 4.",
      "Operators spent 18% of their shift walking to fetch fasteners and tools due to disorganized floor staging.",
      "Identified that minor tooling redesign allowed simultaneous torque fastening, cutting 22 seconds from the bottleneck task."
    ],
    keyFindings: [
      "Line balancing efficiency improved from 68% to 87%, increasing overall finished unit throughput by +18%.",
      "Floor work-in-progress (WIP) inventory decreased by 32%, freeing up 45m² of active floor space.",
      "Assembly defect rate fell from 4.8% to 1.9% following standard operating procedure (SOP) visual aids."
    ],
    recommendations: [
      "Deploy kanban pull cards between fabrication and assembly staging to prevent overproduction.",
      "Implement daily 10-minute shift-start tier-1 huddles reviewing line pacing against takt.",
      "Cross-train assembly technicians across adjacent workstations to absorb unplanned absenteeism."
    ],
    toolsUsed: ["Value Stream Mapping (VSM)", "Time & Motion Studies", "Line Balancing", "5S & Poka-Yoke", "Root Cause (5-Whys)"],
    tags: ["Lean Manufacturing", "Takt Time", "Line Balancing", "Kaizen", "Quality Control"]
  },
  {
    id: "case-4",
    index: "04",
    title: "Strategic Sourcing & Total Cost of Ownership (TCO) Analysis",
    category: "Procurement Strategy & Spend Analytics",
    timeline: "Supply Chain Strategy Project",
    role: "Strategic Sourcing Analyst",
    heroMetric: { value: "€140K", label: "Estimated Spend Savings" },
    summary: "Formulated a structured procurement sourcing strategy evaluating single vs. dual-sourcing trade-offs, geopolitical freight risks, and Total Cost of Ownership (TCO).",
    problem: "Single-source reliance on an overseas vendor for critical machined components exposed the organization to severe port congestion delays and freight rate spikes.",
    objective: "Design a Kraljic Matrix supplier classification and Total Cost of Ownership (TCO) model to de-risk procurement while capturing cost savings.",
    context: "Strategic evaluation of annual €2.4M direct materials spend across 18 critical component lines.",
    approach: [
      "Classified procurement portfolio using the Kraljic Matrix across Supply Risk and Profit Impact dimensions.",
      "Built comprehensive Total Cost of Ownership (TCO) models factoring purchase price, ocean freight, customs tariffs, safety stock carrying costs, quality defect scrap, and expediting penalties.",
      "Modeled nearshore (Eastern Europe) vs. offshore (East Asia) dual-sourcing splits under varying freight price scenarios."
    ],
    analysis: [
      "Offshore supplier unit price was 18% lower, but landed TCO was only 4.2% lower when accounting for inventory holding and extended pipeline buffers.",
      "A 70/30 dual-sourcing split (70% offshore baseline / 30% nearshore agile) reduced stockout exposure risk by 65% with only a 1.1% increase in nominal unit costs.",
      "Standardizing 6 custom fastener specifications into standard DIN components unlocked volume rebates."
    ],
    keyFindings: [
      "Demonstrated that lowest purchase price per unit does not equal lowest Total Cost of Ownership.",
      "Dual-sourcing strategy provides operational resilience against container freight spikes above $4,500/FEU.",
      "Identified €140,000 in immediate cost-avoidance through specification rationalization and volume consolidation."
    ],
    recommendations: [
      "Execute RFP for nearshore contract manufacturer to establish secondary qualified supplier.",
      "Implement dynamic landed-cost tracking incorporating real-time Bunker Adjustment Factors (BAF).",
      "Adopt index-linked raw material price adjustment clauses in long-term supplier master agreements."
    ],
    toolsUsed: ["Kraljic Matrix", "TCO Modeling", "Spend Analytics", "Scenario Modeling", "Supplier Risk Scoring"],
    tags: ["Strategic Sourcing", "Procurement", "TCO Analysis", "Dual-Sourcing", "Risk Mitigation"]
  }
];

export const expertiseAreas: ExpertiseCategory[] = [
  {
    id: "exp-supply-chain",
    category: "SUPPLY CHAIN",
    subtitle: "Core Domain & Logistics Management",
    items: [
      { name: "Demand Planning & S&OP", detail: "Forecasting statistical baselines, demand consensus, and seasonality modeling." },
      { name: "Inventory Optimization", detail: "Safety stock calculation, EOQ, reorder points, and ABC-XYZ segmentation." },
      { name: "Procurement & Sourcing", detail: "Kraljic matrix analysis, TCO modeling, supplier SLAs, and vendor onboarding." },
      { name: "Logistics & Distribution", detail: "Multi-echelon network design, freight analysis, lead-time variance control." },
      { name: "Operations Excellence", detail: "Lean methodology, Kaizen workshops, Value Stream Mapping, and bottleneck elimination." }
    ]
  },
  {
    id: "exp-analytics",
    category: "ANALYTICS",
    subtitle: "Quantitative Tools & Operational Modeling",
    items: [
      { name: "Microsoft Power BI", detail: "End-to-end dashboard development, DAX modeling, and KPI tracking pipelines." },
      { name: "Advanced Excel", detail: "VBA automation, PowerQuery ETL, Monte Carlo simulations, and Solver optimization." },
      { name: "SQL & Data Querying", detail: "Relational database joins, data extraction, and spend / inventory transaction aggregation." },
      { name: "Statistical Forecasting", detail: "Moving averages, exponential smoothing, and forecast accuracy metrics (MAPE, MAD)." },
      { name: "Root-Cause & Pareto", detail: "5-Whys analysis, Ishikawa diagrams, and 80/20 prioritization frameworks." }
    ]
  },
  {
    id: "exp-business",
    category: "BUSINESS & STRATEGY",
    subtitle: "Management Acumen & Frameworks",
    items: [
      { name: "Process Improvement", detail: "Lean Six Sigma DMAIC principles, cycle time reduction, and workflow standardisation." },
      { name: "Cost & Margin Analysis", detail: "Landed cost breakdown, working capital optimization, and direct vs. indirect spend." },
      { name: "Operations Strategy", detail: "Aligning supply network capacity with corporate growth goals and market realities." },
      { name: "MECE Problem Solving", detail: "Deconstructing ambiguous operational challenges into mutually exclusive structured trees." },
      { name: "Cross-Functional Leadership", detail: "Connecting engineering technical teams with commercial sales and executive leadership." }
    ]
  }
];

export const experienceTimeline: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Operations Lead",
    company: "TechnoGiants Digisolutions",
    location: "Remote / Hybrid",
    period: "June 2024 — Present",
    type: "Professional Experience",
    impactMetrics: [
      { value: "50+", label: "Partners Onboarded" },
      { value: "-30%", label: "Integration Cycle" },
      { value: "96.8%", label: "Feed Accuracy" }
    ],
    deliverables: [
      "Orchestrated end-to-end partner onboarding workflows, scaling the supplier network from 15 to 50+ active digital vendors.",
      "Designed and deployed operational Power BI dashboards tracking pipeline throughput, identifying stage bottlenecks, and enforcing SLAs.",
      "Engineered automated validation routines for supplier catalog data, cutting manual reconciliation time by 14 hours per week.",
      "Led weekly cross-functional synchronization meetings with engineering and partner management to eliminate integration blockers.",
      "Formulated operational standard operating procedures (SOPs) that decreased overall onboarding lead time by 30%."
    ],
    skills: ["Supply Chain Coordination", "Vendor Onboarding", "Power BI", "Excel", "Process Improvement", "Operational Analytics"]
  },
  {
    id: "exp-2",
    role: "Engineering Intern (Manufacturing & Logistics)",
    company: "Windlass Engineers Ltd.",
    location: "Dehradun, India",
    period: "July 2023 — Dec 2023",
    type: "Industrial Internship",
    impactMetrics: [
      { value: "+18%", label: "Line Throughput" },
      { value: "-32%", label: "WIP Inventory" },
      { value: "-60%", label: "Defect Rate" }
    ],
    deliverables: [
      "Conducted detailed time-and-motion studies and Value Stream Mapping across 5 manufacturing assembly workstations.",
      "Re-balanced workstation allocations against line takt time, resolving severe bottlenecking at Station 3 to boost throughput by +18%.",
      "Audited factory warehouse stock locations and instituted visual 5S staging, cutting operator material search times by 40%.",
      "Analyzed component procurement lead times and supported vendor delivery tracking to safeguard assembly continuity.",
      "Documented preventive maintenance routines and quality inspection checkpoints to stabilize line performance."
    ],
    skills: ["Production Planning", "Inventory Management", "Quality Control", "Warehouse Exposure", "Process Mapping", "Kaizen"]
  }
];

export const educationTimeline: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Master in Management (Grande École Program)",
    institution: "NEOMA Business School",
    location: "Rouen, France",
    period: "2026 — Present",
    focus: "Specialization in Supply Chain, Operations & Corporate Strategy",
    description: "Rigorous European management curriculum emphasizing global supply chain logistics, operations strategy, financial management, advanced analytics, and strategic case resolution.",
    highlights: [
      "Coursework: Supply Chain Analytics, Strategic Sourcing, Operations Management, Corporate Finance, Business Strategy",
      "Actively training in structured case interview methodology, market sizing, and operational diagnostics",
      "Bilingual study environment in France; member of business analytics & strategy clubs"
    ]
  },
  {
    id: "edu-2",
    degree: "Bachelor of Technology in Mechanical Engineering",
    institution: "Graphic Era Hill University",
    location: "Dehradun, India",
    period: "2021 — 2025",
    focus: "Quantitative Engineering, Production Systems & Optimization",
    description: "Deep mathematical and technical training in physical systems design, thermodynamic cycles, production engineering, materials science, and numerical modeling.",
    highlights: [
      "Graduated with comprehensive coursework in Operations Research, Industrial Engineering, and CAD/CAM Modeling",
      "Led technical project teams designing mechanical prototypes with tight tolerance and cost constraints",
      "Active participant in collegiate engineering symposiums and technical operations committees"
    ]
  }
];
