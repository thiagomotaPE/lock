import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    filterRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      borderBottomWidth: 0.5,
      borderColor: theme.textColor,
      paddingBottom: 8,
    },
    filterList: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingVertical: 4,
      paddingRight: 8,
    },
    filterButton: {
      backgroundColor: theme.backgroundColor3,
      borderColor: theme.borderColor,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 16,
    },
    filterButtonActive: {
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
    },
    filterText: {
      fontFamily: typography.regular,
      color: theme.textColor,
    },
    filterTextActive: {
      color: theme.textColor2,
    },
    addButton: {
      backgroundColor: theme.backgroundColor3,
      borderColor: theme.borderColor,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 16,
      marginLeft: 14,
    },
  });
