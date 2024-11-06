package com.example.project.controller;

import com.example.project.Entity.*;

import com.example.project.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/make")
    public Reservation makeReservation(
            @RequestBody Reservation reservation,
            @RequestParam Long playerId,
            @RequestParam Long stadiumId) {
        Player player = new Player();
        player.setId(playerId); // You should ideally fetch this player from the database
        Stadium stadium = new Stadium();
        stadium.setId(stadiumId); // You should ideally fetch this stadium from the database
        return reservationService.makeReservation(player, stadium, reservation);
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
