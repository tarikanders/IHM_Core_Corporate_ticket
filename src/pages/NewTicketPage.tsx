import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import type { Ticket } from '../types/ticket'
import TicketForm from '../components/tickets/TicketForm'
import Toast from '../components/ui/Toast'

export default function NewTicketPage() {
  const navigate = useNavigate()
  const { addTicket, currentUser } = useTicketStore()
  const [toast, setToast] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (ticketData: Partial<Ticket>) => {
    if (!currentUser) return
    setLoading(true)
    setTimeout(() => {
      addTicket({
        subject:    ticketData.subject || '',
        category:   ticketData.category || 'account',
        priority:   ticketData.priority || 'low',
        status:     'pending',
        artistId:   currentUser.id,
        releaseId:  ticketData.releaseId,
        assignedTo: undefined,
      })
      setLoading(false)
      setToast(true)
      setTimeout(() => navigate('/artist/tickets'), 1500)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-bg p-6 animate-fade-in">
      <Toast
        show={toast}
        title="Ticket créé avec succès !"
        subtitle="Redirection vers vos tickets..."
        type="success"
        onClose={() => setToast(false)}
      />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link to="/artist/dashboard" className="hover:text-white">Accueil</Link>
        <ChevronRight size={14} />
        <Link to="/artist/tickets" className="hover:text-white">Support</Link>
        <ChevronRight size={14} />
        <span className="text-lgray">Nouveau ticket</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        {/* Main form */}
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white">Nouveau ticket</h1>
            <p className="text-lgray text-sm mt-1">
              Décrivez votre problème et notre équipe vous répondra rapidement.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-6">
            {currentUser ? (
              <TicketForm onSubmit={handleSubmit} artistId={currentUser.id} loading={loading} />
            ) : (
              <div className="text-center py-8 text-muted text-sm">
                Veuillez vous connecter pour créer un ticket.
              </div>
            )}
          </div>
        </div>

        {/* Sidebar recap */}
        <div className="hidden lg:block">
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-24">
            <h3 className="font-semibold text-white mb-4">Récapitulatif</h3>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Statut initial</span>
                <span className="text-white font-medium">En attente</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Délai de réponse</span>
                <span className="text-lgray">Selon priorité</span>
              </div>
              <div className="border-t border-border pt-3">
                <p className="text-muted text-xs">SLA par priorité :</p>
                <div className="mt-2 flex flex-col gap-1.5">
                  {[
                    { label: 'Critique', sla: '< 4h',    color: 'text-red' },
                    { label: 'Haute',    sla: '< 24h',   color: 'text-orange' },
                    { label: 'Moyenne',  sla: '< 3j',    color: 'text-teal' },
                    { label: 'Faible',   sla: '< 7j',    color: 'text-lgray' },
                  ].map((p) => (
                    <div key={p.label} className="flex justify-between text-xs">
                      <span className={p.color}>{p.label}</span>
                      <span className="text-lgray">{p.sla}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
