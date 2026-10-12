// Helper to generate realistic data based on category
const generateProductData = (name, categoryId) => {
  const baseData = {
    name: name,
    fullName: name,
    description: `High-performance ${categoryId} engineered for advanced industrial applications, offering superior stability and efficiency.`,
    purity: '≥ 99.5%',
    appearance: 'Clear to pale yellow liquid',
    solubility: 'Water soluble',
    pH: '6.0 - 8.0',
    applications: 'Industrial formulations, specialized coatings, and personal care products.',
    storage: 'Store in a cool, dry place away from direct sunlight.',
    usage: '1% - 5% depending on formulation.',
    packaging: '200kg HDPE drums or 1000kg IBCs.',
    benefits: ['High Performance', 'Stable Formulation', 'Eco-Friendly']
  };

  if (name.includes('CDEA')) {
    return {
      ...baseData,
      description: 'Coco Diethanolamide (CDEA) is a nonionic surfactant derived from coconut fatty acids. It is widely used as a foam booster, viscosity enhancer, and foam stabilizer.',
      purity: '≥ 99.8%',
      appearance: 'Viscous yellow liquid',
      pH: '8.5 - 10.5',
      applications: 'Shampoos, liquid soaps, dishwashing liquids, and industrial cleaning formulations.',
      benefits: ['Foam Booster', 'Thickening Agent', 'Water Soluble', 'Stable Formulation', 'High Performance']
    };
  }
  
  if (name.includes('CMEA')) {
    return {
      ...baseData,
      description: 'CMEA is a premium nonionic surfactant used primarily as a thickener and foam stabilizer in opaque formulations.',
      appearance: 'Off-white flakes or pearls',
      solubility: 'Dispersible in water',
      benefits: ['Viscosity Builder', 'Foam Stabilizer', 'Conditioning Agent']
    };
  }

  if (categoryId === 'surfactants') {
    baseData.benefits = ['Excellent Wetting', 'Foam Booster', 'Surface Tension Reduction'];
    baseData.applications = 'Detergents, personal care, agrochemicals, and textile processing.';
  } else if (categoryId === 'esters') {
    baseData.appearance = 'Viscous liquid or soft waxy solid';
    baseData.benefits = ['Emollient', 'Emulsifier', 'Lubricity Enhancer'];
    baseData.applications = 'Cosmetics, food processing, and specialized industrial lubricants.';
  } else if (categoryId === 'fatty-amines') {
    baseData.pH = '9.0 - 11.0';
    baseData.benefits = ['Corrosion Inhibition', 'Flotation Agent', 'Reactive Intermediate'];
  }

  return baseData;
};

const rawCategories = [
  {
    id: 'surfactants',
    name: 'Surfactants',
    description: 'High-performance surface-active agents for industrial and consumer applications.',
    products: [
      'CMEA (Coco Mono Ethanol Amide)', 'CDEA (Coco Di Ethanol Amide)', 'COB (Coco Betain)', 
      'CAPB (Coco Amido Propyl Betain)', 'LAPB (Laryl Amido Propyl Betain)', 'BKC 50, 80 (Benzalkonium Chloride)',
      'CTAC (Cetyl Tri Methyl Ammonium Chloride)', 'Polyquat 7', 'Esterquats', 'CABS (Calcium Alkylbenzene Sulphonate)',
      'DOSS (Dioctylsulphosuccinate)', 'Dodecyl Trimethyl Ammonium Chloride', 'Coconut Trimethyl Ammonium Chloride',
      'Hexadecyl Trimethyl Ammonium Chloride', 'Octadecyl Trimethyl Ammonium Chloride', 
      'Dihydrogenated Dimethyl Ammonium Chloride', 'Distearyl Dimethyl Ammonium Chloride', 'Dicoco Dimethyl Ammonium Chloride'
    ]
  },
  {
    id: 'esters',
    name: 'Esters',
    description: 'Versatile esters providing emolliency, emulsification, and lubrication.',
    products: [
      'Glycerol Mono Stearate (SE/NSE)', 'Glycerol Mono Oleate', 'Glycerol Mono Laurate', 'Glycerol Tri Oleate',
      'Sorbitan Mono Laurate (SML)', 'Sorbitan Mono Oleate (SMO)', 'Sorbitan Mono Palmitate (SMP)',
      'Sorbitan Mono Stearate (SMS)', 'Sorbitan Tri Oleate (STO)', 'Sorbitan Tri Stearate (STS)',
      'Ethylene Glycol Mono Stearate (EGMS)', 'Ethylene Glycol Di Stearate (EGDS)'
    ]
  },
  {
    id: 'ethoxylation',
    name: 'Ethoxylation',
    description: 'Premium ethoxylates for enhanced solubility and performance.',
    products: [
      'Fatty Alcohol Ethoxylates', 'Fatty Acid Ethoxylates', 'Fatty Amine Ethoxylates', 'Glycerine Ethoxylates',
      'Card Phenol Ethoxylates', 'Styrenated Phenol Ethoxylates', 'Nonyl Phenol Ethoxylates', 'Castor Oil Ethoxylates',
      'HCO Ethoxylates', 'Polysorbates 20, 60, 80, 85'
    ]
  },
  {
    id: 'fatty-amines',
    name: 'Fatty Amines & Diamines',
    description: 'Essential building blocks for advanced chemical synthesis.',
    products: [
      'Tallow Amine', 'Oleyl Amine', 'Stearyl Amine', 'Lauryl Amine', 'Coco Amine',
      'Di Tallow Amine', 'Di Oleyl Amine', 'Di Stearyl Amine', 'Di Coco Amine', 'Di Lauryl Amine',
      'Tallow Diamine', 'Oleyl Diamine', 'Coco Diamine', 'Lauryl Diamine', 'Stearyl Diamine'
    ]
  },
  {
    id: 'sulphonation',
    name: 'Sulphonation & Phosphites',
    description: 'Stabilizers and performance enhancers for polymers and lubricants.',
    products: [
      'TNPP (Tris Nonyl Phenyl Phosphite)', 'TPP (Tris Phenyl Phosphite)', 'DPDP (Di Phenyl Iso Decyl Phosphite)',
      'EHDPP (Ethyl Hexyl Di Phenyl Phosphite)', 'TDP (Tri Iso Decyl Phosphite)', 'TTDP (Tris Tri Decyl Phosphite)'
    ]
  },
  {
    id: 'specialty',
    name: 'Specialty Chemicals',
    description: 'Advanced custom formulations including ESBO and Imidazolines.',
    products: [
      'ESBO (Epoxydised Soyabean Oil)',
      'Hydroxyethyl Imidazolines',
      'Aminoethyl Imidazolines',
      'Amidoethyl Imidazolines'
    ]
  }
];

export const productCategories = rawCategories.map(cat => ({
  ...cat,
  products: cat.products.map(p => {
    let shortName = p;
    let fullName = p;
    if (p.includes('(') && p.includes(')')) {
      shortName = p.split('(')[0].trim();
      fullName = p.match(/\(([^)]+)\)/)[1].trim();
    }
    
    const enrichedData = generateProductData(p, cat.id);
    return {
      ...enrichedData,
      name: shortName,
      fullName: fullName !== shortName ? fullName : ''
    };
  })
}));
