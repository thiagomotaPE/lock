import { useAuth } from '@/auth/AuthContext';
import { useSessionGuard } from '@/hooks/useSessionGuard';
import { createCategory as createCategoryService, getCategoriesForUser } from '@/services/categoryService';
import { useCallback, useEffect, useState } from 'react';

export function useCategories() {
  const { userId, token } = useAuth();
  const { sessionRef, isCurrentSession } = useSessionGuard();
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCategories = useCallback(async () => {
    if (!userId || !token) {
      setCategories([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    const activeSessionId = sessionRef.current;
    setIsLoading(true);
    setError(null);

    try {
      const data = await getCategoriesForUser(userId, token);

      if (!isCurrentSession(activeSessionId)) {
        return;
      }

      const names = data
        .map((category) => category.categoryName)
        .filter((name) => name !== 'Todos');

      const semCategoria = names.filter((name) => name === 'Sem categoria');
      const rest = names.filter((name) => name !== 'Sem categoria');

      setCategories([...rest, ...semCategoria]);
    } catch (fetchError) {
      if (!isCurrentSession(activeSessionId)) {
        return;
      }

      setError('Não foi possível carregar as categorias.');
      setCategories([]);
    } finally {
      if (isCurrentSession(activeSessionId)) {
        setIsLoading(false);
      }
    }
  }, [isCurrentSession, sessionRef, token, userId]);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const createCategory = useCallback(async (name: string) => {
    if (!userId || !token) {
      return;
    }

    const activeSessionId = sessionRef.current;

    await createCategoryService(userId, token, name);

    if (!isCurrentSession(activeSessionId)) {
      return;
    }

    await loadCategories();
  }, [isCurrentSession, loadCategories, sessionRef, token, userId]);

  return {
    categories,
    isLoading,
    error,
    reload: loadCategories,
    createCategory,
  };
}
