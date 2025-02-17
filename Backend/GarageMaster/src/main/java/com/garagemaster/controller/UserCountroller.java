package com.garagemaster.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.garagemaster.dto.UserDto;
import com.garagemaster.service.IUserService;



@RestController
@RequestMapping("/api/user")
public class UserCountroller {
	@Autowired
	private IUserService userService;
	
	@GetMapping("/all")
	@PreAuthorize("hasRole('Admin')")
	public ResponseEntity<?> allUsers(){
		List<UserDto> allUsers = userService.getAllUsers();
		if(CollectionUtils.isEmpty(allUsers)) {
			return new ResponseEntity<>("User Not Available",HttpStatus.NO_CONTENT);
		}
		return ResponseEntity.ok(allUsers);
	}
	
	
	@DeleteMapping("delete/{id}")
	public ResponseEntity<?> deleteUserById(@PathVariable int id){
		return ResponseEntity.ok(userService.deleteUserById( id));
		
	}
	
	
}
