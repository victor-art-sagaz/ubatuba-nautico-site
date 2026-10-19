import { Compass, Route } from 'lucide-react'
import { rentals } from '@/data/experiences'
import { DemoBadge } from '@/components/DemoBadge'
import { ExperienceCard } from '@/components/ExperienceCard'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'

interface RentalsProps {
  onRequest: (experienceId: string) => void
}

export function Rentals({ onRequest }: RentalsProps) {
  return (
    <Section id="aluguel" tone="white">
      <SectionHeading
        sectionId="aluguel"
        eyebrow="Aluguel de embarcações"
        title="A embarcação só para o seu grupo"
        subtitle="Alugue por hora ou por diária e combine o roteiro com a equipe. Ideal para famílias, amigos e comemorações."
      />

      <div className="mb-8 grid gap-4 md:grid-cols-2">
        <div className="flex gap-4 rounded-2xl bg-sand-50 p-5 ring-1 ring-sand-200">
          <Route className="mt-0.5 h-6 w-6 shrink-0 text-sea-700" aria-hidden="true" />
          <div>
            <h3 className="font-sans text-base font-semibold">Passeio com roteiro</h3>
            <p className="mt-1 text-sm leading-relaxed text-navy-600">
              Percurso e duração já definidos pela empresa; o valor é por pessoa (exemplo).
            </p>
          </div>
        </div>
        <div className="flex gap-4 rounded-2xl bg-sea-50 p-5 ring-1 ring-sea-100">
          <Compass className="mt-0.5 h-6 w-6 shrink-0 text-sea-700" aria-hidden="true" />
          <div>
            <h3 className="font-sans text-base font-semibold">Aluguel privativo</h3>
            <p className="mt-1 text-sm leading-relaxed text-navy-600">
              Embarcação exclusiva para o seu grupo, valor por período (hora ou diária) e roteiro combinado com o
              comandante.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <DemoBadge>Conteúdo demonstrativo: embarcações, capacidades e preços de exemplo</DemoBadge>
      </div>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rentals.map((rental, index) => (
          <li key={rental.id}>
            <Reveal delay={index * 80} className="h-full">
              <ExperienceCard experience={rental} onRequest={onRequest} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
