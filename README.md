# Maison TY GWENN – Studio d’aménagement 3D

Visualiseur + studio d’aménagement interactif des plans **TY GWENN**  
**20 Impasse du Dranken, 56700 Hennebont** · M. TUDURI & Mme LE SOLLIEC

## Fonctionnalités

- Modèle 3D (RDC + étage) calé sur les plans signés
- **12 intentions** d’agencement optimisé
- Catalogue mobilier complet
- Placement / rotation (**R**) / suppression / Undo
- Mode Visite (walkthrough)
- Matériaux procéduraux (chargement optimisé)
- Prêt pour import dans un **sandbox Grok natif**

## Surfaces

| Niveau | Habitable | Garage |
|--------|-----------|--------|
| RDC    | 74,11 m²  | 28,28 m² |
| Étage  | 30,71 m²  | — |
| **Total** | **104,82 m²** | **28,28 m²** |

## Lancer (GitHub Pages / local)

```bash
npm install
npm run dev
```

## Sandbox Grok natif

Voir `AGENTS.md` et `AGENTS.project.md`.

Pour un vrai sandbox Grok (TanStack Start + preview live + Vercel) :
1. Ouvrir **Grok Build**
2. Créer un nouveau projet
3. Demander d’importer ce dépôt / ce studio TY GWENN

## Déploiement GitHub Pages

Settings → Pages → Source = **GitHub Actions**  
https://neltud.github.io/maison-ty-gwenn-visualizer/

## Source

Plans signés SAS Constructions TY GWENN – 26/06/2026 / 15/07/2026  
Inspiré de [blend-glade-wolf-grove](https://github.com/Neltud/blend-glade-wolf-grove) (export Grok `34dde4c`)
