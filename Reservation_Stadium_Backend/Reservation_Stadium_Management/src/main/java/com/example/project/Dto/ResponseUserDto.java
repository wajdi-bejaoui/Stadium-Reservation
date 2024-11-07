package com.example.project.Dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResponseUserDto {

    private Long id;
    private String email;
    private String Roles;
    private String jwt;

    public ResponseUserDto(String email, String Roles, String jwt) {
        this.email = email;
        this.Roles = Roles;
        this.jwt = jwt;

    }

    public ResponseUserDto(String email, String Roles) {
        this.email = email;
        this.Roles = Roles;
    }
}
