package it.akademija.controller;

import it.akademija.models.ChildFormInfo;
import it.akademija.services.ChildFormService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/childform")
public class ChildFormController {

    @Autowired
    private ChildFormService childFormService;

    @GetMapping("/all")
    public Collection<ChildFormInfo> getAllForms(){
        return childFormService.getAllForms();
    }

    @PutMapping("/update/{id}")
    public void updateForm(@PathVariable long id, ChildFormInfo childFormInfo){
        childFormService.updateForm(id, childFormInfo);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteFormById(@PathVariable long id){
        childFormService.deleteFormById(id);
    }

}
