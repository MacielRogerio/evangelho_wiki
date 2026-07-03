import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Evangelho.wiki - Viaje pela Linha do Tempo do Evangelho',
  description: 'Explore as Escrituras em uma jornada única: do Antigo Testamento ao Novo Testamento e aos temas que transformam a vida de hoje.',
  keywords: ['evangelho', 'biblia', 'escrituras', 'antigo testamento', 'novo testamento'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-cosmic text-white">
        {children}
      </body>
    </html>
  );
}
