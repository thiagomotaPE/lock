import { typography } from '@/assets/fonts/typography ';
import { measures } from '@/assets/measures/measures';
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
      paddingHorizontal: measures.spacing.s20,
      paddingTop: measures.spacing.s16,
    },
    headerTitle: {
      fontFamily: typography.semiBold,
      fontSize: measures.fontSize.f18,
      color: theme.textColor,
      flex: 1,
      textAlign: 'center',
    },
    iconButton: {
      padding: measures.spacing.s8,
    },
    menuButton: {
      padding: 8,
    },
    scrollContent: {
      paddingHorizontal: measures.spacing.s20,
      paddingVertical: measures.spacing.s16,
      flexGrow: 1,
    },
    container: {
      gap: measures.spacing.s12,
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    },
    categoryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: measures.spacing.s16,
      paddingVertical: measures.spacing.s14,
      marginBottom: measures.spacing.s8,
      minHeight: 54,
      maxHeight: 54,
      backgroundColor: theme.backgroundColor2,
      borderColor: theme.borderColor,
      borderRadius: measures.radius.r14,
      borderWidth: measures.border.normal,
    },
    categoryContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: measures.spacing.s10,
      flex: 1,
    },
    categoryDot: {
      width: measures.spacing.s8,
      height: measures.spacing.s8,
      borderRadius: measures.radius.r4,
      backgroundColor: theme.primaryColor,
    },
    categoryName: {
      fontFamily: typography.regular,
      fontSize: measures.fontSize.f15,
      color: theme.textColor,
      flex: 1,
    },
    categoryCount: {
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f13,
      color: theme.contrastColor,
    },
    addButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: measures.spacing.s8,
      paddingVertical: measures.spacing.s14,
      borderRadius: measures.radius.r14,
      borderWidth: measures.border.normal,
      borderColor: theme.primaryColor,
      backgroundColor: theme.primaryColor,
      marginTop: measures.spacing.s20,
    },
    addButtonText: {
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f14,
      color: theme.textColor2,
    },
    emptyState: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: measures.spacing.s40,
    },
    emptyText: {
      fontFamily: typography.regular,
      fontSize: measures.fontSize.f14,
      color: theme.contrastColor,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.backgroundColor,
      borderTopLeftRadius: measures.radius.r6,
      borderTopRightRadius: measures.radius.r6,
      borderBottomLeftRadius: measures.radius.r36,
      borderBottomRightRadius: measures.radius.r36,
      paddingHorizontal: measures.spacing.s24,
      paddingVertical: measures.spacing.s24,
      marginTop: 0,
      width: '95%',
      maxWidth: measures.modal.maxWidth,
      gap: measures.spacing.s16,
    },
    modalTitle: {
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f16,
      color: theme.textColor,
      textAlign: 'center',
    },
    modalInput: {
      borderWidth: measures.border.normal,
      borderColor: theme.borderColor,
      borderRadius: measures.radius.r8,
      paddingHorizontal: measures.spacing.s12,
      paddingVertical: measures.spacing.s10,
      fontFamily: typography.regular,
      fontSize: measures.fontSize.f14,
      color: theme.textColor,
    },
    modalButtons: {
      flexDirection: 'row',
      gap: measures.spacing.s12,
      marginTop: measures.spacing.s8,
    },
    button: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: measures.spacing.s12,
      borderRadius: measures.radius.r8,
    },
    cancelButton: {
      backgroundColor: theme.borderColor,
    },
    cancelButtonText: {
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f13,
      color: theme.textColor,
    },
    createButton: {
      backgroundColor: theme.primaryColor,
    },
    createButtonText: {
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f13,
      color: theme.textColor2,
    },
  });
