package it.akademija.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.models.ChildFormInfo;
import it.akademija.models.KindergartenInfo;
import it.akademija.services.ParentService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/parent")
public class ParentController {

	@Autowired
	private ParentService parentService;

	@GetMapping("/allgartens")

	public Collection<KindergartenInfo> getKindergartens() {
		return parentService.getKindergartens();
	}

	@GetMapping("/allforms")
	public Collection<ChildFormInfo> getAllForms() {
		return parentService.getAllForms();
	}

	@PostMapping("/addform")

	public void addForm(@RequestBody ChildFormInfo childFormInfo) {
		parentService.addForm(childFormInfo);
	}
}
