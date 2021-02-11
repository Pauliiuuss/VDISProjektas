package it.akademija.services;

import it.akademija.models.ChildForm;
import it.akademija.models.ChildFormInfo;
import it.akademija.models.User;
import it.akademija.models.UserData;
import it.akademija.repository.ChildFormRepository;
import it.akademija.repository.UserDataRepository;
import it.akademija.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class ChildFormService {

    @Autowired
    private ChildFormRepository childFormRepository;
    @Autowired
    private UserDataRepository userDataRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Collection<ChildFormInfo> getAllForms(){
        return childFormRepository.findAll().stream()
                .map(isdb -> new ChildFormInfo(
                        isdb.getName(),
                        isdb.getSurename(),
                        isdb.getBirthDate(),
                        isdb.getAddress(),
                        isdb.getCity(),
                        isdb.isInCity(),
                        isdb.isAdopted(),
                        isdb.isThreeOrMore(),
                        isdb.isParentStudent(),
                        isdb.isHandicapped(),
                        isdb.getParentData(),
                        isdb.getKindergartenPriority(),
                        isdb.getPostDate()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ChildFormInfo getFormById(long id) {
        ChildForm info = childFormRepository.findAll().stream()
                .filter(isdb -> isdb.getId() == id)
                .findFirst()
                .orElse(null);
        if (info != null) {
            return new ChildFormInfo(
                    info.getName(),
                    info.getSurename(),
                    info.getBirthDate(),
                    info.getAddress(),
                    info.getCity(),
                    info.isInCity(),
                    info.isAdopted(),
                    info.isThreeOrMore(),
                    info.isParentStudent(),
                    info.isHandicapped(),
                    info.getParentData(),
                    info.getKindergartenPriority(),
                    info.getPostDate());
        } else {
            throw new IllegalArgumentException("Forma pagal duota ID nerasta.");
        }
    }

    @Transactional
    public void deleteFormById(long id){
        childFormRepository.deleteById(id);
    }

    @Transactional
    public void addForm(ChildFormInfo childFormInfo){
        ChildForm idb = new ChildForm(
                childFormInfo.getName(),
                childFormInfo.getSurename(),
                childFormInfo.getBirthDate(),
                childFormInfo.getAddress(),
                childFormInfo.getCity(),
                childFormInfo.isInCity(),
                childFormInfo.isAdopted(),
                childFormInfo.isThreeOrMore(),
                childFormInfo.isParentStudent(),
                childFormInfo.isHandicapped(),
                childFormInfo.getParentData(),
                childFormInfo.getKindergartenPriority(),
                childFormInfo.getPostDate());
        UserData userDataIsdb = userDataRepository.findAll().stream()
                .filter(isdb -> isdb.getName().equals(idb.getName()) && isdb.getSurename().equals(idb.getSurename()))
                .findFirst()
                .orElse(null);
        if(userDataIsdb!=null){
            userDataIsdb.setCity(childFormInfo.getParentData().getCity());
            userDataRepository.save(userDataIsdb);
            idb.setParentData(userDataIsdb);
            childFormRepository.save(idb);
        } else {
        }


    }

    @Transactional
    public void updateForm(ChildFormInfo childFormInfo){
        ChildForm idb = childFormRepository.findAll().stream()
                .filter(isdb -> isdb.getId() == childFormInfo.getId())
                .findFirst()
                .orElse(null);
        if(idb != null){
            idb.setName(childFormInfo.getName());
            idb.setSurename(childFormInfo.getSurename());
            idb.setBirthDate(childFormInfo.getBirthDate());
            idb.setAddress(childFormInfo.getAddress());
            idb.setCity(childFormInfo.getCity());
            idb.setInCity(childFormInfo.isInCity());
            idb.setAdopted(childFormInfo.isAdopted());
            idb.setThreeOrMore(childFormInfo.isThreeOrMore());
            idb.setParentStudent(childFormInfo.isParentStudent());
            idb.setHandicapped(childFormInfo.isHandicapped());
            idb.setParentData(childFormInfo.getParentData());
            idb.setKindergartenPriority(childFormInfo.getKindergartenPriority());
            idb.setPostDate(childFormInfo.getPostDate());
            childFormRepository.save(idb);
        } else {
            throw new IllegalArgumentException("Froma pagal duota ID nerasta.");
        }
    }
}
