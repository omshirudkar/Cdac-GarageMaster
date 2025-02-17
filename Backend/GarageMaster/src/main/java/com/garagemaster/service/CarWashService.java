package com.garagemaster.service;

import com.garagemaster.entity.CarWash;
import com.garagemaster.dao.CarWashRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarWashService {

    @Autowired
    private CarWashRepository carWashRepository;

    public CarWash saveBooking(CarWash carWash) {
        return carWashRepository.save(carWash);
    }

    public List<CarWash> getAllBookings() {
        return carWashRepository.findAll();
    }

    public CarWash getBookingById(Long id) {
        return carWashRepository.findById(id).orElse(null);
    }

    public void deleteBooking(Long id) {
        carWashRepository.deleteById(id);
    }
}