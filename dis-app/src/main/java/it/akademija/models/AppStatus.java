package it.akademija.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "appstatus")
public class AppStatus {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;

	private boolean registrationClosed;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public boolean isRegistrationClosed() {
		return registrationClosed;
	}

	public void setRegistrationClosed(boolean registrationClosed) {
		this.registrationClosed = registrationClosed;
	}

	public AppStatus(boolean registrationClosed) {
		super();
		this.registrationClosed = registrationClosed;
	}

	public AppStatus() {
	}

}
