# Maison TY GWENN – Visualiseur 3D interactif

Application web de visualisation 2D/3D des plans de la maison construite par **SAS Constructions TY GWENN** pour **M. TUDURI et Mme LE SOLLIEC** (20 Impasse du Dranken, 56700 Hennebont).

## Fonctionnalités

- **Modèle 3D interactif** des volumes (RDC + étage)
- Sélection des pièces (clic dans la scène 3D ou dans le tableau)
- Tableau de surfaces complet (habitable / aménagée / garage)
- Affichage / masquage de l’étage
- Navigation libre (orbit, zoom, pan)

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

Ouvrir http://localhost:5173

## Build & déploiement GitHub Pages

```bash
npm run build
# ou
npm run deploy   # nécessite gh-pages
```

Configurer ensuite GitHub Pages sur la branche `gh-pages` (ou `main` / dossier `/docs` selon votre choix).

## Stack

- React 18
- Vite
- Three.js + React Three Fiber + Drei

## Source des plans

Plans signés TY GWENN – Perspectives & tableaux de surfaces (document fourni le 26/06/2026).

---

© Visualiseur créé pour exploration des plans – non contractuel.
