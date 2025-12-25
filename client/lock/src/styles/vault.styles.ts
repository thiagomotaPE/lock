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

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.borderColor,
    borderRadius: 6,
    paddingHorizontal: 10,
  },

  searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: typography.regular,
  },

  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    borderBottomWidth: 0.5,
    borderColor: theme.textColor,
    paddingBottom: 8,
  },

  filter: {
    backgroundColor: theme.borderColor,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 6,
    fontFamily: typography.regular,
  },

  filterText: {
    color: theme.textColor
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
    right: 24,
    bottom: 44,
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