package com.example.project.controller;

import com.example.project.Entity.Stadium;
import com.example.project.service.StadiumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stadiums")
@CrossOrigin(origins = "http://localhost:4200")
public class StadiumController {

    @Autowired
    private StadiumService stadiumService;

    @PostMapping("/add")
    public Stadium addStadium(@RequestBody Stadium stadium) {
        return stadiumService.addStadium(stadium);
    }

    @GetMapping("/{id}")
    public Optional<Stadium> getStadiumById(@PathVariable Long id) {
        return stadiumService.getStadiumById(id);
    }

//    @GetMapping
//    public List<Stadium> getAllStadiums() {
//        return stadiumService.getAllStadiums();
//    }

    @GetMapping
    public List<Stadium> getAllStadiums(
            @RequestParam(value = "governorate", required = false) String governorate,
            @RequestParam(value = "category", required = false) String category) {

        // Logic to filter stadiums based on the parameters
        // For example, you could pass these parameters to a service method:
        System.out.println("gov"+governorate);
        System.out.println("catg"+category);

        return stadiumService.getAllStadiums(governorate, category);
    }

    @DeleteMapping("/{id}")
    public void deleteStadium(@PathVariable Long id) {
        stadiumService.deleteStadium(id);
    }
}

