import type { ReactNode } from 'react'
import { ExternalLink, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from 'lucide-react'
import {
  formatWhatsappDisplay,
  getWhatsappLink,
  isPlaceholder,
  mapEmbedUrl,
  mapOpenUrl,
  siteConfig,
} from '@/config/site'
import { ExternalButtonLink } from '@/components/Button'
import { Reveal } from '@/components/Reveal'
import { Section, SectionHeading } from '@/components/Section'
import { SocialLink } from '@/components/SocialLink'

interface InfoRowProps {
  icon: LucideIcon
  label: string
  children: ReactNode
}

function InfoRow({ icon: Icon, label, children }: InfoRowProps) {
  return (
    <li className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sea-100 text-sea-700">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-wider text-navy-500">{label}</p>
        <div className="mt-0.5 break-words text-base text-navy-800">{children}</div>
      </div>
    </li>
  )
}

export function Contact() {
  const whatsappLink = getWhatsappLink(`Olá, ${siteConfig.name}! Gostaria de mais informações sobre os passeios.`)
  const phoneIsReal = !isPlaceholder(siteConfig.phone)
  const emailIsReal = !isPlaceholder(siteConfig.email)

  return (
    <Section id="contato" tone="white">
      <SectionHeading
        sectionId="contato"
        eyebrow="Contato"
        title="Fale com a nossa equipe"
        subtitle="Tire dúvidas, peça orçamento ou combine o seu roteiro. Os dados abaixo são provisórios."
      />

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal>
          <div className="h-full rounded-3xl border border-navy-100 bg-white p-6 shadow-soft sm:p-8">
            <ul className="space-y-6">
              <InfoRow icon={MessageCircle} label="WhatsApp">
                {whatsappLink ? (
                  <a className="font-semibold text-sea-800 underline-offset-2 hover:underline" href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    {formatWhatsappDisplay()}
                  </a>
                ) : (
                  <span>
                    {siteConfig.whatsappPlaceholder}
                    <span className="mt-1 block text-sm text-navy-500">Número ainda não configurado.</span>
                  </span>
                )}
              </InfoRow>

              <InfoRow icon={Phone} label="Telefone">
                {phoneIsReal ? (
                  <a className="underline-offset-2 hover:underline" href={`tel:${siteConfig.phone.replace(/[^\d+]/g, '')}`}>
                    {siteConfig.phone}
                  </a>
                ) : (
                  siteConfig.phone
                )}
              </InfoRow>

              <InfoRow icon={Mail} label="E-mail">
                {emailIsReal ? (
                  <a className="underline-offset-2 hover:underline" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                ) : (
                  siteConfig.email
                )}
              </InfoRow>

              <InfoRow icon={MapPin} label="Local de embarque">
                {siteConfig.boardingPoint}
              </InfoRow>
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <SocialLink kind="instagram" className="text-navy-800 ring-navy-200 hover:!bg-navy-50" />
              <SocialLink kind="facebook" className="text-navy-800 ring-navy-200 hover:!bg-navy-50" />
            </div>

            {whatsappLink && (
              <div className="mt-8">
                <ExternalButtonLink href={whatsappLink} size="lg" className="w-full sm:w-auto">
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  Chamar no WhatsApp
                </ExternalButtonLink>
              </div>
            )}
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-navy-100 bg-white shadow-soft">
            <iframe
              title={`Mapa: ${siteConfig.mapQuery}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="min-h-[300px] w-full flex-1 border-0"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <p className="text-sm text-navy-600">{siteConfig.boardingPoint}</p>
              <ExternalButtonLink href={mapOpenUrl} variant="outline-dark">
                Abrir no mapa
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </ExternalButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
