import { styles } from '@/styles/categoryCard.styles';
import { useTheme } from '@/theme/useTheme';
import { Text, TouchableOpacity, View } from 'react-native';

type CategoryCardProps = {
  categoryName: string;
  count: number;
  isAll?: boolean;
  onPress?: () => void;
};

export function CategoryCard({ categoryName, count, isAll = false, onPress }: CategoryCardProps) {
  const { theme } = useTheme();
  const style = styles(theme);

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      style={style.cardContainer}
      onPress={onPress}
      activeOpacity={onPress ? 0.75 : undefined}
    >
      <View style={style.cardContent}>
        <Text style={style.categoryName}>{categoryName}</Text>
      </View>
      <Text style={style.categoryCount}>{count}</Text>
    </Container>
  );
}
