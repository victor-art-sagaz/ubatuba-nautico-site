import { Link } from 'react-router-dom'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

interface LogoProps {
  tone?: 'light' | 'dark'
  className?: string
}

export function Logo({ tone = 'light', className }: LogoProps) {
  const light = tone === 'light'

  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-3', className)}
      aria-label={`${siteConfig.name} - página inicial`}
    >
      {/* IMAGEM DA LOGO OFICIAL */}
      <img
        src="/images/logomusa.jpg"
        alt={siteConfig.name}
        className="h-10 w-auto rounded-lg object-contain"
      />

      <span className="flex min-w-0 flex-col leading-tight">
        <span
          className={cn(
            'truncate font-display text-base font-semibold sm:text-lg',
            light ? 'text-white' : 'text-navy-900'
          )}
        >
          {siteConfig.name}
        </span>
        <span
          className={cn(
            'hidden text-[11px] uppercase tracking-[0.16em] sm:block',
            light ? 'text-cyan-300' : 'text-cyan-700'
          )}
        >
          Ubatuba · SP
        </span>
      </span>
    </Link>
  )
}
