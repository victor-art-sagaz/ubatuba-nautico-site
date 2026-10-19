import type { BookingPayload } from '@/types'
import { periodOptions } from '@/lib/validation'
import { getWhatsappLink, siteConfig } from '@/config/site'

export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

/** Mensagem pré-preenchida enviada ao WhatsApp da empresa. */
export function buildBookingMessage(payload: BookingPayload): string {
  const periodLabel = periodOptions.find((p) => p.value === payload.period)?.label ?? payload.period
  const lines = [
    `Olá, ${siteConfig.name}! Gostaria de solicitar uma reserva pelo site (sujeita à confirmação de disponibilidade).`,
    '',
    `Nome: ${payload.name}`,
    `Telefone: ${payload.phone}`,
    `Passeio/aluguel: ${payload.experienceName}`,
    `Data pretendida: ${formatDateBR(payload.date)}`,
    `Horário/período: ${periodLabel}`,
    `Passageiros: ${payload.passengers}`,
  ]
  if (payload.notes) lines.push(`Observações: ${payload.notes}`)
  return lines.join('\n')
}

/** Link do WhatsApp com a mensagem, ou null se o número ainda não foi configurado. */
export function buildBookingWhatsappLink(payload: BookingPayload): string | null {
  return getWhatsappLink(buildBookingMessage(payload))
}
