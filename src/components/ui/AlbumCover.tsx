/** Pochettes d'album génératives — une illustration SVG par release ID */
import type { ReactElement } from 'react'

const covers: Record<string, ReactElement> = {
  'release-001': ( // Nuit Stellaire
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="r001a" cx="50%" cy="38%" r="65%">
          <stop offset="0%" stopColor="#1e0a4e" />
          <stop offset="100%" stopColor="#04040c" />
        </radialGradient>
        <radialGradient id="r001b" cx="55%" cy="45%" r="25%">
          <stop offset="0%" stopColor="#7B5EA7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7B5EA7" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#r001a)" />
      <rect width="200" height="200" fill="url(#r001b)" />
      {/* Étoiles */}
      {[
        [18,22,1.4],[47,13,1],[82,28,1.6],[125,9,1],[162,32,1.3],[187,18,1.6],
        [32,58,1],[72,47,1.4],[152,42,1],[178,63,1.3],[9,88,1.1],[192,82,1],
        [55,80,0.8],[133,68,1.2],[96,38,1],[38,138,1],[168,118,1.2],
        [60,162,0.9],[142,152,1],[26,178,1.3],[183,168,1.1],[100,108,0.7],
        [74,118,0.9],[115,140,1],[148,95,0.8],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="white" opacity={0.4 + Math.random() * 0.55} />
      ))}
      {/* Lune croissante */}
      <circle cx="108" cy="88" r="36" fill="#c8aaff" opacity="0.18" />
      <circle cx="108" cy="88" r="28" fill="#9370db" opacity="0.55" />
      <circle cx="122" cy="80" r="24" fill="#04040c" />
      {/* Halo */}
      <circle cx="108" cy="88" r="34" fill="none" stroke="#7B5EA7" strokeWidth="0.8" opacity="0.3" />
      <circle cx="108" cy="88" r="42" fill="none" stroke="#7B5EA7" strokeWidth="0.5" opacity="0.15" />
      {/* Titre */}
      <text x="100" y="182" textAnchor="middle" fontSize="9.5" fontFamily="Inter, sans-serif"
        fill="white" opacity="0.85" fontWeight="700" letterSpacing="2">NUIT STELLAIRE</text>
    </svg>
  ),

  'release-002': ( // Lumière Bleue
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="r002a" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#00262e" />
          <stop offset="100%" stopColor="#030a0c" />
        </radialGradient>
        <radialGradient id="r002b" cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor="#00BCD4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00BCD4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#r002a)" />
      {/* Rayons de lumière */}
      {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((angle, i) => {
        const rad = (angle * Math.PI) / 180
        const x2 = 100 + Math.cos(rad) * 120
        const y2 = 100 + Math.sin(rad) * 120
        return (
          <line key={i} x1="100" y1="100" x2={x2} y2={y2}
            stroke="#00BCD4" strokeWidth={i % 2 === 0 ? 1.2 : 0.5}
            opacity={i % 2 === 0 ? 0.35 : 0.15} />
        )
      })}
      <rect width="200" height="200" fill="url(#r002b)" />
      {/* Cercles concentriques */}
      {[18,32,48,66,86].map((r, i) => (
        <circle key={i} cx="100" cy="100" r={r} fill="none"
          stroke="#00BCD4" strokeWidth={i === 0 ? 2 : 0.8}
          opacity={[0.9, 0.5, 0.3, 0.2, 0.1][i]} />
      ))}
      {/* Orbe central */}
      <circle cx="100" cy="100" r="10" fill="#00BCD4" opacity="0.9" />
      <circle cx="100" cy="100" r="5" fill="white" opacity="0.95" />
      {/* Titre */}
      <text x="100" y="182" textAnchor="middle" fontSize="9.5" fontFamily="Inter, sans-serif"
        fill="#00BCD4" opacity="0.9" fontWeight="700" letterSpacing="2">LUMIÈRE BLEUE</text>
    </svg>
  ),

  'release-003': ( // L'Éveil
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="r003a" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0a0410" />
          <stop offset="50%" stopColor="#1a0628" />
          <stop offset="100%" stopColor="#2e0a0a" />
        </linearGradient>
        <radialGradient id="r003b" cx="50%" cy="72%" r="50%">
          <stop offset="0%" stopColor="#FF6D00" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#FF6D00" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#r003a)" />
      {/* Rayons de l'aube */}
      {[-80,-60,-42,-28,-15,-5,5,15,28,42,60,80].map((angle, i) => {
        const rad = ((angle - 90) * Math.PI) / 180
        const len = 90 + (i % 3) * 15
        const x2 = 100 + Math.cos(rad) * len
        const y2 = 145 + Math.sin(rad) * len
        return (
          <line key={i} x1="100" y1="145" x2={x2} y2={y2}
            stroke="#FF6D00" strokeWidth={Math.abs(angle) < 20 ? 2 : 1}
            opacity={0.15 + (1 - Math.abs(angle) / 90) * 0.4} />
        )
      })}
      <rect width="200" height="200" fill="url(#r003b)" />
      {/* Horizon */}
      <line x1="10" y1="145" x2="190" y2="145" stroke="#FF6D00" strokeWidth="0.8" opacity="0.4" />
      {/* Soleil levant */}
      <circle cx="100" cy="145" r="28" fill="#FF6D00" opacity="0.25" />
      <circle cx="100" cy="145" r="18" fill="#FF6D00" opacity="0.55" />
      <circle cx="100" cy="145" r="10" fill="#ffaa44" opacity="0.9" />
      <circle cx="100" cy="145" r="5" fill="white" opacity="0.95" />
      {/* Œil stylisé */}
      <ellipse cx="100" cy="90" rx="28" ry="18" fill="none" stroke="#E040FB" strokeWidth="1.2" opacity="0.6" />
      <circle cx="100" cy="90" r="9" fill="#7B5EA7" opacity="0.8" />
      <circle cx="100" cy="90" r="5" fill="#E040FB" opacity="0.9" />
      <circle cx="102" cy="88" r="2" fill="white" opacity="0.8" />
      {/* Titre */}
      <text x="100" y="182" textAnchor="middle" fontSize="9.5" fontFamily="Inter, sans-serif"
        fill="#E040FB" opacity="0.85" fontWeight="700" letterSpacing="3">L'ÉVEIL</text>
    </svg>
  ),

  'release-004': ( // Solstice
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <radialGradient id="r004a" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#001a10" />
          <stop offset="100%" stopColor="#03080a" />
        </radialGradient>
        <radialGradient id="r004b" cx="50%" cy="50%" r="35%">
          <stop offset="0%" stopColor="#00E676" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00E676" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="200" height="200" fill="url(#r004a)" />
      {/* Rayons solstice */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180
        const r1 = 42, r2 = i % 2 === 0 ? 88 : 68
        return (
          <line key={i}
            x1={100 + Math.cos(angle) * r1} y1={100 + Math.sin(angle) * r1}
            x2={100 + Math.cos(angle) * r2} y2={100 + Math.sin(angle) * r2}
            stroke="#00E676" strokeWidth={i % 2 === 0 ? 2 : 1}
            opacity={i % 2 === 0 ? 0.7 : 0.35} />
        )
      })}
      <rect width="200" height="200" fill="url(#r004b)" />
      {/* Losange solstice */}
      <polygon points="100,30 145,100 100,170 55,100"
        fill="none" stroke="#00BCD4" strokeWidth="1.5" opacity="0.5" />
      <polygon points="100,52 128,100 100,148 72,100"
        fill="none" stroke="#00E676" strokeWidth="1" opacity="0.6" />
      {/* Soleil central */}
      {[30, 22, 14].map((r, i) => (
        <circle key={i} cx="100" cy="100" r={r} fill="none"
          stroke="#00E676" strokeWidth={[2, 1.5, 1][i]}
          opacity={[0.8, 0.5, 0.3][i]} />
      ))}
      <circle cx="100" cy="100" r="8" fill="#00E676" opacity="0.9" />
      <circle cx="100" cy="100" r="4" fill="white" opacity="1" />
      {/* Titre */}
      <text x="100" y="182" textAnchor="middle" fontSize="9.5" fontFamily="Inter, sans-serif"
        fill="#00E676" opacity="0.85" fontWeight="700" letterSpacing="3">SOLSTICE</text>
    </svg>
  ),

  'release-005': ( // Neon Jungle
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <linearGradient id="r005a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#080010" />
          <stop offset="100%" stopColor="#001208" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" fill="url(#r005a)" />
      {/* Grille neon */}
      {[40, 80, 120, 160].map((x, i) => (
        <line key={`v${i}`} x1={x} y1="0" x2={x} y2="200"
          stroke="#E040FB" strokeWidth="0.4" opacity="0.15" />
      ))}
      {[40, 80, 120, 160].map((y, i) => (
        <line key={`h${i}`} x1="0" y1={y} x2="200" y2={y}
          stroke="#00E676" strokeWidth="0.4" opacity="0.15" />
      ))}
      {/* Tiges jungle stylisées */}
      <line x1="30" y1="200" x2="50" y2="80" stroke="#00E676" strokeWidth="2.5" opacity="0.7" />
      <line x1="30" y1="200" x2="15" y2="100" stroke="#00E676" strokeWidth="1.5" opacity="0.4" />
      <line x1="50" y1="80" x2="70" y2="110" stroke="#00E676" strokeWidth="1.5" opacity="0.5" />
      <line x1="50" y1="80" x2="30" y2="95" stroke="#00E676" strokeWidth="1.5" opacity="0.5" />
      <line x1="160" y1="200" x2="148" y2="70" stroke="#00E676" strokeWidth="2.5" opacity="0.6" />
      <line x1="148" y1="70" x2="170" y2="95" stroke="#00E676" strokeWidth="1.5" opacity="0.5" />
      <line x1="148" y1="70" x2="130" y2="85" stroke="#00E676" strokeWidth="1.5" opacity="0.45" />
      <line x1="100" y1="200" x2="90" y2="120" stroke="#00E676" strokeWidth="2" opacity="0.5" />
      {/* Lune / orbe néon */}
      <circle cx="100" cy="78" r="30" fill="none" stroke="#E040FB" strokeWidth="2" opacity="0.7" />
      <circle cx="100" cy="78" r="22" fill="#E040FB" opacity="0.12" />
      <circle cx="100" cy="78" r="14" fill="#E040FB" opacity="0.25" />
      <circle cx="100" cy="78" r="6" fill="#E040FB" opacity="0.9" />
      {/* Reflets neon */}
      <circle cx="100" cy="78" r="32" fill="none" stroke="#E040FB" strokeWidth="0.6" opacity="0.2" />
      <circle cx="100" cy="78" r="38" fill="none" stroke="#E040FB" strokeWidth="0.4" opacity="0.1" />
      {/* Titre */}
      <text x="100" y="182" textAnchor="middle" fontSize="9.5" fontFamily="Inter, sans-serif"
        fill="#E040FB" opacity="0.9" fontWeight="700" letterSpacing="2">NEON JUNGLE</text>
    </svg>
  ),
}

interface AlbumCoverProps {
  releaseId: string
  className?: string
}

export default function AlbumCover({ releaseId, className = '' }: AlbumCoverProps) {
  const cover = covers[releaseId]
  if (!cover) return null
  return (
    <div className={`w-full h-full ${className}`}>
      {cover}
    </div>
  )
}
