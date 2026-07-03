# Guia de Desenvolvimento - evangelho.wiki

## 🚀 Começando

### 1. Instalar Dependências (já feito)
```bash
npm install
```

### 2. Rodar o Servidor de Desenvolvimento
```bash
npm run dev
```

O site estará disponível em `http://localhost:3000`

### 3. Estrutura de Arquivos Importante

```
components/
├── Header.tsx           # Navegação principal (com menu responsivo)
├── HeroSection.tsx      # Seção inicial com busca
├── PortalsSection.tsx   # Os 3 portais principais + timeline
├── PortalCard.tsx       # Card individual do portal (reutilizável)
├── VideosSection.tsx    # Seção de 3 vídeos
├── VideoCard.tsx        # Card individual de vídeo (reutilizável)
└── Footer.tsx           # Rodapé com links

lib/
└── constants.ts         # Constantes reutilizáveis (cores, textos, links)

app/
├── layout.tsx           # Wrapper principal
├── page.tsx             # Página inicial (junta todos os componentes)
└── globals.css          # Estilos globais
```

## 🎨 Customizações Comuns

### Mudar Paleta de Cores
Edite em `tailwind.config.js`:
```javascript
colors: {
  navy: '#0a1a3a',        // Cor base do fundo
  gold: '#d4af37',         // Cor principal de destaque
  purple: '#6d28d9',       // Cor secundária
  crimson: '#dc2626',      // Cor de acento
}
```

### Adicionar Novo Portal
1. Abra `lib/constants.ts`
2. Adicione à array `PORTALS`:
```javascript
{
  title: 'Novo Portal',
  subtitle: 'Descrição',
  href: '/novo-portal',
  color: 'gold',
  icon: '📖',
}
```

### Modificar Menu de Navegação
Edite `lib/constants.ts` em `NAV_LINKS`:
```javascript
{ name: 'Novo Item', href: '/novo-item' }
```

### Adicionar Novo Vídeo
Edite `lib/constants.ts` em `VIDEOS`:
```javascript
{
  title: 'Novo Vídeo',
  description: 'Descrição',
  duration: 'HH:MM',
  thumbnailColor: 'from-gold to-gold-light',
}
```

## 🔧 Componentes Reutilizáveis

### PortalCard
```tsx
<PortalCard
  title="Título"
  subtitle="Subtítulo"
  href="/link"
  color="gold|purple|crimson"
  icon="Emoji"
/>
```

### VideoCard
```tsx
<VideoCard
  title="Título"
  description="Descrição"
  duration="02:15"
  thumbnailColor="from-gold to-gold-light"
/>
```

## 📱 Responsive Design

Os componentes usam:
- `hidden/flex` classes para mostrar/esconder em diferentes tamanhos
- `md:` para tablet (768px+)
- `lg:` para desktop (1024px+)
- Mobile-first approach

Exemplo:
```tsx
<div className="block md:hidden">Mobile</div>
<div className="hidden md:block">Desktop/Tablet</div>
```

## 🎬 Animações Disponíveis

Definidas em `tailwind.config.js`:
- `animate-float`: Flutuação suave
- `animate-pulse-glow`: Brilho pulsante

Use assim:
```tsx
<div className="animate-float">Flutuante</div>
<div className="animate-pulse-glow">Brilho</div>
```

## 🎨 Classes Úteis

Criadas em `app/globals.css`:
- `.gradient-text`: Texto com gradiente
- `.glow-soft`: Brilho suave dourado
- `.glow-soft-purple`: Brilho suave púrpura
- `.transition-smooth`: Transição suave

## 🚀 Build para Produção

```bash
npm run build
npm run start
```

## 🔍 Linting

```bash
npm run lint
```

## 📝 Tipagem TypeScript

Todos os componentes têm tipos definidos:

```typescript
interface PortalCardProps {
  title: string;
  subtitle: string;
  href: string;
  icon?: React.ReactNode;
  color?: 'gold' | 'purple' | 'crimson';
}
```

## 🌐 Próximos Passos

1. **Criar páginas internas**: `/app/antigo-testamento/page.tsx`, etc
2. **Adicionar API routes**: `/app/api/busca/route.ts`
3. **Integrar banco de dados**: Para conteúdo dinâmico
4. **Implementar autenticação**: Login com email/senha
5. **Adicionar temas dinâmicos**: Modo claro/escuro funcional

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Lucide Icons](https://lucide.dev)

## 💡 Dicas de Performance

1. Use `'use client'` apenas quando necessário (interatividade)
2. Server Components por padrão
3. Lazy load imagens com `next/image`
4. Otimize CSS com Tailwind purging

---

**Desenvolvido com ❤️ usando Next.js, TypeScript e Tailwind CSS**
