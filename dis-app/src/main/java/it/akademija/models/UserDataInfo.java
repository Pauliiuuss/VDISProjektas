package it.akademija.models;


public class UserDataInfo {

    private long id;
    private String name;
    private String surename;
    private int personId;
    private String address;
    private String city;
    private int phoneNum;
    private String email;
    private User userId;

    public UserDataInfo() {
    }

    public UserDataInfo(long id, String name, String surename, int personId, String address, String city, int phoneNum, String email, User userId) {
        this.id = id;
        this.name = name;
        this.surename = surename;
        this.personId = personId;
        this.address = address;
        this.city = city;
        this.phoneNum = phoneNum;
        this.email = email;
        this.userId = userId;
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

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
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

    public int getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(int phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public User getUserId() { return userId; }

    public void setUserId(User username) { this.userId = username; }

}