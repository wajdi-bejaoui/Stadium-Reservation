package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.project.Entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    boolean existsByEmail(String email);

   Optional <User> findByEmail(String email);


    @Query("SELECT u FROM User u JOIN u.Roles r WHERE r = :role")
    List<User> findByRole(@Param("role") String role);


    Optional<User> findUserByUsername(String username);
    Optional<User> findUserById(Long id);
}
