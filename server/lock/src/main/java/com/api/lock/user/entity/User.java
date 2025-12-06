package com.api.lock.user.entity;

import com.api.lock.user.Dto.RequestUserDto;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;

@Table(name="tb_user")
@Entity(name="tb_user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String name;

    public User(@Valid RequestUserDto userDto) {
        this.name = userDto.name();
    }
}
