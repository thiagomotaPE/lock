import { styles } from '@/styles/credentialField.styles';
import { useTheme } from '@/theme/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

type CredentialFieldProps = {
  id: string;
  label: string;
  type: string;
  value: string;
  sensitive?: boolean;
  revealed?: boolean;
  onToggleReveal?: (id: string) => void;
};

export function CredentialField({
  id,
  label,
  type,
  value,
  sensitive = false,
  revealed = false,
  onToggleReveal,
}: CredentialFieldProps) {
  const { theme } = useTheme();
  const style = styles(theme);
  const isPassword = type.toLowerCase().includes('password');

  return (
    <View style={style.fieldCard}>
      <View style={style.fieldHeader}>
        <Text style={style.fieldLabel}>{label}</Text>
        <View style={style.fieldTypeBadge}>
          <Text style={style.fieldTypeText}>{type}</Text>
        </View>
      </View>

      {isPassword ? (
        <View style={style.valueRow}>
          <Text style={style.value}>{revealed ? value : '••••••••'}</Text>
          <TouchableOpacity
            onPress={() => onToggleReveal?.(id)}
            style={style.iconButton}
          >
            <Ionicons
              name={revealed ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={theme.primaryColor}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={style.value}>{value || '—'}</Text>
      )}
    </View>
  );
}
