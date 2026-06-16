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
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: measures.spacing.s20,
      paddingTop: measures.spacing.s14,
    },
    settingsButton: {
      backgroundColor: theme.backgroundColor,
      paddingHorizontal: measures.spacing.s16,
      paddingVertical: measures.spacing.s10,
      borderRadius: measures.radius.pill,
    },
    iconButton: {
      padding: measures.spacing.s6,
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
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    titleWrapper: {
      flex: 1,
      gap: measures.spacing.s14,
    },
    name: {
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f28,
      color: theme.textColor,
    },
    folder: {
      fontFamily: typography.regular,
      fontSize: measures.fontSize.f14,
      color: theme.contrastColor,
    },
    badge: {
      backgroundColor: `${theme.primaryColor}12`,
      paddingHorizontal: measures.spacing.s12,
      paddingVertical: measures.spacing.s6,
      borderRadius: measures.radius.pill,
    },
    badgeText: {
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f12,
      color: theme.primaryColor,
    },
    fieldCard: {
      borderWidth: measures.border.normal,
      borderColor: theme.borderColor,
      borderRadius: measures.radius.r14,
      padding: measures.spacing.s14,
      minHeight: 90,
      maxHeight: 90,
      backgroundColor: theme.backgroundColor2,
      gap: measures.spacing.s8,
    },
    fieldHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: measures.spacing.s8,
    },
    fieldLabel: {
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f14,
      color: theme.textColor,
      flex: 1,
    },
    fieldTypeBadge: {
      backgroundColor: theme.borderColor,
      paddingHorizontal: measures.spacing.s8,
      paddingVertical: measures.spacing.s4,
      borderRadius: measures.radius.pill,
    },
    fieldTypeText: {
      fontFamily: typography.regular,
      fontSize: measures.fontSize.f11,
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
      fontSize: measures.fontSize.f14,
      color: theme.textColor,
    },
    emptyState: {
      paddingVertical: measures.spacing.s24,
      alignItems: 'center',
      justifyContent: 'center',
    },
    emptyText: {
      fontFamily: typography.regular,
      fontSize: measures.fontSize.f14,
      color: theme.contrastColor,
    },
    editButton: {
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
    editButtonText: {
      color: theme.textColor2,
      fontFamily: typography.bold,
      fontSize: measures.fontSize.f14,
    },
  });
