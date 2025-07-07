# 📋 Todo List App - Architecture N-Tiers

Une application de gestion de tâches moderne construite avec une architecture n-tiers complète, démontrant les bonnes pratiques de développement logiciel et la séparation des responsabilités.

## 🏗️ Architecture

Cette application suit une **architecture 4-tiers** avec séparation claire des responsabilités :

```
┌─────────────────┐    ┌─────────────────┐
│   Client Tier   │    │   Client Tier   │
│   (Electron)    │    │   (Web Browser) │
│                 │    │                 │
│  ┌───────────┐  │    │  ┌───────────┐  │
│  │    UI     │  │    │  │    UI     │  │
│  │ (HTML/JS) │  │    │  │ (HTML/JS) │  │
│  └───────────┘  │    │  └───────────┘  │
└─────────────────┘    └─────────────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
         ┌─────────────────┐
         │ Presentation    │
         │ Tier (Router)   │
         │                 │
         │ ┌─────────────┐ │
         │ │   Express   │ │
         │ │   Router    │ │
         │ │  (Port 3000)│ │
         │ └─────────────┘ │
         └─────────────────┘
                     │
                     ▼
         ┌─────────────────┐
         │ Business Logic  │
         │ Tier            │
         │                 │
         │ ┌─────────────┐ │
         │ │   Express   │ │
         │ │   Server    │ │
         │ │  (Port 5000)│ │
         │ └─────────────┘ │
         └─────────────────┘
                     │
                     ▼
         ┌─────────────────┐
         │   Data Tier     │
         │                 │
         │ ┌─────────────┐ │
         │ │ PostgreSQL  │ │
         │ │ Database    │ │
         │ │  (Port 5432)│ │
         │ └─────────────┘ │
         └─────────────────┘
```

### 🎯 Composants de l'Architecture

#### 1. **Client Tier** (Couche Présentation)
- **Electron Client** (`/client/`) : Application desktop native
- **Web Client** (`/web-client/`) : Interface web moderne
- **Technologies** : HTML5, CSS3, JavaScript ES6+, Electron

#### 2. **Presentation Tier** (Couche Routage)
- **Router API** (`/router/`) : Point d'entrée unique pour toutes les requêtes
- **Responsabilités** :
  - Routage des requêtes HTTP
  - Gestion CORS
  - Proxy vers la couche métier
- **Port** : 3000
- **Technologies** : Express.js, Axios, CORS

#### 3. **Business Logic Tier** (Couche Métier)
- **Business Service** (`/business/`) : Logique métier et règles de gestion
- **Responsabilités** :
  - Validation des données
  - Logique métier des tâches
  - Gestion des opérations CRUD
  - Communication avec la base de données
- **Port** : 5000
- **Technologies** : Express.js, Node.js, pg (PostgreSQL driver)

#### 4. **Data Tier** (Couche Données)
- **PostgreSQL Database** : Stockage persistant des données
- **Responsabilités** :
  - Stockage des tâches
  - Intégrité des données
  - Requêtes SQL optimisées
- **Port** : 5432
- **Technologies** : PostgreSQL 15

## 🚀 Fonctionnalités

### ✨ Gestion des Tâches
- ➕ **Création** de nouvelles tâches avec titre, description et priorité
- 📝 **Modification** des tâches existantes
- ✅ **Marquage** des tâches comme terminées/non terminées
- 🗑️ **Suppression** des tâches
- 🎯 **Système de priorités** (Haute, Moyenne, Basse)
- 📅 **Horodatage** automatique (création/modification)

### 🎨 Interface Utilisateur
- 🖥️ **Application Desktop** (Electron)
- 🌐 **Interface Web** responsive
- 🎨 **Design moderne** avec indicateurs visuels de priorité
- ⚡ **Mise à jour en temps réel**
- 📱 **Interface responsive**

### 🔧 API RESTful
- `GET /api/tasks` - Récupérer toutes les tâches
- `POST /api/tasks` - Créer une nouvelle tâche
- `PUT /api/tasks/:id` - Mettre à jour une tâche
- `PATCH /api/tasks/:id/toggle` - Basculer le statut d'une tâche
- `DELETE /api/tasks/:id` - Supprimer une tâche

## 🛠️ Technologies Utilisées

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **PostgreSQL** - Base de données relationnelle
- **Docker** - Conteneurisation
- **Docker Compose** - Orchestration des services

### Frontend
- **Electron** - Application desktop cross-platform
- **HTML5/CSS3** - Structure et style
- **JavaScript ES6+** - Logique côté client
- **Fetch API** - Communication HTTP

### DevOps
- **Docker** - Conteneurisation des services
- **Docker Compose** - Orchestration multi-conteneurs
- **Makefile** - Automatisation des tâches
- **wait-for-it.sh** - Synchronisation des services

## 📦 Installation et Lancement

### Prérequis
- Docker et Docker Compose
- Node.js (pour le client Electron)
- Make (optionnel, pour les commandes simplifiées)

### 🚀 Démarrage Rapide

```bash
# 1. Cloner le projet
git clone <repository-url>
cd todo-list-app

# 2. Construire et lancer les services backend
make docker-build
make docker-up

# 3. Installer et lancer le client Electron
make install-client
make start-client

# Alternative : Utiliser le client web
# Ouvrir http://localhost:3000 dans votre navigateur
```

### 🐳 Commandes Docker

```bash
# Construire les images
docker compose build

# Lancer tous les services
docker compose up -d

# Arrêter tous les services
docker compose down

# Voir les logs
docker compose logs -f
```

### 🖥️ Client Electron

```bash
# Installer les dépendances
cd client && npm install

# Lancer l'application
npm run start
```

## 🧪 Tests de l'API

### Exemples avec cURL

```bash
# Créer une tâche
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Ma première tâche","description":"Description de la tâche","priority":"high"}'

# Obtenir toutes les tâches
curl http://localhost:3000/api/tasks

# Marquer une tâche comme terminée
curl -X PATCH http://localhost:3000/api/tasks/1/toggle

# Supprimer une tâche
curl -X DELETE http://localhost:3000/api/tasks/1
```

## 📊 Structure du Projet

```
todo-list-app/
├── 📁 business/              # Couche métier
│   ├── 🐳 Dockerfile
│   ├── 📦 package.json
│   ├── 🚀 index.js          # Serveur business logic
│   └── ⏳ wait-for-it.sh
├── 📁 router/               # Couche routage
│   ├── 🐳 Dockerfile
│   ├── 📦 package.json
│   ├── 🚀 index.js          # Serveur router/proxy
│   └── ⏳ wait-for-it.sh
├── 📁 client/               # Client Electron
│   ├── 📦 package.json
│   ├── 🖥️ main.js           # Process principal Electron
│   ├── 🔗 preload.js        # Script de préchargement
│   └── 🎨 index.html        # Interface utilisateur
├── 📁 web-client/           # Client Web
│   └── 🌐 index.html        # Interface web
├── 🐳 docker-compose.yml    # Orchestration des services
├── 📋 Makefile             # Commandes automatisées
└── 📖 README.md            # Documentation
```

## 🔧 Configuration

### Variables d'Environnement

```env
# Base de données
PGHOST=db
PGUSER=postgres
PGPASSWORD=mysecretpassword
PGDATABASE=tododb

# Services
BUSINESS_URL=http://business:5000
```

### Ports Utilisés

| Service | Port | Description |
|---------|------|-------------|
| Router API | 3000 | Point d'entrée principal |
| Business Logic | 5000 | Service métier (interne) |
| PostgreSQL | 5432 | Base de données |

## 🎯 Avantages de cette Architecture

### ✅ Séparation des Responsabilités
- Chaque couche a un rôle spécifique et bien défini
- Facilite la maintenance et les évolutions
- Permet le développement en équipe

### ✅ Scalabilité
- Chaque service peut être mis à l'échelle indépendamment
- Architecture prête pour les microservices
- Déploiement flexible

### ✅ Testabilité
- Tests unitaires par couche
- Tests d'intégration simplifiés
- Mocking facilité entre les couches

### ✅ Flexibilité
- Changement de technologie par couche sans impact
- Ajout de nouveaux clients facilité
- Évolution indépendante des composants

## 🚀 Évolutions Possibles

### 🔮 Améliorations Techniques
- [ ] Authentification et autorisation
- [ ] Cache Redis pour les performances
- [ ] API GraphQL en complément REST
- [ ] Tests automatisés (Jest, Cypress)
- [ ] CI/CD avec GitHub Actions
- [ ] Monitoring et logging (ELK Stack)

### 🎨 Améliorations Fonctionnelles
- [ ] Catégories de tâches
- [ ] Dates d'échéance
- [ ] Notifications
- [ ] Collaboration multi-utilisateurs
- [ ] Synchronisation offline
- [ ] Export/Import des données

## 👥 Équipe de Développement

- **Maurice** - Architecture et Backend
- **Ange** - Frontend et UX/UI
- **Kieron** - DevOps et Base de données

## 📄 Licence

Ce projet est développé à des fins éducatives et de démonstration.

---

*Cette application démontre une architecture n-tiers moderne avec les meilleures pratiques de développement logiciel.*