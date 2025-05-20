# Nuxt 3 + Strapi 5 Music CRUD

Une application web permettant de gérer un catalogue de musiques, construite avec Nuxt 3 (frontend) et Strapi 5 (backend headless CMS).

## Fonctionnalités

- Création, édition et suppression de musiques
- Upload de covers (images) et de fichiers audio
- Visualisation de la liste des musiques
- Détail d'une musique (cover, titre, artiste, fichier audio)
- Interface utilisateur moderne et responsive

## Prérequis

- Node.js >= 18.x
- npm ou yarn
- [Strapi 5](https://strapi.io/)
- [Nuxt 3](https://nuxt.com/)

## Installation

### 1. Cloner le dépôt

```bash
git clone <url-du-repo>
cd project
```

### 2. Installer les dépendances

#### Backend (Strapi)

```bash
cd backend
npm install
```

#### Frontend (Nuxt 3)

```bash
cd frontend
npm install
```

### 3. Configuration

- Créez un fichier `.env` dans chaque dossier (`backend` et `frontend`) selon les exemples fournis.
- Configurez la connexion à la base de données pour Strapi (SQLite par défaut ou autre).

### 4. Lancer les serveurs

#### Backend (Strapi)

```bash
cd backend
npm run develop
```

#### Frontend (Nuxt 3)

```bash
cd frontend
npm run dev
```

L'application Nuxt sera accessible sur `http://localhost:3000` et l'admin Strapi sur `http://localhost:1337/admin`.

## Structure du projet

```
project/
│
├── backend/      # Strapi 5 (API, CMS)
│
└── frontend/     # Nuxt 3 (interface utilisateur)
```

## Technologies utilisées

- [Nuxt 3](https://nuxt.com/) — Framework Vue.js moderne
- [Strapi 5](https://strapi.io/) — Headless CMS Node.js
- [Vue 3](https://vuejs.org/)
- [Pinia](https://pinia.vuejs.org/) — Gestion d'état
- [Axios](https://axios-http.com/) — Requêtes HTTP

## Déploiement

- Vous pouvez déployer le frontend sur Vercel, Netlify, etc.
- Le backend Strapi peut être déployé sur Render, Heroku, ou un VPS.

## Liens utiles

- [Documentation Nuxt 3](https://nuxt.com/docs)
- [Documentation Strapi](https://docs.strapi.io/)
- [Nuxt Content](https://content.nuxtjs.org/)

## Auteur

Robin Poirot

---

> Ce projet a été réalisé dans le cadre du M2 MDS.
