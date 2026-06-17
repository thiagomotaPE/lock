import { CreateCategoryModal } from '@/components/createCategoryModal';
import { styles } from '@/styles/categories.styles';
import { useTheme } from '@/theme/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = {
  id: string;
  categoryName: string;
};

type CategoryWithCount = Category & {
  count: number;
};

export default function CategoriesScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const style = styles(theme);
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [categoriesRes, credentialsRes] = await Promise.all([
        fetch('http://10.0.2.2:3000/categories'),
        fetch('http://10.0.2.2:3000/credentials'),
      ]);

      if (!categoriesRes.ok || !credentialsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const categoriesData: Category[] = await categoriesRes.json();
      const credentialsData: any[] = await credentialsRes.json();

      // Contar credenciais por categoria
      const categoriesWithCount = categoriesData.map((cat) => ({
        ...cat,
        count: credentialsData.filter((cred) => cred.categoryId === cat.id).length,
      }));

      // Adicionar "Tudo" no início
      const withAll = [
        {
          id: 'all',
          categoryName: 'Tudo',
          count: credentialsData.length,
        },
        ...categoriesWithCount,
      ];

      setCategories(withAll);
    } catch (err) {
      setError('Não foi possível carregar as categorias.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Atenção', 'Digite o nome da pasta.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://10.0.2.2:3000/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryName: newCategoryName.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setNewCategoryName('');
      setModalVisible(false);
      await fetchCategories();
      Alert.alert('Sucesso', 'Pasta criada com sucesso!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível criar a pasta. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack?.()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.header}>
        <TouchableOpacity onPress={handleBack} style={style.iconButton}>
          <Ionicons name="arrow-back" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
        <Text style={style.headerTitle}>Categorias</Text>
        <TouchableOpacity style={style.menuButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={theme.primaryColor} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={style.scrollContent}>
        {isLoading ? (
          <View style={style.emptyState}>
            <Text style={style.emptyText}>Carregando categorias...</Text>
          </View>
        ) : error ? (
          <View style={style.emptyState}>
            <Text style={style.emptyText}>{error}</Text>
          </View>
        ) : (
          <View style={style.container}>
            <FlatList
              data={categories}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View style={style.categoryItem}>
                  <View style={style.categoryContent}>
                    {item.id === 'all' && (
                      <View style={style.categoryDot} />
                    )}
                    <Text style={style.categoryName}>{item.categoryName}</Text>
                  </View>
                  <Text style={style.categoryCount}>{item.count}</Text>
                </View>
              )}
            />

            <TouchableOpacity
              style={style.addButton}
              onPress={() => setModalVisible(true)}
            >
              <Ionicons name="add-circle" size={20} color={theme.textColor2} />
              <Text style={style.addButtonText}>Criar nova categoria</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <CreateCategoryModal
        visible={modalVisible}
        value={newCategoryName}
        isSubmitting={isSubmitting}
        onRequestClose={() => setModalVisible(false)}
        onChangeText={setNewCategoryName}
        onSubmit={handleAddCategory}
      />
    </SafeAreaView>
  );
}
