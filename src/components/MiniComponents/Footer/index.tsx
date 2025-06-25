import React from 'react';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

export default function FooterSection() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo e descrição */}
        <div>
          <h3 className="text-xl font-bold text-white mb-2">Lojavel</h3>
          <p className="text-sm">
            Plataforma inteligente para gestão de barbearias, salões e clínicas. Simples, eficiente e moderna.
          </p>
        </div>

        {/* Links úteis */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Links úteis</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Sobre</a></li>
            <li><a href="#" className="hover:text-white">Planos</a></li>
            <li><a href="#" className="hover:text-white">Contato</a></li>
            <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
            <li><a href="#" className="hover:text-white">Termos de Uso</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Contato</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <MailOutlined /> suporte@barbersaas.com
            </li>
            <li className="flex items-center gap-2">
              <PhoneOutlined /> (21) 95872-5380
            </li>
            <li className="flex items-center gap-2">
              <EnvironmentOutlined /> São Paulo, SP
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-10">
        &copy; {new Date().getFullYear()} BarberSaaS. Todos os direitos reservados.
      </div>
    </footer>
  );
}
