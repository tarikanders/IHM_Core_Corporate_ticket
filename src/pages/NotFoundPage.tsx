import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useTicketStore } from '../store/useTicketStore'

export default function NotFoundPage() {
  const navigate = useNavigate()
  const currentUser = useTicketStore((s) => s.currentUser)

  const handleBack = () => {
    if (currentUser?.role === 'artist') navigate('/artist/dashboard')
    else if (currentUser?.role === 'agent') navigate('/agent/dashboard')
    else navigate('/')
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center animate-fade-in">
      <div className="text-9xl font-bold text-purple/20 select-none">404</div>
      <h1 className="text-2xl font-semibold text-white mt-4">Page introuvable</h1>
      <p className="text-lgray text-sm mt-2 text-center max-w-xs">
        La page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <div className="mt-8">
        <Button variant="primary" onClick={handleBack}>
          Retour à l'accueil
        </Button>
      </div>
    </div>
  )
}
