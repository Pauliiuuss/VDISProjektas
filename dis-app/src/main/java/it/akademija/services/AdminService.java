package it.akademija.services;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.AppStatus;
import it.akademija.models.Log;
import it.akademija.models.Role;
import it.akademija.models.User;
import it.akademija.models.enums.ERole;
import it.akademija.payload.request.PasswordResetRequest;
import it.akademija.payload.request.RegisterRequest;
import it.akademija.payload.request.UserRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.AppStatusRepo;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserDataRepository;
import it.akademija.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class AdminService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private RoleRepository roleRepository;
	@Autowired
	private AppStatusRepo statusRepo;

	@Autowired
	private UserDataRepository userDataRepository;

	@Transactional
	public ResponseEntity<?> registerUser(RegisterRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Toks prisijungimo vardas jau yra!"));
		}

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), encoder.encode(signUpRequest.getPassword()));

		String role = signUpRequest.getRole();

		if (role == null || role.equals("")) {
			throw new RuntimeException("Error: Role is not found.");
		} else {
			if (role.equals("ROLE_SPEC")) {
				Role specRole = roleRepository.findByName(ERole.ROLE_SPEC)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
				user.setRole(specRole);
				;
			} else {
				Role parentRole = roleRepository.findByName(ERole.ROLE_PARENT)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found!!!"));
				user.setRole(parentRole);
				;
			}
		}

		userRepository.save(user);
		if (role.equals("ROLE_SPEC")) {
			Log.logMessage("Administratorius", "Užregistravo švietimo specialistą: \"" + user.getUsername() + "\"");
		} else {

			Log.logMessage("Administratorius", "Užregistravo vaiko atstovą: \"" + user.getUsername() + "\"");

		}
		return ResponseEntity.ok(new MessageResponse("Naudotojas užregistruotas!"));
	}

	@Transactional(readOnly = true)
	public Collection<UserRequest> getUsers() {
		return userRepository.findAll().stream().filter(user -> !user.getUsername().equals("admin"))
				.map(isdb -> new UserRequest(isdb.getId(), isdb.getUsername(), isdb.getPassword(), isdb.getRole()))
				.collect(Collectors.toList());
	}

	@Transactional
	public ResponseEntity<?> deleteUser(Long id) {

		userDataRepository.deleteByUser(userRepository.getOne(id));

		userRepository.deleteById(id);

		Log.logMessage("Administratorius", "Ištrynė naudotoją: \"" + userRepository.getOne(id).getUsername() + "\"");
		return ResponseEntity.ok(new MessageResponse("Naudotojas ištrintas!"));
	}

	@Transactional
	public ResponseEntity<?> resetPassword(PasswordResetRequest prr) {
		User user = userRepository.findByUsername(prr.getUsername()).get();

		user.setPassword(encoder.encode(prr.getUsername()));

		userRepository.save(user);

		Log.logMessage("Administratorius", "Atstatė slaptažodį naudotojui: \"" + user.getUsername() + "\"");
		return ResponseEntity.ok(new MessageResponse("Slaptažodis sėkmingai atstatytas"));
	}

	public ResponseEntity<?> disableAllSpec() {
		AppStatus appStatus = statusRepo.findAll().get(0);
		appStatus.setSpecelistsDisabled(true);
		statusRepo.save(appStatus);
		Log.logMessage("Administratorius", "Švietimo specialistų funkcionalumas užrakintas");
		return ResponseEntity.ok(new MessageResponse("Švietimo specialistų funkcionalumas užrakintas"));
	}

	public ResponseEntity<?> enableAllSpec() {
		AppStatus appStatus = statusRepo.findAll().get(0);
		appStatus.setSpecelistsDisabled(false);
		statusRepo.save(appStatus);
		Log.logMessage("Administratorius", "Švietimo specialistų funkcionalumas atstatytas");
		return ResponseEntity.ok(new MessageResponse("Švietimo specialistų funkcionalumas atstatytas"));
	}

	public List<Log> getLog() throws FileNotFoundException {
		File file = new File("app.log");
		Scanner reader = new Scanner(file);
		List<Log> strings = new ArrayList<>();
		while (reader.hasNextLine()) {
			String[] data = reader.nextLine().split("--");
			if (data.length == 4) {
				Log log = new Log(data[0].strip(), data[1].strip(), data[2].strip(), data[3].strip());
				strings.add(log);
			}
		}
		reader.close();

		return strings;
	}

}
