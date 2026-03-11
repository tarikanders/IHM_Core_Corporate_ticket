# CLAUDE.md — Instructions permanentes pour Claude Code

> Ce fichier est lu automatiquement par Claude Code à chaque session.
> Il définit le contexte du projet, les règles à respecter et les priorités de travail.

-----

## 🎓 Contexte académique

Ce projet est réalisé dans le cadre du **CC1 de l’UE Interface Homme-Machine (IHM)**

- **Université** : Université de Strasbourg — L3 Informatique
- **Enseignant** : Prof. Hayk Zarikian
- **Groupe** : 8A
- **Rendu** : 15 Mars 2026 sur Moodle
- **Objectif** : Produire un mockup interactif déployé qui sera intégré (captures + lien) dans le PDF du cahier des charges fonctionnel

-----

## 🎵 Description du projet

**Core Corporate** est une plateforme de gestion de tickets de support pour artistes musicaux indépendants (type TuneCore / DistroKid).

**Deux rôles** :

- **Artiste** (demandeur) — soumet et suit ses tickets liés à sa distribution musicale
- **Agent support** (traitant) — gère, priorise et résout les tickets

**4 catégories de tickets** :

- `distribution` — retards, plateformes manquantes (couleur : teal `#00BCD4`)
- `royalties` — paiements, reversements (couleur : green `#00E676`)
- `metadata` — pochette, ISRC, nom d’artiste (couleur : purple `#7B5EA7`)
- `account` — accès, vérification, compte (couleur : pink `#E040FB`)

-----

## 📋 Cahier des charges fonctionnel (résumé)

### Pages obligatoires

|Route               |Page                     |Rôle   |
|--------------------|-------------------------|-------|
|`/`                 |LoginPage                |Public |
|`/artist/dashboard` |Dashboard artiste        |Artiste|
|`/artist/new-ticket`|Formulaire nouveau ticket|Artiste|
|`/artist/tickets`   |Suivi des tickets        |Artiste|
|`/agent/dashboard`  |Dashboard agent          |Agent  |
|`/agent/tickets/:id`|Traitement d’un ticket   |Agent  |

### Interactivité obligatoire

- Navigation entre toutes les pages via React Router
- Formulaires remplissables avec validation
- Données simulées (15 tickets, 3 users, 5 sorties) dans `src/data/`
- Changement de statut cliquable (agent) mis à jour en temps réel via Zustand
- Ajout de commentaires (artiste + agent) dans la conversation
- Filtres et recherche en temps réel sur la liste des tickets

-----

## 🛠 Stack technique — ne pas modifier

```
React 18 + Vite + TypeScript
Tailwind CSS (thème custom — voir tailwind.config.ts)
React Router v6 (createBrowserRouter)
Zustand (état global)
Lucide React (icônes uniquement)
```

**Interdictions** :


- ❌ Ne pas toucher à `vite.config.ts` ni à `tsconfig.json` sans raison explicite

-----

## 🎨 Règles de design — TOUJOURS respecter

### Palette de couleurs (ne jamais dévier)

```ts
bg:       '#0A0A0F'   // fond principal
surface:  '#13131A'   // navbar, footer, headers
card:     '#1C1C27'   // cartes, panneaux
dgray:    '#2A2A38'   // inputs, séparateurs, boutons secondaires
purple:   '#7B5EA7'   // couleur principale, actions primaires
pink:     '#E040FB'   // accent, gradients, CTA forts
teal:     '#00BCD4'   // distribution, succès secondaire
green:    '#00E676'   // résolu, succès, royalties
orange:   '#FF6D00'   // en attente, avertissement
red:      '#FF1744'   // critique, erreur, urgent
lgray:    '#9090A8'   // texte secondaire
muted:    '#6B6B80'   // texte désactivé, placeholders
```

### Règles typographiques

- Police principale : **Inter** (Google Fonts)
- Police monospace : **JetBrains Mono** — réservée aux IDs de tickets (`TK-019`, UPC, ISRC)
- Titres de page : `text-3xl font-bold text-white`
- Titres de section : `text-lg font-semibold text-white`
- Corps de texte : `text-sm text-lgray`
- Labels de tableau : `text-xs font-bold text-muted uppercase tracking-wider`

### Règles de composants

- Tous les boutons primaires : gradient `from-purple to-pink` + `hover:opacity-90 active:scale-95`
- Tous les inputs : `bg-dgray border border-dgray rounded-xl focus:border-purple focus:ring-2 focus:ring-purple/20`
- Toutes les cards : `bg-card border border-dgray rounded-2xl`
- Tous les badges : `bg-[couleur]/15 text-[couleur] border border-[couleur]/30 text-xs font-semibold px-2.5 py-1 rounded-full`
- Animations : `transition-all duration-150` sur tous les éléments interactifs

### Interdictions de design

- ❌ Ne jamais utiliser de fond blanc ou gris clair
- ❌ Ne jamais utiliser une couleur hors de la palette définie ci-dessus
- ❌ Ne jamais utiliser `border-radius` < 8px sur les cards (utiliser `rounded-xl` minimum)
- ❌ Ne jamais mettre de texte blanc pur `#FFFFFF` sur fond sombre — utiliser `text-white` Tailwind (`#FFFFFF` acceptable dans ce contexte)
- ❌ Ne jamais créer un bouton sans état hover et active

-----

## 📐 Critères IHM à respecter (barème du cours)

Ces critères sont évalués — chaque décision de design doit les servir :

### 1. Clarté de la conception

- La disposition des éléments doit être intuitive
- Hiérarchie visuelle claire : les éléments importants sont mis en évidence
- → Appliquer : taille de texte croissante selon l’importance, contraste élevé sur les CTA

### 2. Facilité d’utilisation

- Navigation intuitive entre les pages
- Les actions possibles doivent être évidentes (labels clairs sur les boutons)
- Minimum de clics pour accomplir une tâche (ex: soumettre un ticket en < 5 étapes)
- → Appliquer : boutons bien étiquetés, pas d’actions cachées

### 3. Esthétique

- Utilisation cohérente des couleurs et polices (respecter la palette)
- Apparence moderne et professionnelle
- → Appliquer : dark mode cohérent, gradients subtils, espacements généreux

### 4. Adaptabilité

- L’interface doit fonctionner sur desktop ET mobile
- → Appliquer : classes `md:` et `lg:` Tailwind sur tous les layouts

### 5. Feedback utilisateur

- Chaque action doit avoir une confirmation visuelle
- Messages d’erreur explicites sur les formulaires
- → Appliquer : Toast après soumission, badge mis à jour après changement de statut, états de loading

### 6. Consistance

- Mêmes composants, mêmes couleurs, mêmes comportements partout
- → Appliquer : toujours utiliser les composants de `src/components/ui/`, jamais de styles inline ad-hoc

### 7. Ergonomie

- Zones cliquables suffisamment grandes (min 44×44px)
- Pas de fatigue visuelle (dark mode bien calibré)
- → Appliquer : `min-h-[44px]` sur tous les boutons et liens

### 8. Performance

- Chargement rapide : pas de dépendances lourdes inutiles
- Réactivité aux actions : feedback immédiat (< 100ms visuel)
- → Appliquer : lazy loading des pages avec `React.lazy`, pas d’images non optimisées

-----

## 📁 Structure du projet — ne pas réorganiser

```
src/
  main.tsx
  App.tsx
  index.css
  store/
    useTicketStore.ts        ← Zustand — source de vérité unique
  data/
    mockTickets.ts           ← 15 tickets simulés
    mockUsers.ts             ← 3 utilisateurs (2 artistes, 1 agent)
    mockReleases.ts          ← 5 sorties musicales
  types/
    ticket.ts                ← tous les types TypeScript
  components/
    layout/
      Navbar.tsx
      Layout.tsx
    ui/
      Badge.tsx
      Button.tsx
      Input.tsx
      Select.tsx
      Card.tsx
      StatCard.tsx
      StatusTimeline.tsx
      Toast.tsx
      EmptyState.tsx
    tickets/
      TicketRow.tsx
      TicketForm.tsx
      TicketDetail.tsx
      FilterBar.tsx
  pages/
    LoginPage.tsx
    artist/
      ArtistDashboard.tsx
      NewTicketPage.tsx
      TicketTrackingPage.tsx
    agent/
      AgentDashboard.tsx
      AgentTicketPage.tsx
```

**Règle** : ne jamais mettre de logique métier dans les pages — tout passe par le store Zustand.  
**Règle** : ne jamais dupliquer un composant — si tu as besoin d’une variante, ajouter une prop au composant existant.

-----

## 🔄 Comportements du store Zustand

Le store `useTicketStore` est la **source de vérité unique**. Toutes les modifications passent par lui.

### Actions disponibles

```ts
setUser(userId: string)                          // connexion
addTicket(ticket: Omit<Ticket, 'id'|'createdAt'>) // nouveau ticket → ID auto-généré TK-0XX
updateStatus(id: string, status: Status)          // changer statut
updatePriority(id: string, priority: Priority)    // changer priorité
addMessage(id: string, msg: MessageInput)         // ajouter message conversation
assignTicket(id: string, agentId: string)         // assigner à un agent
addTag(id: string, tag: string)                   // ajouter tag
removeTag(id: string, tag: string)                // supprimer tag
```

### Règle de mise à jour

Chaque action qui modifie un ticket **doit** aussi mettre à jour `ticket.updatedAt = new Date()`.

-----

## ✅ Checklist de validation avant chaque commit

Avant de considérer une fonctionnalité comme terminée, vérifier :

- [ ] La page s’affiche sans erreur console
- [ ] Le refresh de la page (`F5`) ne donne pas de 404 (nginx.conf SPA fallback)
- [ ] Les données affichées viennent du store Zustand (pas de données hardcodées dans les composants)
- [ ] Les couleurs utilisées sont dans la palette définie
- [ ] Les composants utilisés sont ceux de `src/components/ui/` (pas de styles inline)
- [ ] Le feedback utilisateur est présent sur les actions (toast, badge, état loading)
- [ ] Les critères IHM listés ci-dessus sont respectés visuellement
- [ ] Le code TypeScript ne contient pas d’erreurs de type (`npm run tsc --noEmit`)

-----

## 🚀 Déploiement — Google Cloud Run

```bash
# Build Docker
gcloud builds submit --tag gcr.io/TON_PROJECT_ID/core-corporate

# Deploy
gcloud run deploy core-corporate \
  --image gcr.io/TON_PROJECT_ID/core-corporate \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated
```

**Important** : le fichier `nginx.conf` à la racine est obligatoire pour que React Router fonctionne (SPA fallback `try_files $uri /index.html`). Ne jamais le supprimer.

-----

## 📸 Captures attendues pour le PDF final

Une fois le site déployé, prendre ces captures en plein écran Chrome 1920×1080 :

1. `login.png` — page de login, carte “Artiste” sélectionnée
1. `artist-dashboard.png` — dashboard artiste complet
1. `new-ticket.png` — formulaire avec Distribution sélectionné
1. `ticket-tracking.png` — TK-019 sélectionné avec conversation visible
1. `agent-dashboard.png` — tableau agent complet, critiques en haut
1. `agent-ticket.png` — vue traitement ticket 3 colonnes

-----

*Ce fichier est lu automatiquement par Claude Code. Ne pas supprimer.*