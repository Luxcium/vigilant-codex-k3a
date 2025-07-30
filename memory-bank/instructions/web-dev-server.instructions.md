---
applyTo: 'web/**/*.{ts,tsx,js,jsx,json}'
description: 'Guide to launch the local Next.js development server'
---

# Copilot Instruction File: Start Web Dev Server

## 🎯 Objectif

Lancer le serveur local de développement dans le répertoire `web/`.

## 🚦 Directive à exécuter

1. Ouvre un terminal intégré.
2. Navigue dans le dossier `web/` du projet.
3. Exécute la commande `pnpm dev`.
4. Affiche le port (`http://localhost:3000` par défaut).
5. Laisse les logs ouverts dans le panneau terminal.

## 📦 Contexte attendu

- Le fichier `package.json` dans `web/` contient un script `"dev"`.
- L’environnement Node.js est configuré.
- Le serveur Next.js démarre sans erreur.

## Verification

- `markdownlint --strict`
- `scripts/verify-all.sh`
