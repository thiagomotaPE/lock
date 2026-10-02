import { logoutUser } from '@/services/authService';
import {
  clearStoredSession,
  isDeviceAuthEnabled,
  restoreStoredSession,
  saveStoredSession,
  setDeviceAuthEnabled,
} from '@/services/localAuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthContextData = {
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  hasStoredSession: boolean;
  deviceAuthEnabled: boolean;
  sessionId: number;
  signIn: (userId: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
  setDeviceAuthPreference: (enabled: boolean) => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStoredSession, setHasStoredSession] = useState(false);
  const [deviceAuthEnabled, setDeviceAuthEnabledState] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  useEffect(() => {
    const loadSession = async () => {
      const [{ userId: storedUserId, token: storedToken }, enabled] = await Promise.all([
        restoreStoredSession(),
        isDeviceAuthEnabled(),
      ]);

      const storedSessionExists = !!storedUserId && !!storedToken;

      setHasStoredSession(storedSessionExists);
      setDeviceAuthEnabledState(enabled);

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
    await saveStoredSession(nextUserId, nextToken);

    setUserId(nextUserId);
    setToken(nextToken);
    setHasStoredSession(true);
    setSessionId((current) => current + 1);
    setIsLoading(false);
  }

  async function setDeviceAuthPreference(enabled: boolean) {
    await setDeviceAuthEnabled(enabled);
    setDeviceAuthEnabledState(enabled);
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
      await Promise.all([
        clearStoredSession(),
        AsyncStorage.multiRemove(['user_name', 'user_email']),
      ]);
      setUserId(null);
      setToken(null);
      setHasStoredSession(false);
      setSessionId((current) => current + 1);
      setIsLoading(false);
    }
  }

  return (
    <AuthContext.Provider value={{ userId, token, isLoading, hasStoredSession, deviceAuthEnabled, sessionId, signIn, signOut, setDeviceAuthPreference }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}