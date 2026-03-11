
import type { Message } from '../../types/ticket'

interface StatusTimelineProps {
  messages: Message[]
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const authorColors: Record<string, string> = {
  'user-lea': '#E040FB',
  'user-karim': '#00BCD4',
  'agent-ines': '#7B5EA7',
}

const authorInitials: Record<string, string> = {
  'user-lea': 'L',
  'user-karim': 'K',
  'agent-ines': 'I',
}

const authorNames: Record<string, string> = {
  'user-lea': 'Léa Rousseau',
  'user-karim': 'Karim Benali',
  'agent-ines': 'Inès Morel',
}

export default function StatusTimeline({ messages }: StatusTimelineProps) {
  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-muted text-sm">
        Aucun message pour ce ticket.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-0">
      {messages.map((msg, index) => {
        const isAgent = msg.role === 'agent'
        const color = authorColors[msg.author] || '#9090A8'
        const initials = authorInitials[msg.author] || msg.author[0]?.toUpperCase() || '?'
        const name = authorNames[msg.author] || msg.author

        return (
          <div key={index} className="flex gap-3 relative">
            {/* Timeline line */}
            {index < messages.length - 1 && (
              <div
                className="absolute left-4 top-10 w-0.5 bg-dgray/50"
                style={{ height: 'calc(100% - 8px)' }}
              />
            )}

            {/* Avatar */}
            <div className="flex-shrink-0 z-10">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {initials}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white">{name}</span>
                {isAgent && (
                  <span className="text-xs bg-purple/20 text-purple border border-purple/30 rounded-full px-2 py-0.5 font-bold">
                    Agent
                  </span>
                )}
                <span className="text-xs text-muted ml-auto">{formatDate(msg.createdAt)}</span>
              </div>
              <div
                className={`rounded-lg p-3 text-sm text-white/90 ${
                  isAgent
                    ? 'bg-purple/10 border border-purple/20'
                    : 'bg-dgray/40 border border-dgray/30'
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
