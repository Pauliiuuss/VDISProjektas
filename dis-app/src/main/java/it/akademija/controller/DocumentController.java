package it.akademija.controller;

import it.akademija.payload.request.DocumentDownloadRequest;
import it.akademija.payload.request.DocumentRequest;
import it.akademija.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.util.Collection;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

	@Autowired
	private DocumentService documentService;

	@PostMapping("/add/{id}")
	@PreAuthorize("hasRole('PARENT')")
	public ResponseEntity<?> addDocument(@RequestParam("file") MultipartFile document, @PathVariable Long id)
			throws IOException {
		return documentService.addDocument(document, id);
	}

	@GetMapping("/all")
	@PreAuthorize("hasRole('SPEC')")
	public Collection<DocumentRequest> getDocuments() {
		return documentService.getDocuments().stream().map(isdb -> {
			String downloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/documents/doc/").path(isdb.getId())
					.toUriString();

			isdb.setUrl(downloadUri);
			return isdb;
		}).collect(Collectors.toList());
	}

	@GetMapping("/doc/{id}")
	@PreAuthorize("hasRole('SPEC')")
	public ResponseEntity<byte[]> getDocument(@PathVariable String id) {
		DocumentDownloadRequest isdb = documentService.getDocumentById(id);

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + isdb.getDocName() + "\"")
				.body(isdb.getDocData());
	}

}