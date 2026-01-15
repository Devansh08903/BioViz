# BioViz 🧬
### Advanced Drug Discovery & Information Platform

![BioViz Hero](https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop)

**BioViz** is a next-generation bioinformatics platform designed for students, researchers, and pharmaceutical professionals. It provides a real-time, interactive environment to explore pharmaceutical compounds, visualize their 3D molecular structures, and understand their pharmacological mechanisms.

## 👨‍💻 Author

**Devansh Mishra**  
*Student @ DY Patil University*  
Innovative bioinformatics project focusing on data visualization and clinical accessibility.

## ✨ Features

*   **🔬 3D Molecular Engine**: Real-time WebGL rendering of small molecules (PubChem CID) and protein targets (PDB ID) using `3Dmol.js`.
*   **🏥 Comprehensive Drug Database**: detailed clinical data including indications, side effects (with frequency/severity), contraindications, and biological pathways.
*   **🔍 Power Search**: Instant filtering by drug name, therapeutic category, molecular target, or chemical ID.
*   **🎨 Tech-Forward UI/UX**: A modern, immersive "Dark Mode" interface inspired by sci-fi interfaces, featuring glassmorphism, neon accents, and responsive grid layouts.
*   **📱 Fully Responsive**: Optimized for desktop research workstations and mobile tablets.

## 🛠️ Tech Stack

*   **Framework**: [React 18](https://reactjs.org/) (Vite)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS Variables
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)
*   **Visualization**: [3Dmol.js](https://3dmol.csb.pitt.edu/) (Molecular rendering)
*   **Routing**: React Router v6

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/Devansh08903/BioViz.git
    cd BioViz
    ```

2.  Install dependencies:
    ```bash
    npm install
    # Note: Using Tailwind v4, dependencies are minimal
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📂 Project Structure

```
BioViz/
├── src/
│   ├── components/
│   │   ├── drug/        # specialized molecular viewer components
│   │   ├── ui/          # reusable UI kit (Cards, Badges, Buttons)
│   ├── contexts/        # Theme and global state
│   ├── data/            # Local drug database (drugs.ts)
│   ├── pages/           # Application views (Home, Search, Detail)
│   ├── index.css        # Global styles & Tailwind v4 theme
│   └── App.tsx          # Main router entry
├── index.html           # Entry HTML (Fonts & 3Dmol CDN)
└── vite.config.ts       # Vite configuration
```

## 🧪 Featured Modules

### Molecular Viewer
The `MolecularViewer` component is the heart of BioViz. It supports:
*   **Stick, Sphere, and Surface** rendering modes.
*   **Auto-rotation** for presentation.
*   **HUD Controls** for interacting with the model.

### Drug Data Model
Data is structured with deep clinical granularity:
```typescript
interface Drug {
  id: string;
  chemicalFormula: string;
  cid: string;   // PubChem ID
  pdbId: string; // Protein Data Bank ID
  mechanism: {
    simple: string;
    advanced: string;
    pathways: string[];
  };
  clinical: {
    indications: string[];
    sideEffects: { name: string; severity: 'low'|'medium'|'high' }[];
    // ...
  };
}
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

<p align="center">
  Built with 💙 by BioViz Systems
</p>