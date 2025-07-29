import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/templates/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                '3xl': '2000px',
            },
            backgroundImage: {
                'multi-gradient': 'linear-gradient(to right, var(--primary) 20%, var(--secondary) 50%, transparent 80%)',
            },
            colors: {
                // Branding e principais
                primary: '#FFFFFF ',
                secondary: '#3B82F6',
                tertiary: '#3B82F6',
                grafite: '#AC0F0A',
                aço: '#2F2F31',
                gelo: '#F5F5F5',
                bordo: '#7D1E2E',
                dourado: '#CBA135',
                cinzaClaro: '#B0B0B0',
                azulEscuro: '#1E3A8A',

                // Estados do sistema
                sucesso: '#4CAF50',
                erro: '#F44336',
                sistemaRed: '#DC2626',
                sistemaGreen: '#16A34A',
                sistemaYellow: '#F59E0B',
                sistemaBlue: '#3B82F6',

                // Botões
                btnPrimary: '#2563EB',
                btnHoverPrimary: '#284a87',
                btnActivePrimary: '#25324b',

                sistemaTransparent: 'transparent',
                darkBg: '#E4E5E7',             // Fundo geral cinza claro (menos branco, mais confortável)
                darkModal: '#cccccc',          // Cards, containers, inputs
                darkSelecao: '#f5fffa',        // Hover, seleção de item
                darkBorda: '#D4D5D8',          // Bordas de inputs, divisores, etc.
                darkSurface: '#F3F4F6',        // Superfícies levemente elevadas
                // Texto
                darkTexto: '#111827',
                darkTextoOff: '#374151',
                darkTextoDescricao: '#9CA3AF',
                darkTextoDescricaoOff: '#BBBBBB',

                // Design alternativo (d_)
                d_primary: '#142579',              // Texto/ação primária
                d_secondary: '#FFB100',            // Acento quente
                d_am_acento: '#1B9C85',            // Acento fresco
                d_am_fundo_c: '#FFF3E0',           // Fundo claro acolhedor
                d_am_fundo_e: '#3E2723',           // Fundo escuro base
                d_tx_primary: '#1A1A1A',           // Texto principal
                d_tx_secondary: '#7A7A7A',         // Texto secundário
                d_notificacao_erro: '#D80032',     // Alerta de erro
                d_notificacao_sucesso: '#2DBE60',  // Alerta de sucesso

                // Papéis e cargos
                admin: '#6A1B9A',
                user: '#607D8B',

                supervisor_junior: '#0288D1',
                supervisor_pleno: '#0277BD',
                supervisor_senior: '#01579B',

                gerente_junior: '#43A047',
                gerente_pleno: '#388E3C',
                gerente_senior: '#1B5E20',

                vendedor_junior: '#FB8C00',
                vendedor_pleno: '#F57C00',
                vendedor_senior: '#E65100',
            },

            fontSize: {
                sm: "12px",
                ssm: "10px",

            },
        },
    },
    plugins: [],
} satisfies Config;
