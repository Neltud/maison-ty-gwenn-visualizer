export const surfaces = {
  rdc: {
    title: 'Rez-de-chaussée',
    totalAmenagee: 76.38,
    totalHabitable: 74.11,
    totalGarage: 28.28,
    rooms: [
      { id: 'cuisine', name: 'Cuisine', amenagee: 13.22, habitable: 13.22, color: '#f59e0b' },
      { id: 'sejour', name: 'Séjour', amenagee: 34.86, habitable: 32.59, color: '#3b82f6' },
      { id: 'entree', name: 'Entrée', amenagee: 6.85, habitable: 6.85, color: '#8b5cf6' },
      { id: 'chambre1', name: 'Chambre 1', amenagee: 15.88, habitable: 15.88, color: '#10b981' },
      { id: 'bains1', name: 'Salle de bains 1', amenagee: 3.91, habitable: 3.91, color: '#06b6d4' },
      { id: 'wc1', name: 'WC 1', amenagee: 1.66, habitable: 1.66, color: '#64748b' },
      { id: 'cellier', name: 'Cellier', amenagee: 0, habitable: 0, garage: 4.74, color: '#78716c' },
      { id: 'garage', name: 'Garage', amenagee: 0, habitable: 0, garage: 23.54, color: '#57534e' },
    ],
  },
  etage: {
    title: 'Étage',
    totalAmenagee: 30.71,
    totalHabitable: 30.71,
    rooms: [
      { id: 'chambre2', name: 'Chambre 2', amenagee: 9.44, habitable: 9.44, color: '#10b981' },
      { id: 'chambre3', name: 'Chambre 3', amenagee: 9.41, habitable: 9.41, color: '#22c55e' },
      { id: 'mezzanine', name: 'Mezzanine', amenagee: 6.54, habitable: 6.54, color: '#a855f7' },
      { id: 'bains2', name: 'Salle de bains 2', amenagee: 3.81, habitable: 3.81, color: '#06b6d4' },
      { id: 'wc2', name: 'WC 2', amenagee: 1.51, habitable: 1.51, color: '#64748b' },
    ],
  },
  projet: {
    totalAmenagee: 107.09,
    totalHabitable: 104.82,
    totalGarage: 28.28,
  },
};

// Dimensions en mètres (approximées des plans 1/75)
export const HOUSE = {
  length: 14.9,
  width: 10.2,
  heightRdc: 2.7,
  heightEtage: 2.5,
};
