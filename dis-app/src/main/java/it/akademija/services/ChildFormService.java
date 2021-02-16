package it.akademija.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.ChildForm;
import it.akademija.models.ChildFormInfo;
import it.akademija.repository.ChildFormRepository;

@Service
public class ChildFormService {

	@Autowired
	private ChildFormRepository childFormRepository;

	@Transactional(readOnly = true)
	public Collection<ChildFormInfo> getAllForms() {
		return childFormRepository.findAll().stream()
				.map(isdb -> new ChildFormInfo(isdb.getId(), isdb.getName(), isdb.getSurename(), isdb.getBirthDate(),
						isdb.getAddress(), isdb.getCity(), isdb.getPersonId(), isdb.isInCity(), isdb.isAdopted(),
						isdb.isThreeOrMore(), isdb.isParentStudent(), isdb.isHandicapped(), isdb.getParentData(),
						isdb.getKindergartenPriority(), isdb.getPostDate()))
				.collect(Collectors.toList());
	}

	@Transactional
	public void updateForm(long id, ChildFormInfo childFormInfo) {
		ChildForm isdb = childFormRepository.findById(id).get();
		isdb.setPersonId(childFormInfo.getPersonId());
		isdb.setName(childFormInfo.getName());
		isdb.setSurename(childFormInfo.getSurename());
		isdb.setBirthDate(childFormInfo.getBirthDate());
		isdb.setAddress(childFormInfo.getAddress());
		isdb.setCity(childFormInfo.getCity());
		isdb.setInCity(childFormInfo.isInCity());
		isdb.setAdopted(childFormInfo.isAdopted());
		isdb.setThreeOrMore(childFormInfo.isThreeOrMore());
		isdb.setParentStudent(childFormInfo.isParentStudent());
		isdb.setHandicapped(childFormInfo.isHandicapped());
		isdb.setParentData(childFormInfo.getParentData());
		isdb.setPostDate(childFormInfo.getPostDate());

		childFormRepository.save(isdb);

	}

	@Transactional
	public void deleteFormById(long id) {
		childFormRepository.deleteById(id);
	}

}
