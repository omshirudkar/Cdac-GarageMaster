package com.garagemaster.service;

import com.garagemaster.entity.LightsFitmentsService;
import com.garagemaster.dao.LightsFitmentsServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LightsFitmentsServiceService {
    @Autowired
    private LightsFitmentsServiceRepository repository;

    public LightsFitmentsService saveServiceRequest(LightsFitmentsService request) {
        return repository.save(request);
    }

    public List<LightsFitmentsService> getAllRequests() {
        return repository.findAll();
    }

    public LightsFitmentsService getRequestById(Long id) {
        return repository.findById(id).orElse(null);
    }
}
