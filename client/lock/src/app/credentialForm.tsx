import { Header } from '@/components/header';
import { PrimaryButton } from '@/components/primaryButton';
import { PrimaryModal } from '@/components/primaryModal';
import { styles } from '@/styles/credentialForm.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FieldType = 'Texto' | 'E-mail' | 'Senha' | 'Numero';

type CredentialField = {
  id: string;
  label: string;
  type: FieldType;
  value: string;
};

type Credential = {
  id?: string;
  name: string;
  category: string;
  categoryId?: string;
  fields: CredentialField[];
};

type CredentialFormScreenProps = {
  credential?: Partial<Credential> | null;
  onBack?: () => void;
  onSave?: (credential: Credential) => void;
};

const FIELD_TYPES: FieldType[] = ['Texto', 'E-mail', 'Senha', 'Numero'];

const makeId = () => Math.random().toString(36).slice(2, 10);

export default function CredentialFormScreen({
  credential,
  onBack,
  onSave,
}: CredentialFormScreenProps) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const style = styles(theme);

  const [name, setName] = useState(credential?.name ?? '');
  const [category, setCategory] = useState(credential?.category ?? 'Sem categoria');
  const [categories, setCategories] = useState<string[]>(['Sem categoria']);
  const params = useLocalSearchParams<{ credentialId?: string }>();
  const isEditing = !!params.credentialId;
  const [credentialId, setCredentialId] = useState<string | undefined>();
  const [categoryId, setCategoryId] = useState<string | undefined>();

  const [fields, setFields] = useState<CredentialField[]>(
    () => credential?.fields?.map((field) => ({ ...field })) ?? []
  );
  const [addingField, setAddingField] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<FieldType>('Texto');
  const [categoriesModalVisible, setCategoriesModalVisible] = useState(false);
  const [removeModalVisible, setRemoveModalVisible] = useState(false);
  const [fieldToRemove, setFieldToRemove] = useState<string | null>(null);
  const [categoriesData, setCategoriesData] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (!params.credentialId) return;

    const fetchCredential = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/credential/getCredentialDetails/${params.credentialId}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();

        setCredentialId(data.id);
        setName(data.credentialName);
        setCategory(data.categoryName);
        setCategoryId(data.credentialCategoryId);
        setFields(data.fields.map((f: any) => ({
          id: f.key,
          label: f.key,
          type: f.type === 'PASSWORD' ? 'Senha'
              : f.type === 'EMAIL' ? 'E-mail'
              : f.type === 'NUMBER' ? 'Numero'
              : 'Texto',
          value: f.value,
        })));
      } catch {
        Alert.alert('Erro', 'Não foi possível carregar a credencial.');
      }
    };

    fetchCredential();
  }, [params.credentialId]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8080/category/getAllCategories');
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        const mapped = data
          .filter((cat: any) => cat.categoryName !== 'Todos')
          .map((cat: any) => ({ id: cat.id, name: cat.categoryName }));
        setCategoriesData(mapped);
        setCategories(mapped.map((c: any) => c.name));
      } catch {
        console.warn('Não foi possível carregar as categorias.');
      }
    };
    fetchCategories();
  }, []);

  const confirmAddField = () => {
    if (!newFieldLabel.trim()) {
      return;
    }

    setFields((prev) => [
      ...prev,
      {
        id: makeId(),
        label: newFieldLabel.trim(),
        type: newFieldType,
        value: '',
      },
    ]);

    setNewFieldLabel('');
    setNewFieldType('Texto');
    setAddingField(false);
  };

  const handleOpenRemoveModal = (id: string) => {
    setFieldToRemove(id);
    setRemoveModalVisible(true);
  };

  const handleConfirmRemove = () => {
    if (fieldToRemove) {
      removeField(fieldToRemove);
    }

    setRemoveModalVisible(false);
    setFieldToRemove(null);
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const updateField = (id: string, key: keyof CredentialField, value: string) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  const handleBack = () => {
    if (onBack) {onBack(); return;}
    if (navigation.canGoBack?.()) {navigation.goBack(); return;}
    router.back();
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Dê um nome para esta credencial antes de salvar.');
      return;
    }

    const mappedFields = fields.map(f => ({
      key: f.label,
      type: f.type === 'Senha' ? 'PASSWORD'
          : f.type === 'E-mail' ? 'EMAIL'
          : f.type === 'Numero' ? 'NUMBER'
          : 'TEXT',
      value: f.value,
      sensitive: f.type === 'Senha',
    }));

    try {
      if (isEditing) {
        const response = await fetch('http://10.0.2.2:8080/credential/editCredential', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: credentialId,
            credentialName: name.trim(),
            credentialCategoryId: categoryId,
            fields: mappedFields,
          }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        Alert.alert('Sucesso', 'Credencial atualizada!');
        router.replace({ pathname: '/credentialDetails', params: { credentialId: credentialId } });
      } else {
        const response = await fetch('http://10.0.2.2:8080/credential/registerNewCredential', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            credentialName: name.trim(),
            userId: '562e6c58-15d5-4252-8e51-fffa09364d75',
            category: category,
            fields: mappedFields,
          }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        Alert.alert('Sucesso', 'Credencial criada!');
        router.replace('/(drawer)/vault');
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível salvar a credencial. Tente novamente.');
    }
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <KeyboardAvoidingView
        style={style.container}
        behavior={Platform.OS === 'android' ? 'padding' : undefined}
      >
        <Header
          onBack={handleBack}
          rightElement={<FontAwesome name="lock" size={26} color={theme.primaryColor} />}
        />

        <ScrollView
          contentContainerStyle={style.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={style.card}>
            <TextInput
              style={style.inputTitle}
              placeholder="Nome da conta"
              placeholderTextColor={theme.contrastColor}
              value={name}
              onChangeText={setName}
            />

            <View style={style.rowLabel}>
              <Text style={style.label}>Categoria</Text>
              <TouchableOpacity
                style={style.selectBox}
                onPress={() => setCategoriesModalVisible(true)}
              >
                <Text style={style.selectText}>{category}</Text>
                <Ionicons name="chevron-down" size={18} color={theme.primaryColor} />
              </TouchableOpacity>
            </View>

            {fields.map((field) => (
              <View key={field.id} style={style.fieldCard}>
                <View style={style.fieldRow}>
                  <TextInput
                    style={[style.input, style.flex1]}
                    placeholder="Nome do campo"
                    placeholderTextColor={theme.contrastColor}
                    value={field.label}
                    onChangeText={(value) => updateField(field.id, 'label', value)}
                  />
                </View>

                <View style={style.typeRow}>
                  {FIELD_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[style.typeChip, field.type === type && style.typeChipActive]}
                      onPress={() => updateField(field.id, 'type', type)}
                    >
                      <Text
                        style={[style.typeChipText, field.type === type && style.typeChipTextActive]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <TextInput
                  style={style.input}
                  placeholder="Valor"
                  placeholderTextColor={theme.contrastColor}
                  secureTextEntry={field.type === 'Senha'}
                  value={field.value}
                  onChangeText={(value) => updateField(field.id, 'value', value)}
                />

                <TouchableOpacity onPress={() => handleOpenRemoveModal(field.id)} style={style.removeButton}>
                  <Text style={style.removeButtonText}>Remover</Text>
                </TouchableOpacity>

                <PrimaryModal
                  visible={removeModalVisible}
                  title="Quer mesmo remover este campo?"
                  bodyType="text"
                  text="Certifique-se de que não vai mais precisar deste campo antes de apagá-lo"
                  confirmText="Remover"
                  isSubmitting={false}
                  onRequestClose={() => {
                    setRemoveModalVisible(false);
                    setFieldToRemove(null);
                  }}
                  onSubmit={handleConfirmRemove}
                />
              </View>
            ))}

            {addingField ? (
              <View style={style.addFieldCard}>
                <TextInput
                  style={style.input}
                  placeholder="Nome do campo"
                  placeholderTextColor={theme.contrastColor}
                  value={newFieldLabel}
                  onChangeText={setNewFieldLabel}
                  autoFocus
                />

                <View style={style.typeRow}>
                  {FIELD_TYPES.map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[style.typeChip, newFieldType === type && style.typeChipActive]}
                      onPress={() => setNewFieldType(type)}
                    >
                      <Text
                        style={[style.typeChipText, newFieldType === type && style.typeChipTextActive]}
                      >
                        {type}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <View style={style.actionRow}>
                  <TouchableOpacity
                    style={[style.button, style.cancelButton]}
                    onPress={() => setAddingField(false)}
                  >
                    <Text style={style.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={[style.button, style.primaryButton]} onPress={confirmAddField}>
                    <Text style={style.primaryButtonText}>Adicionar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <TouchableOpacity style={style.addFieldButton} onPress={() => setAddingField(true)}>
                <Ionicons name="add-circle-outline" size={20} color={theme.primaryColor} />
                <Text style={style.addFieldButtonText}>Adicionar campo</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        <PrimaryButton 
          title="Salvar" 
          onPress={() => (handleSave())} 
          textStyle={style.saveButtonText}
          buttonStyle={style.saveButton}
        />
      </KeyboardAvoidingView>

      <Modal transparent visible={categoriesModalVisible} animationType="fade">
        <Pressable style={style.modalOverlay} onPress={() => setCategoriesModalVisible(false)}>
          <View style={style.modalContent}>
            <ScrollView>
              {categories.map((item) => (
                <TouchableOpacity
                  key={item}
                  style={style.modalItem}
                  onPress={() => {
                    const found = categoriesData.find(c => c.name === item);
                    setCategory(item);
                    setCategoryId(found?.id);
                    setCategoriesModalVisible(false);
                  }}
                >
                  <Text style={style.modalItemText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
