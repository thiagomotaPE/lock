import { Header } from '@/components/header';
import { PrimaryButton } from '@/components/primaryButton';
import { styles } from '@/styles/credentialDetails.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CredentialField = {
  key: string;
  label: string;
  type: string;
  value: string;
  sensitive?: boolean;
};

type Credential = {
  id?: string;
  credentialName: string;
  categoryName: string;
  fields: CredentialField[];
};

const defaultCredential: Credential = {
  id: 'demo',
  credentialName: 'Exemplo de conta',
  categoryName: 'Sites',
  fields: [
    { key: '1', label: 'Usuário', type: 'TEXT', value: 'usuario@email.com', sensitive: false },
    { key: '2', label: 'Senha', type: 'PASSWORD', value: 'minhaSenha123', sensitive: true },
    { key: '3', label: 'URL', type: 'TEXT', value: 'https://exemplo.com', sensitive: false },
  ],
};

export default function CredentialDetailsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const style = styles(theme);
  const params = useLocalSearchParams<{ credential?: string }>();
  const [revealedFields, setRevealedFields] = useState<Record<string, boolean>>({});

  const credential = useMemo<Credential>(() => {
    if (typeof params.credential === 'string' && params.credential) {
      try {
        return JSON.parse(params.credential) as Credential;
      } catch {
        return defaultCredential;
      }
    }

    return defaultCredential;
  }, [params.credential]);

  const handleBack = () => {
    if (navigation.canGoBack?.()) {
      navigation.goBack();
      return;
    }

    router.back();
  };

  const toggleReveal = (id: string) => {
    setRevealedFields((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <Header
        onBack={handleBack}
        onRightPress={() => {
          // TODO: adicionar ação do menu
        }}
        rightElement={<FontAwesome5 name="ellipsis-v" size={26} color={theme.primaryColor} />}
      />

      <ScrollView contentContainerStyle={style.scrollContent}>
        <View style={style.card}>
          <View style={style.titleRow}>
            <View style={style.titleWrapper}>
              <Text style={style.name}>{credential.credentialName}</Text>
            </View>

            <View style={style.badge}>
              <Text style={style.badgeText}>{credential.categoryName}</Text>
            </View>
          </View>

          {credential.fields.length === 0 ? (
            <View style={style.emptyState}>
              <Text style={style.emptyText}>Nenhum campo cadastrado.</Text>
            </View>
          ) : (
            credential.fields.map((field) => (
              <View key={field.key ?? `${field.label}-${field.type}-${field.value}`} style={style.fieldCard}>
                <View style={style.fieldHeader}>
                  <Text style={style.fieldLabel}>{field.label}</Text>
                  <View style={style.fieldTypeBadge}>
                    <Text style={style.fieldTypeText}>{field.type}</Text>
                  </View>
                </View>

                {field.type.toLowerCase().includes('password') ? (
                  <View style={style.valueRow}>
                    <Text style={style.value}>
                      {revealedFields[field.key] ? field.value : '••••••••'}
                    </Text>
                    <TouchableOpacity onPress={() => toggleReveal(field.key)} style={style.iconButton}>
                      <Ionicons
                        name={revealedFields[field.key] ? 'eye-off-outline' : 'eye-outline'}
                        size={18}
                        color={theme.primaryColor}
                      />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={style.value}>{field.value || '—'}</Text>
                )}
              </View>
            ))
          )}
        </View>
        <PrimaryButton title="Editar" onPress={() => router.push('/(drawer)/credentialForm')} textStyle={style.editButtonText}/>
      </ScrollView>
    </SafeAreaView>
  );
}
