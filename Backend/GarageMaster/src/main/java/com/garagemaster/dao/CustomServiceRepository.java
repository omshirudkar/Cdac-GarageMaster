package com.garagemaster.dao;

import com.garagemaster.entity.CustomService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomServiceRepository extends JpaRepository<CustomService, Long> {
}