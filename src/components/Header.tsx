import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Anchor, Compass, Ship, Menu, X, ChevronDown } from 'lucide-react'
import { Logo } from '@/components/Logo'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [boatsDropdownOpen, setBoatsDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const boats = [
    { name: 'Musa II', hash: '#embarcacoes' },
    { name: 'Aloha', hash: '#embarcacoes' },
    { name: 'Lancha 20 pés', hash: '#embarcacoes' },
    { name: 'Carpe Diem', hash: '#embarcacoes' },
    { name: 'Runner', hash: '#embarcacoes' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 p-4">
      <div
        className={`mx-auto max-w-7xl rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-navy-950/80 backdrop-blur-md border border-white/10 shadow-lg py-3 px-6'
            : 'bg-navy-950/40 backdrop-blur-sm border border-white/5 py-4 px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          <Logo tone="light" />

          {/* NAVEGAÇÃO DESKTOP */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            <Link
              to="/"
              className="flex items-center gap-1.5 transition hover:text-cyan-400"
            >
              <Compass className="w-4 h-4 text-cyan-400" />
              Início
            </Link>

            {/* DROPDOWN DE EMBARCAÇÕES */}
            <div className="relative group">
              <button
                type="button"
                onClick={() => setBoatsDropdownOpen(!boatsDropdownOpen)}
                onMouseEnter={() => setBoatsDropdownOpen(true)}
                className="flex items-center gap-1.5 transition hover:text-cyan-400 py-2"
              >
                <Ship className="w-4 h-4 text-cyan-400" />
                Embarcações
                <ChevronDown className="w-3.5 h-3.5 opacity-70 group-hover:rotate-180 transition-transform duration-200" />
              </button>

              <div
                onMouseLeave={() => setBoatsDropdownOpen(false)}
                className={`absolute left-0 top-full mt-1 w-48 rounded-xl bg-navy-900/95 backdrop-blur-md border border-white/10 p-2 shadow-xl transition-all duration-200 ${
                  boatsDropdownOpen
                    ? 'opacity-100 visible translate-y-0'
                    : 'opacity-0 invisible -translate-y-2'
                }`}
              >
                {boats.map((boat) => (
                  <Link
                    key={boat.name}
                    to={{ pathname: '/', hash: boat.hash }}
                    className="block px-3 py-2 rounded-lg text-sm text-gray-200 hover:bg-white/10 hover:text-cyan-300 transition"
                  >
                    {boat.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to={{ pathname: '/', hash: '#roteiros' }}
              className="transition hover:text-cyan-400"
            >
              Roteiros
            </Link>

            <Link
              to={{ pathname: '/', hash: '#faq' }}
              className="transition hover:text-cyan-400"
            >
              Dúvidas
            </Link>
          </nav>

          {/* BOTÃO RESERVA */}
          <div className="hidden md:block">
            <Link
              to={{ pathname: '/', hash: '#reserva' }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-navy-950 font-semibold text-sm transition transform hover:scale-105 shadow-md"
            >
              <Anchor className="w-4 h-4" />
              Reservar Passeio
            </Link>
          </div>

          {/* BOTÃO MENU MOBILE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-white/10 space-y-3 text-white text-sm">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-cyan-400"
            >
              Início
            </Link>
            <div className="space-y-1 pl-2 border-l border-cyan-500/30">
              <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider py-1">
                Nossas Embarcações
              </p>
              {boats.map((boat) => (
                <Link
                  key={boat.name}
                  to={{ pathname: '/', hash: boat.hash }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1.5 text-gray-300 hover:text-white"
                >
                  {boat.name}
                </Link>
              ))}
            </div>
            <Link
              to={{ pathname: '/', hash: '#roteiros' }}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-cyan-400"
            >
              Roteiros
            </Link>
            <Link
              to={{ pathname: '/', hash: '#faq' }}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 hover:text-cyan-400"
            >
              Dúvidas
            </Link>
            <Link
              to={{ pathname: '/', hash: '#reserva' }}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-cyan-500 text-navy-950 font-semibold mt-2"
            >
              <Anchor className="w-4 h-4" />
              Reservar Passeio
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
