/**
 * ARQUIVO CENTRAL DE DADOS COMERCIAIS.
 * Troque aqui os placeholders entre colchetes pelos dados reais da empresa.
 * O WhatsApp pode ser definido aqui (whatsappNumber) ou pela variável VITE_WHATSAPP_NUMBER.
 */

const envWhatsapp = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '') as string

export const siteConfig = {
  /** Enquanto for true, o site exibe avisos de conteúdo demonstrativo. */
  demoMode: true,

  name: '[NOME DA EMPRESA]',
  tagline: 'Passeios de lancha e barco em Ubatuba',
  city: 'Ubatuba, São Paulo',
  boardingPoint: 'Píer do Saco da Ribeira, Ubatuba-SP',

  /** Somente dígitos com DDI e DDD. Ex.: 5512900000000. Vazio = não configurado. */
  whatsappNumber: envWhatsapp.replace(/\D/g, ''),
  whatsappPlaceholder: '[NUMERO DE WHATSAPP]',
  phone: '[TELEFONE]',
  email: '[EMAIL DA EMPRESA]',
  instagramUrl: '[LINK DO INSTAGRAM]',
  facebookUrl: '[LINK DO FACEBOOK]',
  domain: '[DOMINIO]',

  /** Texto usado para o mapa incorporado. */
  mapQuery: 'Píer do Saco da Ribeira, Ubatuba-SP',
} as const

/** Valor ainda não preenchido (vazio ou entre colchetes). */
export function isPlaceholder(value: string): boolean {
  const v = value.trim()
  return v === '' || /^\[.*\]$/.test(v)
}

export function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

/** Número de WhatsApp válido (10 a 15 dígitos) ou null se ainda não configurado. */
export function getWhatsappNumber(): string | null {
  const digits = siteConfig.whatsappNumber
  return /^\d{10,15}$/.test(digits) ? digits : null
}

export function formatWhatsappDisplay(): string {
  const n = getWhatsappNumber()
  if (!n) return siteConfig.whatsappPlaceholder
  if (n.startsWith('55') && (n.length === 12 || n.length === 13)) {
    const ddd = n.slice(2, 4)
    const rest = n.slice(4)
    const split = rest.length === 9 ? 5 : 4
    return `+55 (${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`
  }
  return `+${n}`
}

/** Link simples para o WhatsApp (sem mensagem). Retorna null se o número não estiver configurado. */
export function getWhatsappLink(message?: string): string | null {
  const n = getWhatsappNumber()
  if (!n) return null
  const base = `https://wa.me/${n}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  siteConfig.mapQuery,
)}&output=embed`

export const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  siteConfig.mapQuery,
)}`
