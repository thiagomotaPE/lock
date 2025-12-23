import { fonts } from '@/assets/fonts/fonts';
import { ThemeProvider } from '@/theme/ThemeContext';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loadedFont] = useFonts(fonts);

  useEffect(() => {
    if (loadedFont) {
      SplashScreen.hideAsync();
    }
  }, [loadedFont]);

  if (!loadedFont) {
    return null;
  }

  return (
    <ThemeProvider>
      <Stack  
        screenOptions={{
          headerShown: false
        }}
      />
    </ThemeProvider>
  );
}
