package com.garagemaster.service;

import com.garagemaster.entity.PeriodicService;
import com.garagemaster.dao.PeriodicServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PeriodicServiceService {

    @Autowired
    private PeriodicServiceRepository repository;

    public List<PeriodicService> getAllServices() {
        return repository.findAll();
    }

    public PeriodicService saveService(PeriodicService service) {
        return repository.save(service);
    }
}
