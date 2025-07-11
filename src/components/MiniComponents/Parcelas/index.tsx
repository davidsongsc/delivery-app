import { Card, CardContent, Typography, Grid } from '@mui/material'

type ParcelasCardsProps = {
    valorFinanciado: number
    parcelaSelecionada: string
    setParcelaSelecionada: (valor: string) => void
}


const ParcelasCards = ({
    valorFinanciado,
    parcelaSelecionada,
    setParcelaSelecionada
}: ParcelasCardsProps) => {
    const parcelasOpcoes = [12, 24, 36, 48]
    const taxa = 0.02 // 2% ao mês

    return (
        <>{valorFinanciado > 2000 ? <Grid container spacing={2}>
            {parcelasOpcoes.map((qtd) => {
                const parcela =
                    (valorFinanciado * taxa) / (1 - Math.pow(1 + taxa, -qtd))
                const total = parcela * qtd
                const juros = total - valorFinanciado

                return (
                    <Grid item xs={12} sm={1} md={3} key={qtd} >
                        <Card
                            onClick={() => setParcelaSelecionada(qtd.toString())}
                            sx={{
                                cursor: 'pointer',
                                border: parcelaSelecionada === qtd.toString()
                                    ? '2px solid #1976d2'
                                    : '1px solid #ccc',

                                transition: '0.2s',
                                '&:hover': { boxShadow: 4 }
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" textAlign="center">
                                    {qtd}x
                                </Typography>
                                <Typography variant="body1" textAlign="center">
                                    R$ {parcela.toFixed(2)} / mês
                                </Typography>
                                <Typography variant="body2" textAlign="center" color="text.secondary">
                                    Juros: R$ {juros.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                )
            })}
        </Grid> : <></>} </>

    )
}

export default ParcelasCards
