import { styles } from '@/styles/categoryFilterItem.styles';
import { useTheme } from '@/theme/useTheme';
import { Text, TouchableOpacity } from 'react-native';

type CategoryFilterItemProps = {
  label: string;
  selected?: boolean;
  onPress: () => void;
};

export function CategoryFilterItem({ label, selected = false, onPress }: CategoryFilterItemProps) {
  const { theme } = useTheme();
  const style = styles(theme);

  return (
    <TouchableOpacity
      style={[
        style.categoryButton,
        selected && style.categoryButtonActive,
      ]}
      onPress={onPress}
    >
      <Text style={[style.categoryText, selected && style.categoryTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}
