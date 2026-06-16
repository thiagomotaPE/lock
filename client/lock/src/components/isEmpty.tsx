import { measures } from '@/assets/measures/measures';
import { styles } from '@/styles/isEmpty.styles';
import { useTheme } from '@/theme/useTheme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Text, View } from 'react-native';

export function IsEmpty() {
    const { theme } = useTheme();
    const style = styles(theme);

    return (
        <View style={style.emptyContainer}>
            <View style={style.iconRow}>
                <FontAwesome5 name="user-lock" size={measures.icon.huge} color={theme.borderColor} />
            </View>

            <Text style={style.emptyText}>
                Deixa que a gente guarda seus acessos pra você (com mais segurança
                que esconder a senha debaixo do teclado 🤪).
            </Text>

            <Text style={style.emptySubtitle}>
                Adicione uma conta agora!
            </Text>
        </View>
    );
}
