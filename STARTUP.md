# 🚀 STARTUP GUIDE - evangelho.wiki

## ✅ Status do Projeto

A homepage do **evangelho.wiki** foi criada com sucesso! O projeto está **pronto para rodar** e inclui todos os componentes solicitados.

---

## 📦 O que foi desenvolvido

### ✨ Componentes Principais
1. **Header Sticky** com logo, menu responsivo, busca e tema noturno
2. **Hero Section** com título, subtítulo, barra de busca, botões e prova social
3. **Portals Section** com 3 portais principais (Antigo Testamento, Novo Testamento, Contemporaneidade)
4. **Timeline Visual** com 5 marcadores temporais
5. **Videos Section** com 3 cards de vídeo com play button
6. **Footer** completo com links de navegação

### 🎨 Design Features
- ✅ Paleta de cores: Navy, Dourado, Púrpura, Escarlate
- ✅ Efeitos hover luminosos com glow
- ✅ Animações suaves de transição
- ✅ Partículas e elementos flutuantes no fundo
- ✅ Totalmente responsivo (mobile, tablet, desktop)
- ✅ Interface real funcional (não é apenas imagem)

### 🛠️ Tecnologias
- Next.js 15 com App Router
- TypeScript para tipagem estática
- Tailwind CSS para estilos responsivos
- Lucide React para ícones

---

## 🚀 Como Rodar Localmente

### 1. Navegar para a pasta do projeto
```bash
cd /Users/rogeriomaciel/Developers/evangelho_wiki
```

### 2. Rodar o servidor de desenvolvimento
```bash
npm run dev
```

### 3. Abrir no navegador
```
http://localhost:3000
```

Pronto! O site estará rodando e acessível.

---

## 📂 Estrutura de Arquivos

```
evangelho_wiki/
├── app/
│   ├── layout.tsx          # Wrapper principal do Next.js
│   ├── page.tsx            # Página inicial (Home)
│   └── globals.css         # Estilos globais
├── components/
│   ├── Header.tsx          # Menu fixo/sticky
│   ├── HeroSection.tsx     # Seção hero com busca
│   ├── PortalsSection.tsx  # Os 3 portais + timeline
│   ├── PortalCard.tsx      # Card reutilizável
│   ├── VideosSection.tsx   # Seção de vídeos
│   ├── VideoCard.tsx       # Card de vídeo reutilizável
│   └── Footer.tsx          # Rodapé
├── lib/
│   └── constants.ts        # Constantes e configurações
├── public/                 # Arquivos estáticos (imagens, fonts)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
├── .eslintrc.json
├── .gitignore
├── .env.example
├── README.md               # Documentação principal
└── DEVELOPMENT.md          # Guia de desenvolvimento
```

---

## 🔧 Comandos Úteis

### Desenvolvimento
```bash
npm run dev          # Inicia servidor local (localhost:3000)
```

### Produção
```bash
npm run build        # Cria build otimizado
npm start           # Roda a build em produção
```

### Linting
```bash
npm run lint        # Verifica qualidade do código
```

---

## 🎯 Próximas Funcionalidades para Implementar

1. **Páginas Internas**
   - `/antigo-testamento` - Página do Antigo Testamento
   - `/novo-testamento` - Página do Novo Testamento
   - `/contemporaneidade` - Página da Contemporaneidade

2. **Funcionalidades Dinâmicas**
   - API de busca
   - Conteúdo do banco de dados
   - Autenticação de usuários
   - Sistema de favoritos

3. **Melhorias**
   - Implementar tema claro/escuro funcional
   - Adicionar imagens reais dos portais
   - Integrar vídeos reais
   - Analytics e rastreamento

---

## 🎨 Customizações Rápidas

### Mudar Cores Principais
Edite `tailwind.config.js`:
```javascript
colors: {
  navy: '#0a1a3a',      // Azul profundo
  gold: '#d4af37',       // Dourado
  purple: '#6d28d9',     // Púrpura
  crimson: '#dc2626',    // Escarlate
}
```

### Adicionar Menu Item
Edite `lib/constants.ts` em `NAV_LINKS`:
```javascript
{ name: 'Novo Item', href: '/novo-item' }
```

### Adicionar Novo Portal
Edite `lib/constants.ts` em `PORTALS`:
```javascript
{
  title: 'Novo Portal',
  subtitle: 'Descrição',
  href: '/novo-portal',
  color: 'gold',
  icon: '📖',
}
```

---

## 📱 Responsividade

O site é 100% responsivo:
- **Mobile**: 320px e acima
- **Tablet**: 768px e acima (breakpoint `md:`)
- **Desktop**: 1024px e acima (breakpoint `lg:`)

Todos os componentes adaptam-se automaticamente.

---

## 💡 Dicas Importantes

1. **Use `'use client'`** apenas para componentes interativos (já está nos componentes)
2. **Server Components** por padrão para melhor performance
3. **Tailwind CSS** para todas as estilizações
4. **TypeScript** para melhor desenvolvibilidade

---

## 🔗 Links Úteis

- [Next.js Documentação](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [TypeScript](https://www.typescriptlang.org)

---

## 📝 Notas de Desenvolvimento

- Todos os componentes são **reutilizáveis** e bem tipados com TypeScript
- O design segue a **paleta de cores especificada** (Navy, Dourado, Púrpura, Escarlate)
- Todas as **animações e transições** são suaves e performáticas
- O projeto usa **Tailwind CSS** para máxima flexibilidade
- **Responsive design** mobile-first implementado

---

## 🚀 Deploy

Para fazer deploy:

### Opção 1: Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Opção 2: Outro Host
```bash
npm run build
npm start
```

---

## ✨ Features Implementadas

✅ Header fixo com logo, menu, busca, tema e botão entrar  
✅ Hero section com título, subtítulo, busca, botões e prova social  
✅ 3 Portais principais com efeitos hover luminosos  
✅ Timeline visual com 5 marcadores históricos  
✅ Seção de 3 vídeos com play button interativo  
✅ Footer completo com links e informações  
✅ Design cinematográfico e espiritual  
✅ Paleta de cores premium (Navy, Dourado, Púrpura, Escarlate)  
✅ Animações e transições suaves  
✅ 100% Responsivo (mobile, tablet, desktop)  
✅ TypeScript para melhor qualidade de código  
✅ Componentes reutilizáveis  
✅ Sem imagens fixas (interface real funcional)  

---

## 📞 Suporte

Para adicionar novos recursos ou fazer customizações, consulte:
- `DEVELOPMENT.md` - Guia completo de desenvolvimento
- `README.md` - Documentação do projeto
- `lib/constants.ts` - Configurações reutilizáveis

---

**🎉 Parabéns! Seu site evangelho.wiki está pronto para começar!**

Comece rodando: `npm run dev`

---

*Desenvolvido com ❤️ para a comunidade cristã*
