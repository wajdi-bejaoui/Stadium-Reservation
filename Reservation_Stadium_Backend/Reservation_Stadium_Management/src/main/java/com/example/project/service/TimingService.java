package com.example.project.service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.project.Entity.Stadium;
import com.example.project.Entity.Timing;

@Service
public class TimingService {

    public List<Timing> generateAvailableTimings(Stadium stadium) {
        List<Timing> timings = new ArrayList<>();

        LocalTime currentTime = stadium.getOpeningTime();
        while (currentTime.plusMinutes(stadium.getMatchDuration()).isBefore(stadium.getClosingTime())) {
            LocalTime endTime = currentTime.plusMinutes(stadium.getMatchDuration());
            Timing timing = new Timing();
            timing.setStartTime(currentTime);
            timing.setEndTime(endTime);
            timing.setStadium(stadium);

            timings.add(timing);

            currentTime = endTime.plusMinutes(stadium.getBreakDuration()); // Move to the next match time
        }

        return timings;
    }

    public List<Timing> generateAvailableTimings(Stadium stadium, LocalDate date) {
        List<Timing> timings = new ArrayList<>();

        LocalTime currentTime = stadium.getOpeningTime();
        while (currentTime.plusMinutes(stadium.getMatchDuration()).isBefore(stadium.getClosingTime())) {
            LocalTime endTime = currentTime.plusMinutes(stadium.getMatchDuration());
            Timing timing = new Timing();
            timing.setStartTime(currentTime);
            timing.setEndTime(endTime);
            timing.setStadium(stadium);

            timings.add(timing);

            currentTime = endTime.plusMinutes(stadium.getBreakDuration()); // Move to the next match time
        }

        return timings;
    }
}