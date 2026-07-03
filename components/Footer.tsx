'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy/50 backdrop-blur-sm border-t border-gold/20 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold gradient-text mb-4">
              evangelho.wiki
            </div>
            <p className="text-gray-400 text-sm">
              Sua jornada pela linha do tempo do Evangelho começa aqui.
            </p>
          </div>

          {/* Conteúdo */}
          <div>
            <h4 className="font-semibold text-white mb-4">Conteúdo</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/antigo-testamento"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  Antigo Testamento
                </Link>
              </li>
              <li>
                <Link
                  href="/novo-testamento"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  Novo Testamento
                </Link>
              </li>
              <li>
                <Link
                  href="/atualidade"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  Atualidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Recursos */}
          <div>
            <h4 className="font-semibold text-white mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/recursos"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  Ferramentas de Estudo
                </Link>
              </li>
              <li>
                <Link
                  href="/planos"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  Planos de Leitura
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  Tutoriais
                </Link>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-semibold text-white mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/sobre"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-gray-400 hover:text-gold transition-colors duration-200"
                >
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/20 pt-8">
          <p className="text-center text-gray-400 text-sm">
            © {currentYear} evangelho.wiki. Todos os direitos reservados. Dedicado
            à glorificação de Jesus Cristo e à disseminação das Escrituras.
          </p>
        </div>
      </div>
    </footer>
  );
}
