package it.akademija.controller;

import java.io.FileNotFoundException;
import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.models.Log;
import it.akademija.payload.request.PasswordResetRequest;
import it.akademija.payload.request.RegisterRequest;
import it.akademija.payload.request.UserRequest;
import it.akademija.services.AdminService;

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

	@GetMapping("/getusers")
	@PreAuthorize("hasRole('ADMIN')")
	public Collection<UserRequest> getUsers() {
		return adminService.getUsers();
	}

	@DeleteMapping("/deleteuser/{id}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> deleteUser(@PathVariable final Long id) {
		return adminService.deleteUser(id);
	}

	@PostMapping("/resetpassword")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetRequest prr) {
		return adminService.resetPassword(prr);
	}

	@GetMapping("/disablespec")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> disableAllSpec() {
		return adminService.disableAllSpec();
	}

	@GetMapping("/enablespec")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> enableAllSpec() {
		return adminService.enableAllSpec();
	}

	@GetMapping("/log")
	@PreAuthorize("hasRole('ADMIN')")
	public List<Log> getLog() throws FileNotFoundException {
		return adminService.getLog();
	}

}
