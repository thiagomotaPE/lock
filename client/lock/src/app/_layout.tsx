import { fonts } from '@/assets/fonts/fonts';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import { ThemeProvider } from '@/theme/ThemeContext';
import { useFonts } from 'expo-font';
import { router, SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [loadedFont] = useFonts(fonts);
  const { userId, isLoading } = useAuth();

  useEffect(() => {
    if (!loadedFont || isLoading) return;
    SplashScreen.hideAsync();

    if (!userId) {
      router.replace('/login');
    }
  }, [loadedFont, isLoading, userId]);

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
