export const personalInfo = {
  name: "Ashutosh Bansal",
  role: "full-stack & blockchain developer",
  subtitle: "Building systems at the intersection of Web3, AI, and great UX.",
  bio: "I am a Mathematics & Computing undergraduate at IIT Roorkee. Since 2022, I have been building real products, passionate about cryptographic systems, DeFi protocols, and elegant frontends. I love turning complex ideas into polished, production-ready experiences.",
  email: "ashutosh_b@ma.iitr.ac.in",
  linkedin: "https://www.linkedin.com/in/ashutosh-bansal-580974316",
  github: "https://github.com/ashutoshbansal",
};

export const stats = [
  { label: "10+ Client Projects", key: "projects" },
  { label: "3 Years Building", key: "years" },
];

export const experience = [
  {
    role: "Developer",
    company: "STAMPED",
    period: "Jan 2026 – Present",
    bullets: [
      "Built a system to verify image authenticity using device attestation, secure capture, and cryptographic proofs.",
      "Addresses untrusted visual data in logistics, inspections, and compliance by converting images into verifiable operational evidence."
    ]
  },
  {
    role: "Developer",
    company: "Strato Inc",
    period: "Mar 2024 – Present",
    bullets: [
      "Built Strato AI, a multi-LLM chat playground with end-to-end encryption, real-time streaming via WebSockets, and Redis for response caching and rate limiting; backend powered by Go.",
      "Created Othello with local and online multiplayer, plus a yet-to-be-beaten AI mode trained using PyTorch.",
      "Shipped additional apps including Strato Meet (video conferencing), Quizzer (quiz platform), and Strato Expenses (expense tracker), leveraging modern full-stack stacks and CI/CD."
    ]
  },
  {
    role: "Freelancer",
    company: "Independent",
    period: "Sep 2022 – Present",
    bullets: [
      "Delivered 10+ full-stack web and mobile projects for global clients across platforms like Fiverr and Freelancer.",
      "Specialized in building portfolios, ERP systems, and management systems using React, Next.js, and Flutter including DeFi dashboard, wallet integration, and smart contracts.",
      "Maintained high client satisfaction with timely delivery, clean code, and scalable architecture."
    ]
  }
];

export const projects = [
  {
    name: "SwapPool",
    year: "2026",
    tags: ["Solidity", "Hardhat"],
    category: "DeFi",
    description: "A minimal AMM-based DEX implementing constant product formula for ERC-20 token pairs, with liquidity provision, proportional fee distribution to liquidity providers, and slippage protection.",
  },
  {
    name: "Trade3Hub",
    year: "2026",
    tags: ["Solidity", "React", "MetaMask"],
    category: "Blockchain",
    description: "A decentralized peer-to-peer marketplace contract supporting ERC-20 token listings, escrow-based settlements, and dispute timeouts; frontend in React with MetaMask integration.",
  },
  {
    name: "Chrono",
    year: "2025",
    tags: ["Flow", "DeFi"],
    category: "DeFi",
    description: "Designed a time-based DeFi lending protocol inspired by Euler and built natively on Flow.",
  },
  {
    name: "FractaOwn",
    year: "2025",
    tags: ["BSC", "Solidity"],
    category: "Web3",
    description: "Fractional ownership protocol where a single RWA-backed token can be collectively held by multiple wallets with proportional share tracking.",
  },
  {
    name: "AI Nexus",
    year: "2025",
    tags: ["Flask", "LangChain", "React", "SRC20"],
    category: "AI/Web3",
    description: "A Web3-based platform for listing and using AI agents (code reviewers, domain experts), built with Flask, LangChain, React, and custom SRC20 tokens.",
  },
  {
    name: "Astrikos Modeling",
    year: "2025",
    tags: ["React", "Three.js", "Mapbox", "D3.js"],
    category: "Frontend",
    description: "A 3D infrastructure visualization tool using React + TypeScript, Three.js, Mapbox, and D3.js, Unity WebGL, backed by Node.js and Firebase for real-time urban planning.",
  },
  {
    name: "Strato AI",
    year: "2024",
    tags: ["Go", "WebSockets", "Redis"],
    category: "AI",
    description: "Multi-LLM chat playground with end-to-end encryption, real-time streaming via WebSockets, and Redis for response caching.",
  },
  {
    name: "Traylist",
    year: "2025",
    tags: ["React", "Go"],
    category: "Full-Stack",
    description: "A Chrome extension with React frontend and Go backend for tracking reading/watching habits, with AI-driven productivity insights.",
  }
];

export const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript", "HTML/CSS", "Three.js", "D3.js", "GSAP"]
  },
  {
    category: "Backend",
    items: ["Go", "Python (Flask, FastAPI)", "Node.js (Express)", "Django", "LangChain"]
  },
  {
    category: "Mobile",
    items: ["Flutter", "Dart", "Riverpod", "BLoC", "Hive"]
  },
  {
    category: "Blockchain",
    items: ["Solidity", "Hardhat", "ethers.js", "Web3.js", "Flow", "SRC20", "Smart Contracts", "DeFi"]
  },
  {
    category: "AI / ML",
    items: ["PyTorch", "Keras", "NumPy", "OpenCV", "MoviePy"]
  },
  {
    category: "DevOps & DB",
    items: ["AWS", "Docker", "GitHub Actions", "Render", "Vercel", "PostgreSQL", "MongoDB", "Firebase", "Redis"]
  }
];
