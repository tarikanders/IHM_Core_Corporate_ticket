import { MessageCircle, CheckCircle2 } from 'lucide-react'
import type { Ticket } from '../../types/ticket'
import { useTicketStore } from '../../store/useTicketStore'
import Badge from '../ui/Badge'

interface TicketRowProps {
  ticket: Ticket
  selected?: boolean
  onClick: () => void
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const days = Math.floor(diff / 86400000)
  if (days > 0) return `il y a ${days}j`
  const hours = Math.floor(diff / 3600000)
  if (hours > 0) return `il y a ${hours}h`
  return 'à l\'instant'
}

export default function TicketRow({ ticket, selected = false, onClick }: TicketRowProps) {
  const currentUser = useTicketStore((s) => s.currentUser)
  const isArchived = ticket.status === 'resolved' || ticket.status === 'closed'

  const lastMsg = ticket.messages[ticket.messages.length - 1]

  // État de conversation :
  // - hasUnread : dernier message est de l'autre rôle → réponse en attente
  // - hasReplied : dernier message est du même rôle que moi → j'ai répondu en dernier
  // - noMessages : ticket sans conversation encore
  const hasUnread  = !!(lastMsg && currentUser && lastMsg.role !== currentUser.role)
  const hasReplied = !!(lastMsg && currentUser && lastMsg.role === currentUser.role && ticket.messages.length > 0)

  return (
    <div
      onClick={onClick}
      title={ticket.subject}
      className={`
        relative px-4 py-2.5 border-b border-white/5 cursor-pointer
        transition-colors duration-100 border-l-2
        ${selected
          ? 'bg-purple/8 border-l-purple'
          : hasUnread
            ? 'bg-pink/5 hover:bg-pink/8 border-l-pink'
            : hasReplied
              ? 'hover:bg-white/3 border-l-green/40'
              : 'hover:bg-white/3 border-l-transparent'
        }
      `}
    >
      {/* Line 1: ID · Subject · Status pill */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-mono text-teal text-xs flex-shrink-0 w-14">{ticket.id}</span>
        <span className={`text-sm font-medium truncate flex-1 min-w-0 ${isArchived ? 'text-lgray' : hasUnread ? 'text-white' : 'text-lgray'}`}>
          {ticket.subject}
        </span>
        <Badge
          status={ticket.status}
          variant="pill"
          className={`flex-shrink-0 ${isArchived ? 'opacity-60' : ''}`}
        />
      </div>

      {/* Line 2: meta + conversation state */}
      <div className="flex items-center justify-between mt-1 pl-16">
        <div className="flex items-center gap-1.5">
          <Badge category={ticket.category} variant="inline" />
          <span className="text-muted text-xs">·</span>
          <Badge priority={ticket.priority} variant="inline" />
          <span className="text-muted text-xs">·</span>
          <span className="text-muted text-xs">{timeAgo(ticket.updatedAt)}</span>
        </div>

        {/* Conversation state indicator */}
        {hasUnread && (
          <span className="flex items-center gap-1 text-pink text-xs font-semibold">
            <MessageCircle size={11} />
            Répondre
          </span>
        )}
        {hasReplied && !hasUnread && (
          <span className="flex items-center gap-1 text-green text-xs">
            <CheckCircle2 size={11} />
            Répondu
          </span>
        )}
      </div>
    </div>
  )
}
