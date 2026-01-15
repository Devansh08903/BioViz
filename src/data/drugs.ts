export interface Drug {
    id: string;
    name: string;
    description: string;
    category: string;
    chemicalFormula: string;
    cid: string;
    pdbId: string;
    target: string;
    mechanism: {
        simple: string;
        advanced: string;
        pathways: string[];
    };
    clinical: {
        indications: string[];
        sideEffects: { name: string; frequency: string; severity: 'low' | 'medium' | 'high' }[];
        contraindications: string[];
    };
    alternatives: { name: string; reason: string }[];
}

export const drugs: Drug[] = [
    // --- PAIN & INFLAMMATION ---
    {
        id: 'aspirin',
        name: 'Aspirin',
        description: 'Aspirin is a salicylate used to treat pain, fever, and inflammation. It is also used as an antiplatelet medication to prevent blood clots.',
        category: 'NSAID',
        chemicalFormula: 'C9H8O4',
        cid: '2244',
        pdbId: '1PTH',
        target: 'Cyclooxygenase-1 (COX-1)',
        mechanism: {
            simple: 'Blocks enzymes that signal pain and inflammation.',
            advanced: 'Irreversible inhibition of COX-1/COX-2 via acetylation of Ser530, preventing prostaglandin synthesis.',
            pathways: ['Arachidonic acid metabolism', 'Platelet activation']
        },
        clinical: {
            indications: ['Pain', 'Fever', 'Inflammation', 'Stroke Prevention'],
            sideEffects: [
                { name: 'GI Bleeding', frequency: 'Common', severity: 'high' },
                { name: 'Heartburn', frequency: 'Very Common', severity: 'low' }
            ],
            contraindications: ['Peptic Ulcer', 'Bleeding Disorders']
        },
        alternatives: [
            { name: 'Ibuprofen', reason: 'Lower bleeding risk' },
            { name: 'Acetaminophen', reason: 'Better stomach safety' }
        ]
    },
    {
        id: 'ibuprofen',
        name: 'Ibuprofen',
        description: 'A common NSAID used for treating pain, fever, and inflammation.',
        category: 'NSAID',
        chemicalFormula: 'C13H18O2',
        cid: '3672',
        pdbId: '4PH9',
        target: 'Cyclooxygenase-2 (COX-2)',
        mechanism: {
            simple: 'Reduces hormones that cause inflammation.',
            advanced: 'Reversible inhibition of COX-1 and COX-2 enzymes.',
            pathways: ['Inflammatory response', 'Pain signaling']
        },
        clinical: {
            indications: ['Arthritis', 'Dysmenorrhea', 'Pain', 'Fever'],
            sideEffects: [
                { name: 'Stomach Pain', frequency: 'Common', severity: 'medium' },
                { name: 'Nausea', frequency: 'Common', severity: 'low' }
            ],
            contraindications: ['GI Bleeding', 'Renal Failure']
        },
        alternatives: [
            { name: 'Naproxen', reason: 'Longer duration' },
            { name: 'Celecoxib', reason: 'Less GI toxicity' }
        ]
    },
    {
        id: 'acetaminophen',
        name: 'Acetaminophen',
        description: 'A widely used pain reliever and fever reducer.',
        category: 'Analgesic',
        chemicalFormula: 'C8H9NO2',
        cid: '1983',
        pdbId: '6OS0', // TRPA1 related
        target: 'COX (Central Nervous System)',
        mechanism: {
            simple: 'Reduces pain signals in the brain.',
            advanced: 'Centrally acting COX inhibitor; may also modulate endocannabinoid system (AM404).',
            pathways: ['Pain perception', 'Thermoregulation']
        },
        clinical: {
            indications: ['Pain', 'Fever'],
            sideEffects: [
                { name: 'Liver Toxicity', frequency: 'Rare (High Dose)', severity: 'high' }
            ],
            contraindications: ['Liver Disease', 'Alcoholism']
        },
        alternatives: [
            { name: 'Ibuprofen', reason: 'Anti-inflammatory effect' }
        ]
    },

    // --- CARDIOVASCULAR ---
    {
        id: 'atorvastatin',
        name: 'Atorvastatin',
        description: 'A statin used to prevent cardiovascular disease and lower cholesterol.',
        category: 'Statin',
        chemicalFormula: 'C33H35FN2O5',
        cid: '60823',
        pdbId: '1HW9',
        target: 'HMG-CoA Reductase',
        mechanism: {
            simple: 'Blocks the liver enzyme that makes cholesterol.',
            advanced: 'Competitively inhibits HMG-CoA reductase, limitng mevalonate production.',
            pathways: ['Cholesterol biosynthesis']
        },
        clinical: {
            indications: ['Hyperlipidemia', 'Coronary Artery Disease'],
            sideEffects: [
                { name: 'Muscle Pain', frequency: 'Common', severity: 'medium' },
                { name: 'Liver Enzyme Elevation', frequency: 'Uncommon', severity: 'medium' }
            ],
            contraindications: ['Active Liver Disease', 'Pregnancy']
        },
        alternatives: [
            { name: 'Rosuvastatin', reason: 'Higher potency' },
            { name: 'Simvastatin', reason: 'Cost effective' }
        ]
    },
    {
        id: 'lisinopril',
        name: 'Lisinopril',
        description: 'An ACE inhibitor used to treat high blood pressure and heart failure.',
        category: 'ACE Inhibitor',
        chemicalFormula: 'C21H31N3O5',
        cid: '5362119',
        pdbId: '1O86',
        target: 'Angiotensin-Converting Enzyme',
        mechanism: {
            simple: 'Relaxes blood vessels by blocking a chemical that tightens them.',
            advanced: 'Inhibits ACE, preventing conversion of Angiotensin I to Angiotensin II (a potent vasoconstrictor).',
            pathways: ['Renin-Angiotensin System']
        },
        clinical: {
            indications: ['Hypertension', 'Heart Failure', 'Post-MI'],
            sideEffects: [
                { name: 'Dry Cough', frequency: 'Common', severity: 'low' },
                { name: 'Hyperkalemia', frequency: 'Uncommon', severity: 'medium' },
                { name: 'Angioedema', frequency: 'Rare', severity: 'high' }
            ],
            contraindications: ['History of Angioedema', 'Pregnancy']
        },
        alternatives: [
            { name: 'Losartan', reason: 'No cough side effect' },
            { name: 'Amlodipine', reason: 'Different mechanism (CCB)' }
        ]
    },
    {
        id: 'amlodipine',
        name: 'Amlodipine',
        description: 'A calcium channel blocker used to treat high blood pressure and angina.',
        category: 'Calcium Channel Blocker',
        chemicalFormula: 'C20H25ClN2O5',
        cid: '2162',
        pdbId: '6JP5', // Calcium Channel
        target: 'L-type Calcium Channels',
        mechanism: {
            simple: 'Relaxes blood vessels by blocking calcium entry into muscle cells.',
            advanced: 'Inhibits transmembrane influx of calcium ions into vascular smooth muscle and cardiac muscle.',
            pathways: ['Calcium signaling', 'Vascular smooth muscle contraction']
        },
        clinical: {
            indications: ['Hypertension', 'Angina'],
            sideEffects: [
                { name: 'Edema (Swelling)', frequency: 'Common', severity: 'medium' },
                { name: 'Flushing', frequency: 'Common', severity: 'low' }
            ],
            contraindications: ['Severe Hypotension', 'Cardiogenic Shock']
        },
        alternatives: [
            { name: 'Lisinopril', reason: 'Renal protection' },
            { name: 'Metoprolol', reason: 'Rate control' }
        ]
    },
    {
        id: 'metoprolol',
        name: 'Metoprolol',
        description: 'A beta-blocker used to treat high blood pressure and heart failure.',
        category: 'Beta Blocker',
        chemicalFormula: 'C15H25NO3',
        cid: '4171',
        pdbId: '2ZXJ', // Beta-1 Adrenergic Receptor
        target: 'Beta-1 Adrenergic Receptor',
        mechanism: {
            simple: 'Slows heart rate and reduces blood pressure.',
            advanced: 'Selective inhibitor of Beta-1 adrenergic receptors in cardiac muscle.',
            pathways: ['Adrenergic signaling', 'Cardiac conduction']
        },
        clinical: {
            indications: ['Hypertension', 'Angina', 'Heart Failure'],
            sideEffects: [
                { name: 'Bradychardia', frequency: 'Common', severity: 'medium' },
                { name: 'Fatigue', frequency: 'Common', severity: 'low' }
            ],
            contraindications: ['Heart Block', 'Bradycardia']
        },
        alternatives: [
            { name: 'Carvedilol', reason: 'Alpha blocking activity' }
        ]
    },

    // --- DIABETES & METABOLISM ---
    {
        id: 'metformin',
        name: 'Metformin',
        description: 'First-line medication for type 2 diabetes.',
        category: 'Antidiabetic',
        chemicalFormula: 'C4H11N5',
        cid: '4091',
        pdbId: '5TRV',
        target: 'Complex I / AMPK',
        mechanism: {
            simple: 'Lowers blood sugar and improves insulin sensitivity.',
            advanced: 'Decreases hepatic glucose production and increases peripheral glucose uptake via AMPK activation.',
            pathways: ['Insulin signaling', 'Gluconeogenesis']
        },
        clinical: {
            indications: ['Type 2 Diabetes', 'PCOS'],
            sideEffects: [
                { name: 'Diarrhea', frequency: 'Very Common', severity: 'low' },
                { name: 'Lactic Acidosis', frequency: 'Very Rare', severity: 'high' }
            ],
            contraindications: ['Renal Impairment', 'Metabolic Acidosis']
        },
        alternatives: [
            { name: 'Sitagliptin', reason: 'DPP-4 Inhibitor' }
        ]
    },

    // --- ANTIBIOTICS ---
    {
        id: 'amoxicillin',
        name: 'Amoxicillin',
        description: 'A penicillin antibiotic used to treat bacterial infections.',
        category: 'Antibiotic',
        chemicalFormula: 'C16H19N3O5S',
        cid: '33613',
        pdbId: '1PWC', // Penicillin Binding Protein
        target: 'Penicillin-Binding Proteins',
        mechanism: {
            simple: 'Stops bacteria from building cell walls.',
            advanced: 'Inhibits bacterial cell wall synthesis by binding to PBPs, preventing peptidoglycan cross-linking.',
            pathways: ['Cell wall synthesis']
        },
        clinical: {
            indications: ['Pneumonia', 'Strep Throat', 'Otitis Media'],
            sideEffects: [
                { name: 'Rash', frequency: 'Common', severity: 'medium' },
                { name: 'Diarrhea', frequency: 'Common', severity: 'low' },
                { name: 'Anaphylaxis', frequency: 'Rare', severity: 'high' }
            ],
            contraindications: ['Penicillin Allergy']
        },
        alternatives: [
            { name: 'Azithromycin', reason: 'Penicillin allergy safe' },
            { name: 'Doxycycline', reason: 'Broader spectrum' }
        ]
    },
    {
        id: 'azithromycin',
        name: 'Azithromycin',
        description: 'A macrolide antibiotic used for respiratory and skin infections.',
        category: 'Antibiotic',
        chemicalFormula: 'C38H72N2O12',
        cid: '447043',
        pdbId: '4V7U', // Ribosome
        target: '50S Ribosomal Subunit',
        mechanism: {
            simple: 'Stops bacteria from making proteins needed for growth.',
            advanced: 'Binds to the 50S ribosomal subunit, inhibiting bacterial protein synthesis.',
            pathways: ['Translation', 'Protein synthesis']
        },
        clinical: {
            indications: ['Pneumonia', 'Chlamydia', 'Sinusitis'],
            sideEffects: [
                { name: 'GI Upset', frequency: 'Common', severity: 'low' },
                { name: 'QT Prolongation', frequency: 'Rare', severity: 'high' }
            ],
            contraindications: ['History of Cholestatic Jaundice']
        },
        alternatives: [
            { name: 'Clarithromycin', reason: 'Similar class' }
        ]
    },

    // --- MENTAL HEALTH ---
    {
        id: 'sertraline',
        name: 'Sertraline',
        description: 'An SSRI antidepressant used for depression and anxiety.',
        category: 'Antidepressant',
        chemicalFormula: 'C17H17Cl2N',
        cid: '68617',
        pdbId: '3GWU', // Serotonin Transporter
        target: 'Serotonin Transporter (SERT)',
        mechanism: {
            simple: 'Increases serotonin levels in the brain.',
            advanced: 'Selectively inhibits the reuptake of serotonin (5-HT) at the presynaptic neuronal membrane.',
            pathways: ['Serotoninergic signaling']
        },
        clinical: {
            indications: ['Major Depression', 'OCD', 'Panic Disorder'],
            sideEffects: [
                { name: 'Nausea', frequency: 'Common', severity: 'low' },
                { name: 'Insomnia', frequency: 'Common', severity: 'medium' },
                { name: 'Sexual Dysfunction', frequency: 'Common', severity: 'medium' }
            ],
            contraindications: ['MAOI usage']
        },
        alternatives: [
            { name: 'Fluoxetine', reason: 'Longer half-life' },
            { name: 'Escitalopram', reason: 'More selective' }
        ]
    },

    // --- GASTROINTESTINAL ---
    {
        id: 'omeprazole',
        name: 'Omeprazole',
        description: 'A proton pump inhibitor used for GERD and ulcers.',
        category: 'Proton Pump Inhibitor',
        chemicalFormula: 'C17H19N3O3S',
        cid: '4594',
        pdbId: '5YLU', // Proton Pump
        target: 'H+/K+ ATPase',
        mechanism: {
            simple: 'Reduces stomach acid production.',
            advanced: 'Irreversibly inhibits the H+/K+ ATPase enzyme system (proton pump) in gastric parietal cells.',
            pathways: ['Acid secretion']
        },
        clinical: {
            indications: ['GERD', 'Peptic Ulcer Disease'],
            sideEffects: [
                { name: 'Headache', frequency: 'Common', severity: 'low' },
                { name: 'B12 Deficiency', frequency: 'Rare (Long term)', severity: 'medium' }
            ],
            contraindications: ['Hypersensitivity']
        },
        alternatives: [
            { name: 'Famotidine', reason: 'H2 blocker (faster onset)' }
        ]
    }
];

export const getDrugById = (id: string) => drugs.find(d => d.id === id);

export const searchDrugs = (query: string) => {
    if (!query) return drugs;
    const q = query.toLowerCase();
    return drugs.filter(d =>
        d.name.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.target.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
    );
};

export const getCategories = () => {
    return Array.from(new Set(drugs.map(d => d.category))).sort();
};
