package com.garagemaster.config.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.garagemaster.dao.UserRepository;
import com.garagemaster.entity.User;



@Service
public class CustomUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User foundUser = userRepo.findByEmail(username).orElseThrow(()-> new UsernameNotFoundException("User name not found!"));
		
		return new CustomUserDetails(foundUser);
	}

}
