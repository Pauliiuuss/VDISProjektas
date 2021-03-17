package it.akademija.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.models.AppStatus;
import it.akademija.models.ChildForm;
import it.akademija.models.FormStatus;
import it.akademija.models.Kindergarten;
import it.akademija.models.KindergartenPriority;
import it.akademija.models.User;
import it.akademija.models.UserData;
import it.akademija.models.enums.EFormStatus;
import it.akademija.payload.request.ChildFormRequest;
import it.akademija.repository.AppStatusRepo;
import it.akademija.repository.ChildFormRepository;
import it.akademija.repository.FormStatusRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.KindergartenPriorityRepository;
import it.akademija.repository.KindergartenRepository;
import it.akademija.repository.SecondParentRepository;
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

	@MockBean
	private SecondParentRepository secondParentRepository;

	@MockBean
	private KindergartenPriorityRepository kindergartenPriorityRepository;

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

	@Test
	void testAddForm() {
		when(formRepo.existsByPersonId(333L)).thenReturn(true);
		when(formRepo.existsByPersonId(334L)).thenReturn(true);
		when(formRepo.existsByPersonId(335L)).thenReturn(true);
		ChildFormRequest request1 = new ChildFormRequest(333L, "name1", "surename1", new Date(1514757600000L),
				"address1", "city1", 333L, true, true, true, true, true, null, null, null, new Date(1614504968824L));
		ChildFormRequest request2 = new ChildFormRequest(334L, "name1", "surename1", new Date(1514757600000L),
				"address1", "city1", 334L, true, true, true, true, true, null, null, null, new Date(1614504968824L));
		ChildFormRequest request3 = new ChildFormRequest(335L, "name1", "surename1", new Date(1514757600000L),
				"address1", "city1", 335L, true, true, true, true, true, null, null, null, new Date(1614504968824L));
		assertEquals(400, parentService.addForm(request1).getStatusCodeValue());
		assertEquals(400, parentService.addForm(request2).getStatusCodeValue());
		assertEquals(400, parentService.addForm(request3).getStatusCodeValue());

		UserData data = new UserData(1L, "name1", "surename1", 1L, "Address1", "city1", 123L, "email1");
		ChildFormRequest request01 = new ChildFormRequest(1L, "name1", "surename1", new Date(1514757600000L),
				"address1", "city1", 1L, true, true, true, true, true, data, null, null, new Date(1614504968824L));
		KindergartenPriority priority1 = new KindergartenPriority(1L, "Pasirinkti darželį iš sąrašo...",
				"Pasirinkti darželį iš sąrašo...", "Pasirinkti darželį iš sąrašo...", "Pasirinkti darželį iš sąrašo...",
				"Pasirinkti darželį iš sąrašo...");
		request01.setKindergartenPriority(priority1);
		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm1.setKindergartenPriority(priority1);
		priority1.setChildForm(childForm1);

		when(kindergartenPriorityRepository.save(priority1)).thenReturn(priority1);
		when(statusRepo.findByName(EFormStatus.PATEIKTAS))
				.thenReturn(Optional.of(new FormStatus(EFormStatus.PATEIKTAS)));
		User user1 = new User("username1", "password1");
		User user2 = new User("username2", "password2");
		user1.setId(1L);
		user1.setUserData(data);
		data.setUser(user1);
		user2.setId(2L);
		when(userRepo.findAll()).thenReturn(Stream.of(user1, user2).collect(Collectors.toList()));
		when(secondParentRepository.existsByPersonId(1L)).thenReturn(false);
		assertEquals(200, parentService.addForm(request01).getStatusCodeValue());

		KindergartenPriority priority2 = new KindergartenPriority(2L, "Pasirinkti darželį iš sąrašo...",
				"Pasirinkti darželį iš sąrašo...", "Pasirinkti darželį iš sąrašo...", "Pasirinkti darželį iš sąrašo...",
				"Pasirinkti darželį iš sąrašo...");
		request01.setKindergartenPriority(priority2);
		assertEquals(200, parentService.addForm(request01).getStatusCodeValue());
	}

	@Test
	void testGetForms() {
		UserData userData1 = new UserData(1L, "name1", "surename1", 123L, "address1", "city1", 123L, "email1");
		userData1.setChildForms(null);
		User user = new User("username", "password");
		user.setUserData(userData1);

		when(userRepo.getOne(1L)).thenReturn(user);

		when(userDataRepository.findByUser(user)).thenReturn(Optional.of(userData1));

		assertEquals(null, parentService.getForms(1L));

		ChildForm childForm = new ChildForm(0L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		ChildForm childForm2 = new ChildForm(2L, "name2", "surename2", new Date(1514757600000L), "address2", "city2",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		ChildForm childForm3 = new ChildForm(12345L, "name3", "surename3", new Date(1514757600000L), "address3",
				"city3", true, true, true, true, true, null, null, new Date(1614504968824L));
		userData1.setChildForms(Stream.of(childForm1, childForm2, childForm3).collect(Collectors.toList()));
		assertEquals(3, parentService.getForms(1L).size());
		assertEquals(true, parentService.getForms(1L).contains(childForm1));
		assertEquals(true, parentService.getForms(1L).contains(childForm2));
		assertEquals(true, parentService.getForms(1L).contains(childForm3));
		assertEquals(false, parentService.getForms(1L).contains(childForm));
	}

	@Test
	void testUpdateForm() {
		UserData data = new UserData(1L, "name1", "surename1", 1L, "Address1", "city1", 123L, "email1");
		ChildFormRequest request01 = new ChildFormRequest(1L, "name1", "surename1", new Date(1514757600000L),
				"address1", "city1", 1L, true, true, true, true, true, data, null, null, new Date(1614504968824L));
		KindergartenPriority priority1 = new KindergartenPriority(1L, "Pasirinkti darželį iš sąrašo...",
				"Pasirinkti darželį iš sąrašo...", "Pasirinkti darželį iš sąrašo...", "Pasirinkti darželį iš sąrašo...",
				"Pasirinkti darželį iš sąrašo...");
		request01.setKindergartenPriority(priority1);
		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm1.setKindergartenPriority(priority1);
		priority1.setChildForm(childForm1);

		when(kindergartenPriorityRepository.save(priority1)).thenReturn(priority1);
		when(statusRepo.findByName(EFormStatus.PATEIKTAS))
				.thenReturn(Optional.of(new FormStatus(EFormStatus.PATEIKTAS)));
		User user1 = new User("username1", "password1");
		User user2 = new User("username2", "password2");
		user1.setId(1L);
		user1.setUserData(data);
		data.setUser(user1);
		user2.setId(2L);
		when(userRepo.findAll()).thenReturn(Stream.of(user1, user2).collect(Collectors.toList()));
		when(secondParentRepository.existsByPersonId(1L)).thenReturn(false);
		assertEquals(200, parentService.addForm(request01).getStatusCodeValue());

		assertEquals("Privaloma pasirinkti pirma prioriteta!",
				parentService.updateForm(1L, request01).getBody().toString());

		priority1 = new KindergartenPriority(1L, "Pasirinkti darželį iš sąrašo...", "Pasirinkti darželį iš sąrašo...",
				"Pasirinkti darželį iš sąrašo...", "Pasirinkti darželį iš sąrašo...",
				"Pasirinkti darželį iš sąrašo...");
		childForm1.setKindergartenPriority(priority1);
		request01.setKindergartenPriority(priority1);
		when(formRepo.findById(1L)).thenReturn(Optional.of(childForm1));
		when(userRepo.findById(0L)).thenReturn(Optional.of(user1));
		when(formRepo.findAll()).thenReturn(Stream.of(childForm1).collect(Collectors.toList()));
		request01.setName("newName");
		priority1.setKindergartenOne("ONE");
		request01.setKindergartenPriority(priority1);
		assertEquals(1, formRepo.findAll().size());
		assertEquals(200, parentService.updateForm(1L, request01).getStatusCodeValue());
		assertEquals(1, formRepo.findAll().size());
		assertEquals("newName", formRepo.findAll().stream().findFirst().get().getName());

	}

	@Test
	void testDeleteFormById() {
		ChildForm childForm = new ChildForm(0L, "name0", "surename0", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		ChildForm childForm2 = new ChildForm(2L, "name2", "surename2", new Date(1514757600000L), "address2", "city2",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		ChildForm childForm3 = new ChildForm(12345L, "name3", "surename3", new Date(1514757600000L), "address3",
				"city3", true, true, true, true, true, null, null, new Date(1614504968824L));
		UserData userData1 = new UserData(1L, "name1", "surename1", 123L, "address1", "city1", 123L, "email1");
		userData1.setChildForms(Stream.of(childForm1, childForm2, childForm3).collect(Collectors.toList()));
		when(formRepo.findById(0L)).thenReturn(Optional.of(childForm));
		when(formRepo.findById(1L)).thenReturn(Optional.of(childForm1));
		when(formRepo.findById(2L)).thenReturn(Optional.of(childForm2));
		when(formRepo.findById(3L)).thenReturn(Optional.of(childForm3));

		assertEquals(200, parentService.deleteFormById(1L).getStatusCodeValue());
		assertEquals(200, parentService.deleteFormById(2L).getStatusCodeValue());
		assertEquals(200, parentService.deleteFormById(3L).getStatusCodeValue());
		assertEquals(200, parentService.deleteFormById(0L).getStatusCodeValue());
		Assertions.assertThrows(NoSuchElementException.class, () -> {
			parentService.deleteFormById(null);
		});
		Assertions.assertThrows(Exception.class, () -> {
			parentService.deleteFormById(4L);
		});
	}

	@Test
	void testGetStatus() {
		AppStatus status1 = new AppStatus(false, false);
		when(appStatusRepo.findAll()).thenReturn(Stream.of(status1).collect(Collectors.toList()));
		assertEquals(false, parentService.getStatus().isRegistrationClosed());
		assertEquals(false, parentService.getStatus().isSpecelistsDisabled());

		AppStatus status2 = new AppStatus(true, true);
		when(appStatusRepo.findAll()).thenReturn(Stream.of(status2).collect(Collectors.toList()));
		assertEquals(true, parentService.getStatus().isRegistrationClosed());
		assertEquals(true, parentService.getStatus().isSpecelistsDisabled());
	}
}
