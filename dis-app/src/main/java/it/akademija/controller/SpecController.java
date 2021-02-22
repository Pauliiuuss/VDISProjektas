package it.akademija.controller;

import java.util.Collection;
import java.util.List;
import java.util.Map;

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
import it.akademija.models.Group;
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
//	@PreAuthorize("hasRole('SPEC')")
	public Collection<ChildForm> getForms(@PathVariable Long id) {
		return specService.getForms(id);
	}

	@GetMapping("/getformsbykindergarten/{id}")
//	@PreAuthorize("hasRole('SPEC')")
	public Map<Group, List<ChildForm>> getFormsByKindergarten(@PathVariable Long id) {
		return specService.getFormsByKindergarten(id);
	}

	@PostMapping("/amend/{id}")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> amendKindergarten(@Valid @RequestBody KindergartenRequest info, @PathVariable Long id) {
		return specService.amendKindergarten(id, info);
	}

	@PostMapping("/amend/group/{groupId}")
	public ResponseEntity<?> amendGroup(@Valid @RequestBody GroupRequest info, @PathVariable Long groupId) {
		return specService.amendGroup(groupId, info);
	}

}
