# Maison TY GWENN – Visualiseur 3D interactif

Application web de visualisation 2D/3D des plans de la maison construite par **SAS Constructions TY GWENN** pour **M. TUDURI et Mme LE SOLLIEC**.

**Adresse** : 20 Impasse du Dranken, 56700 Hennebont

## Fonctionnalités

- **Modèle 3D interactif** des volumes (RDC + étage)
- **Mode Visite (Walkthrough)** : déplacement en première personne (WASD + souris)
- Sélection des pièces (clic 3D ou tableau)
- Tableau de surfaces complet
- Galerie des plans originaux (pages du PDF signé)
- Affichage / masquage de l’étage

## Surfaces du projet

| Niveau | Surface aménagée | Surface habitable | Garage |
|--------|------------------|-------------------|--------|
| RDC    | 76,38 m²         | 74,11 m²          | 28,28 m² |
| Étage  | 30,71 m²         | 30,71 m²          | — |
| **Total** | **107,09 m²** | **104,82 m²** | **28,28 m²** |

## Lancer en local

```bash
npm install
npm run dev
```

## Déploiement GitHub Pages

Le workflow Actions est déjà configuré.  
Dans **Settings → Pages**, choisissez **Source = GitHub Actions**.

URL attendue : https://neltud.github.io/maison-ty-gwenn-visualizer/

## Ajouter les images des plans

1. Extraire les pages du PDF en JPG (ou utiliser les fichiers déjà générés)
2. Placer `page-1.jpg` … `page-8.jpg` dans `public/plans/`
3. Mettre à jour `PlansGallery.jsx` pour pointer vers `/maison-ty-gwenn-visualizer/plans/page-X.jpg`

## Stack

- React 18 + Vite
- Three.js + React Three Fiber + Drei
- PointerLockControls pour le walkthrough

## Source

Plans signés TY GWENN – 26/06/2026 (perspectives) / 15/07/2026 (signatures)

---

Non contractuel – outil d’exploration des plans.
