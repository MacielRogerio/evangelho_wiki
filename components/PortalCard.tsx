'use client';

import React from 'react';
import Link from 'next/link';

interface PortalCardProps {
  number: string;
  title: string;
  subtitle: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel: string;
  icon?: React.ReactNode;
  color?: 'gold' | 'purple' | 'crimson';
}

export default function PortalCard({
  number,
  title,
  subtitle,
  href,
  imageSrc,
  imageAlt,
  ctaLabel,
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
    <Link href={href} className="group block h-full" aria-label={`Abrir ${title}`}>
      <div
        className={`relative flex h-full min-h-[230px] overflow-hidden rounded-lg border bg-navy-light/35 backdrop-blur-xl transition-all duration-300 cursor-pointer ${classes.cardBorder} ${classes.glow} hover:-translate-y-1 hover:border-opacity-100`}
      >
        <div className={`absolute inset-0 ${classes.gradient} opacity-90 pointer-events-none`} />
        <div className={`absolute inset-0 ${classes.overlay} pointer-events-none`} />
        <div className={`absolute ${classes.extra1} pointer-events-none`} />
        <div className={`absolute ${classes.extra2} pointer-events-none`} />
        <div className="relative z-10 grid w-full grid-cols-[112px_1fr] gap-4 p-4 sm:grid-cols-[128px_1fr]">
          <div className="relative overflow-hidden rounded-lg border border-white/10 bg-navy">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full min-h-[196px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />
            <div className={`absolute left-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-lg ${classes.iconBg} text-xl shadow-lg shadow-black/20`}>
              {icon}
            </div>
          </div>

          <div className="flex min-w-0 flex-col justify-between py-1">
            <div>
              <span className={`mb-3 inline-flex items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${classes.numberBg}`}>
                {number}
              </span>

              <h3 className="mb-2 text-xl font-bold leading-tight text-white sm:text-2xl">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-300">
                {subtitle}
              </p>
            </div>

            <div className="mt-5 flex items-center gap-3 text-sm font-semibold text-white/90 group-hover:text-white">
              <span className={`inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 underline decoration-transparent underline-offset-4 transition-colors duration-200 group-hover:decoration-current ${classes.accent}`}>
                {ctaLabel}
                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
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
      </div>
    </Link>
  );
}
