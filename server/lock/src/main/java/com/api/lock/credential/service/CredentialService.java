package com.api.lock.credential.service;

import com.api.lock.category.entity.Category;
import com.api.lock.category.repository.CategoryRepository;
import com.api.lock.credential.dto.CreateCredentialDto;
import com.api.lock.credential.dto.CredentialResponseDto;
import com.api.lock.credential.dto.FieldResponseDto;
import com.api.lock.credential.dto.UpdateCredentialDto;
import com.api.lock.credential.entity.Credential;
import com.api.lock.credential.entity.CredentialField;
import com.api.lock.credential.entity.FieldType;
import com.api.lock.credential.repository.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CredentialService {
    @Autowired
    private CredentialRepository credentialRepository;
    @Autowired
    private EncryptionService encryptionService;
    @Autowired
    private CategoryRepository categoryRepository;

    //Listar todas as credenciais do usuario
    public ResponseEntity<List<CredentialResponseDto>> getAllCredentialsByUserId(String userId) {
        try {
            var credentials = credentialRepository.findByUserId(userId);

            List<CredentialResponseDto> response = credentials.stream().map(credential -> {

                List<FieldResponseDto> fields = credential.getFields().stream().map(credentialField -> {
                    String decryptedValue = "";
                    try {
                        decryptedValue = encryptionService.decrypt(credentialField.getEncryptedValue());
                    } catch (Exception ignored) {}

                    return new FieldResponseDto(
                            credentialField.getKeyName(),
                            credentialField.getLabel(),
                            credentialField.getFieldType().name(),
                            decryptedValue,
                            credentialField.isSensitive()
                    );
                }).toList();

                String categoryId = null;
                String categoryName = null;

                if (credential.getCategory() != null) {
                    categoryId = credential.getCategory().getId();
                    categoryName = credential.getCategory().getCategoryName();
                }

                return new CredentialResponseDto(
                        credential.getId(),
                        credential.getCredentialName(),
                        credential.getUserId(),
                        categoryId,
                        categoryName,
                        fields
                );
            }).toList();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Buscar apenas uma credencial
    public ResponseEntity<List<CredentialResponseDto>> getCredentialDetailsById(String credentialId) {
        try {
            var credentialDetails = credentialRepository.findById(credentialId);

            List<CredentialResponseDto> response = credentialDetails.stream().map(credential -> {

                List<FieldResponseDto> fields = credential.getFields().stream().map(credentialField -> {
                    String decryptedValue = "";
                    try {
                        decryptedValue = encryptionService.decrypt(credentialField.getEncryptedValue());
                    } catch (Exception ignored) {}

                    return new FieldResponseDto(
                            credentialField.getKeyName(),
                            credentialField.getLabel(),
                            credentialField.getFieldType().name(),
                            decryptedValue,
                            credentialField.isSensitive()
                    );
                }).toList();

                String categoryId = null;
                String categoryName = null;

                if (credential.getCategory() != null) {
                    categoryId = credential.getCategory().getId();
                    categoryName = credential.getCategory().getCategoryName();
                }

                return new CredentialResponseDto(
                        credential.getId(),
                        credential.getCredentialName(),
                        credential.getUserId(),
                        categoryId,
                        categoryName,
                        fields
                );
            }).toList();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    //Buscar credenciais por usuario e por categoria
    public ResponseEntity<List<CredentialResponseDto>> getCredentialsByUserAndCategory(String userId, String categoryId) {

        List<Credential> credentials = credentialRepository.findByUserIdAndCategory_Id(userId, categoryId);
        List<CredentialResponseDto> response = credentials.stream().map(this::mapToDto).toList();
        return ResponseEntity.ok(response);
    }


    //Criar nova credencial
    public ResponseEntity<Credential> registerNewCredential(CreateCredentialDto createCredentialDto) {
        try {
            //Criando o objeto com os dados obrigatorios
            Credential newCredential = new Credential();
            newCredential.setCredentialName(createCredentialDto.credentialName());
            newCredential.setUserId(createCredentialDto.userId());
            newCredential.setCreatedAt(java.time.LocalDateTime.now());
            newCredential.setUpdatedAt(java.time.LocalDateTime.now());

            Category defaultCategory = categoryRepository
                    .findByCategoryName("Sem categoria")
                    .orElseThrow(() -> new RuntimeException("Categoria padrão não encontrada"));

            newCredential.setCategory(defaultCategory);

            //Verificando se o usuario adicionou algum campo a credencial
            if (createCredentialDto.fields() != null) {
                createCredentialDto.fields().forEach(fieldDto -> {
                    CredentialField credentialField = new CredentialField();
                    credentialField.setKeyName(fieldDto.key);
                    try {
                        credentialField.setFieldType(FieldType.valueOf(fieldDto.type != null ? fieldDto.type.toUpperCase() : "TEXT"));
                    } catch (Exception ex) {
                        credentialField.setFieldType(FieldType.TEXT);
                    }
                    credentialField.setLabel(fieldDto.label != null ? fieldDto.label : fieldDto.key);
                    credentialField.setSensitive(Boolean.TRUE.equals(fieldDto.sensitive));

                    if (fieldDto.value != null) {
                        String encrypted = encryptionService.encrypt(fieldDto.value);
                        credentialField.setEncryptedValue(encrypted);
                    } else {
                        credentialField.setEncryptedValue("");
                    }
                    newCredential.addField(credentialField);
                });
            }
            credentialRepository.save(newCredential);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //Editar credencial existente
    public ResponseEntity<Credential> editCredential(UpdateCredentialDto updateCredentialDto) {
        Optional<Credential> optional = credentialRepository.findById(updateCredentialDto.id());
        if (optional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Credential credential = optional.get();
        if (updateCredentialDto.credentialName() != null)
            credential.setCredentialName(updateCredentialDto.credentialName());
        credential.setUpdatedAt(java.time.LocalDateTime.now());

        if (updateCredentialDto.credentialCategoryId() != null) {
            Category category = categoryRepository
                    .findById(updateCredentialDto.credentialCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));

            credential.setCategory(category);
        }


        // simple strategy: clear existing fields and add provided ones
        credential.getFields().clear();
        if (updateCredentialDto.fields() != null) {
            updateCredentialDto.fields().forEach(fieldDto -> {
                CredentialField cf = new CredentialField();
                cf.setKeyName(fieldDto.key);
                try {
                    cf.setFieldType(FieldType.valueOf(fieldDto.type != null ? fieldDto.type.toUpperCase() : "TEXT"));
                } catch (Exception ex) {
                    cf.setFieldType(FieldType.TEXT);
                }
                cf.setLabel(fieldDto.label != null ? fieldDto.label : fieldDto.key);
                cf.setSensitive(Boolean.TRUE.equals(fieldDto.sensitive));
                if (fieldDto.value != null) {
                    cf.setEncryptedValue(encryptionService.encrypt(fieldDto.value));
                } else {
                    cf.setEncryptedValue("");
                }
                credential.addField(cf);
            });
        }

        Credential changedCredential = credentialRepository.save(credential);
        return ResponseEntity.ok(changedCredential);
    }

    //Apagar credencial
    public ResponseEntity<Void> deleteCredential(String credentialId) {
        try {
            Optional<Credential> opt = credentialRepository.findById(credentialId);
            if (opt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            credentialRepository.deleteById(credentialId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    private CredentialResponseDto mapToDto(Credential credential) {

        List<FieldResponseDto> fields = credential.getFields().stream().map(f -> {
            String value = "";
            try {
                value = encryptionService.decrypt(f.getEncryptedValue());
            } catch (Exception ignored) {}

            return new FieldResponseDto(
                    f.getKeyName(),
                    f.getLabel(),
                    f.getFieldType().name(),
                    value,
                    f.isSensitive()
            );
        }).toList();

        String categoryId = null;
        String categoryName = null;

        if (credential.getCategory() != null) {
            categoryId = credential.getCategory().getId();
            categoryName = credential.getCategory().getCategoryName();
        }

        return new CredentialResponseDto(
                credential.getId(),
                credential.getCredentialName(),
                credential.getUserId(),
                categoryId,
                categoryName,
                fields
        );
    }
}
