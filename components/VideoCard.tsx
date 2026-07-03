'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';

interface VideoCardProps {
  title: string;
  description: string;
  duration: string;
  thumbnailColor?: string;
}

export default function VideoCard({
  title,
  description,
  duration,
  thumbnailColor = 'from-purple to-crimson',
}: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group cursor-pointer"
    >
      {/* Video Thumbnail */}
      <div className={`relative rounded-lg overflow-hidden mb-4 transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
        <div className={`w-full aspect-video bg-gradient-to-br ${thumbnailColor} opacity-80`}></div>

        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300">
          <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-gold to-gold-light flex items-center justify-center transform transition-all duration-300 ${isHovered ? 'scale-100' : 'scale-0'}`}>
            <Play size={24} className="text-navy fill-navy" />
          </div>
        </div>

        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 bg-navy/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gold">
          {duration}
        </div>
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gold transition-colors duration-200">
        {title}
      </h3>
      <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-200">
        {description}
      </p>
    </div>
  );
}
