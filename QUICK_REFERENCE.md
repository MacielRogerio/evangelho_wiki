# ⚡ QUICK REFERENCE - evangelho.wiki

## 🚀 Comandos Principais

```bash
# Instalar dependências (já feito)
npm install

# Rodar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Rodar em produção
npm start

# Linting e verificação de tipos
npm run lint
```

---

## 🌐 URLs Úteis

```
Local Development:    http://localhost:3000
Deploy (Vercel):      https://evangelho-wiki.vercel.app (após deploy)
```

---

## 📁 Estrutura de Pastas Rápida

```
projeto/
├── app/              → Páginas e layout (Next.js App Router)
├── components/       → Componentes React reutilizáveis
├── lib/              → Funções e constantes utilitárias
├── public/           → Arquivos estáticos
├── imagens/          → Imagens do projeto
└── Documentação:     README.md, DEVELOPMENT.md, EXAMPLES.md
```

---

## 🎨 Cores Principais (Tailwind)

| Cor | Hex | Classe Tailwind | Uso |
|-----|-----|-----------------|-----|
| Navy | #0a1a3a | `bg-navy` | Fundo base |
| Gold | #d4af37 | `bg-gold text-gold` | Destaque principal |
| Purple | #6d28d9 | `bg-purple text-purple` | Secundária |
| Crimson | #dc2626 | `bg-crimson text-crimson` | Acento |

---

## 🧩 Componentes Disponíveis

| Componente | Local | Uso |
|------------|-------|-----|
| Header | `components/Header.tsx` | Menu fixo |
| HeroSection | `components/HeroSection.tsx` | Hero com busca |
| PortalCard | `components/PortalCard.tsx` | Card individual |
| PortalsSection | `components/PortalsSection.tsx` | 3 Portais + Timeline |
| VideoCard | `components/VideoCard.tsx` | Card de vídeo |
| VideosSection | `components/VideosSection.tsx` | 3 Vídeos |
| Footer | `components/Footer.tsx` | Rodapé |

---

## 📝 Adicionar Novo Portal

1. Abra `lib/constants.ts`
2. Edite o array `PORTALS`:

```typescript
{
  title: 'Novo Portal',
  subtitle: 'Descrição aqui',
  href: '/novo-portal',
  color: 'gold|purple|crimson',
  icon: 'emoji',
}
```

3. Salve e recarregue

---

## 🔗 Adicionar Menu Item

1. Abra `lib/constants.ts`
2. Edite o array `NAV_LINKS`:

```typescript
{ name: 'Nome Item', href: '/rota' }
```

---

## 🎬 Adicionar Novo Vídeo

1. Abra `lib/constants.ts`
2. Edite o array `VIDEOS`:

```typescript
{
  title: 'Título',
  description: 'Descrição',
  duration: 'HH:MM',
  thumbnailColor: 'from-gold to-gold-light',
}
```

---

## 🎨 Mudar Cores Globais

Edite em `tailwind.config.js` na seção `colors`:

```javascript
navy: '#sua-cor-aqui',
gold: '#sua-cor-aqui',
purple: '#sua-cor-aqui',
crimson: '#sua-cor-aqui',
```

---

## 📱 Breakpoints Responsivos

```
Mobile:  320px+         (padrão)
Tablet:  768px+         (md:)
Desktop: 1024px+        (lg:)
```

Exemplo:
```tsx
<div className="block md:hidden">Mobile</div>
<div className="hidden md:flex">Desktop/Tablet</div>
```

---

## ✨ Animações Disponíveis

```
animate-float        → Flutuação suave
animate-pulse-glow   → Brilho pulsante
transition-smooth    → Transição suave 0.3s
```

---

## 🌟 Classes Úteis (globals.css)

```
.gradient-text           → Texto com gradiente
.glow-soft              → Brilho dourado suave
.glow-soft-purple       → Brilho púrpura suave
.transition-smooth      → Transição 0.3s suave
```

---

## 📊 Props dos Componentes

### PortalCard
```tsx
<PortalCard
  title="string"
  subtitle="string"
  href="/caminho"
  icon="React.ReactNode" (opcional)
  color="gold|purple|crimson" (padrão: gold)
/>
```

### VideoCard
```tsx
<VideoCard
  title="string"
  description="string"
  duration="HH:MM"
  thumbnailColor="from-X to-Y"
/>
```

---

## 🔧 Arquivo de Constantes (lib/constants.ts)

Centralizações:
- `COLOR_THEMES` - Temas de cores
- `NAV_LINKS` - Menu de navegação
- `PORTALS` - Dados dos portais
- `TIMELINE_MARKERS` - Marcadores timeline
- `VIDEOS` - Dados dos vídeos
- `SITE_TEXT` - Textos padrão

---

## 📚 Recursos Rápidos

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Lucide Icons](https://lucide.dev)

---

## 🚀 Deploy Rápido (Vercel)

```bash
npm install -g vercel
vercel
```

Ou push no GitHub e conecte no Vercel dashboard.

---

## ⚠️ Troubleshooting

### Porta 3000 já em uso
```bash
# Kill o processo
lsof -ti:3000 | xargs kill -9
# Ou use outra porta
npm run dev -- -p 3001
```

### Limpar cache Next.js
```bash
rm -rf .next
npm run dev
```

### Reinstalar dependências
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📈 Performance Tips

1. Use `next/image` para imagens
2. Lazy load componentes pesados
3. Use Server Components quando possível
4. Minimize uso de `'use client'`
5. Optimize images com formato WebP

---

## 🔐 Segurança Básica

```bash
# Audit de segurança
npm audit

# Fix vulnerabilities
npm audit fix
```

---

## 📝 Tipos Úteis (TypeScript)

```typescript
// Color themes
type ColorTheme = 'gold' | 'purple' | 'crimson';

// Portal
interface PortalProps {
  title: string;
  subtitle: string;
  href: string;
  color?: ColorTheme;
  icon?: React.ReactNode;
}
```

---

## 🎯 Checklist de Desenvolvimento

- [ ] Rodar `npm run dev`
- [ ] Testar em mobile/tablet/desktop
- [ ] Verificar links funcionam
- [ ] Testar hover effects
- [ ] Testar menu responsivo
- [ ] Verificar contraste de cores
- [ ] Testar velocidade de página

---

## 💾 Salvar Mudanças

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

---

## 📞 Suporte Rápido

- Erro de compilação? → Rode `npm install` novamente
- Porta ocupada? → Kill processo ou use `-p 3001`
- Cache problemático? → Delete `.next`
- Dependências? → Veja `package.json`

---

## 🎉 Pronto!

Você tem tudo que precisa para começar. 

**Comande agora:**
```bash
npm run dev
```

**Abra no navegador:**
```
http://localhost:3000
```

---

**Feliz desenvolvimento! 🚀**

*Desenvolvido com Next.js, TypeScript e Tailwind CSS*
