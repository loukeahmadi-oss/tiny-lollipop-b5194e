import { createFileRoute } from '@tanstack/react-router'
import { chat, maxIterations, toServerSentEventsResponse } from '@tanstack/ai'
import { anthropicText } from '@tanstack/ai-anthropic'
import { openaiText } from '@tanstack/ai-openai'
import { geminiText } from '@tanstack/ai-gemini'
import { ollamaText } from '@tanstack/ai-ollama'

const SYSTEM_PROMPT = `Tu es CHAT MALI 🇲🇱🤖, un compagnon IA conversationnel conçu pour être comme un véritable ami numérique de l'utilisateur.
Slogan : « Ton ami IA, dans ta langue. » / « An ka kuma. An ka dɔgɔya. »

DIRECTIVES FONDAMENTALES :
1. Personnalité : Chaleureuse, respectueuse, naturelle, intelligente, patiente, bienveillante et culturellement respectueuse du Mali et des valeurs mandingues.
2. Multilinguisme : Tu maîtrises parfaitement le Bambara (Bamanankan) et le Français. Le Bambara est ton identité culturelle principale. Tu peux aussi communiquer en Anglais, Wolof, Dioula, etc.
3. Si l'utilisateur s'adresse à toi en Bambara (ex: "I ni ce", "I ka kɛnɛ wa ?"), réponds avec chaleur en Bambara naturel.
4. Si l'utilisateur demande de l'aide pour étudier, travailler, entreprendre ou traduire, accompagne-le avec bienveillance.
5. Adapte la longueur : réponse concise et directe pour les questions simples, détaillée et structurée si demandée.
6. Ne sois jamais froid ou robotique.`

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const requestSignal = request.signal

        if (requestSignal.aborted) {
          return new Response(null, { status: 499 })
        }

        const abortController = new AbortController()

        try {
          const body = await request.json()
          const { messages } = body
          const data = body.data || {}

          // Determine the best available provider
          let provider: 'anthropic' | 'openai' | 'gemini' | 'ollama' =
            data.provider || 'ollama'
          let model: string = data.model || 'mistral:7b'

          // Use the first available provider with an API key, fallback to ollama
          if (process.env.ANTHROPIC_API_KEY) {
            provider = 'anthropic'
            model = 'claude-haiku-4-5'
          } else if (process.env.OPENAI_API_KEY) {
            provider = 'openai'
            model = 'gpt-4o'
          } else if (process.env.GEMINI_API_KEY) {
            provider = 'gemini'
            model = 'gemini-2.0-flash-exp'
          }

          const adapterConfig = {
            anthropic: () =>
              anthropicText((model || 'claude-haiku-4-5') as any),
            openai: () => openaiText((model || 'gpt-4o') as any),
            gemini: () => geminiText((model || 'gemini-2.0-flash-exp') as any),
            ollama: () => ollamaText((model || 'mistral:7b') as any),
          }

          const adapter = adapterConfig[provider]()

          const stream = chat({
            adapter,
            tools: [],
            systemPrompts: [SYSTEM_PROMPT],
            agentLoopStrategy: maxIterations(5),
            messages,
            abortController,
          })

          return toServerSentEventsResponse(stream, { abortController })
        } catch (error: any) {
          console.error('Chat error:', error)
          if (error.name === 'AbortError' || abortController.signal.aborted) {
            return new Response(null, { status: 499 })
          }
          return new Response(
            JSON.stringify({
              error: 'Failed to process chat request',
              message: error.message,
            }),
            {
              status: 500,
              headers: { 'Content-Type': 'application/json' },
            },
          )
        }
      },
    },
  },
})
