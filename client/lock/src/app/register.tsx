import LogoShadow from '@/assets/images/logo-shadow.png';
import { PrimaryButton } from '@/components/primaryButton';
import { PrimaryInput } from '@/components/primaryInput';
import { styles } from '@/styles/register.styles';
import { useTheme } from '@/theme/useTheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
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
          <PrimaryInput label='Username' icon='person' keyboardType="default" autoCapitalize="none"/>
          <PrimaryInput label='E-mail' icon='alternate-email' keyboardType="email-address" autoCapitalize="none"/>
          <PrimaryInput label='Senha' icon='lock' secureTextEntry autoCapitalize="none"/>
          <PrimaryInput label='Repita a senha' icon='lock' secureTextEntry autoCapitalize="none"/>

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