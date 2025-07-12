import React, { useEffect, useState } from 'react'
import { CheckCircleTwoTone } from '@ant-design/icons'
import useMediaQuery from '@/hooks/useMediaQuery'

interface UseCase {
  title: string
  description: string
}

const useCases: UseCase[] = [
    // Setor de Alimentação
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

    // Setor de Varejo e Serviços
    {
        title: 'Lojas de Roupas',
        description: 'Gerencie produtos, promoções e fidelize seus clientes.',
    },
    {
        title: 'Conveniências',
        description: 'Controle inventário, registre vendas e acompanhe o faturamento diário.',
    },
    {
        title: 'Barbearias',
        description: 'Agende cortes, controle pagamentos e organize o atendimento.',
    },
    {
        title: 'Salões de Beleza',
        description: 'Agende serviços, organize a equipe e acompanhe o histórico de clientes.',
    },
    {
        title: 'Clínicas Estéticas',
        description: 'Gerencie procedimentos, horários e fichas de pacientes com segurança.',
    },
    {
        title: 'Consultórios Médicos',
        description: 'Controle agendamentos, prontuários eletrônicos e histórico de pacientes.',
    },

    // Novos Setores
    {
        title: 'Lojas de Carros',
        description: 'Gerencie o estoque de veículos, leads de vendas e o pós-venda.',
    },
    {
        title: 'Corretoras',
        description: 'Otimize a gestão de clientes, propostas e o controle de contratos.',
    },
    {
        title: 'Academias',
        description: 'Gerencie planos, matrículas, horários de aulas e avaliações físicas.',
    },
    {
        title: 'E-commerce',
        description: 'Automatize a gestão de pedidos, estoque, envios e pagamentos online.',
    },
    {
        title: 'Consultorias',
        description: 'Organize projetos, controle horas de trabalho e gerencie a carteira de clientes.',
    },
    {
        title: 'Agências de Viagem',
        description: 'Automatize reservas, pacotes turísticos e a comunicação com clientes.',
    },
];


export default function UseCasesSection() {
  const [visibleItems, setVisibleItems] = useState<UseCase[]>([])

  useEffect(() => {
    // Função tipada corretamente
    const shuffleArray = (array: UseCase[]): UseCase[] => {
      const shuffled = [...array]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      return shuffled
    }

    const randomItems = shuffleArray(useCases).slice(0, 6)
    setVisibleItems(randomItems)
  }, [])

  return (
    <section className="w-full py-16 bg-white text-gray-800">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10">Para quem é o sistema?</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {visibleItems.map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <CheckCircleTwoTone twoToneColor="#52c41a" className="text-3xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}