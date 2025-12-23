import { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { dark } from './dark';
import { light } from './light';

type Theme = typeof light;

type ThemeContextData = {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useColorScheme();
  const [manualTheme, setManualTheme] = useState<'light' | 'dark' | null>(null);

  const isDark =
    manualTheme === 'dark' ||
    (manualTheme === null && systemScheme === 'dark');

  const theme = useMemo(() => (isDark ? dark : light), [isDark]);

  function toggleTheme() {
    setManualTheme(isDark ? 'light' : 'dark');
  }

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}