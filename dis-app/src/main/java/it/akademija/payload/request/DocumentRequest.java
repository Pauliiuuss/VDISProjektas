package it.akademija.payload.request;

import it.akademija.models.User;

public class DocumentRequest {

    private String id;
    private String url;

    private String docName;
    private String docType;
    private byte[] docData;
    private User user;

    public DocumentRequest() {
    }

    public DocumentRequest(String id, String docName, String docType, byte[] docData, User user) {
        this.id = id;
        this.docName = docName;
        this.docType = docType;
        this.docData = docData;
        this.user = user;
    }

    public DocumentRequest(String id, String url, String docName, String docType, byte[] docData, User user) {
        this.id = id;
        this.url = url;
        this.docName = docName;
        this.docType = docType;
        this.docData = docData;
        this.user = user;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }

    public String getDocType() {
        return docType;
    }

    public void setDocType(String docType) {
        this.docType = docType;
    }

    public byte[] getDocData() {
        return docData;
    }

    public void setDocData(byte[] docData) {
        this.docData = docData;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
