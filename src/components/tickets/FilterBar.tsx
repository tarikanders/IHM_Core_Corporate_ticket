import { Search } from 'lucide-react'
import type { Status } from '../../types/ticket'

interface FilterBarProps {
  activeFilter: Status | 'all'
  onFilterChange: (filter: Status | 'all') => void
  searchQuery: string
  onSearchChange: (q: string) => void
  counts?: Record<string, number>
}

const filters: { value: Status | 'all'; label: string }[] = [
  { value: 'all',         label: 'Tous' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'pending',     label: 'En attente' },
  { value: 'resolved',    label: 'Résolu' },
]

export default function FilterBar({ activeFilter, onFilterChange, searchQuery, onSearchChange, counts = {} }: FilterBarProps) {
  return (
    <div className="flex flex-col border-b border-border bg-surface">
      {/* Search */}
      <div className="px-4 py-3 border-b border-border">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Rechercher un ticket..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-dgray rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-muted outline-none focus:ring-1 focus:ring-purple border border-transparent focus:border-purple/30"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-3 py-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
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
    </div>
  )
}
