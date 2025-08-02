import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Grid,
  Card,
  CardContent,
  CardActions,
  Stack,
} from '@mui/material';
import apiClient from '@/services/apiClient';
import { useRouter } from 'next/navigation';

// Enum (ou objeto) para os tipos de plano
const PlanTypes = {
  BASICO: 'Básico',
  INTERMEDIARIO: 'Intermediário',
  SUPORTE_COMPLETO: 'Suporte Completo',
  PROPOSTAS: 'Consultar Propostas',
};

// Dados completos dos planos, incluindo a descrição
const plans = [
  {
    type: PlanTypes.BASICO,
    label: 'Básico',
    value: 79.95,
    description: 'Funcionalidades essenciais para começar a vender online, com suporte via chat.',
  },
  {
    type: PlanTypes.INTERMEDIARIO,
    label: 'Intermediário',
    value: 139.95,
    description: 'Recursos avançados de gestão e relatórios detalhados. Ideal para crescimento.',
  },
  {
    type: PlanTypes.SUPORTE_COMPLETO,
    label: 'Suporte Completo',
    value: 199.95,
    description: 'Todas as ferramentas e suporte dedicado 24/7. Máxima performance e segurança.',
  },
  {
    type: PlanTypes.PROPOSTAS,
    label: 'Consultar Propostas',
    value: 0,
    description: 'Solução customizada para grandes volumes ou necessidades específicas. Entre em contato.',
  },
];

const CreateSubscription: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  const handleSelectPlan = (plan: any) => {
    setSelectedPlan(plan);
  };

  const handleCreatePlan = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Validação final antes de enviar
    if (!selectedPlan || selectedPlan.value <= 0) {
      setError('Por favor, selecione um plano válido.');
      setLoading(false);
      return;
    }

    try {
      const planData = {
        reason: 'Lojavel Tecnologia - Assinatura',
        transaction_amount: selectedPlan.value,
      };

      const response = await apiClient.post<{ init_point: string }>(
        'api/plan-recorrencia/',
        planData
      );

      const { init_point } = response.data;
      if (init_point) {
        window.location.href = init_point;
      } else {
        setError('Erro: A URL de autorização não foi recebida.');
      }
    } catch (err: any) {
      console.error('Erro ao criar plano de recorrência:', err);
      setError(err.response?.data?.error || 'Erro desconhecido ao criar plano.');
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = selectedPlan && selectedPlan.value > 0;

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Criar Plano de Assinatura
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Razão Social: Lojavel Tecnologia
        </Typography>
      </Box>

      <form onSubmit={handleCreatePlan}>
        <Grid container spacing={3} justifyContent="center">
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={3} key={plan.type}>
              <Card
                onClick={() => handleSelectPlan(plan)}
                sx={{
                  cursor: 'pointer',
                  p: 2,
                  textAlign: 'center',
                  height: '100%',
                  border: selectedPlan?.type === plan.type ? '2px solid #1976d2' : '2px solid transparent',
                  transition: 'border 0.3s',
                  '&:hover': {
                    borderColor: '#1976d2',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" component="div">
                    {plan.label}
                  </Typography>
                  <Box sx={{ my: 2 }}>
                    {plan.value > 0 && (
                      <Typography variant="h5" color="primary">
                        R$ {plan.value.toFixed(2)}
                      </Typography>
                    )}
                    {plan.type === PlanTypes.PROPOSTAS && (
                      <Typography variant="h5" color="primary">
                        Entre em contato
                      </Typography>
                    )}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {plan.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}
        
        {selectedPlan?.type === PlanTypes.PROPOSTAS && (
          <Alert severity="info" sx={{ mt: 4 }}>
            Para este plano, é necessário entrar em contato para criar a proposta manualmente.
          </Alert>
        )}

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ width: { xs: '100%', md: '300px' } }}
            disabled={loading || !isFormValid}
          >
            {loading ? <CircularProgress size={24} /> : 'Criar Plano e Assinatura'}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default React.memo(CreateSubscription);
