import { Flame, LifeBuoy, Music, Snowflake, Sofa, Sun, type LucideIcon } from 'lucide-react'
import type { Amenity } from '@/types'
import { amenities } from '@/data/content'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'

const icons: Record<Amenity['icon'], LucideIcon> = {
  flame: Flame,
  music: Music,
  sofa: Sofa,
  sun: Sun,
  snowflake: Snowflake,
  'life-buoy': LifeBuoy,
}

export function Amenities() {
  return (
    <Section id="comodidades" tone="sand">
      <SectionHeading
        sectionId="comodidades"
        eyebrow="Comodidades a bordo"
        title="Conforto para curtir o dia inteiro"
        subtitle="As comodidades variam de acordo com a embarcação. Confirme o que está disponível ao solicitar a reserva."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity, index) => {
          const Icon = icons[amenity.icon]
          return (
            <li key={amenity.id}>
              <Reveal delay={index * 60} className="h-full">
                <div className="flex h-full gap-4 rounded-3xl bg-white p-6 shadow-soft">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sea-100 text-sea-700">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-sans text-base font-semibold">{amenity.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-navy-600">{amenity.description}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
