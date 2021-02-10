package it.akademija.controller;

import it.akademija.models.KindergartenPriorityInfo;
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
    public Collection<KindergartenPriorityInfo> getAllKindergartenPriorities(){
        return kindergartenPriorityService.getAllKindergartenPriorities();
    }

    @GetMapping("/get/{id}")
    public KindergartenPriorityInfo getKindergartenPrioritiesById (@PathVariable("id") long id){
        return kindergartenPriorityService.getKindergartenPrioritiesById(id);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteKindergartenPriorityById (@PathVariable("id") long id){
        kindergartenPriorityService.deleteKindergartenPriorityById(id);
    }
    @PostMapping("/add")
    public void addKindergartenPriority(@RequestBody KindergartenPriorityInfo kindergartenPriorityInfo){
        kindergartenPriorityService.addKindergartenPriority(kindergartenPriorityInfo);
    }

    @PutMapping("/update")
    public void updateKindergartenPriority(KindergartenPriorityInfo kindergartenPriorityInfo){
        kindergartenPriorityService.updateKindergartenPriority(kindergartenPriorityInfo);
    }
}
