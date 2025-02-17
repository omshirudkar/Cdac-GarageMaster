package com.garagemaster.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "car_wash")
public class CarWash {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private String vehicleMake;
    private String vehicleModel;
    private int vehicleYear;
    private String vehiclePlate;
    private String images;
    private double estimateCost;
    private String estimateTime;
    private LocalDate bookingDate;
    private String bookingTime;
    private String mechanicName;

    // Getters and Setters
}
