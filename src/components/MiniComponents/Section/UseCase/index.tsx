import React from 'react';
import { CheckCircleTwoTone } from '@ant-design/icons';

const useCases = [
    {
        title: 'Restaurantes',
        description: 'Gerencie mesas, pedidos, entregas e pagamentos com eficiência.',
    },
    {
        title: 'Lanchonetes',
        description: 'Controle pedidos rápidos, estoque e fluxo de caixa com facilidade.',
    },
    {
        title: 'Quiosques',
        description: 'Otimize o atendimento e acompanhe as vendas em tempo real.',
    },
    {
        title: 'Bares',
        description: 'Gerencie comandas, estoque de bebidas e atendimento ao cliente.',
    },
    {
        title: 'Conveniências',
        description: 'Controle inventário, registre vendas e acompanhe o faturamento diário.',
    },
    {
        title: 'Lojas de roupas',
        description: 'Gerencie produtos, promoções e fidelize seus clientes.',
    },
    {
        title: 'Barbearias',
        description: 'Agende cortes, controle pagamentos e organize o atendimento.',
    },
    {
        title: 'Salões de beleza',
        description: 'Agende serviços, organize a equipe e acompanhe o histórico de clientes.',
    },
    {
        title: 'Clínicas estéticas',
        description: 'Gerencie procedimentos, horários e fichas de pacientes com segurança.',
    },
];


export default function UseCasesSection() {
    return (
        <section className="w-full py-16 bg-white text-gray-800">
            <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-10">Para quem é o sistema?</h2>

                <div className="grid md:grid-cols-3 gap-8">
                    {useCases.map((item, index) => (
                        <div key={index} className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer">
                            <CheckCircleTwoTone twoToneColor="#52c41a" className="text-3xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
