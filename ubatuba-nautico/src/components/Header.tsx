import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/config/navigation'
import { siteConfig } from '@/config/site'
import { ButtonLink } from '@/components/Button'
import { Logo } from '@/components/Logo'
import { cn } from '@/lib/cn'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fecha o menu ao navegar.
  useEffect(() => {
    setOpen(false)
  }, [pathname, hash, key])

  // Fecha com a tecla Esc.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = pathname !== '/' || scrolled || open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {siteConfig.demoMode && (
        <div className="bg-navy-950 px-4 py-1.5 text-center text-[11px] font-medium text-sand-200 sm:text-xs">
          Site demonstrativo: dados da empresa, preços, imagens e depoimentos são exemplos.
        </div>
      )}

      <div
        className={cn(
          'transition-colors duration-300',
          solid ? 'bg-navy-900/95 shadow-soft backdrop-blur' : 'bg-gradient-to-b from-navy-950/70 to-transparent',
        )}
      >
        <div className="container flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          <Logo tone="light" />

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.hash}
                to={{ pathname: '/', hash: item.hash }}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ButtonLink to={{ pathname: '/', hash: '#reserva' }} className="hidden sm:inline-flex">
              Solicitar reserva
            </ButtonLink>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition hover:bg-white/10 lg:hidden"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {open && (
          <nav id="menu-mobile" aria-label="Menu móvel" className="border-t border-white/10 lg:hidden">
            <ul className="container flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <li key={item.hash}>
                  <Link
                    to={{ pathname: '/', hash: item.hash }}
                    className="block rounded-xl px-3 py-3 text-base font-medium text-white hover:bg-white/10"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <ButtonLink to={{ pathname: '/', hash: '#reserva' }} size="lg" className="w-full">
                  Solicitar reserva
                </ButtonLink>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
