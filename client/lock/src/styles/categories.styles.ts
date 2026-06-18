import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    headerTitle: {
      fontFamily: typography.semiBold,
      fontSize: 18,
      color: theme.textColor,
      flex: 1,
      textAlign: 'center',
    },
    iconButton: {
      padding: 8,
    },
    menuButton: {
      padding: 8,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      flexGrow: 1,
    },
    container: {
      gap: 12,
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 40,
    },
    emptyText: {
      fontFamily: typography.regular,
      fontSize: 14,
      color: theme.contrastColor,
    },
    createCategoryButtonText: {
      fontFamily: typography.bold,
      fontSize: 16,
    },
  });