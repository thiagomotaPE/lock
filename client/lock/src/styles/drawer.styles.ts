import { measures } from '@/assets/measures/measures';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) =>
  StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: measures.spacing.s12,
  },

  avatar: {
    width: measures.radius.r21 * 2,
    height: measures.radius.r21 * 2,
    borderRadius: measures.radius.r21,
    backgroundColor: theme.primaryColor,
  },

  username: {
    color: theme.textColor,
    fontSize: measures.fontSize.f16,
    fontWeight: '600',
  },

  divider: {
    height: measures.border.normal,
    backgroundColor: theme.borderColor,
    marginVertical: measures.spacing.s16,
  },

  item: {
    paddingVertical: 14,
  },

  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemText: {
    color: theme.textColor,
    fontSize: measures.fontSize.f15,
  },

  logout: {
    padding: 20,
  },

  logoutText: {
    color: theme.textColor,
    fontSize: measures.fontSize.f14,
  },
});
