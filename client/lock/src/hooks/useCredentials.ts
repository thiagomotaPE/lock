import { useAuth } from '@/auth/AuthContext';
import { useSessionGuard } from '@/hooks/useSessionGuard';
import { getCredentialsForUser, type CredentialListItem } from '@/services/credentialService';
import { useCallback, useEffect, useState } from 'react';

export function useCredentials() {
  const { userId, token } = useAuth();
  const { sessionRef, isCurrentSession } = useSessionGuard();
  const [credentials, setCredentials] = useState<CredentialListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCredentials = useCallback(async () => {
    if (!userId || !token) {
      setCredentials([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const activeSessionId = sessionRef.current;
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCredentialsForUser(userId, token);

      if (!isCurrentSession(activeSessionId)) {
        return;
      }

      setCredentials(data);
    } catch (fetchError) {
      if (!isCurrentSession(activeSessionId)) {
        return;
      }

      setError('Não foi possível carregar as credenciais. Verifique se o servidor está rodando.');
    } finally {
      if (isCurrentSession(activeSessionId)) {
        setIsLoading(false);
      }
    }
  }, [isCurrentSession, sessionRef, token, userId]);

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  return {
    credentials,
    isLoading,
    error,
    reload: loadCredentials,
  };
}
