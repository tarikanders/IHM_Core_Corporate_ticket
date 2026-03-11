import { useTicketStore } from '../../store/useTicketStore'
import type { Category } from '../../types/ticket'

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

export default function StatsPage() {
  const { tickets } = useTicketStore()

  const total       = tickets.length
  const resolved    = tickets.filter((t) => t.status === 'resolved' || t.status === 'closed').length
  const avgRate     = total > 0 ? Math.round((resolved / total) * 100) : 0
  const categories: Category[] = ['distribution', 'royalties', 'metadata', 'account']

  return (
    <div className="min-h-screen bg-bg p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Statistiques</h1>
        <p className="text-lgray text-sm mt-1">Vue d'ensemble des performances</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total tickets',      value: total,      color: '#7B5EA7' },
          { label: 'Résolus',            value: resolved,   color: '#00E676' },
          { label: 'Taux de résolution', value: `${avgRate}%`, color: '#00BCD4' },
          { label: 'Satisfaction',       value: '4.7★',    color: '#E040FB' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="h-1.5 w-full" style={{ backgroundColor: kpi.color }} />
            <div className="p-5">
              <div className="text-4xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-sm text-lgray mt-1">{kpi.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Volume par catégorie */}
      <div className="bg-card border border-border rounded-2xl p-5 mb-6">
        <h2 className="text-base font-semibold text-white mb-6">Volume par catégorie</h2>
        <div className="flex flex-col gap-5">
          {categories.map((cat) => {
            const count = tickets.filter((t) => t.category === cat).length
            const pct = total > 0 ? Math.round((count / total) * 100) : 0
            return (
              <div key={cat}>
                <div className="flex justify-between mb-2">
                  <span className="text-lgray text-sm">{categoryLabels[cat]}</span>
                  <span className="text-white text-sm font-medium">{count} tickets ({pct}%)</span>
                </div>
                <div className="bg-dgray rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, backgroundColor: categoryColors[cat] }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Graphe mensuel simulé */}
      <div className="bg-card border border-border rounded-2xl p-5">
        <h2 className="text-base font-semibold text-white mb-6">Tickets par mois (simulé)</h2>
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
