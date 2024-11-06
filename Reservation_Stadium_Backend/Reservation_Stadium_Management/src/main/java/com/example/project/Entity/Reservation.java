package com.example.project.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reservation {

    private LocalDate reservationDate; // Date of the reservation

    // stadium: Many-to-one relationship linking to a Stadium.
    // timing: Many-to-one relationship linking to a Timing.
    @ManyToOne
    @JoinColumn(name = "stadium_id")
    private Stadium stadium;

    @ManyToOne
    @JoinColumn(name = "timing_id")
    private Timing timing;

    @ManyToOne
    @JoinColumn(name = "user_id") // Foreign key to link user to the reservation
    private User user;

    private boolean confirmed = false; // Reservation confirmation status

}
