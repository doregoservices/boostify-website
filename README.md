# 🚀 Boostify — L'Alpha du Branding

Site web professionnel de **Boostify**, l'agence d'infographie et de branding de **Bello Shouaïb**.

## 📋 Fonctionnalités professionnelles

- ✅ Site vitrine moderne, responsive et bilingue (FR / EN)
- ✅ Présentation des services, packs et réalisations
- ✅ Formulaire de commande/devis avec envoi d'emails automatiques
- ✅ Bouton WhatsApp flottant pour contact direct
- ✅ Section avis clients avec ajout et modération
- ✅ Dashboard admin sécurisé par mot de passe
- ✅ Upload de logo et configuration du site depuis l'admin
- ✅ Stockage en base de données MongoDB (ou mode fichier en local)
- ✅ Prêt pour le déploiement sur Render, Alwaysdata ou VPS

## 🛠️ Technologies

- **Frontend** : HTML5, CSS3, JavaScript vanilla
- **Backend** : Node.js + Express
- **Base de données** : MongoDB (avec fallback fichier JSON en local)
- **Email** : Nodemailer
- **Upload** : Multer
- **Authentification** : Bcryptjs

## 📦 Installation locale

1. **Cloner le projet** ou télécharger le dossier `boostify-website`.

2. **Installer les dépendances** :
```bash
cd boostify-website
npm install
```

3. **Lancer le serveur** :
```bash
npm start
```

4. **Ouvrir dans le navigateur** :
- Site : [http://localhost:3000](http://localhost:3000)
- Dashboard admin : [http://localhost:3000/admin](http://localhost:3000/admin)
- Mot de passe admin par défaut : `boostify2024`

## ⚙️ Configuration

1. Copie le fichier `.env.example` en `.env` :
```bash
cp .env.example .env
```

2. Remplis les variables d'environnement :
- `MONGODB_URI` : URL de ta base MongoDB (facultatif en local)
- `ADMIN_PASSWORD` : mot de passe de l'admin
- `SMTP_USER` et `SMTP_PASS` : pour l'envoi d'emails
- `NOTIFICATION_EMAIL` : email qui reçoit les commandes
- `SITE_URL` : URL du site une fois en ligne

Sans MongoDB, le site fonctionne en mode fichier JSON (les données sont stockées dans `server/data/`).

## 📂 Structure du projet

```
boostify-website/
├── public/                    # Fichiers frontend
│   ├── index.html             # Page d'accueil
│   ├── index-standalone.html  # Version autonome (CSS/JS inline)
│   ├── admin.html             # Dashboard admin
│   ├── css/style.css          # Styles
│   ├── js/                    # Scripts
│   └── images/                # Logos et images
├── server/                    # Backend
│   ├── server.js              # Serveur Express
│   ├── models/                # Modèles Mongoose
│   ├── routes/                # API REST
│   ├── middleware/            # Auth + upload
│   └── utils/                 # Email + DB helpers
├── .env.example
├── render.yaml                # Configuration Render
├── DEPLOIEMENT.md             # Guide déploiement complet
├── WORKFLOW.md                # Workflow des commandes
└── README.md
```

## 🔧 API Endpoints

### Authentification
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/login` | Vérifier le mot de passe admin |

### Commandes
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/orders` | Créer une commande |
| GET | `/api/orders` | Lister les commandes (admin) |
| GET | `/api/orders/:id` | Voir une commande (admin) |
| PATCH | `/api/orders/:id` | Modifier le statut (admin) |
| DELETE | `/api/orders/:id` | Supprimer une commande (admin) |

### Configuration
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/config` | Voir la configuration publique |
| PUT | `/api/config` | Modifier la configuration (admin) |
| POST | `/api/config/upload-logo` | Uploader un logo (admin) |

### Avis clients
| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/testimonials` | Voir les avis publiés |
| GET | `/api/testimonials/all` | Voir tous les avis (admin) |
| POST | `/api/testimonials` | Ajouter un avis |
| PATCH | `/api/testimonials/:id/approve` | Approuver un avis (admin) |
| DELETE | `/api/testimonials/:id` | Supprimer un avis (admin) |

## 🚀 Déploiement en ligne

Voir le guide complet dans **`DEPLOIEMENT.md`**.

La méthode recommandée est **Render.com** (gratuit). Le fichier `render.yaml` est déjà configuré.

## 🎨 Couleurs de la marque

- **Orange** : `#F5A623`
- **Noir** : `#111111`
- **Gris clair** : `#F4F4F7`

## 📞 Contact

- **Email** : bellosuaibou@7gmail.com
- **Téléphone** : +229 66 01 43 36
- **WhatsApp** : +225 01 61 49 85 23
- **Adresse** : Conzagüe Ville

---
© 2026 Boostify — Bello Shouaïb. Tous droits réservés.
