package com.api.lock.category.service;

import com.api.lock.category.dto.CreateCategoryDto;
import com.api.lock.category.dto.UpdateCategoryDto;
import com.api.lock.category.entity.Category;
import com.api.lock.category.repository.CategoryRepository;
import com.api.lock.credential.entity.Credential;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
    public ResponseEntity<List<Category>> registerNewCategory(CreateCategoryDto createCategoryDto) {
        try {
            Category newCategory = new Category(createCategoryDto);
            categoryRepository.save(newCategory);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Edita uma categoria existente
    @Transactional
    public ResponseEntity<Category> editCategory(String categoryId, UpdateCategoryDto updateCategoryDto) {
        try {
            Optional<Category> optional = categoryRepository.findById(categoryId);
            if (optional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            Category category = optional.get();
            if (updateCategoryDto.newCategoryName() != null)
                category.setCategoryName(updateCategoryDto.newCategoryName());
            categoryRepository.save(category);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Deleta uma categoria
    public ResponseEntity<Category> deleteCategory(String categoryId) {
        try {
            categoryRepository.deleteById(categoryId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
