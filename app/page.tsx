import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PortalsSection from '@/components/PortalsSection';
import VideosSection from '@/components/VideosSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-hidden">
      <Header />
      <HeroSection />
      <PortalsSection />
      <VideosSection />
      <Footer />
    </main>
  );
}
