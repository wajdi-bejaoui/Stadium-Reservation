package com.example.project.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serializable;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String password;
    private String email;
    private String phone;

    private String username;

    private String Roles;

    @OneToMany(mappedBy = "user")
    private List<Reservation> reservations;

    public User(String email, String password, String username, String Roles) {
        super();
        this.email = email;
        this.username = username;

        this.password = password;
        this.Roles = Roles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return this.password; // Assuming your User class has a password field
    }

    @Override
    public String getUsername() {
        return this.email; // Or return username if you have one
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Or use a field in your User entity
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Or use a field in your User entity
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Or use a field in your User entity
    }

    @Override
    public boolean isEnabled() {
        return true; // Or use a field in your User entity
    }
}
