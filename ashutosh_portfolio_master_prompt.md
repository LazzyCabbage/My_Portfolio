# MASTER PROMPT — Ashutosh Bansal Portfolio Website

## CONTEXT & IDENTITY

You are building a personal portfolio website for **Ashutosh Bansal**, a Mathematics & Computing undergraduate at **IIT Roorkee** (GPA 9.0, batch of 2024), a full-stack and blockchain developer with 3+ years of freelance experience, and a hackathon winner (1st place, EthMumbai 2026 under Hashed Emergent VC). He is currently working at **STAMPED** (building cryptographic image verification) and **Strato Inc** (multi-LLM playground, games, productivity apps). He is deeply skilled in frontend, backend, mobile, AI/ML, DevOps, and blockchain/Web3.

The goal is a **portfolio website** that:
- Showcases his exceptional frontend skills through its very design and execution
- Feels **minimalist but premium** — dark neumorphism done tastefully
- Includes a live **on-chain visitor counter** as a blockchain bonus feature
- Is production-ready and deployable to **Vercel**

---

## TECH STACK

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS + custom CSS for neumorphic shadows
- **Animations**: Framer Motion for scroll reveals, section fades, and micro-interactions
- **Blockchain**: ethers.js + a deployed smart contract on Polygon Mumbai or Ethereum Sepolia testnet for the visitor counter
- **Fonts**: Use **Sora** (headings/display) + **DM Mono** (code labels, tech tags, small UI text) — load from Google Fonts. These are intentional choices; do NOT change to Inter, Roboto, or system fonts.
- **Icons**: Lucide React
- **Deployment**: Vercel — ensure `next.config.js` and folder structure are Vercel-compatible

---

## DESIGN SYSTEM — DARK NEUMORPHISM

### Color Palette (use as CSS variables)
```
--bg:          #1a1a1f        /* Base background — dark charcoal */
--bg-raised:   #1f1f26        /* Cards, raised surfaces */
--bg-inset:    #15151a        /* Inset elements, inputs */
--shadow-dark: #0d0d11        /* Dark shadow for neumorphism */
--shadow-light:#2a2a35        /* Light shadow for neumorphism */
--accent:      #6c63ff        /* Primary accent — muted electric violet */
--accent-glow: rgba(108,99,255,0.15) /* Glow color for hover states */
--text-primary:#e8e8f0        /* Main text */
--text-muted:  #7a7a8c        /* Secondary / muted text */
--text-accent: #6c63ff        /* Accent text */
--border:      rgba(255,255,255,0.06) /* Subtle borders */
```

### Neumorphic Shadow Utility (apply to all cards and surfaces)
```css
.neu-raised {
  background: var(--bg-raised);
  box-shadow:
    6px 6px 14px var(--shadow-dark),
    -6px -6px 14px var(--shadow-light);
  border-radius: 16px;
}

.neu-inset {
  background: var(--bg-inset);
  box-shadow:
    inset 4px 4px 10px var(--shadow-dark),
    inset -4px -4px 10px var(--shadow-light);
  border-radius: 12px;
}

.neu-flat {
  background: var(--bg);
  box-shadow:
    3px 3px 8px var(--shadow-dark),
    -3px -3px 8px var(--shadow-light);
  border-radius: 10px;
}
```

### Typography Rules
- **Section headings**: Sora, 600 weight, `--text-primary`
- **Body text**: Sora, 400 weight, `--text-muted`
- **Tags / tech badges**: DM Mono, 12px, uppercase, letter-spacing 0.08em
- **Hero name**: Sora, 700–800 weight, very large (clamp 48px–96px), `--text-primary`
- **Accent labels** (like "currently at", role labels): DM Mono, `--accent`

---

## LAYOUT & STRUCTURE

### Sticky Top Navbar
- Background: `--bg` with `backdrop-filter: blur(12px)` and a very subtle `border-bottom: 1px solid var(--border)`
- Logo: "AB" monogram in DM Mono, accent color, inside a small neu-raised badge
- Nav links: Hero, About, Experience, Projects, Skills, Contact — smooth scroll on click
- On mobile: collapsible hamburger menu
- Active section highlighting using IntersectionObserver
- No drop shadow — blend into the page subtly

### Global Layout
- Max content width: `1100px`, centered
- Section padding: `100px 0` desktop, `60px 0` mobile
- All sections fade in + slide up 24px using Framer Motion `whileInView` with `once: true` and `viewport: { margin: "-80px" }`

---

## SECTIONS — DETAILED SPECS

### 1. Hero Section
- Full viewport height (`100vh`)
- **Floating dot / particle background**: Use a canvas element with 60–80 small dots (2px radius, color `--accent` at 20% opacity) that drift slowly and connect with faint lines when within 120px of each other — subtle, not distracting
- **Custom cursor**: A 14px circle outline (color `--accent`, no fill) that follows the real cursor with a smooth 80ms lag (CSS `transition` or `requestAnimationFrame`). The cursor fills with a soft glow when hovering over interactive elements
- Layout: Left-aligned text block, vertically centered
  - Small DM Mono label above name: `// full-stack & blockchain developer`
  - Name: "Ashutosh Bansal" — large Sora display text
  - Subtitle: "Building systems at the intersection of Web3, AI, and great UX."
  - Two CTA buttons in neu-raised style: "View Projects" (accent fill) + "Download Resume" (outlined)
  - Below CTAs: three small neu-flat badges showing: `IIT Roorkee • B.Sc Math & Computing`, `EthMumbai 2026 Winner`, `Open to Opportunities`
- Scroll indicator: animated chevron at bottom center

### 2. About Section
- Two-column layout: left = a neumorphic avatar placeholder card (rounded square, 240×240, neu-raised, with a subtle gradient overlay and initials "AB" in large Sora if no photo); right = text block
- Text content:
  - Heading: "About Me"
  - 3–4 sentence bio built from resume: IIT Roorkee student, building real products since 2022, passionate about cryptographic systems, DeFi protocols, and elegant frontends. Hackathon-winning builder with a 9.0 GPA.
  - A row of 3 neu-inset stat pills: `9.0 GPA`, `10+ Client Projects`, `3 Years Building`
- Subtle `--accent` colored vertical left-border on the text block

### 3. Work Experience Section
- Heading: "Experience"
- Vertical timeline layout: a single vertical line (1px, gradient from `--accent` to transparent) on the left; each job is a neu-raised card to the right, connected to the line with a small filled circle dot in `--accent`
- Each card contains:
  - Role title (Sora, semibold, `--text-primary`)
  - Company name (DM Mono, `--accent`) + date range (DM Mono, `--text-muted`)
  - Bullet points from resume
- Jobs to include (from resume):
  1. **Developer @ STAMPED** (Jan 2026 – Present): cryptographic image verification, device attestation
  2. **Developer @ Strato Inc** (Mar 2024 – Present): Strato AI multi-LLM playground, Othello AI, Strato Meet, Quizzer, Strato Expenses
  3. **Freelancer @ Independent** (Sep 2022 – Present): 10+ projects, DeFi dashboards, ERP systems, React/Next.js/Flutter
- Cards animate in staggered from left using Framer Motion

### 4. Projects Section
- Heading: "Projects"
- **Card grid with hover flip**: 3 columns desktop, 2 tablet, 1 mobile
- Each card: 280×320px, uses CSS `transform-style: preserve-3d` for a smooth 3D flip on hover
  - **Front face**: neu-raised card
    - Project name (Sora, semibold)
    - Year badge (DM Mono, small, `--text-muted`)
    - Stack tags (DM Mono uppercase pills in `--bg-inset`)
    - A minimal icon or emoji representing the project type (optional)
  - **Back face**: same neu-raised style, slightly darker
    - Project description (2–3 lines)
    - Category tag: DeFi / AI / Full-Stack / Mobile
    - A "View" icon button (Lucide `ExternalLink` icon)
- Projects to include (pick from resume, blockchain-heavy first):
  1. **SwapPool** (2026) — Solidity, Hardhat — Minimal AMM DEX, constant product formula, ERC-20 pairs
  2. **Trade3Hub** (2026) — Solidity, React, MetaMask — P2P marketplace with escrow settlements
  3. **Chrono** (2025) — Flow, DeFi — Time-based lending protocol inspired by Euler
  4. **FractaOwn** (2025) — BSC, Solidity — Fractional RWA ownership protocol
  5. **AI Nexus** (2025) — Flask, LangChain, React, SRC20 — Web3 AI agent marketplace
  6. **Astrikos Modeling** (2025) — React, Three.js, Mapbox, D3.js, Unity WebGL — 3D urban planning tool
  7. **Strato AI** (2024) — Go, WebSockets, Redis — Multi-LLM chat playground
  8. **Traylist** (2025) — React, Go — Chrome extension for reading/watching habits + AI insights
- Add a subtle "Show More" toggle if needed to keep the grid clean initially

### 5. Skills Section
- Heading: "Skills"
- Grouped into categories, displayed as neu-inset panels:
  - **Frontend**: React, Next.js, TypeScript, Three.js, D3.js, GSAP, HTML/CSS
  - **Backend**: Go, Python (Flask, FastAPI), Node.js, Django, LangChain
  - **Mobile**: Flutter, Dart, Riverpod, BLoC
  - **Blockchain**: Solidity, Hardhat, ethers.js, Web3.js, Flow, Smart Contracts, DeFi
  - **AI / ML**: PyTorch, Keras, NumPy, OpenCV
  - **DevOps & DB**: AWS, Docker, GitHub Actions, PostgreSQL, MongoDB, Redis, Firebase
- Each skill tag: DM Mono, small, inside a `neu-flat` pill with `--accent` colored left dot
- Category headers: Sora semibold, `--text-primary`
- Each category panel fades in with staggered children on scroll

### 6. Blockchain Showcase — On-Chain Visitor Counter
- This is a **featured section** — give it its own full-width panel with `--accent-glow` soft radial background glow
- Heading: "On-Chain Visitor Counter"
- Subheading (DM Mono, muted): `// deployed on Ethereum Sepolia testnet`
- **Smart Contract** (include the full Solidity code in a `contracts/` folder):
  ```solidity
  // SPDX-License-Identifier: MIT
  pragma solidity ^0.8.20;
  
  contract VisitorCounter {
      uint256 public count;
      event Visited(address indexed visitor, uint256 newCount);
  
      function visit() external {
          count++;
          emit Visited(msg.sender, count);
      }
  
      function getCount() external view returns (uint256) {
          return count;
      }
  }
  ```
- **Frontend component**:
  - Displays the current `count` from the contract using ethers.js `provider.call()` (read-only, no wallet needed for reading)
  - A large neumorphic counter display (neu-inset pill) showing the live count in Sora bold
  - A "Leave a Mark" button (neu-raised, accent color) that triggers `visit()` — prompts MetaMask/wallet connect if not connected
  - Status text below: "X people have visited this page on-chain" in DM Mono muted
  - After successful transaction: a small confetti burst (use `canvas-confetti` npm package) + count refreshes
  - If no wallet: still shows the live count; button shows "Connect Wallet to Sign"
  - Use `window.ethereum` detection gracefully — never break for users without MetaMask
  - Contract address and ABI stored in `lib/contract.ts`
  - Use a public Sepolia RPC (e.g., `https://rpc.sepolia.org`) as the default read provider

### 7. Contact Section
- Heading: "Get In Touch"
- Subheading (DM Mono, muted): `// let's build something together`
- Two-column layout:
  - Left: neu-raised contact info card
    - Email: `ashutosh_b@ma.iitr.ac.in` (with Lucide `Mail` icon, clickable `mailto:`)
    - LinkedIn: link with Lucide `Linkedin` icon
    - GitHub: link with Lucide `Github` icon
    - Each row is a `neu-flat` pill that lifts slightly on hover (`box-shadow` transition)
  - Right: contact form (neu-inset fields)
    - Name input
    - Message textarea (4 rows)
    - Submit button (neu-raised, accent)
    - Use `https://formspree.io` or `https://web3forms.com` for form handling (no backend needed)
    - On submit: show a small neu-raised success toast notification
- Below: copyright line in DM Mono: `© 2026 Ashutosh Bansal — Built with Next.js & ethers.js`

---

## ANIMATIONS & INTERACTIONS SUMMARY

- **Smooth scroll**: Use `scroll-behavior: smooth` on `html` + Next.js link hash navigation
- **Custom cursor**: Canvas or div-based, 14px accent circle, 80ms lag, glows on hover
- **Particle hero background**: Canvas, 60–80 dots, slow drift, connecting lines within 120px
- **Section fade-in**: Framer Motion `initial={{ opacity: 0, y: 24 }}` → `whileInView={{ opacity: 1, y: 0 }}` with `transition={{ duration: 0.6, ease: "easeOut" }}`
- **Staggered children**: Use `variants` with `staggerChildren: 0.08` for skills and project cards
- **Project card flip**: CSS 3D transform, 0.5s ease, backface-hidden
- **Button hover**: `box-shadow` transition adds `--accent-glow` outer glow + slight lift
- **Navbar link active state**: Underline slides in from left using `::after` pseudo-element

---

## FILE STRUCTURE

```
/
├── app/
│   ├── layout.tsx          # Root layout, fonts, global CSS
│   ├── page.tsx            # Main page assembling all sections
│   └── globals.css         # CSS variables, neu utilities, cursor, scrollbar
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx            # Includes particle canvas + hero content
│   ├── About.tsx
│   ├── Experience.tsx      # Timeline
│   ├── Projects.tsx        # Flip card grid
│   ├── Skills.tsx
│   ├── VisitorCounter.tsx  # Blockchain feature
│   ├── Contact.tsx
│   ├── ParticleCanvas.tsx  # Standalone particle background
│   └── CustomCursor.tsx    # Custom cursor component
├── lib/
│   ├── contract.ts         # ABI + contract address for VisitorCounter
│   └── data.ts             # All resume data as typed TS objects (projects, jobs, skills)
├── contracts/
│   └── VisitorCounter.sol  # Solidity source
├── public/
│   └── resume.pdf          # Downloadable resume
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## DATA — Resume Content (pre-filled, use exactly)

All content is in `lib/data.ts` as typed TypeScript. Pre-populate with:

**Education**: IIT Roorkee, B.Sc Mathematics & Computing, Aug 2024–Present, GPA 9.0

**Experience**:
1. Developer @ STAMPED (Jan 2026–Present)
2. Developer @ Strato Inc (Mar 2024–Present)
3. Freelancer @ Independent (Sep 2022–Present)

**Achievements**: CBSE National Science Exhibition 3rd Place (2023), IAPT Physics Olympiad Qualified, EthMumbai 2026 — 1st Place (Hashed Emergent), Selected for Hashed Vibe Haus Residency

**Projects**: SwapPool, Trade3Hub, Chrono, FractaOwn, AI Nexus, Astrikos Modeling, Strato AI, Traylist, Chronicle (full descriptions as listed above)

**Skills**: (as listed in Skills section above, grouped by category)

---

## IMPORTANT IMPLEMENTATION NOTES

1. **No placeholder lorem ipsum** — use the actual resume content everywhere
2. **Responsive**: mobile-first, test at 375px, 768px, 1280px
3. **Accessibility**: `aria-label` on icon buttons, sufficient color contrast for `--text-muted` on `--bg`
4. **Performance**: lazy-load sections below fold, optimize canvas with `requestAnimationFrame` cancelation on unmount
5. **ethers.js version**: use ethers v6 (`import { ethers } from "ethers"`)
6. **No wallet required for reading**: the visitor counter reads via a public RPC without requiring MetaMask
7. **Scrollbar styling**: custom thin scrollbar in `--accent` color, webkit only
8. **No external UI libraries** (no shadcn, no MUI) — pure Tailwind + custom CSS to keep bundle lean
9. **All neumorphic shadows** must use the exact CSS variable system defined above for consistency
10. **Vercel deployment**: ensure `NEXT_PUBLIC_CONTRACT_ADDRESS` and `NEXT_PUBLIC_RPC_URL` are documented in a `.env.example` file

---

## REFERENCE MATERIALS (attached at runtime)

When building, refer to:
- The attached PDF resume for all accurate personal details, bullet points, and dates
- The design system above for all colors, shadows, and typography — do NOT deviate
- The blockchain section spec carefully — it is the standout differentiator of this portfolio

---

*This prompt was generated for use with Antigravity / AI coding agents. The owner will provide their resume PDF and any additional assets at build time.*
