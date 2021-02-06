package it.akademija.controller;

import java.util.Collection;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import it.akademija.models.KindergartenInfo;
import it.akademija.services.SpecService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/spec")
public class SpecController {
	@Autowired
	private SpecService specService;

	@PostMapping("/create")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<?> registerKindergarten(@Valid @RequestBody KindergartenInfo info) {
		return specService.registerKindergarten(info);
	}

	@GetMapping("/getkindergartens")
	@PreAuthorize("hasRole('SPEC')")
	public Collection<KindergartenInfo> getKindergartens() {
		return specService.getKindergartens();
	}

}
