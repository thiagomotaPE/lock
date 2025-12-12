package com.api.lock.credential.service;

import com.api.lock.credential.Dto.CreateCredentialDto;
import com.api.lock.credential.Dto.CredentialResponseDto;
import com.api.lock.credential.Dto.FieldResponseDto;
import com.api.lock.credential.Dto.UpdateCredentialDto;
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

                return new CredentialResponseDto(
                        credential.getId(),
                        credential.getCredentialName(),
                        credential.getUserId(),
                        fields
                );
            }).toList();

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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
}
