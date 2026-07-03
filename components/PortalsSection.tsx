'use client';

import React from 'react';
import PortalCard from './PortalCard';

export default function PortalsSection() {
  const portals = [
    {
      number: '01',
      title: 'Antigo Testamento',
      subtitle: 'Aliança, Promessas e História',
      href: '/antigo-testamento',
      color: 'gold' as const,
      icon: '📜',
    },
    {
      number: '02',
      title: 'Novo Testamento',
      subtitle: 'Vida, Graça, Redenção e Esperança',
      href: '/novo-testamento',
      color: 'purple' as const,
      icon: '✨',
    },
    {
      number: '03',
      title: 'Contemporaneidade',
      subtitle: 'Vida Cristã, Atualidade e Apocalipse',
      href: '/contemporaneidade',
      color: 'crimson' as const,
      icon: '🌍',
    },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-gold rounded-full mix-blend-screen filter blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple rounded-full mix-blend-screen filter blur-3xl animate-pulse-glow"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Sua Jornada Espiritual
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Escolha seu caminho e mergulhe nas três dimensões principais das
            Escrituras
          </p>
        </div>

        {/* Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {portals.map((portal) => (
            <PortalCard
              key={portal.title}
              number={portal.number}
              title={portal.title}
              subtitle={portal.subtitle}
              href={portal.href}
              color={portal.color}
              icon={portal.icon}
            />
          ))}
        </div>

        {/* Timeline line visualization */}
        <div className="mt-20 pt-20 border-t border-gold/20">
          <h3 className="text-2xl font-bold text-center mb-12">
            A Linha do Tempo do Evangelho
          </h3>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>

            {/* Timeline markers */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { title: 'Criação', subtitle: 'Início dos Tempos' },
                { title: 'Aliança', subtitle: '~2000 a.C.' },
                { title: 'Vida de Cristo', subtitle: '~30 d.C.' },
                { title: 'Igreja', subtitle: 'Século I' },
                { title: 'Eternidade', subtitle: 'Futuro' },
              ].map((marker, index) => (
                <div key={index} className="flex flex-col items-center pt-8">
                  {/* Marker circle */}
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-gold to-gold-light border-2 border-navy mb-4 relative z-10"></div>

                  {/* Text */}
                  <h4 className="font-semibold text-white text-center text-sm md:text-base">
                    {marker.title}
                  </h4>
                  <p className="text-xs md:text-sm text-gray-400 text-center mt-1">
                    {marker.subtitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
