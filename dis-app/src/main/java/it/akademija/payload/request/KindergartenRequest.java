package it.akademija.payload.request;

import java.util.List;

public class KindergartenRequest {
	private Long id;
	private String address;
	private String name;
	private Long capasity;
	private List<GroupRequest> groups;

	public KindergartenRequest() {
	}

	public KindergartenRequest(Long id, String address, String name, Long capasity, List<GroupRequest> groups) {
		this.id = id;
		this.address = address;
		this.name = name;
		this.capasity = capasity;
		this.groups = groups;
	}

	public KindergartenRequest(Long id, String address, String name, Long capasity) {
		this.id = id;
		this.address = address;
		this.name = name;
		this.capasity = capasity;
	}

	public KindergartenRequest(String address, String name, Long capasity) {
		this.address = address;
		this.name = name;
		this.capasity = capasity;
	}

	public KindergartenRequest(Long id, String address, String name) {
		super();
		this.id = id;
		this.address = address;
		this.name = name;
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

	public Long getCapasity() {
		return capasity;
	}

	public void setCapasity(Long capasity) {
		this.capasity = capasity;
	}

	public List<GroupRequest> getGroups() {
		return groups;
	}

	public void setGroups(List<GroupRequest> groups) {
		this.groups = groups;
	}

}
