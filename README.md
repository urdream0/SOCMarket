# 🛒 SOCMarket

**SOCMarket** est une application web fullstack développée dans le cadre du BTS SIO SLAM.  
Elle permet aux employés de la Banque Socredo d’échanger ou vendre du matériel, notamment informatique, via une plateforme interne sécurisée.

---

## 📁 Structure du projet

```
SOCMarket/
├── backend/    → API Spring Boot (Java 17 + JWT + PostgreSQL)
├── frontend/   → Next.js (React + Tailwind CSS + TypeScript)
└── README.md   → Ce fichier
```

---

## ⚙️ Lancer le projet

### ▶️ Backend (Spring Boot)
```bash
cd backend
./gradlew bootRun
```

### 💻 Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```

---

## 🛠️ Stack technique

- **Backend** : Java 17, Spring Boot 3.5.1, Gradle, Spring Security, JWT
- **Frontend** : React 18, Next.js, Tailwind CSS, TypeScript
- **Base de données** : PostgreSQL (hébergée sur Supabase)
- **Déploiement** : Railway (backend)
- **Versioning** : Git + GitHub

---

## 🔐 Authentification

L’authentification est basée sur un système **JWT sécurisé**, avec token stocké dans un cookie.  
Les utilisateurs peuvent s’authentifier, gérer leurs produits, et accéder à un tableau de bord.

---

## 🧪 Fonctionnalités réalisées

- Création/connexion d’un compte utilisateur
- Ajout de produits avec image, prix, description, catégorie
- Modification/suppression de ses propres produits
- Affichage des produits sous forme de cartes (Next.js)
- Détail d’un produit + page individuelle
- Dashboard utilisateur

---

## 📄 Documentation

La documentation technique est incluse dans le backend :
- Fichier `README.md`
- Arborescence API (routes, méthodes)
- Schéma de la base de données
- Fichier `.env.local` ignoré (infos Supabase confidentielles)

---

## 📌 Auteur

Projet réalisé par **TEMATAUA Toriki**, étudiant en 2ᵉ année de BTS SIO SLAM.
