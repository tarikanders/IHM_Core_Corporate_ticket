import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronDown, Music, Headphones, LayoutDashboard, Disc, DollarSign, TicketIcon, User, Users, BarChart2, Settings } from 'lucide-react'
import { useTicketStore } from '../../store/useTicketStore'

interface NavbarProps {
  role: 'artist' | 'agent'
}

const artistLinks = [
  { label: 'Dashboard',   path: '/artist/dashboard', icon: <LayoutDashboard size={15} /> },
  { label: 'Mes sorties', path: '/artist/releases',  icon: <Disc size={15} /> },
  { label: 'Royalties',   path: '/artist/royalties', icon: <DollarSign size={15} /> },
  { label: 'Support',     path: '/artist/tickets',   icon: <TicketIcon size={15} /> },
  { label: 'Profil',      path: '/artist/profile',   icon: <User size={15} /> },
]

const agentLinks = [
  { label: 'Tickets',      path: '/agent/dashboard', icon: <TicketIcon size={15} /> },
  { label: 'Artistes',     path: '/agent/artists',   icon: <Users size={15} /> },
  { label: 'Statistiques', path: '/agent/stats',     icon: <BarChart2 size={15} /> },
  { label: 'Paramètres',   path: '/agent/settings',  icon: <Settings size={15} /> },
]

export default function Navbar({ role }: NavbarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const { currentUser } = useTicketStore()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const links = role === 'artist' ? artistLinks : agentLinks

  const handleRoleChange = () => {
    setDropdownOpen(false)
    navigate('/')
  }

  return (
    <nav className="bg-surface border-b border-white/5 px-6 h-16 flex items-center gap-8 sticky top-0 z-50 backdrop-blur-sm">
      {/* Logo */}
      <div className="flex items-center gap-2.5 flex-shrink-0">
        <svg
          width="36" height="36" viewBox="0 0 36 36" fill="none"
          style={{ filter: 'drop-shadow(0 0 8px rgba(224,64,251,0.35))' }}
        >
          <defs>
            <linearGradient id="ccg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7B5EA7" />
              <stop offset="100%" stopColor="#E040FB" />
            </linearGradient>
          </defs>
          {/* Background */}
          <rect width="36" height="36" rx="9" fill="url(#ccg)" />
          {/* Outer C arc */}
          <path
            d="M23 8.5C17 8.5 12 12.9 12 18s5 9.5 11 9.5"
            stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none"
          />
          {/* Inner C arc — echo / depth */}
          <path
            d="M22 12.5C18.5 12.5 16 15 16 18s2.5 5.5 6 5.5"
            stroke="rgba(255,255,255,0.55)" strokeWidth="2" strokeLinecap="round" fill="none"
          />
          {/* Dot accent — note / signal */}
          <circle cx="23.5" cy="27.5" r="1.8" fill="white" opacity="0.9" />
        </svg>
        <div className="hidden sm:flex flex-col leading-none">
          <span className="font-bold text-white text-sm tracking-wide">CORE</span>
          <span className="font-medium text-purple text-xs tracking-widest">CORPORATE</span>
        </div>
      </div>

      {/* Nav links */}
      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        {links.map((link) => {
          const isActive = location.pathname === link.path || location.pathname.startsWith(link.path + '/')
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
                ${isActive
                  ? 'bg-purple/20 text-white'
                  : 'text-lgray hover:text-white hover:bg-white/5'
                }
              `}
            >
              {link.icon}
              {link.label}
            </Link>
          )
        })}
      </div>

      {/* User avatar + dropdown */}
      <div className="relative flex-shrink-0">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: currentUser?.color || '#7B5EA7' }}
          >
            {currentUser?.avatar || (role === 'artist' ? <Music size={14} /> : <Headphones size={14} />)}
          </div>
          <div className="hidden sm:flex flex-col items-start">
            <span className="text-sm text-white font-medium leading-none">{currentUser?.name || 'Utilisateur'}</span>
            <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full mt-0.5 ${role === 'artist' ? 'text-teal' : 'text-purple'}`}>
              {role === 'artist' ? 'ARTISTE' : 'AGENT'}
            </span>
          </div>
          <ChevronDown size={14} className="text-muted" />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-2xl z-50 animate-fade-in">
            <div className="p-2">
              <div className="px-3 py-2 text-xs text-muted border-b border-border mb-1">
                {role === 'artist' ? 'Artiste indépendant' : 'Agent support'}
              </div>
              <button
                onClick={handleRoleChange}
                className="w-full text-left px-3 py-2 text-sm text-lgray hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
              >
                Changer de rôle
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
