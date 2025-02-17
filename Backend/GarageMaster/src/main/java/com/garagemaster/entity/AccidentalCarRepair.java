package com.garagemaster.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "accidental_car_repair")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class AccidentalCarRepair {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicle;
    private String accidentDate;
    private String accidentDescription;
    private String contactName;
    private String contactPhone;
    private String mechanicName;
    private LocalDateTime bookingTime;
}