package com.example.project.repository;

import com.example.project.Entity.Stadium;
import com.example.project.Entity.Timing;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

public interface TimingRepository extends JpaRepository<Timing, Long> {
    Optional<Timing> findByStadiumIdAndDateAndStartTime(Long stadiumId, LocalDate date, LocalTime startTime);

    List<Timing> findByStadiumIdAndReservedAndDate(Long stadiumId, boolean reserved, LocalDate date);

    boolean existsByStadiumAndDateAndStartTime(Stadium stadium, LocalDate date, LocalTime startTime);

}
