import { useAuth } from '@/auth/AuthContext';
import { CategoryFilterItem } from '@/components/categoryFilterItem';
import { PrimaryModal } from '@/components/primaryModal';
import { apiRequest } from '@/services/api';
import { styles } from '@/styles/categoryFilter.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
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
  const { userId, token, sessionId } = useAuth();
  const sessionRef = useRef(sessionId);
  const [categories, setCategories] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchCategories = useCallback(async () => {
    if (!userId || !token) {
      setCategories([]);
      return;
    }

    const activeSessionId = sessionRef.current;

    try {
      const data = await apiRequest<any[]>(`/category/getAllCategories/${userId}`, {
        method: 'GET',
        token,
      });

      if (sessionRef.current !== activeSessionId) {
        return;
      }

      const names: string[] = data
        .map((category: any) => category.categoryName)
        .filter((name: string) => name !== 'Todos');

      const semCategoria = names.filter(n => n === 'Sem categoria');
      const rest = names.filter(n => n !== 'Sem categoria');

      setCategories([...rest, ...semCategoria]);
    } catch (fetchError) {
      if (sessionRef.current !== activeSessionId) {
        return;
      }
      console.warn('Não foi possível carregar as categorias.', fetchError);
      setCategories([]);
    }
  }, [userId, token, sessionId]);

  useFocusEffect(
    useCallback(() => {
      sessionRef.current = sessionId;
      fetchCategories();
    }, [fetchCategories, sessionId])
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

        await apiRequest('/category/registerNewCategory', {
          method: 'POST',
          token,
          body: JSON.stringify({
            categoryName: categoryName.trim(),
            userId,
          }),
        });
  
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
