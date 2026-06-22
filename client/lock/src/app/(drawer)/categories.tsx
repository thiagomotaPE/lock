import { CategoryCard } from '@/components/categoryCard';
import { Header } from '@/components/header';
import { PrimaryButton } from '@/components/primaryButton';
import { PrimaryModal } from '@/components/primaryModal';
import { styles } from '@/styles/categories.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const [categoriesRes, credentialsRes] = await Promise.all([
        fetch('http://10.0.2.2:8080/category/getAllCategories'),
        fetch('http://10.0.2.2:8080/credential/getAllCredentials/562e6c58-15d5-4252-8e51-fffa09364d75'),
      ]);

      if (!categoriesRes.ok || !credentialsRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const categoriesData: Category[] = await categoriesRes.json();
      const credentialsData: any[] = await credentialsRes.json();

      // Contar credenciais por categoria
      const categoriesWithCount = categoriesData.map((cat) => ({
        ...cat,
        count:
          cat.categoryName === 'Todos'
            ? credentialsData.length
            : credentialsData.filter((cred) => cred.categoryId === cat.id).length,
      }));

      const todosCategory: CategoryWithCount = {
        id: 'todos',
        categoryName: 'Todos',
        count: credentialsData.length,
      };

      const semCategoria = categoriesWithCount.filter(c => c.categoryName === 'Sem categoria');
      const rest = categoriesWithCount
        .filter(c => c.categoryName !== 'Sem categoria')
        .sort((a, b) => a.categoryName.localeCompare(b.categoryName));

      setCategories([todosCategory, ...semCategoria, ...rest]);
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
      const response = await fetch('http://10.0.2.2:8080/category/registerNewCategory', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
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
      Alert.alert('Sucesso', 'Categoria criada!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível criar a categoria. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack?.()) {
      router.push('/(drawer)/vault');
    }
  };

  const handleEditCategory = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/category/editCategory/${selectedCategoryId}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ newCategoryName: editCategoryName.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setEditModalVisible(false);
      setSelectedCategoryId(null);
      await fetchCategories();
      Alert.alert('Sucesso', 'Categoria editada!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível editar a categoria. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/category/deleteCategory/${selectedCategoryId}`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      setDeleteModalVisible(false);
      await fetchCategories();
      Alert.alert('Sucesso', 'Categoria exluida!');
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível excluir a categoria. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={style.safeArea}>
      <Header
        title="Categorias"
        onBack={handleBack}
        rightElement={<FontAwesome name="lock" size={26} color={theme.primaryColor} />}
      />

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
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setSelectedCategoryId(null)}
          style={{ flex: 1 }}
        >
          <View style={style.container}>
            <FlatList
              data={categories}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CategoryCard
                  categoryName={item.categoryName}
                  count={item.count}
                  selected={selectedCategoryId === item.id}
                  onPress={() => {
                    setSelectedCategoryId(null);
                    router.push({
                      pathname: '/(drawer)/vault',
                      params: { selectedCategory: item.categoryName },
                    });
                  }}
                  onLongPress={() => {setSelectedCategoryId(item.id); setEditCategoryName(item.categoryName)}}
                  onEdit={() => setEditModalVisible(true)}
                  onDelete={() => setDeleteModalVisible(true)}
                />
              )}
            />
          </View>
        </TouchableOpacity>
        )}
      </ScrollView>
      <PrimaryButton
              title="Criar nova categoria"
              onPress={() => setModalVisible(true)}
              iconName="plus-circle"
              iconSize={20}
              iconColor={theme.textColor2}
              textStyle={style.createCategoryButtonText}
              buttonStyle={style.createCategoryButton}
            />
      <PrimaryModal 
        visible={deleteModalVisible}
        title="Deseja mesmo excluir esta categoria?"
        bodyType="text"
        text="Certifique-se de que não vai mais precisar desta categoria para organizar suas credenciais"
        confirmText="Excluir"
        isSubmitting={isSubmitting}
        onRequestClose={() => setDeleteModalVisible(false)}
        onSubmit={handleDeleteCategory}
      />

      <PrimaryModal
        visible={editModalVisible}
        title='Editar categoria'
        value={editCategoryName}
        bodyType="input"
        placeholder={"Nome da categoria"}
        isSubmitting={isSubmitting}
        onRequestClose={() => setEditModalVisible(false)}
        onChangeText={setEditCategoryName}
        onSubmit={handleEditCategory}
        confirmText="Editar"
      />

      <PrimaryModal
        visible={modalVisible}
        title='Nova categoria'
        value={newCategoryName}
        bodyType="input"
        placeholder={"Nome da categoria"}
        isSubmitting={isSubmitting}
        onRequestClose={() => setModalVisible(false)}
        onChangeText={setNewCategoryName}
        onSubmit={handleAddCategory}
        confirmText="Criar"
      />
    </SafeAreaView>
  );
}
