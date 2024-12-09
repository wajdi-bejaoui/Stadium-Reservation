package com.example.project.Dto;

import java.time.LocalTime;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AddStadiumRequest {
    private String name;
    private String gouvernorat;
    private String category;
    private int capacity;
    private String description;
    private String address;
    private String latitude;
    private String longitude;
    private String phone;
    private String email;
    private int matchDuration; // in minutes
    private int breakDuration; // in minutes
    private LocalTime openingTime;
    private LocalTime closingTime;
    // private MultipartFile[] images; // For handling multiple images

    // Getters and setters
}