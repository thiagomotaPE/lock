package com.api.lock.credential.service;

import com.api.lock.credential.Dto.CreateCredentialDto;
import com.api.lock.credential.Dto.UpdateCredentialDto;
import com.api.lock.credential.entity.Credential;
import com.api.lock.credential.repository.CredentialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CredentialService {
    @Autowired
    private CredentialRepository credentialRepository;

    //Listar todas as credenciais do usuario
    //AINDA TA RETORNANDO TODAS AS CREDENCIAIS. PRECISA SER SÓ DO USUARIO LOGADO
    public ResponseEntity<List<Credential>> getAllCredentialsById() {
        try {
            var allCredentials = credentialRepository.findAll();
            return ResponseEntity.ok(allCredentials);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    //Criar nova credencial
    public ResponseEntity<List<Credential>> registerNewCredential(CreateCredentialDto createCredentialDto) {
        return ResponseEntity.ok().build();
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
