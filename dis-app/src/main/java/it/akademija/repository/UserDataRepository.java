package it.akademija.repository;

import it.akademija.models.Role;
import it.akademija.models.UserData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserDataRepository extends JpaRepository<UserData, Long> {

    Optional<UserData> findByNameAndSurename (String name, String sureName);
    Boolean existsByName (String name);
    Boolean existsBySurename (String surename);
}
