package it.akademija.services;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringRunner;

import it.akademija.models.ChildForm;
import it.akademija.models.FormStatus;
import it.akademija.models.Group;
import it.akademija.models.Kindergarten;
import it.akademija.models.KindergartenPriority;
import it.akademija.models.enums.EFormStatus;
import it.akademija.payload.request.GroupRequest;
import it.akademija.payload.request.KindergartenRequest;
import it.akademija.repository.AppStatusRepo;
import it.akademija.repository.ChildFormRepository;
import it.akademija.repository.FormStatusRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.KindergartenRepository;

@RunWith(SpringRunner.class)
@SpringBootTest
class SpecServiceTest {

	@Autowired
	private SpecService specService;

	@MockBean
	private KindergartenRepository kindergartenRepository;

	@MockBean
	private GroupRepository groupRepository;

	@MockBean
	private ChildFormRepository formRepo;

	@MockBean
	private FormStatusRepository statusRepo;

	@MockBean
	private AppStatusRepo appStatusRepo;

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

		when(kindergartenRepository.save(new Kindergarten(2l, "address1", "name1", new ArrayList<>())))
				.thenReturn(new Kindergarten(2l, "address1", "name1", new ArrayList<>()));

		assertEquals(200, specService.registerKindergarten(new KindergartenRequest(12L, "address1", "name1"))
				.getStatusCodeValue());

		assertEquals(400, specService.registerKindergarten(new KindergartenRequest(1L, "address", "existingName"))
				.getStatusCodeValue());
	}

	@Test
	void testRegisterKindergartenGroup() {
		Kindergarten kindergarten = new Kindergarten(1L, "address", "name", new ArrayList<>());
		Group group1 = new Group(1L, "name1", 1L, 3L, 6L, kindergarten);
		Group group2 = new Group(2L, "groupNameWhichExist", 2L, 2L, 3L, kindergarten);
		Group group3 = new Group(3L, "name3", 3L, 2L, 3L, kindergarten);
		List<Group> groups = new ArrayList<>();
		groups.add(group1);
		groups.add(group2);
		groups.add(group3);
		kindergarten.setGroups(groups);

		GroupRequest groupRequest = new GroupRequest("groupNameWhichExist", 1L, "2 iki 3");

		when(kindergartenRepository.getOne(1L)).thenReturn(kindergarten);

		assertEquals(400, specService.registerKindergartenGroup(1l, groupRequest).getStatusCodeValue());

		Kindergarten kindergarten2 = new Kindergarten(2L, "address2", "name2", new ArrayList<>());
		Group group01 = new Group(1L, "name1", 1L, 3L, 6L, kindergarten2);
		Group group02 = new Group(2L, "group2", 2L, 2L, 3L, kindergarten2);
		Group group03 = new Group(3L, "name3", 3L, 2L, 3L, kindergarten2);
		List<Group> groups2 = new ArrayList<>();
		groups2.add(group01);
		groups2.add(group02);
		groups2.add(group03);
		kindergarten2.setGroups(groups2);

		GroupRequest groupRequest2 = new GroupRequest("validNewName", 1L, "2 iki 3");

		when(kindergartenRepository.getOne(2L)).thenReturn(kindergarten2);

		assertEquals(200, specService.registerKindergartenGroup(2l, groupRequest2).getStatusCodeValue());
	}

	@Test
	void testAmendKindergarten() {
		Kindergarten kindergarten = new Kindergarten(1L, "sameAddress", "sameName", new ArrayList<>());
		KindergartenRequest kindergartenRequest = new KindergartenRequest(1L, "sameAddress", "sameName");

		when(kindergartenRepository.getOne(1L)).thenReturn(kindergarten);

		assertEquals("Jokių pakeitimų neišsaugota",
				specService.amendKindergarten(1L, kindergartenRequest).getBody().toString());

		Kindergarten kindergarten2 = new Kindergarten(2L, "address", "name", new ArrayList<>());
		KindergartenRequest kindergartenRequest2 = new KindergartenRequest(2L, "address", "diffName");
		Kindergarten newKindergarten = new Kindergarten(2L, "address", "diffName", new ArrayList<>());

		when(kindergartenRepository.getOne(2L)).thenReturn(kindergarten2);
		when(kindergartenRepository.save(newKindergarten)).thenReturn(newKindergarten);

		assertEquals("Vaikų darželis pakeistas!",
				specService.amendKindergarten(2L, kindergartenRequest2).getBody().toString());
	}

	@Test
	void testAmendGroup() {
		Group group = new Group(1L, "name", 1L, 3L, 6L, null);

		when(groupRepository.getOne(1L)).thenReturn(group);
		when(groupRepository.save(group)).thenReturn(group);

		GroupRequest groupRequest = new GroupRequest("name", 1L, "3 iki 6");
		assertEquals("Jokių pakeitimų neišsaugota", specService.amendGroup(1L, groupRequest).getBody().toString());

		Group group2 = new Group(2L, "name", 1L, 3L, 6L, null);
		Group newGroup2 = new Group(2L, "diffName", 1L, 2L, 3L, null);

		when(groupRepository.getOne(2L)).thenReturn(group2);
		when(groupRepository.save(newGroup2)).thenReturn(newGroup2);

		GroupRequest groupRequest2 = new GroupRequest("diffName", 1L, "2 iki 3");
		assertEquals("Vaikų grupė atnaujinta!", specService.amendGroup(2L, groupRequest2).getBody().toString());
	}

//	@Test
//	void testAgeBetween2and3() {
//		fail("Not yet implemented");
//	}
//
//	@Test
//	void testAgeBetween3and6() {
//		fail("Not yet implemented");
//	}

	@Test
	void testGetFormsByKindergarten() {
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

		assertEquals(3, specService.getFormsByKindergarten().size());

		assertEquals("address3", specService.getFormsByKindergarten().get(0).getAddress());
		assertEquals("name3", specService.getFormsByKindergarten().get(0).getName());
		assertEquals(12345L, specService.getFormsByKindergarten().get(0).getPersonId());
		assertEquals("city3", specService.getFormsByKindergarten().get(0).getCity());

		assertEquals("address2", specService.getFormsByKindergarten().get(1).getAddress());
		assertEquals("name2", specService.getFormsByKindergarten().get(1).getName());
		assertEquals(2L, specService.getFormsByKindergarten().get(1).getPersonId());
		assertEquals("city2", specService.getFormsByKindergarten().get(1).getCity());

		assertEquals("address1", specService.getFormsByKindergarten().get(2).getAddress());
		assertEquals("name1", specService.getFormsByKindergarten().get(2).getName());
		assertEquals(1L, specService.getFormsByKindergarten().get(2).getPersonId());
		assertEquals("city1", specService.getFormsByKindergarten().get(2).getCity());
	}

	@Test
	void testGetFormsByKindergartenAndGroup() {
		when(statusRepo.findByName(EFormStatus.PATEIKTAS))
				.thenReturn(Optional.of(new FormStatus(EFormStatus.PATEIKTAS)));
		when(statusRepo.findByName(EFormStatus.EILEJE)).thenReturn(Optional.of(new FormStatus(EFormStatus.EILEJE)));
		KindergartenPriority kindergartenPriority = new KindergartenPriority("name2", null, null, null, null);

		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm1.setKindergartenPriority(kindergartenPriority);
		childForm1.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		ChildForm childForm2 = new ChildForm(2L, "name2", "surename2", new Date(1514757600000L), "address2", "city2",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm2.setKindergartenPriority(kindergartenPriority);
		childForm2.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		ChildForm childForm3 = new ChildForm(12345L, "name3", "surename3", new Date(1514757600000L), "address3",
				"city3", true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm3.setKindergartenPriority(kindergartenPriority);
		childForm3.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		List<ChildForm> childForms = new ArrayList<>();
		childForms.add(childForm3);
		childForms.add(childForm2);
		childForms.add(childForm1);
		when(formRepo.findAll()).thenReturn(childForms);

		Kindergarten kindergarten2 = new Kindergarten(2L, "address2", "name2", new ArrayList<>());
		Group group01 = new Group(1L, "name1", 1L, 3L, 6L, null);
		Group group02 = new Group(2L, "group2", 2L, 2L, 3L, null);
		Group group03 = new Group(3L, "name3", 3L, 2L, 3L, null);
		List<Group> groups2 = new ArrayList<>();
		groups2.add(group01);
		groups2.add(group02);
		groups2.add(group03);
		kindergarten2.setGroups(groups2);
		when(groupRepository.findAll()).thenReturn(groups2);
		when(kindergartenRepository.findByName("name2")).thenReturn(Optional.of(kindergarten2));

		assertEquals(3, specService.getFormsByKindergartenAndGroup().keySet().size());

		assertEquals(1, specService.getFormsByKindergartenAndGroup().get(group01).size());
		assertEquals(2, specService.getFormsByKindergartenAndGroup().get(group02).size());
		assertEquals(0, specService.getFormsByKindergartenAndGroup().get(group03).size());
	}

	@Test
	void testConfirmQueue() {
		when(statusRepo.findByName(EFormStatus.PATEIKTAS))
				.thenReturn(Optional.of(new FormStatus(EFormStatus.PATEIKTAS)));
		when(statusRepo.findByName(EFormStatus.EILEJE)).thenReturn(Optional.of(new FormStatus(EFormStatus.EILEJE)));
		when(statusRepo.findByName(EFormStatus.PRIIMTAS)).thenReturn(Optional.of(new FormStatus(EFormStatus.PRIIMTAS)));
		KindergartenPriority kindergartenPriority = new KindergartenPriority("name2", null, null, null, null);

		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm1.setKindergartenPriority(kindergartenPriority);
		childForm1.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		ChildForm childForm2 = new ChildForm(2L, "name2", "surename2", new Date(1514757600000L), "address2", "city2",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm2.setKindergartenPriority(kindergartenPriority);
		childForm2.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		ChildForm childForm3 = new ChildForm(12345L, "name3", "surename3", new Date(1514757600000L), "address3",
				"city3", true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm3.setKindergartenPriority(kindergartenPriority);
		childForm3.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		List<ChildForm> childForms = new ArrayList<>();
		childForms.add(childForm3);
		childForms.add(childForm2);
		childForms.add(childForm1);
		when(formRepo.findAll()).thenReturn(childForms);

		Kindergarten kindergarten2 = new Kindergarten(2L, "address2", "name2", new ArrayList<>());
		Group group01 = new Group(1L, "name1", 1L, 3L, 6L,
				new Kindergarten(kindergarten2.getAddress(), kindergarten2.getName(), null));
		Group group02 = new Group(2L, "group2", 2L, 2L, 3L,
				new Kindergarten(kindergarten2.getAddress(), kindergarten2.getName(), null));
		Group group03 = new Group(3L, "name3", 3L, 2L, 3L,
				new Kindergarten(kindergarten2.getAddress(), kindergarten2.getName(), null));
		List<Group> groups2 = new ArrayList<>();
		groups2.add(group01);
		groups2.add(group02);
		groups2.add(group03);
		kindergarten2.setGroups(groups2);
		when(groupRepository.findAll()).thenReturn(groups2);
		doReturn(Optional.of(kindergarten2)).when(kindergartenRepository).findByName("name2");

		assertEquals("Vaikų eilė sudaryta!", specService.confirmQueue().getBody().toString());
		assertEquals(EFormStatus.PRIIMTAS, formRepo.findAll().get(0).getFormStatus().getName());
		assertEquals(EFormStatus.PRIIMTAS, formRepo.findAll().get(1).getFormStatus().getName());
		assertEquals(EFormStatus.PRIIMTAS, formRepo.findAll().get(2).getFormStatus().getName());
	}

	@Test
	void testCancelQueue() {
		when(statusRepo.findByName(EFormStatus.PATEIKTAS))
				.thenReturn(Optional.of(new FormStatus(EFormStatus.PATEIKTAS)));

		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm1.setFormStatus(new FormStatus(EFormStatus.PRIIMTAS));
		childForm1.setKindergartenName("name1");
		childForm1.setGroupName("groupname1");
		ChildForm childForm2 = new ChildForm(2L, "name2", "surename2", new Date(1514757600000L), "address2", "city2",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm2.setFormStatus(new FormStatus(EFormStatus.EILEJE));
		childForm2.setKindergartenName("name2");
		childForm2.setGroupName("groupname2");
		ChildForm childForm3 = new ChildForm(12345L, "name3", "surename3", new Date(1514757600000L), "address3",
				"city3", true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm3.setFormStatus(new FormStatus(EFormStatus.PRIIMTAS));
		childForm3.setKindergartenName("name3");
		childForm3.setGroupName("groupname3");
		List<ChildForm> childForms = new ArrayList<>();
		childForms.add(childForm3);
		childForms.add(childForm2);
		childForms.add(childForm1);
		when(formRepo.findAll()).thenReturn(childForms);

		ChildForm childForm01 = childForm1;
		childForm1.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		childForm1.setKindergartenName("");
		childForm1.setGroupName("");
		ChildForm childForm02 = childForm2;
		childForm2.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		childForm2.setKindergartenName("");
		childForm2.setGroupName("");
		ChildForm childForm03 = childForm3;
		childForm3.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		childForm3.setKindergartenName("");
		childForm3.setGroupName("");
		List<ChildForm> childFormsAfter = new ArrayList<>();
		childFormsAfter.add(childForm03);
		childFormsAfter.add(childForm02);
		childFormsAfter.add(childForm01);

		when(formRepo.saveAll(childFormsAfter)).thenReturn(childForms);

		assertEquals("Vaikų eilė atšaukta!", specService.cancelQueue().getBody().toString());
		assertEquals(EFormStatus.PATEIKTAS, formRepo.findAll().get(0).getFormStatus().getName());
	}

	@Test
	void testFreeSpaces() {
		Group group01 = new Group(1L, "name1", 1L, 3L, 6L, null);
		Group group02 = new Group(2L, "group2", 2L, 2L, 3L, null);
		Group group03 = new Group(3L, "name3", 3L, 2L, 3L, null);
		List<Group> groups2 = new ArrayList<>();
		groups2.add(group01);
		groups2.add(group02);
		groups2.add(group03);
		when(groupRepository.findAll()).thenReturn(groups2);

		assertEquals(6, specService.freeSpaces());
	}

	@Test
	void testCancelForm() {
		when(statusRepo.findByName(EFormStatus.PANAIKINTAS))
				.thenReturn(Optional.of(new FormStatus(EFormStatus.PANAIKINTAS)));

		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm1.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		when(formRepo.findById(1L)).thenReturn(Optional.of(childForm1));
		assertEquals("Vaiko forma atšaukta!", specService.cancelForm(1L).getBody().toString());
		assertEquals(EFormStatus.PANAIKINTAS, formRepo.findById(1L).get().getFormStatus().getName());

		ChildForm childForm2 = new ChildForm(2L, "name2", "surename2", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm2.setFormStatus(new FormStatus(EFormStatus.PANAIKINTAS));
		when(formRepo.findById(2L)).thenReturn(Optional.of(childForm2));
		assertEquals("Forma jau panaikinta!", specService.cancelForm(2L).getBody().toString());
		assertEquals(EFormStatus.PANAIKINTAS, formRepo.findById(2L).get().getFormStatus().getName());
	}

	@Test
	void testEnableForm() {
		when(statusRepo.findByName(EFormStatus.PATEIKTAS))
				.thenReturn(Optional.of(new FormStatus(EFormStatus.PATEIKTAS)));

		ChildForm childForm1 = new ChildForm(1L, "name1", "surename1", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm1.setFormStatus(new FormStatus(EFormStatus.PANAIKINTAS));
		when(formRepo.findById(1L)).thenReturn(Optional.of(childForm1));
		assertEquals("Vaiko forma aktyvuota!", specService.enableForm(1L).getBody().toString());
		assertEquals(EFormStatus.PATEIKTAS, formRepo.findById(1L).get().getFormStatus().getName());

		ChildForm childForm2 = new ChildForm(2L, "name2", "surename2", new Date(1514757600000L), "address1", "city1",
				true, true, true, true, true, null, null, new Date(1614504968824L));
		childForm2.setFormStatus(new FormStatus(EFormStatus.PATEIKTAS));
		when(formRepo.findById(2L)).thenReturn(Optional.of(childForm2));
		assertEquals("Forma jau aktyvi!", specService.enableForm(2L).getBody().toString());
		assertEquals(EFormStatus.PATEIKTAS, formRepo.findById(2L).get().getFormStatus().getName());
	}

//	@BeforeAll
//	static void setUpBeforeClass() throws Exception {
//	}
//
//	@AfterAll
//	static void tearDownAfterClass() throws Exception {
//	}
//
//	@BeforeEach
//	void setUp() throws Exception {
//	}
//
//	@AfterEach
//	void tearDown() throws Exception {
//	}
}
