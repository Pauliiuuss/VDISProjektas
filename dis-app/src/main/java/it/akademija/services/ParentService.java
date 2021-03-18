package it.akademija.services;


import it.akademija.models.*;
import it.akademija.models.enums.EFormStatus;
import it.akademija.payload.request.ChildFormRequest;
import it.akademija.payload.request.KindergartenRequest;
import it.akademija.payload.request.UserDataDownloadRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.*;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

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
						isdb.getSecondParentData(), isdb.getKindergartenPriority(), isdb.getPostDate(), isdb.getGroup(),
						isdb.getFormStatus()))
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

		Log.logMessage("Vaiko \"" + childFormRequest.getName() + " " + childFormRequest.getSurename()
				+ "\" prašymas užregistruotas.");
		return ResponseEntity.ok(new MessageResponse("Prašymas užregistruotas!"));

	}

	public Collection<ChildForm> getForms(Long id) {
		return userDataRepository.findByUser(userRepository.getOne(id)).orElse(new UserData()).getChildForms();
	}

	public ResponseEntity<?> updateForm(Long id, ChildFormRequest childFormRequest) {
		if (childFormRequest.getKindergartenPriority().getKindergartenOne() == null
				|| childFormRequest.getKindergartenPriority().getKindergartenOne().equals("") || childFormRequest
						.getKindergartenPriority().getKindergartenOne().equals("Pasirinkti darželį iš sąrašo..."))
			return ResponseEntity.badRequest().body(new MessageResponse("Privaloma pasirinkti pirma prioriteta!"));

		System.out.println("++++++++++++++++++++++" + id + "form is: " + childFormRequest);

		ChildForm newForm = childFormRepository.findById(id).orElseThrow();

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
		System.out.println(childFormRequest.getIdFront() + " ------_______---_______--_______---______-----");
		User currentUser = userRepository.findById(childFormRequest.getIdFront()).orElseThrow();

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

		Log.logMessage("Vaiko \"" + childFormRequest.getName() + " " + childFormRequest.getSurename()
				+ "\" prašymas atnaujintas.");
		return ResponseEntity.ok(new MessageResponse("Forma užregistruota!"));
	}

	@Transactional
	public ResponseEntity<?> deleteFormById(Long id) {

		ChildForm form = childFormRepository.findById(id).orElseThrow();
		childFormRepository.deleteById(id);
		Log.logMessage("Vaiko \"" + form.getName() + " " + form.getSurename() + "\" prašymas ištrintas.");
		return ResponseEntity.ok(new MessageResponse("Forma ištrinta!"));
	}

	@Transactional
	public AppStatus getStatus() {
		return appStatusRepo.findAll().get(0);
	}

	@Transactional
	public ResponseEntity<?> downloadUserData(Long id) throws IOException {
		UserData isdb = userRepository.getOne(id).getUserData();
		if (isdb == null) {
			return ResponseEntity.badRequest().body(new MessageResponse("Galimų archyvuoti duomenų nerasta."));
		} else {
			UserDataDownloadRequest request = new UserDataDownloadRequest(isdb.getName(), isdb.getSurename(),
					isdb.getPersonId(), isdb.getAddress(), isdb.getCity(), isdb.getPhoneNum(), isdb.getEmail());

			String nameInZip = userRepository.getOne(id).getUsername() + "_duomenys_";
			ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
			BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(byteArrayOutputStream);
			ZipOutputStream zipOutputStream = new ZipOutputStream(bufferedOutputStream);

			File file = File.createTempFile(nameInZip, ".json");
			try (Writer writer = new BufferedWriter(new FileWriter(file))) {
				writer.write(request.toString());
			}

			zipOutputStream.putNextEntry(new ZipEntry(file.getName()));
			FileInputStream fileInputStream = new FileInputStream(file);

			IOUtils.copy(fileInputStream, zipOutputStream);

			fileInputStream.close();
			zipOutputStream.closeEntry();

			zipOutputStream.finish();
			zipOutputStream.flush();
			IOUtils.closeQuietly(zipOutputStream);
			IOUtils.closeQuietly(bufferedOutputStream);
			IOUtils.closeQuietly(byteArrayOutputStream);

			byte[] bytes = byteArrayOutputStream.toByteArray();

			return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename="
					+ isdb.getUser().getUsername() + "_archyvuotiDuomenys_" + LocalDate.now() + ".zip").body(bytes);
		}
	}
}
