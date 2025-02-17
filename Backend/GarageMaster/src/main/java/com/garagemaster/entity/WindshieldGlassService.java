package com.garagemaster.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "windshield_glass_service")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WindshieldGlassService {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private String make;
    private String model;
    private int year;
    private String plate;

    @Column(columnDefinition = "TEXT")
    private String imagePaths;

    private Double estimatedCost;
    private String estimatedTime;
    private String bookingDate;
    private String bookingTime;
    private String mechanic;
    private boolean bookingConfirmed;
}
