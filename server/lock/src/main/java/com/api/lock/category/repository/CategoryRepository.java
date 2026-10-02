package com.api.lock.category.repository;

import com.api.lock.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    Optional<Category> findByCategoryNameAndUser_Id(String categoryName, String userId);
    Optional<Category> findByCategoryNameAndUser_IdIgnoreCase(String categoryName, String userId);
    List<Category> findByUser_Id(String userId);
    boolean existsByUser_IdAndCategoryNameIgnoreCase(String userId, String categoryName);
}
