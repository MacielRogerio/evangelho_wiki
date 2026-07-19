'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function HeroSection() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <section className="relative min-h-[590px] overflow-hidden pb-16 pt-32 sm:min-h-[620px] md:min-h-[650px] md:pb-20 md:pt-36">
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/hero/abertura.png"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,17,43,0.38)_0%,rgba(10,26,58,0.10)_42%,rgba(10,26,58,0.68)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,43,0.92)_0%,rgba(7,17,43,0.68)_25%,rgba(7,17,43,0.08)_48%,rgba(7,17,43,0.18)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-navy via-navy/85 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-[450px] w-full flex-col items-start px-6 pb-28 pt-6 md:min-h-[470px] md:pt-8 lg:pt-10">
        {/* Main Title */}
        <h1
          className="mb-6 max-w-[440px] cursor-default text-left text-4xl font-bold leading-[0.98] sm:text-5xl lg:text-5xl"
        >
          <span className="block text-white">Viaje pela</span>
          <span className="block text-gold">linha do tempo</span>
          <span className="block text-white">do Evangelho</span>
        </h1>

        {/* Search Bar */}
        <div className="mt-12 flex w-full max-w-xl gap-2 md:mt-16 lg:mt-20">
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
