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
    addButton: {
      backgroundColor: theme.backgroundColor2,
      borderColor: theme.borderColor,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 16,
      marginLeft: 14,
    },
  });
