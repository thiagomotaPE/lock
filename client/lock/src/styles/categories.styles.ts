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
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 14,
      marginBottom: 8,
      minHeight: 54,
      maxHeight: 54,
      backgroundColor: theme.backgroundColor2,
      borderColor: theme.borderColor,
      borderRadius: 14,
      borderWidth: 1,
    },
    categoryContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      flex: 1,
    },
    categoryDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.primaryColor,
    },
    categoryName: {
      fontFamily: typography.regular,
      fontSize: 15,
      color: theme.textColor,
      flex: 1,
    },
    categoryCount: {
      fontFamily: typography.bold,
      fontSize: 13,
      color: theme.contrastColor,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.primaryColor,
      backgroundColor: theme.primaryColor,
      marginTop: 20,
    },
    addButtonText: {
      fontFamily: typography.bold,
      fontSize: 14,
      color: theme.textColor2,
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
  });
