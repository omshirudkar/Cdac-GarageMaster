package com.garagemaster.controller;

import com.garagemaster.entity.AccidentalCarRepair;
import com.garagemaster.service.AccidentalCarRepairService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/repairs")
@CrossOrigin(origins = "*") // Allow requests from React frontend
public class AccidentalCarRepairController {

    @Autowired
    private AccidentalCarRepairService service;

    @PostMapping
    public AccidentalCarRepair addRepairRequest(@RequestBody AccidentalCarRepair request) {
        return service.saveRepairRequest(request);
    }

    @GetMapping
    public List<AccidentalCarRepair> getAllRequests() {
        return service.getAllRequests();
    }

    @GetMapping("/{id}")
    public Optional<AccidentalCarRepair> getRequestById(@PathVariable Long id) {
        return service.getRequestById(id);
    }
}
	//{
	//    "vehicle": "Honda City - MH12AB1234",
	//    "accidentDate": "2025-02-14",
	//    "accidentDescription": "Minor damage on the front bumper",
	//    "contactName": "Adeel Ahmad Khan",
	//    "contactPhone": "9876543210",
	//    "mechanicName": "John Doe",
	//    "bookingTime": "2025-02-14T10:00:00"
	//}