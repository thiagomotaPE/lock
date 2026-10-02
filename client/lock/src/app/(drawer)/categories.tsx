import { useAuth } from '@/auth/AuthContext';
import { CategoryCard } from '@/components/categoryCard';
import { Header } from '@/components/header';
import { PrimaryButton } from '@/components/primaryButton';
import { PrimaryModal } from '@/components/primaryModal';
import { useCategoryActions } from '@/hooks/useCategoryActions';
import { getCategoriesForUser, type Category } from '@/services/categoryService';
import { getCredentialsForUser } from '@/services/credentialService';
import { styles } from '@/styles/categories.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CategoryWithCount = Category & {
  count: number;
};

export default function CategoriesScreen() {
  const { userId, token, sessionId } = useAuth();
  const { theme } = useTheme();
  const navigation = useNavigation();
  const style = styles(theme);
  const { createCategory, editCategory, deleteCategory } = useCategoryActions();
  const sessionRef = useRef(sessionId);
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
    sessionRef.current = sessionId;
  }, [sessionId]);

  useEffect(() => {
    if (!userId || !token) {
      setCategories([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    fetchCategories();
  }, [userId, token]);

  const fetchCategories = async () => {
    if (!userId || !token) {
      setCategories([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const activeSessionId = sessionRef.current;
    setIsLoading(true);
    setError(null);

    try {
      const [categoriesData, credentialsData] = await Promise.all([
        getCategoriesForUser(userId, token),
        getCredentialsForUser(userId, token),
      ]);

      if (sessionRef.current !== activeSessionId) {
        return;
      }

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
      if (sessionRef.current !== activeSessionId) {
        return;
      }

      setError('Não foi possível carregar as categorias.');
    } finally {
      if (sessionRef.current === activeSessionId) {
        setIsLoading(false);
      }
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim() || !userId || !token) {
      Alert.alert('Atenção', 'Digite o nome da pasta.');
      return;
    }

    const activeSessionId = sessionRef.current;
    setIsSubmitting(true);

    try {
      await createCategory(newCategoryName);

      if (sessionRef.current !== activeSessionId) {
        return;
      }

      setNewCategoryName('');
      setModalVisible(false);
      await fetchCategories();
      Alert.alert('Sucesso', 'Categoria criada!');
    } catch (err) {
      Alert.alert('Erro', err instanceof Error ? err.message : 'Não foi possível criar a categoria. Tente novamente.');
    } finally {
      if (sessionRef.current === activeSessionId) {
        setIsSubmitting(false);
      }
    }
  };

  const handleBack = () => {
    if (navigation.canGoBack?.()) {
      router.replace('/(drawer)/vault');
    }
  };

  const handleEditCategory = async () => {
    if (!selectedCategoryId || !userId || !token) {
      return;
    }

    const activeSessionId = sessionRef.current;

    try {
      await editCategory(selectedCategoryId, editCategoryName);

      if (sessionRef.current !== activeSessionId) {
        return;
      }

      setEditModalVisible(false);
      setSelectedCategoryId(null);
      await fetchCategories();
      Alert.alert('Sucesso', 'Categoria editada!');
    } catch (err) {
      Alert.alert('Erro', err instanceof Error ? err.message : 'Não foi possível editar a categoria. Tente novamente.');
    } finally {
      if (sessionRef.current === activeSessionId) {
        setIsSubmitting(false);
      }
    }
  };

  const handleDeleteCategory = async () => {
    if (!selectedCategoryId || !userId || !token) {
      return;
    }

    const activeSessionId = sessionRef.current;

    try {
      await deleteCategory(selectedCategoryId);

      if (sessionRef.current !== activeSessionId) {
        return;
      }

      setDeleteModalVisible(false);
      await fetchCategories();
      Alert.alert('Sucesso', 'Categoria exluida!');
    } catch (err) {
      Alert.alert('Erro', err instanceof Error ? err.message : 'Não foi possível excluir a categoria. certifique-se de remover as suas credenciais desta categoria e tente novamente.');
    } finally {
      if (sessionRef.current === activeSessionId) {
        setIsSubmitting(false);
      }
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
