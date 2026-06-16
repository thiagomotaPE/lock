import { measures } from '@/assets/measures/measures';
import { styles } from '@/styles/primaryInput.styles';
import { useTheme } from '@/theme/useTheme';
import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { TextInput, TextInputProps, View } from 'react-native';

type InputProps = TextInputProps & {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
};

export function PrimaryInput({ label, icon, ...rest }: InputProps) {
    const { theme } = useTheme();
    const style = styles(theme);

    const [isSelected, setIsSelected] = useState(false);

    return (
        <View style={[style.inputContainer, isSelected && style.inputSelected]}>
            <TextInput
              placeholder={label}
              placeholderTextColor={isSelected ? theme.primaryColor : theme.contrastColor}
              style={style.input}
              onFocus={() => setIsSelected(true)}
              onBlur={() => setIsSelected(false)}
              {...rest}
            />
            <MaterialIcons name={icon} size={measures.icon.sm} color={isSelected ? theme.primaryColor : theme.contrastColor} />
        </View>
    );
}
