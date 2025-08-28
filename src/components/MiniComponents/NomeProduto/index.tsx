import React from 'react';

interface NomeProdutoProps {
    nome: string;
    nome_interno?: string;
    className?: string;
}

const NomeProduto: React.FC<NomeProdutoProps> = ({ nome, nome_interno, className }) => {
    return (
        <div className={className}>
            <strong className='text-lg capitalize'>{nome}</strong>
            {nome_interno && (
                <div className="text-sm text-gray-500 uppercase">
                    {nome_interno}
                </div>
            )}
        </div>
    );
};

export default NomeProduto;
