package com.garagemaster.dao;

import com.garagemaster.entity.EngineDecarbonizationBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<EngineDecarbonizationBooking, Long> {
    List<EngineDecarbonizationBooking> findByUserId(Long userId);
}
