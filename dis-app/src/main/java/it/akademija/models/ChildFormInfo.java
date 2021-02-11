package it.akademija.models;

import java.util.Date;

public class ChildFormInfo {
// Child
	private long id;
	private String name;
	private String surename;
	private Date birthDate;
	private String address;
	private String city;
	private String kindergarten1;
	private String kindergarten2;
	private String kindergarten3;
	private String kindergarten4;
	private String kindergarten5;
	private boolean inCity;
	private boolean adopted;
	private boolean threeOrMore;
	private boolean parentStudent;
	private boolean handicapped;
	private Date postDate;
	private ParentInfo parent1;
	private ParentInfo parent2;

	public ChildFormInfo(String name, String surename, Date birthDate, String address, String city,
			String kindergarten1, String kindergarten2, String kindergarten3, String kindergarten4,
			String kindergarten5, boolean inCity, boolean adopted, boolean threeOrMore, boolean parentStudent,
			boolean handicapped, Date postDate, ParentInfo parent1, ParentInfo parent2) {
		super();
		this.name = name;
		this.surename = surename;
		this.birthDate = birthDate;
		this.address = address;
		this.city = city;
		this.kindergarten1 = kindergarten1;
		this.kindergarten2 = kindergarten2;
		this.kindergarten3 = kindergarten3;
		this.kindergarten4 = kindergarten4;
		this.kindergarten5 = kindergarten5;
		this.inCity = inCity;
		this.adopted = adopted;
		this.threeOrMore = threeOrMore;
		this.parentStudent = parentStudent;
		this.handicapped = handicapped;
		this.postDate = postDate;
		this.parent1 = parent1;
		this.parent2 = parent2;
	}

	public ChildFormInfo() {
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

	public String getKindergarten1() {
		return kindergarten1;
	}

	public void setKindergarten1(String kindergarten1) {
		this.kindergarten1 = kindergarten1;
	}

	public String getKindergarten2() {
		return kindergarten2;
	}

	public void setKindergarten2(String kindergarten2) {
		this.kindergarten2 = kindergarten2;
	}

	public String getKindergarten3() {
		return kindergarten3;
	}

	public void setKindergarten3(String kindergarten3) {
		this.kindergarten3 = kindergarten3;
	}

	public String getKindergarten4() {
		return kindergarten4;
	}

	public void setKindergarten4(String kindergarten4) {
		this.kindergarten4 = kindergarten4;
	}

	public String getKindergarten5() {
		return kindergarten5;
	}

	public void setKindergarten5(String kindergarten5) {
		this.kindergarten5 = kindergarten5;
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

	public Date getPostDate() {
		return postDate;
	}

	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}

	public ParentInfo getParent1() {
		return parent1;
	}

	public void setParent1(ParentInfo parent1) {
		this.parent1 = parent1;
	}

	public ParentInfo getParent2() {
		return parent2;
	}

	public void setParent2(ParentInfo parent2) {
		this.parent2 = parent2;
	}

	@Override
	public String toString() {
		return "ChildFormInfo [id=" + id + ", name=" + name + ", surename=" + surename + ", birthDate=" + birthDate
				+ ", address=" + address + ", city=" + city + ", kindergarten1=" + kindergarten1 + ", kindergarten2="
				+ kindergarten2 + ", kindergarten3=" + kindergarten3 + ", kindergarten4=" + kindergarten4
				+ ", kindergarten5=" + kindergarten5 + ", inCity=" + inCity + ", adopted=" + adopted + ", threeOrMore="
				+ threeOrMore + ", parentStudent=" + parentStudent + ", handicapped=" + handicapped + ", postDate="
				+ postDate + ", parent1=" + parent1 + ", parent2=" + parent2 + "]";
	}

}
