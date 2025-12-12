package com.api.lock.category.controller;

import com.api.lock.category.entity.Category;
import com.api.lock.category.service.CategoryService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/category")
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getAllCategories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return categoryService.getAllCategories();
    }

    @PostMapping("/registerNewCategory")
    public ResponseEntity<List<Category>> registerCategory(@RequestBody @Valid Category dto) {
        return categoryService.registerNewCategory(dto);
    }

    @PutMapping("/editCategory")
    @Transactional
    public ResponseEntity<List<Category>> editCategory() {
        return categoryService.editCategory();
    }

    @DeleteMapping("/deleteCategory/{categoryId}")
    public ResponseEntity<Category> deleteCategory(@PathVariable Long categoryId) {
        return categoryService.deleteCategory(categoryId);
    }
}
