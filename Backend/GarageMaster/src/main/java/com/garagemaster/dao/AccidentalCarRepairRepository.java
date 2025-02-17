package com.garagemaster.dao;

import com.garagemaster.entity.AccidentalCarRepair;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccidentalCarRepairRepository extends JpaRepository<AccidentalCarRepair, Long> {
}