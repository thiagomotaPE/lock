import { typography } from '@/assets/fonts/typography ';
import { measures } from '@/assets/measures/measures';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) => StyleSheet.create({
  card: {
    backgroundColor: theme.backgroundColor2,
    borderColor: theme.borderColor,
    borderRadius: measures.radius.r14,
    borderWidth: measures.border.normal,
    padding: measures.spacing.s20,
    minHeight: measures.sizes.cardMinHeight,
    maxHeight: measures.sizes.cardMaxHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  cardText: {
    fontSize: measures.fontSize.f16,
    fontFamily: typography.regular,
    color: theme.textColor
  },
});