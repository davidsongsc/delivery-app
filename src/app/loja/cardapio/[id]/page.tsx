import Cardapio from '@/components/Cardapio';
import { IProduto } from '@/interfaces/IProduto';
import { listaProdutos } from '@/components/serverside';

interface Props {
    params: { id: string };
}

export default async function CategoriaPage({ params }: Props) {
    // Filtra os produtos pela categoria recebida no params.id
    const produtosFiltrados = listaProdutos.filter(p =>
        (p.categoria || 'outros').toLowerCase() === params.id.toLowerCase()
    );

    return (
        <Cardapio produtos={produtosFiltrados} />
    );
}
