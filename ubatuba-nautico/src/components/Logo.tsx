import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

interface LogoProps {
  tone?: 'light' | 'dark'
  className?: string
}

/** Logotipo provisório: ícone de vela + nome da empresa (placeholder). */
export function Logo({ tone = 'light', className }: LogoProps) {
  const light = tone === 'light'
  return (
    <Link to="/" className={cn('inline-flex items-center gap-2.5', className)} aria-label={`${siteConfig.name} - página inicial`}>
      <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true" focusable="false">
        <rect width="64" height="64" rx="14" fill={light ? '#ffffff' : '#0b2340'} />
        <path d="M32 12v28H18z" fill={light ? '#0b2340' : '#ffffff'} />
        <path d="M35 18l13 22H35z" fill="#14aaa0" />
        <path d="M12 44h40l-5 8H17z" fill={light ? '#0b2340' : '#ffffff'} />
      </svg>
      <span className="flex min-w-0 flex-col leading-tight">
        <span className={cn('truncate font-display text-base font-semibold sm:text-lg', light ? 'text-white' : 'text-navy-900')}>
          {siteConfig.name}
        </span>
        <span className={cn('hidden text-[11px] uppercase tracking-[0.16em] sm:block', light ? 'text-sea-200' : 'text-sea-700')}>
          Ubatuba · SP
        </span>
      </span>
    </Link>
  )
}
