package com.api.lock.category.controller;

import com.api.lock.category.dto.CategoryResponseDto;
import com.api.lock.category.dto.CreateCategoryDto;
import com.api.lock.category.dto.UpdateCategoryDto;
import com.api.lock.category.entity.Category;
import com.api.lock.category.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/getAllCategories/{userId}")
    public ResponseEntity<List<CategoryResponseDto>> getAllCategories(@PathVariable String userId) {
        return categoryService.getAllCategories(userId);
    }

    @PostMapping("/registerNewCategory")
    public ResponseEntity<List<Category>> registerCategory(@RequestBody @Valid CreateCategoryDto createCategoryDto) {
        return categoryService.registerNewCategory(createCategoryDto);
    }

    @PutMapping("/editCategory/{categoryId}")
    public ResponseEntity<Category> editCategory(@PathVariable String categoryId, @RequestBody UpdateCategoryDto updateCategoryDto) {
        return categoryService.editCategory(categoryId, updateCategoryDto);
    }

    @DeleteMapping("/deleteCategory/{categoryId}")
    public ResponseEntity<Category> deleteCategory(@PathVariable String categoryId) {
        return categoryService.deleteCategory(categoryId);
    }
}
