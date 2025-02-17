package com.garagemaster.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.garagemaster.service.IHomeService;

@RestController
@RequestMapping("api/home")
public class homecontroller {
	@Autowired
private IHomeService homeService;
@GetMapping("/verify")
public ResponseEntity<?> verifyUserAccount(@RequestParam Integer userId, @RequestParam String code){
	return ResponseEntity.ok(homeService.verifyAccount(userId, code));
}
}
