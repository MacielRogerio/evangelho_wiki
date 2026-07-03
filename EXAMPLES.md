# 📚 Exemplos de Extensão - evangelho.wiki

Este documento mostra como adicionar novas funcionalidades ao projeto.

---

## 1️⃣ Criar uma Nova Página

### Exemplo: Página do Antigo Testamento

#### Passo 1: Criar a pasta e arquivo
```bash
mkdir -p app/antigo-testamento
touch app/antigo-testamento/page.tsx
```

#### Passo 2: Criar o conteúdo
```typescript
// app/antigo-testamento/page.tsx
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Antigo Testamento - evangelho.wiki',
  description: 'Explore os livros e histórias do Antigo Testamento...',
};

export default function AntTexto() {
  return (
    <main>
      <Header />
      <section className="pt-24 pb-20 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4">Antigo Testamento</h1>
          <p className="text-gray-300">Seu conteúdo aqui...</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
```

---

## 2️⃣ Criar um Novo Componente Reutilizável

### Exemplo: Card de Livro

```typescript
// components/BookCard.tsx
'use client';

import React from 'react';

interface BookCardProps {
  title: string;
  chapters: number;
  description?: string;
}

export default function BookCard({ title, chapters, description }: BookCardProps) {
  return (
    <div className="p-6 rounded-lg bg-navy-light/30 border border-gold/20 hover:border-gold transition-all duration-300 group cursor-pointer">
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold">
        {title}
      </h3>
      <p className="text-sm text-gray-400 mb-4">{chapters} capítulos</p>
      {description && (
        <p className="text-sm text-gray-300">{description}</p>
      )}
    </div>
  );
}
```

### Usar o componente
```tsx
<BookCard 
  title="Gênesis" 
  chapters={50}
  description="Livro da criação e alianças"
/>
```

---

## 3️⃣ Adicionar uma API Route

### Exemplo: Busca

```typescript
// app/api/search/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter required' },
      { status: 400 }
    );
  }

  // Aqui você colocaria a lógica de busca
  const results = [
    { id: 1, title: 'Resultado 1', type: 'livro' },
    { id: 2, title: 'Resultado 2', type: 'versículo' },
  ];

  return NextResponse.json(results);
}
```

### Usar no cliente
```typescript
const response = await fetch(`/api/search?q=${query}`);
const results = await response.json();
```

---

## 4️⃣ Adicionar Interatividade com State

### Exemplo: Tab Switcher

```typescript
// components/VersionSelector.tsx
'use client';

import React, { useState } from 'react';

const versions = ['NVT', 'ARC', 'NVI'];

export default function VersionSelector() {
  const [selected, setSelected] = useState('NVT');

  return (
    <div className="flex gap-2">
      {versions.map((version) => (
        <button
          key={version}
          onClick={() => setSelected(version)}
          className={`px-4 py-2 rounded-lg transition-all duration-200 ${
            selected === version
              ? 'bg-gold text-navy font-semibold'
              : 'bg-navy-light/50 text-gray-300 hover:bg-navy-light'
          }`}
        >
          {version}
        </button>
      ))}
    </div>
  );
}
```

---

## 5️⃣ Estender constantes.ts

```typescript
// lib/constants.ts - Adicione novos dados

export const BOOKS = {
  genesis: { title: 'Gênesis', chapters: 50, abbreviation: 'Gn' },
  exodus: { title: 'Êxodo', chapters: 40, abbreviation: 'Ex' },
  // ... mais livros
} as const;

export const VERSES = [
  { 
    book: 'Gênesis', 
    chapter: 1, 
    verse: 1, 
    text: 'No princípio criou Deus o céu e a terra.' 
  },
  // ... mais versículos
] as const;
```

---

## 6️⃣ Adicionar Animação Customizada

```css
/* app/globals.css - Adicione novo keyframe */

@keyframes slide-in {
  from {
    opacity: 0;
    transform: translateX(-100px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

```javascript
// tailwind.config.js - Registre a animação

animation: {
  'slide-in': 'slide-in 0.5s ease-out',
}
```

```tsx
// Use no componente
<div className="animate-slide-in">Conteúdo animado</div>
```

---

## 7️⃣ Criar Contexto Global

```typescript
// lib/context/ThemeContext.tsx
'use client';

import React, { createContext, useState } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

### Usar no Layout
```tsx
// app/layout.tsx
import { ThemeProvider } from '@/lib/context/ThemeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

## 8️⃣ Integrar com Banco de Dados (Exemplo: Supabase)

```typescript
// lib/db.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Buscar livros
export async function getBooks() {
  const { data, error } = await supabase.from('books').select('*');
  if (error) throw error;
  return data;
}
```

### Usar em um componente
```tsx
'use client';

import { useEffect, useState } from 'react';
import { getBooks } from '@/lib/db';

export default function BooksList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks().then(setBooks);
  }, []);

  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
```

---

## 9️⃣ Adicionar Modal/Dialog

```typescript
// components/Modal.tsx
'use client';

import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-navy rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
```

---

## 🔟 Usar Imagens com Next.js Image

```typescript
// components/HeroImage.tsx
import Image from 'next/image';

export default function HeroImage() {
  return (
    <Image
      src="/images/hero.jpg"
      alt="Hero Image"
      width={1200}
      height={600}
      priority
      className="rounded-lg"
    />
  );
}
```

---

## 📝 Boas Práticas

1. **Use TypeScript** sempre que possível
2. **Mantenha componentes pequenos** e focados
3. **Use constantes** em `lib/constants.ts`
4. **Aplicar 'use client'** apenas quando necessário
5. **Otimize imagens** com `next/image`
6. **Use Tailwind classes** para estilização
7. **Crie tipos reutilizáveis** em `lib/types.ts`

---

## 🚀 Próximas Ideias

- Sistema de favoritos com localStorage
- Compartilhamento em redes sociais
- Notificações push
- PWA (Progressive Web App)
- Dark/Light mode funcional
- Histórico de navegação
- Sincronização em nuvem

---

**Feliz desenvolvimento! 🎉**
