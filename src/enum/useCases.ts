export interface UseCase {
  title: string
  description: string
}

export const useCases: UseCase[] = [
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

