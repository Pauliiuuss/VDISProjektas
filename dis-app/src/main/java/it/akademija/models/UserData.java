package it.akademija.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "userData", uniqueConstraints = { @UniqueConstraint(columnNames = "personId") })
public class UserData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String name;
    @NotBlank
    private String surename;
    @NotBlank
    private int personId;
    @NotBlank
    private String address;
    @NotBlank
    private String city;

    @NotBlank
    private int phoneNum;
    @NotBlank
    private String email;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User userId;

    @OneToMany(mappedBy = "parentId", fetch = FetchType.EAGER)
    private List<ChildForm> childForms;

    public UserData() {
    }

    public UserData(String name, String surename, int personId, String address, String city, int phoneNum, String email, User userId) {
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

    public User getUserId() {
        return userId;
    }

    public void setUserId(User username) {
        this.userId = username;
    }
}
