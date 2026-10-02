import { useAuth } from '@/auth/AuthContext';
import { CategoryFilterItem } from '@/components/categoryFilterItem';
import { PrimaryModal } from '@/components/primaryModal';
import { useCategories } from '@/hooks/useCategories';
import { styles } from '@/styles/categoryFilter.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';

type CategoryFilterProps = {
  selectedOption?: string;
  onSelectOption: (option: string) => void;
  addIconName?: React.ComponentProps<typeof FontAwesome>['name'];
  createPlaceholder?: string;
};

export function CategoryFilter({
  selectedOption,
  onSelectOption,
  addIconName = 'plus',
  createPlaceholder = 'Nome da categoria',
}: CategoryFilterProps) {
  const { theme } = useTheme();
  const style = styles(theme);
  const { userId, token } = useAuth();
  const { categories, reload, createCategory } = useCategories();
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
        Alert.alert('Atenção', 'Digite o nome da pasta.');
        return;
      }
  
      setIsSubmitting(true);
  
      try {
        if (!userId || !token) {
          return;
        }

        await createCategory(categoryName.trim());

        setCategoryName('');
        setModalVisible(false);
        Alert.alert('Sucesso', 'Categoria criada com sucesso!');
      } catch (err) {
        Alert.alert('Erro', 'Não foi possível criar a categoria. Verifique se essa categoria ja existe e tente novamente.');
      } finally {
        setIsSubmitting(false);
      }
  };
  
  return (
    <>
      <View style={style.filterRow}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={style.filterList}
        >
          {(['Todos', ...categories] as string[]) .map((option) => (
            <CategoryFilterItem
              key={option}
              label={option}
              selected={option === selectedOption}
              onPress={() => onSelectOption(option)}
            />
          ))}
        </ScrollView>

        <TouchableOpacity style={style.addButton} onPress={() => setModalVisible(true)}>
          <FontAwesome name={addIconName} size={22} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>

      <PrimaryModal
        visible={modalVisible}
        title='Nova categoria'
        value={categoryName}
        bodyType="input"
        isSubmitting={isSubmitting}
        onRequestClose={() => setModalVisible(false)}
        onChangeText={setCategoryName}
        onSubmit={handleSubmit}
        placeholder={createPlaceholder} 
        confirmText="Criar"
      />
    </>
  );
}
