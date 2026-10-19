export interface NavItem {
  label: string
  hash: string
}

/** Itens do menu principal (âncoras da página inicial). */
export const navItems: NavItem[] = [
  { label: 'Passeios', hash: '#passeios' },
  { label: 'Aluguel', hash: '#aluguel' },
  { label: 'Segurança', hash: '#seguranca' },
  { label: 'Destinos', hash: '#destinos' },
  { label: 'Perguntas', hash: '#faq' },
  { label: 'Contato', hash: '#contato' },
]
