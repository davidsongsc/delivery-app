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
                primary: '#AC0F0A',
                grafite: '#1C1C1E',
                aço: '#2F2F31',
                gelo: '#F5F5F5',
                bordo: '#7D1E2E',
                dourado: '#CBA135',
                cinzaClaro: '#B0B0B0',
                sucesso: '#4CAF50',
                erro: '#F44336',
                azulEscuro: '#1E3A8A',

                d_primary: '#142579',            // Vermelho escuro vivo para textos (forte, apetite, destaque moderno)
                d_secondary: '#FFB100',          // Amarelo queimado (molhos, calor, jovial)
                d_am_acento: '#1B9C85',          // Verde teal profundo (frescura com personalidade)
                d_am_fundo_c: '#FFF3E0',         // Bege claro com toque quente (acolhedor e limpo)
                d_am_fundo_e: '#3E2723',         // Marrom intenso com tom de cacau (pão, carne, base sólida)
                d_tx_primary: '#1A1A1A',         // Preto realçado (alta legibilidade)
                d_tx_secondary: '#7A7A7A',       // Cinza médio (suporte sem roubar atenção)
                d_notificacao_erro: '#D80032',   // Vermelho vibrante para alertas
                d_notificacao_sucesso: '#2DBE60',// Verde neon equilibrado (positivo, fresh)
            },

            fontSize: {
                sm: "12px",
                ssm: "10px",

            },
        },
    },
    plugins: [],
} satisfies Config;
