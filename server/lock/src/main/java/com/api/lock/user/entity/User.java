package com.api.lock.user.entity;

import com.api.lock.user.Dto.CreateUserDto;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotBlank @NotNull
    private String username;

    @Email @NotBlank @NotNull @Column(unique = true)
    private String email;

    @NotBlank @NotNull
    private String password;

    public User(@Valid CreateUserDto createUserDto) {
        this.username = createUserDto.username();
        this.email = createUserDto.email();
        this.password = createUserDto.password();
    }
}
