// Tipos de cores disponíveis
export type ColorTheme = 'gold' | 'purple' | 'crimson';

// Constantes de cores
export const COLOR_THEMES = {
  gold: {
    border: 'border-gold/40 hover:border-gold',
    glow: 'hover:shadow-glow-gold',
    text: 'text-gold',
    bg: 'bg-gold',
  },
  purple: {
    border: 'border-purple/40 hover:border-purple',
    glow: 'hover:shadow-glow-purple',
    text: 'text-purple',
    bg: 'bg-purple',
  },
  crimson: {
    border: 'border-crimson/40 hover:border-crimson',
    glow: 'hover:shadow-glow-crimson',
    text: 'text-crimson',
    bg: 'bg-crimson',
  },
} as const;

// Links de navegação
export const NAV_LINKS = [
  { name: 'Início', href: '#' },
  { name: 'Antigo Testamento', href: '/antigo-testamento' },
  { name: 'Novo Testamento', href: '/novo-testamento' },
  { name: 'Atualidade', href: '/atualidade' },
  { name: 'Recursos', href: '/recursos' },
  { name: 'Sobre', href: '/sobre' },
] as const;

// Portais principais
export const PORTALS = [
  {
    title: 'Antigo Testamento',
    subtitle: 'Aliança, Promessas e História',
    href: '/antigo-testamento',
    color: 'gold' as const,
    icon: '📜',
  },
  {
    title: 'Novo Testamento',
    subtitle: 'Vida, Graça, Redenção e Esperança',
    href: '/novo-testamento',
    color: 'purple' as const,
    icon: '✨',
  },
  {
    title: 'Contemporaneidade',
    subtitle: 'Vida Cristã, Atualidade e Apocalipse',
    href: '/contemporaneidade',
    color: 'crimson' as const,
    icon: '🌍',
  },
] as const;

// Marcadores da timeline
export const TIMELINE_MARKERS = [
  { title: 'Criação', subtitle: 'Início dos Tempos' },
  { title: 'Aliança', subtitle: '~2000 a.C.' },
  { title: 'Vida de Cristo', subtitle: '~30 d.C.' },
  { title: 'Igreja', subtitle: 'Século I' },
  { title: 'Eternidade', subtitle: 'Futuro' },
] as const;

// Vídeos
export const VIDEOS = [
  {
    title: 'Como Navegar pelo Site',
    description: 'Aprenda a encontrar tudo com facilidade.',
    duration: '02:15',
    thumbnailColor: 'from-gold to-gold-light',
  },
  {
    title: 'Entenda a Linha do Tempo',
    description: 'Veja como as eras se conectam nas Escrituras.',
    duration: '01:48',
    thumbnailColor: 'from-purple to-purple-dark',
  },
  {
    title: 'Recursos e Ferramentas',
    description: 'Descubra estudos, planos e ferramentas exclusivas.',
    duration: '02:03',
    thumbnailColor: 'from-crimson to-crimson-dark',
  },
] as const;

// Textos padrão
export const SITE_TEXT = {
  logo: 'evangelho.wiki',
  heroTitle: 'Viaje pela linha do tempo do Evangelho',
  heroSubtitle:
    'Explore as Escrituras em uma jornada única: do Antigo Testamento ao Novo Testamento e aos temas que transformam a vida de hoje.',
  searchPlaceholder:
    'Busque por livros, personagens, temas ou estudos...',
  portalsSectionTitle: 'Sua Jornada Espiritual',
  portalsSectionSubtitle:
    'Escolha seu caminho e mergulhe nas três dimensões principais das Escrituras',
  timelineTitle: 'A Linha do Tempo do Evangelho',
  videosSectionTitle: 'Comece sua jornada em poucos minutos',
  videosSectionSubtitle:
    'Assista aos vídeos rápidos abaixo e descubra como navegar pelo evangelho.wiki e aproveitar ao máximo cada recurso.',
  socialProofText:
    'Junte-se a milhares de pessoas que estão vivendo esta jornada de fé e conhecimento.',
} as const;
