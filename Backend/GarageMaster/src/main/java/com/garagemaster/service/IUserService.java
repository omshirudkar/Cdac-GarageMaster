package com.garagemaster.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import com.garagemaster.dto.LoginRequest;
import com.garagemaster.dto.LoginResponse;
import com.garagemaster.dto.UserDto;
import com.garagemaster.entity.Role;
import com.garagemaster.exception.AccountInActiveException;

import jakarta.mail.MessagingException;

public interface IUserService {
	Boolean register(UserDto user) throws MessagingException, UnsupportedEncodingException;
	
	
	List<UserDto> getAllUsers();
	
	//String deleteUserById(Long userId);
	
	LoginResponse login(LoginRequest loginRequest) throws AccountInActiveException;
	
	List<Role> getAllRoles();
	
	public boolean deleteUserById(Long userId);


	String deleteUserById(Integer id);


	boolean deleteUserById(int id);
	
	
	
}
