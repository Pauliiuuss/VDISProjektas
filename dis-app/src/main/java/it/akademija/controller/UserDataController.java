package it.akademija.controller;

import it.akademija.models.UserDataInfo;
import it.akademija.services.UserDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/userdata")
public class UserDataController {

    @Autowired
    private UserDataService userDataService;

    @GetMapping("/all")
    public Collection<UserDataInfo> getAllUserData () {
        return userDataService.getAllUserData();
    }
    @GetMapping("/get/{id}")
    public UserDataInfo getUserDataById (@PathVariable("id") long id){
        return userDataService.getUserDataById(id);
    }
    @PostMapping("/add")
    public void addUserData(@RequestBody UserDataInfo userDataInfo){
        userDataService.addUserData(userDataInfo);
    }
    @PutMapping("/update")
    public void updateUserData(UserDataInfo userDataInfo){
        userDataService.updateUserData(userDataInfo);
    }
}
