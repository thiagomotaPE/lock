import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.backgroundColor2,
      borderColor: theme.borderColor,
      borderWidth: 1,
      borderRadius: 14,
      paddingHorizontal: 10,
    },
    input: {
      flex: 1,
      height: "100%",
      fontFamily: typography.regular,
      color: theme.textColor,
    },
  });
