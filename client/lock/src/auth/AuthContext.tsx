import { logoutUser } from '@/services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextData = {
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  hasStoredSession: boolean;
  sessionId: number;
  signIn: (userId: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStoredSession, setHasStoredSession] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  useEffect(() => {
    const loadSession = async () => {
      const values = await AsyncStorage.multiGet(['user_id', 'user_token']);

      const storedUserId = values[0][1];
      const storedToken = values[1][1];
      const storedSessionExists = !!storedUserId && !!storedToken;

      setHasStoredSession(storedSessionExists);

      if (!storedSessionExists) {
        setIsLoading(false);
        return;
      }

      setUserId(storedUserId);
      setToken(storedToken);
      setIsLoading(false);
    };

    loadSession();
  }, []);

  async function signIn(nextUserId: string, nextToken: string) {
    await AsyncStorage.multiSet([
      ['user_id', nextUserId],
      ['user_token', nextToken],
    ]);

    setUserId(nextUserId);
    setToken(nextToken);
    setHasStoredSession(true);
    setSessionId((current) => current + 1);
    setIsLoading(false);
  }

  async function signOut() {
    const currentToken = token;

    try {
      if (currentToken) {
        await logoutUser(currentToken);
      }
    } catch (error) {
      console.warn('Backend logout failed; clearing local session anyway.', error);
    } finally {
      await AsyncStorage.multiRemove(['user_id', 'user_token', 'user_name', 'user_email']);
      setUserId(null);
      setToken(null);
      setHasStoredSession(false);
      setSessionId((current) => current + 1);
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ userId, token, isLoading, hasStoredSession, sessionId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}