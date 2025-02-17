package com.garagemaster.dao;

import com.garagemaster.entity.TyresAndWheels;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TyresAndWheelsRepository extends JpaRepository<TyresAndWheels, Long> {
}