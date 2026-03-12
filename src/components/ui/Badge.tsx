import type { Status, Priority, Category } from '../../types/ticket'

interface BadgeProps {
  status?: Status
  priority?: Priority
  category?: Category
  className?: string
  /** default = full pill (bg+border+dot) | pill = bg+text no border/dot | inline = text only */
  variant?: 'default' | 'pill' | 'inline'
}

const statusConfig: Record<Status, { label: string; colorClass: string; pillClass: string; textClass: string; dotColor: string }> = {
  pending:     { label: 'En attente', colorClass: 'bg-orange/15 text-orange border border-orange/30', pillClass: 'bg-orange/10 text-orange', textClass: 'text-orange', dotColor: 'bg-orange' },
  in_progress: { label: 'En cours',   colorClass: 'bg-teal/15 text-teal border border-teal/30',     pillClass: 'bg-teal/10 text-teal',   textClass: 'text-teal',   dotColor: 'bg-teal'   },
  resolved:    { label: 'Résolu',     colorClass: 'bg-green/15 text-green border border-green/30',  pillClass: 'bg-green/10 text-green', textClass: 'text-green', dotColor: 'bg-green'  },
  closed:      { label: 'Fermé',      colorClass: 'bg-lgray/15 text-lgray border border-lgray/30',  pillClass: 'bg-lgray/10 text-lgray', textClass: 'text-muted', dotColor: 'bg-lgray'  },
}

const priorityConfig: Record<Priority, { label: string; colorClass: string; pillClass: string; textClass: string; dotColor: string }> = {
  critical: { label: 'Critique', colorClass: 'bg-red/15 text-red border border-red/30',         pillClass: 'bg-red/10 text-red',     textClass: 'text-red',    dotColor: 'bg-red'    },
  high:     { label: 'Haute',    colorClass: 'bg-orange/15 text-orange border border-orange/30', pillClass: 'bg-orange/10 text-orange', textClass: 'text-orange', dotColor: 'bg-orange' },
  medium:   { label: 'Moyenne',  colorClass: 'bg-teal/15 text-teal border border-teal/30',       pillClass: 'bg-teal/10 text-teal',   textClass: 'text-teal',   dotColor: 'bg-teal'   },
  low:      { label: 'Faible',   colorClass: 'bg-lgray/15 text-lgray border border-lgray/30',    pillClass: 'bg-lgray/10 text-lgray', textClass: 'text-muted',  dotColor: 'bg-lgray'  },
}

const categoryConfig: Record<Category, { label: string; colorClass: string; pillClass: string; textClass: string; dotColor: string }> = {
  distribution: { label: 'Distribution', colorClass: 'bg-teal/15 text-teal border border-teal/30',       pillClass: 'bg-teal/10 text-teal',     textClass: 'text-teal',   dotColor: 'bg-teal'   },
  royalties:    { label: 'Royalties',    colorClass: 'bg-green/15 text-green border border-green/30',    pillClass: 'bg-green/10 text-green',   textClass: 'text-green',  dotColor: 'bg-green'  },
  metadata:     { label: 'Métadonnées', colorClass: 'bg-purple/15 text-purple border border-purple/30',  pillClass: 'bg-purple/10 text-purple', textClass: 'text-purple', dotColor: 'bg-purple' },
  account:      { label: 'Compte',       colorClass: 'bg-pink/15 text-pink border border-pink/30',       pillClass: 'bg-pink/10 text-pink',     textClass: 'text-pink',   dotColor: 'bg-pink'   },
}

export default function Badge({ status, priority, category, className = '', variant = 'default' }: BadgeProps) {
  let label = ''
  let colorClass = ''
  let pillClass = ''
  let textClass = ''
  let dotColor = ''

  if (status) {
    ({ label, colorClass, pillClass, textClass, dotColor } = statusConfig[status])
  } else if (priority) {
    ({ label, colorClass, pillClass, textClass, dotColor } = priorityConfig[priority])
  } else if (category) {
    ({ label, colorClass, pillClass, textClass, dotColor } = categoryConfig[category])
  }

  if (variant === 'inline') {
    return (
      <span className={`text-xs font-medium ${textClass} ${className}`}>
        {label}
      </span>
    )
  }

  if (variant === 'pill') {
    return (
      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${pillClass} ${className}`}>
        {label}
      </span>
    )
  }

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${colorClass} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColor}`} />
      {label}
    </span>
  )
}
