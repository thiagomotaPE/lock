import { styles } from '@/styles/header.styles';
import { useTheme } from '@/theme/useTheme';
import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

type MenuOption = {
  label: string;
  onPress: () => void;
};

type HeaderProps = {
  title?: string;
  onBack?: () => void;
  onRightPress?: () => void;
  rightElement?: ReactNode;
  menuOptions?: MenuOption[];
};

export function Header({ title, onBack, onRightPress, rightElement, menuOptions }: HeaderProps) {
  const { theme } = useTheme();
  const style = styles(theme);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleRightPress = () => {
    if (menuOptions?.length) {
      setMenuVisible(true);
      return;
    }

    onRightPress?.();
  };

  return (
    <>
      <View style={style.header}>
        {onBack ? (
          <TouchableOpacity style={style.iconButton} onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
          </TouchableOpacity>
        ) : (
          <View style={style.iconPlaceholder} />
        )}

        {title ? <Text style={style.headerTitle}>{title}</Text> : <View style={style.titlePlaceholder} />}

        {rightElement ? (
          <TouchableOpacity style={style.iconButton} onPress={handleRightPress}>
            {rightElement}
          </TouchableOpacity>
        ) : (
          <View style={style.iconPlaceholder} />
        )}
      </View>

      <Modal transparent visible={menuVisible} animationType="fade">
        <Pressable style={style.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={style.modalContent}>
            {menuOptions?.map((option) => (
              <TouchableOpacity
                key={option.label}
                style={style.modalItem}
                onPress={() => {
                  setMenuVisible(false);
                  option.onPress();
                }}
              >
                <Text style={style.modalItemText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
