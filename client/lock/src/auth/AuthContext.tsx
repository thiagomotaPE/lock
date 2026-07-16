import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { createContext, useContext, useEffect, useState } from 'react';
import { biometricUnlock } from './biometricUnlock';

let biometricPromptStarted = false;

type AuthContextData = {
  userId: string | null;
  token: string | null;
  isLoading: boolean;
  hasStoredSession: boolean;
  isBiometricSupported: boolean;
  signIn: (userId: string, token: string) => Promise<void>;
  biometricSignIn: () => Promise<boolean>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasStoredSession, setHasStoredSession] = useState(false);
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

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

      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const biometricSupported = hasHardware && isEnrolled;

      setIsBiometricSupported(biometricSupported);

      if (!biometricSupported) {
        setIsLoading(false);
        return;
      }

      if (biometricPromptStarted) {
        setIsLoading(false);
        return;
      }

      biometricPromptStarted = true;
      const ok = await biometricUnlock();
      biometricPromptStarted = false;

      if (!ok) {
        setUserId(null);
        setToken(null);
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
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const biometricSupported = hasHardware && isEnrolled;

    await AsyncStorage.multiSet([
      ['user_id', userId],
      ['user_token', token],
      ['biometric_enabled', biometricSupported ? 'true' : 'false'],
    ]);
    setUserId(userId);
    setToken(token);
    setHasStoredSession(true);
    setIsBiometricSupported(biometricSupported);
  }

  async function biometricSignIn() {
    const values = await AsyncStorage.multiGet(['user_id', 'user_token']);
    const storedUserId = values[0][1];
    const storedToken = values[1][1];

    if (!storedUserId || !storedToken) {
      return false;
    }

    const ok = await biometricUnlock();

    if (!ok) {
      return false;
    }

    setUserId(storedUserId);
    setToken(storedToken);
    return true;
  }

  async function signOut() {
    await AsyncStorage.multiRemove(['user_id', 'user_token', 'biometric_enabled']);
    setUserId(null);
    setToken(null);
    setHasStoredSession(false);
    setIsBiometricSupported(false);
  }

  return (
    <AuthContext.Provider value={{ userId, token, isLoading, hasStoredSession, isBiometricSupported, signIn, biometricSignIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}