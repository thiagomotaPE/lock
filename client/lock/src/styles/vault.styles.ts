import { typography } from '@/assets/fonts/typography ';
import { measures } from '@/assets/measures/measures';
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
    gap: measures.spacing.s14,
  },

    searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.backgroundColor2,
    borderColor: theme.borderColor,
    borderWidth: measures.border.normal,
    borderRadius: measures.radius.r14,
    paddingHorizontal: measures.spacing.s10,
  },

    searchInput: {
    flex: 1,
    height: "100%",
    fontFamily: typography.regular,
    color: theme.textColor,
  },

    filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: measures.spacing.s16,
    borderBottomWidth: measures.border.thin,
    borderColor: theme.textColor,
    paddingBottom: measures.spacing.s8,
  },

    filter: {
    backgroundColor: theme.borderColor,
    paddingHorizontal: measures.spacing.s16,
    paddingVertical: measures.spacing.s4,
    borderRadius: measures.radius.r6,
    fontFamily: typography.regular,
  },

  filterText: {
    color: theme.textColor
  },

  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: measures.spacing.s30 || 30,
    marginTop: "45%",
  },

  iconRow: {
    marginBottom: measures.spacing.s24,
  },

  emptyText: {
    textAlign: 'center',
    color: theme.contrastColor,
    fontSize: measures.fontSize.f16,
    fontFamily: typography.bold,
    marginBottom: measures.spacing.s12,
  },

  emptySubtitle: {
    color: theme.contrastColor,
    fontFamily: typography.bold,
    fontSize: measures.fontSize.f16
  },

  fab: {
    position: 'absolute',
    right: measures.spacing.s24,
    bottom: measures.spacing.s44,
    width: measures.sizes.fab,
    height: measures.sizes.fab,
    borderRadius: measures.radius.round38,
    backgroundColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  
  listContainer: {
    height: '85%'
  },

  list: {
    marginTop: measures.spacing.s16,
    gap: measures.spacing.s12
  },
});