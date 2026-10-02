import { useAuth } from '@/auth/AuthContext';
import { useEffect, useRef } from 'react';

export function useSessionGuard() {
  const { sessionId } = useAuth();
  const sessionRef = useRef(sessionId);

  useEffect(() => {
    sessionRef.current = sessionId;
  }, [sessionId]);

  const isCurrentSession = (activeSessionId: number) => sessionRef.current === activeSessionId;

  return {
    sessionRef,
    isCurrentSession,
  };
}
