package it.akademija.repository;

import java.util.Collection;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import it.akademija.models.ChildForm;
import it.akademija.models.UserData;

public interface ChildFormRepository extends JpaRepository<ChildForm, Long> {

//	Optional<Collection<ChildForm>> findAllByUser(User user);

	boolean existsByPersonId(Long personId);

	Collection<ChildForm> findAllByParentData(UserData userData);

	Optional<ChildForm> findByPersonId(Long personId);
}
