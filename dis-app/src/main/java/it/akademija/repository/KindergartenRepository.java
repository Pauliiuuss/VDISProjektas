package it.akademija.repository;

import it.akademija.models.Kindergarten;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KindergartenRepository extends JpaRepository<Kindergarten, Long> {
	Boolean existsByName(String name);

	Optional<Kindergarten> findByName(String name);

}
