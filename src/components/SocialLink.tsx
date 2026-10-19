import { Facebook, Instagram } from 'lucide-react'
import { isHttpUrl, siteConfig } from '@/config/site'
import { cn } from '@/lib/cn'

interface SocialLinkProps {
  kind: 'instagram' | 'facebook'
  className?: string
}

const meta = {
  instagram: { label: 'Instagram', Icon: Instagram },
  facebook: { label: 'Facebook', Icon: Facebook },
} as const

/**
 * Link de rede social. Enquanto a URL for um placeholder, mostra um item informativo
 * (não clicável), evitando botões que não fazem nada.
 */
export function SocialLink({ kind, className }: SocialLinkProps) {
  const { label, Icon } = meta[kind]
  const url = kind === 'instagram' ? siteConfig.instagramUrl : siteConfig.facebookUrl
  const base = 'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1'

  if (isHttpUrl(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, 'transition hover:bg-white/10', className)}
        aria-label={`${label} (abre em nova aba)`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
        {label}
      </a>
    )
  }

  return (
    <span className={cn(base, 'opacity-70', className)} title="Link ainda não configurado">
      <Icon className="h-4 w-4" aria-hidden="true" />
      {label} · em breve
    </span>
  )
}
