package com.example.project.repository;

import com.example.project.Entity.Stadium;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StadiumRepository extends JpaRepository<Stadium, Long> {

    List<Stadium> findByGovernorate(String governorate);
    List<Stadium> findByCategory(String category);
    List<Stadium> findByGovernorateAndCategory(String governorate, String category);
}

