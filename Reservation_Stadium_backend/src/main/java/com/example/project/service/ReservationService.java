package com.example.project.service;

import com.example.project.Entity.*;

import com.example.project.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
