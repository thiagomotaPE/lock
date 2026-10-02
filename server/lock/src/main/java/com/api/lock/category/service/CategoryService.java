package com.api.lock.category.service;

import com.api.lock.category.dto.CategoryResponseDto;
import com.api.lock.category.dto.CreateCategoryDto;
import com.api.lock.category.dto.UpdateCategoryDto;
import com.api.lock.category.entity.Category;
import com.api.lock.category.repository.CategoryRepository;
import com.api.lock.common.exception.ConflictException;
import com.api.lock.common.exception.ResourceNotFoundException;
import com.api.lock.user.entity.User;
import com.api.lock.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

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
                    .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado."));

            String categoryName = createCategoryDto.categoryName() == null ? "" : createCategoryDto.categoryName().trim();
            if (categoryName.isEmpty()) {
                throw new IllegalArgumentException("Nome da categoria é obrigatório.");
            }

            boolean exists = categoryRepository.existsByUser_IdAndCategoryNameIgnoreCase(user.getId(), categoryName);
            if (exists) {
                throw new ConflictException("Já existe uma categoria com este nome");
            }

            Category newCategory = new Category();
            newCategory.setCategoryName(categoryName);
            newCategory.setUser(user);
            categoryRepository.save(newCategory);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            if (e instanceof ResourceNotFoundException || e instanceof ConflictException || e instanceof IllegalArgumentException) {
                throw e;
            }
            throw new RuntimeException("Erro ao criar categoria.", e);
        }
    }

    //Edita uma categoria existente
    @Transactional
    public ResponseEntity<Category> editCategory(String categoryId, UpdateCategoryDto updateCategoryDto) {
        try {
            Optional<Category> optional = categoryRepository.findById(categoryId);
            if (optional.isEmpty()) {
                throw new ResourceNotFoundException("Categoria não encontrada.");
            }
            Category category = optional.get();
            if (updateCategoryDto.newCategoryName() != null) {
                String newName = updateCategoryDto.newCategoryName().trim();
                if (newName.isEmpty()) {
                    throw new IllegalArgumentException("Nome da categoria é obrigatório.");
                }
                Optional<Category> sameNameCategory = categoryRepository.findByCategoryNameAndUser_IdIgnoreCase(newName, category.getUser().getId());
                if (sameNameCategory.isPresent() && !sameNameCategory.get().getId().equals(categoryId)) {
                    throw new ConflictException("Já existe uma categoria com este nome.");
                }
                category.setCategoryName(newName);
            }
            categoryRepository.save(category);
            return ResponseEntity.ok(category);
        } catch (Exception e) {
            if (e instanceof ResourceNotFoundException || e instanceof ConflictException || e instanceof IllegalArgumentException) {
                throw e;
            }
            throw new RuntimeException("Erro ao atualizar categoria.", e);
        }
    }

    //Deleta uma categoria
    public ResponseEntity<Category> deleteCategory(String categoryId) {
        try {
            if (!categoryRepository.existsById(categoryId)) {
                throw new ResourceNotFoundException("Categoria não encontrada.");
            }
            categoryRepository.deleteById(categoryId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            if (e instanceof ResourceNotFoundException) {
                throw e;
            }
            throw new RuntimeException("Erro ao excluir categoria.", e);
        }
    }


    private CategoryResponseDto mapToSummaryDto(Category category) {
        return new CategoryResponseDto(
                category.getId(),
                category.getCategoryName()
        );
    }
}
