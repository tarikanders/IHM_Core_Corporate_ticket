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
  const hasUnread = !!(lastMsg && currentUser && lastMsg.role !== currentUser.role)

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
            : 'hover:bg-white/3 border-l-transparent'
        }
      `}
    >
      {/* Line 1: ID · Subject · Status pill */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-mono text-teal text-xs flex-shrink-0 w-14">{ticket.id}</span>
        <span className={`text-sm font-medium truncate flex-1 min-w-0 ${isArchived ? 'text-lgray' : 'text-white'}`}>
          {ticket.subject}
        </span>
        <Badge
          status={ticket.status}
          variant="pill"
          className={`flex-shrink-0 ${isArchived ? 'opacity-60' : ''}`}
        />
      </div>

      {/* Line 2: Category · Priority · Time [ · Répondre] */}
      <div className="flex items-center gap-1.5 mt-1 pl-16">
        <Badge category={ticket.category} variant="inline" />
        <span className="text-muted text-xs">·</span>
        <Badge priority={ticket.priority} variant="inline" />
        <span className="text-muted text-xs">·</span>
        <span className="text-muted text-xs">{timeAgo(ticket.updatedAt)}</span>
        {hasUnread && (
          <>
            <span className="text-muted text-xs">·</span>
            <span className="text-pink text-xs font-semibold">Répondre →</span>
          </>
        )}
      </div>
    </div>
  )
}
