package com.garagemaster.service;

import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.garagemaster.config.security.CustomUserDetails;
import com.garagemaster.dao.RoleRepository;
import com.garagemaster.dao.UserRepository;
import com.garagemaster.dto.EmailRequest;
import com.garagemaster.dto.LoginRequest;
import com.garagemaster.dto.LoginResponse;
import com.garagemaster.dto.UserDto;
import com.garagemaster.entity.AccountStatus;
import com.garagemaster.entity.Role;
import com.garagemaster.entity.User;
import com.garagemaster.exception.AccountInActiveException;
import com.garagemaster.exception.ResourceNotFoundExceptionClass;
import com.garagemaster.validation.Validation;

import jakarta.mail.MessagingException;

@Service
public class UserService implements IUserService {

    @Autowired
    private Validation validation;
    
    @Autowired
    private ModelMapper mapper;
    
    @Autowired
    private UserRepository userRepo;
    
    @Autowired
    private RoleRepository roleRepo;
    
    @Autowired
    private EmailService emailService;
    
    @Autowired
    private PasswordEncoder encoder;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private IJwtService jwtService;
    
    @Override
    public Boolean register(UserDto userDto) throws UnsupportedEncodingException, MessagingException {
        validation.validateUser(userDto);

        User newUser = mapper.map(userDto, User.class);

        setRoles(userDto, newUser);

        setStatus(newUser);

        newUser.setIsDeleted(false);
        newUser.setPassword(encoder.encode(newUser.getPassword()));

        User savedUser = userRepo.save(newUser);

        if (!ObjectUtils.isEmpty(savedUser)) {
            accountConfirmation(savedUser);
            return true;
        }

        return false;
    }

    private void accountConfirmation(User savedUser) throws UnsupportedEncodingException, MessagingException {
        String msg = "<h1>Hello [[fName]]</h1>"
                + "<h5>Your account created successfully.</h5>"
                + "<p>to activate account <a href=[[url]]>Click here</a></p><br/>"
                + "<b>Thank you for joining us.</b>";
        
        String verificationCode = savedUser.getStatus().getVerificationCode();
        String verifyUrl = "http://localhost:8080/api/home/verify?userId=" + savedUser.getId() + "&code=" + verificationCode;
        
        msg = msg.replace("[[fName]]", savedUser.getFirstName());
        msg = msg.replace("[[url]]", verifyUrl);
        
        EmailRequest emailRequest = EmailRequest.builder()
                .to(savedUser.getEmail())
                .subject("Congratulations!!! Account created successfully.")
                .title("Account confirmation mail")
                .message(msg)
                .build();
                
        emailService.sendMail(emailRequest);
    }

    private void setStatus(User newUser) {
        AccountStatus status = new AccountStatus();
        status.setIsActive(false);
        status.setVerificationCode(UUID.randomUUID().toString());
        
        newUser.setStatus(status);
    }

    private void setRoles(UserDto userDto, User newUser) {
        List<Role> roles = userDto.getRoles().stream()
            .map(roleDto -> roleRepo.findByName(roleDto.getName().trim()) // Find by name (trim to remove extra spaces)
                    .orElseThrow(() -> new IllegalArgumentException("Invalid Role: " + roleDto.getName())))
            .collect(Collectors.toList());
        newUser.setRoles(roles);
    }

    @Override
    public List<UserDto> getAllUsers() {
        List<UserDto> users = userRepo.findAllByIsDeletedFalse().stream()
            .map(user -> mapper.map(user, UserDto.class))
            .collect(Collectors.toList());
        return users;
    }

    @Override
    public String deleteUserById(Integer id) {
        // Check if the user exists
        User foundUser = userRepo.findById(id)
            .orElseThrow(() -> new ResourceNotFoundExceptionClass("User not found with id: " + id));
        
        // If user is already deleted, return a different message
        if (foundUser.getIsDeleted()) {
            return "User already marked as deleted.";
        }
        
        // Soft delete user
        foundUser.setIsDeleted(true);
        foundUser.setEmail(null); // Optionally nullify sensitive data like email
        userRepo.save(foundUser); // Save the user back after marking it as deleted
        
        return "User deleted successfully";
    }


    @Override
    public LoginResponse login(LoginRequest loginRequest) throws AccountInActiveException {
        User foundUser = userRepo.findByEmail(loginRequest.getEmail())
            .orElseThrow(() -> new ResourceNotFoundExceptionClass("User not found"));

        if (!foundUser.getStatus().getIsActive()) {
            throw new AccountInActiveException("Can't login, first verify email.");
        }

        Authentication authenticate = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        if (authenticate.isAuthenticated()) {
            CustomUserDetails userDetails = (CustomUserDetails) authenticate.getPrincipal();
            User authenticatedUser = userDetails.getUser();

            String token = jwtService.generateJwToken(authenticatedUser);

            // Extract all role names
            List<String> roleNames = authenticatedUser.getRoles()
                .stream()
                .map(Role::getName)
                .collect(Collectors.toList());

            return LoginResponse.builder()
                .tokan(token)
                .userDto(mapper.map(authenticatedUser, UserDto.class))
                .roles(roleNames) // Send list of roles
                .build();
        } else {
            throw new BadCredentialsException("Invalid Credentials!!");
        }
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepo.findAll();
    }

	@Override
	public boolean deleteUserById(Long userId) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean deleteUserById(int id) {
		// TODO Auto-generated method stub
		return false;
	}
}
