import { CategoryFilter } from "@/components/categoryFilter";
import { CredentialCard } from "@/components/credentialCard";
import { IsEmpty } from "@/components/isEmpty";
import { SearchBar } from "@/components/searchBar";
import { styles } from "@/styles/vault.styles";
import { useTheme } from '@/theme/useTheme';
import { FontAwesome } from "@expo/vector-icons";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

type CredentialItem = {
  id: string | number;
  userId?: string | number;
  credentialName?: string;
  categoryName?: string;
  [key: string]: any;
};

export default function Vault() {
    const { theme } = useTheme();
    const style = styles(theme);
    const navigation = useNavigation();
    const [credentials, setCredentials] = useState<CredentialItem[]>([]);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState('Tudo');

    useEffect(() => {
        const fetchCredentials = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch('http://10.0.2.2:3000/credentials');
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                const data = await response.json();
                setCredentials(data);
            } catch (fetchError) {
                setError('Não foi possível carregar as credenciais. Verifique se o json-server está rodando.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCredentials();
    }, []);

    const filteredCredentials = useMemo(
        () => credentials.filter((item) => {
            const title = (item.credentialName || '').toString().toLowerCase();
            return title.includes(query.toLowerCase());
        }),
        [credentials, query]
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
                                    onPress={() => router.push({ pathname: '/credentialDetails', params: { credential: JSON.stringify(item) } })}
                                />
                            )}
                        />
                    </View>
                ) : (
                    <IsEmpty />
                )}

                <TouchableOpacity style={style.fab} onPress={() => router.push('/(drawer)/credentialForm')}>
                    <FontAwesome name="plus" size={28} color={theme.textColor2} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}