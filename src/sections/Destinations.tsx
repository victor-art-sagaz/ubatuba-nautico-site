import { Droplets, LifeBuoy, MapPin, Wind } from 'lucide-react'
import { destinations } from '@/data/content'
import { images } from '@/data/images'
import { OptimizedImage } from '@/components/OptimizedImage'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'

const notes = [
  {
    icon: Wind,
    title: 'Mar e clima mandam no roteiro',
    text: 'Paradas e trajetos podem mudar conforme vento, ondulação e orientação do comandante.',
  },
  {
    icon: MapPin,
    title: 'Embarque e horários',
    text: 'Horários e orientações de chegada ao píer são informados na confirmação da reserva.',
  },
  {
    icon: LifeBuoy,
    title: 'Regras locais',
    text: 'Algumas áreas possuem regras de acesso e proteção ambiental que devem ser respeitadas.',
  },
  {
    icon: Droplets,
    title: 'Cuide do mar',
    text: 'Leve seu lixo de volta e evite tocar ou retirar a vida marinha.',
  },
]

export function Destinations() {
  return (
    <Section id="destinos" tone="sand">
      <SectionHeading
        sectionId="destinos"
        eyebrow="Destinos e roteiros"
        title="Conheça alguns destinos de Ubatuba"
        subtitle="Referências de destinos da região. Os roteiros oferecidos, as paradas e o acesso a cada local serão definidos pela empresa."
      />

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination, index) => (
          <li key={destination.id}>
            <Reveal delay={index * 70} className="h-full">
              <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-soft">
                <OptimizedImage image={images[destination.image]} className="aspect-[4/3]" sizes="(min-width: 1024px) 25vw, 50vw" />
                <div className="flex flex-1 flex-col p-5">
                  <span className="w-fit rounded-full bg-sea-100 px-2.5 py-1 text-xs font-bold text-sea-800">
                    {destination.type}
                  </span>
                  <h3 className="mt-3 text-lg font-semibold">{destination.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy-600">{destination.description}</p>
                </div>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <div className="mt-12 rounded-3xl bg-navy-900 p-6 sm:p-8">
        <h3 className="font-sans text-lg font-semibold !text-white">Bom saber sobre os roteiros</h3>
        <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {notes.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-3">
              <Icon className="mt-1 h-5 w-5 shrink-0 text-sea-300" aria-hidden="true" />
              <div>
                <p className="font-sans text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-sm leading-relaxed text-navy-200">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}
