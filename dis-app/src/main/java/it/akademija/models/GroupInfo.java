package it.akademija.models;

public class GroupInfo {

	private Long id;
	private String name;
	private String capasity;
	private String type;

	private Kindergarten kindergarten;

	public GroupInfo() {
	}

	public GroupInfo(Long id, String name, String capasity, String type, Kindergarten kindergarten) {
		super();
		this.id = id;
		this.name = name;
		this.capasity = capasity;
		this.type = type;
		this.kindergarten = kindergarten;
	}

	public GroupInfo(Long id, String name, String capasity, String type) {
		super();
		this.id = id;
		this.name = name;
		this.capasity = capasity;
		this.type = type;
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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Kindergarten getKindergarten() {
		return kindergarten;
	}

	public void setKindergarten(Kindergarten kindergarten) {
		this.kindergarten = kindergarten;
	}

}
