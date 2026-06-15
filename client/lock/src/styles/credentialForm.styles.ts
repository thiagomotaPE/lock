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
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 14,
    },
    iconButton: {
      padding: 8,
    },
    settingsButton: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 999,
    },
    scrollContent: {
      padding: 20,
      paddingBottom: 40,
    },
    card: {
      gap: 14,
      marginTop: -8,
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
      backgroundColor: '#FAFAFA',
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
      color: '#D64545',
      fontFamily: typography.bold,
      fontSize: 13,
    },
    addFieldCard: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 14,
      padding: 12,
      backgroundColor: '#F7F7F9',
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
      backgroundColor: '#F2F2F2',
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
      marginTop: 455,
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: 6,
      backgroundColor: '#FCFCFC',
    },
    addFieldButtonText: {
      color: theme.primaryColor,
      fontFamily: typography.bold,
      fontSize: 14,
    },
    saveButton: {
      backgroundColor: theme.primaryColor,
      paddingHorizontal: 16,
      paddingVertical: 14,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    saveButtonText: {
      color: theme.textColor2,
      fontFamily: typography.bold,
      fontSize: 14,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.25)',
      justifyContent: 'center',
      paddingHorizontal: 24,
    },
    modalContent: {
      backgroundColor: theme.backgroundColor,
      borderRadius: 16,
      paddingVertical: 8,
      overflow: 'hidden',
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
  });
