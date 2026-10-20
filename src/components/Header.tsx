import { useState, useEffect } from 'react'
import { Anchor, Compass, Ship, Map, HelpCircle, Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/Logo'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [boatsDropdownOpen, setBoatsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const boats = [
    { name: 'Musa II' },
    { name: 'Aloha' },
    { name: 'Lancha 20 pés' },
    { name: 'Carpe Diem' },
    { name: 'Runner' },
    { name: 'Passeio Compartilhado' },
  ]

  const scrollToTarget = (targetId: string) => {
    setMobileMenuOpen(false)
    setBoatsDropdownOpen(false)

    let element = document.querySelector(targetId)

    if (!element && targetId === '#roteiros') {
      element = document.querySelector('#experiencias') || document.querySelector('#destinos') || document.querySelector('#passeios')
    }
    if (!element && targetId === '#experiencias') {
      element = document.querySelector('#embarcacoes') || document.querySelector('section')
    }

    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 transition-all duration-300">
      <div
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-950/90 backdrop-blur-md border border-white/10 shadow-lg py-3 px-6'
            : 'bg-navy-950/50 backdrop-blur-sm border border-white/5 py-4 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo tone="light" />

          {/* DESKTOP NAVEGAÇÃO COM ÍCONES */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-1.5 transition hover:text-cyan-400"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              Início
            </button>

            {/* DROPDOWN EMBARCAÇÕES */}
            <div
              className="relative group"
              onMouseEnter={() => setBoatsDropdownOpen(true)}
              onMouseLeave={() => setBoatsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => scrollToTarget('#experiencias')}
                className="flex items-center gap-1.5 transition hover:text-cyan-400 py-2"
              >
                <Ship className="w-4 h-4 text-cyan-400" />
                Embarcações
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div
                className={`absolute left-0 top-full mt-1 w-52 rounded-xl bg-navy-900/95 backdrop-blur-md border border-white/10 p-2 shadow-xl transition-all duration-200 ${
                  boatsDropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                {boats.map((boat) => (
                  <button
                    key={boat.name}
                    type="button"
                    onClick={() => scrollToTarget('#experiencias')}
                    className="block w-full text-left px-3 py-2 rounded-lg text-sm text-gray-200 hover:bg-white/10 hover:text-cyan-300 transition"
                  >
                    {boat.name}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToTarget('#roteiros')}
              className="flex items-center gap-1.5 transition hover:text-cyan-400"
            >
              <Map className="w-4 h-4 text-cyan-400" />
              Roteiros
            </button>

            <button
              type="button"
              onClick={() => scrollToTarget('#faq')}
              className="flex items-center gap-1.5 transition hover:text-cyan-400"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              Dúvidas
            </button>
          </nav>

          <div className="hidden md:block">
            <button
              type="button"
              onClick={() => scrollToTarget('#reserva')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-semibold text-sm transition transform hover:scale-105 shadow-md"
            >
              <Anchor className="w-4 h-4" />
              Reservar Passeio
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-3 text-white text-sm">
            <button
              type="button"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
                setMobileMenuOpen(false)
              }}
              className="flex items-center gap-2 w-full text-left py-2 hover:text-cyan-400"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              Início
            </button>

            <div className="space-y-1 pl-2 border-l border-cyan-500/30">
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider py-1 flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5" />
                Nossas Embarcações
              </p>
              {boats.map((boat) => (
                <button
                  key={boat.name}
                  type="button"
                  onClick={() => scrollToTarget('#experiencias')}
                  className="block w-full text-left py-1.5 text-gray-300 hover:text-white"
                >
                  {boat.name}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => scrollToTarget('#roteiros')}
              className="flex items-center gap-2 w-full text-left py-2 hover:text-cyan-400"
            >
              <Map className="w-4 h-4 text-cyan-400" />
              Roteiros
            </button>

            <button
              type="button"
              onClick={() => scrollToTarget('#faq')}
              className="flex items-center gap-2 w-full text-left py-2 hover:text-cyan-400"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              Dúvidas
            </button>

            <button
              type="button"
              onClick={() => scrollToTarget('#reserva')}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500 text-navy-950 font-semibold mt-2"
            >
              <Anchor className="w-4 h-4" />
              Reservar Passeio
            </button>
          </div>
        )}
      </div>
    </header>
  )
}
