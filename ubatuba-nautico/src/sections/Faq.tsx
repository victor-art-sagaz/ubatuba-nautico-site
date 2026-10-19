import { faqItems } from '@/data/content'
import { Accordion } from '@/components/Accordion'
import { Section, SectionHeading } from '@/components/Section'

export function Faq() {
  return (
    <Section id="faq" tone="white">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading
          sectionId="faq"
          eyebrow="Perguntas frequentes"
          title="Tire suas dúvidas antes de embarcar"
          subtitle="Respostas provisórias para revisão. A empresa deve ajustar cada item às suas regras reais."
        />
        <Accordion items={faqItems} />
      </div>
    </Section>
  )
}
