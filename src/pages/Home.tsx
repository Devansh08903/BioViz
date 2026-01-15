import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, GlassCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { MolecularViewer } from '../components/drug/MolecularViewer';
import { drugs, searchDrugs } from '../data/drugs'; // Import real data

export const Home = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(drugs);
    const [showViewer, setShowViewer] = useState(false);

    // Live Search
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults(drugs);
        } else {
            setSearchResults(searchDrugs(searchQuery));
        }
    }, [searchQuery]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchResults.length > 0) {
            navigate(`/drug/${searchResults[0].id}`);
        }
    };

    const features = [
        { icon: '🔬', title: 'Molecular Interrogation', description: 'Real-time 3D rendering of CIDs and PDB targets.' },
        { icon: '🧬', title: 'Pathway Analysis', description: 'Map drugs to biological targets and signaling cascades.' },
        { icon: '📊', title: 'Clinical Data', description: 'FDA indications, contraindications, and adverse event profiles.' },
    ];

    return (
        <div className="min-h-screen bg-grid text-white overflow-x-hidden font-sans">
            {/* Fixed Theme Toggle */}
            <div className="fixed top-6 right-6 z-50">
                <ThemeToggle />
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Abstract Tech Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0B1120] via-transparent to-[#0B1120] z-10" />
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-primary-600/10 blur-[100px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-secondary-600/10 blur-[100px]" />
                </div>

                <div className="relative z-20 max-w-6xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-block px-4 py-1 mb-6 rounded-full border border-primary-500/30 bg-primary-500/10 backdrop-blur-md">
                            <span className="text-primary-400 font-mono text-xs uppercase tracking-[0.2em]">Bioinformatics Platform v1.0</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tight">
                            <span className="text-white">BIO</span><span className="text-primary-500">VIZ</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
                            Advanced molecular visualization and drug discovery intelligence for the next generation of scientists.
                        </p>
                    </motion.div>

                    {/* Tech Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="max-w-2xl mx-auto relative group"
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="ENTER DRUG NAME, ID, OR TARGET..."
                                className="w-full pl-6 pr-6 py-6 rounded-2xl bg-[#0B1120]/90 backdrop-blur-xl border border-white/10 text-lg md:text-xl font-mono text-primary-400 placeholder:text-slate-600 focus:outline-none focus:border-primary-500/50 transition-all shadow-2xl"
                            />
                            <button type="submit" className="absolute right-3 top-3 bottom-3 px-6 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-all">
                                SEARCH
                            </button>
                        </form>
                    </motion.div>

                    {/* Quick Results (Auto-complete style) */}
                    {searchQuery && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl mx-auto mt-4 text-left grid gap-2"
                        >
                            {searchResults.slice(0, 3).map(drug => (
                                <div
                                    key={drug.id}
                                    onClick={() => navigate(`/drug/${drug.id}`)}
                                    className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl flex justify-between items-center cursor-pointer hover:border-primary-500/50 hover:bg-slate-800 transition-all group"
                                >
                                    <div>
                                        <h4 className="text-white font-bold group-hover:text-primary-400 transition-colors">{drug.name}</h4>
                                        <p className="text-xs text-slate-500 font-mono">{drug.category} • TARGET: {drug.target}</p>
                                    </div>
                                    <span className="text-slate-600 group-hover:text-primary-400">→</span>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {/* Quick Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-16 border-t border-slate-800 pt-8">
                        <div className="text-center">
                            <div className="text-2xl font-mono font-bold text-white">1,204</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">Compounds</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-mono font-bold text-primary-400">PDB</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">Integration</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-mono font-bold text-white">100%</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">Verified</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-mono font-bold text-secondary-400">3D</div>
                            <div className="text-xs text-slate-500 uppercase tracking-widest">Rendering</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Drugs Carousel */}
            <section className="py-24 bg-[#0B1120]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Featured Compounds</h2>
                            <p className="text-slate-400">High-priority targets for clinical research.</p>
                        </div>
                        <Button variant="outline" onClick={() => navigate('/search')}>VIEW DATABASE</Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {drugs.slice(0, 4).map((drug, i) => (
                            <motion.div
                                key={drug.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div
                                    onClick={() => navigate(`/drug/${drug.id}`)}
                                    className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-primary-500/50 hover:shadow-[0_0_30px_rgba(56,189,248,0.1)] transition-all cursor-pointer h-full flex flex-col group"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <Badge variant="info">{drug.category}</Badge>
                                        <span className="font-mono text-xs text-slate-600">{drug.chemicalFormula}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-400 transition-colors">{drug.name}</h3>
                                    <p className="text-sm text-slate-400 mb-6 flex-grow line-clamp-3">{drug.mechanism.simple}</p>

                                    <div className="w-full h-32 bg-black/50 rounded-lg overflow-hidden border border-slate-800 relative">
                                        {/* Mini Viewer Preview (Static Image or simplified viewer could go here, for now just a placeholder effect) */}
                                        <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                                            <span className="font-mono text-xs">3D PREVIEW</span>
                                        </div>
                                        <MolecularViewer
                                            cid={drug.cid}
                                            style="stick"
                                            autoRoateInitial={false}
                                            className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Interactive 3D Demo Area */}
            <section className="py-24 relative border-t border-slate-800 bg-slate-900/30">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-white mb-6">Real-Time Molecular <span className="text-primary-400">Engine</span></h2>
                        <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                            BioViz utilizes WebGL-accelerated rendering to visualize complex molecular structures directly in the browser. Toggle between surface, stick, and sphere representations to analyze binding sites and steric hindrance.
                        </p>

                        <div className="space-y-4">
                            {features.map(f => (
                                <div key={f.title} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center text-2xl border border-primary-500/20">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold">{f.title}</h3>
                                        <p className="text-sm text-slate-400">{f.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-[500px] w-full tech-card rounded-2xl overflow-hidden p-1 relative group">
                        <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 font-mono text-xs text-primary-400">
                            LIVE DEMO: ASPIRIN
                        </div>
                        <MolecularViewer cid="2244" className="w-full h-full rounded-xl" />
                    </div>
                </div>
            </section>

            <footer className="py-12 border-t border-slate-800 bg-[#0B1120] text-slate-500 text-center font-mono text-sm">
                <p>&copy; 2026 BIOVIZ SYSTEMS. ACADEMIC LICENSE.</p>
                <div className="flex justify-center gap-6 mt-4 opacity-50">
                    <span>PUBCHEM INTEGRATED</span>
                    <span>RCSB PDB LINKED</span>
                    <span>FDA DATA</span>
                </div>
            </footer>
        </div>
    );
};
