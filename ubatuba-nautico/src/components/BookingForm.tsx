import { useEffect, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AlertTriangle, CheckCircle2, Info, Loader2, Send } from 'lucide-react'
import type { BookingFormValues, BookingPayload } from '@/types'
import { rentals, tours } from '@/data/experiences'
import { emptyForm, maxDateISO, periodOptions, todayISO, validateBooking, type FieldErrors } from '@/lib/validation'
import { submitBooking, type SubmitResult } from '@/services/bookings'
import { buildBookingMessage } from '@/services/whatsapp'
import { Button, ExternalButtonLink } from '@/components/Button'
import { siteConfig } from '@/config/site'

export interface BookingPreset {
  id: string
  nonce: number
}

interface BookingFormProps {
  /** Experiência escolhida em um cartão (preenche o campo automaticamente). */
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
  const [result, setResult] = useState<SubmitResult | null>(null)
  const [payload, setPayload] = useState<BookingPayload | null>(null)

  // Preenche o passeio quando o visitante clica em "Solicitar reserva" em um cartão.
  useEffect(() => {
    if (!preset) return
    setValues((current) => ({ ...current, experienceId: preset.id }))
    setErrors((current) => ({ ...current, experienceId: undefined }))
    setStatus('idle')
    setResult(null)
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
    setResult(null)
    setPayload(null)
    setStatus('idle')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === 'submitting') return

    // Campo isca: pessoas não o veem. Se estiver preenchido, o envio é recusado.
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
    try {
      const outcome = await submitBooking(validation.payload)
      setPayload(validation.payload)
      setResult(outcome)
      setStatus(outcome.whatsappUrl ? 'ready' : 'unconfigured')
    } catch {
      setStatus('error')
    }
  }

  const submitting = status === 'submitting'

  if (status === 'ready' && result?.whatsappUrl) {
    return (
      <div role="status" className="rounded-3xl border border-sea-200 bg-sea-50 p-6 sm:p-8">
        <CheckCircle2 className="h-10 w-10 text-sea-600" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-semibold">Solicitação preparada</h3>
        <p className="mt-2 leading-relaxed text-navy-700">
          Sua mensagem está pronta. Toque no botão abaixo para enviá-la pelo WhatsApp. A reserva só é confirmada
          depois da resposta da nossa equipe, que verificará a disponibilidade.
        </p>
        {result.saved && (
          <p className="mt-3 text-sm font-medium text-sea-800">Também registramos o seu pedido em nosso sistema.</p>
        )}
        {result.saveFailed && (
          <p className="mt-3 flex items-start gap-2 text-sm text-navy-700">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Não conseguimos registrar o pedido em nosso sistema, mas você ainda pode enviá-lo pelo WhatsApp.
          </p>
        )}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <ExternalButtonLink href={result.whatsappUrl} size="lg">
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
        <h3 className="mt-4 text-2xl font-semibold">
          {result?.saved ? 'Solicitação registrada' : 'WhatsApp ainda não configurado'}
        </h3>
        {result?.saved ? (
          <p className="mt-2 leading-relaxed text-navy-700">
            Registramos o seu pedido. A nossa equipe entrará em contato para confirmar a disponibilidade; a reserva
            só vale depois dessa confirmação.
          </p>
        ) : (
          <p className="mt-2 leading-relaxed text-navy-700">
            Os dados foram validados, mas o número de WhatsApp da empresa ainda não foi configurado neste modelo
            demonstrativo. Nenhuma mensagem foi enviada e nenhuma reserva foi registrada.
          </p>
        )}
        {result?.saveFailed && (
          <p className="mt-3 text-sm text-navy-700">Também não foi possível registrar o pedido no sistema.</p>
        )}
        {payload && !result?.saved && (
          <>
            <p className="mt-5 text-sm font-semibold text-navy-800">Prévia da mensagem que seria enviada:</p>
            <pre className="mt-2 whitespace-pre-wrap rounded-2xl bg-white p-4 font-sans text-sm leading-relaxed text-navy-700 ring-1 ring-sand-200">
              {buildBookingMessage(payload)}
            </pre>
          </>
        )}
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

        {/* Campo isca contra robôs: fora da tela e ignorado por leitores de tela. */}
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
        Enviar este formulário não garante a reserva: {siteConfig.name} confirmará a disponibilidade, o valor final e as
        condições pelo WhatsApp. Seus dados serão usados apenas para atender a esta solicitação (veja a Política de
        Privacidade).
      </p>

      <Button type="submit" size="lg" className="mt-6 w-full" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
            Preparando solicitação…
          </>
        ) : (
          <>
            <Send className="h-5 w-5" aria-hidden="true" />
            Solicitar reserva
          </>
        )}
      </Button>
    </form>
  )
}
