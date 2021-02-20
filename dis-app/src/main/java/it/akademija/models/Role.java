package it.akademija.models;

import it.akademija.models.enums.ERole;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private ERole name;

	public Role() {

	}

	public Role(ERole name) {
		this.name = name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public ERole getName() {
		return name;
	}

	public void setName(ERole name) {
		this.name = name;
	}

	@Override
	public String toString() {
		if (name == ERole.ROLE_ADMIN)
			return "Administratorius";
		if (name == ERole.ROLE_SPEC)
			return "Švietimo specialistas";
		else
			return "Vaiko atstovas";
	}

}