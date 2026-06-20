import { styles } from '@/styles/primaryModal.styles';
import { useTheme } from '@/theme/useTheme';
import { ReactNode } from 'react';
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';

type PrimaryModalProps = {
  visible: boolean;
  title?: string;
  value?: string;
  text?: string;
  isSubmitting: boolean;
  onRequestClose: () => void;
  onChangeText?: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  bodyType?: 'input' | 'text';
  children?: ReactNode;
  confirmText: string;
};

export function PrimaryModal({
  visible,
  title,
  value,
  text,
  isSubmitting,
  onRequestClose,
  onChangeText,
  onSubmit,
  placeholder,
  bodyType,
  children,
  confirmText,
}: PrimaryModalProps) {
  const { theme } = useTheme();
  const style = styles(theme);

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onRequestClose}>
      <View style={style.modalOverlay}>
        <Pressable style={style.overlayBackground} onPress={() => !isSubmitting && onRequestClose()} />
        <View style={style.modalContent}>
          <Text style={style.modalTitle}>{title}</Text>

          {children ? (
            children
          ) : bodyType === 'input' ? (
            <TextInput
              style={style.modalInput}
              placeholder={placeholder}
              placeholderTextColor={theme.contrastColor}
              value={value}
              onChangeText={onChangeText}
              editable={!isSubmitting}
            />
           ) : (
            <Text style={style.modalText}>{text}</Text>
          )}
          
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
                {isSubmitting ? confirmText : confirmText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
