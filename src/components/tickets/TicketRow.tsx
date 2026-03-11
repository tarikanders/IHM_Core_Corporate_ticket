
import type { Ticket } from '../../types/ticket'
import Badge from '../ui/Badge'

interface TicketRowProps {
  ticket: Ticket
  selected?: boolean
  onClick: () => void
}

export default function TicketRow({ ticket, selected = false, onClick }: TicketRowProps) {
  const truncated = ticket.subject.length > 45
    ? ticket.subject.slice(0, 45) + '…'
    : ticket.subject

  return (
    <div
      onClick={onClick}
      className={`
        relative flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors
        ${selected ? 'bg-surface' : 'hover:bg-dgray/30'}
      `}
    >
      {selected && (
        <div className="absolute left-0 top-0 w-1 h-full bg-purple rounded-r-sm" />
      )}
      <span className="text-xs text-lgray font-mono w-14 flex-shrink-0">{ticket.id}</span>
      <Badge category={ticket.category} className="flex-shrink-0" />
      <span className="flex-1 text-sm text-white truncate">{truncated}</span>
      <Badge priority={ticket.priority} className="flex-shrink-0 hidden sm:inline-flex" />
      <Badge status={ticket.status} className="flex-shrink-0" />
    </div>
  )
}
