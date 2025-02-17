package com.garagemaster.dao;

import com.garagemaster.entity.LightsFitmentsService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LightsFitmentsServiceRepository extends JpaRepository<LightsFitmentsService, Long> {
}
