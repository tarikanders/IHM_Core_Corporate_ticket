import { CheckCircle2 } from 'lucide-react'
import type { Ticket } from '../../types/ticket'
import { useTicketStore } from '../../store/useTicketStore'
import Badge from '../ui/Badge'

interface TicketRowProps {
  ticket: Ticket
  selected?: boolean
  onClick: () => void
}

export default function TicketRow({ ticket, selected = false, onClick }: TicketRowProps) {
  const currentUser = useTicketStore((s) => s.currentUser)
  const readTickets = useTicketStore((s) => s.readTickets)
  const markRead = useTicketStore((s) => s.markRead)

  const lastMsg = ticket.messages[ticket.messages.length - 1]

  // hasUnread: last message is from the other role AND ticket not yet read
  const hasUnreadMsg = !!(lastMsg && currentUser && lastMsg.role !== currentUser.role)
  const isRead = readTickets.includes(ticket.id)
  const hasUnread = hasUnreadMsg && !isRead

  const hasReplied = !!(lastMsg && currentUser && lastMsg.role === currentUser.role)

  const handleClick = () => {
    if (hasUnread) markRead(ticket.id)
    onClick()
  }

  return (
    <div
      onClick={handleClick}
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
      {/* Line 1: ID · Subject */}
      <div className="flex items-center gap-2 min-w-0">
        <span className="font-mono text-teal text-xs flex-shrink-0 w-14">{ticket.id}</span>
        <span className={`text-sm font-medium truncate flex-1 min-w-0 ${hasUnread ? 'text-white' : 'text-lgray'}`}>
          {ticket.subject}
        </span>
      </div>

      {/* Line 2: meta + conversation state */}
      <div className="flex items-center justify-between mt-1 pl-16">
        <div className="flex items-center gap-1.5">
          <Badge category={ticket.category} variant="inline" />
          <span className="text-muted text-xs">·</span>
          <Badge priority={ticket.priority} variant="inline" />
        </div>

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
