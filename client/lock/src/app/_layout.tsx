import { fonts } from '@/assets/fonts/fonts';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import { authenticateWithDevice } from '@/services/localAuthService';
import { ThemeProvider } from '@/theme/ThemeContext';
import { useFonts } from 'expo-font';
import { router, SplashScreen, Stack } from 'expo-router';
import { useEffect, useRef } from 'react';

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [loadedFont] = useFonts(fonts);
  const { userId, isLoading, hasStoredSession, deviceAuthEnabled } = useAuth();
  const didAttemptLocalAuthRef = useRef(false);

  useEffect(() => {
    if (!loadedFont || isLoading) return;
    SplashScreen.hideAsync();

    if (!hasStoredSession) {
      router.replace('/login');
      return;
    }

    if (deviceAuthEnabled && !didAttemptLocalAuthRef.current) {
      didAttemptLocalAuthRef.current = true;

      authenticateWithDevice().then(({ success }) => {
        if (success) {
          router.replace('/(drawer)/vault');
          return;
        }

        router.replace('/login');
      }).catch(() => {
        router.replace('/login');
      });
      return;
    }

    if (userId) {
      router.replace('/(drawer)/vault');
      return;
    }

    router.replace('/login');
  }, [deviceAuthEnabled, hasStoredSession, isLoading, loadedFont, userId]);

  if (!loadedFont || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function Layout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RootLayout />
      </AuthProvider>
    </ThemeProvider>
  );
}
