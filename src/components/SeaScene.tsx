import { useId } from 'react'
import type { SceneVariant } from '@/types'

interface Palette {
  skyTop: string
  skyBottom: string
  sea1: string
  sea2: string
  sun: string
}

const palettes: Record<SceneVariant, Palette> = {
  hero: { skyTop: '#8fd0ea', skyBottom: '#e9f8f6', sea1: '#14aaa0', sea2: '#0b2340', sun: '#fff4d6' },
  boat: { skyTop: '#8fd0ea', skyBottom: '#e6f6f5', sea1: '#2fc6ba', sea2: '#12304f', sun: '#fff4d6' },
  island: { skyTop: '#a9dcef', skyBottom: '#eef9f7', sea1: '#14aaa0', sea2: '#0e6e6c', sun: '#fff4d6' },
  beach: { skyTop: '#b4e3f1', skyBottom: '#f5eee1', sea1: '#66dfd2', sea2: '#14aaa0', sun: '#fff4d6' },
  crew: { skyTop: '#12304f', skyBottom: '#2f5a88', sea1: '#1d4268', sea2: '#071a30', sun: '#adc5e0' },
  sunset: { skyTop: '#1d4268', skyBottom: '#f0a56b', sea1: '#2f5a88', sea2: '#071a30', sun: '#ffd9a0' },
}

interface SeaSceneProps {
  variant: SceneVariant
  className?: string
}

/**
 * Ilustração vetorial usada como substituta enquanto não há fotografias reais.
 * É decorativa e não pretende representar a frota ou a equipe da empresa.
 */
export function SeaScene({ variant, className }: SeaSceneProps) {
  const uid = useId().replace(/:/g, '')
  const p = palettes[variant]
  const sunset = variant === 'sunset'
  const showIsland = variant === 'hero' || variant === 'island' || variant === 'beach' || variant === 'sunset'
  const showBoat = variant === 'hero' || variant === 'boat' || variant === 'sunset'

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.skyTop} />
          <stop offset="1" stopColor={p.skyBottom} />
        </linearGradient>
        <linearGradient id={`sea-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={p.sea1} />
          <stop offset="1" stopColor={p.sea2} />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill={`url(#sky-${uid})`} />

      {variant === 'crew' ? (
        <g fill="none" stroke="#adc5e0" strokeOpacity="0.35" strokeWidth="3">
          <circle cx="400" cy="250" r="130" />
          <circle cx="400" cy="250" r="90" />
          <path d="M400 110v280M260 250h280M300 150l200 200M500 150L300 350" />
        </g>
      ) : (
        <circle cx={sunset ? 540 : 610} cy={sunset ? 340 : 170} r={sunset ? 78 : 54} fill={p.sun} opacity="0.95" />
      )}

      {showIsland && (
        <g fill="#1d4268" opacity="0.55">
          <path d="M0 372C70 318 150 296 230 336C290 304 360 316 430 372Z" />
          <path d="M470 372C520 340 590 336 650 372Z" opacity="0.7" />
        </g>
      )}

      <rect y="370" width="800" height="230" fill={`url(#sea-${uid})`} />

      <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="3" opacity="0.3">
        <path d="M30 420c30-12 60 12 90 0s60-12 90 0" />
        <path d="M520 410c30-12 60 12 90 0s60-12 90 0" />
        <path d="M120 480c40-14 80 14 120 0s80-14 120 0" />
        <path d="M470 520c40-14 80 14 120 0s80-14 120 0" />
      </g>

      {showBoat && (
        <g transform="translate(330 400)">
          <path d="M-70 52c30 10 60 14 90 14s70-6 110-22" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.45" />
          <path d="M-60 0H130L100 40H-34Z" fill="#ffffff" />
          <path d="M-52 12H120" stroke="#2fc6ba" strokeWidth="5" />
          <path d="M-10 -34h78l16 34H-30Z" fill="#d6e2f0" />
          <path d="M2 -26h28l-6 20H-8Z M40 -26h22l8 20H34Z" fill="#12304f" opacity="0.75" />
          <path d="M20 -34V-62" stroke="#12304f" strokeWidth="3" />
          <path d="M20 -62l22 7-22 7Z" fill="#2fc6ba" />
        </g>
      )}

      {variant === 'beach' && (
        <path d="M0 540C200 500 520 470 800 500V600H0Z" fill="#f5eee1" opacity="0.95" />
      )}
    </svg>
  )
}
