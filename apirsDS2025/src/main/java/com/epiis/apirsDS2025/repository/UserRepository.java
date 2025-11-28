package com.epiis.apirsDS2025.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.epiis.apirsDS2025.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
