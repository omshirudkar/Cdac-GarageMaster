package com.garagemaster.exception;

import java.nio.file.FileAlreadyExistsException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {

    // 🔹 Handle RuntimeException (Generic Exception)
    @ExceptionHandler(RuntimeException.class)
    public ProblemDetail handleRuntimeException(RuntimeException e) {
        return createProblemDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Internal Server Error", e.getMessage());
    }

    // 🔹 Handle IllegalArgumentException
    @ExceptionHandler(IllegalArgumentException.class)
    public ProblemDetail handleIllegalArgumentException(IllegalArgumentException e) {
        return createProblemDetail(HttpStatus.BAD_REQUEST, "Invalid Argument", e.getMessage());
    }

    // 🔹 Handle ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundExceptionClass.class)
    public ProblemDetail handleResourceNotFoundException(ResourceNotFoundExceptionClass e) {
        return createProblemDetail(HttpStatus.NOT_FOUND, "Resource Not Found", e.getMessage());
    }

    // 🔹 Handle BadCredentialsException (Incorrect Login Details)
    @ExceptionHandler(BadCredentialsException.class)
    public ProblemDetail handleBadCredentialsException(BadCredentialsException e) {
        return createProblemDetail(HttpStatus.UNAUTHORIZED, "Invalid Credentials", e.getMessage());
    }

    // 🔹 Handle UsernameNotFoundException (When user is not found)
    @ExceptionHandler(UsernameNotFoundException.class)
    public ProblemDetail handleUsernameNotFoundException(UsernameNotFoundException e) {
        return createProblemDetail(HttpStatus.NOT_FOUND, "User Not Found", e.getMessage());
    }

    // 🔹 Handle AccountInActiveException (For inactive users)
    @ExceptionHandler(AccountInActiveException.class)
    public ProblemDetail handleAccountInActiveException(AccountInActiveException e) {
        return createProblemDetail(HttpStatus.FORBIDDEN, "Account Inactive", e.getMessage());
    }

    // 🔹 Handle AuthorizationDeniedException (Access Denied)
    @ExceptionHandler(AuthorizationDeniedException.class)
    public ProblemDetail handleAuthorizationDeniedException(AuthorizationDeniedException e) {
        return createProblemDetail(HttpStatus.FORBIDDEN, "Access Denied", e.getMessage());
    }

    // 🔹 Handle FileAlreadyExistsException (For file upload conflicts)
    @ExceptionHandler(FileAlreadyExistsException.class)
    public ProblemDetail handleFileAlreadyExistsException(FileAlreadyExistsException e) {
        return createProblemDetail(HttpStatus.CONFLICT, "File Already Exists", e.getMessage());
    }

    // 🔹 Handle Validation Errors (e.g., invalid request body)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage()));

        return createProblemDetail(HttpStatus.BAD_REQUEST, "Validation Error", errors.toString());
    }

    // 🔹 Handle Generic Exception (Catch-all for unexpected errors)
    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGenericException(Exception e) {
        return createProblemDetail(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected Error", e.getMessage());
    }

    // 🛠 Helper method to create ProblemDetail responses
    private ProblemDetail createProblemDetail(HttpStatus status, String error, String message) {
        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(status, message);
        problemDetail.setProperty("error", error);
        return problemDetail;
    }
}
