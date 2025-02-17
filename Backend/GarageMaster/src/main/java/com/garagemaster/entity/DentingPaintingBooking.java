package com.garagemaster.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "denting_painting_bookings")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DentingPaintingBooking {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String serviceType;
    private String vehicleMake;
    private String vehicleModel;
    private int vehicleYear;
    private String vehiclePlate;
    private String images;  // Store image URLs as a comma-separated string
    private Double estimatedCost;
    private String estimatedTime;
    private String bookingDate;
    private String bookingTime;
    private String mechanicName;
}