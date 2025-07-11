'use client'
import React, { useState, useEffect } from 'react'
import {
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    Paper,
    Alert,
    Divider,
    Stepper,
    Step,
    StepLabel
} from '@mui/material'
import InputMask from 'react-input-mask'
import ParcelasCards from '@/components/MiniComponents/Parcelas'
import NumericInput from '@/components/NumericInput'
import { notification } from 'antd'


const formatarReal = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)

export default function SimuladorFinanceira() {
    const [cpf, setCpf] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [etapaLiberada, setEtapaLiberada] = useState(false)
    const [classeSocial, setClasseSocial] = useState('')
    const [etapaAtual, setEtapaAtual] = useState(0);

    const [valor, setValor] = useState('')
    const [entrada, setEntrada] = useState('')
    const [parcelas, setParcelas] = useState('')
    const [resultado, setResultado] = useState<null | {
        valorFinanciado: number
        parcela: number
        total: number
    }>(null)
    const valorFinanciado = Number(valor) - Number(entrada)

    const mapaDeJuros: Record<string, number> = {
        A: 0.012,
        B: 0.02,
        C: 0.028,
        D: 0.034,
        E: 0.042
    }
    const calcularIdade = (data: string): number => {
        const hoje = new Date()
        const partes = data.split('-')
        const nascimento = new Date(+partes[0], +partes[1] - 1, +partes[2])

        let idade = hoje.getFullYear() - nascimento.getFullYear()
        const m = hoje.getMonth() - nascimento.getMonth()
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--
        }
        return idade
    }

    useEffect(() => {
        const cpfValido = cpf.replace(/\D/g, '').length === 11
        const dataOk = dataNasc.length === 10
        const maiorIdade = calcularIdade(dataNasc) >= 18

        setEtapaLiberada(cpfValido && dataOk && maiorIdade)
    }, [cpf, dataNasc])

    const simular = () => {
        const vTotal = parseFloat(valor)
        const vEntrada = parseFloat(entrada)
        const nParcelas = parseInt(parcelas)

        if (isNaN(vTotal) || isNaN(vEntrada) || isNaN(nParcelas) || nParcelas <= 0) {
            return
        }

        const entradaMinima = vTotal * 0.50
        if (vEntrada < entradaMinima) {
            notification.warning({
                message: 'Entrada insuficiente',
                description: `A entrada deve ser no mínimo ${formatarReal(entradaMinima)}`
            })

        }
        const taxaBase = mapaDeJuros[classeSocial] || 0.02
        const taxaExtra = ((nParcelas / 12) - 1) * 0.008
        const taxaJuros = taxaBase + (taxaExtra > 0 ? taxaExtra : 0)
        const financiado = vTotal - vEntrada

        const parcela =
            (financiado * taxaJuros) /
            (1 - Math.pow(1 + taxaJuros, -nParcelas))

        const total = parcela * nParcelas
        setEtapaAtual(2);
        setResultado({
            valorFinanciado: financiado,
            parcela,
            total
        })
    }

    const steps = ['Preencher Dados', 'Simular', 'Resultado', 'Sugestões de Bancos'];


    return (
        <div className="min-h-screen bg-gray-100 p-6 mt-10">
            <Stepper activeStep={etapaAtual} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Grid container spacing={4}>
                {/* Coluna 1: Simulador */}
                <Grid item xs={12} md={7}>
                    <Paper sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h5" mb={3}>
                            Simulador de Financiamento
                        </Typography>

                        <Typography variant="h6" gutterBottom>
                            1. Dados do cliente
                        </Typography>

                        <Grid container spacing={2} mb={4}>

                            <Grid item xs={12} md={6}>
                                <InputMask
                                    mask="999.999.999-99"
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                >
                                    {(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            label="CPF"
                                            fullWidth
                                            required
                                        />
                                    )}
                                </InputMask>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Data de nascimento"
                                    type="date"
                                    fullWidth
                                    value={dataNasc}
                                    onChange={(e) => setDataNasc(e.target.value)}
                                    InputLabelProps={{ shrink: true }}
                                    required
                                />
                            </Grid>

                            {classeSocial === '' && (
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Classe social"
                                        value={classeSocial}
                                        onChange={(e) => setClasseSocial(e.target.value)}
                                        SelectProps={{ native: true }}
                                        required
                                    >
                                        <option value=""></option>
                                        <option value="A">Classe A</option>
                                        <option value="B">Classe B</option>
                                        <option value="C">Classe C</option>
                                        <option value="D">Classe D</option>
                                        <option value="E">Classe E</option>
                                    </TextField>
                                </Grid>
                            )}
                            {dataNasc && calcularIdade(dataNasc) < 18 && (
                                <Alert severity="error" sx={{ mt: 2 }}>
                                    Simulações só estão disponíveis para maiores de 18 anos.
                                </Alert>
                            )}
                        </Grid>

                        <Typography variant="h6" gutterBottom>
                            2. Condições do financiamento
                        </Typography>

                        <Grid container spacing={2} className='p-4'>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <NumericInput
                                        label="Valor do veículo"
                                        name="valor"
                                        fullWidth
                                        value={valor}
                                        onChange={(e) => setValor(e.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <NumericInput
                                        label="Entrada"
                                        name="entrada"
                                        fullWidth
                                        value={entrada}
                                        onChange={(e) => setEntrada(e.target.value)}
                                        required
                                    />
                                </Grid>
                            </Grid>


                        </Grid>
                        {resultado ? (
                            <>
                                <Typography variant="h6" gutterBottom>
                                    3. Recomendações de Financiamento
                                </Typography>

                                <Alert severity="warning" sx={{ mb: 2 }}>
                                    ⚠️ Esta simulação pode representar um <strong>alto risco de crédito</strong> dependendo do histórico financeiro.
                                </Alert>

                                <Typography variant="body2" gutterBottom>
                                    Recomendamos que você:
                                </Typography>
                                <ul style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>
                                    <li>Adicione um <strong>co-participante (CPF com bom score)</strong> ao financiamento para reforçar a análise de crédito.</li>
                                    <li>Evite comprometer mais de <strong>30% da sua renda</strong> com parcelas mensais.</li>
                                    <li>Aumente o valor da <strong>entrada</strong> para reduzir o valor financiado e os juros totais.</li>
                                    <li>Tenha uma <strong>comprovação de renda estável</strong> (holerite, declaração MEI, extrato bancário, etc).</li>
                                    <li>Evite atrasos ou dívidas ativas nos meses anteriores à solicitação do financiamento.</li>
                                </ul>

                                <Typography variant="body2" gutterBottom>
                                    Após <strong>6 meses de pagamentos em dia</strong>, será possível solicitar uma <strong>transferência de titularidade</strong> para outra pessoa. O novo titular deve atender aos seguintes requisitos:
                                </Typography>
                                <ul style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>
                                    <li>Possuir <strong>CNH ativa</strong> (em caso de financiamento de veículos).</li>
                                    <li>Ter <strong>renda comprovada compatível</strong> com o valor da parcela.</li>
                                    <li>Estar com <strong>nome limpo</strong> e <strong>bom score de crédito</strong> no mercado.</li>
                                    <li>Não possuir restrições recentes nos órgãos de proteção ao crédito (SPC/Serasa).</li>
                                </ul>
                                <Alert severity="info">
                                    💡 Caso tenha dúvidas, entre em contato com um de nossos especialistas para orientação personalizada.
                                </Alert>
                            </>
                        ) : null}
                        <Typography variant="h6" gutterBottom>
                            4. Forma de parcelamento
                        </Typography>
                        <Grid container spacing={2} className='p-4'>
                            <ParcelasCards
                                valorFinanciado={valorFinanciado}
                                parcelaSelecionada={parcelas}
                                setParcelaSelecionada={setParcelas}
                            />
                        </Grid>
                        <Button
                            variant="contained"
                            fullWidth
                            sx={{ mt: 3 }}
                            onClick={simular}
                            disabled={!etapaLiberada}
                        >
                            Simular e obter sugestão
                        </Button>

                        {!etapaLiberada && (
                            <Alert severity="warning" sx={{ mt: 3 }}>
                                Preencha CPF e data de nascimento para simular.
                            </Alert>
                        )}

                        <Divider sx={{ my: 3 }} />


                    </Paper>
                </Grid>

                {/* Coluna 2: Resultado visual */}
                <Grid item xs={12} md={5}>
                    <Paper
                        sx={{
                            p: 4,
                            borderRadius: 3,
                            bgcolor: '#f7fafc',
                            minHeight: '100%'
                        }}
                    >
                        <Typography variant="h6" gutterBottom>
                            Resultado da Simulação
                        </Typography>

                        {resultado ? (
                            <>
                                <Typography variant="subtitle1">
                                    <strong>CPF:</strong> {cpf}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                {valor && entrada && Number(entrada) < Number(valor) * 0.50 && (
                                    <Grid item xs={12}>
                                        <Alert severity="error" sx={{ mt: 2 }}>
                                            ⚠️ A entrada mínima exigida é de <strong>{formatarReal(Number(valor) * 0.50)}</strong>.
                                            <br />
                                            <small>
                                                Por implicações no score e risco de crédito, este financiamento só será aprovado com valor de entrada suficiente
                                                ou com composição de CPF (consórcio familiar). Realize uma nova simulação se necessário.
                                            </small>
                                        </Alert>
                                    </Grid>
                                )}
                                <Divider sx={{ my: 2 }} />
                                <Typography variant="body1">
                                    Valor Financiado:{' '}
                                    <strong>{formatarReal(resultado.valorFinanciado)}</strong>
                                </Typography>
                                <Typography variant="body1">
                                    Parcelas:{' '}
                                    <strong>{parcelas}x de {formatarReal(resultado.parcela)}</strong>
                                </Typography>
                                <Typography variant="body1">
                                    Total a Pagar:{' '}
                                    <strong>{formatarReal(resultado.total)}</strong>
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    Taxa aplicada: {(mapaDeJuros[classeSocial] * 100).toFixed(2)}% ao mês
                                </Typography>


                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" gutterBottom>
                                    Sugestões de Bancos
                                </Typography>
                                {['BV Financeira', 'Santander', 'Itaú'].map((banco) => {
                                    const acrescimos: Record<string, number> = {
                                        'BV Financeira': 0.004,   // +0.4%
                                        'Santander': 0.002,       // +0.2%
                                        'Itaú': 0.006             // +0.6%
                                    }

                                    const base = mapaDeJuros[classeSocial] || 0.02
                                    const n = parseInt(parcelas)
                                    const p = valorFinanciado
                                    const taxaExtra = ((n / 12) - 1) * 0.008
                                    const taxaFinal = base + (taxaExtra > 0 ? taxaExtra : 0) + acrescimos[banco]



                                    const parcelaBanco = (p * taxaFinal) / (1 - Math.pow(1 + taxaFinal, -n))
                                    const totalBanco = parcelaBanco * n

                                    return (
                                        <Box key={banco} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
                                            <Typography variant="subtitle1"><strong>{banco}</strong></Typography>
                                            <Typography variant="body2">Juros: {(taxaFinal * 100).toFixed(2)}% a.m.</Typography>
                                            <Typography variant="body2">
                                                {n}x de <strong>{formatarReal(parcelaBanco)}</strong> — Total:{' '}
                                                <strong>{formatarReal(totalBanco)}</strong>
                                            </Typography>
                                        </Box>
                                    )
                                })}
                            </>
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Preencha os dados ao lado e clique em <strong>Simular</strong> para ver a proposta.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}
