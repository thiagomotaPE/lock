import { Header } from "@/components/header";
import { styles } from "@/styles/userProfile.styles";
import { useTheme } from "@/theme/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfileScreen() {
  const { theme } = useTheme();
  const style = styles(theme);    

  const handleBack = () => {
    router.push('/(drawer)/vault');
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.container}>
        <Header
          onBack={handleBack}
          rightElement={<FontAwesome name="lock" size={26} color={theme.primaryColor} />}
        />
        <Text style={style.title}>Perfil do Usuário</Text>
        <Text style={style.info}>Nome: Thiago Mot</Text>
        <Text style={style.info}>Email: thiago.mot@example.com</Text>
      </View>
    </SafeAreaView>
  );
}