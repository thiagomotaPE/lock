import { Header } from "@/components/header";
import { styles } from "@/styles/userProfile.styles";
import { useTheme } from "@/theme/useTheme";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfileScreen() {
  const { theme } = useTheme();
  const style = styles(theme);    
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    AsyncStorage.multiGet(['user_name', 'user_email']).then((values) => {
      setUsername(values[0][1] ?? '');
      setEmail(values[1][1] ?? '');
    });
  }, []);

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
        <Text style={style.info}>Nome: {username}</Text>
        <Text style={style.info}>Email: {email}</Text>
      </View>
    </SafeAreaView>
  );
}