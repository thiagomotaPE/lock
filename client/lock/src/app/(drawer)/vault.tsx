import { CategoryFilter } from "@/components/categoryFilter";
import { CredentialCard } from "@/components/credentialCard";
import { IsEmpty } from "@/components/isEmpty";
import { SearchBar } from "@/components/searchBar";
import { styles } from "@/styles/vault.styles";
import { useTheme } from '@/theme/useTheme';
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

type CredentialItem = {
  id: string;
  credentialName: string;
  userId: string;
  categoryId: string;
  categoryName: string;
};

export default function Vault() {
    const { theme } = useTheme();
    const style = styles(theme);
    const navigation = useNavigation();
    const params = useLocalSearchParams<{ selectedCategory?: string }>();
    const [credentials, setCredentials] = useState<CredentialItem[]>([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState(params.selectedCategory ?? 'Todos');

    useEffect(() => {
      const loadCredentials = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch('http://10.0.2.2:8080/credential/getAllCredentials/562e6c58-15d5-4252-8e51-fffa09364d75');
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const data = await response.json();
          setCredentials(data);
        } catch (fetchError) {
          setError('Não foi possível carregar as credenciais. Verifique se o servidor está rodando.');
        } finally {
          setIsLoading(false);
        }
      };

      if (params.selectedCategory) {
        setSelectedFilter(params.selectedCategory);
      }

      loadCredentials();
    }, [params.selectedCategory]);

    const filteredCredentials = useMemo(
        () => credentials.filter((item) => {
            const title = (item.credentialName || '').toString().toLowerCase();
            const matchesQuery = title.includes(query.toLowerCase());
            const matchesCategory = selectedFilter && selectedFilter !== 'Todos'
                ? item.categoryName === selectedFilter
                : true;
            return matchesQuery && matchesCategory;
        })
        .sort((a, b) => a.credentialName.localeCompare(b.credentialName)),
        [credentials, query, selectedFilter]
    );

    const hasData = filteredCredentials.length > 0;

    return (
        <SafeAreaView style={[{ flex: 1 }, style.container]}>
            <View style={style.content}>
                <View style={style.header}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <FontAwesome5 name="stream" size={30} color={theme.primaryColor} />
                    </TouchableOpacity>
                    <SearchBar onChangeText={setQuery} />
                </View>

                <CategoryFilter
                    selectedOption={selectedFilter}
                    onSelectOption={setSelectedFilter}
                    createPlaceholder="Nome da categoria"
                />

                {isLoading ? (
                    <View style={style.emptyContainer}>
                        <Text style={style.emptyText}>Carregando credenciais...</Text>
                    </View>
                ) : error ? (
                    <View style={style.emptyContainer}>
                        <Text style={style.emptyText}>{error}</Text>
                    </View>
                ) : hasData ? (
                    <View style={style.listContainer}>
                        <FlatList
                            data={filteredCredentials}
                            keyExtractor={(item) => item.id.toString()}
                            style={{ flex: 1 }}
                            contentContainerStyle={style.list}
                            renderItem={({ item }) => (
                                <CredentialCard
                                    title={item.credentialName || 'Sem título'}
                                    onPress={() => router.push({ pathname: '/credentialDetails', params: { credentialId: item.id.toString() } })}
                                />
                            )}
                        />
                    </View>
                ) : (
                    <IsEmpty />
                )}

                <TouchableOpacity style={style.fab} onPress={() => router.push('/credentialForm')}>
                    <FontAwesome name="plus" size={28} color={theme.textColor2} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}