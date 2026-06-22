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
    editPrimaryButton: {
        backgroundColor: theme.primaryColor,
        margin: 15,
        height: 52,
        borderWidth: 1,
        borderColor: theme.primaryColor,
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: "5%",
    },
    editButtonText: {
      color: theme.textColor2,
      fontFamily: typography.bold,
      fontSize: 20,
    },
  });
