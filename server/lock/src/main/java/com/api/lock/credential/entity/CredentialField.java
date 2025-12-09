package com.api.lock.credential.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tp_credential_fields")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class CredentialField {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "credential_id", nullable = false)
    private Credential credential;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FieldType fieldType;

    @Column(nullable = false)
    private String label;

    @Column(nullable = false)
    private String encryptedValue;

    @Column(nullable = false)
    private boolean sensitive;
}
