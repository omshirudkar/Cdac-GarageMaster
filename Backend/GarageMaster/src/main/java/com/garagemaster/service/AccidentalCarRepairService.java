package com.garagemaster.service;

import com.garagemaster.entity.AccidentalCarRepair;
import com.garagemaster.dao.AccidentalCarRepairRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccidentalCarRepairService {

    @Autowired
    private AccidentalCarRepairRepository repository;

    public AccidentalCarRepair saveRepairRequest(AccidentalCarRepair request) {
        return repository.save(request);
    }

    public List<AccidentalCarRepair> getAllRequests() {
        return repository.findAll();
    }

    public Optional<AccidentalCarRepair> getRequestById(Long id) {
        return repository.findById(id);
    }
}