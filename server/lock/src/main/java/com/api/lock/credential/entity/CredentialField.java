package com.api.lock.credential.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

@Table(name = "tb_credential_fields")
@Entity(name="credentialField")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class CredentialField {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "credential_id")
    @JsonBackReference
    private Credential credential;

    @Column(nullable = false)
    private String keyName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FieldType fieldType;

    @Column(nullable = false)
    private String label;

    @Column(nullable = false, length = 4000)
    private String encryptedValue;

    @Column(nullable = false)
    private boolean sensitive;

    public CredentialField(String keyName, String label, FieldType fieldType, boolean sensitive) {
        this.keyName = keyName;
        this.label = label;
        this.fieldType = fieldType;
        this.sensitive = sensitive;
    }
}
