import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

declare global {
    interface Window {
        $3Dmol: any;
    }
}

interface MolecularViewerProps {
    cid?: string; // PubChem Compound ID (Small Molecule)
    pdbId?: string; // RCSB PDB ID (Macromolecule)
    style?: 'stick' | 'sphere' | 'surface' | 'line';
    className?: string;
    autoRoateInitial?: boolean;
}

export const MolecularViewer = ({
    cid,
    pdbId,
    style = 'stick',
    className = '',
    autoRoateInitial = true,
}: MolecularViewerProps) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const [viewer, setViewer] = useState<any>(null);
    const [currentStyle, setCurrentStyle] = useState(style);
    const [autoRotate, setAutoRotate] = useState(autoRoateInitial);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initialize Viewer
    useEffect(() => {
        if (!viewerRef.current || viewer) return;

        if (!window.$3Dmol) {
            setError('Visualizer module loading...');
            // Simple poll to wait for script
            const interval = setInterval(() => {
                if (window.$3Dmol && viewerRef.current) {
                    clearInterval(interval);
                    init();
                }
            }, 500);
            return () => clearInterval(interval);
        } else {
            init();
        }

        function init() {
            try {
                const config = { backgroundColor: '#0B1120' }; // Match dark bg
                const v = window.$3Dmol.createViewer(viewerRef.current, config);
                setViewer(v);
            } catch (e) {
                console.error("Viewer init error", e);
                setError("Failed to initialize 3D Engine");
            }
        }
    }, [viewer]);

    // Load Data
    useEffect(() => {
        if (!viewer) return;

        setLoading(true);
        setError(null);
        viewer.clear();

        const applyDefaultStyle = () => {
            applyStyle(currentStyle);
            viewer.zoomTo();
            viewer.render();
            setLoading(false);
        };

        if (cid) {
            // Load Small Molecule (Drug) from PubChem
            window.$3Dmol.download(`cid:${cid}`, viewer, { mulbond: true }, function () {
                applyDefaultStyle();
            });
        } else if (pdbId) {
            // Load Protein from PDB
            window.$3Dmol.download(`pdb:${pdbId}`, viewer, {}, function () {
                applyDefaultStyle();
            });
        } else {
            // Default Fallback (Aspirin SDF) if nothing provided
            const aspirinSDF = `
          Mrv0541 02231512332D          
         13 13  0  0  0  0            999 V2000
            0.7145    0.4125    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            0.0000   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            0.0000   -0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            0.7145   -1.2375    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            1.4289   -0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            1.4289   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            2.1434   -1.2375    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
            2.8579   -0.8250    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            3.5724   -1.2375    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
            2.8579   -0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            0.7145   -2.0625    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
            0.0000   -2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
            1.4289   -2.4750    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
          1  2  2  0  0  0  0
          2  3  1  0  0  0  0
          3  4  2  0  0  0  0
          4  5  1  0  0  0  0
          5  6  2  0  0  0  0
          6  1  1  0  0  0  0
          5  7  1  0  0  0  0
          7  8  1  0  0  0  0
          8  9  2  0  0  0  0
          8 10  1  0  0  0  0
          4 11  1  0  0  0  0
         11 12  2  0  0  0  0
         11 13  1  0  0  0  0
        M  END
        `;
            viewer.addModel(aspirinSDF, 'sdf');
            applyDefaultStyle();
        }

    }, [viewer, cid, pdbId]);

    const applyStyle = (type: string) => {
        if (!viewer) return;
        viewer.setStyle({}, {}); // Clear

        // Tech colors: Cyan carbons, Standard others
        const atomColors = { C: '#00F0FF', O: '#FF0055', N: '#5555FF', S: '#FFFF00' };

        if (type === 'stick') {
            viewer.setStyle({}, { stick: { radius: 0.15, colorscheme: 'Jmol' } });
        } else if (type === 'sphere') {
            viewer.setStyle({}, { sphere: { scale: 0.3, colorscheme: 'Jmol' } }); // Van der waals reduced
        } else if (type === 'surface') {
            viewer.addSurface(window.$3Dmol.SurfaceType.VDW, { opacity: 0.85, color: '#38bdf8' });
        }

        viewer.render();
    };

    const toggleStyle = (style: any) => {
        setCurrentStyle(style);
        applyStyle(style);
    };

    // Auto Rotate Loop
    useEffect(() => {
        if (!viewer) return;

        let frameId: number;
        const animate = () => {
            if (autoRotate) {
                viewer.rotate(1); // 1 degree per frame
            }
            frameId = requestAnimationFrame(animate);
        };
        animate();

        return () => cancelAnimationFrame(frameId);
    }, [viewer, autoRotate]);


    return (
        <div className={`relative rounded-xl overflow-hidden border border-[rgba(56,189,248,0.3)] shadow-[0_0_20px_rgba(56,189,248,0.1)] bg-[#0B1120] ${className}`}>

            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0B1120]/80 backdrop-blur-sm">
                    <div className="w-12 h-12 border-4 border-t-primary-500 border-r-transparent border-b-primary-500 border-l-transparent rounded-full animate-spin"></div>
                    <p className="mt-4 text-primary-400 font-mono text-sm tracking-widest animate-pulse">INITIALIZING MOLECULAR DATA...</p>
                </div>
            )}

            <div ref={viewerRef} className="w-full h-full cursor-move" />

            {/* HUD Controls */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center pointer-events-none">
                <div className="flex gap-2 pointer-events-auto bg-black/50 backdrop-blur-md p-2 rounded-lg border border-white/10">
                    <button onClick={() => toggleStyle('stick')} className={`px-3 py-1 text-xs font-mono rounded ${currentStyle === 'stick' ? 'bg-primary-600 text-white' : 'text-primary-400 hover:bg-white/10'}`}>STICK</button>
                    <button onClick={() => toggleStyle('sphere')} className={`px-3 py-1 text-xs font-mono rounded ${currentStyle === 'sphere' ? 'bg-primary-600 text-white' : 'text-primary-400 hover:bg-white/10'}`}>SPHERE</button>
                    <button onClick={() => toggleStyle('surface')} className={`px-3 py-1 text-xs font-mono rounded ${currentStyle === 'surface' ? 'bg-primary-600 text-white' : 'text-primary-400 hover:bg-white/10'}`}>SURF</button>
                </div>

                <div className="pointer-events-auto">
                    <button
                        onClick={() => setAutoRotate(!autoRotate)}
                        className={`p-2 rounded-lg border border-white/10 backdrop-blur-md transition-all ${autoRotate ? 'bg-primary-600/20 text-primary-400' : 'bg-black/50 text-gray-500'}`}
                    >
                        <span className="sr-only">Toggle Rotate</span>
                        <svg className={`w-5 h-5 ${autoRotate ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};
