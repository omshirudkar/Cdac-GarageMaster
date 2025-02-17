package com.garagemaster.controller;

import com.garagemaster.entity.BatteryServiceBooking;
import com.garagemaster.service.BatteryServiceBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/battery-service")
@CrossOrigin(origins = "http://localhost:3000") // Allow React to call API
public class BatteryServiceBookingController {

    @Autowired
    private BatteryServiceBookingService service;

    @GetMapping("/all")
    public List<BatteryServiceBooking> getAllBookings() {
        return service.getAllBookings();
    }

    @GetMapping("/{id}")
    public Optional<BatteryServiceBooking> getBookingById(@PathVariable Long id) {
        return service.getBookingById(id);
    }

    @GetMapping("/user/{userId}")
    public List<BatteryServiceBooking> getBookingsByUserId(@PathVariable Long userId) {
        return service.getBookingsByUserId(userId);
    }

    @PostMapping("/create")
    public BatteryServiceBooking createBooking(@RequestBody BatteryServiceBooking booking) {
        return service.createBooking(booking);
    }
}