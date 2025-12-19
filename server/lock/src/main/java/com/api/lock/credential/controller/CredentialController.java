package com.api.lock.credential.controller;

import com.api.lock.credential.dto.CreateCredentialDto;
import com.api.lock.credential.dto.CredentialResponseDto;
import com.api.lock.credential.dto.UpdateCredentialDto;
import com.api.lock.credential.entity.Credential;
import com.api.lock.credential.service.CredentialService;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/credential")
public class CredentialController {
    @Autowired
    private CredentialService credentialService;

    @GetMapping("/getAllCredentials/{userId}")
    public ResponseEntity<List<CredentialResponseDto>> getCredentials(@PathVariable String userId) {
        return credentialService.getAllCredentialsByUserId(userId);
    }

    @GetMapping("/getCredentialDetails/{credentialId}")
    public ResponseEntity<List<CredentialResponseDto>> getCredentialDetails(@PathVariable String credentialId) {
        return credentialService.getCredentialDetailsById(credentialId);
    }

    @GetMapping("/getByUserAndCategory/{userId}/{categoryId}")
    public ResponseEntity<List<CredentialResponseDto>> getByUserAndCategory(@PathVariable String userId, @PathVariable String categoryId) {
        return credentialService.getCredentialsByUserAndCategory(userId, categoryId);
    }

    @PostMapping("/registerNewCredential")
    @Transactional
    public ResponseEntity<Credential> registerCredential(@RequestBody @Valid CreateCredentialDto createCredentialDto) {
        return credentialService.registerNewCredential(createCredentialDto);
    }

    @PutMapping("/editCredential")
    @Transactional
    public ResponseEntity<Credential> editCredential(@RequestBody @Valid UpdateCredentialDto updateCredentialDto) {
        return credentialService.editCredential(updateCredentialDto);
    }

    @DeleteMapping("/deleteCredential/{credentialId}")
    public ResponseEntity<Void> deleteCredential(@PathVariable String credentialId) {
        return credentialService.deleteCredential(credentialId);
    }
}
