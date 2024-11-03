package com.example.project;

import com.example.project.Entity.Stadium;
import com.example.project.repository.StadiumRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

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
            List<String> categories = Arrays.asList("Football", "Basketball", "Handball", "Volleyball", "Natation", "Baby swimming");
            Random random = new Random();

            for (int i = 1; i <= 30; i++) {
                Stadium stadium = new Stadium();
                stadium.setId((long) i);
                stadium.setName("Stadium " + i);
                stadium.setLocation("Location " + i);
                stadium.setCapacity(random.nextInt(10) + 10); // Random capacity between 10 and 20
                stadium.setGovernorate(governorates.get(random.nextInt(governorates.size())));
                stadium.setCategory(categories.get(random.nextInt(categories.size())));

                stadiumRepository.save(stadium);
            }
        }
    }
}
