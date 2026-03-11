import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Send, Tag, X, BookOpen, ExternalLink } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import { mockUsers } from '../data/mockUsers'
import { mockReleases } from '../data/mockReleases'
import type { Status, Priority, Message } from '../types/ticket'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import StatusTimeline from '../components/ui/StatusTimeline'

const platformLabels: Record<string, string> = {
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  deezer: 'Deezer',
  amazon: 'Amazon',
  tidal: 'Tidal',
}

const statuses: { value: Status; label: string }[] = [
  { value: 'pending', label: 'En attente' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'resolved', label: 'Résolu' },
  { value: 'closed', label: 'Fermé' },
]

const priorities: { value: Priority; label: string }[] = [
  { value: 'critical', label: 'Critique' },
  { value: 'high', label: 'Haute' },
  { value: 'medium', label: 'Moyenne' },
  { value: 'low', label: 'Faible' },
]

const knowledgeLinks = [
  { label: 'Guide distribution multi-plateformes', href: '#' },
  { label: 'FAQ royalties et paiements', href: '#' },
  { label: 'Procédure de correction métadonnées', href: '#' },
]

const agentTagOptions = ['deezer', 'spotify', 'urgent', 'royalties', 'metadata', 'distribution', 'account', 'isrc', 'upc']

export default function AgentTicketPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { tickets, currentUser, updateStatus, updatePriority, addMessage, assignTicket, addTag, removeTag } = useTicketStore()

  const [replyText, setReplyText] = useState('')
  const [internalNotes, setInternalNotes] = useState('')

  const ticket = tickets.find((t) => t.id === id)
  if (!ticket) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center text-muted">
        Ticket introuvable.
        <button onClick={() => navigate('/agent/dashboard')} className="ml-2 text-purple hover:underline cursor-pointer">
          Retour
        </button>
      </div>
    )
  }

  const artist = mockUsers.find((u) => u.id === ticket.artistId)
  const release = ticket.releaseId ? mockReleases.find((r) => r.id === ticket.releaseId) : null
  const agents = mockUsers.filter((u) => u.role === 'agent')

  const handleSendReply = () => {
    if (!replyText.trim() || !currentUser) return
    const msg: Message = {
      author: currentUser.id,
      role: 'agent',
      content: replyText.trim(),
      createdAt: new Date().toISOString(),
    }
    addMessage(ticket.id, msg)
    setReplyText('')
  }

  const handleAddTag = (tag: string) => {
    if (tag && !ticket.tags.includes(tag)) {
      addTag(ticket.id, tag)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Top bar */}
      <div className="border-b border-dgray/30 bg-surface px-6 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate('/agent/dashboard')}
          className="flex items-center gap-2 text-lgray hover:text-white transition-colors text-sm cursor-pointer"
        >
          <ArrowLeft size={15} />
          Retour
        </button>
        <span className="text-muted">/</span>
        <span className="text-sm font-mono text-lgray">{ticket.id}</span>
        <span className="text-muted">/</span>
        <span className="text-sm text-white truncate max-w-xs">{ticket.subject}</span>
        <div className="ml-auto flex gap-2">
          <Badge status={ticket.status} />
          <Badge priority={ticket.priority} />
        </div>
      </div>

      {/* 3-column layout */}
      <div className="flex h-[calc(100vh-3.5rem-3rem)]">
        {/* Col 1: Artist info (28%) */}
        <div className="w-[28%] min-w-56 border-r border-dgray/30 overflow-y-auto bg-surface p-5 flex flex-col gap-5">
          {/* Artist profile */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-wide mb-3 font-semibold">Artiste</h3>
            {artist && (
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: artist.color }}
                >
                  {artist.avatar}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{artist.name}</p>
                  <p className="text-xs text-muted mt-0.5">{artist.city}</p>
                  {artist.plan && (
                    <span className="text-xs bg-purple/15 text-purple border border-purple/30 rounded-full px-2 py-0.5 mt-1 inline-block font-medium">
                      {artist.plan}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Account info */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-wide mb-3 font-semibold">Infos compte</h3>
            <div className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted">Plan</span>
                <span className="text-lgray capitalize">{artist?.plan || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Ville</span>
                <span className="text-lgray">{artist?.city || '—'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">ID artiste</span>
                <span className="text-lgray font-mono">{ticket.artistId}</span>
              </div>
            </div>
          </div>

          {/* Release */}
          {release && (
            <div>
              <h3 className="text-xs text-muted uppercase tracking-wide mb-3 font-semibold">Sortie concernée</h3>
              <div className="bg-dgray/30 rounded-lg p-3 border border-dgray/40">
                <p className="text-sm font-medium text-white">{release.title}</p>
                <p className="text-xs text-muted mb-1">{release.type} — {new Date(release.releaseDate).toLocaleDateString('fr-FR')}</p>
                {release.upc && <p className="text-xs text-muted">UPC: {release.upc}</p>}
                <div className="mt-2 flex flex-col gap-1">
                  {Object.entries(release.platforms).map(([platform, available]) => (
                    <div key={platform} className="flex items-center gap-2 text-xs">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${available ? 'bg-green' : 'bg-red'}`} />
                      <span className={available ? 'text-lgray' : 'text-red'}>{platformLabels[platform]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Internal notes */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-wide mb-2 font-semibold">Notes internes</h3>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Notes privées (non visibles par l'artiste)..."
              rows={4}
              className="w-full bg-dgray border border-dgray/60 rounded-lg px-3 py-2 text-xs text-white placeholder-muted outline-none focus:border-purple transition-all resize-none"
            />
          </div>
        </div>

        {/* Col 2: Conversation (42%) */}
        <div className="flex-1 flex flex-col border-r border-dgray/30">
          <div className="p-4 border-b border-dgray/30">
            <h2 className="text-sm font-semibold text-white">{ticket.subject}</h2>
            <div className="flex gap-2 mt-1.5">
              <Badge category={ticket.category} />
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5">
            <StatusTimeline messages={ticket.messages} />
          </div>

          {/* Reply area */}
          <div className="p-4 border-t border-dgray/30">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Répondre à l'artiste..."
              rows={3}
              className="w-full bg-purple/5 border border-purple/20 rounded-lg px-3 py-2 text-sm text-white placeholder-muted outline-none focus:border-purple/50 focus:ring-1 focus:ring-purple/20 transition-all resize-none"
            />
            <div className="flex justify-end mt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={handleSendReply}
                disabled={!replyText.trim()}
              >
                <Send size={13} />
                Envoyer
              </Button>
            </div>
          </div>
        </div>

        {/* Col 3: Controls (30%) */}
        <div className="w-[30%] min-w-52 overflow-y-auto bg-surface p-5 flex flex-col gap-5">
          {/* Status */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-wide mb-3 font-semibold">Statut</h3>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((s) => (
                <button
                  key={s.value}
                  onClick={() => updateStatus(ticket.id, s.value)}
                  className={`
                    py-2 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer border
                    ${ticket.status === s.value
                      ? 'bg-purple/20 border-purple text-white'
                      : 'border-dgray/40 text-lgray hover:border-lgray/40 hover:text-white'
                    }
                  `}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-wide mb-3 font-semibold">Priorité</h3>
            <div className="grid grid-cols-2 gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  onClick={() => updatePriority(ticket.id, p.value)}
                  className={`
                    py-2 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer border
                    ${ticket.priority === p.value
                      ? 'bg-purple/20 border-purple text-white'
                      : 'border-dgray/40 text-lgray hover:border-lgray/40 hover:text-white'
                    }
                  `}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Assign */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-wide mb-3 font-semibold">Assigner à</h3>
            <div className="flex flex-col gap-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => assignTicket(ticket.id, agent.id)}
                  className={`
                    flex items-center gap-2 p-2 rounded-lg border text-left transition-all cursor-pointer text-xs
                    ${ticket.assignedTo === agent.id
                      ? 'border-purple bg-purple/10 text-white'
                      : 'border-dgray/40 text-lgray hover:border-purple/30 hover:text-white'
                    }
                  `}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                    style={{ backgroundColor: agent.color }}
                  >
                    {agent.avatar}
                  </div>
                  {agent.name}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-wide mb-3 font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {ticket.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-xs bg-dgray/60 text-lgray rounded-full px-2 py-0.5 border border-dgray/40"
                >
                  {tag}
                  <button onClick={() => removeTag(ticket.id, tag)} className="hover:text-red transition-colors cursor-pointer">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {agentTagOptions
                .filter((t) => !ticket.tags.includes(t))
                .map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleAddTag(tag)}
                    className="flex items-center gap-1 text-xs bg-dgray/30 text-muted hover:text-white hover:bg-dgray/60 rounded-full px-2 py-0.5 border border-dgray/30 transition-all cursor-pointer"
                  >
                    <Tag size={9} />
                    {tag}
                  </button>
                ))}
            </div>
          </div>

          {/* Knowledge base */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-wide mb-3 font-semibold flex items-center gap-1.5">
              <BookOpen size={12} />
              Base de connaissances
            </h3>
            <div className="flex flex-col gap-2">
              {knowledgeLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between p-2 bg-dgray/20 rounded-lg border border-dgray/30 hover:border-purple/30 hover:bg-dgray/40 transition-all text-xs text-lgray hover:text-white group"
                >
                  <span>{link.label}</span>
                  <ExternalLink size={10} className="text-muted group-hover:text-purple transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
