import LogoShadow from '@/assets/images/logo-shadow.png';
import { PrimaryButton } from '@/components/primaryButton';
import { styles } from '@/styles/register.styles';
import { useTheme } from '@/theme/useTheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Register() {
  const router = useRouter();
  const { theme } = useTheme();
  const style = styles(theme);

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
          <View style={style.inputContainer}>
            <TextInput
              placeholder="Username"
              placeholderTextColor={theme.primaryColor}
              keyboardType="email-address"
              autoCapitalize="none"
              style={style.input}
            />
            <MaterialIcons name="alternate-email" size={20} color={theme.primaryColor} />
          </View>
          <View style={[style.inputContainer, style.inputDisabled]}>
            <TextInput
              placeholder="E-mail"
              placeholderTextColor={theme.contrastColor}
              keyboardType="email-address"
              autoCapitalize="none"
              style={style.input}
            />
            <MaterialIcons name="alternate-email" size={20} color={theme.contrastColor} />
          </View>

          <View style={[style.inputContainer, style.inputDisabled]}>
            <TextInput
              placeholder="Senha"
              placeholderTextColor={theme.contrastColor}
              secureTextEntry
              style={style.input}
            />
            <FontAwesome5 name="lock" size={20} color={theme.contrastColor} />
          </View>
          <View style={[style.inputContainer, style.inputDisabled]}>
            <TextInput
              placeholder="Repita a senha"
              placeholderTextColor={theme.contrastColor}
              secureTextEntry
              style={style.input}
            />
            <FontAwesome5 name="lock" size={20} color={theme.contrastColor} />
          </View>

          <PrimaryButton title='Cadastrar' route='/login' />
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