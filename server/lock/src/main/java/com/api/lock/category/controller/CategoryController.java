package com.api.lock.category.controller;

import com.api.lock.category.dto.CreateCategoryDto;
import com.api.lock.category.dto.UpdateCategoryDto;
import com.api.lock.category.entity.Category;
import com.api.lock.category.service.CategoryService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getAllCategories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return categoryService.getAllCategories();
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
