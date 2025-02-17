package com.garagemaster.dao;

import com.garagemaster.entity.WindshieldGlassService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WindshieldGlassServiceRepository extends JpaRepository<WindshieldGlassService, Long> {
}
