import LogoShadow from '../assets/images/logo-shadow.png';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { light } from '../theme/light';
import { useRouter } from 'expo-router';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { style } from '../styles/login.styles';

export default function Login() {
  const router = useRouter();

  return (
    <View style={style.container}>
      <View style={style.content}>
        <View style={style.headerSection}>
          <Image source={LogoShadow} style={style.logo} />
          <Text style={style.slogan}>
            Mantenha suas credenciais seguras em um só lugar.
          </Text>
        </View>

        <View style={style.form}>
          <Text style={style.label}>Login</Text>
          <View style={style.inputContainer}>
            <TextInput
              placeholder="E-mail"
              placeholderTextColor={light.appColor}
              keyboardType="email-address"
              autoCapitalize="none"
              style={style.input}
            />
            <MaterialIcons name="alternate-email" size={20} color={light.appColor} />
          </View>

          <View style={[style.inputContainer, style.inputDisabled]}>
            <TextInput
              placeholder="Senha"
              placeholderTextColor={light.contrastColor}
              secureTextEntry
              style={style.input}
            />
            <FontAwesome5 name="lock" size={20} color={light.contrastColor} />
          </View>

          <TouchableOpacity style={style.primaryButton}>
            <Text style={style.primaryButtonText}>Entrar</Text>
          </TouchableOpacity>
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
            <FontAwesome name="google" size={20} color={light.appColor} marginRight="8" />
            <Text style={style.googleText}>Entrar com o Google</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={style.register} onPress={() => router.navigate("/register")}>Quero me cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}