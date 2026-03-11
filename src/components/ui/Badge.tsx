import type { Status, Priority, Category } from '../../types/ticket'

interface BadgeProps {
  status?: Status
  priority?: Priority
  category?: Category
  className?: string
}

const statusConfig: Record<Status, { label: string; colorClass: string; dotColor: string }> = {
  pending:     { label: 'En attente', colorClass: 'bg-orange/15 text-orange border border-orange/30', dotColor: 'bg-orange' },
  in_progress: { label: 'En cours',   colorClass: 'bg-teal/15 text-teal border border-teal/30',     dotColor: 'bg-teal' },
  resolved:    { label: 'Résolu',     colorClass: 'bg-green/15 text-green border border-green/30',  dotColor: 'bg-green' },
  closed:      { label: 'Fermé',      colorClass: 'bg-lgray/15 text-lgray border border-lgray/30',  dotColor: 'bg-lgray' },
}

const priorityConfig: Record<Priority, { label: string; colorClass: string; dotColor: string }> = {
  critical: { label: 'Critique', colorClass: 'bg-red/15 text-red border border-red/30',       dotColor: 'bg-red' },
  high:     { label: 'Haute',    colorClass: 'bg-orange/15 text-orange border border-orange/30', dotColor: 'bg-orange' },
  medium:   { label: 'Moyenne',  colorClass: 'bg-teal/15 text-teal border border-teal/30',     dotColor: 'bg-teal' },
  low:      { label: 'Faible',   colorClass: 'bg-lgray/15 text-lgray border border-lgray/30',  dotColor: 'bg-lgray' },
}

const categoryConfig: Record<Category, { label: string; colorClass: string; dotColor: string }> = {
  distribution: { label: 'Distribution', colorClass: 'bg-teal/15 text-teal border border-teal/30',     dotColor: 'bg-teal' },
  royalties:    { label: 'Royalties',    colorClass: 'bg-green/15 text-green border border-green/30',  dotColor: 'bg-green' },
  metadata:     { label: 'Métadonnées', colorClass: 'bg-purple/15 text-purple border border-purple/30', dotColor: 'bg-purple' },
  account:      { label: 'Compte',       colorClass: 'bg-pink/15 text-pink border border-pink/30',     dotColor: 'bg-pink' },
}

export default function Badge({ status, priority, category, className = '' }: BadgeProps) {
  let label = ''
  let colorClass = ''
  let dotColor = ''

  if (status) {
    label = statusConfig[status].label
    colorClass = statusConfig[status].colorClass
    dotColor = statusConfig[status].dotColor
  } else if (priority) {
    label = priorityConfig[priority].label
    colorClass = priorityConfig[priority].colorClass
    dotColor = priorityConfig[priority].dotColor
  } else if (category) {
    label = categoryConfig[category].label
    colorClass = categoryConfig[category].colorClass
    dotColor = categoryConfig[category].dotColor
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
      {label}
    </span>
  )
}
