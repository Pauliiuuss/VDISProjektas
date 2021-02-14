package it.akademija.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.Group;
import it.akademija.models.GroupInfo;
import it.akademija.models.Kindergarten;
import it.akademija.models.KindergartenInfo;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.GroupRepository;
import it.akademija.repository.KindergartenRepository;

@Service
public class SpecService {

	@Autowired
	private KindergartenRepository kindergartenRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Transactional
	public ResponseEntity<?> registerKindergarten(KindergartenInfo info) {
		if (kindergartenRepository.existsByName(info.getName())) {
			return ResponseEntity.badRequest().body(new MessageResponse("Toks vaikų darželis jau yra!"));
		}

		kindergartenRepository.save(new Kindergarten(info.getAddress(), info.getName(), new ArrayList<>()));

		return ResponseEntity.ok(new MessageResponse("Darželis įvestas sėkmingai!"));
	}

	@Transactional(readOnly = true)
	public Collection<KindergartenInfo> getKindergartens() {
		return kindergartenRepository.findAll().stream()
				.map(isdb -> new KindergartenInfo(isdb.getId(), isdb.getAddress(), isdb.getName(),
						isdb.getGroups().stream().map(Group::getCapasity).reduce(0L, Long::sum)))
				.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Collection<GroupInfo> getGroups(Long id) {
		if (!kindergartenRepository.existsById(id))
			return new ArrayList<>();
		return kindergartenRepository
				.findById(id).orElseGet(null).getGroups().stream().map(isdb -> new GroupInfo(isdb.getId(),
						isdb.getName(), isdb.getCapasity(), isdb.getAgeFrom() + " iki " + isdb.getAgeTo()))
				.collect(Collectors.toList());
	}

	public ResponseEntity<?> registerKindergartenGroup(Long id, GroupInfo info) {
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

	public ResponseEntity<?> amendKindergarten(Long id, @Valid KindergartenInfo info) {

		Kindergarten kindergarten = kindergartenRepository.getOne(id);

		if (kindergarten.getAddress().equals(info.getAddress()) && kindergarten.getName().equals(info.getName()))
			return ResponseEntity.ok("Jokių pakeitimų neišsaugota");

		kindergarten.setAddress(info.getAddress());
		kindergarten.setName(info.getName());

		kindergartenRepository.save(kindergarten);

		return ResponseEntity.ok(new MessageResponse("Vaikų darželis pakeistas!"));
	}

	public ResponseEntity<?> amendGroup(Long groupId, @Valid GroupInfo info) {
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
				&& group.getAgeTo() == originalGroup.getAgeTo())
			return ResponseEntity.ok(new MessageResponse("Jokių pakeitimų neišsaugota"));

		groupRepository.save(group);

		return ResponseEntity.ok(new MessageResponse("Vaikų darželis pakeistas!"));
	}

}
