package it.akademija.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import it.akademija.models.User;
import it.akademija.models.UserData;

@Repository
public interface UserDataRepository extends JpaRepository<UserData, Long> {
	Optional<UserData> findByUser(User user);

	void deleteByUser(User user);

}
