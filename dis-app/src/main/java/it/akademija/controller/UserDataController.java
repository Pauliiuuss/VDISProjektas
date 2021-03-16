package it.akademija.controller;

import it.akademija.payload.request.UserDataRequest;
import it.akademija.services.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/userdata")
public class UserDataController {

	@Autowired
	private UserDataService userDataService;

	@GetMapping("/all")
	@PreAuthorize("hasRole('SPEC') or hasRole('PARENT')")
	public Collection<UserDataRequest> getAllUserData() {
		return userDataService.getAllUserData();
	}

	@GetMapping("/get/{id}")
	@PreAuthorize("hasRole('SPEC') or hasRole('PARENT')")
	public UserDataRequest getUserDataById(@PathVariable long id) {
		return userDataService.getUserDataById(id);
	}

	@PostMapping("/add/{id}")
	@PreAuthorize("hasRole('SPEC') or hasRole('PARENT')")
	public ResponseEntity<?> addUserData(@RequestBody UserDataRequest userDataRequest, @PathVariable long id) {
		return userDataService.addUserData(userDataRequest, id);
	}

	@PutMapping("/password/{id}")
	@PreAuthorize("hasRole('SPEC') or hasRole('PARENT')")
	public ResponseEntity<?> updatePassword(@PathVariable long id, @RequestBody String[] passwords) {
		return userDataService.updatePassword(id, passwords[0], passwords[1]);
	}
}
