package it.akademija.services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.ChildForm;
import it.akademija.models.Group;
import it.akademija.models.Kindergarten;
import it.akademija.models.enums.EFormStatus;
import it.akademija.payload.request.ChildFormRequest;
import it.akademija.payload.request.GroupRequest;
import it.akademija.payload.request.KindergartenRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.AppStatusRepo;
import it.akademija.repository.ChildFormRepository;
import it.akademija.repository.FormStatusRepository;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.KindergartenRepository;

@Service
public class SpecService {

	@Autowired
	private FormStatusRepository statusRepo;

	@Autowired
	private ChildFormRepository formRepo;

	@Autowired
	private KindergartenRepository kindergartenRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private AppStatusRepo appStatusRepo;

	@Transactional
	public ResponseEntity<?> registerKindergarten(KindergartenRequest info) {
		if (kindergartenRepository.existsByName(info.getName())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Toks vaikų darželis jau yra!"));
		}

		kindergartenRepository.save(new Kindergarten(info.getAddress(), info.getName(), new ArrayList<>()));

		return ResponseEntity.ok(new MessageResponse("Darželis įvestas sėkmingai!"));
	}

	@Transactional(readOnly = true)
	public Collection<KindergartenRequest> getKindergartens() {
		return kindergartenRepository.findAll().stream()
				.map(isdb -> new KindergartenRequest(isdb.getId(), isdb.getAddress(), isdb.getName(),
						isdb.getGroups().stream().map(Group::getCapasity).reduce(0L, Long::sum)))
				.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Collection<GroupRequest> getGroups(Long id) {
		if (!kindergartenRepository.existsById(id))
			return new ArrayList<>();
		return kindergartenRepository
				.findById(id).orElseGet(null).getGroups().stream().map(isdb -> new GroupRequest(isdb.getId(),
						isdb.getName(), isdb.getCapasity(), isdb.getAgeFrom() + " iki " + isdb.getAgeTo()))
				.collect(Collectors.toList());
	}

	@Transactional
	public ResponseEntity<?> registerKindergartenGroup(Long id, GroupRequest info) {
		if (kindergartenRepository.getOne(id).getGroups().stream()
				.anyMatch(group -> group.getName().equals(info.getName()))) {
			return ResponseEntity.badRequest().body(new MessageResponse("Toke vaikų grupė jau yra!"));
		}

		List<Group> groups = kindergartenRepository.getOne(id).getGroups();

		Group group = null;

		if (info.getAge().equals("3 iki 6")) {
			group = new Group(info.getName(), info.getCapasity(), 3L, 6L, kindergartenRepository.getOne(id));
		} else {
			group = new Group(info.getName(), info.getCapasity(), 2L, 3L, kindergartenRepository.getOne(id));
		}
		groups.add(group);

		groupRepository.save(group);
		kindergartenRepository.getOne(id).setGroups(groups);

		return ResponseEntity.ok(new MessageResponse("Vaikų grupė užregistruota!"));
	}

	@Transactional
	public ResponseEntity<?> amendKindergarten(Long id, @Valid KindergartenRequest info) {

		Kindergarten kindergarten = kindergartenRepository.getOne(id);

		if (kindergarten.getAddress().equals(info.getAddress()) && kindergarten.getName().equals(info.getName()))
			return ResponseEntity.ok("Jokių pakeitimų neišsaugota");

		kindergarten.setAddress(info.getAddress());
		kindergarten.setName(info.getName());

		kindergartenRepository.save(kindergarten);

		return ResponseEntity.ok(new MessageResponse("Vaikų darželis pakeistas!"));
	}

	@Transactional
	public ResponseEntity<?> amendGroup(Long groupId, @Valid GroupRequest info) {
//		Kindergarten kindergarten = kindergartenRepository.getOne(gartenId);

		Group group = groupRepository.getOne(groupId);

		Group originalGroup = new Group(group.getName(), group.getCapasity(), group.getAgeFrom(), group.getAgeTo(),
				group.getKindergarten());

		group.setName(info.getName());
		group.setCapasity(info.getCapasity());
		if (info.getAge().equals("3 iki 6")) {
			group.setAgeFrom(3L);
			group.setAgeTo(6L);
		} else {
			group.setAgeFrom(2L);
			group.setAgeTo(3L);
		}

		if (group.getName().equals(originalGroup.getName()) && group.getAgeFrom() == originalGroup.getAgeFrom()
				&& group.getAgeTo() == originalGroup.getAgeTo() && group.getCapasity() == originalGroup.getCapasity())
			return ResponseEntity.ok(new MessageResponse("Jokių pakeitimų neišsaugota"));

		groupRepository.save(group);

		return ResponseEntity.ok(new MessageResponse("Vaikų darželis pakeistas!"));
	}

	@Transactional
	public Collection<ChildForm> getForms(Long id) {
		Collection<ChildForm> forms;
		if (id == null || id == 0L) {
			Sort sort = Sort.by(Sort.Order.desc("inCity"), Sort.Order.desc("adopted"), Sort.Order.desc("threeOrMore"),
					Sort.Order.desc("parentStudent"), Sort.Order.desc("handicapped"));
			forms = formRepo.findAll(sort);
		} else {
			String kinderGartenName = kindergartenRepository.getOne(id).getName();
			forms = formRepo.findAllByKindergartenName(kinderGartenName);
		}
		System.out.println(forms);
		return forms;
	}

	public KindergartenRequest getKindergarten(Long id) {
		Kindergarten kindergarten = kindergartenRepository.getOne(id);
		Long capasity = kindergarten.getGroups().stream().map(g -> g.getCapasity()).reduce(0L, Long::sum);
		List<GroupRequest> groupRequests = kindergarten.getGroups().stream().map(
				k -> new GroupRequest(k.getId(), k.getName(), k.getCapasity(), k.getAgeFrom() + " iki " + k.getAgeTo()))
				.collect(Collectors.toList());
		KindergartenRequest request = new KindergartenRequest(kindergarten.getId(), kindergarten.getAddress(),
				kindergarten.getName(), capasity, groupRequests);
		return request;
	}

	public boolean ageBetween2and3(Date birthDate) {
		// validate inputs ...
		DateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		int d1 = Integer.parseInt(formatter.format(birthDate));
		int d2 = Integer.parseInt(formatter.format(new Date()));
		int age = (d2 - d1) / 10000;
		return age >= 2 && age <= 3;
	}

	public boolean ageBetween3and6(Date birthDate) {
		// validate inputs ...
		DateFormat formatter = new SimpleDateFormat("yyyyMMdd");
		int d1 = Integer.parseInt(formatter.format(birthDate));
		int d2 = Integer.parseInt(formatter.format(new Date()));
		int age = (d2 - d1) / 10000;
		return age >= 3 && age <= 6;
	}

//	public Collection<Collection<ChildForm>> getFormsByKindergarten(Long id) {
//		Collection<ChildForm> all = formRepo.findAllByKindergartenName(kindergartenRepository.getOne(id).getName());
//		Collection<ChildForm> young = all.stream().filter(f -> ageBetween2and3(f.getBirthDate()))
//				.collect(Collectors.toList());
//		Collection<ChildForm> old = all.stream().filter(f -> ageBetween3and6(f.getBirthDate()))
//				.collect(Collectors.toList());
//		Collection<Collection<ChildForm>> collection = new ArrayList<Collection<ChildForm>>();
//		collection.add(young);
//		collection.add(old);
//
//		return collection;
//	}

	private int getPoints(ChildForm form) {
		int result = 0;
		if (form.isAdopted())
			result += 1;
		if (form.isHandicapped())
			result += 1;
		if (form.isParentStudent())
			result += 1;
		if (form.isThreeOrMore())
			result += 1;
		return result;

	}

	Comparator<ChildForm> comparator = new Comparator<ChildForm>() {

		@Override
		public int compare(ChildForm o1, ChildForm o2) {
			if (o1.isInCity() && !o2.isInCity())
				return 1;
			if (!o1.isInCity() && o2.isInCity())
				return -1;
			return getPoints(o1) - getPoints(o2);
		}
	};

	public List<ChildFormRequest> getFormsByKindergarten() {
		List<ChildFormRequest> requests = formRepo.findAll().stream()
				.map(f -> new ChildFormRequest(f.getId(), f.getName(), f.getSurename(), f.getBirthDate(),
						f.getAddress(), f.getCity(), f.getPersonId(), f.isInCity(), f.isAdopted(), f.isThreeOrMore(),
						f.isParentStudent(), f.isHandicapped(), f.getParentData(), f.getSecondParentData(),
						f.getKindergartenPriority(), f.getPostDate(), f.getGroup(), f.getFormStatus()))
				.collect(Collectors.toList());
		for (ChildFormRequest childFormRequest : requests) {
			System.out
					.println("***************************" + childFormRequest.getFormStatus() + " " + childFormRequest);
		}
		return requests;
	};

	public Map<Group, List<ChildForm>> getFormsByKindergartenAndGroup() {

		Collection<ChildForm> all = formRepo.findAll().stream()
				.filter(f -> !f.getFormStatus().getName().equals(EFormStatus.PANAIKINTAS)).collect(Collectors.toList());
		Collections.sort(formRepo.findAll(), comparator);

		Collection<Group> groups = groupRepository.findAll();

		Map<Group, List<ChildForm>> collection = new HashMap<>();
		groups.forEach(g -> collection.put(g, new ArrayList<>()));

		for (ChildForm form : all) {
			System.out.println(form.getName() + " " + form.getSurename() + "******************************");
			Kindergarten one = kindergartenRepository.findByName(form.getKindergartenPriority().getKindergartenOne())
					.get();
			Kindergarten two = kindergartenRepository.findByName(form.getKindergartenPriority().getKindergartenTwo())
					.orElse(null);
			System.out.println(two + " TWO **************************");
			Kindergarten three = kindergartenRepository
					.findByName(form.getKindergartenPriority().getKindergartenThree()).orElse(null);
			System.out.println(three + " THREE **************************");
			Kindergarten four = kindergartenRepository.findByName(form.getKindergartenPriority().getKindergartenFour())
					.orElse(null);
			System.out.println(four + " FOUR **************************");
			Kindergarten five = kindergartenRepository.findByName(form.getKindergartenPriority().getKindergartenFive())
					.orElse(null);
			System.out.println(five + " FIVE **************************");

			List<Kindergarten> kindergartens = new ArrayList<>();
			kindergartens.add(one);
			if (two != null)
				kindergartens.add(two);
			if (three != null)
				kindergartens.add(three);
			if (four != null)
				kindergartens.add(four);
			if (five != null)
				kindergartens.add(five);

			boolean approved = false;

			for (Kindergarten kindergarten : kindergartens) {
				if (approved)
					break;
				List<Group> kindergartenGroups = kindergarten.getGroups();
				for (Group group : kindergarten.getGroups()) {
					if (approved)
						break;
					if (group.getAgeFrom() == 2L && ageBetween2and3(form.getBirthDate())
							&& collection.get(group).size() < group.getCapasity()) {
						List<ChildForm> groupsForMap = collection.get(group);
						groupsForMap.add(form);
						collection.put(group, groupsForMap);
						approved = true;
						break;
					}
					if (group.getAgeFrom() == 3L && ageBetween3and6(form.getBirthDate())
							&& collection.get(group).size() < group.getCapasity()) {
						List<ChildForm> groupsForMap = collection.get(group);
						groupsForMap.add(form);
						collection.put(group, groupsForMap);
						approved = true;
						break;
					}
				}
			}
			form.setFormStatus(statusRepo.findByName(EFormStatus.EILEJE).get());
		}
		return collection;
	}

	@Transactional
	public ResponseEntity<?> confirmQueue() {

		Map<Group, List<ChildForm>> forms = getFormsByKindergartenAndGroup();

		Set<Group> groups = forms.keySet();

		for (Group group : groups) {
			for (ChildForm form : forms.get(group)) {
				form.setFormStatus(statusRepo.findByName(EFormStatus.PRIIMTAS).get());
				form.setGroupName(group.getName());
				form.setKindergartenName(group.getKindergarten().getName());
				formRepo.save(form);
			}
		}

		appStatusRepo.setRegistrationClosed();

		return ResponseEntity.ok(new MessageResponse("Vaikų eilė sudaryta!"));
	}

	public ResponseEntity<?> cancelQueue() {

		List<ChildForm> forms = formRepo.findAll();
		forms.forEach(f -> {
			if (!f.getFormStatus().getName().equals(EFormStatus.PANAIKINTAS))
				f.setFormStatus(statusRepo.findByName(EFormStatus.PATEIKTAS).get());
		});
		forms.forEach(f -> f.setGroup(null));
		forms.forEach(f -> f.setGroupName(null));
		forms.forEach(f -> f.setKindergartenName(null));
		formRepo.saveAll(forms);

		appStatusRepo.setRegistrationOpen();

		return ResponseEntity.ok(new MessageResponse("Vaikų eilė atšaukta!"));
	}

	public Long freeSpaces() {
		Long spaces = groupRepository.findAll().stream().filter(g -> !g.getName().equals("Laukiantys"))
				.map(g -> g.getCapasity()).reduce(0L, Long::sum);
		System.out.println("******************************** Free spaces:" + spaces);
		return spaces;
	}

	public ResponseEntity<?> cancelForm(Long id) {
		ChildForm form = formRepo.getOne(id);
		if (form.getFormStatus().getName().equals(EFormStatus.PANAIKINTAS))
			return ResponseEntity.badRequest().body(new MessageResponse("Forma jau panaikinta!"));
		form.setFormStatus(statusRepo.findByName(EFormStatus.PANAIKINTAS).get());
		formRepo.save(form);
		return ResponseEntity.ok(new MessageResponse("Vaiko forma atšaukta!"));
	}

	public ResponseEntity<?> enableForm(Long id) {
		ChildForm form = formRepo.getOne(id);
		if (form.getFormStatus().getName().equals(EFormStatus.PATEIKTAS))
			return ResponseEntity.badRequest().body(new MessageResponse("Forma jau aktyvi!"));
		form.setFormStatus(statusRepo.findByName(EFormStatus.PATEIKTAS).get());
		formRepo.save(form);
		return ResponseEntity.ok(new MessageResponse("Vaiko forma aktyvuota!"));
	}
}
