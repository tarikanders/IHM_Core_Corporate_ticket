
import { useNavigate } from 'react-router-dom'
import { AlertTriangle, TicketIcon, UserCheck, Star } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import { mockUsers } from '../data/mockUsers'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import type { Category } from '../types/ticket'

const categoryColors: Record<Category, string> = {
  distribution: '#00BCD4',
  royalties: '#00E676',
  metadata: '#7B5EA7',
  account: '#E040FB',
}

const priorityOrder: Record<string, number> = {
  critical: 0,
  high: 1,
  medium: 2,
  low: 3,
}

function getArtistName(artistId: string): string {
  return mockUsers.find((u) => u.id === artistId)?.name || artistId
}

function getAgentName(agentId?: string): string {
  if (!agentId) return '—'
  return mockUsers.find((u) => u.id === agentId)?.name || agentId
}

export default function AgentDashboard() {
  const navigate = useNavigate()
  const { tickets, currentUser } = useTicketStore()

  const openTickets = tickets.filter((t) => t.status !== 'closed')
  const criticalTickets = tickets.filter((t) => t.priority === 'critical' && t.status !== 'closed')
  const assignedToMe = tickets.filter((t) => t.assignedTo === currentUser?.id && t.status !== 'closed')

  const sortedTickets = [...openTickets].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )

  // Category breakdown
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
    royalties: 'Royalties',
    metadata: 'Métadonnées',
    account: 'Compte',
  }

  return (
    <div className="min-h-screen bg-bg p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Tableau de bord — Agent</h1>
        <p className="text-lgray text-sm mt-1">Bienvenue, {currentUser?.name}</p>
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
          value={criticalTickets.length}
          label="Critiques"
          color="#FF1744"
          icon={<AlertTriangle size={24} />}
        />
        <StatCard
          value={assignedToMe.length}
          label="Assignés à moi"
          color="#00BCD4"
          icon={<UserCheck size={24} />}
        />
        <StatCard
          value="4.7★"
          label="Satisfaction"
          color="#00E676"
          icon={<Star size={24} />}
        />
      </div>

      {/* Category breakdown */}
      <div className="bg-card border border-dgray/30 rounded-xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-white mb-4">Répartition par catégorie</h2>
        <div className="flex flex-col gap-3">
          {categoryBreakdown.map(({ category, count, pct }) => (
            <div key={category} className="flex items-center gap-3">
              <span className="text-xs text-lgray w-28 flex-shrink-0">{categoryLabels[category]}</span>
              <div className="flex-1 bg-dgray/40 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${pct}%`, backgroundColor: categoryColors[category] }}
                />
              </div>
              <span className="text-xs text-lgray w-8 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tickets table */}
      <div className="bg-card border border-dgray/30 rounded-xl overflow-hidden mb-6">
        <div className="p-5 border-b border-dgray/30">
          <h2 className="text-base font-semibold text-white">
            Tous les tickets actifs
            <span className="text-xs text-muted ml-2 font-normal">({sortedTickets.length})</span>
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dgray/30">
                <th className="text-left text-xs text-muted px-4 py-3 font-medium">#</th>
                <th className="text-left text-xs text-muted px-4 py-3 font-medium">Artiste</th>
                <th className="text-left text-xs text-muted px-4 py-3 font-medium">Catégorie</th>
                <th className="text-left text-xs text-muted px-4 py-3 font-medium">Sujet</th>
                <th className="text-left text-xs text-muted px-4 py-3 font-medium">Priorité</th>
                <th className="text-left text-xs text-muted px-4 py-3 font-medium">Statut</th>
                <th className="text-left text-xs text-muted px-4 py-3 font-medium">Assigné à</th>
                <th className="text-left text-xs text-muted px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dgray/20">
              {sortedTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-dgray/20 transition-colors"
                >
                  <td className="px-4 py-3 text-xs text-muted font-mono">{ticket.id}</td>
                  <td className="px-4 py-3 text-sm text-lgray">{getArtistName(ticket.artistId)}</td>
                  <td className="px-4 py-3">
                    <Badge category={ticket.category} />
                  </td>
                  <td className="px-4 py-3 text-sm text-white max-w-xs">
                    <span className="line-clamp-1">{ticket.subject}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Badge priority={ticket.priority} />
                  </td>
                  <td className="px-4 py-3">
                    <Badge status={ticket.status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-lgray">{getAgentName(ticket.assignedTo)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => navigate(`/agent/tickets/${ticket.id}`)}
                      className="text-xs text-purple hover:text-purple/80 transition-colors cursor-pointer"
                    >
                      Ouvrir →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mes tickets + Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* My assigned tickets */}
        <div className="bg-card border border-dgray/30 rounded-xl overflow-hidden">
          <div className="p-5 border-b border-dgray/30">
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
                  className="flex items-center gap-3 p-3 bg-dgray/20 rounded-lg hover:bg-dgray/40 transition-colors cursor-pointer"
                >
                  <span className="text-xs text-muted font-mono w-14">{ticket.id}</span>
                  <span className="flex-1 text-sm text-white truncate">{ticket.subject}</span>
                  <Badge priority={ticket.priority} />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Performance stats */}
        <div className="bg-card border border-dgray/30 rounded-xl p-5">
          <h2 className="text-base font-semibold text-white mb-4">Performance</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Tickets résolus ce mois', value: '12', color: '#00E676' },
              { label: 'Temps de réponse moyen', value: '2.4h', color: '#00BCD4' },
              { label: 'Taux de résolution', value: '89%', color: '#7B5EA7' },
              { label: 'Score satisfaction', value: '4.7/5', color: '#E040FB' },
            ].map((stat) => (
              <div key={stat.label} className="bg-dgray/30 rounded-lg p-3 border border-dgray/40">
                <div className="text-xl font-bold" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-xs text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
