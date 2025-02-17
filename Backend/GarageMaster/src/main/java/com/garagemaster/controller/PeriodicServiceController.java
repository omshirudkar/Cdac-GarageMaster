package com.garagemaster.controller;

import com.garagemaster.entity.PeriodicService;
import com.garagemaster.service.PeriodicServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
//Get all:http://localhost:8080/api/periodic-services
@RestController
@RequestMapping("/api/periodic-services")
@CrossOrigin(origins = "*")
public class PeriodicServiceController {

    @Autowired
    private PeriodicServiceService service;

    // Get all periodic service bookings
    @GetMapping
    public List<PeriodicService> getAllServices() {
        return service.getAllServices();
    }

    // Save a new periodic service booking
    @PostMapping
    public PeriodicService saveService(@RequestBody PeriodicService periodicService) {
        return service.saveService(periodicService);
    }
}
//{
//	  "id": 1,
//	  "vehicle": "Honda City",
//	  "serviceType": "Oil Change",
//	  "frequency": 6,
//	  "appointmentDate": "2024-02-20",
//	  "appointmentTime": "10:00",
//	  "mechanic": "John Doe"
//	}
