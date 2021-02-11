package it.akademija.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.ChildFormInfo;
import it.akademija.repository.ChildFormRepository;
import it.akademija.repository.KindergartenRepository;

@Service
public class ChildFormService {

	@Autowired
	private KindergartenRepository kindergartenRepository;

	@Autowired
	private ChildFormRepository childFormRepository;

//	@Transactional(readOnly = true)
//	public Collection<ChildFormInfo> getAllForms() {
//		return childFormRepository.findAll().stream()
//				.map(isdb -> new ChildFormInfo(isdb.getName(), isdb.getSurename(), isdb.getBirthDate(),
//						isdb.getAddress(), isdb.getCity(), isdb.isInCity(), isdb.isAdopted(), isdb.isThreeOrMore(),
//						isdb.isParentStudent(), isdb.isHandicapped(), isdb.getParentId(), isdb.getPostDate()))
//				.collect(Collectors.toList());
//	}
//
//	@Transactional(readOnly = true)
//	public ChildFormInfo getFormById(long id) {
//		ChildForm info = childFormRepository.findAll().stream().filter(isdb -> isdb.getId() == id).findFirst()
//				.orElse(null);
//		if (info != null) {
//			return new ChildFormInfo(info.getName(), info.getSurename(), info.getBirthDate(), info.getAddress(),
//					info.getCity(), info.isInCity(), info.isAdopted(), info.isThreeOrMore(), info.isParentStudent(),
//					info.isHandicapped(), info.getParentId(), info.getPostDate());
//		} else {
//			throw new IllegalArgumentException("Forma pagal duota ID nerasta.");
//		}
//	}

	@Transactional
	public void deleteFormById(long id) {
		childFormRepository.deleteById(id);
	}

	@Transactional
	public void addForm(ChildFormInfo childFormInfo) {
		System.out.println(childFormInfo);
//		List<Parent> parents = new ArrayList<Parent>();
//		parents.add(new Parent(childFormInfo.getParent1()));
//		if (childFormInfo.getParent2().getKodasAtstovas() > 0)
//			parents.add(new Parent(childFormInfo.getParent2()));
//
//		KindergartenPriority priority = new KindergartenPriority(childFormInfo.getKindergarten1(),
//				childFormInfo.getKindergarten2(), childFormInfo.getKindergarten3(), childFormInfo.getKindergarten4(),
//				childFormInfo.getKindergarten5());
//
//		ChildForm idb = new ChildForm(childFormInfo.getName(), childFormInfo.getSurename(),
//				childFormInfo.getBirthDate(), childFormInfo.getAddress(), childFormInfo.getCity(),
//				childFormInfo.isInCity(), childFormInfo.isAdopted(), childFormInfo.isThreeOrMore(),
//				childFormInfo.isParentStudent(), childFormInfo.isHandicapped(), parents, priority,
//				childFormInfo.getPostDate());
//		childFormRepository.save(idb);
	}

//	@Transactional
//	public void updateForm(ChildFormInfo childFormInfo) {
//		ChildForm idb = childFormRepository.findAll().stream().filter(isdb -> isdb.getId() == childFormInfo.getId())
//				.findFirst().orElse(null);
//		if (idb != null) {
//			idb.setName(childFormInfo.getName());
//			idb.setSurename(childFormInfo.getSurename());
//			idb.setBirthDate(childFormInfo.getBirthDate());
//			idb.setAddress(childFormInfo.getAddress());
//			idb.setCity(childFormInfo.getCity());
//			idb.setInCity(childFormInfo.isInCity());
//			idb.setAdopted(childFormInfo.isAdopted());
//			idb.setThreeOrMore(childFormInfo.isThreeOrMore());
//			idb.setParentStudent(childFormInfo.isParentStudent());
//			idb.setHandicapped(childFormInfo.isHandicapped());
//			idb.setParentId(childFormInfo.getParentId());
//			idb.setPostDate(childFormInfo.getPostDate());
//			childFormRepository.save(idb);
//		} else {
//			throw new IllegalArgumentException("Froma pagal duota ID nerasta.");
//		}
//	}
}
