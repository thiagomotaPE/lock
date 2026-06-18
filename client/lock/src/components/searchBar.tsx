import { styles } from '@/styles/searchBar.styles';
import { useTheme } from '@/theme/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { TextInput, View, type NativeSyntheticEvent, type TextInputSubmitEditingEventData } from 'react-native';

type SearchBarProps = {
  placeholder?: string;
  onChangeText?: (value: string) => void;
  onSubmit?: (value: string) => void;
};

export function SearchBar({ placeholder = 'Pesquisar...', onChangeText, onSubmit }: SearchBarProps) {
  const { theme } = useTheme();
  const style = styles(theme);
  const [query, setQuery] = useState('');

  const handleChangeText = (value: string) => {
    setQuery(value);
    onChangeText?.(value);
  };

  const handleSubmitEditing = (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
    onSubmit?.(event.nativeEvent.text);
  };

  return (
    <View style={style.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={theme.contrastColor}
        style={style.input}
        value={query}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
        returnKeyType="search"
      />
      <FontAwesome name="search" size={22} color={theme.primaryColor} />
    </View>
  );
}
