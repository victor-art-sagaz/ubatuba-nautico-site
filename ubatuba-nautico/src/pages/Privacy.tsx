import { siteConfig } from '@/config/site'
import { LegalLayout } from '@/pages/LegalLayout'

export function PrivacyPage() {
  return (
    <LegalLayout
      title="Política de Privacidade"
      description="Como os dados informados no formulário de reserva são utilizados (texto provisório)."
    >
      <p>
        <strong>Aviso:</strong> este é um texto provisório de demonstração. Ele deve ser revisado por profissional
        habilitado e adaptado à operação real antes da publicação definitiva, em conformidade com a Lei Geral de
        Proteção de Dados (LGPD, Lei 13.709/2018).
      </p>

      <section>
        <h2>1. Quem é o responsável</h2>
        <p>
          O responsável pelo tratamento dos dados é {siteConfig.name} (CNPJ: [A INFORMAR]), com atuação em{' '}
          {siteConfig.city}. Contato para assuntos de privacidade: {siteConfig.email}.
        </p>
      </section>

      <section>
        <h2>2. Dados que coletamos</h2>
        <ul>
          <li>Nome e telefone/WhatsApp informados no formulário de reserva.</li>
          <li>Passeio ou aluguel desejado, data, período e número de passageiros.</li>
          <li>Observações que você optar por escrever.</li>
        </ul>
      </section>

      <section>
        <h2>3. Para que usamos</h2>
        <p>
          Usamos os dados para responder à sua solicitação, informar disponibilidade e valores e combinar detalhes do
          passeio. Não vendemos seus dados.
        </p>
      </section>

      <section>
        <h2>4. Como os dados são enviados</h2>
        <p>
          Nesta versão, o formulário prepara uma mensagem que você mesmo envia pelo WhatsApp; o site não armazena a
          solicitação. Se, no futuro, o armazenamento em banco de dados for ativado, esta política deverá ser
          atualizada para informar prazo de retenção e medidas de segurança.
        </p>
      </section>

      <section>
        <h2>5. Seus direitos</h2>
        <p>
          Você pode solicitar acesso, correção ou exclusão dos seus dados, entre outros direitos previstos na LGPD,
          pelo contato indicado acima.
        </p>
      </section>

      <section>
        <h2>6. Serviços de terceiros</h2>
        <p>
          O WhatsApp, o Google Maps (mapa incorporado) e o Google Fonts (tipografia) são serviços de terceiros com
          políticas próprias de privacidade.
        </p>
      </section>
    </LegalLayout>
  )
}
