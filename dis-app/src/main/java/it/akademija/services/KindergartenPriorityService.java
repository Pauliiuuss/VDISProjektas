package it.akademija.services;

import it.akademija.models.KindergartenPriority;
import it.akademija.payload.request.KindergartenPriorityRequest;
import it.akademija.repository.KindergartenPriorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class KindergartenPriorityService {

    @Autowired
    private KindergartenPriorityRepository kindergartenPriorityRepository;

    @Transactional(readOnly = true)
    public Collection<KindergartenPriorityRequest> getAllKindergartenPriorities(){
        return kindergartenPriorityRepository.findAll().stream()
                .map(isdb -> new KindergartenPriorityRequest(
                        isdb.getKindergartenOne(),
                        isdb.getKindergartenTwo(),
                        isdb.getKindergartenThree(),
                        isdb.getKindergartenFour(),
                        isdb.getKindergartenFive()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public KindergartenPriorityRequest getKindergartenPrioritiesById(long id){
        KindergartenPriority info = kindergartenPriorityRepository.findAll().stream()
                .filter(isdb -> isdb.getId() == id)
                .findFirst()
                .orElse(null);
        if(info != null){
            return new KindergartenPriorityRequest(
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
    public void addKindergartenPriority(KindergartenPriorityRequest kindergartenPriorityRequest){
        KindergartenPriority idb = new KindergartenPriority(
                kindergartenPriorityRequest.getKindergartenOne(),
                kindergartenPriorityRequest.getKindergartenTwo(),
                kindergartenPriorityRequest.getKindergartenThree(),
                kindergartenPriorityRequest.getKindergartenFour(),
                kindergartenPriorityRequest.getKindergartenFive());
        kindergartenPriorityRepository.save(idb);
    }

    @Transactional
    public void updateKindergartenPriority(KindergartenPriorityRequest kindergartenPriorityRequest){
        KindergartenPriority idb = kindergartenPriorityRepository.findAll().stream()
                .filter(isdb -> isdb.getId() == kindergartenPriorityRequest.getId())
                .findFirst()
                .orElse(null);
        if(idb != null){
            idb.setKindergartenOne(kindergartenPriorityRequest.getKindergartenOne());
            idb.setKindergartenTwo(kindergartenPriorityRequest.getKindergartenTwo());
            idb.setKindergartenThree(kindergartenPriorityRequest.getKindergartenThree());
            idb.setKindergartenFour(kindergartenPriorityRequest.getKindergartenFour());
            idb.setKindergartenFive(kindergartenPriorityRequest.getKindergartenFive());
            idb.setChildForm(kindergartenPriorityRequest.getChildForm());
        }
    }
}
