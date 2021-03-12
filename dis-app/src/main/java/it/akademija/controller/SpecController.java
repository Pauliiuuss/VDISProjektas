package it.akademija.controller;

import java.util.Collection;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.models.ChildForm;
import it.akademija.payload.request.ChildFormRequest;
import it.akademija.payload.request.GroupRequest;
import it.akademija.payload.request.KindergartenRequest;
import it.akademija.services.SpecService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/spec")
public class SpecController {
	@Autowired
	private SpecService specService;

	@PostMapping("/create")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> registerKindergarten(@Valid @RequestBody KindergartenRequest info) {
		return specService.registerKindergarten(info);
	}

	@PostMapping("/create/{id}")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> registerKindergartenGroup(@Valid @RequestBody GroupRequest info, @PathVariable Long id) {
		return specService.registerKindergartenGroup(id, info);
	}

	@GetMapping("/getkindergartens")
	@PreAuthorize("hasRole('SPEC') or hasRole('PARENT')")
	public Collection<KindergartenRequest> getKindergartens() {
		return specService.getKindergartens();
	}

	@GetMapping("/getkindergarten/{id}")
	@PreAuthorize("hasRole('SPEC') or hasRole('PARENT')")
	public KindergartenRequest getKindergarten(@PathVariable Long id) {
		return specService.getKindergarten(id);
	}

	@GetMapping("/getgroups/{id}")
	@PreAuthorize("hasRole('SPEC')")
	public Collection<GroupRequest> getGroups(@PathVariable Long id) {
		return specService.getGroups(id);
	}

	@GetMapping("/getforms/{id}")
	@PreAuthorize("hasRole('SPEC') or hasRole('PARENT')")
	public Collection<ChildForm> getForms(@PathVariable Long id) {
		return specService.getForms(id);
	}

	@GetMapping("/getformsbykindergarten")
	@PreAuthorize("hasRole('SPEC')")
	public List<ChildFormRequest> getFormsByKindergarten() {
		return specService.getFormsByKindergarten();
	}

	@PostMapping("/amend/{id}")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> amendKindergarten(@Valid @RequestBody KindergartenRequest info, @PathVariable Long id) {
		return specService.amendKindergarten(id, info);
	}

	@PostMapping("/amend/group/{groupId}")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> amendGroup(@Valid @RequestBody GroupRequest info, @PathVariable Long groupId) {
		return specService.amendGroup(groupId, info);
	}

	@RequestMapping("/confirmqueue")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> confirmQueue() {
		return specService.confirmQueue();
	}

	@RequestMapping("/cancelqueue")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> cancelQueue() {
		return specService.cancelQueue();
	}

	@GetMapping("/freespaces")
	@PreAuthorize("hasRole('SPEC') or hasRole('PARENT')")
	public Long freeSpaces() {
		return specService.freeSpaces();
	}

	@RequestMapping("/cancel/{id}")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> cancelForm(@PathVariable Long id) {
		return specService.cancelForm(id);
	}

	@RequestMapping("/enable/{id}")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> enableForm(@PathVariable Long id) {
		return specService.enableForm(id);
	}
}
