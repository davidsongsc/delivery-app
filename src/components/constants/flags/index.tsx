import { IProdutoFlags } from "@/interfaces/IProduto";

const flagsConfig: { key: keyof IProdutoFlags; label: string }[] = [
  { key: 'ativo', label: 'Disponível para venda' },
  { key: 'is_delivery', label: 'Disponível para entrega' },
  { key: 'is_pickup', label: 'Disponível para retirada' },
  { key: 'is_visible', label: 'Visível no site' },
  { key: 'is_digital', label: 'Produto digital' },
  { key: 'is_scheduled', label: 'Permite agendamento' },
  { key: 'has_stock_control', label: 'Controle de estoque' },
  { key: 'is_limited', label: 'Quantidade limitada' },
  { key: 'is_blocked', label: 'Produto bloqueado' },
  { key: 'is_free', label: 'Produto gratuito' },
  { key: 'is_discounted', label: 'Produto em promoção' },
  { key: 'requires_preparation', label: 'Requer preparação' },
];

export default flagsConfig;