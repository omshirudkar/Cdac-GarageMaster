package com.garagemaster.controller;

import com.garagemaster.entity.EngineDecarbonizationBooking;
import com.garagemaster.dao.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*") // Allow frontend to access API
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // Get all bookings
    //GET http://localhost:8080/api/bookings
    @GetMapping
    public List<EngineDecarbonizationBooking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get booking by ID
    //GET http://localhost:8080/api/bookings/{id}
    @GetMapping("/{id}")
    public Optional<EngineDecarbonizationBooking> getBookingById(@PathVariable Long id) {
        return bookingRepository.findById(id);
    }

    // Get bookings by user ID
    @GetMapping("/user/{userId}")
    public List<EngineDecarbonizationBooking> getBookingsByUserId(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Create a new booking
    //http://localhost:8080/api/bookings
    @PostMapping
    public EngineDecarbonizationBooking createBooking(@RequestBody EngineDecarbonizationBooking booking) {
        return bookingRepository.save(booking);
    }

    // Delete a booking
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }
}
//{
//	  "user": { "id": 1 },
//	  "serviceType": "BASIC",
//	  "carMake": "Honda",
//	  "carModel": "Civic",
//	  "carYear": 2022,
//	  "licensePlate": "MH-12-AB-1234",
//	  "images": "image1.jpg,image2.jpg",
//	  "estimatedCost": 1500.00,
//	  "estimatedTime": "1-2 hours",
//	  "bookingDate": "2025-02-20",
//	  "bookingTime": "10:00 AM",
//	  "mechanicName": "John"
//	}
