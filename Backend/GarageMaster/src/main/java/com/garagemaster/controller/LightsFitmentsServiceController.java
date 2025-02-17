package com.garagemaster.controller;

import com.garagemaster.entity.LightsFitmentsService;
import com.garagemaster.service.LightsFitmentsServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lights-fitments")
@CrossOrigin("*")
public class LightsFitmentsServiceController {

    @Autowired
    private LightsFitmentsServiceService service;

    @PostMapping("/save")
    public LightsFitmentsService saveServiceRequest(@RequestBody LightsFitmentsService request) {
        return service.saveServiceRequest(request);
    }

    @GetMapping("/all")
    public List<LightsFitmentsService> getAllRequests() {
        return service.getAllRequests();
    }

    @GetMapping("/{id}")
    public LightsFitmentsService getRequestById(@PathVariable Long id) {
        return service.getRequestById(id);
    }
}
//{
//    "serviceType": "led",
//    "make": "Toyota",
//    "model": "Camry",
//    "year": 2022,
//    "plate": "MH12AB1234",
//    "images": "image1.jpg,image2.jpg",
//    "estimatedCost": 1500,
//    "estimatedTime": "1-2 days",
//    "bookingDate": "2024-12-31",
//    "bookingTime": "10:00 AM",
//    "mechanic": "John"
//}