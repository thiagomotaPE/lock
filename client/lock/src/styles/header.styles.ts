import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
    },
    iconButton: {
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconPlaceholder: {
      width: 40,
      height: 40,
    },
    titlePlaceholder: {
      flex: 1,
    },
    headerTitle: {
      flex: 1,
      textAlign: 'center',
      fontFamily: typography.semiBold,
      fontSize: 18,
      color: theme.textColor,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'transparent',
      justifyContent: 'flex-start',
      paddingTop: 60,
      paddingHorizontal: 16,
    },
    modalContent: {
      backgroundColor: theme.backgroundColor2,
      borderRadius: 6,
      overflow: 'hidden',
      alignSelf: 'flex-end',
      marginTop: 32,
      marginRight: 16,
      width: 180,
      elevation: 8,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 12,
    },
    modalItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    modalItemText: {
      color: theme.textColor,
      fontFamily: typography.regular,
      fontSize: 14,
    },
  });
