package com.garagemaster.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "lights_fitments_service")
@Data
public class LightsFitmentsService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private String make;
    private String model;
    private int year;
    private String plate;
    
    @Column(length = 2000) // Store image file paths as comma-separated values
    private String images;
    
    private Double estimatedCost;
    private String estimatedTime;
    private String bookingDate;
    private String bookingTime;
    private String mechanic;
}
