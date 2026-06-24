package com.api.lock.category.service;

import com.api.lock.category.dto.CategoryResponseDto;
import com.api.lock.category.dto.CreateCategoryDto;
import com.api.lock.category.dto.UpdateCategoryDto;
import com.api.lock.category.entity.Category;
import com.api.lock.category.repository.CategoryRepository;
import com.api.lock.credential.dto.CredentialResponseDto;
import com.api.lock.credential.entity.Credential;
import com.api.lock.user.entity.User;
import com.api.lock.user.repository.UserRepository;
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
    @Autowired
    private UserRepository userRepository;

    //Busca todos as categorias
    public ResponseEntity<List<CategoryResponseDto>> getAllCategories(String userId) {
        try {
            var allCategories = categoryRepository.findByUser_Id(userId);
            List<CategoryResponseDto> response = allCategories.stream().map(this::mapToSummaryDto).toList();
            return ResponseEntity.ok(response);
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Cria uma nova categoria
    public ResponseEntity<List<Category>> registerNewCategory(CreateCategoryDto createCategoryDto) {
        try {
            User user = userRepository.findById(createCategoryDto.userId())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            Category newCategory = new Category();
            newCategory.setCategoryName(createCategoryDto.categoryName());
            newCategory.setUser(user);
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


    private CategoryResponseDto mapToSummaryDto(Category category) {
        return new CategoryResponseDto(
                category.getId(),
                category.getCategoryName()
        );
    }
}
