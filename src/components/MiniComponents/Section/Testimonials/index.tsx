import React, { useEffect, useMemo, useState } from 'react';
import { Avatar } from 'antd';
import { StarFilled } from '@ant-design/icons';

const testimonials = [
  {
    name: 'Carlos Henrique',
    role: 'Dono da Barbearia Fino Corte',
    comment:
      'O sistema facilitou muito meu dia a dia. Agora meus clientes agendam sozinhos e tenho total controle do fluxo.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Mariana Souza',
    role: 'Gerente do Espaço Beleza VIP',
    comment:
      'A interface é super intuitiva. Em poucos dias já estávamos com tudo funcionando perfeitamente.',
    avatar: 'https://randomuser.me/api/portraits/women/31.jpg',
  },
  {
    name: 'João Lima',
    role: 'Proprietário da Clínica Estética Renovar',
    comment:
      'Consegui aumentar minha receita e reduzir cancelamentos. Recomendo demais!',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    name: 'Fernanda Dias',
    role: 'Dona do Salão Bella Mulher',
    comment:
      'Consigo ver todos os agendamentos do dia com facilidade. Ganhamos agilidade no atendimento.',
    avatar: 'https://randomuser.me/api/portraits/women/35.jpg',
  },
  {
    name: 'Ricardo Melo',
    role: 'Gerente do Bar Ponto Cervejeiro',
    comment:
      'O sistema de comandas e controle de estoque ajudou demais nosso time.',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
  },
  {
    name: 'Aline Martins',
    role: 'Proprietária do Café Delícia',
    comment:
      'Simples, bonito e funcional. Agora acompanho minhas vendas em tempo real.',
    avatar: 'https://randomuser.me/api/portraits/women/39.jpg',
  },
  {
    name: 'Thiago Rocha',
    role: 'Dono da Loja Estilo Roupas',
    comment:
      'O controle de estoque e promoções me ajudou a vender mais. Excelente!',
    avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
  },
  {
    name: 'Bruna Alves',
    role: 'Gestora da Clínica Essencial',
    comment:
      'Agora temos histórico completo dos pacientes e os horários estão sempre organizados.',
    avatar: 'https://randomuser.me/api/portraits/women/40.jpg',
  },
  {
    name: 'Gustavo Ferreira',
    role: 'Gerente do Quiosque Sabor Tropical',
    comment:
      'Nunca foi tão fácil registrar vendas e saber exatamente o que está saindo mais.',
    avatar: 'https://randomuser.me/api/portraits/men/30.jpg',
  },
  {
    name: 'Patrícia Lima',
    role: 'Dona da Lanchonete Pit Stop',
    comment:
      'O sistema agilizou nossos pedidos e facilitou muito o controle de caixa.',
    avatar: 'https://randomuser.me/api/portraits/women/43.jpg',
  },
  {
    name: 'Eduardo Nascimento',
    role: 'Sócio do Espaço Homem',
    comment:
      'Com os agendamentos automáticos, reduzi faltas e organizei melhor a equipe.',
    avatar: 'https://randomuser.me/api/portraits/men/26.jpg',
  },
  {
    name: 'Larissa Gomes',
    role: 'Proprietária da Boutique Glamour',
    comment:
      'Acompanhar o faturamento nunca foi tão simples. Estou muito satisfeita.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
];

export default function TestimonialsSection() {
  const [visibleTestimonials, setVisibleTestimonials] = useState<
    { name: string; role: string; comment: string; avatar: string; rating: number }[]
  >([]);

  useEffect(() => {
    const shuffled = [...testimonials].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3).map((t) => ({
      ...t,
      rating: Math.floor(Math.random() * 2) + 4, // 4 ou 5
    }));
    setVisibleTestimonials(selected);
  }, []);

  return (
    <section className="w-full bg-gray-50  text-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center py-20">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">O que nossos clientes dizem</h2>

        <div className="grid gap-10 md:grid-cols-3">
          {visibleTestimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition duration-300 text-left"
            >
              <div className="flex items-center gap-4 mb-4">
                <Avatar src={item.avatar} size={52} />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-2">
                {/* Render filled stars */}
                {Array.from({ length: item.rating }).map((_, i) => (
                  <StarFilled key={`filled-${i}`} className="text-yellow-400" />
                ))}
                {/* Render empty stars */}
                {Array.from({ length: 5 - item.rating }).map((_, i) => (
                  <StarFilled key={`empty-${i}`} className="text-gray-300" /> // Use a gray class for empty stars
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