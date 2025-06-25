import React from 'react';
import { Button } from 'antd';

export default function FinalCTASection() {
  return (
    <section className="w-full bg-indigo-600 py-16 text-white h-full">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Pronto para transformar sua gestão?
        </h2>
        <p className="text-lg md:text-xl mb-10 opacity-90">
          Comece agora mesmo com 7 dias grátis. Sem compromisso e sem cartão de crédito.
        </p>
        <div className="flex justify-center gap-4">
          <Button type="primary" size="large" className="bg-white text-indigo-600 font-semibold px-8 py-3 rounded-2xl">
            Começar Grátis
          </Button>
          <Button type="default" size="large" ghost className="border-white text-white px-8 py-3 rounded-2xl">
            Ver Planos
          </Button>
        </div>
      </div>
    </section>
  );
}
