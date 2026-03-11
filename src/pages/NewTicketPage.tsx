import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight, CheckCircle } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import type { Ticket } from '../types/ticket'
import Card from '../components/ui/Card'
import TicketForm from '../components/tickets/TicketForm'

export default function NewTicketPage() {
  const navigate = useNavigate()
  const { addTicket, currentUser } = useTicketStore()
  const [toast, setToast] = useState(false)

  const handleSubmit = (ticketData: Partial<Ticket>) => {
    if (!currentUser) return

    addTicket({
      subject: ticketData.subject || '',
      category: ticketData.category || 'account',
      priority: ticketData.priority || 'low',
      status: 'pending',
      artistId: currentUser.id,
      releaseId: ticketData.releaseId,
      assignedTo: undefined,
    })

    setToast(true)
    setTimeout(() => {
      navigate('/artist/tickets')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-bg p-6">
      {/* Toast notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-green/10 border border-green/30 text-green rounded-lg px-4 py-3 flex items-center gap-2 text-sm font-medium shadow-xl">
          <CheckCircle size={16} />
          Ticket créé avec succès ! Redirection...
        </div>
      )}

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted mb-6">
        <Link to="/artist/dashboard" className="hover:text-lgray transition-colors">Accueil</Link>
        <ChevronRight size={12} />
        <Link to="/artist/tickets" className="hover:text-lgray transition-colors">Support</Link>
        <ChevronRight size={12} />
        <span className="text-lgray">Nouveau ticket</span>
      </div>

      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">Nouveau ticket</h1>
          <p className="text-lgray text-sm mt-1">
            Décrivez votre problème et notre équipe vous répondra rapidement.
          </p>
        </div>

        <Card>
          {currentUser ? (
            <TicketForm onSubmit={handleSubmit} artistId={currentUser.id} />
          ) : (
            <div className="text-center py-8 text-muted text-sm">
              Veuillez vous connecter pour créer un ticket.
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
