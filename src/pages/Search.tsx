import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { drugs, searchDrugs, getCategories } from '../data/drugs';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // State
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [results, setResults] = useState(drugs);
    const categories = getCategories();

    // Search Logic
    useEffect(() => {
        // 1. Filter by Text
        let filtered = searchDrugs(query);

        // 2. Filter by Category
        if (selectedCategory) {
            filtered = filtered.filter(d => d.category === selectedCategory);
        }

        setResults(filtered);

        // Update URL quietly
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        setSearchParams(params, { replace: true });

    }, [query, selectedCategory, setSearchParams]);

    return (
        <div className="min-h-screen bg-[#0B1120] bg-grid text-white font-sans flex flex-col">
            {/* Navbar */}
            <div className="fixed top-0 w-full z-40 bg-[#0B1120]/90 backdrop-blur-md border-b border-white/5 py-3">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center font-bold text-white">B</div>
                        <span className="font-bold text-xl tracking-tight hidden md:inline">BIO<span className="text-primary-400">VIZ</span></span>
                    </div>

                    {/* Mobile-friendly compactness */}
                    <div className="flex-grow max-w-xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Search compounds, targets, IDs..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                            />
                            <span className="absolute left-3 top-2.5 text-slate-500">🔍</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <ThemeToggle />
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 pt-24 pb-12 flex-grow flex md:flex-row flex-col gap-8">

                {/* Sidebar Filters */}
                <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
                    <div>
                        <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Therapeutic Area</h3>
                        <div className="space-y-1">
                            <button
                                onClick={() => setSelectedCategory(null)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!selectedCategory ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                            >
                                All Categories
                            </button>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === cat ? 'bg-primary-500/10 text-primary-400 font-medium' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-4 bg-slate-900/50 rounded-xl border border-white/5 hidden md:block">
                        <h4 className="font-bold text-white mb-2 text-sm">Database Stats</h4>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div>
                                <div className="text-xl font-mono text-primary-400">{drugs.length}</div>
                                <div className="text-[10px] text-slate-500 uppercase">Drugs</div>
                            </div>
                            <div>
                                <div className="text-xl font-mono text-secondary-400">{getCategories().length}</div>
                                <div className="text-[10px] text-slate-500 uppercase">Classes</div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Results Area */}
                <main className="flex-grow">
                    <div className="flex justify-between items-end mb-6">
                        <h1 className="text-2xl font-bold text-white">
                            {query ? `Search Results for "${query}"` : selectedCategory ? `${selectedCategory} Compounds` : 'All Compounds'}
                        </h1>
                        <span className="text-slate-500 font-mono text-sm">{results.length} molecule{results.length !== 1 && 's'} found</span>
                    </div>

                    <div className="grid gap-4">
                        <AnimatePresence>
                            {results.map((drug) => (
                                <motion.div
                                    key={drug.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    onClick={() => navigate(`/drug/${drug.id}`)}
                                    className="group bg-slate-900/40 border border-slate-800 p-6 rounded-xl hover:bg-slate-800 hover:border-primary-500/30 cursor-pointer transition-all flex md:flex-row flex-col gap-6 justify-between items-center relative overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-10 transition-opacity pointer-events-none">
                                        <span className="font-black text-6xl text-slate-800 select-none">{drug.chemicalFormula.split('C')[1]?.split('H')[0] || ''}</span>
                                    </div>

                                    <div className="flex-grow z-10">
                                        <div className="flex flex-wrap items-center gap-3 mb-2">
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">{drug.name}</h3>
                                            <Badge variant="info">{drug.category}</Badge>
                                            <span className="text-slate-600 text-xs font-mono border border-slate-700 px-2 py-0.5 rounded">CID: {drug.cid}</span>
                                        </div>
                                        <p className="text-slate-400 mb-3 text-sm max-w-2xl line-clamp-2">{drug.description}</p>
                                        <div className="flex gap-4 text-xs font-mono text-slate-500">
                                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>{drug.target}</span>
                                            <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-secondary-500"></span>PDB: {drug.pdbId}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 z-10">
                                        <Button variant="ghost" className="shrink-0 text-sm group-hover:bg-primary-500 group-hover:text-white transition-all">VIEW DATA</Button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {results.length === 0 && (
                            <div className="text-center py-24 bg-slate-900/20 rounded-xl border border-dashed border-slate-800 flex flex-col items-center justify-center">
                                <div className="text-4xl mb-4">🧪</div>
                                <h3 className="text-xl text-white font-bold mb-2">No results found</h3>
                                <p className="text-slate-500 max-w-md mx-auto mb-6">We couldn't find any compounds matching your search criteria. Try adjusting your filters or search terms.</p>
                                <Button variant="outline" onClick={() => { setQuery(''); setSelectedCategory(null); }}>Reset All Filters</Button>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};
