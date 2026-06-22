import { CredentialField } from '@/components/credentialField';
import { Header } from '@/components/header';
import { PrimaryButton } from '@/components/primaryButton';
import { PrimaryModal } from '@/components/primaryModal';
import { styles } from '@/styles/credentialDetails.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
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
  credentialName: 'Not found',
  categoryName: 'Not found',
  fields: [
    { key: '1', label: 'Usuário', type: 'TEXT', value: 'Not found', sensitive: false },
    { key: '2', label: 'Senha', type: 'PASSWORD', value: 'Not found', sensitive: true },
    { key: '3', label: 'URL', type: 'TEXT', value: 'Not found', sensitive: false },
  ],
};

export default function CredentialDetailsScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const style = styles(theme);
  const params = useLocalSearchParams<{ credentialId?: string }>();
  const [credential, setCredential] = useState<Credential>(defaultCredential);
  const [revealedFields, setRevealedFields] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    const fetchCredential = async () => {
      if (!params.credentialId) {
        setError('Credencial não encontrada.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://10.0.2.2:8080/credential/getCredentialDetails/${params.credentialId}`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        setCredential(data);
      } catch (fetchError) {
        console.warn('Erro ao carregar credencial:', fetchError);
        setError('Não foi possível carregar a credencial.');
        setCredential(defaultCredential);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCredential();
  }, [params.credentialId]);

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

  const handleDeleteCredential = async () => {
    setDeleteModalVisible(false);

    try {
      router.back();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <Header
        onBack={handleBack}
        menuOptions={[
          {label: 'Excluir', onPress: () => setDeleteModalVisible(true)},
        ]}
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

          {credential?.fields?.length === 0 ? (
            <View style={style.emptyState}>
              <Text style={style.emptyText}>Nenhum campo cadastrado.</Text>
            </View>
          ) : (
            credential?.fields?.map((field) => (
              <CredentialField
                key={field.key ?? `${field.label}-${field.type}-${field.value}`}
                id={field.key}
                label={field.label}
                type={field.type}
                value={field.value}
                sensitive={field.sensitive}
                revealed={revealedFields[field.key]}
                onToggleReveal={toggleReveal}
              />
            ))
          )}
        </View>
        <PrimaryButton title="Editar" onPress={() => router.push('/credentialForm')} textStyle={style.editButtonText}/>

        <PrimaryModal
          visible={deleteModalVisible}
          title="Deseja mesmo excluir a credencial?"
          bodyType="text"
          text="Certifique-se de que não vai mais precisar desta credencial antes de apagá-la"
          confirmText="Excluir"
          isSubmitting={false}
          onRequestClose={() => setDeleteModalVisible(false)}
          onSubmit={handleDeleteCredential}
        />
      </ScrollView>
    </SafeAreaView>
  );
}