import { CalendarCheck, MessageCircle, Send } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { BookingForm, type BookingPreset } from '@/components/BookingForm'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'

const steps = [
  { icon: CalendarCheck, title: 'Preencha o formulário', text: 'Informe o passeio, a data, o período e o número de passageiros.' },
  { icon: Send, title: 'Envie pelo WhatsApp', text: 'Preparamos a mensagem pronta; você só precisa enviá-la.' },
  { icon: MessageCircle, title: 'Aguarde a confirmação', text: 'A equipe confirma a disponibilidade, o valor final e as condições.' },
]

interface BookingProps {
  preset: BookingPreset | null
}

export function Booking({ preset }: BookingProps) {
  return (
    <Section id="reserva" tone="sand">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            sectionId="reserva"
            eyebrow="Reserva"
            title="Solicite a sua reserva"
            subtitle="É rápido e sem compromisso. A reserva só é confirmada depois da resposta da nossa equipe."
          />
          <ol className="space-y-5">
            {steps.map(({ icon: Icon, title, text }, index) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy-800 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-sans text-base font-semibold text-navy-900">
                    {index + 1}. {title}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-navy-600">{text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 rounded-2xl bg-white p-5 text-sm leading-relaxed text-navy-600 ring-1 ring-sand-200">
            <span className="font-semibold text-navy-900">Embarque:</span> {siteConfig.boardingPoint}. Não há confirmação
            automática de disponibilidade; valores exibidos neste site são demonstrativos.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <BookingForm preset={preset} />
        </Reveal>
      </div>
    </Section>
  )
}
