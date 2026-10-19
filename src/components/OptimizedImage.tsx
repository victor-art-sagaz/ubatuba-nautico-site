import { useState } from 'react'
import type { ImageAsset } from '@/types'
import { cn } from '@/lib/cn'
import { SeaScene } from '@/components/SeaScene'

interface OptimizedImageProps {
  image: ImageAsset
  className?: string
  /** Imagem acima da dobra (carrega imediatamente). */
  priority?: boolean
  /** Exibe o selo "Imagem ilustrativa". */
  showLabel?: boolean
  sizes?: string
}

/**
 * Imagem com carregamento eficiente (lazy + async decode) e substituição automática
 * por uma ilustração caso o arquivo ainda não exista.
 */
export function OptimizedImage({ image, className, priority = false, showLabel = true, sizes }: OptimizedImageProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-navy-100', className)}>
      {failed ? (
        <div role="img" aria-label={image.alt} className="h-full w-full">
          <SeaScene variant={image.scene} className="h-full w-full" />
        </div>
      ) : (
        <img
          src={image.src}
          alt={image.alt}
          sizes={sizes}
          width={1200}
          height={800}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      )}
      {showLabel && (
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-navy-950/70 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
          Imagem ilustrativa
        </span>
      )}
    </div>
  )
}
