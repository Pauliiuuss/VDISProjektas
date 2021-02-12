package it.akademija.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;

import it.akademija.models.User;

public class UserEntityTest {

	@Test
	public void testUserEntity() throws Exception {

		User user = new User("testUsername", "testPassword");



		assertEquals(user.getUsername(), "testUsername");
	}
}
