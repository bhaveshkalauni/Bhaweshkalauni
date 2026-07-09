import { 
  EducationItem, 
  ExperienceItem, 
  SkillCategory, 
  ProjectItem, 
  AchievementItem, 
  CareerInterestItem 
} from "./types";

export const personalInfo = {
  name: "Bhavesh Kalauni",
  title: "Future Strategy Consultant",
  role: "Master in Management Student",
  institution: "NEOMA Business School",
  location: "Rouen, France",
  headline: "Future Strategy Consultant | Supply Chain & Operations Enthusiast | Data-Driven Problem Solver",
  introduction: "An analytical Mechanical Engineer transitioning into the business landscape through NEOMA's elite Master in Management program. Passionate about operations, supply chain coordination, process optimization, and corporate strategy. Driven by a core philosophy of continuous learning and data-driven problem solving, I aspire to deliver high-impact results in elite MBB and Big 4 management consulting firms.",
  aboutDetailed: {
    story: "With a rigorous technical foundation in Mechanical Engineering, I cultivated a deep interest in how physical systems are built, optimized, and managed. Recognizing that the most critical challenges in modern enterprises lie at the intersection of engineering excellence and strategic business alignment, I transitioned into business by enrolling in the prestigious Master in Management program at NEOMA Business School in France.",
    passions: [
      "Process Optimization: Finding and removing operational friction in workflows, leveraging lean principles to drive efficiency.",
      "Data-Driven Analytics: Translating raw supply chain and operational data into strategic dashboards and actionable corporate insights.",
      "Strategic Foresight: Evaluating complex business challenges, sizing markets, and building structured resolution frameworks.",
      "Collaborative Synergy: Aligning engineering capabilities with financial and operational objectives across global supply chains."
    ],
    aspiration: "Currently preparing for case interviews and building advanced capabilities in operational analytics. I am actively seeking consulting, strategy, and operations internships to assist global organizations in solving their most pressing workflow and digital transformation challenges."
  },
  contact: {
    email: "bhaveshkalauni12@gmail.com",
    linkedin: "https://linkedin.com/in/bhaveshkalauni", // Professional placeholder
    github: "https://github.com/bhaveshkalauni",       // Professional placeholder
    location: "Rouen, France"
  }
};

export const educationTimeline: EducationItem[] = [
  {
    id: "edu-1",
    degree: "Master in Management (Grande École Program)",
    institution: "NEOMA Business School",
    location: "Rouen, France",
    period: "2026 – Present",
    logoText: "NBS",
    description: "Specializing in Strategy, Operations, and Supply Chain Management. Engaging in corporate business strategy, financial management, advanced analytics, and case study resolution."
  },
  {
    id: "edu-2",
    degree: "Bachelor of Technology in Mechanical Engineering",
    institution: "Graphic Era Hill University",
    location: "Dehradun, India",
    period: "2021 – 2025",
    logoText: "GEU",
    description: "Rigorous quantitative foundation covering systems design, thermo-fluids, engineering mathematics, production planning, and optimization algorithms. Active member of operations and technical societies."
  }
];

export const professionalExperience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Operations Lead",
    company: "TechnoGiants Digisolutions",
    location: "Remote / Hybrid",
    period: "June 2024 – Present",
    logoText: "TGD",
    description: [
      "Streamlined vendor onboarding workflows, expanding the digital retailer ecosystem to improve platform supply elasticity.",
      "Coordinated cross-functional teams across engineering, business development, and support to accelerate partner integration.",
      "Built dynamic operational dashboards in Microsoft Power BI and Excel, providing real-time visibility into onboarding bottlenecks.",
      "Analyzed logistical and transaction costs, facilitating key process changes that decreased vendor integration cycles.",
      "Monitored supplier catalog accuracy and scheduled content updates to ensure optimal production and supply chain continuity."
    ],
    skills: ["Supply Chain Coordination", "Vendor Onboarding", "Power BI", "Excel", "Process Improvement", "Operational Analytics"]
  },
  {
    id: "exp-2",
    role: "Engineering Intern",
    company: "Windlass Engineers Ltd.",
    location: "Dehradun, India",
    period: "July 2023 – Dec 2023",
    logoText: "WEL",
    description: [
      "Assisted in production planning and quality control across industrial manufacturing assembly lines, reducing defect rates.",
      "Analyzed procurement workflows for key materials, improving lead-time visibility and inventory tracking.",
      "Gained hands-on warehouse exposure, studying spatial stock layouts to implement optimal inventory organization models.",
      "Participated in continuous improvement (Kaizen) studies, mapping out process bottle-necks on the factory floor.",
      "Collaborated with senior plant managers to document equipment maintenance routines, enhancing assembly line uptime."
    ],
    skills: ["Production Planning", "Inventory Management", "Quality Control", "Warehouse Exposure", "Process Mapping", "Procurement"]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Business & Strategy",
    skills: [
      { name: "Strategy Consulting", level: "Expert" },
      { name: "Problem Solving", level: "Expert" },
      { name: "Market Sizing & Frameworks", level: "Advanced" },
      { name: "Business Case Analysis", level: "Advanced" },
      { name: "Continuous Improvement (Kaizen)", level: "Advanced" },
      { name: "Digital Transformation", level: "Intermediate" }
    ]
  },
  {
    title: "Supply Chain & Operations",
    skills: [
      { name: "Supply Chain Coordination", level: "Advanced" },
      { name: "Operations Excellence", level: "Advanced" },
      { name: "Vendor Management", level: "Expert" },
      { name: "Workflow Design & Optimization", level: "Advanced" },
      { name: "Process Mapping", level: "Advanced" },
      { name: "Inventory Monitoring", level: "Advanced" }
    ]
  },
  {
    title: "Analytics & Technical",
    skills: [
      { name: "Microsoft Power BI", level: "Expert" },
      { name: "Advanced Excel (VBA, PowerQuery)", level: "Expert" },
      { name: "Data Analysis & Visualisation", level: "Advanced" },
      { name: "Engineering Analysis", level: "Advanced" },
      { name: "SQL (Database Querying)", level: "Intermediate" },
      { name: "Operational Dashboards", level: "Expert" }
    ]
  },
  {
    title: "Languages & Soft Skills",
    skills: [
      { name: "English", level: "Professional Bilingual" },
      { name: "Hindi", level: "Native / Bilingual" },
      { name: "French", level: "Elementary (A2 Level)" },
      { name: "Cross-Functional Collaboration", level: "Expert" },
      { name: "Executive Communication", level: "Advanced" },
      { name: "Stakeholder Management", level: "Advanced" }
    ]
  }
];

export const featuredProjects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Nutritional Density Platform",
    category: "Operations & Digital Branding",
    description: "A content platform focused on nutritional education, functional dietary research, audience growth, and modern health branding. Applying supply chain metrics to health optimization and public awareness campaigns.",
    highlights: [
      "Designed and launched digital branding collateral, scaling targeted audience reach organically.",
      "Created structured knowledge frameworks compiling food density analytics and macro-nutrient metrics.",
      "Optimized digital asset workflows, reducing production time for rich informational graphics by 25%."
    ],
    tech: ["Digital Branding", "Content Operations", "Information Architecture", "Data Management"]
  },
  {
    id: "proj-2",
    title: "Consulting Case & Framework Mastery",
    category: "Management Consulting",
    description: "A collection of structured business case interview resolutions and industry analyses, covering market entry strategies, profitability diagnostics, mergers & acquisitions, and operations optimization.",
    highlights: [
      "Formulated comprehensive MECE issue trees for case study diagnostics in logistics, consumer goods, and energy.",
      "Solved 40+ consulting cases with structured partners, analyzing competitive environments, cost drivers, and value chains.",
      "Synthesized business findings into crisp executive summaries with data-backed operational improvement steps."
    ],
    tech: ["MECE Frameworks", "Market Sizing", "Profitability Diagnostics", "Executive Presentation"]
  }
];

export const achievements: AchievementItem[] = [
  {
    id: "ach-1",
    value: "50+",
    label: "Retailers Onboarded",
    description: "Rapidly scaled partner ecosystem by improving vendor pipeline communications and onboarding automation."
  },
  {
    id: "ach-2",
    value: "30%",
    label: "Reduced Integration Time",
    description: "Optimized operational coordination and process handoffs between engineering and retail partners."
  },
  {
    id: "ach-3",
    value: "95%",
    label: "Supplier Satisfaction",
    description: "Maintained strong collaborative relationships through structured communication and SLAs."
  },
  {
    id: "ach-4",
    value: "12%",
    label: "Operational Cost Reduction",
    description: "Analyzed material procurement workflows to locate hidden cost drains and minimize inventory waste."
  }
];

export const careerInterests: CareerInterestItem[] = [
  {
    id: "interest-1",
    title: "Strategy Consulting",
    description: "Solving high-stakes board-level problems. Creating structured MECE frameworks to diagnose profitability, size markets, and optimize business models for Fortune 500 clients.",
    iconName: "Compass"
  },
  {
    id: "interest-2",
    title: "Supply Chain Management",
    description: "Designing resilient supply networks. Leveraging predictive demand planning, advanced routing, and vendor onboarding processes to maximize delivery speed and minimize costs.",
    iconName: "GitMerge"
  },
  {
    id: "interest-3",
    title: "Operations Excellence",
    description: "Driving organizational efficiency. Implementing Lean, Six Sigma, and Kaizen methodologies to remove waste, map process limits, and boost manufacturing/service line throughput.",
    iconName: "TrendingUp"
  },
  {
    id: "interest-4",
    title: "Business Analytics",
    description: "Translating data into strategy. Utilizing Power BI, advanced SQL, and data modeling to construct interactive executive dashboards that uncover hidden operational bottlenecks.",
    iconName: "BarChart3"
  },
  {
    id: "interest-5",
    title: "Digital Transformation",
    description: "Integrating modern software into legacy enterprises. Overhauling analog workflows with cloud integrations, automation scripts, and digital vendor platforms.",
    iconName: "Cpu"
  },
  {
    id: "interest-6",
    title: "Process Optimization",
    description: "Simplifying complex operations. Conducting time-and-motion studies, identifying supply chain friction points, and standardizing operational handoffs.",
    iconName: "Workflow"
  }
];
