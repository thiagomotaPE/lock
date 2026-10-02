import { apiRequest } from '@/services/api';

export type Category = {
  id: string;
  categoryName: string;
};

export async function getCategoriesForUser(userId: string, token: string): Promise<Category[]> {
  return apiRequest<Category[]>(`/category/getAllCategories/${userId}`, {
    method: 'GET',
    token,
  });
}

export async function createCategory(userId: string, token: string, categoryName: string) {
  return apiRequest('/category/registerNewCategory', {
    method: 'POST',
    token,
    body: JSON.stringify({
      categoryName: categoryName.trim(),
      userId,
    }),
  });
}

export async function editCategory(categoryId: string, token: string, newCategoryName: string) {
  return apiRequest(`/category/editCategory/${categoryId}`, {
    method: 'PUT',
    token,
    body: JSON.stringify({ newCategoryName: newCategoryName.trim() }),
  });
}

export async function deleteCategory(categoryId: string, token: string) {
  return apiRequest(`/category/deleteCategory/${categoryId}`, {
    method: 'DELETE',
    token,
  });
}
