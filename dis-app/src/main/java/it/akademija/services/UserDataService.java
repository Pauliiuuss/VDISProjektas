package it.akademija.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import it.akademija.models.User;
import it.akademija.models.UserData;
import it.akademija.models.UserDataInfo;
import it.akademija.repository.UserDataRepository;
import it.akademija.repository.UserRepository;

@Service
public class UserDataService {

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
	public void addUserData(UserDataInfo userDataInfo, long id) {
		User user = userrepo.getOne(id);
		System.out.println("n/n/ *******************" + user.getUsername());
		UserData idb = userDataRepository.findAll().stream().filter(data -> data.getUser().getId() == user.getId())
				.findFirst().orElse(null);
		System.out.println("n/n/ *******************" + idb);
		if (idb == null) {
			idb = new UserData(userDataInfo.getName(), userDataInfo.getSurename(), userDataInfo.getPersonId(),
					userDataInfo.getAddress(), userDataInfo.getCity(), userDataInfo.getPhoneNum(),
					userDataInfo.getEmail(), user);
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
}
