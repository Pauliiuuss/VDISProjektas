package it.akademija.payload.request;

public class DocumentDownloadRequest {

    private String id;
    private String docName;
    private byte[] docData;

    public DocumentDownloadRequest() {
    }

    public DocumentDownloadRequest(String id, String docName, byte[] docData) {
        this.id = id;
        this.docName = docName;
        this.docData = docData;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }


    public String getDocName() {
        return docName;
    }

    public void setDocName(String docName) {
        this.docName = docName;
    }


    public byte[] getDocData() {
        return docData;
    }

    public void setDocData(byte[] docData) {
        this.docData = docData;
    }
}