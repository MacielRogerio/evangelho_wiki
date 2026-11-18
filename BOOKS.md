# Livros do Antigo Testamento

## Rotas e organização editorial

- Catálogo: `/antigo-testamento/livros-da-biblia`.
- Categorias no catálogo: `#pentateuco`, `#historicos`, `#poeticos`, `#profetas-maiores` e `#profetas-menores`.
- Estudos: `/antigo-testamento/livros-da-biblia/<slug>`. Cada `slug` está em `books-data.js`; exemplos: `genesis`, `exodo`, `1-samuel`, `cantico-dos-canticos` e `malaquias`.
- Índice de cada estudo: `#contexto-historico`, `#contexto-teologico`, `#importancia`, `#revelacao`, `#licoes` e `#personagens`.

Não havia uma organização canônica explícita nem estudos existentes, inclusive de Gênesis, nos arquivos do projeto inspecionados. Foi adotada a organização protestante de 39 livros fornecida no pedido, na mesma ordem e grafia. As categorias contêm 5, 12, 5, 5 e 12 livros. Os nomes e temas da busca vêm dos mesmos dados usados no catálogo e nos estudos.

## Como editar

`books-data.js` exporta `categories` e `books`. Cada livro tem `name`, `slug`, `category`, `theme`, `history`, `theology`, `importance`, `messiah`, `lessons` e `characters`. Edite o texto diretamente nesse arquivo. Não altere slugs publicados sem prever redirecionamentos.

Cada lição precisa de `reference`, `principle` e `application`. Mantenha exatamente quatro por livro. Cada personagem precisa de `name`, `role` e `reference`; o campo opcional `profile` aceita a rota de um perfil realmente publicado. Ainda não existem páginas individuais de personagens no projeto; por isso os nomes não apontam para perfis fictícios. O módulo geral permanece acessível ao final da seção.

`books.js` contém o modelo reutilizável e a construção das rotas. `books.css` define os estilos da área, reutilizando a fonte local Evangelho Sans (Carlito), Georgia, o cabeçalho e o rodapé existentes. `server.mjs` publica explicitamente os novos arquivos; reinicie um servidor que já estava aberto antes da implementação.

O retorno ao catálogo usa a posição armazenada em `sessionStorage`, quando disponível. Sem uma posição anterior, o link volta à categoria do livro. Voltar/Avançar preservam a posição pelo estado do histórico. O bloqueio de armazenamento não impede a navegação.

## Texto e conferência bíblica

As sínteses foram redigidas para este projeto; não reproduzem traduções bíblicas ou comentários completos. Referências de lições e personagens possuem links para a leitura na Bible Gateway, versão NVI em português. Contexto histórico distingue época narrada e composição quando pertinente. A seção sobre o Messias diferencia conexões explícitas do Novo Testamento de relações temáticas, incluindo livros sem profecias messiânicas diretas.

Fontes consultadas para conferência de organização e conexões textuais:

- [Panoramas do Antigo Testamento — BibleProject](https://bibleproject.com/videos/collections/old-testament/).
- [Gênesis 14, Salmo 110 e Hebreus 7](https://www.biblegateway.com/passage/?search=Hebrews+7%2CGenesis+14%2CPsalm+110&version=NIV).
- [Oseias 11:1 e Mateus 2:13–15](https://www.biblegateway.com/passage/?search=Hosea+11%3A1%2CMatthew+2%3A13-15&version=NIV).
- [Amós 9:11 na referência de Atos 15:16–18](https://www.biblegateway.com/passage/?search=Acts+15%3A16-18&version=NASB%3BNIV).
- [Miqueias 5:2 e Mateus 2:5–6](https://www.biblegateway.com/passage/?search=Matthew+2%3A5-6%2CMicah+5%3A2&version=NIV).
- [Jeremias 31:31–34 e Hebreus 8](https://www.biblegateway.com/passage/?search=Jeremiah+31%3A31-34%2CHebrews+8&version=NKJV).
- [Ageu 2:6 e Hebreus 12:26](https://www.biblegateway.com/passage/?search=Hag.2.6%2CHeb.12.26).
- [Zacarias 13:7 e Marcos 14:27](https://www.biblegateway.com/passage/?search=Zechariah+13%3A7%2CMark+14%3A27%2CMatthew+26%3A31&version=KJV%3BNKJV).
- [Malaquias 3:1 e Mateus 11:10](https://www.biblegateway.com/passage/?search=Malachi+3%3A1%2CMatthew+11%3A10%2CLuke+7%3A27&version=NIV).

Essas fontes apoiam a conferência de conexões; não representam uma revisão acadêmica independente de cada parágrafo. O teste automatizado confere estrutura e navegação, não a exegese.

## Ilustrações

Foram geradas cinco ilustrações pelo recurso integrado `image_gen`, seguindo a skill imagegen. Os originais foram preservados no diretório de geração, e as versões utilizadas pelo projeto estão em `assets/books/`: `pentateuco.webp`, `historicos.webp`, `poeticos.webp`, `profetas-maiores.webp` e `profetas-menores.webp`, cada uma com 2172 × 724 px. As versões `*-small.webp` têm 960 × 320 px. São interpretações artísticas, sem pretensão de reconstrução arqueológica.

O navegador seleciona a imagem com `srcset`. As quatro imagens posteriores à primeira usam `loading="lazy"`; todas têm dimensões explícitas e descrição alternativa. O recorte central móvel mantém o ponto focal. O zoom suave respeita movimento reduzido.

Prompt usado em cada chamada, substituindo `{cena}` pela linha correspondente abaixo:

> Use case: historical-scene. Crie uma ilustração digital panorâmica de alta resolução para Evangelho.wiki, proporção 3:1. {cena}. Universo visual bíblico do antigo tabernáculo, pintura digital realista refinada, profundidade atmosférica, detalhes nítidos, luz volumétrica suave, cores ricas, composição elegante. Ponto focal no centro, reconhecível em recorte celular. Sem texto, letras, legendas ou marcas. Salve o resultado e informe caminho local.

| Arquivo | Cena |
| --- | --- |
| pentateuco.webp | Monte Sinai, tábuas de pedra da Lei sem letras legíveis, acampamento israelita no deserto, luz dourada |
| historicos.webp | Jerusalém antiga vista de uma colina, muralhas de pedra e caminhos, azul e terracota |
| poeticos.webp | Harpa antiga e pergaminhos em pátio de pedra ao amanhecer, âmbar e roxo |
| profetas-maiores.webp | Profeta de costas com rolo aberto diante de cidade antiga, céu azul profundo e bordô |
| profetas-menores.webp | Vinhas e colinas, cidade antiga no horizonte ao nascer do sol, oliva e dourado |

## Validação

Com o servidor atualizado na porta 5174:

```bash
TEST_URL=http://localhost:5174 npm run test:books
TEST_URL=http://localhost:5174 npm run test:browser
```

A validação específica passou em 433 verificações no Chromium: lista canônica e ordem, unicidade, temas próprios, cinco categorias, conteúdo estruturado, seis seções e quatro lições em cada uma das 39 URLs diretas, referências e papéis dos personagens, limites e ordem de anterior/próximo, entrada pelo primeiro card via teclado, foco de categorias e índice, âncora direta e recarga, busca sem acentos, retorno e histórico com posição preservada, decodificação das cinco imagens e ausência de overflow nas larguras 1536, 768 e 390 px. Não houve erros JavaScript ou respostas HTTP locais de erro. A regressão dos menus existentes passou em 184 verificações.

Revisão visual das capturas de desktop e celular e das cinco ilustrações em contexto. Capturas novas: `artifacts/books-catalog-{1536,768,390}.png` e `artifacts/books-genesis-{1536,768,390}.png`. As capturas anteriores do projeto foram preservadas.
