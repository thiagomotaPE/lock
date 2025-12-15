package com.api.lock.credential.repository;

import com.api.lock.credential.entity.Credential;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Repository
public interface CredentialRepository extends JpaRepository<Credential, String> {
    List<Credential> findByUserId(String userId);
    List<Credential> findByUserIdAndCategory_Id(String userId, String categoryId);

}
