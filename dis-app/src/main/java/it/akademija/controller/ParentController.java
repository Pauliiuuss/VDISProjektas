package it.akademija.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import it.akademija.models.ChildForm;
import it.akademija.payload.request.ChildFormRequest;
import it.akademija.payload.request.KindergartenRequest;
import it.akademija.services.ParentService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/parent")
public class ParentController {

	@Autowired
	private ParentService parentService;

	@GetMapping("getdata/{id}")
	@PreAuthorize("hasRole('PARENT') or hasRole('SPEC')")
	public ChildForm getData(@PathVariable Long id) {
		System.out.println("Called getData ****************************************************");
		return parentService.getData(id);
	}

	@GetMapping("/allgartens")
	@PreAuthorize("hasRole('PARENT') or hasRole('SPEC')")
	public Collection<KindergartenRequest> getKindergartens() {
		return parentService.getKindergartens();
	}

	@GetMapping("/allforms")
	@PreAuthorize("hasRole('PARENT') or hasRole('SPEC')")
	public Collection<ChildFormRequest> getAllForms() {
		return parentService.getAllForms();
	}

	@PostMapping("/addform")
	@PreAuthorize("hasRole('PARENT') or hasRole('SPEC')")
	public ResponseEntity<?> addForm(@RequestBody ChildFormRequest childFormRequest) {
		return parentService.addForm(childFormRequest);
	}

	@GetMapping("/getforms/{id}")
	@PreAuthorize("hasRole('PARENT') or hasRole('SPEC')")
	public Collection<ChildForm> getGroups(@PathVariable Long id) {
		return parentService.getForms(id);
	}

	@PutMapping("/updateform/{id}")
	@PreAuthorize("hasRole('PARENT') or hasRole('SPEC')")
	public ResponseEntity<?> updateForm(@PathVariable Long id, @RequestBody ChildFormRequest childFormRequest) {
		return parentService.updateForm(id, childFormRequest);
	}

	@DeleteMapping("/delete/{id}")
	@PreAuthorize("hasRole('PARENT')")
	public void deleteFormById(@PathVariable long id){
		parentService.deleteFormById(id);
	}

}
