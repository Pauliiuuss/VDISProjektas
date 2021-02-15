package it.akademija.models;

import java.util.Date;

public class ChildFormInfo {

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
	private KindergartenPriority kindergartenPriority;
	private Date postDate;
	private long idFront;

	public ChildFormInfo() {
	}

	public ChildFormInfo(long id, String name, String surename, Date birthDate, String address, String city,
			Long personId, boolean inCity, boolean adopted, boolean threeOrMore, boolean parentStudent,
			boolean handicapped, UserData parentData, KindergartenPriority kindergartenPriority, long idFront,
			Date postDate) {
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
		this.kindergartenPriority = kindergartenPriority;
		this.idFront = idFront;
		this.postDate = postDate;
	}

	public ChildFormInfo(long id, String name, String surename, Date birthDate, String address, String city,
			Long personId, boolean inCity, boolean adopted, boolean threeOrMore, boolean parentStudent,
			boolean handicapped, UserData parentData, KindergartenPriority kindergartenPriority, Date postDate) {
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
		this.kindergartenPriority = kindergartenPriority;
		this.postDate = postDate;
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

	@Override
	public String toString() {
		return "ChildFormInfo [id=" + id + ", name=" + name + ", surename=" + surename + ", birthDate=" + birthDate
				+ ", address=" + address + ", personId=" + personId + ", city=" + city + ", inCity=" + inCity
				+ ", adopted=" + adopted + ", threeOrMore=" + threeOrMore + ", parentStudent=" + parentStudent
				+ ", handicapped=" + handicapped + ", parentData=" + parentData + ", kindergartenPriority="
				+ kindergartenPriority + ", postDate=" + postDate + ", idFront=" + idFront + "]";
	}

}
