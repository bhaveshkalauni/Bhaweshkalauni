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
  availability: "Open to Supply Chain, Operations & Strategy Roles (2026 / 2027)",
  headline: "Supply Chain · Operations · Logistics · Procurement · Supply Chain Analytics",
  summary: "Master in Management candidate at NEOMA Business School with a Mechanical Engineering background. Documenting my work in multi-echelon inventory modeling, process optimization, supply chain analytics, and operations strategy.",
  positioning: "Connecting engineering analytical rigor with strategic business insights to explore and build agile, data-backed supply chain systems.",
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
    summary: "Built a strong quantitative and analytical foundation in physical systems, thermodynamics, manufacturing mechanics, and applied mathematics. Developed structured problem-solving habits focused on root-cause analysis and system constraints.",
    takeaways: [
      "Systems thinking and mathematical optimization models",
      "Production workflows, mechanical tolerances, and quality fundamentals",
      "Engineering modeling, CAD systems, and structured failure analysis"
    ]
  },
  {
    phase: "02",
    title: "MANAGEMENT & STRATEGY",
    institution: "NEOMA Business School (Grande École) · Rouen, France",
    period: "2026 — Present",
    summary: "Expanding into business strategy, corporate finance, and structured problem-solving frameworks. Exploring global trade dynamics, operational management, and organizational decision economics in a European context.",
    takeaways: [
      "Corporate strategy, market dynamics, and financial analysis",
      "Executive communication and international cross-functional collaboration",
      "Structured business case resolution and quantitative decision trees"
    ]
  },
  {
    phase: "03",
    title: "SUPPLY CHAIN & OPERATIONS",
    institution: "Core Focus & Professional Growth",
    period: "Ongoing Specialization",
    summary: "The natural convergence of engineering discipline and management strategy. Focused on understanding end-to-end supply networks, modeling inventory under uncertainty, and applying data analytics to operational challenges.",
    takeaways: [
      "Multi-echelon inventory planning & safety stock modeling",
      "Procurement analytics, supplier evaluation, and logistics flow",
      "Data visualization & modeling using Power BI, SQL, and Advanced Excel"
    ]
  }
];

// Work / Projects data
export const caseStudies: CaseStudyItem[] = [
  {
    id: "france-india-trade-forecast",
    index: "01",
    title: "France–India Import Forecast",
    category: "Supply Chain Analytics",
    timeline: "Sep 2026",
    role: "Solo · Case study",
    heroMetric: {
      value: "HS2",
      label: "Soft goods · FR imports from IN · seasonal-naive + trend",
    },
    summary:
      "Case study forecasting France–India soft-goods customs flows (HS 52/61/62/63/64) with a rolling-origin backtest, per-horizon confidence bands, and planner alerts tied to each chapter’s own volatility.",
    problem:
      "Inbound France–India soft-goods swings are hard to see early, so sourcing and inventory issues surface only after customs flows have already moved.",
    objective:
      "Show which HS2 chapters need attention in the next 3 months, with a method that can be defended: seasonal-naive + trend, validated against baselines, not a live API gadget.",
    context:
      "Portfolio project at /projects/france-india-trade-forecast. Eurostat Comext snapshot (French Douanes via EU publication), HS2 only for v1. HS 64 is footwear — the basket is soft goods, not textiles.",
    approach: [
      "Pulled Comext DS-045409 (FR←IN imports, monthly from 2011) and baked a static extract — no production CORS proxy.",
      "Forecast: F(t) = A(t−12) × (1 + trailing-12 YoY). Rejected Holt-Winters because smoothing parameters are hard to defend.",
      "Rolling-origin backtest vs seasonal-naive and last-month naive; report MAPE and MdAPE.",
      "Confidence bands from per-horizon residual σ (not √h random-walk scaling).",
      "Alerts from each chapter’s own residual z-score (High |z|>2, Medium 1.5–2).",
      "Wrote the page as a two-tier case study: five-line summary, then charts, then methodology notes.",
    ],
    analysis: [
      "Judge months against a seasonal baseline + trend, not the prior month alone.",
      "Percentage errors, per category — pooled euro residuals mix cotton yarn with woven apparel.",
      "Annualised CV = (STDEV.S / AVERAGE) × √12.",
      "HS2 only; HS4 drill-down is a documented next step, not a hidden toggle.",
    ],
    keyFindings: [
      "Numbers on the project page are computed from the baked extract — open the case study for MAPE vs baselines and the flagged chapter.",
      "A textiles-only Eurostat table will not match these totals because HS 64 (footwear) is in the basket.",
      "Nov 2023 Red Sea / Cape routing is used as an out-of-sample stress window in the notes.",
    ],
    recommendations: [
      "Below own residual band: confirm supplier shipments; add a short safety buffer.",
      "Above band: shift receiving capacity and pre-book dock slots.",
      "Medium z (1.5–2): watch the next two arrivals before changing safety stock.",
      "Inside corridor: keep standard replenishment cadence.",
    ],
    toolsUsed: ["Eurostat Comext", "Excel", "Power BI (Desktop model)", "React", "TypeScript"],
    tags: [
      "France–India",
      "Trade forecast",
      "Eurostat",
      "Soft goods",
      "HS codes",
      "Supply chain analytics",
    ],
    href: "/projects/france-india-trade-forecast",
  },
];

export const expertiseAreas: ExpertiseCategory[] = [
  {
    id: "exp-supply-chain",
    category: "SUPPLY CHAIN",
    subtitle: "Core Domain & Logistics Concepts",
    items: [
      { name: "Demand Planning & S&OP", detail: "Statistical baselines, demand consensus, and seasonality modeling." },
      { name: "Inventory Optimization", detail: "Safety stock calculation, EOQ, reorder points, and ABC-XYZ segmentation." },
      { name: "Procurement & Sourcing", detail: "Kraljic matrix analysis, TCO modeling, supplier SLAs, and vendor workflows." },
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
      { name: "Cross-Functional Collaboration", detail: "Connecting technical engineering concepts with business decision-making." }
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
      "Orchestrated partner onboarding workflows, scaling the supplier network from 15 to 50+ active digital vendors.",
      "Designed and deployed operational Power BI dashboards tracking pipeline throughput, identifying stage bottlenecks, and monitoring SLAs.",
      "Engineered automated validation routines for supplier catalog data, cutting manual reconciliation time by 14 hours per week.",
      "Led weekly cross-functional synchronization meetings with engineering and partner management to resolve integration blockers.",
      "Documented standard operating procedures (SOPs) that decreased overall onboarding lead time by 30%."
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
      "Conducted time-and-motion studies and Value Stream Mapping across 5 manufacturing assembly workstations.",
      "Re-balanced workstation allocations against line takt time, resolving bottlenecking at Station 3 to boost throughput by +18%.",
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
    description: "European management curriculum emphasizing global supply chain logistics, operations strategy, financial management, advanced analytics, and strategic case resolution.",
    highlights: [
      "Coursework: Supply Chain Analytics, Strategic Sourcing, Operations Management, Corporate Finance, Business Strategy",
      "Trained in structured case interview methodology, market sizing, and operational diagnostics",
      "Bilingual study environment in France; active member of business analytics & strategy initiatives"
    ]
  },
  {
    id: "edu-2",
    degree: "Bachelor of Technology in Mechanical Engineering",
    institution: "Graphic Era Hill University",
    location: "Dehradun, India",
    period: "2021 — 2025",
    focus: "Quantitative Engineering, Production Systems & Optimization",
    description: "Rigorous technical training in physical systems design, thermodynamic cycles, production engineering, materials science, and numerical modeling.",
    highlights: [
      "Coursework in Operations Research, Industrial Engineering, Quality Engineering, and CAD/CAM Modeling",
      "Led technical student project teams designing mechanical prototypes under tight constraints",
      "Active participant in collegiate engineering symposiums and technical operations committees"
    ]
  }
];
