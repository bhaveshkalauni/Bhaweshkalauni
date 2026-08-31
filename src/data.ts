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
    timeline: "Aug 2026",
    role: "Solo · Portfolio prototype",
    heroMetric: {
      value: "€992m",
      label: "12-month FR apparel/textile imports from India",
    },
    summary:
      "Live TradeFlow dashboard forecasting France–India apparel and textile customs flows with seasonal projections, volatility risk, and planner alerts from Eurostat Comext.",
    problem:
      "Inbound France–India apparel and textile swings are hard to see early, so sourcing and inventory issues surface only after customs flows have already moved.",
    objective:
      "Surface live customs value and volume, a 3-month seasonal forecast, and ranked exceptions so planners can act before disruptions hit operations.",
    context:
      "First supply-chain portfolio project, embedded at /projects/france-india-trade-forecast. Uses free Eurostat Comext (French Douanes via EU publication), HS apparel/textiles coverage, no login or paid APIs.",
    approach: [
      "Built TradeFlow UI with KPIs, main chart, alerts, exception table, and methodology.",
      "Wired live Eurostat Comext extracts for France–India HS2/HS4 value and quantity.",
      "Cached the Comext extract (~24h) with fail-over to stale cache — never invent demo numbers.",
      "Applied seasonal-naive + trend 3-month forecast with a widening confidence band.",
      "Derived category variance, unit-value YoY, and volatility into ranked planner alerts.",
      "Added CSV insight-report export of the visible series and KPIs.",
    ],
    analysis: [
      "Separate volume vs unit-value drivers to distinguish shipment shortfalls from landed-cost pressure.",
      "Judge months against a seasonal baseline + trend, not the prior month alone.",
      "Annualised volatility flags lumpy, hard-to-plan HS lines.",
      "HS2 vs HS4 views support chapter overview and line-level detail.",
      "Dual flow support: France imports from India (default) and France exports to India.",
    ],
    keyFindings: [
      "Default apparel/textiles view: ~€992m rolling 12-month import value and ~82.8k t volume (as of Jun 2026 Comext).",
      "Next-quarter seasonal forecast around €233m for Jul–Sep 2026 on the default view.",
      "Leather (HS 42) is a live series in Comext — not an empty placeholder.",
      "Alerts are computed from live variance, unit-value, and volatility — not hardcoded copy.",
    ],
    recommendations: [
      "Below seasonal volume band: confirm supplier shipments; add a short safety buffer.",
      "Rising unit value: reprice landed cost; check freight, fibre, and FX.",
      "Peak arriving early: shift receiving capacity and pre-book dock slots.",
      "High volatility / lumpy lines: consolidate shipments to cut noise and unit freight.",
      "Inside corridor: monitor and keep standard replenishment cadence.",
    ],
    toolsUsed: ["React", "TypeScript", "TanStack Query", "Eurostat Comext", "Recharts", "Tailwind CSS"],
    tags: [
      "France–India",
      "Trade forecast",
      "Eurostat",
      "Apparel",
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
