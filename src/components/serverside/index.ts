import { ICupom } from "@/interfaces/ICupom";
import { IProduto } from "@/interfaces/IProduto";

export const cliente =
{
    id: 1,
    nome: "Joaquim Barbosa",
    telefone: "21333913339",
    email: "joaquim@gmail.com",
    cpf: "12345678901",
    endereco:
    {
        id: 1,
        rua: "Rua Salomão loja A, 123",
        cep: "12345678",
        bairro: "Centro",
        cidade: "Rio de Janeiro",
        uf: "RJ"
    }
};
export const loja = {
    id: 1,
    nome: "Hamburgueria Barroso",
    endereco: "Rua Salomão loja A, 123",
    telefone: "21983108439",
    cnpj: "12345678000195",
    cep: "12345678",
    bairro: "Centro",
    cidade: "Rio de Janeiro",
    uf: "RJ"
};
export const pedido = {
    id: 1514,
    data: '19/04/2023',
    hora: '22:43:15',
    itens: [
        {
            id: 1,
            nome: "X-Burguer",
            valor: 10.99,
            desconto: 0,
            remover: ['picles', 'cebola'],
            adicionar: [{ item: 'Carne Extra', valor: .95 }, { item: 'Queijo Extra', valor: .95 }, { item: 'Molho Verde', valor: .95 }, 'alface', 'tomate'],
            quantidade: 1,
            categoria: 'hamburguer',
            descricao: 'Hambúrguer simples com queijo, picles, cebola e adicionais personalizáveis.'
        },
        {
            id: 2,
            nome: "X-Tudo",
            valor: 14.99,
            desconto: 0,
            remover: ['ovo'],
            adicionar: [{ item: 'alface', valor: 0.49 }, { item: 'tomate', valor: 0.49 }],
            quantidade: 1,
            categoria: 'hamburguer',
            descricao: 'Hambúrguer simples com queijo, picles, cebola e adicionais personalizáveis.'
        }, {
            id: 3,
            nome: "Esfirra Carne",
            valor: 2.99,
            desconto: .49,
            remover: [],
            adicionar: [],
            quantidade: 1,
            categoria: 'esfirra',
            descricao: 'Esfirra de carne de boi, servida com molho de tomate.'
        },
        {
            id: 4,
            nome: "Esfirra Frango",
            valor: 2.49,
            desconto: .49,
            remover: [],
            adicionar: [],
            quantidade: 1,
            categoria: 'esfirra',
            descricao: 'Esfirra de carne de frango, servida com molho de tomate.'
        },
        {
            id: 5,
            nome: "Pizza M Portuguêsa",
            valor: 49.49,
            desconto: .49,
            remover: [],
            adicionar: [{ item: 'Coca-Cola 2L', valor: 8.75 }],
            quantidade: 1,
            categoria: 'pizza',
            descricao: 'Pizza de molho de tomate, mussarela, presunto, ovo e azeitonas.'
        },
        {
            id: 6,
            nome: "Costela Suina Master",
            valor: 79.49,
            desconto: .49,
            remover: [],
            adicionar: [{ item: 'Molho Barbecue', valor: 1.75 }],
            quantidade: 1,
            categoria: 'costela',
            descricao: 'Costela suína Master, servida com molho barbecue.'
        }
    ]
}

export const adicionaisPorCategoria: Record<string, ({ item: string, valor: number } | string)[]> = {
    Lanches: [
        { item: 'Carne Extra', valor: 0.95 },
        { item: 'Queijo Extra', valor: 0.95 },
        { item: 'Molho Verde', valor: 0.95 },
        'alface',
        'tomate',
    ],
    Esfirras: [],
    Pizzas: [
        { item: 'Coca-Cola 2L', valor: 8.75 },
        { item: 'Borda Recheada', valor: 5.00 },
    ],
    Carnes: [
        { item: 'Molho Barbecue', valor: 1.75 }
    ],
};


export const listaProdutos: IProduto[] = [
    {
        id: '1',
        nome: 'Hamburguer',
        descricao: 'Hambúrguer simples com queijo, picles, cebola e adicionais personalizáveis. Hambúrguer simples com queijo, picles, cebola e adicionais personalizáveis. Hambúrguer simples com queijo, picles, cebola e adicionais personalizáveis.',
        valor: 10.99,
        imagem: '/imgs/xburguer.jpg',
        categoria: 'Lanches',
        composicao: ['pão', 'hambúrguer', 'queijo', 'picles', 'cebola'],

    },
    {
        id: '2',
        nome: 'Cheeseburguer',
        descricao: 'Hambúrguer completo com tudo: ovo, alface, tomate e mais.',
        valor: 11.99,
        imagem: '/imgs/xtudo.jpg',
        categoria: 'Lanches',
        composicao: ['pão', 'hambúrguer', 'queijo', 'picles', 'cebola'],

    },
    {
        id: '3',
        nome: 'Esfirra Carne',
        descricao: 'Esfirra aberta recheada com carne temperada.',
        valor: 2.99,
        imagem: '/imgs/esfirra-carne.jpg',
        categoria: 'Esfirras',
        composicao: ['cebola'],

    },
    {
        id: '4',
        nome: 'Esfirra Frango',
        descricao: 'Esfirra aberta recheada com frango desfiado e temperado.',
        valor: 2.49,
        imagem: '/imgs/esfirra-frango.jpg',
        categoria: 'Esfirras',
        composicao: ['cebola'],
    },
    {
        id: '5',
        nome: 'Pizza M Portuguêsa',
        descricao: 'Pizza média sabor portuguesa. Pode adicionar bebida ou acompanhamentos.',
        valor: 49.49,
        imagem: '/imgs/pizza-portuguesa.jpg',
        categoria: 'Pizzas',
        composicao: ['cebola'],
    },
    {
        id: '6',
        nome: 'Costela Suina Master',
        descricao: 'Costela suína assada lentamente com opção de molho barbecue.',
        valor: 79.49,
        imagem: '/imgs/costela.jpg',
        categoria: 'Carnes',
        composicao: ['molho'],
    }, {
        id: '7',
        nome: 'Hamburguer Duplo',
        descricao: 'Hambúrguer simples com queijo, picles, cebola e adicionais personalizáveis. Hambúrguer simples com queijo, picles, cebola e adicionais personalizáveis. Hambúrguer simples com queijo, picles, cebola e adicionais personalizáveis.',
        valor: 13.99,
        imagem: '/imgs/xburguer.jpg',
        categoria: 'Lanches',
        composicao: ['pão', 'hambúrguer', 'queijo', 'picles', 'cebola'],

    },
    {
        id: '8',
        nome: 'Cheeseburguer Duplo',
        descricao: 'Hambúrguer completo com tudo: ovo, alface, tomate e mais.',
        valor: 15.99,
        imagem: '/imgs/xtudo.jpg',
        categoria: 'Lanches',
        composicao: ['pão', 'hambúrguer', 'queijo', 'picles', 'cebola'],

    }
].map(produto => ({
    ...produto,
    adicionar: (adicionaisPorCategoria[produto.categoria] || []).map(item =>
        typeof item === 'string'
            ? { item, valor: 0 }
            : item
    ),

    remover: [],
    desconto: 0,
    quantidade: 1,
}));
export const listaCupons: ICupom[] = [
    { codigo: 'desconto10', tipo: 'valor', valor: 10, usosRestantes: 5 },
    { codigo: 'desconto20', tipo: 'valor', valor: 20, usosRestantes: 3 },
    { codigo: '35off', tipo: 'porcentagem', valor: 35, usosRestantes: 100 },
    { codigo: 'entregaOff', tipo: 'valor', valor: 6.5, usosRestantes: 100 },
];

