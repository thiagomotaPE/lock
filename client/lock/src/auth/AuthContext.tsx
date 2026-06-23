import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextData = {
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  signIn: (userId: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.multiGet(['user_id', 'user_token']).then((values) => {
      setUserId(values[0][1]);
      setToken(values[1][1]);
      setIsLoading(false);
    });
  }, []);

  async function signIn(userId: string, token: string) {
    await AsyncStorage.multiSet([['user_id', userId], ['user_token', token]]);
    setUserId(userId);
    setToken(token);
  }

  async function signOut() {
    await AsyncStorage.multiRemove(['user_id', 'user_token']);
    setUserId(null);
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ userId, token, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}