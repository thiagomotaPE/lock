package com.api.lock.category.entity;

import com.api.lock.category.dto.CreateCategoryDto;
import com.api.lock.user.entity.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;

@Table(
        name = "tb_category",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "category_name"})
)
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

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;

    public Category(@Valid CreateCategoryDto createCategoryDto) {
        this.categoryName = createCategoryDto.categoryName();
    }
}
