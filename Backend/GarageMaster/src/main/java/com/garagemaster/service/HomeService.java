package com.garagemaster.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.garagemaster.dao.UserRepository;
import com.garagemaster.entity.User;
import com.garagemaster.exception.ResourceNotFoundExceptionClass;

@Service
public class HomeService implements IHomeService {
	@Autowired
	private UserRepository userRepo;

//	@SuppressWarnings("unused")
	@Override
	public String verifyAccount(Integer id, String code) {
		
	User foundUser=	userRepo.findById(id).orElseThrow(()-> new ResourceNotFoundExceptionClass("Invalid User"));
		String verifyCode= foundUser.getStatus().getVerificationCode();
		
		if(verifyCode.equals(code)) {
			foundUser.getStatus().setIsActive(true);
			foundUser.getStatus().setVerificationCode(null);
			userRepo.save(foundUser);
			return "Account verified Successfully!!";
		}
		else if(verifyCode==null) {
			return " Account Already verified";
		}
		return "Verififcation Failed!";
	}

}