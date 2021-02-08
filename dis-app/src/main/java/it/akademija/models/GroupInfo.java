package it.akademija.models;

public class GroupInfo {

	private Long id;
	private String name;
	private String capasity;
	private Long ageFrom;
	private Long ageTo;

	public GroupInfo() {
	}

	public GroupInfo(Long id, String name, String capasity, Long ageFrom, Long ageTo) {
		super();
		this.id = id;
		this.name = name;
		this.capasity = capasity;
		this.ageFrom = ageFrom;
		this.ageTo = ageTo;
	}

	public GroupInfo(String name, String capasity, Long ageFrom, Long ageTo) {
		super();
		this.name = name;
		this.capasity = capasity;
		this.ageFrom = ageFrom;
		this.ageTo = ageTo;
	}

	public Long getAgeFrom() {
		return ageFrom;
	}

	public void setAgeFrom(Long ageFrom) {
		this.ageFrom = ageFrom;
	}

	public Long getAgeTo() {
		return ageTo;
	}

	public void setAgeTo(Long ageTo) {
		this.ageTo = ageTo;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCapasity() {
		return capasity;
	}

	public void setCapasity(String capasity) {
		this.capasity = capasity;
	}

}
