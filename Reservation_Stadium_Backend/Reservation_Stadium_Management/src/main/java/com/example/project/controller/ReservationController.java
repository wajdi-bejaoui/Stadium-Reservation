package com.example.project.controller;

import com.example.project.Dto.ReservationRequest;
import com.example.project.Entity.*;
import com.example.project.service.JwtService;
import com.example.project.service.ReservationService;
import com.example.project.service.TimingService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private TimingService timingService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/post")
    public ResponseEntity<Reservation> postReservation(HttpServletRequest request,
            @RequestBody ReservationRequest reservationRequest) {
        System.out.println("i m in reservation");
        User user = new User();
        System.out.println("i m in reservation2");

        Long userId = getUserIdFromToken(request);
        user.setId(userId); // You should ideally fetch this player from the database
        Stadium stadium = new Stadium();
        stadium.setId(reservationRequest.getStadiumId()); // You should ideally fetch this stadium from the database

        // create new timing instance in data base
        Timing timing = reservationRequest.getTiming();
        timing.setDate(reservationRequest.getDate());
        timing.setStadium(stadium);

        Timing timingInstance = timingService.createTiming(timing);
        System.out.println("i m in reservation3");

        Reservation res = reservationService.makeReservation(user, stadium, timingInstance,
                reservationRequest.getDate());
        return new ResponseEntity<Reservation>(res, HttpStatus.OK); // Corrected with proper semicolon
    }

    @PostMapping("/")
    public Reservation makeReservation(
            HttpServletRequest request,
            @RequestBody ReservationRequest reservationRequest) {
        System.out.println("i m in reservation");
        User user = new User();
        System.out.println("i m in reservation2");

        Long userId = getUserIdFromToken(request);
        user.setId(userId); // You should ideally fetch this player from the database
        Stadium stadium = new Stadium();
        stadium.setId(reservationRequest.getStadiumId()); // You should ideally fetch this stadium from the database

        // create new timing instance in data base
        Timing timingInstance = timingService.createTiming(reservationRequest.getTiming());
        System.out.println("i m in reservation3");

        return reservationService.makeReservation(user, stadium, timingInstance, reservationRequest.getDate());
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

    private Long getUserIdFromToken(HttpServletRequest request) {
        final String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            System.out.println("i m in reservation3 " + token);

            return jwtService.extractUserId(token);
        } else {
            throw new RuntimeException("JWT Token is missing or invalid");
        }
    }
}
