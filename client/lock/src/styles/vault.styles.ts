import { typography } from '@/assets/fonts/typography ';
import { Theme } from '@/theme/types';
import { StyleSheet } from 'react-native';

export const styles = (theme: Theme) => StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundColor,
    alignItems:'center',
    justifyContent:'center',
  },
  content: {
    width: '90%',
    height: '100%'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: "45%",
  },
  iconRow: {
    marginBottom: 24,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.contrastColor,
    fontSize: 16,
    fontFamily: typography.bold,
    marginBottom: 12,
  },
  emptySubtitle: {
    color: theme.contrastColor,
    fontFamily: typography.bold,
    fontSize: 16
  },
  fab: {
    position: 'absolute',
    right: 8,
    bottom: 28,
    width: 66,
    height: 66,
    borderRadius: 38,
    backgroundColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  listContainer: {
    height: '85%'
  },
  list: {
    marginTop: 16,
    gap: 12
  },
});