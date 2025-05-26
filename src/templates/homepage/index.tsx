'use client';

import React from 'react';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { Button } from 'antd';
import InstagramGallery from '@/components/InstagramGallery';

const Home: React.FC = () => {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="min-h-screen flex flex-col" >

            <main className="flex flex-col md:flex-row flex-1 p-4 gap-4 bg-gray-100">
                <section className="flex-1  bg-white rounded-lg shadow p-4">
                    <h2 className="text-2xl font-semibold mb-4">Bem-vindo ao Sistema</h2>
                    <p className="mb-2">
                        Este é o sistema base da empresa. Aqui você encontra o esqueleto inicial para novos projetos.
                    </p>
                    <p className="mb-2">
                        Utilize esta estrutura para construir rapidamente aplicações eficientes e bem organizadas.
                    </p>
                    <div className='flex wrap gap-2 '>
                        <article className="mt-6 p-4 bg-gray-50 rounded w-1/2">
                            <h3 className="text-xl font-bold mb-2">Destaque</h3>
                            <p>Este artigo destaca funcionalidades ou novidades importantes para o sistema.</p>
                        </article>
                        {user && (
                            <article className="mt-6 p-4 bg-gray-50 rounded w-1/2">
                                <h3 className="text-xl font-bold mb-2"> informações</h3>
                                <p><b>Email:</b> {user.email}</p>
                                {user.first_name && <p><b>Nome:</b> {user.first_name} {user.last_name}</p>}
                                {user.phone_number && <p><b>Telefone:</b> {user.phone_number}</p>}
                                {user.cpf && <p><b>CPF:</b> {user.cpf}</p>}
                                {user.rg && <p><b>RG:</b> {user.rg}</p>}
                                {user.other_doc && <p><b>Outro Documento:</b> {user.other_doc}</p>}
                                {user.invited_by && <p><b>Convite:</b> {user.invited_by}</p>}
                                {user.access_level && <p><b>Acesso:</b> {JSON.stringify(user.access_level)}</p>}
                                {user.is_superuser && <p><b>SuperUsuário:</b> {user.is_superuser.toString()}</p>}
                                {user.is_staff && <p><b>Usuário:</b> {user.is_staff.toString()}</p>}
                                {user.is_active && <p><b>Ativo:</b> {user.is_active.toString()}</p>}
                                {user.uid && <p><b>Identificador:</b> {user.uid}</p>}
                                <Link href="/dashboard/carteira" className="text-blue-600 hover:underline">
                                    <Button>Carteira</Button>
                                </Link>
                                <Link href="/dashboard/transacoes" className="text-blue-600 hover:underline">
                                    <Button>Transacoes</Button>
                                </Link>
                                <Link href="/dashboard/lancamentos" className="text-blue-600 hover:underline">
                                    <Button>Lançamentos</Button>
                                </Link>
                            </article>
                        )}
                    </div>
                </section>
                <section className="flex-1 bg-white rounded-lg shadow p-4">
                    <InstagramGallery />
                </section>
                {/* Barra lateral */}
                <aside className="w-64 bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">Links Úteis</h2>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-blue-600 hover:underline">Documentação</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Suporte</a></li>
                        <li><a href="#" className="text-blue-600 hover:underline">Atualizações</a></li>
                    </ul>
                </aside>
            </main>

            {/* Rodapé */}
            <footer className="bg-blue-600 text-white text-center p-4" >
                <p>&copy; {new Date().getFullYear()} Sistema. Todos os direitos reservados.</p>
            </footer >
        </div >
    )
}

export default React.memo(Home);