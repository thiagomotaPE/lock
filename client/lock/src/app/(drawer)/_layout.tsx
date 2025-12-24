import { Drawer } from 'expo-router/drawer';
import { useTheme } from '@/theme/useTheme';

export default function DrawerLayout() {
  const { theme } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        drawerActiveTintColor: theme.primaryColor,
      }}
    >
      <Drawer.Screen
        name="vault"
        options={{
          title: 'Vault',
        }}
      />
    </Drawer>
  );
}