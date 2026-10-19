import { useCallback, useState } from 'react'
import { ButtonLink } from '@/components/Button'
import type { BookingPreset } from '@/components/BookingForm'
import { About } from '@/sections/About'
import { Amenities } from '@/sections/Amenities'
import { Booking } from '@/sections/Booking'
import { Contact } from '@/sections/Contact'
import { Destinations } from '@/sections/Destinations'
import { Faq } from '@/sections/Faq'
import { Gallery } from '@/sections/Gallery'
import { Hero } from '@/sections/Hero'
import { Maintenance } from '@/sections/Maintenance'
import { Rentals } from '@/sections/Rentals'
import { Safety } from '@/sections/Safety'
import { Testimonials } from '@/sections/Testimonials'
import { Tours } from '@/sections/Tours'

export function HomePage() {
  const [preset, setPreset] = useState<BookingPreset | null>(null)

  // Ao clicar em "Solicitar reserva" em um cartão: escolhe o passeio no formulário e rola até ele.
  const handleRequest = useCallback((experienceId: string) => {
    setPreset({ id: experienceId, nonce: Date.now() })
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById('reserva')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }, [])

  return (
    <>
      <main>
        <Hero />
        <About />
        <Tours onRequest={handleRequest} />
        <Rentals onRequest={handleRequest} />
        <Gallery />
        <Safety />
        <Maintenance />
        <Amenities />
        <Testimonials />
        <Destinations />
        <Faq />
        <Booking preset={preset} />
        <Contact />
      </main>

      {/* Barra fixa de conversão no celular */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-navy-900/95 p-3 backdrop-blur md:hidden">
        <ButtonLink to={{ pathname: '/', hash: '#reserva' }} size="lg" className="w-full">
          Solicitar reserva
        </ButtonLink>
      </div>
    </>
  )
}
