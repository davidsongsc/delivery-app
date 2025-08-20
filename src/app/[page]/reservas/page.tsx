'use client';
import ReservaClientePage from "@/templates/reservas";
import { useLoja } from '@/contexts/LojaContext';

export default function RecuperarPage() {
  const { corporation, loading } = useLoja();

  if (loading) return <p>Carregando...</p>;

  return <ReservaClientePage corporation={corporation} />;
}
