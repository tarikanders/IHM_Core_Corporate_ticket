import { useNavigate } from 'react-router-dom'
import { Music, AlertTriangle } from 'lucide-react'
import { useTicketStore } from '../../store/useTicketStore'
import { mockReleases } from '../../data/mockReleases'
import Button from '../../components/ui/Button'

const platformLabels: Record<string, string> = {
  spotify: 'Spotify', appleMusic: 'Apple Music', deezer: 'Deezer', amazon: 'Amazon', tidal: 'Tidal',
}

const releaseGradients = [
  'from-purple to-pink', 'from-teal to-blue-500', 'from-orange to-red',
  'from-green to-teal', 'from-pink to-purple',
]

export default function MyReleasesPage() {
  const navigate = useNavigate()
  const { currentUser } = useTicketStore()

  const artistReleases = mockReleases.filter((r) => r.artistId === currentUser?.id)

  return (
    <div className="min-h-screen bg-bg p-6 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Mes sorties</h1>
        <p className="text-lgray text-sm mt-1">{artistReleases.length} sortie(s) enregistrée(s)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {artistReleases.map((release, i) => {
          const hasIssue = Object.values(release.platforms).some((v) => !v)
          return (
            <div key={release.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-purple/30 transition-all">
              <div className={`h-32 bg-gradient-to-br ${releaseGradients[i % releaseGradients.length]} flex items-center justify-center relative`}>
                <Music size={40} className="text-white/40" />
                {hasIssue && (
                  <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-orange/80 flex items-center justify-center">
                    <AlertTriangle size={14} className="text-white" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{release.title}</h3>
                    <p className="text-muted text-xs mt-0.5">{release.type} · {new Date(release.releaseDate).toLocaleDateString('fr-FR')}</p>
                    {release.upc && <p className="font-mono text-teal text-xs mt-1">UPC: {release.upc}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mb-4">
                  {Object.entries(release.platforms).map(([platform, available]) => (
                    <div key={platform} className="flex items-center gap-1.5 text-xs">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${available ? 'bg-green' : 'bg-red'}`} />
                      <span className={available ? 'text-lgray' : 'text-red'}>{platformLabels[platform]}</span>
                    </div>
                  ))}
                </div>

                {hasIssue && (
                  <Button
                    variant="danger"
                    size="sm"
                    className="w-full"
                    onClick={() => navigate(`/artist/new-ticket?releaseId=${release.id}`)}
                  >
                    <AlertTriangle size={13} />
                    Signaler un problème
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
