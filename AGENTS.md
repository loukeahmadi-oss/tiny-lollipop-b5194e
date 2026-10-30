# AGENTS.md

Ce document fournit aux agents d'IA et développeurs une vue détaillée de l'architecture de **CHAT MALI 🇲🇱🤖**.

> **Note importante pour les prochaines sessions d'agent :**  
> Veuillez consulter impérativement [`PLAN.md`](./PLAN.md) pour continuer le développement à partir du jalon approprié (Jalon 2 : Persistance base de données, Jalon 3 : Authentification, etc.).

---

## 1. Vue d'Ensemble du Projet

CHAT MALI est une application mobile et web moderne servant de compagnon IA bienveillant, conçu avec le **Bambara (Bamanankan)** comme identité culturelle principale, ainsi que le Français, l'Anglais et d'autres langues africaines et internationales.

### Stack Technique

- **Framework** : TanStack Start (React 19, Vite 7)
- **Routing** : TanStack Router v1 (routes basées sur le système de fichiers dans `src/routes/`)
- **Styling** : Tailwind CSS v4 avec `@tailwindcss/vite` et design tokens Mali dans `src/styles.css`
- **Typographie** : Outfit & Plus Jakarta Sans via Google Fonts
- **Voix & Audio** : Web Speech API (`SpeechRecognition` pour la transcription STT et `SpeechSynthesis` pour les voix TTS)
- **Déploiement** : Netlify (avec support pour Netlify Functions, Netlify Database et Netlify Identity)

---

## 2. Structure des Dossiers

```
├── PLAN.md                     # Feuille de route produit détaillée par jalons
├── README.md                   # Présentation générale du projet et démarrage
├── AGENTS.md                   # Guide d'ingénierie et d'architecture pour agents IA
├── package.json                # Dépendances du projet (React 19, TanStack Start, Lucide)
├── netlify.toml                # Configuration de build et déploiement Netlify
├── src/
│   ├── components/
│   │   ├── Logo.tsx            # Logo officiel CHAT MALI (bulle + onde vocale + spark IA)
│   │   ├── Navbar.tsx          # Barre de navigation responsive avec toggle Mode Bambara
│   │   ├── VoiceLiveModal.tsx  # Mode « Conversation Live » plein écran avec onde sonore
│   │   ├── VoicePickerModal.tsx# Sélecteur des 10 voix maliennes avec prévisualisation audio
│   │   ├── TranslatorModal.tsx # Traducteur bidirectionnel Bambara ↔ Français avec audio
│   │   ├── HistoryDrawer.tsx   # Tiroir d'historique, recherche et renommage des conversations
│   │   ├── SettingsModal.tsx   # Paramètres du profil, mémoire IA, vitesse de parole
│   │   └── OnboardingModal.tsx # Parcours d'onboarding 3 étapes (bienvenue, voix, langue)
│   ├── lib/
│   │   ├── fixtures.ts         # Données réalistes stubbées (voix, langues, modes, proverbs)
│   │   └── ai-hook.ts          # Hook d'intégration SSE pour streaming IA futur
│   ├── routes/
│   │   ├── __root.tsx          # Layout racine HTML, polices Google Fonts et métadonnées SEO
│   │   ├── api.chat.ts         # Endpoint serveur pour le streaming multi-fournisseur TanStack AI
│   │   └── index.tsx           # Page principale interactive de CHAT MALI
│   └── styles.css              # Tokens CSS, keyframes animations audio et scrollbars
```

---

## 3. Conventions et Décisions Clés

### Identité Culturelle & Langues
- Le Bambara n'est pas une simple langue d'appoint : c'est l'âme de CHAT MALI. Les salutations, expressions de bénédictions et formulations naturelles doivent être préservées.
- Le mode Bambara (« 🇲🇱 MODE BAMBARA ») peut être activé à tout moment depuis le header ou les paramètres.

### Gestion des Voix Maliennes
- 10 voix sont définies dans `src/lib/fixtures.ts` (5 féminines, 5 masculines) avec styles distincts (Douce, Naturelle, Profonde, Énergique, Calme, Professionnelle).
- La lecture à voix haute utilise l'API `SpeechSynthesis` avec des ajustements de pitch et de débit adaptés à chaque personnalité.

### Découplage des Données de Test (Fixtures)
- Toutes les données simulées (voix, historique initial, proverbes Bambara, modes de chat) sont centralisées dans `src/lib/fixtures.ts`.
- Lors du Jalon 2, ces données seront raccordées au schéma PostgreSQL managé par Netlify Database.

---

## 4. Instructions pour les Futures Sessions

1. **Persistance des Données (Jalon 2)** :
   - Installer `@netlify/database` et `drizzle-orm`.
   - Créer le schéma dans `db/schema.ts`.
2. **Authentification (Jalon 3)** :
   - Consulter la compétence `netlify-identity`.
   - Exécuter le script d'activation requis.
3. **Moteur IA & Voix (Jalons 4 & 5)** :
   - Consulter la compétence `netlify-ai-gateway` et brancher les endpoints de chat en streaming.
