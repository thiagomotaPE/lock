package com.api.lock.credential.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class EncryptionService {

    private final SecretKeySpec keySpec;
    private static final int IV_SIZE = 12;

    public EncryptionService(@Value("${app.crypto.key:}") String base64Key) {
        if (base64Key == null || base64Key.isBlank()) {
            // for dev: generate a random key (NOT for production)
            throw new IllegalStateException("app.crypto.key não configurada");
        } else {
            byte[] key = Base64.getDecoder().decode(base64Key);
            this.keySpec = new SecretKeySpec(key, "AES");
        }
    }

    public String encrypt(String plaintext) {
        try {
            byte[] iv = new byte[IV_SIZE];
            new SecureRandom().nextBytes(iv);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            GCMParameterSpec spec = new GCMParameterSpec(128, iv);
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, spec);
            byte[] ct = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));
            // store iv + ciphertext in base64 separated by :
            String combined = Base64.getEncoder().encodeToString(iv) + ":" + Base64.getEncoder().encodeToString(ct);
            return combined;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String decrypt(String combined) {
        try {
            System.out.println("xerequinha de mel: " + combined);
            if (combined == null || combined.isEmpty()) return "";
            String[] parts = combined.split(":");
            System.out.println("PARTS LENGTH: " + parts.length);
            if (parts.length != 2) return "";
            byte[] iv = Base64.getDecoder().decode(parts[0]);
            byte[] ct = Base64.getDecoder().decode(parts[1]);
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            GCMParameterSpec spec = new GCMParameterSpec(128, iv);
            cipher.init(Cipher.DECRYPT_MODE, keySpec, spec);
            byte[] plain = cipher.doFinal(ct);
            return new String(plain, StandardCharsets.UTF_8);
        } catch (Exception e) {
            System.out.println("DECRYPT FAILED FOR: " + combined);
            throw new RuntimeException(e);
        }
    }
}