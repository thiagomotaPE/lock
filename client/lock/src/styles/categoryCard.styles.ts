import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 14,
      minHeight: 54,
      maxHeight: 54,
      borderRadius: 14,
      backgroundColor: theme.backgroundColor2,
      borderWidth: 1,
      borderColor: theme.borderColor,
      marginBottom: 8,
    },
    cardContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
    },
    categoryName: {
      fontFamily: typography.regular,
      color: theme.textColor,
      fontSize: 16,
      flex: 1,
    },
    categoryCount: {
      fontFamily: typography.bold,
      color: theme.contrastColor,
      fontSize: 14,
    },
    actions: {
      position: 'absolute',
      right: 10,
      top: 8,
      flexDirection: 'row',
      gap: 8,
    },

    editButton: {
      backgroundColor: theme.primaryColor,
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 8,
    },

    deleteButton: {
      backgroundColor: theme.dangerColor,
      paddingHorizontal: 8,
      paddingVertical: 8,
      borderRadius: 8,
    },

    actionText: {
      color: theme.textColor2,
      fontSize: 14,
    },
  });