'use client';

import React from 'react';
import Link from 'next/link';

interface PortalCardProps {
  number: string;
  title: string;
  subtitle: string;
  href: string;
  icon?: React.ReactNode;
  color?: 'gold' | 'purple' | 'crimson';
}

export default function PortalCard({
  number,
  title,
  subtitle,
  href,
  icon,
  color = 'gold',
}: PortalCardProps) {
  const classes = {
    cardBorder: 'border-gold/30 hover:border-gold',
    glow: 'shadow-[0_25px_70px_rgba(212,175,55,0.18)] hover:shadow-[0_30px_90px_rgba(212,175,55,0.22)]',
    gradient: 'bg-gradient-to-br from-gold/20 via-gold/10 to-transparent',
    overlay: 'bg-[radial-gradient(circle_at_top_left,rgba(255,223,104,0.22),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(97,56,172,0.12),transparent_22%)]',
    extra1: '-top-10 left-8 h-32 w-32 rounded-full bg-[#f7e3a0]/20 blur-3xl',
    extra2: '-bottom-10 right-10 h-24 w-24 rounded-full bg-[#7c3aed]/10 blur-3xl',
    iconBg: 'bg-gold/15 text-gold',
    numberBg: 'bg-gold/20 text-gold',
    accent: 'text-gold',
  };

  if (color === 'purple') {
    classes.cardBorder = 'border-purple/30 hover:border-purple';
    classes.glow = 'shadow-[0_25px_70px_rgba(109,40,217,0.16)] hover:shadow-[0_30px_90px_rgba(109,40,217,0.22)]';
    classes.gradient = 'bg-gradient-to-br from-purple/20 via-[#1e3a8a]/10 to-transparent';
    classes.overlay = 'bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.14),transparent_24%)]';
    classes.extra1 = '-top-8 right-10 h-28 w-28 rounded-full bg-[#d8b4fe]/10 blur-3xl';
    classes.extra2 = '-bottom-10 left-6 h-20 w-20 rounded-full bg-sky-200/10 blur-3xl';
    classes.iconBg = 'bg-purple/15 text-purple';
    classes.numberBg = 'bg-purple/20 text-purple';
    classes.accent = 'text-purple';
  } else if (color === 'crimson') {
    classes.cardBorder = 'border-crimson/30 hover:border-crimson';
    classes.glow = 'shadow-[0_25px_70px_rgba(220,38,38,0.16)] hover:shadow-[0_30px_90px_rgba(220,38,38,0.22)]';
    classes.gradient = 'bg-gradient-to-br from-crimson/15 via-cyan/10 to-transparent';
    classes.overlay = 'bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(248,113,113,0.12),transparent_26%)]';
    classes.extra1 = '-top-10 left-8 h-28 w-28 rounded-full bg-cyan/10 blur-3xl';
    classes.extra2 = '-bottom-8 right-10 h-24 w-24 rounded-full bg-crimson/10 blur-3xl';
    classes.iconBg = 'bg-cyan/10 text-cyan-200';
    classes.numberBg = 'bg-crimson/20 text-crimson';
    classes.accent = 'text-crimson';
  }

  return (
    <Link href={href} className="group">
      <div
        className={`relative overflow-hidden rounded-[2rem] border-2 bg-navy-light/20 backdrop-blur-xl transition-all duration-300 cursor-pointer ${classes.cardBorder} ${classes.glow} hover:scale-[1.02] hover:border-opacity-100 hover:shadow-[0_40px_120px_rgba(255,255,255,0.14)]`}
      >
        <div className={`absolute inset-0 ${classes.gradient} opacity-90 pointer-events-none`} />
        <div className={`absolute inset-0 ${classes.overlay} pointer-events-none`} />
        <div className={`absolute ${classes.extra1} pointer-events-none`} />
        <div className={`absolute ${classes.extra2} pointer-events-none`} />
        <div className="relative z-10 p-8 min-h-[320px] flex flex-col justify-between">
          <div className="flex items-center justify-between gap-4 mb-8">
            <span className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${classes.numberBg}`}>
              {number}
            </span>
            <div className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl ${classes.iconBg} text-2xl shadow-lg shadow-black/10`}> 
              {icon}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold text-white mb-3 leading-tight">
              {title}
            </h3>
            <p className="text-sm md:text-base text-gray-300 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm font-semibold text-white/90 group-hover:text-white">
            <span className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 ${classes.accent}`}>
              Explorar
              <svg
                className="w-4 h-4"
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
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
