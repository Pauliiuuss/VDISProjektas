package it.akademija.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.AppStatus;
import it.akademija.models.ChildForm;
import it.akademija.models.Group;
import it.akademija.models.KindergartenPriority;
import it.akademija.models.SecondParent;
import it.akademija.models.User;
import it.akademija.models.UserData;
import it.akademija.models.enums.EFormStatus;
import it.akademija.payload.request.ChildFormRequest;
import it.akademija.payload.request.KindergartenRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.AppStatusRepo;
import it.akademija.repository.ChildFormRepository;
import it.akademija.repository.FormStatusRepository;
import it.akademija.repository.KindergartenPriorityRepository;
import it.akademija.repository.KindergartenRepository;
import it.akademija.repository.SecondParentRepository;
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
	@Autowired
	private SecondParentRepository secondParentRepository;
	@Autowired
	private AppStatusRepo appStatusRepo;

	@Transactional(readOnly = true)
	public Collection<KindergartenRequest> getKindergartens() {
		return kindergartenRepository.findAll().stream()
				.map(isdb -> new KindergartenRequest(isdb.getId(), isdb.getAddress(), isdb.getName(),
						isdb.getGroups().stream().map(Group::getCapasity).reduce(0L, Long::sum)))
				.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public Collection<ChildFormRequest> getAllForms() {
		return childFormRepository.findAll().stream()
				.map(isdb -> new ChildFormRequest(isdb.getId(), isdb.getName(), isdb.getSurename(), isdb.getBirthDate(),
						isdb.getAddress(), isdb.getCity(), isdb.getPersonId(), isdb.isInCity(), isdb.isAdopted(),
						isdb.isThreeOrMore(), isdb.isParentStudent(), isdb.isHandicapped(), isdb.getParentData(),
						isdb.getSecondParentData(), isdb.getKindergartenPriority(), isdb.getPostDate(), isdb.getGroup(), isdb.getFormStatus()))
				.collect(Collectors.toList());
	}

	public ChildForm getData(Long id) {
		System.out.println("************************ Inside getData in service");
		if (id == null)
			return null;
		System.out.println("************************ Inside getData in service after if");
		return childFormRepository.findByPersonId(id).get();
	}

	@Transactional
	public ResponseEntity<?> addForm(ChildFormRequest childFormRequest) {
		if (childFormRepository.existsByPersonId(childFormRequest.getPersonId())) {
			return ResponseEntity.badRequest()
					.body(new MessageResponse("Vaiko su tokiu asmens kodu prašymas jau yra registruotas!"));
		}

		ChildForm newForm = new ChildForm(childFormRequest.getPersonId(), childFormRequest.getName(),
				childFormRequest.getSurename(), childFormRequest.getBirthDate(), childFormRequest.getAddress(),
				childFormRequest.getCity(), childFormRequest.isInCity(), childFormRequest.isAdopted(),
				childFormRequest.isThreeOrMore(), childFormRequest.isParentStudent(), childFormRequest.isHandicapped(),
				childFormRequest.getParentData(), childFormRequest.getSecondParentData(),
				childFormRequest.getPostDate());
		newForm.setFormStatus(formrepo.findByName(EFormStatus.PATEIKTAS).get());

		User currentUser = userRepository.findAll().stream()
				.filter(isdb -> isdb.getId() == childFormRequest.getIdFront()).findFirst().orElse(null);
		if (currentUser != null && currentUser.getUserData() == null) {
			newForm.getParentData().setUser(currentUser);
			userDataRepository.save(childFormRequest.getParentData());
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

		if (childFormRequest.getSecondParentData() != null
				&& childFormRequest.getSecondParentData().getPersonId() != null) {
			if (secondParentRepository.existsByPersonId(childFormRequest.getSecondParentData().getPersonId())) {
				SecondParent secondParentUpdate = secondParentRepository
						.findByPersonId(childFormRequest.getSecondParentData().getPersonId()).get();
				secondParentUpdate.setName(childFormRequest.getSecondParentData().getName());
				secondParentUpdate.setSurename(childFormRequest.getSecondParentData().getSurename());
				secondParentUpdate.setPersonId(childFormRequest.getSecondParentData().getPersonId());
				secondParentUpdate.setAddress(childFormRequest.getSecondParentData().getAddress());
				secondParentUpdate.setCity(childFormRequest.getSecondParentData().getCity());
				secondParentUpdate.setEmail(childFormRequest.getSecondParentData().getEmail());
				secondParentUpdate.setPhoneNum(childFormRequest.getSecondParentData().getPhoneNum());
				newForm.setSecondParentData(secondParentUpdate);
			} else {
				secondParentRepository.save(childFormRequest.getSecondParentData());
				newForm.setSecondParentData(childFormRequest.getSecondParentData());
			}
		} else {
			newForm.setSecondParentData(null);
		}

		childFormRepository.save(newForm);

		KindergartenPriority kinderSelection = childFormRequest.getKindergartenPriority();
		if (kinderSelection.getKindergartenOne().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenOne(null);
		}
		if (kinderSelection.getKindergartenTwo().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenTwo(null);
		}
		if (kinderSelection.getKindergartenThree().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenThree(null);
		}
		if (kinderSelection.getKindergartenFour().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenFour(null);
		}
		if (kinderSelection.getKindergartenFive().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenFive(null);
		}

		kinderSelection.setChildForm(newForm);
		kindergartenPriorityRepository.save(kinderSelection);

		return ResponseEntity.ok(new MessageResponse("Prašymas užregistruotas!"));

	}

	public Collection<ChildForm> getForms(Long id) {
		return userDataRepository.findByUser(userRepository.getOne(id)).orElse(new UserData()).getChildForms();
//		return childFormRepository.findAllByParentData(userDataRepository.getOne(id));
	}

	public ResponseEntity<?> updateForm(Long id, ChildFormRequest childFormRequest) {
		if (childFormRequest.getKindergartenPriority().getKindergartenOne() == null
				|| childFormRequest.getKindergartenPriority().getKindergartenOne().equals("") || childFormRequest
						.getKindergartenPriority().getKindergartenOne().equals("Pasirinkti darželį iš sąrašo..."))
			return ResponseEntity.badRequest().body(new MessageResponse("Privaloma pasirinkti pirma prioriteta!"));

		System.out.println("++++++++++++++++++++++" + id + "form is: " + childFormRequest);

		ChildForm newForm = childFormRepository.getOne(id);

		newForm.setPersonId(childFormRequest.getPersonId());
		newForm.setName(childFormRequest.getName());
		newForm.setSurename(childFormRequest.getSurename());
		newForm.setBirthDate(childFormRequest.getBirthDate());
		newForm.setAddress(childFormRequest.getAddress());
		newForm.setCity(childFormRequest.getCity());
		newForm.setInCity(childFormRequest.isInCity());
		newForm.setAdopted(childFormRequest.isAdopted());
		newForm.setThreeOrMore(childFormRequest.isThreeOrMore());
		newForm.setParentStudent(childFormRequest.isParentStudent());
		newForm.setHandicapped(childFormRequest.isHandicapped());
		newForm.setParentData(childFormRequest.getParentData());
		newForm.setPostDate(childFormRequest.getPostDate());
		newForm.setFormStatus(formrepo.findByName(EFormStatus.PATEIKTAS).get());

		User currentUser = userRepository.getOne(childFormRequest.getIdFront());

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

		if (childFormRequest.getSecondParentData() != null
				&& childFormRequest.getSecondParentData().getPersonId() != null
				&& newForm.getSecondParentData() != null) {
			SecondParent newSecondParent = newForm.getSecondParentData();

			newSecondParent.setName(childFormRequest.getSecondParentData().getName());
			newSecondParent.setSurename(childFormRequest.getSecondParentData().getSurename());
			newSecondParent.setPersonId(childFormRequest.getSecondParentData().getPersonId());
			newSecondParent.setAddress(childFormRequest.getSecondParentData().getAddress());
			newSecondParent.setCity(childFormRequest.getSecondParentData().getCity());
			newSecondParent.setEmail(childFormRequest.getSecondParentData().getEmail());
			newSecondParent.setPhoneNum(childFormRequest.getSecondParentData().getPhoneNum());
			secondParentRepository.save(newSecondParent);
			newForm.setSecondParentData(newSecondParent);
		} else if (childFormRequest.getSecondParentData() != null
				&& childFormRequest.getSecondParentData().getPersonId() != null
				&& newForm.getSecondParentData() == null) {
			SecondParent addSecondParent = childFormRequest.getSecondParentData();
			secondParentRepository.save(addSecondParent);
			newForm.setSecondParentData(addSecondParent);
		} else {
			newForm.setSecondParentData(null);
		}

		childFormRepository.save(newForm);
		KindergartenPriority kinderSelection = childFormRequest.getKindergartenPriority();
		if (kinderSelection.getKindergartenOne().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenOne(null);
		}
		if (kinderSelection.getKindergartenTwo().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenTwo(null);
		}
		if (kinderSelection.getKindergartenThree().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenThree(null);
		}
		if (kinderSelection.getKindergartenFour().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenFour(null);
		}
		if (kinderSelection.getKindergartenFive().equals("Pasirinkti darželį iš sąrašo...")) {
			kinderSelection.setKindergartenFive(null);
		}

		kinderSelection.setChildForm(newForm);
		kindergartenPriorityRepository.save(kinderSelection);

		return ResponseEntity.ok(new MessageResponse("Forma užregistruota!"));
	}

	@Transactional
	public ResponseEntity<?> deleteFormById(Long id) {
		childFormRepository.deleteById(id);

		return ResponseEntity.ok(new MessageResponse("Forma ištrinta!"));
	}
//
//    @Transactional
//    public void addForm(ChildFormRequest childFormInfo){
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
//    public void addParentData(UserDataRequest parentDataInfo){
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
//    public void addKindergartenPriorities(KindergartenPriorityRequest kindergartenPriorityInfo){
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

	@Transactional
	public AppStatus getStatus() {
		AppStatus status = appStatusRepo.findAll().get(0);
		return status;
	}
}
