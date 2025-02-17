package com.garagemaster.service;

import com.garagemaster.entity.DentingPaintingBooking;
import com.garagemaster.dao.DentingPaintingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DentingPaintingService {

    @Autowired
    private DentingPaintingRepository repository;

    public List<DentingPaintingBooking> getAllBookings() {
        return repository.findAll();
    }

    public DentingPaintingBooking saveBooking(DentingPaintingBooking booking) {
        return repository.save(booking);
    }
}