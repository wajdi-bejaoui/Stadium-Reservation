package com.example.project.repository;

import com.example.project.Entity.Reservation;
import com.example.project.Entity.Timing;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findAllByUserId(Long userId);


}
