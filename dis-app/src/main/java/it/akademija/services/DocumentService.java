package it.akademija.services;

import it.akademija.models.Document;
import it.akademija.models.Log;
import it.akademija.models.User;
import it.akademija.payload.request.DocumentDownloadRequest;
import it.akademija.payload.request.DocumentRequest;
import it.akademija.payload.response.MessageResponse;
import it.akademija.repository.DocumentRepository;
import it.akademija.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Service
public class DocumentService {

	@Autowired
	private DocumentRepository documentRepository;
	@Autowired
	private UserRepository userRepository;

	@Transactional
	public ResponseEntity<?> addDocument(MultipartFile document, Long id) throws IOException {
		User currentUser = userRepository.findById(id).get();

		if (document != null) {
			if (!document.getContentType().equals("application/pdf")) {
				return ResponseEntity.badRequest()
						.body(new MessageResponse("Dokumentas netinkamo formato. Pažyma turi būti PDF formato."));
			}

			if (document.getSize() > 6000000) {
				return ResponseEntity.badRequest()
						.body(new MessageResponse("Failas per didelis, maksimalus failo dydis - 6 MB"));
			}

		} else {
			return ResponseEntity.badRequest().body(new MessageResponse("Negalima įkelti tuščio failo!"));
		}
		Document doc = new Document(document.getOriginalFilename(), document.getContentType(), document.getBytes());
		doc.setUser(currentUser);
		doc.setUploadDate(new Date());
		documentRepository.save(doc);

		Log.logMessage("Failas įkeltas.");
		return ResponseEntity.ok().body(new MessageResponse("Failas įkeltas sėkmingai!"));

	}

	@Transactional(readOnly = true)
	public Collection<DocumentRequest> getDocuments() {
		return documentRepository.findAll().stream().map(isdb -> new DocumentRequest(isdb.getId(), isdb.getDocName(),
				isdb.getDocType(), isdb.getUploadDate(), isdb.getUser().getUsername())).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public DocumentDownloadRequest getDocumentById(String id) {
		Document isdb = documentRepository.findById(id).get();
		return new DocumentDownloadRequest(isdb.getId(), isdb.getDocName(), isdb.getDocData());
	}

}
