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
  { value: 'date_desc', label: 'Récent' },
  { value: 'date_asc',  label: 'Ancien' },
  { value: 'priority',  label: 'Priorité' },
  { value: 'status',    label: 'Statut' },
]

export default function FilterBar({
  activeFilter, onFilterChange,
  searchQuery, onSearchChange,
  counts = {},
  sortBy = 'date_desc', onSortChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col border-b border-border bg-surface">
      {/* Search */}
      <div className="px-4 py-3 border-b border-border">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            id="ticket-search"
            type="text"
            placeholder="Rechercher un ticket…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="Rechercher un ticket par titre ou identifiant"
            className="w-full bg-dgray rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-muted outline-none focus:ring-1 focus:ring-purple border border-transparent focus:border-purple/30"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-3 pt-2 pb-1">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            aria-pressed={activeFilter === f.value}
            className={`
              px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer flex items-center gap-1.5 transition-colors duration-100
              ${activeFilter === f.value
                ? 'bg-purple text-white'
                : 'text-muted hover:text-white hover:bg-white/5'
              }
            `}
          >
            {f.label}
            {counts[f.value] !== undefined && (
              <span className={`text-xs rounded-full px-1.5 py-0.5 leading-none ${activeFilter === f.value ? 'bg-white/20' : 'bg-dgray text-muted'}`}>
                {counts[f.value]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Sort row */}
      {onSortChange && (
        <div className="flex items-center gap-1.5 px-3 pb-2">
          <ArrowUpDown size={11} className="text-muted flex-shrink-0" aria-hidden="true" />
          {sortOptions.map((s) => (
            <button
              key={s.value}
              onClick={() => onSortChange(s.value)}
              aria-pressed={sortBy === s.value}
              className={`px-2 py-0.5 rounded text-xs transition-colors duration-100 cursor-pointer
                ${sortBy === s.value ? 'text-purple font-semibold' : 'text-muted hover:text-lgray'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
