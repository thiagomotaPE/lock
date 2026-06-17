import { useTheme } from '@/theme/useTheme';
import { FontAwesome } from '@expo/vector-icons';
import { Href, useRouter } from 'expo-router';
import { Text, TouchableOpacity, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { styles } from '@/styles/primaryButton.styles';

type ButtonProps = {
  title: string;
  route?: Href;
  onPress?: () => void;
  iconName?: React.ComponentProps<typeof FontAwesome>['name'];
  iconSize?: number;
  iconColor?: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function PrimaryButton({
  title,
  route,
  onPress,
  iconName,
  iconSize = 20,
  iconColor,
  buttonStyle,
  textStyle,
}: ButtonProps) {
  const router = useRouter();
  const { theme } = useTheme();
  const style = styles(theme);

  const handlePress = () => {
    if (onPress) {
      onPress();
      return;
    }

    if (route) {
      router.push(route);
    }
  };

  return (
    <TouchableOpacity style={[style.primaryButton, buttonStyle]} onPress={handlePress}>
      <View style={style.primaryButtonContent}>
        {iconName && (
          <FontAwesome name={iconName} size={iconSize} color={iconColor ?? theme.textColor2} />
        )}
        <Text
          style={[
            style.primaryButtonText,
            iconName && style.primaryButtonTextWithIcon,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
