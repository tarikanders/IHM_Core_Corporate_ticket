import type { Ticket } from '../../types/ticket'
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
  const truncated = ticket.subject.length > 50 ? ticket.subject.slice(0, 50) + '…' : ticket.subject
  const isPending = ticket.status === 'pending'

  return (
    <div
      onClick={onClick}
      title={ticket.subject}
      className={`
        relative px-4 py-3.5 border-b border-border/40 cursor-pointer
        ${selected
          ? 'bg-purple/10 border-l-2 border-l-purple'
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
        </div>
        <span className="text-muted text-xs flex-shrink-0">{timeAgo(ticket.updatedAt)}</span>
      </div>

      {/* Row 2: Subject */}
      <p className="text-white text-sm font-medium truncate">{truncated}</p>

      {/* Row 3: priority + status */}
      <div className="flex items-center gap-1.5 mt-1.5">
        <Badge priority={ticket.priority} className="scale-90 origin-left" />
        <Badge status={ticket.status} className="scale-90 origin-left" />
      </div>
    </div>
  )
}
