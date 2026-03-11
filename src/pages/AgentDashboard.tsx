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

const priorityOrder: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 }

function getArtistById(artistId: string) {
  return mockUsers.find((u) => u.id === artistId)
}

function getAgentName(agentId?: string): string {
  if (!agentId) return '—'
  return mockUsers.find((u) => u.id === agentId)?.name || agentId
}

export default function AgentDashboard() {
  const navigate = useNavigate()
  const { tickets, currentUser } = useTicketStore()

  const openTickets    = tickets.filter((t) => t.status !== 'closed')
  const criticalTickets = tickets.filter((t) => t.priority === 'critical' && t.status !== 'closed')
  const assignedToMe   = tickets.filter((t) => t.assignedTo === currentUser?.id && t.status !== 'closed')

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

  const categoryLabels: Record<Category, string> = {
    distribution: 'Distribution',
    royalties:    'Royalties',
    metadata:     'Métadonnées',
    account:      'Compte',
  }

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
        />
        <StatCard
          value={criticalTickets.length}
          label="Critiques"
          gradient="from-red to-orange"
          iconBg="bg-red/15"
          icon={<AlertTriangle size={20} className="text-red" />}
          pulse={criticalTickets.length > 0}
        />
        <StatCard
          value={assignedToMe.length}
          label="Assignés à moi"
          gradient="from-teal to-green"
          iconBg="bg-teal/15"
          icon={<UserCheck size={20} className="text-teal" />}
        />
        <StatCard
          value="4.7★"
          label="Satisfaction"
          gradient="from-green to-teal"
          iconBg="bg-green/15"
          icon={<Star size={20} className="text-green" />}
        />
      </div>

      {/* Category breakdown */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6 animate-slide-up">
        <h2 className="text-sm font-semibold text-white mb-4">Répartition par catégorie</h2>
        <div className="flex flex-col gap-3">
          {categoryBreakdown.map(({ category, count, pct }) => (
            <div key={category} className="flex items-center gap-3 mb-3">
              <span className="text-lgray text-sm w-28 flex-shrink-0">{categoryLabels[category]}</span>
              <div className="flex-1 bg-dgray rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: categoryColors[category] }}
                />
              </div>
              <span className="text-white text-sm font-medium w-6 text-right flex-shrink-0">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tickets table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden mb-6 animate-slide-up">
        <div className="bg-surface px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-white">
            Tous les tickets actifs
            <span className="text-xs text-muted ml-2 font-normal">({sortedTickets.length})</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-4 py-3">#</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-4 py-3">Artiste</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-4 py-3">Catégorie</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-4 py-3">Sujet</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-4 py-3">Priorité</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-4 py-3">Statut</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-4 py-3">Assigné à</th>
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedTickets.map((ticket) => {
                const artist = getArtistById(ticket.artistId)
                const isCritical = ticket.priority === 'critical'
                return (
                  <tr
                    key={ticket.id}
                    className={`border-b border-border/40 h-14 ${isCritical ? 'bg-red/5 hover:bg-red/8' : 'hover:bg-white/3'} cursor-pointer`}
                    onClick={() => navigate(`/agent/tickets/${ticket.id}`)}
                  >
                    <td className="px-4 py-3 font-mono text-teal text-xs">{ticket.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {artist && (
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0"
                            style={{ backgroundColor: artist.color }}
                          >
                            {artist.avatar}
                          </div>
                        )}
                        <span className="text-lgray text-sm">{artist?.name || ticket.artistId}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge category={ticket.category} />
                    </td>
                    <td className="px-4 py-3 text-white text-sm max-w-xs">
                      <span className="line-clamp-1" title={ticket.subject}>{ticket.subject}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge priority={ticket.priority} />
                    </td>
                    <td className="px-4 py-3">
                      <Badge status={ticket.status} />
                    </td>
                    <td className="px-4 py-3">
                      {ticket.assignedTo ? (
                        <span className="text-lgray text-sm">{getAgentName(ticket.assignedTo)}</span>
                      ) : (
                        <span className="text-purple text-xs hover:underline cursor-pointer">Assigner</span>
                      )}
                    </td>
                    <td className="px-4 py-3" onClick={(e) => { e.stopPropagation(); navigate(`/agent/tickets/${ticket.id}`) }}>
                      <span className="bg-purple/20 text-purple text-xs px-3 py-1.5 rounded-lg hover:bg-purple/30 cursor-pointer">
                        Ouvrir →
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-slide-up">
        {/* My assigned tickets */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="bg-surface px-5 py-4 border-b border-border">
            <h2 className="text-base font-semibold text-white">
              Mes tickets assignés
              <span className="text-xs text-muted ml-2 font-normal">({assignedToMe.length})</span>
            </h2>
          </div>
          <div className="p-4 flex flex-col gap-2">
            {assignedToMe.length === 0 ? (
              <p className="text-center py-6 text-muted text-sm">Aucun ticket assigné.</p>
            ) : (
              assignedToMe.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => navigate(`/agent/tickets/${ticket.id}`)}
                  className="flex items-center gap-3 p-3 bg-dgray/20 rounded-xl hover:bg-dgray/40 cursor-pointer"
                >
                  <span className="font-mono text-teal text-xs w-14">{ticket.id}</span>
                  <span className="flex-1 text-sm text-white truncate">{ticket.subject}</span>
                  <Badge priority={ticket.priority} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="text-base font-semibold text-white mb-4">Performance</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Tickets résolus ce mois', value: '12', color: '#00E676' },
              { label: 'Temps de réponse moyen',  value: '2.4h', color: '#00BCD4' },
              { label: 'Taux de résolution',       value: '89%', color: '#7B5EA7' },
              { label: 'Score satisfaction',        value: '4.7/5', color: '#E040FB' },
            ].map((stat) => (
              <div key={stat.label} className="bg-dgray/30 rounded-xl p-3 border border-border">
                <div className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
