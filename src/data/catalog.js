export const CATALOG = [
  { type: 'sofa', label: 'Canapé', category: 'salon', width: 2.2, depth: 0.9, height: 0.78 },
  { type: 'armchair', label: 'Fauteuil', category: 'salon', width: 0.85, depth: 0.85, height: 0.78 },
  { type: 'table-coffee', label: 'Table basse', category: 'salon', width: 1.1, depth: 0.6, height: 0.38 },
  { type: 'table-dining', label: 'Table à manger', category: 'salon', width: 1.8, depth: 0.9, height: 0.75 },
  { type: 'chair', label: 'Chaise', category: 'salon', width: 0.45, depth: 0.5, height: 0.9 },
  { type: 'tv-stand', label: 'Meuble TV', category: 'salon', width: 1.6, depth: 0.4, height: 0.45 },
  { type: 'kitchen-run', label: 'Plan de travail', category: 'cuisine', width: 2.4, depth: 0.6, height: 0.9 },
  { type: 'fridge', label: 'Réfrigérateur', category: 'cuisine', width: 0.6, depth: 0.65, height: 1.85 },
  { type: 'bed-double', label: 'Lit double', category: 'chambre', width: 1.6, depth: 2.0, height: 0.55 },
  { type: 'bed-single', label: 'Lit simple', category: 'chambre', width: 0.9, depth: 2.0, height: 0.5 },
  { type: 'wardrobe', label: 'Armoire', category: 'chambre', width: 1.6, depth: 0.55, height: 2.1 },
  { type: 'desk', label: 'Bureau', category: 'chambre', width: 1.2, depth: 0.6, height: 0.75 },
  { type: 'bath', label: 'Baignoire', category: 'bain', width: 1.7, depth: 0.75, height: 0.55 },
  { type: 'shower', label: 'Douche', category: 'bain', width: 0.9, depth: 0.9, height: 2.0 },
  { type: 'toilet', label: 'WC', category: 'bain', width: 0.4, depth: 0.65, height: 0.8 },
  { type: 'sink', label: 'Lavabo', category: 'bain', width: 0.7, depth: 0.45, height: 0.85 },
  { type: 'plant', label: 'Plante', category: 'deco', width: 0.4, depth: 0.4, height: 1.1 },
];

export const CATALOG_MAP = Object.fromEntries(CATALOG.map((i) => [i.type, i]));

export const CATEGORY_LABEL = {
  salon: 'Salon / Séjour',
  cuisine: 'Cuisine',
  chambre: 'Chambre',
  bain: 'Salle de bains',
  deco: 'Décoration',
};
