import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Send, Tag, X, BookOpen, ExternalLink, Lock, CheckCircle } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import { mockUsers } from '../data/mockUsers'
import { mockReleases } from '../data/mockReleases'
import type { Status, Priority, Message } from '../types/ticket'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import StatusTimeline from '../components/ui/StatusTimeline'
import Toast from '../components/ui/Toast'

const platformLabels: Record<string, string> = {
  spotify: 'Spotify', appleMusic: 'Apple Music', deezer: 'Deezer', amazon: 'Amazon', tidal: 'Tidal',
}

const statuses: { value: Status; label: string; color: string; activeBg: string }[] = [
  { value: 'in_progress', label: 'En cours',   color: 'text-teal',   activeBg: 'bg-teal/20 border-teal text-teal' },
  { value: 'pending',     label: 'En attente', color: 'text-orange', activeBg: 'bg-orange/20 border-orange text-orange' },
  { value: 'resolved',    label: 'Résolu',     color: 'text-green',  activeBg: 'bg-green/20 border-green text-green' },
  { value: 'closed',      label: 'Fermé',      color: 'text-lgray',  activeBg: 'bg-lgray/20 border-lgray text-lgray' },
]

const priorities: { value: Priority; label: string; activeBg: string }[] = [
  { value: 'critical', label: 'Critique', activeBg: 'bg-red/20 border-red text-red' },
  { value: 'high',     label: 'Haute',    activeBg: 'bg-orange/20 border-orange text-orange' },
  { value: 'medium',   label: 'Moyenne',  activeBg: 'bg-teal/20 border-teal text-teal' },
  { value: 'low',      label: 'Faible',   activeBg: 'bg-lgray/20 border-lgray text-lgray' },
]

const knowledgeLinks = [
  { label: 'Guide distribution multi-plateformes', href: '#' },
  { label: 'FAQ royalties et paiements', href: '#' },
  { label: 'Procédure de correction métadonnées', href: '#' },
]

const agentTagOptions = ['deezer', 'spotify', 'urgent', 'royalties', 'metadata', 'distribution', 'account', 'isrc', 'upc']

const cannedResponses = [
  'Nous avons bien reçu votre signalement et l\'analysons en priorité.',
  'Le problème a été identifié et est en cours de résolution. Vous serez notifié.',
  'Votre ticket a été résolu. N\'hésitez pas à nous contacter si le problème persiste.',
]

export default function AgentTicketPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { tickets, currentUser, updateStatus, updatePriority, addMessage, assignTicket, addTag, removeTag } = useTicketStore()

  const [replyText, setReplyText] = useState('')
  const [internalNotes, setInternalNotes] = useState('')
  const [useCanned, setUseCanned] = useState(false)
  const [toast, setToast] = useState({ show: false, title: '', subtitle: '' })
  const [sending, setSending] = useState(false)

  const ticket = tickets.find((t) => t.id === id)
  if (!ticket) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center text-muted">
        Ticket introuvable.
        <button onClick={() => navigate('/agent/dashboard')} className="ml-2 text-purple hover:underline cursor-pointer">Retour</button>
      </div>
    )
  }

  const artist  = mockUsers.find((u) => u.id === ticket.artistId)
  const release = ticket.releaseId ? mockReleases.find((r) => r.id === ticket.releaseId) : null
  const agents  = mockUsers.filter((u) => u.role === 'agent')

  const showToast = (title: string, subtitle?: string) => {
    setToast({ show: true, title, subtitle: subtitle || '' })
  }

  const handleSendReply = () => {
    if (!replyText.trim() || !currentUser) return
    setSending(true)
    setTimeout(() => {
      const msg: Message = {
        author: currentUser.id,
        role: 'agent',
        content: replyText.trim(),
        createdAt: new Date().toISOString(),
      }
      addMessage(ticket.id, msg)
      setReplyText('')
      setSending(false)
      showToast('Message envoyé', 'La réponse a été ajoutée à la conversation.')
    }, 400)
  }

  const handleStatusChange = (status: Status) => {
    updateStatus(ticket.id, status)
    showToast(`Statut mis à jour`, `→ ${statuses.find((s) => s.value === status)?.label}`)
  }

  const handleAddTag = (tag: string) => {
    if (tag && !ticket.tags.includes(tag)) {
      addTag(ticket.id, tag)
    }
  }

  return (
    <div className="min-h-screen bg-bg">
      <Toast show={toast.show} title={toast.title} subtitle={toast.subtitle} type="success" onClose={() => setToast((t) => ({ ...t, show: false }))} />

      {/* Top bar */}
      <div className="border-b border-border bg-surface px-6 py-3 flex items-center gap-3 flex-wrap">
        <button
          onClick={() => navigate('/agent/dashboard')}
          className="flex items-center gap-2 text-lgray hover:text-white text-sm cursor-pointer"
        >
          <ArrowLeft size={15} />
          Retour
        </button>
        <span className="text-border">›</span>
        <span className="font-mono text-teal text-sm">{ticket.id}</span>
        <span className="text-border">›</span>
        <span className="text-sm text-lgray truncate max-w-xs">{ticket.subject}</span>
        <div className="ml-auto flex gap-2 flex-wrap">
          <Badge status={ticket.status} />
          <Badge priority={ticket.priority} />
          <Button
            variant="success"
            size="sm"
            onClick={() => { handleStatusChange('resolved') }}
          >
            <CheckCircle size={13} />
            Marquer résolu
          </Button>
        </div>
      </div>

      {/* 3-column layout */}
      <div className="flex h-[calc(100vh-3.5rem-3.25rem)]">

        {/* Col 1: Artist info */}
        <div className="w-[28%] min-w-56 border-r border-border overflow-y-auto bg-surface p-5 flex flex-col gap-4">
          {/* Artist profile */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-widest mb-3 font-bold">Artiste</h3>
            {artist && (
              <div className="flex items-start gap-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                  style={{ backgroundColor: artist.color }}
                >
                  {artist.avatar}
                </div>
                <div>
                  <p className="text-white font-semibold">{artist.name}</p>
                  <p className="text-muted text-xs mt-0.5">{artist.city}</p>
                  {artist.plan && (
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full mt-1.5 inline-block ${artist.plan === 'premium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' : 'bg-purple/15 text-purple border border-purple/30'}`}>
                      {artist.plan.toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Account info */}
          <div className="border-t border-border pt-4">
            <h3 className="text-xs text-muted uppercase tracking-widest mb-3 font-bold">Infos compte</h3>
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
                <span className="font-mono text-teal text-xs">{ticket.artistId}</span>
              </div>
            </div>
          </div>

          {/* Release */}
          {release && (
            <div className="border-t border-border pt-4">
              <h3 className="text-xs text-muted uppercase tracking-widest mb-3 font-bold">Sortie concernée</h3>
              <div className="bg-dgray rounded-xl p-3 border border-border">
                <p className="text-white font-semibold text-sm">{release.title}</p>
                <p className="text-muted text-xs">{release.type} — {new Date(release.releaseDate).toLocaleDateString('fr-FR')}</p>
                {release.upc && <p className="font-mono text-teal text-xs mt-1">UPC: {release.upc}</p>}
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
          <div className="border-t border-border pt-4">
            <h3 className="text-xs text-orange uppercase tracking-widest mb-2 font-bold flex items-center gap-1.5">
              <Lock size={11} />
              Notes internes
            </h3>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              placeholder="Notes privées (non visibles par l'artiste)..."
              rows={4}
              className="w-full bg-dgray border border-orange/20 rounded-xl px-3 py-2 text-sm text-lgray placeholder:text-muted outline-none focus:border-orange/50 resize-none"
            />
            <p className="text-muted text-xs mt-1">Visible uniquement par les agents</p>
          </div>
        </div>

        {/* Col 2: Conversation */}
        <div className="flex-1 flex flex-col border-r border-border overflow-hidden">
          <div className="p-4 border-b border-border flex-shrink-0">
            <h2 className="text-sm font-semibold text-white">{ticket.subject}</h2>
            <div className="flex gap-2 mt-1.5">
              <Badge category={ticket.category} />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5">
            <StatusTimeline messages={ticket.messages} />
          </div>

          {/* Reply area */}
          <div className="p-4 border-t border-border bg-surface/50 flex-shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                id="canned"
                checked={useCanned}
                onChange={(e) => setUseCanned(e.target.checked)}
                className="cursor-pointer accent-purple"
              />
              <label htmlFor="canned" className="text-sm text-lgray cursor-pointer">Utiliser une réponse type</label>
            </div>
            {useCanned && (
              <select
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full bg-dgray border border-border rounded-xl px-4 py-2.5 text-sm text-white mb-3 outline-none focus:border-purple"
              >
                <option value="">— Sélectionner une réponse —</option>
                {cannedResponses.map((r, i) => (
                  <option key={i} value={r}>{r.slice(0, 60)}…</option>
                ))}
              </select>
            )}
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Répondre à l'artiste..."
              rows={3}
              disabled={sending}
              className="w-full bg-dgray border border-purple/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted outline-none focus:border-purple/50 focus:ring-1 focus:ring-purple/20 resize-none disabled:opacity-60"
            />
            <div className="flex justify-end mt-2">
              <Button variant="primary" size="sm" onClick={handleSendReply} loading={sending} disabled={!replyText.trim()}>
                <Send size={13} />
                Envoyer
              </Button>
            </div>
          </div>
        </div>

        {/* Col 3: Controls */}
        <div className="w-[30%] min-w-52 overflow-y-auto bg-surface p-5 flex flex-col gap-5">
          {/* Status */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-widest mb-3 font-bold">Statut</h3>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleStatusChange(s.value)}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold cursor-pointer border ${ticket.status === s.value ? s.activeBg : 'border-border text-lgray bg-dgray hover:border-lgray/40 hover:text-white'}`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Priority */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-widest mb-3 font-bold">Priorité</h3>
            <div className="grid grid-cols-2 gap-2">
              {priorities.map((p) => (
                <button
                  key={p.value}
                  onClick={() => { updatePriority(ticket.id, p.value); showToast('Priorité mise à jour', `→ ${p.label}`) }}
                  className={`py-2 px-2 rounded-xl text-xs font-semibold cursor-pointer border ${ticket.priority === p.value ? p.activeBg : 'border-border text-lgray bg-dgray hover:border-lgray/40 hover:text-white'}`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Assign */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-widest mb-3 font-bold">Assigner à</h3>
            <div className="flex flex-col gap-2">
              {agents.map((agent) => (
                <button
                  key={agent.id}
                  onClick={() => { assignTicket(ticket.id, agent.id); showToast('Ticket réassigné', `→ ${agent.name}`) }}
                  className={`flex items-center gap-2 p-2 rounded-xl border text-left cursor-pointer text-xs ${ticket.assignedTo === agent.id ? 'border-purple bg-purple/10 text-white' : 'border-border text-lgray bg-dgray hover:border-purple/30 hover:text-white'}`}
                >
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ backgroundColor: agent.color }}>
                    {agent.avatar}
                  </div>
                  {agent.name}
                  {ticket.assignedTo === agent.id && <span className="ml-auto text-purple">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-widest mb-3 font-bold">Tags</h3>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {ticket.tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 text-xs bg-dgray text-lgray rounded-full px-2.5 py-1 border border-border">
                  {tag}
                  <button onClick={() => removeTag(ticket.id, tag)} className="hover:text-red cursor-pointer ml-0.5">
                    <X size={10} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1">
              {agentTagOptions.filter((t) => !ticket.tags.includes(t)).map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleAddTag(tag)}
                  className="flex items-center gap-1 text-xs text-muted hover:text-white rounded-full px-2.5 py-1 border border-dashed border-border hover:border-solid hover:border-border/70 cursor-pointer"
                >
                  <Tag size={9} />
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Knowledge base */}
          <div>
            <h3 className="text-xs text-muted uppercase tracking-widest mb-3 font-bold flex items-center gap-1.5">
              <BookOpen size={12} />
              Base de connaissances
            </h3>
            <div className="flex flex-col">
              {knowledgeLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center justify-between py-2 text-teal text-sm hover:text-white border-b border-border/40 last:border-0 group"
                >
                  <span>{link.label}</span>
                  <ExternalLink size={11} className="text-muted group-hover:text-teal flex-shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
