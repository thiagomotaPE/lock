import { useAuth } from '@/auth/AuthContext';
import { useSessionGuard } from '@/hooks/useSessionGuard';
import {
    createCategory as createCategoryService,
    deleteCategory as deleteCategoryService,
    editCategory as editCategoryService,
} from '@/services/categoryService';
import { useCallback } from 'react';

export function useCategoryActions() {
  const { userId, token } = useAuth();
  const { sessionRef, isCurrentSession } = useSessionGuard();

  const ensureValidCategoryName = (value: string) => {
    const name = value.trim();
    if (!name) {
      throw new Error('Digite o nome da categoria.');
    }

    return name;
  };

  const createCategory = useCallback(async (name: string) => {
    if (!userId || !token) {
      throw new Error('Sessão expirada.');
    }

    const normalizedName = ensureValidCategoryName(name);
    const activeSessionId = sessionRef.current;

    await createCategoryService(userId, token, normalizedName);

    if (!isCurrentSession(activeSessionId)) {
      return false;
    }

    return true;
  }, [isCurrentSession, sessionRef, token, userId]);

  const editCategory = useCallback(async (categoryId: string, name: string) => {
    if (!userId || !token) {
      throw new Error('Sessão expirada.');
    }

    const normalizedName = ensureValidCategoryName(name);
    const activeSessionId = sessionRef.current;

    await editCategoryService(categoryId, token, normalizedName);

    if (!isCurrentSession(activeSessionId)) {
      return false;
    }

    return true;
  }, [isCurrentSession, sessionRef, token, userId]);

  const deleteCategory = useCallback(async (categoryId: string) => {
    if (!userId || !token) {
      throw new Error('Sessão expirada.');
    }

    const activeSessionId = sessionRef.current;

    await deleteCategoryService(categoryId, token);

    if (!isCurrentSession(activeSessionId)) {
      return false;
    }

    return true;
  }, [isCurrentSession, sessionRef, token, userId]);

  return {
    createCategory,
    editCategory,
    deleteCategory,
    ensureValidCategoryName,
  };
}
