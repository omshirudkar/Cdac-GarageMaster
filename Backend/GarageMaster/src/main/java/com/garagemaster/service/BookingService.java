package com.garagemaster.service;

import com.garagemaster.dao.BookingRepository;
import com.garagemaster.entity.EngineDecarbonizationBooking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    // Get all bookings
    public List<EngineDecarbonizationBooking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get booking by ID
    public Optional<EngineDecarbonizationBooking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    // Get bookings by user ID
    public List<EngineDecarbonizationBooking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // Create a new booking
    public EngineDecarbonizationBooking createBooking(EngineDecarbonizationBooking booking) {
        return bookingRepository.save(booking);
    }

    // Delete a booking
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
