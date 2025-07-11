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

const formatarReal = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)

export default function SimuladorFinanceira() {
    const [cpf, setCpf] = useState('')
    const [dataNasc, setDataNasc] = useState('')
    const [nomeCliente, setNomeCliente] = useState('')
    const [etapaLiberada, setEtapaLiberada] = useState(false)
    const [classeSocial, setClasseSocial] = useState('C')
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


    useEffect(() => {
        const cpfValido = cpf.replace(/\D/g, '').length === 11
        const dataOk = dataNasc.length === 10
        const nomeOk = nomeCliente.trim().length > 2
        setEtapaLiberada(cpfValido && dataOk && nomeOk)
    }, [cpf, dataNasc, nomeCliente])

    const simular = () => {
        const vTotal = parseFloat(valor)
        const vEntrada = parseFloat(entrada)
        const nParcelas = parseInt(parcelas)

        if (isNaN(vTotal) || isNaN(vEntrada) || isNaN(nParcelas) || nParcelas <= 0) {
            return
        }

        const taxaJuros = mapaDeJuros[classeSocial] || 0.02
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
                            <Grid item xs={12}>
                                <TextField
                                    label="Nome completo"
                                    fullWidth
                                    value={nomeCliente}
                                    onChange={(e) => setNomeCliente(e.target.value)}
                                    required
                                />
                            </Grid>
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
                                        <option value="">Selecione</option>
                                        <option value="A">Classe A</option>
                                        <option value="B">Classe B</option>
                                        <option value="C">Classe C</option>
                                        <option value="D">Classe D</option>
                                        <option value="E">Classe E</option>
                                    </TextField>
                                </Grid>
                            )}
                        </Grid>

                        <Typography variant="h6" gutterBottom>
                            2. Condições do financiamento
                        </Typography>

                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Valor do veículo"
                                    type="number"
                                    fullWidth
                                    value={valor}
                                    onChange={(e) => setValor(e.target.value)}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField
                                    label="Entrada"
                                    type="number"
                                    fullWidth
                                    value={entrada}
                                    onChange={(e) => setEntrada(e.target.value)}
                                    required
                                />
                            </Grid>


                        </Grid>

                        <Typography variant="h6" gutterBottom>
                            3. Forma de parcelamento
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
                            Simular
                        </Button>

                        {!etapaLiberada && (
                            <Alert severity="warning" sx={{ mt: 3 }}>
                                Preencha nome, CPF e data de nascimento para simular.
                            </Alert>
                        )}
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
                                    <strong>Cliente:</strong> {nomeCliente}
                                </Typography>
                                <Typography variant="subtitle1">
                                    <strong>CPF:</strong> {cpf}
                                </Typography>
                                <Divider sx={{ my: 2 }} />
                                {valor && (
                                    <Grid item xs={12}>
                                        <Alert severity="warning">
                                            💡 Entrada sugerida: <strong>{formatarReal(Number(valor) * 0.3)}</strong>
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
                                    Taxa aplicada: {mapaDeJuros[classeSocial] * 100}% ao mês
                                </Typography>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="caption" color="textSecondary">
                                    FinanPro Simulações LTDA<br />
                                    CNPJ 12.345.678/0001-99<br />
                                    Rua Financeira, 123 – São Paulo – SP<br />
                                    suporte@finanpro.com.br
                                </Typography>
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
