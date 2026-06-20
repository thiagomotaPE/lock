import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
      width: '100%',
      height: '100%',
    },
    overlayBackground: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
    modalContent: {
      marginTop: '155%',
      width: '95%',
      maxWidth: 400,
      backgroundColor: theme.backgroundColor,
      borderTopLeftRadius: 6,
      borderTopRightRadius: 6,
      borderBottomLeftRadius: 36,
      borderBottomRightRadius: 36,
      paddingHorizontal: 24,
      paddingVertical: 24,
      gap: 16,
    },
    modalTitle: {
      fontFamily: typography.bold,
      fontSize: 16,
      color: theme.textColor,
      textAlign: 'center',
    },
    modalInput: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontFamily: typography.regular,
      fontSize: 14,
      color: theme.textColor,
      backgroundColor: theme.backgroundColor2,
      marginBottom: 12,
    },
    modalText: {
      fontFamily: typography.regular,
      fontSize: 14,
      textAlign: 'center',
      marginHorizontal: 12,
      marginBottom: 12,
      color: theme.contrastColor,
    },
    modalButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 8,
    },
    cancelButton: {
      backgroundColor: theme.backgroundColor2,
      borderColor: theme.borderColor,
      borderWidth: 1,
    },
    cancelButtonText: {
      color: theme.textColor,
      fontFamily: typography.bold,
      fontSize: 13,
    },
    createButton: {
      backgroundColor: theme.primaryColor,
      borderColor: theme.primaryColor,
      borderWidth: 1,
    },
    createButtonText: {
      color: theme.textColor2,
      fontFamily: typography.bold,
      fontSize: 13,
    },
  });