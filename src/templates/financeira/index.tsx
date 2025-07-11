'use client'
import React, { useState, useEffect, useCallback } from 'react'
import {
    Box,
    Grid,
    TextField,
    Typography,
    Button,
    Paper,
    Alert,
    Divider,

} from '@mui/material'
import InputMask from 'react-input-mask'
import ParcelasCards from '@/components/MiniComponents/Parcelas'
import NumericInput from '@/components/NumericInput'
import { notification } from 'antd'

function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}


const formatarReal = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)
interface SimuladorFinanceiraProps {
    setEtapaAtual: React.Dispatch<React.SetStateAction<number>>;
}
export default function SimuladorFinanceira({ setEtapaAtual }: SimuladorFinanceiraProps) {    const [cpf, setCpf] = useState('')
    const [cpfErro, setCpfErro] = useState(false);
    const [dataNasc, setDataNasc] = useState('')
    const [etapaLiberada, setEtapaLiberada] = useState(false)
    const [classeSocial, setClasseSocial] = useState('')

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
    const validarCPF = useCallback((cpf: string): boolean => {
        cpf = cpf.replace(/[^\d]+/g, '');

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

        let soma = 0;
        for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        if (resto !== parseInt(cpf.charAt(9))) return false;

        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) resto = 0;
        return resto === parseInt(cpf.charAt(10));
    }, []);

    const handleCpfChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setCpf(value);

        if (value.replace(/\D/g, '').length === 11) {
            setCpfErro(!validarCPF(value));
        } else {
            setCpfErro(false);
        }
    }, [validarCPF]);

    const calcularIdade = useCallback((data: string): number => {
        const hoje = new Date()
        const partes = data.split('-')
        const nascimento = new Date(+partes[0], +partes[1] - 1, +partes[2])

        let idade = hoje.getFullYear() - nascimento.getFullYear()
        const m = hoje.getMonth() - nascimento.getMonth()
        if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--
        }
        return idade
    }, [])

    useEffect(() => {
        const cpfValido = cpf.replace(/\D/g, '').length === 11
        const dataOk = dataNasc.length === 10
        const maiorIdade = calcularIdade(dataNasc) >= 18

        setEtapaLiberada(cpfValido && dataOk && maiorIdade)
    }, [cpf, dataNasc])

    const simular = useCallback(() => {
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
                description: `A entrada deve ser no mínimo ${formatarReal(entradaMinima)}`
            })
            return
        }

        const taxaBase = mapaDeJuros[classeSocial] || 0.02
        const taxaExtra = ((nParcelas / 12) - 1) * 0.008
        const taxaJuros = taxaBase + (taxaExtra > 0 ? taxaExtra : 0)
        const financiado = vTotal - vEntrada

        const parcela =
            (financiado * taxaJuros) /
            (1 - Math.pow(1 + taxaJuros, -nParcelas))

        const total = parcela * nParcelas

        setEtapaAtual(2)
        setResultado({
            valorFinanciado: financiado,
            parcela,
            total
        })
    }, [valor, entrada, parcelas, classeSocial, setEtapaAtual, setResultado])


    return (
        <div className="min-h-screen bg-gray-100 p-6 mt-10">

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
                                    onChange={handleCpfChange}
                                >
                                    {(inputProps) => (
                                        <TextField
                                            {...inputProps}
                                            label="CPF"
                                            fullWidth
                                            required
                                            error={cpfErro}
                                            helperText={cpfErro ? "CPF inválido" : ""}
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
                                    3. Observações Técnicas da Simulação
                                </Typography>

                                <Alert severity="warning" sx={{ mb: 2 }}>
                                    ⚠️ Esta simulação apresenta indícios de <strong>alto risco de crédito</strong>, dependendo do histórico financeiro do cliente.
                                </Alert>

                                <Typography variant="body2" gutterBottom>
                                    Recomendações para conduzir o atendimento:
                                </Typography>
                                <ul style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>
                                    <li>Sugira a inclusão de um <strong>co-participante com bom score</strong> para reforçar a proposta (composição de CPF).</li>
                                    <li>Verifique se a parcela final não compromete mais de <strong>30% da renda declarada</strong> do cliente.</li>
                                    <li>Oriente o cliente a aumentar a <strong>entrada</strong> para reduzir juros e facilitar a aprovação.</li>
                                    <li>Confirme se há <strong>comprovação de renda estável</strong> (extrato, MEI, holerite, etc.).</li>
                                    <li>Cheque se o cliente possui <strong>atrasos ou restrições recentes</strong> no histórico.</li>
                                </ul>

                                <Typography variant="body2" gutterBottom>
                                    Após <strong>6 meses de pagamento regular</strong>, é possível solicitar a <strong>transferência de titularidade</strong> (ex: troca de CPF), desde que o novo responsável atenda aos seguintes critérios:
                                </Typography>
                                <ul style={{ paddingLeft: '1rem', marginBottom: '1rem' }}>
                                    <li>Possuir <strong>CNH ativa</strong> (para veículos).</li>
                                    <li>Comprovar renda compatível com a parcela vigente.</li>
                                    <li>Estar com <strong>nome limpo</strong> e score adequado no mercado.</li>
                                    <li>Sem restrições recentes nos órgãos de proteção ao crédito (SPC/Serasa).</li>
                                </ul>

                                <Alert severity="info">
                                    ℹ️ Para dúvidas ou casos fora do padrão, consulte a equipe responsável pela formalização ou análise de crédito.
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
                        <Grid container spacing={2} className='p-4'>
                            <Grid item xs={12} md={6}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 3 }}
                                    onClick={simular}
                                    disabled={!etapaLiberada}
                                >
                                    Simular e obter sugestão
                                </Button>

                            </Grid>
                        </Grid>
                        <Grid container spacing={2} className='p-4'>
                            <Grid item xs={12} md={6}>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 3 }}
                                    onClick={simular}
                                    disabled={false}
                                >
                                    Avaliar crédito
                                </Button>
                            </Grid>
                        </Grid>
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

                                <Grid item xs={12}>
                                    <Alert severity="success" sx={{ mt: 2 }}>

                                        <small>
                                            <strong>✅ Pré-aprovação identificada para o CPF informado. </strong> <br />
                                            <br />
                                            Agende a visita presencial do cliente para <strong>finalização da proposta</strong>.
                                            <br />
                                            Reforce que a liberação depende da apresentação dos documentos no local.
                                        </small>
                                    </Alert>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="h6" gutterBottom>
                                    Solicitação de Ficha Cadastral
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    Para dar continuidade ao atendimento, é necessário realizar a <strong>abertura da ficha cadastral</strong> do cliente no sistema.
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    Essa etapa inclui coleta de <strong>dados pessoais, informações de renda</strong> e demais dados complementares para envio ao banco e análise formal da proposta.
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    Oriente o cliente de forma clara e cordial, explicando que esta etapa é obrigatória para avançar com a análise e formalização do financiamento.
                                </Typography>

                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    Em caso de dúvidas ou impedimentos, escale o atendimento para o responsável pela formalização ou análise de crédito.
                                </Typography>


                                <Divider sx={{ my: 2 }} />

                                {valor && entrada && Number(entrada) < Number(valor) * 0.50 && (
                                    <Grid item xs={12}>
                                        <Alert severity="error" sx={{ mt: 2 }}>
                                            ⚠️ Entrada abaixo do mínimo recomendado: <strong>{formatarReal(Number(valor) * 0.50)}</strong>.
                                            <br />
                                            <small>
                                                Com base no valor informado, essa proposta tem <strong>baixa chance de aprovação</strong> devido ao score ou risco de crédito.
                                                <br />
                                                Oriente o cliente a considerar uma entrada maior ou apresentar <strong>composição de CPF</strong> (ex: cônjuge ou familiar).
                                                <br />
                                                Uma nova simulação pode ser necessária.
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
