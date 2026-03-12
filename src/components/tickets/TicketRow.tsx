import { MessageCircle } from 'lucide-react'
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
  const truncated = ticket.subject.length > 50 ? ticket.subject.slice(0, 50) + '…' : ticket.subject
  const isPending = ticket.status === 'pending'

  // Unread: last message is from the other role
  const lastMsg = ticket.messages[ticket.messages.length - 1]
  const hasUnread = lastMsg && currentUser && lastMsg.role !== currentUser.role

  return (
    <div
      onClick={onClick}
      title={ticket.subject}
      className={`
        relative px-4 py-3.5 border-b border-border/40 cursor-pointer transition-all duration-150
        ${selected
          ? 'bg-purple/10 border-l-2 border-l-purple'
          : hasUnread
            ? 'bg-pink/5 hover:bg-pink/8 border-l-2 border-l-pink'
            : 'hover:bg-white/3'
        }
      `}
    >
      {/* Row 1: ID + category + time */}
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-teal text-xs">{ticket.id}</span>
          <Badge category={ticket.category} className="scale-90 origin-left" />
          {isPending && (
            <span className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse-dot flex-shrink-0" />
          )}
          {hasUnread && (
            <span className="flex items-center gap-1 bg-pink/15 text-pink border border-pink/30 text-xs font-semibold px-1.5 py-0.5 rounded-full">
              <MessageCircle size={9} />
              Nouveau
            </span>
          )}
        </div>
        <span className="text-muted text-xs flex-shrink-0">{timeAgo(ticket.updatedAt)}</span>
      </div>

      {/* Row 2: Subject */}
      <p className="text-white text-sm font-medium truncate pr-20">{truncated}</p>

      {/* Row 3: priority + status + reply button */}
      <div className="flex items-center justify-between mt-1.5">
        <div className="flex items-center gap-1.5">
          <Badge priority={ticket.priority} className="scale-90 origin-left" />
          <Badge status={ticket.status} className="scale-90 origin-left" />
        </div>
        {hasUnread && (
          <button
            onClick={(e) => { e.stopPropagation(); onClick() }}
            className="flex items-center gap-1 text-pink text-xs font-semibold hover:underline"
          >
            <MessageCircle size={11} />
            Répondre →
          </button>
        )}
      </div>
    </div>
  )
}
