# CHAT MALI 🇲🇱🤖 — Plan de Développement & Feuille de Route

« Ton ami IA, dans ta langue. »  
« An ka kuma. An ka dɔgɔya. »

---

## Vue d'Ensemble du Produit

CHAT MALI est un compagnon IA conversationnel conçu pour être comme un véritable ami numérique de l'utilisateur. Conçu avec le Bambara (*Bamanankan*) comme cœur identitaire et culturel, il s’adresse aussi bien aux locuteurs du Mali, d’Afrique de l’Ouest que de la diaspora internationale, avec une prise en charge fluide du Français, de l’Anglais et d’autres langues africaines et internationales.

---

## Jalons de Développement (Milestones)

### Jalon 1 : Surface Produit & Interface Mobile Interactive (✅ Complété)
- **Objectif** : Mettre en ligne l’expérience visuelle, tactile et vocale complète de CHAT MALI.
- **Livrables réalisés** :
  1. **Écran d'Accueil & Compagnon Actif** :
     - Salutations contextuelles personnalisées (« I ni ce 👋 Ahmed » / « Bonjour 👋 Ahmed »).
     - Carte visuelle du compagnon CHAT MALI avec devises et expressions culturelles authentiques.
     - Boutons d’action rapides : Parler 🗣️, Écrire ⌨️, Langues 🌍, Choisir une voix 🎙️, Étudier 📚, Travail 💼, Idées 💡, Discussion ❤️.
  2. **Conversation IA & Barre d'Actions Intelligente** :
     - Échanges dynamiques avec bulles stylisées et avatar personnalisé.
     - Actions sur chaque message : « Lire à voix haute 🔊 », « Traduire 🌍 », « Plus court ✂️ », « Expliquer simplement 💡 », « Copier 📋 », « Régénérer 🔄 ».
     - Mémoire conversationnelle interactive (reconnaissance automatique du prénom et des préférences).
     - Support d’envoi de pièces jointes (photos 📷, documents & CV 📄).
  3. **Mode Conversation Vocale Continue (« 🎧 Conversation Live »)** :
     - Animation dynamique d’ondes sonores réactives (vert/or/rouge Mali).
     - Reconnaissance vocale (Speech-to-Text via Web Speech API) et retour vocal (Text-to-Speech).
     - États en temps réel : « 🎙️ Je t'écoute… », « 🤔 CHAT MALI réfléchit… », « 🔊 CHAT MALI parle… ».
  4. **Sélecteur de Voix Authentiques (10 Voix Maliennes)** :
     - 5 voix féminines : Awa (Douce), Fatou (Naturelle), Mariam (Calme), Aminata (Énergique), Nènè (Amicale).
     - 5 voix masculines : Amadou (Profonde), Moussa (Naturelle), Bakary (Chaleureuse), Oumar (Calme), Sékou (Dynamique).
     - Bouton d’écoute d'extrait sonore instantané avec variations de pitch et de débit.
  5. **Outil Traducteur Spécialisé Bambara ↔ Français** :
     - Traduction bidirectionnelle avec prononciation audio et répertoire d’expressions courantes.
  6. **Onboarding & Guide de Démarrage en 3 Étapes** :
     - Accueil, présentation vocale, sélection de la langue de départ.
  7. **Tiroir d’Historique & Paramètres Personnalisés** :
     - Recherche, renommage et suppression de discussions.
     - Contrôle de la mémoire IA, personnalisation du nom de l’assistant, réglage de la vitesse de voix.

---

### Jalon 2 : Persistance & Base de Données (Netlify Database)
- **Objectif** : Remplacer les données de fixtures par une persistance en base de données PostgreSQL managée.
- **Tâches clés** :
  - Définir le schéma dans `db/schema.ts` avec Drizzle ORM :
    - `users` : profils utilisateurs, langue favorite, voix par défaut, quota d'utilisation.
    - `conversations` : fils de discussion, mode de chat associé, titre, métadonnées culturelles.
    - `messages` : contenus textuels, audio transcripts, traductions et simplifications mises en cache.
    - `memories` : faits personnalisés retenus par l'IA (prénom, centres d'intérêt, contexte pro/scolaire).
  - Déployer les migrations automatiques.

---

### Jalon 3 : Authentification & Sécurité des Comptes (Netlify Identity)
- **Objectif** : Permettre aux utilisateurs de créer un compte et synchroniser leurs discussions entre smartphones et ordinateurs.
- **Tâches clés** :
  - Intégration de l’authentification par e-mail / mot de passe et connexions sociales légères.
  - Sauvegarde sécurisée de l'historique et des préférences de l'utilisateur.
  - Chiffrement au repos des messages et respect strict de la confidentialité des données.
  - Protection contre les abus et limitation raisonnable du taux de requêtes (rate limiting).

---

### Jalon 4 : Moteur IA Distribué & Modèles Dédiés Bambara
- **Objectif** : Connecter le backend à des modèles de langage avancés capables de dialoguer avec une précision idiomatique poussée en Bambara.
- **Tâches clés** :
  - Intégration du streaming SSE via Netlify Functions ou TanStack AI API avec secours multi-fournisseurs (Gemini, Claude, OpenAI).
  - Fine-tuning ou RAG culturel malien : charte du Manden, contes traditionnels, expressions régionales (Bamako, Ségou, Sikasso, Mopti, Kayes, Gao, Tombouctou).
  - Enrichissement du vocabulaire technique et administratif traduit en Bamanankan.

---

### Jalon 5 : Reconnaissance Vocale & Synthèse Haute-Fidélité Dédiée
- **Objectif** : Offrir des voix neuronales africaines ultra-naturelles pour les connexions à bas débit.
- **Tâches clés** :
  - Intégration de modèles de voix TTS spécifiques aux langues mandingues et accents ouest-africains.
  - Optimisation de la consommation de bande passante pour smartphones Android d’entrée de gamme.
  - Mode hors-ligne partiel pour les salutations, traductions courantes et conseils de base.

---

### Jalon 6 : Analyse Avancée d’Images et de Documents & Modèle Freemium
- **Objectif** : Permettre l’analyse visuelle (photos de devoirs, documents administratifs) et structurer les abonnements.
- **Tâches clés** :
  - Analyse OCR multimodale des exercices et ordonnances.
  - Offre Gratuite avec quotas quotidiens généreux.
  - Offre Premium avec accès prioritaire, modèles vocaux HD illimités et aide avancée aux affaires.
