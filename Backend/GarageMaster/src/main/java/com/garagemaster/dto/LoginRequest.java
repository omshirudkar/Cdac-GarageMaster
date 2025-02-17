package com.garagemaster.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginRequest {
	private String email;
	
	private String password;
}
