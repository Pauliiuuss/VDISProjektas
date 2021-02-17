package it.akademija.repository;

import it.akademija.models.SecondParent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SecondParentRepository extends JpaRepository<SecondParent, Long> {

    Optional<SecondParent> findByPersonId(Long personId);
    Boolean existsByPersonId(Long personId);
}
