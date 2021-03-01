package it.akademija.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.akademija.models.Kindergarten;

@Repository
public interface KindergartenRepository extends JpaRepository<Kindergarten, Long> {
	Boolean existsByName(String name);

	Boolean deleteAllByName(String name);

	Optional<Kindergarten> findByName(String name);

}
