package it.akademija.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "kindergartens", uniqueConstraints = { @UniqueConstraint(columnNames = "ID") })
public class Kindergarten {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 120)
	private String address;

	@NotBlank
	@Size(max = 120)
	private String name;

	@NotBlank
	@Size(max = 30)
	private String lang;

	@NotBlank
	@Size(max = 120)
	private Long capasity;

	@OneToMany(mappedBy = "kindergarten", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Group> groups;

	public Kindergarten() {
	}

	public Kindergarten(@NotBlank @Size(max = 120) String address, @NotBlank @Size(max = 120) String name,
			@NotBlank @Size(max = 30) String lang, @NotBlank @Size(max = 120) Long capasity, List<Group> groups) {
		super();
		this.address = address;
		this.name = name;
		this.lang = lang;
		this.capasity = capasity;
		this.groups = groups;
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
