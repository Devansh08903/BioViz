import { useParams, useNavigate } from 'react-router-dom';
import { Tabs } from '../components/ui/Tabs';
import { MolecularViewer } from '../components/drug/MolecularViewer';
import { Badge } from '../components/ui/Badge';
import { ThemeToggle } from '../components/ui/ThemeToggle';
import { getDrugById } from '../data/drugs';
import { Button } from '../components/ui/Button';

export const DrugDetail = () => {
    const { drugId } = useParams();
    const navigate = useNavigate();
    const drug = getDrugById(drugId || '');

    if (!drug) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Compound Not Found</h1>
                    <Button onClick={() => navigate('/')}>Return Home</Button>
                </div>
            </div>
        );
    }

    const tabs = [
        {
            id: 'overview',
            label: 'Overview',
            icon: '📋',
            content: (
                <div className="grid md:grid-cols-2 gap-8 animate-fade-in">
                    <div className="space-y-6">
                        <div className="tech-card p-6 rounded-xl">
                            <h3 className="text-primary-400 font-mono text-sm mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Description</h3>
                            <p className="text-slate-300 leading-relaxed text-lg">{drug.description}</p>
                        </div>

                        <div className="tech-card p-6 rounded-xl">
                            <h3 className="text-primary-400 font-mono text-sm mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Properties</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-slate-500 text-xs uppercase block">Formula</span>
                                    <span className="text-white font-mono text-lg">{drug.chemicalFormula}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs uppercase block">PubChem CID</span>
                                    <span className="text-white font-mono text-lg">{drug.cid}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs uppercase block">Target</span>
                                    <span className="text-accent-400 font-bold">{drug.target}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs uppercase block">PDB ID</span>
                                    <span className="text-white font-mono">{drug.pdbId}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[400px] md:h-auto tech-card p-1 rounded-xl relative">
                        <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 font-mono text-xs text-primary-400">
                            STRUCTURE: {drug.chemicalFormula}
                        </div>
                        <MolecularViewer cid={drug.cid} className="w-full h-full rounded-lg" />
                    </div>
                </div>
            ),
        },
        {
            id: 'mechanism',
            label: 'Mechanism',
            icon: '⚙️',
            content: (
                <div className="animate-fade-in space-y-8">
                    <div className="tech-card p-8 rounded-xl border-l-4 border-l-primary-500">
                        <h2 className="text-2xl font-bold text-white mb-2">Mechanism of Action</h2>
                        <p className="text-xl text-slate-300 leading-relaxed">{drug.mechanism.simple}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                            <h3 className="text-secondary-400 font-bold mb-4 flex items-center gap-2">
                                <span className="text-xl">🔬</span> Molecular Detail
                            </h3>
                            <p className="text-slate-400 leading-relaxed">{drug.mechanism.advanced}</p>
                        </div>

                        <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                            <h3 className="text-accent-400 font-bold mb-4 flex items-center gap-2">
                                <span className="text-xl">🧬</span> Key Pathways
                            </h3>
                            <ul className="space-y-3">
                                {drug.mechanism.pathways.map(path => (
                                    <li key={path} className="flex items-center gap-3 text-slate-300">
                                        <div className="w-2 h-2 rounded-full bg-accent-500" />
                                        {path}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Target Protein Viewer */}
                    <div className="mt-8">
                        <h3 className="text-white font-bold mb-4">Protein Target Visualization ({drug.pdbId})</h3>
                        <div className="h-[500px] w-full tech-card rounded-xl p-1 relative">
                            <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 font-mono text-xs text-secondary-400">
                                TARGET PROTEIN: {drug.target}
                            </div>
                            <MolecularViewer pdbId={drug.pdbId} style="cartoon" className="w-full h-full rounded-lg" />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'clinical',
            label: 'Clinical Data',
            icon: '💊',
            content: (
                <div className="grid md:grid-cols-3 gap-6 animate-fade-in">
                    {/* Indications */}
                    <div className="tech-card p-6 rounded-xl h-full">
                        <h3 className="text-success font-bold mb-6 flex items-center gap-2">
                            ✅ Indications
                        </h3>
                        <ul className="space-y-3">
                            {drug.clinical.indications.map(item => (
                                <li key={item} className="flex items-start gap-3 text-slate-300 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                                    <span className="text-emerald-500 mt-1">✓</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Side Effects */}
                    <div className="tech-card p-6 rounded-xl h-full">
                        <h3 className="text-warning font-bold mb-6 flex items-center gap-2">
                            ⚠️ Side Effects
                        </h3>
                        <div className="space-y-3">
                            {drug.clinical.sideEffects.map(effect => (
                                <div key={effect.name} className="bg-amber-500/5 p-3 rounded-lg border border-amber-500/10">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-slate-200 font-medium">{effect.name}</span>
                                        <Badge variant={effect.severity === 'high' ? 'danger' : effect.severity === 'medium' ? 'warning' : 'info'}>
                                            {effect.frequency}
                                        </Badge>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2">
                                        <div
                                            className={`h-full rounded-full ${effect.severity === 'high' ? 'bg-red-500' : effect.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-400'}`}
                                            style={{ width: effect.severity === 'high' ? '80%' : effect.severity === 'medium' ? '50%' : '20%' }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contraindications */}
                    <div className="tech-card p-6 rounded-xl h-full">
                        <h3 className="text-danger font-bold mb-6 flex items-center gap-2">
                            🚫 Contraindications
                        </h3>
                        <ul className="space-y-3">
                            {drug.clinical.contraindications.map(item => (
                                <li key={item} className="flex items-start gap-3 text-slate-300 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
                                    <span className="text-red-500 mt-1">✕</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-[#0B1120] bg-grid text-white font-sans">
            {/* Header */}
            <header className="fixed top-0 w-full z-40 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center font-bold text-white">B</div>
                        <span className="font-bold text-xl tracking-tight">BIO<span className="text-primary-400">VIZ</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>SEARCH</Button>
                        <ThemeToggle />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
                {/* Drug Header */}
                <div className="mb-12">
                    <div className="flex flex-wrap gap-3 mb-4">
                        <Badge variant="info">{drug.category}</Badge>
                        <Badge variant="success">FDA Approved</Badge>
                        <span className="text-slate-500 font-mono text-sm self-center">CID: {drug.cid}</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-2">{drug.name}</h1>
                    <p className="text-xl text-primary-400 font-light max-w-2xl">{drug.description}</p>
                </div>

                <Tabs tabs={tabs} defaultTab="overview" />
            </main>
        </div>
    );
};
