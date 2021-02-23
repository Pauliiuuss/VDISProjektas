package it.akademija.controller;

import javax.validation.Valid;

import it.akademija.payload.request.UserRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import it.akademija.payload.request.LoginRequest;
import it.akademija.services.AuthService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private AuthService authService;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		return authService.authenticateUser(loginRequest);
	}

	@GetMapping("/{id}")
	public UserRequest getUserById(@PathVariable("id") long id){
		return authService.getUserById(id);
	}

	@PostMapping("/forgot_password/{username}")
	public ResponseEntity<?> passwordResetToMatchUsername(@PathVariable("username") String username) {
		return authService.passwordResetToMatchUsername(username);
	}
}
