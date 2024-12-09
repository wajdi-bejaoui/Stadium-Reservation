package com.example.project.controller;

import com.example.project.Dto.AddStadiumRequest;
import com.example.project.Dto.UserDto;
import com.example.project.Entity.Stadium;
import com.example.project.Entity.User;
import com.example.project.service.StadiumService;
import com.example.project.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/stadiums")
@CrossOrigin(origins = "http://localhost:4200")
public class StadiumController {

    @Autowired
    private StadiumService stadiumService;

    @Autowired
    private UserService userService;

    // Save the images
    // for (MultipartFile file : formData.getImages()) {
    // // Save the file as needed (to the file system, database, etc.)
    // System.out.println("Saving file: " + file.getOriginalFilename());
    // }


    @PostMapping(value = "/add")
    public ResponseEntity<Stadium> addStadium(@RequestBody Stadium stadium) {
        Stadium savedStadium = stadiumService.addStadium(stadium);
        return ResponseEntity.ok(savedStadium);
    }

    // @PostMapping(value = "/add", consumes = { "multipart/form-data" })
    // public ResponseEntity addStadium(@RequestPart("formData") AddStadiumRequest formData) {

    //     Stadium stadium = new Stadium();
    //     stadium.setName(formData.getName());
    //     stadium.setCapacity(formData.getCapacity());
    //     stadium.setDescription(formData.getDescription());
    //     stadium.setGovernorate(formData.getGouvernorat());
    //     stadium.setCategory(formData.getCategory());
    //     stadium.setMatchDuration(formData.getMatchDuration());
    //     stadium.setBreakDuration(formData.getBreakDuration());
    //     stadium.setOpeningTime(formData.getOpeningTime());
    //     stadium.setClosingTime(formData.getClosingTime());
    //     stadium.setAddress(formData.getAddress());
    //     stadium.setLatitude(formData.getLatitude());
    //     stadium.setLongitude(formData.getLongitude());

    //     stadiumService.addStadium(stadium);

    //     UserDto user = new UserDto();
    //     user.setEmail(formData.getEmail());
    //     user.setPhone(formData.getPhone());

    //     userService.save(user);

    //     return ResponseEntity.ok("Form submitted successfully");

    // }

    @GetMapping("/{id}")
    public Optional<Stadium> getStadiumById(@PathVariable Long id) {
        return stadiumService.getStadiumById(id);
    }

    // @GetMapping
    // public List<Stadium> getAllStadiums() {
    // return stadiumService.getAllStadiums();
    // }

    @GetMapping("/get")
    public List<Stadium> getAllStadiums(
            @RequestParam(value = "governorate", required = false) String governorate,
            @RequestParam(value = "category", required = false) String category) {

        // Logic to filter stadiums based on the parameters
        // For example, you could pass these parameters to a service method:
        System.out.println("gov" + governorate);
        System.out.println("catg" + category);

        return stadiumService.getAllStadiums(governorate, category);
    }

    @DeleteMapping("/{id}")
    public void deleteStadium(@PathVariable Long id) {
        stadiumService.deleteStadium(id);
    }

    public void saveFiles(MultipartFile[] files) {
        try {
            for (MultipartFile file : files) {
                Path path = Paths.get("uploads/" + file.getOriginalFilename());
                Files.write(path, file.getBytes());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
