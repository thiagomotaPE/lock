import LogoShadow from '@/assets/images/logo-shadow.png';
import { PrimaryButton } from '@/components/primaryButton';
import { PrimaryInput } from '@/components/primaryInput';
import { apiRequest } from '@/services/api';
import { styles } from '@/styles/register.styles';
import { useTheme } from '@/theme/useTheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const router = useRouter();
  const { theme } = useTheme();
  const style = styles(theme);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Atenção', 'Digite um e-mail válido.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Atenção', 'As senhas não coincidem.');
      return;
    }

    const passwordErrors = [];
    if (password.length < 8) passwordErrors.push('• Pelo menos 8 caracteres');
    if (!/[A-Z]/.test(password)) passwordErrors.push('• Pelo menos 1 letra maiúscula');
    if (!/[a-z]/.test(password)) passwordErrors.push('• Pelo menos 1 letra minúscula');
    if (!/\d/.test(password)) passwordErrors.push('• Pelo menos 1 número');
    if (!/[^a-zA-Z0-9]/.test(password)) passwordErrors.push('• Pelo menos 1 caractere especial');
    if (passwordErrors.length > 0) {
      Alert.alert('A senha deve conter:', passwordErrors.join('\n'));
      return;
    }

    try {
      await apiRequest('/user/registerNewUser', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });

      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => router.replace('/login') }
      ]);
    } catch (err: any) {
      const message = err?.message?.includes('HTTP') ? err.message : 'Não foi possível conectar ao servidor.';
      Alert.alert('Erro', message);
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
          <Text style={style.label}>Cadastrar</Text>
          <PrimaryInput label='Username' icon='person' keyboardType="default" autoCapitalize="none" value={username} onChangeText={setUsername} />
          <PrimaryInput label='E-mail' icon='alternate-email' keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
          <PrimaryInput label='Senha' icon='lock' secureTextEntry autoCapitalize="none" value={password} onChangeText={setPassword} />
          <PrimaryInput label='Repita a senha' icon='lock' secureTextEntry autoCapitalize="none" value={confirmPassword} onChangeText={setConfirmPassword} />

          <PrimaryButton title='Cadastrar'onPress={handleRegister} />
        </View>
      
        <View style={style.actions}>
          <View style={style.divider}>
            <View style={style.line} />
            <Text style={style.or}>ou</Text>
            <View style={style.line} />
          </View>

          <TouchableOpacity style={style.googleButton}>
            <FontAwesome name="google" size={20} color={theme.primaryColor} marginRight="8" />
            <Text style={style.googleText}>Cadastrar com o Google</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={style.haveAccount} onPress={() => router.navigate("/")}>Ja tenho uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}