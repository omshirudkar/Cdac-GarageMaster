package com.garagemaster.service;

import com.garagemaster.entity.TyresAndWheels;
import com.garagemaster.dao.TyresAndWheelsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TyresAndWheelsService {

    @Autowired
    private TyresAndWheelsRepository repository;

    public TyresAndWheels saveBooking(TyresAndWheels booking) {
        return repository.save(booking);
    }

    public List<TyresAndWheels> getAllBookings() {
        return repository.findAll();
    }

    public Optional<TyresAndWheels> getBookingById(Long id) {
        return repository.findById(id);
    }
}