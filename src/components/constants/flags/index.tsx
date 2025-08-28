import { IProdutoFlags } from "@/interfaces/IProduto";

const flagsConfig: { key: keyof IProdutoFlags; label: string }[] = [
  { key: 'delivery', label: 'Delivery' },
  { key: 'comanda', label: 'Comanda' },
  { key: 'happy_hour', label: 'Happy Hour' },
  { key: 'promocional', label: 'Promocional' },
  
];

export default flagsConfig;