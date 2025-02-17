package com.garagemaster.service;

import com.garagemaster.entity.CustomService;
import com.garagemaster.dao.CustomServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CustomServiceService {
    
    @Autowired
    private CustomServiceRepository repository;

    public List<CustomService> getAllServices() {
        return repository.findAll();
    }

    public Optional<CustomService> getServiceById(Long id) {
        return repository.findById(id);
    }

    public CustomService createService(CustomService service) {
        return repository.save(service);
    }

    public void deleteService(Long id) {
        repository.deleteById(id);
    }
}