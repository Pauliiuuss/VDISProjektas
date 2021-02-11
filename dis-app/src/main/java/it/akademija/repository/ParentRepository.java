package it.akademija.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.akademija.models.Parent;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {

}
