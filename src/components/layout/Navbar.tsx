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
        <div
          className="w-9 h-9 bg-gradient-to-br from-purple to-pink rounded-xl flex items-center justify-center text-white font-bold text-sm"
          style={{ boxShadow: '0 0 12px rgba(123,94,167,0.4)' }}
        >
          CC
        </div>
        <span className="font-semibold text-white text-base hidden sm:block">Core Corporate</span>
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
