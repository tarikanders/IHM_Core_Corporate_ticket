
import { Inbox } from 'lucide-react'
import Button from './Button'

interface EmptyStateProps {
  message: string
  ctaLabel?: string
  onCta?: () => void
}

export default function EmptyState({ message, ctaLabel, onCta }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-dgray/50 flex items-center justify-center">
        <Inbox size={28} className="text-muted" />
      </div>
      <p className="text-lgray text-sm max-w-xs">{message}</p>
      {ctaLabel && onCta && (
        <Button variant="primary" size="sm" onClick={onCta}>
          {ctaLabel}
        </Button>
      )}
    </div>
  )
}
