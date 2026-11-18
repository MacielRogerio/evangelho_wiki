# Abrir esta versão no MacBook

Esta é a implementação visual das telas de referência, com um servidor Node.js simples. Ela está na pasta `interface-referencia` da branch `interface-referencia` do repositório privado existente. A aplicação Next.js da raiz foi preservada.

## Primeira vez

1. Instale o Node.js LTS, se ainda não estiver instalado, e confirme `node --version` no Terminal.
2. No GitHub Desktop, entre na conta que possui acesso ao repositório privado, clone `MacielRogerio/evangelho_wiki` e selecione a branch **interface-referencia** em **Current Branch**.
3. No Terminal, entre na pasta clonada e depois em `interface-referencia`.
4. Execute `npm run dev` e abra **http://localhost:5173** no Firefox, Safari ou Chrome.

Se você já usa Git autenticado pelo Terminal:

```bash
git clone --branch interface-referencia https://github.com/MacielRogerio/evangelho_wiki.git
cd evangelho_wiki/interface-referencia
npm run dev
```

Não é necessário executar `npm install` nesta subpasta: esta implementação não tem dependências de execução. Os comandos devem ser executados em `interface-referencia`, e não na raiz da aplicação Next.js.

## Atualizar

Com o servidor parado (Ctrl+C), execute na pasta do projeto:

```bash
git pull --ff-only
npm run dev
```

## Observações

- O repositório é privado. O MacBook precisa estar autenticado em uma conta com acesso.
- O endereço `localhost` só funciona no MacBook enquanto o servidor estiver em execução. O envio ao GitHub não publica o site na internet.
- Os efeitos da Bíblia usam o mouse: passe o ponteiro sobre o livro para ver o arco luminoso.
- Se a porta estiver ocupada, execute `PORT=5174 npm run dev` e abra http://localhost:5174.
