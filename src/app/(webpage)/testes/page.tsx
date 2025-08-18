'use client';
import { useMemo } from 'react';
import { Box, Button, Typography, CircularProgress } from '@mui/material';
import { useUsuarioPerfil } from '@/hooks/useUsuarioPerfil';
import { useAuth } from '@/contexts/AuthContext';

export default function TesteFipe() {
  const { user } = useAuth();
  const userId = user?.id;

  const { usuarioPerfil, usuarioPerfilLoading, usuarioPerfilRefresh } = useUsuarioPerfil(
    useMemo(() => ({ id: userId }), [userId])
  );

  if (usuarioPerfilLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!usuarioPerfil || usuarioPerfil.length === 0) {
    return (
      <Box mt={4}>
        <Typography>Nenhum perfil encontrado para o usuário.</Typography>
        <Button variant="contained" onClick={usuarioPerfilRefresh} sx={{ mt: 2 }}>
          Atualizar
        </Button>
      </Box>
    );
  }

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Perfis do Usuário
      </Typography>
      {usuarioPerfil.map((up) => (
        <Box key={up.id} mb={2} p={2} border="1px solid #ccc" borderRadius={2}>
          <Typography>
            <strong>Perfil:</strong> {up.perfil.nome}
          </Typography>
          <Typography>
            <strong>Usuário:</strong> {up.usuario.username} ({up.usuario.email})
          </Typography>
          <Typography>
            <strong>Permissões:</strong> {up.perfil.permissoes?.join(', ') || 'Nenhuma'}
          </Typography>
        </Box>
      ))}
      <Button variant="contained" onClick={usuarioPerfilRefresh} sx={{ mt: 2 }}>
        Atualizar
      </Button>
    </Box>
  );
}
