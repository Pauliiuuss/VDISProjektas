package it.akademija.repository;

import java.util.Collection;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import it.akademija.models.ChildForm;
import it.akademija.models.UserData;

@Repository
public interface ChildFormRepository extends JpaRepository<ChildForm, Long> {

//	Optional<Collection<ChildForm>> findAllByUser(User user);

	boolean existsByPersonId(Long personId);

	Collection<ChildForm> findAllByParentData(UserData userData);

	Optional<ChildForm> findByPersonId(Long personId);

	@Modifying
	@Transactional
	@Query("SELECT c FROM ChildForm c JOIN c.kindergartenPriority x WHERE" + " x.kindergartenOne = :name OR\n"
			+ "x.kindergartenTwo  = :name OR\n" + "x.kindergartenThree  = :name OR\n"
			+ "x.kindergartenFour  = :name OR\n" + "x.kindergartenFive  = :name\n"
			+ "ORDER BY c.inCity desc, c.adopted desc,c.threeOrMore desc,c.parentStudent desc,c.handicapped desc")
	Collection<ChildForm> findAllByKindergartenName(@Param(value = "name") String name);

}
