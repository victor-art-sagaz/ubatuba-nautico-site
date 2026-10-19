# Site de passeios náuticos em Ubatuba-SP (modelo demonstrativo)

Site profissional para empresa de passeios de lancha e barco em Ubatuba, feito com **React + Vite + TypeScript + Tailwind CSS + React Router**, pronto para publicar na **Netlify** e preparado para evoluir com **Firebase Firestore**.

> **Todos os dados comerciais são provisórios.** Nome, contatos, preços, roteiros, capacidades, depoimentos e imagens são exemplos e estão identificados como demonstração no próprio site.

## Requisitos

- Node.js 18.18 ou superior (recomendado: 20 LTS)
- npm

## Comandos

```bash
npm install        # instala as dependências
npm run dev        # servidor de desenvolvimento (http://localhost:5173)
npm run typecheck  # verifica os tipos do TypeScript
npm run build      # gera a versão de produção na pasta dist/
npm run preview    # testa a versão de produção localmente
```

## Fluxo recomendado para quem está usando tablet (Android/iPad)

**Você não precisa instalar Node.js nem executar comandos no tablet para publicar a primeira versão.** O caminho mais simples é deixar a Netlify instalar as dependências e compilar o projeto na nuvem.

### Opção recomendada: Netlify + GitHub

1. No tablet, baixe e extraia `ubatuba-nautico.zip` usando o gerenciador de arquivos.
2. Entre no GitHub pelo navegador. Se a interface móvel não mostrar as opções necessárias, abra o menu do navegador e ative **Site para computador**.
3. Crie um repositório novo, por exemplo `ubatuba-nautico`. Para manter o projeto privado durante a preparação, selecione repositório privado.
4. Envie os arquivos e pastas extraídos para o repositório, mantendo a estrutura. O arquivo `package.json` deve ficar na raiz do repositório, junto de `index.html`, `vite.config.ts` e `netlify.toml`. **Não envie apenas o ZIP como se fosse o site pronto.**
5. Na Netlify, escolha a opção para importar um projeto existente e conecte o repositório GitHub.
6. Confirme as configurações de build:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `20` (já definida em `netlify.toml`)
7. Inicie o deploy. A Netlify tentará instalar as dependências e compilar o site nos servidores dela. Assim, o erro 403 do proxy do Claude não precisa ocorrer no ambiente de publicação.
8. Abra o endereço `*.netlify.app` gerado e teste no próprio tablet.

**Importante:** a tela de envio de arquivos do GitHub pode variar entre navegador e dispositivo. Se não permitir enviar pastas mantendo a estrutura, não publique os arquivos soltos: use um ambiente de desenvolvimento em nuvem que consiga abrir o ZIP e enviar o projeto ao GitHub, ou peça ajuda para fazer essa etapa. A Netlify não compila o projeto só porque o ZIP-fonte foi enviado para o deploy manual.

### Se o deploy falhar

- Abra **Deploys** na Netlify e entre no log do deploy que falhou.
- Copie a primeira mensagem de erro relevante e envie para a IA corrigir.
- Se aparecer erro de dependência, verifique se o `package.json` está na raiz do repositório.
- Se o erro for de TypeScript, envie o trecho do log completo, não apenas a última linha.
- Depois de corrigir e enviar os arquivos ao GitHub, a Netlify normalmente inicia um novo deploy.

### Segurança antes de publicar

- Não coloque senhas, credenciais de servidor ou chaves privadas em arquivos `VITE_*`.
- Não ative gravação de reservas no Firebase até configurar regras e um endpoint confiável.
- Mantenha o modo demonstrativo ativado enquanto houver preços, imagens ou avaliações fictícias.
- Não divulgue o site como empresa real até o proprietário confirmar as informações.

## Estrutura de pastas

```
├─ index.html                 SEO, Open Graph, fontes
├─ netlify.toml               build, redirect de rotas (SPA) e cabeçalhos de segurança
├─ firestore.rules / firebase.json   regras do Firestore (uso futuro, acesso bloqueado)
├─ .env.example               variáveis de ambiente (sem segredos)
├─ docs/FIREBASE.md           guia para ativar a gravação de reservas
├─ public/                    favicon, og-image.png e (opcional) pasta images/
└─ src/
   ├─ config/                 site.ts (dados da empresa), firebase.ts, navigation.ts
   ├─ data/                   passeios, aluguéis, FAQ, destinos, depoimentos, imagens
   ├─ types/                  tipos do projeto
   ├─ services/               reservas (WhatsApp e endpoint opcional)
   ├─ lib/                    validação do formulário
   ├─ hooks/                  animação de entrada, metadados de página
   ├─ components/             Header, Footer, ExperienceCard, BookingForm, etc.
   ├─ sections/               seções da página inicial
   └─ pages/                  Home, Privacidade, Condições, 404
```

## Como trocar os dados provisórios

1. **Empresa e contatos:** edite `src/config/site.ts` (nome, telefone, e-mail, Instagram, Facebook, domínio). Valores entre colchetes, como `[TELEFONE]`, são tratados como "não configurados": o site mostra o texto, mas não cria links.
2. **WhatsApp:** defina `VITE_WHATSAPP_NUMBER` (somente dígitos com DDI e DDD, ex.: `5512900000000`). Sem ele, o formulário valida os dados, mostra um aviso e **não gera link**.
3. **Passeios e aluguéis:** `src/data/experiences.ts`.
4. **FAQ, destinos, depoimentos e comodidades:** `src/data/content.ts`.
5. **Fotos:** coloque os arquivos em `public/images/` com os nomes de `src/data/images.ts` (ex.: `hero.jpg`, `lancha.jpg`). Enquanto o arquivo não existir, o site exibe uma ilustração e o selo "Imagem ilustrativa". Use fotos como "nossa frota" ou "nossa equipe" somente se forem reais.
6. **Modo demonstração:** quando o cliente real aprovar, mude `demoMode` para `false` em `src/config/site.ts` e remova os selos e avisos de exemplo dos dados.
7. **Imagem de compartilhamento:** substitua `public/og-image.png` (1200×630).

## Variáveis de ambiente

Copie `.env.example` para `.env` para uso local. Na Netlify: **Site configuration → Environment variables**.

| Variável | Para quê |
| --- | --- |
| `VITE_SITE_URL` | URL pública, sem barra final (Open Graph e canonical) |
| `VITE_WHATSAPP_NUMBER` | WhatsApp da empresa (dígitos) |
| `VITE_BOOKING_API_URL` | (opcional) endpoint HTTPS que valida e grava reservas |
| `VITE_FIREBASE_*` | (opcional) configuração web do Firebase |

**Segurança:** tudo que começa com `VITE_` é público e vai para o navegador. Nunca coloque senhas, chaves privadas ou credenciais de servidor (Admin SDK) em variáveis do frontend.

## Reservas

- O formulário valida nome, telefone (com DDD), passeio, data (hoje até 12 meses), período, passageiros (1 a 50) e observações (até 500 caracteres).
- Ao enviar, o site monta uma mensagem pré-preenchida e oferece o botão **Abrir WhatsApp e enviar**. **Não há confirmação automática de disponibilidade**; o texto deixa isso claro.
- Se `VITE_BOOKING_API_URL` estiver definido, o site também envia os dados a esse endpoint e só informa "registrado" se ele responder com sucesso. Sem o endpoint, **nada é gravado** e o site não afirma o contrário.
- Há um campo isca contra robôs; a proteção real contra abuso deve ficar no servidor (veja `docs/FIREBASE.md`).

## Firebase (futuro)

- O Firebase é carregado sob demanda e só se `VITE_FIREBASE_*` estiver preenchido; a demonstração roda sem credenciais.
- `firestore.rules` bloqueia leitura e escrita pelo navegador em reservas e em qualquer caminho não listado. Somente a coleção `catalog` tem leitura pública.
- Reservas devem ser gravadas por uma Cloud Function (Admin SDK) com validação, App Check e limite de requisições. Passo a passo em `docs/FIREBASE.md`.

## Publicação na Netlify

1. Envie o projeto para um repositório (GitHub, GitLab ou Bitbucket) e importe em **Add new site → Import an existing project**.
2. Build command: `npm run build` · Publish directory: `dist` (já definidos no `netlify.toml`).
3. Cadastre as variáveis de ambiente e faça o deploy.
4. Rotas diretas (`/privacidade`, `/condicoes`) funcionam pelo redirect do `netlify.toml`.

Também é possível publicar manualmente: `npm run build` e arrastar a pasta `dist/` em **Deploys** da Netlify.

## Checklist antes de publicar

- [ ] `npm run build` termina sem erros
- [ ] `npm run preview` abre e todas as seções carregam
- [ ] Menu móvel abre, fecha (botão e Esc) e leva às seções
- [ ] Botões "Solicitar reserva" dos cartões escolhem o passeio no formulário
- [ ] Formulário mostra erros claros com campos vazios, telefone inválido, data passada
- [ ] Sem WhatsApp configurado: aviso informativo e nenhum link gerado
- [ ] Com WhatsApp configurado: mensagem abre pré-preenchida com os dados corretos
- [ ] `/privacidade`, `/condicoes` e uma rota inexistente (404) funcionam, inclusive ao recarregar a página
- [ ] Testado em celular, tablet e computador
- [ ] Navegação por teclado, foco visível e textos alternativos das imagens
- [ ] Placeholders entre colchetes trocados (ou mantidos de propósito na demonstração)
- [ ] Fotos reais adicionadas, ou mantido o selo "Imagem ilustrativa"
- [ ] Textos de privacidade e condições revisados por profissional habilitado
- [ ] Nenhum segredo no repositório (`.env` fora do Git)

## O que não foi inventado

CNPJ, endereço exato, certificações, autorizações de navegação, nomes de funcionários, avaliações reais e roteiros oficiais não constam do projeto. Onde essas informações são necessárias, há um espaço marcado para a empresa preencher.
