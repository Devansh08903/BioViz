# BioViz - Drug Discovery & Information Platform
## Comprehensive Design Document

---

## 🎯 Executive Summary

**BioViz** is a modern, interactive web platform designed to democratize drug discovery knowledge for students, researchers, and curious learners. It bridges molecular complexity with clinical relevance through elegant visualization, clear explanations, and scientifically accurate data.

**Core Value Proposition:**
- Understand **what** a drug does (therapeutic use)
- Understand **how** it works (mechanism of action)
- Understand **why** it matters (pros, cons, alternatives)
- **See** the molecule in 3D (interactive visualization)

---

## 📐 Website Architecture & Sitemap

```
/                           → Home / Landing Page
├── /search                 → Advanced Search Interface
├── /drug/:drugId           → Drug Detail Dashboard
│   ├── #overview          → Quick facts & regulatory info
│   ├── #mechanism         → Mechanism of action (visual + text)
│   ├── #molecular         → 3D molecular structure viewer
│   ├── #clinical          → Pros, cons, side effects
│   ├── #alternatives      → Alternative drugs & comparison
│   └── #bioinformatics    → Advanced panel (protein targets, pathways)
│
├── /compare                → Side-by-side drug comparison tool
├── /browse                 → Browse by category/disease/target
├── /about                  → Mission, team, disclaimer
└── /resources              → Educational resources, glossary
```

---

## 🎨 UI/UX Design System

### Color Palette

**Light Mode:**
```
Primary:        #2563EB (Biotech Blue)
Secondary:      #7C3AED (Research Purple)
Accent:         #10B981 (Success Green)
Warning:        #F59E0B (Amber)
Danger:         #EF4444 (Clinical Red)
Background:     #F8FAFC (Cool Gray 50)
Surface:        #FFFFFF
Text Primary:   #0F172A (Slate 900)
Text Secondary: #64748B (Slate 500)
```

**Dark Mode:**
```
Primary:        #3B82F6 (Bright Blue)
Secondary:      #A78BFA (Light Purple)
Accent:         #34D399 (Emerald)
Warning:        #FBBF24 (Amber)
Danger:         #F87171 (Red)
Background:     #0F172A (Slate 900)
Surface:        #1E293B (Slate 800)
Text Primary:   #F8FAFC (Slate 50)
Text Secondary: #94A3B8 (Slate 400)
Border:         #334155 (Slate 700)
```

### Typography

```css
/* Headings */
Font Family:    'Inter', 'SF Pro Display', -apple-system, sans-serif
H1:             48px / 700 / -0.02em
H2:             36px / 700 / -0.01em
H3:             28px / 600 / -0.01em
H4:             22px / 600 / normal
H5:             18px / 600 / normal

/* Body Text */
Body Large:     18px / 400 / 1.6
Body Regular:   16px / 400 / 1.5
Body Small:     14px / 400 / 1.5
Caption:        12px / 500 / 1.4

/* Monospace (for chemical formulas, IDs) */
Code Font:      'JetBrains Mono', 'Fira Code', monospace
```

### Animation Principles

- **Easing:** cubic-bezier(0.4, 0.0, 0.2, 1) for smooth, natural motion
- **Duration:** 
  - Micro-interactions: 150-200ms
  - Card reveals: 300-400ms
  - Page transitions: 500-600ms
- **Hover effects:** Subtle scale (1.02), shadow elevation, color shifts
- **Loading states:** Skeleton screens, not spinners
- **3D molecule rotation:** Smooth 60fps, gesture-responsive

### Spacing System

Based on 4px grid:
```
xs:  4px
sm:  8px
md:  16px
lg:  24px
xl:  32px
2xl: 48px
3xl: 64px
4xl: 96px
```

---

## 🏠 Page-by-Page Design Specifications

### 1. Home / Landing Page

**Hero Section:**
```
┌─────────────────────────────────────────────────────────┐
│  [3D Molecule Animation - Rotating Background]          │
│                                                           │
│         BioViz                                            │
│         Explore Drugs at the Molecular Level             │
│                                                           │
│  [Search Bar - "Search by drug, disease, or target"]    │
│  [Quick Links: Browse by Disease | Popular Drugs]       │
│                                                           │
└─────────────────────────────────────────────────────────┘
```

**Features Grid (3 columns):**
- 🔬 **Molecular Visualization** - Interactive 3D structures
- 📊 **Evidence-Based** - Clinically validated data
- 🧬 **Bioinformatics** - Protein targets & pathways

**Popular Drugs Carousel:**
- Cards with drug name, category, primary use
- Hover: subtle lift + shadow
- Click: navigate to drug detail

**Educational Footer:**
- Quick stats (e.g., "1200+ drugs indexed")
- Disclaimer banner (non-medical advice)

---

### 2. Search Interface (`/search`)

**Layout:**
```
┌── Filters Sidebar (25%) ──┬── Results Grid (75%) ──┐
│                            │                         │
│ Drug Class                 │  [Card] [Card] [Card]  │
│ □ Analgesic                │  [Card] [Card] [Card]  │
│ □ Antibiotic               │  [Card] [Card] [Card]  │
│ □ Antiviral                │                         │
│                            │  Showing 1-12 of 487   │
│ Target Protein             │  [Load More]            │
│ [Autocomplete Input]       │                         │
│                            │                         │
│ Approval Status            │                         │
│ □ FDA Approved             │                         │
│ □ WHO Essential            │                         │
│ □ Clinical Trial           │                         │
└────────────────────────────┴─────────────────────────┘
```

**Search Features:**
- Real-time autocomplete with categorized suggestions
- Fuzzy matching for typos
- Search by:
  - Drug name (generic + brand)
  - Disease/condition
  - Target protein (e.g., "EGFR")
  - Drug class
- Result cards show: name, class, primary indication, approval badge

---

### 3. Drug Detail Dashboard (`/drug/:drugId`)

**Sticky Tab Navigation (top):**
```
[Overview] [Mechanism] [Molecular] [Clinical] [Alternatives] [Advanced]
```

#### Tab 1: Overview

**Quick Info Cards (2-column grid):**

```
┌─────────────────────┐  ┌─────────────────────┐
│ Drug Name           │  │ Chemical Formula    │
│ Aspirin             │  │ C₉H₈O₄              │
│ Generic: ASA        │  │ MW: 180.158 g/mol   │
└─────────────────────┘  └─────────────────────┘

┌─────────────────────┐  ┌─────────────────────┐
│ Drug Class          │  │ Approval Status     │
│ NSAID               │  │ ✓ FDA Approved      │
│ Salicylate          │  │ ✓ WHO Essential     │
└─────────────────────┘  └─────────────────────┘
```

**Therapeutic Uses (Expandable List):**
- 💊 Pain relief (mild to moderate)
- 🌡️ Fever reduction
- ❤️ Cardiovascular protection (low dose)
- 🩺 Anti-inflammatory

**2D Structure Diagram:**
- Clean, publication-quality molecular drawing
- Highlight functional groups on hover

---

#### Tab 2: Mechanism of Action

**Beginner View (Default):**

```
┌────────────────────────────────────────────────┐
│  📖 Simple Explanation                          │
│                                                 │
│  Aspirin blocks an enzyme called COX,          │
│  which reduces inflammation, pain, and fever.  │
│                                                 │
│  [Expand Advanced View]                        │
└────────────────────────────────────────────────┘
```

**Advanced View (Toggled):**

```
┌────────────────────────────────────────────────┐
│  🔬 Molecular Mechanism                         │
│                                                 │
│  Target Enzyme: COX-1 / COX-2                  │
│  (Cyclooxygenase)                              │
│                                                 │
│  [Animated Flow Diagram]                       │
│                                                 │
│  Aspirin                                       │
│     ↓ (acetylates)                             │
│  COX-1/2 Active Site                           │
│     ↓ (inhibits)                               │
│  Prostaglandin Synthesis ↓                     │
│     ↓                                           │
│  Reduced: Pain, Inflammation, Fever            │
│                                                 │
│  Binding Mode: Irreversible covalent           │
│  Key Residue: Ser530 (COX-1)                   │
└────────────────────────────────────────────────┘
```

**Animated Pathway Flow:**
- Visual representation with icons
- Step-by-step reveal on scroll
- Tooltips on each node

---

#### Tab 3: Interactive 3D Molecular Model

**Full-Screen Viewer:**

```
┌────────────────────────────────────────────────┐
│                                                 │
│         [3D Molecule - Rotatable]              │
│                                                 │
│                                                 │
│  Controls:                                     │
│  [⚪ Ball-Stick] [🌐 Surface] [🎯 Binding]    │
│  [🔄 Auto-Rotate] [📷 Screenshot]             │
│                                                 │
│  Hover Info:                                   │
│  Atom: Carbon (C)                              │
│  Bond: Single covalent                         │
│                                                 │
└────────────────────────────────────────────────┘
```

**Features:**
- Gesture controls (drag to rotate, pinch to zoom)
- Toggle views:
  - Ball & stick
  - Space-filling (van der Waals)
  - Surface rendering
  - Binding site highlight (if protein-bound structure available)
- Atom tooltips on hover (element, properties)
- Download PDB file option
- Embed mode for sharing

---

#### Tab 4: Clinical Profile (Pros & Cons)

**Split View:**

```
┌─────── Benefits ───────┬─────── Risks ────────┐
│                         │                       │
│ ✅ Effective Pain      │ ⚠️ GI Irritation    │
│ Relief                 │                       │
│ Evidence: High         │ Severity: Moderate   │
│ [Citation links]       │ Frequency: 10-15%    │
│                         │ [More info]          │
│ ─────────────────────  │ ───────────────────  │
│                         │                       │
│ ✅ Cardioprotective    │ ⚠️ Bleeding Risk    │
│ (low dose)             │                       │
│ Evidence: High         │ Severity: High       │
│ [Citation links]       │ (with anticoagulants)│
│                         │ [More info]          │
│ ─────────────────────  │ ───────────────────  │
│                         │                       │
│ ✅ Affordable &        │ ⚠️ Reye's Syndrome  │
│ Accessible             │ (children)           │
│                         │ Severity: Rare/High  │
└─────────────────────────┴───────────────────────┘
```

**Common Side Effects (Frequency Chart):**
- Visual bar chart with percentages
- Color-coded by severity

**Contraindications:**
- List with icons
- Expandable for detailed explanations

---

#### Tab 5: Alternatives & Comparison

**Suggested Alternatives:**

```
┌────────────────────────────────────────────────┐
│  Similar Mechanism (NSAIDs)                    │
│                                                 │
│  [Card: Ibuprofen]  [Card: Naproxen]          │
│                                                 │
│  Different Mechanism (Pain Relief)             │
│                                                 │
│  [Card: Acetaminophen]  [Card: Celecoxib]     │
│                                                 │
│  [Compare Selected →]                          │
└────────────────────────────────────────────────┘
```

**Comparison Table (when 2+ selected):**

```
┌─────────────┬──────────┬──────────┬──────────┐
│ Feature     │ Aspirin  │ Ibuprofen│ Naproxen │
├─────────────┼──────────┼──────────┼──────────┤
│ Efficacy    │ ⭐⭐⭐⭐  │ ⭐⭐⭐⭐⭐│ ⭐⭐⭐⭐  │
│ GI Safety   │ ⭐⭐     │ ⭐⭐⭐   │ ⭐⭐⭐   │
│ Cardio Risk │ Low      │ Moderate │ Moderate │
│ Cost        │ $        │ $        │ $$       │
│ Duration    │ 4-6h     │ 4-6h     │ 8-12h    │
└─────────────┴──────────┴──────────┴──────────┘
```

---

#### Tab 6: Bioinformatics Insight Panel

**Advanced Users Only (Collapsible by Default):**

```
┌────────────────────────────────────────────────┐
│  🧬 Target Protein                              │
│  Name: Prostaglandin G/H synthase 1 (COX-1)    │
│  UniProt ID: P23219                            │
│  [View on UniProt] [View PDB Structure]        │
│                                                 │
│  Gene: PTGS1                                   │
│  Organism: Homo sapiens                        │
│                                                 │
│  ─────────────────────────────────────────────│
│                                                 │
│  🔬 Binding Affinity                            │
│  IC₅₀: ~1.67 μM (COX-1)                        │
│  IC₅₀: ~278 μM (COX-2)                         │
│  Selectivity: COX-1 selective                  │
│                                                 │
│  ─────────────────────────────────────────────│
│                                                 │
│  🧭 Pathways Involved                           │
│  • Arachidonic acid metabolism                 │
│  • Platelet activation                         │
│  • Inflammatory response                       │
│  [View on KEGG] [View on Reactome]            │
│                                                 │
│  ─────────────────────────────────────────────│
│                                                 │
│  🧪 Clinical Mutations (Optional)               │
│  No known resistance mutations                 │
└────────────────────────────────────────────────┘
```

---

### 4. Compare Page (`/compare`)

**Side-by-Side View:**
- Select up to 3 drugs
- All tabs synchronized
- Highlight differences
- Export comparison as PDF

---

### 5. Browse Page (`/browse`)

**Category Cards:**
```
┌──────────────────────────────────────────────┐
│  Browse by:                                   │
│                                               │
│  [Disease Category]  [Drug Class]            │
│  [Target Protein]    [Approval Year]         │
│                                               │
│  Popular Categories:                         │
│                                               │
│  [Card: Cardiovascular]  [Card: Oncology]   │
│  [Card: Infectious Disease]  [Card: CNS]    │
└──────────────────────────────────────────────┘
```

---

## 🛠️ Recommended Tech Stack

### Frontend

**Core Framework:**
- **React 18** (with TypeScript)
  - Component-based, excellent ecosystem
  - TypeScript for type safety with scientific data

**Styling:**
- **TailwindCSS 3.4+** for utility-first, responsive design
- **Framer Motion** for smooth animations
- **Radix UI** or **HeadlessUI** for accessible components

**3D Visualization:**
- **3Dmol.js** - Primary choice for molecular visualization
  - Lightweight, WebGL-based
  - PDB file support
  - Good documentation
- **Alternative: NGL Viewer** - More features, slightly heavier

**State Management:**
- **Zustand** or **React Query** for server state
- Context API for theme toggling

**Charting:**
- **Recharts** or **Chart.js** for side effects frequency
- **D3.js** for pathway diagrams (mechanism flow)

**Routing:**
- **React Router v6**

**Build Tool:**
- **Vite** - Fast, modern, excellent DX

### Backend (API Layer - Optional for MVP)

**If Building API:**
- **FastAPI** (Python) - Ideal for bioinformatics data
- **PostgreSQL** - Structured drug data
- **Redis** - Caching for frequent searches

**Data Sources (Integration):**
- **PubChem API** - Chemical structures, properties
- **UniProt API** - Protein data
- **DrugBank** - Drug info (academic license)
- **ChEMBL** - Bioactivity data
- **RCSB PDB** - 3D structures

### Static Option (No Backend)

- Pre-generated JSON files
- Static hosting (Vercel, Netlify)
- Client-side search with **Fuse.js**
- IndexedDB for caching

---

## 📊 Feature Breakdown & User Flows

### User Flow 1: Drug Search

```
User lands on Home
    ↓
Enters "aspirin" in search bar
    ↓
Autocomplete shows:
  - Aspirin (Drug)
  - COX-1 (Target)
  - Pain (Indication)
    ↓
Selects "Aspirin"
    ↓
Navigates to /drug/aspirin
    ↓
Views Overview tab by default
    ↓
Clicks "Molecular" tab to see 3D structure
    ↓
Rotates molecule, toggles surface view
    ↓
Clicks "Alternatives"
    ↓
Compares with Ibuprofen
```

### User Flow 2: Disease-Based Search

```
User navigates to /browse
    ↓
Selects "Cardiovascular" category
    ↓
Sees filtered list (statins, beta-blockers, etc.)
    ↓
Clicks "Atorvastatin"
    ↓
Reads mechanism of action
    ↓
Expands "Advanced View"
    ↓
Clicks UniProt link to learn about HMG-CoA reductase
```

### User Flow 3: Comparison

```
User on Aspirin page
    ↓
Clicks "Alternatives" tab
    ↓
Selects Ibuprofen + Naproxen
    ↓
Clicks "Compare Selected"
    ↓
Views side-by-side table
    ↓
Exports as PDF for class notes
```

---

## 📝 Sample Content: Aspirin

### Overview
- **Generic Name:** Acetylsalicylic Acid (ASA)
- **Brand Names:** Bayer Aspirin, Ecotrin, Bufferin
- **Chemical Formula:** C₉H₈O₄
- **Molecular Weight:** 180.158 g/mol
- **Drug Class:** NSAID (Non-Steroidal Anti-Inflammatory Drug), Salicylate
- **Approval Status:** FDA Approved (1899), WHO Essential Medicine

### Therapeutic Uses
1. **Pain Relief** (Analgesic) - Mild to moderate pain
2. **Fever Reduction** (Antipyretic)
3. **Anti-Inflammatory** - Acute/chronic inflammation
4. **Cardiovascular Protection** - Low-dose (75-100mg) for stroke/MI prevention
5. **Colorectal Cancer Prevention** (Emerging evidence)

### Mechanism of Action

**Simple:**
Aspirin blocks an enzyme (COX) that creates prostaglandins—chemicals that cause pain, fever, and inflammation. By blocking COX, aspirin reduces these symptoms.

**Advanced:**
- **Target:** Cyclooxygenase-1 (COX-1) and Cyclooxygenase-2 (COX-2)
- **Mechanism:** Irreversible acetylation of Ser530 (COX-1) or Ser516 (COX-2)
- **Effect:** Inhibits conversion of arachidonic acid to prostaglandin H₂
- **Result:** ↓ Prostaglandins → ↓ pain, inflammation, fever, platelet aggregation

### Molecular Structure
- **PDB ID:** 1PTH (COX-1 with aspirin-like inhibitor)
- **Key Functional Groups:**
  - Carboxylic acid (–COOH)
  - Ester (acetyl group)
  - Benzene ring

### Clinical Profile

**Benefits:**
- ✅ Effective, fast-acting pain relief
- ✅ Cardioprotective at low doses (reduces clot risk)
- ✅ Inexpensive and widely available
- ✅ Well-studied (120+ years of use)

**Risks:**
- ⚠️ **GI Irritation** (10-15%) - Can cause stomach ulcers
- ⚠️ **Bleeding Risk** - Inhibits platelet function (avoid with anticoagulants)
- ⚠️ **Reye's Syndrome** - Rare but serious in children with viral infections
- ⚠️ **Allergic Reactions** - Rash, asthma exacerbation in sensitive individuals

**Common Side Effects:**
- Heartburn (5-10%)
- Nausea (3-5%)
- Bruising (2-4%)

### Alternatives

**Similar Mechanism (NSAIDs):**
1. **Ibuprofen** - Better GI profile, shorter duration
2. **Naproxen** - Longer-acting, twice-daily dosing
3. **Celecoxib** - COX-2 selective (lower GI risk)

**Different Mechanism:**
1. **Acetaminophen** - Pain/fever relief without anti-inflammatory effect

### Bioinformatics Data

**Target Protein:**
- **Name:** Prostaglandin G/H synthase 1 (COX-1)
- **UniProt ID:** P23219
- **Gene:** PTGS1
- **Pathways:**
  - Arachidonic acid metabolism (KEGG hsa00590)
  - Platelet activation (Reactome R-HSA-76002)

**Binding Data:**
- **IC₅₀ (COX-1):** ~1.67 μM
- **IC₅₀ (COX-2):** ~278 μM
- **Selectivity Ratio:** ~166 (COX-1 selective)

---

## ⚖️ Educational & Ethical Guidelines

### Disclaimer (Visible on Every Page)

```
⚠️ EDUCATIONAL USE ONLY

This website provides scientifically accurate drug information for
educational and research purposes. It is NOT a substitute for
professional medical advice, diagnosis, or treatment.

Always consult a qualified healthcare provider before starting,
stopping, or changing any medication.
```

### Content Accuracy Standards

- ✅ All data sourced from peer-reviewed databases (PubChem, DrugBank, UniProt)
- ✅ Citations linked for all clinical claims
- ✅ Clear distinction between:
  - FDA-approved indications
  - Off-label uses
  - Research/experimental data
- ✅ Regular updates (quarterly reviews)

### Privacy & Ethics

- No user tracking for searches (privacy-first)
- No pharmaceutical advertising
- Open about data sources
- Academic/educational mission statement

---

## 🚀 Implementation Roadmap

### Phase 1: MVP (Weeks 1-4)
- [ ] Design system + component library
- [ ] Home page + search
- [ ] Drug detail page (Overview, Mechanism, Molecular tabs)
- [ ] 3D viewer integration (3Dmol.js)
- [ ] 20 sample drugs with full data
- [ ] Dark/light mode

### Phase 2: Enhanced Features (Weeks 5-8)
- [ ] Comparison tool
- [ ] Browse by category
- [ ] Clinical profile tab (pros/cons)
- [ ] Alternatives recommendation
- [ ] Responsive mobile design
- [ ] 100+ drugs

### Phase 3: Advanced Tools (Weeks 9-12)
- [ ] Bioinformatics panel
- [ ] Pathway diagrams (mechanism animations)
- [ ] User accounts (save favorites, comparisons)
- [ ] Export features (PDF, citation)
- [ ] API integration (PubChem, UniProt)
- [ ] 500+ drugs

### Phase 4: Polish & Launch (Weeks 13-16)
- [ ] Performance optimization
- [ ] Accessibility audit (WCAG 2.1 AA)
- [ ] Content review by domain experts
- [ ] SEO optimization
- [ ] Analytics (privacy-preserving)
- [ ] Launch & user testing

---

## 📦 Project Structure

```
bioviz/
├── public/
│   ├── molecules/           # PDB files
│   └── images/
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   ├── drug/           # Drug-specific components
│   │   │   ├── MolecularViewer.tsx
│   │   │   ├── MechanismFlow.tsx
│   │   │   ├── ClinicalProfile.tsx
│   │   │   └── ComparisonTable.tsx
│   │   └── search/
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Search.tsx
│   │   ├── DrugDetail.tsx
│   │   ├── Compare.tsx
│   │   └── Browse.tsx
│   ├── data/
│   │   ├── drugs/          # JSON drug database
│   │   └── categories.json
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   │   └── globals.css     # Tailwind + custom styles
│   └── App.tsx
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

---

## 🎓 Summary

**BioViz** is positioned to become **the most beautiful and accessible drug information platform for students and researchers**. By combining:

- **Scientific rigor** (accurate, cited data)
- **Visual excellence** (3D molecules, animations, modern UI)
- **Educational clarity** (simple explanations + advanced details)
- **Ethical responsibility** (disclaimers, non-commercial)

...we create a tool that empowers learning without overwhelming users.

**Next Steps:**
1. Set up Vite + React + TypeScript project
2. Build design system and component library
3. Integrate 3Dmol.js for molecular visualization
4. Populate initial drug dataset (20-30 high-priority drugs)
5. Iterate based on user feedback

---

**Ready to build something that makes drug discovery knowledge accessible to everyone? Let's start coding! 🚀**
