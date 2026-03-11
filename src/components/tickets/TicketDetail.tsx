import { useState } from 'react'
import { X, Send, AlertTriangle, CheckCircle } from 'lucide-react'
import type { Ticket, Message } from '../../types/ticket'
import { useTicketStore } from '../../store/useTicketStore'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import StatusTimeline from '../ui/StatusTimeline'

interface TicketDetailProps {
  ticket: Ticket
  onAddMessage: (msg: Message) => void
  onClose?: () => void
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function TicketDetail({ ticket, onAddMessage, onClose }: TicketDetailProps) {
  const [messageText, setMessageText] = useState('')
  const { currentUser, updateStatus } = useTicketStore()

  const handleSend = () => {
    if (!messageText.trim() || !currentUser) return
    const msg: Message = {
      author: currentUser.id,
      role: currentUser.role,
      content: messageText.trim(),
      createdAt: new Date().toISOString(),
    }
    onAddMessage(msg)
    setMessageText('')
  }

  const handleClose = () => {
    updateStatus(ticket.id, 'closed')
  }

  const handlePersists = () => {
    updateStatus(ticket.id, 'in_progress')
  }

  return (
    <div className="flex flex-col h-full bg-surface">
      {/* Header */}
      <div className="flex items-start justify-between p-5 border-b border-dgray/30">
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs text-muted font-mono">{ticket.id}</span>
          </div>
          <h2 className="text-base font-semibold text-white leading-snug">{ticket.subject}</h2>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge status={ticket.status} />
            <Badge priority={ticket.priority} />
            <Badge category={ticket.category} />
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted hover:text-white transition-colors flex-shrink-0 cursor-pointer"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-3 p-5 border-b border-dgray/30">
        <div>
          <p className="text-xs text-muted">Créé le</p>
          <p className="text-sm text-white mt-0.5">{formatDate(ticket.createdAt)}</p>
        </div>
        <div>
          <p className="text-xs text-muted">Mis à jour le</p>
          <p className="text-sm text-white mt-0.5">{formatDate(ticket.updatedAt)}</p>
        </div>
        {ticket.assignedTo && (
          <div>
            <p className="text-xs text-muted">Assigné à</p>
            <p className="text-sm text-white mt-0.5">Inès Morel</p>
          </div>
        )}
        {ticket.releaseId && (
          <div>
            <p className="text-xs text-muted">Sortie</p>
            <p className="text-sm text-white mt-0.5">{ticket.releaseId}</p>
          </div>
        )}
        {ticket.tags.length > 0 && (
          <div className="col-span-2">
            <p className="text-xs text-muted mb-1">Tags</p>
            <div className="flex gap-1 flex-wrap">
              {ticket.tags.map((tag) => (
                <span key={tag} className="text-xs bg-dgray/60 text-lgray rounded-full px-2 py-0.5 border border-dgray/40">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="flex-1 overflow-y-auto p-5">
        <h3 className="text-xs text-muted uppercase tracking-wide mb-4 font-semibold">Conversation</h3>
        <StatusTimeline messages={ticket.messages} />
      </div>

      {/* Reply area */}
      {ticket.status !== 'closed' && (
        <div className="p-5 border-t border-dgray/30">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Écrire un message..."
            rows={3}
            className="w-full bg-dgray border border-dgray/60 rounded-lg px-3 py-2 text-sm text-white placeholder-muted outline-none transition-all focus:border-purple focus:ring-1 focus:ring-purple/30 resize-none"
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex gap-2">
              {ticket.status === 'resolved' && (
                <>
                  <Button variant="danger" size="sm" onClick={handleClose}>
                    <CheckCircle size={13} />
                    Clore ce ticket
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handlePersists}>
                    <AlertTriangle size={13} />
                    Le problème persiste
                  </Button>
                </>
              )}
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSend}
              disabled={!messageText.trim()}
            >
              <Send size={13} />
              Envoyer
            </Button>
          </div>
        </div>
      )}

      {ticket.status === 'closed' && (
        <div className="p-5 border-t border-dgray/30">
          <div className="flex items-center gap-2 text-sm text-muted bg-dgray/20 rounded-lg p-3">
            <CheckCircle size={15} className="text-green" />
            Ce ticket est clôturé.
          </div>
        </div>
      )}
    </div>
  )
}
