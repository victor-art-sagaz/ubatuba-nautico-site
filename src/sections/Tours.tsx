import { tours } from '@/data/experiences'
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
        subtitle="Conheça as embarcações da MUSA e escolha a experiência ideal. Valores iniciais por passeio ou por pessoa, conforme indicado."
      />
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
