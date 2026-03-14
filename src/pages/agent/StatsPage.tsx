import { useTicketStore } from '../../store/useTicketStore'
import { mockUsers } from '../../data/mockUsers'
import type { Category, Priority } from '../../types/ticket'

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

const priorityColors: Record<Priority, string> = {
  critical: '#FF1744',
  high:     '#FF6D00',
  medium:   '#00BCD4',
  low:      '#9090A8',
}

const priorityLabels: Record<Priority, string> = {
  critical: 'Critique',
  high:     'Haute',
  medium:   'Moyenne',
  low:      'Faible',
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(rating) ? '#FACC15' : 'none'} stroke={s <= Math.round(rating) ? '#FACC15' : '#6B6B80'} strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </span>
  )
}

export default function StatsPage() {
  const { tickets } = useTicketStore()

  const total    = tickets.length
  const resolved = tickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length
  const open     = tickets.filter((t) => t.status === 'pending' || t.status === 'in_progress').length
  const avgRate  = total > 0 ? Math.round((resolved / total) * 100) : 0

  // Real satisfaction from feedback
  const withFeedback = tickets.filter((t) => t.feedback)
  const avgSatisfaction = withFeedback.length > 0
    ? (withFeedback.reduce((sum, t) => sum + t.feedback!.rating, 0) / withFeedback.length).toFixed(1)
    : '—'

  const categories: Category[] = ['distribution', 'royalties', 'metadata', 'account']
  const priorities: Priority[]  = ['critical', 'high', 'medium', 'low']

  // Per-agent stats
  const agents = mockUsers.filter((u) => u.role === 'agent')

  return (
    <div className="min-h-screen bg-bg p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Statistiques</h1>
        <p className="text-lgray text-sm mt-1">Vue d'ensemble des performances support</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total tickets',      value: total,              color: '#7B5EA7' },
          { label: 'Ouverts',            value: open,               color: '#FF6D00' },
          { label: 'Taux de résolution', value: `${avgRate}%`,      color: '#00BCD4' },
          { label: 'Satisfaction moy.',  value: withFeedback.length ? `${avgSatisfaction}★` : '—', color: '#FACC15' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card border border-dgray rounded-2xl overflow-hidden">
            <div className="h-1.5 w-full" style={{ backgroundColor: kpi.color }} />
            <div className="p-5">
              <div className="text-4xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-sm text-lgray mt-1">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Volume par catégorie */}
        <div className="bg-card border border-dgray rounded-2xl p-5">
          <h2 className="text-base font-semibold text-white mb-6">Volume par catégorie</h2>
          <div className="flex flex-col gap-5">
            {categories.map((cat) => {
              const count = tickets.filter((t) => t.category === cat).length
              const pct   = total > 0 ? Math.round((count / total) * 100) : 0
              return (
                <div key={cat}>
                  <div className="flex justify-between mb-2">
                    <span className="text-lgray text-sm">{categoryLabels[cat]}</span>
                    <span className="text-white text-sm font-medium">{count} ({pct}%)</span>
                  </div>
                  <div className="bg-dgray rounded-full h-2.5">
                    <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: categoryColors[cat] }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Volume par priorité */}
        <div className="bg-card border border-dgray rounded-2xl p-5">
          <h2 className="text-base font-semibold text-white mb-6">Volume par priorité</h2>
          <div className="flex flex-col gap-5">
            {priorities.map((pri) => {
              const count = tickets.filter((t) => t.priority === pri).length
              const pct   = total > 0 ? Math.round((count / total) * 100) : 0
              return (
                <div key={pri}>
                  <div className="flex justify-between mb-2">
                    <span className="text-lgray text-sm">{priorityLabels[pri]}</span>
                    <span className="text-white text-sm font-medium">{count} ({pct}%)</span>
                  </div>
                  <div className="bg-dgray rounded-full h-2.5">
                    <div className="h-2.5 rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: priorityColors[pri] }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Performance par agent */}
      <div className="bg-card border border-dgray rounded-2xl p-5 mb-6">
        <h2 className="text-base font-semibold text-white mb-5">Performance par agent</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dgray">
                <th className="text-left text-xs font-bold text-muted uppercase tracking-wider pb-3">Agent</th>
                <th className="text-center text-xs font-bold text-muted uppercase tracking-wider pb-3">Assignés</th>
                <th className="text-center text-xs font-bold text-muted uppercase tracking-wider pb-3">Résolus</th>
                <th className="text-center text-xs font-bold text-muted uppercase tracking-wider pb-3">En cours</th>
                <th className="text-center text-xs font-bold text-muted uppercase tracking-wider pb-3">Satisfaction</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => {
                const assigned  = tickets.filter((t) => t.assignedTo === agent.id)
                const agentResolved = assigned.filter((t) => t.status === 'resolved' || t.status === 'closed').length
                const agentOpen     = assigned.filter((t) => t.status === 'pending' || t.status === 'in_progress').length
                // Satisfaction: from tickets the agent replied to (that have feedback)
                const agentFeedback = tickets.filter((t) =>
                  t.feedback && t.messages.some((m) => m.author === agent.id)
                )
                const agentAvg = agentFeedback.length > 0
                  ? agentFeedback.reduce((sum, t) => sum + t.feedback!.rating, 0) / agentFeedback.length
                  : null

                return (
                  <tr key={agent.id} className="border-b border-dgray/50 last:border-0">
                    <td className="py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ backgroundColor: agent.color }}>
                          {agent.avatar}
                        </div>
                        <div>
                          <p className="text-white font-medium">{agent.name}</p>
                          <p className="text-muted text-xs">{agent.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center text-white font-semibold py-3">{assigned.length}</td>
                    <td className="text-center py-3">
                      <span className="text-green font-semibold">{agentResolved}</span>
                    </td>
                    <td className="text-center py-3">
                      <span className="text-orange font-semibold">{agentOpen}</span>
                    </td>
                    <td className="text-center py-3">
                      {agentAvg !== null ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <StarDisplay rating={agentAvg} />
                          <span className="text-lgray text-xs">{agentAvg.toFixed(1)}</span>
                        </div>
                      ) : (
                        <span className="text-muted text-xs">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Avis des artistes */}
      {withFeedback.length > 0 && (
        <div className="bg-card border border-dgray rounded-2xl p-5 mb-6">
          <h2 className="text-base font-semibold text-white mb-5">
            Derniers avis artistes
            <span className="ml-2 text-xs font-normal text-muted">({withFeedback.length} avis)</span>
          </h2>
          <div className="flex flex-col gap-3">
            {withFeedback.slice().reverse().map((t) => {
              const artist = mockUsers.find((u) => u.id === t.artistId)
              return (
                <div key={t.id} className="flex items-start gap-3 p-3 bg-dgray/40 rounded-xl border border-dgray/60">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0" style={{ backgroundColor: artist?.color ?? '#7B5EA7' }}>
                    {artist?.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white text-xs font-semibold">{artist?.name}</span>
                      <StarDisplay rating={t.feedback!.rating} />
                      <span className="text-muted text-xs font-mono ml-auto">{t.id}</span>
                    </div>
                    {t.feedback!.comment && (
                      <p className="text-lgray text-xs italic">"{t.feedback!.comment}"</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Graphe mensuel simulé */}
      <div className="bg-card border border-dgray rounded-2xl p-5">
        <h2 className="text-base font-semibold text-white mb-6">Tickets par mois</h2>
        <div className="flex items-end gap-2 h-32">
          {[4, 7, 5, 9, 6, 12, 8, 15, 10, 13, 11, 9].map((v, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t bg-gradient-to-t from-purple to-pink opacity-80"
                style={{ height: `${(v / 15) * 100}%` }}
              />
              <span className="text-muted text-xs">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
