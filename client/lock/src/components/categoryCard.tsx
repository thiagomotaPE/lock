import { styles } from '@/styles/categoryCard.styles';
import { useTheme } from '@/theme/useTheme';
import { Text, View } from 'react-native';

type CategoryCardProps = {
  categoryName: string;
  count: number;
  isAll?: boolean;
};

export function CategoryCard({ categoryName, count, isAll = false }: CategoryCardProps) {
  const { theme } = useTheme();
  const style = styles(theme);

  return (
    <View style={style.cardContainer}>
      <View style={style.cardContent}>
        {isAll && <View style={style.categoryDot} />}
        <Text style={style.categoryName}>{categoryName}</Text>
      </View>
      <Text style={style.categoryCount}>{count}</Text>
    </View>
  );
}
