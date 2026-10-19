# Guia rápido para continuar pelo tablet

Este projeto foi preparado para ser compilado na nuvem. Não é necessário instalar Node.js no tablet para o caminho recomendado.

## O que você tem em mãos

- `ubatuba-nautico.zip`: código-fonte do site.
- `package.json`: lista de dependências e comandos.
- `netlify.toml`: informa à Netlify como compilar e publicar.
- `README.md`: documentação técnica completa.

## Atenção: código-fonte não é o site compilado

O ZIP contém os arquivos-fonte. A publicação manual da Netlify espera a pasta `dist`, criada pelo comando `npm run build`. Não renomeie o ZIP para `dist` nem publique os arquivos TSX diretamente.

## Caminho mais simples

1. Extraia o ZIP no tablet.
2. Coloque o conteúdo do projeto em um repositório GitHub, mantendo todas as pastas.
3. Na Netlify, importe esse repositório.
4. Use `npm run build` como comando de build e `dist` como diretório de publicação.
5. Veja os logs de compilação na Netlify. O fato de o Claude ter recebido erro 403 ao acessar npm não significa automaticamente que a Netlify terá o mesmo bloqueio.

## Se a Netlify apresentar erro

Copie o log da compilação e envie-o para a IA. É necessário ver a mensagem real antes de alterar dependências às cegas.

## Estado da verificação deste pacote

Os arquivos foram inspecionados e a configuração de publicação foi revisada. **A compilação completa ainda não foi confirmada**, porque as dependências não puderam ser instaladas neste ambiente. Isso deve ser validado no primeiro deploy da Netlify. Não considere o site pronto para produção até o deploy terminar com sucesso e os testes no navegador serem concluídos.

## Antes de apresentar ao proprietário

- Substitua ou mantenha explicitamente identificados os dados demonstrativos.
- Confirme todos os preços, roteiros, capacidades e comodidades com a empresa.
- Use apenas fotos reais autorizadas para representar a frota e a equipe.
- Configure o WhatsApp real.
- Revise as políticas de privacidade e contratação.
- Teste o formulário e todos os links pelo tablet.
