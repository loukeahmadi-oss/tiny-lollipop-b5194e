import { useState } from 'react'
import { Plus, Search, Trash2, Edit3, X, MessageSquare, Sparkles } from 'lucide-react'
import { CONVERSATION_HISTORY, type ConversationItem } from '@/lib/fixtures'

interface HistoryDrawerProps {
  isOpen: boolean
  onClose: () => void
  activeConvId: string
  onSelectConversation: (conv: ConversationItem) => void
  onNewConversation: () => void
}

export function HistoryDrawer({
  isOpen,
  onClose,
  activeConvId,
  onSelectConversation,
  onNewConversation,
}: HistoryDrawerProps) {
  const [conversations, setConversations] = useState<ConversationItem[]>(CONVERSATION_HISTORY)
  const [searchQuery, setSearchQuery] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState('')

  if (!isOpen) return null

  const filtered = conversations.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.preview.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setConversations(conversations.filter((c) => c.id !== id))
  }

  const handleStartRename = (conv: ConversationItem, e: React.MouseEvent) => {
    e.stopPropagation()
    setEditingId(conv.id)
    setEditTitle(conv.title)
  }

  const handleSaveRename = (id: string, e: React.FormEvent) => {
    e.preventDefault()
    setConversations(
      conversations.map((c) => (c.id === id ? { ...c, title: editTitle.trim() || c.title } : c))
    )
    setEditingId(null)
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />

      {/* Drawer content */}
      <div className="w-full max-w-sm sm:max-w-md bg-[#0D1511] border-l border-emerald-500/30 h-full p-5 flex flex-col shadow-2xl shadow-emerald-950 text-white animate-in slide-in-from-right duration-250">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              Mes conversations
            </h2>
            <p className="text-xs text-slate-400">Historique et échanges mémorisés</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Conversation Button */}
        <div className="pt-4 pb-2">
          <button
            onClick={() => {
              onNewConversation()
              onClose()
            }}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition active:scale-98"
          >
            <Plus className="w-4 h-4" /> Nouvelle conversation
          </button>
        </div>

        {/* Search input */}
        <div className="py-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une discussion..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto space-y-2 py-2 pr-1">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-xs">
              Aucune conversation trouvée.
            </div>
          ) : (
            filtered.map((conv) => {
              const isActive = activeConvId === conv.id
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    onSelectConversation(conv)
                    onClose()
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer group ${
                    isActive
                      ? 'border-emerald-500/80 bg-emerald-950/40'
                      : 'border-slate-800/80 bg-slate-900/40 hover:border-emerald-500/30 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    {editingId === conv.id ? (
                      <form
                        onSubmit={(e) => handleSaveRename(conv.id, e)}
                        className="flex-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-2 py-1 bg-black border border-emerald-400 rounded text-xs text-white"
                          autoFocus
                          onBlur={(e) => handleSaveRename(conv.id, e)}
                        />
                      </form>
                    ) : (
                      <h4 className="font-semibold text-xs sm:text-sm text-slate-200 group-hover:text-emerald-300 transition line-clamp-1">
                        {conv.title}
                      </h4>
                    )}

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => handleStartRename(conv, e)}
                        className="p-1 text-slate-400 hover:text-white rounded"
                        title="Renommer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(conv.id, e)}
                        className="p-1 text-slate-400 hover:text-rose-400 rounded"
                        title="Supprimer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{conv.preview}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2">
                    <span>{conv.date}</span>
                    <span className="px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400/80 border border-slate-700/60">
                      {conv.language}
                    </span>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Footer info */}
        <div className="pt-3 border-t border-emerald-500/20 flex items-center justify-between text-[11px] text-slate-400">
          <span className="flex items-center gap-1 text-amber-300">
            <Sparkles className="w-3 h-3" /> Mémoire active
          </span>
          <span>Stockage local sécurisé</span>
        </div>
      </div>
    </div>
  )
}
