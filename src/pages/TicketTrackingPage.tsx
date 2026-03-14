import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import type { Status, Priority, Message } from '../types/ticket'
import FilterBar, { type SortBy } from '../components/tickets/FilterBar'
import TicketRow from '../components/tickets/TicketRow'
import TicketDetail from '../components/tickets/TicketDetail'
import EmptyState from '../components/ui/EmptyState'

const priorityOrder: Record<Priority, number> = { critical: 0, high: 1, medium: 2, low: 3 }
const statusOrder: Record<Status, number>  = { in_progress: 0, pending: 1, resolved: 2, closed: 3 }

export default function TicketTrackingPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { tickets, currentUser, addMessage } = useTicketStore()

  const [activeFilter, setActiveFilter] = useState<Status | 'all'>('all')
  const [searchQuery, setSearchQuery]   = useState('')
  const [sortBy, setSortBy]             = useState<SortBy>('date_desc')
  const [selectedId, setSelectedId]     = useState<string | null>(null)

  const userTickets = tickets.filter((t) => t.artistId === currentUser?.id)

  const filteredTickets = userTickets
    .filter((t) => {
      const matchesFilter = activeFilter === 'all' || t.status === activeFilter
      const matchesSearch = !searchQuery
        || t.subject.toLowerCase().includes(searchQuery.toLowerCase())
        || t.id.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesFilter && matchesSearch
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date_asc':  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        case 'priority':  return priorityOrder[a.priority] - priorityOrder[b.priority]
        case 'status':    return statusOrder[a.status]    - statusOrder[b.status]
        default:          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      }
    })

  const counts: Record<string, number> = {
    all:         userTickets.length,
    in_progress: userTickets.filter((t) => t.status === 'in_progress').length,
    pending:     userTickets.filter((t) => t.status === 'pending').length,
    resolved:    userTickets.filter((t) => t.status === 'resolved').length,
  }

  useEffect(() => {
    if (id) {
      setSelectedId(id)
    } else if (!selectedId && filteredTickets.length > 0) {
      setSelectedId(filteredTickets[0].id)
    }
  }, [id, filteredTickets.length])

  const selectedTicket = tickets.find((t) => t.id === selectedId)

  const handleSelect = (ticketId: string) => {
    setSelectedId(ticketId)
    navigate(`/artist/tickets/${ticketId}`, { replace: true })
  }

  const handleAddMessage = (msg: Message) => {
    if (selectedId) addMessage(selectedId, msg)
  }

  // Contextual empty state
  const emptyMessage = searchQuery
    ? `Aucun ticket ne correspond à "${searchQuery}"`
    : activeFilter !== 'all'
      ? 'Aucun ticket dans cette catégorie.'
      : userTickets.length === 0
        ? 'Aucun ticket ouvert 🎉'
        : 'Aucun ticket trouvé.'

  return (
    <div className="flex h-[calc(100vh-64px)] bg-bg overflow-hidden">
      {/* Left column */}
      <div className="w-[360px] md:w-[400px] min-w-56 border-r border-border flex flex-col bg-bg flex-shrink-0">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between flex-shrink-0">
          <h1 className="text-base font-semibold text-white">Mes tickets</h1>
          <button
            onClick={() => navigate('/artist/new-ticket')}
            aria-label="Créer un nouveau ticket"
            className="flex items-center gap-1 bg-purple/20 text-purple border border-purple/40 hover:bg-purple/30 text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer min-h-[32px]"
          >
            <Plus size={12} aria-hidden="true" />
            Nouveau
          </button>
        </div>

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          counts={counts}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <div className="flex-1 overflow-y-auto">
          {filteredTickets.length === 0 ? (
            <EmptyState
              message={emptyMessage}
              ctaLabel={userTickets.length === 0 ? 'Créer un ticket' : undefined}
              onCta={userTickets.length === 0 ? () => navigate('/artist/new-ticket') : undefined}
            />
          ) : (
            filteredTickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                selected={ticket.id === selectedId}
                onClick={() => handleSelect(ticket.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Right column */}
      <div className="flex-1 overflow-y-auto min-w-0">
        {selectedTicket ? (
          <TicketDetail
            ticket={selectedTicket}
            onAddMessage={handleAddMessage}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <EmptyState
              message="Sélectionnez un ticket pour voir les détails."
              ctaLabel="Créer un ticket"
              onCta={() => navigate('/artist/new-ticket')}
            />
          </div>
        )}
      </div>
    </div>
  )
}
