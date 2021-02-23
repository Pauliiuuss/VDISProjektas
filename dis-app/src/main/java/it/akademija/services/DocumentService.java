package it.akademija.services;

import antlr.StringUtils;
import it.akademija.models.Document;
import it.akademija.models.User;
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
                        .body(new MessageResponse("Galimas tik PDF failų įkėlimas."));
            }
        }else {
            return ResponseEntity.badRequest()
                    .body(new MessageResponse("Negalima įkelti tuščio failo!"));

        }
            if (currentUser.getDocument() == null) {
                    Document doc = new Document(document.getOriginalFilename(),
                            document.getContentType(),
                            document.getBytes());
                    doc.setUser(currentUser);
                    documentRepository.save(doc);

                return ResponseEntity.ok()
                        .body(new MessageResponse("Failas įkeltas sėkmingai!"));

            } else {
                Document currentDoc = currentUser.getDocument();
                    currentDoc.setDocData(document.getBytes());
                    currentDoc.setDocName(document.getOriginalFilename());
                    currentDoc.setDocType(document.getContentType());
                    documentRepository.save(currentDoc);

                return ResponseEntity.ok()
                        .body(new MessageResponse("Failas įkeltas sėkmingai!"));
            }
        }

    @Transactional(readOnly = true)
    public Collection<DocumentRequest> getDocuments(){
        return documentRepository.findAll().stream()
                .map(isdb -> new DocumentRequest(isdb.getId(), isdb.getDocName(), isdb.getDocType(), isdb.getDocData(), isdb.getUser()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public DocumentRequest getDocumentById(String id){
        Document isdb = documentRepository.findById(id).get();
        return new DocumentRequest(isdb.getId(),isdb.getDocName(),isdb.getDocType(),isdb.getDocData(),isdb.getUser());
    }


}
