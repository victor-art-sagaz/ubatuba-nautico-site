import type { ImageKey } from '@/types'
import { images } from '@/data/images'
import { OptimizedImage } from '@/components/OptimizedImage'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'
import { cn } from '@/lib/cn'

interface GalleryItem {
  key: ImageKey
  caption: string
  className?: string
}

const items: GalleryItem[] = [
  { key: 'lancha', caption: 'Lanchas para passeios e aluguel', className: 'sm:col-span-2 sm:row-span-2' },
  { key: 'ilha', caption: 'Ilhas do litoral norte paulista' },
  { key: 'pordosol', caption: 'Pôr do sol no mar' },
  { key: 'churrasqueira', caption: 'Convivência a bordo' },
  { key: 'mergulho', caption: 'Águas claras para mergulho livre' },
  { key: 'praia', caption: 'Praias de difícil acesso por terra', className: 'sm:col-span-2' },
]

export function Gallery() {
  return (
    <Section id="galeria" tone="white">
      <SectionHeading
        sectionId="galeria"
        eyebrow="Galeria"
        title="Embarcações e experiências"
        subtitle="Imagens ilustrativas do clima dos passeios. Elas não representam a frota, a equipe ou os roteiros reais da empresa."
      />
      <ul className="grid auto-rows-[200px] gap-4 sm:grid-cols-2 lg:auto-rows-[220px] lg:grid-cols-4">
        {items.map((item, index) => (
          <li key={item.key} className={cn('min-h-0', item.className)}>
            <Reveal delay={index * 60} className="h-full">
              <figure className="relative h-full overflow-hidden rounded-3xl">
                <OptimizedImage image={images[item.key]} className="h-full" sizes="(min-width: 1024px) 33vw, 100vw" />
                <figcaption className="pointer-events-none absolute inset-x-0 top-0 bg-gradient-to-b from-navy-950/70 to-transparent px-4 pb-8 pt-3 text-sm font-medium text-white">
                  {item.caption}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
