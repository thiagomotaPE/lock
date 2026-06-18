import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    categoryButton: {
      backgroundColor: theme.backgroundColor2,
      borderColor: theme.borderColor,
      borderWidth: 1,
      paddingHorizontal: 16,
      paddingVertical: 4,
      borderRadius: 16,
    },
    categoryButtonActive: {
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
    },
    categoryText: {
      fontFamily: typography.regular,
      color: theme.textColor,
    },
    categoryTextActive: {
      color: theme.textColor2,
    },
  });
