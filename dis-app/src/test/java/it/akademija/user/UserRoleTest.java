package it.akademija.user;

import it.akademija.models.ERole;
import it.akademija.models.Role;
import it.akademija.models.User;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

public class UserRoleTest {

    @Test
    public void testUserRole() throws Exception {

        User user = new User("testUsername", "testPassword");
        user.setRole(new Role(ERole.ROLE_USER));
        assertNotNull(user.getRole());
    }
}
