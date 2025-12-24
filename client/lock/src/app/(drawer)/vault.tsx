import { styles } from "@/styles/vault.styles";
import { useTheme } from '@/theme/useTheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Vault() {
    const { theme } = useTheme();
    const style = styles(theme);
    const navigation = useNavigation();


    return (
        <SafeAreaView style={[{ flex: 1 }, style.container]}>
            <View style={style.content}>
                <View style={style.header}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <FontAwesome5 name="stream" size={30} color={theme.primaryColor} />
                    </TouchableOpacity>
                    <View style={style.searchContainer}>
                        <TextInput
                            placeholder="Pesquisar..."
                            placeholderTextColor={theme.contrastColor}
                            style={style.searchInput}
                        />
                        <FontAwesome5 name="search" size={24} color={theme.primaryColor}/>
                    </View>
                </View>

                <View style={style.filterRow}>
                    <TouchableOpacity style={style.filter}>
                        <Text style={style.filterText}>Tudo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="folder" size={22} color={theme.textColor}/>
                    </TouchableOpacity>
                </View>

                <View style={style.emptyContainer}>
                    <View style={style.iconRow}>
                        <FontAwesome5 name="user-lock" size={150} color={theme.borderColor} />
                    </View>

                    <Text style={style.emptyText}>
                        Deixa que a gente guarda seus acessos pra você (com mais segurança
                        que esconder a senha debaixo do teclado 🤪).
                    </Text>

                    <Text style={style.emptySubtitle}>
                        Adicione uma conta agora!
                    </Text>
                </View>

                <TouchableOpacity style={style.fab}>
                    <FontAwesome5 name="plus" size={26} color={theme.textColor2} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}