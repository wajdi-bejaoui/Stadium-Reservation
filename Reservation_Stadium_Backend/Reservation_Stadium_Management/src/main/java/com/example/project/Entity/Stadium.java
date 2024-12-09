package com.example.project.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Stadium {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String address;
    private int capacity;
    private String description;

    private String governorate;
    private String category;

    private int matchDuration; // in minutes
    private int breakDuration; // in minutes
    private LocalTime openingTime;
    private LocalTime closingTime;

    private String latitude;
    private String longitude;

    @ManyToOne
    @JoinColumn(name = "company_id")
    private Company company;

    @OneToMany(mappedBy = "stadium")
    @JsonIgnore

    private List<Reservation> reservations;

}
