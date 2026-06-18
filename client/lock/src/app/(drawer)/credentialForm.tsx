import { Header } from '@/components/header';
import { PrimaryButton } from '@/components/primaryButton';
import { styles } from '@/styles/credentialForm.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useState } from 'react';
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
  folder: string;
  fields: CredentialField[];
};

type CredentialFormScreenProps = {
  credential?: Partial<Credential> | null;
  onBack?: () => void;
  onSave?: (credential: Credential) => void;
};

const FIELD_TYPES: FieldType[] = ['Texto', 'E-mail', 'Senha', 'Numero'];
const FOLDERS = ['Todos','Sites', 'Bancos', 'Trabalho', 'Outros'];

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
  const [folder, setFolder] = useState(credential?.folder ?? 'Todos');
  const [fields, setFields] = useState<CredentialField[]>(
    () => credential?.fields?.map((field) => ({ ...field })) ?? []
  );
  const [addingField, setAddingField] = useState(false);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<FieldType>('Texto');
  const [folderModalVisible, setFolderModalVisible] = useState(false);

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

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  const updateField = (id: string, key: keyof CredentialField, value: string) => {
    setFields((prev) =>
      prev.map((field) => (field.id === id ? { ...field, [key]: value } : field))
    );
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (navigation.canGoBack?.()) {
      navigation.goBack();
      return;
    }

    router.back();
  };

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Atenção', 'Dê um nome para esta credencial antes de salvar.');
      return;
    }

    const savedCredential: Credential = {
      ...credential,
      id: credential?.id ?? makeId(),
      name: name.trim(),
      folder,
      fields,
    };

    onSave?.(savedCredential);
    handleBack();
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <KeyboardAvoidingView
        style={style.container}
        behavior={Platform.OS === 'android' ? 'padding' : undefined}
      >
        <Header
          onBack={handleBack}
          menuOptions={[
            {label: 'Excluir', onPress: () => {}}
          ]}
          rightElement={<FontAwesome5 name="ellipsis-v" size={26} color={theme.primaryColor} />}
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
                onPress={() => setFolderModalVisible(true)}
              >
                <Text style={style.selectText}>{folder}</Text>
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

                <TouchableOpacity onPress={() => removeField(field.id)} style={style.removeButton}>
                  <Text style={style.removeButtonText}>Remover</Text>
                </TouchableOpacity>
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
          <PrimaryButton title="Salvar" onPress={() => (handleSave())} textStyle={style.saveButtonText}/>
        </ScrollView>
      </KeyboardAvoidingView>

      <Modal transparent visible={folderModalVisible} animationType="fade">
        <Pressable style={style.modalOverlay} onPress={() => setFolderModalVisible(false)}>
          <View style={style.modalContent}>
            {FOLDERS.map((item) => (
              <TouchableOpacity
                key={item}
                style={style.modalItem}
                onPress={() => {
                  setFolder(item);
                  setFolderModalVisible(false);
                }}
              >
                <Text style={style.modalItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
