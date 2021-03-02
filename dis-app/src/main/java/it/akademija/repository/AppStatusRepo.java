package it.akademija.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.akademija.models.AppStatus;

public interface AppStatusRepo extends JpaRepository<AppStatus, Long> {

	default void setRegistrationOpen() {
		AppStatus appStatus = this.findAll().get(0);
		appStatus.setRegistrationClosed(false);
		this.save(appStatus);
	}

	default void setRegistrationClosed() {
		AppStatus appStatus = this.findAll().get(0);
		appStatus.setRegistrationClosed(true);
		this.save(appStatus);
	}

}
