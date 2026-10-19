import { siteConfig } from '@/config/site'
import { LegalLayout } from '@/pages/LegalLayout'

export function TermsPage() {
  return (
    <LegalLayout
      title="Condições de Contratação"
      description="Condições gerais para solicitação e contratação de passeios e aluguel de embarcações (texto provisório)."
    >
      <p>
        <strong>Aviso:</strong> este é um texto provisório de demonstração. Todas as regras abaixo são exemplos e
        devem ser substituídas pelas condições reais da empresa, com revisão jurídica.
      </p>

      <section>
        <h2>1. Solicitação de reserva</h2>
        <p>
          O envio do formulário é apenas uma solicitação. A reserva só é confirmada após resposta da equipe de{' '}
          {siteConfig.name}, que verificará a disponibilidade da embarcação na data pretendida.
        </p>
      </section>

      <section>
        <h2>2. Valores e pagamento</h2>
        <p>
          Os valores exibidos neste site são demonstrativos. Valor final, forma de pagamento e eventual sinal serão
          informados na confirmação: [A DEFINIR PELA EMPRESA].
        </p>
      </section>

      <section>
        <h2>3. Condições de mar e tempo</h2>
        <p>
          A decisão de navegar é do comandante, com base nas condições de mar e meteorologia. Regras de remarcação ou
          reembolso em caso de cancelamento por mau tempo: [A DEFINIR PELA EMPRESA].
        </p>
      </section>

      <section>
        <h2>4. Cancelamentos e remarcações</h2>
        <p>Prazos, taxas e condições de cancelamento pelo cliente: [A DEFINIR PELA EMPRESA].</p>
      </section>

      <section>
        <h2>5. Regras a bordo</h2>
        <ul>
          <li>Siga as orientações de segurança da tripulação durante todo o passeio.</li>
          <li>O número de passageiros respeita a capacidade da embarcação definida pela empresa.</li>
          <li>Regras sobre alimentos, bebidas, crianças e uso de equipamentos: [A DEFINIR PELA EMPRESA].</li>
        </ul>
      </section>

      <section>
        <h2>6. Responsabilidades</h2>
        <p>
          Atividades náuticas envolvem riscos inerentes. Limites de responsabilidade e seguros aplicáveis: [A
          DEFINIR PELA EMPRESA].
        </p>
      </section>
    </LegalLayout>
  )
}
