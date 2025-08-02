// components/WebhookDashboard.tsx
'use client';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import apiClient from '@/services/apiClient'; // Importa a sua instância de axios

// --- Interfaces para os dados do webhook (de acordo com seus modelos Django) ---
interface WebhookPagamento {
  id_mercadopago: string;
  status: string;
  topic: 'payment';
  created_at: string;
}

interface WebhookPreapproval {
  id_mercadopago: string;
  status: string;
  topic: 'preapproval';
  created_at: string;
}

// Junta as duas interfaces em um tipo para o nosso dashboard
type WebhookData = WebhookPagamento | WebhookPreapproval;

// --- Mapeamento de status para cores e ícones do MUI ---
const statusMap: Record<string, { color: 'success' | 'warning' | 'error'; icon: JSX.Element }> = {
  approved: { color: 'success', icon: <CheckCircleOutlineIcon /> },
  authorized: { color: 'success', icon: <CheckCircleOutlineIcon /> },
  pending: { color: 'warning', icon: <ErrorOutlineIcon /> },
  received: { color: 'warning', icon: <ErrorOutlineIcon /> },
  rejected: { color: 'error', icon: <ErrorOutlineIcon /> },
  cancelled: { color: 'error', icon: <ErrorOutlineIcon /> },
};

const WebhookDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<WebhookData[]>([]);

  useEffect(() => {
    const fetchWebhooks = async () => {
      try {
        setLoading(true);
        // Usa a sua instância de apiClient e passa a rota
        const response = await apiClient.get<WebhookData[]>('api/webhooks/');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados do webhook:', error);
        // O interceptador já lidará com a notificação e redirecionamento,
        // então não é necessário tratar o 401 aqui.
      } finally {
        setLoading(false);
      }
    };

    fetchWebhooks();
  }, []);

  if (loading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 5 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Carregando dados...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard de Webhooks do Mercado Pago
        </Typography>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID do Mercado Pago</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Recebido em</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((webhook) => (
              <TableRow key={webhook.id_mercadopago}>
                <TableCell>{webhook.id_mercadopago}</TableCell>
                <TableCell>
                  <Chip label={webhook.topic} size="small" variant="outlined" />
                </TableCell>
                <TableCell>
                  <Chip
                    label={webhook.status}
                    color={statusMap[webhook.status]?.color || 'default'}
                    icon={statusMap[webhook.status]?.icon}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(webhook.created_at).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default WebhookDashboard;