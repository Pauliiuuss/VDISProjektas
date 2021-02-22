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

	@OneToMany(mappedBy = "kindergarten", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<Group> groups;

	public Kindergarten() {
	}

	public Kindergarten(Long id, @NotBlank @Size(max = 120) String address, @NotBlank @Size(max = 120) String name,
			List<Group> groups) {
		super();
		this.id = id;
		this.address = address;
		this.name = name;
		this.groups = groups;
	}

	public Kindergarten(@NotBlank @Size(max = 120) String address, @NotBlank @Size(max = 120) String name,
			List<Group> groups) {
		super();
		this.address = address;
		this.name = name;
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

	public List<Group> getGroups() {
		return groups;
	}

	public void setGroups(List<Group> groups) {
		this.groups = groups;
	}

	@Override
	public String toString() {
		return name;
	}

}
