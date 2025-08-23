'use client'

import React from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaInstagram, FaPhone } from 'react-icons/fa';

export default function FooterDelivery() {
  return (
    <footer className="bg-gray-900 text-gray-100 py-6 px-4 mt-auto relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold">Nosso Delivery</h2>
          <p className="text-sm">Aberto todos os dias das 18h às 23h</p>
          <p className="text-sm">Entrega rápida e segura 🚴‍♂️</p>
        </div>

        <div className="flex gap-4 text-xl">
          <Link href="tel:+5511999999999" className="hover:text-green-400">
            <FaPhone />
          </Link>
          <Link href="https://wa.me/5511999999999" target="_blank" className="hover:text-green-500">
            <FaWhatsapp />
          </Link>
          <Link href="https://instagram.com/seu_delivery" target="_blank" className="hover:text-pink-400">
            <FaInstagram />
          </Link>
        </div>
      </div>
      
      <div className="mt-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Seu Delivery - Todos os direitos reservados
      </div>
    </footer>
  );
}
