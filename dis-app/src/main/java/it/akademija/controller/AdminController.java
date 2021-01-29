package it.akademija.controller;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import it.akademija.models.UserInfo;
import it.akademija.services.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import it.akademija.models.ERole;
import it.akademija.models.Role;
import it.akademija.models.User;
import it.akademija.payload.request.RegisterRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;
import it.akademija.security.jwt.JwtUtils;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;

	@PostMapping("/create")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
		return adminService.registerUser(signUpRequest);
	}

	@PostMapping("/getusers")
	public Collection<UserInfo> getUsers() {
		return adminService.getUsers();
	}

}
