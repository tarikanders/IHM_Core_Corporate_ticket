import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Headphones } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import Button from '../components/ui/Button'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useTicketStore()
  const [selectedRole, setSelectedRole] = useState<'artist' | 'agent' | null>(null)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRoleSelect = (role: 'artist' | 'agent') => {
    setSelectedRole(role)
    setEmail(role === 'artist' ? 'lea@corecorporate.app' : 'ines@corecorporate.app')
  }

  const handleLogin = () => {
    if (!selectedRole) return
    setLoading(true)
    setTimeout(() => {
      const userId = selectedRole === 'artist' ? 'user-lea' : 'agent-ines'
      setUser(userId)
      navigate(selectedRole === 'artist' ? '/artist/dashboard' : '/agent/dashboard')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" style={{ backgroundColor: 'rgba(224,64,251,0.08)' }} />
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-teal/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md px-4 animate-fade-in">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white font-bold text-2xl mb-5"
            style={{ boxShadow: '0 0 40px rgba(123,94,167,0.4)' }}
          >
            CC
          </div>
          <h1 className="text-4xl font-bold text-white">Core Corporate</h1>
          <p className="text-lgray text-base mt-2 text-center">
            Plateforme de support pour artistes indépendants
          </p>
        </div>

        {/* Role selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => handleRoleSelect('artist')}
            className={`
              flex flex-col items-center gap-3 p-6 rounded-2xl border-2 cursor-pointer text-left min-h-40
              ${selectedRole === 'artist'
                ? 'border-purple bg-purple/15 shadow-[0_0_24px_rgba(123,94,167,0.3)]'
                : 'border-border bg-card hover:border-purple/60 hover:bg-purple/10 hover:shadow-[0_0_20px_rgba(123,94,167,0.2)]'
              }
            `}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRole === 'artist' ? 'bg-purple/30' : 'bg-purple/20'}`}>
              <Music size={24} className={selectedRole === 'artist' ? 'text-pink' : 'text-lgray'} />
            </div>
            <div>
              <p className="text-white font-semibold text-base">Je suis un artiste</p>
              <p className="text-lgray text-xs mt-1">Gérez vos sorties et tickets</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('agent')}
            className={`
              flex flex-col items-center gap-3 p-6 rounded-2xl border-2 cursor-pointer text-left min-h-40
              ${selectedRole === 'agent'
                ? 'border-teal bg-teal/10 shadow-[0_0_24px_rgba(0,188,212,0.25)]'
                : 'border-border bg-card hover:border-teal/60 hover:bg-teal/5 hover:shadow-[0_0_20px_rgba(0,188,212,0.15)]'
              }
            `}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRole === 'agent' ? 'bg-teal/20' : 'bg-teal/10'}`}>
              <Headphones size={24} className={selectedRole === 'agent' ? 'text-teal' : 'text-lgray'} />
            </div>
            <div>
              <p className="text-white font-semibold text-base">Je suis un agent support</p>
              <p className="text-lgray text-xs mt-1">Traitez les demandes de support</p>
            </div>
          </button>
        </div>

        {/* Email + Login */}
        {selectedRole && (
          <div className="flex flex-col gap-4 animate-slide-up">
            <div>
              <label className="text-lgray text-sm font-medium mb-2 block">Adresse email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-dgray border border-border rounded-xl px-4 py-3 text-white w-full focus:border-purple focus:ring-1 focus:ring-purple outline-none text-sm"
                placeholder="votre@email.com"
              />
            </div>
            <Button
              variant="primary"
              size="lg"
              onClick={handleLogin}
              loading={loading}
              className="w-full"
            >
              Connexion
            </Button>
            <p className="text-muted text-xs text-center">Mockup IHM — aucune donnée réelle</p>
          </div>
        )}
      </div>
    </div>
  )
}
