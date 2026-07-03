'use client';

import React from 'react';
import VideoCard from './VideoCard';

export default function VideosSection() {
  const videos = [
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
  ];

  return (
    <section className="py-20 px-4 bg-navy-light/30 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Comece sua jornada em poucos minutos
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Assista aos vídeos rápidos abaixo e descubra como navegar pelo
            evangelho.wiki e aproveitar ao máximo cada recurso.
          </p>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {videos.map((video) => (
            <VideoCard
              key={video.title}
              title={video.title}
              description={video.description}
              duration={video.duration}
              thumbnailColor={video.thumbnailColor}
            />
          ))}
        </div>

        {/* View All Link */}
        <div className="flex justify-center">
          <a
            href="/videos"
            className="inline-flex items-center gap-2 text-gold font-semibold hover:text-gold-light transition-colors duration-200"
          >
            <span>Ver todos os vídeos e tutoriais</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
