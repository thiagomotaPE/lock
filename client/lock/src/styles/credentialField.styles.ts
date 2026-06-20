import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    fieldCard: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 14,
      padding: 14,
      minHeight: 100,
      maxHeight: 100,
      backgroundColor: theme.backgroundColor2,
      gap: 8,
    },
    fieldHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    fieldLabel: {
      fontFamily: typography.semiBold,
      fontSize: 16,
      color: theme.textColor,
      flex: 1,
      marginRight: 10,
    },
    fieldTypeBadge: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    fieldTypeText: {
      fontFamily: typography.regular,
      fontSize: 12,
      color: theme.contrastColor,
    },
    valueRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 8,
    },
    value: {
      fontFamily: typography.regular,
      fontSize: 14,
      color: theme.textColor,
      flex: 1,
      marginRight: 10,
    },
    iconButton: {
      padding: 8,
      borderRadius: 12,
      backgroundColor: theme.backgroundColor2,
    },
    copiedToast: {
      position: 'absolute',
      top: -10,
      right: 10,
      backgroundColor: theme.primaryColor,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 8,
      zIndex: 10,
    },

    copiedText: {
      color: theme.textColor2,
      fontSize: 12,
    }
  });
