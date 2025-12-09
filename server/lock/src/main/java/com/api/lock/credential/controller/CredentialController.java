package com.api.lock.credential.controller;

import com.api.lock.credential.Dto.CreateCredentialDto;
import com.api.lock.credential.Dto.UpdateCredentialDto;
import com.api.lock.credential.entity.Credential;
import com.api.lock.credential.service.CredentialService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/credential")
public class CredentialController {
    @Autowired
    private CredentialService credentialService;

    @GetMapping("/getAllCredentials")
    public ResponseEntity<List<Credential>> getCredentials() {
        return credentialService.getAllCredentialsById();
    }

    @PostMapping("/registerNewCredential")
    public ResponseEntity<List<Credential>> registerCredential(@RequestBody @Valid CreateCredentialDto createCredentialDto) {
        return credentialService.registerNewCredential(createCredentialDto);
    }

    @PutMapping("/editCredential")
    @Transactional
    public ResponseEntity<List<Credential>> editCredential(@RequestBody @Valid UpdateCredentialDto updateCredentialDto) {
        return credentialService.editCredential(updateCredentialDto);
    }

    @DeleteMapping("/deleteCredential/{credentialId}")
    public ResponseEntity<Void> deleteCredential(@PathVariable String credentialId) {
        return credentialService.deleteCredential(credentialId);
    }
}
