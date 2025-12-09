package com.api.lock.credential.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name="tb_credential")
@Entity(name="tb_credential")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Credential {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank @NotNull
    private String credentialName;

    @NotBlank @NotNull
    private String userId;

    @OneToMany(mappedBy = "credential", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<CredentialField> fields = new ArrayList<>();
}
