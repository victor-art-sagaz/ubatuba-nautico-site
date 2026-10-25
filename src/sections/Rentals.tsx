import { rentals } from '@/data/experiences'
import { Anchor, Users, ShieldCheck, Route } from 'lucide-react'
import { Button } from '@/components/Button'

interface RentalsProps {
  onSelect?: (id: string) => void
}

export function Rentals({ onSelect }: RentalsProps) {
  return (
    <section id="aluguel" className="py-20 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-100 px-4 py-1.5 text-sm font-semibold text-cyan-800 mb-4">
            <Anchor className="w-4 h-4" />
            Privacidade & Conforto
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl">
            Aluguel Privativo de Embarcações
          </h2>
          <p className="mt-4 text-lg text-navy-600">
            Escolha a embarcação ideal para o seu grupo e viva momentos inesquecíveis em Ubatuba com marinheiro exclusivo e churrasqueira a bordo.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {rentals.map((item) => (
            <div
              key={item.id}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-lg border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-200">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 right-4 rounded-full bg-navy-950/80 backdrop-blur-md px-3.5 py-1 text-sm font-semibold text-white">
                  A partir de R$ {item.price.toLocaleString('pt-BR')}
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="text-xl font-bold text-navy-900">{item.name}</h3>
                  <p className="mt-2 text-sm text-navy-600 line-clamp-3">{item.description}</p>

                  <div className="mt-4 flex items-center gap-4 text-xs font-semibold text-navy-700">
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-cyan-600" />
                      Até {item.capacity} pessoas
                    </span>
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-cyan-600" />
                      {item.durationHours}h de passeio
                    </span>
                  </div>

                  {item.routes && item.routes.length > 0 && (
                    <div className="mt-4 border-t border-slate-100 pt-3">
                      <p className="text-xs font-bold text-navy-800 flex items-center gap-1 mb-1">
                        <Route className="w-3.5 h-3.5 text-cyan-600" />
                        Roteiro principal:
                      </p>
                      <p className="text-xs text-navy-600 truncate">{item.routes.join(', ')}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
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
                    Solicitar essa embarcação
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
