package it.akademija.payload.request;


import java.util.Date;

public class DocumentRequest {

    private String id;
    private String url;

    private String docName;
    private String docType;
    private Date uploadDate;
    private String userName;

    public DocumentRequest() {
    }

    public DocumentRequest(String id, String docName, String docType, Date uploadDate, String userName) {
        this.id = id;
        this.docName = docName;
        this.docType = docType;
        this.uploadDate = uploadDate;
        this.userName = userName;
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

    public Date getUploadDate() {
        return uploadDate;
    }

    public void setUploadDate(Date uploadDate) {
        this.uploadDate = uploadDate;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
}
