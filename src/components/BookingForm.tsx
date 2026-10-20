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
  // Passos fiéis à animação: enter -> dock -> walk -> jump -> accelerate
  const [animStep, setAnimStep] = useState<'idle' | 'enter' | 'dock' | 'walk' | 'jump' | 'accelerate'>('idle')
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

    // 1. A lancha entra pela esquerda até ao píer (0s - 1.2s)
    setAnimStep('enter')

    // 2. Lancha fixa atracada ao píer (1.2s)
    setTimeout(() => {
      setAnimStep('dock')
    }, 1200)

    // 3. Stickman caminha no píer (2.0s)
    setTimeout(() => {
      setAnimStep('walk')
    }, 2000)

    // 4. Stickman pula para dentro da lancha (2.8s)
    setTimeout(() => {
      setAnimStep('jump')
    }, 2800)

    // 5. Proa eleva, motor arranca e lancha dispara deixando marola (3.6s)
    setTimeout(() => {
      setAnimStep('accelerate')
    }, 3600)

    // Finalização e redirecionamento para o WhatsApp
    setTimeout(async () => {
      try {
        const outcome = await submitBooking(validation.payload as any)
        setWhatsappUrl(outcome.whatsappUrl || null)
        setStatus(outcome.whatsappUrl ? 'ready' : 'unconfigured')
      } catch {
        setStatus('error')
      }
    }, 5500)
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

      {/* BOTÃO COM ANIMAÇÃO FIEL AO VÍDEO */}
      <button
        type="submit"
        disabled={submitting}
        className="relative mt-6 h-20 w-full overflow-hidden rounded-2xl bg-[#ecefe6] font-semibold text-navy-950 shadow-md transition-all duration-300 hover:bg-[#e0e4d7] active:scale-[0.99] disabled:cursor-not-allowed"
      >
        {submitting ? (
          <div className="relative flex h-full w-full items-center overflow-hidden bg-[#ecefe6]">
            {/* CAMADA DO MAR AZUL COMPLETA NA PARTE INFERIOR */}
            <div className="absolute inset-x-0 bottom-0 h-7 bg-[#0284c7] border-t-2 border-[#38bdf8]" />

            {/* PÍER / TRAPICHE FIXO NA ESQUERDA */}
            <div className="absolute left-0 bottom-7 z-10 flex flex-col items-start">
              <div className="h-[7px] w-28 bg-[#4b5563] rounded-r-sm shadow-sm" />
              <div className="ml-20 h-6 w-[6px] bg-[#374151]" />
            </div>

            {/* STICKMAN (Caminha no Píer -> Pula na Lancha) */}
            <div
              className={`absolute z-30 transition-all ${
                animStep === 'enter' || animStep === 'dock'
                  ? 'bottom-[35px] left-3 opacity-100'
                  : animStep === 'walk'
                  ? 'bottom-[35px] left-20 opacity-100 duration-700 ease-linear'
                  : animStep === 'jump'
                  ? 'bottom-[42px] left-32 opacity-100 duration-300 ease-out'
                  : 'bottom-[28px] left-[142px] opacity-100 transition-none'
              } ${animStep === 'accelerate' ? 'translate-x-[480px] sm:translate-x-[680px] duration-[1600ms] ease-in' : ''}`}
            >
              <svg className="h-7 w-5 text-black" viewBox="0 0 20 28" fill="none">
                <circle cx="10" cy="5" r="3.5" fill="currentColor" />
                <path d="M10 9 L10 18 M10 12 L4 16 M10 12 L16 16 M10 18 L5 26 M10 18 L15 26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>

            {/* ONDAS DE MAROLA NA ACELERAÇÃO */}
            {animStep === 'accelerate' && (
              <div className="absolute left-28 bottom-[26px] z-10 flex items-end gap-1 animate-pulse">
                <svg className="h-5 w-36 text-[#0284c7]" viewBox="0 0 120 20" fill="currentColor">
                  <polygon points="0,20 15,5 25,20 40,3 55,20 70,2 85,20 100,0 100,20 120,5 120,20" fill="#ffffff" stroke="#0284c7" strokeWidth="1" />
                </svg>
              </div>
            )}

            {/* LANCHA VISTA DE LADO (Entra do lado esquerdo -> Para no píer -> Empina e arranca) */}
            <div
              className={`absolute bottom-[20px] z-20 transition-all ${
                animStep === 'enter'
                  ? '-left-32 duration-0'
                  : animStep === 'dock' || animStep === 'walk' || animStep === 'jump'
                  ? 'left-24 duration-[1000ms] ease-out'
                  : 'left-24'
              } ${
                animStep === 'accelerate'
                  ? 'translate-x-[480px] sm:translate-x-[680px] duration-[1600ms] ease-in'
                  : ''
              }`}
            >
              <div
                className={`relative flex items-center transition-transform duration-500 ${
                  animStep === 'accelerate' ? '-rotate-12 -translate-y-2' : 'rotate-0'
                }`}
              >
                <svg className="h-10 w-32 text-white drop-shadow-sm" viewBox="0 0 120 40" fill="none">
                  {/* Motor de Popa */}
                  <rect x="2" y="12" width="8" height="18" fill="#1f2937" rx="1" />
                  <path d="M4 30 L0 36 L10 36 Z" fill="#111827" />

                  {/* Vidro Laranja */}
                  <path d="M50 16 L65 8 L80 16 Z" fill="#f97316" />

                  {/* Casco Branco */}
                  <path d="M10 26 L22 14 L95 14 L118 26 L105 34 L18 34 Z" fill="#ffffff" stroke="#d1d5db" strokeWidth="1" />
                  {/* Linha Lateral */}
                  <path d="M20 27 L110 27" stroke="#374151" strokeWidth="1.5" />
                </svg>
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
