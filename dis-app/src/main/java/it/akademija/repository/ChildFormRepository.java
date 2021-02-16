package it.akademija.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import it.akademija.models.ChildForm;

public interface ChildFormRepository extends JpaRepository<ChildForm, Long> {

//	Optional<Collection<ChildForm>> findAllByUser(User user);

	boolean existsByPersonId(Long personId);

}
