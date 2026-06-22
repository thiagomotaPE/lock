import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    container: {
      flex: 1,
      backgroundColor: theme.backgroundColor,
    },
    scrollContent: {
      padding: 20,
      flexGrow: 1
    },
    card: {
      gap: 14,
    },
    inputTitle: {
      fontSize: 28,
      fontFamily: typography.regular,
      color: theme.textColor,
      backgroundColor: theme.backgroundColor,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      fontSize: 15,
      fontFamily: typography.regular,
      color: theme.textColor,
      backgroundColor: theme.backgroundColor,
    },
    rowLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 10,
    },
    label: {
      fontFamily: typography.bold,
      fontSize: 13,
      color: theme.textColor,
    },
    selectBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 999,
      paddingHorizontal: 12,
      paddingVertical: 8,
    },
    selectText: {
      fontFamily: typography.regular,
      color: theme.textColor,
    },
    fieldCard: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 14,
      padding: 12,
      backgroundColor: theme.backgroundColor2,
      gap: 10,
    },
    fieldRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    flex1: {
      flex: 1,
    },
    typeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
    },
    typeChip: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 999,
      paddingHorizontal: 10,
      paddingVertical: 6,
    },
    typeChipActive: {
      borderColor: theme.primaryColor,
      backgroundColor: `${theme.primaryColor}12`,
    },
    typeChipText: {
      color: theme.contrastColor,
      fontSize: 12,
      fontFamily: typography.regular,
    },
    typeChipTextActive: {
      color: theme.primaryColor,
      fontFamily: typography.bold,
    },
    removeButton: {
      alignSelf: 'flex-start',
      paddingVertical: 6,
    },
    removeButtonText: {
      color: theme.dangerColor,
      fontFamily: typography.bold,
      fontSize: 13,
    },
    addFieldCard: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 14,
      padding: 12,
      backgroundColor: theme.backgroundColor2,
      gap: 10,
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      borderRadius: 999,
    },
    cancelButton: {
      backgroundColor: theme.backgroundColor2,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    cancelButtonText: {
      color: theme.textColor,
      fontFamily: typography.bold,
      fontSize: 14,
    },
    primaryButton: {
      backgroundColor: theme.primaryColor,
    },
    primaryButtonText: {
      color: theme.textColor2,
      fontFamily: typography.bold,
      fontSize: 14,
    },
    addFieldButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
      paddingVertical: 14,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 14,
      backgroundColor: theme.backgroundColor2,
    },
    addFieldButtonText: {
      color: theme.primaryColor,
      fontFamily: typography.bold,
      fontSize: 14,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'flex-start',
      paddingHorizontal: 24,
    },
    modalContent: {
      width: 210,
      maxHeight: 210, 
      backgroundColor: theme.backgroundColor2,
      borderRadius: 6,
      paddingVertical: 8,
      overflow: 'hidden',
      elevation: 8,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
      alignSelf: 'flex-end',
      marginTop: 245,
    },
    modalItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    modalItemText: {
      color: theme.textColor,
      fontFamily: typography.regular,
      fontSize: 15,
    },
    saveButton: {
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
    saveButtonText: {
      color: theme.textColor2,
      fontFamily: typography.bold,
      fontSize: 20,
    },
  });
