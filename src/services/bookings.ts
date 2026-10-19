import type { BookingPayload } from '@/types'
import { getBookingApiUrl } from '@/config/firebase'
import { buildBookingWhatsappLink } from '@/services/whatsapp'

/**
 * Resultado do envio de uma solicitação de reserva.
 *
 * - whatsappUrl: link com a mensagem pronta (null se o WhatsApp ainda não foi configurado).
 * - saved: true SOMENTE se um endpoint confiável (Cloud Function) confirmou a gravação.
 * - saveFailed: true se o endpoint estava configurado mas a gravação falhou.
 *
 * Sem VITE_BOOKING_API_URL nada é gravado e o site nunca diz que gravou.
 */
export interface SubmitResult {
  whatsappUrl: string | null
  saved: boolean
  saveFailed: boolean
}

const REQUEST_TIMEOUT_MS = 10_000

async function saveViaTrustedEndpoint(url: string, payload: BookingPayload): Promise<boolean> {
  const controller = new AbortController()
  const timer = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, source: 'web' }),
      signal: controller.signal,
    })
    return response.ok
  } catch {
    return false
  } finally {
    window.clearTimeout(timer)
  }
}

export async function submitBooking(payload: BookingPayload): Promise<SubmitResult> {
  const apiUrl = getBookingApiUrl()
  let saved = false
  let saveFailed = false

  if (apiUrl) {
    saved = await saveViaTrustedEndpoint(apiUrl, payload)
    saveFailed = !saved
  }

  return {
    whatsappUrl: buildBookingWhatsappLink(payload),
    saved,
    saveFailed,
  }
}
