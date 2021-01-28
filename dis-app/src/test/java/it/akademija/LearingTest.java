package it.akademija;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class LearingTest {

	@Test
	public void encript_password() {
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		String pass = passwordEncoder.encode("admin");

		System.out.println(pass);
	}
}
