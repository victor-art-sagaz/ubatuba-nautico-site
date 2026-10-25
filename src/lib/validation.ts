import { rentals, tours, type Experience } from '@/data/experiences'

// Unificação de passeios e aluguéis
export const allExperiences: Experience[] = [...tours, ...rentals]

export function getExperienceById(id: string): Experience | undefined {
  return allExperiences.find((e: Experience) => e.id === id)
}

export interface BookingFormValues {
  name: string
  phone: string
  experienceId: string
  date: string
  period: string
  passengers: string
  notes: string
  website: string
}

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

export const periodOptions = [
  { value: 'manhas', label: 'Manhã' },
  { value: 'tarde', label: 'Tarde' },
  { value: 'dia-todo', label: 'Dia todo' },
]

export function todayISO(): string {
  return new Date().toISOString().split('T')[0]
}

export function maxDateISO(): string {
  const d = new Date()
  d.setMonth(d.getMonth() + 6)
  return d.toISOString().split('T')[0]
}

export function validateBooking(values: BookingFormValues) {
  const errors: FieldErrors = {}

  if (!values.name.trim()) {
    errors.name = 'Por favor, informe seu nome.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Por favor, informe seu telefone/WhatsApp.'
  }

  if (!values.experienceId) {
    errors.experienceId = 'Selecione um passeio ou embarcação.'
  }

  if (!values.date) {
    errors.date = 'Selecione a data pretendida.'
  }

  if (!values.period) {
    errors.period = 'Selecione o período desejado.'
  }

  if (!values.passengers || Number(values.passengers) <= 0) {
    errors.passengers = 'Informe um número válido de passageiros.'
  }

  const isValid = Object.keys(errors).length === 0

  return {
    errors,
    payload: isValid ? values : null,
  }
}
