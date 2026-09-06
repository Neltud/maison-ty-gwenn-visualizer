import { create } from 'zustand';
import { CATALOG_MAP } from './data/catalog.js';

let idCounter = 0;
const uid = (prefix = 'f') => `${prefix}_${++idCounter}_${Date.now().toString(36)}`;

/**
 * Mobilier initial = disposition dessinée par l’architecte sur le plan RDC 1/75.
 * Coordonnées en mètres, origine ≈ centre séjour / limite cuisine.
 * X+ = Est (garage) · Y+ = Sud (baies vitrées séjour)
 */
const INITIAL_FURNITURE = [
  // ——— Séjour (mobilier visible sur le plan) ———
  // Canapé le long de la baie sud
  { id: 'f_sofa1', type: 'sofa', x: -2.4, y: 3.6, rotation: 0, width: 2.2, depth: 0.9, height: 0.78 },
  // Fauteuil
  { id: 'f_armchair1', type: 'armchair', x: 0.2, y: 3.4, rotation: -0.5, width: 0.85, depth: 0.85, height: 0.78 },
  // Table basse
  { id: 'f_coffee', type: 'table-coffee', x: -1.4, y: 2.4, rotation: 0, width: 1.1, depth: 0.6, height: 0.38 },
  // Meuble TV face au canapé
  { id: 'f_tv', type: 'tv-stand', x: -1.5, y: 0.4, rotation: 0, width: 1.6, depth: 0.4, height: 0.45 },

  // ——— Coin repas (table dessinée sur le plan) ———
  { id: 'f_dining', type: 'table-dining', x: 1.4, y: 2.6, rotation: 0, width: 1.8, depth: 0.9, height: 0.75 },
  { id: 'f_chair1', type: 'chair', x: 1.4, y: 1.85, rotation: 0, width: 0.45, depth: 0.5, height: 0.9 },
  { id: 'f_chair2', type: 'chair', x: 1.4, y: 3.35, rotation: Math.PI, width: 0.45, depth: 0.5, height: 0.9 },
  { id: 'f_chair3', type: 'chair', x: 0.55, y: 2.6, rotation: -Math.PI / 2, width: 0.45, depth: 0.5, height: 0.9 },
  { id: 'f_chair4', type: 'chair', x: 2.25, y: 2.6, rotation: Math.PI / 2, width: 0.45, depth: 0.5, height: 0.9 },

  // ——— Cuisine (éléments dessinés) ———
  { id: 'f_kitchen', type: 'kitchen-run', x: 4.0, y: 2.0, rotation: Math.PI / 2, width: 2.8, depth: 0.6, height: 0.9 },
  { id: 'f_fridge', type: 'fridge', x: 4.8, y: -0.3, rotation: 0, width: 0.6, depth: 0.65, height: 1.85 },

  // ——— Chambre 1 (lit dessiné sur le plan) ———
  { id: 'f_bed1', type: 'bed-double', x: -5.0, y: -1.6, rotation: Math.PI / 2, width: 1.6, depth: 2.0, height: 0.55 },
  { id: 'f_wardrobe', type: 'wardrobe', x: -5.6, y: -3.2, rotation: 0, width: 1.6, depth: 0.55, height: 2.1 },

  // ——— Déco légère ———
  { id: 'f_plant1', type: 'plant', x: 0.6, y: 4.0, rotation: 0, width: 0.4, depth: 0.4, height: 1.1 },
];

export const useStudio = create((set, get) => ({
  furniture: INITIAL_FURNITURE,
  selectedId: null,
  tool: 'select',
  furnishType: 'sofa',
  showEtage: true,
  walkthrough: false,
  intention: 'plan_architecte',
  past: [],
  future: [],

  setTool: (tool) => set({ tool }),
  setFurnishType: (type) => set({ furnishType: type, tool: 'furnish' }),
  select: (id) => set({ selectedId: id }),
  toggleEtage: () => set((s) => ({ showEtage: !s.showEtage })),
  setWalkthrough: (v) => set({ walkthrough: v }),

  placeFurniture: (x, y) => {
    const { furnishType } = get();
    const item = CATALOG_MAP[furnishType];
    if (!item) return;
    const id = uid();
    const newItem = {
      id,
      type: furnishType,
      x,
      y,
      rotation: 0,
      width: item.width,
      depth: item.depth,
      height: item.height,
    };
    set((s) => ({
      furniture: [...s.furniture, newItem],
      selectedId: id,
      tool: 'select',
      past: [...s.past.slice(-40), s.furniture],
      future: [],
    }));
  },

  moveSelected: (x, y) => {
    const { selectedId } = get();
    if (!selectedId) return;
    set((s) => ({
      furniture: s.furniture.map((f) => (f.id === selectedId ? { ...f, x, y } : f)),
    }));
  },

  rotateSelected: (delta = Math.PI / 2) => {
    const { selectedId } = get();
    if (!selectedId) return;
    set((s) => ({
      furniture: s.furniture.map((f) =>
        f.id === selectedId ? { ...f, rotation: f.rotation + delta } : f
      ),
    }));
  },

  deleteSelected: () => {
    const { selectedId } = get();
    if (!selectedId) return;
    set((s) => ({
      furniture: s.furniture.filter((f) => f.id !== selectedId),
      selectedId: null,
      past: [...s.past.slice(-40), s.furniture],
      future: [],
    }));
  },

  undo: () => {
    const { past, furniture, future } = get();
    if (past.length === 0) return;
    const prev = past[past.length - 1];
    set({
      furniture: prev,
      past: past.slice(0, -1),
      future: [furniture, ...future].slice(0, 40),
      selectedId: null,
    });
  },

  applyIntention: (key) => {
    const layouts = {
      // Disposition exacte du plan d’architecte
      plan_architecte: [
        { type: 'sofa', x: -2.4, y: 3.6, rotation: 0 },
        { type: 'armchair', x: 0.2, y: 3.4, rotation: -0.5 },
        { type: 'table-coffee', x: -1.4, y: 2.4, rotation: 0 },
        { type: 'tv-stand', x: -1.5, y: 0.4, rotation: 0 },
        { type: 'table-dining', x: 1.4, y: 2.6, rotation: 0 },
        { type: 'chair', x: 1.4, y: 1.85, rotation: 0 },
        { type: 'chair', x: 1.4, y: 3.35, rotation: Math.PI },
        { type: 'chair', x: 0.55, y: 2.6, rotation: -Math.PI / 2 },
        { type: 'chair', x: 2.25, y: 2.6, rotation: Math.PI / 2 },
        { type: 'kitchen-run', x: 4.0, y: 2.0, rotation: Math.PI / 2 },
        { type: 'fridge', x: 4.8, y: -0.3, rotation: 0 },
        { type: 'bed-double', x: -5.0, y: -1.6, rotation: Math.PI / 2 },
        { type: 'wardrobe', x: -5.6, y: -3.2, rotation: 0 },
        { type: 'plant', x: 0.6, y: 4.0, rotation: 0 },
      ],

      sejour_convivial: [
        { type: 'sofa', x: -2.4, y: 3.6, rotation: 0 },
        { type: 'sofa', x: 0.4, y: 3.5, rotation: -0.25 },
        { type: 'table-coffee', x: -1.2, y: 2.3, rotation: 0 },
        { type: 'armchair', x: -3.8, y: 2.0, rotation: Math.PI / 2 },
        { type: 'tv-stand', x: -1.4, y: 0.3, rotation: 0 },
        { type: 'plant', x: 1.0, y: 4.1, rotation: 0 },
      ],
      sejour_soiree: [
        { type: 'sofa', x: -2.6, y: 3.4, rotation: 0.15 },
        { type: 'sofa', x: 0.3, y: 3.5, rotation: -0.3 },
        { type: 'armchair', x: -3.9, y: 1.6, rotation: 1.0 },
        { type: 'armchair', x: 1.5, y: 1.8, rotation: -1.0 },
        { type: 'table-coffee', x: -1.3, y: 2.2, rotation: 0 },
        { type: 'plant', x: 2.0, y: 4.0, rotation: 0 },
      ],
      cuisine_fonctionnelle: [
        { type: 'kitchen-run', x: 4.0, y: 2.0, rotation: Math.PI / 2 },
        { type: 'fridge', x: 4.8, y: -0.3, rotation: 0 },
        { type: 'table-dining', x: 1.4, y: 2.6, rotation: 0 },
        { type: 'chair', x: 1.4, y: 1.85, rotation: 0 },
        { type: 'chair', x: 1.4, y: 3.35, rotation: Math.PI },
        { type: 'chair', x: 0.55, y: 2.6, rotation: -Math.PI / 2 },
        { type: 'chair', x: 2.25, y: 2.6, rotation: Math.PI / 2 },
      ],
      cuisine_ilot: [
        { type: 'kitchen-run', x: 4.1, y: 2.1, rotation: Math.PI / 2 },
        { type: 'fridge', x: 4.9, y: -0.2, rotation: 0 },
        { type: 'table-dining', x: 1.6, y: 0.8, rotation: 0 },
        { type: 'chair', x: 0.9, y: 0.8, rotation: -Math.PI / 2 },
        { type: 'chair', x: 2.3, y: 0.8, rotation: Math.PI / 2 },
        { type: 'plant', x: 2.8, y: 3.5, rotation: 0 },
      ],
      chambre_parentale: [
        { type: 'bed-double', x: -5.0, y: -1.6, rotation: Math.PI / 2 },
        { type: 'wardrobe', x: -5.7, y: -3.2, rotation: 0 },
        { type: 'desk', x: -3.2, y: -3.0, rotation: 0 },
        { type: 'armchair', x: -3.4, y: -0.4, rotation: -0.7 },
        { type: 'plant', x: -5.5, y: 0.2, rotation: 0 },
      ],
      chambre_zen: [
        { type: 'bed-double', x: -4.9, y: -1.5, rotation: Math.PI / 2 },
        { type: 'wardrobe', x: -5.6, y: -3.1, rotation: 0 },
        { type: 'plant', x: -3.2, y: -3.0, rotation: 0 },
        { type: 'plant', x: -5.4, y: 0.3, rotation: 0 },
      ],
      chambres_enfants: [
        { type: 'bed-single', x: -3.0, y: 0.4, rotation: 0 },
        { type: 'bed-single', x: 0.5, y: 0.4, rotation: 0 },
        { type: 'desk', x: -3.0, y: 2.1, rotation: 0 },
        { type: 'desk', x: 0.5, y: 2.1, rotation: 0 },
        { type: 'wardrobe', x: -1.3, y: -1.3, rotation: 0 },
        { type: 'plant', x: 1.6, y: 2.3, rotation: 0 },
      ],
      chambres_ados: [
        { type: 'bed-single', x: -3.1, y: 0.5, rotation: 0 },
        { type: 'bed-single', x: 0.6, y: 0.5, rotation: 0 },
        { type: 'desk', x: -3.1, y: 2.2, rotation: 0 },
        { type: 'desk', x: 0.6, y: 2.2, rotation: 0 },
        { type: 'wardrobe', x: -1.4, y: -1.2, rotation: 0 },
        { type: 'armchair', x: 1.5, y: -0.7, rotation: -0.8 },
      ],
      mezzanine_lecture: [
        { type: 'armchair', x: -1.1, y: 1.8, rotation: 0.3 },
        { type: 'armchair', x: 0.7, y: 1.7, rotation: -0.4 },
        { type: 'table-coffee', x: -0.2, y: 0.7, rotation: 0 },
        { type: 'plant', x: 1.4, y: 2.4, rotation: 0 },
        { type: 'plant', x: -2.1, y: 2.2, rotation: 0 },
      ],
      mezzanine_bureau: [
        { type: 'desk', x: -0.9, y: 1.5, rotation: 0 },
        { type: 'chair', x: -0.9, y: 0.8, rotation: 0 },
        { type: 'plant', x: 1.1, y: 2.1, rotation: 0 },
        { type: 'armchair', x: 1.3, y: 0.6, rotation: -0.7 },
      ],
      open_space_complet: [
        { type: 'sofa', x: -2.4, y: 3.6, rotation: 0 },
        { type: 'table-coffee', x: -1.4, y: 2.4, rotation: 0 },
        { type: 'tv-stand', x: -1.5, y: 0.4, rotation: 0 },
        { type: 'table-dining', x: 1.4, y: 2.6, rotation: 0 },
        { type: 'chair', x: 1.4, y: 1.85, rotation: 0 },
        { type: 'chair', x: 1.4, y: 3.35, rotation: Math.PI },
        { type: 'kitchen-run', x: 4.0, y: 2.0, rotation: Math.PI / 2 },
        { type: 'fridge', x: 4.8, y: -0.3, rotation: 0 },
        { type: 'bed-double', x: -5.0, y: -1.6, rotation: Math.PI / 2 },
        { type: 'wardrobe', x: -5.6, y: -3.2, rotation: 0 },
        { type: 'plant', x: 0.6, y: 4.0, rotation: 0 },
      ],
      minimaliste: [
        { type: 'sofa', x: -2.2, y: 3.4, rotation: 0 },
        { type: 'table-coffee', x: -2.2, y: 2.3, rotation: 0 },
        { type: 'table-dining', x: 1.5, y: 2.5, rotation: 0 },
        { type: 'chair', x: 1.5, y: 1.8, rotation: 0 },
        { type: 'chair', x: 1.5, y: 3.2, rotation: Math.PI },
        { type: 'kitchen-run', x: 4.1, y: 1.9, rotation: Math.PI / 2 },
        { type: 'bed-double', x: -4.9, y: -1.5, rotation: Math.PI / 2 },
        { type: 'plant', x: 0.5, y: 3.9, rotation: 0 },
      ],
    };

    const layout = layouts[key];
    if (!layout) return;

    const items = layout.map((l) => {
      const cat = CATALOG_MAP[l.type];
      return {
        id: uid(),
        type: l.type,
        x: l.x,
        y: l.y,
        rotation: l.rotation || 0,
        width: cat.width,
        depth: cat.depth,
        height: cat.height,
      };
    });

    set((s) => ({
      furniture: items,
      intention: key,
      selectedId: null,
      past: [...s.past.slice(-40), s.furniture],
      future: [],
    }));
  },
}));
