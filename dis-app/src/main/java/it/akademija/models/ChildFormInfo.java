package it.akademija.models;

import java.util.Date;
import java.util.List;

public class ChildFormInfo {

    private long id;
    private String name;
    private String surename;
    private Date birthDate;
    private String address;
    private String city;
    private List<String> priorities;
    private boolean inCity;
    private boolean adopted;
    private boolean threeOrMore;
    private boolean parentStudent;
    private boolean handicapped;
    private UserData parentId;
    private Date postDate;

    public ChildFormInfo() {
    }

    public ChildFormInfo(String name, String surename, Date birthDate, String address, String city, List<String> priorities,
                         boolean inCity, boolean adopted, boolean threeOrMore, boolean parentStudent, boolean handicapped, UserData parentId, Date postDate) {
        this.name = name;
        this.surename = surename;
        this.birthDate = birthDate;
        this.address = address;
        this.city = city;
        this.priorities = priorities;
        this.inCity = inCity;
        this.adopted = adopted;
        this.threeOrMore = threeOrMore;
        this.parentStudent = parentStudent;
        this.handicapped = handicapped;
        this.parentId = parentId;
        this.postDate = postDate;
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

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
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

    public List<String> getPriorities() {
        return priorities;
    }

    public void setPriorities(List<String> priorities) {
        this.priorities = priorities;
    }

    public boolean isInCity() {
        return inCity;
    }

    public void setInCity(boolean inCity) {
        this.inCity = inCity;
    }

    public boolean isAdopted() {
        return adopted;
    }

    public void setAdopted(boolean adopted) {
        this.adopted = adopted;
    }

    public boolean isThreeOrMore() {
        return threeOrMore;
    }

    public void setThreeOrMore(boolean threeOrMore) {
        this.threeOrMore = threeOrMore;
    }

    public boolean isParentStudent() {
        return parentStudent;
    }

    public void setParentStudent(boolean parentStudent) {
        this.parentStudent = parentStudent;
    }

    public boolean isHandicapped() {
        return handicapped;
    }

    public void setHandicapped(boolean handicapped) {
        this.handicapped = handicapped;
    }

    public UserData getParentId() {
        return parentId;
    }

    public void setParentId(UserData parentId) {
        this.parentId = parentId;
    }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }
}