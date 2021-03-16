package it.akademija.repository;

import it.akademija.models.FormStatus;
import it.akademija.models.enums.EFormStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FormStatusRepository extends JpaRepository<FormStatus, Long> {
    Optional<FormStatus> findByName(EFormStatus name);
}
