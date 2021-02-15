package it.akademija.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.models.ChildForm;
import it.akademija.models.ChildFormInfo;
import it.akademija.models.KindergartenInfo;
import it.akademija.services.ParentService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/parent")
public class ParentController {

	@Autowired
	private ParentService parentService;

	@GetMapping("getdata/{id}")
	@PreAuthorize("hasRole('PARENT')")
	public ChildForm getData(@PathVariable Integer id) {
		return parentService.getData(id);
	}

	@GetMapping("/allgartens")
	@PreAuthorize("hasRole('PARENT')")
	public Collection<KindergartenInfo> getKindergartens() {
		return parentService.getKindergartens();
	}

	@GetMapping("/allforms")
	@PreAuthorize("hasRole('PARENT')")
	public Collection<ChildFormInfo> getAllForms() {
		return parentService.getAllForms();
	}

	@PostMapping("/addform")
	@PreAuthorize("hasRole('PARENT')")
	public void addForm(@RequestBody ChildFormInfo childFormInfo) {
		parentService.addForm(childFormInfo);
	}

	@GetMapping("/getforms/{id}")
	@PreAuthorize("hasRole('PARENT')")
	public Collection<ChildForm> getGroups(@PathVariable Long id) {
		return parentService.getForms(id);
	}
}
