package it.akademija.controller;

import it.akademija.payload.request.ChildFormRequest;
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
    @PreAuthorize("hasRole('SPEC') or hasRole('PARENT') or hasRole('ADMIN')")
    public Collection<ChildFormRequest> getAllForms(){
        return childFormService.getAllForms();
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('SPEC') or hasRole('PARENT') or hasRole('ADMIN')")
    public void updateForm(@PathVariable long id, ChildFormRequest childFormRequest){
        childFormService.updateForm(id, childFormRequest);
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('SPEC') or hasRole('PARENT') or hasRole('ADMIN')")
    public void deleteFormById(@PathVariable long id){
        childFormService.deleteFormById(id);
    }

}
