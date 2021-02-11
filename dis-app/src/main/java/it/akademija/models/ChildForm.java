package it.akademija.models;

import net.minidev.json.annotate.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "child_forms")
public class ChildForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank
    private String name;
    @NotBlank
    private String surename;
    @NotBlank
    private Date birthDate;
    @NotBlank
    private String address;
    @NotBlank
    private String city;
    @NotBlank
    private boolean inCity;
    @NotBlank
    private boolean adopted;
    @NotBlank
    private boolean threeOrMore;
    @NotBlank
    private boolean parentStudent;
    @NotBlank
    private boolean handicapped;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userdata")
    private UserData parentData;

    @OneToOne(mappedBy = "childForm")
    private KindergartenPriority kindergartenPriority;

    @NotBlank
    private Date postDate;

    public ChildForm() {
    }

    public ChildForm(String name, String surename, Date birthDate, String address, String city, boolean inCity,
                     boolean adopted, boolean threeOrMore, boolean parentStudent, boolean handicapped, UserData parentData, KindergartenPriority kindergartenPriority, Date postDate) {
        this.name = name;
        this.surename = surename;
        this.birthDate = birthDate;
        this.address = address;
        this.city = city;
        this.inCity = inCity;
        this.adopted = adopted;
        this.threeOrMore = threeOrMore;
        this.parentStudent = parentStudent;
        this.handicapped = handicapped;
        this.parentData = parentData;
        this.kindergartenPriority = kindergartenPriority;
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

    public UserData getParentData() {
        return parentData;
    }

    public void setParentData(UserData parentData) {
        this.parentData = parentData;
    }

    public KindergartenPriority getKindergartenPriority() { return kindergartenPriority; }

    public void setKindergartenPriority(KindergartenPriority kindergartenPriority) { this.kindergartenPriority = kindergartenPriority; }

    public Date getPostDate() {
        return postDate;
    }

    public void setPostDate(Date postDate) {
        this.postDate = postDate;
    }
}
