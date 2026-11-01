export interface ProjectItem {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  category: "Fintech & Security" | "Cloud & TV" | "Mobile & Apps" | "Full-Stack Web" | "AI & Computer Vision";
  description: string;
  architectureHighlight: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  playStoreUrl?: string;
  featured: boolean;
  priority: number;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  badge: string;
  credentialId?: string;
}

export interface ProfileConfig {
  name: string;
  username: string;
  avatarUrl: string;
  role: string;
  headline: string;
  location: string;
  education: string;
  college: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  linkedinUrl: string;
  leetcodeUrl: string;
  whatsappUrl: string;
  theme: string;
  typingLines: string[];
  showAvatar: boolean;
  showTrophies: boolean;
  showStreak: boolean;
  showTopLangs: boolean;
  showViewsCounter: boolean;
  showSocialBadges: boolean;
  showProjectsTable: boolean;
  showCertifications: boolean;
}

export const initialProfileConfig: ProfileConfig = {
  name: "Bapan Ghosh",
  username: "bapanghosh0812",
  avatarUrl: "https://bapanghosh.netlify.app/images/bapan1.jpeg",
  role: "Software Development Engineer · Full-Stack & Systems Builder",
  headline: "Building production software with clean architecture, offline-first cryptographic resilience & living room TV engineering",
  location: "Bankura, West Bengal, India",
  education: "B.Tech in Information Technology (Batch 2027)",
  college: "Bengal College of Engineering and Technology (BCET), Durgapur",
  email: "bapanghosh081204@gmail.com",
  phone: "+91 98832 90273",
  portfolioUrl: "https://bapanghosh.netlify.app/",
  linkedinUrl: "https://www.linkedin.com/in/bapan-ghosh-5676803a2/",
  leetcodeUrl: "https://leetcode.com/u/BAPAN_GHOSH_07/",
  whatsappUrl: "https://wa.me/919883290273",
  theme: "radical",
  typingLines: [
    "Software Development Engineer & Systems Builder",
    "Creator of Rescuen (Live on Google Play Store 🚀)",
    "Architect of Fortress UPI — Dual Offline & Online Trustless",
    "Building Storyloom on Amazon Fire TV (AWS Multi-Agent)",
    "Full-Stack Web (React, Next.js, Node.js, TypeScript)",
    "Disciplined CS Foundations · Batch 2027"
  ],
  showAvatar: true,
  showTrophies: true,
  showStreak: true,
  showTopLangs: true,
  showViewsCounter: true,
  showSocialBadges: true,
  showProjectsTable: true,
  showCertifications: true,
};

export const projectsList: ProjectItem[] = [
  {
    id: "fortress-upi",
    title: "Fortress UPI — Dual Offline & Online Trustless Payment Protocol",
    shortTitle: "Fortress UPI (Offline & Online)",
    badge: "Hardware-Rooted Fintech",
    category: "Fintech & Security",
    description: "An offline-resilient UPI payment engine built on hardware-rooted trust. Employs Android StrongBox/TEE & iOS Secure Enclave for cryptographic attestation, pre-funded single-use keys (`setMaxUsageCount(1)`), and peer-to-peer ledger settlement via BLE and NFC with zero internet connectivity. Delivers p99 latency < 15ms.",
    architectureHighlight: "Hardware-backed asymmetric keys, BLE/NFC protocol, StrongBox attestation, Go microservices.",
    tech: ["Kotlin", "Android StrongBox", "Go", "BLE / NFC", "Hardware Crypto", "TEE", "Docker"],
    githubUrl: "https://github.com/bapanghosh0812/FORTRESS-UPI",
    featured: true,
    priority: 1,
  },
  {
    id: "firetv-amazon",
    title: "Storyloom — Interactive Co-Creation Suite for Amazon Fire TV",
    shortTitle: "Storyloom on Amazon Fire TV",
    badge: "AWS & Living Room TV",
    category: "Cloud & TV",
    description: "Multi-modal interactive television application developed for Amazon Fire TV using React Native for TV. Integrates Amazon Bedrock AgentCore, multi-agent pipelines (Strands), Amazon Nova generative intelligence, and AWS Polly real-time speech synthesis for collaborative family storytelling.",
    architectureHighlight: "React Native for TV, Amazon Bedrock AgentCore, Amazon Nova, Stability AI on AWS, AWS Polly.",
    tech: ["TypeScript", "React Native for TV", "Amazon Bedrock", "AWS Polly", "Amazon Nova", "Multi-Agent AI"],
    githubUrl: "https://github.com/bapanghosh0812/Fire-TV-Amazon",
    featured: true,
    priority: 2,
  },
  {
    id: "rescuen",
    title: "Rescuen — Real-Time Emergency SOS & Crisis Response App",
    shortTitle: "Rescuen (Google Play Store)",
    badge: "Live on Play Store 🚀",
    category: "Mobile & Apps",
    description: "Production mission-critical Android app published on Google Play. Features sub-second panic triggers, background GPS telemetry, automated responder dispatch, and offline emergency contact queuing.",
    architectureHighlight: "Flutter architecture, Firebase Cloud Functions, Realtime Geolocation, Google Maps SDK.",
    tech: ["Flutter", "Dart", "Firebase", "Android SDK", "Google Cloud", "Google Maps Platform"],
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.officialrescuen.app",
    githubUrl: "https://github.com/bapanghosh0812/RESCUEN",
    liveUrl: "https://rescuen-web.netlify.app/",
    featured: true,
    priority: 3,
  },
  {
    id: "cutslot",
    title: "CutSlot / Salon Partner — On-Demand Booking & Slot Allocation Engine",
    shortTitle: "CutSlot (Salon Partner)",
    badge: "Cross-Platform Mobile",
    category: "Mobile & Apps",
    description: "Complete scheduling and salon marketplace platform with real-time chair availability, dynamic slot allocation, multi-branch service catalog, and customer appointment management.",
    architectureHighlight: "Cross-platform mobile client with reactive state management and REST backend integration.",
    tech: ["Flutter", "Dart", "REST APIs", "State Management", "Material Design 3"],
    githubUrl: "https://github.com/bapanghosh0812/cutslot",
    featured: true,
    priority: 4,
  },
  {
    id: "college-campus",
    title: "College Campus — Academic Social Network & Collaboration Hub",
    shortTitle: "College Campus Network",
    badge: "Full-Stack Web",
    category: "Full-Stack Web",
    description: "Scalable university community network enabling verified students to publish technical articles, coordinate hackathon squads, share study materials, and engage in campus discourse.",
    architectureHighlight: "MERN architecture with role-based JWT authentication, rate limiting, and responsive design.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "JWT Auth", "Tailwind CSS"],
    liveUrl: "https://the-college-campus.netlify.app/",
    githubUrl: "https://github.com/bapanghosh0812/Social-App",
    featured: true,
    priority: 5,
  },
  {
    id: "wearsuper",
    title: "WEARSUPER — High-Performance E-Commerce Apparel Platform",
    shortTitle: "WEARSUPER Store",
    badge: "E-Commerce",
    category: "Full-Stack Web",
    description: "Fluid, high-conversion modern e-commerce storefront featuring dynamic catalog filtering, atomic cart state synchronization, smooth transition animations, and fast mobile checkout UX.",
    architectureHighlight: "React component architecture, optimized asset pipeline, modular UI state.",
    tech: ["React.js", "Tailwind CSS", "JavaScript", "Context API", "Responsive UX"],
    liveUrl: "https://official-wearsuper-cloth-store.netlify.app/",
    githubUrl: "https://github.com/bapanghosh0812/cloth",
    featured: true,
    priority: 6,
  },
  {
    id: "mini-chatgpt",
    title: "Multi-Agent AI Assistant — Context-Aware Research & Summarization",
    shortTitle: "Multi-Agent Research Assistant",
    badge: "LLM Agents & NLP",
    category: "AI & Computer Vision",
    description: "Autonomous multi-agent research pipeline chaining specialized agent workers for deep query analysis, context synthesis, factual citation extraction, and downloadable briefing generation.",
    architectureHighlight: "Chained agent architecture, LangChain tool execution, structured output validation.",
    tech: ["Python", "LangChain", "OpenAI / Hugging Face", "Streamlit", "Flask"],
    githubUrl: "https://github.com/bapanghosh0812/Chatbot-or-mini-Chatgpt",
    featured: true,
    priority: 7,
  },
  {
    id: "face-mask",
    title: "Edge Vision Face Mask Detection Pipeline",
    shortTitle: "Edge Vision Face Mask Detection",
    badge: "Computer Vision",
    category: "AI & Computer Vision",
    description: "Real-time edge computer vision inference model trained with Convolutional Neural Networks (CNNs) for high-accuracy face mask compliance classification on camera streams.",
    architectureHighlight: "Custom CNN architecture, image preprocessing pipeline, OpenCV video capture loop.",
    tech: ["Python", "OpenCV", "TensorFlow", "Keras", "NumPy", "CNN"],
    githubUrl: "https://github.com/bapanghosh0812/Face_mask_detection",
    featured: true,
    priority: 8,
  },
  {
    id: "colorcraft",
    title: "ColorCraft — Interactive AI Canvas & Vector Book Studio",
    shortTitle: "ColorCraft Studio",
    badge: "Interactive Canvas",
    category: "Full-Stack Web",
    description: "Web-based creative canvas suite allowing children to customize AI-generated coloring templates with responsive vector filling, digital paint brushes, and multi-format export.",
    architectureHighlight: "HTML5 Canvas raster/vector rendering engine, touch & stylus event normalization.",
    tech: ["React.js", "HTML5 Canvas API", "Tailwind CSS", "Web APIs"],
    liveUrl: "https://children-s-coloring-book-generator.netlify.app/",
    githubUrl: "https://github.com/bapanghosh0812/Children-s-Coloring-Book-Generator",
    featured: false,
    priority: 9,
  },
  {
    id: "ghoshkart",
    title: "GhoshKart — Lightweight E-Commerce Platform",
    shortTitle: "GhoshKart Web Store",
    badge: "Web Store",
    category: "Full-Stack Web",
    description: "Full-featured online store engine with instant catalog search, responsive product grids, dynamic pricing tables, and shopping basket workflows.",
    architectureHighlight: "Semantic HTML5 layout, vanilla JavaScript state store, CSS Grid architecture.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    liveUrl: "https://e-commerce-site-by-bapanghosh.netlify.app/",
    githubUrl: "https://github.com/bapanghosh0812/E-commerce-Site",
    featured: false,
    priority: 10,
  }
];

export const certificationsList: CertificationItem[] = [
  {
    id: "oci-genai",
    title: "OCI Generative AI Professional Certification",
    issuer: "Oracle Cloud Infrastructure (OCI)",
    date: "2024",
    badge: "Cloud AI Specialist",
    credentialId: "Oracle Certified Professional",
  },
  {
    id: "az-900",
    title: "Microsoft Certified: Azure Fundamentals (AZ-900)",
    issuer: "Microsoft",
    date: "2024",
    badge: "Cloud Infrastructure",
    credentialId: "AZ-900 Certified",
  },
  {
    id: "ibm-ai",
    title: "AI Fundamentals & Applied Capstone Credential",
    issuer: "IBM",
    date: "2024",
    badge: "Enterprise AI Foundations",
  },
  {
    id: "kaggle-agents",
    title: "5-Day AI Agents Intensive Program Graduate",
    issuer: "Kaggle & Google",
    date: "2024",
    badge: "Autonomous Agents",
  },
  {
    id: "agentic-ai",
    title: "Agentic AI Certified Foundations Associate",
    issuer: "CertiProf / Industry Standards",
    date: "2024",
    badge: "AI Systems Engineering",
  },
  {
    id: "kaggle-badges",
    title: "Kaggle Python Coder & Dataset Creator Accreditations",
    issuer: "Kaggle",
    date: "2024",
    badge: "Applied Data Science",
  },
  {
    id: "datasculpt-sttp",
    title: "DataSculpt STTP: Applied ML & Modern Data Science",
    issuer: "BCET Durgapur (Dept. of IT & CSE)",
    date: "Mar 2024",
    badge: "Specialized Training",
  },
  {
    id: "dsa-c",
    title: "Advanced Data Structures & Algorithmic Analysis (C)",
    issuer: "PVG COE, Nashik",
    date: "Dec 2024",
    badge: "Core CS & Algorithms",
    credentialId: "CPIZG8-CE034206",
  }
];

export const themesAvailable = [
  { id: "radical", name: "Radical (Electric Neon)", bg: "#0d1117", title: "#38bdf8", accent: "#f43f5e" },
  { id: "tokyonight", name: "Tokyo Night (Cyber Navy)", bg: "#1a1b26", title: "#70a5fd", accent: "#bf91f3" },
  { id: "dracula", name: "Dracula (Vibrant Purple)", bg: "#282a36", title: "#ff79c6", accent: "#50fa7b" },
  { id: "github_dark", name: "GitHub Dark (Monochrome)", bg: "#0d1117", title: "#58a6ff", accent: "#238636" },
  { id: "gruvbox", name: "Gruvbox (Earthy Amber)", bg: "#282828", title: "#fabd2f", accent: "#fe8019" },
  { id: "onedark", name: "One Dark (Modern Editor)", bg: "#282c34", title: "#e06c75", accent: "#98c379" },
];
