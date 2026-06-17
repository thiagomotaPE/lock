import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) => StyleSheet.create({
  card: {
    backgroundColor: theme.backgroundColor2,
    borderColor: theme.borderColor,
    borderRadius: 14,
    borderWidth: 1,
    padding: 20,
    minHeight: 65,
    maxHeight: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  cardText: {
    fontSize: 16,
    fontFamily: typography.regular,
    color: theme.textColor
  },
});