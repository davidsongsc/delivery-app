'use client';
import React from 'react';
import ProfileStructure from '@/components/ProfileStructure';
import { useProduto } from '@/hooks/useProduct';
import { useParams } from 'next/navigation';

export default function ProdutosEditLayout({ children }: { children: React.ReactElement }) {
    const { id } = useParams<{ id: string }>();
    const { produto, produtoLoading, produtoRefresh } = useProduto({ id });

    return (
        <div className="w-7xl container">
            <ProfileStructure
                isLoading={produtoLoading}
                navTitle="Produtos > Editar"
                title="Editar Produto"
                menuButtons={[
                    {
                        title: 'Informações',
                        link: `/dashboard/configuracoes/produtos/${id}/editar`,
                        isActive: true,
                    },
                    {
                        title: 'Opções',
                        link: `/dashboard/configuracoes/produtos/${id}/opcoes`,
                        isActive: false,
                    },
                ]}
            >
                {/* Clonar o filho passando props adicionais */}
                {React.isValidElement(children)
                    ? React.cloneElement(children, { produto, produtoLoading, produtoRefresh })
                    : children}
            </ProfileStructure>
        </div>
    );
}
