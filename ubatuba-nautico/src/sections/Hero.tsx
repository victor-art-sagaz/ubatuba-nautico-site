import { Anchor, MapPin, ShieldCheck, Ship } from 'lucide-react'
import { siteConfig } from '@/config/site'
import { images } from '@/data/images'
import { ButtonLink } from '@/components/Button'
import { OptimizedImage } from '@/components/OptimizedImage'

const highlights = [
  { icon: MapPin, text: `Saída: ${siteConfig.boardingPoint}` },
  { icon: Ship, text: 'Passeios com roteiro e aluguel privativo' },
  { icon: ShieldCheck, text: 'Segurança em primeiro lugar' },
]

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="inicio-title" className="relative isolate overflow-hidden bg-navy-900">
      <OptimizedImage
        image={images.hero}
        priority
        showLabel={false}
        className="absolute inset-0 -z-20 h-full w-full"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/30" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/70 via-transparent to-transparent" />

      <div className="container flex min-h-[640px] flex-col justify-end pb-20 pt-40 sm:min-h-[720px] sm:pb-28 lg:min-h-[100svh]">
        <div className="max-w-3xl animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-sea-200 ring-1 ring-white/20 backdrop-blur">
            <Anchor className="h-3.5 w-3.5" aria-hidden="true" />
            Ubatuba · São Paulo
          </p>
          <h1 id="inicio-title" className="text-4xl font-semibold leading-[1.08] !text-white sm:text-5xl lg:text-6xl">
            Praias e ilhas de Ubatuba, vistas do mar.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-navy-100 sm:text-xl">
            Passeios de lancha e barco ou aluguel privativo para o seu grupo, com saída do Píer do Saco da Ribeira e
            atendimento direto pelo WhatsApp.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to={{ pathname: '/', hash: '#passeios' }} size="lg">
              Conheça os passeios
            </ButtonLink>
            <ButtonLink to={{ pathname: '/', hash: '#reserva' }} variant="outline-light" size="lg">
              Solicitar reserva
            </ButtonLink>
          </div>
        </div>

        <ul className="mt-12 grid gap-3 text-sm text-white/90 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15 backdrop-blur">
              <Icon className="h-5 w-5 shrink-0 text-sea-300" aria-hidden="true" />
              {text}
            </li>
          ))}
        </ul>
      </div>

      <p className="absolute bottom-3 right-4 text-[11px] text-white/70">Imagem ilustrativa</p>
    </section>
  )
}
