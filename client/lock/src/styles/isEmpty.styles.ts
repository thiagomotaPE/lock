import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) => StyleSheet.create({
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: "45%",
  },

  iconRow: {
    marginBottom: 24,
  },

  emptyText: {
    textAlign: 'center',
    color: theme.contrastColor,
    fontSize: 16,
    fontFamily: typography.bold,
    marginBottom: 12,
  },

  emptySubtitle: {
    color: theme.contrastColor,
    fontFamily: typography.bold,
    fontSize: 16
  }
});