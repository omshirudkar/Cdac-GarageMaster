package com.garagemaster.controller;
import com.garagemaster.entity.CustomService;
import com.garagemaster.service.CustomServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/custom-services")
@CrossOrigin("*")
public class CustomServiceController {

    @Autowired
    private CustomServiceService service;

    @GetMapping
    public List<CustomService> getAllServices() {
        return service.getAllServices();
    }

    @GetMapping("/{id}")
    public Optional<CustomService> getServiceById(@PathVariable Long id) {
        return service.getServiceById(id);
    }

    @PostMapping
    public CustomService createService(@RequestBody CustomService customService) {
        return service.createService(customService);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
        service.deleteService(id);
    }
}