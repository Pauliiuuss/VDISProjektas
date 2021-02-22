package it.akademija.controller;

import java.util.Collection;

import it.akademija.payload.request.UserDataRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.services.UserDataService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/userdata")
public class UserDataController {

	@Autowired
	private UserDataService userDataService;

	@GetMapping("/all")
	public Collection<UserDataRequest> getAllUserData() {
		return userDataService.getAllUserData();
	}

	@GetMapping("/get/{id}")
	public UserDataRequest getUserDataById(@PathVariable long id) {
		return userDataService.getUserDataById(id);
	}

	@PostMapping("/add/{id}")
	public ResponseEntity<?> addUserData(@RequestBody UserDataRequest userDataRequest, @PathVariable long id) {
		return userDataService.addUserData(userDataRequest, id);
	}

	@PutMapping("/password/{id}")
	public ResponseEntity<?> updatePassword(@PathVariable long id, @RequestBody String[] passwords) {
		return userDataService.updatePassword(id, passwords[0], passwords[1]);
	}
}
