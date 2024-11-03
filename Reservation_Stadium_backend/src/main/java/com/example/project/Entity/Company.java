package com.example.project.Entity;

import com.example.project.Entity.Stadium;
import jakarta.persistence.*;
import lombok.Setter;

import java.util.List;

@Entity
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String password;

    @Setter
    @OneToMany(mappedBy = "company")
    private List<Stadium> stadiums;

    public Company(Long id, String name, String email, List<Stadium> stadiums) {
        this.id = id;
        this.name = name;
        this.email = email;

        this.stadiums = stadiums;
    }

    public Company() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public List<Stadium> getStadiums() {
        return stadiums;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setStadiums(List<Stadium> stadiums) {
        this.stadiums = stadiums;
    }
}
