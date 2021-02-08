package it.akademija.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.akademija.models.Group;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {

}
