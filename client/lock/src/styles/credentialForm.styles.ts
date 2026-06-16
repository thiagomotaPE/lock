import { typography } from '@/assets/fonts/typography ';
import { measures } from '@/assets/measures/measures';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme): any =>
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
      paddingHorizontal: measures.spacing.s20,
      paddingTop: measures.spacing.s14,
    },
    iconButton: {
      padding: measures.spacing.s8,
    },
    settingsButton: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: measures.spacing.s16,
      paddingVertical: measures.spacing.s10,
      borderRadius: measures.radius.pill,
    },
    scrollContent: {
      padding: measures.spacing.s20,
      paddingBottom: measures.spacing.s40,
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    card: {
      gap: measures.spacing.s14,
    },
    inputTitle: {
      fontSize: measures.fontSize.f28,
      fontFamily: typography.regular,
      color: theme.textColor,
      backgroundColor: theme.backgroundColor,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.borderColor,
      borderRadius: measures.radius.r12,
      paddingHorizontal: measures.spacing.s14,
      paddingVertical: measures.spacing.s12,
      fontSize: measures.fontSize.f15,
      fontFamily: typography.regular,
      color: theme.textColor,
      backgroundColor: theme.backgroundColor,
    },
    rowLabel: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: measures.spacing.s10,
    },
    label: {
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f13,
      color: theme.textColor,
    },
    selectBox: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: measures.spacing.s8,
      borderWidth: measures.border.normal,
      borderColor: theme.borderColor,
      borderRadius: measures.radius.pill,
      paddingHorizontal: measures.spacing.s12,
      paddingVertical: measures.spacing.s8,
    },
    selectText: {
      fontFamily: typography.regular,
      color: theme.textColor,
    },
    fieldCard: {
      borderWidth: measures.border.normal,
      borderColor: theme.borderColor,
      borderRadius: measures.radius.r14,
      padding: measures.spacing.s12,
      backgroundColor: theme.backgroundColor2,
      gap: measures.spacing.s10,
    },
    fieldRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: measures.spacing.s8,
    },
    flex1: {
      flex: 1,
    },
    typeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: measures.spacing.s8,
    },
    typeChip: {
      borderWidth: measures.border.normal,
      borderColor: theme.borderColor,
      borderRadius: measures.radius.pill,
      paddingHorizontal: measures.spacing.s10,
      paddingVertical: measures.spacing.s6,
    },
    typeChipActive: {
      borderColor: theme.primaryColor,
      backgroundColor: `${theme.primaryColor}12`,
    },
    typeChipText: {
      color: theme.contrastColor,
      fontSize: measures.fontSize.f12,
      fontFamily: typography.regular,
    },
    typeChipTextActive: {
      color: theme.primaryColor,
      fontFamily: typography.bold,
    },
    removeButton: {
      alignSelf: 'flex-start',
      paddingVertical: measures.spacing.s6,
    },
    removeButtonText: {
      color: theme.destaqueColor,
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f13,
    },
    addFieldCard: {
      borderWidth: measures.border.normal,
      borderColor: theme.borderColor,
      borderRadius: measures.radius.r14,
      padding: measures.spacing.s12,
      backgroundColor: theme.backgroundColor3,
      gap: measures.spacing.s10,
    },
    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: measures.spacing.s10,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: measures.spacing.s12,
      borderRadius: measures.radius.pill,
    },
    cancelButton: {
      backgroundColor: theme.backgroundColor3,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    cancelButtonText: {
      color: theme.textColor,
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f14,
    },
    primaryButton: {
      backgroundColor: theme.primaryColor,
    },
    primaryButtonText: {
      color: theme.textColor2,
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f14,
    },
    addFieldButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: measures.spacing.s8,
      paddingVertical: measures.spacing.s14,
      borderWidth: measures.border.normal,
      borderColor: theme.borderColor,
      borderRadius: measures.radius.r14,
      backgroundColor: theme.backgroundColor2,
    },
    addFieldButtonText: {
      color: theme.primaryColor,
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f14,
    },
    saveButton: {
      backgroundColor: theme.primaryColor,
      paddingHorizontal: measures.spacing.s16,
      paddingVertical: measures.spacing.s14,
      borderRadius: measures.radius.r14,
      borderWidth: measures.border.normal,
      borderColor: theme.primaryColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: measures.spacing.s8,
    },
    saveButtonText: {
      color: theme.textColor2,
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f14,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.25)',
      justifyContent: 'center',
      paddingHorizontal: measures.spacing.s24,
    },
    modalContent: {
      backgroundColor: theme.backgroundColor,
      borderRadius: measures.radius.r16,
      paddingVertical: measures.spacing.s8,
      overflow: 'hidden',
    },
    modalItem: {
      paddingHorizontal: measures.spacing.s16,
      paddingVertical: measures.spacing.s12,
    },
    modalItemText: {
      color: theme.textColor,
      fontFamily: typography.regular,
      fontSize: measures.fontSize.f15,
    },
  });
