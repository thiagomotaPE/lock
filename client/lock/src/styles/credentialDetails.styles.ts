import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    iconButton: {
      padding: 6,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    card: {
      gap: 14,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    titleWrapper: {
      flex: 1,
      gap: 14,
    },
    name: {
      fontFamily: typography.bold,
      fontSize: 28,
      color: theme.textColor,
    },
    folder: {
      fontFamily: typography.regular,
      fontSize: 14,
      color: theme.contrastColor,
    },
    badge: {
      backgroundColor: `${theme.primaryColor}12`,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
    },
    badgeText: {
      fontFamily: typography.bold,
      fontSize: 12,
      color: theme.primaryColor,
    },
    fieldCard: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 14,
      padding: 14,
      minHeight: 90,
      maxHeight: 90,
      backgroundColor: theme.backgroundColor2,
      gap: 8,
    },
    fieldHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    fieldLabel: {
      fontFamily: typography.bold,
      fontSize: 14,
      color: theme.textColor,
      flex: 1,
    },
    fieldTypeBadge: {
      backgroundColor: theme.borderColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 999,
    },
    fieldTypeText: {
      fontFamily: typography.regular,
      fontSize: 11,
      color: theme.textColor,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    value: {
      flex: 1,
      fontFamily: typography.regular,
      fontSize: 14,
      color: theme.textColor,
    },
    emptyState: {
      paddingVertical: 24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      fontFamily: typography.regular,
      fontSize: 14,
      color: theme.contrastColor,
    },
    editButton: {
      backgroundColor: theme.primaryColor,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 14,
      borderWidth: 1,
      borderColor: theme.primaryColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    editButtonText: {
      color: theme.textColor2,
      fontFamily: typography.bold,
      fontSize: 20,
    },
  });
