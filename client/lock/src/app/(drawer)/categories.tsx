import { CategoryCard } from '@/components/categoryCard';
import { Header } from '@/components/header';
import { PrimaryButton } from '@/components/primaryButton';
import { PrimaryModal } from '@/components/primaryModal';
import { styles } from '@/styles/categories.styles';
import { useTheme } from '@/theme/useTheme';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  ScrollView,
  Text,
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
        count:
          cat.categoryName === 'Tudo'
            ? credentialsData.length
            : credentialsData.filter((cred) => cred.categoryId === cat.id).length,
      }));

      setCategories(categoriesWithCount);
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
      <Header
        title="Categorias"
        onBack={handleBack}
        menuOptions={[
          {label: 'Excluir', onPress: () => {}}
        ]}
        rightElement={<Ionicons name="ellipsis-vertical" size={24} color={theme.primaryColor} />}
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
          <View style={style.container}>
            <FlatList
              data={categories}
              scrollEnabled={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CategoryCard
                  categoryName={item.categoryName}
                  count={item.count}
                  onPress={() => router.push({ pathname: '/(drawer)/vault', params: { selectedCategory: item.categoryName } })}
                />
              )}
            />

            <PrimaryButton
              title="Criar nova categoria"
              onPress={() => setModalVisible(true)}
              iconName="plus-circle"
              iconSize={20}
              iconColor={theme.textColor2}
              textStyle={style.createCategoryButtonText}
            />
          </View>
        )}
      </ScrollView>

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
