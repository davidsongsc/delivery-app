import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const faqItems = [
  {
    question: 'Preciso de cartão de crédito para testar?',
    answer:
      'Não! Você pode testar gratuitamente por 7 dias sem precisar inserir nenhum dado de pagamento.',
  },
  {
    question: 'Posso cancelar a qualquer momento?',
    answer:
      'Sim, o cancelamento pode ser feito a qualquer momento diretamente no painel administrativo, sem burocracia.',
  },
  {
    question: 'O sistema funciona em celular?',
    answer:
      'Sim! Nossa plataforma é responsiva e funciona perfeitamente em smartphones, tablets e computadores.',
  },
  {
    question: 'Consigo controlar mais de uma unidade?',
    answer:
      'Sim, você pode gerenciar múltiplas unidades a partir de uma única conta, com relatórios separados por local.',
  },
  {
    question: 'Há suporte incluso no plano?',
    answer:
      'Sim, todos os planos incluem suporte humanizado via chat e e-mail 24/7.',
  },
];

export default function FAQSection() {
  return (
    <section className="w-full py-20 bg-gray-50 text-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Perguntas frequentes</h2>
        <Collapse accordion bordered={false} className="bg-white rounded-xl shadow-md">
          {faqItems.map((item, index) => (
            <Panel header={item.question} key={index}>
              <p className="text-gray-700 leading-relaxed">{item.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </div>
    </section>
  );
}
