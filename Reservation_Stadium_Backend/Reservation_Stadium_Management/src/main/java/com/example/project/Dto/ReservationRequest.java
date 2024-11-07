package com.example.project.Dto;

import java.time.LocalDate;

import com.example.project.Entity.Timing;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ReservationRequest {
    private LocalDate date;
    private Long stadiumId;
    private Timing timing; // Assuming Timing is a class
    // Add getters and setters
}
