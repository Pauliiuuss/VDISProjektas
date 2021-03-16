package it.akademija.payload.request;

import it.akademija.models.*;

import java.util.Date;

public class ChildFormRequest {

	private long id;
	private String name;
	private String surename;
	private Date birthDate;
	private String address;
	private Long personId;
	private String city;
	private boolean inCity;
	private boolean adopted;
	private boolean threeOrMore;
	private boolean parentStudent;
	private boolean handicapped;
	private UserData parentData;
	private SecondParent secondParentData;
	private KindergartenPriority kindergartenPriority;
	private Date postDate;
	private long idFront;
	private Group group;
	private FormStatus formStatus;

	public Group getGroup() {
		return group;
	}

	public void setGroup(Group group) {
		this.group = group;
	}

	public ChildFormRequest() {
	}

	public ChildFormRequest(long id, String name, String surename, Date birthDate, String address, String city,
			Long personId, boolean inCity, boolean adopted, boolean threeOrMore, boolean parentStudent,
			boolean handicapped, UserData parentData, SecondParent secondParentData,
			KindergartenPriority kindergartenPriority, Date postDate) {
		this.id = id;
		this.name = name;
		this.surename = surename;
		this.birthDate = birthDate;
		this.address = address;
		this.city = city;
		this.personId = personId;
		this.inCity = inCity;
		this.adopted = adopted;
		this.threeOrMore = threeOrMore;
		this.parentStudent = parentStudent;
		this.handicapped = handicapped;
		this.parentData = parentData;
		this.secondParentData = secondParentData;
		this.kindergartenPriority = kindergartenPriority;
		this.postDate = postDate;
	}

	public ChildFormRequest(long id, String name, String surename, Date birthDate, String address, String city,
			Long personId, boolean inCity, boolean adopted, boolean threeOrMore, boolean parentStudent,
			boolean handicapped, UserData parentData, SecondParent secondParentData,
			KindergartenPriority kindergartenPriority, Date postDate, Group group, FormStatus formStatus) {
		this.id = id;
		this.name = name;
		this.surename = surename;
		this.birthDate = birthDate;
		this.address = address;
		this.city = city;
		this.personId = personId;
		this.inCity = inCity;
		this.adopted = adopted;
		this.threeOrMore = threeOrMore;
		this.parentStudent = parentStudent;
		this.handicapped = handicapped;
		this.parentData = parentData;
		this.secondParentData = secondParentData;
		this.kindergartenPriority = kindergartenPriority;
		this.postDate = postDate;
		this.group = group;
		this.formStatus = formStatus;
	}

	public FormStatus getFormStatus() {
		return formStatus;
	}

	public void setFormStatus(FormStatus formStatus) {
		this.formStatus = formStatus;
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

	public Date getPostDate() {
		return postDate;
	}

	public KindergartenPriority getKindergartenPriority() {
		return kindergartenPriority;
	}

	public void setKindergartenPriority(KindergartenPriority kindergartenPriority) {
		this.kindergartenPriority = kindergartenPriority;
	}

	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}

	public long getIdFront() {
		return idFront;
	}

	public void setIdFront(long idFront) {
		this.idFront = idFront;
	}

	public SecondParent getSecondParentData() {
		return secondParentData;
	}

	public void setSecondParentData(SecondParent secondParentData) {
		this.secondParentData = secondParentData;
	}

	@Override
	public String toString() {
		return "ChildFormRequest [id=" + id + ", name=" + name + ", surename=" + surename + ", birthDate=" + birthDate
				+ ", address=" + address + ", personId=" + personId + ", city=" + city + ", inCity=" + inCity
				+ ", adopted=" + adopted + ", threeOrMore=" + threeOrMore + ", parentStudent=" + parentStudent
				+ ", handicapped=" + handicapped + ", parentData=" + parentData + ", kindergartenPriority="
				+ kindergartenPriority + ", postDate=" + postDate + ", idFront=" + idFront + "]";
	}

}
