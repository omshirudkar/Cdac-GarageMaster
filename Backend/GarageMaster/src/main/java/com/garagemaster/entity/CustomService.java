package com.garagemaster.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "custom_services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomService {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private String make;
    private String model;
    private int year;
    private String plate;
    private Double estimateCost;
    private String estimateTime;
    private String bookingDate;
    private String bookingTime;
    private String mechanicName;
}