package it.akademija.services;

import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import it.akademija.models.Document;
import it.akademija.models.User;
import it.akademija.payload.request.DocumentRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.UserRepository;

@Service
public class DocumentService {

	@Autowired
	private DocumentRepository documentRepository;
	@Autowired
	private UserRepository userRepository;

	@Transactional
	public ResponseEntity<?> addDocument(MultipartFile document, Long id) {
		User currentUser = userRepository.findById(id).get();
		if (document != null) {
			try {
				Document doc = new Document(document.getOriginalFilename(), document.getContentType(),
						document.getBytes());
				doc.setUser(currentUser);
				documentRepository.save(doc);
			} catch (Exception e) {
				return ResponseEntity.badRequest()
						.body(new MessageResponse("Įvyko klaida įkeliant failą! Bandykite dar kartą."));
			}
			return ResponseEntity.ok().body(new MessageResponse("Failas įkeltas sėkmingai!"));

		} else {
			return ResponseEntity.badRequest().body(new MessageResponse("Negalima įkelti tuščio failo!"));
		}

	}

	@Transactional(readOnly = true)
	public Collection<DocumentRequest> getDocuments() {
		return documentRepository.findAll().stream().map(isdb -> new DocumentRequest(isdb.getId(), isdb.getDocName(),
				isdb.getDocType(), isdb.getDocData(), isdb.getUser())).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public DocumentRequest getDocumentById(String id) {
		Document isdb = documentRepository.findById(id).get();
		return new DocumentRequest(isdb.getId(), isdb.getDocName(), isdb.getDocType(), isdb.getDocData(),
				isdb.getUser());
	}

}
