import { CredentialCard } from "@/components/credentialCard";
import { IsEmpty } from "@/components/isEmpty";
import { styles } from "@/styles/vault.styles";
import { useTheme } from '@/theme/useTheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const DATA: any = [
  { id: '1', title: 'Instagram' },
//   { id: '2', title: 'youtube' },
//   { id: '3', title: 'Rico' },
//   { id: '4', title: 'otorrinolaringologista' },
//   { id: '5', title: 'otorrinolaringologista' },
//   { id: '6', title: 'otorrinolaringologista' },
//   { id: '7', title: 'otorrinolaringologista' },
//   { id: '8', title: 'otorrinolaringologista' },
//   { id: '9', title: 'otorrinolaringologista' },
//   { id: '10', title: 'otorrinolaringologista' },
//   { id: '11', title: 'otorrinolaringologista' },
//   { id: '12', title: 'otorrinolaringologista' },
//   { id: '13', title: 'otorrinolaringologista' },
//   { id: '14', title: 'otorrinolaringologista' },
];

export default function Vault() {
    const { theme } = useTheme();
    const style = styles(theme);
    const navigation = useNavigation();

    const hasData = DATA.length > 0;


    return (
        <SafeAreaView style={[{ flex: 1 }, style.container]}>
            <View style={style.content}>
                <View style={style.header}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                        <FontAwesome5 name="stream" size={30} color={theme.primaryColor} />
                    </TouchableOpacity>
                    <View style={style.searchContainer}>
                        <TextInput
                            placeholder="Pesquisar..."
                            placeholderTextColor={theme.contrastColor}
                            style={style.searchInput}
                        />
                        <FontAwesome5 name="search" size={24} color={theme.primaryColor}/>
                    </View>
                </View>

                <View style={style.filterRow}>
                    <TouchableOpacity style={style.filter}>
                        <Text style={style.filterText}>Tudo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <AntDesign name="folder" size={22} color={theme.textColor}/>
                    </TouchableOpacity>
                </View>

                {hasData ? (
                    <View style={style.listContainer}>
                        <FlatList
                            data={DATA}
                            keyExtractor={(item) => item.id}
                            style={{ flex: 1 }}
                            contentContainerStyle={style.list}
                            renderItem={({ item }) => (
                            <CredentialCard title={item.title} />
                            )}
                        />
                    </View>
                ) : (
                    <IsEmpty />
                )}
                


                <TouchableOpacity style={style.fab}>
                    <FontAwesome5 name="plus" size={26} color={theme.textColor2} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}