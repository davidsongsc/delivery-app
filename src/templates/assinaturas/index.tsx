import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Importa useSearchParams do Next.js
import {
  Container,
  Box,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';

// Mapeamento de status para mensagens e cores
const statusMessages = {
  approved: {
    severity: 'success',
    title: 'Assinatura Aprovada!',
    description: 'Sua assinatura foi ativada com sucesso. Obrigado!',
  },
  rejected: {
    severity: 'error',
    title: 'Assinatura Recusada',
    description: 'Houve um problema com a sua assinatura. Por favor, tente novamente.',
  },
  pending: {
    severity: 'info',
    title: 'Assinatura Pendente',
    description: 'Sua assinatura está em análise. Você será notificado por e-mail sobre o status.',
  },
};

const SubscriptionStatus: React.FC = () => {
  const searchParams = useSearchParams(); // Usa o hook useSearchParams
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    // Lê o parâmetro 'status' da URL
    const urlStatus = searchParams.get('status');
    if (urlStatus) {
      setStatus(urlStatus);
    } else {
      setStatus('unknown');
    }
  }, [searchParams]); // O useEffect depende do objeto searchParams

  // Se o status ainda não foi lido da URL, exibe um spinner de carregamento
  if (!status) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 5, textAlign: 'center' }}>
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Verificando o status da assinatura...
          </Typography>
        </Box>
      </Container>
    );
  }

  // Se o status for conhecido, exibe a mensagem apropriada
  const message = statusMessages[status] || {
    severity: 'warning',
    title: 'Status Desconhecido',
    description: 'Não foi possível verificar o status da assinatura. Verifique seu e-mail.',
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5 }}>
        <Alert severity={message.severity} sx={{ p: 3 }}>
          <Typography variant="h5" component="div" gutterBottom>
            {message.title}
          </Typography>
          <Typography variant="body1">
            {message.description}
          </Typography>
        </Alert>
      </Box>
    </Container>
  );
};

export default React.memo(SubscriptionStatus);
