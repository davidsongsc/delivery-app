import React from 'react';
import { Button } from 'antd';
import { WhatsAppOutlined } from '@ant-design/icons';
import Head from 'next/head';

const QuickHelp: React.FC = () => {
  return (
    <>
      <Head>
        <title>🚀 Soluções Rápidas em TI – Chama no WhatsApp!</title>
        <meta
          property="og:title"
          content="Soluções Rápidas em TI – Chama no WhatsApp!"
        />
        <meta
          property="og:description"
          content="Criação de telas, automações, integrações e ajustes rápidos. Atendimento ágil e direto."
        />
        <meta
          property="og:url"
          content="https://lojavel.com.br"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md sm:w-[90%] border-b-4 border-indigo-500 transform transition duration-500 hover:scale-105">
          <div className="text-center mb-6">
            <div className="bg-indigo-500 p-4 rounded-full inline-block shadow-lg mb-4">
              <i className="fas fa-tools text-white text-4xl" aria-hidden="true"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              PRECISANDO DE AJUDA RÁPIDA COM SISTEMAS?
            </h1>
            <p className="text-gray-600">Sua solução em TI está aqui!</p>
          </div>

          <div className="space-y-4 mb-8">
            {[
              {
                icon: 'fas fa-desktop',
                text: 'Criação de Telas personalizadas.',
              },
              {
                icon: 'fas fa-plug',
                text: 'Integrações de sistemas existentes.',
              },
              {
                icon: 'fas fa-robot',
                text: 'Automações para otimizar seu tempo.',
              },
              {
                icon: 'fas fa-sliders-h',
                text: 'Pequenos ajustes e melhorias.',
              },
            ].map(({ icon, text }, idx) => (
              <div
                key={idx}
                className="flex items-center bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <i className={`${icon} text-indigo-500 text-2xl mr-4`} aria-hidden="true"></i>
                <p className="text-gray-700 font-semibold">{text}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-8">
            <p className="text-lg font-bold text-gray-800 mb-2">Por que me escolher?</p>
            <ul className="list-disc list-inside text-gray-600 text-left mx-auto max-w-xs">
              <li>
                <span className="font-semibold text-indigo-600">Rápido:</span> Soluções ágeis para suas urgências.
              </li>
              <li>
                <span className="font-semibold text-indigo-600">Barato:</span> Preços competitivos que cabem no seu bolso.
              </li>
              <li>
                <span className="font-semibold text-indigo-600">Qualidade:</span> Trabalho feito com excelência e atenção aos detalhes.
              </li>
            </ul>
          </div>

          <div className="text-center">
            <p className="text-xl font-bold text-gray-800 mb-4">Chame aqui no WhatsApp!</p>
            <Button
              type="primary"
              shape="round"
              size="large"
              icon={<WhatsAppOutlined />}
              href="https://wa.me/5521978525380"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 flex items-center justify-center font-bold transition duration-300 transform hover:scale-105"
            >
              (21) 9 7852 5380
            </Button>
            <p className="text-sm text-indigo-600 mt-2 font-semibold">
              ⚡ Vagas limitadas para hoje – atendimento por ordem de chegada!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickHelp;
