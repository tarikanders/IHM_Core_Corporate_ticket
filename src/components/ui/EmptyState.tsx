import { Inbox } from 'lucide-react'
import Button from './Button'

interface EmptyStateProps {
  title?: string
  message: string
  ctaLabel?: string
  onCta?: () => void
  icon?: React.ReactNode
}

export default function EmptyState({ title, message, ctaLabel, onCta, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-16 h-16 rounded-2xl bg-dgray/50 flex items-center justify-center mb-4">
        {icon || <Inbox size={28} className="text-muted" />}
      </div>
      {title && <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>}
      <p className="text-lgray text-sm max-w-xs leading-relaxed">{message}</p>
      {ctaLabel && onCta && (
        <div className="mt-6">
          <Button variant="primary" size="sm" onClick={onCta}>
            {ctaLabel}
          </Button>
        </div>
      )}
    </div>
  )
}
