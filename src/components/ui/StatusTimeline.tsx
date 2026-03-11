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
  'user-lea':   '#E040FB',
  'user-karim': '#00BCD4',
  'agent-ines': '#7B5EA7',
}

const authorInitials: Record<string, string> = {
  'user-lea':   'L',
  'user-karim': 'K',
  'agent-ines': 'I',
}

const authorNames: Record<string, string> = {
  'user-lea':   'Léa Rousseau',
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

        if (isAgent) {
          return (
            <div key={index} className="flex gap-3 mb-4 flex-row-reverse">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                style={{ backgroundColor: color }}
              >
                {initials}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 justify-end mb-1">
                  <span className="text-xs text-muted">{formatDate(msg.createdAt)}</span>
                  <span className="bg-purple/20 text-purple text-xs px-1.5 py-0.5 rounded font-medium">Agent</span>
                  <span className="text-sm font-medium text-white">{name}</span>
                </div>
                <div className="bg-purple/10 border border-purple/20 rounded-2xl rounded-tr-sm px-4 py-3">
                  <p className="text-sm text-white/90 leading-relaxed">{msg.content}</p>
                </div>
              </div>
            </div>
          )
        }

        return (
          <div key={index} className="flex gap-3 mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ backgroundColor: color }}
            >
              {initials}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-white">{name}</span>
                <span className="text-xs text-muted">{formatDate(msg.createdAt)}</span>
              </div>
              <div className="bg-dgray border border-border rounded-2xl rounded-tl-sm px-4 py-3">
                <p className="text-sm text-lgray leading-relaxed">{msg.content}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
