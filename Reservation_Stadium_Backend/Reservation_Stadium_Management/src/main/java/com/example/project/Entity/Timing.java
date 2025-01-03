package com.example.project.Entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
    private boolean reserved = true;

    @ManyToOne
    @JoinColumn(name = "stadium_id")
    @JsonIgnore
    private Stadium stadium;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;
        Timing timing = (Timing) o;
        return Objects.equals(startTime, timing.startTime) &&
                Objects.equals(endTime, timing.endTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(startTime, endTime);
    }

}