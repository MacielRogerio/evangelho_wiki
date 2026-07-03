'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface HeroProps {
  onExplore?: () => void;
}

export default function HeroSection({ onExplore }: HeroProps) {
  const [searchValue, setSearchValue] = useState('');

  return (
    <section className="pt-32 pb-16 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple rounded-full mix-blend-screen filter blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-crimson rounded-full mix-blend-screen filter blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Main Title */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight">
          Viaje pela{' '}
          <span className="gradient-text">linha do tempo do Evangelho</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 text-center mb-12 max-w-3xl mx-auto leading-relaxed">
          Explore as Escrituras em uma jornada única: do Antigo Testamento ao
          Novo Testamento e aos temas que transformam a vida de hoje.
        </p>

        {/* Search Bar */}
        <div className="mb-8 flex gap-2">
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

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={onExplore}
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-gold to-gold-light text-navy font-semibold hover:shadow-glow-gold transition-all duration-200 transform hover:scale-105"
          >
            Explorar Agora
          </button>
          <button className="px-8 py-3 rounded-lg border border-gold/50 text-gold font-semibold hover:bg-gold/10 transition-all duration-200">
            Como Funciona
          </button>
        </div>

        {/* Social Proof */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
          <div className="flex -space-x-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-purple border-2 border-navy-light flex items-center justify-center text-white font-bold"
              >
                {i + 1}
              </div>
            ))}
          </div>
          <p className="text-gray-300">
            Junte-se a{' '}
            <span className="text-gold font-semibold">milhares de pessoas</span>{' '}
            que estão vivendo esta jornada de fé e conhecimento.
          </p>
        </div>
      </div>
    </section>
  );
}
