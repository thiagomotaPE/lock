import { styles } from '@/styles/credentialCard.styles';
import { useTheme } from '@/theme/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity } from 'react-native';

type CredentialCardProps = {
  title: string;
  onPress?: () => void;
};

export function CredentialCard({ title, onPress }: CredentialCardProps) {
  const { theme } = useTheme();
  const style = styles(theme);

  return (
    <TouchableOpacity style={style.card} onPress={onPress}>
      <Text style={style.cardText}>{title}</Text>
      <Ionicons name="lock-closed" size={18} color={theme.primaryColor} />
    </TouchableOpacity>
  );
}
