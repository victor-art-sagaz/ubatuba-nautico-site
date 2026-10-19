import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'white' | 'sand' | 'navy'

const tones: Record<Tone, string> = {
  white: 'bg-white',
  sand: 'bg-sand-50',
  navy: 'bg-navy-900 text-navy-100',
}

interface SectionProps {
  id: string
  tone?: Tone
  className?: string
  children: ReactNode
}

export function Section({ id, tone = 'white', className, children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn('py-16 sm:py-20 lg:py-24', tones[tone], className)}>
      <div className="container">{children}</div>
    </section>
  )
}

interface SectionHeadingProps {
  sectionId: string
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  tone?: 'light' | 'dark'
}

export function SectionHeading({
  sectionId,
  eyebrow,
  title,
  subtitle,
  align = 'left',
  tone = 'light',
}: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={cn('mb-10 max-w-3xl sm:mb-12', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p className={cn('mb-3 text-xs font-bold uppercase tracking-[0.18em]', dark ? 'text-sea-300' : 'text-sea-700')}>
          {eyebrow}
        </p>
      )}
      <h2
        id={`${sectionId}-title`}
        className={cn('text-3xl font-semibold leading-tight sm:text-4xl', dark && '!text-white')}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 text-base leading-relaxed sm:text-lg', dark ? 'text-navy-200' : 'text-navy-600')}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
