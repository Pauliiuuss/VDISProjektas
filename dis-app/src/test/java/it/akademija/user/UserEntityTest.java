package it.akademija.user;

import it.akademija.models.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

public class UserEntityTest {

    @Test
    public void testUserEntity() throws Exception {

        User user = new User("testUsername", "testPassword");
        assertNotNull(user);
        assertEquals(user.getUsername(), "testUsername");
        assertEquals(user.getPassword(), "testPassword");
    }
}
