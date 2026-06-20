import { styles } from '@/styles/credentialField.styles';
import { useTheme } from '@/theme/useTheme';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!value) return;

    await Clipboard.setStringAsync(value);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1200);
  };

  return (
    <TouchableOpacity style={style.fieldCard} onPress={handleCopy} activeOpacity={0.8}>
      <View style={style.fieldHeader}>
        <Text style={style.fieldLabel}>
          {label}   <FontAwesome name="clipboard" size={16} color={theme.primaryColor} />
        </Text>
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
            <FontAwesome
              name={revealed ? 'eye-slash' : 'eye'}
              size={18}
              color={theme.primaryColor}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={style.value}>{value || '—'}</Text>
      )}

      {copied && (
        <View style={style.copiedToast}>
          <Text style={style.copiedText}>Copiado</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
