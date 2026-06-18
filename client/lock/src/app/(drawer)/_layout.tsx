import { PrimaryButton } from '@/components/primaryButton';
import { useTheme } from '@/theme/useTheme';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Drawer } from 'expo-router/drawer';
import { Switch, Text, View } from 'react-native';

function CustomDrawerContent({
  props,
  theme,
  isDark,
  toggleTheme,
}: {
  props: any;
  theme: ReturnType<typeof useTheme>['theme'];
  isDark: boolean;
  toggleTheme: () => void;
}) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ backgroundColor: theme.backgroundColor, flex: 1 }}
    >
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      <PrimaryButton title={'Criar nova credencial'} route='/credentialForm' textStyle={{fontSize: 16}}/>

      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: theme.borderColor,
          paddingHorizontal: 16,
          paddingVertical: 16,
          marginTop: 20,
        }}
      >
        <Text style={{ color: theme.textColor, fontSize: 14, marginBottom: 10 }}>
          Tema
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: theme.textColor, fontSize: 16 }}>
            {isDark ? 'Escuro' : 'Claro'}
          </Text>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            thumbColor={theme.primaryColor}
            trackColor={{ true: theme.primaryColor, false: theme.borderColor }}
          />
        </View>
      </View>

      <PrimaryButton title={'Sair'} route='/login' 
        buttonStyle={{
          backgroundColor: theme.backgroundColor2, 
          borderColor: theme.borderColor, 
          borderWidth: 1
        }} 
        textStyle={{
          fontSize: 16, 
          color: theme.dangerColor
        }}/>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Drawer
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.backgroundColor,
        },
        drawerActiveTintColor: theme.primaryColor,
        drawerInactiveTintColor: theme.textColor,
        drawerLabelStyle: {
          color: theme.textColor,
        },
      }}
      drawerContent={(props) => (
        <CustomDrawerContent
          props={props}
          theme={theme}
          isDark={isDark}
          toggleTheme={toggleTheme}
        />
      )}
    >
      <Drawer.Screen name="vault" options={{ title: 'Credenciais' }} />
      <Drawer.Screen name="categories" options={{ title: 'Categorias' }} />
      <Drawer.Screen name="credentialForm" options={{ title: 'Criar nova credencial' }} />
    </Drawer>
  );
}