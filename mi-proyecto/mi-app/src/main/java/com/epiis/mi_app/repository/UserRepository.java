package com.epiis.mi_app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.epiis.mi_app.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmailAndActiveTrue(String email);

    Optional<User> findByDniAndActiveTrue(String dni);

    Optional<User> findByIdPersonAndActiveTrue(String id);

    List<User> findAllByActiveTrue();

    List<User> findByFirstNameContainingIgnoreCaseOrSurnameContainingIgnoreCaseAndActiveTrue(
            String firstName, String surname);

    boolean existsByEmail(String email);

    boolean existsByDni(String dni);

    boolean existsByEmailAndIdPersonNot(String email, String idPerson);

    boolean existsByDniAndIdPersonNot(String dni, String idPerson);
}
