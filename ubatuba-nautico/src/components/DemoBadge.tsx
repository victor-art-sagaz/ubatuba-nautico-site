import { Info } from 'lucide-react'
import { cn } from '@/lib/cn'

interface DemoBadgeProps {
  children?: string
  className?: string
  tone?: 'light' | 'dark'
}

/** Selo que identifica conteúdo de demonstração (preços, depoimentos, exemplos). */
export function DemoBadge({ children = 'Valor demonstrativo', className, tone = 'light' }: DemoBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        tone === 'light' ? 'bg-sand-100 text-sand-600 ring-1 ring-sand-300' : 'bg-white/10 text-sand-200 ring-1 ring-white/20',
        className,
      )}
    >
      <Info className="h-3 w-3" aria-hidden="true" />
      {children}
    </span>
  )
}
