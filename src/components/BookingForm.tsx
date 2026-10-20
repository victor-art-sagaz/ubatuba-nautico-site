import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AlertTriangle, CheckCircle2, Info, Send } from 'lucide-react'
import type { BookingFormValues } from '@/types'
import { rentals, tours } from '@/data/experiences'
import { emptyForm, maxDateISO, periodOptions, todayISO, validateBooking, type FieldErrors } from '@/lib/validation'
import { submitBooking } from '@/services/bookings'
import { Button, ExternalButtonLink } from '@/components/Button'
import { siteConfig } from '@/config/site'

export interface BookingPreset {
  id: string
  nonce: number
}

interface BookingFormProps {
  preset?: BookingPreset | null
}

type Status = 'idle' | 'submitting' | 'ready' | 'unconfigured' | 'error'

const fieldOrder: Array<keyof BookingFormValues> = [
  'name',
  'phone',
  'experienceId',
  'date',
  'period',
  'passengers',
  'notes',
]

interface FieldProps {
  name: keyof BookingFormValues
  label: string
  error?: string
  hint?: string
  optional?: boolean
  children: ReactNode
}

function Field({ name, label, error, hint, optional, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={`field-${name}`} className="mb-1.5 block text-sm font-semibold text-navy-800">
        {label}
        {optional && <span className="ml-1 font-normal text-navy-500">(opcional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`hint-${name}`} className="mt-1.5 text-xs text-navy-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`error-${name}`} role="alert" className="mt-1.5 flex items-start gap-1.5 text-sm font-medium text-red-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

function describedBy(name: string, error?: string, hint?: string): string | undefined {
  if (error) return `error-${name}`
  if (hint) return `hint-${name}`
  return undefined
}

export function BookingForm({ preset }: BookingFormProps) {
  const [values, setValues] = useState<BookingFormValues>(emptyForm)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  // Passos da animação: arrive (entra e para) -> board (stickman pula) -> accelerate (proa empina e acelera com marola)
  const [animStep, setAnimStep] = useState<'idle' | 'arrive' | 'board' | 'accelerate'>('idle')
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!preset) return
    setValues((current) => ({ ...current, experienceId: preset.id }))
    setErrors((current) => ({ ...current, experienceId: undefined }))
    setStatus('idle')
    setWhatsappUrl(null)
  }, [preset])

  const update =
    (field: keyof BookingFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setValues((current) => ({ ...current, [field]: value }))
      setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
    }

  const reset = () => {
    setValues(emptyForm)
    setErrors({})
    setWhatsappUrl(null)
    setStatus('idle')
    setAnimStep('idle')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    if (values.website.trim() !== '') {
      setStatus('error')
      return
    }

    const validation = validateBooking(values)
    setErrors(validation.errors)

    if (!validation.payload) {
      setStatus('idle')
      const firstInvalid = fieldOrder.find((field) => validation.errors[field])
      if (firstInvalid) document.getElementById(`field-${firstInvalid}`)?.focus()
      return
    }

    setStatus('submitting')

    // 1. A lancha entra e para suavemente no meio (1.2s)
    setAnimStep('arrive')

    // 2. Bonequinho stickman pula em cima da lancha (1.2s depois)
    setTimeout(() => {
      setAnimStep('board')
    }, 1200)

    // 3. Proa eleva, ondas começam a mexer e a lancha acelera para a direita (2.2s depois)
    setTimeout(() => {
      setAnimStep('accelerate')
    }, 2400)

    // Finaliza e prepara a mensagem após a saída
    setTimeout(async () => {
      try {
        const outcome = await submitBooking(validation.payload as any)
        setWhatsappUrl(outcome.whatsappUrl || null)
        setStatus(outcome.whatsappUrl ? 'ready' : 'unconfigured')
      } catch {
        setStatus('error')
      }
    }, 4200)
  }

  const submitting = status === 'submitting'

  if (status === 'ready' && whatsappUrl) {
    return (
      <div role="status" className="rounded-3xl border border-sea-200 bg-sea-50 p-6 sm:p-8">
        <CheckCircle2 className="h-10 w-10 text-sea-600" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-semibold">Solicitação preparada!</h3>
        <p className="mt-2 leading-relaxed text-navy-700">
          Sua mensagem foi gerada. Toque no botão abaixo para enviá-la pelo WhatsApp.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ExternalButtonLink href={whatsappUrl} size="lg">
            <Send className="h-4 w-4" aria-hidden="true" />
            Abrir WhatsApp e enviar
          </ExternalButtonLink>
          <Button variant="outline-dark" size="lg" onClick={reset}>
            Fazer nova solicitação
          </Button>
        </div>
      </div>
    )
  }

  if (status === 'unconfigured') {
    return (
      <div role="status" className="rounded-3xl border border-sand-300 bg-sand-50 p-6 sm:p-8">
        <Info className="h-10 w-10 text-sand-600" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-semibold">WhatsApp em configuração</h3>
        <div className="mt-6">
          <Button variant="outline-dark" size="lg" onClick={reset}>
            Voltar ao formulário
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-describedby="booking-disclaimer"
      className="rounded-3xl border border-navy-100 bg-white p-6 shadow-lift sm:p-8"
    >
      {status === 'error' && (
        <div role="alert" className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 p-4 text-sm text-red-800 ring-1 ring-red-200">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>Não foi possível processar a solicitação agora. Tente novamente em instantes.</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field name="name" label="Nome completo" error={errors.name}>
            <input
              id="field-name"
              name="name"
              type="text"
              autoComplete="name"
              maxLength={80}
              value={values.name}
              onChange={update('name')}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={describedBy('name', errors.name)}
              className="field-input"
              placeholder="Como devemos te chamar?"
            />
          </Field>
        </div>

        <Field
          name="phone"
          label="Telefone ou WhatsApp"
          error={errors.phone}
          hint="Com DDD. Ex.: (12) 90000-0000"
        >
          <input
            id="field-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={update('phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy('phone', errors.phone, 'Com DDD. Ex.: (12) 90000-0000')}
            className="field-input"
            placeholder="(12) 90000-0000"
          />
        </Field>

        <Field name="passengers" label="Número de passageiros" error={errors.passengers}>
          <input
            id="field-passengers"
            name="passengers"
            type="number"
            inputMode="numeric"
            min={1}
            max={50}
            value={values.passengers}
            onChange={update('passengers')}
            aria-invalid={Boolean(errors.passengers)}
            aria-describedby={describedBy('passengers', errors.passengers)}
            className="field-input"
            placeholder="Ex.: 6"
          />
        </Field>

        <div className="sm:col-span-2">
          <Field name="experienceId" label="Passeio ou aluguel" error={errors.experienceId}>
            <select
              id="field-experienceId"
              name="experienceId"
              value={values.experienceId}
              onChange={update('experienceId')}
              aria-invalid={Boolean(errors.experienceId)}
              aria-describedby={describedBy('experienceId', errors.experienceId)}
              className="field-input"
            >
              <option value="">Selecione uma opção</option>
              <optgroup label="Passeios com roteiro">
                {tours.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Aluguel privativo">
                {rentals.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
            </select>
          </Field>
        </div>

        <Field name="date" label="Data pretendida" error={errors.date}>
          <input
            id="field-date"
            name="date"
            type="date"
            min={todayISO()}
            max={maxDateISO()}
            value={values.date}
            onChange={update('date')}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={describedBy('date', errors.date)}
            className="field-input"
          />
        </Field>

        <Field name="period" label="Horário ou período" error={errors.period}>
          <select
            id="field-period"
            name="period"
            value={values.period}
            onChange={update('period')}
            aria-invalid={Boolean(errors.period)}
            aria-describedby={describedBy('period', errors.period)}
            className="field-input"
          >
            <option value="">Selecione</option>
            {periodOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field
            name="notes"
            label="Observações"
            optional
            error={errors.notes}
            hint="Crianças, restrições de mobilidade, comemoração, pedidos especiais…"
          >
            <textarea
              id="field-notes"
              name="notes"
              rows={4}
              maxLength={500}
              value={values.notes}
              onChange={update('notes')}
              aria-invalid={Boolean(errors.notes)}
              aria-describedby={describedBy(
                'notes',
                errors.notes,
                'Crianças, restrições de mobilidade, comemoração, pedidos especiais…',
              )}
              className="field-input resize-y"
            />
          </Field>
        </div>

        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label htmlFor="field-website">Não preencha este campo</label>
          <input
            id="field-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={update('website')}
          />
        </div>
      </div>

      <p id="booking-disclaimer" className="mt-6 text-xs leading-relaxed text-navy-500">
        Enviar este formulário não garante a reserva: {siteConfig.name} confirmará a disponibilidade e o valor final pelo WhatsApp.
      </p>

      {/* BOTÃO ANIMADO NÁUTICO COM MAR CALMO, STICKMAN E ACELERAÇÃO COM PROA ELEVADA */}
      <button
        type="submit"
        disabled={submitting}
        className="relative mt-6 h-14 w-full overflow-hidden rounded-2xl bg-cyan-600 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-cyan-500 active:scale-[0.99] disabled:cursor-not-allowed"
      >
        {submitting ? (
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-sky-900">
            {/* SUPERFÍCIE D'ÁGUA EM 2D (MAR CALMO) */}
            <div className="absolute inset-x-0 bottom-0 h-6 bg-cyan-700/80 border-t border-cyan-400/50">
              {/* ONDAS EM MOVIMENTO (Ativam quando a lancha acelera no passo 'accelerate') */}
              <div
                className={`h-full w-full bg-[radial-gradient(#a5f3fc_1.5px,transparent_1.5px)] [background-size:12px_12px] opacity-60 ${
                  animStep === 'accelerate' ? 'animate-pulse' : ''
                }`}
              />
            </div>

            {/* LANCHA E BONEQUINHO STICKMAN */}
            <div
              className={`absolute bottom-2 z-10 transition-all ${
                animStep === 'arrive'
                  ? 'left-[35%] sm:left-[42%] translate-x-0 duration-[1100ms] ease-out'
                  : animStep === 'board'
                  ? 'left-[35%] sm:left-[42%] translate-x-0 duration-300'
                  : 'left-[35%] sm:left-[42%] translate-x-[450px] sm:translate-x-[600px] duration-[1500ms] ease-in'
              }`}
            >
              <div
                className={`relative flex items-center transition-transform duration-500 ${
                  animStep === 'accelerate' ? '-rotate-8 -translate-y-1' : 'rotate-0'
                }`}
              >
                {/* BONEQUINHO STICKMAN PULANDO EM CIMA */}
                <div
                  className={`absolute -top-6 left-6 z-20 transition-all duration-500 ${
                    animStep === 'arrive'
                      ? 'opacity-0 -translate-y-4'
                      : 'opacity-100 translate-y-0 scale-100'
                  }`}
                >
                  <svg className="h-5 w-4 text-white" viewBox="0 0 20 25" fill="none">
                    {/* Cabeça */}
                    <circle cx="10" cy="4" r="3" fill="currentColor" />
                    {/* Corpo */}
                    <path d="M10 7 L10 16 M10 10 L5 14 M10 10 L15 14 M10 16 L6 23 M10 16 L14 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>

                {/* VETOR 2D DA LANCHA DE LUXO */}
                <svg className="h-8 w-20 text-white drop-shadow-md" viewBox="0 0 100 40" fill="none">
                  {/* Cabine / Parabrisa */}
                  <path d="M30 18 L48 8 L62 18 Z" fill="#38bdf8" />
                  {/* Casco Náutico Branco */}
                  <path d="M5 24 L22 15 L78 15 L98 24 L85 32 L15 32 Z" fill="#ffffff" />
                  {/* Faixa Ciano Lateral */}
                  <path d="M18 25 L90 25" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                </svg>

                {/* ESPUMA D'ÁGUA / MAROLA DA PROA E POPA (Aparece ao acelerar) */}
                {animStep === 'accelerate' && (
                  <>
                    {/* Rastro na traseira */}
                    <div className="absolute -left-12 bottom-0 h-2.5 w-14 bg-gradient-to-r from-transparent via-cyan-200 to-white rounded-full blur-[0.5px] animate-pulse" />
                    {/* Borrifo na proa */}
                    <div className="absolute -right-2 bottom-1 h-3 w-3 bg-white/90 rounded-full animate-ping" />
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center gap-2">
            <Send className="h-5 w-5" aria-hidden="true" />
            <span>Solicitar reserva</span>
          </div>
        )}
      </button>
    </form>
  )
}
