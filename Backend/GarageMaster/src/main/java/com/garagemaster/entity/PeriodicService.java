package com.garagemaster.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "periodic_services")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PeriodicService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String vehicle;

    @Column(nullable = false)
    private String serviceType;

    @Column(nullable = false)
    private int frequency;

    @Column(nullable = false)
    private String appointmentDate;

    @Column(nullable = false)
    private String appointmentTime;

    @Column(nullable = false)
    private String mechanic;
}
