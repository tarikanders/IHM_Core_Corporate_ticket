import { useNavigate } from 'react-router-dom'
import { AlertTriangle, TicketIcon, UserCheck, Star } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import { mockUsers } from '../data/mockUsers'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import type { Category } from '../types/ticket'

const categoryColors: Record<Category, string> = {
  distribution: '#00BCD4',
  royalties:    '#00E676',
  metadata:     '#7B5EA7',
  account:      '#E040FB',
}

const categoryLabels: Record<Category, string> = {
  distribution: 'Distribution',
  royalties:    'Royalties',
  metadata:     'Métadonnées',
  account:      'Compte',
}

const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }

function getArtistById(artistId: string) {
  return mockUsers.find((u) => u.id === artistId)
}

export default function AgentDashboard() {
  const navigate = useNavigate()
  const { tickets, currentUser } = useTicketStore()

  const openTickets     = tickets.filter((t) => t.status !== 'closed')
  const criticalTickets = tickets.filter((t) => t.priority === 'critical' && t.status !== 'closed')
  const assignedToMe    = tickets.filter((t) => t.assignedTo === currentUser?.id && t.status !== 'closed')

  const sortedTickets = [...openTickets].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )

  const categories: Category[] = ['distribution', 'royalties', 'metadata', 'account']
  const categoryBreakdown = categories.map((cat) => ({
    category: cat,
    count: openTickets.filter((t) => t.category === cat).length,
    pct: openTickets.length
      ? Math.round((openTickets.filter((t) => t.category === cat).length / openTickets.length) * 100)
      : 0,
  }))

  const now = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="min-h-screen bg-bg p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Tableau de bord — Agent</h1>
        <p className="text-lgray text-sm mt-1 capitalize">{now}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up">
        <StatCard
          value={openTickets.length}
          label="Tickets ouverts"
          gradient="from-purple to-purple-light"
          iconBg="bg-purple/15"
          icon={<TicketIcon size={20} className="text-purple" />}
          onClick={() => navigate('/agent/tickets/TK-001')}
        />
        <StatCard
          value={criticalTickets.length}
          label="Critiques"
          gradient="from-red to-orange"
          iconBg="bg-red/15"
          icon={<AlertTriangle size={20} className="text-red" />}
          pulse={criticalTickets.length > 0}
          onClick={() => criticalTickets[0] && navigate(`/agent/tickets/${criticalTickets[0].id}`)}
        />
        <StatCard
          value={assignedToMe.length}
          label="Assignés à moi"
          gradient="from-teal to-green"
          iconBg="bg-teal/15"
          icon={<UserCheck size={20} className="text-teal" />}
          onClick={() => assignedToMe[0] && navigate(`/agent/tickets/${assignedToMe[0].id}`)}
        />
        <StatCard
          value="4.7★"
          label="Satisfaction"
          gradient="from-green to-teal"
          iconBg="bg-green/15"
          icon={<Star size={20} className="text-green" />}
          onClick={() => navigate('/agent/stats')}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 animate-slide-up">
        {/* Tickets list — compact */}
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="bg-surface px-5 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">
              Tickets actifs
              <span className="text-xs text-muted ml-2 font-normal">({sortedTickets.length})</span>
            </h2>
            <span className="text-xs text-muted">triés par priorité</span>
          </div>
          <div>
            {sortedTickets.map((ticket) => {
              const artist = getArtistById(ticket.artistId)
              const isCritical = ticket.priority === 'critical'
              return (
                <div
                  key={ticket.id}
                  onClick={() => navigate(`/agent/tickets/${ticket.id}`)}
                  className={`
                    flex items-center gap-3 px-4 py-3 border-b border-white/5 cursor-pointer
                    transition-colors duration-100 border-l-2
                    ${isCritical ? 'border-l-red bg-red/3 hover:bg-red/6' : 'border-l-transparent hover:bg-white/3'}
                  `}
                >
                  {/* Avatar */}
                  {artist && (
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                      style={{ backgroundColor: artist.color }}
                    >
                      {artist.avatar}
                    </div>
                  )}
                  {/* Main info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-teal text-xs flex-shrink-0">{ticket.id}</span>
                      <span className="text-white text-sm truncate">{ticket.subject}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-muted text-xs">{artist?.name}</span>
                      <span className="text-muted text-xs">·</span>
                      <Badge category={ticket.category} variant="inline" />
                    </div>
                  </div>
                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge priority={ticket.priority} variant="pill" />
                    <Badge status={ticket.status} variant="pill" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Category breakdown */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Par catégorie</h2>
            <div className="flex flex-col gap-3">
              {categoryBreakdown.map(({ category, count, pct }) => (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-lgray text-xs">{categoryLabels[category]}</span>
                    <span className="text-white text-xs font-medium">{count}</span>
                  </div>
                  <div className="bg-dgray rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: categoryColors[category] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My assigned tickets */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden flex-1">
            <div className="bg-surface px-4 py-3 border-b border-border">
              <h2 className="text-sm font-semibold text-white">
                Assignés à moi
                <span className="text-xs text-muted ml-2 font-normal">({assignedToMe.length})</span>
              </h2>
            </div>
            <div className="p-3 flex flex-col gap-1">
              {assignedToMe.length === 0 ? (
                <p className="text-center py-5 text-muted text-xs">Aucun ticket assigné.</p>
              ) : (
                assignedToMe.map((ticket) => (
                  <div
                    key={ticket.id}
                    onClick={() => navigate(`/agent/tickets/${ticket.id}`)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer"
                  >
                    <span className="font-mono text-teal text-xs w-14 flex-shrink-0">{ticket.id}</span>
                    <span className="flex-1 text-sm text-lgray truncate">{ticket.subject}</span>
                    <Badge priority={ticket.priority} variant="pill" />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
