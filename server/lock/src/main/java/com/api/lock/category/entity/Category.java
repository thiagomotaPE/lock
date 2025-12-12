package com.api.lock.category.entity;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;

@Table(name = "tb_categories")
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
    private String name;

    public Category(@Valid Category dto) {
    }
}
