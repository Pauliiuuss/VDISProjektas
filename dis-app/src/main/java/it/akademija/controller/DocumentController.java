package it.akademija.controller;


import it.akademija.models.Document;
import it.akademija.payload.request.DocumentRequest;
import it.akademija.services.DocumentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.annotation.Resource;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    @Autowired
    private DocumentService documentService;

    @PostMapping("/add/{id}")
    public ResponseEntity<?> addDocument(@RequestParam("file") MultipartFile document, @PathVariable Long id) throws IOException {
        return documentService.addDocument(document, id);
    }

    @GetMapping("/all")
    public Collection<DocumentRequest> getDocuments() {
        return documentService.getDocuments().stream().map(isdb -> {
            String downloadUri = ServletUriComponentsBuilder
                    .fromCurrentContextPath()
                    .path("/doc/")
                    .path(isdb.getId())
                    .toUriString();

            isdb.setUrl(downloadUri);
            return isdb;
        })
                .collect(Collectors.toList());
    }

    @GetMapping("/doc/{id}")
    public ResponseEntity<byte[]> getDocument(@PathVariable String id) {
        DocumentRequest isdb = documentService.getDocumentById(id);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + isdb.getDocName() + "\"")
                .body(isdb.getDocData());
    }

}