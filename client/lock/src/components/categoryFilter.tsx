import { CategoryFilterItem } from '@/components/categoryFilterItem';
import { PrimaryModal } from '@/components/primaryModal';
import { styles } from '@/styles/categoryFilter.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';

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
  const [categories, setCategories] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://10.0.2.2:8080/category/getAllCategories');
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        setCategories(data.map((category: any) => category.categoryName));
      } catch (fetchError) {
        console.warn('Não foi possível carregar as categorias.', fetchError);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    if (!categoryName.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://10.0.2.2:8080/category/registerNewCategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName: categoryName.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const newCategory = await response.json();
      setCategories((prev) => [...prev, newCategory.categoryName]);
      setCategoryName('');
      setModalVisible(false);
    } catch (createError) {
      console.warn('Erro ao criar categoria', createError);
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
