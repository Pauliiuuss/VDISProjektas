package it.akademija.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

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

		kindergartenRepository
				.save(new Kindergarten(info.getAddress(), info.getName(), info.getCapasity(), new ArrayList<>()));

		return ResponseEntity.ok(new MessageResponse("Vaikų darželis užregistruotas!"));
	}

	@Transactional(readOnly = true)
	public Collection<KindergartenInfo> getKindergartens() {
		return kindergartenRepository.findAll().stream()
				.map(isdb -> new KindergartenInfo(isdb.getId(), isdb.getAddress(), isdb.getName(), isdb.getCapasity()))
				.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Collection<GroupInfo> getGroups(Long id) {
		if (!kindergartenRepository.existsById(id))
			return new ArrayList<>();
		return kindergartenRepository
				.findById(id).orElseGet(null).getGroups().stream().map(isdb -> new GroupInfo(isdb.getId(),
						isdb.getName(), isdb.getCapasity(), isdb.getAgeFrom(), isdb.getAgeTo()))
				.collect(Collectors.toList());
	}

	public ResponseEntity<?> registerKindergartenGroup(Long id, GroupInfo info) {
		if (kindergartenRepository.getOne(id).getGroups().stream()
				.anyMatch(group -> group.getName().equals(info.getName()))) {
			return ResponseEntity.badRequest().body(new MessageResponse("Toke vaikų grupė jau yra!"));
		}

		List<Group> groups = kindergartenRepository.getOne(id).getGroups();
		Group group = new Group(info.getName(), info.getCapasity(), info.getAgeFrom(), info.getAgeTo(),
				kindergartenRepository.getOne(id));
		groups.add(group);

		groupRepository.save(group);
		kindergartenRepository.getOne(id).setGroups(groups);

		return ResponseEntity.ok(new MessageResponse("Vaikų grupė užregistruota!"));
	}

}
