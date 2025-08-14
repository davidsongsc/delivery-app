import getUserPermissions from '@/utils/permissions';
import { MenuProps } from 'antd';

export const generateMenuItems = (user: any): MenuProps['items'] => {
    const permissions = typeof window !== 'undefined' && user ? getUserPermissions(user) : [];
    return [
        {
            key: 'sistema',
            label: 'Sistema',
            children: [
                permissions.includes('sistema_configuracoes') && {
                    key: '/dashboard/configuracoes/sistema',
                    label: 'Configurações',
                },
                permissions.includes('sistema_logs') && {
                    key: '/dashboard/configuracoes/logs',
                    label: 'Logs',
                },
                permissions.includes('sistema_empresas') && {
                    key: '/dashboard/configuracoes/empresas',
                    label: 'Empresas',
                },
                permissions.includes('permissoes_visualizar') && {
                    key: '/dashboard/configuracoes/permissoes',
                    label: 'Permissões',
                },
            ].filter(Boolean),
        },
        {
            key: 'usuarios',
            label: 'Usuários',
            children: [
                permissions.includes('usuarios_listar') && {
                    key: 'equipe',
                    label: 'Equipe',
                    children: [
                        permissions.includes('usuarios_colaborador') && {
                            key: '/dashboard/configuracoes/usuarios',
                            label: 'Colaboradores',
                        },
                        permissions.includes('usuarios_afiliados') && {
                            key: '/dashboard/configuracoes/afiliados',
                            label: 'Afiliados',
                        },
                        permissions.includes('usuarios_fornecedores') && {
                            key: '/dashboard/configuracoes/fornecedores',
                            label: 'Fornecedores',
                        },
                        permissions.includes('usuarios_gerentes') && {
                            key: '/dashboard/configuracoes/gerentes',
                            label: 'Gerentes',
                        },
                    ].filter(Boolean),

                },

                permissions.includes('cargos_visualizar') && {
                    key: '/dashboard/configuracoes/cargos',
                    label: 'Cargos',
                },
                permissions.includes('caixa_saidas') && {
                    key: 'escalas',
                    label: 'Escala',
                    children: [
                        permissions.includes('escala_servicos') && {
                            key: '/dashboard/escalas/servicos',
                            label: 'Serviços',
                        },
                        permissions.includes('escala_apoio') && {
                            key: '/dashboard/escalas/apoio',
                            label: 'Apoio',
                        },
                    ].filter(Boolean),
                },
            ].filter(Boolean),
        },
        {
            key: 'clientes',
            label: 'Clientes',
            children: [
                permissions.includes('caixa_entradas') && {
                    key: '/dashboard/configuracoes/clientes',
                    label: 'Clientes',
                },
                permissions.includes('usuarios_listar') && {
                    key: 'site',
                    label: 'Site',
                    children: [
                        permissions.includes('caixa_entradas') && {
                            key: '/dashboard/configuracoes/vendas/pedidos',
                            label: 'Pedidos',
                        },
                        permissions.includes('caixa_entradas') && {
                            key: '/dashboard/configuracoes/feedback',
                            label: 'Feedbacks',
                        },
                        permissions.includes('caixa_entradas') && {
                            key: '/dashboard/configuracoes/usuentregasarios',
                            label: 'Entregas',
                        },
                        permissions.includes('caixa_entradas') && {
                            key: '/dashboard/configuracoes/contato',
                            label: 'Contato',
                        },
                        permissions.includes('clientes_carrinho') && {
                            key: '/dashboard/configuracoes/carrinho',
                            label: 'Carrinho',
                        },
                    ].filter(Boolean),
                },
                permissions.includes('caixa_saidas') && {
                    key: 'fila_reserva',
                    label: 'Fila e Reservas',
                    children: [
                        permissions.includes('escala_servicos') && {
                            key: '/dashboard/reservas',
                            label: 'Reservas',
                        },
                        permissions.includes('escala_apoio') && {
                            key: '/dashboard/fila',
                            label: 'Fila de espera',
                        },
                    ].filter(Boolean),
                },
            ].filter(Boolean),
        },
        {
            key: 'afiliados',
            label: 'Afiliados',
            children: [
                permissions.includes('afiliados_painel') && {
                    key: 'painel_afiliados',
                    label: 'Painel Afiliados',
                    children: [
                        permissions.includes('afiliados_cadastrar_cliente') && {
                            key: '/dashboard/configuracoes/afiliados/clientes/cadastrar',
                            label: 'Cadastrar Cliente',
                        },
                        permissions.includes('afiliados_alterar_plano') && {
                            key: '/dashboard/configuracoes/afiliados/clientes/editar',
                            label: 'Alterar Plano',
                        },
                        permissions.includes('afiliados_clientes_listar') && {
                            key: '/dashboard/configuracoes/afiliados/clientes',
                            label: 'Lista de Clientes',
                        },

                    ].filter(Boolean),
                },
                permissions.includes('afiliados') && {
                    key: 'leads',
                    label: 'Leads',
                    children: [
                        permissions.includes('afiliados_leads') && {
                            key: '/dashboard/leads/lista',
                            label: 'Listar leads',
                        },
                        permissions.includes('afiliados_buscar_leads') && {
                            key: '/dashboard/configuracoes/afiliados/leads',
                            label: 'Buscar leads',
                        },
                        permissions.includes('afiliados_campanhas') && {
                            key: '/dashboard/configuracoes/afiliados/campanha',
                            label: 'Campanhas',
                        },
                        permissions.includes('afiliados_configuracoes/afiliados/leads') && {
                            key: 'historico_leads',
                            label: 'Historico leads',
                            children: [
                                permissions.includes('afiliados_convertidos_leads') && {
                                    key: '/dashboard/configuracoes/afiliados/convertidos',
                                    label: 'Convertidos',
                                },
                                permissions.includes('afiliados_nao_convertidos_leads') && {
                                    key: '/dashboard/configuracoes/afiliados/leads/conversao',
                                    label: 'Nao convertidos',
                                },
                                permissions.includes('afiliados_geral_leads') && {
                                    key: '/dashboard/configuracoes/afiliados/geral',
                                    label: 'Geral',
                                },
                            ].filter(Boolean),
                        },
                    ].filter(Boolean),
                },


            ].filter(Boolean),
        },
        {
            key: 'produtos',
            label: 'Produtos',
            children: [
                permissions.includes('estoque_visualizar') && {
                    key: '/dashboard/configuracoes/estoque',
                    label: 'Estoque',
                },
                permissions.includes('produtos_visualizar') && {
                    key: '/dashboard/configuracoes/produtos',
                    label: 'Produto',
                },
                permissions.includes('composicao_visualizar') && {
                    key: '/dashboard/configuracoes/composicao',
                    label: 'Composição',
                },
                permissions.includes('adicional_visualizar') && {
                    key: '/dashboard/configuracoes/item-adicional',
                    label: 'Item Adicional',
                },
            ].filter(Boolean),
        },
        {
            key: 'comandas',
            label: 'Comandas',
            children: [
                permissions.includes('comandas_visualizar') && {
                    key: '/mesas',
                    label: 'Mesas',
                },
                permissions.includes('comandas_delivery') && {
                    key: '/dashboard/configuracoes/permissoes1',
                    label: 'Delivery',
                },
                permissions.includes('comandas_bar') && {
                    key: '/dashboard/configuracoes/permissoes2',
                    label: 'Bar',
                },
                permissions.includes('comandas_recepcao') && {
                    key: '/dashboard/configuracoes/permissoes3',
                    label: 'Recepção',
                },
            ].filter(Boolean),
        }, {
            key: 'mensagens',
            label: 'Mensagens',
            children: [
                permissions.includes('mensagens') && {
                    key: `/dashboard/mensagens/${user?.tenant}/`,
                    label: 'Canal Interno',
                },
                permissions.includes('mensagens_leads') && {
                    key: `/dashboard/mensagens/${user?.tenant}/leads`,
                    label: 'Leads',
                },


            ].filter(Boolean),
        },
        {
            key: 'caixa',
            label: 'Caixa',
            children: [
                permissions.includes('caixa_entradas') && {
                    key: '/dashboard/caixa',
                    label: 'Caixa Operacional',
                },
                permissions.includes('caixa_movimentacoes') && {
                    key: 'movimentacoes',
                    label: 'Movimentações',

                    children: [
                        permissions.includes('caixa_entradas') && {
                            key: '/dashboard/caixa/movimentacoes/entradas',
                            label: 'Entradas',
                        },
                        permissions.includes('caixa_saidas') && {
                            key: '/dashboard/caixa/movimentacoes/saidas',
                            label: 'Saídas',
                        },
                        permissions.includes('caixa_transferencias') && {
                            key: '/dashboard/caixa/movimentacoes/transferencias',
                            label: 'Transferências',
                        },
                        permissions.includes('caixa_entradas') && {
                            key: '/dashboard/pagamentos',
                            label: 'Pagamentos',
                        },
                    ].filter(Boolean),

                },
                permissions.includes('caixa_acesso') && {
                    key: 'relatorios',
                    label: 'Relatórios',
                    children: [
                        permissions.includes('caixa_relatorios_d') && {
                            key: '/dashboard/caixa/relatorios/diario',
                            label: 'Diário',
                        },
                        permissions.includes('caixa_relatorios_s') && {
                            key: '/dashboard/caixa/relatorios/semanal',
                            label: 'Semanal',
                        },
                        permissions.includes('caixa_relatorios_m') && {
                            key: '/dashboard/caixa/relatorios/mensal',
                            label: 'Mensal',
                        },
                        permissions.includes('caixa_relatorios_p') && {
                            key: '/dashboard/caixa/relatorios/periodo',
                            label: 'Por Período',
                        },
                        permissions.includes('caixa_fluxo') && {
                            key: '/dashboard/caixa/relatorios/fluxo',
                            label: 'Fluxo de Caixa',
                        },
                    ].filter(Boolean),
                },
                permissions.includes('caixa_fechamento') && {
                    key: 'fechamentos',
                    label: 'Fechamentos',
                    children: [
                        permissions.includes('caixa_fechamento_d') && {
                            key: '/dashboard/caixa/fechamentos/diario',
                            label: 'Fechamento Diário',
                        },
                        permissions.includes('caixa_fechamento_m') && {
                            key: '/dashboard/caixa/fechamentos/mensal',
                            label: 'Fechamento Mensal',
                        },
                    ].filter(Boolean),
                },
                permissions.includes('caixa_contas_visualizar') && {
                    key: 'contas',
                    label: 'Contas',
                    children: [
                        permissions.includes('caixa_contas_bancarias_visualizar') && {
                            key: '/dashboard/caixa/contas/bancarias',
                            label: 'Contas Bancárias',
                        },
                        permissions.includes('caixa_contas_caixas_visualizar') && {
                            key: '/dashboard/caixa/contas/caixas',
                            label: 'Caixas Internos',
                        },
                    ].filter(Boolean),
                },
            ].filter(Boolean),
        },
    ].filter((item) => item.children?.length);
};