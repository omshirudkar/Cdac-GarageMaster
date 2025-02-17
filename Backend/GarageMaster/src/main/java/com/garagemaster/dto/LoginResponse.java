package com.garagemaster.dto;



import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
	private String tokan;
	
	private UserDto userDto; 
	
	private List<String> roles;
}
