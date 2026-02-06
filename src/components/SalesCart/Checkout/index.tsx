'use client'

import React, { useMemo, useState } from 'react'
import { useDeliveryStore } from '@/store/deliveryStore'
import CarrinhoTotalVenda from '@/components/SalesCart/Cart/TotalSale'
import { Steps, Card, Input, Radio, Button, Divider, Tag, Badge, Avatar } from 'antd'
import { ShoppingCartOutlined, EnvironmentOutlined, CreditCardOutlined, CheckCircleOutlined, QrcodeOutlined, DollarCircleOutlined, PhoneOutlined, UserOutlined, HomeOutlined } from '@ant-design/icons'
import { useLoja } from '@/contexts/LojaContext'

type MetodoPagamento = 'pix' | 'cartao' | 'dinheiro'

const brand = {
    primary: 'from-[#FF1F3D] to-[#FF8A00]',
    dark: 'bg-[#111315]',
    card: 'bg-white',
    accent: 'bg-[#FFD700]',
}

const formatBRL = (v: number) =>
    v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const CheckoutPage: React.FC = () => {
    const itensPedido = useDeliveryStore(s => s.itensPedido)
    const taxaEntrega = useDeliveryStore(s => s.taxaEntrega)
    const { corporation } = useLoja()
    const empresa = corporation?.result?.[0] || null
    const [step, setStep] = useState(0)
    const [pagamento, setPagamento] = useState<MetodoPagamento | ''>('')
    const [cliente, setCliente] = useState({
        nome: '',
        telefone: '',
        endereco: '',
        observacoes: ''
    })

    const setField = (k: keyof typeof cliente, v: string) =>
        setCliente(prev => ({ ...prev, [k]: v }))

    const itensComTotais = useMemo(() => {
        return itensPedido.map(item => {
            const addTotalUnit = (item.adicionar || []).reduce((acc: number, a: any) => {
                const preco = Number(a?.preco || 0)
                const qtd = Number(a?.quantidade || 1)
                return acc + preco * qtd
            }, 0)
            const unit = Number(item.valor || 0) + addTotalUnit
            const line = unit * Number(item.quantidade || 1)
            return { ...item, _unitTotal: unit, _lineTotal: line }
        })
    }, [itensPedido])

    const subtotal = useMemo(
        () => itensComTotais.reduce((acc, it) => acc + it._lineTotal, 0),
        [itensComTotais]
    )

    const podeAvancarEndereco = cliente.nome.trim() && cliente.telefone.trim()
    const podeAvancarPagamento = cliente.endereco.trim()
    const podeFinalizar = pagamento !== '' && itensPedido.length > 0

    const finalizarPedido = async () => {
        if (!podeFinalizar) return
        const pedido = {
            cliente,
            itens: itensPedido,
            taxaEntrega,
            pagamento,
            data: new Date().toISOString()
        }
        console.log('Pedido enviado:', pedido)
    }

    return (
        <div className={`min-h-screen bg-darkModal text-white`}>
            <header className="sticky top-0 z-30 backdrop-blur border-b border-white/10">
                <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`p-[2px] rounded-sm `}>
                            <div className="rounded-sm  px-3 py-2">
                                <span className="text-lg font-bold tracking-wide">{empresa?.nome}</span>
                            </div>
                        </div>
                        <Tag color="gold" className="text-black font-semibold">Entrega Rápida</Tag>
                    </div>
                    <Badge count={itensPedido.length} color="#F59E0B">
                        <Avatar shape="square" icon={<ShoppingCartOutlined />} className='bg-sistemaRed'/>
                    </Badge>
                </div>
            </header>
            <main>
                <section className="mx-auto max-w-6xl px-4 py-6">
                    <div className="mb-6">
                        <div className="bg-darkBg rounded-2xl p-4 border border-white/10">
                            <Steps
                                current={step}
                                onChange={(v) => setStep(v)}
                                items={[
                                    { title: 'Carrinho', icon: <ShoppingCartOutlined /> },
                                    { title: 'Dados', icon: <UserOutlined /> },
                                    { title: 'Endereço', icon: <EnvironmentOutlined /> },
                                    { title: 'Pagamento', icon: <CreditCardOutlined /> },
                                    { title: 'Revisão', icon: <CheckCircleOutlined /> },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <Card className="rounded-2xl shadow-xl border-0">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-extrabold">Resumo do Pedido</h2>
                                    <Tag color="red">Quente e crocante</Tag>
                                </div>
                                <Divider />
                                <div className="space-y-4">
                                    {itensComTotais.map(item => (
                                        <div key={item.id} className="flex gap-3 items-start">
                                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${brand.primary} flex items-center justify-center text-black font-extrabold`}>
                                                {item.quantidade}x
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="text-lg font-bold text-black">{item.nome}</div>
                                                        {item.adicionar?.length > 0 && (
                                                            <ul className="text-sm text-gray-500 mt-1 space-y-0.5">
                                                                {item.adicionar.map((add: any) => (
                                                                    <li key={add.id}>+ {add.nome} {add.preco ? `(${formatBRL(Number(add.preco))})` : ''}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-black font-bold">{formatBRL(item._unitTotal)}</div>
                                                        <div className="text-xs text-gray-500">linha: {formatBRL(item._lineTotal)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {itensComTotais.length === 0 && (
                                        <div className="text-center text-gray-500 py-6">Seu carrinho está vazio.</div>
                                    )}
                                </div>
                            </Card>

                            <Card className="rounded-2xl shadow-xl border-0">
                                <h2 className="text-2xl font-extrabold">Seus Dados</h2>
                                <Divider />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Input
                                        size="large"
                                        prefix={<UserOutlined />}
                                        placeholder="Nome completo"
                                        value={cliente.nome}
                                        onChange={(e) => setField('nome', e.target.value)}
                                    />
                                    <Input
                                        size="large"
                                        prefix={<PhoneOutlined />}
                                        placeholder="Telefone"
                                        value={cliente.telefone}
                                        onChange={(e) => setField('telefone', e.target.value)}
                                    />
                                    <div className="md:col-span-2">
                                        <Input
                                            size="large"
                                            prefix={<HomeOutlined />}
                                            placeholder="Endereço para entrega"
                                            value={cliente.endereco}
                                            onChange={(e) => setField('endereco', e.target.value)}
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <Input.TextArea
                                            placeholder="Observações (ex: sem cebola, troco para R$100)"
                                            value={cliente.observacoes}
                                            onChange={(e) => setField('observacoes', e.target.value)}
                                            autoSize={{ minRows: 3, maxRows: 6 }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Button
                                        type="primary"
                                        size="large"
                                        disabled={!podeAvancarEndereco}
                                        onClick={() => setStep(2)}
                                    >
                                        Continuar
                                    </Button>
                                </div>
                            </Card>

                            <Card className="rounded-2xl shadow-xl border-0">
                                <h2 className="text-2xl font-extrabold">Pagamento</h2>
                                <Divider />
                                <Radio.Group
                                    onChange={(e) => setPagamento(e.target.value)}
                                    value={pagamento}
                                    className="w-full"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <Radio.Button value="pix" className="!w-full !h-auto !p-0">
                                            <div className="w-full rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <QrcodeOutlined />
                                                    </div>
                                                    <div className="font-semibold text-black">Pix</div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">Confirmação instantânea</div>
                                            </div>
                                        </Radio.Button>

                                        <Radio.Button value="cartao" className="!w-full !h-auto !p-0">
                                            <div className="w-full rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <CreditCardOutlined />
                                                    </div>
                                                    <div className="font-semibold text-black">Cartão</div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">Pague no crédito ou débito</div>
                                            </div>
                                        </Radio.Button>

                                        <Radio.Button value="dinheiro" className="!w-full !h-auto !p-0">
                                            <div className="w-full rounded-xl border border-gray-200 p-4 hover:shadow-md transition">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                                                        <DollarCircleOutlined />
                                                    </div>
                                                    <div className="font-semibold text-black">Dinheiro</div>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-1">Informe o troco nas observações</div>
                                            </div>
                                        </Radio.Button>
                                    </div>
                                </Radio.Group>

                                <div className="mt-4 flex justify-end gap-3">
                                    <Button onClick={() => setStep(1)}>Voltar</Button>
                                    <Button
                                        type="primary"
                                        size="large"
                                        disabled={!podeAvancarPagamento || !pagamento}
                                        onClick={() => setStep(4)}
                                    >
                                        Revisar
                                    </Button>
                                </div>
                            </Card>

                            <Card className="rounded-2xl shadow-xl border-0">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-extrabold">Revisão</h2>
                                    <Tag color="success" className="font-semibold">Pronto para enviar</Tag>
                                </div>
                                <Divider />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-gray-500 text-sm">Cliente</div>
                                        <div className="font-semibold text-black">{cliente.nome || '-'}</div>
                                        <div className="text-black">{cliente.telefone || '-'}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-500 text-sm">Endereço</div>
                                        <div className="text-black">{cliente.endereco || '-'}</div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <div className="text-gray-500 text-sm">Observações</div>
                                        <div className="text-black">{cliente.observacoes || '-'}</div>
                                    </div>
                                    <div className="md:col-span-2">
                                        <div className="text-gray-500 text-sm">Pagamento</div>
                                        <div className="text-black font-semibold uppercase">{pagamento || '-'}</div>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-end">
                                    <Button
                                        type="primary"
                                        size="large"
                                        disabled={!podeFinalizar}
                                        onClick={finalizarPedido}
                                        className="!h-12 !px-8 !rounded-xl bg-gradient-to-r from-[#FF1F3D] to-[#FF8A00] border-0"
                                    >
                                        Finalizar Pedido
                                    </Button>
                                </div>
                            </Card>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="lg:sticky lg:top-24 space-y-4">
                                <Card className="rounded-2xl shadow-2xl border-0">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-extrabold">Resumo Financeiro</h3>
                                        <Tag color="gold" className="text-black font-semibold">Oferta do dia</Tag>
                                    </div>
                                    <Divider />
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-gray-500">Subtotal</span>
                                        <span className="text-black font-semibold">{formatBRL(subtotal)}</span>
                                    </div>
                                    <div className="rounded-xl p-3 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 text-black">
                                        <div className="text-sm">Taxa de Entrega</div>
                                        <div className="text-lg font-bold">{formatBRL(Number(taxaEntrega || 0))}</div>
                                    </div>
                                    <Divider />
                                    <div className="text-sm text-gray-500 mb-3">Totais detalhados</div>
                                    <div className="rounded-xl overflow-hidden">
                                        <CarrinhoTotalVenda />
                                    </div>
                                </Card>

                                <Card className="rounded-2xl border-0 bg-gradient-to-br from-[#16181b] to-[#0f1113] text-white">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                                            <QrcodeOutlined />
                                        </div>
                                        <div>
                                            <div className="font-bold">Pague com Pix</div>
                                            <div className="text-xs text-white/60">Confirmação na hora e sem taxa</div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="mt-10 border-t border-white/10">
                <div className="mx-auto max-w-6xl px-4 py-6 text-center text-white/60 text-sm">
                    © {new Date().getFullYear()} BurgerX • Sabor, velocidade e experiência
                </div>
            </footer>
        </div>
    )
}

export default React.memo(CheckoutPage)
