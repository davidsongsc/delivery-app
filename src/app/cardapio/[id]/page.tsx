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
        <div className="p-4 sm:px-40">
            <h1 className="text-2xl font-bold mb-4 capitalize text-d_primary">
                Categoria: {params.id}
            </h1>
            <Cardapio produtos={produtosFiltrados} />
        </div>
    );
}
