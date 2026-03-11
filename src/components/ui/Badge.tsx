
import type { Status, Priority, Category } from '../../types/ticket'

interface BadgeProps {
  status?: Status
  priority?: Priority
  category?: Category
  className?: string
}

const statusConfig: Record<Status, { label: string; colorClass: string }> = {
  pending: { label: 'En attente', colorClass: 'bg-orange/15 text-orange border border-orange/30' },
  in_progress: { label: 'En cours', colorClass: 'bg-teal/15 text-teal border border-teal/30' },
  resolved: { label: 'Résolu', colorClass: 'bg-green/15 text-green border border-green/30' },
  closed: { label: 'Fermé', colorClass: 'bg-lgray/15 text-lgray border border-lgray/30' },
}

const priorityConfig: Record<Priority, { label: string; colorClass: string }> = {
  critical: { label: 'Critique', colorClass: 'bg-red/15 text-red border border-red/30' },
  high: { label: 'Haute', colorClass: 'bg-orange/15 text-orange border border-orange/30' },
  medium: { label: 'Moyenne', colorClass: 'bg-teal/15 text-teal border border-teal/30' },
  low: { label: 'Faible', colorClass: 'bg-lgray/15 text-lgray border border-lgray/30' },
}

const categoryConfig: Record<Category, { label: string; colorClass: string }> = {
  distribution: { label: 'Distribution', colorClass: 'bg-teal/15 text-teal border border-teal/30' },
  royalties: { label: 'Royalties', colorClass: 'bg-green/15 text-green border border-green/30' },
  metadata: { label: 'Métadonnées', colorClass: 'bg-purple/15 text-purple border border-purple/30' },
  account: { label: 'Compte', colorClass: 'bg-pink/15 text-pink border border-pink/30' },
}

export default function Badge({ status, priority, category, className = '' }: BadgeProps) {
  let label = ''
  let colorClass = ''

  if (status) {
    label = statusConfig[status].label
    colorClass = statusConfig[status].colorClass
  } else if (priority) {
    label = priorityConfig[priority].label
    colorClass = priorityConfig[priority].colorClass
  } else if (category) {
    label = categoryConfig[category].label
    colorClass = categoryConfig[category].colorClass
  }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${colorClass} ${className}`}>
      {label}
    </span>
  )
}
