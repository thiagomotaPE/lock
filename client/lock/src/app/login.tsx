import LogoShadow from '@/assets/images/logo-shadow.png';
import { useAuth } from '@/auth/AuthContext';
import { PrimaryButton } from '@/components/primaryButton';
import { PrimaryInput } from '@/components/primaryInput';
import { styles } from '@/styles/login.styles';
import { useTheme } from '@/theme/useTheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { theme } = useTheme();
  const style = styles(theme);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2:8080/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = await response.json();
      await signIn(data.userId, data.token);
      await AsyncStorage.multiSet([
        ['user_name', data.username],
        ['user_email', data.email],
      ]);
      router.replace('/(drawer)/vault');
    } catch {
      Alert.alert('Erro', 'E-mail ou senha inválidos.');
    } finally {
    }
  };

  return (
    <SafeAreaView style={[{ flex: 1 }, style.container]}>
      <View style={style.content}>
        <View style={style.headerSection}>
          <Image source={LogoShadow} style={style.logo} />
          <Text style={style.slogan}>
            Mantenha suas credenciais seguras em um só lugar.
          </Text>
        </View>

        <View style={style.form}>
          <Text style={style.label}>Login</Text>
          <PrimaryInput 
            label='E-mail' 
            icon='alternate-email' 
            keyboardType="email-address" 
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <PrimaryInput 
            label='Senha' 
            icon='lock' 
            secureTextEntry 
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
          />
          <PrimaryButton title='Entrar' onPress={handleLogin} />
        </View>
      
        <View style={style.actions}>
          <TouchableOpacity>
            <Text style={style.forgot}>Esqueci minha senha</Text>
          </TouchableOpacity>

          <View style={style.divider}>
            <View style={style.line} />
            <Text style={style.or}>ou</Text>
            <View style={style.line} />
          </View>

          <TouchableOpacity style={style.googleButton}>
            <FontAwesome name="google" size={20} color={theme.primaryColor} marginRight="8" />
            <Text style={style.googleText}>Entrar com o Google</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={style.register} onPress={() => router.navigate("/register")}>Quero me cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}