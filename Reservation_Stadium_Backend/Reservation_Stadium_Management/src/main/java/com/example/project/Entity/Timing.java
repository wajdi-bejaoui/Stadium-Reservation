package com.example.project.Entity;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Timing {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date; // Each timing is associated with a specific date
    private LocalTime startTime;
    private LocalTime endTime;
    private boolean reserved = false;

    @ManyToOne
    @JoinColumn(name = "stadium_id")
    private Stadium stadium;



}