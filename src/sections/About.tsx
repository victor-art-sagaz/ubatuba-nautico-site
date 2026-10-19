import { Compass, MessageCircle, ShieldCheck, Sailboat } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { images } from '@/data/images'
import { OptimizedImage } from '@/components/OptimizedImage'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'

const differentials = [
  {
    icon: Sailboat,
    title: 'Passeio ou aluguel privativo',
    text: 'Escolha um roteiro pronto ou reserve a embarcação só para o seu grupo.',
  },
  {
    icon: ShieldCheck,
    title: 'Segurança como prioridade',
    text: 'Orientações a bordo, equipamentos e condução por equipe responsável.',
  },
  {
    icon: Compass,
    title: 'Roteiros pelo litoral',
    text: 'Praias e ilhas de Ubatuba, sempre respeitando condições de mar e regras locais.',
  },
  {
    icon: MessageCircle,
    title: 'Atendimento direto',
    text: 'Solicite pelo site e converse com a equipe pelo WhatsApp para confirmar detalhes.',
  },
]

export function About() {
  return (
    <Section id="sobre" tone="white">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <SectionHeading
            sectionId="sobre"
            eyebrow="Sobre nós"
            title={`${siteConfig.name}: o mar de Ubatuba com tranquilidade`}
            subtitle="Texto de apresentação provisório. Aqui entrará a história real da empresa, sua experiência na região e o que a torna diferente."
          />
          <ul className="grid gap-5 sm:grid-cols-2">
            {differentials.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sea-100 text-sea-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-sans text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy-600">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative">
            <OptimizedImage
              image={images.lancha}
              className="aspect-[4/5] rounded-[2rem] shadow-lift sm:aspect-[5/6]"
              sizes="(min-width: 1024px) 40vw, 100vw"
            />
            <div className="absolute -bottom-6 -left-4 hidden max-w-[16rem] rounded-2xl bg-white p-5 shadow-lift sm:block">
              <p className="font-display text-lg font-semibold text-navy-900">Embarque em Ubatuba</p>
              <p className="mt-1 text-sm text-navy-600">{siteConfig.boardingPoint}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
