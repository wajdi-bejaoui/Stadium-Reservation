package com.example.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.Entity.Stadium;
import com.example.project.Entity.Timing;
import com.example.project.repository.StadiumRepository;
import com.example.project.repository.TimingRepository;
import com.example.project.service.TimingService;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/timings")
@CrossOrigin(origins = "http://localhost:4200")
public class TimingController {

    @Autowired
    private TimingService timingService;

    @Autowired
    private TimingRepository timingRepository;

    @Autowired
    private StadiumRepository stadiumRepository;

    /**
     * Endpoint to get all available timings for a specific stadium on a given date.
     *
     * @param stadiumId ID of the stadium.
     * @param date      Date for which to get available timings.
     * @return List of available timings.
     */
    @GetMapping("/available")
    public ResponseEntity<List<Timing>> getAvailableTimings(
            @RequestParam Long stadiumId,
            @RequestParam LocalDate date) {

        // Retrieve the stadium
        Stadium stadium = stadiumRepository.findById(stadiumId)
                .orElseThrow(() -> new RuntimeException("Stadium not found"));

        // Generate timings for the specific date if not already generated
        List<Timing> allTimings = timingService.generateAvailableTimings(stadium, date);

        // for (Timing item : allTimings) {
        // System.out.println(item.getStartTime() + " ** " + item.getEndTime());
        // }
        // timingRepository.saveAll(allTimings);

        // Filter out available timings

        List<Timing> reservedTimings = timingRepository
                .findByStadiumIdAndReservedAndDate(stadiumId, true, date);
        System.out.println("*********reservedTimings*********");

        for (Timing item : reservedTimings) {
            System.out.println(item.getStartTime() + " ** " + item.getEndTime());
        }

        // Get reserved timings by subtracting available timings from all timings
        List<Timing> availableTimings = allTimings.stream()
                .filter(t -> !reservedTimings.contains(t)) // Those that are not available are reserved
                .collect(Collectors.toList());
        System.out.println("*********availableTimings*********");
        System.out.println("Available timings size: " + availableTimings.size());

        for (Timing item : availableTimings) {
            System.out.println(item.getStartTime() + " ** " + item.getEndTime());
        }

        System.out.println("Returning available timings: " + availableTimings);
        return ResponseEntity.ok(availableTimings);
    }

    /**
     * Endpoint to generate and save timings for a stadium over a specific number of
     * days (e.g., a week).
     *
     * @param stadiumId ID of the stadium.
     * @param days      Number of days to generate timings for.
     * @return Success message if timings were generated.
     */
    @PostMapping("/generate/{stadiumId}")
    public ResponseEntity<String> generateTimings(
            @PathVariable Long stadiumId,
            @RequestParam int days) {

        Stadium stadium = stadiumRepository.findById(stadiumId)
                .orElseThrow(() -> new RuntimeException("Stadium not found"));

        LocalDate today = LocalDate.now();
        for (int i = 0; i < days; i++) {
            LocalDate date = today.plusDays(i);
            List<Timing> timings = timingService.generateAvailableTimings(stadium, date);

            // Save generated timings if they don't already exist
            for (Timing timing : timings) {
                if (!timingRepository.existsByStadiumAndDateAndStartTime(
                        stadium, timing.getDate(), timing.getStartTime())) {
                    timingRepository.save(timing);
                }
            }
        }
        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Timings generated successfully for " + days + " days.");
    }
}
