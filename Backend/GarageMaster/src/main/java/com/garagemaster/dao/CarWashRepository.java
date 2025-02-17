package com.garagemaster.dao;

import com.garagemaster.entity.CarWash;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CarWashRepository extends JpaRepository<CarWash, Long> {
}