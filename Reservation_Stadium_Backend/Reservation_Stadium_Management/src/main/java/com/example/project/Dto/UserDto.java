package com.example.project.Dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Jwt;
    private String password;
    private String email;
    private String Roles;
    private String username;

    // @ElementCollection(targetClass = Role.class)
    // @CollectionTable(name = "user_roles", joinColumns = @JoinColumn(name =
    // "user_id"))
    // @Enumerated(EnumType.STRING)
    // private Set<Role> Roles = new HashSet<>();
    public UserDto(String email, String password, String username, String Roles) {
        super();
        this.email = email;
        this.password = password;
        this.username = username;

        this.Roles = Roles;
    }

}