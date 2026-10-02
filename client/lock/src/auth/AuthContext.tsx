import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextData = {
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  hasStoredSession: boolean;
  signIn: (userId: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStoredSession, setHasStoredSession] = useState(false);

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

  async function signIn(userId: string, token: string) {
    await AsyncStorage.multiSet([
      ['user_id', userId],
      ['user_token', token],
    ]);

    setUserId(userId);
    setToken(token);
    setHasStoredSession(true);
  }

  async function signOut() {
    await AsyncStorage.multiRemove(['user_id', 'user_token']);
    setUserId(null);
    setToken(null);
    setHasStoredSession(false);
  }

  return (
    <AuthContext.Provider value={{ userId, token, isLoading, hasStoredSession, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}