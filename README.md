# evangelho.wiki

Uma homepage moderna, espiritual e cinematográfica que oferece uma jornada pela linha do tempo do Evangelho.

## 🎯 Sobre o Projeto

**evangelho.wiki** é um site interativo que permite aos usuários explorar as Escrituras através de uma jornada única: do Antigo Testamento ao Novo Testamento, conectando-os aos temas que transformam a vida nos dias de hoje.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização responsiva
- **Lucide React** - Ícones modernos

## 📋 Estrutura do Projeto

```
evangelho_wiki/
├── app/
│   ├── layout.tsx        # Layout principal
│   ├── page.tsx          # Página inicial
│   └── globals.css       # Estilos globais
├── components/
│   ├── Header.tsx        # Navegação e cabeçalho
│   ├── HeroSection.tsx   # Seção hero principal
│   ├── PortalsSection.tsx # Seção dos 3 portais
│   ├── PortalCard.tsx    # Card individual do portal
│   ├── VideosSection.tsx # Seção de vídeos
│   ├── VideoCard.tsx     # Card individual de vídeo
│   └── Footer.tsx        # Rodapé
├── public/               # Arquivos estáticos
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── postcss.config.js
```

## 🎨 Design Features

### Paleta de Cores
- **Azul Profundo (Navy)**: Base do design - #0a1a3a
- **Dourado (Gold)**: Highlights e destaques - #d4af37
- **Púrpura**: Detalhes secundários - #6d28d9
- **Escarlate (Crimson)**: Acentos adicionais - #dc2626

### Componentes Principais

1. **Header Fixo**
   - Logo "evangelho.wiki"
   - Menu de navegação responsivo
   - Ícones de busca e tema noturno
   - Botão "Entrar"

2. **Hero Section**
   - Título principal com gradiente
   - Subtítulo descritivo
   - Barra de busca funcional
   - Botões de ação (Explorar, Como Funciona)
   - Prova social com avatares

3. **Portals Section**
   - 3 portais principais:
     - Antigo Testamento
     - Novo Testamento
     - Contemporaneidade
   - Timeline visual com marcadores temporais
   - Efeitos hover luminosos

4. **Videos Section**
   - 3 cards de vídeo com play button
   - Miniaturas com gradientes
   - Badges de duração
   - Link para galeria completa

5. **Footer**
   - Links de navegação
   - Informações de empresa
   - Copyright

## 🛠️ Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Passos

1. **Clonar o repositório**
```bash
cd evangelho_wiki
```

2. **Instalar dependências**
```bash
npm install
```

3. **Configurar variáveis de ambiente**
```bash
cp .env.example .env.local
```

4. **Rodar o servidor de desenvolvimento**
```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

## 📱 Responsividade

O site foi desenvolvido com uma abordagem mobile-first e é totalmente responsivo para:
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+

Todos os componentes adaptam-se automaticamente ao tamanho da tela.

## 🎬 Efeitos Visuais

- **Gradientes animados**: Backgrounds com movimento sutil
- **Hover effects**: Cards que crescem e ganham brilho no hover
- **Transições suaves**: Animações de 0.3s com easing cubic-bezier
- **Glowing borders**: Bordas luminosas nos portais
- **Animated particles**: Elementos flutuantes no fundo

## 🔍 Componentes Reutilizáveis

Todos os componentes foram desenvolvidos para máxima reutilização:

- **PortalCard**: Customizável com cores, títulos e links
- **VideoCard**: Aceita diferentes thumbnails e durações
- **Header**: Menu responsivo automático
- **Footer**: Links dinâmicos e estruturado

## 📝 Customização

### Mudar Cores
Edite `tailwind.config.js` na seção `colors`:

```javascript
colors: {
  navy: '#0a1a3a',
  gold: '#d4af37',
  // ... mais cores
}
```

### Adicionar Novos Portais
Edite `components/PortalsSection.tsx` e adicione à array `portals`.

### Modificar Menu
Edite `components/Header.tsx` no array `menuItems`.

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

### Build para Produção
```bash
npm run build
npm run start
```

## 📄 Licença

Este projeto é dedicado à glorificação de Jesus Cristo e à disseminação das Escrituras.

## 📞 Suporte

Para questões ou sugestões, entre em contato através da página de contato do site.

---

**Desenvolvido com ❤️ para a comunidade cristã**
