package com.garagemaster.dao;

import com.garagemaster.entity.DentingPaintingBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DentingPaintingRepository extends JpaRepository<DentingPaintingBooking, Long> {
}
