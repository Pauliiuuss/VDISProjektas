package it.akademija.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "second_parent")
public class SecondParent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private String name;
	private String surename;
	private Long personId;
	private String address;
	private String city;
	private Integer phoneNum;
	private String email;

	@OneToMany(mappedBy = "secondParentData", fetch = FetchType.EAGER)
	@JsonIgnore
	private List<ChildForm> childForms;

	public SecondParent() {
	}

	public SecondParent(long id, String name, String surename, Long personId, String address, String city,
			Integer phoneNum, String email) {
		this.id = id;
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

	public Integer getPhoneNum() {
		return phoneNum;
	}

	public void setPhoneNum(Integer phoneNum) {
		this.phoneNum = phoneNum;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<ChildForm> getChildForms() {
		return childForms;
	}

	public void setChildForms(List<ChildForm> childForms) {
		this.childForms = childForms;
	}
}
