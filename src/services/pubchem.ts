// PubChem PUG REST API Base URL
const REST_BASE = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug';
const VIEW_BASE = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug_view/data/compound';

export interface PubChemResult {
    cid: number;
    name: string;
}

export interface PubChemDetailedData {
    cid: string;
    name: string;
    formula: string;
    weight: string;
    description: string;
    mechanism?: string;
    indications?: string;
    pharmacology?: string;
}

// Search for compounds by name
export const searchPubChem = async (query: string): Promise<PubChemResult[]> => {
    if (!query) return [];

    try {
        // 1. Search for CIDs by name
        const response = await fetch(`${REST_BASE}/compound/name/${encodeURIComponent(query)}/cids/JSON`);
        if (!response.ok) return [];

        const data = await response.json();
        const cids = data.IdentifierList?.CID || [];

        if (cids.length === 0) return [];

        // Limit to top 5 results to avoid massive payload
        const topCids = cids.slice(0, 5);

        // 2. Get names/synonyms for these CIDs to display nicely
        // We'll use the "Title" property which is usually the common name
        const detailsUrl = `${REST_BASE}/compound/cid/${topCids.join(',')}/property/Title/JSON`;
        const detailsRes = await fetch(detailsUrl);
        const detailsData = await detailsRes.json();

        return detailsData.PropertyTable?.Properties.map((prop: any) => ({
            cid: prop.CID,
            name: prop.Title
        })) || [];

    } catch (err) {
        console.error("PubChem Search Error:", err);
        return [];
    }
};

// Get full details for a specific CID
export const getPubChemDetails = async (cid: string): Promise<PubChemDetailedData | null> => {
    try {
        // 1. Get Basic Properties (Formula, Weight)
        const propsUrl = `${REST_BASE}/compound/cid/${cid}/property/MolecularFormula,MolecularWeight,Title,IUPACName/JSON`;
        const propsRes = await fetch(propsUrl);
        const propsData = await propsRes.json();
        const props = propsData.PropertyTable?.Properties[0];

        if (!props) return null;

        // 2. Get Validated Data (Description, Mechanism, etc.) from PUG View
        // This is a large hierarchical JSON
        const viewUrl = `${VIEW_BASE}/${cid}/JSON`;
        const viewRes = await fetch(viewUrl);
        const viewData = await viewRes.json();

        const record = viewData.Record;

        // Helper to find specific sections in the hierarchical data
        const findSection = (sections: any[], heading: string): any => {
            if (!sections) return null;
            for (const sec of sections) {
                if (sec.TOCHeading === heading) return sec;
                if (sec.Section) {
                    const found = findSection(sec.Section, heading);
                    if (found) return found;
                }
            }
            return null;
        };

        // Extract Mechanism of Action
        const bioSection = findSection(record.Section, "Pharmacology and Biochemistry");
        let mechanism = "Mechanism of action data not available in structured format.";
        let pharmacology = "";

        if (bioSection) {
            const mechSection = findSection(bioSection.Section, "Mechanism of Action");
            if (mechSection && mechSection.Information) {
                mechanism = mechSection.Information[0].Value.StringWithMarkup?.[0]?.String || mechanism;
            }
        }

        // Extract Description (usually in "Names and Identifiers" -> "Citations" or top level)
        // Often "Record Description" is not directly there, we look for physical description or use IUPAC if missing
        let description = props.Title; // Fallback
        const identSection = findSection(record.Section, "Names and Identifiers");
        if (identSection) {
            const descSection = findSection(identSection.Section, "Record Description");
            if (descSection && descSection.Information) {
                description = descSection.Information[0].Value.StringWithMarkup?.[0]?.String || description;
            }
        }

        // Extract Clinical Indications (Use/Manufacturing -> Uses)
        let indications = "Specific indication data pending curation.";
        const useSection = findSection(record.Section, "Use and Manufacturing");
        if (useSection) {
            const uses = findSection(useSection.Section, "Uses");
            if (uses && uses.Information) {
                indications = uses.Information[0].Value.StringWithMarkup?.[0]?.String || indications;
            }
        }

        return {
            cid: props.CID.toString(),
            name: props.Title,
            formula: props.MolecularFormula,
            weight: props.MolecularWeight,
            description: description,
            mechanism: mechanism,
            indications: indications,
            pharmacology: pharmacology
        };

    } catch (err) {
        console.error("PubChem Details Error:", err);
        return null;
    }
};
