package it.akademija.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.models.UserDataInfo;
import it.akademija.services.UserDataService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/userdata")
public class UserDataController {

	@Autowired
	private UserDataService userDataService;

	@GetMapping("/all")
	public Collection<UserDataInfo> getAllUserData() {
		return userDataService.getAllUserData();
	}

	@GetMapping("/get/{id}")
	public UserDataInfo getUserDataById(@PathVariable long id) {
		return userDataService.getUserDataById(id);
	}

	@PostMapping("/add/{id}")
	public void addUserData(@RequestBody UserDataInfo userDataInfo, @PathVariable long id) {
		userDataService.addUserData(userDataInfo, id);
	}

	@PutMapping("/update")
	public void updateUserData(UserDataInfo userDataInfo) {
		userDataService.updateUserData(userDataInfo);
	}
}
