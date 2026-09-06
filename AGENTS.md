# Maison TY GWENN – Studio d’aménagement 3D

**Source de vérité** pour le sandbox Grok Build de ce projet.

## Produit

Visualiseur + studio d’aménagement des plans signés **SAS Constructions TY GWENN**
pour **M. TUDURI et Mme LE SOLLIEC**.

- Adresse : 20 Impasse du Dranken, 56700 Hennebont
- Surfaces : 104,82 m² habitables + 28,28 m² garage
- Plans signés : 26/06/2026 (perspectives) / 15/07/2026

## Stack actuelle (GitHub Pages)

- Vite + React 18
- React Three Fiber + Drei
- Zustand
- Matériaux procéduraux (pas de textures lourdes)

## Fonctionnalités livrées

- Modèle 3D RDC + étage calé sur les plans
- 12 intentions d’agencement optimisé
- Catalogue mobilier (salon, cuisine, chambre, bain, déco)
- Placement / rotation (R) / suppression / Undo
- Mode Visite (walkthrough première personne)
- Tableau de surfaces

## Pour un vrai sandbox Grok natif

1. Créer un nouveau projet dans **Grok Build**.
2. Demander : « Importe le studio d’aménagement de maison TY GWENN avec les plans, les 12 intentions et le catalogue mobilier. »
3. Coller ou référencer ce dépôt.
4. Le framework TanStack Start + `.grok/` + `startup.sh` seront générés automatiquement par la plateforme.

## Auth / Database

**OFF** par défaut (localStorage / zustand uniquement). Pas de comptes nécessaires.

## Qualité

- `npm run build` doit passer.
- Preview sur `0.0.0.0:8080` pour Grok.
- Pas de textures lourdes au démarrage.
