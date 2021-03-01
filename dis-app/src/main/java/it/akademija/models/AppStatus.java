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
	private boolean specelistsDisabled;

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

	public boolean isSpecelistsDisabled() {
		return specelistsDisabled;
	}

	public void setSpecelistsDisabled(boolean specelistsDisabled) {
		this.specelistsDisabled = specelistsDisabled;
	}

	public AppStatus(boolean registrationClosed, boolean specelistsDisabled) {
		super();
		this.registrationClosed = registrationClosed;
		this.specelistsDisabled = specelistsDisabled;
	}

	public AppStatus() {
	}

}
