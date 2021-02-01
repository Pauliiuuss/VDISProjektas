package it.akademija.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.ERole;
import it.akademija.models.Role;
import it.akademija.models.User;
import it.akademija.models.UserInfo;
import it.akademija.payload.request.RegisterRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.RoleRepository;
import it.akademija.repository.UserRepository;

@Service
public class AdminService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private RoleRepository roleRepository;

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

		return ResponseEntity.ok(new MessageResponse("Naudotojas užregistruotas!"));
	}

	@Transactional(readOnly = true)
	public Collection<UserInfo> getUsers() {
		return userRepository.findAll().stream().filter(user -> !user.getUsername().equals("admin"))
				.map(isdb -> new UserInfo(isdb.getId(), isdb.getUsername(), isdb.getPassword(), isdb.getRole()))
				.collect(Collectors.toList());
	}

	@Transactional
	public ResponseEntity<?> deleteUser(Long id) {
		userRepository.deleteById(id);

		return ResponseEntity.ok(new MessageResponse("Naudotojas ištrintas!"));
	}

}
