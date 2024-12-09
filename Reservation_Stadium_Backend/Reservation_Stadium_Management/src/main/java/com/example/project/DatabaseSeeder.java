package com.example.project;

import com.example.project.Entity.Stadium;
import com.example.project.Entity.Timing;
import com.example.project.repository.StadiumRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Random;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private StadiumRepository stadiumRepository;

    @Override
    public void run(String... args) throws Exception {
        if (stadiumRepository.count() == 0) {
            List<String> governorates = Arrays.asList("Tunis", "Bizerte", "Ariana", "Manouba", "Sfax");
            List<String> categories = Arrays.asList("Football", "Basketball", "Handball", "Volleyball", "Natation",
                    "Baby swimming");
            Random random = new Random();

            // Timing data
            // List<Timing> timings = new ArrayList<>();
            // timings.add(new Timing("9:00", "10:15"));
            // timings.add(new Timing("10:30", "11:45"));
            // timings.add(new Timing("12:00", "13:15"));
            // timings.add(new Timing("13:30", "14:45"));
            // timings.add(new Timing("15:00", "15:15"));

            // // Week data
            // List<Week> weeks = new ArrayList<>();
            // String[] daysOfWeek = {"Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi",
            // "Vendredi", "Samedi"};
            // for (int i = 0; i < 7; i++) {
            // String day = daysOfWeek[i];
            // String date = "Date " + i; // Replace with your date logic
            // weeks.add(new Week(day, date));
            // }

            for (int i = 1; i <= 30; i++) {
                Stadium stadium = new Stadium();
                stadium.setId((long) i);
                stadium.setName("Stadium " + i);
                stadium.setAddress("Address " + i);
                stadium.setCapacity(random.nextInt(10) + 10); // Random capacity between 10 and 20
                stadium.setGovernorate(governorates.get(random.nextInt(governorates.size())));
                stadium.setCategory(categories.get(random.nextInt(categories.size())));
                stadium.setMatchDuration(75); // e.g., 75 minutes
                stadium.setBreakDuration(15); // e.g., 15 minutes
                stadium.setOpeningTime(LocalTime.of(9, 0));
                stadium.setClosingTime(LocalTime.of(18, 0));

                stadiumRepository.save(stadium);
            }

            // Generate and save timings for a week
            // LocalDate today = LocalDate.now();
            // for (int i = 0; i < 7; i++) {
            // LocalDate date = today.plusDays(i);
            // List<Timing> timings = timingService.generateAvailableTimings(stadium, date);
            // timingRepository.saveAll(timings);
            // }
        }
    }
}
