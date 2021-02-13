package it.akademija.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.User;
import it.akademija.models.UserData;
import it.akademija.models.UserDataInfo;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.UserDataRepository;
import it.akademija.repository.UserRepository;

@Service
public class UserDataService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder encoder;
	@Autowired
	private UserRepository userrepo;

	@Autowired
	private UserDataRepository userDataRepository;

	@Transactional(readOnly = true)
	public Collection<UserDataInfo> getAllUserData() {
		return userDataRepository.findAll().stream()
				.map(isdb -> new UserDataInfo(isdb.getId(), isdb.getName(), isdb.getSurename(), isdb.getPersonId(),
						isdb.getAddress(), isdb.getCity(), isdb.getPhoneNum(), isdb.getEmail(), isdb.getUser()))
				.collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public UserDataInfo getUserDataById(long id) {
		UserData info = userDataRepository.findAll().stream().filter(isdb -> isdb.getUser().getId() == id).findFirst()
				.orElse(null);
		if (info != null) {
			return new UserDataInfo(info.getName(), info.getSurename(), info.getPersonId(), info.getAddress(),
					info.getCity(), info.getPhoneNum(), info.getEmail());
		} else {
			return new UserDataInfo();
		}

	}

	@Transactional
	public ResponseEntity<?> addUserData(UserDataInfo userDataInfo, long id) {
		User user = userrepo.getOne(id);

		UserData idb = userDataRepository.findByUser(user).orElse(new UserData());

		if (idb != null) {
			idb.setName((userDataInfo.getName() != null ? userDataInfo.getName() : ""));
			idb.setSurename((userDataInfo.getSurename() != null ? userDataInfo.getName() : ""));
			idb.setPhoneNum((userDataInfo.getPhoneNum()));
			idb.setEmail((userDataInfo.getEmail() != null ? userDataInfo.getEmail() : ""));
			idb.setAddress("");
			idb.setCity("");
			idb.setUser(user);
//		}
//
//		if (idb == null) {
//			idb = new UserData(userDataInfo.getName(), userDataInfo.getSurename(), userDataInfo.getPersonId(),
//					userDataInfo.getAddress(), userDataInfo.getCity(), userDataInfo.getPhoneNum(),
//					userDataInfo.getEmail(), user);
		} else {
			idb.setName(userDataInfo.getName());
			idb.setSurename(userDataInfo.getSurename());
			idb.setPersonId(userDataInfo.getPersonId());
			idb.setAddress(userDataInfo.getAddress());
			idb.setCity(userDataInfo.getCity());
			idb.setPhoneNum(userDataInfo.getPhoneNum());
			idb.setEmail(userDataInfo.getEmail());
			idb.setUser(user);
		}
		userDataRepository.save(idb);
		return ResponseEntity.ok(new MessageResponse("Duomenys atnaujinti!"));
	}

	@Transactional
	public void updateUserData(UserDataInfo userDataInfo) {
		UserData idb = userDataRepository.findAll().stream().filter(isdb -> isdb.getId() == userDataInfo.getId())
				.findFirst().orElse(null);
		if (idb != null) {
			idb.setName(userDataInfo.getName());
			idb.setSurename(userDataInfo.getSurename());
			idb.setPersonId(userDataInfo.getPersonId());
			idb.setAddress(userDataInfo.getAddress());
			idb.setCity(userDataInfo.getCity());
			idb.setPhoneNum(userDataInfo.getPhoneNum());
			idb.setEmail(userDataInfo.getEmail());
			idb.setUser(userDataInfo.getUser());
			userDataRepository.save(idb);
		} else {
			throw new IllegalArgumentException("Vartotojo duomenys pagal toki ID nerasti.");
		}

	}

	public ResponseEntity<?> updatePassword(long id, String oldPassword, String newPassword) {
		User user = userrepo.getOne(id);

		if (!encoder.matches(oldPassword, user.getPassword())) {
			System.out.println("neteisingas");
			return ResponseEntity.badRequest().body(new MessageResponse("Dabartinis slaptažodis neteisingas."));
		} else {

			user.setPassword(encoder.encode(newPassword));
			userrepo.save(user);

			return ResponseEntity.ok(new MessageResponse("Slaptažodis atnaujintas!"));
		}
	}
}
