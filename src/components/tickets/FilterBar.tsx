
import { Search } from 'lucide-react'
import type { Status } from '../../types/ticket'

interface FilterBarProps {
  activeFilter: Status | 'all'
  onFilterChange: (filter: Status | 'all') => void
  searchQuery: string
  onSearchChange: (q: string) => void
}

const filters: { value: Status | 'all'; label: string }[] = [
  { value: 'all', label: 'Tous' },
  { value: 'in_progress', label: 'En cours' },
  { value: 'pending', label: 'En attente' },
  { value: 'resolved', label: 'Résolu' },
]

export default function FilterBar({ activeFilter, onFilterChange, searchQuery, onSearchChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 p-4 border-b border-dgray/30">
      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
        <input
          type="text"
          placeholder="Rechercher un ticket..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full bg-dgray border border-dgray/60 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-muted outline-none focus:border-purple focus:ring-1 focus:ring-purple/30 transition-all"
        />
      </div>

      {/* Filter buttons */}
      <div className="flex gap-1 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => onFilterChange(f.value)}
            className={`
              px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer
              ${activeFilter === f.value
                ? 'bg-purple text-white'
                : 'text-lgray hover:text-white hover:bg-dgray/50 border border-dgray/40'
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  )
}
