import { useAuth } from '@/auth/AuthContext';
import { CategoryFilterItem } from '@/components/categoryFilterItem';
import { PrimaryModal } from '@/components/primaryModal';
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
  const [categories, setCategories] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/category/getAllCategories/${userId}`, {
        method: 'GET',
        headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`}
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      const data = await response.json();
      const names: string[] = data
        .map((category: any) => category.categoryName)
        .filter((name: string) => name !== 'Todos');

      const semCategoria = names.filter(n => n === 'Sem categoria');
      const rest = names.filter(n => n !== 'Sem categoria');

      setCategories([...rest, ...semCategoria]);
    } catch (fetchError) {
      console.warn('Não foi possível carregar as categorias.', fetchError);
      setCategories([]);
    }
  }, [userId, token]);

  useFocusEffect(
    useCallback(() => {
      fetchCategories();
    }, [userId, token])
  );

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
        Alert.alert('Atenção', 'Digite o nome da pasta.');
        return;
      }
  
      setIsSubmitting(true);
  
      try {
        const response = await fetch('http://10.0.2.2:8080/category/registerNewCategory', {
          method: 'POST',
          headers: {'Content-Type': 'application/json', "Authorization": `Bearer ${token}`},
          body: JSON.stringify({
            categoryName: categoryName.trim(),
            userId: userId
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
  
        setCategoryName('');
        setModalVisible(false);
        await fetchCategories();
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
