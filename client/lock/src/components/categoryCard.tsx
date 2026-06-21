import { styles } from '@/styles/categoryCard.styles';
import { useTheme } from '@/theme/useTheme';
import { Text, TouchableOpacity, View } from 'react-native';

type CategoryCardProps = {
  categoryName: string;
  count: number;
  isAll?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  selected?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

export function CategoryCard({
  categoryName,
  count,
  onPress,
  onLongPress,
  selected = false,
  onEdit,
  onDelete,
}: CategoryCardProps) {
  const { theme } = useTheme();
  const style = styles(theme);

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={style.cardContainer}
      onPress={onPress}
      onLongPress={onLongPress}
      activeOpacity={onPress ? 0.75 : undefined}
    >
      <View style={style.cardContent}>
        <Text style={style.categoryName}>{categoryName}</Text>
      </View>

      <Text style={style.categoryCount}>{count}</Text>

      {selected && (
        <View style={style.actions}>
          <TouchableOpacity onPress={onEdit} style={style.editButton}>
            <Text style={style.actionText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete} style={style.deleteButton}>
            <Text style={style.actionText}>Excluir</Text>
          </TouchableOpacity>
        </View>
      )}
    </Container>
  );
}