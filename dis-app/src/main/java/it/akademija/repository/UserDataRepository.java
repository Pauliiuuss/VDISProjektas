package it.akademija.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.akademija.models.User;
import it.akademija.models.UserData;

public interface UserDataRepository extends JpaRepository<UserData, Long> {
	void deleteByUser(User user);

	Optional<UserData> findByNameAndSurename(String name, String sureName);

	Boolean existsByName(String name);

	Boolean existsBySurename(String surename);

	Optional<UserData> findByUser(User user);
}
