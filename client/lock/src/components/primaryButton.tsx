import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme/useTheme';
import { Href, useRouter } from 'expo-router';

import { styles } from '@/styles/primaryButton';

type ButtonProps = {
  title: string;
  route: Href;
};

export function PrimaryButton({ title, route }: ButtonProps) {
    const router = useRouter();
    const { theme } = useTheme();
    const style = styles(theme);

    return (
        <TouchableOpacity style={style.primaryButton} onPress={() => router.push(route)}>
            <Text style={style.primaryButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}
