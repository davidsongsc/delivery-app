import { useState, useEffect } from 'react';
import { WahaContact, wahaService } from '@/services/waha.service';

export const useWahaContacts = () => {
  const [contacts, setContacts] = useState<WahaContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await wahaService.getContacts();
      setContacts(data);
    } catch (err: any) {
      setError(err?.message || 'Erro ao buscar contatos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return { contacts, loading, error, refresh: fetchContacts };
};
