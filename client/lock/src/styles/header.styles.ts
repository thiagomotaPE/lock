import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    iconButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconPlaceholder: {
      width: 40,
      height: 40,
    },
    titlePlaceholder: {
      flex: 1,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontFamily: typography.semiBold,
      fontSize: 18,
      color: theme.textColor,
    },
  });
