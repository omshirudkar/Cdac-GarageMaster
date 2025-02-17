package com.garagemaster.controller;

import com.garagemaster.entity.DentingPaintingBooking;
import com.garagemaster.service.DentingPaintingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/denting-painting")
@CrossOrigin(origins = "*") // Allow frontend requests
public class DentingPaintingController {

    @Autowired
    private DentingPaintingService service;

    @GetMapping("/bookings")
    public List<DentingPaintingBooking> getAllBookings() {
        return service.getAllBookings();
    }

    @PostMapping("/book")
    public DentingPaintingBooking createBooking(@RequestBody DentingPaintingBooking booking) {
        return service.saveBooking(booking);
    }
}