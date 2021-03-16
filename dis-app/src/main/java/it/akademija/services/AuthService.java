package it.akademija.services;

import it.akademija.models.Log;
import it.akademija.models.User;
import it.akademija.models.enums.ERole;
import it.akademija.payload.request.LoginRequest;
import it.akademija.payload.request.UserRequest;
import it.akademija.payload.response.JwtResponse;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.UserRepository;
import it.akademija.security.jwt.JwtUtils;
import it.akademija.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuthService {

	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private JwtUtils jwtUtils;

	@Transactional
	public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());
		Log.logMessage("Prisijungė prie sistemos.");
		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), roles));
	}

	@Transactional(readOnly = true)
	public UserRequest getUserById(long id) {
		User info = userRepository.findAll().stream().filter(isdb -> isdb.getId() == id).findFirst().orElse(null);
		if (info != null) {
			return new UserRequest(info.getId(), info.getUsername(), info.getPassword(), info.getRole());
		} else {
			throw new IllegalArgumentException("Vartotojas pagal duota ID nerastas.");
		}
	}

	@Transactional
	public ResponseEntity<?> passwordResetToMatchUsername(String username) {
		User user = userRepository.findByUsername(username).get();

		if (user.getRole().getName().equals(ERole.ROLE_ADMIN)) {
			System.out.println("Can't reset admin password");
		} else {
			user.setPassword(encoder.encode(username));
		}

		return ResponseEntity.ok(new MessageResponse("Slaptažodis atstatytas į pradinį."));
	}

}
