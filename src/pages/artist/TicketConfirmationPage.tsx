import { useNavigate, useLocation } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import Button from '../../components/ui/Button'

export default function TicketConfirmationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const ticketId = (location.state as { ticketId?: string })?.ticketId || 'TK-XXX'

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center animate-fade-in">
      <div className="flex flex-col items-center text-center max-w-md px-4">
        <div className="w-20 h-20 rounded-full bg-green/15 border border-green/30 flex items-center justify-center mb-6 animate-slide-up">
          <CheckCircle size={40} className="text-green" />
        </div>
        <h1 className="text-3xl font-bold text-white">Ticket créé !</h1>
        <p className="text-lgray mt-3">
          Votre ticket <span className="font-mono text-teal">{ticketId}</span> a été créé avec succès. Notre équipe vous répondra dans les délais convenus.
        </p>
        <div className="flex gap-3 mt-8">
          <Button variant="secondary" onClick={() => navigate('/artist/tickets')}>
            Voir mon ticket
          </Button>
          <Button variant="primary" onClick={() => navigate('/artist/dashboard')}>
            Retour au dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
