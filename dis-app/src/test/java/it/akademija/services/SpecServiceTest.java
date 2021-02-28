package it.akademija.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.models.ChildForm;
import it.akademija.models.Group;
import it.akademija.models.Kindergarten;
import it.akademija.payload.request.KindergartenRequest;
import it.akademija.repository.ChildFormRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.KindergartenRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
class SpecControllerTest {

	@Autowired
	private SpecService specService;

	@MockBean
	private KindergartenRepository kindergartenRepository;

	@MockBean
	private GroupRepository groupRepository;

	@MockBean
	private ChildFormRepository formRepo;

	@Test
	void testGetKindergarten() {
		Long id = 1L;
		when(kindergartenRepository.getOne(id))
				.thenReturn(new Kindergarten(1L, "address1", "name1", new ArrayList<Group>()));
		assertEquals(1L, specService.getKindergarten(1L).getId());
		assertEquals("name1", specService.getKindergarten(1L).getName());
		assertEquals("address1", specService.getKindergarten(1L).getAddress());
	}

	@Test
	void testGetKindergartens() {
		when(kindergartenRepository.findAll())
				.thenReturn(Stream
						.of(new Kindergarten(1L, "address1", "name1", new ArrayList<>()),
								new Kindergarten(2L, "address2", "name2", new ArrayList<>()))
						.collect((Collectors.toList())));
		assertEquals(2, specService.getKindergartens().size());
	}

	@Test
	void testGetGroups() {
		Kindergarten kindergarten2 = new Kindergarten(2L, "address2", "name2", new ArrayList<>());
		Group group1 = new Group(1L, "name1", 1L, 3L, 6L, kindergarten2);
		Group group2 = new Group(2L, "name2", 2L, 2L, 3L, kindergarten2);
		Group group3 = new Group(3L, "name3", 3L, 2L, 3L, kindergarten2);
		List<Group> groups = new ArrayList<>();
		groups.add(group1);
		groups.add(group2);
		groups.add(group3);
		kindergarten2.setGroups(groups);
		when(kindergartenRepository.existsById(2L)).thenReturn(true);
		when(kindergartenRepository.findById(2L)).thenReturn(Optional.of(kindergarten2));
		assertEquals(3, specService.getGroups(2L).size());
	}

	@Test
	void testGetForms() {
		List<ChildForm> forms = new ArrayList<>();
		forms.add(new ChildForm(1L, "name1", "surename1", new Date(2018, 1, 1), "address1", "city1", true, true, true,
				true, true, null, null, new Date(2021, 2, 27)));
		forms.add(new ChildForm(2L, "name2", "surename2", new Date(2018, 1, 1), "address3", "city2", true, true, true,
				true, true, null, null, new Date(2021, 2, 27)));
		forms.add(new ChildForm(3L, "name3", "surename3", new Date(2018, 1, 1), "address3", "city3", true, true, true,
				true, true, null, null, new Date(2021, 2, 27)));

		Kindergarten kindergarten2 = new Kindergarten(2L, "address2", "name2", new ArrayList<>());
		when(kindergartenRepository.getOne(2L)).thenReturn(kindergarten2);
		when(formRepo.findAllByKindergartenName(kindergarten2.getName())).thenReturn(forms);
		assertEquals(3, specService.getForms(2L).size());

		Sort sort = Sort.by(Sort.Order.desc("inCity"), Sort.Order.desc("adopted"), Sort.Order.desc("threeOrMore"),
				Sort.Order.desc("parentStudent"), Sort.Order.desc("handicapped"));
		when(formRepo.findAll(sort)).thenReturn(forms);
		assertEquals(3, specService.getForms(0L).size());
	}

	@Test
	void testRegisterKindergarten() {
		when(kindergartenRepository.existsByName("existingName")).thenReturn(true);
		when(kindergartenRepository.existsByName("name1")).thenReturn(false);

		KindergartenRequest kindergarten = new KindergartenRequest(2l, "address1", "name1");
		Kindergarten kindergartenEntity = new Kindergarten(2l, "address1", "name1", new ArrayList<>());
		when(kindergartenRepository.save(kindergartenEntity)).thenReturn(kindergartenEntity);

		assertEquals(ResponseEntity.badRequest(),
				specService.registerKindergarten(new KindergartenRequest(1L, "address", "existingName")));

		assertEquals(ResponseEntity.ok(),
				specService.registerKindergarten(new KindergartenRequest(12L, "address1", "name1")));

	}

	@Test
	void testRegisterKindergartenGroup() {
		fail("Not yet implemented");
	}

	@Test
	void testAmendKindergarten() {
		fail("Not yet implemented");
	}

	@Test
	void testAmendGroup() {
		fail("Not yet implemented");
	}

	@Test
	void testAgeBetween2and3() {
		fail("Not yet implemented");
	}

	@Test
	void testAgeBetween3and6() {
		fail("Not yet implemented");
	}

	@Test
	void testGetFormsByKindergarten() {
		fail("Not yet implemented");
	}

	@Test
	void testGetFormsByKindergartenAndGroup() {
		fail("Not yet implemented");
	}

	@Test
	void testConfirmQueue() {
		fail("Not yet implemented");
	}

	@Test
	void testCancelQueue() {
		fail("Not yet implemented");
	}

	@Test
	void testFreeSpaces() {
		fail("Not yet implemented");
	}

	@Test
	void testCancelForm() {
		fail("Not yet implemented");
	}

	@Test
	void testEnableForm() {
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
