# Evangelho.wiki

Página inicial e menus de Antigo Testamento, Novo Testamento e Atualidade, com navegação por rotas, coleções, destaques, catálogo e busca local.

## Visualização

```bash
npm run dev
```

Abra http://localhost:5173. Se o servidor já estava em execução antes desta atualização, encerre-o com Ctrl+C e execute o comando novamente: o servidor agora precisa reconhecer os links diretos das seções. Outra porta: `PORT=5174 npm run dev`.

É necessário usar o servidor. Abrir `index.html` por `file://` não suporta os módulos e as novas rotas. A execução da aplicação não exige instalar dependências.

## Implementação

- `/`: página inicial preservada, com os três portais ligados às mesmas rotas do cabeçalho.
- `/antigo-testamento`, `/novo-testamento` e `/atualidade`: menus completos com arte, seis cartões, destaque, tópicos e rodapé.
- `/<seção>/<coleção>`: destino próprio de cada cartão; mostra sua descrição e um estado explícito de conteúdo ainda indisponível.
- `/<seção>/estudos`: catálogo filtrado pela seção, com filtros para as outras duas seções.
- `/<seção>/estudos/<estudo>`: destino do estudo em destaque. Os tópicos laterais usam âncoras nesse destino, com título e indisponibilidade específicos.
- `/<seção>/busca?q=...`: pesquisa local contextual nos títulos e descrições cadastrados. `/busca?q=...` pesquisa as três seções a partir da tela inicial. Acentos e caixa são normalizados; a busca não simula resultados de artigos inexistentes.
- `/recursos`, `/sobre` e destinos contextuais do rodapé: estados de indisponibilidade com retorno ao menu ou à página inicial.

A rota determina a seção ativa, o cartão/estudo selecionado e os halos persistentes. Links diretos, recarga e Voltar/Avançar recuperam esse estado, inclusive filtros, pesquisa e tópicos. A navegação mantém links reais, suporta abrir em outra aba, transfere o foco ao conteúdo e respeita movimento reduzido. Os botões de exploração e destaque rolam e focam os blocos correspondentes. No celular, o menu horizontal mantém seu item ativo visível.

### Coleções

| Seção | Caminhos das seis coleções, na ordem da referência |
| --- | --- |
| `/antigo-testamento` | `/livros-da-biblia`, `/personagens-biblicos`, `/temas-biblicos`, `/estudos-especiais`, `/dicionario-biblico`, `/devocionais` |
| `/novo-testamento` | `/evangelhos`, `/jesus-cristo`, `/apostolos`, `/parabolas`, `/cartas`, `/devocionais` |
| `/atualidade` | `/igreja`, `/familia`, `/vida-crista`, `/espiritualidade`, `/atualidade`, `/apocalipse` |

Os caminhos da segunda coluna são sufixos da seção: por exemplo, `/atualidade/atualidade` abre a coleção sobre cultura, ética e tecnologia. `/atualidade` continua sendo o menu das seis coleções.

### Estudos em destaque e tópicos

| Estudo | Rota | Âncoras dos tópicos |
| --- | --- | --- |
| O Tabernáculo: Símbolo da Presença de Deus | `/antigo-testamento/estudos/o-tabernaculo` | `#estrutura`, `#utensilios`, `#aplicacoes` |
| Jesus Cristo: o centro do Novo Testamento | `/novo-testamento/estudos/jesus-cristo-o-centro` | `#graca`, `#igreja`, `#reino` |
| Vivendo o Evangelho na Atualidade | `/atualidade/estudos/vivendo-o-evangelho` | `#discernimento`, `#sinais`, `#preparacao` |

## Referências e diferenças visuais

Foram usadas as quatro imagens presentes em `ImagensOriginais`, todas com 1672 × 941 px:

- `Menu Principal.PNG`;
- `Menu Antigo Testamento.PNG`;
- `Menu Novo Testamento.PNG`;
- `Menu Atualidades.PNG`.

**Existe uma referência específica do Antigo Testamento; não foi necessário usar a imagem provisória.** Essa referência contém a marca Bíblia.wiki; a implementação usa Evangelho.wiki, conforme solicitado.

As paisagens e os destaques são recortes WebP dos ativos originais. Títulos, campos, cartões, descrições, links e tópicos são elementos HTML reais. Não há uma imagem de página inteira substituindo a interface.

Limitações que permanecem:

- Não há arquivos de arte em camadas ou fundos limpos. Os recortes e as transições alteram um pouco a posição/enquadramento da arte, as texturas e os limites de iluminação. A referência de Atualidade inclui a citação bíblica incorporada ao destaque; esse detalhe permanece na arte.
- Na tela inicial, ainda são necessárias máscaras para cobrir os textos incorporados à paisagem; os botões de reprodução e as durações das miniaturas ainda fazem parte dos recortes.
- Não há fontes originais. As seções usam Carlito local para os textos sem serifa e Georgia para títulos; há diferenças de desenho, métricas e quebras em relação às referências. A licença de Carlito está em `assets/fonts/Carlito-LICENSE.txt`.
- Emblema, coroa e ícones são aproximações em SVG/CSS. O cabeçalho global foi reutilizado para manter os destinos das três seções sempre acessíveis; os atalhos específicos aparecem nos cartões e no rodapé. As imagens mostram cabeçalhos diferentes entre si.
- O brilho e a seleção seguem a seção/conteúdo atual; as referências mostram Início sublinhado em todos os menus.

## Conteúdo e integrações pendentes

O repositório original tinha apenas imagens, sem artigos, rotas, autenticação, serviço de busca ou vídeos. Não foram inventados textos completos nem destinos externos.

- As **18 coleções**, os **três estudos completos** e seus **nove tópicos** aguardam conteúdo editorial. Os títulos e resumos das referências já estão cadastrados.
- Recursos e Sobre; dicionário, mapas, perguntas e respostas; contato, termos de uso e política de privacidade aguardam conteúdo. Seus destinos apresentam indisponibilidade com retorno.
- Entrar, troca de tema, redes sociais e e-mail aguardam integração; os controles informam essa condição.
- Os três vídeos e o catálogo de tutoriais da tela inicial continuam sem URLs.
- A busca atual é local e cobre os metadados cadastrados; pesquisa em textos bíblicos e artigos depende desses conteúdos ou de um serviço de pesquisa.

## Capturas e validação

| Menu | Desktop 1536 × 864 | Celular 390 px | Comparação em dimensões nativas |
| --- | --- | --- | --- |
| Antigo Testamento | [Captura](artifacts/antigo-testamento-1536x864.png) | [Captura](artifacts/antigo-testamento-mobile.png) | [Referência e renderização](artifacts/antigo-testamento-comparacao.png) |
| Novo Testamento | [Captura](artifacts/novo-testamento-1536x864.png) | [Captura](artifacts/novo-testamento-mobile.png) | [Referência e renderização](artifacts/novo-testamento-comparacao.png) |
| Atualidade | [Captura](artifacts/atualidade-1536x864.png) | [Captura](artifacts/atualidade-mobile.png) | [Referência e renderização](artifacts/atualidade-comparacao.png) |

As comparações mantêm a referência em 1672 × 941 e a captura em 1536 × 864, sem redimensionar a referência. As capturas da primeira entrega estão preservadas e documentam o estado daquela etapa.

Foram aprovadas **185 verificações no Chromium**: seis entradas da página inicial, dezoito cartões, três estudos, nove tópicos, catálogos e filtros, busca por Enter e botão, segurança da interpolação do termo, recarga, histórico, retorno por Início/logotipo, foco, ativação por teclado, movimento reduzido, três layouts móveis sem overflow, menu ativo visível, botões sem cortes e rodapé dentro de 864 px. Não houve erros JavaScript. Sintaxe verificada com `node --check`.

O teste está em `scripts/validate-sections.mjs`. Nesta máquina usa a instalação existente de Playwright/Chromium; em outro ambiente, indique `PLAYWRIGHT_MODULE` e `CHROMIUM_PATH` para suas instalações. Com o servidor em execução:

```bash
TEST_URL=http://localhost:5173 npm run test:browser
```
