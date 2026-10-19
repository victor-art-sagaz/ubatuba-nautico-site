import { tours } from '@/data/experiences'
import { DemoBadge } from '@/components/DemoBadge'
import { ExperienceCard } from '@/components/ExperienceCard'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'

interface ToursProps {
  onRequest: (experienceId: string) => void
}

export function Tours({ onRequest }: ToursProps) {
  return (
    <Section id="passeios" tone="sand">
      <SectionHeading
        sectionId="passeios"
        eyebrow="Passeios com roteiro"
        title="Praias e ilhas de Ubatuba, com roteiro definido"
        subtitle="Escolha um passeio e solicite a reserva. Roteiros, durações, capacidades e valores abaixo são exemplos para demonstração."
      />
      <div className="mb-8 -mt-4">
        <DemoBadge>Conteúdo demonstrativo: roteiros e preços de exemplo</DemoBadge>
      </div>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tours.map((tour, index) => (
          <li key={tour.id}>
            <Reveal delay={index * 80} className="h-full">
              <ExperienceCard experience={tour} onRequest={onRequest} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
