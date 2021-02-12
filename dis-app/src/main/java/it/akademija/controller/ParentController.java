package it.akademija.controller;

import it.akademija.models.ChildFormInfo;
import it.akademija.models.KindergartenInfo;
import it.akademija.services.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/parent")
public class ParentController {

    @Autowired
    private ParentService parentService;

    @GetMapping("/allgartens")
    @PreAuthorize("hasRole('PARENT')")
    public Collection<KindergartenInfo> getKindergartens() {
        return parentService.getKindergartens();
    }

    @GetMapping("/allforms")
    @PreAuthorize("hasRole('PARENT')")
    public Collection<ChildFormInfo> getAllForms(){
        return parentService.getAllForms();
    }

    @PostMapping("/addform")
    @PreAuthorize("hasRole('PARENT')")
    public void addForm(@RequestBody ChildFormInfo childFormInfo){
        parentService.addForm(childFormInfo);
    }
}
