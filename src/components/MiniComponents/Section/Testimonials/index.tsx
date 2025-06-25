import React from 'react';
import { Avatar } from 'antd';
import { StarFilled } from '@ant-design/icons';

const testimonials = [
  {
    name: 'Carlos Henrique',
    role: 'Dono da Barbearia Fino Corte',
    comment:
      'O sistema facilitou muito meu dia a dia. Agora meus clientes agendam sozinhos e tenho total controle do fluxo.',
    avatar: '/images/avatar1.png',
  },
  {
    name: 'Mariana Souza',
    role: 'Gerente do Espaço Beleza VIP',
    comment:
      'A interface é super intuitiva. Em poucos dias já estávamos com tudo funcionando perfeitamente.',
    avatar: '/images/avatar2.png',
  },
  {
    name: 'João Lima',
    role: 'Proprietário da Clínica Estética Renovar',
    comment:
      'Consegui aumentar minha receita e reduzir cancelamentos. Recomendo demais!',
    avatar: '/images/avatar3.png',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full bg-gray-50 py-20 text-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">O que estão dizendo?</h2>

        <div className="grid gap-10 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition duration-300 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar src={item.avatar} size={48} />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <StarFilled key={i} className="text-yellow-400" />
                  ))}
              </div>
              <p className="text-gray-700 italic">"{item.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
