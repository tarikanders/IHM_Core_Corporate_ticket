# Core Corporate — Mockup IHM

> Plateforme de support tickets pour artistes indépendants
> Stack : React 18 + Vite + TypeScript + Tailwind CSS + Zustand + React Router v6

-----

## 0. Setup du projet

- [ ] `npm create vite@latest core-corporate -- --template react-ts`
- [ ] `cd core-corporate`
- [ ] `npm install react-router-dom zustand lucide-react`
- [ ] `npm install -D tailwindcss postcss autoprefixer`
- [ ] `npx tailwindcss init -p`
- [ ] Configurer `tailwind.config.ts` avec les couleurs custom (voir section 5)
- [ ] Ajouter `@import 'tailwindcss'` dans `src/index.css`
- [ ] Installer la police Inter via Google Fonts dans `index.html`

-----

## 1. Types TypeScript — `src/types/ticket.ts`

- [ ] Créer le type `Status` : `'pending' | 'in_progress' | 'resolved' | 'closed'`
- [ ] Créer le type `Priority` : `'critical' | 'high' | 'medium' | 'low'`
- [ ] Créer le type `Category` : `'distribution' | 'royalties' | 'metadata' | 'account'`
- [ ] Créer l’interface `Message` : `{ author, role: 'artist'|'agent', content, createdAt }`
- [ ] Créer l’interface `Ticket` : `{ id, subject, category, priority, status, artistId, releaseId?, createdAt, updatedAt, messages[], assignedTo?, tags[] }`
- [ ] Créer l’interface `User` : `{ id, name, role: 'artist'|'agent', plan?, city, avatar, color }`
- [ ] Créer l’interface `Release` : `{ id, title, type, artistId, upc?, releaseDate, platforms: { spotify, appleMusic, deezer, amazon, tidal }, tracksCount? }`

-----

## 2. Données simulées — `src/data/`

### `src/data/mockUsers.ts`

- [ ] Créer 3 utilisateurs :
  - `user-lea` → Léa Rousseau, artiste, plan premium, Lyon, avatar ‘L’, color ‘#E040FB’
  - `user-karim` → Karim Benali, artiste, plan label, Paris, avatar ‘K’, color ‘#00BCD4’
  - `agent-ines` → Inès Morel, agent, Strasbourg, avatar ‘I’, color ‘#7B5EA7’

### `src/data/mockReleases.ts`

- [ ] Créer 5 sorties musicales :
  - `release-001` → “Nuit Stellaire”, Album, user-lea, UPC: 0742150018323, deezer: **false** (problème volontaire)
  - `release-002` → “Lumière Bleue”, Single, user-lea, toutes plateformes: true
  - `release-003` → “L’Éveil”, EP, user-lea, distribution en cours (amazon/tidal: false)
  - `release-004` → “Solstice”, Album, user-karim, spotify: **false** (problème volontaire)
  - `release-005` → “Neon Jungle”, Single, user-karim, toutes plateformes: true

### `src/data/mockTickets.ts`

- [ ] Créer 15 tickets avec statuts variés :
  - `TK-019` → Distribution, CRITICAL, in_progress, user-lea, release-001, assigné à agent-ines, 2 messages
  - `TK-018` → Metadata, HIGH, pending, user-lea, release-001, 0 message
  - `TK-020` → Royalties, HIGH, pending, user-karim, 0 message
  - `TK-021` → Distribution, CRITICAL, pending, user-karim, release-004, 0 message
  - `TK-015` → Account, MEDIUM, resolved, user-lea, 1 message
  - `TK-014` → Royalties, LOW, closed, user-lea, 2 messages
  - `TK-013` → Distribution, HIGH, resolved, user-karim, 1 message
  - `TK-012` → Metadata, MEDIUM, pending, user-lea, 0 message
  - `TK-011` → Account, LOW, resolved, user-karim, 1 message
  - `TK-010` → Distribution, CRITICAL, in_progress, user-karim, assigné à agent-ines, 3 messages
  - `TK-009` → Royalties, HIGH, in_progress, user-lea, 2 messages
  - `TK-008` → Metadata, LOW, resolved, user-karim, 1 message
  - `TK-007` → Account, MEDIUM, pending, user-lea, 0 message
  - `TK-006` → Distribution, HIGH, resolved, user-lea, 2 messages
  - `TK-005` → Royalties, MEDIUM, closed, user-karim, 1 message
- [ ] TK-019 doit avoir 2 vrais messages simulés (artiste + agent) avec du contenu réaliste

-----

## 3. Store Zustand — `src/store/useTicketStore.ts`

- [ ] Importer `mockTickets` et `mockUsers`
- [ ] État initial : `tickets: mockTickets`, `currentUser: null`
- [ ] Action `setUser(userId)` → trouve le user dans mockUsers et le stocke
- [ ] Action `addTicket(ticket)` → génère un id `TK-0XX` auto-incrémenté, ajoute au tableau
- [ ] Action `updateStatus(id, status)` → met à jour le statut + `updatedAt`
- [ ] Action `updatePriority(id, priority)` → met à jour la priorité + `updatedAt`
- [ ] Action `addMessage(id, message)` → push le message dans `ticket.messages` + `updatedAt`
- [ ] Action `assignTicket(id, agentId)` → met à jour `assignedTo`
- [ ] Action `addTag(id, tag)` → push dans `ticket.tags` si pas déjà présent
- [ ] Action `removeTag(id, tag)` → filtre `ticket.tags`

-----

## 4. Composants UI — `src/components/ui/`

### `Badge.tsx`

- [ ] Props : `status?: Status`, `priority?: Priority`, `category?: Category`
- [ ] Couleurs statut : pending=orange, in_progress=teal, resolved=green, closed=gray
- [ ] Couleurs priorité : critical=red, high=orange, medium=teal, low=gray
- [ ] Couleurs catégorie : distribution=teal, royalties=green, metadata=purple, account=pink
- [ ] Style : pill arrondi, texte xs bold, bg coloré à 20% opacité + border colorée

### `Button.tsx`

- [ ] Variantes : `primary` (bg purple), `danger` (bg red), `ghost` (bg transparent border), `success` (bg green)
- [ ] Tailles : `sm`, `md`, `lg`
- [ ] Props : `onClick`, `disabled`, `loading` (spinner), `className`

### `Input.tsx`

- [ ] Style dark : bg dgray, border purple au focus, texte blanc, placeholder gray
- [ ] Props : `label`, `error`, `placeholder`, `value`, `onChange`, `type`
- [ ] Afficher le message d’erreur en rouge sous le champ si `error` défini

### `Select.tsx`

- [ ] Même style qu’Input mais avec flèche custom
- [ ] Props : `label`, `options: {value, label}[]`, `value`, `onChange`, `error`

### `Card.tsx`

- [ ] Conteneur simple : bg card, border dgray, border-radius md, padding
- [ ] Props : `className`, `children`

### `StatCard.tsx`

- [ ] Affiche : valeur en grand (colorée), label en dessous, barre de couleur en haut
- [ ] Props : `value`, `label`, `color`

### `StatusTimeline.tsx`

- [ ] Affiche la liste des `messages` d’un ticket sous forme de timeline verticale
- [ ] Messages artiste : dot pink/teal à gauche
- [ ] Messages agent : dot purple à gauche avec badge “Agent”
- [ ] Afficher la date formatée en français

### `EmptyState.tsx`

- [ ] Affiché quand aucun ticket ne correspond aux filtres
- [ ] Icône + message + bouton CTA optionnel

-----

## 5. Composants Layout — `src/components/layout/`

### `Navbar.tsx`

- [ ] Props : `role: 'artist' | 'agent'`
- [ ] Logo “CC” + “Core Corporate” à gauche
- [ ] Si role=artist → onglets : Dashboard, Mes sorties, Royalties, Support, Profil
- [ ] Si role=agent → onglets : Tickets, Artistes, Statistiques, Paramètres
- [ ] Onglet actif détecté via `useLocation()` de React Router
- [ ] Avatar utilisateur + badge rôle à droite (ARTISTE en teal, AGENT en purple)
- [ ] Clic avatar → dropdown avec “Changer de rôle” (navigate vers `/`)

### `Layout.tsx`

- [ ] Wrapper : `<Navbar>` en haut + `<Outlet>` + fond bg sur toute la hauteur
- [ ] Min-height 100vh, fond `bg-bg`

-----

## 6. Composants Tickets — `src/components/tickets/`

### `TicketRow.tsx`

- [ ] Props : `ticket`, `selected?: boolean`, `onClick`
- [ ] Affiche : id, catégorie (Badge), sujet tronqué, priorité (Badge), statut (Badge)
- [ ] Fond légèrement différent si `selected`
- [ ] Barre colorée à gauche si sélectionné

### `FilterBar.tsx`

- [ ] Boutons filtre : Tous, En cours, En attente, Résolu
- [ ] Champ de recherche (filtre sur subject)
- [ ] Props : `activeFilter`, `onFilterChange`, `searchQuery`, `onSearchChange`

### `TicketForm.tsx`

- [ ] Étape 1 : 4 cartes catégorie cliquables (Distribution / Royalties / Métadonnées / Compte)
- [ ] Étape 2 (conditionnel si distribution) : select sortie + checkboxes plateformes
- [ ] Champ sujet (Input)
- [ ] Champ description (textarea stylisé)
- [ ] Sélecteur priorité : 4 boutons avec description SLA
- [ ] Input file pour pièce jointe (optionnel, stylisé)
- [ ] Validation : tous les champs `*` obligatoires avant soumission
- [ ] Props : `onSubmit(ticketData)`

### `TicketDetail.tsx`

- [ ] Affiche header ticket : sujet, badges statut + priorité + catégorie
- [ ] Métadonnées : catégorie, sortie, priorité, date d’ouverture
- [ ] `<StatusTimeline>` avec les messages
- [ ] Zone “Ajouter un commentaire” : textarea + bouton Envoyer
- [ ] Boutons artiste : “Oui, clore ce ticket” (→ closed) et “Non, problème persiste”
- [ ] Props : `ticket`, `onAddMessage`, `onClose`

-----

## 7. Pages — `src/pages/`

### `LoginPage.tsx` — route `/`

- [ ] Logo centré + tagline “Plateforme de support pour artistes indépendants”
- [ ] 2 grandes cartes cliquables : “Je suis un artiste” et “Je suis un agent support”
- [ ] Champ email pré-rempli (lea@corecorporate.app pour artiste)
- [ ] Bouton “Connexion” → `setUser()` + `navigate()` selon rôle sélectionné
- [ ] Design centré verticalement, fond bg avec décorations cercles purple/pink

### `ArtistDashboard.tsx` — route `/artist/dashboard`

- [ ] 4 StatCards : tickets ouverts, urgents, sorties actives, royalties dues (€342)
- [ ] Tableau des 4 derniers tickets de `currentUser` avec `<TicketRow>`
- [ ] Section “Sorties récentes” : 3 cartes avec état par plateforme (vert/rouge)
- [ ] Section “Notifications” : 3 notifs simulées avec dot coloré
- [ ] Bouton “+ Nouveau ticket” → navigate(’/artist/new-ticket’)
- [ ] Clic ligne ticket → navigate(’/artist/tickets/:id’)

### `NewTicketPage.tsx` — route `/artist/new-ticket`

- [ ] Breadcrumb : Accueil › Support › Nouveau ticket
- [ ] Afficher `<TicketForm>` dans une carte
- [ ] `onSubmit` → `addTicket()` dans le store + navigate(’/artist/tickets’) + toast

### `TicketTrackingPage.tsx` — route `/artist/tickets`

- [ ] Layout 2 colonnes : 37% liste / 63% détail
- [ ] Colonne gauche : `<FilterBar>` + liste `<TicketRow>` filtrés par artistId
- [ ] Colonne droite : `<TicketDetail>` du ticket sélectionné
- [ ] Par défaut : premier ticket de la liste sélectionné
- [ ] Si aucun ticket → `<EmptyState>`

### `AgentDashboard.tsx` — route `/agent/dashboard`

- [ ] 4 StatCards : total ouverts, critiques, assignés à moi, satisfaction (4.7★)
- [ ] Barre de répartition par catégorie (largeur % proportionnelle)
- [ ] Tableau de TOUS les tickets (hors closed), triés : critical en premier
- [ ] Colonnes : #, Artiste, Catégorie, Sujet, Priorité, Statut, Assigné à, Action
- [ ] Bouton “Traiter” → navigate(’/agent/tickets/:id’)
- [ ] Panneau bas gauche : “Mes tickets assignés” (filtre assignedTo = agent-ines)
- [ ] Panneau bas droite : stats de performance (tickets traités, délai moyen, satisfaction)

### `AgentTicketPage.tsx` — route `/agent/tickets/:id`

- [ ] Layout 3 colonnes : 28% / 42% / 30%
- [ ] **Col 1 — Profil artiste** :
  - [ ] Avatar + nom + rôle + ville
  - [ ] Niveau tech (barres visuelles)
  - [ ] Infos compte (plan, sorties, date inscription)
  - [ ] Sortie concernée avec UPC et plateformes actives (dot vert/rouge)
  - [ ] Zone “Notes internes” (textarea, visible uniquement agent)
- [ ] **Col 2 — Conversation** :
  - [ ] `<StatusTimeline>` avec tous les messages
  - [ ] Messages artiste à gauche (border teal), agent à droite (border purple)
  - [ ] Textarea “Répondre” + bouton Envoyer → `addMessage(role='agent')`
  - [ ] Checkbox “Utiliser une réponse type” (optionnel, affiche un texte pré-rempli)
- [ ] **Col 3 — Outils agent** :
  - [ ] Sélecteur statut : 4 boutons (En cours / En attente artiste / Résolu / Fermé) → `updateStatus()`
  - [ ] Sélecteur priorité : 4 boutons → `updatePriority()`
  - [ ] Select “Assigner à” + bouton Réassigner → `assignTicket()`
  - [ ] Tags cliquables (ajouter/supprimer) → `addTag()` / `removeTag()`
  - [ ] Section “Base de connaissances” : 3 liens simulés (non fonctionnels)
- [ ] Bouton “Marquer résolu” en haut → `updateStatus('resolved')` + confirmation
- [ ] Bouton “Réassigner” en haut → ouvre dropdown

-----

## 8. Routing — `src/App.tsx`

- [ ] Créer le router avec `createBrowserRouter`
- [ ] Route `/` → `<LoginPage>` (sans Layout)
- [ ] Routes `/artist/*` → `<Layout role="artist">` avec outlet
  - [ ] `/artist/dashboard` → `<ArtistDashboard>`
  - [ ] `/artist/new-ticket` → `<NewTicketPage>`
  - [ ] `/artist/tickets` → `<TicketTrackingPage>`
  - [ ] `/artist/tickets/:id` → `<TicketTrackingPage>` avec id présélectionné
- [ ] Routes `/agent/*` → `<Layout role="agent">` avec outlet
  - [ ] `/agent/dashboard` → `<AgentDashboard>`
  - [ ] `/agent/tickets/:id` → `<AgentTicketPage>`
- [ ] Redirection `*` → `/`

-----

## 9. Design Tokens — `tailwind.config.ts`

```ts
colors: {
  bg:      '#0A0A0F',
  surface: '#13131A',
  card:    '#1C1C27',
  dgray:   '#2A2A38',
  purple:  '#7B5EA7',
  pink:    '#E040FB',
  teal:    '#00BCD4',
  green:   '#00E676',
  orange:  '#FF6D00',
  red:     '#FF1744',
  lgray:   '#9090A8',
  muted:   '#6B6B80',
}
```

-----

## 10. Déploiement Google Cloud Run

- [ ] Créer `Dockerfile` à la racine :
  
  ```dockerfile
  FROM node:20-alpine AS builder
  WORKDIR /app
  COPY package*.json ./
  RUN npm ci
  COPY . .
  RUN npm run build
  
  FROM nginx:alpine
  COPY --from=builder /app/dist /usr/share/nginx/html
  COPY nginx.conf /etc/nginx/conf.d/default.conf
  EXPOSE 8080
  CMD ["nginx", "-g", "daemon off;"]
  ```
- [ ] Créer `nginx.conf` à la racine (OBLIGATOIRE pour le routing SPA) :
  
  ```nginx
  server {
      listen 8080;
      root /usr/share/nginx/html;
      index index.html;
      location / {
          try_files $uri $uri/ /index.html;
      }
  }
  ```
- [ ] Créer `.env.production` :
  
  ```
  VITE_APP_NAME=Core Corporate
  VITE_APP_VERSION=1.0.0
  ```
- [ ] Activer l’API Cloud Run et Cloud Build dans la console GCP
- [ ] `gcloud auth login`
- [ ] `gcloud config set project TON_PROJECT_ID`
- [ ] `gcloud builds submit --tag gcr.io/TON_PROJECT_ID/core-corporate`
- [ ] `gcloud run deploy core-corporate --image gcr.io/TON_PROJECT_ID/core-corporate --platform managed --region europe-west1 --allow-unauthenticated`
- [ ] Vérifier que l’URL fournie est accessible publiquement

-----

## 11. Checklist finale avant rendu

### Fonctionnalités

- [ ] Login → rôle artiste fonctionne et redirige
- [ ] Login → rôle agent fonctionne et redirige
- [ ] Dashboard artiste affiche les tickets de Léa uniquement
- [ ] Dashboard agent affiche tous les tickets, CRITIQUES en premier
- [ ] StatCards calculées dynamiquement (pas de valeurs hardcodées)
- [ ] Formulaire nouveau ticket : validation + soumission + redirection
- [ ] Toast de confirmation après soumission
- [ ] Changement statut ticket côté agent → badge mis à jour immédiatement
- [ ] Changement priorité → StatCard recalculée
- [ ] Artiste peut commenter → message apparaît dans la timeline
- [ ] Agent peut répondre → message apparaît avec style différent
- [ ] Artiste peut clore son ticket → disparaît des filtres actifs
- [ ] Refresh de page sur n’importe quelle route ne donne pas 404
- [ ] Navbar affiche le bon onglet actif selon la route

### Captures à prendre pour le PDF

- [ ] `/` — LoginPage, les 2 cartes de rôle visibles
- [ ] `/artist/dashboard` — StatCards + tableau + sorties
- [ ] `/artist/new-ticket` — formulaire avec catégorie Distribution sélectionnée
- [ ] `/artist/tickets` — TK-019 sélectionné, timeline visible
- [ ] `/agent/dashboard` — tableau complet, critiques en haut
- [ ] `/agent/tickets/TK-019` — vue 3 colonnes complète

### Rendu PDF final

- [ ] Insérer les 6 captures dans le PDF CC1 (section Wireframes)
- [ ] Ajouter le lien de déploiement Cloud Run dans le PDF
- [ ] Vérifier que le lien est cliquable et public