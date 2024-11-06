package com.example.project.service;

import com.example.project.Entity.*;

import com.example.project.repository.ReservationRepository;
import com.example.project.repository.TimingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public Reservation makeReservation(Player player, Stadium stadium, Reservation reservation) {
        reservation.setPlayer(player);
        reservation.setStadium(stadium);
        return reservationRepository.save(reservation);
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public void cancelReservation(Long id) {
        reservationRepository.deleteById(id);
    }

    @Autowired
    private TimingRepository timingRepository;

    @PostMapping("/reserve")
    public ResponseEntity<String> reserve(@RequestParam Long stadiumId, @RequestParam LocalDate date,
            @RequestParam LocalTime startTime) {
        Optional<Timing> optionalTiming = timingRepository.findByStadiumIdAndDateAndStartTime(stadiumId, date,
                startTime);

        if (optionalTiming.isPresent() && !optionalTiming.get().isReserved()) {
            Timing timing = optionalTiming.get();
            timing.setReserved(true); // Mark as reserved
            timingRepository.save(timing);
            return ResponseEntity.ok("Reserved successfully");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Selected timing is not available");
        }
    }
}
