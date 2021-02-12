package it.akademija.services;

import it.akademija.models.ChildForm;
import it.akademija.models.KindergartenPriority;
import it.akademija.models.KindergartenPriorityInfo;
import it.akademija.repository.KindergartenPriorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class KindergartenPriorityService {

    @Autowired
    private KindergartenPriorityRepository kindergartenPriorityRepository;

    @Transactional(readOnly = true)
    public Collection<KindergartenPriorityInfo> getAllKindergartenPriorities(){
        return kindergartenPriorityRepository.findAll().stream()
                .map(isdb -> new KindergartenPriorityInfo(
                        isdb.getKindergartenOne(),
                        isdb.getKindergartenTwo(),
                        isdb.getKindergartenThree(),
                        isdb.getKindergartenFour(),
                        isdb.getKindergartenFive()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public KindergartenPriorityInfo getKindergartenPrioritiesById(long id){
        KindergartenPriority info = kindergartenPriorityRepository.findAll().stream()
                .filter(isdb -> isdb.getId() == id)
                .findFirst()
                .orElse(null);
        if(info != null){
            return new KindergartenPriorityInfo(
                    info.getKindergartenOne(),
                    info.getKindergartenTwo(),
                    info.getKindergartenThree(),
                    info.getKindergartenFour(),
                    info.getKindergartenFive());
        } else {
            throw new IllegalArgumentException("Darzeliu pasirinkimo prioritetai pagal duota ID neegzistuoja.");
        }
    }

    @Transactional
    public void deleteKindergartenPriorityById(long id){
        kindergartenPriorityRepository.deleteById(id);
    }

    @Transactional
    public void addKindergartenPriority(KindergartenPriorityInfo kindergartenPriorityInfo){
        KindergartenPriority idb = new KindergartenPriority(
                kindergartenPriorityInfo.getKindergartenOne(),
                kindergartenPriorityInfo.getKindergartenTwo(),
                kindergartenPriorityInfo.getKindergartenThree(),
                kindergartenPriorityInfo.getKindergartenFour(),
                kindergartenPriorityInfo.getKindergartenFive());
        kindergartenPriorityRepository.save(idb);
    }

    @Transactional
    public void updateKindergartenPriority(KindergartenPriorityInfo kindergartenPriorityInfo){
        KindergartenPriority idb = kindergartenPriorityRepository.findAll().stream()
                .filter(isdb -> isdb.getId() == kindergartenPriorityInfo.getId())
                .findFirst()
                .orElse(null);
        if(idb != null){
            idb.setKindergartenOne(kindergartenPriorityInfo.getKindergartenOne());
            idb.setKindergartenTwo(kindergartenPriorityInfo.getKindergartenTwo());
            idb.setKindergartenThree(kindergartenPriorityInfo.getKindergartenThree());
            idb.setKindergartenFour(kindergartenPriorityInfo.getKindergartenFour());
            idb.setKindergartenFive(kindergartenPriorityInfo.getKindergartenFive());
            idb.setChildForm(kindergartenPriorityInfo.getChildForm());
        }
    }
}
