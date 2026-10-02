import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

export const DEVICE_AUTH_ENABLED_KEY = 'lock_device_auth_enabled';
export const USER_ID_KEY = 'lock_user_id';
export const USER_TOKEN_KEY = 'lock_user_token';

export type LocalAuthAvailability = {
  isAvailable: boolean;
  isEnrolled: boolean;
  supportedTypes: LocalAuthentication.AuthenticationType[];
};

export async function getLocalAuthAvailability(): Promise<LocalAuthAvailability> {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

  return {
    isAvailable: hasHardware && isEnrolled,
    isEnrolled,
    supportedTypes,
  };
}

export async function isDeviceAuthEnabled(): Promise<boolean> {
  try {
    const value = await SecureStore.getItemAsync(DEVICE_AUTH_ENABLED_KEY);
    return value === 'true';
  } catch {
    return false;
  }
}

export async function setDeviceAuthEnabled(enabled: boolean): Promise<void> {
  await SecureStore.setItemAsync(DEVICE_AUTH_ENABLED_KEY, String(enabled));
}

export async function saveStoredSession(userId: string, token: string): Promise<void> {
  await Promise.all([
    SecureStore.setItemAsync(USER_ID_KEY, userId),
    SecureStore.setItemAsync(USER_TOKEN_KEY, token),
  ]);
}

export async function restoreStoredSession(): Promise<{ userId: string | null; token: string | null }> {
  const [userId, token] = await Promise.all([
    SecureStore.getItemAsync(USER_ID_KEY),
    SecureStore.getItemAsync(USER_TOKEN_KEY),
  ]);

  if (userId && token) {
    return { userId, token };
  }

  const legacyValues = await AsyncStorage.multiGet(['user_id', 'user_token']);
  const legacyUserId = legacyValues[0][1];
  const legacyToken = legacyValues[1][1];

  if (legacyUserId && legacyToken) {
    await saveStoredSession(legacyUserId, legacyToken);
    await AsyncStorage.multiRemove(['user_id', 'user_token']);
    return { userId: legacyUserId, token: legacyToken };
  }

  return {
    userId: null,
    token: null,
  };
}

export async function clearStoredSession(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(USER_ID_KEY),
    SecureStore.deleteItemAsync(USER_TOKEN_KEY),
    AsyncStorage.multiRemove(['user_id', 'user_token']),
  ]);
}

export async function authenticateWithDevice(): Promise<{ success: boolean; error?: string | null }> {
  const { isAvailable } = await getLocalAuthAvailability();

  if (!isAvailable) {
    return { success: false, error: 'NOT_AVAILABLE' };
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Use a biometria ou senha do seu dispositivo para entrar no Lock.',
    cancelLabel: 'Entrar com e-mail e senha',
    disableDeviceFallback: false,
  });

  return {
    success: result.success,
    error: result.success ? null : 'FAILED',
  };
}
