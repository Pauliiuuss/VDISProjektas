package it.akademija.models;

import java.util.List;

public class KindergartenInfo {
	private Long id;
	private String address;
	private String name;
	private String lang;
	private Long capasity;
	private List<Group> groups;

	public KindergartenInfo() {
	}

	public KindergartenInfo(Long id, String address, String name, String lang, Long capasity, List<Group> groups) {
		this.id = id;
		this.address = address;
		this.name = name;
		this.lang = lang;
		this.capasity = capasity;
		this.groups = groups;
	}

	public KindergartenInfo(Long id, String address, String name, String lang, Long capasity) {
		super();
		this.id = id;
		this.address = address;
		this.name = name;
		this.lang = lang;
		this.capasity = capasity;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLang() {
		return lang;
	}

	public void setLang(String lang) {
		this.lang = lang;
	}

	public Long getCapasity() {
		return capasity;
	}

	public void setCapasity(Long capasity) {
		this.capasity = capasity;
	}

	public List<Group> getGroups() {
		return groups;
	}

	public void setGroups(List<Group> groups) {
		this.groups = groups;
	}

}