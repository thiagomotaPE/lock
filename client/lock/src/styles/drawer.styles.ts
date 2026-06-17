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
    gap: 12,
  },

  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.primaryColor,
  },

  username: {
    color: theme.textColor,
    fontSize: 16,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: theme.borderColor,
    marginVertical: 16,
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
    fontSize: 15,
  },

  logout: {
    padding: 20,
  },

  logoutText: {
    color: theme.textColor,
    fontSize: 14,
  },
});
