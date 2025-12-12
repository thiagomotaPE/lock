package com.api.lock.category.service;

import com.api.lock.category.entity.Category;
import com.api.lock.category.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    //Busca todos as categorias
    public ResponseEntity<List<Category>> getAllCategories() {
        try {
            var allCategories = categoryRepository.findAll();
            return ResponseEntity.ok(allCategories);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Cria uma nova categoria
    public ResponseEntity<List<Category>> registerNewCategory(Category dto) {
        try {
            Category newCategory = new Category(dto);
            categoryRepository.save(newCategory);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Edita uma categoria existente
    public ResponseEntity<List<Category>> editCategory() {
        try {
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Deleta uma categoria
    public ResponseEntity<Category> deleteCategory(Long categoryId) {
        try {
            categoryRepository.deleteById(categoryId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
