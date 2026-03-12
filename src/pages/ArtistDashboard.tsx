import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, TicketIcon, AlertTriangle, Disc, DollarSign, Bell, ArrowDownToLine, MessageCircle, Upload, X, Check } from 'lucide-react'
import { useTicketStore } from '../store/useTicketStore'
import { mockReleases } from '../data/mockReleases'
import StatCard from '../components/ui/StatCard'
import TicketRow from '../components/tickets/TicketRow'
import Button from '../components/ui/Button'
import AlbumCover from '../components/ui/AlbumCover'

const platformLabels: Record<string, string> = {
  spotify:    'Spotify',
  appleMusic: 'Apple Music',
  deezer:     'Deezer',
  amazon:     'Amazon',
  tidal:      'Tidal',
}


const notifications = [
  { id: 1, message: 'Votre ticket TK-019 a été mis à jour par', highlight: 'Inès Morel.', time: 'il y a 2h', type: 'info', dot: 'bg-teal animate-pulse-dot' },
  { id: 2, message: 'Vos royalties du mois de mai sont disponibles.', highlight: '', time: 'il y a 1 jour', type: 'success', dot: 'bg-green' },
  { id: 3, message: 'Rappel : vérifiez la disponibilité de', highlight: '\"Nuit Stellaire\" sur Deezer.', time: 'il y a 3 jours', type: 'warning', dot: 'bg-orange' },
]

const allPlatforms = ['Spotify', 'Apple Music', 'Deezer', 'Amazon Music', 'Tidal', 'YouTube Music']

export default function ArtistDashboard() {
  const navigate = useNavigate()
  const { tickets, currentUser } = useTicketStore()
  const [showDistrib, setShowDistrib] = useState(false)
  const [distribDone, setDistribDone] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Spotify', 'Apple Music', 'Deezer'])

  const userTickets = tickets.filter((t) => t.artistId === currentUser?.id)
  const openTickets  = userTickets.filter((t) => t.status === 'pending' || t.status === 'in_progress')
  const urgentTickets = userTickets.filter((t) => t.priority === 'critical' && t.status !== 'closed')
  const recentTickets = userTickets.slice(0, 4)
  const artistReleases = mockReleases.filter((r) => r.artistId === currentUser?.id).slice(0, 3)

  // Unread: last message was from an agent
  const unreadTickets = userTickets.filter((t) => {
    if (t.messages.length === 0) return false
    return t.messages[t.messages.length - 1].role === 'agent'
  })

  const togglePlatform = (p: string) =>
    setSelectedPlatforms((prev) => prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p])

  const handleDistribute = () => setDistribDone(true)

  return (
    <div className="min-h-screen bg-bg p-6 animate-fade-in">

      {/* Distribution modal */}
      {showDistrib && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDistrib(false)} />
          <div className="relative bg-card border border-border rounded-2xl w-full max-w-md animate-slide-up shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal/15 flex items-center justify-center">
                  <Upload size={16} className="text-teal" />
                </div>
                <h2 className="text-white font-semibold text-base">Distribuer une sortie</h2>
              </div>
              <button onClick={() => setShowDistrib(false)} className="text-muted hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>

            {!distribDone ? (
              <div className="p-6 flex flex-col gap-5">
                {/* Release selector */}
                <div>
                  <label className="text-xs text-muted mb-2 block">Sortie à distribuer</label>
                  <select className="w-full bg-dgray border border-border rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-teal/40 cursor-pointer">
                    {mockReleases.filter((r) => r.artistId === currentUser?.id).map((r) => (
                      <option key={r.id} value={r.id}>{r.title} — {r.type}</option>
                    ))}
                  </select>
                </div>

                {/* Platforms */}
                <div>
                  <label className="text-xs text-muted mb-2 block">Plateformes cibles</label>
                  <div className="grid grid-cols-2 gap-2">
                    {allPlatforms.map((p) => {
                      const active = selectedPlatforms.includes(p)
                      return (
                        <button
                          key={p}
                          onClick={() => togglePlatform(p)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-100 cursor-pointer
                            ${active ? 'bg-teal/15 border-teal/40 text-teal' : 'bg-dgray border-border text-muted hover:text-white hover:border-border/80'}`}
                        >
                          <span className={`w-3.5 h-3.5 rounded-full border flex-shrink-0 flex items-center justify-center ${active ? 'bg-teal border-teal' : 'border-muted'}`}>
                            {active && <Check size={9} className="text-bg" strokeWidth={3} />}
                          </span>
                          {p}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Date */}
                <div>
                  <label className="text-xs text-muted mb-2 block">Date de sortie</label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full bg-dgray border border-border rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-teal/40 cursor-pointer"
                  />
                </div>

                <button
                  onClick={handleDistribute}
                  disabled={selectedPlatforms.length === 0}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal to-green text-bg font-semibold text-sm rounded-xl py-3 hover:opacity-90 active:scale-95 transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed min-h-[44px]"
                >
                  <Upload size={15} />
                  Lancer la distribution sur {selectedPlatforms.length} plateforme{selectedPlatforms.length > 1 ? 's' : ''}
                </button>
              </div>
            ) : (
              /* Success state */
              <div className="p-8 flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green/15 flex items-center justify-center">
                  <Check size={32} className="text-green" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Distribution lancée !</h3>
                  <p className="text-lgray text-sm mt-1">
                    Votre sortie est en cours de traitement sur {selectedPlatforms.length} plateforme{selectedPlatforms.length > 1 ? 's' : ''}.
                    Délai estimé : 24–48h.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center mt-1">
                  {selectedPlatforms.map((p) => (
                    <span key={p} className="bg-green/10 text-green text-xs px-2.5 py-1 rounded-full">{p}</span>
                  ))}
                </div>
                <button
                  onClick={() => setShowDistrib(false)}
                  className="mt-2 text-sm text-muted hover:text-white cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Tableau de bord</h1>
          <p className="text-lgray text-base mt-1">Bienvenue, {currentUser?.name || 'Artiste'}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => { setShowDistrib(true); setDistribDone(false) }}
            className="flex items-center gap-2 bg-teal/15 hover:bg-teal/25 text-teal border border-teal/30 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-95 min-h-[44px]"
          >
            <Upload size={15} />
            Distribuer
          </button>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigate('/artist/new-ticket')}
            className="px-5 py-2.5 rounded-xl hover:shadow-[0_0_20px_rgba(123,94,167,0.4)]"
          >
            <Plus size={15} />
            Nouveau ticket
          </Button>
        </div>
      </div>

      {/* Balance card */}
      <div className="bg-card border border-border rounded-2xl p-6 mb-6 animate-slide-up overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green/8 via-transparent to-teal/5 pointer-events-none" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-muted text-xs font-bold uppercase tracking-wider mb-1">Solde disponible</p>
            <p className="text-5xl font-bold text-white tracking-tight">
              {currentUser?.balance !== undefined
                ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(currentUser.balance)
                : '—'}
            </p>
            <p className="text-lgray text-sm mt-2 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green inline-block" />
              Royalties disponibles au retrait
            </p>
          </div>
          <button
            onClick={() => {}}
            className="flex items-center gap-2 bg-green/15 hover:bg-green/25 text-green border border-green/30 rounded-xl px-5 py-3 font-semibold text-sm transition-all duration-150 active:scale-95 min-h-[44px]"
          >
            <ArrowDownToLine size={16} />
            Retirer les fonds
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-up">
        <StatCard
          value={openTickets.length}
          label="Tickets ouverts"
          gradient="from-purple to-pink"
          iconBg="bg-purple/15"
          icon={<TicketIcon size={20} className="text-purple" />}
          trend="↑ +2 cette semaine"
          onClick={() => navigate('/artist/tickets')}
        />
        <StatCard
          value={urgentTickets.length}
          label="Tickets urgents"
          gradient="from-red to-orange"
          iconBg="bg-red/15"
          icon={<AlertTriangle size={20} className="text-red" />}
          pulse={urgentTickets.length > 0}
          onClick={() => navigate('/artist/tickets')}
        />
        <StatCard
          value={artistReleases.length}
          label="Sorties actives"
          gradient="from-teal to-green"
          iconBg="bg-teal/15"
          icon={<Disc size={20} className="text-teal" />}
          onClick={() => navigate('/artist/releases')}
        />
        <StatCard
          value="€342"
          label="Royalties dues"
          gradient="from-green to-teal"
          iconBg="bg-green/15"
          icon={<DollarSign size={20} className="text-green" />}
          trend="Disponibles"
          trendColor="text-green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets */}
        <div className="lg:col-span-2 animate-slide-up">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between bg-surface px-5 py-4 border-b border-border">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-white">Tickets récents</h2>
                {unreadTickets.length > 0 && (
                  <span className="flex items-center gap-1 bg-pink/15 text-pink border border-pink/30 text-xs font-semibold px-2 py-0.5 rounded-full">
                    <MessageCircle size={11} />
                    {unreadTickets.length} non lu{unreadTickets.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <button
                onClick={() => navigate('/artist/tickets')}
                className="text-sm text-purple hover:text-purple-light cursor-pointer"
              >
                Voir tous →
              </button>
            </div>
            <div>
              {recentTickets.length === 0 ? (
                <div className="p-8 text-center text-muted text-sm">Aucun ticket pour le moment.</div>
              ) : (
                recentTickets.map((ticket) => (
                  <TicketRow
                    key={ticket.id}
                    ticket={ticket}
                    onClick={() => navigate(`/artist/tickets/${ticket.id}`)}
                  />
                ))
              )}
            </div>
          </div>

          {/* Recent Releases */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden mt-6">
            <div className="flex items-center justify-between bg-surface px-5 py-4 border-b border-border">
              <h2 className="text-lg font-semibold text-white">Sorties récentes</h2>
              <button
                onClick={() => navigate('/artist/releases')}
                className="text-sm text-purple hover:text-purple-light cursor-pointer"
              >
                Voir toutes →
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {artistReleases.map((release) => (
                <div key={release.id} className="bg-surface border border-border rounded-xl p-4 flex gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                    <AlbumCover releaseId={release.id} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{release.title}</p>
                    <p className="text-muted text-xs">{release.type}</p>
                    <div className="mt-2 flex flex-col gap-1">
                      {Object.entries(release.platforms).map(([platform, available]) => (
                        <div key={platform} className="flex items-center gap-1.5 text-xs">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${available ? 'bg-green' : 'bg-red'}`} />
                          <span className={available ? 'text-lgray' : 'text-red'}>
                            {platformLabels[platform]}
                            {!available && ' ⚠'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="animate-slide-up">
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 bg-surface px-5 py-4 border-b border-border">
              <Bell size={15} className="text-purple" />
              <h2 className="text-lg font-semibold text-white">Notifications</h2>
            </div>
            <div className="p-4 flex flex-col">
              {notifications.map((notif, idx) => (
                <div key={notif.id} className={`flex items-start gap-3 py-3 ${idx < notifications.length - 1 ? 'border-b border-border/40' : ''}`}>
                  <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${notif.dot}`} />
                  <div>
                    <p className="text-lgray text-sm leading-snug">
                      {notif.message}{' '}
                      {notif.highlight && <span className="text-white font-medium">{notif.highlight}</span>}
                    </p>
                    <p className="text-muted text-xs mt-0.5">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
