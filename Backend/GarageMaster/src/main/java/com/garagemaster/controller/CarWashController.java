package com.garagemaster.controller;

import com.garagemaster.entity.CarWash;
import com.garagemaster.service.CarWashService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/carwash")
@CrossOrigin("*")
public class CarWashController {

    @Autowired
    private CarWashService carWashService;

    @PostMapping("/book")
    public CarWash bookCarWash(@RequestBody CarWash carWash) {
        return carWashService.saveBooking(carWash);
    }

    @GetMapping("/bookings")
    public List<CarWash> getAllBookings() {
        return carWashService.getAllBookings();
    }

    @GetMapping("/booking/{id}")
    public CarWash getBookingById(@PathVariable Long id) {
        return carWashService.getBookingById(id);
    }

    @DeleteMapping("/booking/{id}")
    public String deleteBooking(@PathVariable Long id) {
        carWashService.deleteBooking(id);
        return "Booking deleted successfully!";
    }
}
//{
//	  "serviceType": "premium",
//	  "vehicleMake": "Toyota",
//	  "vehicleModel": "Camry",
//	  "vehicleYear": 2022,
//	  "vehiclePlate": "MH12AB1234",
//	  "images": "image1.jpg,image2.jpg",
//	  "estimateCost": 600,
//	  "estimateTime": "2-3 hours",
//	  "bookingDate": "2025-03-01",
//	  "bookingTime": "10:00 AM",
//	  "mechanicName": "John"
//	}
