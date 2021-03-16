package it.akademija.services;

import it.akademija.models.ChildForm;
import it.akademija.payload.request.ChildFormRequest;
import it.akademija.repository.ChildFormRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class ChildFormService {

	@Autowired
	private ChildFormRepository childFormRepository;

	@Transactional(readOnly = true)
	public Collection<ChildFormRequest> getAllForms() {
		return childFormRepository.findAll().stream()
				.map(isdb -> new ChildFormRequest(isdb.getId(), isdb.getName(), isdb.getSurename(), isdb.getBirthDate(),
						isdb.getAddress(), isdb.getCity(), isdb.getPersonId(), isdb.isInCity(), isdb.isAdopted(),
						isdb.isThreeOrMore(), isdb.isParentStudent(), isdb.isHandicapped(), isdb.getParentData(), isdb.getSecondParentData(),
						isdb.getKindergartenPriority(), isdb.getPostDate()))
				.collect(Collectors.toList());
	}

	@Transactional
	public void updateForm(long id, ChildFormRequest childFormRequest) {
		ChildForm isdb = childFormRepository.findById(id).get();
		isdb.setPersonId(childFormRequest.getPersonId());
		isdb.setName(childFormRequest.getName());
		isdb.setSurename(childFormRequest.getSurename());
		isdb.setBirthDate(childFormRequest.getBirthDate());
		isdb.setAddress(childFormRequest.getAddress());
		isdb.setCity(childFormRequest.getCity());
		isdb.setInCity(childFormRequest.isInCity());
		isdb.setAdopted(childFormRequest.isAdopted());
		isdb.setThreeOrMore(childFormRequest.isThreeOrMore());
		isdb.setParentStudent(childFormRequest.isParentStudent());
		isdb.setHandicapped(childFormRequest.isHandicapped());
		isdb.setParentData(childFormRequest.getParentData());
		isdb.setPostDate(childFormRequest.getPostDate());

		childFormRepository.save(isdb);

	}

	@Transactional
	public void deleteFormById(long id) {
		childFormRepository.deleteById(id);
	}

}
