'use client';

import React, { useRef, useState } from 'react';
import { Search } from 'lucide-react';

export default function HeroSection() {
  const [searchValue, setSearchValue] = useState('');
  const [isTitleHovered, setIsTitleHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activateTitleEffect = () => {
    setIsTitleHovered(true);
    const video = videoRef.current;

    if (video) {
      video.currentTime = 0;
      void video.play();
    }
  };

  const deactivateTitleEffect = () => {
    setIsTitleHovered(false);
    const video = videoRef.current;

    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <section className="relative min-h-[680px] overflow-hidden pb-20 pt-36 sm:min-h-[720px] md:min-h-[760px] md:pb-24 md:pt-40">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/hero/abertura.png"
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            isTitleHovered ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${
            isTitleHovered ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          playsInline
          preload="metadata"
        >
          <source src="/videos/abertura.m4v" type="video/mp4" />
          <source src="/videos/abertura.mov" type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,43,0.38)_0%,rgba(10,26,58,0.10)_42%,rgba(10,26,58,0.68)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,43,0.92)_0%,rgba(7,17,43,0.68)_25%,rgba(7,17,43,0.08)_48%,rgba(7,17,43,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy via-navy/85 to-transparent" />
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            isTitleHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute left-[4%] top-[18%] h-[48%] w-[28%] rounded-full bg-[radial-gradient(circle_at_center,rgba(125,211,252,0.20),rgba(37,99,235,0.08)_42%,transparent_72%)] blur-2xl" />
          <div className="absolute left-[41%] bottom-[18%] h-36 w-[22%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(229,193,88,0.42),rgba(212,175,55,0.14)_48%,transparent_72%)] blur-xl" />
        </div>
      </div>

      <div className="relative z-10 flex min-h-[560px] w-full flex-col items-start px-6 pb-36 pt-8 md:min-h-[580px] md:pt-10 lg:pt-12">
        {/* Main Title */}
        <h1
          onMouseEnter={activateTitleEffect}
          onMouseLeave={deactivateTitleEffect}
          onFocus={activateTitleEffect}
          onBlur={deactivateTitleEffect}
          tabIndex={0}
          className="mb-6 max-w-[440px] cursor-default text-left text-4xl font-bold leading-[0.98] outline-none transition-[filter,transform] duration-500 hover:drop-shadow-[0_0_18px_rgba(229,193,88,0.35)] focus:drop-shadow-[0_0_18px_rgba(229,193,88,0.35)] sm:text-5xl lg:text-5xl"
        >
          <span className="block text-white">Viaje pela</span>
          <span className="block text-gold">linha do tempo</span>
          <span className="block text-white">do Evangelho</span>
        </h1>

        {/* Search Bar */}
        <div className="mt-16 flex w-full max-w-xl gap-2 md:mt-20 lg:mt-24">
          <div className="flex-1 relative">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Busque por livros, personagens, temas ou estudos..."
              className="w-full px-6 py-3 rounded-lg bg-navy-light/50 border border-gold/30 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all duration-200"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gold opacity-60" size={20} />
          </div>
          <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy font-semibold hover:shadow-glow-gold transition-all duration-200 whitespace-nowrap">
            Buscar
          </button>
        </div>

      </div>

      <p className="absolute inset-x-0 bottom-5 z-10 mx-auto max-w-4xl px-6 text-center text-base font-medium leading-snug text-gray-100 sm:bottom-6 md:bottom-8 md:text-lg lg:text-[22px]">
        Explore as Escrituras em uma jornada única: do Antigo Testamento ao
        Novo Testamento e aos temas que transformam a vida de hoje.
      </p>
    </section>
  );
}
