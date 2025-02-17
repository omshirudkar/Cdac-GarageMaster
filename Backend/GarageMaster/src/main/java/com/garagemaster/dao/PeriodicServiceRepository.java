package com.garagemaster.dao;

import com.garagemaster.entity.PeriodicService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PeriodicServiceRepository extends JpaRepository<PeriodicService, Long> {
}