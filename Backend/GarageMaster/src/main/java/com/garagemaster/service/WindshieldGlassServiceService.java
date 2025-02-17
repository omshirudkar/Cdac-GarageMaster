package com.garagemaster.service;

import com.garagemaster.entity.WindshieldGlassService;
import com.garagemaster.dao.WindshieldGlassServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WindshieldGlassServiceService {
    @Autowired
    private WindshieldGlassServiceRepository repository;

    public WindshieldGlassService saveServiceRequest(WindshieldGlassService request) {
        return repository.save(request);
    }

    public List<WindshieldGlassService> getAllRequests() {
        return repository.findAll();
    }

    public WindshieldGlassService getRequestById(Long id) {
        return repository.findById(id).orElse(null);
    }
}