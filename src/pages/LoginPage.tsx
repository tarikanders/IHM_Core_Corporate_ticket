import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Music, Headphones } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import Button from '../components/ui/Button'

/** Illustration SVG atmosphérique d'un studio d'enregistrement */
function StudioPanel({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 800"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      className="w-full h-full"
    >
      <defs>
        <radialGradient id={`ceil${flip ? 'r' : 'l'}`} cx="50%" cy="0%" r="60%">
          <stop offset="0%" stopColor="#5c3200" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0a0507" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`lamp${flip ? 'r' : 'l'}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff9940" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#c05a00" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c05a00" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`spk${flip ? 'r' : 'l'}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2a1a00" />
          <stop offset="100%" stopColor="#0d0905" />
        </radialGradient>
        <linearGradient id={`con${flip ? 'r' : 'l'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a1008" />
          <stop offset="100%" stopColor="#0a0705" />
        </linearGradient>
        <linearGradient id={`wall${flip ? 'r' : 'l'}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#120b04" />
          <stop offset="50%" stopColor="#1e1108" />
          <stop offset="100%" stopColor="#120b04" />
        </linearGradient>
      </defs>

      {/* Background wall — dark warm wood */}
      <rect width="400" height="800" fill={`url(#wall${flip ? 'r' : 'l'})`} />

      {/* Wood panel texture lines */}
      {[60, 130, 200, 270, 340].map((y, i) => (
        <line key={i} x1="0" y1={y} x2="400" y2={y}
          stroke="#2a1a08" strokeWidth="1" opacity="0.5" />
      ))}
      {[80, 160, 240, 320].map((x, i) => (
        <rect key={i} x={x} y="0" width="2" height="440"
          fill="#1a0e05" opacity="0.4" />
      ))}

      {/* Ceiling light halo */}
      <ellipse cx="200" cy="0" rx="200" ry="180" fill={`url(#ceil${flip ? 'r' : 'l'})`} />

      {/* Lamp fixture */}
      <rect x="185" y="0" width="30" height="18" rx="4" fill="#2a1a08" />
      <ellipse cx="200" cy="20" rx="28" ry="10" fill="#ff9940" opacity="0.9" />
      <ellipse cx="200" cy="20" rx="50" ry="40" fill={`url(#lamp${flip ? 'r' : 'l'})`} />

      {/* Studio monitor speaker — main */}
      <rect x="80" y="80" width="240" height="200" rx="10" fill={`url(#spk${flip ? 'r' : 'l'})`} />
      <rect x="82" y="82" width="236" height="196" rx="9" fill="none" stroke="#3a2510" strokeWidth="2" />
      {/* Woofer */}
      <circle cx="200" cy="155" r="72" fill="#0a0705" />
      <circle cx="200" cy="155" r="68" fill="none" stroke="#2a1a08" strokeWidth="3" />
      <circle cx="200" cy="155" r="56" fill="#111009" />
      <circle cx="200" cy="155" r="42" fill="#0d0c08" />
      {[48, 54, 60].map((r, i) => (
        <circle key={i} cx="200" cy="155" r={r} fill="none"
          stroke="#1e1508" strokeWidth="1.5" opacity={0.6 - i * 0.15} />
      ))}
      <circle cx="200" cy="155" r="14" fill="#1a1208" />
      <circle cx="200" cy="155" r="8" fill="#2e1e0a" />
      <circle cx="200" cy="155" r="3" fill="#4a3010" />
      {/* Tweeter */}
      <circle cx="200" cy="100" r="16" fill="#0a0705" />
      <circle cx="200" cy="100" r="13" fill="none" stroke="#2a1a08" strokeWidth="1.5" />
      <circle cx="200" cy="100" r="7" fill="#1a1208" />
      <circle cx="200" cy="100" r="3" fill="#2e1e0a" />
      {/* Speaker grille slots */}
      {[225, 240, 255, 270].map((y, i) => (
        <rect key={i} x="90" y={y} width="220" height="3" rx="1.5"
          fill="#1a1008" opacity="0.8" />
      ))}

      {/* Mixing console surface */}
      <rect x="-20" y="440" width="440" height="200" rx="0" fill={`url(#con${flip ? 'r' : 'l'})`} />
      <rect x="-20" y="438" width="440" height="4" fill="#2a1a08" />

      {/* Faders — vertical */}
      {Array.from({ length: 14 }, (_, i) => {
        const x = 10 + i * 28
        const trackH = 120
        const faderPos = 30 + Math.random() * 70
        return (
          <g key={i}>
            {/* Track */}
            <rect x={x + 10} y="460" width="4" height={trackH} rx="2" fill="#0d0905" />
            {/* Fader cap */}
            <rect x={x + 4} y={460 + faderPos - 6} width="16" height="12" rx="2" fill="#3a2a10" />
            <rect x={x + 4} y={460 + faderPos - 1} width="16" height="2" rx="1" fill="#c87020" opacity="0.8" />
          </g>
        )
      })}

      {/* Knobs row */}
      {Array.from({ length: 10 }, (_, i) => {
        const x = 20 + i * 38
        return (
          <g key={i}>
            <circle cx={x} cy="608" r="11" fill="#1a1008" />
            <circle cx={x} cy="608" r="9" fill="#251808" />
            <circle cx={x} cy="608" r="7" fill="none" stroke="#3a2510" strokeWidth="1" />
            <circle cx={x + 3} cy="602" r="2" fill="#c87020" opacity="0.7" />
          </g>
        )
      })}

      {/* VU meters */}
      {[320, 350, 380].map((x, mi) => (
        <g key={mi}>
          <rect x={x} y="460" width="18" height="120" rx="2" fill="#0a0705" />
          {Array.from({ length: 12 }, (_, i) => {
            const active = i < (mi === 1 ? 9 : mi === 0 ? 7 : 5)
            const color = i > 9 ? '#FF1744' : i > 7 ? '#FF6D00' : '#00E676'
            return (
              <rect key={i} x={x + 2} y={570 - i * 9} width="14" height="6" rx="1"
                fill={active ? color : '#1a1008'} opacity={active ? 0.9 : 0.4} />
            )
          })}
        </g>
      ))}

      {/* Floor */}
      <rect x="-20" y="640" width="440" height="160" fill="#120c06" />
      {/* Floor reflection */}
      <rect x="-20" y="640" width="440" height="3" fill="#2a1a08" opacity="0.5" />

      {/* Waveform decoration at bottom */}
      <g opacity="0.25">
        {Array.from({ length: 60 }, (_, i) => {
          const h = 5 + Math.abs(Math.sin(i * 0.4) * 20 + Math.sin(i * 0.9) * 10)
          return (
            <rect key={i} x={i * 7} y={720 - h / 2} width="4" height={h} rx="1"
              fill="#7B5EA7" />
          )
        })}
      </g>

      {/* Dark vignette overlay on edges */}
      <rect x="0" y="0" width="80" height="800"
        fill="url(#wallr)" opacity="0.6"
        style={{ background: 'linear-gradient(to right, #0a0507, transparent)' }} />
    </svg>
  )
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { setUser } = useTicketStore()
  const [selectedRole, setSelectedRole] = useState<'artist' | 'agent' | null>(null)
  const [email, setEmail] = useState('')
  const [password] = useState('••••••••••')
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
    <div className="min-h-screen bg-bg flex overflow-hidden">
      {/* Left studio panel */}
      <div className="hidden lg:block w-[360px] xl:w-[420px] flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0">
          <StudioPanel />
        </div>
        {/* Gradient overlay to blend with center */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg" />
      </div>

      {/* Center — login form */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        {/* Subtle background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 w-full max-w-md animate-fade-in">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <div
              className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple to-pink flex items-center justify-center text-white font-bold text-2xl mb-5"
              style={{ boxShadow: '0 0 40px rgba(123,94,167,0.45)' }}
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
                flex flex-col items-center gap-3 p-6 rounded-2xl border-2 cursor-pointer text-left min-h-40 transition-all duration-150
                ${selectedRole === 'artist'
                  ? 'border-purple bg-purple/15 shadow-[0_0_24px_rgba(123,94,167,0.3)]'
                  : 'border-border bg-card hover:border-purple/60 hover:bg-purple/10'
                }
              `}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRole === 'artist' ? 'bg-purple/30' : 'bg-purple/20'}`}>
                <Music size={24} className={selectedRole === 'artist' ? 'text-pink' : 'text-lgray'} />
              </div>
              <div>
                <p className="text-white font-semibold text-base">Artiste</p>
                <p className="text-lgray text-xs mt-1">Gérez vos sorties et tickets</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSelect('agent')}
              className={`
                flex flex-col items-center gap-3 p-6 rounded-2xl border-2 cursor-pointer text-left min-h-40 transition-all duration-150
                ${selectedRole === 'agent'
                  ? 'border-teal bg-teal/10 shadow-[0_0_24px_rgba(0,188,212,0.25)]'
                  : 'border-border bg-card hover:border-teal/60 hover:bg-teal/5'
                }
              `}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedRole === 'agent' ? 'bg-teal/20' : 'bg-teal/10'}`}>
                <Headphones size={24} className={selectedRole === 'agent' ? 'text-teal' : 'text-lgray'} />
              </div>
              <div>
                <p className="text-white font-semibold text-base">Agent support</p>
                <p className="text-lgray text-xs mt-1">Traitez les demandes</p>
              </div>
            </button>
          </div>

          {/* Form fields — visible once role selected */}
          {selectedRole && (
            <div className="flex flex-col gap-4 animate-slide-up">
              <div>
                <label className="text-lgray text-sm font-medium mb-2 block">Adresse email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-dgray border border-border rounded-xl px-4 py-3 text-white w-full focus:border-purple focus:ring-1 focus:ring-purple outline-none text-sm"
                />
              </div>
              <div>
                <label className="text-lgray text-sm font-medium mb-2 block">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  readOnly
                  className="bg-dgray border border-border rounded-xl px-4 py-3 text-white w-full focus:border-purple focus:ring-1 focus:ring-purple outline-none text-sm cursor-default"
                />
              </div>
              <Button
                variant="primary"
                size="lg"
                onClick={handleLogin}
                loading={loading}
                className="w-full"
              >
                Se connecter
              </Button>
              <p className="text-muted text-xs text-center">Mockup IHM — identifiants pré-remplis</p>
            </div>
          )}
        </div>
      </div>

      {/* Right studio panel */}
      <div className="hidden lg:block w-[360px] xl:w-[420px] flex-shrink-0 relative overflow-hidden">
        <div className="absolute inset-0">
          <StudioPanel flip />
        </div>
        {/* Gradient overlay to blend with center */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-bg" />
      </div>
    </div>
  )
}
