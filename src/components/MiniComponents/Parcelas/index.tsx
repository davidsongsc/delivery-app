import React from 'react'
import { Card, CardContent, Typography, Grid, Box } from '@mui/material'
import { FaCalendarAlt, FaMoneyBillWave } from 'react-icons/fa'

type ParcelasCardsProps = {
    valorFinanciado: number
    parcelaSelecionada: string
    setParcelaSelecionada: (valor: string) => void
}

// Formatação de moeda
const formatarReal = (valor: number) =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)

const ParcelasCards = ({
    valorFinanciado,
    parcelaSelecionada,
    setParcelaSelecionada
}: ParcelasCardsProps) => {
    const parcelasOpcoes = [12, 24, 36, 48]

    return valorFinanciado > 2000 ? (
        <Grid container spacing={2}>
            {parcelasOpcoes.map((qtd) => {
                // Taxa: base 2% + 0.8% a cada 12 parcelas
                const taxa = 0.02 + (qtd / 12 - 1) * 0.008

                const parcela =
                    (valorFinanciado * taxa) / (1 - Math.pow(1 + taxa, -qtd))
                const total = parcela * qtd
                const juros = total - valorFinanciado

                return (
                    <Grid item xs={12} sm={6} md={3} key={qtd}>
                        <Card
                            onClick={() => setParcelaSelecionada(qtd.toString())}
                            sx={{
                                cursor: 'pointer',
                                border: parcelaSelecionada === qtd.toString()
                                    ? '2px solid #1976d2'
                                    : '1px solid #ccc',
                                borderRadius: 2,
                                transition: '0.3s',
                                '&:hover': {
                                    boxShadow: 6,
                                    borderColor: '#1565c0'
                                },
                                bgcolor: parcelaSelecionada === qtd.toString() ? '#e3f2fd' : '#fff'
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" textAlign="center" gutterBottom>
                                    {qtd}x de <strong>{formatarReal(parcela)}</strong>
                                </Typography>

                                <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={0.5}>
                                    <FaCalendarAlt size={16} color="#1976d2" />
                                    <Typography variant="body2">
                                        Total: <strong>{formatarReal(total)}</strong>
                                    </Typography>
                                </Box>

                                <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
                                    <FaMoneyBillWave size={16} color="#1976d2" />
                                    <Typography variant="body2">
                                        Juros: {formatarReal(juros)}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
        </Grid>
    ) : null
}

export default React.memo(ParcelasCards);
