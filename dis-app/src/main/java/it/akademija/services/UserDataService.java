package it.akademija.services;

import it.akademija.models.UserData;
import it.akademija.models.UserDataInfo;
import it.akademija.repository.UserDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class UserDataService {

    @Autowired
    private UserDataRepository userDataRepository;

    @Transactional(readOnly = true)
    public Collection<UserDataInfo> getAllUserData (){
        return userDataRepository.findAll().stream()
                .map(isdb -> new UserDataInfo(
                        isdb.getId(),
                        isdb.getName(),
                        isdb.getSurename(),
                        isdb.getPersonId(),
                        isdb.getAddress(),
                        isdb.getCity(),
                        isdb.getPhoneNum(),
                        isdb.getEmail()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public UserDataInfo getUserDataById(long id){
        UserData info = userDataRepository.findAll()
                .stream()
                .filter(isdb -> isdb.getId() == id)
                .findFirst()
                .orElse(null);
        if (info != null){
            return new UserDataInfo(
                    info.getId(),
                    info.getName(),
                    info.getSurename(),
                    info.getPersonId(),
                    info.getAddress(),
                    info.getCity(),
                    info.getPhoneNum(),
                    info.getEmail());
        } else {
            throw new IllegalArgumentException("Vartotojo duomenys pagal toki ID nerasti.");
        }

    }

    @Transactional
    public void addUserData(UserDataInfo userDataInfo){
        UserData idb = new UserData(
                userDataInfo.getName(),
                userDataInfo.getSurename(),
                userDataInfo.getPersonId(),
                userDataInfo.getAddress(),
                userDataInfo.getCity(),
                userDataInfo.getPhoneNum(),
                userDataInfo.getEmail());
        userDataRepository.save(idb);
    }

    @Transactional
    public void updateUserData(UserDataInfo userDataInfo){
        UserData idb = userDataRepository.findAll().stream()
                .filter(isdb -> isdb.getId() == userDataInfo.getId())
                .findFirst()
                .orElse(null);
        if(idb != null){
            idb.setName(userDataInfo.getName());
            idb.setSurename(userDataInfo.getSurename());
            idb.setPersonId(userDataInfo.getPersonId());
            idb.setAddress(userDataInfo.getAddress());
            idb.setCity(userDataInfo.getCity());
            idb.setPhoneNum(userDataInfo.getPhoneNum());
            idb.setEmail(userDataInfo.getEmail());
            idb.setUser(userDataInfo.getUser());
        } else {
            throw new IllegalArgumentException("Vartotojo duomenys pagal toki ID nerasti.");
        }

    }
}
