package com.garagemaster.validation;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;

import com.garagemaster.dao.RoleRepository;
import com.garagemaster.dao.UserRepository;
import com.garagemaster.dto.UserDto;

@Component
public class Validation {

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private UserRepository userRepo;

    public static final String EMAIL_REGEX = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
    public static final String PASSWORD_REGEX = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
    public static final String MOBILE_REGEX = "^\\+?[0-9]{10,13}$";

    public void validateUser(UserDto user) {
        if (!StringUtils.hasText(user.getFirstName())) {  // ✅ Fixed typo in getter
            throw new IllegalArgumentException("First name cannot be empty. Please enter a valid name.");
        }

        if (!StringUtils.hasText(user.getLastName())) {
            throw new IllegalArgumentException("Last name cannot be empty. Please enter a valid name.");
        }

        if (!StringUtils.hasText(user.getEmail()) || !user.getEmail().matches(EMAIL_REGEX)) {
            throw new IllegalArgumentException("Invalid email format. Please enter a valid email.");
        } else if (userRepo.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists. Please use a different email.");
        }

        if (!StringUtils.hasText(user.getPassword()) || !user.getPassword().matches(PASSWORD_REGEX)) {
            throw new IllegalArgumentException("Invalid password. Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        }

//        if (!StringUtils.hasText(user.getMobileNo()) || !user.getMobileNo().matches(MOBILE_REGEX)) {
//            throw new IllegalArgumentException("Invalid mobile number. Please enter a 10-digit number like 9876543210 or with country code like +919876543210.");
//        }

        if (CollectionUtils.isEmpty(user.getRoles())) {
            throw new IllegalArgumentException("Roles not defined. Please assign at least one role.");
        } else {
            // ✅ Optimized role validation using Set for faster lookup
            Set<Integer> availableRolesId = roleRepo.findAll().stream()
                    .map(role -> role.getId())
                    .collect(Collectors.toSet());

            List<Integer> invalidRoleId = user.getRoles().stream()
                    .filter(role -> role != null && role.getId() != null) // ✅ Prevent NullPointerException
                    .map(role -> role.getId())
                    .filter(roleId -> !availableRolesId.contains(roleId))
                    .toList();

            if (!CollectionUtils.isEmpty(invalidRoleId)) {
                throw new IllegalArgumentException("Invalid Roles: " + invalidRoleId);
            }
        }
    }
}
