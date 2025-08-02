'use client';
import { useState } from 'react';
import { useFipe } from '@/hooks/useFipe';
import { Box, Button, TextField, Typography, CircularProgress } from '@mui/material';

export default function TesteFipe() {
    const [codigo, setCodigo] = useState('');
    const { veiculo, loading, error, buscarFipe } = useFipe();

    return (
        <Box p={4} maxWidth={500} mx="auto">
            <Typography variant="h5" gutterBottom>Consulta FIPE</Typography>

            <TextField
                label="Código FIPE"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                fullWidth
                margin="normal"
            />

            <Button variant="contained" onClick={() => buscarFipe(codigo)} disabled={loading}>
                Consultar
            </Button>

            {loading && <CircularProgress sx={{ mt: 2 }} />}
            {error && <Typography color="error" mt={2}>{error}</Typography>}
            {veiculo && (
                <Box mt={4}>
                    <Typography variant="subtitle1">Marca: {veiculo.marca}</Typography>
                    <Typography>Modelo: {veiculo.modelo}</Typography>
                    <Typography>Ano: {veiculo.anoModelo}</Typography>
                    <Typography>Combustível: {veiculo.combustivel}</Typography>
                    <Typography>Valor: {veiculo.valor}</Typography>
                    <Typography>Mês de referência: {veiculo.mesReferencia}</Typography>
                    
                </Box>
            )}
        </Box>
    );
}
