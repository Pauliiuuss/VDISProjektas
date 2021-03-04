package it.akademija.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.models.ChildForm;
import it.akademija.models.Kindergarten;
import it.akademija.repository.AppStatusRepo;
import it.akademija.repository.ChildFormRepository;
import it.akademija.repository.FormStatusRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.KindergartenRepository;
import it.akademija.repository.UserDataRepository;
import it.akademija.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
class ParentServiceTest {

	@Autowired
	private ParentService parentService;

	@MockBean
	private KindergartenRepository kindergartenRepository;

	@MockBean
	private UserRepository userRepo;

	@MockBean
	private GroupRepository groupRepository;

	@MockBean
	private ChildFormRepository formRepo;

	@MockBean
	private FormStatusRepository statusRepo;

	@MockBean
	private AppStatusRepo appStatusRepo;

	@MockBean
	private UserDataRepository userDataRepository;

	@Test
	void testGetKindergartens() {

		when(kindergartenRepository.findAll())
				.thenReturn(Stream
						.of(new Kindergarten(1L, "address1", "name1", new ArrayList<>()),
								new Kindergarten(2L, "address2", "name2", new ArrayList<>()))
						.collect((Collectors.toList())));

		assertEquals(2, parentService.getKindergartens().size());

	}

	@Test
	void testGetAllForms() {

		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		ChildForm childForm2 = new ChildForm(2L, "name2", "surename2", new Date(1514757600000L), "address2", "city2",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		ChildForm childForm3 = new ChildForm(12345L, "name3", "surename3", new Date(1514757600000L), "address3",
				"city3", true, true, true, true, true, null, null, new Date(1614504968824L));
		List<ChildForm> childForms = new ArrayList<>();
		childForms.add(childForm3);
		childForms.add(childForm2);
		childForms.add(childForm1);
		when(formRepo.findAll()).thenReturn(childForms);

		assertEquals(3, parentService.getAllForms().size());

	}

	@Test
	void testGetData() {
		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		when(formRepo.findByPersonId(1L)).thenReturn(Optional.of(childForm1));

		assertEquals("name1", parentService.getData(1L).getName());
		assertEquals(null, parentService.getData(null));
	}

	@Test
	void testGetDataException() {
		Assertions.assertThrows(NoSuchElementException.class, () -> {
			parentService.getData(9L);
		});
	}

//	@Test
//	void testAddForm() {
//
//		when(formRepo.existsByPersonId(123L)).thenReturn(true);
//		when(formRepo.existsByPersonId(1L)).thenReturn(false);
//
//		User user1 = new User("username1", "password1");
//		User user2 = new User("username2", "password2");
//
//		when(userRepo.findAll()).thenReturn(Stream.of(user1, user2).collect(Collectors.toList()));
//
//		when(formStatusRepository.findByName(EFormStatus.PATEIKTAS))
//				.thenReturn(Optional.of(new FormStatus(EFormStatus.PATEIKTAS)));
//	}

//	@Test
//	void testGetForms() {
//		UserData userData1 = new UserData(1L, "name1", "surename1", 123L, "address1", "city1", 123L, "email1");
//		userData1.setChildForms(null);
//		User user = new User("username", "password");
//
//		when(userRepo.getOne(1L)).thenReturn(user);
//
//		when(userDataRepository.findByUser(user)).thenReturn(Optional.of(userData1));
//
//		assertEquals(1L, parentService.getForms(1L));
//
//	}

	@Test
	void testUpdateForm() {
		fail("Not yet implemented");
	}

	@Test
	void testDeleteFormById() {
		fail("Not yet implemented");
	}

	@Test
	void testGetStatus() {
		fail("Not yet implemented");
	}

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
	}

	@BeforeEach
	void setUp() throws Exception {
	}

	@AfterEach
	void tearDown() throws Exception {
	}
}
