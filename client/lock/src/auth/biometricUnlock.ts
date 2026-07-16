import * as LocalAuthentication from 'expo-local-authentication';

export async function biometricUnlock() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) return false;

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Desbloquear Lock',
    fallbackLabel: 'Usar senha do dispositivo',
  });

  return result.success;
}