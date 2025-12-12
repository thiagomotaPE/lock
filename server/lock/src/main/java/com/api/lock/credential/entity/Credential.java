package com.api.lock.credential.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name="tb_credential")
@Entity(name="credential")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Credential {

    @Id @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @NotBlank @NotNull
    private String credentialName;

    @NotBlank @NotNull
    private String userId;

    @OneToMany(mappedBy = "credential", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<CredentialField> fields;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime updatedAt = LocalDateTime.now();

    public void addField(CredentialField f) {
        if (this.fields == null) {
            this.fields = new ArrayList<>();
        }
        f.setCredential(this);
        this.fields.add(f);
    }
}
