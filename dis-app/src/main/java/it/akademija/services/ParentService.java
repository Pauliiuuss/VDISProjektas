package it.akademija.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.ChildForm;
import it.akademija.models.ChildFormInfo;
import it.akademija.models.EFormStatus;
import it.akademija.models.Group;
import it.akademija.models.KindergartenInfo;
import it.akademija.models.User;
import it.akademija.models.UserData;
import it.akademija.repository.ChildFormRepository;
import it.akademija.repository.FormStatusRepository;
import it.akademija.repository.KindergartenPriorityRepository;
import it.akademija.repository.KindergartenRepository;
import it.akademija.repository.UserDataRepository;
import it.akademija.repository.UserRepository;

@Service
public class ParentService {

	@Autowired
	private FormStatusRepository formrepo;
	@Autowired
	private KindergartenRepository kindergartenRepository;
	@Autowired
	private ChildFormRepository childFormRepository;
	@Autowired
	private UserDataRepository userDataRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private KindergartenPriorityRepository kindergartenPriorityRepository;

//    private ChildForm newForm;
//    private UserData newData;
//    private KindergartenPriority newKinder;
//
	@Transactional(readOnly = true)
	public Collection<KindergartenInfo> getKindergartens() {
		return kindergartenRepository.findAll().stream()
				.map(isdb -> new KindergartenInfo(isdb.getId(), isdb.getAddress(), isdb.getName(),
						isdb.getGroups().stream().map(Group::getCapasity).reduce(0L, Long::sum)))
				.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Collection<ChildFormInfo> getAllForms() {
		return childFormRepository.findAll().stream()
				.map(isdb -> new ChildFormInfo(isdb.getId(), isdb.getName(), isdb.getSurename(), isdb.getBirthDate(),
						isdb.getAddress(), isdb.getCity(), isdb.getPersonId(), isdb.isInCity(), isdb.isAdopted(),
						isdb.isThreeOrMore(), isdb.isParentStudent(), isdb.isHandicapped(), isdb.getParentData(),
						isdb.getKindergartenPriority(), isdb.getPostDate()))
				.collect(Collectors.toList());
	}

	public ChildForm getData(Integer id) {
		if (id == null)
			return null;
		return childFormRepository.findByPersonId(id).get();
	}

	@Transactional
	public void addForm(ChildFormInfo childFormInfo) {

		ChildForm newForm = new ChildForm(childFormInfo.getPersonId(), childFormInfo.getName(),
				childFormInfo.getSurename(), childFormInfo.getBirthDate(), childFormInfo.getAddress(),
				childFormInfo.getCity(), childFormInfo.isInCity(), childFormInfo.isAdopted(),
				childFormInfo.isThreeOrMore(), childFormInfo.isParentStudent(), childFormInfo.isHandicapped(),
				childFormInfo.getParentData(), childFormInfo.getPostDate());
		newForm.setFormStatus(formrepo.findByName(EFormStatus.PATEIKTAS).get());

		User currentUser = userRepository.findAll().stream().filter(isdb -> isdb.getId() == childFormInfo.getIdFront())
				.findFirst().orElse(null);
		if (currentUser != null && currentUser.getUserData() == null) {
			newForm.getParentData().setUser(currentUser);
			userDataRepository.save(childFormInfo.getParentData());
		} else if (currentUser != null && currentUser.getUserData() != null) {

			UserData newData = currentUser.getUserData();

			newData.setName(newForm.getParentData().getName());
			newData.setSurename(newForm.getParentData().getSurename());
			newData.setPersonId(newForm.getParentData().getPersonId());
			newData.setName(newForm.getParentData().getName());
			newData.setAddress(newForm.getParentData().getAddress());
			newData.setCity(newForm.getParentData().getCity());
			newData.setPhoneNum(newForm.getParentData().getPhoneNum());
			newData.setEmail(newForm.getParentData().getEmail());
			userDataRepository.save(newData);
			newForm.setParentData(newData);
		}
		childFormRepository.save(newForm);
		childFormInfo.getKindergartenPriority().setChildForm(newForm);
		kindergartenPriorityRepository.save(childFormInfo.getKindergartenPriority());
//        UserData newUserData = new UserData(
//                childFormInfo.getParentData().getName(),
//                childFormInfo.getParentData().getSurename(),
//                childFormInfo.getParentData().getPersonId(),
//                childFormInfo.getParentData().getAddress(),
//                childFormInfo.getParentData().getCity(),
//                childFormInfo.getParentData().getPhoneNum(),
//                childFormInfo.getParentData().getEmail());
//
//        ChildForm newForm = new ChildForm(
//                childFormInfo.getName(),
//                childFormInfo.getSurename(),
//                childFormInfo.getBirthDate(),
//                childFormInfo.getAddress(),
//                childFormInfo.getCity(),
//                childFormInfo.isInCity(),
//                childFormInfo.isAdopted(),
//                childFormInfo.isThreeOrMore(),
//                childFormInfo.isParentStudent(),
//                childFormInfo.isHandicapped());
//
//        KindergartenPriority newKinder = new KindergartenPriority(
//                childFormInfo.getKindergartenPriority().getKindergartenOne(),
//                childFormInfo.getKindergartenPriority().getKindergartenTwo(),
//                childFormInfo.getKindergartenPriority().getKindergartenThree(),
//                childFormInfo.getKindergartenPriority().getKindergartenFour(),
//                childFormInfo.getKindergartenPriority().getKindergartenFive());
//
//        User currentUser = userRepository.findAll().stream()
//                .filter(isdb -> isdb.getId() == childFormInfo.getIdFront())
//                .findFirst()
//                .orElse(null);
//
//        newForm.setKindergartenPriority(newKinder);
//        newForm.setParentData(newUserData);
//        newUserData.setUser(currentUser);
//        newKinder.setChildForm(newForm);
//
//        childFormRepository.save(newForm);
//        userDataRepository.save(newUserData);
//        kindergartenPriorityRepository.save(newKinder);
	}

	public Collection<ChildForm> getForms(Long id) {
		return userDataRepository.findByUser(userRepository.getOne(id)).orElse(new UserData()).getChildForms();
//		return childFormRepository.findAllByParentData(userDataRepository.getOne(id));
	}

//
//    @Transactional
//    public void addForm(ChildFormInfo childFormInfo){
//        ChildForm checkEx = childFormRepository.findAll().stream()
//                .filter(isdb -> isdb.getName().equals(childFormInfo.getName()) &&
//                        isdb.getSurename().equals(childFormInfo.getSurename()) &&
//                        isdb.getAddress().equals(childFormInfo.getAddress()) &&
//                        isdb.getBirthDate().equals(childFormInfo.getBirthDate()))
//                .findFirst()
//                .orElse(null);
//        if(checkEx != null){
//            throw new IllegalArgumentException("Tokia forma jau egzistuoja, redaguokite senaja.");
//        } else {
//            this.newForm = new ChildForm(
//                    childFormInfo.getName(),
//                    childFormInfo.getSurename(),
//                    childFormInfo.getBirthDate(),
//                    childFormInfo.getAddress(),
//                    childFormInfo.getCity(),
//                    childFormInfo.isInCity(),
//                    childFormInfo.isAdopted(),
//                    childFormInfo.isThreeOrMore(),
//                    childFormInfo.isParentStudent(),
//                    childFormInfo.isHandicapped());
//            childFormRepository.save(newForm);
//        }
//    }
//
//    @Transactional
//    public void addParentData(UserDataInfo parentDataInfo){
//        UserData userDataEx = userDataRepository.findAll().stream()
//                .filter(isdb -> isdb.getName().equals(parentDataInfo.getName()) &&
//                        isdb.getSurename().equals(parentDataInfo.getSurename()))
//                .findFirst()
//                .orElse(null);
//        if(userDataEx != null){
//            userDataEx.setName(parentDataInfo.getName());
//            userDataEx.setSurename(parentDataInfo.getSurename());
//            userDataEx.setAddress(parentDataInfo.getAddress());
//            userDataEx.setCity(parentDataInfo.getCity());
//            userDataEx.setPhoneNum(parentDataInfo.getPhoneNum());
//            userDataEx.setEmail(parentDataInfo.getEmail());
//            userDataEx.addChildForms(newForm);
//        } else {
//            this.newData = new UserData(
//                    parentDataInfo.getName(),
//                    parentDataInfo.getSurename(),
//                    parentDataInfo.getPersonId(),
//                    parentDataInfo.getAddress(),
//                    parentDataInfo.getCity(),
//                    parentDataInfo.getPhoneNum(),
//                    parentDataInfo.getEmail());
//            newData.addChildForms(childFormRepository.findById(newForm.getId()).orElse(null));
//            userDataRepository.save(newData);
//            ChildForm setUserData = childFormRepository.findById(newForm.getId()).orElse(null);
//            setUserData.setParentData(userDataRepository.findById(newData.getId()).orElse(null));
//        }
//    }
//
//    @Transactional
//    public void addKindergartenPriorities(KindergartenPriorityInfo kindergartenPriorityInfo){
//        this.newKinder = new KindergartenPriority(
//                kindergartenPriorityInfo.getKindergartenOne(),
//                kindergartenPriorityInfo.getKindergartenTwo(),
//                kindergartenPriorityInfo.getKindergartenThree(),
//                kindergartenPriorityInfo.getKindergartenFour(),
//                kindergartenPriorityInfo.getKindergartenFive());
//                kindergartenPriorityInfo.setChildForm(childFormRepository.findById(newForm.getId()).orElse(null));
//        kindergartenPriorityRepository.save(newKinder);
//        ChildForm setKinderPriority = childFormRepository.findById(newForm.getId()).orElse(null);
//        setKinderPriority.setKindergartenPriority(kindergartenPriorityRepository.findById(newKinder.getId()).orElse(null));
//
//    }
}