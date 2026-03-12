import { useNavigate } from 'react-router-dom'
import { Plus, TicketIcon, AlertTriangle, Disc, DollarSign, Bell, ArrowDownToLine, MessageCircle } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import { mockReleases } from '../data/mockReleases'
import StatCard from '../components/ui/StatCard'
import TicketRow from '../components/tickets/TicketRow'
import Button from '../components/ui/Button'
import AlbumCover from '../components/ui/AlbumCover'

const platformLabels: Record<string, string> = {
  spotify:    'Spotify',
  appleMusic: 'Apple Music',
  deezer:     'Deezer',
  amazon:     'Amazon',
  tidal:      'Tidal',
}


const notifications = [
  { id: 1, message: 'Votre ticket TK-019 a été mis à jour par', highlight: 'Inès Morel.', time: 'il y a 2h', type: 'info', dot: 'bg-teal animate-pulse-dot' },
  { id: 2, message: 'Vos royalties du mois de mai sont disponibles.', highlight: '', time: 'il y a 1 jour', type: 'success', dot: 'bg-green' },
  { id: 3, message: 'Rappel : vérifiez la disponibilité de', highlight: '\"Nuit Stellaire\" sur Deezer.', time: 'il y a 3 jours', type: 'warning', dot: 'bg-orange' },
]

export default function ArtistDashboard() {
  const navigate = useNavigate()
  const { tickets, currentUser } = useTicketStore()

  const userTickets = tickets.filter((t) => t.artistId === currentUser?.id)
  const openTickets  = userTickets.filter((t) => t.status === 'pending' || t.status === 'in_progress')
  const urgentTickets = userTickets.filter((t) => t.priority === 'critical' && t.status !== 'closed')
  const recentTickets = userTickets.slice(0, 4)
  const artistReleases = mockReleases.filter((r) => r.artistId === currentUser?.id).slice(0, 3)

  // Unread: last message was from an agent
  const unreadTickets = userTickets.filter((t) => {
    if (t.messages.length === 0) return false
    return t.messages[t.messages.length - 1].role === 'agent'
  })

  return (
    <div className="min-h-screen bg-bg p-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
          <p className="text-lgray text-base mt-1">Bienvenue, {currentUser?.name || 'Artiste'}</p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={() => navigate('/artist/new-ticket')}
          className="px-5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(123,94,167,0.4)]"
        >
          <Plus size={15} />
          Nouveau ticket
        </Button>
      </div>

      {/* Balance card */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6 animate-slide-up overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green/8 via-transparent to-teal/5 pointer-events-none" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-muted text-xs font-bold uppercase tracking-wider mb-1">Solde disponible</p>
            <p className="text-5xl font-bold text-white tracking-tight">
              {currentUser?.balance !== undefined
                ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(currentUser.balance)
                : '—'}
            </p>
            <p className="text-lgray text-sm mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green inline-block" />
              Royalties disponibles au retrait
            </p>
          </div>
          <button
            onClick={() => {}}
            className="flex items-center gap-2 bg-green/15 hover:bg-green/25 text-green border border-green/30 rounded-xl px-5 py-3 font-semibold text-sm transition-all duration-150 active:scale-95 min-h-[44px]"
          >
            <ArrowDownToLine size={16} />
            Retirer les fonds
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up">
        <StatCard
          value={openTickets.length}
          label="Tickets ouverts"
          gradient="from-purple to-pink"
          iconBg="bg-purple/15"
          icon={<TicketIcon size={20} className="text-purple" />}
          trend="↑ +2 cette semaine"
        />
        <StatCard
          value={urgentTickets.length}
          label="Tickets urgents"
          gradient="from-red to-orange"
          iconBg="bg-red/15"
          icon={<AlertTriangle size={20} className="text-red" />}
          pulse={urgentTickets.length > 0}
        />
        <StatCard
          value={artistReleases.length}
          label="Sorties actives"
          gradient="from-teal to-green"
          iconBg="bg-teal/15"
          icon={<Disc size={20} className="text-teal" />}
        />
        <StatCard
          value="€342"
          label="Royalties dues"
          gradient="from-green to-teal"
          iconBg="bg-green/15"
          icon={<DollarSign size={20} className="text-green" />}
          trend="Disponibles"
          trendColor="text-green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <div className="lg:col-span-2 animate-slide-up">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between bg-surface px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-white">Tickets récents</h2>
                {unreadTickets.length > 0 && (
                  <span className="flex items-center gap-1 bg-pink/15 text-pink border border-pink/30 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <MessageCircle size={11} />
                    {unreadTickets.length} non lu{unreadTickets.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate('/artist/tickets')}
                className="text-sm text-purple hover:text-purple-light cursor-pointer"
              >
                Voir tous →
              </button>
            </div>
            <div>
              {recentTickets.length === 0 ? (
                <div className="p-8 text-center text-muted text-sm">Aucun ticket pour le moment.</div>
              ) : (
                recentTickets.map((ticket) => {
                  const hasUnread = ticket.messages.length > 0 &&
                    ticket.messages[ticket.messages.length - 1].role === 'agent'
                  return (
                    <div key={ticket.id} className="relative group">
                      <TicketRow
                        ticket={ticket}
                        onClick={() => navigate(`/artist/tickets/${ticket.id}`)}
                      />
                      {hasUnread && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                          <button
                            onClick={(e) => { e.stopPropagation(); navigate(`/artist/tickets/${ticket.id}`) }}
                            className="flex items-center gap-1.5 bg-pink/15 hover:bg-pink/25 text-pink border border-pink/30 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all duration-150"
                          >
                            <MessageCircle size={12} />
                            Répondre
                          </button>
                        </div>
                      )}
                      {hasUnread && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-pink rounded-r-full" />
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>

          {/* Recent Releases */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden mt-6">
            <div className="flex items-center justify-between bg-surface px-5 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-white">Sorties récentes</h2>
              <button
                onClick={() => navigate('/artist/releases')}
                className="text-sm text-purple hover:text-purple-light cursor-pointer"
              >
                Voir toutes →
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {artistReleases.map((release) => (
                <div key={release.id} className="bg-surface border border-border rounded-xl p-4 flex gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <AlbumCover releaseId={release.id} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{release.title}</p>
                    <p className="text-muted text-xs">{release.type}</p>
                    <div className="mt-2 flex flex-col gap-1">
                      {Object.entries(release.platforms).map(([platform, available]) => (
                        <div key={platform} className="flex items-center gap-1.5 text-xs">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${available ? 'bg-green' : 'bg-red'}`} />
                          <span className={available ? 'text-lgray' : 'text-red'}>
                            {platformLabels[platform]}
                            {!available && ' ⚠'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="animate-slide-up">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 bg-surface px-5 py-4 border-b border-border">
              <Bell size={15} className="text-purple" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
            <div className="p-4 flex flex-col">
              {notifications.map((notif, idx) => (
                <div key={notif.id} className={`flex items-start gap-3 py-3 ${idx < notifications.length - 1 ? 'border-b border-border/40' : ''}`}>
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${notif.dot}`} />
                  <div>
                    <p className="text-lgray text-sm leading-snug">
                      {notif.message}{' '}
                      {notif.highlight && <span className="text-white font-medium">{notif.highlight}</span>}
                    </p>
                    <p className="text-muted text-xs mt-0.5">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
