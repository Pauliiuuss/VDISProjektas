package it.akademija.controller;

import it.akademija.payload.request.KindergartenPriorityRequest;
import it.akademija.services.KindergartenPriorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/priorities")
public class KindergartenPriorityController {

    @Autowired
    private KindergartenPriorityService kindergartenPriorityService;

    @GetMapping("/all")
    public Collection<KindergartenPriorityRequest> getAllKindergartenPriorities(){
        return kindergartenPriorityService.getAllKindergartenPriorities();
    }

    @GetMapping("/get/{id}")
    public KindergartenPriorityRequest getKindergartenPrioritiesById (@PathVariable("id") Long id){
        return kindergartenPriorityService.getKindergartenPrioritiesById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteKindergartenPriorityById (@PathVariable("id") Long id){
        kindergartenPriorityService.deleteKindergartenPriorityById(id);
    }
    @PostMapping("/add")
    public void addKindergartenPriority(@RequestBody KindergartenPriorityRequest kindergartenPriorityRequest){
        kindergartenPriorityService.addKindergartenPriority(kindergartenPriorityRequest);
    }

    @PutMapping("/update")
    public void updateKindergartenPriority(KindergartenPriorityRequest kindergartenPriorityRequest){
        kindergartenPriorityService.updateKindergartenPriority(kindergartenPriorityRequest);
    }
}
