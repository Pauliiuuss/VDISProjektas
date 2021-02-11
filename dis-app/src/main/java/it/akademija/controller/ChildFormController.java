package it.akademija.controller;


import it.akademija.models.ChildFormInfo;
import it.akademija.services.ChildFormService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @GetMapping("/get/{id}")
    public ChildFormInfo getFormById(@PathVariable("id") long id){
        return childFormService.getFormById(id);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteForm(@PathVariable("id") long id){
        childFormService.deleteFormById(id);
    }
    @PostMapping("/add")
    public void addForm(@RequestBody ChildFormInfo childFormInfo){
        childFormService.addForm(childFormInfo);
    }
    @PutMapping("/update")
    public void updateForm(ChildFormInfo childFormInfo){
        childFormService.updateForm(childFormInfo);
    }
}
