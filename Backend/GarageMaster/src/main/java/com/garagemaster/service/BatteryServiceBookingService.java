package com.garagemaster.service;

import com.garagemaster.entity.BatteryServiceBooking;
import com.garagemaster.dao.BatteryServiceBookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatteryServiceBookingService {

    @Autowired
    private BatteryServiceBookingRepository repository;

    public List<BatteryServiceBooking> getAllBookings() {
        return repository.findAll();
    }

    public Optional<BatteryServiceBooking> getBookingById(Long id) {
        return repository.findById(id);
    }

    public List<BatteryServiceBooking> getBookingsByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public BatteryServiceBooking createBooking(BatteryServiceBooking booking) {
        return repository.save(booking);
    }
}
