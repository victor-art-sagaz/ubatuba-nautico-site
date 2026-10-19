import type { BookingFormValues, BookingPayload, TimePeriod } from '@/types'
import { allExperiences } from '@/data/experiences'

export const periodOptions: ReadonlyArray<{ value: TimePeriod; label: string }> = [
  { value: 'manha', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'dia-inteiro', label: 'Dia inteiro' },
  { value: 'por-do-sol', label: 'Fim de tarde / pôr do sol' },
  { value: 'a-combinar', label: 'A combinar' },
]

export type FieldErrors = Partial<Record<keyof BookingFormValues, string>>

export const emptyForm: BookingFormValues = {
  name: '',
  phone: '',
  experienceId: '',
  date: '',
  period: '',
  passengers: '',
  notes: '',
  website: '',
}

const pad = (n: number): string => String(n).padStart(2, '0')

export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function todayISO(): string {
  return toISODate(new Date())
}

export function maxDateISO(): string {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 1)
  return toISODate(d)
}

function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [y, m, d] = value.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}

/** Remove caracteres de controle. Em campos de uma linha, também quebras de linha. */
function clean(value: string, multiline = false): string {
  const pattern = multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g
  return value.replace(pattern, ' ').trim()
}

/** Aceita telefone brasileiro com DDD (10 ou 11 dígitos), com ou sem +55. Retorna só dígitos nacionais. */
export function normalizeBrazilPhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, '')
  if (digits.startsWith('55') && digits.length >= 12) digits = digits.slice(2)
  if (digits.length !== 10 && digits.length !== 11) return null
  if (!/^[1-9][1-9]/.test(digits)) return null
  if (digits.length === 11 && digits[2] !== '9') return null
  return digits
}

export function formatBrazilPhone(national: string): string {
  const ddd = national.slice(0, 2)
  const rest = national.slice(2)
  const split = rest.length === 9 ? 5 : 4
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`
}

export interface ValidationResult {
  errors: FieldErrors
  payload: BookingPayload | null
}

export function validateBooking(values: BookingFormValues): ValidationResult {
  const errors: FieldErrors = {}

  const name = clean(values.name)
  if (name.length < 3) errors.name = 'Informe seu nome completo (mínimo de 3 letras).'
  else if (name.length > 80) errors.name = 'O nome pode ter no máximo 80 caracteres.'

  const phoneDigits = normalizeBrazilPhone(values.phone)
  if (!values.phone.trim()) errors.phone = 'Informe um telefone ou WhatsApp para contato.'
  else if (!phoneDigits) errors.phone = 'Telefone inválido. Use DDD + número, por exemplo (12) 90000-0000.'

  const experience = allExperiences.find((e) => e.id === values.experienceId)
  if (!values.experienceId) errors.experienceId = 'Escolha o passeio ou o aluguel desejado.'
  else if (!experience) errors.experienceId = 'Opção inválida. Escolha uma das opções da lista.'

  if (!values.date) errors.date = 'Informe a data pretendida.'
  else if (!isValidISODate(values.date)) errors.date = 'Data inválida.'
  else if (values.date < todayISO()) errors.date = 'A data não pode ser anterior a hoje.'
  else if (values.date > maxDateISO()) errors.date = 'Escolha uma data dentro dos próximos 12 meses.'

  const period = periodOptions.find((p) => p.value === values.period)
  if (!values.period) errors.period = 'Escolha o horário ou período desejado.'
  else if (!period) errors.period = 'Período inválido.'

  const passengersNumber = Number(values.passengers)
  if (!values.passengers.trim()) errors.passengers = 'Informe o número de passageiros.'
  else if (!Number.isInteger(passengersNumber) || passengersNumber < 1 || passengersNumber > 50)
    errors.passengers = 'Informe um número inteiro de passageiros entre 1 e 50.'

  const notes = clean(values.notes, true)
  if (notes.length > 500) errors.notes = 'As observações podem ter no máximo 500 caracteres.'

  if (Object.keys(errors).length > 0 || !phoneDigits || !experience || !period) {
    return { errors, payload: null }
  }

  return {
    errors,
    payload: {
      name,
      phone: formatBrazilPhone(phoneDigits),
      experienceId: experience.id,
      experienceName: experience.name,
      date: values.date,
      period: period.value,
      passengers: passengersNumber,
      notes,
    },
  }
}
