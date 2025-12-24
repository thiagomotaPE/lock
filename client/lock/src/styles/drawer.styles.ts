import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
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
    backgroundColor: '#FFF',
  },

  username: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.4)',
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
    color: '#FFF',
    fontSize: 15,
  },

  logout: {
    padding: 20,
  },

  logoutText: {
    color: '#FFF',
    fontSize: 14,
  },
});
