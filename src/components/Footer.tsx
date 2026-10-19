import { Link } from 'react-router-dom'
import { navItems } from '@/config/navigation'
import { isPlaceholder, siteConfig } from '@/config/site'
import { Logo } from '@/components/Logo'
import { SocialLink } from '@/components/SocialLink'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 pb-24 pt-14 text-navy-200 md:pb-10">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo tone="light" />
            <p className="max-w-xs text-sm leading-relaxed text-navy-300">
              Passeios de lancha e barco e aluguel de embarcações em {siteConfig.city}.
            </p>
            <div className="flex flex-wrap gap-2">
              <SocialLink kind="instagram" className="text-white ring-white/25" />
              <SocialLink kind="facebook" className="text-white ring-white/25" />
            </div>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider !text-white">Navegação</h2>
            <ul className="space-y-2 text-sm">
              {navItems.map((item) => (
                <li key={item.hash}>
                  <Link to={{ pathname: '/', hash: item.hash }} className="transition hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={{ pathname: '/', hash: '#reserva' }} className="transition hover:text-white">
                  Solicitar reserva
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider !text-white">Informações</h2>
            <ul className="space-y-2 text-sm">
              <li>Embarque: {siteConfig.boardingPoint}</li>
              <li>Cidade: {siteConfig.city}</li>
              <li>
                E-mail:{' '}
                {isPlaceholder(siteConfig.email) ? (
                  siteConfig.email
                ) : (
                  <a className="underline-offset-2 hover:underline" href={`mailto:${siteConfig.email}`}>
                    {siteConfig.email}
                  </a>
                )}
              </li>
              <li>CNPJ: [A INFORMAR PELA EMPRESA]</li>
              <li>Site: {siteConfig.domain}</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-sans text-sm font-bold uppercase tracking-wider !text-white">Políticas</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacidade" className="transition hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link to="/condicoes" className="transition hover:text-white">
                  Condições de Contratação
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-navy-300">
          <p>
            © {year} {siteConfig.name}. Todos os direitos reservados.
          </p>
          {siteConfig.demoMode && (
            <p className="mt-2">
              Modelo demonstrativo: informações comerciais, valores, imagens e depoimentos são exemplos e não
              representam dados reais de nenhuma empresa. Imagens ilustrativas não comprovam a frota ou a equipe.
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
