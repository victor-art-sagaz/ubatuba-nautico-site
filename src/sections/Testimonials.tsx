import { Quote } from 'lucide-react'
import { testimonials } from '@/data/content'
import { DemoBadge } from '@/components/DemoBadge'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'

export function Testimonials() {
  return (
    <Section id="depoimentos" tone="white">
      <SectionHeading
        sectionId="depoimentos"
        eyebrow="Depoimentos"
        title="O que os clientes poderão dizer"
        subtitle="Os textos abaixo são exemplos de demonstração e não são avaliações reais. Substitua por depoimentos verdadeiros, com autorização de quem os escreveu."
      />
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <li key={item.id}>
            <Reveal delay={index * 80} className="h-full">
              <figure className="flex h-full flex-col rounded-3xl bg-sand-50 p-6 ring-1 ring-sand-200">
                <Quote className="h-8 w-8 text-sea-600" aria-hidden="true" />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-navy-700">{item.text}</blockquote>
                <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-2">
                  <span>
                    <span className="block text-sm font-semibold text-navy-900">{item.author}</span>
                    <span className="block text-xs text-navy-500">{item.context}</span>
                  </span>
                  <DemoBadge>Depoimento de exemplo</DemoBadge>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
