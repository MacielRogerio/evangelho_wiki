# Associados e aprovação de cadastros

O botão **Entrar** oferece entrada sem senha e solicitação de cadastro com e-mail e curiosidades opcionais. O visitante confirma o e-mail antes de entrar na fila de aprovação. O administrador aprova, recusa, suspende ou reativa o cadastro. Apenas usuários aprovados e o administrador podem listar e baixar os PDFs.

## Experimentar localmente

Requer Node.js 22.13 ou mais recente; recomendado Node.js 24. Não há dependências a instalar.

1. Copie `.env.example` para `.env`.
2. Preencha `ADMIN_EMAIL` com seu e-mail. Esse endereço terá acesso administrativo somente após confirmar o link recebido. Não há senha padrão nem administrador escolhido pelo primeiro visitante.
3. Execute `npm run dev` e abra `http://localhost:5173`. Use **Entrar** com o e-mail configurado.
4. Em outro terminal, execute `npm run mail:local`. Abra o link mais recente destinado ao seu e-mail e pressione **Confirmar e continuar**. A caixa local não envia mensagens reais e não tem uma rota pública no site.
5. Acesse `/administracao` para consultar solicitações e publicar PDFs de até 10 MB. Para testar um associado, use outro perfil/janela anônima e um e-mail diferente, solicite cadastro, confirme pela caixa local e aprove pelo painel do administrador.

O e-mail de aprovação contém um link de acesso de uso único. Uma pessoa já autenticada pode usar **Atualizar situação** para ver sua aprovação sem sair. Recarregar a página também atualiza o estado. **Sair** encerra a sessão no servidor.

## E-mails reais e hospedagem

O adaptador de envio usa a [API oficial do Resend](https://resend.com/docs/api-reference/emails/send-email). Configure no ambiente do servidor:

```dotenv
NODE_ENV=production
APP_ORIGIN=https://seu-dominio.example
ADMIN_EMAIL=seu-email@example.com
MAIL_MODE=resend
RESEND_API_KEY=sua-chave-no-servidor
MAIL_FROM=Evangelho.wiki <acesso@seu-dominio.example>
DATA_DIR=/caminho/persistente/evangelho-wiki
PORT=5173
```

Use um remetente de domínio verificado no provedor. A configuração de produção recusa inicialização sem HTTPS, administrador e credenciais de envio. O processo escuta em `127.0.0.1`: a hospedagem deve encaminhar HTTPS para essa porta por um proxy reverso na mesma máquina. O navegador deve acessar exatamente o endereço de `APP_ORIGIN`, inclusive a porta no desenvolvimento.

É necessário hospedar o processo Node com disco persistente. GitHub Pages, por hospedar apenas arquivos estáticos, não executa o cadastro. Use uma única instância deste servidor com o mesmo diretório persistente; múltiplas instâncias exigem migrar banco, arquivos e fila para serviços compartilhados. O envio ao GitHub não configura o provedor, a hospedagem nem o domínio.

A fila tenta novamente entregas que falharam, com atraso progressivo e a mesma chave de idempotência. Links pendentes expiram após 20 minutos; o visitante pode pedir outro em **Entrar**. A mensagem enviada ao visitante não revela se já existe conta para aquele endereço. O painel informa a existência de mensagens aguardando envio.

## Dados e permissões

- SQLite: `DATA_DIR/members.sqlite`; PDFs: `DATA_DIR/materials/`. A pasta padrão `.private/` e `.env` estão no `.gitignore` e são bloqueados pelo servidor HTTP.
- Faça backup do diretório privado com o servidor parado (ou use uma rotina de backup consistente do SQLite) e guarde-o fora da pasta pública. Não envie banco, PDFs privados, e-mails locais ou chaves ao GitHub.
- E-mails, curiosidades e estados são persistentes. Cada decisão registra o administrador, a pessoa, a ação e o instante no histórico interno.
- Links duram 20 minutos e são consumidos por confirmação explícita. Apenas hashes de tokens e sessões são usados na autenticação. O token é removido da URL na tela de confirmação. Sessões duram sete dias, em cookie HttpOnly/SameSite=Lax e Secure na produção.
- Cada download verifica a sessão e o estado atual no servidor. Suspender revoga sessões e links anteriores. Arquivar remove o material da biblioteca e bloqueia seu download.
- Curiosidades são exibidas somente ao próprio associado e ao administrador, como texto escapado. Não aparecem no catálogo público nem na busca.
- A caixa de e-mails de desenvolvimento contém links de teste em texto claro dentro do banco privado; use-a apenas localmente. Em envio real, o conteúdo e o link são removidos da fila após a entrega.

## Validação

```bash
npm run test:membership
node scripts/validate-membership-browser.mjs
```

O teste de navegador usa a instalação local de Playwright/Chromium, como os demais testes deste projeto. Em outra máquina, informe `PLAYWRIGHT_MODULE` e `CHROMIUM_PATH`. Os testes criam bancos e e-mails temporários, sem enviar mensagens reais. Capturas em `artifacts/membership-*.png`.

## Cadastro de novidades

O botão Entrar da página inicial abre o cadastro para receber avisos informativos sobre novos assuntos, temas e pesquisas, com orientações para encontrar os conteúdos. Esse formulário salva o endereço na tabela `newsletter_subscribers`, sem criar conta de associado, gerar token ou enviar link de acesso. Endereços repetidos são registrados uma única vez.

A lista permanece no banco configurado por `DATA_DIR` (por padrão, `.private/members.sqlite`). Ainda não há painel para consultar os inscritos nem envio automático de campanhas ou mensagem de boas-vindas. O fluxo de autenticação da área administrativa continua separado.
