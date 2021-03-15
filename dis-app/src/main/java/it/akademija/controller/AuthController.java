package it.akademija.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.models.Log;
import it.akademija.payload.request.LoginRequest;
import it.akademija.payload.request.UserRequest;
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
	public UserRequest getUserById(@PathVariable("id") long id) {
		return authService.getUserById(id);
	}

	@PostMapping("/forgot_password/{username}")
	public ResponseEntity<?> passwordResetToMatchUsername(@PathVariable("username") String username) {
		return authService.passwordResetToMatchUsername(username);
	}

	@GetMapping("/logout")
	@PreAuthorize("hasRole('SPEC') or hasRole('PARENT') or hasRole('ADMIN')")
	public void logout() {
		Log.logMessage("Atsijungė nuo sistemos.");
	}

}
