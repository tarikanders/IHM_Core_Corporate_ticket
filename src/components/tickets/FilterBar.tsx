import { Search, ArrowUpDown } from 'lucide-react'
import type { Status } from '../../types/ticket'

export type SortBy = 'date_desc' | 'date_asc' | 'priority' | 'status'

interface FilterBarProps {
  activeFilter: Status | 'all'
  onFilterChange: (filter: Status | 'all') => void
  searchQuery: string
  onSearchChange: (q: string) => void
  counts?: Record<string, number>
  sortBy?: SortBy
  onSortChange?: (sort: SortBy) => void
}

const filters: { value: Status | 'all'; label: string }[] = [
  { value: 'all',         label: 'Tous' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'pending',     label: 'En attente' },
  { value: 'resolved',    label: 'Résolu' },
]

const sortOptions: { value: SortBy; label: string }[] = [
  { value: 'date_desc', label: 'Récent en premier' },
  { value: 'date_asc',  label: 'Ancien en premier' },
  { value: 'priority',  label: 'Par priorité' },
  { value: 'status',    label: 'Par statut' },
]

export default function FilterBar({
  activeFilter, onFilterChange,
  searchQuery, onSearchChange,
  counts = {},
  sortBy = 'date_desc', onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col bg-surface border-b border-border">

      {/* Row 1 : Search + Sort */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="ticket-search"
            type="text"
            placeholder="Rechercher…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Rechercher un ticket par titre ou identifiant"
            className="w-full bg-dgray rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-muted outline-none focus:ring-1 focus:ring-purple border border-transparent focus:border-purple/30"
          />
        </div>

        {/* Sort dropdown — compact */}
        {onSortChange && (
          <div className="relative flex-shrink-0">
            <ArrowUpDown size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" aria-hidden="true" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortBy)}
              aria-label="Trier les tickets"
              className="bg-dgray border border-transparent hover:border-dgray focus:border-purple/40 rounded-lg pl-7 pr-6 py-2 text-xs text-lgray outline-none cursor-pointer appearance-none focus:text-white focus:ring-1 focus:ring-purple/20"
            >
              {sortOptions.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
            {/* Caret */}
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted pointer-events-none text-xs">▾</span>
          </div>
        )}
      </div>

      {/* Row 2 : Filter tabs — full width, underline style */}
      <div className="grid grid-cols-4">
        {filters.map((f) => {
          const active = activeFilter === f.value
          const count  = counts[f.value]
          return (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              aria-pressed={active}
              className={`
                relative flex flex-col items-center justify-center py-2.5 gap-0.5
                text-xs font-medium cursor-pointer transition-colors duration-100
                border-b-2
                ${active
                  ? 'border-purple text-white'
                  : 'border-transparent text-muted hover:text-lgray hover:border-white/10'
                }
              `}
            >
              <span>{f.label}</span>
              {count !== undefined && (
                <span className={`text-[10px] font-bold leading-none ${active ? 'text-purple' : 'text-muted'}`}>
                  {count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
