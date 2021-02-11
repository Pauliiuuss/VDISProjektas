package it.akademija.models;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Entity
@Table(name = "userData", uniqueConstraints = { @UniqueConstraint(columnNames = "personId") })
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name;
    private String surename;
    private int personId;
    private String address;
    private String city;
    private int phoneNum;
    private String email;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user")
    private User user;

    @OneToMany(mappedBy = "parentData", fetch = FetchType.EAGER)
    private List<ChildForm> childForms;

    public UserData() {
    }

    public UserData(String name, String surename, int personId, String address, String city, int phoneNum, String email, User user) {
        this.name = name;
        this.surename = surename;
        this.personId = personId;
        this.address = address;
        this.city = city;
        this.phoneNum = phoneNum;
        this.email = email;
        this.user = user;
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

    public User getUser() {
        return user;
    }

    public void setUser(User username) {
        this.user = username;
    }
}
