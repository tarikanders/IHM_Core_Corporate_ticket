import { useState, useRef, useEffect } from 'react'
import { Send, CheckCircle, AlertTriangle, Paperclip, Star } from 'lucide-react'
import type { Ticket, Message } from '../../types/ticket'
import { useTicketStore } from '../../store/useTicketStore'
import { mockUsers } from '../../data/mockUsers'
import { mockReleases } from '../../data/mockReleases'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import StatusTimeline from '../ui/StatusTimeline'
import Toast from '../ui/Toast'

interface TicketDetailProps {
  ticket: Ticket
  onAddMessage: (msg: Message) => void
  onClose?: () => void
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}


export default function TicketDetail({ ticket, onAddMessage }: TicketDetailProps) {
  const [messageText, setMessageText] = useState('')
  const [toast, setToast] = useState(false)
  const [sending, setSending] = useState(false)
  const [hoverRating, setHoverRating] = useState(0)
  const [selectedRating, setSelectedRating] = useState(0)
  const [feedbackComment, setFeedbackComment] = useState('')
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false)
  const { currentUser, updateStatus, submitFeedback } = useTicketStore()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const assignedUser = ticket.assignedTo ? mockUsers.find((u) => u.id === ticket.assignedTo) : null
  const release = ticket.releaseId ? mockReleases.find((r) => r.id === ticket.releaseId) : null

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [ticket.messages.length])

  const handleSend = () => {
    if (!messageText.trim() || !currentUser) return
    setSending(true)
    setTimeout(() => {
      const msg: Message = {
        author: currentUser.id,
        role: currentUser.role,
        content: messageText.trim(),
        createdAt: new Date().toISOString(),
      }
      onAddMessage(msg)
      setMessageText('')
      setSending(false)
      setToast(true)
    }, 400)
  }

  const handleClose = () => { updateStatus(ticket.id, 'closed') }
  const handlePersists = () => { updateStatus(ticket.id, 'in_progress') }

  const handleFeedbackSubmit = () => {
    if (!selectedRating) return
    setFeedbackSubmitting(true)
    setTimeout(() => {
      submitFeedback(ticket.id, { rating: selectedRating, comment: feedbackComment })
      setFeedbackSubmitting(false)
      setToast(true)
    }, 400)
  }

  return (
    <div className="flex flex-col h-full bg-bg overflow-hidden">
      <Toast show={toast} title="Message envoyé" subtitle="Votre message a été ajouté." type="success" onClose={() => setToast(false)} />

      {/* Header */}
      <div className="p-5 border-b border-border flex-shrink-0">
        <span className="font-mono text-teal text-sm">{ticket.id}</span>
        <h2 className="text-2xl font-bold text-white mt-1 leading-tight">{ticket.subject}</h2>
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <Badge status={ticket.status} />
          <Badge priority={ticket.priority} />
          <Badge category={ticket.category} />
        </div>
      </div>

      {/* Metadata */}
      <div className="px-5 py-4 border-b border-border grid grid-cols-2 gap-3 flex-shrink-0">
        <div>
          <p className="text-muted text-xs uppercase tracking-wider">Créé le</p>
          <p className="text-white text-sm font-medium mt-1">{formatDate(ticket.createdAt)}</p>
        </div>
        <div>
          <p className="text-muted text-xs uppercase tracking-wider">Mis à jour le</p>
          <p className="text-white text-sm font-medium mt-1">{formatDate(ticket.updatedAt)}</p>
        </div>
        {assignedUser && (
          <div>
            <p className="text-muted text-xs uppercase tracking-wider">Assigné à</p>
            <p className="text-white text-sm font-medium mt-1">{assignedUser.name}</p>
          </div>
        )}
        {release && (
          <div>
            <p className="text-muted text-xs uppercase tracking-wider">Sortie concernée</p>
            <p className="text-white text-sm font-medium mt-1">{release.title}</p>
          </div>
        )}
        {ticket.tags.length > 0 && (
          <div className="col-span-2">
            <p className="text-muted text-xs uppercase tracking-wider mb-2">Tags</p>
            <div className="flex flex-wrap gap-1.5">
              {ticket.tags.map((tag) => (
                <span key={tag} className="text-xs bg-dgray text-lgray rounded-full px-2.5 py-1 border border-border">{tag}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Conversation */}
      <div className="flex-1 overflow-y-auto p-5">
        <p className="text-xs font-bold text-muted uppercase tracking-widest mb-4">Conversation</p>
        <StatusTimeline messages={ticket.messages} />
        <div ref={messagesEndRef} />
      </div>

      {/* Reply */}
      {ticket.status !== 'closed' && (
        <div className="sticky bottom-0 border-t border-border p-4 bg-surface flex-shrink-0">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Écrire un message..."
            rows={3}
            disabled={sending}
            className="w-full bg-dgray border border-border rounded-xl px-4 py-3 text-sm text-white placeholder:text-muted outline-none focus:border-purple focus:ring-1 focus:ring-purple/30 resize-none disabled:opacity-60"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-1.5 text-lgray text-sm hover:text-white cursor-pointer">
                <Paperclip size={14} />
                Joindre
              </button>
              {ticket.status === 'resolved' && (
                <>
                  <Button variant="success" size="sm" onClick={handleClose}>
                    <CheckCircle size={13} />
                    Clore ce ticket
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handlePersists}>
                    <AlertTriangle size={13} />
                    Problème persiste
                  </Button>
                </>
              )}
            </div>
            <Button variant="primary" size="sm" onClick={handleSend} loading={sending} disabled={!messageText.trim()}>
              <Send size={13} />
              Envoyer
            </Button>
          </div>
        </div>
      )}

      {/* Feedback block — shown when resolved or closed */}
      {(ticket.status === 'resolved' || ticket.status === 'closed') && (
        <div className="p-5 border-t border-border flex-shrink-0">
          {ticket.feedback ? (
            /* Already submitted */
            <div className="bg-green/5 border border-green/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle size={14} className="text-green" />
                <span className="text-green text-sm font-semibold">Feedback envoyé</span>
              </div>
              <div className="flex gap-1 mb-2">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={16} className={s <= ticket.feedback!.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted'} />
                ))}
              </div>
              {ticket.feedback.comment && (
                <p className="text-lgray text-xs italic">"{ticket.feedback.comment}"</p>
              )}
            </div>
          ) : (
            /* Form to submit */
            <div className="bg-purple/5 border border-purple/20 rounded-xl p-4">
              <p className="text-white text-sm font-semibold mb-1">Évaluer le support</p>
              <p className="text-lgray text-xs mb-4">Votre ticket a été résolu. Comment évaluez-vous la qualité du support ?</p>
              {/* Stars */}
              <div className="flex gap-2 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <button
                    key={s}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setSelectedRating(s)}
                    className="cursor-pointer transition-transform duration-100 hover:scale-110 active:scale-95"
                    aria-label={`Note ${s}`}
                  >
                    <Star
                      size={28}
                      className={s <= (hoverRating || selectedRating) ? 'text-yellow-400 fill-yellow-400' : 'text-dgray'}
                    />
                  </button>
                ))}
                {selectedRating > 0 && (
                  <span className="text-lgray text-xs self-center ml-1">
                    {['','Très insatisfait','Insatisfait','Moyen','Satisfait','Très satisfait'][selectedRating]}
                  </span>
                )}
              </div>
              {/* Optional comment */}
              <textarea
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
                placeholder="Un commentaire ? (optionnel)"
                rows={2}
                className="w-full bg-dgray border border-border rounded-xl px-3 py-2 text-sm text-white placeholder:text-muted outline-none focus:border-purple focus:ring-1 focus:ring-purple/20 resize-none mb-3"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleFeedbackSubmit}
                loading={feedbackSubmitting}
                disabled={!selectedRating}
              >
                <Star size={13} />
                Envoyer mon avis
              </Button>
            </div>
          )}

          {ticket.status === 'closed' && (
            <div className="flex items-center gap-2 text-sm text-muted bg-dgray/30 rounded-xl p-3 mt-3">
              <CheckCircle size={15} className="text-green" />
              Ce ticket est clôturé.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
