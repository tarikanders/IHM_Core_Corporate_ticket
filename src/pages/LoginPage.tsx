import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Headphones } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useTicketStore()
  const [selectedRole, setSelectedRole] = useState<'artist' | 'agent' | null>(null)
  const [email, setEmail] = useState('')

  const handleRoleSelect = (role: 'artist' | 'agent') => {
    setSelectedRole(role)
    setEmail(role === 'artist' ? 'lea@corecorporate.app' : 'ines@corecorporate.app')
  }

  const handleLogin = () => {
    if (!selectedRole) return
    const userId = selectedRole === 'artist' ? 'user-lea' : 'agent-ines'
    setUser(userId)
    navigate(selectedRole === 'artist' ? '/artist/dashboard' : '/agent/dashboard')
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden">
      {/* Background decorations */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: '#7B5EA7' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-10 pointer-events-none"
        style={{ backgroundColor: '#E040FB' }}
      />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-purple rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-4 shadow-lg">
            CC
          </div>
          <h1 className="text-2xl font-bold text-white">Core Corporate</h1>
          <p className="text-lgray text-sm mt-1 text-center">
            Plateforme de support pour artistes indépendants
          </p>
        </div>

        {/* Role selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            type="button"
            onClick={() => handleRoleSelect('artist')}
            className={`
              flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all cursor-pointer
              ${selectedRole === 'artist'
                ? 'border-purple bg-surface shadow-lg shadow-purple/10'
                : 'border-dgray/40 bg-card hover:border-purple/40 hover:bg-surface'
              }
            `}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedRole === 'artist' ? 'bg-purple' : 'bg-dgray'}`}>
              <Music size={20} className={selectedRole === 'artist' ? 'text-white' : 'text-lgray'} />
            </div>
            <span className={`text-sm font-medium ${selectedRole === 'artist' ? 'text-white' : 'text-lgray'}`}>
              Je suis un artiste
            </span>
          </button>

          <button
            type="button"
            onClick={() => handleRoleSelect('agent')}
            className={`
              flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all cursor-pointer
              ${selectedRole === 'agent'
                ? 'border-purple bg-surface shadow-lg shadow-purple/10'
                : 'border-dgray/40 bg-card hover:border-purple/40 hover:bg-surface'
              }
            `}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedRole === 'agent' ? 'bg-purple' : 'bg-dgray'}`}>
              <Headphones size={20} className={selectedRole === 'agent' ? 'text-white' : 'text-lgray'} />
            </div>
            <span className={`text-sm font-medium ${selectedRole === 'agent' ? 'text-white' : 'text-lgray'}`}>
              Je suis un agent support
            </span>
          </button>
        </div>

        {/* Email + Login */}
        {selectedRole && (
          <div className="flex flex-col gap-4">
            <Input
              label="Adresse email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
            />
            <Button variant="primary" size="lg" onClick={handleLogin} className="w-full">
              Connexion
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
