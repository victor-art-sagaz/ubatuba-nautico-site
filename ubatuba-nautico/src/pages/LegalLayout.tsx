import type { ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { DemoBadge } from '@/components/DemoBadge'
import { usePageMeta } from '@/hooks/usePageMeta'

interface LegalLayoutProps {
  title: string
  description: string
  children: ReactNode
}

/** Estrutura comum das páginas de política e condições (conteúdo provisório). */
export function LegalLayout({ title, description, children }: LegalLayoutProps) {
  usePageMeta(`${title} | [NOME DA EMPRESA]`, description)

  return (
    <main className="bg-sand-50 pb-20 pt-32 sm:pt-36">
      <div className="container max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-sea-800 hover:underline">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Voltar ao início
        </Link>
        <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">{title}</h1>
        <div className="mt-4">
          <DemoBadge>Texto provisório para revisão jurídica</DemoBadge>
        </div>
        <div className="mt-8 space-y-6 rounded-3xl bg-white p-6 leading-relaxed text-navy-700 shadow-soft sm:p-10 [&_h2]:mb-2 [&_h2]:font-sans [&_h2]:text-lg [&_h2]:font-bold [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </main>
  )
}
