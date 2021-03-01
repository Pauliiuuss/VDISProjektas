package it.akademija.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.akademija.models.AppStatus;

public interface AppStatusRepo extends JpaRepository<AppStatus, Long> {

	default void setRegistrationOpen() {
		AppStatus appStatus = this.getOne(1L);
		appStatus.setRegistrationClosed(false);
		this.save(appStatus);
	}

	default void setRegistrationClosed() {
		AppStatus appStatus = this.getOne(1L);
		appStatus.setRegistrationClosed(true);
		this.save(appStatus);
	}

}
