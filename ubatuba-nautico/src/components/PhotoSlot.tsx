import { Camera } from 'lucide-react'
import { cn } from '@/lib/cn'

interface PhotoSlotProps {
  title: string
  hint: string
  tone?: 'light' | 'dark'
  className?: string
}

/** Espaço reservado para fotografia real fornecida pela empresa. */
export function PhotoSlot({ title, hint, tone = 'light', className }: PhotoSlotProps) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed p-6 text-center',
        dark ? 'border-white/25 bg-white/5 text-navy-200' : 'border-navy-200 bg-navy-50 text-navy-600',
        className,
      )}
    >
      <Camera className={cn('h-8 w-8', dark ? 'text-sea-300' : 'text-sea-700')} aria-hidden="true" />
      <p className={cn('font-sans text-sm font-semibold', dark ? 'text-white' : 'text-navy-800')}>{title}</p>
      <p className="max-w-xs text-xs leading-relaxed">{hint}</p>
    </div>
  )
}
