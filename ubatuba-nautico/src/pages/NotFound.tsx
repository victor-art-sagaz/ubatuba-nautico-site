import { Anchor } from 'lucide-react'
import { ButtonLink } from '@/components/Button'
import { usePageMeta } from '@/hooks/usePageMeta'

export function NotFoundPage() {
  usePageMeta('Página não encontrada | [NOME DA EMPRESA]')

  return (
    <main className="flex min-h-[80vh] items-center bg-sand-50 pt-28">
      <div className="container max-w-xl text-center">
        <Anchor className="mx-auto h-12 w-12 text-sea-700" aria-hidden="true" />
        <h1 className="mt-6 text-4xl font-semibold">Página não encontrada</h1>
        <p className="mt-4 text-navy-600">O endereço que você tentou abrir não existe ou foi movido.</p>
        <div className="mt-8">
          <ButtonLink to="/" variant="dark" size="lg">
            Voltar ao início
          </ButtonLink>
        </div>
      </div>
    </main>
  )
}
