export interface Voice {
  id: string
  name: string
  gender: 'female' | 'male'
  style: 'Douce' | 'Naturelle' | 'Profonde' | 'Énergique' | 'Calme' | 'Professionnelle'
  description: string
  sampleTextBm: string
  sampleTextFr: string
  pitch: number
  rate: number
  avatar: string
  accentColor: string
}

export interface Language {
  code: string
  name: string
  nativeName: string
  flag: string
  isAfrican?: boolean
  isPrimary?: boolean
}

export interface ChatMode {
  id: string
  name: string
  nameBm: string
  icon: string
  description: string
  starterPrompt: string
  color: string
}

export interface MessageAction {
  id: string
  label: string
  icon: string
}

export interface ConversationItem {
  id: string
  title: string
  mode: string
  date: string
  preview: string
  language: string
}

export const VOICES: Voice[] = [
  // Voix féminines
  {
    id: 'awa',
    name: 'Awa',
    gender: 'female',
    style: 'Douce',
    description: 'Douce et chaleureuse, voix d’accueil par excellence',
    sampleTextBm: 'I ni ce ! N tɔgɔ ye Awa. N bɛ se ka i dɛmɛ cogo di bi ?',
    sampleTextFr: 'Bonjour ! Je m’appelle Awa. Comment puis-je t’accompagner aujourd’hui ?',
    pitch: 1.1,
    rate: 0.95,
    avatar: 'A',
    accentColor: '#10b981',
  },
  {
    id: 'fatou',
    name: 'Fatou',
    gender: 'female',
    style: 'Naturelle',
    description: 'Naturelle et spontanée, comme une conversation entre amis',
    sampleTextBm: 'Aw ni ce ! An ka kuma ko caman kan kɛnɛma.',
    sampleTextFr: 'Salut ! Parlons naturellement de tout ce qui t’intéresse.',
    pitch: 1.0,
    rate: 1.0,
    avatar: 'F',
    accentColor: '#f59e0b',
  },
  {
    id: 'mariam',
    name: 'Mariam',
    gender: 'female',
    style: 'Calme',
    description: 'Calme et posée, idéale pour l’apprentissage et l’étude',
    sampleTextBm: 'Hakili sigi kɔnɔ, dɔɔni dɔɔni an bɛna a faamuya.',
    sampleTextFr: 'Prends ton temps, nous allons comprendre chaque notion pas à pas.',
    pitch: 0.95,
    rate: 0.9,
    avatar: 'M',
    accentColor: '#3b82f6',
  },
  {
    id: 'aminata',
    name: 'Aminata',
    gender: 'female',
    style: 'Énergique',
    description: 'Énergique et dynamique, parfaite pour la motivation',
    sampleTextBm: 'I ka jigi kana kari ! Bi ye don ɲuman ye baaraw kama !',
    sampleTextFr: 'Plein d’énergie pour aujourd’hui ! Ensemble, on va accomplir de grandes choses !',
    pitch: 1.2,
    rate: 1.1,
    avatar: 'A',
    accentColor: '#ec4899',
  },
  {
    id: 'nene',
    name: 'Nènè',
    gender: 'female',
    style: 'Naturelle',
    description: 'Amicale et bienveillante, toujours à l’écoute',
    sampleTextBm: 'N bɛ i lamɛn n kɔnɔ bɛɛ la. Fɔ n ye.',
    sampleTextFr: 'Je t’écoute avec toute mon attention. Raconte-moi tout.',
    pitch: 1.05,
    rate: 1.0,
    avatar: 'N',
    accentColor: '#8b5cf6',
  },
  // Voix masculines
  {
    id: 'amadou',
    name: 'Amadou',
    gender: 'male',
    style: 'Profonde',
    description: 'Profonde et rassurante, voix de sagesse et de conseil',
    sampleTextBm: 'I ni baara, n baada. Hakilitigiya bɛ bɔ kuma ɲuman de la.',
    sampleTextFr: 'Bienvenue mon ami. La sagesse naît toujours d’un échange réfléchi.',
    pitch: 0.85,
    rate: 0.95,
    avatar: 'A',
    accentColor: '#10b981',
  },
  {
    id: 'moussa',
    name: 'Moussa',
    gender: 'male',
    style: 'Naturelle',
    description: 'Naturelle et directe, ton de grand frère bienveillant',
    sampleTextBm: 'I ka kɛnɛ wa ? An k’an bila baara la sisan.',
    sampleTextFr: 'Ça va la forme ? Mettons-nous au travail directement.',
    pitch: 0.9,
    rate: 1.0,
    avatar: 'M',
    accentColor: '#f59e0b',
  },
  {
    id: 'bakary',
    name: 'Bakary',
    gender: 'male',
    style: 'Naturelle',
    description: 'Chaleureuse et conviviale, l’esprit malien authentique',
    sampleTextBm: 'Ala k’an dɛmɛ koɲuman. Aw bismilah CHAT MALI la.',
    sampleTextFr: 'Que la journée soit prospère. Bienvenue sur CHAT MALI !',
    pitch: 0.92,
    rate: 0.95,
    avatar: 'B',
    accentColor: '#ef4444',
  },
  {
    id: 'oumar',
    name: 'Oumar',
    gender: 'male',
    style: 'Calme',
    description: 'Calme et mesuré, excellent pour la réflexion stratégique',
    sampleTextBm: 'Kɔnɔba tigɛli bɛ kɛ dɔɔnin-dɔɔnin de la.',
    sampleTextFr: 'Analysons les choses avec recul et sérénité.',
    pitch: 0.88,
    rate: 0.9,
    avatar: 'O',
    accentColor: '#06b6d4',
  },
  {
    id: 'sekou',
    name: 'Sékou',
    gender: 'male',
    style: 'Énergique',
    description: 'Dynamique et entreprenant, idéal pour les projets business',
    sampleTextBm: 'Bolo kelen tɛ se ka seli don. An ka kɛ kelen ye ka ɲɛtaa sɔrɔ !',
    sampleTextFr: 'Une seule main ne peut applaudir. Faisons équipe pour réussir !',
    pitch: 1.0,
    rate: 1.08,
    avatar: 'S',
    accentColor: '#eab308',
  },
]

export const LANGUAGES: Language[] = [
  { code: 'bm', name: 'Bambara', nativeName: 'Bamanankan', flag: '🇲🇱', isAfrican: true, isPrimary: true },
  { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'Anglais', nativeName: 'English', flag: '🇬🇧' },
  { code: 'wo', name: 'Wolof', nativeName: 'Wolof', flag: '🇸🇳', isAfrican: true },
  { code: 'dyu', name: 'Dioula', nativeName: 'Julakan', flag: '🇨🇮', isAfrican: true },
  { code: 'ha', name: 'Hausa', nativeName: 'Hausa', flag: '🇳🇬', isAfrican: true },
  { code: 'yo', name: 'Yoruba', nativeName: 'Èdè Yorùbá', flag: '🇳🇬', isAfrican: true },
  { code: 'ar', name: 'Arabe', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'es', name: 'Espagnol', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Portugais', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'de', name: 'Allemand', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinois', nativeName: '中文', flag: '🇨🇳' },
]

export const CHAT_MODES: ChatMode[] = [
  {
    id: 'ami',
    name: 'Ami',
    nameBm: 'Teriya',
    icon: '🤝',
    description: 'Conversation naturelle, chaleureuse et bienveillante',
    starterPrompt: 'I ni ce n teri ! I ka kɛnɛ wa ? Comment s’est passée ta journée ?',
    color: 'from-emerald-600 to-teal-700',
  },
  {
    id: 'etudes',
    name: 'Études',
    nameBm: 'Kalan',
    icon: '📚',
    description: 'Explications simples, révisions scolaires et universitaires',
    starterPrompt: 'Quel sujet ou devoir veux-tu réviser ? Mathématiques, histoire du Mali, français ou sciences ?',
    color: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'travail',
    name: 'Travail',
    nameBm: 'Baara',
    icon: '💼',
    description: 'CV, lettres professionnelles, rapports et démarches',
    starterPrompt: 'Je peux t’aider à rédiger un CV impactant, une demande d’emploi ou un courriel professionnel.',
    color: 'from-amber-600 to-amber-800',
  },
  {
    id: 'business',
    name: 'Business',
    nameBm: 'Jago',
    icon: '💰',
    description: 'Idées commerciales, stratégies de vente, gestion et commerce',
    starterPrompt: 'Quelle idée de commerce ou de projet veux-tu développer à Bamako ou dans la sous-région ?',
    color: 'from-yellow-500 to-emerald-700',
  },
  {
    id: 'traduction',
    name: 'Traduction',
    nameBm: 'Bayɛlɛmali',
    icon: '🌍',
    description: 'Traduction instantanée Bambara ↔ Français ↔ Autres langues',
    starterPrompt: 'Tape ou dis une phrase en Bambara ou Français pour la traduire et entendre sa prononciation.',
    color: 'from-cyan-600 to-blue-700',
  },
  {
    id: 'redaction',
    name: 'Rédaction',
    nameBm: 'Sɛbɛnni',
    icon: '✍️',
    description: 'Messages WhatsApp, publications réseaux sociaux, discours',
    starterPrompt: 'Je t’aide à formuler des messages respectueux, des posts engageants ou des discours pour toute occasion.',
    color: 'from-purple-600 to-pink-700',
  },
  {
    id: 'programmation',
    name: 'Programmation',
    nameBm: 'Tekinolɔzi',
    icon: '💻',
    description: 'Aide en code, explications techniques et développement Web/Mobile',
    starterPrompt: 'Besoin d’aide en React, Python, JavaScript ou architecture mobile ? Pose ta question technique.',
    color: 'from-slate-700 to-emerald-900',
  },
  {
    id: 'creativite',
    name: 'Créativité',
    nameBm: 'Danbe & Dɔnkili',
    icon: '🎨',
    description: 'Poèmes, contes mandingues, paroles de chansons et idées',
    starterPrompt: 'Créons ensemble un poème, un conte traditionnel ou un scénario vidéo inspirant.',
    color: 'from-rose-600 to-red-800',
  },
  {
    id: 'coach',
    name: 'Coach',
    nameBm: 'Ladili',
    icon: '🧠',
    description: 'Organisation personnelle, conseils, motivation et équilibre',
    starterPrompt: 'Fixons tes objectifs de la semaine. Quel défi veux-tu relever aujourd’hui ?',
    color: 'from-emerald-700 to-green-900',
  },
]

export const CONVERSATION_HISTORY: ConversationItem[] = [
  {
    id: 'conv-1',
    title: '🗣️ Discussion avec Awa',
    mode: 'ami',
    date: 'Aujourd’hui',
    preview: 'I ni ce ! N kɛra kɛnɛ, i ni ce ! I yɛrɛ ka kɛnɛ wa ? 😊',
    language: 'Bambara / Français',
  },
  {
    id: 'conv-2',
    title: '📚 Révision Histoire de l’Empire du Mali',
    mode: 'etudes',
    date: 'Hier',
    preview: 'Sunjata Keita ni Manden Kalikan (La charte de Kouroukan Fouga)...',
    language: 'Français / Bambara',
  },
  {
    id: 'conv-3',
    title: '🌍 Traduction Salutations Bamana',
    mode: 'traduction',
    date: '30 Sept',
    preview: '« Ala ka tilé hɛɛrɛ caya » traduit par : Que Dieu rende la journée paisible...',
    language: 'Bambara ↔ Français',
  },
  {
    id: 'conv-4',
    title: '💼 Idée de commerce agro-alimentaire',
    mode: 'business',
    date: '28 Sept',
    preview: 'Plan pour la transformation et l’emballage du fonio et de la mangue séchée...',
    language: 'Français',
  },
  {
    id: 'conv-5',
    title: '🎵 Paroles chanson moderne Mandingue',
    mode: 'creativite',
    date: '25 Sept',
    preview: 'Refrain en Bamanankan avec mélodie kora et instruments acoustiques...',
    language: 'Bambara',
  },
]

export const BAMBARA_PHRASES = [
  {
    bambara: 'I ni ce !',
    french: 'Bonjour / Merci !',
    pronunciation: 'Ee-nee-tché',
    category: 'Salutations',
  },
  {
    bambara: 'I ka kɛnɛ wa ?',
    french: 'Comment vas-tu ? (Es-tu en santé ?)',
    pronunciation: 'Ee kah keh-neh wah ?',
    category: 'Salutations',
  },
  {
    bambara: 'Tɔɔrɔ tɛ, n kɛra kɛnɛ.',
    french: 'Pas de souci, je vais très bien.',
    pronunciation: 'Toh-roh teh, n’keh-rah keh-neh',
    category: 'Réponses',
  },
  {
    bambara: 'I tɔgɔ be di ?',
    french: 'Comment t’appelles-tu ?',
    pronunciation: 'Ee toh-goh beh dee ?',
    category: 'Conversation',
  },
  {
    bambara: 'Ala ka tilé hɛɛrɛ caya.',
    french: 'Que Dieu accorde une journée paisible et bénie.',
    pronunciation: 'Ah-lah kah tee-leh heh-reh tcha-yah',
    category: 'Bénédictions',
  },
  {
    bambara: 'An bɛna o lajɛ ɲɔgɔnfɛ.',
    french: 'Nous allons voir cela ensemble.',
    pronunciation: 'An beh-nah oh lah-jeh nyoh-gon-feh',
    category: 'Entraide',
  },
  {
    bambara: 'Aw bismilah CHAT MALI la !',
    french: 'Soyez les très bienvenus sur CHAT MALI !',
    pronunciation: 'Aw bees-mee-lah CHAT MALI lah !',
    category: 'Accueil',
  },
]

export interface InitialChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
  bambaraTranslation?: string
  frenchTranslation?: string
  simplified?: string
  shorter?: string
  isBambara?: boolean
}

export const INITIAL_MESSAGES: InitialChatMessage[] = [
  {
    id: 'm-1',
    role: 'user',
    content: 'I ni ce, i ka kɛnɛ ?',
    timestamp: '10:42',
    isBambara: true,
    frenchTranslation: 'Bonjour, comment vas-tu ?',
  },
  {
    id: 'm-2',
    role: 'assistant',
    content:
      'I ni ce n teri ! N kɛra kɛnɛ kosɛbɛ, Ala tantu 🙏. I yɛrɛ ka kɛnɛ wa ? N bɛ se ka i dɛmɛ cogo di bi ? N bɛ kuma kɛ Bamanankan na, tubabukan na, walima kan wɛrɛw la.',
    timestamp: '10:42',
    isBambara: true,
    frenchTranslation:
      'Bonjour mon ami ! Je vais très bien, grâce à Dieu 🙏. Et toi-même, tout va bien ? Comment puis-je t’aider aujourd’hui ? Je peux converser en Bambara, en Français, ou dans d’autres langues.',
    simplified: 'Bonjour ! Je vais très bien merci. Comment puis-je t’aider aujourd’hui ?',
    shorter: 'I ni ce ! N kɛra kɛnɛ kosɛbɛ. Mun lo bɛ se k’i dɛmɛ bi ?',
  },
  {
    id: 'm-3',
    role: 'user',
    content: 'Je m’appelle Ahmed. Peux-tu m’aider à réviser et aussi m’expliquer une expression en Bambara ?',
    timestamp: '10:43',
  },
  {
    id: 'm-4',
    role: 'assistant',
    content:
      'Aw bismilah, Ahmed ! C’est un grand plaisir de faire ta connaissance 😊.\n\nJe retiens bien ton prénom : **Ahmed**.\n\nPour tes révisions et les expressions en Bambara, je suis 100% à ta disposition !\n\nPar exemple, voici une très belle expression mandingue :\n👉 **« Bolo kelen tɛ se ka sɛgɛ minɛ »**\n*(Une seule main ne peut attraper un épervier / L’union fait la force)*.\n\nQue souhaites-tu explorer en premier : tes cours ou d’autres expressions de notre riche patrimoine ?',
    timestamp: '10:44',
    bambaraTranslation:
      'I bisimila Ahmed ! N bɛ i tɔgɔ dɔn sisan : Ahmed. An k’an bila baara la !',
    simplified:
      'Enchanté Ahmed ! Je retiens ton prénom. Je suis prêt à t’aider pour tes cours ou t’apprendre le Bambara.',
    shorter:
      'Enchanté Ahmed ! Ravi de t’aider pour tes études et en Bambara. Par quoi commençons-nous ?',
  },
]
