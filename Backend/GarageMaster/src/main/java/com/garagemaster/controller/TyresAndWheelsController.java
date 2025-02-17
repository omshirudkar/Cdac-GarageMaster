package com.garagemaster.controller;

import com.garagemaster.entity.TyresAndWheels;
import com.garagemaster.service.TyresAndWheelsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tyres-wheels")
@CrossOrigin(origins = "*") // Allow frontend access
public class TyresAndWheelsController {

    @Autowired
    private TyresAndWheelsService service;

    @PostMapping
    public TyresAndWheels addBooking(@RequestBody TyresAndWheels booking) {
        return service.saveBooking(booking);
    }

    @GetMapping
    public List<TyresAndWheels> getAllBookings() {
        return service.getAllBookings();
    }

    @GetMapping("/{id}")
    public Optional<TyresAndWheels> getBookingById(@PathVariable Long id) {
        return service.getBookingById(id);
    }
}
//{
//    "serviceType": "tyreChange",
//    "make": "Toyota",
//    "model": "Corolla",
//    "year": 2022,
//    "plate": "MH12AB1234",
//    "images": "image1.jpg,image2.jpg",
//    "estimateCost": 300.0,
//    "estimateTime": "1-2 hours",
//    "bookingDate": "2025-02-14",
//    "bookingTime": "10:00:00",
//    "mechanicName": "John Doe"
//}