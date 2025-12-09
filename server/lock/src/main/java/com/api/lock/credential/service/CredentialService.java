package com.api.lock.credential.service;

import com.api.lock.credential.Dto.CreateCredentialDto;
import com.api.lock.credential.Dto.UpdateCredentialDto;
import com.api.lock.credential.entity.Credential;
import com.api.lock.credential.entity.CredentialField;
import com.api.lock.credential.entity.FieldType;
import com.api.lock.credential.repository.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CredentialService {
    @Autowired
    private CredentialRepository credentialRepository;
    @Autowired
    private EncryptionService encryptionService;

    //Listar todas as credenciais do usuario
    public ResponseEntity<List<Credential>> getAllCredentialsByUserId(String userId) {
        try {
            var allCredentials = credentialRepository.findByUserId(userId);
            return ResponseEntity.ok(allCredentials);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    //Criar nova credencial
    public ResponseEntity<Credential> registerNewCredential(CreateCredentialDto createCredentialDto) {
        try {
            Credential newCredential = new Credential(createCredentialDto.credentialName(), createCredentialDto.userId(), java.time.LocalDateTime.now(), java.time.LocalDateTime.now());
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
    public ResponseEntity<List<Credential>> editCredential(UpdateCredentialDto updateCredentialDto) {
        return ResponseEntity.ok().build();
    }

    //Apagar credencial
    public ResponseEntity<Void> deleteCredential(String credentialId) {
        return ResponseEntity.ok().build();
    }
}
