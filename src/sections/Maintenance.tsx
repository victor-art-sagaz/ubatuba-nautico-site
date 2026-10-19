import { Check } from 'lucide-react'
import { DemoBadge } from '@/components/DemoBadge'
import { PhotoSlot } from '@/components/PhotoSlot'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'

const routines = [
  {
    title: 'Antes do passeio',
    items: [
      'Conferência dos equipamentos de segurança a bordo',
      'Verificação geral da embarcação e do nível de combustível',
      'Limpeza do convés, bancos e áreas de convivência',
    ],
  },
  {
    title: 'Depois do passeio',
    items: [
      'Lavagem com água doce das áreas expostas ao mar',
      'Retirada de lixo e higienização de banheiro e áreas de uso',
      'Registro de qualquer ocorrência para revisão da equipe',
    ],
  },
  {
    title: 'Manutenção preventiva',
    items: [
      'Inspeção periódica de casco, motores e sistemas elétricos',
      'Revisão e reposição de itens de segurança',
      'Manutenção conforme orientação do fabricante e a legislação aplicável',
    ],
  },
]

export function Maintenance() {
  return (
    <Section id="manutencao" tone="white">
      <SectionHeading
        sectionId="manutencao"
        eyebrow="Limpeza e conservação"
        title="Embarcações limpas, conservadas e revisadas"
        subtitle="Uma embarcação bem cuidada é mais confortável e mais segura. Esta é uma rotina de exemplo, a ser substituída pelos procedimentos reais da empresa."
      />
      <div className="mb-8 -mt-4">
        <DemoBadge>Rotina de exemplo: a empresa deve confirmar seus procedimentos</DemoBadge>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
        {routines.map((routine, index) => (
          <Reveal key={routine.title} delay={index * 80} className="h-full">
            <div className="h-full rounded-3xl border border-navy-100 bg-white p-6 shadow-soft">
              <h3 className="font-sans text-lg font-semibold">{routine.title}</h3>
              <ul className="mt-4 space-y-3">
                {routine.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-navy-700">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sea-100 text-sea-700">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
        <PhotoSlot
          title="Foto real da manutenção"
          hint="Espaço reservado para registros reais de limpeza e manutenção."
          className="min-h-[220px]"
        />
      </div>
    </Section>
  )
}
