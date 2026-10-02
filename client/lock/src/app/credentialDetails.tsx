import { useAuth } from '@/auth/AuthContext';
import { CredentialField } from '@/components/credentialField';
import { Header } from '@/components/header';
import { PrimaryButton } from '@/components/primaryButton';
import { PrimaryModal } from '@/components/primaryModal';
import { deleteCredential, getCredentialDetails } from '@/services/credentialService';
import { styles } from '@/styles/credentialDetails.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
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
  fields: [],
};

export default function CredentialDetailsScreen() {
  const { theme } = useTheme();
  const { token, sessionId } = useAuth();
  const navigation = useNavigation();
  const style = styles(theme);
  const params = useLocalSearchParams<{ credentialId?: string }>();
  const sessionRef = useRef(sessionId);
  const [credential, setCredential] = useState<Credential>(defaultCredential);
  const [revealedFields, setRevealedFields] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  useEffect(() => {
    sessionRef.current = sessionId;
  }, [sessionId]);

  useEffect(() => {
    const fetchCredential = async () => {
      if (!params.credentialId) {
        setError('Credencial não encontrada.');
        setIsLoading(false);
        return;
      }

      if (!token) {
        setCredential(defaultCredential);
        setError('Sessão expirada.');
        setIsLoading(false);
        return;
      }

      const activeSessionId = sessionRef.current;
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCredentialDetails(params.credentialId, token);

        if (sessionRef.current !== activeSessionId) {
          return;
        }

        setCredential(data);
      } catch (fetchError) {
        if (sessionRef.current !== activeSessionId) {
          return;
        }
        console.warn('Erro ao carregar credencial:', fetchError);
        setError('Não foi possível carregar a credencial.');
        setCredential(defaultCredential);
      } finally {
        if (sessionRef.current === activeSessionId) {
          setIsLoading(false);
        }
      }
    };

    fetchCredential();
  }, [params.credentialId, token]);

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
      if (!params.credentialId || !token) {
        return;
      }

      const activeSessionId = sessionRef.current;
      await deleteCredential(params.credentialId, token);

      if (sessionRef.current !== activeSessionId) {
        return;
      }

      Alert.alert('Sucesso', 'Credencial excluida!');
      router.replace('/(drawer)/vault');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível excluir a credencial. Tente novamente.');
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
      </ScrollView>
      <PrimaryButton 
        title="Editar" 
        onPress={() => router.replace({ 
          pathname: '/credentialForm', 
          params: { credentialId: params.credentialId } }
        )}
        textStyle={style.editButtonText}
        buttonStyle={style.editPrimaryButton}
      />

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
    </SafeAreaView>
  );
}