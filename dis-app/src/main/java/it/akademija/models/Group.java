package it.akademija.models;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "groups", uniqueConstraints = { @UniqueConstraint(columnNames = "ID") })
public class Group {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Size(max = 120)
	private String name;

	private String capasity;

	private Long ageFrom;

	private Long ageTo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "kindergarten_id")
	private Kindergarten kindergarten;

	public Group() {
	}

	public Group(@NotBlank @Size(max = 120) String name, @NotBlank String capasity, @NotBlank Long ageFrom,
			@NotBlank Long ageTo, Kindergarten kindergarten) {
		super();
		this.name = name;
		this.capasity = capasity;
		this.ageFrom = ageFrom;
		this.ageTo = ageTo;
		this.kindergarten = kindergarten;
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

	public Kindergarten getKindergarten() {
		return kindergarten;
	}

	public void setKindergarten(Kindergarten kindergarten) {
		this.kindergarten = kindergarten;
	}

}
