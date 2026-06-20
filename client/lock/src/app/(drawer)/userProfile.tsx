import { styles } from "@/styles/userProfile.styles";
import { useTheme } from "@/theme/useTheme";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfileScreen() {
  const { theme } = useTheme();
  const style = styles(theme);    

  return (
    <SafeAreaView style={style.safeArea}>
        <View style={style.container}>
        <Text style={style.title}>Perfil do Usuário</Text>
        <Text style={style.info}>Nome: Thiago Mot</Text>
        <Text style={style.info}>Email: thiago.mot@example.com</Text>
        </View>
    </SafeAreaView>
  );
}