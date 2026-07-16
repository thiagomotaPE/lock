package com.api.lock.user.repository;

import com.api.lock.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    UserDetails findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
