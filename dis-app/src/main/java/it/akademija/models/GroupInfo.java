package it.akademija.models;

public class GroupInfo {

	private Long id;
	private String name;
	private Long capasity;
	private String age;

	public GroupInfo() {
	}

	public GroupInfo(Long id, String name, Long capasity, String age) {
		super();
		this.id = id;
		this.name = name;
		this.capasity = capasity;
		this.age = age;
	}

	public GroupInfo(String name, Long capasity, String age) {
		super();
		this.name = name;
		this.capasity = capasity;
		this.age = age;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
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

	public Long getCapasity() {
		return capasity;
	}

	public void setCapasity(Long capasity) {
		this.capasity = capasity;
	}

}
