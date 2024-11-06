package com.example.project.controller;

import com.example.project.Entity.*;

import com.example.project.service.ReservationService;
import com.example.project.service.TimingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private TimingService timingService;

    @PostMapping("/make")
    public Reservation makeReservation(
            @RequestBody Reservation reservation,
            @RequestParam Long userId,
            @RequestParam Long stadiumId,
            @RequestParam Timing timing) {
        User user = new User();
        user.setId(userId); // You should ideally fetch this player from the database
        Stadium stadium = new Stadium();
        stadium.setId(stadiumId); // You should ideally fetch this stadium from the database

        // create new timing instance in data base

        return reservationService.makeReservation(user, stadium, reservation, timing);
    }

    @GetMapping("/{id}")
    public Optional<Reservation> getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id);
    }

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @DeleteMapping("/{id}")
    public void cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
    }
}
