import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Tabs } from '../components/ui/Tabs';
import { MolecularViewer } from '../components/drug/MolecularViewer';
import { Badge } from '../components/ui/Badge';
import { getDrugById } from '../data/drugs';
import { getPubChemDetails } from '../services/pubchem';
import type { PubChemDetailedData } from '../services/pubchem';
import { Button } from '../components/ui/Button';

export const DrugDetail = () => {
    const { drugId } = useParams();
    const navigate = useNavigate();

    const [localDrug, setLocalDrug] = useState(getDrugById(drugId || ''));
    const [pubChemDrug, setPubChemDrug] = useState<PubChemDetailedData | null>(null);
    const [loading, setLoading] = useState(false);

    // Effect to handle data loading
    useEffect(() => {
        // 1. Check if it's a local ID
        const local = getDrugById(drugId || '');
        if (local) {
            setLocalDrug(local);
            return;
        }

        // 2. Check if it's a PubChem dynamic ID
        if (drugId?.startsWith('pubchem-')) {
            const cid = drugId.split('-')[1];
            setLoading(true);
            getPubChemDetails(cid).then(data => {
                setPubChemDrug(data);
                setLoading(false);
            });
        }
    }, [drugId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl text-primary-400 font-mono animate-pulse">CONNECTING TO NIH DATABASE...</h2>
                    <p className="text-slate-500 mt-2">Fetching live pharmacological data</p>
                </div>
            </div>
        );
    }

    // Normalize data for view
    const isLocal = !!localDrug;
    const name = isLocal ? localDrug!.name : pubChemDrug?.name;
    const description = isLocal ? localDrug!.description : pubChemDrug?.description;
    const cid = isLocal ? localDrug!.cid : pubChemDrug?.cid;
    const formula = isLocal ? localDrug!.chemicalFormula : pubChemDrug?.formula;
    const weight = isLocal ? "?" : pubChemDrug?.weight;

    const mechanismSimple = isLocal ? localDrug!.mechanism.simple : "Mechanism data extracted from PubChem.";
    const mechanismAdvanced = isLocal ? localDrug!.mechanism.advanced : pubChemDrug?.mechanism;

    const indications = isLocal ? localDrug!.clinical.indications : (pubChemDrug?.indications ? [pubChemDrug.indications] : []);

    if (!name) {
        return (
            <div className="min-h-screen bg-[#0B1120] flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Compound Not Found</h1>
                    <Button onClick={() => navigate('/search')}>Return to Search</Button>
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
                            <p className="text-slate-300 leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: description || "No description available." }}></p>
                        </div>

                        <div className="tech-card p-6 rounded-xl">
                            <h3 className="text-primary-400 font-mono text-sm mb-4 uppercase tracking-widest border-b border-white/10 pb-2">Properties</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-slate-500 text-xs uppercase block">Formula</span>
                                    <span className="text-white font-mono text-lg">{formula}</span>
                                </div>
                                <div>
                                    <span className="text-slate-500 text-xs uppercase block">PubChem CID</span>
                                    <span className="text-white font-mono text-lg">{cid}</span>
                                </div>
                                {!isLocal && (
                                    <div>
                                        <span className="text-slate-500 text-xs uppercase block">Weight</span>
                                        <span className="text-white font-mono">{weight} g/mol</span>
                                    </div>
                                )}
                                {isLocal && (
                                    <>
                                        <div>
                                            <span className="text-slate-500 text-xs uppercase block">Target</span>
                                            <span className="text-accent-400 font-bold">{localDrug!.target}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-500 text-xs uppercase block">PDB ID</span>
                                            <span className="text-white font-mono">{localDrug!.pdbId}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="h-[400px] md:h-auto tech-card p-1 rounded-xl relative">
                        <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 font-mono text-xs text-primary-400">
                            STRUCTURE: {formula}
                        </div>
                        <MolecularViewer cid={cid} className="w-full h-full rounded-lg" />
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
                        <p className="text-xl text-slate-300 leading-relaxed">{mechanismSimple}</p>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-xl border border-white/5">
                        <h3 className="text-secondary-400 font-bold mb-4 flex items-center gap-2">
                            <span className="text-xl">🔬</span> Molecular Detail
                        </h3>
                        <p className="text-slate-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: mechanismAdvanced || "No detailed mechanism available." }}></p>
                    </div>

                    {/* Only show target viewer for local curated drugs where we know the PDB ID */}
                    {isLocal && (
                        <div className="mt-8">
                            <h3 className="text-white font-bold mb-4">Protein Target Visualization ({localDrug!.pdbId})</h3>
                            <div className="h-[500px] w-full tech-card rounded-xl p-1 relative">
                                <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur px-3 py-1 rounded border border-white/10 font-mono text-xs text-secondary-400">
                                    TARGET PROTEIN: {localDrug!.target}
                                </div>
                                <MolecularViewer pdbId={localDrug!.pdbId} style="cartoon" className="w-full h-full rounded-lg" />
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
        {
            id: 'clinical',
            label: 'Clinical Data',
            icon: '💊',
            content: (
                <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
                    {/* Indications */}
                    <div className="tech-card p-6 rounded-xl h-full">
                        <h3 className="text-success font-bold mb-6 flex items-center gap-2">
                            ✅ Indications
                        </h3>
                        <ul className="space-y-3">
                            {indications.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-300 bg-emerald-500/5 p-3 rounded-lg border border-emerald-500/10">
                                    <span className="text-emerald-500 mt-1">✓</span>
                                    <span dangerouslySetInnerHTML={{ __html: item }}></span>
                                </li>
                            ))}
                            {indications.length === 0 && <p className="text-slate-500 italic">No clinical indication data available.</p>}
                        </ul>
                    </div>

                    {/* Side Effects - Only for local as parsing arbitrary text is hard */}
                    {isLocal && (
                        <div className="tech-card p-6 rounded-xl h-full">
                            <h3 className="text-warning font-bold mb-6 flex items-center gap-2">
                                ⚠️ Side Effects
                            </h3>
                            <div className="space-y-3">
                                {localDrug!.clinical.sideEffects.map(effect => (
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
                    )}

                    {!isLocal && (
                        <div className="tech-card p-6 rounded-xl h-full flex items-center justify-center text-center">
                            <div>
                                <span className="text-4xl block mb-4">🔗</span>
                                <h3 className="text-white font-bold mb-2">View Full Clinical Data</h3>
                                <p className="text-slate-400 mb-6">Detailed clinical trials and side effect profiles are available on the source database.</p>
                                <a
                                    href={`https://pubchem.ncbi.nlm.nih.gov/compound/${cid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                                >
                                    Open on PubChem
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            ),
        },
    ];

    return (
        <div className="min-h-screen bg-grid bg-[#0B1120] text-white font-sans">
            <header className="fixed top-0 w-full z-40 bg-[#0B1120]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center font-bold text-white">B</div>
                        <span className="font-bold text-xl tracking-tight">BIO<span className="text-primary-400">VIZ</span></span>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="sm" onClick={() => navigate('/search')}>SEARCH</Button>
                        {/* Theme Toggle Removed */}
                    </div>
                </div>
            </header>

            <main className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
                <div className="mb-12">
                    <div className="flex flex-wrap gap-3 mb-4">
                        <Badge variant={isLocal ? "success" : "warning"}>{isLocal ? "Verified" : "PubChem Live"}</Badge>
                        <span className="text-slate-500 font-mono text-sm self-center">CID: {cid}</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-white mb-2">{name}</h1>
                    {isLocal && <p className="text-xl text-primary-400 font-light max-w-2xl">{localDrug!.description}</p>}
                </div>

                <Tabs tabs={tabs} defaultTab="overview" />
            </main>
        </div>
    );
};
