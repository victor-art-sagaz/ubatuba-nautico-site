import { tours } from '@/data/experiences'
import { Compass, Users, Clock, MapPin } from 'lucide-react'
import { Button } from '@/components/Button'

interface ToursProps {
  onSelect?: (id: string) => void
}

export function Tours({ onSelect }: ToursProps) {
  return (
    <section id="passeios" className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-sea-100 px-4 py-1.5 text-sm font-semibold text-sea-800 mb-4">
            <Compass className="w-4 h-4" />
            Roteiros com Guia
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
            Passeios Compartilhados
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Aproveite as melhores ilhas e praias de Ubatuba economizando com o nosso passeio compartilhado.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-3xl bg-slate-50 shadow-md border border-slate-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 rounded-full bg-sea-600 px-3.5 py-1 text-sm font-semibold text-white">
                  R$ {item.price.toLocaleString('pt-BR')} / pessoa
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-bold text-navy-900">{item.name}</h3>
                  <p className="mt-2 text-sm text-navy-600">{item.description}</p>

                  <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-navy-700">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-sea-600" />
                      {item.durationHours} horas
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-sea-600" />
                      Saídas diárias
                    </span>
                  </div>

                  {item.routes && item.routes.length > 0 && (
                    <div className="mt-4 border-t border-slate-200 pt-3">
                      <p className="text-xs font-bold text-navy-800 flex items-center gap-1 mb-1">
                        <MapPin className="w-3.5 h-3.5 text-sea-600" />
                        Destinos do passeio:
                      </p>
                      <p className="text-xs text-navy-600">{item.routes.join(' • ')}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <Button
                    className="w-full justify-center"
                    onClick={() => {
                      if (onSelect) {
                        onSelect(item.id)
                      } else {
                        const el = document.getElementById('reservar')
                        el?.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                  >
                    Garantir minha vaga
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
