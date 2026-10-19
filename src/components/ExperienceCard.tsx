import { Anchor, CalendarCheck, Check, Clock, Route, Users } from 'lucide-react'
import type { Experience } from '@/types'
import { images } from '@/data/images'
import { Button } from '@/components/Button'
import { DemoBadge } from '@/components/DemoBadge'
import { OptimizedImage } from '@/components/OptimizedImage'

interface ExperienceCardProps {
  experience: Experience
  onRequest: (experienceId: string) => void
}

/** Cartão reutilizável para passeios com roteiro e aluguel privativo. */
export function ExperienceCard({ experience, onRequest }: ExperienceCardProps) {
  const isTour = experience.kind === 'passeio'
  const titleId = `${experience.id}-titulo`

  return (
    <article
      aria-labelledby={titleId}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative">
        <OptimizedImage
          image={images[experience.image]}
          className="aspect-[4/3] transition duration-500 group-hover:scale-[1.02]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-navy-800 shadow">
          {isTour ? (
            <Route className="h-3.5 w-3.5 text-sea-700" aria-hidden="true" />
          ) : (
            <Anchor className="h-3.5 w-3.5 text-sea-700" aria-hidden="true" />
          )}
          {isTour ? 'Passeio com roteiro' : 'Aluguel privativo'}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 id={titleId} className="text-xl font-semibold">
          {experience.name}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-navy-600">{experience.description}</p>

        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-navy-700">
          <li className="inline-flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-sea-700" aria-hidden="true" />
            {experience.duration}
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Users className="h-4 w-4 text-sea-700" aria-hidden="true" />
            {experience.capacity}
          </li>
        </ul>

        {experience.stops && (
          <p className="mt-4 rounded-xl bg-sea-50 px-3 py-2 text-sm text-sea-900">
            <span className="font-semibold">Roteiro de exemplo:</span> {experience.stops.join(' → ')}
          </p>
        )}

        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Comodidades">
          {experience.amenities.map((item) => (
            <li key={item} className="rounded-full bg-sand-100 px-3 py-1 text-xs font-medium text-navy-700">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-navy-500">Inclui</h4>
          <ul className="mt-2 space-y-1.5 text-sm text-navy-700">
            {experience.included.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-sea-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          {experience.notIncluded && (
            <p className="mt-2 text-xs text-navy-500">Não inclui: {experience.notIncluded.join(', ')}.</p>
          )}
        </div>

        <div className="mt-auto pt-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2 border-t border-navy-100 pt-4">
            <p className="text-navy-900">
              <span className="text-xs text-navy-500">A partir de</span>
              <span className="block font-display text-2xl font-semibold">{experience.price}</span>
              <span className="text-xs text-navy-500">{experience.priceUnit}</span>
            </p>
            <DemoBadge />
          </div>
          <Button variant="dark" className="w-full" onClick={() => onRequest(experience.id)}>
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Solicitar reserva
          </Button>
        </div>
      </div>
    </article>
  )
}
