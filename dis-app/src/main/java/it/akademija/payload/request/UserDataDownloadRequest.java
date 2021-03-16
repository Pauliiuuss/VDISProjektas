package it.akademija.payload.request;

public class UserDataDownloadRequest {

    private long id;
    private String name;
    private String surename;
    private Long personId;
    private String address;
    private String city;
    private Long phoneNum;
    private String email;

    public UserDataDownloadRequest() {
    }

    public UserDataDownloadRequest(String name, String surename, Long personId, String address, String city, Long phoneNum,
                           String email) {
        this.name = name;
        this.surename = surename;
        this.personId = personId;
        this.address = address;
        this.city = city;
        this.phoneNum = phoneNum;
        this.email = email;
    }


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurename() {
        return surename;
    }

    public void setSurename(String surename) {
        this.surename = surename;
    }

    public Long getPersonId() {
        return personId;
    }

    public void setPersonId(Long personId) {
        this.personId = personId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Long getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(Long phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "{\n\"duomenys\": {\n" +
                "\"vardas\": \"" + name + "\"" +
                ",\n\"pavarde\": \"" + surename + "\"" +
                ",\n\"asmensKodas\": " + personId +
                ",\n\"adresas\": \"" + address + "\"" +
                ",\n\"miestas\": \"" + city + "\"" +
                ",\n\"telefonoNr\": " + phoneNum +
                ",\n\"elPastas\": \"" + email + "\"" +
                "\n}\n}";
    }
}
