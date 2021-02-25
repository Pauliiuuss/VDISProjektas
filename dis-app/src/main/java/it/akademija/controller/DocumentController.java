package it.akademija.controller;

import java.io.IOException;
import java.util.Collection;
import java.util.stream.Collectors;

import it.akademija.models.Document;
import it.akademija.payload.request.DocumentDownloadRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import it.akademija.payload.request.DocumentRequest;
import it.akademija.services.DocumentService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

	@Autowired
	private DocumentService documentService;

	@PostMapping("/add/{id}")
	public ResponseEntity<?> addDocument(@RequestParam("file") MultipartFile document, @PathVariable Long id)
			throws IOException {
		return documentService.addDocument(document, id);
	}

	@GetMapping("/all")
	public Collection<DocumentRequest> getDocuments() {
		return documentService.getDocuments().stream().map(isdb -> {
			String downloadUri = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/documents/doc/").path(isdb.getId())
					.toUriString();

			isdb.setUrl(downloadUri);
			return isdb;
		}).collect(Collectors.toList());
	}

	@GetMapping("/doc/{id}")
	public ResponseEntity<byte[]> getDocument(@PathVariable String id) {
		DocumentDownloadRequest isdb = documentService.getDocumentById(id);

		return ResponseEntity.ok()
				.header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + isdb.getDocName() + "\"")
				.body(isdb.getDocData());
	}

}