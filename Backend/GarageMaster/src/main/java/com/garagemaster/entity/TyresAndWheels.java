package com.garagemaster.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "tyres_and_wheels")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TyresAndWheels {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private String make;
    private String model;
    private int year;
    private String plate;
    
    @Lob
    private String images; // Store image paths as comma-separated values
    
    private Double estimateCost;
    private String estimateTime;
    private LocalDate bookingDate;
    private LocalTime bookingTime;
    private String mechanicName;
}