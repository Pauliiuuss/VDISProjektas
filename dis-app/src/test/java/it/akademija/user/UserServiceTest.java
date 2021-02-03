package it.akademija.user;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import it.akademija.models.User;
import it.akademija.repository.UserRepository;
import it.akademija.services.AdminService;
import it.akademija.services.AuthService;

//@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
public class UserServiceTest {

	@MockBean
	private User user;

	@MockBean
	private UserRepository userRepository;

	@Autowired
	private AdminService adminService;

	@Autowired
	private AuthService authService;

	@Test
	public void getUsersTest() throws Exception {
		when(userRepository.findAll()).thenReturn(
				Stream.of(new User("testUsername1$", "testPassword1$"), new User("testUsername2$", "testPassword2$"))
						.collect(Collectors.toList()));
		System.out.println(adminService.getUsers().size());
		assertEquals(2, adminService.getUsers().size());
	}

//    @Test
//    public void getUserByUsername() {
//        String username = "testUsername1$";
//        when(userRepository.findAll()).thenReturn(Stream.of(new User("testUsername1$", "testPassword1$"),
//                new User("testUsername2", "testPassword2")).collect(Collectors.toList()));
//        assertEquals(1, (int) userRepository.findByUsername(username).stream().count());
//    }

	@Test
	public void saveUserTest() {
		User user = new User("testUsername1$", "testPassword1$");
		when(userRepository.save(user)).thenReturn(user);
		assertEquals(user, userRepository.save(user));
	}

	@Test
	public void deleteUserTest() {
		User user = new User("testUsername1$", "testPassword1$");
		userRepository.delete(user);
		verify(userRepository, times(1)).delete(user);
	}
}
