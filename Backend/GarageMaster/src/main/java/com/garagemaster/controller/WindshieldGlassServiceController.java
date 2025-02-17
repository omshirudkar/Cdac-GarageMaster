package com.garagemaster.controller;

import com.garagemaster.entity.WindshieldGlassService;
import com.garagemaster.service.WindshieldGlassServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/windshield-glass")
@CrossOrigin(origins = "http://localhost:3000") // Adjust if needed
public class WindshieldGlassServiceController {

    @Autowired
    private WindshieldGlassServiceService service;

    @PostMapping("/add")
    public WindshieldGlassService addServiceRequest(@RequestBody WindshieldGlassService request) {
        return service.saveServiceRequest(request);
    }

    @GetMapping("/all")
    public List<WindshieldGlassService> getAllRequests() {
        return service.getAllRequests();
    }

    @GetMapping("/{id}")
    public WindshieldGlassService getRequestById(@PathVariable Long id) {
        return service.getRequestById(id);
    }
}