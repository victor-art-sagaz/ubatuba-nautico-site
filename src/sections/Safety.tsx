import { ClipboardCheck, LifeBuoy, ShieldCheck, Sparkles, UserCheck, Wrench } from 'lucide-react'
import { PhotoSlot } from '@/components/PhotoSlot'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'

const pillars = [
  {
    icon: UserCheck,
    title: 'Equipe de marinheiros',
    text: 'A condução e o cuidado com os passageiros ficam a cargo de profissionais responsáveis pela embarcação.',
  },
  {
    icon: ClipboardCheck,
    title: 'Preparação das embarcações',
    text: 'Conferência dos itens de bordo e das condições da embarcação antes de cada saída.',
  },
  {
    icon: Sparkles,
    title: 'Limpeza antes e depois',
    text: 'Higienização das áreas de uso e do convés a cada passeio ou aluguel.',
  },
  {
    icon: Wrench,
    title: 'Inspeções e manutenção preventiva',
    text: 'Revisões periódicas para manter casco, motores e sistemas em bom estado.',
  },
  {
    icon: LifeBuoy,
    title: 'Orientações aos passageiros',
    text: 'Instruções de segurança antes da saída e acompanhamento durante todo o passeio.',
  },
  {
    icon: ShieldCheck,
    title: 'Cuidado com os equipamentos',
    text: 'Coletes e demais itens de segurança guardados, conferidos e conservados.',
  },
]

export function Safety() {
  return (
    <Section id="seguranca" tone="navy">
      <SectionHeading
        sectionId="seguranca"
        tone="dark"
        eyebrow="Segurança náutica"
        title="Segurança vem antes de qualquer passeio"
        subtitle="Cada saída é planejada com cuidado, e a decisão final de navegar considera sempre as condições do mar e do tempo."
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map(({ icon: Icon, title, text }, index) => (
          <li key={title}>
            <Reveal delay={index * 70} className="h-full">
              <div className="h-full rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/[0.08]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sea-400 text-navy-950">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-sans text-lg font-semibold !text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-200">{text}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        <PhotoSlot
          tone="dark"
          title="Foto real da equipe"
          hint="Espaço reservado para imagens e informações reais fornecidas pela empresa."
        />
        <PhotoSlot
          tone="dark"
          title="Foto real da embarcação"
          hint="Espaço reservado para imagens reais da frota e dos equipamentos de segurança."
        />
        <div className="rounded-3xl bg-sand-100 p-6 text-navy-800">
          <h3 className="font-sans text-base font-bold">Transparência</h3>
          <p className="mt-2 text-sm leading-relaxed">
            Segurança é prioridade, mas toda atividade náutica envolve riscos inerentes e depende das condições do mar.
            Formação da equipe, vistorias, documentação e demais informações oficiais serão apresentadas aqui pela
            empresa, sem promessas de risco zero.
          </p>
        </div>
      </div>
    </Section>
  )
}
