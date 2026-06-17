import { styles } from '@/styles/header.styles';
import { useTheme } from '@/theme/useTheme';
import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type HeaderProps = {
  title?: string;
  onBack?: () => void;
  onRightPress?: () => void;
  rightElement?: ReactNode;
};

export function Header({ title, onBack, onRightPress, rightElement }: HeaderProps) {
  const { theme } = useTheme();
  const style = styles(theme);

  return (
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
        onRightPress ? (
          <TouchableOpacity style={style.iconButton} onPress={onRightPress}>
            {rightElement}
          </TouchableOpacity>
        ) : (
          <View style={style.iconButton}>{rightElement}</View>
        )
      ) : (
        <View style={style.iconPlaceholder} />
      )}
    </View>
  );
}
