import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { drugs, searchDrugs, getCategories } from '../data/drugs';
import { searchPubChem } from '../services/pubchem';
import type { PubChemResult } from '../services/pubchem';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

// Combined result type
type SearchResult =
    | { type: 'local', data: typeof drugs[0] }
    | { type: 'pubchem', data: PubChemResult };

export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    // State
    const initialQuery = searchParams.get('q') || '';
    const [query, setQuery] = useState(initialQuery);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const categories = getCategories();

    // Search Logic
    useEffect(() => {
        let active = true;

        const performSearch = async () => {
            setIsSearching(true);

            // 1. Search Local Database
            const localMatches = searchDrugs(query).map(d => ({ type: 'local' as const, data: d }));

            // 2. Filter Local by Category
            let filteredLocal = localMatches;
            if (selectedCategory) {
                filteredLocal = localMatches.filter(r => r.data.category === selectedCategory);
            }

            // 3. Search PubChem (External) only if query is long enough and filtering isn't strict OR if we want to show everything
            // We generally only search PubChem if no category filter is applied, or user explicitly asks (implicit here by query)
            let pubChemMatches: SearchResult[] = [];

            if (query.length > 2 && !selectedCategory) {
                try {
                    const pcResults = await searchPubChem(query);
                    // Filter out duplicates that might exist in local
                    pubChemMatches = pcResults
                        .filter(pc => !localMatches.some(l => l.data.cid === pc.cid.toString()))
                        .map(pc => ({ type: 'pubchem' as const, data: pc }));
                } catch (e) {
                    console.warn("PubChem search failed", e);
                }
            }

            if (active) {
                setResults([...filteredLocal, ...pubChemMatches]);
                setIsSearching(false);
            }
        };

        // Debounce for network requests
        const timeoutId = setTimeout(() => {
            performSearch();
        }, 500);

        return () => {
            active = false;
            clearTimeout(timeoutId);
        };

    }, [query, selectedCategory]);

    // Sync URL
    useEffect(() => {
        const params = new URLSearchParams();
        if (query) params.set('q', query);
        setSearchParams(params, { replace: true });
    }, [query, setSearchParams]);

    return (
        <div className="min-h-screen bg-[#0B1120] bg-grid text-white font-sans flex flex-col">
            {/* Navbar */}
            <div className="fixed top-0 w-full z-40 bg-[#0B1120]/90 backdrop-blur-md border-b border-white/5 py-3">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center font-bold text-white">B</div>
                        <span className="font-bold text-xl tracking-tight hidden md:inline">BIO<span className="text-primary-400">VIZ</span></span>
                    </div>

                    <div className="flex-grow max-w-xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                placeholder="Search PubChem database..."
                                className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-primary-500 transition-colors"
                            />
                            <span className="absolute left-3 top-2.5 text-slate-500">
                                {isSearching ? <span className="animate-spin inline-block">↻</span> : '🔍'}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        {/* Theme Toggle Removed */}
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

                    <div className="p-4 bg-primary-500/5 rounded-xl border border-primary-500/10 hidden md:block">
                        <h4 className="font-bold text-primary-400 mb-2 text-sm flex items-center gap-2">
                            <span className="text-lg">☁️</span> PubChem Integrated
                        </h4>
                        <p className="text-xs text-slate-400">
                            Results merge curated BioViz data with live queries from the NIH PubChem database.
                        </p>
                    </div>
                </aside>

                {/* Results Area */}
                <main className="flex-grow">
                    <div className="flex justify-between items-end mb-6">
                        <h1 className="text-2xl font-bold text-white">
                            {query ? `Results for "${query}"` : 'Database'}
                        </h1>
                        <span className="text-slate-500 font-mono text-sm">{results.length} result{results.length !== 1 && 's'}</span>
                    </div>

                    <div className="grid gap-4">
                        <AnimatePresence>
                            {results.map((item, _idx) => {
                                if (item.type === 'local') {
                                    const drug = item.data;
                                    return (
                                        <motion.div
                                            key={`local-${drug.id}`}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onClick={() => navigate(`/drug/${drug.id}`)}
                                            className="group bg-slate-900/40 border border-slate-800 p-6 rounded-xl hover:bg-slate-800 hover:border-primary-500/30 cursor-pointer transition-all flex justify-between items-center relative overflow-hidden"
                                        >
                                            <div className="abolute top-0 right-0 p-2 bg-primary-500/20 text-primary-400 text-[10px] font-bold uppercase rounded-bl-lg">Verified</div>
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">{drug.name}</h3>
                                                    <Badge variant="info">{drug.category}</Badge>
                                                </div>
                                                <div className="flex gap-4 text-xs font-mono text-slate-500">
                                                    <span>CID: {drug.cid}</span>
                                                    <span>{drug.target}</span>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm">VIEW</Button>
                                        </motion.div>
                                    );
                                } else {
                                    const pc = item.data;
                                    return (
                                        <motion.div
                                            key={`pc-${pc.cid}`}
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            onClick={() => navigate(`/drug/pubchem-${pc.cid}`)}
                                            className="group bg-[#0B1120] border border-slate-800/50 p-6 rounded-xl hover:bg-slate-900 border-l-4 border-l-slate-700 hover:border-l-primary-500 cursor-pointer transition-all flex justify-between items-center"
                                        >
                                            <div className="flex-grow">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-xl font-bold text-slate-200 group-hover:text-primary-400 transition-colors">{pc.name}</h3>
                                                    <Badge variant="warning">PubChem</Badge>
                                                </div>
                                                <div className="text-xs font-mono text-slate-500">
                                                    CID: {pc.cid}
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="opacity-50 group-hover:opacity-100">FETCH DATA</Button>
                                        </motion.div>
                                    );
                                }
                            })}
                        </AnimatePresence>

                        {results.length === 0 && !isSearching && (
                            <div className="text-center py-20 bg-slate-900/20 rounded-xl border border-dashed border-slate-800">
                                <p className="text-slate-500">No compounds found.</p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};
