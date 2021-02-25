package it.akademija.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
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

	private Long capasity;

	private Long ageFrom;

	private Long ageTo;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "kindergarten_id")
	private Kindergarten kindergarten;

	@OneToMany(mappedBy = "group", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<ChildForm> childForm = null;

	public Group() {
	}

	public List<ChildForm> getChildForm() {
		return childForm;
	}

	public void setChildForm(List<ChildForm> childForm) {
		this.childForm = childForm;
	}

	public Group(Long id, @NotBlank @Size(max = 120) String name, Long capasity, Long ageFrom, Long ageTo,
			Kindergarten kindergarten) {
		super();
		this.id = id;
		this.name = name;
		this.capasity = capasity;
		this.ageFrom = ageFrom;
		this.ageTo = ageTo;
		this.kindergarten = kindergarten;
	}

	public Group(@NotBlank @Size(max = 120) String name, @NotBlank Long capasity, @NotBlank Long ageFrom,
			@NotBlank Long ageTo, Kindergarten kindergarten) {
		this.name = name;
		this.capasity = capasity;
		this.ageFrom = ageFrom;
		this.ageTo = ageTo;
		this.kindergarten = kindergarten;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((ageFrom == null) ? 0 : ageFrom.hashCode());
		result = prime * result + ((ageTo == null) ? 0 : ageTo.hashCode());
		result = prime * result + ((kindergarten == null) ? 0 : kindergarten.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Group other = (Group) obj;
		if (ageFrom == null) {
			if (other.ageFrom != null)
				return false;
		} else if (!ageFrom.equals(other.ageFrom))
			return false;
		if (ageTo == null) {
			if (other.ageTo != null)
				return false;
		} else if (!ageTo.equals(other.ageTo))
			return false;
		if (kindergarten == null) {
			if (other.kindergarten != null)
				return false;
		} else if (!kindergarten.equals(other.kindergarten))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		return true;
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

	public Long getCapasity() {
		return capasity;
	}

	public void setCapasity(Long capasity) {
		this.capasity = capasity;
	}

	public Kindergarten getKindergarten() {
		return kindergarten;
	}

	public void setKindergarten(Kindergarten kindergarten) {
		this.kindergarten = kindergarten;
	}

	@Override
	public String toString() {
		return name + " " + kindergarten;
	}

}
