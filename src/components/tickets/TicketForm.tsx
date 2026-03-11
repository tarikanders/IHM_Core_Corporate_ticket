import { useState } from 'react'
import { Truck, DollarSign, FileText, User, ChevronRight, CheckCircle } from 'lucide-react'
import type { Category, Priority, Ticket } from '../../types/ticket'
import { mockReleases } from '../../data/mockReleases'
import Button from '../ui/Button'
import Select from '../ui/Select'

interface TicketFormProps {
  onSubmit: (ticketData: Partial<Ticket>) => void
  artistId: string
}

const categories: { value: Category; label: string; description: string; icon: React.ReactNode }[] = [
  { value: 'distribution', label: 'Distribution', description: 'Problème de mise en ligne ou de disponibilité', icon: <Truck size={20} /> },
  { value: 'royalties', label: 'Royalties', description: 'Rapport de revenus ou paiements', icon: <DollarSign size={20} /> },
  { value: 'metadata', label: 'Métadonnées', description: 'Titre, artwork, ISRC, UPC incorrects', icon: <FileText size={20} /> },
  { value: 'account', label: 'Compte', description: 'Accès, informations personnelles, facturation', icon: <User size={20} /> },
]

const priorities: { value: Priority; label: string; description: string; color: string }[] = [
  { value: 'critical', label: 'Critique', description: 'SLA : 4h — Impact immédiat sur vos revenus', color: 'text-red border-red/40 bg-red/10' },
  { value: 'high', label: 'Haute', description: 'SLA : 24h — Problème majeur à résoudre rapidement', color: 'text-orange border-orange/40 bg-orange/10' },
  { value: 'medium', label: 'Moyenne', description: 'SLA : 3 jours — Problème modéré', color: 'text-teal border-teal/40 bg-teal/10' },
  { value: 'low', label: 'Faible', description: 'SLA : 7 jours — Demande ou question générale', color: 'text-lgray border-lgray/40 bg-lgray/10' },
]

const platformLabels: Record<string, string> = {
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  deezer: 'Deezer',
  amazon: 'Amazon Music',
  tidal: 'Tidal',
}

export default function TicketForm({ onSubmit, artistId }: TicketFormProps) {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState<Category | null>(null)
  const [selectedRelease, setSelectedRelease] = useState('')
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const artistReleases = mockReleases.filter((r) => r.artistId === artistId)
  const currentRelease = artistReleases.find((r) => r.id === selectedRelease)

  const handleCategorySelect = (cat: Category) => {
    setCategory(cat)
    if (cat === 'distribution') {
      setStep(2)
    } else {
      setStep(3)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!subject.trim()) newErrors.subject = 'Le sujet est requis'
    if (!category) newErrors.category = 'La catégorie est requise'
    if (!priority) newErrors.priority = 'La priorité est requise'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit({
      subject: subject.trim(),
      category: category!,
      priority: priority!,
      status: 'pending',
      artistId,
      releaseId: selectedRelease || undefined,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Step 1: Category */}
      <div>
        <h3 className="text-sm font-semibold text-lgray mb-3 uppercase tracking-wide">
          Étape 1 — Catégorie
        </h3>
        {errors.category && <p className="text-xs text-red mb-2">{errors.category}</p>}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleCategorySelect(cat.value)}
              className={`
                flex flex-col items-start gap-2 p-4 rounded-xl border text-left transition-all cursor-pointer
                ${category === cat.value
                  ? 'border-purple bg-purple/10 text-white'
                  : 'border-dgray/40 bg-dgray/20 text-lgray hover:border-purple/40 hover:text-white'
                }
              `}
            >
              <div className={category === cat.value ? 'text-purple' : 'text-muted'}>
                {cat.icon}
              </div>
              <div>
                <div className="text-sm font-medium">{cat.label}</div>
                <div className="text-xs text-muted mt-0.5">{cat.description}</div>
              </div>
              {category === cat.value && (
                <CheckCircle size={14} className="text-purple self-end" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Release selection (only for distribution) */}
      {category === 'distribution' && (
        <div>
          <h3 className="text-sm font-semibold text-lgray mb-3 uppercase tracking-wide">
            Étape 2 — Sortie concernée
          </h3>
          <Select
            label="Sélectionner une sortie"
            options={[
              { value: '', label: '— Aucune sortie spécifique —' },
              ...artistReleases.map((r) => ({ value: r.id, label: `${r.title} (${r.type})` })),
            ]}
            value={selectedRelease}
            onChange={(e) => setSelectedRelease(e.target.value)}
          />

          {currentRelease && (
            <div className="mt-3 p-3 bg-dgray/30 rounded-lg border border-dgray/40">
              <p className="text-xs text-lgray mb-2 font-medium">Disponibilité sur les plateformes :</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(currentRelease.platforms).map(([platform, available]) => (
                  <div key={platform} className="flex items-center gap-2 text-xs">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${available ? 'bg-green' : 'bg-red'}`}
                    />
                    <span className={available ? 'text-lgray' : 'text-red'}>
                      {platformLabels[platform] || platform}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Subject & description */}
      {(step >= 2 || (category && category !== 'distribution')) && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-lgray uppercase tracking-wide">
            {category === 'distribution' ? 'Étape 3 — Détails' : 'Étape 2 — Détails'}
          </h3>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-lgray">Sujet *</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Décrivez brièvement votre problème..."
              className={`
                bg-dgray border rounded-lg px-3 py-2 text-sm text-white placeholder-muted outline-none transition-all
                focus:border-purple focus:ring-1 focus:ring-purple/30
                ${errors.subject ? 'border-red' : 'border-dgray/60'}
              `}
            />
            {errors.subject && <span className="text-xs text-red">{errors.subject}</span>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-lgray">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Donnez plus de détails sur votre problème..."
              rows={4}
              className="bg-dgray border border-dgray/60 rounded-lg px-3 py-2 text-sm text-white placeholder-muted outline-none transition-all focus:border-purple focus:ring-1 focus:ring-purple/30 resize-none"
            />
          </div>
        </div>
      )}

      {/* Priority selection */}
      {subject && (
        <div>
          <h3 className="text-sm font-semibold text-lgray mb-3 uppercase tracking-wide">
            {category === 'distribution' ? 'Étape 4 — Priorité' : 'Étape 3 — Priorité'}
          </h3>
          {errors.priority && <p className="text-xs text-red mb-2">{errors.priority}</p>}
          <div className="grid grid-cols-2 gap-2">
            {priorities.map((p) => (
              <button
                key={p.value}
                type="button"
                onClick={() => setPriority(p.value)}
                className={`
                  flex flex-col gap-1 p-3 rounded-lg border text-left transition-all cursor-pointer
                  ${priority === p.value ? p.color : 'border-dgray/40 bg-dgray/20 text-lgray hover:border-lgray/40'}
                `}
              >
                <span className="text-sm font-semibold">{p.label}</span>
                <span className="text-xs opacity-70">{p.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      {subject && priority && (
        <Button type="submit" variant="primary" size="lg" className="mt-2">
          <ChevronRight size={16} />
          Soumettre le ticket
        </Button>
      )}
    </form>
  )
}
