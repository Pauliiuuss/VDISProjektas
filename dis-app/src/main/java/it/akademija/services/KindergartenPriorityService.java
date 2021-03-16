package it.akademija.services;

import it.akademija.models.KindergartenPriority;
import it.akademija.payload.request.KindergartenPriorityRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.KindergartenPriorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class KindergartenPriorityService {

	@Autowired
	private KindergartenPriorityRepository kindergartenPriorityRepository;

	@Transactional(readOnly = true)
	public Collection<KindergartenPriorityRequest> getAllKindergartenPriorities() {
		return kindergartenPriorityRepository.findAll().stream()
				.map(isdb -> new KindergartenPriorityRequest(isdb.getKindergartenOne(), isdb.getKindergartenTwo(),
						isdb.getKindergartenThree(), isdb.getKindergartenFour(), isdb.getKindergartenFive()))
				.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public KindergartenPriorityRequest getKindergartenPrioritiesById(Long id) {
		KindergartenPriority info = kindergartenPriorityRepository.getOne(id);
		if (info.getId() != null) {
			return new KindergartenPriorityRequest(info.getId(), info.getKindergartenOne(), info.getKindergartenTwo(),
					info.getKindergartenThree(), info.getKindergartenFour(), info.getKindergartenFive());
		} else {
			throw new IllegalArgumentException("Darzeliu pasirinkimo prioritetai pagal duota ID neegzistuoja.");
		}
	}

	@Transactional
	public void deleteKindergartenPriorityById(Long id) {
		kindergartenPriorityRepository.deleteById(id);
	}

	@Transactional
	public ResponseEntity<?> addKindergartenPriority(KindergartenPriorityRequest kindergartenPriorityRequest) {
		if (kindergartenPriorityRequest != null) {
			KindergartenPriority idb = new KindergartenPriority(kindergartenPriorityRequest.getKindergartenOne(),
					kindergartenPriorityRequest.getKindergartenTwo(),
					kindergartenPriorityRequest.getKindergartenThree(),
					kindergartenPriorityRequest.getKindergartenFour(),
					kindergartenPriorityRequest.getKindergartenFive());
			kindergartenPriorityRepository.save(idb);
			return ResponseEntity.ok(new MessageResponse("Vaiko prioritetai užregistruoti!"));
		} else {
			return ResponseEntity.badRequest().body(new IllegalArgumentException());
		}
	}

	@Transactional
	public void updateKindergartenPriority(KindergartenPriorityRequest kindergartenPriorityRequest) {
		KindergartenPriority idb = kindergartenPriorityRepository.findAll().stream()
				.filter(isdb -> isdb.getId() == kindergartenPriorityRequest.getId()).findFirst().orElse(null);
		if (idb != null) {
			idb.setKindergartenOne(kindergartenPriorityRequest.getKindergartenOne());
			idb.setKindergartenTwo(kindergartenPriorityRequest.getKindergartenTwo());
			idb.setKindergartenThree(kindergartenPriorityRequest.getKindergartenThree());
			idb.setKindergartenFour(kindergartenPriorityRequest.getKindergartenFour());
			idb.setKindergartenFive(kindergartenPriorityRequest.getKindergartenFive());
			idb.setChildForm(kindergartenPriorityRequest.getChildForm());
		}
	}

}
