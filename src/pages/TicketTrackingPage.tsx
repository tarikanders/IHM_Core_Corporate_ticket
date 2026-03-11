import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import type { Status, Message } from '../types/ticket'
import FilterBar from '../components/tickets/FilterBar'
import TicketRow from '../components/tickets/TicketRow'
import TicketDetail from '../components/tickets/TicketDetail'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'

export default function TicketTrackingPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { tickets, currentUser, addMessage } = useTicketStore()

  const [activeFilter, setActiveFilter] = useState<Status | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const userTickets = tickets.filter((t) => t.artistId === currentUser?.id)

  const filteredTickets = userTickets.filter((t) => {
    const matchesFilter = activeFilter === 'all' || t.status === activeFilter
    const matchesSearch = !searchQuery || t.subject.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Auto-select first ticket or URL param
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
    if (selectedId) {
      addMessage(selectedId, msg)
    }
  }

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Left column - ticket list */}
      <div className="w-[37%] min-w-64 border-r border-dgray/30 flex flex-col bg-bg">
        <div className="p-4 border-b border-dgray/30 flex items-center justify-between">
          <h1 className="text-base font-semibold text-white">Mes tickets</h1>
          <Button variant="primary" size="sm" onClick={() => navigate('/artist/new-ticket')}>
            <Plus size={13} />
            Nouveau
          </Button>
        </div>

        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex-1 overflow-y-auto divide-y divide-dgray/20">
          {filteredTickets.length === 0 ? (
            <EmptyState
              message="Aucun ticket trouvé."
              ctaLabel="Créer un ticket"
              onCta={() => navigate('/artist/new-ticket')}
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

      {/* Right column - ticket detail */}
      <div className="flex-1 flex flex-col">
        {selectedTicket ? (
          <TicketDetail
            ticket={selectedTicket}
            onAddMessage={handleAddMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center">
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
