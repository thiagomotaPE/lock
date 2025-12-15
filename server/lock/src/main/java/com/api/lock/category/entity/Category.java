package com.api.lock.category.entity;

import com.api.lock.category.dto.CreateCategoryDto;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;

@Table(name = "tb_category")
@Entity(name = "category")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = "id")
public class Category {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(unique = true)
    private String categoryName;

    public Category(@Valid CreateCategoryDto createCategoryDto) {
        this.categoryName = createCategoryDto.categoryName();
    }
}
