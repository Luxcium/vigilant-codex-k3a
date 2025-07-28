---
applyTo: 'web/**/*.{ts,tsx,js,jsx,json}'
description: 'Guide to build and launch the Next.js production server'
---

# Copilot Instruction File: Build and Start Web Production Server

## 🎯 Objectif

Construire l'application Next.js puis démarrer le serveur de production accessible sur le réseau local.

## 🚦 Directive à exécuter

1. Ouvre un terminal intégré.
2. Navigue dans le dossier `web/` du projet.
3. Exécute `pnpm build`.
4. Démarre le serveur avec `pnpm start -- -H 0.0.0.0`.
5. Note l'adresse affichée (ex. `http://192.168.x.x:3000`).

## 📦 Contexte attendu

- `web/package.json` contient les scripts `build` et `start`.
- Les dépendances sont installées.
- Le port 3000 est accessible sur le LAN.

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
