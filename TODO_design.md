# TODO_DESIGN.md — Core Corporate

> Refonte complète du design et des interactions UX
> Toutes les modifications CSS/Tailwind, composants et pages à améliorer

-----

## 0. Global — Fondations du design

### Typographie

- [ ] Importer la police **Inter** depuis Google Fonts dans `index.html`
  
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  ```
- [ ] Importer **JetBrains Mono** pour les IDs de tickets (TK-019)
  
  ```html
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  ```
- [ ] Dans `tailwind.config.ts` ajouter :
  
  ```ts
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  }
  ```
- [ ] Appliquer `font-sans` sur le `<body>` dans `index.css`
- [ ] Tous les IDs de tickets (`TK-019`) doivent utiliser `font-mono text-teal`

### Couleurs & tokens manquants

- [ ] Ajouter dans `tailwind.config.ts` :
  
  ```ts
  colors: {
    bg:       '#0A0A0F',
    surface:  '#13131A',
    card:     '#1C1C27',
    dgray:    '#2A2A38',
    border:   '#2A2A38',
    purple:   '#7B5EA7',
    'purple-light': '#9B7EC7',
    pink:     '#E040FB',
    teal:     '#00BCD4',
    green:    '#00E676',
    orange:   '#FF6D00',
    red:      '#FF1744',
    lgray:    '#9090A8',
    muted:    '#6B6B80',
  }
  ```
- [ ] Ajouter les variantes d’opacité dans `index.css` :
  
  ```css
  :root {
    --purple-glow: rgba(123, 94, 167, 0.15);
    --pink-glow: rgba(224, 64, 251, 0.1);
    --teal-glow: rgba(0, 188, 212, 0.1);
    --red-glow: rgba(255, 23, 68, 0.1);
  }
  ```

### Scrollbar custom

- [ ] Dans `index.css` ajouter :
  
  ```css
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #13131A; }
  ::-webkit-scrollbar-thumb { background: #2A2A38; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #7B5EA7; }
  ```

### Animations globales

- [ ] Dans `tailwind.config.ts` ajouter les animations :
  
  ```ts
  animation: {
    'fade-in': 'fadeIn 0.2s ease-out',
    'slide-up': 'slideUp 0.3s ease-out',
    'pulse-dot': 'pulseDot 2s infinite',
  },
  keyframes: {
    fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
    slideUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
    pulseDot: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
  }
  ```
- [ ] Appliquer `animate-fade-in` sur chaque page au montage (wrapper principal)
- [ ] Appliquer `animate-slide-up` sur les cards et tableaux

### Transitions globales

- [ ] Dans `index.css` :
  
  ```css
  * { transition-property: background-color, border-color, color, opacity;
      transition-duration: 150ms; transition-timing-function: ease; }
  button, a { transition: all 150ms ease; }
  ```

### Focus & accessibilité

- [ ] Dans `index.css` :
  
  ```css
  *:focus-visible {
    outline: 2px solid #7B5EA7;
    outline-offset: 2px;
    border-radius: 4px;
  }
  ```

-----

## 1. Composant `Navbar.tsx`

- [ ] **Hauteur** : passer de la hauteur actuelle à `h-16` (64px) pour plus d’air
- [ ] **Fond** : `bg-surface border-b border-border` + `backdrop-blur-sm` si sticky
- [ ] **Logo** : agrandir le bloc CC à `w-9 h-9`, texte `text-sm font-bold`, border-radius `rounded-xl`
- [ ] **Logo** : ajouter un léger `shadow` purple : `shadow-[0_0_12px_rgba(123,94,167,0.4)]`
- [ ] **“Core Corporate”** : `text-white font-semibold text-base` — actuellement trop petit
- [ ] **Onglets actifs** : fond `bg-purple/20 text-white` + `rounded-lg px-3 py-1.5` — pas juste le texte en blanc
- [ ] **Onglets inactifs** : `text-lgray hover:text-white hover:bg-white/5 rounded-lg px-3 py-1.5 transition-all`
- [ ] **Avatar utilisateur** : cercle coloré `w-8 h-8 rounded-full` avec initiale + dropdown au clic
- [ ] **Badge rôle** (ARTISTE/AGENT) : `text-xs font-bold px-2 py-0.5 rounded-full` — teal pour artiste, purple pour agent
- [ ] **Sticky** : ajouter `sticky top-0 z-50` sur la navbar
- [ ] **Séparateur** : `border-b border-white/5` pour séparer du contenu

-----

## 2. Page `LoginPage.tsx`

### Fond & décorations

- [ ] Fond : `bg-bg min-h-screen` avec 3 cercles décoratifs positionnés en absolu :
  
  ```tsx
  <div className="absolute top-0 right-0 w-96 h-96 bg-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
  <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink/8 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
  <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-teal/5 rounded-full blur-2xl" />
  ```

### Logo & titre

- [ ] Logo CC : `w-20 h-20 rounded-2xl bg-gradient-to-br from-purple to-pink` + ombre : `shadow-[0_0_40px_rgba(123,94,167,0.4)]`
- [ ] Titre “Core Corporate” : `text-4xl font-bold text-white` — actuellement trop petit
- [ ] Tagline : `text-lgray text-base mt-2`
- [ ] Espacement entre logo et cartes : `mt-10`

### Cartes de rôle

- [ ] Taille des cartes : `w-52 h-40` minimum — actuellement trop petites
- [ ] Fond : `bg-card border border-border rounded-2xl`
- [ ] Hover : `hover:border-purple/60 hover:bg-purple/10 hover:shadow-[0_0_20px_rgba(123,94,167,0.2)] cursor-pointer transition-all`
- [ ] Sélectionné : `border-purple bg-purple/15 shadow-[0_0_24px_rgba(123,94,167,0.3)]`
- [ ] Icône : `w-12 h-12` dans un cercle `bg-purple/20 rounded-xl` — actuellement icône grise invisible
- [ ] Artiste sélectionné → icône en pink/purple
- [ ] Agent sélectionné → icône en teal
- [ ] Texte de la carte : `text-white font-semibold text-base mt-4`
- [ ] Ajouter une description sous le label : `text-lgray text-xs mt-1`
  - Artiste : “Gérez vos sorties et tickets”
  - Agent : “Traitez les demandes de support”

### Formulaire

- [ ] Champ email : apparaît avec `animate-slide-up` quand un rôle est sélectionné
- [ ] Label “Adresse email” : `text-lgray text-sm font-medium mb-2`
- [ ] Input : `bg-dgray border border-border rounded-xl px-4 py-3 text-white w-full focus:border-purple focus:ring-1 focus:ring-purple outline-none`
- [ ] Placeholder email pré-rempli selon le rôle :
  - Artiste → `lea@corecorporate.app`
  - Agent → `ines@corecorporate.app`
- [ ] Bouton Connexion : `w-full bg-gradient-to-r from-purple to-pink text-white font-semibold py-3 rounded-xl hover:opacity-90 hover:shadow-[0_0_20px_rgba(123,94,167,0.4)] transition-all`
- [ ] Ajouter sous le bouton : `text-muted text-xs text-center` “Mockup IHM — aucune donnée réelle”

-----

## 3. Page `ArtistDashboard.tsx`

### Header

- [ ] Titre “Tableau de bord” : `text-3xl font-bold text-white`
- [ ] Sous-titre “Bienvenue, Léa Rousseau” : `text-lgray text-base mt-1`
- [ ] Bouton “+ Nouveau ticket” : déplacer en haut à droite dans le header, pas en bas
  
  ```tsx
  <div className="flex items-center justify-between mb-8">
    <div><h1>Tableau de bord</h1><p>Bienvenue...</p></div>
    <Button>+ Nouveau ticket</Button>
  </div>
  ```
- [ ] Bouton style : `bg-gradient-to-r from-purple to-pink px-5 py-2.5 rounded-xl font-semibold hover:shadow-[0_0_20px_rgba(123,94,167,0.4)]`

### StatCards

- [ ] Hauteur : `h-28` minimum
- [ ] Barre de couleur du haut : `h-1` → passer à `h-1.5` et utiliser un gradient :
  - Tickets ouverts : `from-purple to-pink`
  - Urgents : `from-red to-orange`
  - Sorties actives : `from-teal to-green`
  - Royalties : `from-green to-teal`
- [ ] Valeur : `text-4xl font-bold` — actuellement trop petit
- [ ] Icône : `w-10 h-10 rounded-xl` avec fond coloré à 15% opacité + icône Lucide colorée
- [ ] Hover : `hover:bg-card/80 hover:border-purple/30 transition-all cursor-default`
- [ ] Ajouter une micro-tendance : `text-xs text-green mt-1` “↑ +2 cette semaine”

### Section Tickets récents

- [ ] Titre section : `text-lg font-semibold text-white` + lien “Voir tous →” en `text-purple text-sm`
- [ ] Container : `bg-card border border-border rounded-2xl overflow-hidden`
- [ ] Header du tableau : `bg-surface px-4 py-3` avec colonnes en `text-xs font-bold text-muted uppercase tracking-wider`
- [ ] Lignes : `px-4 py-3.5 border-b border-border/50 hover:bg-white/3 cursor-pointer transition-colors`
- [ ] Alternance de fond : lignes paires en `bg-card`, lignes impaires en `bg-surface/50`
- [ ] ID ticket : `font-mono text-teal text-sm`
- [ ] Sujet : `text-white text-sm` (pas lgray)
- [ ] Ajouter un chevron `→` à droite de chaque ligne au hover

### Section Sorties récentes

- [ ] Titre section : même style que Tickets récents
- [ ] Container global : `bg-card border border-border rounded-2xl p-5`
- [ ] **Chaque carte sortie** : `bg-surface border border-border rounded-xl p-4 flex gap-4`
- [ ] **Pochette placeholder** : carré `w-14 h-14 rounded-xl` avec gradient coloré (différent par sortie) + icône musique au centre en blanc
  - Nuit Stellaire : `bg-gradient-to-br from-purple to-pink`
  - Lumière Bleue : `bg-gradient-to-br from-teal to-blue-500`
  - L’Éveil : `bg-gradient-to-br from-orange to-red`
- [ ] Titre sortie : `text-white font-semibold text-sm`
- [ ] Type (Album/Single/EP) : `text-muted text-xs`
- [ ] Plateformes : liste avec dot `w-2 h-2 rounded-full` vert (`#00E676`) ou rouge (`#FF1744`) + nom `text-xs text-lgray`
- [ ] Si plateforme manquante → nom en rouge + icône `⚠` à côté

### Section Notifications

- [ ] Container : `bg-card border border-border rounded-2xl p-5`
- [ ] Titre : icône cloche Lucide + “Notifications” `font-semibold`
- [ ] Chaque notif : `flex items-start gap-3 py-3 border-b border-border/40`
- [ ] Dot : `w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0` + classe `animate-pulse-dot` sur les nouvelles
- [ ] Texte : `text-lgray text-sm` — les mots importants en `text-white font-medium`
- [ ] Temps : `text-muted text-xs mt-0.5`

-----

## 4. Page `NewTicketPage.tsx`

### Structure générale

- [ ] La page entière doit être visible — layout en `grid grid-cols-[1fr_320px] gap-6` :
  - Colonne gauche : le formulaire (étapes 1, 2, 3)
  - Colonne droite : sidebar récapitulatif sticky
- [ ] Breadcrumb : `text-muted text-sm` avec séparateur `›` — appliquer `hover:text-white` sur les liens

### Indicateur d’étapes (stepper)

- [ ] Ajouter un stepper visuel EN HAUT du formulaire :
  
  ```
  ① Catégorie  →  ② Sortie  →  ③ Détails  →  ④ Priorité
  ```
- [ ] Étape active : cercle `bg-purple text-white w-7 h-7 rounded-full font-bold`
- [ ] Étape complétée : cercle `bg-green/20 text-green` + checkmark
- [ ] Étape future : cercle `bg-dgray text-muted`
- [ ] Ligne de connexion entre étapes : `h-0.5 bg-border flex-1` — devient `bg-purple` quand passée

### Cartes catégorie (ÉTAPE 1)

- [ ] Taille : `min-h-28` — actuellement trop petites
- [ ] Layout : `grid grid-cols-2 gap-3`
- [ ] Fond non sélectionné : `bg-dgray border border-border rounded-xl p-4 cursor-pointer`
- [ ] Hover : `hover:border-[couleur]/50 hover:bg-[couleur]/5 transition-all`
- [ ] Sélectionné : `border-[couleur] bg-[couleur]/10 shadow-[0_0_16px_rgba(...,0.2)]`
- [ ] Icône : `w-10 h-10 rounded-lg bg-[couleur]/20` avec icône Lucide colorée — actuellement icône trop petite et grise
  - Distribution → icône `Globe` en teal
  - Royalties → icône `DollarSign` en green
  - Métadonnées → icône `FileText` en purple
  - Compte → icône `User` en pink
- [ ] Label : `text-white font-semibold text-sm mt-3`
- [ ] Description : `text-muted text-xs mt-1`
- [ ] Checkmark : apparaît en bas à droite quand sélectionné : `w-5 h-5 rounded-full bg-[couleur] text-white`

### Select sortie (ÉTAPE 2)

- [ ] N’apparaît qu’après sélection d’une catégorie — `animate-slide-up`
- [ ] Label : `text-white font-medium text-sm mb-2`
- [ ] Select : `bg-dgray border border-border rounded-xl px-4 py-3 text-white w-full focus:border-purple`
- [ ] Option sélectionnée → afficher une mini-carte avec pochette + nom + type sous le select

### Champs détails (ÉTAPE 3)

- [ ] Labels : `text-white font-medium text-sm mb-2` (pas lgray)
- [ ] Astérisque obligatoire : `text-red ml-1`
- [ ] Input sujet : `bg-dgray border border-border rounded-xl px-4 py-3 text-white w-full focus:border-purple focus:ring-1 focus:ring-purple/50 outline-none placeholder:text-muted`
- [ ] Textarea description : mêmes styles + `min-h-32 resize-none`
- [ ] Compteur de caractères sous le textarea : `text-muted text-xs text-right` “0 / 500”

### Sélecteur priorité (ÉTAPE 4)

- [ ] Layout : `grid grid-cols-2 gap-3`
- [ ] Chaque bouton : `border border-border rounded-xl p-3 cursor-pointer text-left`
- [ ] Sélectionné : `border-[couleur] bg-[couleur]/10`
- [ ] Label priorité : `font-bold text-sm`
- [ ] Description SLA : `text-muted text-xs mt-1` ex. “Réponse < 2h”
- [ ] Couleurs : CRITIQUE=red, HAUTE=orange, MOYENNE=teal, FAIBLE=gray

### Sidebar récapitulatif (colonne droite)

- [ ] Container : `bg-card border border-border rounded-2xl p-5 sticky top-24`
- [ ] Titre : “Récapitulatif” `font-semibold text-white`
- [ ] Chaque ligne : label en `text-muted text-sm` + valeur en `text-white text-sm`
- [ ] Affichage du SLA estimé selon la priorité choisie
- [ ] Bouton “Soumettre” en bas : `w-full bg-gradient-to-r from-purple to-pink py-3 rounded-xl font-semibold`
- [ ] État disabled du bouton si formulaire incomplet : `opacity-50 cursor-not-allowed`

### Zone pièce jointe

- [ ] Zone drag & drop : `border-2 border-dashed border-border rounded-xl p-6 text-center`
- [ ] Hover : `hover:border-purple/50 hover:bg-purple/5 transition-all`
- [ ] Icône `Upload` Lucide + texte “Glissez vos fichiers ici” `text-lgray`
- [ ] Sous-texte : “PNG, PDF, JPG — max 10 Mo” `text-muted text-xs`

-----

## 5. Page `TicketTrackingPage.tsx` (Mes tickets)

### Layout

- [ ] Passer en `grid grid-cols-[400px_1fr]` — actuellement la proportion n’est pas bonne
- [ ] Ajouter `gap-0` et une bordure verticale `border-r border-border` entre les deux colonnes
- [ ] Hauteur : `h-[calc(100vh-64px)] overflow-hidden` — chaque colonne scrolle indépendamment

### Header page

- [ ] Titre “Mes tickets” + bouton “+ Nouveau” : `flex justify-between items-center px-5 py-4 border-b border-border`
- [ ] Bouton “+ Nouveau” : petit, `bg-purple/20 text-purple border border-purple/40 hover:bg-purple/30`

### Barre de recherche

- [ ] Container : `px-4 py-3 border-b border-border bg-surface`
- [ ] Input : `w-full bg-dgray rounded-lg px-3 py-2 text-sm text-white placeholder:text-muted focus:ring-1 focus:ring-purple outline-none`
- [ ] Icône loupe Lucide à gauche dans l’input

### Filtres de statut

- [ ] Tabs : `flex gap-1 px-4 py-2 border-b border-border`
- [ ] Tab actif : `bg-purple text-white rounded-lg px-3 py-1.5 text-sm font-medium`
- [ ] Tab inactif : `text-lgray hover:text-white hover:bg-white/5 rounded-lg px-3 py-1.5 text-sm`
- [ ] Ajouter un compteur sur chaque tab : “En cours (2)”

### Liste tickets

- [ ] Chaque `TicketRow` : `px-4 py-3.5 border-b border-border/40 cursor-pointer`
- [ ] Sélectionné : `bg-purple/10 border-l-2 border-l-purple` (pas juste fond)
- [ ] Non sélectionné hover : `hover:bg-white/3`
- [ ] Layout de chaque row :
  - Ligne 1 : ID ticket `font-mono text-teal text-xs` + badge catégorie (couleur) + temps relatif `text-muted text-xs` à droite
  - Ligne 2 : sujet `text-white text-sm font-medium` tronqué
  - Ligne 3 : badge priorité + badge statut côte à côte
- [ ] Ajouter un point orange animé `animate-pulse-dot` si statut = `pending`

### Panneau détail (colonne droite)

- [ ] Padding : `p-6 overflow-y-auto`
- [ ] **Header ticket** :
  - ID : `font-mono text-teal text-sm`
  - Sujet : `text-2xl font-bold text-white mt-1`
  - Badges statut + priorité + catégorie sur une ligne avec `gap-2`
  - Séparateur `border-b border-border mt-4 pb-4`
- [ ] **Métadonnées** : grid 2 colonnes
  
  ```
  Créé le        Mis à jour le
  Assigné à      Sortie concernée
  ```
  - Labels : `text-muted text-xs uppercase tracking-wider`
  - Valeurs : `text-white text-sm font-medium mt-1`
- [ ] **Tags** : `flex flex-wrap gap-2 mt-4`
  - Chaque tag : `bg-dgray text-lgray text-xs px-2.5 py-1 rounded-full border border-border`

### Conversation

- [ ] Titre “CONVERSATION” : `text-xs font-bold text-muted uppercase tracking-widest mt-6 mb-4`
- [ ] **Message artiste** :
  - Container : `flex gap-3 mb-4`
  - Avatar : `w-8 h-8 rounded-full bg-pink/20 text-pink font-bold text-sm flex-shrink-0`
  - Bulle : `bg-dgray border border-border rounded-2xl rounded-tl-sm px-4 py-3 flex-1`
  - En-tête bulle : nom `text-white text-sm font-medium` + date `text-muted text-xs`
  - Texte : `text-lgray text-sm leading-relaxed mt-1`
- [ ] **Message agent** :
  - Container : `flex gap-3 mb-4 flex-row-reverse`
  - Avatar : `w-8 h-8 rounded-full bg-purple/20 text-purple font-bold text-sm flex-shrink-0`
  - Badge “Agent” : `bg-purple/20 text-purple text-xs px-1.5 py-0.5 rounded font-medium ml-2`
  - Bulle : `bg-purple/10 border border-purple/20 rounded-2xl rounded-tr-sm px-4 py-3 flex-1`

### Zone de réponse

- [ ] Container : `border-t border-border p-4 bg-surface` — **sticky en bas** avec `sticky bottom-0`
- [ ] Textarea : `bg-dgray border border-border rounded-xl px-4 py-3 text-white text-sm w-full resize-none focus:border-purple outline-none placeholder:text-muted`
- [ ] Boutons : `flex justify-between items-center mt-3`
  - Gauche : bouton “📎 Joindre” `text-lgray text-sm hover:text-white`
  - Droite : bouton Envoyer `bg-purple px-4 py-2 rounded-lg text-white text-sm font-medium hover:bg-purple-light`
- [ ] Boutons artiste “Clore le ticket” : `text-lgray text-sm underline hover:text-red` — discret

-----

## 6. Page `AgentDashboard.tsx`

### Header

- [ ] Titre “Tableau de bord — Agent” : `text-3xl font-bold text-white`
- [ ] Sous-titre avec date du jour : `text-lgray text-sm` — ex. “Lundi 10 mars 2026, 08h45”

### StatCards

- [ ] Mêmes améliorations que pour l’artiste (section 3)
- [ ] Gradients :
  - Tickets ouverts : `from-purple to-purple-light`
  - Critiques : `from-red to-orange` — avec micro-animation pulse si > 0
  - Assignés à moi : `from-teal to-cyan-400`
  - Satisfaction : `from-green to-emerald-400`
- [ ] Card “Critiques” : si valeur > 0, ajouter `animate-pulse` sur le chiffre

### Barre de répartition par catégorie

- [ ] **Hauteur des barres** : passer à `h-3` (actuellement trop fin)
- [ ] **Background** : `bg-dgray rounded-full`
- [ ] **Barre colorée** : `rounded-full transition-all duration-500`
- [ ] **Labels** : `text-lgray text-sm` — nom à gauche, nombre à droite en `text-white font-medium`
- [ ] **Espacement** entre chaque catégorie : `mb-3`
- [ ] **Hover** sur chaque barre : tooltip avec le % du total

### Tableau des tickets

- [ ] **Header tableau** : `bg-surface border-b border-border`
  - Colonnes : `text-xs font-bold text-muted uppercase tracking-wider px-4 py-3`
- [ ] **Lignes** : `px-4 py-3.5 border-b border-border/40 hover:bg-white/3 cursor-pointer`
- [ ] **Espacement entre lignes** : ajouter `h-14` minimum par ligne
- [ ] **Colonne Artiste** : avatar miniature `w-6 h-6 rounded-full` coloré + nom
- [ ] **Colonne Sujet** : `text-white text-sm` + tronqué à 45 chars avec `title` attribut HTML
- [ ] **Colonne Priorité** : badge avec icône
  - CRITIQUE : `🔴` + badge red
  - HAUTE : `🟠` + badge orange
  - MOYENNE : `🔵` + badge teal
  - FAIBLE : `⚫` + badge gray
- [ ] **Colonne Assigné** : si “—” → lien “Assigner” en `text-purple text-xs hover:underline`
- [ ] **Colonne Action** : bouton “Ouvrir →” → `bg-purple/20 text-purple text-xs px-3 py-1.5 rounded-lg hover:bg-purple/30`
- [ ] **Ligne CRITIQUE** : fond légèrement rouge `bg-red/5 hover:bg-red/8`
- [ ] **Pagination** si > 10 tickets : ajouter en bas du tableau

### Panneau Performance (bas de page)

- [ ] Chaque agent : `flex items-center gap-4 py-3 border-b border-border/40`
- [ ] Avatar agent : `w-9 h-9 rounded-full` coloré
- [ ] Stats : “X tickets | Y% satisfaction” en `text-lgray text-sm`
- [ ] Barre de satisfaction : petite progress bar colorée

-----

## 7. Page `AgentTicketPage.tsx`

### Header de page

- [ ] Breadcrumb : `← Retour / TK-019 / Sujet du ticket`
- [ ] Badges statut + priorité en haut à droite : bien positionnés (déjà correct)
- [ ] Bouton “Marquer résolu” : `bg-green/20 text-green border border-green/40 hover:bg-green/30 px-4 py-2 rounded-xl`
- [ ] Bouton “Réassigner” : `bg-dgray text-lgray border border-border hover:text-white px-4 py-2 rounded-xl`

### Colonne 1 — Profil artiste

- [ ] **Avatar** : `w-14 h-14 rounded-2xl` avec initiale en grand + couleur de l’artiste
- [ ] **Badge plan** : `text-xs font-bold px-2 py-0.5 rounded-full` — Premium en gold `#FFD700`, Label en purple
- [ ] **Sections** : chaque section séparée par `border-t border-border mt-4 pt-4`
- [ ] **Sortie concernée** : mini-card `bg-dgray rounded-xl p-3`
  - Pochette gradient `w-10 h-10 rounded-lg`
  - Titre + type + UPC en mono
  - Liste plateformes avec dots vert/rouge
- [ ] **Notes internes** :
  - Label : `text-orange text-xs font-bold uppercase tracking-wider` + icône cadenas
  - Textarea : `bg-dgray border border-orange/20 rounded-xl p-3 text-sm text-lgray w-full resize-none focus:border-orange/50 outline-none`
  - Sous-texte : “Visible uniquement par les agents” `text-muted text-xs`

### Colonne 2 — Conversation

- [ ] Mêmes améliorations que la page TicketTracking (section 5)
- [ ] **Checkbox “Réponse type”** : `flex items-center gap-2 text-sm text-lgray`
- [ ] Si cochée → afficher un `<select>` de réponses pré-remplies :
  - “Nous avons bien reçu votre signalement…”
  - “Le problème a été identifié et est en cours de résolution…”
  - “Votre ticket a été résolu, n’hésitez pas à nous contacter…”

### Colonne 3 — Outils agent

- [ ] **Section STATUT** :
  - Titre : `text-muted text-xs uppercase tracking-widest font-bold mb-3`
  - Grid 2×2 de boutons statut
  - Bouton actif : `bg-[couleur] text-white font-semibold`
  - Bouton inactif : `bg-dgray border border-border text-lgray hover:border-[couleur]/50 hover:text-white`
- [ ] **Section PRIORITÉ** : même style que statut
- [ ] **Section ASSIGNER À** :
  - Select stylisé avec avatars dans les options
  - Afficher l’agent actuellement assigné avec son avatar
- [ ] **Section TAGS** :
  - Tags existants : `bg-dgray text-lgray text-xs px-2.5 py-1 rounded-full` + bouton `×` pour supprimer
  - Tags suggérés (non ajoutés) : même style mais `border-dashed border border-border opacity-60`
  - Clic tag suggéré → l’ajoute au ticket
- [ ] **Section BASE DE CONNAISSANCES** :
  - Titre avec icône livre
  - Chaque lien : `flex items-center gap-2 py-2 text-teal text-sm hover:text-white border-b border-border/40`
  - Icône externe `↗` à droite

-----

## 8. Composants UI à améliorer

### `Badge.tsx`

- [ ] Style actuel trop opaque — passer à : `bg-[couleur]/15 text-[couleur] border border-[couleur]/30`
- [ ] Ajouter un dot coloré à gauche : `w-1.5 h-1.5 rounded-full bg-[couleur] mr-1.5`
- [ ] Taille : `text-xs font-semibold px-2.5 py-1 rounded-full`
- [ ] Hover sur certains badges : `hover:bg-[couleur]/25 cursor-default`

### `Button.tsx`

- [ ] Primaire : `bg-gradient-to-r from-purple to-pink hover:opacity-90 hover:shadow-[0_0_20px_rgba(123,94,167,0.35)] active:scale-95`
- [ ] Secondary : `bg-dgray border border-border hover:border-purple/50 hover:bg-purple/10 active:scale-95`
- [ ] Danger : `bg-red/15 text-red border border-red/30 hover:bg-red/25`
- [ ] Success : `bg-green/15 text-green border border-green/30 hover:bg-green/25`
- [ ] Ghost : `text-lgray hover:text-white hover:bg-white/5`
- [ ] Loading state : spinner SVG animé qui remplace le texte
- [ ] Tous les boutons : `active:scale-95 transition-all duration-150`

### `Input.tsx` & `Select.tsx`

- [ ] Style : `bg-dgray border border-border rounded-xl px-4 py-3 text-white w-full`
- [ ] Focus : `focus:border-purple focus:ring-2 focus:ring-purple/20 outline-none`
- [ ] Label au-dessus : `text-white text-sm font-medium mb-2 block`
- [ ] Message d’erreur : `text-red text-xs mt-1.5 flex items-center gap-1` + icône `AlertCircle`
- [ ] Message de succès : `text-green text-xs mt-1.5` + icône `CheckCircle`

### `StatCard.tsx`

- [ ] Ajouter `group` sur le container pour les effets hover enfants
- [ ] Icône : dans un `rounded-xl p-2` avec fond coloré à 15%
- [ ] `group-hover:scale-110 transition-transform` sur l’icône
- [ ] Valeur : `text-4xl font-bold tracking-tight`

### Toast de confirmation

- [ ] Créer un composant `Toast.tsx` :
  - Position : `fixed bottom-6 right-6 z-50`
  - Style : `bg-card border border-green/40 rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3`
  - Icône `CheckCircle` en green
  - Titre : `text-white font-semibold text-sm`
  - Sous-titre : `text-lgray text-xs`
  - Auto-disparaît après 4 secondes
  - Animation : `animate-slide-up` à l’apparition
- [ ] Utiliser le Toast sur : soumission ticket, changement de statut, ajout de commentaire

### `EmptyState.tsx`

- [ ] Container : `flex flex-col items-center justify-center py-20 text-center`
- [ ] Icône Lucide grande : `w-16 h-16 text-muted mb-4`
- [ ] Titre : `text-white font-semibold text-lg`
- [ ] Description : `text-lgray text-sm mt-2 max-w-xs`
- [ ] Bouton CTA optionnel

-----

## 9. Interactions & états manquants

### Feedback visuel sur changement de statut (AgentTicketPage)

- [ ] Quand l’agent clique sur un nouveau statut :
1. Bouton se met en `loading` (spinner) pendant 600ms
1. Badge de statut en haut de page se met à jour avec `animate-fade-in`
1. Toast apparaît : “Statut mis à jour → En cours”
1. Dans le store, `updatedAt` est mis à jour → affiché dans les métadonnées

### Confirmation avant action destructive

- [ ] “Marquer résolu” → dialog de confirmation :
  
  ```
  Confirmer la résolution
  Cette action notifiera l'artiste que son problème est résolu.
  [Annuler]  [Confirmer]
  ```
- [ ] “Clore le ticket” côté artiste → même dialog

### État de chargement (simulé)

- [ ] Sur login → bouton “Connexion” en loading 800ms avant redirect
- [ ] Sur soumission ticket → bouton en loading 1000ms avant redirect + toast
- [ ] Sur envoi de message → textarea disabled + spinner pendant 400ms

### Navigation active

- [ ] Utiliser `useLocation()` pour détecter la route active
- [ ] Appliquer les styles actifs sur la navbar automatiquement

### Scroll automatique

- [ ] Après ajout d’un message → scroll automatique vers le bas de la conversation : `messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })`

### Recherche en temps réel

- [ ] Filtre sur `subject.toLowerCase().includes(query.toLowerCase())`
- [ ] Highlight du texte recherché dans les résultats : entourer le match d’un `<mark className="bg-purple/30 text-white rounded px-0.5">`

-----

## 10. Responsive & mobile

- [ ] Navbar mobile : hamburger menu pour les écrans < 768px
- [ ] Dashboard : StatCards en `grid-cols-2` sur mobile (actuellement 4 colonnes cassent)
- [ ] Suivi tickets : sur mobile, cacher la colonne détail par défaut, bouton “Voir détail →” sur chaque row
- [ ] NewTicketPage : sidebar récapitulatif en bas sur mobile (pas de colonne droite)
- [ ] AgentTicketPage : passer en layout vertical sur tablette et mobile
- [ ] Tous les tableaux : scroll horizontal `overflow-x-auto` avec `min-w-[700px]` sur le tableau

-----

## 11. Pages manquantes à créer

### Page 404

- [ ] Créer `src/pages/NotFoundPage.tsx`
- [ ] Fond bg + grand “404” en `text-9xl font-bold text-purple/20`
- [ ] Texte “Page introuvable” + bouton retour

### Page de confirmation post-soumission

- [ ] Créer `src/pages/artist/TicketConfirmationPage.tsx` — route `/artist/tickets/confirm`
- [ ] Icône checkmark animée en green
- [ ] “Votre ticket TK-0XX a été créé”
- [ ] Récapitulatif du ticket soumis
- [ ] Deux boutons : “Voir mon ticket” et “Retour au dashboard”

### Onglet “Mes sorties” (Navbar artiste)

- [ ] Créer `src/pages/artist/MyReleasesPage.tsx` — route `/artist/releases`
- [ ] Grid de cartes sorties avec pochette + état par plateforme
- [ ] Bouton “Signaler un problème” sur chaque carte → pré-remplit le formulaire NewTicket avec la sortie

### Onglet “Statistiques” (Navbar agent)

- [ ] Créer `src/pages/agent/StatsPage.tsx` — route `/agent/stats`
- [ ] KPIs : délai moyen, taux résolution, satisfaction, volume par catégorie
- [ ] Graphique barres simulé avec des divs CSS (pas besoin de lib)

-----

## 12. Captures finales pour le PDF

> Une fois toutes les modifications appliquées, prendre ces captures en plein écran Chrome (F11), résolution 1920×1080

- [ ] `login-artiste.png` — carte “Je suis un artiste” sélectionnée (border purple), email pré-rempli visible
- [ ] `login-agent.png` — carte “Je suis un agent support” sélectionnée (border teal)
- [ ] `artist-dashboard.png` — StatCards + tickets + sorties avec dots vert/rouge
- [ ] `new-ticket.png` — catégorie Distribution sélectionnée (border teal), stepper à étape 2
- [ ] `ticket-tracking.png` — TK-019 sélectionné, conversation visible, badges clairs
- [ ] `agent-dashboard.png` — tableau complet, ligne critique en rouge subtle, badges colorés
- [ ] `agent-ticket.png` — vue 3 colonnes, statut “En cours” actif en surbrillance
- [ ] `mobile-dashboard.png` — vue mobile 390px du dashboard artiste (bonus)