package it.akademija.models;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name = "child_forms", uniqueConstraints = { @UniqueConstraint(columnNames = "personId") })
public class ChildForm {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	@NotBlank
	private String name;
	@NotBlank
	private String surename;
	private Date birthDate;
	@NotBlank
	private String address;
	@NotBlank
	private String city;
	private Long personId;

	private boolean inCity;
	private boolean adopted;
	private boolean threeOrMore;
	private boolean parentStudent;
	private boolean handicapped;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "group_id")
	private Group group;

	private String groupName;
	private String kindergartenName;

	@ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.EAGER)
	@JoinColumn(name = "userdata")
	private UserData parentData;

	@ManyToOne(cascade = CascadeType.REMOVE, fetch = FetchType.EAGER)
	@JoinColumn(name = "secondParentData")
	private SecondParent secondParentData;

	@OneToOne(cascade = CascadeType.REMOVE, mappedBy = "childForm")
	private KindergartenPriority kindergartenPriority;

	@Temporal(TemporalType.DATE)
	private Date postDate;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinTable(name = "form_status", joinColumns = @JoinColumn(name = "child_form_id"), inverseJoinColumns = @JoinColumn(name = "form_status_id"))
	private FormStatus formStatus;

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public ChildForm() {
	}

	public ChildForm(Long personId, String name, String surename, Date birthDate, String address, String city,
			boolean inCity, boolean adopted, boolean threeOrMore, boolean parentStudent, boolean handicapped,
			UserData parentData, SecondParent secondParentData, Date postDate) {
		this.name = name;
		this.surename = surename;
		this.birthDate = birthDate;
		this.address = address;
		this.personId = personId;
		this.city = city;
		this.inCity = inCity;
		this.adopted = adopted;
		this.threeOrMore = threeOrMore;
		this.parentStudent = parentStudent;
		this.handicapped = handicapped;
		this.parentData = parentData;
		this.secondParentData = secondParentData;
		this.postDate = postDate;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getKindergartenName() {
		return kindergartenName;
	}

	public void setKindergartenName(String kindergartenName) {
		this.kindergartenName = kindergartenName;
	}

	public Long getPersonId() {
		return personId;
	}

	public void setPersonId(Long personId) {
		this.personId = personId;
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

	public KindergartenPriority getKindergartenPriority() {
		return kindergartenPriority;
	}

	public void setKindergartenPriority(KindergartenPriority kindergartenPriority) {
		this.kindergartenPriority = kindergartenPriority;
	}

	public Date getPostDate() {
		return postDate;
	}

	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}

	public FormStatus getFormStatus() {
		return formStatus;
	}

	public void setFormStatus(FormStatus formStatus) {
		this.formStatus = formStatus;
	}

	public SecondParent getSecondParentData() {
		return secondParentData;
	}

	public void setSecondParentData(SecondParent secondParentData) {
		this.secondParentData = secondParentData;
	}

	@Override
	public String toString() {
		return "ChildForm [address=" + address + " adopted=" + adopted + ", threeOrMore=" + threeOrMore
				+ ", parentStudent=" + parentStudent + ", handicapped=" + handicapped + "]";
	}

}
