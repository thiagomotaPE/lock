import { styles } from '@/styles/createCategoryModal.styles';
import { useTheme } from '@/theme/useTheme';
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

type CreateCategoryModalProps = {
  visible: boolean;
  value: string;
  isSubmitting: boolean;
  onRequestClose: () => void;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
};

export function CreateCategoryModal({
  visible,
  value,
  isSubmitting,
  onRequestClose,
  onChangeText,
  onSubmit,
  placeholder = 'Nome da categoria',
}: CreateCategoryModalProps) {
  const { theme } = useTheme();
  const style = styles(theme);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onRequestClose}>
      <View style={style.modalOverlay}>
        <Pressable style={style.overlayBackground} onPress={() => !isSubmitting && onRequestClose()} />
        <View style={style.modalContent}>
          <Text style={style.modalTitle}>Nova categoria</Text>
          <TextInput
            style={style.modalInput}
            placeholder={placeholder}
            placeholderTextColor={theme.contrastColor}
            value={value}
            onChangeText={onChangeText}
            editable={!isSubmitting}
          />
          <View style={style.modalButtons}>
            <TouchableOpacity
              style={[style.button, style.cancelButton]}
              onPress={() => !isSubmitting && onRequestClose()}
              disabled={isSubmitting}
            >
              <Text style={style.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[style.button, style.createButton]}
              onPress={onSubmit}
              disabled={isSubmitting}
            >
              <Text style={style.createButtonText}>
                {isSubmitting ? 'Criando...' : 'Criar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
