
import { useNavigate } from 'react-router-dom'
import { Plus, TicketIcon, AlertTriangle, Disc, DollarSign, Bell } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import { mockReleases } from '../data/mockReleases'
import StatCard from '../components/ui/StatCard'
import TicketRow from '../components/tickets/TicketRow'
import Button from '../components/ui/Button'

const platformLabels: Record<string, string> = {
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  deezer: 'Deezer',
  amazon: 'Amazon',
  tidal: 'Tidal',
}

const notifications = [
  { id: 1, message: "Votre ticket TK-019 a été mis à jour par Inès Morel.", time: "il y a 2h", type: 'info' },
  { id: 2, message: "Votre royalties du mois de mai sont disponibles.", time: "il y a 1 jour", type: 'success' },
  { id: 3, message: "Rappel : vérifiez la disponibilité de 'Nuit Stellaire' sur Deezer.", time: "il y a 3 jours", type: 'warning' },
]

export default function ArtistDashboard() {
  const navigate = useNavigate()
  const { tickets, currentUser } = useTicketStore()

  const userTickets = tickets.filter((t) => t.artistId === currentUser?.id)
  const openTickets = userTickets.filter((t) => t.status === 'pending' || t.status === 'in_progress')
  const urgentTickets = userTickets.filter((t) => t.priority === 'critical' && t.status !== 'closed')
  const recentTickets = userTickets.slice(0, 4)

  const artistReleases = mockReleases.filter((r) => r.artistId === currentUser?.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-bg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Tableau de bord</h1>
          <p className="text-lgray text-sm mt-1">
            Bienvenue, {currentUser?.name || 'Artiste'}
          </p>
        </div>
        <Button variant="primary" onClick={() => navigate('/artist/new-ticket')}>
          <Plus size={15} />
          Nouveau ticket
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          value={openTickets.length}
          label="Tickets ouverts"
          color="#7B5EA7"
          icon={<TicketIcon size={24} />}
        />
        <StatCard
          value={urgentTickets.length}
          label="Tickets urgents"
          color="#FF1744"
          icon={<AlertTriangle size={24} />}
        />
        <StatCard
          value={artistReleases.length}
          label="Sorties actives"
          color="#00BCD4"
          icon={<Disc size={24} />}
        />
        <StatCard
          value="€342"
          label="Royalties dues"
          color="#00E676"
          icon={<DollarSign size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-dgray/30 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-dgray/30">
              <h2 className="text-base font-semibold text-white">Tickets récents</h2>
              <button
                onClick={() => navigate('/artist/tickets')}
                className="text-xs text-purple hover:text-purple/80 transition-colors cursor-pointer"
              >
                Voir tous →
              </button>
            </div>
            <div className="divide-y divide-dgray/20">
              {recentTickets.length === 0 ? (
                <div className="p-8 text-center text-muted text-sm">Aucun ticket pour le moment.</div>
              ) : (
                recentTickets.map((ticket) => (
                  <TicketRow
                    key={ticket.id}
                    ticket={ticket}
                    onClick={() => navigate(`/artist/tickets/${ticket.id}`)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Recent Releases */}
          <div className="bg-card border border-dgray/30 rounded-xl overflow-hidden mt-6">
            <div className="flex items-center justify-between p-5 border-b border-dgray/30">
              <h2 className="text-base font-semibold text-white">Sorties récentes</h2>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {artistReleases.map((release) => (
                <div key={release.id} className="bg-dgray/30 rounded-xl p-4 border border-dgray/40">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-purple/20 rounded-lg flex items-center justify-center">
                      <Disc size={14} className="text-purple" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{release.title}</p>
                      <p className="text-xs text-muted">{release.type}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {Object.entries(release.platforms).map(([platform, available]) => (
                      <div key={platform} className="flex items-center gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${available ? 'bg-green' : 'bg-red'}`} />
                        <span className={available ? 'text-lgray' : 'text-red'}>
                          {platformLabels[platform]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div>
          <div className="bg-card border border-dgray/30 rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 p-5 border-b border-dgray/30">
              <Bell size={15} className="text-purple" />
              <h2 className="text-base font-semibold text-white">Notifications</h2>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {notifications.map((notif) => (
                <div key={notif.id} className="flex items-start gap-3 p-3 bg-dgray/20 rounded-lg border border-dgray/30">
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                    notif.type === 'success' ? 'bg-green' :
                    notif.type === 'warning' ? 'bg-orange' : 'bg-teal'
                  }`} />
                  <div>
                    <p className="text-xs text-white leading-relaxed">{notif.message}</p>
                    <p className="text-xs text-muted mt-1">{notif.time}</p>
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
