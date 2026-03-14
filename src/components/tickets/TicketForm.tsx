import { useState } from 'react'
import { Globe, DollarSign, FileText, User, CheckCircle, Upload } from 'lucide-react'
import type { Category, Priority, Ticket } from '../../types/ticket'
import { mockReleases } from '../../data/mockReleases'
import Button from '../ui/Button'
import Select from '../ui/Select'

interface TicketFormProps {
  onSubmit: (ticketData: Partial<Ticket>) => void
  artistId: string
  loading?: boolean
}

const categories: { value: Category; label: string; description: string; icon: React.ReactNode; color: string; iconColor: string }[] = [
  { value: 'distribution', label: 'Distribution', description: 'Problème de mise en ligne ou de disponibilité', icon: <Globe size={22} />, color: 'teal', iconColor: 'text-teal' },
  { value: 'royalties',    label: 'Royalties',    description: 'Rapport de revenus ou paiements', icon: <DollarSign size={22} />, color: 'green', iconColor: 'text-green' },
  { value: 'metadata',     label: 'Métadonnées', description: 'Titre, artwork, ISRC, UPC incorrects', icon: <FileText size={22} />, color: 'purple', iconColor: 'text-purple' },
  { value: 'account',      label: 'Compte',       description: 'Accès, informations personnelles, facturation', icon: <User size={22} />, color: 'pink', iconColor: 'text-pink' },
]

const priorities: { value: Priority; label: string; description: string; color: string; border: string; bg: string }[] = [
  { value: 'critical', label: 'Critique', description: 'Réponse < 2h', color: 'text-red',    border: 'border-red/40',    bg: 'bg-red/10' },
  { value: 'high',     label: 'Haute',    description: 'Réponse < 24h', color: 'text-orange', border: 'border-orange/40', bg: 'bg-orange/10' },
  { value: 'medium',   label: 'Moyenne',  description: 'Réponse < 3j',  color: 'text-teal',   border: 'border-teal/40',   bg: 'bg-teal/10' },
  { value: 'low',      label: 'Faible',   description: 'Réponse < 7j',  color: 'text-lgray',  border: 'border-lgray/40',  bg: 'bg-lgray/10' },
]

const platformLabels: Record<string, string> = {
  spotify: 'Spotify', appleMusic: 'Apple Music', deezer: 'Deezer', amazon: 'Amazon Music', tidal: 'Tidal',
}

const categoryBorderColors: Record<Category, string> = {
  distribution: 'border-teal/50 bg-teal/10 shadow-[0_0_16px_rgba(0,188,212,0.2)]',
  royalties:    'border-green/50 bg-green/10 shadow-[0_0_16px_rgba(0,230,118,0.2)]',
  metadata:     'border-purple/50 bg-purple/10 shadow-[0_0_16px_rgba(123,94,167,0.2)]',
  account:      'border-pink/50 bg-pink/10 shadow-[0_0_16px_rgba(224,64,251,0.2)]',
}

const categoryIconBg: Record<Category, string> = {
  distribution: 'bg-teal/20',
  royalties:    'bg-green/20',
  metadata:     'bg-purple/20',
  account:      'bg-pink/20',
}

export default function TicketForm({ onSubmit, artistId, loading = false }: TicketFormProps) {
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
    setErrors((e) => ({ ...e, category: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!subject.trim()) newErrors.subject = 'Le sujet est requis'
    if (!category)        newErrors.category = 'La catégorie est requise'
    if (!priority)        newErrors.priority = 'La priorité est requise'
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }

    onSubmit({
      subject: subject.trim(),
      category: category!,
      priority: priority!,
      status: 'pending',
      artistId,
      releaseId: selectedRelease || undefined,
    })
  }

  // Stepper
  const step = !category ? 1 : category === 'distribution' && !selectedRelease && !subject ? 2 : subject ? 4 : 3

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      {/* Stepper */}
      <div className="flex items-center gap-0">
        {[
          { n: 1, label: 'Catégorie' },
          { n: 2, label: category === 'distribution' ? 'Sortie' : 'Détails' },
          { n: 3, label: category === 'distribution' ? 'Détails' : 'Priorité' },
          ...(category === 'distribution' ? [{ n: 4, label: 'Priorité' }] : []),
        ].map((s, idx, arr) => {
          const done = step > s.n
          const active = step === s.n
          return (
            <div key={s.n} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                  ${done ? 'bg-green/20 text-green' : active ? 'bg-purple text-white' : 'bg-dgray text-muted'}`}>
                  {done ? <CheckCircle size={14} /> : s.n}
                </div>
                <span className={`text-xs font-medium ${active ? 'text-white' : done ? 'text-green' : 'text-muted'}`}>{s.label}</span>
              </div>
              {idx < arr.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${done ? 'bg-green/50' : 'bg-border'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Step 1: Category */}
      <div>
        <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">
          Étape 1 — Catégorie <span className="text-red">*</span>
        </h3>
        {errors.category && <p className="text-xs text-red mb-2">{errors.category}</p>}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => handleCategorySelect(cat.value)}
              aria-pressed={category === cat.value}
              className={`
                flex flex-col items-start gap-3 p-4 rounded-xl border min-h-28 text-left cursor-pointer relative
                ${category === cat.value
                  ? categoryBorderColors[cat.value]
                  : 'border-border bg-dgray/20 hover:border-border/70 hover:bg-dgray/40'
                }
              `}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${category === cat.value ? categoryIconBg[cat.value] : 'bg-dgray'} ${cat.iconColor}`}>
                {cat.icon}
              </div>
              <div>
                <div className="text-white text-sm font-semibold">{cat.label}</div>
                <div className="text-muted text-xs mt-0.5">{cat.description}</div>
              </div>
              {category === cat.value && (
                <div className={`absolute bottom-3 right-3 w-5 h-5 rounded-full flex items-center justify-center bg-${cat.color}/80`}>
                  <CheckCircle size={12} className="text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Release selection */}
      {category === 'distribution' && (
        <div className="animate-slide-up">
          <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">
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
            <div className="mt-3 p-3 bg-dgray/30 rounded-xl border border-border">
              <p className="text-xs text-lgray mb-2 font-medium">Disponibilité sur les plateformes :</p>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(currentRelease.platforms).map(([platform, available]) => (
                  <div key={platform} className="flex items-center gap-2 text-xs">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${available ? 'bg-green' : 'bg-red'}`} />
                    <span className={available ? 'text-lgray' : 'text-red'}>{platformLabels[platform] || platform}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Subject & description */}
      {category && (
        <div className="flex flex-col gap-4 animate-slide-up">
          <h3 className="text-xs font-bold text-muted uppercase tracking-widest">
            {category === 'distribution' ? 'Étape 3 — Détails' : 'Étape 2 — Détails'}
          </h3>

          <div>
            <label htmlFor="ticket-subject" className="text-white text-sm font-medium mb-2 block">
              Sujet <span className="text-red" aria-hidden="true">*</span>
            </label>
            <input
              id="ticket-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Décrivez brièvement votre problème..."
              aria-required="true"
              aria-describedby={errors.subject ? 'ticket-subject-error' : undefined}
              className={`bg-dgray border rounded-xl px-4 py-3 text-sm text-white w-full placeholder:text-muted outline-none focus:border-purple focus:ring-1 focus:ring-purple/50 ${errors.subject ? 'border-red' : 'border-border'}`}
            />
            {errors.subject && <span id="ticket-subject-error" className="text-xs text-red mt-1.5 block" role="alert">{errors.subject}</span>}
          </div>

          <div>
            <label htmlFor="ticket-description" className="text-white text-sm font-medium mb-2 block">Description</label>
            <textarea
              id="ticket-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Donnez plus de détails sur votre problème..."
              rows={4}
              maxLength={500}
              aria-describedby="ticket-desc-count"
              className="bg-dgray border border-border rounded-xl px-4 py-3 text-sm text-white w-full placeholder:text-muted outline-none focus:border-purple focus:ring-1 focus:ring-purple/50 resize-none min-h-32"
            />
            <p id="ticket-desc-count" className="text-muted text-xs text-right mt-1" aria-live="polite">{description.length} / 500</p>
          </div>

          {/* Attachment */}
          <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-purple/50 hover:bg-purple/5 cursor-pointer">
            <Upload size={20} className="text-lgray mx-auto mb-2" />
            <p className="text-lgray text-sm">Glissez vos fichiers ici</p>
            <p className="text-muted text-xs mt-1">PNG, PDF, JPG — max 10 Mo</p>
          </div>
        </div>
      )}

      {/* Priority selection */}
      {subject && (
        <div className="animate-slide-up">
          <h3 className="text-xs font-bold text-muted uppercase tracking-widest mb-3">
            {category === 'distribution' ? 'Étape 4 — Priorité' : 'Étape 3 — Priorité'} <span className="text-red">*</span>
          </h3>
          {errors.priority && <p className="text-xs text-red mb-2">{errors.priority}</p>}
          <div className="grid grid-cols-2 gap-3">
            {priorities.map((p) => (
              <button
                key={p.value}
                type="button"
                aria-pressed={priority === p.value}
                onClick={() => { setPriority(p.value); setErrors((e) => ({ ...e, priority: '' })) }}
                className={`flex flex-col gap-1 p-3 rounded-xl border text-left cursor-pointer ${priority === p.value ? `${p.border} ${p.bg}` : 'border-border bg-dgray/20 hover:border-border/70'}`}
              >
                <span className={`text-sm font-bold ${priority === p.value ? p.color : 'text-lgray'}`}>{p.label}</span>
                <span className="text-xs text-muted">{p.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      {subject && priority && (
        <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full mt-2">
          Soumettre le ticket
        </Button>
      )}
    </form>
  )
}
