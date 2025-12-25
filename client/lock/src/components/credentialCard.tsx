import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/theme/useTheme';
import { styles } from '@/styles/credentialCard.styles';

type CredentialCardProps = {
  title: string;
};

export function CredentialCard({ title }: CredentialCardProps) {
    const { theme } = useTheme();
    const style = styles(theme);

    return (
        <View style={style.card}>
        <Text style={style.cardText}>{title}</Text>
        <Ionicons name="lock-closed" size={18} color={theme.primaryColor}/>
        </View>
    );
}
