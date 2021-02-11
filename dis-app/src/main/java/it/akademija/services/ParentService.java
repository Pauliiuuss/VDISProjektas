package it.akademija.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.KindergartenInfo;
import it.akademija.repository.KindergartenRepository;
import it.akademija.repository.UserDataRepository;

@Service
public class ParentService {

	@Autowired
	private KindergartenRepository kindergartenRepository;
	@Autowired
	private UserDataRepository userDataRepository;
	@Autowired
	private ChildFormService childFormService;
	@Autowired
	private KindergartenPriorityService kindergartenPriorityService;

	@Transactional(readOnly = true)
	public Collection<KindergartenInfo> getKindergartens() {
		return kindergartenRepository.findAll().stream()
				.map(isdb -> new KindergartenInfo(isdb.getId(), isdb.getAddress(), isdb.getName()))
				.collect(Collectors.toList());
	}
}
