package com.garagemaster.dao;

import com.garagemaster.entity.BatteryServiceBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BatteryServiceBookingRepository extends JpaRepository<BatteryServiceBooking, Long> {
    List<BatteryServiceBooking> findByUserId(Long userId);
}